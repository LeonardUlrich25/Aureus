"use client";

import React, { useState, useEffect } from "react";
import OptionPill from "../ui/OptionPill";

type Props = {
  question: string;
  options: { id: string; text: string }[];
  onChoose?: (id: string) => void;
  correctId?: string;
  onAnswer?: (id: string, correct: boolean) => void;
};

export default function ContrastMode({ question, options, onChoose, correctId, onAnswer }: Props) {
  // Follow the explicit state flow described by the user:
  // - selectedAnswer: which option the user clicked (null initially)
  // - showFeedback: whether to show validation (red/green)
  // - canContinue: whether the parent should enable Next (true only after correct)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [canContinueLocal, setCanContinueLocal] = useState(false);

  const palette = ["#9B7EBD", "#6B9BD1", "#F4A987", "#E8DFF5", "#5FA897", "#D4E7F7"];

  const handleAnswer = (id: string) => {
    setSelectedAnswer(id);
    setShowFeedback(true);
    if (correctId && id === correctId) {
      setCanContinueLocal(true);
      onAnswer && onAnswer(id, true);
    } else {
      onAnswer && onAnswer(id, false);
      // show red briefly then allow retry
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
      }, 700);
    }
    onChoose && onChoose(id);
  };

  // Reset local state whenever the question/options/correct answer changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCanContinueLocal(false);
  }, [question, JSON.stringify(options), correctId]);

  return (
    <div>
      <div className="text-xl font-semibold text-[#5FA897] mb-4">{question}</div>
      <div className="flex flex-col gap-3">
        {options.map((o, idx) => {
          const baseColor = palette[idx % palette.length];
          const isSelected = selectedAnswer === o.id;
          const isCorrect = showFeedback && correctId === o.id;
          const isWrong = showFeedback && isSelected && correctId !== o.id;

          return (
            <OptionPill
              key={o.id}
              label={o.text}
              isSelected={isSelected}
              isCorrect={isCorrect}
              isWrong={isWrong}
              borderColor={baseColor}
              onToggle={() => handleAnswer(o.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
