"use client";

import React, { useEffect, useMemo, useState } from "react";
import WordPill from "../WordPill";

type ClusterInfo = {
  name: string;
  emoji: string;
  words: string[];
};

type Props = {
  selectedWords: string[];
  clusters: ClusterInfo[];
  duration?: number; // ms
  onComplete?: () => void;
  clusterColors?: Record<string, string>;
};

export default function TransitionScreen({
  selectedWords,
  clusters,
  duration = 2000,
  onComplete,
  clusterColors = {},
}: Props) {
  const [percent, setPercent] = useState(0);
  
  // Filter clusters to only show those containing selected words
  const relevantClusters = useMemo(() => {
    const clusterSet = new Set<string>();
    
    selectedWords.forEach(word => {
      clusters.forEach(cluster => {
        if (cluster.words.includes(word)) {
          clusterSet.add(cluster.name);
        }
      });
    });
    
    return clusters.filter(cluster => clusterSet.has(cluster.name));
  }, [selectedWords, clusters]);
  
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const elapsed = Math.min(t - start, duration);
      const p = Math.round((elapsed / duration) * 100);
      setPercent(p);
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        // small fade-out pause before complete
        setTimeout(() => onComplete && onComplete(), 120);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, onComplete]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6" style={{ background: "#F8F7F5" }}>
      <div className="text-lg text-[#666] mb-6 font-medium">You selected:</div>

      <div className="flex flex-col items-center gap-3">
        {selectedWords.map((w, i) => {
          // color assignment: cycle clusterColors if provided
          const colors = Object.values(clusterColors);
          const color = colors.length ? colors[i % colors.length] : "#9B7EBD";
          return (
            <div key={w} className="w-[260px] flex justify-center">
              <WordPill word={w} selected={true} selectionIndex={i} totalSelected={selectedWords.length} clusterColor={color} onToggle={() => {}} />
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-lg text-[#666] font-medium">Let's explore:</div>

      <div className="flex gap-6 mt-4 items-center text-base text-[#444]">
        {relevantClusters.map((c) => (
          <div key={c.name} className="flex items-center gap-2">
            <span className="text-xl">{c.emoji}</span>
            <span className="text-[#666] font-medium">{c.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <div className="text-base font-medium text-[#5FA897]">Loading personalised session</div>
        <div className="text-lg font-semibold text-[#5FA897] mt-2">{percent}%</div>

        <div className="w-[260px] h-1 bg-white rounded-full mt-4 overflow-hidden" style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.03)" }}>
          <div style={{ width: `${percent}%`, height: "100%", background: "#5FA897", transition: "width 120ms linear" }} />
        </div>
      </div>
    </div>
  );
}
