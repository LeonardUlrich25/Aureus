"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ThreeStepFlow from '@/components/session/ThreeStepFlow';
import { UserProfileManager } from '@/lib/userProfile';
import { ThreeStepSessionBuilder } from '@/lib/threeStepSession';

export default function SessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedWords, setSelectedWords] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interactions, setInteractions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSessionData();
  }, []);

  const loadSessionData = async () => {
    try {
      console.log('📍 Session page loaded');
      
      let words: any[] = [];
      
      // METHOD 1: Try sessionStorage
      const storedWords = sessionStorage.getItem('selected_words');
      console.log('Method 1 (sessionStorage):', storedWords ? `Found (len ${storedWords.length})` : 'Empty');
      
      if (storedWords) {
        try {
          words = JSON.parse(storedWords || '[]');
          console.log('✅ Parsed from sessionStorage:', Array.isArray(words) ? words.length : 'not-array');
        } catch (e) {
          console.error('Parse error (sessionStorage):', e);
          // leave words empty so other methods run
          words = [];
        }
      }
      
      // METHOD 2: Try URL params
      if (words.length === 0) {
        const urlWords = searchParams.get('words');
        console.log('Method 2 (URL):', urlWords ? `Found (len ${urlWords.length})` : 'Empty');
        
        if (urlWords) {
          try {
            const decoded = decodeURIComponent(urlWords);
            words = JSON.parse(decoded || '[]');
            console.log('✅ Parsed from URL:', Array.isArray(words) ? words.length : 'not-array');
          } catch (e) {
            console.error('Parse error (URL):', e);
            words = [];
          }
        }
      }
      
      // METHOD 3: Try localStorage backup
      if (words.length === 0) {
        const backupWords = localStorage.getItem('selected_words_backup');
        console.log('Method 3 (localStorage):', backupWords ? `Found (len ${backupWords.length})` : 'Empty');
        
        if (backupWords) {
          try {
            words = JSON.parse(backupWords || '[]');
            console.log('✅ Parsed from localStorage:', Array.isArray(words) ? words.length : 'not-array');
          } catch (e) {
            console.error('Parse error (localStorage):', e);
            words = [];
          }
        }
      }
      
      // FINAL CHECK
      if (!words || words.length === 0) {
        console.error('❌ No words found by any method');
        console.log('Debug info:');
        console.log('- sessionStorage keys:', Object.keys(sessionStorage));
        console.log('- localStorage keys:', Object.keys(localStorage));
        console.log('- URL params:', searchParams.toString());
        console.log('- window.location.href length:', typeof window !== 'undefined' ? window.location.href.length : 'no-window');
        console.log('- example sessionStorage.selected_words (raw):', storedWords ? storedWords.substring(0, 300) + (storedWords.length > 300 ? '...' : '') : 'none');
        
        setError('No words selected');
        setIsLoading(false);
        return;
      }
      
      console.log('✅ WORDS LOADED:', words);
      setSelectedWords(words);
      
      // Load user profile
      const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
      let userProfile = null;
      
      if (userId) {
        userProfile = await UserProfileManager.getOrCreateProfile(userId);
        console.log('✅ Profile loaded');
      }
      
      // Build interactions (defensive)
      const threeStepInteractions: any[] = [];
      for (const word of words) {
        try {
          console.log('Building interaction for:', word);
          const interaction = ThreeStepSessionBuilder && typeof ThreeStepSessionBuilder.buildInteraction === 'function'
            ? ThreeStepSessionBuilder.buildInteraction(word, userProfile)
            : { word, definition: { text: word.definition || word.word || word, partOfSpeech: word.partOfSpeech || 'noun' }, task: { type: 'scenario', prompt: word.definition || word.word || '', context: 'general', instruction: 'Respond' }, anchor: { type: 'story_fragment', prompt: '', scene: '', context: 'general', reflection: '' } };

          threeStepInteractions.push(interaction);
        } catch (e) {
          console.error('Error building interaction for word:', word, e);
          // fallback minimal interaction to avoid breaking the whole session
          threeStepInteractions.push({ word: word.word || word.text || String(word), definition: { text: word.definition || '', partOfSpeech: 'noun' }, task: { type: 'scenario', prompt: word.definition || '', context: 'general', instruction: 'Respond' }, anchor: { type: 'story_fragment', prompt: '', scene: '', context: 'general', reflection: '' } });
        }
      }

      console.log('✅ Built', threeStepInteractions.length, 'interactions');
      setInteractions(threeStepInteractions);
      setIsLoading(false);
      
    } catch (err) {
      console.error('❌ Fatal error:', err);
      setError('Failed to load session: ' + (err as Error).message);
      setIsLoading(false);
    }
  };

  const advanceToNext = (response: any) => {
    console.log('Completed step:', response);
    setCurrentIndex(prev => prev + 1);
  };

  const handleReturnToSelection = () => {
    // Clear stored data
    sessionStorage.clear();
    localStorage.removeItem('selected_words_backup');
    router.push('/');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your session...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Session Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          
          <div className="space-y-3">
            <button
              onClick={handleReturnToSelection}
              className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
            >
              Return to Word Selection
            </button>
          </div>

          {/* Debug info */}
          <div className="mt-6 p-4 bg-gray-100 rounded text-left text-xs font-mono overflow-auto max-h-40">
            <p>Selected words: {selectedWords.length}</p>
            <p>sessionStorage: {sessionStorage.getItem('selected_words') ? 'exists' : 'empty'}</p>
            <p>localStorage: {localStorage.getItem('selected_words_backup') ? 'exists' : 'empty'}</p>
            <p>URL params: {searchParams.toString() || 'empty'}</p>
          </div>
        </div>
      </div>
    );
  }

  // Complete
  if (currentIndex >= interactions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Session Complete!</h2>
          <p className="text-gray-600 mb-6">
            You explored {interactions.length} words
          </p>
          <button
            onClick={handleReturnToSelection}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium"
          >
            Explore More Words
          </button>
        </div>
      </div>
    );
  }

  const currentInteraction = interactions[currentIndex];

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
          style={{ width: `${((currentIndex + 1) / interactions.length) * 100}%` }}
        />
      </div>

      <ThreeStepFlow
        interaction={currentInteraction}
        onComplete={advanceToNext}
      />

      <div className="fixed bottom-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg text-sm font-medium">
        {currentIndex + 1} / {interactions.length}
      </div>
    </div>
  );
}
