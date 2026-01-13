'use client';

import { useState } from 'react';

interface ResetJourneyButtonProps {
  onReset: () => void;
}

export function ResetJourneyButton({ onReset }: ResetJourneyButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onReset();
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="group relative inline-flex items-center gap-2 md:px-3 px-2 py-1.5 
                   md:border-2 md:border-red-500 md:rounded-full
                   transition-all duration-200
                   focus:outline-none md:hover:bg-red-50 md:focus:ring-2 md:focus:ring-red-500 md:focus:ring-offset-2"
        aria-label="Restart learning journey"
      >
        <svg 
          className="w-6 h-6 md:w-4 md:h-4 text-red-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
        <span className="text-sm font-medium text-black hidden md:inline">Restart journey</span>
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] md:z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Restart your journey?</h3>
            <p className="text-gray-600 text-sm mb-6">
              Are you sure to restart your personalised world of words? All current personalisation will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg
                         hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg
                         hover:bg-red-600 transition-colors font-medium"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
