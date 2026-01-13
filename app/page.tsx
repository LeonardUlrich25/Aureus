"use client";

import { useEffect, useState } from "react";
import { UserProfileManager } from '@/lib/userProfile';
import { BehaviorTracker } from '@/lib/behaviorTracker';
import { FloatingWordPill } from "../components/FloatingWordPill";
import TransitionScreen from "../components/session/TransitionScreen";
import InteractionRouter from "../components/session/InteractionRouter";
import WordContentDisplay from "../components/session/WordContentDisplay";
import JourneyAnalytics from "../components/session/JourneyAnalytics";
import SessionSummary from "../components/session/SessionSummary";
import { ResetJourneyButton } from "@/components/ResetJourneyButton";
import { SavedWordsModal } from "@/components/SavedWordsModal";
import { useAdaptiveSession, getWordContent } from "@/hooks/useAdaptiveSession";
import { WordContent, wordDatabase } from "@/data/wordContent";
import { SessionFlow } from "@/components/SessionFlow";
import { vocabularyClusters, Cluster, Word } from "@/data/vocabulary";
import { getRandomizedClusters } from "@/utils/randomizeWords";

export default function Home() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [selected, setSelected] = useState<Word[]>([]);
  const [phase, setPhase] = useState<"pick" | "transition" | "sessionFlow" | "summary" | "analytics">("pick");
  const [showSavedWords, setShowSavedWords] = useState(false);
  const [clusterSides, setClusterSides] = useState<Record<string, 'left' | 'right'>>({});

  const [userId] = useState(() => {
    if (typeof window === 'undefined') return '';
    let id = localStorage.getItem('userId');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', id);
    }
    return id;
  });

  const [userProfile, setUserProfile] = useState<any>(null);

  // Adaptive session hook (now accepts optional profile)
  const {
    currentInteraction,
    progress,
    advance,
    isComplete,
    metrics,
    isLoading,
    error
  } = useAdaptiveSession(selected, userProfile);

  // Handle session completion - only show analytics if interactions were completed
  useEffect(() => {
    console.log('📊 Session completion check:', {
      isComplete,
      phase,
      completedInteractions: progress.completedInteractions
    });
    
    if (isComplete && phase === "sessionFlow" && progress.completedInteractions > 0) {
      console.log('✅ Moving to analytics phase');
      setPhase("analytics");
    }
  }, [isComplete, phase, progress.completedInteractions]);

  // Helper: Select 3 clusters ensuring no duplicate colors
  const getUniqueColorClusters = () => {
    const CLUSTER_COLORS: Record<string, string> = {
      work: "#B87B9E",
      school: "#6B9BD1",
      daily: "#F4A987",
      culture: "#E57B7B",
      history: "#84BFE0",
      literary: "#7BA882",
      conflict: "#8B5F5F",
      "nuance-traps": "#8BA7B8",
      "precision-verbs": "#6BA5C4",
      "abstract-adjectives": "#9DAA7E",
      science: "#5B9FD6",
      psychology: "#7CBAC5",
      ethics: "#C9A86A",
      nature: "#6FA87D",
      society: "#9B8DC5",
      rhetoric: "#D4915D",
    };
    const shuffled = [...vocabularyClusters].sort(() => Math.random() - 0.5);
    const selected: Cluster[] = [];
    const usedColors = new Set<string>();
    for (const cluster of shuffled) {
      const color = CLUSTER_COLORS[cluster.id];
      if (!usedColors.has(color)) {
        selected.push(cluster);
        usedColors.add(color);
        if (selected.length === 3) break;
      }
    }
    return selected;
  };

  useEffect(() => {
    // pick 3 random clusters with unique colors and randomize 4 words from each
    const selectedClusters = getUniqueColorClusters();
    // Mobile header sides: two clusters on one side and one on the other.
    // Randomly mirror between left–right–left and right–left–right.
    const sides: Record<string, 'left' | 'right'> = {};
    const mirror = Math.random() < 0.5; // false => L-R-L, true => R-L-R
    if (selectedClusters[0]) sides[selectedClusters[0].id] = mirror ? 'right' : 'left';   // top
    if (selectedClusters[1]) sides[selectedClusters[1].id] = mirror ? 'left'  : 'right';  // middle
    if (selectedClusters[2]) sides[selectedClusters[2].id] = mirror ? 'right' : 'left';   // bottom
    setClusterSides(sides);
    setClusters(getRandomizedClusters(selectedClusters, 4));
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) return;
      try {
        const profile = await UserProfileManager.getOrCreateProfile(userId);
        setUserProfile(profile);
        console.log('📊 User profile loaded for personalization');
      } catch (err) {
        console.error('Failed to load user profile', err);
      }
    };
    loadProfile();
  }, [userId]);

  const toggleWord = (wordObj: Word, cluster: string) => {
    const exists = selected.find((s) => s.word === wordObj.word);
    if (exists) {
      setSelected(selected.filter((s) => s.word !== wordObj.word));
    } else {
      if (selected.length >= 12) return; // limit to 12
      setSelected([...selected, wordObj]);
    }
  };

  const startSession = () => {
    if (selected.length < 3) return;
    console.log('🎬 Starting session with', selected.length, 'words');
    console.log('Selected words:', selected);
    
    // SILENT BACKGROUND TRACKING of selection
    (async () => {
      try {
        await BehaviorTracker.trackWordSelection(userId, selected, []);
        console.log('✅ Selection tracked silently');
      } catch (err) {
        console.error('Tracking failed (non-critical):', err);
      }
    })();

    // store for session and mark start time
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selected_words', JSON.stringify(selected.map(s => s.word)));
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('session_start_time', Date.now().toString());
    }

    setPhase("transition");
    
    // Automatically advance to SessionFlow after transition
    setTimeout(() => {
      console.log('⏭️ Advancing from transition to SessionFlow');
      setPhase("sessionFlow");
    }, 2000);
  };

  const handleSessionRestart = () => {
    setSelected([]);
    setPhase("pick");
    // Randomize clusters again with unique colors
    const selectedClusters = getUniqueColorClusters();
    setClusters(getRandomizedClusters(selectedClusters, 4));
    // Randomize mobile headline sides with mirrored pattern
    const sides: Record<string, 'left' | 'right'> = {};
    const mirror = Math.random() < 0.5; // false => L-R-L, true => R-L-R
    if (selectedClusters[0]) sides[selectedClusters[0].id] = mirror ? 'right' : 'left';
    if (selectedClusters[1]) sides[selectedClusters[1].id] = mirror ? 'left'  : 'right';
    if (selectedClusters[2]) sides[selectedClusters[2].id] = mirror ? 'right' : 'left';
    setClusterSides(sides);

    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('session_start_time');
    }
  };

  const handleResetJourney = () => {
    // Clear all selections
    setSelected([]);
    setPhase("pick");
    
    // Clear any stored session data
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('selected_words');
      sessionStorage.removeItem('session_progress');
    }
    
    // Randomize clusters again with unique colors
    const selectedClusters = getUniqueColorClusters();
    setClusters(getRandomizedClusters(selectedClusters, 4));
    // Randomize mobile headline sides with mirrored pattern
    const sides: Record<string, 'left' | 'right'> = {};
    const mirror = Math.random() < 0.5; // false => L-R-L, true => R-L-R
    if (selectedClusters[0]) sides[selectedClusters[0].id] = mirror ? 'right' : 'left';
    if (selectedClusters[1]) sides[selectedClusters[1].id] = mirror ? 'left'  : 'right';
    if (selectedClusters[2]) sides[selectedClusters[2].id] = mirror ? 'right' : 'left';
    setClusterSides(sides);
  };

  function colorForClusterName(name: string) {
    const map: Record<string, string> = {
      Work: "#B87B9E",
      School: "#6B9BD1",
      "Daily Life": "#F4A987",
      Daily: "#F4A987",
      Culture: "#E57B7B",
      History: "#84BFE0",
      Literary: "#7BA882",
      Conflict: "#8B5F5F",
      "Nuance Traps": "#8BA7B8",
      "Precision Verbs": "#6BA5C4",
      "Abstract Adjectives": "#9DAA7E",
      Science: "#5B9FD6",
      Psychology: "#7CBAC5",
      Ethics: "#C9A86A",
      Nature: "#6FA87D",
      Society: "#9B8DC5",
      Rhetoric: "#D4915D",
    };
    return map[name] || "#C0B3E0";
  }

  return (
    <div className={`h-screen overflow-hidden font-sans text-[#2D2D2D] relative ${["sessionFlow", "summary"].includes(phase) ? "md:overflow-hidden" : "md:min-h-screen md:overflow-auto"}`}
      style={phase === "pick" ? {
        backgroundImage: 'url(/uk-flag-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : { backgroundColor: '#F8F7F5' }}
    >
      {/* Background overlay for readability on pick phase */}
      {phase === "pick" && (
        <div className="absolute inset-0 bg-white/60 pointer-events-none" style={{ zIndex: 0 }} />
      )}
      
      {/* Reset button - top left corner, only shown during pick phase */}
      {phase === "pick" && (
        <>
          <div className="absolute top-6 left-6 z-10">
            <ResetJourneyButton onReset={handleResetJourney} />
          </div>
          
          {/* Saved words button - top right corner */}
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={() => setShowSavedWords(true)}
              className="group relative inline-flex items-center gap-2 md:px-3 px-2 py-1.5 
                         md:border-2 md:border-yellow-500 md:rounded-full
                         transition-all duration-200
                         focus:outline-none md:hover:bg-yellow-50 md:focus:ring-2 md:focus:ring-yellow-500 md:focus:ring-offset-2"
              aria-label="View saved words"
            >
              <svg className="w-6 h-6 md:w-4 md:h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <span className="text-sm font-medium text-black hidden md:inline">Saved words</span>
            </button>
          </div>
        </>
      )}

      <header className="py-4 md:py-6 flex-shrink-0" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 flex items-center justify-center">
          <div style={{ textAlign: "center" }}>
            <h1 className="m-0 font-medium text-xl md:text-2xl" style={{ color: "#2D2D2D", letterSpacing: "0.05em" }}>
              Neat!
            </h1>
          </div>
        </div>
      </header>

      <main className={`max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-8 flex-1 ${["sessionFlow", "summary"].includes(phase) ? "md:overflow-hidden" : "overflow-y-auto"}`} style={{ position: 'relative', zIndex: 1 }}>
        {phase === "pick" && (
          <section>
            <h2 className="text-base md:text-lg font-medium mx-auto mb-4 md:mb-6" style={{ color: "#2D2D2D", marginTop: 0, textAlign: 'center', letterSpacing: "0.02em" }}>
              Select 3+ expressions to refine
            </h2>
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 mt-3 md:mt-6">
              {clusters.map((c, idx) => {
                const mobileOffsetClass = idx === 1 ? "-mt-20 md:mt-0" : idx === 2 ? "-mt-40 md:mt-0" : "";
                return (
                <div key={c.id} className={`flex-1 ${mobileOffsetClass}`}>
                  {/* Mobile header - headline larger than bubbles */}
                  <div className={`mb-2 md:mb-4 flex ${clusterSides[c.id] === 'right' ? 'justify-end pr-3' : 'justify-start pl-3'} md:justify-start md:pl-0 md:pr-0`}>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-xl md:text-2xl">{c.emoji}</span>
                      {/* Mobile header text larger than bubble text; desktop unchanged */}
                      <span className="text-base md:text-xl" style={{ fontWeight: 600, color: colorForClusterName(c.name) }}>{c.name}</span>
                    </div>
                  </div>
                  {/* Mobile: vertical staggered bubble layout - no horizontal adjacency */}
                  <div className="md:hidden relative" style={{ minHeight: `${c.words.length * 48}px`, paddingTop: '44px' }}>
                    {c.words.map((wordObj, idx) => {
                      const active = !!selected.find((s) => s.word === wordObj.word);
                      const CLUSTER_COLORS: Record<string, string> = {
                        work: "#B87B9E",
                        school: "#6B9BD1",
                        daily: "#F4A987",
                        culture: "#E57B7B",
                        history: "#84BFE0",
                        literary: "#7BA882",
                        conflict: "#8B5F5F",
                        "nuance-traps": "#8BA7B8",
                        "precision-verbs": "#6BA5C4",
                        "abstract-adjectives": "#9DAA7E",
                        science: "#5B9FD6",
                        psychology: "#7CBAC5",
                        ethics: "#C9A86A",
                        nature: "#6FA87D",
                        society: "#9B8DC5",
                        rhetoric: "#D4915D",
                        rhetoric: "#D4915D",
                      };
                      const color = CLUSTER_COLORS[c.id] || "#C0B3E0";
                      const selIndex = selected.findIndex((s) => s.word === wordObj.word);
                      // Deterministic alternating horizontal offset for stagger effect
                      const horizontalOffset = idx % 2 === 0 ? 0 : 56;
                      const randomVariation = (wordObj.word.length * 7 + idx * 13) % 28 - 14; // ±14px variation
                      const finalOffset = horizontalOffset + randomVariation;
                      const anchor = clusterSides[c.id] || 'left';
                      const centerInset = 12; // Slight inset on mobile
                      const positionStyle =
                        anchor === 'right'
                          ? { top: `${idx * 48}px`, right: `${Math.max(0, finalOffset) + centerInset}px` }
                          : { top: `${idx * 48}px`, left: `${Math.max(0, finalOffset) + centerInset}px` };
                      return (
                        <div
                          key={wordObj.word}
                          className="absolute"
                          style={{ ...positionStyle, zIndex: 10 }}
                        >
                          <FloatingWordPill
                            word={wordObj.word}
                            clusterColor={color}
                            isSelected={active}
                            selectionIndex={selIndex >= 0 ? selIndex : null}
                            totalSelected={selected.length}
                            wordIndex={idx}
                            onClick={() => toggleWord(wordObj, c.name)}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop: keep existing 2-column grid */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-3">
                    {c.words.map((wordObj) => {
                      const active = !!selected.find((s) => s.word === wordObj.word);
                      const CLUSTER_COLORS: Record<string, string> = {
                        work: "#B87B9E",
                        school: "#6B9BD1",
                        daily: "#F4A987",
                        culture: "#E57B7B",
                        history: "#84BFE0",
                        literary: "#7BA882",
                        conflict: "#8B5F5F",
                        "nuance-traps": "#8BA7B8",
                        "precision-verbs": "#6BA5C4",
                        "abstract-adjectives": "#9DAA7E",
                        science: "#5B9FD6",
                        psychology: "#7CBAC5",
                        ethics: "#C9A86A",                        nature: "#6FA87D",
                        society: "#9B8DC5",                      };
                      const color = CLUSTER_COLORS[c.id] || "#C0B3E0";
                      const selIndex = selected.findIndex((s) => s.word === wordObj.word);
                      return (
                        <div key={wordObj.word} className="flex items-center justify-center">
                          <FloatingWordPill
                            word={wordObj.word}
                            clusterColor={color}
                            isSelected={active}
                            selectionIndex={selIndex >= 0 ? selIndex : null}
                            totalSelected={selected.length}
                            onClick={() => toggleWord(wordObj, c.name)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                );
              })}
            </div>

            <div className={`mt-4 md:mt-8 text-center ${selected.length >= 3 ? '-mt-16 md:mt-8' : 'md:mt-8'}`}>
              <div
                className="text-base md:text-lg font-medium"
                style={{ color: selected.length >= 3 ? "#5FA897" : "#2D2D2D" }}
              >
                {selected.length}/3 words
              </div>
            </div>
            <div className="md:hidden h-24" />
          </section>
        )}

        {phase === "transition" && (
          <TransitionScreen
            selectedWords={selected.map((s) => s.word)}
            clusters={clusters.map((c) => ({
              name: c.name,
              emoji: c.emoji,
              words: c.words.map(w => w.word)
            }))}
            duration={2000}
            clusterColors={{ work: "#B87B9E", school: "#6B9BD1", daily: "#F4A987", culture: "#E57B7B", history: "#84BFE0", literary: "#7BA882", conflict: "#8B5F5F", "nuance-traps": "#8BA7B8", "precision-verbs": "#6BA5C4", "abstract-adjectives": "#9DAA7E", science: "#5B9FD6", psychology: "#7CBAC5", ethics: "#C9A86A", nature: "#6FA87D", society: "#9B8DC5", rhetoric: "#D4915D" }}
            onComplete={() => setPhase("sessionFlow")}
          />
        )}

        {phase === "sessionFlow" && (
          <SessionFlow
            selectedWordNames={selected.map((s) => s.word)}
            onComplete={() => setPhase("summary")}
          />
        )}

        {phase === "summary" && (
          <SessionSummary
            words={selected.map((s) => s.word)}
            clusters={clusters.map((c) => ({ name: c.name, emoji: c.emoji, words: c.words.map(w => w.word) }))}
            onHome={handleSessionRestart}
          />
        )}

        {phase === "analytics" && metrics && progress.completedInteractions > 0 && (
          <JourneyAnalytics
            metrics={metrics}
            onContinue={handleSessionRestart}
          />
        )}
      </main>

      {/* Start button fixed bottom center per design system */}
      {phase === "pick" && selected.length >= 3 && (
        <div className="fixed left-0 right-0 bottom-4 md:bottom-6 flex justify-center pointer-events-none flex-shrink-0">
          <div className="pointer-events-auto">
            <button
              onClick={startSession}
              className="text-white text-sm md:text-base font-medium"
              style={{
                background: "#5FA897",
                padding: "12px 32px",
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
      
      {/* Saved words modal */}
      <SavedWordsModal
        isOpen={showSavedWords}
        onClose={() => setShowSavedWords(false)}
        userId={userId}
      />
    </div>
  );
}
