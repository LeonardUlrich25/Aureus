'use client';

import { useEffect } from 'react';
import { BehaviorTracker } from '@/lib/behaviorTracker';

export function JourneyAnalytics({ sessionContext }: any) {
  useEffect(() => {
    (async () => {
      await trackCompletion();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionContext]);

  const trackCompletion = async () => {
    if (typeof window === 'undefined') return;

    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    if (!sessionContext || !Array.isArray(sessionContext.session_history)) return;

    const completedWords = sessionContext.session_history
      .filter((h: any) => h.userResponse)
      .map((h: any) => h.word);

    const totalWords = sessionContext.session_history.length;

    // Calculate duration (you'll need to track start time)
    const startTime = sessionStorage.getItem('session_start_time');
    const duration = startTime
      ? Math.floor((Date.now() - parseInt(startTime || '0', 10)) / 1000)
      : 0;

    try {
      await BehaviorTracker.trackSessionCompletion(
        userId,
        completedWords,
        totalWords,
        duration
      );

        console.log('✅ Session completion tracked silently');
        console.log(`   - Completed: ${completedWords.length}/${totalWords}`);
        console.log(`   - Duration: ${duration}s`);
    } catch (err) {
      console.error('❌ Failed to track session completion', err);
    }
  };

  return null;
}
