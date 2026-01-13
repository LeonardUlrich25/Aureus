"use client";

import { useState, useEffect } from "react";
import { DisplayComponentProps } from "@/types/session";
import { StarButton } from "@/components/StarButton";

export default function TwoChoiceDisplay({ interaction, onComplete, interactionId }: DisplayComponentProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = sessionStorage.getItem('userId') || '';
      setUserId(storedUserId);
    }
  }, []);

  const options = interaction.task.options || [];
  const optionA = options[0];
  const optionB = options[1];

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

        {/* Word */}
        <div className="mb-4 md:mb-2 text-center">
          <div className="flex items-center justify-center gap-3">
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
        </div>

        {/* Task prompt */}
        <div className="mb-4 md:mb-3 text-center">
          <p className="text-sm md:text-xs text-stone-500">
            {interaction.task.prompt}
          </p>
        </div>

        {/* Two choice grid */}
        <div className="grid md:grid-cols-2 gap-3 md:gap-2">
          {/* Option A */}
          <button
            onClick={() => !revealed && handleSelect(optionA.id, optionA.correct)}
            disabled={revealed}
            className={`
              p-4 md:p-2 rounded-3xl text-left transition-all duration-500
              ${!revealed ? 'hover:shadow-2xl hover:scale-[1.03]' : ''}
              ${selected === optionA.id && revealed && optionA.correct ? 'bg-emerald-50 border-4 border-emerald-400' : ''}
              ${selected === optionA.id && revealed && !optionA.correct ? 'bg-rose-50 border-4 border-rose-400' : ''}
              ${selected !== optionA.id && revealed ? 'opacity-50' : ''}
              ${!revealed ? 'bg-white border-2 border-stone-200' : ''}
            `}
          >
            <div className="mb-2 md:mb-1">
              <span className="text-lg md:text-base font-medium text-stone-700">A</span>
            </div>
            <p className="text-sm md:text-xs text-stone-700 leading-relaxed">
              {optionA.text}
            </p>
            
            {revealed && selected === optionA.id && (
              <div className="mt-2 md:mt-1 pt-2 md:pt-1 border-t border-stone-200">
                {optionA.correct ? (
                  <span className="text-emerald-700 font-medium text-xs md:text-[10px]">✓ This captures authentic use</span>
                ) : (
                  <span className="text-rose-700 font-medium text-xs md:text-[10px]">→ This misses the essence</span>
                )}
              </div>
            )}
          </button>

          {/* Option B */}
          <button
            onClick={() => !revealed && handleSelect(optionB.id, optionB.correct)}
            disabled={revealed}
            className={`
              p-4 md:p-2 rounded-3xl text-left transition-all duration-500
              ${!revealed ? 'hover:shadow-2xl hover:scale-[1.03]' : ''}
              ${selected === optionB.id && revealed && optionB.correct ? 'bg-emerald-50 border-4 border-emerald-400' : ''}
              ${selected === optionB.id && revealed && !optionB.correct ? 'bg-rose-50 border-4 border-rose-400' : ''}
              ${selected !== optionB.id && revealed ? 'opacity-50' : ''}
              ${!revealed ? 'bg-white border-2 border-stone-200' : ''}
            `}
          >
            <div className="mb-2 md:mb-1">
              <span className="text-lg md:text-base font-medium text-stone-700">B</span>
            </div>
            <p className="text-sm md:text-xs text-stone-700 leading-relaxed">
              {optionB.text}
            </p>
            
            {revealed && selected === optionB.id && (
              <div className="mt-2 md:mt-1 pt-2 md:pt-1 border-t border-stone-200">
                {optionB.correct ? (
                  <span className="text-emerald-700 font-medium text-xs md:text-[10px]">✓ This captures authentic use</span>
                ) : (
                  <span className="text-rose-700 font-medium text-xs md:text-[10px]">→ This misses the essence</span>
                )}
              </div>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
