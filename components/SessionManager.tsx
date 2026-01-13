"use client";

import { useState } from 'react';
import { DefinitionScreen } from './session/DefinitionScreen';
import { ExerciseScreen } from './session/ExerciseScreen';
import { AnchorScreen } from './session/AnchorScreen';
import { CompletionScreen } from './session/CompletionScreen';

interface SelectedWord {
  word: string;
  cluster: string;
  clusterEmoji?: string;
  clusterColor?: string;
  definition?: string;
}

interface SessionManagerProps {
  selectedWords: SelectedWord[];
}

type SessionStep = 'definition' | 'exercise' | 'anchor';

export function SessionManager({ selectedWords }: SessionManagerProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<SessionStep>('definition');
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  const currentWord = selectedWords[currentWordIndex];
  const isLastWord = currentWordIndex === selectedWords.length - 1;

  const handleStepComplete = () => {
    if (currentStep === 'definition') {
      setCurrentStep('exercise');
    } else if (currentStep === 'exercise') {
      setCurrentStep('anchor');
    } else if (currentStep === 'anchor') {
      // Mark word as completed
      setCompletedWords(prev => [...prev, currentWord.word]);

      // Move to next word or finish
      if (isLastWord) {
        // trigger completion by advancing index beyond end
        setCurrentStep('definition');
        setCurrentWordIndex(selectedWords.length);
      } else {
        setCurrentWordIndex(prev => prev + 1);
        setCurrentStep('definition');
      }
    }
  };

  // Session complete
  if (currentWordIndex >= selectedWords.length) {
    return <CompletionScreen completedWords={completedWords} />;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {currentStep === 'definition' && (
        <DefinitionScreen
          word={currentWord.word}
          definition={currentWord.definition || ''}
          cluster={currentWord.cluster}
          clusterColor={currentWord.clusterColor || '#9B7EBD'}
          onContinue={handleStepComplete}
          progress={`${currentWordIndex + 1}/${selectedWords.length}`}
        />
      )}

      {currentStep === 'exercise' && (
        <ExerciseScreen
          word={currentWord.word}
          cluster={currentWord.cluster}
          clusterColor={currentWord.clusterColor || '#9B7EBD'}
          onCorrectAnswer={handleStepComplete}
          progress={`${currentWordIndex + 1}/${selectedWords.length}`}
        />
      )}

      {currentStep === 'anchor' && (
        <AnchorScreen
          word={currentWord.word}
          cluster={currentWord.cluster}
          clusterColor={currentWord.clusterColor || '#9B7EBD'}
          onComplete={handleStepComplete}
          progress={`${currentWordIndex + 1}/${selectedWords.length}`}
        />
      )}
    </div>
  );
}

export default SessionManager;
