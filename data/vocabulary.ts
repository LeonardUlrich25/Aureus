// data/vocabulary.ts

import { WordCognitiveWeight } from "@/types/session";

const { INTELLECTUAL, EMOTIONAL, RELATIONAL, DISCRIMINATIVE } = WordCognitiveWeight;

export interface Word {
  word: string;
  definition: string;
  cognitiveWeight?: WordCognitiveWeight;
  semanticField?: string;
  contextTags?: string[];
  cluster?: string;
  difficulty?: number;
  partOfSpeech?: string;
  task?: {
    type: string;
    prompt: string;
    instruction?: string;
    options?: string[];
    context: string;
  };
  anchor?: {
    type: string;
    prompt: string;
    scene: string;
    context: string;
    reflection: string;
  };
}

export interface Cluster {
  id: string;
  name: string;
  emoji: string;
  borderColor: string;
  fillColor: string;
  words: Word[];
}

export const vocabularyClusters: Cluster[] = [
  {
    id: "work",
    name: "Work",
    emoji: "💼",
    borderColor: "#9A8B9E",
    fillColor: "#B87B9E",
    words: [
      { 
        word: "scalability", 
        definition: "The capacity of a system to handle growing amounts of work by adding resources. In business, it refers to growth potential without proportional cost increases.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "business",
        contextTags: ["systems", "growth", "technical"]
      },
      { 
        word: "delegation", 
        definition: "The assignment of responsibility or authority to another person to carry out specific tasks. Essential for effective leadership and team management.",
        cognitiveWeight: RELATIONAL,
        semanticField: "management",
        contextTags: ["leadership", "responsibility", "teamwork"]
      },
      { 
        word: "benchmark", 
        definition: "A standard or point of reference against which things may be compared or assessed. Used to measure performance or quality in professional contexts.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "analytical",
        contextTags: ["measurement", "standards", "comparison"]
      },
      { 
        word: "synergy", 
        definition: "When different elements combine to create a result greater than the sum of their individual effects. Describes productive collaboration that amplifies outcomes.",
        cognitiveWeight: RELATIONAL,
        semanticField: "collaborative",
        contextTags: ["teamwork", "integration", "amplification"]
      },
      { 
        word: "delegate", 
        definition: "To entrust a task or responsibility to another person, typically one who is less senior. A key management skill for distributing workload effectively.",
        cognitiveWeight: RELATIONAL,
        semanticField: "management",
        contextTags: ["leadership", "trust", "distribution"]
      },
      { 
        word: "strategic", 
        definition: "Relating to the identification of long-term aims and interests and the means of achieving them. Involves careful planning and positioning for success.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "planning",
        contextTags: ["long-term", "positioning", "goals"]
      },
      { 
        word: "deliverable", 
        definition: "A tangible or intangible good or service produced as a result of a project. Something that can be provided to satisfy a contractual obligation.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "project-management",
        contextTags: ["output", "concrete", "contractual"]
      },
      { 
        word: "kindly", 
        definition: "In a kind manner; also used to make polite requests or give firm instructions. Context determines whether it softens or strengthens your message.",
        cognitiveWeight: RELATIONAL,
        semanticField: "professional",
        contextTags: ["register", "tone", "politeness"]
      },
      { 
        word: "regarding", 
        definition: "Concerning; about; in relation to. Signals formality in professional contexts.",
        cognitiveWeight: RELATIONAL,
        semanticField: "professional",
        contextTags: ["register", "formality", "email"]
      },
      { 
        word: "concerning", 
        definition: "About; regarding (preposition) OR causing worry or anxiety (adjective). Context determines which meaning applies.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "professional",
        contextTags: ["ambiguity", "register", "feedback"]
      },
      { 
        word: "facilitate", 
        definition: "To make an action or process easier or smoother. Signals coordinating complex dynamics, not simple tasks.",
        cognitiveWeight: RELATIONAL,
        semanticField: "professional",
        contextTags: ["register", "leadership", "jargon"]
      },
      { 
        word: "assist", 
        definition: "To help someone, especially in a formal or professional context. Creates professional distance where 'help' creates warmth.",
        cognitiveWeight: RELATIONAL,
        semanticField: "professional",
        contextTags: ["register", "formality", "distance"]
      },
      { 
        word: "inquire", 
        definition: "To ask for information in a formal manner. Elevates 'ask' when formality demonstrates respect.",
        cognitiveWeight: RELATIONAL,
        semanticField: "professional",
        contextTags: ["register", "formality", "email"]
      },
      { 
        word: "discuss", 
        definition: "To talk about something to reach a decision or exchange ideas. Can signal openness or feel evasive depending on context.",
        cognitiveWeight: RELATIONAL,
        semanticField: "professional",
        contextTags: ["register", "meetings", "framing"]
      },
      { 
        word: "suggest", 
        definition: "To put forward an idea tentatively; to recommend something without insisting. Signals lower confidence than 'recommend.'",
        cognitiveWeight: RELATIONAL,
        semanticField: "professional",
        contextTags: ["register", "confidence", "leadership"]
      },
      { 
        word: "issue", 
        definition: "A topic or subject; also a problem or difficulty. Corporate cushioning around the word 'problem.'",
        cognitiveWeight: RELATIONAL,
        semanticField: "professional",
        contextTags: ["register", "jargon", "spin"]
      },
      { 
        word: "leverage", 
        definition: "To use something to maximum advantage; to utilize existing resources strategically. Means amplifying value, not just using.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "business",
        contextTags: ["strategy", "jargon", "amplification"]
      },
      { 
        word: "trade-off", 
        definition: "A balance achieved between two desirable but incompatible features; a compromise involving giving up one thing in return for another. Core to strategic decision-making.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "strategy",
        contextTags: ["decision", "compromise", "balance"]
      }
    ]
  },
  {
    id: "school",
    name: "School",
    emoji: "📚",
    borderColor: "#6B8E9B",
    fillColor: "#6B9BD1",
    words: [
      { 
        word: "expert", 
        definition: "A person with comprehensive and authoritative knowledge or skill in a particular area. Implies mastery gained through extensive study or experience.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "academic",
        contextTags: ["mastery", "knowledge", "authority"]
      },
      { 
        word: "proficiency", 
        definition: "A high degree of competence or skill in a particular area. Demonstrates advanced capability beyond basic knowledge.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "academic",
        contextTags: ["competence", "skill", "mastery"]
      },
      { 
        word: "retention", 
        definition: "The continued possession, use, or control of something, especially information in memory. In education, refers to how well knowledge is maintained over time.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "academic",
        contextTags: ["memory", "learning", "knowledge"]
      },
      { 
        word: "pedagogy", 
        definition: "The method and practice of teaching, especially as an academic subject or theoretical concept. Encompasses educational philosophy and instructional strategies.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "academic",
        contextTags: ["teaching", "education", "method"]
      },
      { 
        word: "analytical", 
        definition: "Relating to or using analysis or logical reasoning. The systematic examination of something to understand its nature or determine its essential features.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "academic",
        contextTags: ["reasoning", "logic", "analysis"]
      },
      { 
        word: "synthesis", 
        definition: "The combination of ideas to form a theory or system, or the production of a substance by combining elements. Represents the creation of something new from existing parts.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "academic",
        contextTags: ["creation", "combination", "integration"]
      },
      { 
        word: "heuristic", 
        definition: "A practical approach to problem-solving using methods that are sufficient for reaching an immediate solution. Learning through discovery and experimentation.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "academic",
        contextTags: ["problem-solving", "discovery", "learning"]
      },
      { 
        word: "furthermore", 
        definition: "In addition; moreover (formal connector used in writing and speeches). Essay voice that sounds unnatural in speech.",
        cognitiveWeight: RELATIONAL,
        semanticField: "academic",
        contextTags: ["writing", "register", "formality"]
      },
      { 
        word: "utilize", 
        definition: "To make use of; to employ (often considered unnecessarily formal compared to 'use'). Simple words signal confidence.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "business",
        contextTags: ["jargon", "formality", "clarity"]
      },
      { 
        word: "significant", 
        definition: "Important; meaningful; having a particular meaning (can be vague without context). Often disguises vagueness as sophistication.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "academic",
        contextTags: ["precision", "vagueness", "reporting"]
      },
      { 
        word: "critical", 
        definition: "Expressing disapproval (negative); or crucially important (positive). Never assume which meaning is intended.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "professional",
        contextTags: ["ambiguity", "judgment", "importance"]
      },
      { 
        word: "actual", 
        definition: "Existing in fact; real (NOT 'current'—common non-native speaker error from Romance languages).",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "academic",
        contextTags: ["false-friend", "language", "precision"]
      },
      { 
        word: "eventually", 
        definition: "In the end; at some point in the future (NOT 'possibly'—common error). Implies certainty about future timing.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "academic",
        contextTags: ["false-friend", "timing", "certainty"]
      },
      { 
        word: "simple", 
        definition: "Easy to understand or do; uncomplicated (positive: elegant; negative: simplistic/naive). Tone makes it praise or criticism.",
        cognitiveWeight: RELATIONAL,
        semanticField: "business",
        contextTags: ["connotation", "tone", "design"]
      },
      { 
        word: "salient", 
        definition: "Standing out prominently or notably; the most noticeable, important, or relevant aspect of something. What captures attention first.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "academic",
        contextTags: ["attention", "importance", "perception"]
      },
      { 
        word: "specious", 
        definition: "Misleadingly attractive or plausible in appearance but actually wrong, false, or invalid. Reasoning that sounds good but doesn't hold up.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "academic",
        contextTags: ["fallacy", "deception", "critical-thinking"]
      },
      { 
        word: "tenuous", 
        definition: "Very weak, slight, or insubstantial; barely connected or supported. A fragile connection that could easily break or fail.",
        cognitiveWeight: RELATIONAL,
        semanticField: "academic",
        contextTags: ["weakness", "fragility", "connection"]
      },
      { 
        word: "empirical", 
        definition: "Based on observation, experience, or experimentation rather than theory or pure logic alone. Grounded in real-world evidence and testing.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "academic",
        contextTags: ["evidence", "observation", "scientific"]
      },
      { 
        word: "extrapolate", 
        definition: "To estimate or infer something by extending known information beyond its original scope. To make conclusions based on limited data.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "academic",
        contextTags: ["inference", "prediction", "reasoning"]
      },
      { 
        word: "paradigm", 
        definition: "A typical example, pattern, or model; a framework of ideas, assumptions, and methods that shape understanding in a field or context.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "academic",
        contextTags: ["framework", "model", "worldview"]
      },
      { 
        word: "falsifiable", 
        definition: "Capable of being proven false through empirical testing or observation. A core principle of scientific method; a claim must be testable to be scientific.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "scientific",
        contextTags: ["methodology", "testing", "evidence"]
      }
    ]
  },
  {
    id: "daily",
    name: "Daily Life",
    emoji: "🏙️",
    borderColor: "#C8A882",
    fillColor: "#F4A987",
    words: [
      { 
        word: "nuance", 
        definition: "A subtle difference in meaning, expression, or tone. Describes the fine distinctions that add depth and complexity to communication or understanding.",
        cognitiveWeight: RELATIONAL,
        semanticField: "communication",
        contextTags: ["subtlety", "nuance", "precision"]
      },
      { 
        word: "assertive", 
        definition: "Having or showing a confident and forceful personality while respecting others. Balances self-advocacy with consideration, distinct from aggression.",
        cognitiveWeight: RELATIONAL,
        semanticField: "personality",
        contextTags: ["confidence", "boundary", "respect"]
      },
      { 
        word: "empathy", 
        definition: "The ability to understand and share the feelings of another person. Goes beyond sympathy to involve emotional resonance and perspective-taking.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "emotional",
        contextTags: ["emotion", "understanding", "connection"]
      },
      { 
        word: "cordial", 
        definition: "Warm and friendly in manner or tone. Describes polite, pleasant interaction that creates a welcoming atmosphere.",
        cognitiveWeight: RELATIONAL,
        semanticField: "social",
        contextTags: ["warmth", "friendliness", "tone"]
      },
      { 
        word: "mundane", 
        definition: "Lacking interest or excitement; dull and routine. Describes ordinary aspects of everyday life, often with a slightly negative connotation.",
        cognitiveWeight: RELATIONAL,
        semanticField: "daily",
        contextTags: ["routine", "ordinary", "boring"]
      },
      { 
        word: "attuned", 
        definition: "Made aware or responsive to something. Being in harmony or adjusted to a particular situation or environment.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "awareness",
        contextTags: ["awareness", "harmony", "adjustment"]
      },
      { 
        word: "habituate", 
        definition: "To make or become accustomed to something through repeated exposure. The process of forming a habit or becoming used to a situation.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "psychology",
        contextTags: ["habit", "exposure", "learning"]
      },
      { 
        word: "ritual", 
        definition: "A series of actions performed according to a prescribed order, often with symbolic meaning. Can be religious, cultural, or personal in nature.",
        cognitiveWeight: RELATIONAL,
        semanticField: "culture",
        contextTags: ["ceremony", "tradition", "meaning"]
      },
      { 
        word: "quite", 
        definition: "To a certain extent (UK: understatement); completely or very (US: emphasis). The word's meaning depends on the speaker's origin.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "colloquial",
        contextTags: ["register", "cultural", "intensifier"]
      },
      { 
        word: "rather", 
        definition: "To a certain degree; used to soften or add politeness (can sound condescending or old-fashioned). Often hedges enthusiasm.",
        cognitiveWeight: RELATIONAL,
        semanticField: "colloquial",
        contextTags: ["hedging", "politeness", "tone"]
      },
      { 
        word: "somewhat", 
        definition: "To a moderate degree; rather. Hedges criticism to preserve relationship but can muddy clarity.",
        cognitiveWeight: RELATIONAL,
        semanticField: "colloquial",
        contextTags: ["hedging", "feedback", "clarity"]
      },
      { 
        word: "actually", 
        definition: "In fact; used to emphasize truth or make a correction (can sound defensive or confrontational). Signals correction even when you mean clarification.",
        cognitiveWeight: RELATIONAL,
        semanticField: "colloquial",
        contextTags: ["correction", "emphasis", "defensiveness"]
      },
      { 
        word: "honestly", 
        definition: "In an honest manner; used to emphasize sincerity (but can imply previous statements weren't honest). Double-edged intensifier.",
        cognitiveWeight: RELATIONAL,
        semanticField: "colloquial",
        contextTags: ["sincerity", "emphasis", "trust"]
      },
      { 
        word: "appreciate", 
        definition: "To recognize the value of something; to be grateful for. Can either deepen warmth or create formality depending on context.",
        cognitiveWeight: RELATIONAL,
        semanticField: "social",
        contextTags: ["gratitude", "warmth", "formality"]
      },
      { 
        word: "understand", 
        definition: "To comprehend meaning or grasp a situation; also used to show empathy. Can accidentally center yourself when you mean to witness others.",
        cognitiveWeight: RELATIONAL,
        semanticField: "communication",
        contextTags: ["empathy", "comprehension", "listening"]
      },
      { 
        word: "concern", 
        definition: "A worry or anxiety; something that matters to someone; to relate to or affect. The form changes the feeling.",
        cognitiveWeight: RELATIONAL,
        semanticField: "emotional",
        contextTags: ["worry", "care", "form"]
      },
      { 
        word: "support", 
        definition: "To give assistance or approval; to agree with or advocate for. Implies action and commitment, not just alignment.",
        cognitiveWeight: RELATIONAL,
        semanticField: "social",
        contextTags: ["commitment", "action", "advocacy"]
      },
      { 
        word: "respect", 
        definition: "A feeling of admiration; due regard for someone's rights or wishes. Can signal boundary as much as admiration.",
        cognitiveWeight: RELATIONAL,
        semanticField: "social",
        contextTags: ["admiration", "boundary", "regard"]
      },
      { 
        word: "frugal", 
        definition: "Economical with money; sparing (positive: wise; negative: cheap). Your word choice exposes your judgment.",
        cognitiveWeight: RELATIONAL,
        semanticField: "social",
        contextTags: ["connotation", "judgment", "money"]
      },
      { 
        word: "unique", 
        definition: "Being the only one of its kind; unlike anything else (positive: special; neutral: unusual). Genuinely positive only when paired with clear enthusiasm.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "colloquial",
        contextTags: ["connotation", "ambiguity", "tone"]
      },
      { 
        word: "sensible", 
        definition: "Showing good judgment; practical (NOT 'sensitive'—common confusion). Completely different from 'sensitive.'",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "colloquial",
        contextTags: ["false-friend", "precision", "judgment"]
      },
      { 
        word: "candid", 
        definition: "Truthful and straightforward; frank and sincere without evasion or pretense. Openness that builds trust through honest communication.",
        cognitiveWeight: RELATIONAL,
        semanticField: "communication",
        contextTags: ["honesty", "directness", "trust"]
      },
      { 
        word: "resilient", 
        definition: "Able to withstand or recover quickly from difficult conditions or setbacks. The capacity to bounce back and adapt in the face of adversity.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "character",
        contextTags: ["strength", "adaptation", "recovery"]
      },
      { 
        word: "forthright", 
        definition: "Direct and outspoken; expressing thoughts or feelings clearly without hesitation. Combines honesty with confidence in communication.",
        cognitiveWeight: RELATIONAL,
        semanticField: "communication",
        contextTags: ["directness", "confidence", "clarity"]
      },
      { 
        word: "discern", 
        definition: "To perceive or recognize something with careful attention or judgment. To detect subtle differences or underlying truths through keen observation.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "perception",
        contextTags: ["judgment", "observation", "subtlety"]
      }
    ]
  },
  {
    id: "culture",
    name: "Culture",
    emoji: "🎭",
    borderColor: "#7A9B8B",
    fillColor: "#E57B7B",
    words: [
      { 
        word: "canonical", 
        definition: "Included in the list of sacred books officially accepted as genuine. In literature and culture, refers to works considered the most important and influential.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "literary",
        contextTags: ["authority", "literature", "tradition"]
      },
      { 
        word: "subtext", 
        definition: "An underlying and often distinct theme in a conversation or piece of writing. The implicit meaning beneath the surface of what is said or written.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "literary",
        contextTags: ["hidden meaning", "interpretation", "reading"]
      },
      { 
        word: "vernacular", 
        definition: "The language or dialect spoken by the ordinary people in a particular region. Everyday, informal language as opposed to formal or literary language.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "linguistic",
        contextTags: ["language", "dialect", "register"]
      },
      { 
        word: "nuance", 
        definition: "A subtle difference in meaning, expression, or tone. Describes the fine distinctions that add depth and complexity to communication or understanding.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "linguistic",
        contextTags: ["subtlety", "precision", "meaning"]
      },
      { 
        word: "ken", 
        definition: "One's range of knowledge, understanding, or sight. In Scottish, can also mean to know. Describes the limits of what someone comprehends.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "knowledge",
        contextTags: ["understanding", "knowledge", "scope"]
      },
      { 
        word: "heathen", 
        definition: "A person who does not belong to a widely held religion, especially Christianity, Judaism, or Islam. Historically used to describe non-believers or pagans.",
        cognitiveWeight: RELATIONAL,
        semanticField: "cultural",
        contextTags: ["religion", "culture", "identity"]
      },
      { 
        word: "wend", 
        definition: "To go in a specified direction, typically slowly or by an indirect route. A literary term for traveling or making one's way, often used poetically.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "movement",
        contextTags: ["journey", "literary", "travel"]
      },
      { 
        word: "hale", 
        definition: "Strong and healthy, especially in old age. Describes robust physical condition, often paired with hearty as in hale and hearty.",
        cognitiveWeight: RELATIONAL,
        semanticField: "health",
        contextTags: ["wellness", "vitality", "condition"]
      },
      { 
        word: "anachronistic", 
        definition: "Out of its proper time period; belonging to or appearing in the wrong historical era. Something that contradicts the timeline or context.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "cultural",
        contextTags: ["time", "history", "error"]
      },
      { 
        word: "derivative", 
        definition: "Not original; based on or copied from something else. Lacking freshness or innovation; secondary rather than primary.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "creativity",
        contextTags: ["originality", "imitation", "criticism"]
      },
      { 
        word: "didactic", 
        definition: "Intended to teach or instruct, sometimes excessively so; preachy or moralistic in tone. Educational but often with an agenda.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "communication",
        contextTags: ["teaching", "instruction", "tone"]
      },
      { 
        word: "parochial", 
        definition: "Limited in scope; narrow-minded or provincial. Concerned narrowly with local or sectarian interests rather than broader perspectives.",
        cognitiveWeight: RELATIONAL,
        semanticField: "perspective",
        contextTags: ["narrow-mindedness", "provincialism", "limitation"]
      },
      { 
        word: "quotidian", 
        definition: "Daily or occurring every day; ordinary, commonplace, mundane. The everyday details of life that often go unnoticed.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "time",
        contextTags: ["everyday", "routine", "ordinary"]
      },
      { 
        word: "elitist", 
        definition: "Relating to or believing in the superiority of a select group; advocating for power held by an elite few. Exclusive and dismissive of non-elite groups.",
        cognitiveWeight: RELATIONAL,
        semanticField: "social",
        contextTags: ["hierarchy", "exclusivity", "prejudice"]
      },
      { 
        word: "grassroots", 
        definition: "Originating from and involving ordinary people rather than established institutions or elites. Bottom-up movements driven by community members.",
        cognitiveWeight: RELATIONAL,
        semanticField: "social",
        contextTags: ["community", "movement", "democracy"]
      },
      { 
        word: "marginal", 
        definition: "Located at the edge or periphery; relating to something of little importance or influence. Existing on the fringe rather than at the center.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "position",
        contextTags: ["periphery", "insignificance", "position"]
      },
      { 
        word: "Zeitgeist", 
        definition: "The defining spirit, mood, or general intellectual and moral climate of an era. The characteristic worldview and values of a particular period in history.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "cultural",
        contextTags: ["era", "culture", "spirit"]
      },
      { 
        word: "dogma", 
        definition: "A principle or set of principles laid down by an authority as incontrovertibly true. Beliefs accepted without question or critical examination.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "belief",
        contextTags: ["doctrine", "authority", "rigidity"]
      },
      { 
        word: "hegemony", 
        definition: "Dominant influence or authority, especially of one group, nation, or culture over others. Leadership or dominance that shapes norms and values.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "power",
        contextTags: ["dominance", "influence", "control"]
      }
    ]
  },
  {
    id: "history",
    name: "History",
    emoji: "🏺",
    borderColor: "#7A8B9B",
    fillColor: "#84BFE0",
    words: [
      { 
        word: "chronicle", 
        definition: "A factual written account of important events in the order of their occurrence. A historical record or narrative of events over time.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "historical",
        contextTags: ["narrative", "documentation", "events"]
      },
      { 
        word: "epochal", 
        definition: "Forming or characterizing an epoch; of major importance or significance. Describes events that mark the beginning of a new period in history.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "historical",
        contextTags: ["significance", "periods", "change"]
      },
      { 
        word: "antecedent", 
        definition: "A thing or event that existed before or logically precedes another. In grammar, the word or phrase that a pronoun refers back to.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "linguistic",
        contextTags: ["causality", "grammar", "reference"]
      },
      { 
        word: "retrospect", 
        definition: "A survey or review of past time or events. Looking back on or dealing with past circumstances, often with the benefit of hindsight.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "reflection",
        contextTags: ["reflection", "past", "analysis"]
      }
    ]
  },
  {
    id: "literary",
    name: "Literary",
    emoji: "📖",
    borderColor: "#7A9E8B",
    fillColor: "#7BA882",
    words: [
      { 
        word: "pithy", 
        definition: "Concise and forcefully expressive, capturing much meaning in few words. Often used to describe writing or speech that is brief yet impactful.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "writing",
        contextTags: ["style", "precision", "brevity"]
      },
      { 
        word: "wraith", 
        definition: "A ghost or ghostlike image of someone, especially one seen shortly before or after their death. Used to describe something pale, thin, or spectral.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "supernatural",
        contextTags: ["ghostly", "death", "appearance"]
      },
      { 
        word: "forlorn", 
        definition: "Pitifully sad and lonely, or appearing abandoned and in poor condition. Conveys deep melancholy or hopelessness.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "emotion",
        contextTags: ["sadness", "abandonment", "melancholy"]
      },
      { 
        word: "naught", 
        definition: "Nothing or zero. An archaic term meaning not anything, often used in literary or poetic contexts.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "quantity",
        contextTags: ["absence", "zero", "archaic"]
      },
      { 
        word: "wrath", 
        definition: "Extreme anger, especially of a powerful or divine nature. Often implies fury that leads to punishment or retribution.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "emotion",
        contextTags: ["anger", "divine", "punishment"]
      },
      { 
        word: "gleam", 
        definition: "A faint or brief light, or a trace of hope or humor in someone's expression. Can also mean to shine brightly, especially with reflected light.",
        cognitiveWeight: RELATIONAL,
        semanticField: "perception",
        contextTags: ["light", "hope", "expression"]
      },
      { 
        word: "yore", 
        definition: "Long ago or former times, typically used in the phrase days of yore. Evokes nostalgia for the distant past.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "time",
        contextTags: ["past", "nostalgia", "archaic"]
      },
      { 
        word: "swain", 
        definition: "A young lover or suitor, especially in a pastoral or rural setting. An archaic, poetic term for a young man courting a woman.",
        cognitiveWeight: RELATIONAL,
        semanticField: "relationship",
        contextTags: ["romance", "courtship", "pastoral"]
      },
      { 
        word: "quoth", 
        definition: "Said, used only in first and third person singular before the subject. An archaic past tense of say, famously used in literature.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "linguistic",
        contextTags: ["speech", "archaic", "literature"]
      },
      { 
        word: "cleave", 
        definition: "To split or sever something, or paradoxically, to adhere firmly and closely. A word with two opposite meanings depending on context.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "action",
        contextTags: ["ambiguity", "opposite meanings", "paradox"]
      },
      { 
        word: "sward", 
        definition: "An expanse of short grass, a lawn or meadow. A poetic term for grassy ground.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "nature",
        contextTags: ["landscape", "grass", "poetry"]
      },
      { 
        word: "blithe", 
        definition: "Showing a casual and cheerful indifference, or carefree and light-hearted. Can imply either joyful ease or troubling lack of concern.",
        cognitiveWeight: RELATIONAL,
        semanticField: "attitude",
        contextTags: ["mood", "cheerfulness", "connotation"]
      },
      { 
        word: "insouciant", 
        definition: "Carefree, nonchalant, or showing a casual lack of concern about something. An elegant, literary way to describe effortless indifference.",
        cognitiveWeight: RELATIONAL,
        semanticField: "attitude",
        contextTags: ["charm", "nonchalance", "sophistication"]
      },
      { 
        word: "lugubrious", 
        definition: "Mournfully sad, sorrowful, or excessively gloomy. Often used to describe a tone or atmosphere that is darkly melancholic.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "emotion",
        contextTags: ["sadness", "darkness", "excess"]
      },
      { 
        word: "elegiac", 
        definition: "Mournful, wistful, or reflective in tone, especially in a poetic or lyrical way. Expressive of sorrow or lamentation for what is past or lost.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "tone",
        contextTags: ["sorrow", "reflection", "poetry"]
      },
      { 
        word: "sardonic", 
        definition: "Grimly mocking, cynical, or scornfully humorous. Dark, cutting wit that conveys contempt or derision beneath the surface.",
        cognitiveWeight: RELATIONAL,
        semanticField: "tone",
        contextTags: ["mockery", "cynicism", "wit"]
      },
      { 
        word: "verdant", 
        definition: "Green with lush vegetation; richly covered with grass or foliage. Evokes freshness, vitality, and abundant natural growth.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "imagery",
        contextTags: ["nature", "freshness", "vitality"]
      },
      { 
        word: "ineffable", 
        definition: "Too great, profound, or sacred to be expressed in words; indescribable. Something that defies language itself.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "expression",
        contextTags: ["transcendence", "mystery", "language"]
      },
      { 
        word: "obdurate", 
        definition: "Stubbornly refusing to change opinion or course of action; hardened against persuasion. Unyielding and inflexible.",
        cognitiveWeight: RELATIONAL,
        semanticField: "character",
        contextTags: ["stubbornness", "resistance", "will"]
      },
      { 
        word: "lassitude", 
        definition: "A state of physical or mental weariness; lack of energy, enthusiasm, or vitality. The lethargy that comes from exhaustion or apathy.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "condition",
        contextTags: ["fatigue", "apathy", "weakness"]
      }
    ]
  },
  {
    id: "conflict",
    name: "Conflict",
    emoji: "⚔️",
    borderColor: "#A87B7B",
    fillColor: "#8B5F5F",
    words: [
      { 
        word: "plight", 
        definition: "A dangerous, difficult, or unfortunate situation. Describes a serious predicament or condition of distress.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "adversity",
        contextTags: ["hardship", "difficulty", "danger"]
      },
      { 
        word: "bane", 
        definition: "A source of persistent harm, ruin, or misery. Something that causes great distress or annoyance, often describing a recurring problem or nemesis.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "adversity",
        contextTags: ["harm", "misery", "nemesis"]
      },
      { 
        word: "smite", 
        definition: "To strike with a firm blow, or to defeat or afflict severely. Often carries biblical or archaic connotations of divine punishment.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "action",
        contextTags: ["force", "punishment", "biblical"]
      },
      { 
        word: "fealty", 
        definition: "A feudal tenant's or vassal's sworn loyalty to a lord. Formal acknowledgment of loyalty and duty, representing binding obligation and allegiance.",
        cognitiveWeight: RELATIONAL,
        semanticField: "loyalty",
        contextTags: ["loyalty", "duty", "allegiance"]
      },
      { 
        word: "wane", 
        definition: "To decrease in vigor, power, or extent, especially gradually. Often used to describe the moon's phases or declining influence and strength.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "change",
        contextTags: ["decline", "phases", "gradual"]
      }
    ]
  },
  {
    id: "nuance-traps",
    name: "Nuance Traps",
    emoji: "🪤",
    borderColor: "#6B7A8B",
    fillColor: "#8BA7B8",
    words: [
      { 
        word: "ambivalent", 
        definition: "Feeling mixed or contradictory emotions about something simultaneously; having conflicting feelings. Not indifferent, but genuinely divided.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "emotion",
        contextTags: ["conflict", "emotion", "paradox"]
      },
      { 
        word: "nonplussed", 
        definition: "Surprised and confused; caught off-guard. Often confused with 'unfazed,' which means the opposite—nonplussed means you ARE bothered.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "emotion",
        contextTags: ["confusion", "surprise", "false-friend"]
      },
      { 
        word: "ostensible", 
        definition: "Appearing to be true or real, but often concealing the actual reason or truth. The stated reason, not necessarily the real one.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "deception",
        contextTags: ["appearance", "hidden-truth", "surface"]
      },
      { 
        word: "invidious", 
        definition: "Calculated to create ill will or offense; causing resentment through unfair comparison or injustice. Unpleasantly discriminatory.",
        cognitiveWeight: RELATIONAL,
        semanticField: "character",
        contextTags: ["offense", "discrimination", "injustice"]
      },
      { 
        word: "equivocal", 
        definition: "Open to more than one interpretation; ambiguous or unclear in meaning. Can also mean deliberately evasive or misleading.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "language",
        contextTags: ["ambiguity", "clarity", "evasion"]
      },
      { 
        word: "perfunctory", 
        definition: "Done routinely or superficially; lacking genuine interest, care, or attention. Going through the motions without real engagement.",
        cognitiveWeight: RELATIONAL,
        semanticField: "behavior",
        contextTags: ["superficial", "routine", "disinterest"]
      },
      { 
        word: "oblique", 
        definition: "Indirect, slanting, or evasive; not straightforward. Can mean both the geometric angle and an indirect approach or reference.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "communication",
        contextTags: ["indirectness", "angle", "evasion"]
      },
      { 
        word: "disinterested", 
        definition: "Impartial, unbiased, not influenced by personal advantage. Often confused with 'uninterested' (lacking interest), but means neutrality in judgment.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "clarity",
        contextTags: ["misuse", "impartiality", "precision"]
      },
      { 
        word: "enormity", 
        definition: "The extreme seriousness or wickedness of something; great moral wrongness. Often misused to mean 'large size'—correct usage implies moral outrage.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "morality",
        contextTags: ["misuse", "wickedness", "seriousness"]
      },
      { 
        word: "incidental", 
        definition: "Occurring by chance or as a minor consequence; not essential or central. Secondary rather than primary.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "causality",
        contextTags: ["chance", "secondary", "minor"]
      },
      { 
        word: "consequential", 
        definition: "Important, significant, or having important consequences. Also means pompous or self-important in manner.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "importance",
        contextTags: ["significance", "impact", "pomposity"]
      },
      { 
        word: "speculative", 
        definition: "Based on conjecture or guesswork rather than facts; not proven. Also refers to investment or business done with high risk for potential reward.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "reasoning",
        contextTags: ["conjecture", "uncertainty", "risk"]
      }
    ]
  },
  {
    id: "precision-verbs",
    name: "Precision",
    emoji: "🎯",
    borderColor: "#5B8A9E",
    fillColor: "#6BA5C4",
    words: [
      { 
        word: "broach", 
        definition: "To bring up a topic for discussion, especially one that is difficult, sensitive, or controversial. To open or introduce a subject.",
        cognitiveWeight: RELATIONAL,
        semanticField: "communication",
        contextTags: ["conversation", "initiation", "difficulty"]
      },
      { 
        word: "impugn", 
        definition: "To challenge or attack the validity, truth, or integrity of something. To question or dispute with skepticism.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "argument",
        contextTags: ["challenge", "criticism", "validity"]
      },
      { 
        word: "corroborate", 
        definition: "To confirm or give support to a statement, story, or theory with additional evidence. To verify or substantiate.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "evidence",
        contextTags: ["confirmation", "evidence", "support"]
      },
      { 
        word: "repudiate", 
        definition: "To reject, disown, or refuse to accept or be associated with something. To deny responsibility or validity.",
        cognitiveWeight: RELATIONAL,
        semanticField: "rejection",
        contextTags: ["refusal", "denial", "disassociation"]
      },
      { 
        word: "attenuate", 
        definition: "To make thin, weak, or less intense; to reduce in force or effect. To weaken or diminish over time.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "change",
        contextTags: ["weakening", "reduction", "gradual"]
      },
      { 
        word: "circumscribe", 
        definition: "To restrict within limits; to confine or bound. To draw a line around or set boundaries for something.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "limitation",
        contextTags: ["boundary", "restriction", "limitation"]
      },
      { 
        word: "elide", 
        definition: "To omit or leave out; to skip over or pass over in silence. To slur over or gloss over something intentionally.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "language",
        contextTags: ["omission", "silence", "avoidance"]
      },
      { 
        word: "undermine", 
        definition: "To weaken or erode the foundation, authority, or effectiveness of something—often gradually or subtly.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "power",
        contextTags: ["weaken", "erode", "subvert"]
      },
      { 
        word: "resolve", 
        definition: "To settle or find a solution to a problem; also to decide firmly with determination.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "decision",
        contextTags: ["solution", "decision", "commitment"]
      },
      { 
        word: "highlight", 
        definition: "To emphasize or draw attention to something so it stands out clearly.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "communication",
        contextTags: ["emphasis", "visibility", "attention"]
      },
      { 
        word: "indicate", 
        definition: "To point out, show, or suggest something; to signal or give evidence of.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "signal",
        contextTags: ["signal", "evidence", "suggestion"]
      },
      { 
        word: "justify", 
        definition: "To show adequate reason for; to defend as right or reasonable with arguments or evidence.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "argument",
        contextTags: ["reason", "defense", "validation"]
      },
      { 
        word: "distill", 
        definition: "To extract the essential meaning or core elements from something complex. To purify or concentrate by removing what is superfluous.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "analysis",
        contextTags: ["essence", "clarity", "reduction"]
      },
      { 
        word: "conflate", 
        definition: "To combine two or more distinct things into one, often incorrectly merging separate concepts. To blend ideas in a way that obscures important differences.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "reasoning",
        contextTags: ["confusion", "merging", "error"]
      },
      { 
        word: "preclude", 
        definition: "To prevent something from happening; to make something impossible by taking advance action. To rule out or exclude a possibility beforehand.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "prevention",
        contextTags: ["prevention", "exclusion", "impossibility"]
      },
      { 
        word: "ameliorate", 
        definition: "To make something bad or unsatisfactory better; to improve a difficult situation. To reduce the severity or intensity of a problem.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "improvement",
        contextTags: ["improvement", "relief", "mitigation"]
      },
      { 
        word: "elucidate", 
        definition: "To make something clear by explaining it more fully or carefully. To shed light on a complex or obscure subject through detailed exposition.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "explanation",
        contextTags: ["clarity", "explanation", "illumination"]
      }
    ]
  },
  {
    id: "abstract-adjectives",
    name: "Adjectives",
    emoji: "🧮",
    borderColor: "#8B9E7A",
    fillColor: "#9DAA7E",
    words: [
      { 
        word: "latent", 
        definition: "Present but not visible, apparent, or developed; lying dormant and capable of becoming active. Hidden potential waiting to emerge.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "state",
        contextTags: ["hidden", "dormant", "potential"]
      },
      { 
        word: "contingent", 
        definition: "Dependent on or conditioned by something else; uncertain until certain conditions are met. A group or representative sent for a specific purpose.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "condition",
        contextTags: ["dependency", "conditional", "uncertainty"]
      },
      { 
        word: "inchoate", 
        definition: "Just begun or begun recently; not yet fully formed, developed, or organized. Barely started and still taking shape.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "development",
        contextTags: ["beginning", "unfinished", "potential"]
      },
      { 
        word: "intractable", 
        definition: "Difficult or impossible to manage, control, or solve; stubbornly resistant to treatment or change. Unwilling to yield.",
        cognitiveWeight: RELATIONAL,
        semanticField: "character",
        contextTags: ["difficulty", "resistance", "stubbornness"]
      },
      { 
        word: "exigent", 
        definition: "Requiring immediate action or attention; demanding and urgent. Making pressing demands on time, resources, or attention.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "urgency",
        contextTags: ["urgency", "demand", "pressure"]
      },
      { 
        word: "nebulous", 
        definition: "Unclear, vague, or ill-defined; not clearly stated or easily understood. Cloudy, hazy, and lacking clear form or substance.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "clarity",
        contextTags: ["vagueness", "confusion", "clarity"]
      },
      { 
        word: "opaque", 
        definition: "Not transparent or translucent; impenetrable to light. Figuratively: hard to understand or see through; deliberately obscure.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "clarity",
        contextTags: ["obscurity", "transparency", "understanding"]
      }
    ]
  }
  ,
  {
    id: "science",
    name: "Science",
    emoji: "🔬",
    borderColor: "#6B8FB5",
    fillColor: "#5B9FD6",
    words: [
      {
        word: "granular",
        definition: "Composed of small discrete parts; highly detailed. Granular analysis breaks complex phenomena into fine components for precision.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "analysis",
        contextTags: ["detail", "precision", "breakdown"]
      },
      {
        word: "stochastic",
        definition: "Involving randomness or probability rather than certainty. Stochastic processes are unpredictable individually but follow statistical patterns.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "statistics",
        contextTags: ["randomness", "probability", "patterns"]
      },
      {
        word: "parsimonious",
        definition: "Extremely economical; preferring the simplest explanation that fits the data. Parsimony avoids unnecessary assumptions.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "methodology",
        contextTags: ["simplicity", "efficiency", "elegance"]
      },
      {
        word: "robust",
        definition: "Strong and resilient; remains valid across varied conditions. A robust system tolerates noise and still performs.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "resilience",
        contextTags: ["strength", "stability", "reliability"]
      },
      {
        word: "artefact",
        definition: "An unintended result caused by the measurement method rather than true phenomenon. Recognizing artefacts prevents false conclusions.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "method",
        contextTags: ["bias", "error", "measurement"]
      },
      {
        word: "emergent",
        definition: "Arising unexpectedly from interactions of simpler parts; not predictable from the components alone.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "systems",
        contextTags: ["complexity", "interaction", "holism"]
      },
      {
        word: "latent",
        definition: "Present but hidden or inactive; capable of emerging. In science, latent energy or traits are dormant until triggered.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "state",
        contextTags: ["hidden", "dormant", "potential"]
      },
      {
        word: "degenerate",
        definition: "Declined in quality; in physics, distinct states sharing the same energy level. Degeneracy often signals underlying symmetry.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "physics",
        contextTags: ["symmetry", "states", "equivalence"]
      },
      {
        word: "intractable",
        definition: "Very hard or impossible to manage or solve. In computation, intractable problems require impractical time to solve.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "complexity",
        contextTags: ["difficulty", "limits", "computation"]
      },
      {
        word: "scalable",
        definition: "Capable of expanding or shrinking while keeping core properties. A scalable model holds across different sizes or loads.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "systems",
        contextTags: ["adaptation", "universality", "growth"]
      }
    ]
  },
  {
    id: "psychology",
    name: "Psychology",
    emoji: "🧠",
    borderColor: "#6AA5AE",
    fillColor: "#7CBAC5",
    words: [
      {
        word: "rumination",
        definition: "Compulsive overthinking or repetitive focus on distressing thoughts without moving to action or resolution.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "cognition",
        contextTags: ["overthinking", "loop", "stress"]
      },
      {
        word: "dysphoria",
        definition: "A state of profound unease or dissatisfaction; opposite of euphoria; often tied to mood or identity distress.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "mood",
        contextTags: ["unease", "distress", "mood"]
      },
      {
        word: "alexithymia",
        definition: "Difficulty identifying or describing one’s own emotions; emotional awareness is blunted or opaque.",
        cognitiveWeight: RELATIONAL,
        semanticField: "emotions",
        contextTags: ["awareness", "expression", "empathy"]
      },
      {
        word: "ambivalence",
        definition: "Holding simultaneous, conflicting attitudes or feelings toward the same object, person, or decision.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "conflict",
        contextTags: ["mixed-feelings", "paradox", "choice"]
      },
      {
        word: "projection",
        definition: "Attributing one’s own unacceptable feelings or motives to someone else; a defense that externalizes inner conflict.",
        cognitiveWeight: RELATIONAL,
        semanticField: "defense",
        contextTags: ["bias", "attribution", "conflict"]
      },
      {
        word: "dissociation",
        definition: "A mental disconnection from thoughts, feelings, or sense of self; can range from mild detachment to severe fragmentation.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "coping",
        contextTags: ["detachment", "stress", "trauma"]
      },
      {
        word: "anhedonia",
        definition: "Loss of ability to feel pleasure or interest in normally rewarding activities; a core symptom in depression.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "mood",
        contextTags: ["pleasure", "motivation", "depression"]
      },
      {
        word: "resignation",
        definition: "Passive acceptance that a situation will not change, often after repeated setbacks; giving up active struggle.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "response",
        contextTags: ["acceptance", "helplessness", "fatigue"]
      },
      {
        word: "irritability",
        definition: "Heightened sensitivity to stimuli leading to quick annoyance or anger; lowered threshold for frustration.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "affect",
        contextTags: ["anger", "threshold", "stress"]
      },
      {
        word: "desensitised",
        definition: "Reduced emotional or physiological response after repeated exposure; feelings become dulled or blunted.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "adaptation",
        contextTags: ["numbing", "exposure", "habituation"]
      }
    ]
  },
  {
    id: "ethics",
    name: "Ethics",
    emoji: "⚖️",
    borderColor: "#A18860",
    fillColor: "#C9A86A",
    words: [
      {
        word: "moral hazard",
        definition: "When insulation from consequences incentivizes risky behavior; protection that breeds recklessness.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "ethics",
        contextTags: ["risk", "consequences", "incentives"]
      },
      {
        word: "instrumentalise",
        definition: "To treat someone or something merely as a means to an end, ignoring their intrinsic value or dignity.",
        cognitiveWeight: RELATIONAL,
        semanticField: "ethics",
        contextTags: ["use", "dignity", "means-ends"]
      },
      {
        word: "culpable",
        definition: "Deserving blame or censure; responsible for wrongdoing. Culpability implies both agency and moral fault.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "responsibility",
        contextTags: ["blame", "fault", "accountability"]
      },
      {
        word: "exculpatory",
        definition: "Evidence or reasoning that clears someone from blame or guilt; showing innocence or justification.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "justice",
        contextTags: ["innocence", "defense", "evidence"]
      },
      {
        word: "normative",
        definition: "Establishing or relating to a standard or norm; prescribing what ought to be rather than describing what is.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "philosophy",
        contextTags: ["standards", "ought", "prescription"]
      },
      {
        word: "paternalistic",
        definition: "Restricting freedom or autonomy for someone's perceived good, as a parent might; benevolent but controlling.",
        cognitiveWeight: RELATIONAL,
        semanticField: "ethics",
        contextTags: ["autonomy", "control", "protection"]
      },
      {
        word: "expedient",
        definition: "Convenient and practical despite being potentially improper or immoral; prioritizing short-term advantage over principle.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "ethics",
        contextTags: ["pragmatism", "compromise", "convenience"]
      },
      {
        word: "principled",
        definition: "Acting according to moral or ethical principles even when inconvenient; demonstrating integrity and consistency.",
        cognitiveWeight: RELATIONAL,
        semanticField: "character",
        contextTags: ["integrity", "consistency", "values"]
      },
      {
        word: "moralising",
        definition: "Lecturing others on morality, often in a self-righteous or judgmental manner; imposing moral standards sanctimoniously.",
        cognitiveWeight: RELATIONAL,
        semanticField: "communication",
        contextTags: ["judgment", "righteousness", "preaching"]
      },
      {
        word: "complicity",
        definition: "Involvement in wrongdoing with others; being an accomplice through action, inaction, or silent approval.",
        cognitiveWeight: RELATIONAL,
        semanticField: "responsibility",
        contextTags: ["involvement", "wrongdoing", "accountability"]
      }
    ]
  },
  {
    id: "nature",
    name: "Nature",
    emoji: "🌿",
    borderColor: "#5A8E6A",
    fillColor: "#6FA87D",
    words: [
      {
        word: "anthropogenic",
        definition: "Caused or influenced by humans; originating from human activity. Used to describe environmental changes resulting from human actions.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "environment",
        contextTags: ["human-impact", "causation", "environment"]
      },
      {
        word: "rewilding",
        definition: "Restoring areas to their natural uncultivated state by reintroducing native species and reducing human intervention. A conservation strategy.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "conservation",
        contextTags: ["restoration", "nature", "intervention"]
      },
      {
        word: "eutrophication",
        definition: "Excessive nutrient enrichment in water bodies causing algal blooms and oxygen depletion. Often results from agricultural runoff.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "ecology",
        contextTags: ["pollution", "water", "nutrients"]
      },
      {
        word: "carbon sink",
        definition: "Natural or artificial reservoir that absorbs and stores carbon dioxide from the atmosphere. Forests and oceans are major carbon sinks.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "climate",
        contextTags: ["carbon", "storage", "climate"]
      },
      {
        word: "resilience",
        definition: "The capacity of ecosystems to absorb disturbance and reorganize while retaining essential functions. Ability to recover from stress.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "ecology",
        contextTags: ["recovery", "adaptation", "stability"]
      },
      {
        word: "biodiversity",
        definition: "The variety of life forms in an ecosystem, region, or the planet. Higher biodiversity typically indicates ecosystem health.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "ecology",
        contextTags: ["variety", "species", "ecosystem"]
      },
      {
        word: "externality",
        definition: "A cost or benefit from economic activity that affects third parties who didn't choose to incur it. Pollution is a negative externality.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "economics",
        contextTags: ["costs", "effects", "unpriced"]
      },
      {
        word: "depletion",
        definition: "The reduction in quantity of a resource through extraction or consumption faster than it can be replenished. Resource exhaustion.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "resources",
        contextTags: ["exhaustion", "unsustainable", "loss"]
      },
      {
        word: "desertification",
        definition: "The degradation of fertile land into desert through drought, deforestation, or inappropriate agriculture. Land becoming arid and barren.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "environment",
        contextTags: ["degradation", "drought", "land"]
      },
      {
        word: "flashpoint",
        definition: "The temperature at which vapor from a substance ignites; metaphorically, a point at which conflict or crisis becomes imminent.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "crisis",
        contextTags: ["threshold", "ignition", "crisis"]
      }
    ]
  },
  {
    id: "society",
    name: "Society",
    emoji: "👥",
    borderColor: "#8375B8",
    fillColor: "#9B8DC5",
    words: [
      {
        word: "othering",
        definition: "The process of treating a person or group as fundamentally different or alien, creating an \"us vs. them\" divide. Reinforces social boundaries.",
        cognitiveWeight: RELATIONAL,
        semanticField: "social-dynamics",
        contextTags: ["exclusion", "identity", "division"]
      },
      {
        word: "performative",
        definition: "Actions or statements done primarily for appearance or public approval rather than genuine commitment. Symbolic gestures without substance.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "authenticity",
        contextTags: ["appearance", "sincerity", "display"]
      },
      {
        word: "social capital",
        definition: "The networks, relationships, and trust that enable cooperation and mutual benefit within communities. Connections as a resource.",
        cognitiveWeight: RELATIONAL,
        semanticField: "networks",
        contextTags: ["connections", "trust", "resources"]
      },
      {
        word: "hegemony",
        definition: "Dominant influence or authority of one group over others, often maintained through cultural norms rather than force. Subtle structural power.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "power",
        contextTags: ["dominance", "influence", "culture"]
      },
      {
        word: "cohesion",
        definition: "The bonds that hold a group together through shared values, trust, and solidarity. Unity and internal strength of communities.",
        cognitiveWeight: RELATIONAL,
        semanticField: "unity",
        contextTags: ["solidarity", "bonds", "integration"]
      },
      {
        word: "gatekeeping",
        definition: "Controlling access to resources, opportunities, or communities by setting criteria for inclusion. Deciding who gets in and who doesn't.",
        cognitiveWeight: RELATIONAL,
        semanticField: "access",
        contextTags: ["control", "exclusion", "barriers"]
      },
      {
        word: "legitimacy",
        definition: "The perceived right to exercise authority or make decisions, based on acceptance by those governed. Authority recognized as valid.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "authority",
        contextTags: ["validity", "recognition", "power"]
      },
      {
        word: "asymmetry",
        definition: "Lack of equality or balance in power, resources, or relationships. Unequal distribution creating imbalance.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "inequality",
        contextTags: ["imbalance", "power", "inequality"]
      },
      {
        word: "entitlement",
        definition: "The belief that one deserves certain privileges or treatment, often without corresponding effort or justification. Expecting special treatment.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "expectations",
        contextTags: ["privilege", "expectations", "attitude"]
      },
      {
        word: "polarisation",
        definition: "The division of opinions, groups, or societies into opposing extremes with diminishing middle ground. Increasing ideological distance.",
        cognitiveWeight: RELATIONAL,
        semanticField: "division",
        contextTags: ["extremes", "division", "conflict"]
      }
    ]
  },
  {
    id: "rhetoric",
    name: "Rhetoric",
    emoji: "🎙️",
    borderColor: "#B8805D",
    fillColor: "#D4915D",
    words: [
      {
        word: "equivocation",
        definition: "Using ambiguous language deliberately to mislead or avoid commitment. Speaking in a way that can be interpreted multiple ways.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "language",
        contextTags: ["ambiguity", "deception", "evasion"]
      },
      {
        word: "specious",
        definition: "Appearing to be true or valid but actually false or misleading. Superficially plausible but fundamentally flawed.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "argumentation",
        contextTags: ["false", "appearance", "misleading"]
      },
      {
        word: "dogwhistle",
        definition: "Language or messaging with coded meaning understood by a specific group but appearing innocent to outsiders. Covert communication.",
        cognitiveWeight: RELATIONAL,
        semanticField: "communication",
        contextTags: ["coded", "covert", "messaging"]
      },
      {
        word: "loaded",
        definition: "Language deliberately chosen to evoke emotional response or bias perception; containing unstated assumptions or judgments.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "language",
        contextTags: ["bias", "emotion", "persuasion"]
      },
      {
        word: "prevarication",
        definition: "Deliberate evasion of truth through misleading statements or half-truths. Lying by distortion rather than outright denial.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "deception",
        contextTags: ["evasion", "lies", "distortion"]
      },
      {
        word: "gaslighting",
        definition: "Manipulating someone into questioning their own reality, memory, or perception. Making someone doubt their sanity or judgment.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "manipulation",
        contextTags: ["manipulation", "psychological", "abuse"]
      },
      {
        word: "logical fallacy",
        definition: "An error in reasoning that makes an argument invalid. A flaw in logic that undermines the conclusion despite appearing sound.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "argumentation",
        contextTags: ["reasoning", "error", "argument"]
      },
      {
        word: "false dichotomy",
        definition: "Presenting only two options when more possibilities exist. Forcing a choice between extremes while hiding middle ground.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "logic",
        contextTags: ["oversimplification", "extremes", "fallacy"]
      },
      {
        word: "hedging",
        definition: "Using cautious, non-committal language to avoid responsibility or accountability. Softening statements with qualifications.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "language",
        contextTags: ["evasion", "caution", "responsibility"]
      },
      {
        word: "obfuscation",
        definition: "Deliberately making something unclear or hard to understand. Obscuring truth through complexity, jargon, or misdirection.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "communication",
        contextTags: ["confusion", "clarity", "deception"]
      }
    ]
  }
];
