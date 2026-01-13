// lib/session-modes/HierarchyMode.ts

import {
  AnchorPrompt,
  DisplayFormat,
  SessionInteraction,
  SessionContext,
  WordProfile
} from "@/types/session";
import { MicroSessionMode } from "./MicroSessionMode";

/**
 * Hierarchy mode: Maps spectrum or layers of meaning.
 * Reveals gradations and relationships.
 */
export class HierarchyMode extends MicroSessionMode {
  generateAnchor(word: WordProfile): AnchorPrompt {
    return {
      promptText: `Where does '${word.text}' sit on the spectrum of intensity?`,
      focus: "relational"
    };
  }

  selectDisplayFormat(word: WordProfile, sessionContext: SessionContext): DisplayFormat {
    const previousFormats = sessionContext.previousFormats || [];
    const recentFormats = previousFormats.slice(-2);
    
    // Slider naturally fits hierarchy
    if (!recentFormats.includes(DisplayFormat.SLIDER)) {
      return DisplayFormat.SLIDER;
    }
    return DisplayFormat.CARD;
  }

  createInteraction(
    word: WordProfile,
    anchor: AnchorPrompt,
    displayFormat: DisplayFormat
  ): SessionInteraction {
    return {
      mode: "hierarchy",
      word: word.text,
      anchor: anchor.promptText,
      display: displayFormat,
      task: {
        type: "position_on_spectrum",
        spectrum: this.generateSpectrum(word),
        prompt: "Where does this word belong?",
        explanation: `Rank these related concepts from least to most intense`
      }
    };
  }

  private generateSpectrum(word: WordProfile): string[] {
    // Generate semantic spectrum based on word
    const spectrumMap: Record<string, string[]> = {
      "assertive": ["timid", "polite", "direct", "assertive", "aggressive", "domineering"],
      "nuance": ["obvious", "clear", "subtle", "nuance", "imperceptible"],
      "wrath": ["annoyance", "anger", "fury", "wrath", "rage"],
      "cordial": ["cold", "neutral", "friendly", "cordial", "warm", "affectionate"],
      "proficiency": ["novice", "beginner", "competent", "proficiency", "expert", "master"]
    };
    
    return spectrumMap[word.text.toLowerCase()] || 
      ["mild", "moderate", word.text, "strong", "intense"];
  }
}
