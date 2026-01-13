// lib/session-modes/ContrastMode.ts

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
 * Contrast mode: Explores meaning vs incorrect usage.
 * Sharpens understanding through discrimination.
 */
export class ContrastMode extends MicroSessionMode {
  generateAnchor(word: WordProfile): AnchorPrompt {
    if (word.cognitiveWeight === WordCognitiveWeight.EMOTIONAL) {
      return {
        promptText: `When would using '${word.text}' feel authentic to you?`,
        focus: "lived_experience"
      };
    } else if (word.cognitiveWeight === WordCognitiveWeight.INTELLECTUAL) {
      return {
        promptText: `In which professional context would '${word.text}' carry precision?`,
        focus: "context"
      };
    } else {
      return {
        promptText: `What changes when you choose '${word.text}' over simpler alternatives?`,
        focus: "outcome"
      };
    }
  }

  selectDisplayFormat(word: WordProfile, sessionContext: SessionContext): DisplayFormat {
    // Avoid repeating previous format
    const previousFormats = sessionContext.previousFormats || [];
    const recentFormats = previousFormats.slice(-2);
    const available = Object.values(DisplayFormat).filter(
      f => !recentFormats.includes(f as DisplayFormat)
    );

    // Preference: two-choice works well for contrast
    if (available.includes(DisplayFormat.TWO_CHOICE)) {
      return DisplayFormat.TWO_CHOICE;
    }
    return (available[0] as DisplayFormat) || DisplayFormat.CARD;
  }

  createInteraction(
    word: WordProfile,
    anchor: AnchorPrompt,
    displayFormat: DisplayFormat
  ): SessionInteraction {
    return {
      mode: "contrast",
      word: word.text,
      anchor: anchor.promptText,
      display: displayFormat,
      task: {
        type: "identify_misuse",
        correctContext: this.generateCorrectUsage(word),
        incorrectContext: this.generateIncorrectUsage(word),
        prompt: "Which scenario shows authentic use?",
        options: [
          { id: "a", text: this.generateCorrectUsage(word), correct: true },
          { id: "b", text: this.generateIncorrectUsage(word), correct: false }
        ]
      }
    };
  }

  private generateCorrectUsage(word: WordProfile): string {
    // Context-aware correct usage generation
    const contextMap: Record<string, string> = {
      "nuance": "The critic appreciated the nuance in the director's subtle visual storytelling.",
      "synergy": "The design and engineering teams achieved synergy, creating a product neither could have built alone.",
      "pedagogy": "Her pedagogy emphasized inquiry-based learning over rote memorization.",
      "resilience": "After the setback, their resilience became evident in how they rebuilt with greater wisdom.",
      "empathy": "True empathy requires setting aside judgment and entering another's emotional world."
    };
    return contextMap[word.text.toLowerCase()] || 
      `A context where ${word.text} is used authentically and precisely.`;
  }

  private generateIncorrectUsage(word: WordProfile): string {
    // Context-aware incorrect usage generation
    const contextMap: Record<string, string> = {
      "nuance": "We need more nuance in our marketing to make it really bold and attention-grabbing.",
      "synergy": "Let's leverage synergy to ensure the report gets submitted on time.",
      "pedagogy": "The pedagogy of this textbook is really user-friendly and easy to read.",
      "resilience": "Show resilience by never admitting mistakes or changing your approach.",
      "empathy": "Demonstrate empathy by agreeing with everyone to avoid conflict."
    };
    return contextMap[word.text.toLowerCase()] || 
      `A context where ${word.text} is misapplied or used superficially.`;
  }
}
