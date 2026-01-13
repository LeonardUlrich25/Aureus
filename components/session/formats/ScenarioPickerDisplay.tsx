"use client";

import { useState, useEffect } from "react";
import { DisplayComponentProps } from "@/types/session";
import { StarButton } from "@/components/StarButton";

export default function ScenarioPickerDisplay({ interaction, onComplete, interactionId }: DisplayComponentProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = sessionStorage.getItem('userId') || '';
      setUserId(storedUserId);
    }
  }, []);

  const personas = interaction.task.personas || [];

  const handleSelect = (personaId: string, isCorrect: boolean) => {
    setSelected(personaId);
    setRevealed(true);

    setTimeout(() => {
      onComplete({
        interactionId,
        selectedOption: personaId,
        isCorrect,
        timestamp: Date.now()
      });
    }, 1800);
  };

  return (
    <div className="px-6 py-12 md:py-3 md:h-screen md:flex md:flex-col md:overflow-hidden">
      <div className="max-w-4xl w-full mx-auto flex flex-col md:flex-1 md:overflow-hidden md:justify-center">
        
        {/* Anchor prompt */}
        <div className="mb-6 md:mb-3 text-center">
          <p className="text-base md:text-sm text-stone-600 leading-relaxed">
            {interaction.anchor}
          </p>
        </div>

        {/* Word with Star Button */}
        <div className="mb-4 md:mb-2 text-center flex items-center justify-center gap-4">
          <h2 className="text-2xl md:text-xl font-medium text-stone-800">
            {interaction.word}
          </h2>
          {userId && (
            <StarButton
              word={interaction.word}
              definition={`Definition of ${interaction.word}`}
              cluster="general"
              difficulty={5}
              userId={userId}
              size="lg"
            />
          )}
        </div>

        {/* Task prompt */}
        <div className="mb-4 md:mb-3 text-center">
          <p className="text-sm md:text-xs text-stone-500">
            {interaction.task.prompt}
          </p>
        </div>

        {/* Persona scenarios */}
        <div className="space-y-4">
          {personas.map((persona: any) => {
            const isSelected = selected === persona.id;
            const showFeedback = revealed && isSelected;
            const isCorrectOption = persona.correct;

            return (
              <button
                key={persona.id}
                onClick={() => !revealed && handleSelect(persona.id, isCorrectOption)}
                disabled={revealed}
                className={`
                  w-full p-4 md:p-2 rounded-3xl text-left transition-all duration-500
                  ${!revealed ? 'hover:shadow-xl hover:scale-[1.02]' : ''}
                  ${isSelected && !showFeedback ? 'bg-stone-200 border-2 border-stone-400' : ''}
                  ${showFeedback && isCorrectOption ? 'bg-emerald-50 border-2 border-emerald-400' : ''}
                  ${showFeedback && !isCorrectOption ? 'bg-rose-50 border-2 border-rose-400' : ''}
                  ${!isSelected && !revealed ? 'bg-white border-2 border-stone-200' : ''}
                  ${!isSelected && revealed ? 'opacity-40' : ''}
                `}
              >
                <div className="flex items-start gap-2 md:gap-1">
                  <div className={`
                    flex-shrink-0 w-8 md:w-6 h-8 md:h-6 rounded-full flex items-center justify-center font-medium text-xs md:text-[10px]
                    ${isSelected && showFeedback && isCorrectOption ? 'bg-emerald-200 text-emerald-800' : ''}
                    ${isSelected && showFeedback && !isCorrectOption ? 'bg-rose-200 text-rose-800' : ''}
                    ${!showFeedback ? 'bg-stone-200 text-stone-600' : ''}
                  `}>
                    {persona.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-stone-800 mb-2">
                      {persona.name}
                    </h3>
                    <p className="text-sm text-stone-600">
                      Context: {persona.context}
                    </p>
                    
                    {showFeedback && (
                      <div className="mt-4 pt-4 border-t border-stone-200">
                        {isCorrectOption ? (
                          <span className="text-emerald-700 font-medium">
                            ✓ Natural credibility in this position
                          </span>
                        ) : (
                          <span className="text-rose-700 font-medium">
                            → Word doesn't align with this role
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {interaction.task.explanation && !revealed && (
          <div className="mt-8 text-center">
            <p className="text-sm text-stone-500 italic">
              {interaction.task.explanation}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
