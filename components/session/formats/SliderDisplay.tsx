"use client";

import { useState } from "react";
import { DisplayComponentProps } from "@/types/session";

export default function SliderDisplay({ interaction, onComplete, interactionId }: DisplayComponentProps) {
  const spectrum = interaction.task.spectrum || [];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (selectedIndex === null) return;

    setConfirmed(true);
    setTimeout(() => {
      onComplete({
        interactionId,
        selectedOption: spectrum[selectedIndex],
        userInput: selectedIndex.toString(),
        timestamp: Date.now()
      });
    }, 1200);
  };

  return (
    <div className="px-6 py-12 md:py-3 md:h-screen md:flex md:flex-col md:overflow-hidden">
      <div className="max-w-3xl w-full mx-auto flex flex-col md:flex-1 md:overflow-hidden md:justify-center">
        
        {/* Anchor prompt */}
        <div className="mb-6 md:mb-3 text-center">
          <p className="text-base md:text-sm text-stone-600 leading-relaxed">
            {interaction.anchor}
          </p>
        </div>

        {/* Word */}
        <div className="mb-4 md:mb-2 text-center">
          <h2 className="text-2xl md:text-xl font-medium text-stone-800">
            {interaction.word}
          </h2>
        </div>

        {/* Task prompt */}
        <div className="mb-4 md:mb-3 text-center">
          <p className="text-sm md:text-xs text-stone-500">
            {interaction.task.prompt}
          </p>
        </div>

        {/* Spectrum slider */}
        <div className="mb-4 md:mb-3">
          <div className="relative">
            {/* Track */}
            <div className="h-2 bg-stone-200 rounded-full" />
            
            {/* Markers */}
            <div className="absolute top-0 left-0 right-0 flex justify-between" style={{ marginTop: '-5px' }}>
              {spectrum.map((item: string, index: number) => (
                <button
                  key={index}
                  onClick={() => !confirmed && setSelectedIndex(index)}
                  disabled={confirmed}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${selectedIndex === index 
                      ? 'bg-stone-700 scale-150 ring-4 ring-stone-300' 
                      : 'bg-stone-400 hover:bg-stone-600 hover:scale-125'
                    }
                    ${confirmed ? 'cursor-default' : 'cursor-pointer'}
                  `}
                />
              ))}
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-3 md:mt-2">
            {spectrum.map((item: string, index: number) => (
              <div 
                key={index}
                className={`
                  flex-1 text-center px-2 transition-all duration-300
                  ${selectedIndex === index ? 'text-stone-800 font-medium text-lg' : 'text-stone-500 text-sm'}
                `}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Confirm button */}
        {selectedIndex !== null && !confirmed && (
          <div className="text-center">
            <button
              onClick={handleConfirm}
              className="px-10 py-4 bg-stone-800 text-white rounded-full font-medium
                hover:bg-stone-900 transition-all duration-300 hover:shadow-lg"
            >
              Confirm
            </button>
          </div>
        )}

        {confirmed && (
          <div className="text-center">
            <p className="text-stone-500 animate-pulse">
              Noted.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
