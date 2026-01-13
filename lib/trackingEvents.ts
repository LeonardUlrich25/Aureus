import { UserProfile } from './userProfile';

export interface UserEvent {
  type: string;
  userId: string;
  timestamp: string;
  data: any;
}

export class UserEventTracker {
  
  /**
   * Track word selection event
   */
  static async trackWordSelection(
    userId: string,
    selectedWords: any[],
    availableWords: any[],
    sessionContext: any
  ): Promise<UserEvent> {
    console.log('📊 Tracking word selection:', { userId, count: selectedWords.length });
    
    const event: UserEvent = {
      type: 'word_selection',
      userId,
      timestamp: new Date().toISOString(),
      data: {
        selectedWords: selectedWords.map((w, index) => ({
          word: w.word,
          difficulty: w.difficulty || 5,
          cluster: w.cluster,
          position: availableWords.indexOf(w),
          selectionOrder: index
        })),
        selectionCount: selectedWords.length,
        totalAvailable: availableWords.length,
        clusterDistribution: this.analyzeClusterDistribution(selectedWords),
        difficultyRange: this.analyzeDifficultyRange(selectedWords),
        selectionSpeed: sessionContext?.selectionDuration || 0
      }
    };
    
    // Store event
    await this.storeEvent(event);
    
    console.log('✅ Word selection tracked');
    
    return event;
  }
  
  /**
   * Track mini-session completion
   */
  static async trackMiniSessionCompletion(
    userId: string,
    sessionData: {
      wordsCompleted: number;
      totalWords: number;
      duration: number;
      modes: string[];
      avgTimePerInteraction: number;
      skippedInteractions: number;
      totalInteractions: number;
      userInputLength: number;
    }
  ): Promise<UserEvent> {
    console.log('📊 Tracking session completion:', { userId, completion: sessionData.wordsCompleted });
    
    const event: UserEvent = {
      type: 'mini_session_completed',
      userId,
      timestamp: new Date().toISOString(),
      data: {
        wordsCompleted: sessionData.wordsCompleted,
        totalWords: sessionData.totalWords,
        completionRate: sessionData.wordsCompleted / sessionData.totalWords,
        timeSpent: sessionData.duration,
        modesExperienced: sessionData.modes,
        engagementSignals: {
          interactionDepth: sessionData.avgTimePerInteraction,
          skipRate: sessionData.skippedInteractions / sessionData.totalInteractions,
          thoughtfulness: sessionData.userInputLength
        }
      }
    };
    
    await this.storeEvent(event);
    
    console.log('✅ Session completion tracked');
    
    return event;
  }
  
  /**
   * Track individual interaction within session
   */
  static async trackInteraction(
    userId: string,
    interactionData: {
      word: string;
      mode: string;
      displayType: string;
      timeSpent: number;
      completed: boolean;
      userResponse: any;
    }
  ): Promise<UserEvent> {
    const event: UserEvent = {
      type: 'interaction',
      userId,
      timestamp: new Date().toISOString(),
      data: interactionData
    };
    
    await this.storeEvent(event);
    
    return event;
  }
  
  /**
   * Analyze cluster distribution
   */
  private static analyzeClusterDistribution(words: any[]): Record<string, number> {
    const distribution: Record<string, number> = {};
    words.forEach(w => {
      const cluster = w.cluster || 'unknown';
      distribution[cluster] = (distribution[cluster] || 0) + 1;
    });
    return distribution;
  }
  
  /**
   * Analyze difficulty range
   */
  private static analyzeDifficultyRange(words: any[]): {
    min: number;
    max: number;
    avg: number;
    variance: number;
  } {
    const difficulties = words.map(w => w.difficulty || 5);
    
    if (difficulties.length === 0) {
      return { min: 5, max: 5, avg: 5, variance: 0 };
    }
    
    return {
      min: Math.min(...difficulties),
      max: Math.max(...difficulties),
      avg: difficulties.reduce((a, b) => a + b, 0) / difficulties.length,
      variance: this.calculateVariance(difficulties)
    };
  }
  
  /**
   * Calculate variance
   */
  private static calculateVariance(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    
    const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    return numbers.reduce((sum, n) => sum + Math.pow(n - avg, 2), 0) / numbers.length;
  }
  
  /**
   * Store event to localStorage (or your preferred storage)
   */
  private static async storeEvent(event: UserEvent): Promise<void> {
    try {
      const eventsKey = `user_events:${event.userId}`;
      const existingData = localStorage.getItem(eventsKey);
      const events: UserEvent[] = existingData ? JSON.parse(existingData) : [];
      
      events.push(event);
      
      // Keep last 100 events
      const recentEvents = events.slice(-100);
      localStorage.setItem(eventsKey, JSON.stringify(recentEvents));
      
      console.log(`📝 Event stored: ${event.type}`);
    } catch (err) {
      console.error('❌ Failed to store event:', err);
    }
  }
  
  /**
   * Get user events
   */
  static async getUserEvents(userId: string, limit?: number): Promise<UserEvent[]> {
    try {
      const eventsKey = `user_events:${userId}`;
      const existingData = localStorage.getItem(eventsKey);
      const events: UserEvent[] = existingData ? JSON.parse(existingData) : [];
      
      return limit ? events.slice(-limit) : events;
    } catch (err) {
      console.error('❌ Failed to get user events:', err);
      return [];
    }
  }
  
  /**
   * Update user profile based on events
   */
  static async updateUserProfile(userId: string, profile: UserProfile, event: UserEvent): Promise<UserProfile> {
    const updatedProfile = { ...profile };
    updatedProfile.lastActive = new Date().toISOString();
    
    if (event.type === 'word_selection') {
      // Update cluster preferences
      const { clusterDistribution } = event.data;
      Object.keys(clusterDistribution).forEach(cluster => {
        if (!updatedProfile.clusterPreferences[cluster]) {
          updatedProfile.clusterPreferences[cluster] = {
            timesSelected: 0,
            timesAvailable: 0,
            completionRate: 0,
            lastSelected: event.timestamp,
            weight: 0.5
          };
        }
        updatedProfile.clusterPreferences[cluster].timesSelected += clusterDistribution[cluster];
        updatedProfile.clusterPreferences[cluster].lastSelected = event.timestamp;
      });
      
      // Update word history
      event.data.selectedWords.forEach((w: any) => {
        updatedProfile.wordHistory.push({
          word: w.word,
          difficulty: w.difficulty,
          cluster: w.cluster,
          selectedAt: event.timestamp,
          completed: false,
          timeSpent: 0
        });
      });
    }
    
    if (event.type === 'mini_session_completed') {
      // Update session patterns
      const avgWords = updatedProfile.sessionHistory.averageWordsPerSession;
      const newAvg = (avgWords + event.data.wordsCompleted) / 2;
      updatedProfile.sessionHistory.averageWordsPerSession = newAvg;
      
      const avgCompletion = updatedProfile.sessionHistory.completionRate;
      const newCompletion = (avgCompletion + event.data.completionRate) / 2;
      updatedProfile.sessionHistory.completionRate = newCompletion;
      updatedProfile.sessionHistory.totalSessions += 1;
    }
    
    return updatedProfile;
  }
}
