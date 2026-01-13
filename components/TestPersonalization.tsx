'use client';

import { useState } from 'react';
import { BehaviorTracker } from '@/lib/behaviorTracker';
import { PersonalizationEngine } from '@/lib/personalizationEngine';

export default function TestPersonalization() {
  const [log, setLog] = useState<string[]>([]);
  const append = (s: string) => setLog(l => [s, ...l]);

  const testPersonalization = async () => {
    const userId = 'test_user_123';

    const mockWordDatabase = [
      { word: 'negotiate', cluster: 'business', difficulty: 6 },
      { word: 'paradigm', cluster: 'academic', difficulty: 8 },
      { word: 'serene', cluster: 'emotional', difficulty: 5 },
      { word: 'leverage', cluster: 'business', difficulty: 7 },
      { word: 'stakeholder', cluster: 'business', difficulty: 7 },
      { word: 'strategy', cluster: 'business', difficulty: 6 },
    ];

    append('🔁 Starting test personalization run');

    try {
      // Session 1
      await BehaviorTracker.trackWordSelection(userId, [
        { word: 'negotiate', cluster: 'business', difficulty: 6 },
        { word: 'leverage', cluster: 'business', difficulty: 7 },
      ], mockWordDatabase);
      append('✔️ Session 1 selection recorded');

      await BehaviorTracker.trackSessionCompletion(userId, ['negotiate', 'leverage'], 2, 120);
      append('✔️ Session 1 completion recorded');

      // Session 2
      await BehaviorTracker.trackWordSelection(userId, [
        { word: 'stakeholder', cluster: 'business', difficulty: 7 },
        { word: 'strategy', cluster: 'business', difficulty: 6 },
      ], mockWordDatabase);
      append('✔️ Session 2 selection recorded');

      await BehaviorTracker.trackSessionCompletion(userId, ['stakeholder', 'strategy'], 2, 140);
      append('✔️ Session 2 completion recorded');

      // Get recommendations
      const recs = await PersonalizationEngine.generateRecommendations(userId, mockWordDatabase, 20);
      append('🎯 Recommendations generated');
      append(JSON.stringify({ reasoning: recs.reasoning, diversity: recs.diversity }, null, 2));

    } catch (err) {
      append('❌ Test failed: ' + String(err));
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-2xl">
      <h3 className="text-lg font-bold mb-2">Dev: Test Personalization</h3>
      <p className="text-sm text-gray-600 mb-4">Runs a 2-session simulation and shows resulting recommendations.</p>

      <div className="flex gap-2 mb-4">
        <button
          className="px-3 py-2 bg-blue-600 text-white rounded"
          onClick={testPersonalization}
        >
          Run Test
        </button>
        <button
          className="px-3 py-2 bg-gray-200 rounded"
          onClick={() => setLog([])}
        >
          Clear
        </button>
      </div>

      <div className="bg-black/5 rounded p-3 h-56 overflow-auto text-xs font-mono">
        {log.length === 0 ? (
          <div className="text-gray-500">No logs yet — run the test.</div>
        ) : (
          log.map((l, i) => <div key={i} className="mb-2">{l}</div>)
        )}
      </div>
    </div>
  );
}
