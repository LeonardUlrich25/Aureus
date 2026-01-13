"use client";

import React from "react";

type Props = {
  emoji?: string;
  label: string;
  selected?: boolean;
  colorFrom?: string;
  colorTo?: string;
  onToggle?: () => void;
};

export default function CategoryCard({ emoji, label, selected = false, colorFrom = "#8B7AB8", colorTo = "#C74A9E", onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-lg p-4 flex flex-col items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
        transform: selected ? "scale(1.05)" : "none",
        boxShadow: selected ? "0 8px 20px rgba(0,0,0,0.12)" : "0 4px 12px rgba(0,0,0,0.08)",
        color: "#fff",
      }}
      aria-pressed={selected}
    >
      <div className="text-2xl">{emoji}</div>
      <div className="mt-2 font-medium">{label}</div>
    </button>
  );
}
