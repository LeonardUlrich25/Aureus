"use client";

import React from "react";

type Props = {
  label: string;
  selected?: boolean;
  color?: string;
  onToggle?: () => void;
};
type OptionPillProps = {
  label: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  borderColor?: string;
  onToggle?: () => void;
  disabled?: boolean;
};

function lighten(hex: string, amount: number) {
  const c = hex.replace('#', '');
  const rgb = c.length === 3 ? c.split('').map((ch) => parseInt(ch + ch, 16)) : [parseInt(c.slice(0,2),16), parseInt(c.slice(2,4),16), parseInt(c.slice(4,6),16)];
  const lightenChannel = (v: number) => Math.min(255, Math.round(v + (255 - v) * amount));
  const [r, g, b] = rgb.map(lightenChannel);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default function OptionPill({
  label,
  isSelected = false,
  isCorrect = false,
  isWrong = false,
  borderColor = "#5FA897",
  onToggle,
  disabled = false,
}: OptionPillProps) {
  const green = "#5FA897";
  const red = "#E35B5B";
  const chromeRest = disabled ? "0.2" : "0.32";
  const chromeActive = disabled ? "0.2" : "0.58";
  const chromeHighlight = disabled ? "0" : isSelected ? "0.12" : "0";

  const getStyles = () => {
    if (!isSelected) {
      return {
        background: "#fff",
        chrome: chromeRest,
        shadow: "0 2px 8px rgba(0,0,0,0.05)",
        color: borderColor,
      } as const;
    }

    // Selected state
    if (isCorrect) {
      return {
        background: green,
        chrome: chromeActive,
        shadow: "0 8px 20px rgba(0,0,0,0.12)",
        color: "#fff",
      } as const;
    }

    if (isWrong) {
      return {
        background: red,
        chrome: chromeActive,
        shadow: "0 8px 20px rgba(0,0,0,0.12)",
        color: "#fff",
      } as const;
    }

    // Selected but not validated: fill with the option color
    return {
      background: lighten(borderColor, 0.08),
      chrome: chromeActive,
      shadow: "0 8px 20px rgba(0,0,0,0.12)",
      color: "#fff",
    } as const;
  };

  const styles = getStyles();
  const chromeVars = {
    "--chrome-strength": styles.chrome,
    "--chrome-highlight": chromeHighlight,
  } as React.CSSProperties;

  return (
    <button
      type="button"
      onClick={() => !disabled && onToggle && onToggle()}
      className="w-full text-left rounded-full px-5 py-4 border-2 relative overflow-hidden chrome-shell"
      style={{
        background: styles.background,
        color: styles.color,
        borderColor: "transparent",
        boxShadow: styles.shadow,
        transition: "all 180ms ease-out",
        cursor: disabled ? "default" : "pointer",
        ...chromeVars,
      }}
    >
      {label}
    </button>
  );
}
