'use client';

import { useState, useEffect } from 'react';
import { SavedWordsManager, SavedWord } from '@/lib/savedWords';
import { StarButton } from './StarButton';

interface SavedWordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export function SavedWordsModal({ isOpen, onClose, userId }: SavedWordsModalProps) {
  const [savedWords, setSavedWords] = useState<SavedWord[]>([]);
  const [selectedWord, setSelectedWord] = useState<SavedWord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadSavedWords();
    }
  }, [isOpen, userId]);

  const loadSavedWords = async () => {
    setIsLoading(true);
    const words = await SavedWordsManager.getSavedWords(userId);
    setSavedWords(words.sort((a, b) => 
      new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
    ));
    setIsLoading(false);
  };

  const handleWordClick = (word: SavedWord) => {
    setSelectedWord(word);
  };

  const handleRemove = async (wordText: string) => {
    await SavedWordsManager.unsaveWord(userId, wordText);
    await loadSavedWords();
    if (selectedWord?.word === wordText) {
      setSelectedWord(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 md:p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl md:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background image for modal - prominent like main screen */}
        <div 
          className="absolute inset-0 z-0 rounded-2xl md:rounded-3xl overflow-hidden"
          style={{
            backgroundImage: 'url(/london-street-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 1
          }}
        />
        
        {/* Light overlay for readability */}
        <div className="absolute inset-0 z-10 bg-white/75 rounded-2xl md:rounded-3xl" />

        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-3 md:p-6 flex items-center justify-between relative z-20">
          <div className="flex items-center gap-2 md:gap-3">
            <svg className="w-5 h-5 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <h2 className="text-base md:text-2xl font-bold text-white">
              Saved Words ({savedWords.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1.5 md:p-2 transition-colors"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row h-[calc(95vh-64px)] md:h-[calc(90vh-88px)] relative z-20">
          {/* Word list */}
          <div className="w-full md:w-1/2 md:border-r overflow-y-auto p-3 md:p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : savedWords.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 px-4">
                <svg className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                <p className="text-sm md:text-lg font-medium mb-1 md:mb-2">No saved words yet</p>
                <p className="text-xs md:text-sm">Star words during sessions to save them here</p>
              </div>
            ) : (
              <div className="space-y-2 md:space-y-3">
                {savedWords.map((word) => (
                  <button
                    key={word.word}
                    onClick={() => handleWordClick(word)}
                    className={`w-full p-3 md:p-4 rounded-lg md:rounded-xl text-left transition-all ${
                      selectedWord?.word === word.word
                        ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-base md:text-lg text-gray-900">{word.word}</h3>
                        <p className="text-xs md:text-sm text-gray-500">{word.cluster}</p>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <StarButton
                          word={word.word}
                          definition={word.definition}
                          cluster={word.cluster}
                          difficulty={word.difficulty}
                          userId={userId}
                          size="md"
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Definition panel */}
          <div className="w-full md:w-1/2 p-3 md:p-6 overflow-y-auto">
            {selectedWord ? (
              <div>
                <div className="mb-4 md:mb-6">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <h3 className="text-xl md:text-3xl font-bold text-gray-900">
                      {selectedWord.word}
                    </h3>
                    <StarButton
                      word={selectedWord.word}
                      definition={selectedWord.definition}
                      cluster={selectedWord.cluster}
                      difficulty={selectedWord.difficulty}
                      userId={userId}
                      size="lg"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-3 md:mb-4 flex-wrap">
                    <span className="px-2 md:px-3 py-0.5 md:py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium">
                      {selectedWord.cluster}
                    </span>
                    <span className="px-2 md:px-3 py-0.5 md:py-1 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm font-medium">
                      Level {selectedWord.difficulty}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <h4 className="font-semibold text-gray-700 mb-2 md:mb-3 text-sm md:text-base">Definition</h4>
                  <p className="text-sm md:text-lg text-gray-800 leading-relaxed">
                    {selectedWord.definition}
                  </p>
                </div>

                <div className="mt-4 md:mt-6 text-xs md:text-sm text-gray-500">
                  Saved on {new Date(selectedWord.savedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center text-gray-400">
                <div>
                  <svg className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm md:text-base">Select a word to view definition</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
