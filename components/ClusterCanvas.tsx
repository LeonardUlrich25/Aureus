"use client";

import React, { useEffect, useRef, useState } from "react";
import WordPill from "./WordPill";

type Tile = {
  word: string;
  left: number; // px
  top: number; // px
  width: number;
  height: number;
};

type Props = {
  words: string[];
  clusterColor: string;
  selectedWords: string[]; // words currently selected
  onToggle: (word: string) => void;
  forceTextBlack?: boolean;
  totalSelected?: number;
};

// measure an element's size by rendering offscreen
function measureWord(word: string) {
  const span = document.createElement("span");
  span.style.position = "absolute";
  span.style.visibility = "hidden";
  span.style.whiteSpace = "nowrap";
  span.style.padding = "0.75rem 1rem"; // approx px-6 py-3
  span.style.fontSize = "1rem";
  span.style.fontWeight = "500";
  span.style.borderRadius = "999px";
  span.innerText = word;
  document.body.appendChild(span);
  const rect = span.getBoundingClientRect();
  document.body.removeChild(span);
  return { width: rect.width, height: rect.height };
}

export default function ClusterCanvas({ words, clusterColor, selectedWords, onToggle, forceTextBlack = true, totalSelected = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tiles, setTiles] = useState<Tile[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { width: containerW, height: containerH } = el.getBoundingClientRect();

    // measure each word
    const measured = words.map((w) => ({ word: w, ...measureWord(w) }));

    const placed: Tile[] = [];

    const padding = 8; // keep a small gap

    for (const m of measured) {
      let attempt = 0;
      let placedTile: Tile | null = null;
      while (attempt < 200 && !placedTile) {
        const left = Math.max(padding, Math.random() * (containerW - m.width - padding * 2));
        const top = Math.max(padding, Math.random() * (containerH - m.height - padding * 2));
        const rect = { left, top, right: left + m.width, bottom: top + m.height };
        // check collisions
        let collision = false;
        for (const p of placed) {
          const pr = { left: p.left, top: p.top, right: p.left + p.width, bottom: p.top + p.height };
          const overlapX = Math.max(0, Math.min(rect.right, pr.right) - Math.max(rect.left, pr.left));
          const overlapY = Math.max(0, Math.min(rect.bottom, pr.bottom) - Math.max(rect.top, pr.top));
          if (overlapX > 0 && overlapY > 0) {
            collision = true;
            break;
          }
        }
        if (!collision) {
          placedTile = { word: m.word, left, top, width: m.width, height: m.height };
          placed.push(placedTile);
        }
        attempt++;
      }
      // if couldn't place without collision, allow near placement (no strict overlap)
      if (!placedTile) {
        const left = Math.max(padding, Math.random() * (containerW - m.width - padding * 2));
        const top = Math.max(padding, Math.random() * (containerH - m.height - padding * 2));
        placedTile = { word: m.word, left, top, width: m.width, height: m.height };
        placed.push(placedTile);
      }
    }

    setTiles(placed);
  }, [words]);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: 260 }}>
      {tiles.map((t) => {
        const active = selectedWords.includes(t.word);
        const selIndex = selectedWords.findIndex((s) => s === t.word);
        return (
          <div
            key={t.word}
            style={{ position: "absolute", left: t.left, top: t.top }}
          >
            <WordPill
              word={t.word}
              selected={active}
              selectionIndex={selIndex >= 0 ? selIndex : null}
              totalSelected={totalSelected}
              clusterColor={clusterColor}
              forceTextBlack={forceTextBlack}
              onToggle={() => onToggle(t.word)}
            />
          </div>
        );
      })}
    </div>
  );
}
