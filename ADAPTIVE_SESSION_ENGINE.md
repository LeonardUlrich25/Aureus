# Adaptive Micro-Session Engine

## Overview

A sophisticated vocabulary learning system that adapts teaching methods to match the cognitive demands of individual words. This engine implements the principle: **method follows meaning**.

## Core Philosophy

- **No uniform pipeline**: Each word activates a different cognitive pattern based on its semantic weight
- **Coherent journeys**: Creates meaningful progressions rather than isolated tasks
- **Reality transformation**: Explores how using a word changes outcomes
- **Prevents disengagement**: Variety prevents factory-style repetition

## Architecture

### Types (`types/session.ts`)

**Session Modes**:
- `CONTRAST`: Meaning vs incorrect usage (sharpens discrimination)
- `HIERARCHY`: Spectrum or layers (reveals gradations)
- `PERSONA`: Who uses it and how (social positioning)
- `MAP`: Visual semantic networks (relational thinking)
- `NARRATIVE`: Micro-stories (contextual usage)

**Cognitive Weights**:
- `INTELLECTUAL`: Requires conceptual frameworks
- `EMOTIONAL`: Demands emotional/social lens  
- `RELATIONAL`: Abstract relational approach
- `DISCRIMINATIVE`: Subtle discrimination exercise

**Display Formats**:
- `CARD`, `SLIDER`, `TWO_CHOICE`, `FILL_IN`, `DRAG_CONNECT`, `SCENARIO_PICKER`
- Varied to prevent rhythm prediction

### Mode Implementations (`lib/session-modes/`)

Each mode extends `MicroSessionMode` abstract base:

1. **ContrastMode**: Discriminates authentic vs misuse
2. **HierarchyMode**: Maps intensity spectrums
3. **PersonaMode**: Connects language to social identity
4. **MapMode**: Builds semantic networks
5. **NarrativeMode**: Embeds words in transformative scenarios

### Engine (`lib/AdaptiveMicroSessionEngine.ts`)

**Core Methods**:
- `selectModeForWord()`: Deliberate mode selection based on cognitive weight
- `createMicroSession()`: Generates coherent multi-word journeys
- `analyzeJourney()`: Tracks progression quality

**Intelligence**:
- Avoids recently used modes for variety
- Maps cognitive weights to optimal modes
- Tracks display format history
- Builds progression across words

### Enhanced Vocabulary (`data/vocabulary-enhanced.ts`)

Each word includes:
```typescript
{
  word: string;
  definition: string;
  cognitiveWeight: WordCognitiveWeight;
  semanticField: string;  // business, emotional, academic, etc.
  contextTags: string[];  // Additional markers
}
```

7 curated clusters: Work, School, Daily Life, Culture, History, Literary, Conflict

## Usage Example

```typescript
import { sessionEngine } from "@/lib/AdaptiveMicroSessionEngine";
import { vocabularyClusters } from "@/data/vocabulary-enhanced";
import { WordProfile } from "@/types/session";

// Select words
const selectedWords: WordProfile[] = [
  vocabularyClusters[0].words[0], // scalability - INTELLECTUAL
  vocabularyClusters[2].words[2], // empathy - EMOTIONAL
  vocabularyClusters[1].words[3]  // pedagogy - INTELLECTUAL
];

// Generate adaptive session
const interactions = sessionEngine.createMicroSession(selectedWords);

// Each interaction is tailored to word's cognitive nature
interactions.forEach((interaction, i) => {
  console.log(`\nWord ${i + 1}: ${interaction.word}`);
  console.log(`Mode: ${interaction.mode}`);
  console.log(`Anchor: ${interaction.anchor}`);
  console.log(`Task: ${interaction.task.prompt}`);
});
```

## Key Principles

### 1. Method Follows Meaning
- **INTELLECTUAL** words → Hierarchy, Map modes
- **EMOTIONAL** words → Persona, Narrative modes  
- **RELATIONAL** words → Map, Hierarchy modes
- **DISCRIMINATIVE** words → Contrast, Hierarchy modes

### 2. Anchoring Strategy
Anchors connect to **personal identity**, not grammatical form:
- "When would using '{word}' feel authentic to you?"
- "Who gains credibility by using '{word}'?"
- "What changes when you choose '{word}'?"

### 3. Unpredictability
- Varied display formats prevent pattern recognition
- Mode selection avoids recent repetitions
- Tasks feel fresh, not formulaic

### 4. Outcome Focus
Learners should finish thinking:
> "I know when to use this word"

Not:
> "I memorized a definition"

## Integration Points

### Current Integration
- ✅ Type system established
- ✅ Mode implementations complete
- ✅ Engine orchestration ready
- ✅ Vocabulary enhanced with cognitive weights
- ⏳ Page.tsx integration pending

### Next Steps
1. Update session flow in `app/page.tsx` to use engine
2. Create React components for each display format
3. Implement interaction handlers
4. Add journey analytics display
5. Build progress tracking

## File Structure

```
types/
  session.ts           # Core type definitions

lib/
  AdaptiveMicroSessionEngine.ts  # Orchestration engine
  session-modes/
    MicroSessionMode.ts          # Abstract base
    ContrastMode.ts              # Discrimination training
    HierarchyMode.ts             # Spectrum mapping
    PersonaMode.ts               # Social positioning
    MapMode.ts                   # Semantic networks
    NarrativeMode.ts             # Contextual scenarios
    index.ts                     # Exports

data/
  vocabulary-enhanced.ts  # Words with cognitive profiles
  vocabulary.ts          # (deprecated - use enhanced)

utils/
  randomizeWords.ts      # Selection helpers
```

## Philosophy

This is not a commodity flashcard app. This is **category-defining vocabulary education**:

- Words are not isolated definitions
- Learning adapts to meaning
- Reality changes when language is used precisely
- Journey quality matters

The difference between memorization and mastery.
