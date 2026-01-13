# User Behavior Tracking & AI Adaptation System

This system provides comprehensive user profiling, behavior tracking, and AI-powered personalization for the Aureus vocabulary learning app.

## 📋 Overview

The system consists of three main components:

1. **User Profile Schema** - Tracks user preferences, patterns, and learning style
2. **Event Tracking System** - Records and analyzes user interactions
3. **AI Adaptation Engine** - Generates personalized content using Claude AI

## 🏗️ Architecture

```
lib/
├── userProfile.ts          # Profile schema and analysis
├── trackingEvents.ts       # Event tracking and storage
└── aiAdaptationEngine.ts   # AI-powered personalization

hooks/
└── useUserProfile.ts       # React hook for profile management

components/
└── PersonalizationExample.tsx  # Integration example
```

## 🚀 Quick Start

### 1. Initialize User Profile

```typescript
import { getOrCreateUserId } from '@/hooks/useUserProfile';

// In your app component
const userId = getOrCreateUserId();
```

### 2. Use the Profile Hook

```typescript
import { useUserProfile } from '@/hooks/useUserProfile';

function YourComponent() {
  const {
    profile,
    loading,
    trackWordSelection,
    trackSessionCompletion,
    trackInteraction
  } = useUserProfile(userId);

  // Profile is automatically loaded and saved
  if (loading) return <div>Loading...</div>;
  
  return <div>Welcome! Level: {profile.vocabularyLevel.current}</div>;
}
```

### 3. Track Events

#### Track Word Selection
```typescript
const handleStartSession = async (selectedWords) => {
  await trackWordSelection(
    selectedWords,
    availableWords,
    { selectionDuration: Date.now() - selectionStartTime }
  );
  
  // Profile is automatically updated
  startYourSession(selectedWords);
};
```

#### Track Session Completion
```typescript
const handleSessionComplete = async () => {
  await trackSessionCompletion({
    wordsCompleted: completedCount,
    totalWords: sessionWords.length,
    duration: sessionDuration,
    modes: ['anchor', 'contrast', 'task'],
    avgTimePerInteraction: avgTime,
    skippedInteractions: skipCount,
    totalInteractions: interactionCount,
    userInputLength: totalInputChars
  });
};
```

#### Track Individual Interactions
```typescript
const handleInteraction = async (interaction) => {
  await trackInteraction({
    word: interaction.word,
    mode: interaction.mode,
    displayType: interaction.display,
    timeSpent: interactionTime,
    completed: true,
    userResponse: userInput
  });
};
```

## 🤖 AI-Powered Features

### Environment Setup

Add your Anthropic API key to `.env.local`:

```bash
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...
```

### Generate Word Recommendations

```typescript
import { AIAdaptationEngine } from '@/lib/aiAdaptationEngine';

// Generate personalized word recommendations
const recommendations = await AIAdaptationEngine.generateWordRecommendations(
  userId,
  profile,
  wordDatabase,
  process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY
);

// recommendations is an array of words matched to user's level and interests
```

### Adapt Content to User Context

```typescript
// Adapt an interaction to user's preferred context (work, academic, creative, etc.)
const adaptedInteraction = await AIAdaptationEngine.adaptMiniSessionContent(
  originalInteraction,
  profile,
  process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY
);

// The interaction is now personalized to user's interests
```

### Generate Journey Insights

```typescript
// Get AI-generated insights about user's learning journey
const insights = await AIAdaptationEngine.generateJourneyInsights(
  profile,
  process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY
);

// Display encouraging, personalized insights to user
```

## 📊 Profile Data Structure

### Key Profile Fields

```typescript
{
  vocabularyLevel: {
    current: 7,              // 1-10 scale
    trajectory: 'improving', // improving | stable | challenging
    lastUpdated: '2025-12-01T...'
  },
  
  clusterPreferences: {
    'professional': {
      selectionCount: 15,
      engagementScore: 0.85,
      lastInteraction: '2025-12-01T...',
      weight: 0.9           // 0-1, prioritization weight
    }
  },
  
  sessionPatterns: {
    averageWordsPerSession: 7,
    preferredSessionLength: 'medium',
    completionRate: 0.82
  },
  
  wordHistory: {
    selectedWords: [...],
    difficultyPreference: {
      min: 4,
      max: 8,
      sweet_spot: 6        // Optimal difficulty
    }
  },
  
  contextPreferences: {
    work: 0.8,             // User prefers work-related contexts
    academic: 0.3,
    creative: 0.5,
    // ...
  }
}
```

## 🔍 Profile Analysis

### Analyze Word Selection Patterns

```typescript
import { ProfileAnalyzer } from '@/lib/userProfile';

const analysis = ProfileAnalyzer.analyzeWordSelection(
  selectedWords,
  profile
);

// Returns:
// {
//   dominantClusters: ['professional', 'academic'],
//   difficultyTrend: 'increasing',
//   diversityScore: 0.75,
//   insights: ['Strong focus on professional vocabulary', ...]
// }
```

### Predict Optimal Session Parameters

```typescript
const params = ProfileAnalyzer.predictSessionParams(profile);

// Returns:
// {
//   recommendedWordCount: 7,
//   suggestedDifficulty: { min: 5, max: 8 },
//   priorityClusters: ['professional', 'technical'],
//   contextualFocus: 'work'
// }
```

## 🎯 Integration Example

Here's a complete example of integrating the system into your opening screen:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useUserProfile, getOrCreateUserId } from '@/hooks/useUserProfile';
import { AIAdaptationEngine } from '@/lib/aiAdaptationEngine';
import { ProfileAnalyzer } from '@/lib/userProfile';

