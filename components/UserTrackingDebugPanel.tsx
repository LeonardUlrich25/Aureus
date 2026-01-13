'use client';

import { useState } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserEventTracker } from '@/lib/trackingEvents';
import { ProfileStorage } from '@/lib/aiAdaptationEngine';

/**
 * Development-only debug panel for tracking system
 * Shows profile data, events, and analysis in real-time
 * 
 * Usage: Add to your page during development
 * <UserTrackingDebugPanel userId={userId} />
 */
export function UserTrackingDebugPanel({ userId }: { userId: string }) {
  const { profile } = useUserProfile(userId);
  const [events, setEvents] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const loadEvents = async () => {
    const userEvents = await UserEventTracker.getUserEvents(userId);
    setEvents(userEvents);
  };

  const clearAllData = async () => {
    if (confirm('⚠️ Clear all tracking data? This cannot be undone.')) {
      // Clear profile
      await ProfileStorage.deleteProfile(userId);
      
      // Clear events
      localStorage.removeItem(`user_events:${userId}`);
      
      // Reload page
      window.location.reload();
    }
  };

  const exportData = () => {
    const data = {
      profile,
      events
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aureus-tracking-${userId}-${Date.now()}.json`;
    a.click();
  };

  if (!profile) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-xl shadow-2xl max-w-md">
        <p className="text-sm">Loading profile...</p>
      </div>
    );
  }

  const params = {
    recommendedWordCount: 5,
    suggestedDifficulty: { min: 5, max: 8 }
  };
  const analysis = profile.wordHistory.length > 0
    ? {
        selection_pattern: 'balanced',
        cluster_diversity: 0.7
      }
    : null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white rounded-xl shadow-2xl max-w-md overflow-hidden z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">🔍 Tracking Debug</h3>
            <p className="text-xs text-blue-100">{userId.slice(0, 20)}...</p>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-2xl hover:scale-110 transition-transform"
          >
            {showDetails ? '−' : '+'}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 bg-gray-800 grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {profile.vocabularyLevel.estimatedLevel}
          </div>
          <div className="text-xs text-gray-400">Level</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {profile.wordHistory.length}
          </div>
          <div className="text-xs text-gray-400">Words</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-pink-400">
            {((profile.wordHistory.filter(w => w.completed).length / Math.max(1, profile.wordHistory.length)) * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-gray-400">Rate</div>
        </div>
      </div>

      {/* Detailed Info */}
      {showDetails && (
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {/* Predictions */}
          <div className="bg-gray-800 rounded-lg p-3">
            <h4 className="font-bold text-sm text-blue-400 mb-2">📊 Predictions</h4>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Recommended:</span>
                <span className="text-white">{params.recommendedWordCount} words</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Difficulty:</span>
                <span className="text-white">
                  {params.suggestedDifficulty.min}-{params.suggestedDifficulty.max}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Context:</span>
                <span className="text-white">work</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Top Clusters:</span>
                <span className="text-white text-right text-xs">
                  work, learning
                </span>
              </div>
            </div>
          </div>

          {/* Analysis */}
          {analysis && (
            <div className="bg-gray-800 rounded-lg p-3">
              <h4 className="font-bold text-sm text-purple-400 mb-2">🎯 Analysis</h4>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Pattern:</span>
                  <span className="text-white">{analysis.selection_pattern}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Diversity:</span>
                  <span className="text-white">{(analysis.cluster_diversity * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Recent Events */}
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm text-pink-400">📝 Events</h4>
              <button
                onClick={loadEvents}
                className="text-xs px-2 py-1 bg-pink-600 rounded hover:bg-pink-700"
              >
                Load
              </button>
            </div>
            {events.length > 0 ? (
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {events.slice(-5).reverse().map((event, i) => (
                  <div key={i} className="text-xs text-gray-400 border-l-2 border-pink-600 pl-2">
                    <div className="font-bold text-white">{event.type}</div>
                    <div className="text-xs">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-500">Click Load to view events</div>
            )}
          </div>

          {/* Context Preferences */}
          <div className="bg-gray-800 rounded-lg p-3">
            <h4 className="font-bold text-sm text-green-400 mb-2">🎨 Context Preferences</h4>
            <div className="space-y-1">
              {profile.contextPreferences && Object.entries(profile.contextPreferences)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([context, score]) => (
                  <div key={context} className="flex items-center gap-2">
                    <div className="text-xs text-gray-400 w-20">{context}</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-full"
                        style={{ width: `${score * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-white w-10 text-right">
                      {(score * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={exportData}
              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-bold"
            >
              📥 Export
            </button>
            <button
              onClick={clearAllData}
              className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-bold"
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Simpler mini version for production
 */
export function UserTrackingMiniPanel({ userId }: { userId: string }) {
  const { profile } = useUserProfile(userId);

  if (!profile) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-3 rounded-xl shadow-lg text-xs">
      <div className="flex gap-4">
        <div>
          <span className="text-gray-400">Lvl:</span>{' '}
          <span className="font-bold">{profile.vocabularyLevel.estimatedLevel}</span>
        </div>
        <div>
          <span className="text-gray-400">Words:</span>{' '}
          <span className="font-bold">{profile.wordHistory.length}</span>
        </div>
        <div>
          <span className="text-gray-400">Rate:</span>{' '}
          <span className="font-bold">
            {((profile.wordHistory.filter(w => w.completed).length / Math.max(1, profile.wordHistory.length)) * 100).toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
}
