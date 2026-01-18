'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PersonalizationEngine } from '@/lib/personalizationEngine';
import { BehaviorTracker } from '@/lib/behaviorTracker';
import { UserProfileManager } from '@/lib/userProfile';
import { vocabularyClusters } from '@/data/vocabulary';
import { FloatingWordPill } from './FloatingWordPill';

export default function OpeningScreen() {
  const router = useRouter();
  
  const [userId] = useState(() => {
    if (typeof window === 'undefined') return '';
    
    let id = localStorage.getItem('userId');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', id);
    }
    return id;
  });
  
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  
  const loadWordDatabase = async () => {
    // Using vocabulary clusters as the data source
    return vocabularyClusters.flatMap(cluster => 
      cluster.words.map(w => ({ 
        ...w, 
        cluster: cluster.name,
        clusterColor: cluster.fillColor 
      }))
    );
  };
  
  useEffect(() => {
    if (userId) {
      loadPersonalizedWords();
    }
  }, [userId]);
  
  const loadPersonalizedWords = async () => {
    setIsLoading(true);
    
    try {
      const userProfile = await UserProfileManager.getOrCreateProfile(userId);
      setProfile(userProfile);
      
      const allWords = await loadWordDatabase();
      
      const recs = await PersonalizationEngine.generateRecommendations(
        userId,
        allWords,
        20
      );
      
      // Not storing displayed words separately, using clusters directly
      setRecommendations(recs);
      
      console.log('✅ Loaded personalized words:', recs.reasoning);
      
    } catch (err) {
      console.error('❌ Failed to load personalized words:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleWordSelect = (wordText: string) => {
    if (selectedWords.includes(wordText)) {
      setSelectedWords(selectedWords.filter(w => w !== wordText));
    } else {
      setSelectedWords([...selectedWords, wordText]);
    }
  };
  
  const handleStartSession = async () => {
    if (selectedWords.length < 3) return;
    
    // SILENT BACKGROUND TRACKING (non-blocking)
    try {
      await BehaviorTracker.trackWordSelection(
        userId,
        selectedWords,
        selectedWords
      );
      console.log('✅ Selection tracked silently');
    } catch (err) {
      console.error('Tracking failed (non-critical):', err);
    }

    // Store selected words and session metadata for the mini-session
    sessionStorage.setItem('selected_words', JSON.stringify(selectedWords));
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('session_start_time', Date.now().toString());

    router.push('/session');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-stone-800 mx-auto mb-4"></div>
          <p className="text-stone-600">Personalizing your word selection...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-stone-50 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        
        {/* Header - Centered */}
        <h1 className="text-center text-lg font-medium text-stone-800 mb-2">
          Noema
        </h1>

        <p className="text-center text-red-600 text-base font-medium mb-6">
          test
        </p>

        <p className="text-center text-base text-stone-400 mb-12 italic" style={{ letterSpacing: "0.02em" }}>
          Select 3+ expressions to refine
        </p>

        {/* Personalization Note */}
        {recommendations && profile?.sessionHistory?.totalSessions > 1 && (
          <div className="mb-12 text-center">
            <p className="text-sm text-stone-500">
              🎯 Personalized for your learning journey
            </p>
          </div>
        )}

        {/* Clusters section container with mobile/desktop variants */}
        <div className="md:block">
          {/* Desktop: Fluid scattered constellation layout */}
          <div className="hidden md:block relative" style={{ minHeight: '800px' }}>
            {vocabularyClusters.map((cluster, clusterIdx) => {
              // Position each cluster at different locations
              const clusterPositions = [
                { top: '0px', left: '0px' },      // First cluster: top-left
                { top: '280px', left: '150px' },   // Second cluster: middle, offset right
                { top: '140px', right: '0px' },    // Third cluster: upper-right
              ];
              
              const position = clusterPositions[clusterIdx] || { top: '0px', left: '0px' };
              
              return (
                <div 
                  key={cluster.id} 
                  className="absolute"
                  style={{
                    ...position,
                    maxWidth: '500px'
                  }}
                >
                  {/* Scattered header */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-2xl">{cluster.emoji}</span>
                    <h3 className="font-bold text-xl">{cluster.name}</h3>
                  </div>
                  
                  {/* Pills in flexible wrap layout */}
                  <div className="flex flex-wrap gap-4">
                    {cluster.words.map((wordObj) => (
                      <FloatingWordPill
                        key={wordObj.word}
                        word={wordObj.word}
                        clusterColor={cluster.fillColor}
                        isSelected={selectedWords.includes(wordObj.word)}
                        selectionIndex={selectedWords.indexOf(wordObj.word)}
                        totalSelected={selectedWords.length}
                        onClick={() => handleWordSelect(wordObj.word)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: Vertical freeform constellation layout with absolute positioning */}
          <div className="block md:hidden pb-32 relative">
            <div className="relative min-h-[900px]">
              
              {/* Cluster 0 (upper) */}
              {vocabularyClusters[0] && (
                <>
                  {/* Upper header - top-left area */}
                  <div className="absolute" style={{ top: '30px', left: '16px' }}>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-xl">{vocabularyClusters[0].emoji}</span>
                      <h3 className="font-semibold text-base">{vocabularyClusters[0].name}</h3>
                    </div>
                  </div>
                  
                  {/* Upper pills - single vertical column with organic offsets */}
                  {vocabularyClusters[0].words.map((wordObj, idx) => {
                    // Single column with varied horizontal offsets to avoid straight line
                    const randomXOffset = (Math.random() - 0.5) * 80; // Random ±40px for more spacing
                    return (
                      <div 
                        key={wordObj.word}
                        className="absolute"
                        style={{
                          top: `${60 + idx * 60}px`,
                          left: `${50 + randomXOffset}px`,
                        }}
                      >
                        <FloatingWordPill
                          word={wordObj.word}
                          clusterColor={vocabularyClusters[0].fillColor}
                          isSelected={selectedWords.includes(wordObj.word)}
                          selectionIndex={selectedWords.indexOf(wordObj.word)}
                          totalSelected={selectedWords.length}
                          onClick={() => handleWordSelect(wordObj.word)}
                        />
                      </div>
                    );
                  })}
                </>
              )}

              {/* Cluster 1 (middle) */}
              {vocabularyClusters[1] && (
                <>
                  {/* Middle header - middle-left area */}
                  <div className="absolute" style={{ top: '320px', left: '16px' }}>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-xl">{vocabularyClusters[1].emoji}</span>
                      <h3 className="font-semibold text-base">{vocabularyClusters[1].name}</h3>
                    </div>
                  </div>
                  
                  {/* Middle pills - single vertical column with organic offsets */}
                  {vocabularyClusters[1].words.map((wordObj, idx) => {
                    // Single column with varied horizontal offsets to avoid straight line
                    const randomXOffset = (Math.random() - 0.5) * 80; // Random ±40px for more spacing
                    return (
                      <div 
                        key={wordObj.word}
                        className="absolute"
                        style={{
                          top: `${350 + idx * 60}px`,
                          left: `${50 + randomXOffset}px`,
                        }}
                      >
                        <FloatingWordPill
                          word={wordObj.word}
                          clusterColor={vocabularyClusters[1].fillColor}
                          isSelected={selectedWords.includes(wordObj.word)}
                          selectionIndex={selectedWords.indexOf(wordObj.word)}
                          totalSelected={selectedWords.length}
                          onClick={() => handleWordSelect(wordObj.word)}
                        />
                      </div>
                    );
                  })}
                </>
              )}

              {/* Cluster 2 (lower) */}
              {vocabularyClusters[2] && (
                <>
                  {/* Lower header - lower-left area */}
                  <div className="absolute" style={{ top: '610px', left: '16px' }}>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-xl">{vocabularyClusters[2].emoji}</span>
                      <h3 className="font-semibold text-base">{vocabularyClusters[2].name}</h3>
                    </div>
                  </div>
                  
                  {/* Lower pills - single vertical column with organic offsets */}
                  {vocabularyClusters[2].words.map((wordObj, idx) => {
                    // Single column with varied horizontal offsets to avoid straight line
                    const randomXOffset = (Math.random() - 0.5) * 80; // Random ±40px for more spacing
                    return (
                      <div 
                        key={wordObj.word}
                        className="absolute"
                        style={{
                          top: `${640 + idx * 60}px`,
                          left: `${50 + randomXOffset}px`,
                        }}
                      >
                        <FloatingWordPill
                          word={wordObj.word}
                          clusterColor={vocabularyClusters[2].fillColor}
                          isSelected={selectedWords.includes(wordObj.word)}
                          selectionIndex={selectedWords.indexOf(wordObj.word)}
                          totalSelected={selectedWords.length}
                          onClick={() => handleWordSelect(wordObj.word)}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            
            {/* Mobile-only sticky start bar */}
            <div className="fixed inset-x-0 bottom-0 md:hidden z-50 flex justify-center items-end bg-gradient-to-t from-stone-50 via-stone-50 to-transparent p-4">
              <div className="max-w-sm w-full">
                <button
                  onClick={handleStartSession}
                  disabled={selectedWords.length < 3}
                  type="button"
                  className={`w-full px-6 py-4 rounded-full shadow-lg transition-all duration-300 font-medium text-base
                    ${selectedWords.length >= 3 ? 'bg-stone-800 text-white hover:bg-stone-900 active:scale-95 cursor-pointer' : 'bg-stone-300 text-stone-600 cursor-not-allowed opacity-80'}`}
                >
                  {selectedWords.length >= 3 ? 'Start' : 'Select 3+ words to start'}
                </button>
              </div>
            </div>

            {/* Mobile word count - hidden when start button appears */}
            {selectedWords.length < 3 && (
              <div className="block md:hidden text-center pb-20">
                <p className="text-sm text-stone-500">
                  {selectedWords.length} / 3 selected
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Start Button - Appears when 3+ selected */}
        <div className="hidden md:block">
          {selectedWords.length >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 text-center"
            >
              <button 
                onClick={handleStartSession}
                className="px-12 py-4 bg-stone-800 text-white font-medium text-base tracking-wide rounded-full shadow-lg hover:bg-stone-900 hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                Start
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
