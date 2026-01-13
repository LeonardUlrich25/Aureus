import { useState, useEffect, useMemo } from "react";
import { sessionEngine } from "@/lib/AdaptiveMicroSessionEngine";
import {
  WordProfile,
  SessionInteraction,
  InteractionResponse,
  SessionProgress,
  SessionContext,
  JourneyMetrics,
  WordCognitiveWeight
} from "@/types/session";
import { Word, vocabularyClusters } from "@/data/vocabulary";
import { wordDatabase, WordContent } from "@/data/wordContent";

interface UseAdaptiveSessionResult {
  currentInteraction: SessionInteraction | null;
  progress: SessionProgress;
  advance: (response: InteractionResponse) => void;
  isComplete: boolean;
  metrics: JourneyMetrics | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for orchestrating adaptive micro-sessions.
 * Manages interaction flow, tracks responses, and builds journey progression.
 */
export function useAdaptiveSession(selectedWords: Word[], userProfile?: any): UseAdaptiveSessionResult {
  const [sessionContext, setSessionContext] = useState<SessionContext>({
    previousFormats: [],
    sessionHistory: []
  });

  const [progress, setProgress] = useState<SessionProgress>({
    currentIndex: 0,
    totalInteractions: 0,
    completedInteractions: 0,
    responses: [],
    startTime: Date.now(),
    lastInteractionTime: Date.now()
  });

  const [interactions, setInteractions] = useState<SessionInteraction[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert selected words to WordProfile format
  const wordProfiles: WordProfile[] = useMemo(() => {
    console.log('🔄 Converting selected words to WordProfile format');
    console.log('Selected words received:', selectedWords);
    
    return selectedWords.map((word, index) => {
      console.log(`  Converting word ${index + 1}:`, word);
      
      // Find which cluster this word belongs to
      let clusterName = 'general';
      for (const cluster of vocabularyClusters) {
        if (cluster.words.some(w => w.word === word.word)) {
          clusterName = cluster.name;
          break;
        }
      }
      
      return {
        text: word.word,
        definition: word.definition,
        cognitiveWeight: word.cognitiveWeight || WordCognitiveWeight.INTELLECTUAL,
        semanticField: word.semanticField || clusterName,
        contextTags: word.contextTags || [],
        cluster: clusterName,
        difficulty: 5 // Default difficulty level
      };
    });
  }, [selectedWords]);

  // Generate interactions on mount with validation
  useEffect(() => {
    console.log('🔄 useAdaptiveSession useEffect triggered');
    
    const initializeSession = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Validate input
        if (!wordProfiles || wordProfiles.length === 0) {
          console.warn('❌ No words selected for session');
          setIsLoading(false);
          return;
        }

        console.log(`✓ ${wordProfiles.length} words to process`);
        console.log('Initializing session with words:', wordProfiles.map(w => w.text));

        // Generate interactions with retry logic
        let generatedInteractions: SessionInteraction[] = [];
        let retryCount = 0;
        const maxRetries = 2;

        while (retryCount <= maxRetries && generatedInteractions.length === 0) {
          if (retryCount > 0) {
            console.log(`🔄 Retry attempt ${retryCount}/${maxRetries}`);
          }

          generatedInteractions = sessionEngine.createMicroSession(
            wordProfiles,
            sessionContext,
            userProfile
          );

          if (generatedInteractions.length === 0 && retryCount < maxRetries) {
            console.warn('⚠️ No interactions generated, retrying...');
            await new Promise(resolve => setTimeout(resolve, 100));
          }

          retryCount++;
        }

        console.log('Generated interactions:', generatedInteractions);

        // CRITICAL: Verify interactions were created
        if (!generatedInteractions || generatedInteractions.length === 0) {
          console.error('❌ Failed to generate any interactions after retries', {
            wordCount: wordProfiles.length,
            words: wordProfiles
          });
          setError('Unable to create learning tasks. Please try again.');
          setIsLoading(false);
          return;
        }

        // Verify each interaction has required structure
        const validInteractions = generatedInteractions.filter((interaction, index) => {
          const isValid = interaction && 
                 interaction.word && 
                 interaction.mode && 
                 interaction.task &&
                 interaction.display;
          
          if (!isValid) {
            console.error(`❌ Invalid interaction at index ${index}:`, interaction);
          }
          return isValid;
        });

        console.log(`✓ Valid interactions: ${validInteractions.length}/${generatedInteractions.length}`);

        if (validInteractions.length === 0) {
          console.error('❌ All interactions failed validation');
          setError('Generated tasks are invalid. Please try restarting.');
          setIsLoading(false);
          return;
        }

        if (validInteractions.length < generatedInteractions.length) {
          console.warn('⚠️ Some interactions were invalid and filtered out', {
            original: generatedInteractions.length,
            valid: validInteractions.length
          });
        }

        console.log(`✓ Successfully generated ${validInteractions.length} interactions`);

        setInteractions(validInteractions);
        setProgress(prev => ({
          ...prev,
          totalInteractions: validInteractions.length
        }));
        setIsLoading(false);

        console.log('✅ Session initialized successfully');
        console.log(`   - ${validInteractions.length} tasks ready`);
        console.log(`   - Starting at index 0`);

      } catch (err) {
        console.error('❌ Fatal error initializing session:', err);
        console.error('Stack:', err instanceof Error ? err.stack : 'No stack');
        setError('An unexpected error occurred. Please restart your journey.');
        setIsLoading(false);
      }
    };

    initializeSession();
  }, [wordProfiles, userProfile]);

