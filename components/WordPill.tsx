import React from "react";

type Props = {
  word: string;
  selected: boolean;
  clusterColor: string; // hex
  onToggle: () => void;
};

export default function WordPill({ word, selected, clusterColor, onToggle }: Props) {
  const base = "inline-flex items-center justify-center rounded-full shadow-sm select-none";
  const unselectedStyle: React.CSSProperties = {
    background: "#fff",
    border: `2px solid ${clusterColor}`,
    color: clusterColor,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  };
  const selectedStyle: React.CSSProperties = {
    background: clusterColor,
    border: "none",
    color: "#fff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
    transform: "scale(1.02)",
  };

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      style={selected ? selectedStyle : unselectedStyle}
      className={
        base +
        " transition-transform duration-200 ease-out px-5 py-2 text-sm font-medium focus:outline-none"
      }
      aria-label={`${word} ${selected ? "selected" : "unselected"}`}
    >
      {word}
    </button>
  );
}
