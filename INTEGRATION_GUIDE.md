# Integration Guide: Adding User Tracking to Your Existing App

This guide shows how to integrate the tracking system into your current Aureus app.

## Step 1: Update Your Opening Screen (app/page.tsx)

Add user tracking to word selection:

```typescript
// At the top of your file
import { useUserProfile, getOrCreateUserId } from '@/hooks/useUserProfile';
import { AIAdaptationEngine } from '@/lib/aiAdaptationEngine';
import { ProfileAnalyzer } from '@/lib/userProfile';
import { useState, useEffect } from 'react';

// Inside your component
const [userId] = useState(() => getOrCreateUserId());
const { profile, loading, trackWordSelection } = useUserProfile(userId);
const [selectionStartTime] = useState(Date.now());

// When user starts session
const handleStartSession = async () => {
  if (selectedWords.length === 0) return;
  
  // Track selection with timing
  await trackWordSelection(
    selectedWords,
    allAvailableWords,
    { selectionDuration: Date.now() - selectionStartTime }
  );
  
  // Continue with your existing session logic
  setPhase('session');
};
```

## Step 2: Update Your Session Component (components/session/SessionScreen.tsx)

Add interaction tracking:

```typescript
import { useUserProfile, getOrCreateUserId } from '@/hooks/useUserProfile';

// Inside your component
const [userId] = useState(() => getOrCreateUserId());
const { trackInteraction, trackSessionCompletion } = useUserProfile(userId);

// Track each interaction
const handleInteractionComplete = async (interaction: any, userResponse: any) => {
  await trackInteraction({
    word: interaction.word,
    mode: interaction.mode,
    displayType: interaction.display,
    timeSpent: interactionDuration,
    completed: true,
    userResponse
  });
};

// Track session completion
const handleSessionComplete = async () => {
  await trackSessionCompletion({
    wordsCompleted: completedWords.length,
    totalWords: sessionWords.length,
    duration: sessionDuration,
    modes: uniqueModes,
    avgTimePerInteraction: totalTime / interactionCount,
    skippedInteractions: skippedCount,
    totalInteractions: interactionCount,
    userInputLength: totalChars
  });
};
```

## Step 3: Add AI-Powered Word Recommendations (Optional)

If you want AI to suggest words based on user history:

```typescript
// In your opening screen
useEffect(() => {
  const loadWords = async () => {
    if (!profile || !profile.wordHistory.selectedWords.length) {
      // New user: show default words
      setDisplayWords(defaultWordSet);
      return;
    }

    // Experienced user: get AI recommendations
    const recommendations = await AIAdaptationEngine.generateWordRecommendations(
      userId,
      profile,
      allWords,
      process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY // Optional
    );
    
    setDisplayWords(recommendations);
  };

  if (profile) {
    loadWords();
  }
}, [profile]);
```

## Step 4: Display User Insights (Optional)

Show personalized insights on your opening screen:

```typescript
const [insights, setInsights] = useState<string[]>([]);

useEffect(() => {
  const loadInsights = async () => {
    if (!profile || profile.wordHistory.selectedWords.length < 5) return;
    
    const journeyInsights = await AIAdaptationEngine.generateJourneyInsights(
      profile,
      process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY // Optional
    );
    
    setInsights(journeyInsights);
  };

  if (profile) {
    loadInsights();
  }
}, [profile]);

// Render insights
{insights.length > 0 && (
  <div className="mb-8 space-y-3">
    {insights.map((insight, i) => (
      <div key={i} className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
        <p className="text-gray-700">{insight}</p>
      </div>
    ))}
  </div>
)}
```

## Step 5: Add Profile Display

Show user stats on opening screen:

