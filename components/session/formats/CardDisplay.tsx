"use client";

import { useState } from "react";
import { DisplayComponentProps } from "@/types/session";

export default function CardDisplay({ interaction, onComplete, interactionId }: DisplayComponentProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (optionId: string, isCorrect: boolean) => {
    setSelected(optionId);
    setRevealed(true);

    setTimeout(() => {
      onComplete({
        interactionId,
        selectedOption: optionId,
        isCorrect,
        timestamp: Date.now()
      });
    }, 1500);
  };

  return (
    <div className="px-6 py-12 md:py-3 md:h-screen md:flex md:flex-col md:overflow-hidden">
      <div className="max-w-2xl w-full mx-auto flex flex-col md:flex-1 md:overflow-hidden md:justify-center">
        
        {/* Anchor prompt */}
        <div className="mb-8 md:mb-4 text-center">
          <p className="text-base md:text-sm text-stone-600 leading-relaxed">
            {interaction.anchor}
          </p>
        </div>

        {/* Word */}
        <div className="mb-4 md:mb-3 text-center">
          <h2 className="text-2xl md:text-2xl font-medium text-stone-800">
            {interaction.word}
          </h2>
        </div>

        {/* Task prompt */}
        <div className="mb-6 md:mb-3 text-center">
          <p className="text-sm md:text-xs text-stone-500">
            {interaction.task.prompt}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {interaction.task.options?.map((option: any) => {
            const isSelected = selected === option.id;
            const showFeedback = revealed && isSelected;
            const isCorrectOption = option.correct;

            return (
              <button
                key={option.id}
                onClick={() => !revealed && handleSelect(option.id, isCorrectOption)}
                disabled={revealed}
                className={`
                  w-full p-4 md:p-3 rounded-2xl text-left transition-all duration-300
                  ${!revealed ? 'hover:shadow-lg hover:scale-[1.02]' : ''}
                  ${isSelected && !showFeedback ? 'bg-stone-200 border-2 border-stone-400' : ''}
                  ${showFeedback && isCorrectOption ? 'bg-emerald-50 border-2 border-emerald-400' : ''}
                  ${showFeedback && !isCorrectOption ? 'bg-rose-50 border-2 border-rose-400' : ''}
                  ${!isSelected ? 'bg-white border-2 border-stone-200' : ''}
                `}
              >
                <p className="text-base text-stone-700 leading-relaxed">
                  {option.text}
                </p>
                
                {showFeedback && (
                  <div className="mt-3 text-sm">
                    {isCorrectOption ? (
                      <span className="text-emerald-700 font-medium">✓ Authentic use</span>
                    ) : (
                      <span className="text-rose-700 font-medium">→ Misapplied</span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
