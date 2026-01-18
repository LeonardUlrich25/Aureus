import { useMemo, type CSSProperties } from 'react';

interface FloatingWordPillProps {
  word: string;
  clusterColor: string;
  isSelected: boolean;
  selectionIndex: number | null;
  totalSelected: number;
  onClick?: () => void;
  wordIndex?: number; // For mobile non-overlapping animation
}

function lighten(hex: string, amount: number) {
  const c = hex.replace('#', '');
  const rgb = c.length === 3 ? c.split('').map((ch) => parseInt(ch + ch, 16)) : [parseInt(c.slice(0,2),16), parseInt(c.slice(2,4),16), parseInt(c.slice(4,6),16)];
  const lightenChannel = (v: number) => Math.min(255, Math.round(v + (255 - v) * amount));
  const [r, g, b] = rgb.map(lightenChannel);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function FloatingWordPill({ word, clusterColor, isSelected, selectionIndex, totalSelected, onClick, wordIndex = 0 }: FloatingWordPillProps) {
  // Generate unique animation parameters
  const animationStyle = useMemo(() => {
    // Base duration (desktop)
    let duration = 20 + Math.random() * 8; // 20-28s drift (halved speed)
    // Reduce drift on mobile to avoid overlap; slightly increase speed on mobile by shortening duration
    let xRange = 5 + Math.random() * 7;
    let yRange = 5 + Math.random() * 7;
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
      // Mobile: use deterministic, staggered ranges to prevent overlap
      // Each word gets its own Y range segment to avoid vertical collision
      const ySegmentSize = 3; // pixels per segment - increased for more visible movement
      const yStart = wordIndex * ySegmentSize;
      yRange = yStart + 2; // Moderate drift within own segment
      
      // Create deterministic random direction per word (not based on index alternation)
      // Use word's character codes to generate a pseudo-random direction
      const wordHash = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const xBase = 3 + (wordIndex % 3) * 1.5; // 3-6px range
      xRange = (wordHash % 2 === 0 ? 1 : -1) * xBase;
      
      duration = 16 + (wordIndex % 4) * 2; // Slower speed: 16-22s (halved speed)
    }
    return {
      animation: `float-${word} ${duration}s ease-in-out 0s infinite`,
      '--x-distance': `${xRange}px`,
      '--y-distance': `${yRange}px`,
    } as CSSProperties;
  }, [word, wordIndex]);

  // Determine background and text color based on selection state
  const getColors = () => {
    if (!isSelected) {
      // Unselected: filled with cluster color, white text
      return {
        background: clusterColor,
        color: '#fff',
        shadow: '0 2px 8px rgba(0,0,0,0.06)',
      };
    }

    // Selected state
    if (totalSelected < 3) {
      // First two selections: light grey
      return {
        background: lighten('#E6E6E6', 0.05),
        color: '#2D2D2D',
        shadow: '0 4px 14px rgba(0,0,0,0.1)',
      };
    }

    // Third selection and beyond: green
    return {
      background: lighten('#5FA897', 0.07),
      color: '#fff',
      shadow: '0 8px 22px rgba(0,0,0,0.14)',
    };
  };

  const colors = getColors();
  const chromeVars = {
    '--chrome-strength': isSelected ? '1.5' : '1.2',
    '--chrome-highlight': isSelected ? '0.6' : '0.32',
  } as CSSProperties;

  return (
    <>
      {/* Inject unique keyframes for this pill */}
      <style>{`
        @keyframes float-${word} {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(
              var(--x-distance, 8px),
              var(--y-distance, 8px)
            );
          }
        }
      `}</style>

      <button
        onClick={onClick}
        className="px-4 py-2 md:px-6 md:py-3 rounded-3xl font-medium text-sm md:text-base transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] relative overflow-hidden chrome-shell chrome-shell-strong flex items-center justify-center whitespace-nowrap"
        style={{
          ...animationStyle,
          background: colors.background,
          color: colors.color,
          boxShadow: colors.shadow,
          border: '2.4px solid rgba(255,255,255,0.98)',
          ...chromeVars,
        }}
      >
        {word}
      </button>
    </>
  );
}
