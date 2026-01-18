"use client";

import { motion } from 'framer-motion';

interface SessionProgressBarProps {
  currentStep: 1 | 2 | 3; // Definition, Exercise, Anchor
  totalSteps?: number; // Default 3
  currentWord: number; // 1-based index
  totalWords: number;
}

export function SessionProgressBar({
  currentStep,
  totalSteps = 3,
  currentWord,
  totalWords
}: SessionProgressBarProps) {
  // Calculate overall progress
  // Each word has 3 steps, so total progress = (completed words * 3 + current step - 1) / (total words * 3)
  const completedWords = currentWord - 1;
  const completedSteps = completedWords * totalSteps + (currentStep - 1);
  const totalProgressSteps = totalWords * totalSteps;
  const progressPercentage = ((completedSteps + 1) / totalProgressSteps) * 100;

  return (
    <div className="w-full mb-16 md:mb-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-stone-400">
          Word {currentWord} of {totalWords}
        </p>
        <p className="text-xs text-stone-400">
          {Math.round(progressPercentage)}%
        </p>
      </div>
      <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-stone-800 rounded-full"
        />
      </div>
    </div>
  );
}
