# 📋 Quick Reference - User Tracking System

## 🚀 Basic Setup (3 lines)

```typescript
import { getOrCreateUserId, useUserProfile } from '@/hooks/useUserProfile';

const userId = getOrCreateUserId();
const { profile, trackWordSelection, trackSessionCompletion } = useUserProfile(userId);
```

## 📊 Track Events

### Word Selection
```typescript
await trackWordSelection(
  selectedWords,      // Words user selected
  availableWords,     // All available words
  { selectionDuration: 5000 }  // Time in ms
);
```

### Session Completion
```typescript
await trackSessionCompletion({
  wordsCompleted: 7,
  totalWords: 8,
  duration: 300000,  // 5 minutes in ms
  modes: ['anchor', 'contrast', 'task'],
  avgTimePerInteraction: 42000,  // ms per interaction
  skippedInteractions: 1,
  totalInteractions: 24,
  userInputLength: 150  // avg chars in user input
});
```

### Individual Interaction
```typescript
await trackInteraction({
  word: 'ephemeral',
  mode: 'anchor',
  displayType: 'slider',
  timeSpent: 35000,
  completed: true,
  userResponse: { value: 7 }
});
```

## 🤖 AI Features (Optional - Requires API Key)

### Get Word Recommendations
```typescript
import { AIAdaptationEngine } from '@/lib/aiAdaptationEngine';

const words = await AIAdaptationEngine.generateWordRecommendations(
  userId,
  profile,
  wordDatabase,
  process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY
);
```

### Get Journey Insights
```typescript
const insights = await AIAdaptationEngine.generateJourneyInsights(
  profile,
  process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY
);
// Returns: ['You show excellent commitment...', ...]
```

### Adapt Content to User Context
```typescript
const adapted = await AIAdaptationEngine.adaptMiniSessionContent(
  interaction,
  profile,
  process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY
);
```

## 📈 Profile Analysis

### Get Predictions
```typescript
import { ProfileAnalyzer } from '@/lib/userProfile';

const params = ProfileAnalyzer.predictSessionParams(profile);
// Returns:
// {
//   recommendedWordCount: 7,
//   suggestedDifficulty: { min: 4, max: 8 },
//   priorityClusters: ['professional', 'creative'],
//   contextualFocus: 'work'
// }
```

### Analyze Selection
```typescript
const analysis = ProfileAnalyzer.analyzeWordSelection(
  selectedWords,
  profile
);
// Returns:
// {
//   dominantClusters: ['professional'],
//   difficultyTrend: 'increasing',
//   diversityScore: 0.75,
//   insights: ['Strong focus on...']
// }
```

## ⏱️ Easy Timing Tracking

```typescript
import { useSessionTracking } from '@/hooks/useSessionTracking';

const tracking = useSessionTracking();

// Start tracking
tracking.startSession();

// Track each interaction
tracking.startInteraction('anchor');
// ... user interacts ...
tracking.completeInteraction(userInput);

// Get all metrics
const metrics = tracking.getMetrics();
await trackSessionCompletion({
  wordsCompleted: completedWords.length,
  totalWords: allWords.length,
  ...metrics
});
```

## 🎨 Display Profile Stats

```typescript
{profile && (
  <div className="grid grid-cols-3 gap-4">
    <div className="bg-blue-100 rounded-2xl p-4">
      <div className="text-sm text-blue-700">Level</div>
      <div className="text-3xl font-bold text-blue-900">
        {profile.vocabularyLevel.current}/10
      </div>
    </div>
    
    <div className="bg-purple-100 rounded-2xl p-4">
      <div className="text-sm text-purple-700">Words</div>
      <div className="text-3xl font-bold text-purple-900">
        {profile.wordHistory.selectedWords.length}
      </div>
    </div>
    
    <div className="bg-pink-100 rounded-2xl p-4">
      <div className="text-sm text-pink-700">Rate</div>
      <div className="text-3xl font-bold text-pink-900">
        {(profile.sessionPatterns.completionRate * 100).toFixed(0)}%
      </div>
    </div>
  </div>
)}
```

