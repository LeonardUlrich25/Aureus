// /lib/personalizationEngine.ts - Generate recommendations using rules

import { UserProfile, UserProfileManager } from './userProfile';
import { BehaviorTracker } from './behaviorTracker';

export interface WordRecommendation {
  words: any[];
  reasoning: string[];
  diversity: number;
}

export class PersonalizationEngine {
  
  /**
   * Generate personalized word recommendations
   */
  static async generateRecommendations(
    userId: string,
    wordDatabase: any[],
    count: number = 20
  ): Promise<WordRecommendation> {
    console.log('🎯 Generating personalized recommendations for:', userId);
    
    const profile = await UserProfileManager.getOrCreateProfile(userId);
    const reasoning: string[] = [];
    
    // For new users (first 2 sessions), use starter set
    if (profile.sessionHistory.totalSessions < 2) {
      return this.getStarterRecommendations(wordDatabase, count, reasoning);
    }
    
    // Get user preferences
    const topClusters = BehaviorTracker.getTopClusters(profile, 3);
    const comfortRange = profile.difficultyProfile.comfortRange;
    const sweetSpot = profile.difficultyProfile.sweetSpot;
    const completionRate = profile.sessionHistory.completionRate;
    
    console.log('   User preferences:', {
      topClusters,
      comfortRange,
      sweetSpot,
      completionRate: (completionRate * 100).toFixed(0) + '%'
    });
    
    // Score each word
    const scoredWords = wordDatabase.map(word => ({
      word,
      score: this.calculateWordScore(word, profile, topClusters, comfortRange, sweetSpot)
    }));
    
    // Sort by score
    scoredWords.sort((a, b) => b.score - a.score);
    
    // Build recommendation with diversity
    const recommendations = this.buildDiverseSelection(
      scoredWords,
      count,
      topClusters,
      profile
    );
    
    // Generate reasoning
    if (topClusters.length > 0) {
      reasoning.push(`Focused on your interests: ${topClusters.join(', ')}`);
    }
    
    if (comfortRange[1] - comfortRange[0] < 2) {
      reasoning.push(`Matched your preferred difficulty (${Math.round(sweetSpot)})`);
    } else {
      reasoning.push(`Balanced difficulty ${comfortRange[0]}-${comfortRange[1]}`);
    }
    
    if (completionRate < 0.7) {
      reasoning.push('Shorter session to maintain engagement');
    } else if (completionRate > 0.9) {
      reasoning.push('Extended selection - you are on a roll!');
    }
    
    const diversity = this.calculateDiversity(recommendations);
    reasoning.push(`${(diversity * 100).toFixed(0)}% topic diversity for exploration`);
    
    console.log('✅ Generated', recommendations.length, 'recommendations');
    console.log('   Reasoning:', reasoning);
    
    return { words: recommendations, reasoning, diversity };
  }
  
  /**
   * Calculate score for a word based on user profile
   */
  private static calculateWordScore(
    word: any,
    profile: UserProfile,
    topClusters: string[],
    comfortRange: [number, number],
    sweetSpot: number
  ): number {
    let score = 0;
    
    const wordCluster = word.cluster || 'general';
    const wordDifficulty = word.difficulty || 5;
    
    // Cluster match (0-40 points)
    if (topClusters.includes(wordCluster)) {
      const clusterData = profile.clusterPreferences[wordCluster];
      const rank = topClusters.indexOf(wordCluster);
      score += (40 - rank * 10) * clusterData.weight;
    } else {
      // Small bonus for exploration
      score += 5;
    }
    
    // Difficulty match (0-40 points)
    const distanceFromSweet = Math.abs(wordDifficulty - sweetSpot);
    if (wordDifficulty >= comfortRange[0] && wordDifficulty <= comfortRange[1]) {
      score += 40 - (distanceFromSweet * 5);
    } else {
      // Penalty for out of comfort range
      score += Math.max(0, 20 - (distanceFromSweet * 8));
    }
    
    // Novelty (0-20 points)
    const recentWords = profile.wordHistory.slice(-30).map(w => w.word);
    if (!recentWords.includes(word.word || word.text)) {
      score += 20;
    } else {
      score -= 10; // penalty for repetition
    }
    
    return score;
  }
  
