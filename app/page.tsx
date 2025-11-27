"use client";

import { useEffect, useMemo, useState } from "react";
import WordPill from "../components/WordPill";

type Cluster = {
  id: string;
  emoji: string;
  name: string;
  words: string[];
};

const ALL_CLUSTERS: Cluster[] = [
  {
    id: "work",
    emoji: "💼",
    name: "Work",
    words: [
      "synergy",
      "delegate",
      "strategic",
      "deliverable",
    ],
  },
  {
    id: "school",
    emoji: "📚",
    name: "School",
    words: [
      "pedagogy",
      "analytical",
      "synthesis",
      "heuristic",
    ],
  },
  {
    id: "daily",
    emoji: "🏙️",
    name: "Daily Life",
    words: [
      "mundane",
      "attuned",
      "habituate",
      "ritual",
    ],
  },
  {
    id: "culture",
    emoji: "🎭",
    name: "Culture",
    words: [
      "canonical",
      "subtext",
      "vernacular",
      "nuance",
    ],
  },
  {
    id: "history",
    emoji: "🏺",
    name: "History",
    words: [
      "chronicle",
      "epochal",
      "antecedent",
      "retrospect",
    ],
  },
];

const MODES = [
  "Contrast",
  "Persona",
  "Hierarchy",
  "Scenario",
  "Rewrite",
  "Anchor",
] as const;