## 🔍 Debug Panel (Development)

```typescript
import { UserTrackingDebugPanel } from '@/components/UserTrackingDebugPanel';

// Add to your page during development
<UserTrackingDebugPanel userId={userId} />
```

## 🗄️ Storage Operations

### Load Profile
```typescript
import { ProfileStorage } from '@/lib/aiAdaptationEngine';

const profile = await ProfileStorage.loadProfile(userId);
```

### Save Profile
```typescript
await ProfileStorage.saveProfile(profile);
```

### Delete Profile
```typescript
await ProfileStorage.deleteProfile(userId);
```

### Get Events
```typescript
import { UserEventTracker } from '@/lib/trackingEvents';

const events = await UserEventTracker.getUserEvents(userId);
const last10 = await UserEventTracker.getUserEvents(userId, 10);
```

## 📦 What's Included

### Core Files
- `lib/userProfile.ts` - Profile schema & analysis
- `lib/trackingEvents.ts` - Event tracking
- `lib/aiAdaptationEngine.ts` - AI features
- `hooks/useUserProfile.ts` - React hook
- `hooks/useSessionTracking.ts` - Timing utilities

### Components
- `components/PersonalizationExample.tsx` - Full example
- `components/UserTrackingDebugPanel.tsx` - Debug tools

### Documentation
- `TRACKING_SYSTEM.md` - Full API docs
- `INTEGRATION_GUIDE.md` - Step-by-step guide
- `TRACKING_SUMMARY.md` - Overview
- `QUICK_REFERENCE.md` - This file

## 🌟 Profile Data Access

```typescript
profile.vocabularyLevel.current        // 1-10
profile.vocabularyLevel.trajectory     // 'improving' | 'stable' | 'challenging'
profile.wordHistory.selectedWords      // Array of all words
profile.sessionPatterns.completionRate // 0-1
profile.sessionPatterns.averageWordsPerSession
profile.contextPreferences.work        // 0-1 weight
profile.clusterPreferences['technical'].weight  // 0-1
```

## 🎯 Common Patterns

### Opening Screen Integration
```typescript
const userId = getOrCreateUserId();
const { profile, trackWordSelection } = useUserProfile(userId);
const [selectionStart] = useState(Date.now());

const handleStart = async () => {
  await trackWordSelection(
    selectedWords,
    allWords,
    { selectionDuration: Date.now() - selectionStart }
  );
  startSession(selectedWords);
};
```

### Session Screen Integration
```typescript
const tracking = useSessionTracking();
const { trackSessionCompletion } = useUserProfile(userId);

useEffect(() => {
  tracking.startSession();
}, []);

const handleComplete = async () => {
  const metrics = tracking.getMetrics();
  await trackSessionCompletion({ ...metrics, /* more data */ });
};
```

## 🔐 Environment Variables

```bash
# .env.local (optional for AI features)
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...
```

## ✅ Checklist

- [ ] Import hooks in your component
- [ ] Get/create user ID
- [ ] Track word selection
- [ ] Track session completion
- [ ] Display profile stats
- [ ] (Optional) Add debug panel
- [ ] (Optional) Add AI features
- [ ] Test in browser

## 🐛 Debugging

```javascript
// Check user ID
localStorage.getItem('aureus_user_id')

// Check profile
localStorage.getItem('user_profile:' + localStorage.getItem('aureus_user_id'))

// Check events
localStorage.getItem('user_events:' + localStorage.getItem('aureus_user_id'))

// Clear all (fresh start)
localStorage.clear()
```

## 📚 Full Documentation

- See `TRACKING_SYSTEM.md` for complete API reference
- See `INTEGRATION_GUIDE.md` for step-by-step tutorial
- See `PersonalizationExample.tsx` for working code

---

**All TypeScript files compile without errors** ✅

**Works offline** ✅

**Zero dependencies** ✅ (AI features optional)
