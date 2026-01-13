// lib/session-modes/NarrativeMode.ts

import {
  AnchorPrompt,
  DisplayFormat,
  SessionInteraction,
  SessionContext,
  WordProfile,
  WordCognitiveWeight
} from "@/types/session";
import { MicroSessionMode } from "./MicroSessionMode";

/**
 * Narrative mode: Micro-story the learner edits.
 * Language in context, not isolation. Reality changes when word is used.
 */
export class NarrativeMode extends MicroSessionMode {
  generateAnchor(word: WordProfile): AnchorPrompt {
    if (word.cognitiveWeight === WordCognitiveWeight.EMOTIONAL) {
      return {
        promptText: `In what moment would someone need '${word.text}'?`,
        focus: "lived_experience"
      };
    } else {
      return {
        promptText: `Complete the scenario where '${word.text}' becomes essential`,
        focus: "context"
      };
    }
  }

  selectDisplayFormat(word: WordProfile, sessionContext: SessionContext): DisplayFormat {
    const previousFormats = sessionContext.previousFormats || [];
    const recentFormats = previousFormats.slice(-2);
    
    if (!recentFormats.includes(DisplayFormat.FILL_IN)) {
      return DisplayFormat.FILL_IN;
    }
    return DisplayFormat.CARD;
  }

  createInteraction(
    word: WordProfile,
    anchor: AnchorPrompt,
    displayFormat: DisplayFormat
  ): SessionInteraction {
    return {
      mode: "narrative",
      word: word.text,
      anchor: anchor.promptText,
      display: displayFormat,
      task: {
        type: "complete_scenario",
        scenarioTemplate: this.generateScenario(word),
        prompt: "Shape the moment this word appears",
        explanation: "How does using this word change the outcome?"
      }
    };
  }

  private generateScenario(word: WordProfile): string {
    // Generate contextual micro-story
    const scenarioMap: Record<string, string> = {
      "synergy": "Two teams were working separately on the same problem. When they finally met, their approaches created _____, achieving results neither could have reached alone.",
      "empathy": "She disagreed strongly with his decision, but instead of arguing, she practiced _____, understanding the fears that drove his choice.",
      "nuance": "The translation was technically accurate, but it missed the _____ that made the original poem resonate emotionally.",
      "resilience": "After three failed attempts, most would quit. Her _____ meant she analyzed each failure and tried again with adjusted strategy.",
      "pedagogy": "He knew the subject deeply, but his _____ was what made complex ideas accessible to students at different levels."
    };

    return scenarioMap[word.text.toLowerCase()] || 
      `A scenario where ${word.text} changes the outcome: [Your scenario here]`;
  }
}
