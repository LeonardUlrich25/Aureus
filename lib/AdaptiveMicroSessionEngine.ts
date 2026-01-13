// lib/AdaptiveMicroSessionEngine.ts

import {
  SessionMode,
  WordProfile,
  SessionInteraction,
  SessionContext,
  JourneyAnalysis,
  WordCognitiveWeight
} from "@/types/session";
import { ContrastMode } from "./session-modes/ContrastMode";
import { HierarchyMode } from "./session-modes/HierarchyMode";
import { PersonaMode } from "./session-modes/PersonaMode";
import { MapMode } from "./session-modes/MapMode";
import { NarrativeMode } from "./session-modes/NarrativeMode";
import { MicroSessionMode } from "./session-modes/MicroSessionMode";

/**
 * Core engine that orchestrates concept-driven learning.
 * 
 * Principles:
 * - Method follows meaning
 * - No uniform pipeline
 * - Reads learner patterns and builds progression
 * - Explores how reality changes when a word is used
 */
export class AdaptiveMicroSessionEngine {
  private modeRegistry: Map<SessionMode, MicroSessionMode>;

  constructor() {
    this.modeRegistry = new Map<SessionMode, MicroSessionMode>();
    this.modeRegistry.set(SessionMode.CONTRAST, new ContrastMode());
    this.modeRegistry.set(SessionMode.HIERARCHY, new HierarchyMode());
    this.modeRegistry.set(SessionMode.PERSONA, new PersonaMode());
    this.modeRegistry.set(SessionMode.MAP, new MapMode());
    this.modeRegistry.set(SessionMode.NARRATIVE, new NarrativeMode());
    
    console.log('🚀 AdaptiveMicroSessionEngine initialized with modes:', 
      Array.from(this.modeRegistry.keys()));
  }

  /**
   * Select appropriate mode based on word's cognitive weight and session context.
   * NOT random. Deliberate selection based on meaning.
   */
  selectModeForWord(word: WordProfile, sessionHistory: Array<{ mode: string; word: string }>): SessionMode {
    console.log(`    🎯 Selecting mode for word: "${word.text}" (${word.cognitiveWeight})`);
    
    // Analyze session pattern
    const recentModes = sessionHistory.slice(-3).map(s => s.mode);

    // Map cognitive weight to preferred modes
    const weightModeMap: Record<WordCognitiveWeight, SessionMode[]> = {
      [WordCognitiveWeight.INTELLECTUAL]: [SessionMode.HIERARCHY, SessionMode.MAP],
      [WordCognitiveWeight.EMOTIONAL]: [SessionMode.PERSONA, SessionMode.NARRATIVE],
      [WordCognitiveWeight.RELATIONAL]: [SessionMode.MAP, SessionMode.HIERARCHY],
      [WordCognitiveWeight.DISCRIMINATIVE]: [SessionMode.CONTRAST, SessionMode.HIERARCHY]
    };

    const preferredModes = weightModeMap[word.cognitiveWeight] || [SessionMode.CONTRAST];
    console.log(`    Preferred modes:`, preferredModes);

    // Select mode not recently used
    for (const mode of preferredModes) {
      if (!recentModes.includes(mode)) {
        console.log(`    ✓ Selected: ${mode} (not recently used)`);
        return mode;
      }
    }

    // Fallback: return first preferred
    console.log(`    ✓ Selected: ${preferredModes[0]} (fallback)`);
    return preferredModes[0];
  }

  /**
   * Generate micro-session for selected words.
   * 
   * Returns coherent journey, not isolated tasks.
   * Learner should not predict next action—uncertainty increases engagement.
   */
  createMicroSession(
    words: WordProfile[],
    sessionContext?: Partial<SessionContext>,
    userProfile?: any
  ): SessionInteraction[] {
    console.log('═══════════════════════════════════════');
    console.log('📚 CREATE MICRO SESSION CALLED');
    console.log('Input words:', words);
    console.log('Words count:', words?.length || 0);
    console.log('Session context:', sessionContext);
    console.log('═══════════════════════════════════════');

    // CRITICAL: Validate input
    if (!words) {
      console.error('❌ ERROR: words is null or undefined');
      return [];
    }

    if (!Array.isArray(words)) {
      console.error('❌ ERROR: words is not an array:', typeof words);
      return [];
    }

    if (words.length === 0) {
      console.error('❌ ERROR: words array is empty');
      return [];
    }

    const context: SessionContext = {
      previousFormats: sessionContext?.previousFormats || [],
      sessionHistory: sessionContext?.sessionHistory || []
    };

    const interactions: SessionInteraction[] = [];
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      console.log(`\n--- Processing word ${i + 1}/${words.length}: "${word?.text}" ---`);

      try {
        // Validate word object
        if (!word) {
          console.error(`❌ Word at index ${i} is null/undefined`);
          failCount++;
          continue;
        }

        if (!word.text) {
          console.error(`❌ Word at index ${i} missing 'text' property:`, word);
          failCount++;
          continue;
        }

        if (!word.cognitiveWeight) {
          console.error(`❌ Word "${word.text}" missing cognitiveWeight:`, word);
          failCount++;
          continue;
        }

        console.log(`✓ Word validated:`, word.text);

        // Select mode based on word nature and context
        const mode = this.selectModeForWord(word, context.sessionHistory);
        console.log(`  Mode selected: ${mode}`);
        
        const modeHandler = this.modeRegistry.get(mode);

        if (!modeHandler) {
          console.error('❌ No handler found for mode:', mode);
          failCount++;
          continue;
        }

        // Generate adaptive anchor
        const anchor = modeHandler.generateAnchor(word);
        console.log(`  Anchor generated:`, anchor?.promptText?.substring(0, 50) + '...');

        // Select varied display format
        const displayFormat = modeHandler.selectDisplayFormat(word, context);
        console.log(`  Display format: ${displayFormat}`);

        // Create interaction
        let interaction = modeHandler.createInteraction(word, anchor, displayFormat);
        console.log(`  Interaction created:`, interaction ? '✓' : '✗');

        // Validate interaction structure
        if (!interaction) {
          console.error(`❌ Interaction is null for word: ${word.text}`);
          failCount++;
          continue;
        }

        if (!interaction.task) {
          console.error(`❌ Interaction missing task for word: ${word.text}`, interaction);
          failCount++;
          continue;
        }

        console.log(`  Task validated:`, interaction.task?.instruction?.substring(0, 50) + '...');

        // PERSONALIZE INTERACTION BASED ON USER PROFILE (SILENT)
        if (userProfile && userProfile.sessionHistory && userProfile.sessionHistory.totalSessions > 1) {
          interaction = this.personalizeInteraction(interaction, userProfile);
        }

        // Update context for next word (builds progression)
        context.previousFormats.push(displayFormat);
        context.sessionHistory.push({
          mode: mode,
          word: word.text,
          format: displayFormat
        });

        interactions.push(interaction);
        successCount++;

        console.log(`✅ Successfully created interaction for "${word.text}"`);

      } catch (err) {
        console.error(`❌ ERROR processing word at index ${i}:`, err);
        console.error('Word data:', word);
        console.error('Stack:', err instanceof Error ? err.stack : 'No stack');
        failCount++;
      }
    }

