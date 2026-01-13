// /lib/behaviorTracker.ts - Track user actions and update profile

import { UserProfile, UserProfileManager } from './userProfile';

export class BehaviorTracker {
  
  /**
   * Track word selection event
   */
  static async trackWordSelection(
    userId: string,
    selectedWords: any[],
    availableWords: any[]
  ): Promise<void> {
    console.log('📊 Tracking word selection:', selectedWords.length, 'words');
    
    const profile = await UserProfileManager.getOrCreateProfile(userId);
    
    // Update cluster preferences
    this.updateClusterPreferences(profile, selectedWords, availableWords);
    // Update context preferences (learned interests)
    this.updateContextPreferences(profile, selectedWords);
    
    // Update difficulty profile
    this.updateDifficultyProfile(profile, selectedWords);
    
    // Add to word history
    selectedWords.forEach(word => {
      profile.wordHistory.push({
        word: word.word || word.text,
        difficulty: word.difficulty || 5,
        cluster: word.cluster || 'general',
        selectedAt: new Date().toISOString(),
        completed: false // will be updated on session completion
      });
    });
    
    // Keep only last 50 words
    if (profile.wordHistory.length > 50) {
      profile.wordHistory = profile.wordHistory.slice(-50);
    }
    
    // Update session count
    profile.sessionHistory.totalSessions += 1;
    
    // Update average words per session
    const prevTotal = profile.sessionHistory.averageWordsPerSession * 
                      (profile.sessionHistory.totalSessions - 1);
    profile.sessionHistory.averageWordsPerSession = 
      (prevTotal + selectedWords.length) / profile.sessionHistory.totalSessions;
    
    await UserProfileManager.saveProfile(profile);
    
    console.log('✅ Profile updated after selection');
    console.log('   - Top clusters:', this.getTopClusters(profile, 3));
    console.log('   - Difficulty range:', profile.difficultyProfile.comfortRange);
  }

  /**
   * Update context preferences based on user's selected words.
   * This infers high-level contexts (work/academic/creative/social/technical)
   * from cluster names and updates an exponential moving average.
   */
  private static updateContextPreferences(
    profile: UserProfile,
    selectedWords: any[]
  ): void {
    if (!profile.contextPreferences) {
      profile.contextPreferences = {
        work: 0.2,
        academic: 0.2,
        creative: 0.2,
        social: 0.2,
        technical: 0.2
      };
    }

    const contextMapping: Record<string, string> = {
      'business': 'work',
      'professional': 'work',
      'management': 'work',
      'academic': 'academic',
      'research': 'academic',
      'science': 'academic',
      'art': 'creative',
      'design': 'creative',
      'creative': 'creative',
      'relationships': 'social',
      'emotions': 'social',
      'communication': 'social',
      'technology': 'technical',
      'engineering': 'technical',
      'programming': 'technical'
    };

    const contextCounts: Record<string, number> = {};
    selectedWords.forEach(word => {
      const cluster = (word.cluster || '').toLowerCase();
      const context = contextMapping[cluster] || 'general';
      if (context !== 'general') {
        contextCounts[context] = (contextCounts[context] || 0) + 1;
      }
    });

    const alpha = 0.3; // learning rate
    Object.keys(profile.contextPreferences).forEach(context => {
      const signal = contextCounts[context] ? contextCounts[context] / selectedWords.length : 0;
      profile.contextPreferences![context] =
        (alpha * signal) + ((1 - alpha) * profile.contextPreferences![context]);
    });

    // Normalize
    const total = Object.values(profile.contextPreferences).reduce((a, b) => a + b, 0);
    if (total > 0) {
      Object.keys(profile.contextPreferences).forEach(context => {
        profile.contextPreferences![context] /= total;
      });
    }
  }
  
