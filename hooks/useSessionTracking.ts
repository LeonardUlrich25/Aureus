'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for tracking session timing and metrics
 * Use this to easily collect session analytics
 */
export function useSessionTracking() {
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [interactionTimes, setInteractionTimes] = useState<number[]>([]);
  const [currentInteractionStart, setCurrentInteractionStart] = useState<number | null>(null);
  const [skippedCount, setSkippedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [userInputLengths, setUserInputLengths] = useState<number[]>([]);
  const [modesUsed, setModesUsed] = useState<Set<string>>(new Set());

  /**
   * Start tracking a session
   */
  const startSession = useCallback(() => {
    console.log('📊 Session tracking started');
    setSessionStartTime(Date.now());
    setInteractionTimes([]);
    setSkippedCount(0);
    setCompletedCount(0);
    setUserInputLengths([]);
    setModesUsed(new Set());
  }, []);

  /**
   * Start tracking an interaction
   */
  const startInteraction = useCallback((mode: string) => {
    setCurrentInteractionStart(Date.now());
    setModesUsed(prev => new Set(prev).add(mode));
  }, []);

  /**
   * Mark interaction as completed
   */
  const completeInteraction = useCallback((userInput?: string) => {
    if (currentInteractionStart) {
      const duration = Date.now() - currentInteractionStart;
      setInteractionTimes(prev => [...prev, duration]);
      setCompletedCount(prev => prev + 1);
      
      if (userInput) {
        setUserInputLengths(prev => [...prev, userInput.length]);
      }
    }
    setCurrentInteractionStart(null);
  }, [currentInteractionStart]);

  /**
   * Mark interaction as skipped
   */
  const skipInteraction = useCallback(() => {
    setSkippedCount(prev => prev + 1);
    setCurrentInteractionStart(null);
  }, []);

  /**
   * Get session metrics
   */
  const getMetrics = useCallback(() => {
    const totalDuration = sessionStartTime ? Date.now() - sessionStartTime : 0;
    const totalInteractions = interactionTimes.length + skippedCount;
    const avgInteractionTime = interactionTimes.length > 0
      ? interactionTimes.reduce((a, b) => a + b, 0) / interactionTimes.length
      : 0;
    const avgInputLength = userInputLengths.length > 0
      ? Math.round(userInputLengths.reduce((a, b) => a + b, 0) / userInputLengths.length)
      : 0;

    return {
      duration: totalDuration,
      totalInteractions,
      completedInteractions: completedCount,
      skippedInteractions: skippedCount,
      avgTimePerInteraction: Math.round(avgInteractionTime),
      avgUserInputLength: avgInputLength,
      modesUsed: Array.from(modesUsed),
      completionRate: totalInteractions > 0 ? completedCount / totalInteractions : 0
    };
  }, [sessionStartTime, interactionTimes, skippedCount, completedCount, userInputLengths, modesUsed]);

  /**
   * Reset all metrics
   */
  const reset = useCallback(() => {
    setSessionStartTime(null);
    setInteractionTimes([]);
    setCurrentInteractionStart(null);
    setSkippedCount(0);
    setCompletedCount(0);
    setUserInputLengths([]);
    setModesUsed(new Set());
  }, []);

  return {
    startSession,
    startInteraction,
    completeInteraction,
    skipInteraction,
    getMetrics,
    reset,
    isTracking: sessionStartTime !== null
  };
}

/**
 * Hook for tracking word selection timing
 */
export function useSelectionTracking() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [selections, setSelections] = useState<Array<{ word: any; timestamp: number }>>([]);

  /**
   * Start tracking selections
   */
  const startTracking = useCallback(() => {
    setStartTime(Date.now());
    setSelections([]);
  }, []);

  /**
   * Track a word selection
   */
  const trackSelection = useCallback((word: any) => {
    setSelections(prev => [...prev, { word, timestamp: Date.now() }]);
  }, []);

  /**
   * Get selection metrics
   */
  const getMetrics = useCallback(() => {
    if (!startTime) return null;

    const totalDuration = Date.now() - startTime;
    const avgTimePerSelection = selections.length > 0
      ? totalDuration / selections.length
      : 0;

    return {
      totalDuration,
      selectionCount: selections.length,
      avgTimePerSelection: Math.round(avgTimePerSelection),
      selections: selections.map(s => s.word)
    };
  }, [startTime, selections]);

  /**
   * Reset tracking
   */
  const reset = useCallback(() => {
    setStartTime(null);
    setSelections([]);
  }, []);

  return {
    startTracking,
    trackSelection,
    getMetrics,
    reset,
    isTracking: startTime !== null
  };
}

/**
 * Example usage in SessionScreen component:
 * 
 * const sessionTracking = useSessionTracking();
 * const { profile, trackSessionCompletion } = useUserProfile(userId);
 * 
 * useEffect(() => {
 *   sessionTracking.startSession();
 * }, []);
 * 
 * const handleInteractionStart = (interaction) => {
 *   sessionTracking.startInteraction(interaction.mode);
 * };
 * 
 * const handleInteractionComplete = (userResponse) => {
 *   sessionTracking.completeInteraction(userResponse);
 * };
 * 
 * const handleSessionEnd = async () => {
 *   const metrics = sessionTracking.getMetrics();
 *   
 *   await trackSessionCompletion({
 *     wordsCompleted: completedWords.length,
 *     totalWords: allWords.length,
 *     duration: metrics.duration,
 *     modes: metrics.modesUsed,
 *     avgTimePerInteraction: metrics.avgTimePerInteraction,
 *     skippedInteractions: metrics.skippedInteractions,
 *     totalInteractions: metrics.totalInteractions,
 *     userInputLength: metrics.avgUserInputLength
 *   });
 * };
 */