export default function Home() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [selected, setSelected] = useState<{ word: string; cluster: string }[]>(
    []
  );
  const [phase, setPhase] = useState<
    "pick" | "transition" | "session"
  >("pick");
  const [loadPercent, setLoadPercent] = useState(0);
  const [sessionIndex, setSessionIndex] = useState(0);

  useEffect(() => {
    // pick 3 random clusters
    const shuffled = [...ALL_CLUSTERS].sort(() => Math.random() - 0.5);
    setClusters(shuffled.slice(0, 3));
  }, []);

  const toggleWord = (word: string, cluster: string) => {
    const exists = selected.find((s) => s.word === word);
    if (exists) {
      setSelected(selected.filter((s) => s.word !== word));
    } else {
      if (selected.length >= 6) return; // limit to 6 so each can get unique mode
      setSelected([...selected, { word, cluster }]);
    }
  };

  const startSession = () => {
    if (selected.length < 3) return;
    setPhase("transition");
    setLoadPercent(8);
    const t1 = setTimeout(() => setLoadPercent(38), 250);
    const t2 = setTimeout(() => setLoadPercent(72), 550);
    const t3 = setTimeout(() => {
      setLoadPercent(100);
      setPhase("session");
    }, 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const modeFor = (idx: number) => MODES[idx % MODES.length];

  const sessionItems = useMemo(() => selected, [selected]);

  const current = sessionItems[sessionIndex];

  return (
    <div className="min-h-screen font-sans bg-[--bg,#F8F7F5] text-[#2D2D2D]">
      <header className="py-6 border-b border-[#eee]">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="m-0 text-lg font-medium">Aureus — Language Mentor</h1>
            <p className="m-0 text-sm text-[#8A8A8A]">Minimalist sessions for advanced vocabulary.</p>
          </div>
          <div>
            <div
              className="text-sm font-medium"
              style={{ color: selected.length >= 3 ? "#5FA897" : "#8A8A8A" }}
            >
              {selected.length}/{Math.max(3, selected.length)} words
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {phase === "pick" && (
          <section>
            <p style={{ marginTop: 0 }}>
              Choose 3–6 words to explore. Click a word to select it.
            </p>
            <div className="flex flex-col md:flex-row gap-6 mt-6">
              {clusters.map((c) => (
                <div key={c.id} className="flex-1 border border-[#e6e6e6] rounded-lg p-4">
                  <div className="text-base mb-3">
                    <span className="mr-2">{c.emoji}</span>
                    <span className="text-sm font-medium text-[#2D2D2D]">{c.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {c.words.map((w) => {
                      const active = !!selected.find((s) => s.word === w);
                      const CLUSTER_COLORS: Record<string, string> = {
                        work: "#9B7EBD",
                        school: "#6B9BD1",
                        daily: "#F4A987",
                        culture: "#7FC8A9",
                        history: "#D4E7F7",
                      };
                      const color = CLUSTER_COLORS[c.id] || "#C0B3E0";
                      return (
                        <WordPill
                          key={w}
                          word={w}
                          selected={active}
                          clusterColor={color}
                          onToggle={() => toggleWord(w, c.name)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="text-sm text-[#444]">Selected: {selected.length} (min 3 • max 6)</div>
              <div className="flex flex-wrap gap-2 mt-3">
                {selected.map((s) => (
                  <div key={s.word} className="px-3 py-1 border rounded-full text-sm border-[#eee]">
                    {s.word} <small className="text-[#888]">· {s.cluster}</small>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {phase === "transition" && (
          <section style={{ textAlign: "center", paddingTop: 40 }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>
              You chose {selected.length} words:
            </div>
            <div style={{ color: "#222", marginBottom: 10 }}>
              {selected.map((s) => (
                <span key={s.word} style={{ marginRight: 10 }}>
                  {s.word} <small style={{ color: "#777" }}>({s.cluster})</small>
                </span>
              ))}
            </div>
            <div style={{ color: "#555", fontStyle: "italic", marginBottom: 12 }}>
              Words that sharpen tone, authority and subtlety in conversation.
            </div>
            <div style={{ marginBottom: 12 }}>Wait for personalised session</div>
            <div style={{ marginTop: 8 }}>{loadPercent}% loaded</div>
          </section>
        )}

        {phase === "session" && current && (
          <section style={{ marginTop: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, color: "#666" }}>{current.cluster}</div>
                <h2 style={{ margin: "6px 0" }}>{current.word}</h2>
                <div style={{ fontSize: 13, color: "#444" }}>
                  Mode: {modeFor(sessionIndex)}
                </div>
              </div>

              <div>
                <div style={{ color: "#666" }}>Session {sessionIndex + 1} / {sessionItems.length}</div>
              </div>
            </div>

            <div style={{ marginTop: 14, padding: 14, border: "1px solid #eee", borderRadius: 8 }}>
              {/* Quick Definition */}
              <div style={{ marginBottom: 12 }}>
                <strong>Quick definition</strong>
                <div style={{ marginTop: 6, color: "#333" }}>
                  {quickDef(current.word)}
                </div>
              </div>

              {/* Core Exploration (mode-specific) */}
              <div style={{ marginBottom: 12 }}>
                <strong>Core exploration — {modeFor(sessionIndex)}</strong>
                <div style={{ marginTop: 8 }}>{renderMode(current.word, modeFor(sessionIndex))}</div>
              </div>

              {/* Personal Anchor */}
              <div>
                <strong>Personal anchor</strong>
                <div style={{ marginTop: 8 }}>{personalAnchorPrompt(current.word)}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                onClick={() => setSessionIndex((i) => Math.max(0, i - 1))}
                disabled={sessionIndex === 0}
                style={{ padding: "8px 10px" }}
              >
                Previous
              </button>
              <button
                onClick={() => setSessionIndex((i) => Math.min(sessionItems.length - 1, i + 1))}
                disabled={sessionIndex >= sessionItems.length - 1}
                style={{ padding: "8px 10px" }}
              >
                Next
              </button>
              <button
                onClick={() => {
                  setPhase("pick");
                  setSelected([]);
                  setSessionIndex(0);
                }}
                style={{ marginLeft: "auto", padding: "8px 10px" }}
              >
                Done
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Start button fixed bottom center per design system */}
      {phase === "pick" && selected.length >= 3 && (
        <div className="fixed left-0 right-0 bottom-6 flex justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <button
              onClick={startSession}
              className="text-white text-base font-medium"
              style={{
                background: "#5FA897",
                padding: "14px 40px",
                borderRadius: 16,
                boxShadow: "0 8px 24px rgba(95,168,151,0.25)",
                border: "none",
              }}
            >
              Start
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function quickDef(word: string) {
  const map: Record<string, string> = {
    synergy: "Joint actions that produce an effect greater than individual efforts.",
    delegate: "To assign responsibility while retaining accountability.",
    strategic: "Intentionally aligned with long-term aims, not just immediate gains.",
    deliverable: "A concrete output that marks progress in a project.",
    pedagogy: "The considered approach to guiding how people learn and think.",
    analytical: "Focused on reasoned break-down and evidence rather than intuition.",
    synthesis: "Combining elements to form a clearer whole or argument.",
    heuristic: "A practical rule-of-thumb that speeds judgment without guaranteeing correctness.",
    mundane: "Ordinary in surface form, often masking deeper habit or meaning.",
    attuned: "Sensitive and responsive to subtle cues or contexts.",
    habituate: "To make a practice routine, so it requires less conscious effort.",
    ritual: "A repeated action that shapes identity or belonging.",
    canonical: "Widely recognized as a standard or authoritative example.",
    subtext: "What is implied beneath what is said; the quiet story.",
    vernacular: "The everyday language or style of a community.",
    nuance: "A fine distinction that changes tone or implication.",
    chronicle: "A factual account arranged in sequence; history as narrative.",
    epochal: "Marked by significance that reshapes expectations.",
    antecedent: "Something that precedes and informs what follows.",
    retrospect: "Looking back to reframe meaning or motive.",
  };
  return map[word] || "A useful, context-sensitive term worth exploring.";
}

function renderMode(word: string, mode: (typeof MODES)[number]) {
  switch (mode) {
    case "Contrast": {
      const pair = contrastPair(word);
      return (
        <div>
          <div style={{ marginBottom: 8 }}>
            Which fits better in a formal report about a team outcome?
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ padding: 8 }}>{pair[0]}</button>
            <button style={{ padding: 8 }}>{pair[1]}</button>
          </div>
          <div style={{ marginTop: 8, color: "#666" }}>
            Choose quickly; then reflect how each shifts perceived responsibility.
          </div>
        </div>
      );
    }
    case "Persona": {
      return (
        <div>
          <div style={{ marginBottom: 8 }}>
            How would you phrase one line about this topic to different listeners?
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input type="radio" name="p1" /> Intern — cautious, humble
            </label>
            <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input type="radio" name="p1" /> Manager — diplomatic, outcome-focused
            </label>
            <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input type="radio" name="p1" /> Peer — direct, collaborative
            </label>
          </div>
        </div>
      );
    }
    case "Hierarchy": {
      return (
        <div>
          <div style={{ marginBottom: 8 }}>Rank these by professional impact (1–3):</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ padding: 8, border: "1px solid #eee" }}>clarity</div>
            <div style={{ padding: 8, border: "1px solid #eee" }}>precision</div>
            <div style={{ padding: 8, border: "1px solid #eee" }}>persuasion</div>
          </div>
        </div>
      );
    }
    case "Scenario": {
      return (
        <div>
          <div style={{ marginBottom: 8 }}>
            Short scene: you have one minute in a meeting to introduce this concept.
          </div>
          <div style={{ marginBottom: 8 }}>
            Option A: give a concise definition. Option B: give an example that shows value.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ padding: 8 }}>A — Definition</button>
            <button style={{ padding: 8 }}>B — Example</button>
          </div>
        </div>
      );
    }
    case "Rewrite": {
      return (
        <div>
          <div style={{ marginBottom: 8 }}>Rewrite this line to sound more precise:</div>
          <div style={{ marginBottom: 8 }}><em>"We need to improve our synergy."</em></div>
          <div>
            <input placeholder="Your concise rewrite" style={{ width: "100%", padding: 8 }} />
          </div>
        </div>
      );
    }
    case "Anchor": {
      return (
        <div>
          <div style={{ marginBottom: 8 }}>Reflect briefly (one line):</div>
          <div style={{ marginBottom: 8 }}>
            When last did this word describe how you acted or were perceived?
          </div>
          <div>
            <input placeholder="One-line reflection" style={{ width: "100%", padding: 8 }} />
          </div>
        </div>
      );
    }
    default:
      return null;
  }
}

function contrastPair(word: string) {
  // simple heuristic pairs
  const pairs: Record<string, [string, string]> = {
    nuance: ["subtlety", "clarity"],
    synergy: ["collaboration", "coordination"],
    cordial: ["warm", "formal"],
    analytical: ["analytic", "intuitive"],
  };
  return pairs[word] || [word, "alternative"];
}

function personalAnchorPrompt(word: string) {
  return (
    <div style={{ color: "#333" }}>
      {(() => {
        switch (word) {
          case "synergy":
            return "When did describing a result as ‘synergy’ shift others’ credit?";
          case "nuance":
            return "Which past remark needed more nuance to avoid misreading?";
          case "pedagogy":
            return "Which approach to teaching changed how someone understood you?";
          default:
            return `How might using ‘${word}’ alter how others hear you?`;
        }
      })()}
    </div>
  );
}

