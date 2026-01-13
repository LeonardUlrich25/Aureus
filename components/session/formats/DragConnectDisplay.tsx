"use client";

import { useState, useEffect } from "react";
import { DisplayComponentProps } from "@/types/session";
import { StarButton } from "@/components/StarButton";

export default function DragConnectDisplay({ interaction, onComplete, interactionId }: DisplayComponentProps) {
  const concepts = interaction.task.relatedConcepts || [];
  const [connections, setConnections] = useState<Record<string, boolean>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = sessionStorage.getItem('userId') || '';
      setUserId(storedUserId);
    }
  }, []);

  const handleToggleConcept = (concept: string) => {
    if (confirmed) return;
    setConnections(prev => ({
      ...prev,
      [concept]: !prev[concept]
    }));
  };

  const selectedCount = Object.values(connections).filter(Boolean).length;

  const handleConfirm = () => {
    if (selectedCount === 0) return;

    setConfirmed(true);
    setTimeout(() => {
      const selectedConcepts = Object.entries(connections)
        .filter(([_, selected]) => selected)
        .map(([concept]) => concept);

      onComplete({
        interactionId,
        userInput: selectedConcepts.join(", "),
        timestamp: Date.now()
      });
    }, 1200);
  };

  return (
    <div className="px-6 py-12 md:py-3 md:h-screen md:flex md:flex-col md:overflow-hidden">
      <div className="max-w-4xl w-full mx-auto flex flex-col md:flex-1 md:overflow-hidden md:justify-center">
        
        {/* Anchor prompt */}
        <div className="mb-6 md:mb-3 text-center">
          <p className="text-base md:text-sm text-stone-600 leading-relaxed">
            {interaction.anchor}
          </p>
        </div>

        {/* Word - Central node */}
        <div className="mb-6 md:mb-3 text-center">
          <div className="inline-block">
            <div className="flex items-center gap-3">
              <div className="px-8 py-6 bg-stone-800 text-white rounded-3xl shadow-lg">
                <h2 className="text-2xl md:text-xl font-medium">
                  {interaction.word}
                </h2>
              </div>
              {userId && (
                <div className="text-white">
                  <StarButton
                    word={interaction.word}
                    definition={`Definition of ${interaction.word}`}
                    cluster="general"
                    difficulty={5}
                    userId={userId}
                    size="lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Task prompt */}
        <div className="mb-6 md:mb-3 text-center">
          <p className="text-sm md:text-xs text-stone-500">
            {interaction.task.prompt}
          </p>
        </div>

        {/* Concept network */}
        <div className="mb-6 md:mb-3">
          <div className="flex flex-wrap justify-center gap-4">
            {concepts.map((item: any, index: number) => {
              const isSelected = connections[item.concept];
              
              return (
                <button
                  key={index}
                  onClick={() => handleToggleConcept(item.concept)}
                  disabled={confirmed}
                  className={`
                    px-6 py-4 rounded-2xl transition-all duration-300
                    ${isSelected 
                      ? 'bg-stone-700 text-white scale-105 shadow-lg' 
                      : 'bg-white text-stone-700 border-2 border-stone-200 hover:border-stone-400 hover:scale-105'
                    }
                    ${confirmed ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  <div className="text-base font-medium mb-1">
                    {item.concept}
                  </div>
                  <div className="text-xs opacity-75">
                    {item.relationship}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selection counter */}
        {selectedCount > 0 && !confirmed && (
          <div className="mb-6 text-center">
            <p className="text-sm text-stone-500">
              {selectedCount} concept{selectedCount !== 1 ? 's' : ''} connected
            </p>
          </div>
        )}

        {/* Confirm button */}
        {selectedCount > 0 && !confirmed && (
          <div className="text-center">
            <button
              onClick={handleConfirm}
              className="px-10 py-4 bg-stone-800 text-white rounded-full font-medium
                hover:bg-stone-900 transition-all duration-300 hover:shadow-lg"
            >
              Confirm Network
            </button>
          </div>
        )}

        {confirmed && (
          <div className="text-center">
            <p className="text-stone-500 animate-pulse">
              Network recorded.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