  /**
   * Track session completion
   */
  static async trackSessionCompletion(
    userId: string,
    completedWords: string[],
    totalWords: number,
    durationSeconds: number
  ): Promise<void> {
    console.log('✅ Tracking session completion:', completedWords.length, '/', totalWords);
    
    const profile = await UserProfileManager.getOrCreateProfile(userId);
    
    // Mark completed words in history
    profile.wordHistory.forEach(wordRecord => {
      if (completedWords.includes(wordRecord.word) && !wordRecord.completed) {
        wordRecord.completed = true;
        wordRecord.timeSpent = durationSeconds / completedWords.length;
      }
    });
    
    // Update completion rate
    const completionRate = completedWords.length / totalWords;
    const prevSessions = profile.sessionHistory.totalSessions - 1;
    const prevTotal = profile.sessionHistory.completionRate * prevSessions;
    profile.sessionHistory.completionRate = 
      (prevTotal + completionRate) / profile.sessionHistory.totalSessions;
    
    // Update average session duration
    const prevDurationTotal = profile.sessionHistory.averageSessionDuration * prevSessions;
    profile.sessionHistory.averageSessionDuration = 
      (prevDurationTotal + durationSeconds) / profile.sessionHistory.totalSessions;
    
    // Update cluster completion rates
    completedWords.forEach(word => {
      const wordRecord = profile.wordHistory.find(w => w.word === word);
      if (wordRecord) {
        const cluster = profile.clusterPreferences[wordRecord.cluster];
        if (cluster) {
          // Recalculate completion rate for this cluster
          const clusterWords = profile.wordHistory.filter(w => w.cluster === wordRecord.cluster);
          const completedClusterWords = clusterWords.filter(w => w.completed);
          cluster.completionRate = completedClusterWords.length / clusterWords.length;
        }
      }
    });
    
    // Recalculate difficulty sweet spot
    this.recalculateSweetSpot(profile);
    
    // Recalculate vocabulary level estimate
    this.recalculateVocabularyLevel(profile);
    
    await UserProfileManager.saveProfile(profile);
    
    console.log('✅ Profile updated after completion');
    console.log('   - Overall completion rate:', (profile.sessionHistory.completionRate * 100).toFixed(0) + '%');
    console.log('   - Estimated level:', profile.vocabularyLevel.estimatedLevel.toFixed(1));
  }
  
  /**
   * Update cluster preferences based on selection
   */
  private static updateClusterPreferences(
    profile: UserProfile,
    selectedWords: any[],
    availableWords: any[]
  ): void {
    // Count how many times each cluster appeared
    const availableClusters = new Map<string, number>();
    availableWords.forEach(word => {
      const cluster = word.cluster || 'general';
      availableClusters.set(cluster, (availableClusters.get(cluster) || 0) + 1);
    });
    
    // Track selections
    selectedWords.forEach(word => {
      const cluster = word.cluster || 'general';
      
      if (!profile.clusterPreferences[cluster]) {
        profile.clusterPreferences[cluster] = {
          timesSelected: 0,
          timesAvailable: 0,
          completionRate: 1.0,
          lastSelected: '',
          weight: 0.5
        };
      }
      
      profile.clusterPreferences[cluster].timesSelected += 1;
      profile.clusterPreferences[cluster].lastSelected = new Date().toISOString();
    });
    
    // Update availability counts
    availableClusters.forEach((count, cluster) => {
      if (!profile.clusterPreferences[cluster]) {
        profile.clusterPreferences[cluster] = {
          timesSelected: 0,
          timesAvailable: 0,
          completionRate: 1.0,
          lastSelected: '',
          weight: 0.5
        };
      }
      profile.clusterPreferences[cluster].timesAvailable += count;
    });
    
    // Recalculate weights (selection rate * completion rate)
    Object.entries(profile.clusterPreferences).forEach(([cluster, data]) => {
      const selectionRate = data.timesAvailable > 0 
        ? data.timesSelected / data.timesAvailable 
        : 0;
      
      // Weight = selection rate (how often chosen) * completion rate (how well completed)
      data.weight = selectionRate * data.completionRate;
    });
  }
  
