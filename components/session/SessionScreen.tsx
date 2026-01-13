"use client";

import React from "react";

type Props = {
  word: string;
  clusterColor?: string;
  cluster?: string;
  modeLabel?: string;
  children?: React.ReactNode;
  onNext?: () => void;
  nextLabel?: string;
  disabled?: boolean;
  help?: React.ReactNode;
};

export default function SessionScreen({
  word,
  clusterColor = "#9B7EBD",
  cluster = "",
  modeLabel,
  children,
  onNext,
  nextLabel = "Next",
  disabled = false,
  help,
}: Props) {
  return (
    <div className="min-h-screen px-6 py-8 md:py-4 flex flex-col" style={{ background: "#F8F7F5" }}>
      <header className="max-w-3xl mx-auto mb-2 md:mb-2 w-full">
          <div className="flex items-center justify-between">
          <div></div>
          <div className="text-sm font-medium"></div>
          <div>{/* system icons placeholder */}</div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        <div className="mb-4">
          <h2 className="text-2xl font-bold" style={{ color: clusterColor }}>{word}</h2>
          {cluster && <div className="text-sm text-[#8A8A8A] mt-1">{cluster}</div>}
        </div>

        <article className="bg-white rounded-[20px] shadow-md p-6 md:p-4 flex-1 flex flex-col overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          {children}
        </article>

        <div className="mt-6">
          {help}
        </div>

        <div className="mt-6">
          <button
            onClick={onNext}
            disabled={disabled}
            className="w-full py-4 rounded-[16px] text-white font-medium"
            style={{
              background: disabled ? "#CFCFCF" : "#5FA897",
              opacity: disabled ? 0.85 : 1,
            }}
          >
            {nextLabel}
          </button>
        </div>
      </main>
    </div>
  );
}
