"use client";

import { useEffect, useState } from 'react';

export default function TestSession() {
  const [stored, setStored] = useState<string>('');
  
  useEffect(() => {
    // Check what's in sessionStorage
    const words = sessionStorage.getItem('selected_words');
    setStored(words || 'NOTHING STORED');
  }, []);
  
  const testStore = () => {
    const testData = [
      { word: 'test1', cluster: 'general', difficulty: 5 },
      { word: 'test2', cluster: 'general', difficulty: 6 },
    ];
    
    sessionStorage.setItem('selected_words', JSON.stringify(testData));
    alert('Test data stored! Refresh page to see it.');
  };
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">SessionStorage Debug</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-bold mb-2">Currently stored:</h2>
        <pre className="text-xs">{stored}</pre>
      </div>
      
      <button
        onClick={testStore}
        className="px-6 py-3 bg-blue-500 text-white rounded"
      >
        Store Test Data
      </button>
      
      <div className="mt-4">
        <a href="/session" className="text-blue-500 underline">
          Go to session page
        </a>
      </div>
    </div>
  );
}
