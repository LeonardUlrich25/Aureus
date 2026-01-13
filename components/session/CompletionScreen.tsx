"use client";

import { motion } from 'framer-motion';

interface CompletionScreenProps {
  completedWords: string[];
}

export function CompletionScreen({ completedWords }: CompletionScreenProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="min-h-screen bg-stone-50 px-6 py-12 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="w-24 h-24 mx-auto mb-8 bg-emerald-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-medium text-stone-900 mb-4 tracking-tight">Session Complete</h1>

        <p className="text-lg text-stone-600 mb-8 leading-relaxed">You explored {completedWords.length} {completedWords.length === 1 ? 'word' : 'words'} today.</p>

        <div className="space-y-3 mb-12">
          {completedWords.map((word, index) => (
            <motion.div key={word} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.1 }} className="px-6 py-3 bg-white border border-stone-200 rounded-xl text-stone-700 font-medium shadow-subtle">
              {word}
            </motion.div>
          ))}
        </div>

        <div className="space-y-3">
          <button onClick={() => window.location.href = '/'} className="w-full px-8 py-4 bg-stone-800 text-white font-medium text-base tracking-wide rounded-full shadow-elevated hover:bg-stone-900 hover:shadow-floating transition-all duration-300">Explore More Words</button>
          <button onClick={() => window.location.href = '/review'} className="w-full px-8 py-4 bg-white border-2 border-stone-300 text-stone-700 font-medium text-base tracking-wide rounded-full hover:border-stone-400 hover:bg-stone-50 transition-all duration-300">Review Your Words</button>
        </div>
      </div>
    </motion.div>
  );
}

export default CompletionScreen;
