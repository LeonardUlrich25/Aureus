'use client';

import { useEffect, useState } from 'react';
import { useUserProfile, getOrCreateUserId } from '@/hooks/useUserProfile';
import { AIAdaptationEngine } from '@/lib/aiAdaptationEngine';

/**
 * Example component demonstrating AI-powered personalization
 * 
 * This shows how to integrate:
 * 1. User profile tracking
 * 2. AI word recommendations
 * 3. Journey insights
 * 4. Event tracking
 */
export default function PersonalizationExample() {
  const userId = getOrCreateUserId();
  const {
    profile,
    loading,
    trackWordSelection,
    trackSessionCompletion
  } = useUserProfile(userId);

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<any[]>([]);

  // Example word database (replace with your actual data)
  const wordDatabase = [
    { id: 1, word: 'ephemeral', difficulty: 7, cluster: 'abstract' },
    { id: 2, word: 'pragmatic', difficulty: 6, cluster: 'professional' },
    { id: 3, word: 'serendipity', difficulty: 8, cluster: 'emotions' },
    // ... more words
  ];

  useEffect(() => {
    if (profile && profile.wordHistory && profile.wordHistory.length > 5) {
      loadPersonalizedContent();
    }
  }, [profile]);

  /**
   * Load AI-powered recommendations and insights
   */
  const loadPersonalizedContent = async () => {
    if (!profile) return;

    try {
      // Generate word recommendations
      // Note: Pass your Anthropic API key as 4th parameter in production
      const words = await AIAdaptationEngine.generateWordRecommendations(
        userId,
        profile,
        wordDatabase
        // process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY // Add this in production
      );
      setRecommendations(words);

      // Generate journey insights
      const journeyInsights = await AIAdaptationEngine.generateJourneyInsights(
        profile
        // process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY // Add this in production
      );
      setInsights(journeyInsights);
    } catch (err) {
      console.error('Failed to load personalized content:', err);
    }
  };

  /**
   * Handle word selection
   */
  const handleWordSelect = (word: any) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w.id !== word.id));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  /**
   * Start session with tracking
   */
  const startSession = async () => {
    if (selectedWords.length === 0) return;

    // Track word selection
    await trackWordSelection(
      selectedWords,
      recommendations,
      { selectionDuration: Date.now() }
    );

    console.log('🚀 Starting session with tracked words:', selectedWords);
    // Continue to your session...
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your personalized experience...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Failed to load profile</p>
      </div>
    );
  }

  // Show analysis
  const params = {
    recommendedWordCount: 5,
    suggestedDifficulty: { min: 5, max: 8 },
    priorityClusters: ['work', 'learning']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Profile Summary */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Your Learning Profile
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6">
              <div className="text-sm text-blue-700 mb-2">Vocabulary Level</div>
              <div className="text-3xl font-bold text-blue-900">
                {profile.vocabularyLevel.estimatedLevel}/10
              </div>
              <div className="text-sm text-blue-600 mt-2">
                Confidence: {(profile.vocabularyLevel.confidence * 100).toFixed(0)}%
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6">
              <div className="text-sm text-purple-700 mb-2">Words Explored</div>
              <div className="text-3xl font-bold text-purple-900">
                {profile.wordHistory.length}
              </div>
              <div className="text-sm text-purple-600 mt-2">
                words in history
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6">
              <div className="text-sm text-pink-700 mb-2">Completion Rate</div>
              <div className="text-3xl font-bold text-pink-900">
                {((profile.wordHistory.filter(w => w.completed).length / Math.max(1, profile.wordHistory.length)) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-pink-600 mt-2">
                Avg {params.recommendedWordCount} words/session
              </div>
            </div>
          </div>
        </div>

        {/* Journey Insights */}
        {insights.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              🌟 Your Journey Insights
            </h3>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-l-4 border-purple-500"
                >
                  <p className="text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        {recommendations.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              🤖 AI-Powered Recommendations
            </h3>
            <p className="text-gray-600 mb-6">
              These words are personalized for your level ({params.suggestedDifficulty.min}-{params.suggestedDifficulty.max}) 
              and interests: {params.priorityClusters.join(', ')}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {recommendations.slice(0, 12).map((word) => (
                <button
                  key={word.id}
                  onClick={() => handleWordSelect(word)}
                  className={`
                    px-6 py-4 rounded-2xl font-medium text-lg transition-all
                    ${selectedWords.includes(word)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {word.word}
                </button>
              ))}
            </div>
            
            {selectedWords.length > 0 && (
              <button
                onClick={startSession}
                className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-transform"
              >
                Start Session with {selectedWords.length} Words →
              </button>
            )}
          </div>
        )}

        {/* Debug Info (remove in production) */}
        <div className="bg-gray-100 rounded-2xl p-6 text-sm">
          <details>
            <summary className="font-bold text-gray-700 cursor-pointer mb-4">
              🔍 Debug Information
            </summary>
            <pre className="text-xs overflow-auto">
              {JSON.stringify({ profile, params }, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
}