export default function OpeningScreen() {
  const userId = getOrCreateUserId();
  const { profile, loading, trackWordSelection } = useUserProfile(userId);
  
  const [displayedWords, setDisplayedWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [selectionStartTime] = useState(Date.now());

  // Load personalized words when profile is ready
  useEffect(() => {
    if (profile && profile.wordHistory.selectedWords.length > 10) {
      loadPersonalizedWords();
    } else {
      // New user: show curated starter set
      setDisplayedWords(getStarterWordSet());
    }
  }, [profile]);

  const loadPersonalizedWords = async () => {
    const recommendations = await AIAdaptationEngine.generateWordRecommendations(
      userId,
      profile,
      allWords,
      process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY
    );
    setDisplayedWords(recommendations);
  };

  const handleStartSession = async () => {
    // Track selection
    await trackWordSelection(
      selectedWords,
      displayedWords,
      { selectionDuration: Date.now() - selectionStartTime }
    );
    
    // Start session
    startSession(selectedWords);
  };

  if (loading) return <LoadingState />;

  // Show recommended word count
  const params = ProfileAnalyzer.predictSessionParams(profile);
  
  return (
    <div>
      <p>Recommended: {params.recommendedWordCount} words</p>
      <WordGrid 
        words={displayedWords}
        selected={selectedWords}
        onSelect={setSelectedWords}
      />
      <button onClick={handleStartSession}>
        Start Session
      </button>
    </div>
  );
}
```

## 📈 Event Types

### Word Selection Event
```typescript
{
  type: 'word_selection',
  userId: 'user_123',
  timestamp: '2025-12-01T12:00:00Z',
  data: {
    selectedWords: [...],
    clusterDistribution: { 'professional': 3, 'creative': 2 },
    difficultyRange: { min: 4, max: 8, avg: 6.2 }
  }
}
```

### Session Completion Event
```typescript
{
  type: 'mini_session_completed',
  userId: 'user_123',
  timestamp: '2025-12-01T12:15:00Z',
  data: {
    wordsCompleted: 7,
    totalWords: 8,
    completionRate: 0.875,
    timeSpent: 900000, // milliseconds
    engagementSignals: {
      interactionDepth: 45000, // avg ms per interaction
      skipRate: 0.1,
      thoughtfulness: 150 // avg chars in user input
    }
  }
}
```

## 🎨 Customization

### Add Custom Context Types

Edit `lib/userProfile.ts`:

```typescript
contextPreferences: {
  work: number;
  academic: number;
  creative: number;
  social: number;
  technical: number;
  emotional: number;
  // Add your custom contexts:
  fitness: number;
  cooking: number;
  // ...
}
```

### Add Custom Learning Metrics

```typescript
learningStyle: {
  preferredModes: SessionMode[];
  interactionDepth: 'quick' | 'thoughtful' | 'deep';
  visualVsTextual: number;
  // Add custom metrics:
  errorTolerance: number;
  explorationVsCaution: number;
}
```

## 🔒 Data Storage

By default, data is stored in `localStorage`:

- User profiles: `user_profile:{userId}`
- Events: `user_events:{userId}`
- User ID: `aureus_user_id`

### Migration to Backend

To migrate to a backend database:

1. Implement `ProfileStorage` methods in `lib/aiAdaptationEngine.ts`
2. Update `UserEventTracker.storeEvent()` in `lib/trackingEvents.ts`
3. Add API routes for profile CRUD operations

Example:
```typescript
// lib/aiAdaptationEngine.ts
static async loadProfile(userId: string): Promise<UserProfile | null> {
  const response = await fetch(`/api/profile/${userId}`);
  if (!response.ok) return null;
  return response.json();
}
```

## 🧪 Testing

### Check if profile is working:

```typescript
import { getOrCreateUserId } from '@/hooks/useUserProfile';
import { ProfileStorage } from '@/lib/aiAdaptationEngine';

const userId = getOrCreateUserId();
const profile = await ProfileStorage.loadProfile(userId);
console.log('Profile:', profile);
```

### View stored events:

```typescript
import { UserEventTracker } from '@/lib/trackingEvents';

const events = await UserEventTracker.getUserEvents(userId);
console.log('Events:', events);
```

### Test AI recommendations (requires API key):

```typescript
const recommendations = await AIAdaptationEngine.generateWordRecommendations(
  userId,
  profile,
  wordDatabase,
  'your-api-key'
);
console.log('Recommendations:', recommendations);
```

## 🚨 Error Handling

All AI functions have fallback mechanisms:

- **No API key**: Uses rule-based algorithms
- **API failure**: Falls back to default implementations
- **Storage error**: Logs error and continues

```typescript
// Example: AI will fallback automatically
const words = await AIAdaptationEngine.generateWordRecommendations(
  userId,
  profile,
  wordDatabase
  // No API key = uses fallback selection
);
```

## 📝 Best Practices

1. **Track consistently**: Call tracking methods after every user action
2. **Update profiles**: Profile updates happen automatically with tracking
3. **Monitor storage**: localStorage has ~5-10MB limit, events are auto-pruned to last 100
4. **Use insights**: Display AI insights to motivate users
5. **Privacy**: User data stays local unless you implement backend storage

## 🔮 Future Enhancements

- [ ] Multi-device sync via backend
- [ ] Advanced analytics dashboard
- [ ] A/B testing framework
- [ ] Predictive difficulty adjustment
- [ ] Social learning features
- [ ] Export/import profile data

## 📚 API Reference

See the example component at `/components/PersonalizationExample.tsx` for a complete working implementation.

## 🤝 Contributing

To extend the system:

1. Add new metrics to `UserProfile` interface
2. Update `ProfileAnalyzer` with new analysis methods
3. Enhance `AIAdaptationEngine` prompts for better personalization
4. Add new event types in `UserEventTracker`

---

**Built for Aureus - Adaptive Vocabulary Learning** 🌟