```typescript
{profile && (
  <div className="grid grid-cols-3 gap-4 mb-8">
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4">
      <div className="text-sm text-blue-700">Level</div>
      <div className="text-2xl font-bold text-blue-900">
        {profile.vocabularyLevel.current}/10
      </div>
    </div>
    
    <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-4">
      <div className="text-sm text-purple-700">Words</div>
      <div className="text-2xl font-bold text-purple-900">
        {profile.wordHistory.selectedWords.length}
      </div>
    </div>
    
    <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-4">
      <div className="text-sm text-pink-700">Rate</div>
      <div className="text-2xl font-bold text-pink-900">
        {(profile.sessionPatterns.completionRate * 100).toFixed(0)}%
      </div>
    </div>
  </div>
)}
```

## Step 6: Environment Setup (For AI Features)

Create `.env.local` in your project root:

```bash
# Optional: Only needed for AI-powered features
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get your API key from: https://console.anthropic.com/

## Step 7: Test the Integration

1. **Test Profile Creation**:
   - Open DevTools Console
   - Should see: `🆕 Creating new profile for user: user_...`

2. **Test Word Tracking**:
   - Select words and start session
   - Should see: `📊 Tracking word selection: {...}`

3. **Test Session Completion**:
   - Complete a session
   - Should see: `📊 Tracking session completion: {...}`

4. **Verify Data Storage**:
   ```typescript
   // In console:
   localStorage.getItem('user_profile:' + localStorage.getItem('aureus_user_id'))
   ```

## Complete Example: Opening Screen Integration

Here's a minimal working example:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useUserProfile, getOrCreateUserId } from '@/hooks/useUserProfile';
import { ProfileAnalyzer } from '@/lib/userProfile';

export default function OpeningScreen() {
  const [userId] = useState(() => getOrCreateUserId());
  const { profile, loading, trackWordSelection } = useUserProfile(userId);
  
  const [selectedWords, setSelectedWords] = useState([]);
  const [selectionStartTime] = useState(Date.now());

  const handleStartSession = async () => {
    if (selectedWords.length === 0) return;
    
    // Track word selection
    await trackWordSelection(
      selectedWords,
      allWords,
      { selectionDuration: Date.now() - selectionStartTime }
    );
    
    // Start your session
    startSession(selectedWords);
  };

  if (loading) return <div>Loading your profile...</div>;

  // Get recommended word count
  const params = profile ? ProfileAnalyzer.predictSessionParams(profile) : null;

  return (
    <div>
      {/* Profile Stats */}
      {profile && (
        <div className="mb-4">
          <p>Recommended: {params.recommendedWordCount} words</p>
          <p>Level: {profile.vocabularyLevel.current}/10</p>
        </div>
      )}

      {/* Word Selection */}
      <WordGrid 
        words={allWords}
        selected={selectedWords}
        onSelect={setSelectedWords}
      />

      {/* Start Button */}
      <button onClick={handleStartSession}>
        Start Session ({selectedWords.length} words)
      </button>
    </div>
  );
}
```

## Minimal vs Full Integration

### Minimal (Just Tracking)
- Add `useUserProfile` hook
- Call `trackWordSelection` on session start
- Call `trackSessionCompletion` on session end
- No AI features needed
- Works offline

### Full (AI-Powered)
- Everything in Minimal, plus:
- Add Anthropic API key
- Use `generateWordRecommendations()` for personalized word selection
- Use `generateJourneyInsights()` for motivational messages
- Use `adaptMiniSessionContent()` for context-aware interactions
- Requires internet connection

## Troubleshooting

### Profile not saving
- Check browser console for errors
- Verify localStorage is enabled
- Check localStorage quota isn't exceeded

### AI features not working
- Verify API key is in `.env.local`
- Check console for API errors
- Fallback functions will run automatically if AI fails

### TypeScript errors
- Run `npm install` to ensure all dependencies are installed
- Check that all imports use correct paths

## Next Steps

1. ✅ Add tracking to opening screen
2. ✅ Add tracking to session completion
3. ✅ Test with console logs
4. ⭐ (Optional) Add AI features with API key
5. ⭐ (Optional) Build analytics dashboard
6. ⭐ (Optional) Migrate to backend database

---

**Need help?** Check `TRACKING_SYSTEM.md` for full API reference and examples.
