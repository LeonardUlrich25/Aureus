// lib/session-modes/PersonaMode.ts

import {
  AnchorPrompt,
  DisplayFormat,
  SessionInteraction,
  SessionContext,
  WordProfile
} from "@/types/session";
import { MicroSessionMode } from "./MicroSessionMode";

/**
 * Persona mode: Explores who uses the word and how.
 * Connects language to social position and identity.
 */
export class PersonaMode extends MicroSessionMode {
  generateAnchor(word: WordProfile): AnchorPrompt {
    return {
      promptText: `Who gains credibility by using '${word.text}'?`,
      focus: "enabler"
    };
  }

  selectDisplayFormat(word: WordProfile, sessionContext: SessionContext): DisplayFormat {
    const previousFormats = sessionContext.previousFormats || [];
    const recentFormats = previousFormats.slice(-2);
    const available = [DisplayFormat.SCENARIO_PICKER, DisplayFormat.CARD].filter(
      f => !recentFormats.includes(f)
    );
    return available[0] || DisplayFormat.CARD;
  }

  createInteraction(
    word: WordProfile,
    anchor: AnchorPrompt,
    displayFormat: DisplayFormat
  ): SessionInteraction {
    return {
      mode: "persona",
      word: word.text,
      anchor: anchor.promptText,
      display: displayFormat,
      task: {
        type: "match_persona",
        personas: this.generatePersonas(word),
        prompt: "Which person would naturally use this word?",
        explanation: "Consider context, credibility, and authenticity"
      }
    };
  }

  private generatePersonas(word: WordProfile): Array<{ id: string; name: string; context: string; correct: boolean }> {
    // Generate contextually appropriate personas based on semantic field
    const personaMap: Record<string, Array<{ id: string; name: string; context: string; correct: boolean }>> = {
      "pedagogy": [
        { id: "a", name: "Education Professor", context: "designing a curriculum framework", correct: true },
        { id: "b", name: "Marketing Manager", context: "planning a product launch", correct: false },
        { id: "c", name: "Software Engineer", context: "debugging code", correct: false }
      ],
      "synergy": [
        { id: "a", name: "Strategy Consultant", context: "analyzing merger benefits", correct: true },
        { id: "b", name: "Barista", context: "making coffee orders", correct: false },
        { id: "c", name: "Novelist", context: "describing a character", correct: false }
      ],
      "nuance": [
        { id: "a", name: "Literary Critic", context: "analyzing a novel's themes", correct: true },
        { id: "b", name: "Construction Worker", context: "discussing blueprints", correct: false },
        { id: "c", name: "Cashier", context: "ringing up purchases", correct: false }
      ]
    };

    return personaMap[word.text.toLowerCase()] || [
      { id: "a", name: "Academic", context: "research presentation", correct: true },
      { id: "b", name: "Executive", context: "strategy meeting", correct: false },
      { id: "c", name: "Artist", context: "critique discussion", correct: false }
    ];
  }
}
