import { useState, useEffect, useMemo } from 'react';
import { wordDatabase, WordContent } from '@/data/wordContent';

interface SessionFlowProps {
  selectedWordNames: string[];
  onComplete?: (results: any) => void;
}

// Shuffle and reassign option IDs while preserving correct answer mapping
function shuffleOptions(options: Array<{ id: string; text: string }>, correctAnswer: string) {
  const shuffled = [...options].sort(() => Math.random() - 0.5);
  const reassigned = shuffled.map((option, index) => ({
    ...option,
    id: String.fromCharCode(65 + index) // 'A', 'B', 'C', ...
  }));

  // Find the original item that was correct, then its new id
  const correctOriginalIndex = shuffled.findIndex(opt => opt.id === correctAnswer);
  const newCorrectId = correctOriginalIndex >= 0
    ? reassigned[correctOriginalIndex].id
    : 'A';

  return {
    options: reassigned,
    correctAnswer: newCorrectId
  };
}

export function SessionFlow({ selectedWordNames, onComplete }: SessionFlowProps) {
  // Get full word data
  const sessionWords = wordDatabase.filter(w => selectedWordNames.includes(w.word));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<1 | 2 | 3>(1); // Definition, Exercise, Anchor
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [anchorCategory, setAnchorCategory] = useState<string | null>(null);
  const [responses, setResponses] = useState<any[]>([]);

  const currentWord = sessionWords[currentIndex];
  const isLastWord = currentIndex === sessionWords.length - 1;

  // Shuffle exercise options once per word
  const shuffledExercise = useMemo(() => {
    if (!currentWord) return null;
    return shuffleOptions(currentWord.exercise.options, currentWord.exercise.correctAnswer);
  }, [currentWord]);

  // Auto-retry after wrong answer (Step 2)
  useEffect(() => {
    if (step === 2 && selectedAnswer !== null) {
      const targetCorrect = shuffledExercise?.correctAnswer ?? currentWord.exercise.correctAnswer;
      const isCorrect = selectedAnswer === targetCorrect;
      if (!isCorrect) {
        const timer = setTimeout(() => {
          setSelectedAnswer(null); // Reset to allow retry
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [step, selectedAnswer, currentWord, shuffledExercise]);

  // Step 1: Definition → Continue
  const handleDefinitionContinue = () => setStep(2);

  // Step 2: Exercise → Must be correct
  const handleExerciseAnswer = (answer: string, correctId?: string) => {
    setSelectedAnswer(answer);
    const targetCorrect = correctId ?? currentWord.exercise.correctAnswer;
    if (answer === targetCorrect) {
      setTimeout(() => {
        setSelectedAnswer(null);
        setStep(3);
      }, 1500);
    }
  };

  // Step 3: Anchor → Continue
  const handleAnchorComplete = () => {
    // Record this interaction
    const interaction = {
      word: currentWord.word,
      step1_completed: true,
      step2_correct: true,
      step3_category: anchorCategory
    };
    
    if (isLastWord) {
      // All words completed, show completion and call onComplete
      const completionData = {
        words: sessionWords.map(w => w.word),
        responses: [...responses, interaction]
      };
      
      if (onComplete) {
        onComplete(completionData);
      }
      return;
    }
    
    // Move to next word
    setResponses([...responses, interaction]);
    setCurrentIndex(prev => prev + 1);
    setStep(1);
    setSelectedAnswer(null);
    setAnchorCategory(null);
  };

  if (!currentWord) return null;

  // STEP 1: DEFINITION
  if (step === 1) {
    return (
      <div className="min-h-screen md:min-h-0 bg-stone-50 p-4 md:p-6 md:h-full md:flex md:flex-col md:overflow-hidden">
        {/* Content */}
        <div className="md:flex-1 md:flex md:items-center md:justify-center md:overflow-hidden md:py-0">
          <div className="w-full max-w-2xl">
            <p className="text-xs md:text-sm text-stone-400 mb-4 md:mb-6">Step 1 of 3 • {currentIndex + 1}/{sessionWords.length}</p>
            
            <h1 className="text-2xl md:text-3xl font-medium mb-2 md:mb-2" style={{ color: getClusterColor(currentWord.cluster) }}>
              {currentWord.word}
            </h1>
            <p className="text-xs md:text-sm text-stone-400 mb-4 md:mb-6">{currentWord.cluster}</p>

            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-6 shadow-soft border border-stone-200 mb-4 md:mb-4">
              <p className="text-base md:text-lg leading-relaxed text-stone-700">{currentWord.definition}</p>
            </div>
          </div>
        </div>
        
        {/* Button */}
        <div className="w-full max-w-2xl mx-auto md:flex-shrink-0 bg-stone-50">
          <button
            onClick={handleDefinitionContinue}
            className="w-full py-3 md:py-3 bg-stone-800 text-white rounded-full font-medium hover:bg-stone-900 transition shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // STEP 2: EXERCISE
  if (step === 2) {
    const isCorrect = selectedAnswer === (shuffledExercise?.correctAnswer ?? currentWord.exercise.correctAnswer);
    const showFeedback = selectedAnswer !== null;

    return (
      <div className="min-h-screen md:min-h-0 bg-stone-50 p-4 md:p-6 md:h-full md:flex md:flex-col md:overflow-hidden">
        {/* Content */}
        <div className="md:flex-1 md:flex md:items-center md:justify-center md:overflow-hidden md:py-0">
          <div className="w-full max-w-2xl">
            <p className="text-xs md:text-sm text-stone-400 mb-4 md:mb-6">Step 2 of 3 • {currentIndex + 1}/{sessionWords.length}</p>
            
            <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-6" style={{ color: getClusterColor(currentWord.cluster) }}>
              {currentWord.word}
            </h1>

            <h2 className="text-lg md:text-xl font-medium text-stone-700 mb-3 md:mb-4">{currentWord.exercise.question}</h2>

            <div className="space-y-2 md:space-y-3 mb-4 md:mb-4">
              {(shuffledExercise?.options ?? currentWord.exercise.options).map(option => {
                const isSelected = selectedAnswer === option.id;
                const isCorrectAnswer = option.id === (shuffledExercise?.correctAnswer ?? currentWord.exercise.correctAnswer);
                const showCorrect = showFeedback && isCorrectAnswer && isSelected;
                const showWrong = showFeedback && isSelected && !isCorrect;

                return (
                  <button
                    key={option.id}
                    onClick={() => !showFeedback && handleExerciseAnswer(option.id, shuffledExercise?.correctAnswer)}
                    disabled={showFeedback}
                    className={`
                      w-full p-3 md:p-3 rounded-xl md:rounded-xl text-left text-sm md:text-base font-medium transition-all
                      ${!showFeedback ? 'bg-white border-2 border-stone-300 hover:border-stone-400' : ''}
                      ${showCorrect ? 'bg-emerald-700 text-white' : ''}
                      ${showWrong ? 'bg-red-600 text-white' : ''}
                    `}
                  >
                    {option.id}: {option.text}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className={`p-3 md:p-3 rounded-xl text-sm md:text-base mb-2 ${isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                {isCorrect ? '✓ Correct! Moving to next step...' : '✗ Not quite. Try again...'}
              </div>
            )}
          </div>
        </div>

        {/* Button */}
        <div className="w-full max-w-2xl mx-auto md:flex-shrink-0 bg-stone-50">
          <button
            onClick={() => showFeedback && isCorrect ? setStep(3) : null}
            disabled={!showFeedback || !isCorrect}
            className={`w-full py-3 md:py-3 rounded-full font-medium transition shadow-lg ${
              showFeedback && isCorrect
                ? 'bg-stone-800 text-white hover:bg-stone-900'
                : 'bg-stone-200 text-stone-500 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // STEP 3: ANCHOR
  if (step === 3) {
    return (
      <div className="min-h-screen md:min-h-0 bg-stone-50 p-4 md:p-6 md:h-full md:flex md:flex-col md:overflow-hidden">
        {/* Content */}
        <div className="md:flex-1 md:flex md:items-center md:justify-center md:overflow-hidden md:py-0">
          <div className="w-full max-w-2xl">
            <p className="text-xs md:text-sm text-stone-400 mb-4 md:mb-6">Step 3 of 3 • {currentIndex + 1}/{sessionWords.length}</p>
            
            <h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-6" style={{ color: getClusterColor(currentWord.cluster) }}>
              {currentWord.word}
            </h1>

            <h2 className="text-lg md:text-xl font-medium text-stone-700 mb-3 md:mb-4">{currentWord.anchor?.prompt || 'Reflect on this word'}</h2>

            <div className="grid grid-cols-2 gap-3 md:gap-3 mb-4 md:mb-4">
              {(currentWord.anchor?.categories || []).map(cat => (
                <button
                  key={cat}
                  onClick={() => setAnchorCategory(cat)}
                  className={`
                    p-3 md:p-4 rounded-xl md:rounded-xl text-sm md:text-base font-medium transition-all
                    ${anchorCategory === cat ? 'bg-stone-800 text-white' : 'bg-white border-2 border-stone-200'}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Button */}
        <div className="w-full max-w-2xl mx-auto md:flex-shrink-0 bg-stone-50">
          <button
            onClick={handleAnchorComplete}
            disabled={!anchorCategory}
            className="w-full py-3 md:py-3 bg-stone-800 text-white rounded-full font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-900 transition shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function getClusterColor(cluster: string) {
  const colors: Record<string, string> = {
    Work: '#6B5B6F',
    School: '#4A6D7A',
    Daily: '#8B7555',
    Literary: '#6B5A6A',
    Conflict: '#8B5F5F',
    Culture: '#5A7B6B'
  };
  return colors[cluster] || '#6B5B6F';
}

function CompletionScreen({ words }: { words: string[] }) {
  return (
    <div className="mobile-fit-screen md:min-h-screen bg-stone-50 px-4 md:px-6 py-6 md:py-12 flex items-center justify-center">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-8 bg-emerald-100 rounded-full flex items-center justify-center">
          <span className="text-2xl md:text-4xl">✓</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-medium mb-3 md:mb-4">Session Complete</h1>
        <p className="text-base md:text-lg text-stone-600 mb-6 md:mb-8">You explored {words.length} words</p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-8 py-3 md:px-12 md:py-4 text-sm md:text-base bg-stone-800 text-white rounded-full font-medium hover:bg-stone-900 transition"
        >
          Explore More
        </button>
      </div>
    </div>
  );
}