    console.log('\n═══════════════════════════════════════');
    console.log(`📊 MICRO SESSION CREATION SUMMARY`);
    console.log(`Total words: ${words.length}`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📦 Interactions created: ${interactions.length}`);
    console.log('═══════════════════════════════════════\n');

    if (interactions.length === 0) {
      console.error('🚨 CRITICAL: No interactions were created!');
      console.error('This will cause the session to skip to summary');
    }

    return interactions;
  }

  /**
   * Apply lightweight personalization to an interaction using the user's profile.
   * This runs silently and modifies examples/scenarios to match detected context preferences.
   */
  private personalizeInteraction(interaction: any, userProfile: any): any {
    const contextPrefs = userProfile.contextPreferences || {};
    const dominantContext = Object.entries(contextPrefs)
      .sort(([,a]: any, [,b]: any) => b - a)[0]?.[0] || 'general';

    console.log(`🎨 Personalizing interaction for context: ${dominantContext}`);

    if (interaction.task && dominantContext !== 'general') {
      interaction.task = this.adaptTaskToContext(interaction, dominantContext);
    }

    return {
      ...interaction,
      personalized: true,
      context: dominantContext
    };
  }

  private adaptTaskToContext(interaction: any, context: string): any {
    const word = interaction.word;
    const task = { ...interaction.task };

    const contextExamples: Record<string, any> = {
      work: {
        correct_context: `In a team meeting, using "${word}" demonstrates professional communication`,
        incorrect_context: `Casually using "${word}" in an email might seem overly formal`,
        scenario_template: `You're in a workplace discussion about project strategy. How would "${word}" fit?`,
      },
      academic: {
        correct_context: `In an academic paper, "${word}" adds precision to your argument`,
        incorrect_context: `Using "${word}" in casual conversation might seem pedantic`,
        scenario_template: `You're writing a research summary. Where does "${word}" strengthen your analysis?`,
      },
      creative: {
        correct_context: `In creative writing, "${word}" adds nuance to character expression`,
        incorrect_context: `Overusing "${word}" in dialogue might feel unnatural`,
        scenario_template: `You're crafting a character's internal monologue. How does "${word}" reveal their mindset?`,
      },
      social: {
        correct_context: `In conversation, "${word}" helps articulate complex feelings`,
        incorrect_context: `Using "${word}" too formally might create distance in friendships`,
        scenario_template: `You're discussing a relationship dynamic with a friend. How does "${word}" clarify the situation?`,
      },
      technical: {
        correct_context: `In technical documentation, "${word}" provides necessary specificity`,
        incorrect_context: `Using "${word}" without context might confuse non-technical readers`,
        scenario_template: `You're explaining a system architecture. Where does "${word}" add clarity?`,
      }
    };

    const contextAdaptation = contextExamples[context] || {};

    return {
      ...task,
      ...contextAdaptation,
      adaptedFor: context
    };
  }

  /**
   * Read patterns across multiple words to build coherent progression.
   * This turns isolated tasks into a journey.
   */
  analyzeJourney(sessionContext: SessionContext): JourneyAnalysis {
    const history = sessionContext.sessionHistory || [];

    if (history.length < 2) {
      return {
        progression: "building",
        modeDiversity: 0,
        journeyQuality: "developing"
      };
    }

    // Analyze mode variety
    const modesUsed = new Set(history.map(s => s.mode));
    const modeDiversity = modesUsed.size;

    return {
      progression: modeDiversity >= 3 ? "coherent" : "emerging",
      modeDiversity,
      journeyQuality: modeDiversity >= 4 ? "category-defining" : "developing"
    };
  }

  /**
   * Get a specific mode handler for external use
   */
  getMode(mode: SessionMode): MicroSessionMode | undefined {
    return this.modeRegistry.get(mode);
  }
}

// Export singleton instance
export const sessionEngine = new AdaptiveMicroSessionEngine();
