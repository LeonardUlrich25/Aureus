"use client";

import React, { useEffect, useState } from "react";

const AVAILABLE_MODELS = [
  { id: "claude-haiku-4.5", label: "Claude Haiku 4.5" },
  { id: "claude-2", label: "Claude 2" },
  { id: "gpt-4o", label: "GPT-4o" },
];

export default function ModelSelector() {
  const [model, setModel] = useState<string>("claude-haiku-4.5");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("preferredModel");
      if (saved) setModel(saved);
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  const onChange = (v: string) => {
    setModel(v);
    try {
      localStorage.setItem("preferredModel", v);
    } catch (e) {}
  };

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <label htmlFor="model-select" style={{ fontSize: 12, color: "#666" }}>
        Model
      </label>
      <select
        id="model-select"
        value={model}
        onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
        style={{ padding: "6px 8px", borderRadius: 8, border: "1px solid #e6e6e6" }}
        aria-label="Select inference model"
      >
        {AVAILABLE_MODELS.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
}
