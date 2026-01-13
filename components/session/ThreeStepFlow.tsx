'use client';

import { useState } from 'react';

interface ThreeStepFlowProps {
  interaction: any;
  onComplete: (response: any) => void;
}

export function ThreeStepFlow({ interaction, onComplete }: ThreeStepFlowProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [responses, setResponses] = useState<any>({});
  
  const handleStepComplete = (stepData: any) => {
    const newResponses = {
      ...responses,
      [`step${currentStep}`]: stepData
    };
    setResponses(newResponses);
    
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as 1 | 2 | 3);
    } else {
      onComplete(newResponses);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="flex">
          {[1, 2, 3].map(step => (
            <div
              key={step}
              className={`flex-1 h-2 transition-all ${
                step < currentStep ? 'bg-green-500' :
                step === currentStep ? 'bg-blue-500' :
                'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="pt-12">
        {currentStep === 1 && (
          <StepOne interaction={interaction} onComplete={handleStepComplete} />
        )}

        {currentStep === 2 && (
          <StepTwo interaction={interaction} onComplete={handleStepComplete} />
        )}

        {currentStep === 3 && (
          <StepThree interaction={interaction} onComplete={handleStepComplete} />
        )}
      </div>
    </div>
  );
}

function StepOne({ interaction, onComplete }: any) {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Step 1: Definition
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6">{interaction.word}</h1>
          <div className="text-gray-500 text-sm mb-8">{interaction.definition.partOfSpeech}</div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">{interaction.definition.text}</p>
          {interaction.definition.etymology && (
            <div className="border-t pt-6 mt-6">
              <p className="text-sm text-gray-500"><span className="font-semibold">Origin:</span> {interaction.definition.etymology}</p>
            </div>
          )}

          <button onClick={() => onComplete({ read: true, timestamp: Date.now() })} className="w-full mt-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold text-lg hover:scale-105 transition-transform shadow-lg">Continue to Task</button>
        </div>
      </div>
    </div>
  );
}

function StepTwo({ interaction, onComplete }: any) {
  const [userInput, setUserInput] = useState('');
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const task = interaction.task;

  const handleSubmit = () => {
    const response = task.type === 'choice' ? { choice: selectedChoice, timestamp: Date.now() } : { input: userInput, timestamp: Date.now() };
    onComplete(response);
  };

  const canSubmit = task.type === 'choice' ? selectedChoice !== null : userInput.trim().length > 0;

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">Step 2: Task</div>
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg font-semibold mb-6">{interaction.word}</div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">{task.prompt}</p>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-600 mb-4">{task.instruction}</p>

            {task.type === 'choice' && task.options && (
              <div className="space-y-3">
                {task.options.map((option: string, idx: number) => (
                  <button key={idx} onClick={() => setSelectedChoice(option)} className={`w-full p-4 rounded-xl text-left transition-all ${selectedChoice === option ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-102' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}>
                    {option}
                  </button>
                ))}
              </div>
            )}

            {task.type !== 'choice' && (
              <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Type your response..." className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors resize-none text-gray-800" autoFocus />
            )}
          </div>

          <button onClick={handleSubmit} disabled={!canSubmit} className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all transform ${canSubmit ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            {canSubmit ? 'Continue to Anchor' : 'Complete the task to continue'}
          </button>
        </div>
      </div>
    </div>
  );
}

function StepThree({ interaction, onComplete }: any) {
  const [reflected, setReflected] = useState(false);
  const anchor = interaction.anchor;

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">Step 3: Anchor</div>
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full text-lg font-semibold mb-6">{interaction.word}</div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{anchor.prompt}</h3>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
            <p className="text-lg text-gray-700 leading-relaxed italic">{anchor.scene}</p>
          </div>

          {!reflected ? (
            <button onClick={() => setReflected(true)} className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl font-semibold text-lg hover:scale-105 transition-transform shadow-lg">Show me the key insight</button>
          ) : (
            <>
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 mb-6">
                <p className="text-xl text-white font-semibold text-center">{anchor.reflection}</p>
              </div>
              <button onClick={() => onComplete({ reflected: true, anchorType: anchor.type, timestamp: Date.now() })} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold text-lg hover:scale-105 transition-transform shadow-lg">Complete ✓</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ThreeStepFlow;
