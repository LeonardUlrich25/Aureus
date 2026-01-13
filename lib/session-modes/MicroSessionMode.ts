// lib/session-modes/MicroSessionMode.ts

import {
  AnchorPrompt,
  DisplayFormat,
  SessionInteraction,
  SessionContext,
  WordProfile
} from "@/types/session";

/**
 * Abstract base for session modes. Each mode implements a different
 * cognitive training pattern.
 */
export abstract class MicroSessionMode {
  /**
   * Generate personalized anchor prompt based on word nature.
   */
  abstract generateAnchor(word: WordProfile): AnchorPrompt;

  /**
   * Choose appropriate display format for this word in this context.
   */
  abstract selectDisplayFormat(word: WordProfile, sessionContext: SessionContext): DisplayFormat;

  /**
   * Build the actual interaction.
   * Goal: Learner finishes thinking "I know when to use this word,"
   * not "I memorized a definition."
   */
  abstract createInteraction(
    word: WordProfile,
    anchor: AnchorPrompt,
    displayFormat: DisplayFormat
  ): SessionInteraction;
}