  /**
   * Build diverse selection from scored words
   */
  private static buildDiverseSelection(
    scoredWords: Array<{ word: any; score: number }>,
    count: number,
    topClusters: string[],
    profile: UserProfile
  ): any[] {
    const selected: any[] = [];
    const clusterCounts = new Map<string, number>();
    
    // Adjust count based on completion rate
    let targetCount = count;
    if (profile.sessionHistory.completionRate < 0.6) {
      targetCount = Math.max(5, Math.floor(count * 0.7)); // fewer words if struggling
    } else if (profile.sessionHistory.completionRate > 0.9) {
      targetCount = Math.min(15, Math.floor(count * 1.2)); // more words if excelling
    }
    
    // Reserve slots for diversity (20-30%)
    const topClusterSlots = Math.floor(targetCount * 0.7);
    const diversitySlots = targetCount - topClusterSlots;
    
    // First, fill top cluster slots
    for (const { word } of scoredWords) {
      if (selected.length >= topClusterSlots) break;
      
      const wordCluster = word.cluster || 'general';
      if (topClusters.includes(wordCluster)) {
        selected.push(word);
        clusterCounts.set(wordCluster, (clusterCounts.get(wordCluster) || 0) + 1);
      }
    }
    
    // Then, fill diversity slots with different clusters
    for (const { word } of scoredWords) {
      if (selected.length >= targetCount) break;
      
      const wordCluster = word.cluster || 'general';
      if (!topClusters.includes(wordCluster) && !selected.includes(word)) {
        selected.push(word);
        clusterCounts.set(wordCluster, (clusterCounts.get(wordCluster) || 0) + 1);
      }
    }
    
    // Fill any remaining slots
    for (const { word } of scoredWords) {
      if (selected.length >= targetCount) break;
      if (!selected.includes(word)) {
        selected.push(word);
      }
    }
    
    return selected;
  }
  
  /**
   * Calculate diversity score
   */
  private static calculateDiversity(words: any[]): number {
    const clusters = new Set(words.map(w => w.cluster || 'general'));
    return clusters.size / Math.min(words.length, 10);
  }
  
  /**
   * Get starter recommendations for new users
   */
  private static getStarterRecommendations(
    wordDatabase: any[],
    count: number,
    reasoning: string[]
  ): WordRecommendation {
    reasoning.push('Curated starter selection to learn your preferences');
    reasoning.push('Balanced across topics and difficulty levels');
    
    // Get diverse starter set (multiple clusters, medium difficulty)
    const clusters = [...new Set(wordDatabase.map(w => w.cluster || 'general'))];
    const wordsPerCluster = Math.ceil(count / Math.min(clusters.length, 5));
    
    const selected: any[] = [];
    clusters.slice(0, 5).forEach(cluster => {
      const clusterWords = wordDatabase
        .filter(w => (w.cluster || 'general') === cluster)
        .filter(w => w.difficulty >= 4 && w.difficulty <= 7) // medium difficulty
        .slice(0, wordsPerCluster);
      
      selected.push(...clusterWords);
    });
    
    // Shuffle and limit
    const shuffled = selected.sort(() => Math.random() - 0.5).slice(0, count);
    
    return {
      words: shuffled,
      reasoning,
      diversity: 1.0 // high diversity for starters
    };
  }
  
  /**
   * Get session parameters recommendation
   */
  static getSessionParameters(profile: UserProfile): {
    recommendedWordCount: number;
    suggestedDifficulty: { min: number; max: number };
    estimatedDuration: number;
  } {
    const completionRate = profile.sessionHistory.completionRate;
    const avgWords = profile.sessionHistory.averageWordsPerSession || 7;
    
    // Adjust word count based on performance
    let recommendedWordCount = Math.round(avgWords);
    if (completionRate < 0.6) {
      recommendedWordCount = Math.max(3, Math.floor(avgWords * 0.7));
    } else if (completionRate > 0.9) {
      recommendedWordCount = Math.min(12, Math.ceil(avgWords * 1.15));
    }
    
    // Difficulty range
    const comfortRange = profile.difficultyProfile.comfortRange;
    const suggestedDifficulty = {
      min: Math.max(1, comfortRange[0] - 0.5),
      max: Math.min(10, comfortRange[1] + 0.5)
    };
    
    // Estimate duration (avg 45 seconds per word)
    const estimatedDuration = recommendedWordCount * 45;
    
    return { recommendedWordCount, suggestedDifficulty, estimatedDuration };
  }
}
