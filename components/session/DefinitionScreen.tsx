"use client";

import { motion } from 'framer-motion';
import { SessionProgressBar } from '../SessionProgressBar';

interface DefinitionScreenProps {
  word: string;
  definition: string;
  cluster: string;
  clusterColor: string;
  onContinue: () => void;
  currentStep: 1 | 2 | 3;
  currentWord: number;
  totalWords: number;
}

export function DefinitionScreen({
  word,
  definition,
  cluster,
  clusterColor,
  onContinue,
  currentStep,
  currentWord,
  totalWords
}: DefinitionScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-6 py-4 md:py-12 flex flex-col"
    >
      <div className="max-w-2xl mx-auto w-full">
        <SessionProgressBar
          currentStep={currentStep}
          currentWord={currentWord}
          totalWords={totalWords}
        />

        <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-3" style={{ color: clusterColor }}>
          {word}
        </h1>

        <p className="text-sm text-stone-400 tracking-wide mb-12">{cluster}</p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-white rounded-2xl p-8 md:p-10 shadow-soft border border-stone-200 mb-8"
        >
          <p className="text-lg md:text-xl leading-relaxed text-stone-700">{definition}</p>
        </motion.div>

        <button className="flex items-center gap-2 text-stone-500 hover:text-stone-700 transition-colors mb-16">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          <span className="text-sm tracking-wide">Listen</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto w-full mt-auto">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onContinue}
          className="w-full px-8 py-4 bg-stone-800 text-white font-medium text-base tracking-wide rounded-full shadow-elevated hover:bg-stone-900 hover:shadow-floating transition-all duration-300"
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}

export default DefinitionScreen;
