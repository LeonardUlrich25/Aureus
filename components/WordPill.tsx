import React from "react";

type Props = {
  word: string;
  selected: boolean;
  // index within the selected array (0-based) when selected, otherwise undefined
  selectionIndex?: number | null;
  totalSelected?: number;
  clusterColor: string; // hex
  onToggle: () => void;
};

function hexToLuma(hex: string) {
  const c = hex.replace('#', '');
  const rgb = c.length === 3 ? c.split('').map((ch) => parseInt(ch + ch, 16)) : [parseInt(c.slice(0,2),16), parseInt(c.slice(2,4),16), parseInt(c.slice(4,6),16)];
  // relative luminance approximation
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function lighten(hex: string, amount: number) {
  const c = hex.replace('#', '');
  const rgb = c.length === 3 ? c.split('').map((ch) => parseInt(ch + ch, 16)) : [parseInt(c.slice(0,2),16), parseInt(c.slice(2,4),16), parseInt(c.slice(4,6),16)];
  const lightenChannel = (v: number) => Math.min(255, Math.round(v + (255 - v) * amount));
  const [r, g, b] = rgb.map(lightenChannel);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default function WordPill({ word, selected, selectionIndex = null, totalSelected = 0, clusterColor, onToggle }: Props) {
  const baseClass = "relative overflow-hidden inline-flex items-center justify-center rounded-full select-none transition-all duration-200 ease-out px-6 py-3 font-medium focus:outline-none whitespace-nowrap";
  const textSize = "1rem";

  // Determine visual state
  // Default: filled with cluster color
  let background = clusterColor;
  let color = hexToLuma(clusterColor) > 200 ? '#111' : '#fff';
  let boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
  let transform = 'none';

  if (selected) {
    // If total selected is less than 3: show grey
    if ((totalSelected || 0) < 3) {
      const base = '#E6E6E6';
      background = lighten(base, 0.05);
      color = '#111';
      boxShadow = '0 4px 14px rgba(0,0,0,0.1)';
      transform = 'scale(1.02)';
    } else {
      // From third selection onwards: all selected turn green
      const base = '#5FA897';
      background = lighten(base, 0.07);
      color = '#fff';
      boxShadow = '0 8px 22px rgba(0,0,0,0.14)';
      transform = 'scale(1.02)';
    }
  }

  const chromeVars = {
    "--chrome-strength": selected ? "0.6" : "0.32",
    "--chrome-highlight": selected ? "0.08" : "0",
  } as React.CSSProperties;

  const style = {
    background,
    color,
    boxShadow,
    transform,
    border: '1.5px solid transparent',
    fontSize: textSize,
    ...chromeVars,
  } as React.CSSProperties;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      style={style}
      className={`${baseClass} chrome-shell`}
      aria-label={`${word} ${selected ? 'selected' : 'unselected'}`}
    >
      {word}
    </button>
  );
}
