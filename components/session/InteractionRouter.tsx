"use client";

import { SessionInteraction, InteractionResponse, DisplayFormat } from "@/types/session";
import CardDisplay from "./formats/CardDisplay";
import SliderDisplay from "./formats/SliderDisplay";
import TwoChoiceDisplay from "./formats/TwoChoiceDisplay";
import FillInDisplay from "./formats/FillInDisplay";
import DragConnectDisplay from "./formats/DragConnectDisplay";
import ScenarioPickerDisplay from "./formats/ScenarioPickerDisplay";

interface InteractionRouterProps {
  interaction: SessionInteraction;
  onComplete: (response: InteractionResponse) => void;
  progress: {
    current: number;
    total: number;
  };
}

/**
 * Routes to appropriate display format component based on interaction type.
 * Manages transitions and progress indication.
 */
export default function InteractionRouter({ interaction, onComplete, progress }: InteractionRouterProps) {
  console.log('🎯 InteractionRouter rendering:');
  console.log('  - Display type:', interaction.display);
  console.log('  - Word:', interaction.word);
  console.log('  - Mode:', interaction.mode);
  console.log('  - Has task:', !!interaction.task);
  console.log('  - Progress:', `${progress.current}/${progress.total}`);
  
  const interactionId = `${interaction.word}-${interaction.mode}-${Date.now()}`;

  // Route to appropriate component
  const renderInteraction = () => {
    switch (interaction.display) {
      case DisplayFormat.CARD:
        return (
          <CardDisplay
            interaction={interaction}
            onComplete={onComplete}
            interactionId={interactionId}
          />
        );

      case DisplayFormat.SLIDER:
        return (
          <SliderDisplay
            interaction={interaction}
            onComplete={onComplete}
            interactionId={interactionId}
          />
        );

      case DisplayFormat.TWO_CHOICE:
        return (
          <TwoChoiceDisplay
            interaction={interaction}
            onComplete={onComplete}
            interactionId={interactionId}
          />
        );

      case DisplayFormat.FILL_IN:
        return (
          <FillInDisplay
            interaction={interaction}
            onComplete={onComplete}
            interactionId={interactionId}
          />
        );

      case DisplayFormat.DRAG_CONNECT:
        return (
          <DragConnectDisplay
            interaction={interaction}
            onComplete={onComplete}
            interactionId={interactionId}
          />
        );

      case DisplayFormat.SCENARIO_PICKER:
        return (
          <ScenarioPickerDisplay
            interaction={interaction}
            onComplete={onComplete}
            interactionId={interactionId}
          />
        );

      default:
        // Fallback with logging
        console.warn('⚠️ Unknown display type, falling back to card:', interaction.display);
        return (
          <CardDisplay
            interaction={interaction}
            onComplete={onComplete}
            interactionId={interactionId}
          />
        );
    }
  };

  return (
    <div className="relative">
      {/* Subtle progress indicator */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1" style={{ background: 'rgba(10,30,92,0.12)' }}>
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${(progress.current / progress.total) * 100}%`,
              background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))'
            }}
          />
        </div>
      </div>

      {/* Progress dots - very subtle */}
      <div className="fixed top-6 right-6 flex gap-1.5 z-50">
        {Array.from({ length: progress.total }).map((_, index) => (
          <div
            key={index}
            className={`
              w-1.5 h-1.5 rounded-full transition-all duration-300
              ${index < progress.current 
                ? 'scale-100' 
                : index === progress.current 
                  ? 'scale-125' 
                  : 'opacity-60'
              }
            `}
            style={{
              background: index <= progress.current 
                ? 'var(--accent-primary)'
                : 'rgba(10,30,92,0.25)'
            }}
          />
        ))}
      </div>

      {/* Interaction content */}
      <div className="animate-fadeIn">
        {renderInteraction()}
      </div>
    </div>
  );
}
