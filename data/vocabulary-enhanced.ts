// data/vocabulary-enhanced.ts

import { WordCognitiveWeight } from "@/types/session";

export interface Word {
  word: string;
  definition: string;
  cognitiveWeight: WordCognitiveWeight;
  semanticField: string;
  contextTags: string[];
}

export interface Cluster {
  id: string;
  name: string;
  emoji: string;
  borderColor: string;
  fillColor: string;
  words: Word[];
}

const { INTELLECTUAL, EMOTIONAL, RELATIONAL, DISCRIMINATIVE } = WordCognitiveWeight;

export const vocabularyClusters: Cluster[] = [
  {
    id: "work",
    name: "Work",
    emoji: "💼",
    borderColor: "#9A8B9E",
    fillColor: "#9B7EBD",
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
        contextTags: ["skill", "competence", "capability"]
      },
      { 
        word: "retention", 
        definition: "The continued possession, use, or control of something, especially information in memory. In education, refers to how well knowledge is maintained over time.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "cognitive",
        contextTags: ["memory", "learning", "persistence"]
      },
      { 
        word: "pedagogy", 
        definition: "The method and practice of teaching, especially as an academic subject or theoretical concept. Encompasses educational philosophy and instructional strategies.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "educational",
        contextTags: ["teaching", "methodology", "instruction"]
      },
      { 
        word: "analytical", 
        definition: "Relating to or using analysis or logical reasoning. The systematic examination of something to understand its nature or determine its essential features.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "cognitive",
        contextTags: ["reasoning", "systematic", "examination"]
      },
      { 
        word: "synthesis", 
        definition: "The combination of ideas to form a theory or system, or the production of a substance by combining elements. Represents the creation of something new from existing parts.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "cognitive",
        contextTags: ["integration", "creation", "combination"]
      },
      { 
        word: "heuristic", 
        definition: "A practical approach to problem-solving using methods that are sufficient for reaching an immediate solution. Learning through discovery and experimentation.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "cognitive",
        contextTags: ["problem-solving", "practical", "discovery"]
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
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "social",
        contextTags: ["subtle", "distinction", "complexity"]
      },
      { 
        word: "assertive", 
        definition: "Having or showing a confident and forceful personality while respecting others. Balances self-advocacy with consideration, distinct from aggression.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "interpersonal",
        contextTags: ["confident", "balanced", "respectful"]
      },
      { 
        word: "empathy", 
        definition: "The ability to understand and share the feelings of another person. Goes beyond sympathy to involve emotional resonance and perspective-taking.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "emotional",
        contextTags: ["understanding", "connection", "perspective"]
      },
      { 
        word: "cordial", 
        definition: "Warm and friendly in manner or tone. Describes polite, pleasant interaction that creates a welcoming atmosphere.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "social",
        contextTags: ["friendly", "warm", "polite"]
      },
      { 
        word: "mundane", 
        definition: "Lacking interest or excitement; dull and routine. Describes ordinary aspects of everyday life, often with a slightly negative connotation.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "descriptive",
        contextTags: ["ordinary", "routine", "everyday"]
      },
      { 
        word: "attuned", 
        definition: "Made aware or responsive to something. Being in harmony or adjusted to a particular situation or environment.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "perceptual",
        contextTags: ["aware", "responsive", "harmonious"]
      },
      { 
        word: "habituate", 
        definition: "To make or become accustomed to something through repeated exposure. The process of forming a habit or becoming used to a situation.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "psychological",
        contextTags: ["adaptation", "repetition", "process"]
      },
      { 
        word: "ritual", 
        definition: "A series of actions performed according to a prescribed order, often with symbolic meaning. Can be religious, cultural, or personal in nature.",
        cognitiveWeight: RELATIONAL,
        semanticField: "cultural",
        contextTags: ["symbolic", "prescribed", "meaningful"]
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
        semanticField: "cultural",
        contextTags: ["authoritative", "important", "established"]
      },
      { 
        word: "subtext", 
        definition: "An underlying and often distinct theme in a conversation or piece of writing. The implicit meaning beneath the surface of what is said or written.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "literary",
        contextTags: ["implicit", "underlying", "hidden"]
      },
      { 
        word: "vernacular", 
        definition: "The language or dialect spoken by the ordinary people in a particular region. Everyday, informal language as opposed to formal or literary language.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "linguistic",
        contextTags: ["informal", "regional", "everyday"]
      },
      { 
        word: "ken", 
        definition: "One's range of knowledge, understanding, or sight. In Scottish, can also mean to know. Describes the limits of what someone comprehends.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "cognitive",
        contextTags: ["understanding", "knowledge", "comprehension"]
      },
      { 
        word: "heathen", 
        definition: "A person who does not belong to a widely held religion, especially Christianity, Judaism, or Islam. Historically used to describe non-believers or pagans.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "religious",
        contextTags: ["religious", "historical", "outsider"]
      },
      { 
        word: "wend", 
        definition: "To go in a specified direction, typically slowly or by an indirect route. A literary term for traveling or making one's way, often used poetically.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "literary",
        contextTags: ["movement", "poetic", "archaic"]
      },
      { 
        word: "hale", 
        definition: "Strong and healthy, especially in old age. Describes robust physical condition, often paired with hearty as in hale and hearty.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "descriptive",
        contextTags: ["health", "vitality", "archaic"]
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
        contextTags: ["record", "factual", "sequential"]
      },
      { 
        word: "epochal", 
        definition: "Forming or characterizing an epoch; of major importance or significance. Describes events that mark the beginning of a new period in history.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "historical",
        contextTags: ["significant", "transformative", "pivotal"]
      },
      { 
        word: "antecedent", 
        definition: "A thing or event that existed before or logically precedes another. In grammar, the word or phrase that a pronoun refers back to.",
        cognitiveWeight: RELATIONAL,
        semanticField: "temporal",
        contextTags: ["preceding", "causal", "prior"]
      },
      { 
        word: "retrospect", 
        definition: "A survey or review of past time or events. Looking back on or dealing with past circumstances, often with the benefit of hindsight.",
        cognitiveWeight: INTELLECTUAL,
        semanticField: "temporal",
        contextTags: ["reflection", "hindsight", "review"]
      }
    ]
  },
  {
    id: "literary",
    name: "Literary",
    emoji: "📖",
    borderColor: "#8B7A8A",
    fillColor: "#9B7EBD",
    words: [
      { 
        word: "pithy", 
        definition: "Concise and forcefully expressive, capturing much meaning in few words. Often used to describe writing or speech that is brief yet impactful.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "literary",
        contextTags: ["concise", "expressive", "impactful"]
      },
      { 
        word: "wraith", 
        definition: "A ghost or ghostlike image of someone, especially one seen shortly before or after their death. Used to describe something pale, thin, or spectral.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "literary",
        contextTags: ["spectral", "ghostly", "ethereal"]
      },
      { 
        word: "forlorn", 
        definition: "Pitifully sad and lonely, or appearing abandoned and in poor condition. Conveys deep melancholy or hopelessness.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "emotional",
        contextTags: ["sad", "abandoned", "melancholy"]
      },
      { 
        word: "naught", 
        definition: "Nothing or zero. An archaic term meaning not anything, often used in literary or poetic contexts.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "literary",
        contextTags: ["archaic", "nothing", "poetic"]
      },
      { 
        word: "wrath", 
        definition: "Extreme anger, especially of a powerful or divine nature. Often implies fury that leads to punishment or retribution.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "emotional",
        contextTags: ["anger", "fury", "divine"]
      },
      { 
        word: "gleam", 
        definition: "A faint or brief light, or a trace of hope or humor in someone's expression. Can also mean to shine brightly, especially with reflected light.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "descriptive",
        contextTags: ["light", "subtle", "hope"]
      },
      { 
        word: "yore", 
        definition: "Long ago or former times, typically used in the phrase days of yore. Evokes nostalgia for the distant past.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "temporal",
        contextTags: ["archaic", "past", "nostalgia"]
      },
      { 
        word: "swain", 
        definition: "A young lover or suitor, especially in a pastoral or rural setting. An archaic, poetic term for a young man courting a woman.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "literary",
        contextTags: ["archaic", "romantic", "pastoral"]
      },
      { 
        word: "quoth", 
        definition: "Said, used only in first and third person singular before the subject. An archaic past tense of say, famously used in literature.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "literary",
        contextTags: ["archaic", "literary", "grammatical"]
      },
      { 
        word: "cleave", 
        definition: "To split or sever something, or paradoxically, to adhere firmly and closely. A word with two opposite meanings depending on context.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "literary",
        contextTags: ["paradoxical", "dual-meaning", "archaic"]
      },
      { 
        word: "sward", 
        definition: "An expanse of short grass, a lawn or meadow. A poetic term for grassy ground.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "literary",
        contextTags: ["pastoral", "poetic", "descriptive"]
      },
      { 
        word: "blithe", 
        definition: "Showing a casual and cheerful indifference, or carefree and light-hearted. Can imply either joyful ease or troubling lack of concern.",
        cognitiveWeight: DISCRIMINATIVE,
        semanticField: "emotional",
        contextTags: ["carefree", "dual-meaning", "attitude"]
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
        semanticField: "situational",
        contextTags: ["difficulty", "distress", "predicament"]
      },
      { 
        word: "bane", 
        definition: "A source of persistent harm, ruin, or misery. Something that causes great distress or annoyance, often describing a recurring problem or nemesis.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "adversarial",
        contextTags: ["harm", "persistent", "nemesis"]
      },
      { 
        word: "smite", 
        definition: "To strike with a firm blow, or to defeat or afflict severely. Often carries biblical or archaic connotations of divine punishment.",
        cognitiveWeight: EMOTIONAL,
        semanticField: "action",
        contextTags: ["strike", "biblical", "forceful"]
      },
      { 
        word: "fealty", 
        definition: "A feudal tenant's or vassal's sworn loyalty to a lord. Formal acknowledgment of loyalty and duty, representing binding obligation and allegiance.",
        cognitiveWeight: RELATIONAL,
        semanticField: "social",
        contextTags: ["loyalty", "feudal", "obligation"]
      },
      { 
        word: "wane", 
        definition: "To decrease in vigor, power, or extent, especially gradually. Often used to describe the moon's phases or declining influence and strength.",
        cognitiveWeight: RELATIONAL,
        semanticField: "temporal",
        contextTags: ["decline", "gradual", "diminishing"]
      }
    ]
  }
];
