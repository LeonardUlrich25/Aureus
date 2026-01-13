'use client';

import { useState, useEffect } from 'react';
import { SavedWordsManager } from '@/lib/savedWords';

interface StarButtonProps {
  word: string;
  definition: string;
  cluster: string;
  difficulty: number;
  userId: string;
  size?: 'sm' | 'md' | 'lg';
}

export function StarButton({ word, definition, cluster, difficulty, userId, size = 'md' }: StarButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    checkIfSaved();
  }, [word, userId]);

  const checkIfSaved = async () => {
    const saved = await SavedWordsManager.isWordSaved(userId, word);
    setIsSaved(saved);
  };

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    setIsAnimating(true);
    
    if (isSaved) {
      await SavedWordsManager.unsaveWord(userId, word);
      setIsSaved(false);
    } else {
      await SavedWordsManager.saveWord(userId, {
        word,
        definition,
        cluster,
        difficulty,
        savedAt: new Date().toISOString()
      });
      setIsSaved(true);
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <button
      onClick={handleToggle}
      className={`${sizeClasses[size]} transition-transform ${isAnimating ? 'scale-125' : 'scale-100'} hover:scale-110`}
      aria-label={isSaved ? 'Remove from saved' : 'Save word'}
    >
      <svg
        viewBox="0 0 24 24"
        fill={isSaved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        className={`w-full h-full transition-colors ${
          isSaved 
            ? 'text-yellow-500' 
            : 'text-gray-400 hover:text-yellow-400'
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    </button>
  );
}