  /**
   * Update difficulty profile
   */
  private static updateDifficultyProfile(
    profile: UserProfile,
    selectedWords: any[]
  ): void {
    const difficulties = selectedWords.map(w => w.difficulty || 5);
    
    // Update bounds
    const minDiff = Math.min(...difficulties);
    const maxDiff = Math.max(...difficulties);
    
    profile.difficultyProfile.lowestSelected = Math.min(
      profile.difficultyProfile.lowestSelected,
      minDiff
    );
    profile.difficultyProfile.highestSelected = Math.max(
      profile.difficultyProfile.highestSelected,
      maxDiff
    );
    
    // Update average
    const avgDiff = difficulties.reduce((a, b) => a + b, 0) / difficulties.length;
    const prevAvg = profile.difficultyProfile.averageSelected;
    const sessionCount = profile.sessionHistory.totalSessions;
    
    profile.difficultyProfile.averageSelected = 
      ((prevAvg * (sessionCount - 1)) + avgDiff) / sessionCount;
    
    // Update comfort range (based on what they select most)
    const recentDifficulties = profile.wordHistory
      .slice(-30)
      .map(w => w.difficulty);
    
    if (recentDifficulties.length >= 10) {
      recentDifficulties.sort((a, b) => a - b);
      const p25 = recentDifficulties[Math.floor(recentDifficulties.length * 0.25)];
      const p75 = recentDifficulties[Math.floor(recentDifficulties.length * 0.75)];
      profile.difficultyProfile.comfortRange = [p25, p75];
    }
  }
  
  /**
   * Recalculate difficulty sweet spot (best completion rate)
   */
  private static recalculateSweetSpot(profile: UserProfile): void {
    const completedWords = profile.wordHistory.filter(w => w.completed);
    
    if (completedWords.length < 5) {
      // Not enough data yet
      return;
    }
    
    // Group by difficulty level
    const difficultyGroups = new Map<number, { completed: number; total: number }>();
    
    profile.wordHistory.forEach(word => {
      const diffLevel = Math.round(word.difficulty);
      if (!difficultyGroups.has(diffLevel)) {
        difficultyGroups.set(diffLevel, { completed: 0, total: 0 });
      }
      const group = difficultyGroups.get(diffLevel)!;
      group.total += 1;
      if (word.completed) group.completed += 1;
    });
    
    // Find difficulty with highest completion rate (minimum 3 attempts)
    let bestDifficulty = profile.difficultyProfile.averageSelected;
    let bestRate = 0;
    
    difficultyGroups.forEach((stats, difficulty) => {
      if (stats.total >= 3) {
        const rate = stats.completed / stats.total;
        if (rate > bestRate) {
          bestRate = rate;
          bestDifficulty = difficulty;
        }
      }
    });
    
    profile.difficultyProfile.sweetSpot = bestDifficulty;
  }
  
  /**
   * Estimate vocabulary level based on word selections
   */
  private static recalculateVocabularyLevel(profile: UserProfile): void {
    const recentWords = profile.wordHistory.slice(-20);
    
    if (recentWords.length < 5) {
      // Not enough data
      return;
    }
    
    // Base estimate on average difficulty they select and complete
    const completedWords = recentWords.filter(w => w.completed);
    const avgCompletedDifficulty = completedWords.length > 0
      ? completedWords.reduce((sum, w) => sum + w.difficulty, 0) / completedWords.length
      : 5;
    
    const completionRate = completedWords.length / recentWords.length;
    
    // If they complete hard words well, level is high
    // If they struggle with easy words, level is low
    let estimatedLevel = avgCompletedDifficulty;
    
    // Adjust based on completion rate
    if (completionRate < 0.5) {
      estimatedLevel -= 1; // struggling
    } else if (completionRate > 0.9) {
      estimatedLevel += 0.5; // excelling
    }
    
    // Clamp to 1-10
    estimatedLevel = Math.max(1, Math.min(10, estimatedLevel));
    
    // Update confidence based on data quantity
    const confidence = Math.min(1.0, recentWords.length / 30);
    
    profile.vocabularyLevel.estimatedLevel = estimatedLevel;
    profile.vocabularyLevel.confidence = confidence;
    profile.vocabularyLevel.lastCalculated = new Date().toISOString();
  }
  
  /**
   * Get top N clusters by weight
   */
  static getTopClusters(profile: UserProfile, n: number = 3): string[] {
    return Object.entries(profile.clusterPreferences)
      .sort(([, a], [, b]) => b.weight - a.weight)
      .slice(0, n)
      .map(([cluster]) => cluster);
  }
}
