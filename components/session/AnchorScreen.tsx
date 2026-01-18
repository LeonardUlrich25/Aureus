"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SessionProgressBar } from '../SessionProgressBar';

interface AnchorScreenProps {
  word: string;
  cluster: string;
  clusterColor: string;
  onComplete: () => void;
  currentStep: 1 | 2 | 3;
  currentWord: number;
  totalWords: number;
  anchorData?: {
    prompt?: string;
    categories?: { id: string; emoji: string; label: string; example?: string }[];
  };
}

const defaultCategoryOptions = [
  { id: 'work', emoji: '🔧', label: 'Work', example: 'How you might use this word at work' },
  { id: 'hobbies', emoji: '🎨', label: 'Hobbies', example: 'How this connects to things you enjoy' },
  { id: 'school', emoji: '🎓', label: 'School', example: 'How you might see this in learning' },
  { id: 'family', emoji: '👨‍👩‍👧', label: 'Family', example: 'How this relates to family moments' },
  { id: 'friends', emoji: '👥', label: 'Friends', example: 'How you might use this with friends' },
  { id: 'travel', emoji: '✈️', label: 'Travel', example: 'How you might encounter this while traveling' }
];

export function AnchorScreen({ word, cluster, clusterColor, onComplete, currentStep, currentWord, totalWords, anchorData }: AnchorScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [personalNote, setPersonalNote] = useState('');
  const [showExample, setShowExample] = useState(false);

  const canContinue = selectedCategory !== null;

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowExample(true);
  };

  const handleComplete = () => {
    if (canContinue) {
      // Optionally persist anchor to localStorage later
      onComplete();
    }
  };

  // Get categories from anchorData or use defaults
  const categories = anchorData?.categories || defaultCategoryOptions;
  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="min-h-screen px-6 py-4 md:py-12 flex flex-col">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        <SessionProgressBar
          currentStep={currentStep}
          currentWord={currentWord}
          totalWords={totalWords}
        />

        <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-12" style={{ color: clusterColor }}>{word}</h1>

        <h2 className="text-xl md:text-2xl font-medium text-stone-700 mb-3 tracking-wide">Where have <span style={{ color: clusterColor }}>you</span> seen this?</h2>

        <p className="text-base text-stone-500 mb-8 leading-relaxed">Connect this word to your personal experience to make it memorable.</p>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <svg className="w-24 h-24 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-stone-700 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {categories.map((category, index) => (
            <motion.button key={category.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} onClick={() => handleCategorySelect(category.id)} className={`aspect-[1.4/1] rounded-2xl p-4 flex flex-col items-center justify-center font-medium text-base transition-all duration-300 ${selectedCategory === category.id ? 'bg-stone-800 text-white shadow-elevated scale-105 ring-2 ring-offset-2' : 'bg-white border-2 border-stone-200 text-stone-700 hover:border-stone-300 hover:shadow-soft'}`} style={selectedCategory === category.id ? { ringColor: clusterColor } : {}}>
              <span className="text-3xl mb-2">{category.emoji}</span>
              <span className="text-sm">{category.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Memory Loop: Show contextual example when category is selected */}
        {selectedCategory && showExample && selectedCategoryData && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-stone-100 border-2 border-stone-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{selectedCategoryData.emoji}</span>
              <div>
                <p className="text-sm font-medium text-stone-600 mb-1">In your {selectedCategoryData.label.toLowerCase()}:</p>
                <p className="text-base text-stone-700 italic">&quot;{selectedCategoryData.example}&quot;</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mb-8">
          <label className="block text-sm font-medium text-stone-600 mb-2 tracking-wide">Add a personal note (optional)</label>
          <textarea value={personalNote} onChange={(e) => setPersonalNote(e.target.value)} placeholder={`How does "${word}" relate to your experience?`} rows={3} className="w-full px-4 py-3 bg-white border-2 border-stone-200 rounded-xl text-base text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors resize-none" />
        </div>

        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: canContinue ? 1 : 0.4, y: 0 }} onClick={handleComplete} disabled={!canContinue} className={`w-full px-8 py-4 bg-stone-800 text-white font-medium text-base tracking-wide rounded-full shadow-elevated transition-all duration-300 mt-auto ${canContinue ? 'hover:bg-stone-900 hover:shadow-floating cursor-pointer' : 'cursor-not-allowed'}`}>
          {selectedCategory ? 'Continue' : 'Select a category to continue'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default AnchorScreen;
