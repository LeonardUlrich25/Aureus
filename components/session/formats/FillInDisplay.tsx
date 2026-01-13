"use client";

import { useState, useEffect } from "react";
import { DisplayComponentProps } from "@/types/session";
import { StarButton } from "@/components/StarButton";

export default function FillInDisplay({ interaction, onComplete, interactionId }: DisplayComponentProps) {
  const [userInput, setUserInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = sessionStorage.getItem('userId') || '';
      setUserId(storedUserId);
    }
  }, []);

  const scenario = interaction.task.scenarioTemplate || "";
  const blankPosition = scenario.indexOf("_____");
  const beforeBlank = scenario.substring(0, blankPosition);
  const afterBlank = scenario.substring(blankPosition + 5);

  const handleSubmit = () => {
    if (!userInput.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      onComplete({
        interactionId,
        userInput: userInput.trim(),
        timestamp: Date.now()
      });
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userInput.trim() && !submitted) {
      handleSubmit();
    }
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

        {/* Scenario with fill-in-blank */}
        <div className="mb-3 md:mb-2 p-4 md:p-2 bg-stone-50 rounded-3xl border-2 border-stone-200">
          <p className="text-base md:text-sm text-stone-700 leading-relaxed">
            {beforeBlank}
            <span className="inline-flex items-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => !submitted && setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={submitted}
                placeholder={interaction.word}
                className={`
                  px-4 py-2 mx-2 border-b-2 bg-transparent outline-none text-center
                  font-medium transition-all duration-300
                  ${submitted 
                    ? 'border-stone-600 text-stone-800' 
                    : 'border-stone-400 hover:border-stone-600 focus:border-stone-800'
                  }
                `}
                style={{ width: `${Math.max(userInput.length, interaction.word.length) + 2}ch` }}
                autoFocus
              />
            </span>
            {afterBlank}
          </p>
        </div>

        {/* Explanation */}
        {interaction.task.explanation && (
          <div className="mb-8 text-center">
            <p className="text-sm text-stone-500 italic">
              {interaction.task.explanation}
            </p>
          </div>
        )}

        {/* Submit button */}
        {!submitted && userInput.trim() && (
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="px-10 py-4 bg-stone-800 text-white rounded-full font-medium
                hover:bg-stone-900 transition-all duration-300 hover:shadow-lg"
            >
              Continue
            </button>
          </div>
        )}

        {submitted && (
          <div className="text-center">
            <p className="text-stone-500 animate-pulse">
              Shape noted.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
