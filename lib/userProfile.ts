export interface UserProfile {
  userId: string;
  createdAt: string;
  lastActive: string;
  
  // Vocabulary level tracking
  vocabularyLevel: {
    estimatedLevel: number; // 1-10
    confidence: number; // 0-1, how sure we are
    lastCalculated: string;
  };
  
  // Cluster (topic) preferences
  clusterPreferences: {
    [clusterId: string]: {
      timesSelected: number;
      timesAvailable: number; // for selection rate calculation
      completionRate: number; // did they finish words from this cluster?
      lastSelected: string;
      weight: number; // 0-1, calculated preference strength
    };
  };
  
  // Difficulty preferences
  difficultyProfile: {
    lowestSelected: number;
    highestSelected: number;
    averageSelected: number;
    sweetSpot: number; // difficulty with highest completion rate
    comfortRange: [number, number]; // min, max they handle well
  };
  
  // Session behavior
  sessionHistory: {
    totalSessions: number;
    averageWordsPerSession: number;
    completionRate: number; // percentage of started sessions completed
    averageSessionDuration: number; // in seconds
    lastSessionDate: string;
  };
  
  // Word interaction history (last 50 words)
  wordHistory: Array<{
    word: string;
    difficulty: number;
    cluster: string;
    selectedAt: string;
    completed: boolean;
    timeSpent?: number;
  }>;
  // Context preferences (learned interests like work/academic/creative/etc.)
  contextPreferences?: {
    work: number;
    academic: number;
    creative: number;
    social: number;
    technical: number;
    [key: string]: number;
  };
}

export class UserProfileManager {
  
  /**
   * Initialize new user profile
   */
  static createNewProfile(userId: string): UserProfile {
    return {
      userId,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      vocabularyLevel: {
        estimatedLevel: 5, // neutral starting point
        confidence: 0.1, // low confidence initially
        lastCalculated: new Date().toISOString()
      },
      clusterPreferences: {},
      difficultyProfile: {
        lowestSelected: 10,
        highestSelected: 1,
        averageSelected: 5,
        sweetSpot: 5,
        comfortRange: [3, 7]
      },
      sessionHistory: {
        totalSessions: 0,
        averageWordsPerSession: 0,
        completionRate: 1.0,
        averageSessionDuration: 0,
        lastSessionDate: new Date().toISOString()
      },
      wordHistory: [],
      contextPreferences: {
        work: 0.2,
        academic: 0.2,
        creative: 0.2,
        social: 0.2,
        technical: 0.2
      }
    };
  }
  
  /**
   * Load profile from storage
   */
  static async loadProfile(userId: string): Promise<UserProfile | null> {
    try {
      const stored = localStorage.getItem(`profile:${userId}`);
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch (err) {
      console.error('Failed to load profile:', err);
      return null;
    }
  }
  
  /**
   * Save profile to storage
   */
  static async saveProfile(profile: UserProfile): Promise<void> {
    try {
      profile.lastActive = new Date().toISOString();
      localStorage.setItem(`profile:${profile.userId}`, JSON.stringify(profile));
      console.log('✅ Profile saved:', profile.userId);
    } catch (err) {
      console.error('❌ Failed to save profile:', err);
    }
  }
  
  /**
   * Get or create profile
   */
  static async getOrCreateProfile(userId: string): Promise<UserProfile> {
    let profile = await this.loadProfile(userId);
    if (!profile) {
      console.log('📝 Creating new profile for user:', userId);
      profile = this.createNewProfile(userId);
      await this.saveProfile(profile);
    }
    return profile;
  }
}
