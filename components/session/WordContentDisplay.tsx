"use client";

import React, { useState } from "react";
import type { WordContent } from "@/data/wordContent";
import SessionScreen from "./SessionScreen";

interface WordContentDisplayProps {
  wordContent: WordContent;
  onNext: () => void;
  progress: {
    current: number;
    total: number;
  };
}

export default function WordContentDisplay({
  wordContent,
  onNext,
  progress
}: WordContentDisplayProps) {
  const [selectedTab, setSelectedTab] = useState<"definition" | "exercise" | "anchor">("definition");

  // Color map for clusters
  const clusterColorMap: Record<string, string> = {
    Work: "#9B7EBD",
    School: "#6B9BD1",
    Daily: "#F4A987",
    Culture: "#E57B7B",
    Literary: "#9B7EBD",
    Conflict: "#8B5F5F",
  };

  const clusterColor = clusterColorMap[wordContent.cluster] || "#9B7EBD";
  const anchorData = (wordContent.anchor ?? { prompt: "", categories: [] }) as { prompt: string; categories: string[] };

  return (
    <SessionScreen
      word={wordContent.word}
      cluster={wordContent.cluster}
      clusterColor={clusterColor}
      onNext={onNext}
      nextLabel={progress.current === progress.total - 1 ? "Complete" : "Next"}
    >
      <div className="space-y-4">
        {/* Tab buttons */}
        <div className="flex gap-3 border-b pb-4" style={{ borderColor: 'rgba(10,30,92,0.18)' }}>
          {["definition", "exercise", "anchor"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab as any)}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                selectedTab === tab
                  ? "headline-text border-b-2 border-current"
                  : "muted-text hover:opacity-80"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="pt-4 min-h-[300px]">
          {selectedTab === "definition" && (
            <div>
              <p className="text-base leading-relaxed headline-text">
                {wordContent.definition}
              </p>
            </div>
          )}

          {selectedTab === "exercise" && (
            <div className="space-y-4">
              <p className="text-lg font-medium headline-text">
                {wordContent.exercise.question}
              </p>
              <div className="space-y-2">
                {wordContent.exercise.options.map((option) => (
                  <div
                    key={option.id}
                    className="p-3 rounded-lg transition-all cursor-pointer glass-card hover:scale-[1.01]"
                  >
                    <span className="font-medium headline-text">{option.id}.</span>
                    <span className="ml-2 headline-text">{option.text}</span>
                  </div>
                ))}
              </div>
              {wordContent.exercise.explanation && (
                <div className="mt-6 p-4 rounded-lg glass-card">
                  <p className="text-sm headline-text">
                    <span className="font-medium">Correct Answer: </span>
                    {wordContent.exercise.correctAnswer}
                  </p>
                  <p className="text-sm headline-text mt-2">
                    <span className="font-medium">Explanation:</span> {wordContent.exercise.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {selectedTab === "anchor" && (
            <div className="space-y-4">
              <p className="text-base font-medium headline-text">
                {anchorData.prompt}
              </p>
              <div className="space-y-2">
                <p className="text-sm muted-text">Relevant categories:</p>
                <div className="flex flex-col gap-3">
                  {anchorData.categories.map((category) => (
                    <div key={category} className="">
                      <span className="px-3 py-1 text-sm glass-pill mr-2">{category}</span>
                      {anchorData.examples && anchorData.examples[category] && (
                        <span className="text-sm italic text-gray-700">{anchorData.examples[category]}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 p-4 rounded-lg glass-card">
                <p className="text-sm headline-text">
                  💡 This question helps anchor your understanding by connecting the word to your personal experiences.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </SessionScreen>
  );
}
