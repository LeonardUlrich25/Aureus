"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateExerciseForWord } from '@/utils/exerciseGenerator';
import { SessionProgressBar } from '../SessionProgressBar';

interface ExerciseScreenProps {
  word: string;
  cluster: string;
  clusterColor: string;
  onCorrectAnswer: () => void;
  currentStep: 1 | 2 | 3;
  currentWord: number;
  totalWords: number;
}

export function ExerciseScreen({
  word,
  cluster,
  clusterColor,
  onCorrectAnswer,
  currentStep,
  currentWord,
  totalWords
}: ExerciseScreenProps) {
  const exercise = generateExerciseForWord(word, cluster);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (answerId: string) => {
    if (isValidated) return;
    setSelectedAnswer(answerId);
    setIsValidated(true);
    const correct = answerId === exercise.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setTimeout(() => onCorrectAnswer(), 1200);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setIsValidated(false);
    setIsCorrect(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-6 py-4 md:py-12 flex flex-col"
    >
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        <SessionProgressBar
          currentStep={currentStep}
          currentWord={currentWord}
          totalWords={totalWords}
        />

        <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-12" style={{ color: clusterColor }}>{word}</h1>

        <h2 className="text-xl md:text-2xl font-medium text-stone-700 mb-8 tracking-wide">{exercise.question}</h2>

        <div className="space-y-4 mb-8 flex-1">
          {exercise.options.map((option, index) => {
            const isSelected = selectedAnswer === option.id;
            const showCorrect = isValidated && option.id === exercise.correctAnswer;
            const showIncorrect = isValidated && isSelected && !isCorrect;

            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={isValidated}
                className={`w-full px-6 py-4 rounded-2xl text-left text-base font-medium transition-all duration-300 ease-out ${!isValidated && !isSelected ? 'bg-white border-2 border-stone-300 text-stone-700 hover:border-stone-400 hover:shadow-soft hover:-translate-y-0.5' : ''} ${!isValidated && isSelected ? 'bg-stone-700 border-2 border-transparent text-white shadow-elevated' : ''} ${showCorrect ? 'bg-emerald-700 border-2 border-transparent text-white shadow-elevated' : ''} ${showIncorrect ? 'bg-red-600 border-2 border-transparent text-white shadow-elevated' : ''} ${isValidated && !isSelected && !showCorrect ? 'opacity-40' : ''}`}
              >
                <span className="font-medium mr-3">{option.id}:</span>
                {option.text}
              </motion.button>
            );
          })}
        </div>

        {isValidated && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl mb-6 ${isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`text-base font-medium ${isCorrect ? 'text-emerald-800' : 'text-red-800'}`}>{isCorrect ? '✓ Correct! Moving to next step...' : '✗ Not quite. Try again!'}</p>
          </motion.div>
        )}

        {isValidated && !isCorrect && (
          <button onClick={handleRetry} className="w-full px-8 py-4 bg-stone-800 text-white font-medium text-base tracking-wide rounded-full shadow-elevated hover:bg-stone-900 hover:shadow-floating transition-all duration-300">Try Again</button>
        )}
      </div>
    </motion.div>
  );
}

export default ExerciseScreen;
