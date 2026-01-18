"use client";

import React, { useEffect, useMemo, useState } from "react";
import { StarButton } from "@/components/StarButton";

type SummaryCluster = {
  name: string;
  emoji?: string;
  words: string[];
};

type Props = {
  words: string[];
  clusters: SummaryCluster[];
  onHome: () => void;
};

export default function SessionSummary({ words, clusters, onHome }: Props) {
  const [durationMs, setDurationMs] = useState<number>(0);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    if (typeof window === "undefined") return;
    const startRaw = sessionStorage.getItem("session_start_time");
    const start = startRaw ? parseInt(startRaw, 10) : Date.now();
    setDurationMs(Date.now() - start);
    
    // Get userId for star button
    const storedUserId = sessionStorage.getItem('userId') || '';
    setUserId(storedUserId);
  }, []);

  const duration = useMemo(() => {
    const totalSec = Math.max(0, Math.floor(durationMs / 1000));
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }, [durationMs]);

  const wordToCluster = useMemo(() => {
    const map = new Map<string, { name: string; color: string }>();
    const colorForClusterName = (name: string) => {
      const colors: Record<string, string> = {
        Work: "#9B7EBD",
        School: "#6B9BD1",
        "Daily Life": "#F4A987",
        Culture: "#E57B7B",
        History: "#84BFE0",
        Literary: "#9B7EBD",
        Conflict: "#8B5F5F",
      };
      return colors[name] || "#9B7EBD";
    };

    clusters.forEach((c) => {
      c.words.forEach((w) => {
        map.set(w, { name: c.name, color: colorForClusterName(c.name) });
      });
    });
    return map;
  }, [clusters]);

  return (
    <div className="mobile-fit-screen md:min-h-0 md:h-full flex items-center justify-start md:items-start md:justify-start px-4 md:px-6 pt-12 pb-2 md:py-4 overflow-y-auto md:overflow-hidden">
      <div className="max-w-3xl w-full bg-white border border-stone-200 rounded-3xl shadow-2xl p-4 md:p-6 space-y-4 md:space-y-4 mt-2 md:mt-0">
        <div className="mb-6 md:mb-4 text-center flex-shrink-0">
          <h2 className="text-2xl md:text-4xl font-semibold headline-text mb-2 md:mb-3">
            Session Summary
          </h2>
          <p className="muted-text text-sm md:text-base">A quick recap of your journey</p>
        </div>

        <div className="mb-6 md:mb-4 grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 flex-shrink-0">
          <div className="rounded-xl md:rounded-2xl p-2 md:p-5 text-center bg-white shadow-lg border border-stone-100">
            <div className="text-base md:text-3xl font-medium headline-text">{words.length}</div>
            <div className="text-[11px] md:text-sm muted-text">words completed</div>
          </div>
          <div className="rounded-xl md:rounded-2xl p-2 md:p-5 text-center bg-white shadow-lg border border-stone-100">
            <div className="text-base md:text-3xl font-medium headline-text">{clusters.length}</div>
            <div className="text-[11px] md:text-sm muted-text">clusters explored</div>
          </div>
          <div className="rounded-xl md:rounded-2xl p-2 md:p-5 text-center bg-white shadow-lg border border-stone-100">
            <div className="text-base md:text-3xl font-medium headline-text">{duration}</div>
            <div className="text-[11px] md:text-sm muted-text">session duration</div>
          </div>
        </div>

        <div className="mb-6 md:mb-4 flex-shrink overflow-y-auto md:overflow-visible bg-white border border-stone-100 rounded-2xl shadow-lg p-4">
          <h3 className="text-base md:text-lg font-medium headline-text mb-3 md:mb-3 flex-shrink-0">Words and clusters</h3>
          <div className="space-y-2 md:space-y-2">
            {words.map((w, i) => {
              const info = wordToCluster.get(w);
              return (
                <div
                  key={`${w}-${i}`}
                  className="flex items-center justify-between rounded-xl md:rounded-2xl p-3 md:p-3 glass-card"
                >
                  <div className="flex items-center gap-2 md:gap-2">
                    <div className="w-6 h-6 md:w-6 md:h-6 rounded-full glass-pill flex items-center justify-center text-xs md:text-xs font-medium" style={{ color: 'var(--text-strong)' }}>
                      {i + 1}
                    </div>
                    <div>
                      <div className="headline-text font-medium text-sm md:text-sm">{w}</div>
                      <div className="text-xs md:text-xs muted-text hidden md:block">
                        {info?.name || "Unknown cluster"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-2">
                    {info && (
                      <div
                        className="px-2 md:px-2 py-0.5 md:py-0.5 rounded-full text-white text-xs font-medium whitespace-nowrap"
                        style={{ background: info.color }}
                      >
                        {info.name}
                      </div>
                    )}
                    <StarButton
                      word={w}
                      definition={`Definition of ${w}`}
                      cluster={info?.name || 'general'}
                      difficulty={5}
                      userId={userId}
                      size="lg"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile floating Home button (green house icon) */}
        <div className="fixed left-1/2 transform -translate-x-1/2 bottom-4 z-50 md:hidden">
          <button
            aria-label="Home"
            onClick={onHome}
            className="p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </button>
        </div>

        {/* Desktop Home button remains centered */}
        <div className="hidden md:block text-center flex-shrink-0 md:mt-4 md:mb-0">
          <button
            onClick={onHome}
            className="px-8 py-3 md:px-12 md:py-4 rounded-[16px] text-sm md:text-base font-medium transition accent-btn md:bg-stone-900 md:text-white md:shadow-lg md:hover:bg-stone-800 md:hover:shadow-xl"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