  // Current interaction
  const currentInteraction = useMemo(() => {
    if (isComplete || progress.currentIndex >= interactions.length) {
      return null;
    }
    return interactions[progress.currentIndex];
  }, [interactions, progress.currentIndex, isComplete]);

  // Advance to next interaction
  const advance = (response: InteractionResponse) => {
    console.log(`➡️ Advancing from interaction ${progress.currentIndex + 1}/${interactions.length}`);
    console.log('User response:', response);
    
    const now = Date.now();

    setProgress(prev => {
      const updatedResponses = [...prev.responses, response];
      const newIndex = prev.currentIndex + 1;
      const completed = prev.completedInteractions + 1;

      console.log(`✓ Advanced to index ${newIndex}`);
      console.log(`  Remaining: ${interactions.length - newIndex}`);

      // Check if session is complete
      if (newIndex >= interactions.length) {
        console.log('✅ Session complete!');
        setIsComplete(true);
      }

      return {
        ...prev,
        currentIndex: newIndex,
        completedInteractions: completed,
        responses: updatedResponses,
        lastInteractionTime: now
      };
    });

    // Update session context for next interaction
    if (currentInteraction) {
      setSessionContext(prev => ({
        previousFormats: [
          ...prev.previousFormats,
          currentInteraction.display as any
        ],
        sessionHistory: [
          ...prev.sessionHistory,
          {
            mode: currentInteraction.mode,
            word: currentInteraction.word,
            format: currentInteraction.display
          }
        ]
      }));
    }
  };

  // Calculate journey metrics
  const metrics: JourneyMetrics | null = useMemo(() => {
    if (!isComplete) return null;

    const modesUsed = Array.from(
      new Set(interactions.map(i => i.mode))
    );

    const wordsExplored = interactions.map((interaction, index) => {
      const wordProfile = wordProfiles[index];
      return {
        word: interaction.word,
        mode: interaction.mode,
        cognitiveWeight: wordProfile?.cognitiveWeight || "unknown"
      };
    });

    const totalDuration = Date.now() - progress.startTime;
    const averageTimePerInteraction = progress.responses.length > 0
      ? totalDuration / progress.responses.length
      : 0;

    const journeyQuality = sessionEngine.analyzeJourney(sessionContext);

    return {
      wordsExplored,
      modesUsed,
      averageTimePerInteraction,
      journeyQuality,
      totalDuration
    };
  }, [isComplete, interactions, wordProfiles, progress, sessionContext]);

  // Debug logging
  console.log('📊 Hook state:', {
    totalInteractions: interactions.length,
    currentIndex: progress.currentIndex,
    isComplete,
    hasCurrentInteraction: !!currentInteraction,
    isLoading,
    error
  });

  return {
    currentInteraction,
    progress,
    advance,
    isComplete,
    metrics,
    isLoading,
    error
  };
}

/**
 * Helper function to get word content from the database
 */
export function getWordContent(wordText: string): WordContent | undefined {
  return wordDatabase.find(
    w => w.word.toLowerCase() === wordText.toLowerCase()
  );
}

/**
 * Get all words in a specific cluster
 */
export function getWordsInCluster(clusterName: string): WordContent[] {
  return wordDatabase.filter(
    w => w.cluster.toLowerCase() === clusterName.toLowerCase()
  );
}

/**
 * Get all available clusters
 */
export function getAvailableClusters(): string[] {
  return Array.from(new Set(wordDatabase.map(w => w.cluster)));
}
