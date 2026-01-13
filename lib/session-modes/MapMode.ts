// lib/session-modes/MapMode.ts

import {
  AnchorPrompt,
  DisplayFormat,
  SessionInteraction,
  SessionContext,
  WordProfile
} from "@/types/session";
import { MicroSessionMode } from "./MicroSessionMode";

/**
 * Map mode: Visual links to related concepts.
 * Builds semantic networks, not isolated definitions.
 */
export class MapMode extends MicroSessionMode {
  generateAnchor(word: WordProfile): AnchorPrompt {
    return {
      promptText: `What concepts orbit '${word.text}'?`,
      focus: "relational"
    };
  }

  selectDisplayFormat(word: WordProfile, sessionContext: SessionContext): DisplayFormat {
    const previousFormats = sessionContext.previousFormats || [];
    const recentFormats = previousFormats.slice(-2);
    
    if (!recentFormats.includes(DisplayFormat.DRAG_CONNECT)) {
      return DisplayFormat.DRAG_CONNECT;
    }
    return DisplayFormat.CARD;
  }

  createInteraction(
    word: WordProfile,
    anchor: AnchorPrompt,
    displayFormat: DisplayFormat
  ): SessionInteraction {
    return {
      mode: "map",
      word: word.text,
      anchor: anchor.promptText,
      display: displayFormat,
      task: {
        type: "build_semantic_map",
        relatedConcepts: this.generateRelatedConcepts(word),
        prompt: "Connect related ideas",
        explanation: "Build the semantic network around this word"
      }
    };
  }

  private generateRelatedConcepts(word: WordProfile): Array<{ concept: string; relationship: string }> {
    // Generate semantic field based on word
    const conceptMap: Record<string, Array<{ concept: string; relationship: string }>> = {
      "synergy": [
        { concept: "collaboration", relationship: "requires" },
        { concept: "amplification", relationship: "creates" },
        { concept: "integration", relationship: "involves" },
        { concept: "complementary", relationship: "depends on" },
        { concept: "whole > sum", relationship: "produces" }
      ],
      "empathy": [
        { concept: "perspective-taking", relationship: "requires" },
        { concept: "emotional resonance", relationship: "involves" },
        { concept: "compassion", relationship: "leads to" },
        { concept: "understanding", relationship: "deepens" },
        { concept: "connection", relationship: "builds" }
      ],
      "nuance": [
        { concept: "subtlety", relationship: "embodies" },
        { concept: "distinction", relationship: "reveals" },
        { concept: "complexity", relationship: "indicates" },
        { concept: "depth", relationship: "suggests" },
        { concept: "refinement", relationship: "requires" }
      ]
    };

    return conceptMap[word.text.toLowerCase()] || [
      { concept: `related_to_${word.text}`, relationship: "connects" },
      { concept: word.semanticField, relationship: "belongs to" },
      { concept: "context", relationship: "depends on" }
    ];
  }
}
