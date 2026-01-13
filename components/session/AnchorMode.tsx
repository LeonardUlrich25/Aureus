"use client";

import React, { useState } from "react";
import CategoryCard from "../ui/CategoryCard";

type Props = {
  question: string;
  categories?: { id: string; label: string; emoji: string; colorFrom?: string; colorTo?: string }[];
  onChoose?: (ids: string[]) => void;
};

export default function AnchorMode({ question, categories = [], onChoose }: Props) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => {
    setSelected((s) => {
      const next = { ...s, [id]: !s[id] };
      onChoose && onChoose(Object.keys(next).filter((k) => next[k]));
      return next;
    });
  };

  const list = categories.length
    ? categories
    : [
        { id: "hobbies", label: "Hobbies", emoji: "🎨", colorFrom: "#8B7AB8", colorTo: "#C74A9E" },
        { id: "work", label: "Work", emoji: "🔧", colorFrom: "#C74A9E", colorTo: "#E6B422" },
        { id: "school", label: "School", emoji: "🎓", colorFrom: "#E6B422", colorTo: "#5B9BD5" },
        { id: "family", label: "Family", emoji: "👨‍👩‍👧", colorFrom: "#5B9BD5", colorTo: "#4FADA6" },
      ];

  return (
    <div>
      <div className="text-xl font-semibold text-[#F4A987] mb-4" dangerouslySetInnerHTML={{ __html: question }} />

      <div className="grid grid-cols-2 gap-3">
        {list.map((c) => (
          <CategoryCard
            key={c.id}
            emoji={c.emoji}
            label={c.label}
            selected={!!selected[c.id]}
            colorFrom={c.colorFrom}
            colorTo={c.colorTo}
            onToggle={() => toggle(c.id)}
          />
        ))}
      </div>
    </div>
  );
}
