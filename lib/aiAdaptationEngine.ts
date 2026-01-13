import { UserProfile } from './userProfile';

export class AIAdaptationEngine {
  
  /**
   * Generate personalized word recommendations for opening screen
   */
  static async generateWordRecommendations(
    userId: string,
    profile: UserProfile,
    wordDatabase: any[],
    apiKey?: string
  ): Promise<any[]> {
    console.log('🤖 Generating AI word recommendations for user:', userId);
    
    const params = {
      suggestedDifficulty: { min: 5, max: 8 },
      priorityClusters: ['work', 'learning'],
      contextualFocus: 'general',
      recommendedWordCount: 5
    };
    
    // Build AI prompt for word curation
    const prompt = `You are a vocabulary curator for a personalized language learning app.

User Profile:
- Current vocabulary level: ${profile.vocabularyLevel.estimatedLevel}/10
- Confidence: ${(profile.vocabularyLevel.confidence * 100).toFixed(0)}%
- Preferred difficulty range: ${params.suggestedDifficulty.min}-${params.suggestedDifficulty.max}
- Interest clusters: ${params.priorityClusters.join(', ')}
- Contextual focus: ${params.contextualFocus}
- Typical session size: ${params.recommendedWordCount} words
- Completion rate: ${((profile.wordHistory.filter(w => w.completed).length / Math.max(1, profile.wordHistory.length)) * 100).toFixed(0)}%

Recent word history:
${profile.wordHistory.slice(-10).map(w => 
  `- ${w.word} (difficulty: ${w.difficulty}, cluster: ${w.cluster}, completed: ${w.completed})`
).join('\n')}

Available word database: ${JSON.stringify(wordDatabase.slice(0, 50), null, 2)}

Task: Select ${params.recommendedWordCount * 3} words that would:
1. Match the user's difficulty comfort zone (${params.suggestedDifficulty.min}-${params.suggestedDifficulty.max})
2. Emphasize their interest areas (${params.priorityClusters.join(', ')})
3. Introduce 20% new clusters for diversity
4. Balance familiar territory with gentle challenges
5. Consider their ${params.contextualFocus} context preference

Return ONLY a JSON array of word objects with their IDs from the database.`;

    try {
      if (!apiKey) {
        console.warn('⚠️ No API key provided, using fallback');
        return this.fallbackWordSelection(profile, wordDatabase, params);
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.content[0].text;
      
      // Parse AI response
      const selectedWords = JSON.parse(aiResponse.replace(/```json|```/g, '').trim());
      
      console.log('✅ AI recommendations generated:', selectedWords.length);
      return selectedWords;
      
    } catch (err) {
      console.error('❌ AI word recommendation failed:', err);
      // Fallback to rule-based selection
      return this.fallbackWordSelection(profile, wordDatabase, params);
    }
  }
  
  /**
   * Adapt mini-session content based on user interests
   */
  static async adaptMiniSessionContent(
    interaction: any,
    profile: UserProfile,
    apiKey?: string
  ): Promise<any> {
    console.log('🤖 Adapting interaction content for:', interaction.word);
    
    const contextFocus = profile.contextPreferences 
      ? Object.entries(profile.contextPreferences)
          .sort(([,a], [,b]) => b - a)[0]?.[0] || 'general'
      : 'general';
    
    // Use AI to reframe the interaction in user's preferred context
    const prompt = `You are adapting a vocabulary learning interaction to match a user's interests.

Word: "${interaction.word}"
Original anchor question: "${interaction.anchor}"
Interaction mode: ${interaction.mode}
Task type: ${interaction.task?.type}

User's primary interest context: ${contextFocus}
User's context preferences: ${JSON.stringify(profile.contextPreferences)}

Task: Rewrite this interaction to naturally incorporate ${contextFocus} context while maintaining the learning objective.

For example:
- If context is "work": use office scenarios, professional communication, career situations
- If context is "academic": use research, study, educational settings
- If context is "creative": use artistic, design, creative expression contexts
- If context is "social": use interpersonal relationships, social situations
- If context is "technical": use technology, systems, analytical contexts

Return JSON with:
{
  "anchor": "Rewritten anchor question in ${contextFocus} context",
  "task": { updated task object with context-appropriate examples }
}

Be natural and authentic. The context should enhance engagement, not feel forced.`;

    try {
      if (!apiKey) {
        console.warn('⚠️ No API key provided for adaptation, using original');
        return interaction;
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.content[0].text;
      const adapted = JSON.parse(aiResponse.replace(/```json|```/g, '').trim());
      
      console.log('✅ Interaction adapted to', contextFocus, 'context');
      
      return {
        ...interaction,
        anchor: adapted.anchor,
        task: { ...interaction.task, ...adapted.task },
        personalized: true,
        context: contextFocus
      };
      
    } catch (err) {
      console.error('❌ AI adaptation failed:', err);
      return interaction; // Return original if AI fails
    }
  }
  
  /**
   * Generate insights about user's learning journey
   */
  static async generateJourneyInsights(
    profile: UserProfile,
    apiKey?: string
  ): Promise<string[]> {
    console.log('🤖 Generating journey insights');
    
    const topClusters = Object.entries(profile.clusterPreferences)
      .sort(([,a], [,b]) => b.weight - a.weight)
      .slice(0, 3)
      .map(([cluster]) => cluster);
    
    const topContexts = profile.contextPreferences
      ? Object.entries(profile.contextPreferences)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 2)
          .map(([ctx, score]) => `${ctx} (${(score * 100).toFixed(0)}%)`)
      : [];
    
    const prompt = `Analyze this language learner's journey and provide 3-4 personalized insights.

Profile summary:
- Vocabulary level: ${profile.vocabularyLevel.estimatedLevel}/10
- Top interests: ${topClusters.join(', ') || 'varied'}
- Words learned: ${profile.wordHistory.length}
- Context preferences: ${topContexts.join(', ') || 'balanced'}

Generate 3-4 encouraging, specific insights about their learning patterns. Focus on:
1. Their unique learning style
2. Areas of strong interest or progress
3. Gentle suggestions for exploration
4. Recognition of their journey

Be warm, specific, and motivating. Return as JSON array of strings.`;

    try {
      if (!apiKey) {
        console.warn('⚠️ No API key provided, using default insights');
        return this.defaultInsights(profile);
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 800,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.content[0].text;
      const insights = JSON.parse(aiResponse.replace(/```json|```/g, '').trim());
      
      console.log('✅ Journey insights generated');
      return insights;
      
    } catch (err) {
      console.error('❌ AI insights generation failed:', err);
      return this.defaultInsights(profile);
    }
  }
  
  /**
   * Fallback word selection using rule-based approach
   */
  private static fallbackWordSelection(
    profile: UserProfile,
    wordDatabase: any[],
    params: any
  ): any[] {
    console.log('🔄 Using fallback word selection');
    
    // Filter by difficulty
    let candidates = wordDatabase.filter(w => 
      (w.difficulty || 5) >= params.suggestedDifficulty.min &&
      (w.difficulty || 5) <= params.suggestedDifficulty.max
    );
    
    // Prioritize clusters if available
    if (params.priorityClusters.length > 0) {
      const priorityWords = candidates.filter(w => 
        params.priorityClusters.includes(w.cluster)
      );
      
      // If we have enough priority words, use them
      if (priorityWords.length >= params.recommendedWordCount * 2) {
        candidates = priorityWords;
      }
    }
    
    // Shuffle and take recommended count * 3 for variety
    const shuffled = candidates.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, params.recommendedWordCount * 3);
  }
  
  /**
   * Default insights when AI is not available
   */
  private static defaultInsights(profile: UserProfile): string[] {
    const insights = [];
    
    if (profile.wordHistory.length > 20) {
      insights.push(`You've explored ${profile.wordHistory.length} words - your vocabulary is expanding!`);
    } else {
      insights.push('Your vocabulary journey is taking shape');
    }
    
    if (profile.wordHistory.filter(w => w.completed).length / Math.max(1, profile.wordHistory.length) > 0.8) {
      insights.push('You show excellent commitment to completing your learning sessions');
    }
    
    const topCluster = Object.entries(profile.clusterPreferences)
      .sort(([,a], [,b]) => b.weight - a.weight)[0]?.[0];
    
    if (topCluster) {
      insights.push(`Strong interest in ${topCluster} vocabulary - keep exploring!`);
    }
    
    insights.push('Every word you learn opens new ways of expression');
    
    return insights.slice(0, 4);
  }
}

/**
 * Storage helpers for user profiles
 */
export class ProfileStorage {
  
  static async loadProfile(userId: string): Promise<UserProfile | null> {
    try {
      const key = `user_profile:${userId}`;
      const data = localStorage.getItem(key);
      
      if (!data) {
        console.log('📭 No profile found for user:', userId);
        return null;
      }
      
      const profile = JSON.parse(data);
      console.log('📬 Profile loaded for user:', userId);
      return profile;
    } catch (err) {
      console.error('❌ Failed to load profile:', err);
      return null;
    }
  }
  
  static async saveProfile(profile: UserProfile): Promise<void> {
    try {
      const key = `user_profile:${profile.userId}`;
      localStorage.setItem(key, JSON.stringify(profile));
      console.log('💾 Profile saved for user:', profile.userId);
    } catch (err) {
      console.error('❌ Failed to save profile:', err);
    }
  }
  
  static async deleteProfile(userId: string): Promise<void> {
    try {
      const key = `user_profile:${userId}`;
      localStorage.removeItem(key);
      console.log('🗑️ Profile deleted for user:', userId);
    } catch (err) {
      console.error('❌ Failed to delete profile:', err);
    }
  }
}
