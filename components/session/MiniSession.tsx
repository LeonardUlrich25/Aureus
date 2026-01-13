"use client";

import React, { useState, useMemo, useCallback } from 'react';

// --- Configuration ---

const TASK_TYPES = [
  { key: 'definition', title: '1. Define', instructions: 'Read the definition carefully.', interaction: 'continue' },
  { key: 'exercise', title: '2. Practice', instructions: 'Select the best sentence using the word correctly.', interaction: 'multiple-choice' },
  { key: 'anchor', title: '3. Emotional Anchor', instructions: 'Which option creates the strongest emotional link to the word?', interaction: 'multiple-choice' },
];

/**
 * Generates dummy content for a learning task.
 * In production this would call an LLM / Gemini API to generate tailored content.
 */
const generateTaskData = (word: string, type: string) => {
  if (type === 'definition') {
    return {
      task: `Definition of **${word}**: This is the precise meaning. In a real app, an LLM would provide a tailored, context-specific definition.`,
      interactionData: null,
    };
  }

  const options = ['A', 'B', 'C', 'D'].map(label => ({
    label,
    text: type === 'exercise'
      ? `Example sentence option ${label} for the word "${word}".`
      : `Emotional context option ${label} (e.g., 'joyful', 'surprised') for "${word}".`,
    isCorrect: label === 'C',
  }));

  return {
    task: type === 'exercise'
      ? `Exercise for **${word}**: Select the correct usage.`
      : `Emotional Anchor for **${word}**: Select the most resonant anchor.`,
    interactionData: options,
  };
};

type MiniSessionProps = {
  selectedWords: string[];
  existingSummary?: string;
  onSessionFinished: (summary: string) => void;
};

const MiniSession: React.FC<MiniSessionProps> = ({ selectedWords, existingSummary, onSessionFinished }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const sessionTasks = useMemo(() => {
    if (!selectedWords || selectedWords.length === 0) return [];

    let tasks: any[] = [];
    selectedWords.forEach(word => {
      TASK_TYPES.forEach(taskType => {
        tasks.push({
          word,
          taskType,
          ...generateTaskData(word, taskType.key),
          id: `${word}-${taskType.key}`,
        });
      });
    });
    return tasks;
  }, [selectedWords]);

  const totalTasks = sessionTasks.length;
  const currentTask = sessionTasks[currentTaskIndex];

  const handleMCQSelect = (optionLabel: string) => {
    setSelectedOption(optionLabel);
  };

  const handleNextStep = useCallback(() => {
    if (!currentTask) return;

    if (currentTask.taskType.interaction === 'multiple-choice' && !selectedOption) {
      console.error('Please select an option before continuing.');
      return;
    }

    setSelectedOption(null);

    if (currentTaskIndex < totalTasks - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      const newSummary = `Mini-Session Complete! You successfully completed all ${totalTasks} learning steps for ${selectedWords.length} words.`;
      onSessionFinished(newSummary);
    }
  }, [currentTask, currentTaskIndex, totalTasks, selectedWords, selectedOption, onSessionFinished]);

  if (!selectedWords || selectedWords.length === 0) {
    return <div className="text-center text-red-500 p-4">Error: No words selected for the session.</div>;
  }

  if (!currentTask) {
    return <div className="text-center text-red-500 p-4">Session data is empty.</div>;
  }

  const renderInteractionArea = () => {
    if (currentTask.taskType.interaction === 'continue') {
      return (
        <button
          onClick={handleNextStep}
          className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300"
        >
          Continue
        </button>
      );
    }

    if (currentTask.taskType.interaction === 'multiple-choice') {
      return (
        <div className="space-y-3">
          {currentTask.interactionData.map((option: any) => (
            <div
              key={option.label}
              onClick={() => handleMCQSelect(option.label)}
              className={`
                p-4 border-2 rounded-lg cursor-pointer transition-all duration-150
                ${selectedOption === option.label
                  ? 'bg-blue-100 border-blue-500 shadow-md'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <span className="font-bold text-indigo-600 mr-2">{option.label}:</span>
              <span className="text-gray-700">{option.text}</span>
            </div>
          ))}
          <button
            onClick={handleNextStep}
            disabled={!selectedOption}
            className={`
              mt-4 w-full px-6 py-3 font-semibold rounded-lg transition-all duration-300
              ${selectedOption
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }
            `}
          >
            Submit and Next Step
          </button>
        </div>
      );
    }
    return null;
  };

  const taskNum = currentTaskIndex + 1;
  const wordIndex = Math.floor(currentTaskIndex / TASK_TYPES.length);
  const wordsTotal = selectedWords.length;

  return (
    <div className="p-4 space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Mini-Session: <span className="text-indigo-600">{currentTask.taskType.title}</span>
        </h2>
        <p className="text-sm text-gray-500">
            Word {wordIndex + 1}/{wordsTotal}: <span className="font-semibold">{currentTask.word}</span> | 
            Step {taskNum} of {totalTasks}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
                className="bg-indigo-600 h-2 rounded-full" 
                style={{ width: `${(taskNum / totalTasks) * 100}%` }}
            ></div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-4">
        <p className="text-gray-600 italic font-medium">{currentTask.taskType.instructions}</p>

        <div className="p-4 border border-indigo-200 bg-indigo-50 rounded-lg">
          <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: currentTask.task.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
        </div>

        {renderInteractionArea()}
      </div>

      {existingSummary && (
        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 text-sm text-yellow-800 rounded">
          <span className="font-semibold">Last Session:</span> {existingSummary}
        </div>
      )}
    </div>
  );
};

export default MiniSession;
