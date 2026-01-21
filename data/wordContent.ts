export interface WordContent {
  word: string;
  cluster: string;
  definition: string;
  exercise: {
    question: string;
    options: Array<{ id: string; text: string }>;
    correctAnswer: string;
    explanation?: string;
  };
  anchor?: {
    prompt: string;
    categories: string[];
    examples?: Record<string, string>; // category -> example with word embedded
  };
}


export const wordDatabase: WordContent[] = [
  // WORK CLUSTER
  {
    word: 'synergy',
    cluster: 'Work',
    definition: 'When different skills combine to create a result greater than the sum of their parts. Two teams collaborating produce more value together than separately.',
    exercise: {
      question: 'Which scenario shows true synergy?',
      options: [
        { id: 'A', text: 'Two designers working on separate projects' },
        { id: 'B', text: 'A designer and developer collaborating, creating solutions neither could alone' },
        { id: 'C', text: 'One person doing all the work while others watch' }
      ],
      correctAnswer: 'B',
      explanation: 'Synergy happens when collaboration creates outcomes impossible individually.'
    },
    anchor: {
      prompt: 'When have you experienced synergy in your work or projects?',
      categories: ['Team Project', 'Collaboration', 'Creative Work', 'Problem Solving'],
      examples: {
        'Team Project': 'When synergy between collaborators exceeds what individual talents could achieve',
        'Collaboration': 'When you find the right partners and synergy emerges naturally',
        'Creative Work': 'When creative synergy transforms diverse artistic visions into something revolutionary',
        'Problem Solving': 'When synergy across disciplines unlocks solutions no single approach could find'
      }
    }
  },
  
  {
    word: 'delegation',
    cluster: 'Work',
    definition: 'Assigning responsibility and authority to others to accomplish tasks. Effective delegation empowers teams while maintaining accountability.',
    exercise: {
      question: 'What makes delegation effective?',
      options: [
        { id: 'A', text: 'Giving tasks without any guidance or follow-up' },
        { id: 'B', text: 'Doing everything yourself to ensure quality' },
        { id: 'C', text: 'Assigning clear responsibilities with the authority to make decisions' }
      ],
      correctAnswer: 'C',
      explanation: 'Delegation requires both responsibility AND authority to be effective.'
    },
    anchor: {
      prompt: 'Recall a time you delegated successfully or wish you had delegated.',
      categories: ['Leadership', 'Team Management', 'Projects', 'Learning'],
      examples: {
        'Leadership': 'When delegation multiplies your impact by empowering others',
        'Team Management': 'When effective delegation builds trust and develops your team',
        'Projects': 'When delegation gets the project done faster and better',
        'Learning': 'When delegation forces you to trust others and grow as a leader'
      }
    }
  },

  {
    word: 'scalability',
    cluster: 'Work',
    definition: 'The ability of a system or process to handle growth without losing quality or efficiency. A scalable business can increase revenue without proportionally increasing costs.',
    exercise: {
      question: 'Which business model demonstrates true scalability?',
      options: [
        { id: 'A', text: 'A restaurant that must hire more staff for each new location' },
        { id: 'B', text: 'A software app serving one million users with the same infrastructure as ten users' },
        { id: 'C', text: 'A factory doubling production by doubling all equipment and workers' }
      ],
      correctAnswer: 'B',
      explanation: 'Scalability means growth without proportional increases in resources—software exemplifies this.'
    },
    anchor: {
      prompt: 'What activity or skill of yours has become easier as you\'ve done it more?',
      categories: ['Learning', 'Growth', 'Efficiency', 'Mastery'],
      examples: {
        'Learning': 'When scalability shows how practice transforms struggle into ease',
        'Growth': 'When scalability of your abilities compounds over time',
        'Efficiency': 'When scalability means doing more with less effort',
        'Mastery': 'When true scalability emerges from deliberate practice'
      }
    }
  },

  {
    word: 'benchmark',
    cluster: 'Work',
    definition: 'A standard or reference point used to measure performance or quality. Benchmarks allow comparison against competitors or past performance to identify areas for improvement.',
    exercise: {
      question: 'How would a company use benchmarking effectively?',
      options: [
        { id: 'A', text: 'Only measure their own performance year-over-year' },
        { id: 'B', text: 'Compare their customer satisfaction against industry standards to identify gaps' },
        { id: 'C', text: 'Set unrealistically high targets without reference points' }
      ],
      correctAnswer: 'B',
      explanation: 'Benchmarking gains power from comparison—it reveals where you stand relative to others.'
    },
    anchor: {
      prompt: 'What benchmark or standard do you measure yourself against in your field or hobby?',
      categories: ['Personal Goals', 'Competition', 'Self-Assessment', 'Progress'],
      examples: {
        'Personal Goals': 'When you use a benchmark to know if you\'re actually getting closer to your goal',
        'Competition': 'A benchmark reveals your place in the competition.',
        'Self-Assessment': 'When an honest benchmark reveals both your strengths and gaps',
        'Progress': 'When consistent benchmarking proves your improvement over time'
      }
    }
  },

  {
    word: 'expert',
    cluster: 'Work',
    definition: 'A person possessing comprehensive knowledge or skill in a specific domain, built through years of focused study and experience. Expertise brings both credibility and the responsibility to guide others.',
    exercise: {
      question: 'What distinguishes a true expert from someone merely experienced?',
      options: [
        { id: 'A', text: 'They have been doing it the longest' },
        { id: 'B', text: 'They understand underlying principles deeply enough to handle novel situations creatively' },
        { id: 'C', text: 'They have won the most awards' }
      ],
      correctAnswer: 'B',
      explanation: 'True expertise means understanding principles so deeply you can adapt to new contexts—not just experience.'
    },
    anchor: {
      prompt: 'Who is an expert you admire? What makes them stand out beyond just knowing facts?',
      categories: ['Mentorship', 'Mastery', 'Teaching', 'Inspiration']
    }
  },

// Duplicate 'proficiency' entry removed as requested

  {
    word: 'retention',
    cluster: 'Work',
    definition: 'The ability to keep or hold onto something—whether memories, employees, or customers. In business, retention measures loyalty; in learning, it measures memory consolidation.',
    exercise: {
      question: 'What best indicates strong employee retention?',
      options: [
        { id: 'A', text: 'Workers staying because they have no other options' },
        { id: 'B', text: 'Low turnover combined with employees actively growing and engaged in their roles' },
        { id: 'C', text: 'High salaries alone' }
      ],
      correctAnswer: 'B',
      explanation: 'True retention means people stay because they value the experience—not just the paycheck.'
    },
    anchor: {
      prompt: 'What makes you stay committed to something—a job, relationship, or project?',
      categories: ['Loyalty', 'Commitment', 'Belonging', 'Values']
    }
  },

  // SCHOOL CLUSTER
  {
    word: 'pedagogy',
    cluster: 'School',
    definition: 'The method and practice of teaching. It encompasses educational philosophy, instructional strategies, and understanding how people learn.',
    exercise: {
      question: 'Which reflects pedagogical thinking?',
      options: [
        { id: 'A', text: 'Just reading textbook chapters to students' },
        { id: 'B', text: 'Designing lessons based on how students actually learn and retain information' },
        { id: 'C', text: 'Giving the same lecture every year without adaptation' }
      ],
      correctAnswer: 'B',
      explanation: 'Pedagogy is about understanding learning processes, not just delivering content.'
    },
    anchor: {
      prompt: 'Who taught you something in a way that really stuck? What made it effective?',
      categories: ['Education', 'Mentorship', 'Self-Teaching', 'Skill Development'],
      examples: {
        'Education': 'Modern pedagogy emphasizes active learning in the classroom.',
        'Mentorship': 'A mentor’s pedagogy shapes how knowledge is shared.',
        'Self-Teaching': 'Effective self-teaching borrows from sound pedagogy.',
        'Skill Development': 'Skill development benefits from adaptive pedagogy.'
      }
    }
  },

  // DAILY CLUSTER
  {
    word: 'nuance',
    cluster: 'Daily',
    definition: 'A subtle difference in meaning, expression, or tone. The fine distinctions that add depth and prevent oversimplification.',
    exercise: {
      question: 'Which statement shows understanding of nuance?',
      options: [
        { id: 'A', text: 'The movie was good' },
        { id: 'B', text: 'The film balanced humor and melancholy, making you laugh while feeling bittersweet' },
        { id: 'C', text: 'I liked it' }
      ],
      correctAnswer: 'B',
      explanation: 'Nuance captures subtle complexities that simple statements miss.'
    },
    anchor: {
      prompt: 'When did you notice a subtle distinction that changed your understanding?',
      categories: ['Communication', 'Art', 'Relationships', 'Decision Making']
    }
  },

  {
    word: 'cordial',
    cluster: 'Daily',
    definition: 'Warm and friendly without being intimate. Professional politeness that creates comfort while maintaining appropriate boundaries.',
    exercise: {
      question: 'When is cordial the right tone?',
      options: [
        { id: 'A', text: 'Meeting a colleague\'s parents at a company event' },
        { id: 'B', text: 'Arguing with customer service about a refund' },
        { id: 'C', text: 'Texting your best friend about weekend plans' }
      ],
      correctAnswer: 'A',
      explanation: 'Cordial works when you want warmth with professional or respectful distance.'
    },
    anchor: {
      prompt: 'Where do you need to balance friendliness with appropriate distance?',
      categories: ['Workplace', 'Networking', 'Social Events', 'Customer Service']
    }
  },

  {
    word: 'assertive',
    cluster: 'Daily',
    definition: 'Confidently and clearly expressing thoughts, needs, and boundaries without aggression or passivity. Assertiveness balances respect for others with respect for yourself.',
    exercise: {
      question: 'Which response is truly assertive?',
      options: [
        { id: 'A', text: 'Staying silent to avoid conflict' },
        { id: 'B', text: 'Calmly stating your boundary: "I can\'t take on this project right now, but I\'m happy to discuss timelines"' },
        { id: 'C', text: 'Aggressively refusing without explanation' }
      ],
      correctAnswer: 'B',
      explanation: 'Assertiveness combines clarity about your position with respect—neither passive nor aggressive.'
    },
    anchor: {
      prompt: 'When was a time you wished you\'d been more assertive? What held you back?',
      categories: ['Communication', 'Boundaries', 'Courage', 'Self-Respect'],
      examples: {
        'Communication': 'Assertive communication is clear and respectful.',
        'Boundaries': 'Being assertive helps you set healthy boundaries.',
        'Courage': 'It takes courage to be assertive in tough situations.',
        'Self-Respect': 'Assertive people show self-respect by expressing their needs.'
      }
    }
  },

  {
    word: 'empathy',
    cluster: 'Daily',
    definition: 'The ability to understand and share the feelings of another person. Empathy goes beyond sympathy—it\'s feeling with someone, not just for them.',
    exercise: {
      question: 'Which scenario demonstrates true empathy?',
      options: [
        { id: 'A', text: 'Telling someone "I know how you feel" without listening to their specific situation' },
        { id: 'B', text: 'Listening deeply to understand their unique experience and reflecting back what you\'ve heard' },
        { id: 'C', text: 'Fixing their problem without asking what they actually need' }
      ],
      correctAnswer: 'B',
      explanation: 'Empathy requires listening and understanding the specific, unique nature of someone\'s experience.'
    },
    anchor: {
      prompt: 'Describe a time someone truly understood what you were going through. How did it feel?',
      categories: ['Relationships', 'Understanding', 'Vulnerability', 'Connection'],
      examples: {
        'Relationships': 'When you discover empathy is what deepens bonds with someone',
        'Understanding': 'When true understanding requires genuine empathy',
        'Vulnerability': 'When vulnerability becomes safe through empathy',
        'Connection': 'When empathy creates a moment of real human connection'
      }
    }
  },

  // LITERARY CLUSTER
  {
    word: 'pithy',
    cluster: 'Literary',
    definition: 'Concise and forcefully expressive. Capturing significant meaning in remarkably few words, like a perfect summary.',
    exercise: {
      question: 'Which is pithy?',
      options: [
        { id: 'A', text: 'Less is more' },
        { id: 'B', text: 'In many situations, using fewer words can sometimes be more effective than using many words' },
        { id: 'C', text: 'I think brevity is good' }
      ],
      correctAnswer: 'A',
      explanation: 'Pithy statements pack maximum meaning into minimum words with impact.'
    },
    anchor: {
      prompt: 'What\'s the most pithy piece of advice you\'ve received?',
      categories: ['Writing', 'Communication', 'Advice', 'Wisdom']
    }
  },

  {
    word: 'forlorn',
    cluster: 'Literary',
    definition: 'Pitifully sad and lonely. Conveys abandonment, isolation, and a sense of hopelessness that evokes sympathy.',
    exercise: {
      question: 'Which image is forlorn?',
      options: [
        { id: 'A', text: 'A busy coffee shop on Sunday morning' },
        { id: 'B', text: 'An abandoned playground with broken swings creaking in the wind' },
        { id: 'C', text: 'A crowded train station during rush hour' }
      ],
      correctAnswer: 'B',
      explanation: 'Forlorn combines sadness, abandonment, and evocative loneliness.'
    },
    anchor: {
      prompt: 'What place or moment felt forlorn to you?',
      categories: ['Travel', 'Memory', 'Reading', 'Film'],
      examples: {
        'Travel': 'A forlorn train station at night felt empty and cold.',
        'Memory': 'A childhood memory can seem forlorn with the passage of time.',
        'Reading': 'The novel’s hero wandered through a forlorn landscape.',
        'Film': 'A forlorn scene in the film showed a lone figure in the rain.'
      }
    }
  },

  {
    word: 'wrath',
    cluster: 'Literary',
    definition: 'Extreme anger, especially of a powerful or divine nature. Fury that often leads to retribution or dramatic consequences.',
    exercise: {
      question: 'When is wrath the appropriate word?',
      options: [
        { id: 'A', text: 'Mildly annoyed by slow wifi' },
        { id: 'B', text: 'A king ordering punishment for betrayal' },
        { id: 'C', text: 'Frustrated about missing the bus' }
      ],
      correctAnswer: 'B',
      explanation: 'Wrath implies powerful, consequential anger beyond everyday frustration.'
    },
    anchor: {
      prompt: 'In stories or history, whose wrath left a lasting impact?',
      categories: ['Literature', 'History', 'Mythology', 'Film']
    }
  },

  {
    word: 'wraith',
    cluster: 'Literary',
    definition: 'A ghost or specter; the transparent image of a person at the moment of death. Often used metaphorically to describe something thin, insubstantial, or supernatural.',
    exercise: {
      question: 'In literature, a wraith typically symbolizes...',
      options: [
        { id: 'A', text: 'A wealthy noble' },
        { id: 'B', text: 'Something that has lost substance—presence without reality, haunting without hope' },
        { id: 'C', text: 'A warrior in battle' }
      ],
      correctAnswer: 'B',
      explanation: 'Wraiths embody the uncanny—present but not alive, visible but untouchable.'
    },
    anchor: {
      prompt: 'What memory or feeling haunts you like a wraith—present but fading?',
      categories: ['Memory', 'Loss', 'Supernatural', 'Emotion']
    }
  },

  {
    word: 'naught',
    cluster: 'Literary',
    definition: 'Nothing; zero. An archaic term emphasizing emptiness or the absence of value, often carrying moral weight in classical literature.',
    exercise: {
      question: '"All his wealth amounted to naught." What does this suggest?',
      options: [
        { id: 'A', text: 'He had no money' },
        { id: 'B', text: 'His wealth lacked meaning or was lost, rendering everything meaningless' },
        { id: 'C', text: 'He was generous' }
      ],
      correctAnswer: 'B',
      explanation: 'Naught carries moral weight—it\'s not just absence but the emptiness that follows loss.'
    },
    anchor: {
      prompt: 'When have you felt like your efforts amounted to naught? What did you learn?',
      categories: ['Failure', 'Meaning', 'Loss', 'Perspective'],
      examples: {
        'Failure': 'After all the work, the project came to naught.',
        'Meaning': 'Sometimes, what once had meaning now feels naught.',
        'Loss': 'Loss can turn hopes and plans to naught.',
        'Perspective': 'From a new perspective, naught can become a fresh start.'
      }
    }
  },

  {
    word: 'gleam',
    cluster: 'Literary',
    definition: 'A bright flash or glow of light, often brief and striking. Metaphorically, a gleam represents hope, ambition, or a moment of clarity breaking through darkness.',
    exercise: {
      question: 'What does "a gleam of hope" suggest that "hope" alone does not?',
      options: [
        { id: 'A', text: 'The hope is permanent and certain' },
        { id: 'B', text: 'The hope is sudden, brilliant but fragile—a light breaking through darkness' },
        { id: 'C', text: 'The hope is widespread' }
      ],
      correctAnswer: 'B',
      explanation: 'A gleam adds intensity and transience—hope that shines brightly but might fade.'
    },
    anchor: {
      prompt: 'What gleam of possibility or inspiration has guided a decision you\'ve made?',
      categories: ['Hope', 'Inspiration', 'Light', 'Possibility'],
      examples: {
        'Hope': 'A gleam of hope can change your outlook in dark times.',
        'Inspiration': 'Sometimes a creative idea starts as a simple gleam.',
        'Light': 'A single gleam lit up the entire room.',
        'Possibility': 'Every new project begins with a gleam of possibility.'
      }
    }
  },

  {
    word: 'yore',
    cluster: 'Literary',
    definition: 'Time long past; days of old. Yore evokes nostalgia and the distance between past and present, often romanticizing bygone eras.',
    exercise: {
      question: 'Why might a writer use "yore" instead of simply "the past"?',
      options: [
        { id: 'A', text: 'To sound more formal' },
        { id: 'B', text: 'To evoke romance, distance, and a sense that something precious is lost to time' },
        { id: 'C', text: 'To confuse readers' }
      ],
      correctAnswer: 'B',
      explanation: 'Yore romanticizes the past—it carries longing and the bittersweet sense of "those were the days."'
    },
    anchor: {
      prompt: 'What from your childhood or the past do you view through the lens of yore?',
      categories: ['Nostalgia', 'Memory', 'Childhood', 'Change']
    }
  },

  {
    word: 'swain',
    cluster: 'Literary',
    definition: 'A young lover or suitor, especially one from pastoral or romantic literature. Archaic and often ironic, evoking idealized courtship and devotion.',
    exercise: {
      question: 'How is "swain" typically used in modern literature?',
      options: [
        { id: 'A', text: 'To describe a modern romantic partner seriously' },
        { id: 'B', text: 'To evoke an old-fashioned or idealized romantic, often with irony or nostalgia' },
        { id: 'C', text: 'To describe a warrior' }
      ],
      correctAnswer: 'B',
      explanation: 'Swain carries the weight of literary tradition—using it now creates irony or romantic nostalgia.'
    },
    anchor: {
      prompt: 'In literature, swains were devoted lovers. Who has been most devoted to you, or you to them?',
      categories: ['Love', 'Devotion', 'Romance', 'Literature'],
      examples: {
        'Love': 'A true swain shows love through gentle actions.',
        'Devotion': 'His devotion was that of a classic swain—steadfast and sincere.',
        'Romance': 'In the story, the swain’s romance was pure and poetic.',
        'Literature': 'Literature often paints the swain as the idealized lover.'
      }
    }
  },

  {
    word: 'quoth',
    cluster: 'Literary',
    definition: 'Said or spoke; archaic past tense of "quote." Famous from Edgar Allan Poe\'s "The Raven" ("Quoth the raven, \'Nevermore\'"), emphasizing dramatic declaration.',
    exercise: {
      question: 'Why is "quoth" so effective in "The Raven"?',
      options: [
        { id: 'A', text: 'Because it means the bird is lying' },
        { id: 'B', text: 'Because its archaic quality makes the raven\'s speech feel ancient, mystical, and inevitable' },
        { id: 'C', text: 'Because it rhymes well' }
      ],
      correctAnswer: 'B',
      explanation: 'Quoth creates an otherworldly tone—making the raven sound oracular and timeless.'
    },
    anchor: {
      prompt: 'What words or phrases do people "quoth" (repeat) in your life that feel prophetic?',
      categories: ['Literature', 'Wisdom', 'Repetition', 'Prophecy']
    }
  },

  {
    word: 'cleave',
    cluster: 'Literary',
    definition: 'To split or divide forcefully; or paradoxically, to cling or adhere closely. This dual meaning creates powerful tension in literature.',
    exercise: {
      question: 'Why is "cleave" particularly useful in dramatic writing?',
      options: [
        { id: 'A', text: 'Because it\'s easy to spell' },
        { id: 'B', text: 'Because it carries opposite meanings—both splitting and joining—creating emotional complexity' },
        { id: 'C', text: 'Because it\'s old-fashioned' }
      ],
      correctAnswer: 'B',
      explanation: 'Cleave\'s contradictory meanings mirror emotional conflict—being torn apart while holding on.'
    },
    anchor: {
      prompt: 'To what or whom do you cleave most strongly? What would it mean to be cleaved from it?',
      categories: ['Attachment', 'Conflict', 'Identity', 'Loss']
    }
  },

  {
    word: 'sward',
    cluster: 'Literary',
    definition: 'Green grass or turf; a grassy surface or lawn. Often used in pastoral poetry to invoke natural beauty and peace.',
    exercise: {
      question: 'What atmosphere does "sward" create that "grass" does not?',
      options: [
        { id: 'A', text: 'Sward is more scientific' },
        { id: 'B', text: 'Sward evokes pastoral beauty, peace, and a connection to nature and poetic tradition' },
        { id: 'C', text: 'Sward means artificial grass' }
      ],
      correctAnswer: 'B',
      explanation: 'Sward carries literary weight—it\'s pastoral, romantic, and connected to the English countryside.'
    },
    anchor: {
      prompt: 'Where is a natural place—a sward, a meadow, a forest—where you find peace?',
      categories: ['Nature', 'Peace', 'Sanctuary', 'Home']
    }
  },

  {
    word: 'blithe',
    cluster: 'Literary',
    definition: 'Lighthearted and carefree; displaying happiness without concern for consequences. Often used ironically when someone\'s carelessness masks deeper issues.',
    exercise: {
      question: 'What\'s the subtle danger in a "blithe" character?',
      options: [
        { id: 'A', text: 'They are naturally sad' },
        { id: 'B', text: 'Their carefree nature may mask irresponsibility or failure to see consequences' },
        { id: 'C', text: 'They are dishonest' }
      ],
      correctAnswer: 'B',
      explanation: 'Blithe joy can be dangerous—sometimes carelessness costs more than we realize.'
    },
    anchor: {
      prompt: 'When have you been blithely unconcerned about something that later mattered?',
      categories: ['Growth', 'Consequences', 'Innocence', 'Learning']
    }
  },

  {
    word: 'smite',
    cluster: 'Literary',
    definition: 'To strike forcefully, especially with divine punishment or retribution. Carries moral weight suggesting justice or curse.',
    exercise: {
      question: 'In classical literature, to be "smitten" or "smote" by something suggests...',
      options: [
        { id: 'A', text: 'A gentle tap' },
        { id: 'B', text: 'A sudden, powerful force—often divine judgment or overwhelming emotion—that changes everything' },
        { id: 'C', text: 'A quiet criticism' }
      ],
      correctAnswer: 'B',
      explanation: 'Smite carries moral and dramatic weight—it\'s not just physical but consequential and often divinely sanctioned.'
    },
    anchor: {
      prompt: 'What realization or moment smitten you with its force or truth?',
      categories: ['Revelation', 'Impact', 'Divine', 'Transformation'],
      examples: {
        Revelation: 'A sudden revelation can smite you with clarity.',
        Impact: 'The news smote the community with unexpected impact.',
        Divine: 'Legends tell of gods who smite wrongdoers.',
        Transformation: 'Sometimes, change smites us and we are transformed.'
      }
    }
  },

  {
    word: 'fealty',
    cluster: 'Literary',
    definition: 'Loyalty and devotion, especially the oath sworn by feudal vassals to their lord. Represents absolute fidelity and the bonds that hold society together.',
    exercise: {
      question: 'What does swearing "fealty" imply beyond simple agreement?',
      options: [
        { id: 'A', text: 'A casual preference' },
        { id: 'B', text: 'An unbreakable vow of absolute loyalty and devotion, binding one\'s honor and future' },
        { id: 'C', text: 'A financial transaction' }
      ],
      correctAnswer: 'B',
      explanation: 'Fealty is sacred—it\'s not just loyalty but binding one\'s honor and integrity to another.'
    },
    anchor: {
      prompt: 'To whom or what have you sworn fealty—explicit or implicit? What does that mean?',
      categories: ['Loyalty', 'Honor', 'Commitment', 'Relationships']
    }
  },

  {
    word: 'wane',
    cluster: 'Literary',
    definition: 'To decrease in size, strength, or influence, as the moon wanes. Suggests natural decline, loss of power, or the passage from fullness to diminishment.',
    exercise: {
      question: 'Why might a poet choose "wane" to describe declining power rather than "decrease"?',
      options: [
        { id: 'A', text: 'Because it\'s shorter' },
        { id: 'B', text: 'Because it carries inevitability, natural cycles, and the poignancy of fading—not choice but fate' },
        { id: 'C', text: 'Because it\'s more modern' }
      ],
      correctAnswer: 'B',
      explanation: 'Wane feels natural and inevitable—like the moon—rather than chosen or sudden.'
    },
    anchor: {
      prompt: 'What in your life has waned or is waning? How do you feel about it?',
      categories: ['Change', 'Acceptance', 'Time', 'Impermanence'],
      examples: {
        Change: 'As seasons shift, my enthusiasm can wane and then return anew.',
        Acceptance: 'I accept that some friendships wane over the years.',
        Time: 'With time, excitement for old hobbies may wane.',
        Impermanence: 'Wane reminds me that nothing lasts forever.'
      }
    }
  },

  {
    word: 'heathen',
    cluster: 'Literary',
    definition: 'A person outside one\'s religious faith; used both literally and metaphorically to describe someone uncivilized or lacking refinement. Often carries ironic or poetic weight.',
    exercise: {
      question: 'In modern literary use, calling someone "heathen" often suggests...',
      options: [
        { id: 'A', text: 'A literal religious classification' },
        { id: 'B', text: 'Ironic distance from their values—they\'re uncivilized by *our* standards, revealing our biases' },
        { id: 'C', text: 'They are dangerous' }
      ],
      correctAnswer: 'B',
      explanation: 'Modern use of "heathen" often works ironically, questioning whose standards matter.'
    },
    anchor: {
      prompt: 'When have you felt like a "heathen"—outside accepted norms? What did you learn?',
      categories: ['Identity', 'Outsider', 'Culture', 'Perspective']
    }
  },

  {
    word: 'wend',
    cluster: 'Literary',
    definition: 'To go or travel, especially slowly or by an indirect route. Often used as "wend one\'s way," suggesting a deliberate, thoughtful journey.',
    exercise: {
      question: 'What does "wend one\'s way" convey that "go" or "travel" does not?',
      options: [
        { id: 'A', text: 'Speed and urgency' },
        { id: 'B', text: 'A slower, more thoughtful journey—perhaps circuitous, reflective, purposeful despite meandering' },
        { id: 'C', text: 'Aggression' }
      ],
      correctAnswer: 'B',
      explanation: 'Wend suggests a journey with intention and reflection, not mere movement—you\'re wending *your* way.'
    },
    anchor: {
      prompt: 'Where are you wending your way toward in life? What path are you taking?',
      categories: ['Journey', 'Purpose', 'Path', 'Future']
    }
  },

  // CONFLICT CLUSTER
  {
    word: 'plight',
    cluster: 'Conflict',
    definition: 'A dangerous, difficult, or unfortunate situation. A serious predicament that demands attention and often sympathy.',
    exercise: {
      question: 'Which describes a plight?',
      options: [
        { id: 'A', text: 'Choosing between two good job offers' },
        { id: 'B', text: 'Refugees fleeing war with nowhere to go' },
        { id: 'C', text: 'Deciding what to eat for dinner' }
      ],
      correctAnswer: 'B',
      explanation: 'Plight refers to serious, distressing situations, not minor inconveniences.'
    },
    anchor: {
      prompt: 'What plight in the world concerns you most?',
      categories: ['Social Issues', 'Current Events', 'Personal Experience', 'History']
    }
  },

  {
    word: 'bane',
    cluster: 'Conflict',
    definition: 'A source of persistent harm or misery. Something that causes recurring problems or serves as a nemesis.',
    exercise: {
      question: 'What could be someone\'s bane?',
      options: [
        { id: 'A', text: 'A minor inconvenience that happened once' },
        { id: 'B', text: 'Chronic procrastination that undermines every project' },
        { id: 'C', text: 'A rainy day' }
      ],
      correctAnswer: 'B',
      explanation: 'A bane is a persistent, recurring source of difficulty, not a one-time issue.'
    },
    anchor: {
      prompt: 'What has been the bane of your productivity or peace?',
      categories: ['Work Habits', 'Personal Growth', 'Challenges', 'Obstacles']
    }
  },

  // CULTURE CLUSTER
  {
    word: 'ken',
    cluster: 'Culture',
    definition: 'One\'s range of knowledge or understanding. Describes the boundaries of what someone comprehends or perceives.',
    exercise: {
      question: 'How is "ken" used correctly?',
      options: [
        { id: 'A', text: 'Quantum physics is beyond my ken' },
        { id: 'B', text: 'I ken you tomorrow' },
        { id: 'C', text: 'That\'s a nice ken you have' }
      ],
      correctAnswer: 'A',
      explanation: 'Ken refers to the limits of knowledge or understanding, as in "beyond my ken."'
    },
    anchor: {
      prompt: 'What topic is currently beyond your ken but fascinates you?',
      categories: ['Learning', 'Science', 'Philosophy', 'Culture'],
      examples: {
        Learning: 'Every new subject expands my ken just a little further.',
        Science: 'Some scientific theories remain outside my ken, but I enjoy exploring them.',
        Philosophy: 'Philosophy often pushes the boundaries of my ken.',
        Culture: 'Traveling exposes me to cultures beyond my ken.'
      }
    }
  },
  // SCHOOL CLUSTER (continued)
  {
    word: 'expert',
    cluster: 'School',
    definition: 'A person with comprehensive and authoritative knowledge or skill in a particular area. Implies mastery gained through extensive study or experience.',
    exercise: {
      question: 'What distinguishes an expert from someone knowledgeable?',
      options: [
        { id: 'A', text: 'An expert has read one book on the topic' },
        { id: 'B', text: 'An expert can navigate edge cases and explain why rules sometimes break' },
        { id: 'C', text: 'An expert knows all the basic facts' }
      ],
      correctAnswer: 'B',
      explanation: 'True expertise includes understanding exceptions, limitations, and the "why" behind knowledge—not just memorizing facts.'
    },
    anchor: {
      prompt: 'In what area are you becoming an expert, even if you\'re not there yet?',
      categories: ['Professional Skill', 'Hobby', 'Creative Pursuit', 'Life Experience']
    }
  },

  {
    word: 'proficiency',
    cluster: 'School',
    definition: 'A high degree of competence or skill in a particular area. Demonstrates advanced capability beyond basic knowledge.',
    exercise: {
      question: 'Which shows proficiency rather than just familiarity?',
      options: [
        { id: 'A', text: 'Recognizing Spanish words when you hear them' },
        { id: 'B', text: 'Holding a nuanced conversation in Spanish about abstract topics' },
        { id: 'C', text: 'Knowing Spanish exists as a language' }
      ],
      correctAnswer: 'B',
      explanation: 'Proficiency means performing complex tasks skillfully, not just recognizing or understanding basics.'
    },
    anchor: {
      prompt: 'What skill did you move from basic to proficient, and how did that feel?',
      categories: ['Language', 'Music', 'Sports', 'Technical Skill'],
      examples: {
        'Language': 'Proficiency in a language means thinking and expressing yourself with ease.',
        'Music': 'Musical proficiency lets you play complex pieces smoothly.',
        'Sports': 'Proficiency in sports shows in skillful, confident moves.',
        'Technical Skill': 'Technical proficiency is solving problems with expertise.'
      }
    }
  },

  {
    word: 'retention',
    cluster: 'School',
    definition: 'The continued possession, use, or control of something, especially information in memory. In education, refers to how well knowledge is maintained over time.',
    exercise: {
      question: 'What helps long-term retention of information?',
      options: [
        { id: 'A', text: 'Reading something once right before the test' },
        { id: 'B', text: 'Spacing out practice over time and connecting new info to existing knowledge' },
        { id: 'C', text: 'Highlighting everything in the textbook' }
      ],
      correctAnswer: 'B',
      explanation: 'Retention improves with spaced repetition and meaningful connections, not passive rereading or last-minute cramming.'
    },
    anchor: {
      prompt: 'What knowledge have you retained for years, and why did it stick?',
      categories: ['School Memory', 'Life Lesson', 'Professional Knowledge', 'Personal Story']
    }
  },

  // DAILY LIFE CLUSTER (continued)
  // ...existing code...

  // LITERARY CLUSTER (continued)
  {
    word: 'wraith',
    cluster: 'Literary',
    definition: 'A ghost or ghostlike image of someone, especially one seen shortly before or after their death. Used to describe something pale, thin, or spectral.',
    exercise: {
      question: 'When would you use "wraith" instead of "ghost"?',
      options: [
        { id: 'A', text: 'Describing a cheerful, friendly spirit' },
        { id: 'B', text: 'Describing something thin, pale, and barely visible—almost transparent' },
        { id: 'C', text: 'Describing a solid, scary haunted house figure' }
      ],
      correctAnswer: 'B',
      explanation: 'Wraith emphasizes the ethereal, barely-there quality—more about fading presence than solid haunting.'
    },
    anchor: {
      prompt: 'What memory or person from your past feels like a wraith—present but not solid?',
      categories: ['Past Relationship', 'Old Home', 'Childhood Memory', 'Lost Dream']
    }
  },

  {
    word: 'naught',
    cluster: 'Literary',
    definition: 'Nothing or zero. An archaic term meaning not anything, often used in literary or poetic contexts.',
    exercise: {
      question: 'Why use "naught" instead of "nothing"?',
      options: [
        { id: 'A', text: 'They mean exactly the same in modern contexts' },
        { id: 'B', text: 'Naught adds archaic weight and poetic resonance to emptiness or failure' },
        { id: 'C', text: 'Naught is more casual and conversational' }
      ],
      correctAnswer: 'B',
      explanation: 'Naught carries old-world gravity and poetic weight—"all for naught" hits harder than "all for nothing."'
    },
    anchor: {
      prompt: 'What effort in your life felt like it came to naught?',
      categories: ['Project', 'Relationship', 'Goal', 'Creative Work']
    }
  },

  // ...existing code...

  {
    word: 'yore',
    cluster: 'Literary',
    definition: 'Long ago or former times, typically used in the phrase "days of yore." Evokes nostalgia for the distant past.',
    exercise: {
      question: 'Why does "days of yore" feel different than "the old days"?',
      options: [
        { id: 'A', text: 'No difference—they\'re interchangeable' },
        { id: 'B', text: 'Yore adds romantic, mythical distance—like legends rather than memories' },
        { id: 'C', text: 'Yore is more specific about dates' }
      ],
      correctAnswer: 'B',
      explanation: 'Yore elevates the past to something almost mythical—knights and castles, not just "back in my day."'
    },
    anchor: {
      prompt: 'What tradition or story from "days of yore" fascinates you?',
      categories: ['Family History', 'Historical Era', 'Mythology', 'Old Customs']
    }
  },

  {
    word: 'swain',
    cluster: 'Literary',
    definition: 'A young lover or suitor, especially in a pastoral or rural setting. An archaic, poetic term for a young man courting a woman.',
    exercise: {
      question: 'When would you call someone a swain?',
      options: [
        { id: 'A', text: 'Describing a modern Tinder date' },
        { id: 'B', text: 'Describing a romantic young man in a pastoral poem or story, or playfully referencing old-fashioned courtship' },
        { id: 'C', text: 'Describing any male person' }
      ],
      correctAnswer: 'B',
      explanation: 'Swain evokes pastoral romance and old-fashioned courtship—think shepherds and meadows, not dating apps.'
    },
    anchor: {
      prompt: 'What old-fashioned romantic gesture do you wish still existed?',
      categories: ['Courtship', 'Love Letters', 'Traditions', 'Gestures']
    }
  },

  {
    word: 'cleave',
    cluster: 'Literary',
    definition: 'To split or sever something, or paradoxically, to adhere firmly and closely. A word with two opposite meanings depending on context.',
    exercise: {
      question: 'How can cleave mean both "split apart" and "stick together"?',
      options: [
        { id: 'A', text: 'It\'s a mistake—one meaning is wrong' },
        { id: 'B', text: 'Historical language evolution created opposite meanings from different roots that merged into one word' },
        { id: 'C', text: 'It always means split; the other use is modern slang' }
      ],
      correctAnswer: 'B',
      explanation: 'Cleave is a "contronym"—two old words (cleofan=split, clifian=adhere) merged into one English word with opposite meanings.'
    },
    anchor: {
      prompt: 'What relationship in your life involves both cleaving together and cleaving apart?',
      categories: ['Family', 'Partnership', 'Friendship', 'Creative Collaboration']
    }
  },

  {
    word: 'sward',
    cluster: 'Literary',
    definition: 'An expanse of short grass, a lawn or meadow. A poetic term for grassy ground.',
    exercise: {
      question: 'Why use "sward" instead of "grass" or "lawn"?',
      options: [
        { id: 'A', text: 'Sward sounds more scientific' },
        { id: 'B', text: 'Sward evokes pastoral, poetic beauty—wild meadows rather than suburban yards' },
        { id: 'C', text: 'Sward is for professional landscaping only' }
      ],
      correctAnswer: 'B',
      explanation: 'Sward carries poetic, natural imagery—think rolling hills and wildflowers, not mowed lawns and sprinklers.'
    },
    anchor: {
      prompt: 'What outdoor space made you feel peaceful or free?',
      categories: ['Childhood Place', 'Travel Memory', 'Park', 'Natural Setting']
    }
  },

  {
    word: 'blithe',
    cluster: 'Literary',
    definition: 'Showing a casual and cheerful indifference, or carefree and light-hearted. Can imply either joyful ease or troubling lack of concern.',
    exercise: {
      question: 'Can "blithe" be positive or negative?',
      options: [
        { id: 'A', text: 'Always positive—it means happy and carefree' },
        { id: 'B', text: 'Can be both: joyful freedom OR reckless indifference, depending on context' },
        { id: 'C', text: 'Always negative—it means irresponsible' }
      ],
      correctAnswer: 'B',
      explanation: 'Blithe is double-edged: "blithe spirit" = wonderful freedom; "blithe disregard" = careless irresponsibility.'
    },
    anchor: {
      prompt: 'When were you blithe about something you should have taken seriously?',
      categories: ['Youth', 'Relationship', 'Warning Ignored', 'Responsibility']
    }
  },

  // CONFLICT CLUSTER (continued)

  // CULTURE CLUSTER (continued)
  // === REGISTER TRAPS: PROFESSIONAL PRECISION ===
  
  {
    word: 'kindly',
    cluster: 'Professional Precision',
    definition: 'In a kind manner; also used to make polite requests or give firm instructions. Context determines whether it softens or strengthens your message.',
    exercise: {
      question: 'You\'re writing to a colleague who missed a deadline. Which tone does "kindly" create?',
      options: [
        { id: 'A', text: 'In "Could you kindly send the report?" it makes the request more polite and gentle' },
        { id: 'B', text: 'In "Kindly stop forwarding these emails" it transforms from polite to ice-cold firmness' },
        { id: 'C', text: 'It always makes requests sound weak and passive-aggressive' }
      ],
      correctAnswer: 'B',
      explanation: '"Kindly" in a request = polite. "Kindly" in an instruction = firm boundary. The word transforms based on context.'
    },
    anchor: {
      prompt: 'Picture a tense email exchange where tone determines if "kindly" helps or harms.',
      categories: ['Work Email', 'Conflict', 'Boundaries', 'Professional Communication']
    }
  },

  {
    word: 'regarding',
    cluster: 'Professional Precision',
    definition: 'Concerning; about; in relation to. Signals formality in professional contexts.',
    exercise: {
      question: 'Which email opening sounds professionally appropriate without being stiff?',
      options: [
        { id: 'A', text: 'Regarding your question about the timeline...' },
        { id: 'B', text: 'About your question on the timeline...' },
        { id: 'C', text: 'Following up on your timeline question...' }
      ],
      correctAnswer: 'C',
      explanation: '"Regarding" in formal client communication feels right. In a Slack message to your team, it sounds like a legal document. Choose formality level based on context.'
    },
    anchor: {
      prompt: 'When does formal language protect you versus when does it create distance?',
      categories: ['Client Email', 'Team Communication', 'Professional Tone', 'Formality']
    }
  },

  {
    word: 'concerning',
    cluster: 'Professional Precision',
    definition: 'About; regarding (preposition) OR causing worry or anxiety (adjective). Context determines which meaning applies.',
    exercise: {
      question: 'Your manager writes: "I have feedback concerning your report." What do they mean?',
      options: [
        { id: 'A', text: 'The feedback is ABOUT the report (preposition)' },
        { id: 'B', text: 'The feedback is WORRYING (adjective)' },
        { id: 'C', text: 'Impossible to tell without more context—the ambiguity creates uncertainty' }
      ],
      correctAnswer: 'C',
      explanation: '"Concerning" as a preposition = about. As an adjective = worrying. Context is everything, and ambiguity can cause anxiety.'
    },
    anchor: {
      prompt: 'Recall receiving ambiguous feedback that left you uncertain about its severity.',
      categories: ['Performance Review', 'Feedback', 'Work Anxiety', 'Communication']
    }
  },

  {
    word: 'facilitate',
    cluster: 'Professional Precision',
    definition: 'To make an action or process easier or smoother. Signals coordinating complex dynamics, not simple tasks.',
    exercise: {
      question: 'In which situation does "facilitate" add value versus sounding like corporate jargon?',
      options: [
        { id: 'A', text: 'I\'ll facilitate the meeting (when organizing a workshop with multiple stakeholders)' },
        { id: 'B', text: 'I\'ll facilitate sending the email (when just forwarding an email)' },
        { id: 'C', text: 'I\'ll facilitate your lunch order (when just taking someone\'s order)' }
      ],
      correctAnswer: 'A',
      explanation: '"Facilitate" means removing friction in complex processes, not doing simple tasks. It signals you\'re coordinating dynamics, not just booking a room.'
    },
    anchor: {
      prompt: 'When have you truly facilitated something complex versus just helped with something simple?',
      categories: ['Project Management', 'Leadership', 'Coordination', 'Teamwork']
    }
  },

  {
    word: 'assist',
    cluster: 'Professional Precision',
    definition: 'To help someone, especially in a formal or professional context. Creates professional distance where "help" creates warmth.',
    exercise: {
      question: 'A coworker asks for help with Excel. Which response feels right?',
      options: [
        { id: 'A', text: '"Happy to help!" feels friendly and warm' },
        { id: 'B', text: '"I can assist you with that" sounds like customer service—creates distance' },
        { id: 'C', text: 'Both are exactly the same' }
      ],
      correctAnswer: 'B',
      explanation: '"Assist" = formal distance. "Help" = warm proximity. Choose based on the relationship you want to create.'
    },
    anchor: {
      prompt: 'Think of a time when formal language created unwanted distance in a relationship.',
      categories: ['Workplace Relationships', 'Tone', 'Friendliness', 'Professional Distance']
    }
  },

  {
    word: 'inquire',
    cluster: 'Professional Precision',
    definition: 'To ask for information in a formal manner. Elevates "ask" when formality demonstrates respect.',
    exercise: {
      question: 'You\'re cold-emailing a senior executive about job opportunities. Which approach is best?',
      options: [
        { id: 'A', text: 'I\'m writing to inquire about potential opportunities' },
        { id: 'B', text: 'I\'m asking if you have any jobs' },
        { id: 'C', text: 'Do you guys have openings?' }
      ],
      correctAnswer: 'A',
      explanation: 'The word choice shows respect before you\'ve said anything substantial. "Inquire" signals you understand professional formality.'
    },
    anchor: {
      prompt: 'When has using formal language helped you make a strong first impression?',
      categories: ['Job Search', 'Networking', 'First Impressions', 'Professional Email'],
      examples: {
        'Job Search': 'When you inquire about opportunities with respect and professionalism',
        'Networking': 'When using inquire elevates your outreach above casual asking',
        'First Impressions': 'When the word inquire signals you understand formality',
        'Professional Email': 'When you inquire in writing and set the right tone'
      }
    }
  },

  // === REGISTER TRAPS: RELATIONAL CALIBRATION ===

  {
    word: 'quite',
    cluster: 'Relational Calibration',
    definition: 'To a certain extent (UK: understatement); completely or very (US: emphasis). The word\'s meaning depends on the speaker\'s origin.',
    exercise: {
      question: 'A British colleague says "That\'s quite interesting." An American colleague says the same. Do they mean the same thing?',
      options: [
        { id: 'A', text: 'Yes, both mean very interesting' },
        { id: 'B', text: 'No—UK "quite" = moderately, US "quite" = very. Opposite intensity levels.' },
        { id: 'C', text: 'Both mean not very interesting' }
      ],
      correctAnswer: 'B',
      explanation: 'UK "quite impressive" = mildly complimented. US "quite impressive" = strongly validated. "Quite" is a cultural chameleon.'
    },
    anchor: {
      prompt: 'Have you ever misread enthusiasm levels due to cultural language differences?',
      categories: ['Cultural Differences', 'International Work', 'Miscommunication', 'Compliments']
    }
  },

  {
    word: 'rather',
    cluster: 'Relational Calibration',
    definition: 'To a certain degree; used to soften or add politeness (can sound condescending or old-fashioned). Often hedges enthusiasm.',
    exercise: {
      question: 'Someone shows you their work. Which response might accidentally sound condescending?',
      options: [
        { id: 'A', text: 'This is really good' },
        { id: 'B', text: 'This is rather good, actually' },
        { id: 'C', text: 'This is quite impressive' }
      ],
      correctAnswer: 'B',
      explanation: '"Rather" can sound like faint praise even when you mean it as a compliment. It creates distance you may not intend.'
    },
    anchor: {
      prompt: 'When has hedged language made your compliment land colder than you intended?',
      categories: ['Feedback', 'Compliments', 'Tone', 'Encouragement'],
      examples: {
        'Feedback': 'When using rather softens criticism but muddles the message',
        'Compliments': 'When you say rather good and sound less enthusiastic than intended',
        'Tone': 'When using rather creates the distance you didn\'t mean to create',
        'Encouragement': 'When hedging with rather takes the power out of your words'
      }
    }
  },

  {
    word: 'somewhat',
    cluster: 'Relational Calibration',
    definition: 'To a moderate degree; rather. Hedges criticism to preserve relationship but can muddy clarity.',
    exercise: {
      question: 'You\'re giving feedback on a presentation. How does "somewhat" change your message?',
      options: [
        { id: 'A', text: '"It was somewhat unclear" softens the blow but might obscure how serious the issue is' },
        { id: 'B', text: '"It was unclear" is too harsh' },
        { id: 'C', text: 'Both say exactly the same thing' }
      ],
      correctAnswer: 'A',
      explanation: '"Somewhat" hedges criticism to preserve relationship—but can also muddy clarity. You\'re calibrating between clarity and kindness.'
    },
    anchor: {
      prompt: 'When have you had to balance being kind versus being clear in feedback?',
      categories: ['Difficult Conversations', 'Feedback', 'Relationships', 'Honesty'],
      examples: {
        'Difficult Conversations': 'Her response was somewhat defensive during our talk.',
        'Feedback': 'I said the report was somewhat unclear to soften my critique.',
        'Relationships': 'Being somewhat honest can help preserve a relationship.',
        'Honesty': 'My honesty was somewhat compromised by my desire to be kind.'
      }
    }
  },

  {
    word: 'actually',
    cluster: 'Relational Calibration',
    definition: 'In fact; used to emphasize truth or make a correction (can sound defensive or confrontational). Signals correction even when you mean clarification.',
    exercise: {
      question: 'Someone misunderstands your point. Which correction feels collaborative?',
      options: [
        { id: 'A', text: 'Actually, what I meant was...' },
        { id: 'B', text: 'Let me clarify - I meant...' },
        { id: 'C', text: 'Actually, that\'s not quite right...' }
      ],
      correctAnswer: 'B',
      explanation: '"Actually" can sound like contradiction even when you mean clarification. Use when accuracy matters more than diplomacy.'
    },
    anchor: {
      prompt: 'Think of a time you corrected someone and it created tension you didn\'t intend.',
      categories: ['Meetings', 'Misunderstandings', 'Conflict', 'Communication']
    }
  },

  {
    word: 'honestly',
    cluster: 'Relational Calibration',
    definition: 'In an honest manner; used to emphasize sincerity (but can imply previous statements weren\'t honest). Double-edged intensifier.',
    exercise: {
      question: 'You say "Honestly, I think this approach won\'t work." What does starting with "honestly" signal?',
      options: [
        { id: 'A', text: 'It makes you sound more trustworthy in this moment' },
        { id: 'B', text: 'It can accidentally imply you weren\'t being honest before' },
        { id: 'C', text: 'It has no effect on how people hear you' }
      ],
      correctAnswer: 'B',
      explanation: '"Honestly" emphasizes current truth but can cast doubt on past statements. Use sparingly.'
    },
    anchor: {
      prompt: 'When have you used "honestly" to add weight, and did it work or backfire?',
      categories: ['Difficult Conversations', 'Trust', 'Vulnerability', 'Communication']
    }
  },

  {
    word: 'appreciate',
    cluster: 'Relational Calibration',
    definition: 'To recognize the value of something; to be grateful for. Can either deepen warmth or create formality depending on context.',
    exercise: {
      question: 'A colleague helps you with a rush project. Which response feels warmly grateful?',
      options: [
        { id: 'A', text: 'Thanks so much for helping' },
        { id: 'B', text: 'I really appreciate your help' },
        { id: 'C', text: 'I appreciate your assistance' }
      ],
      correctAnswer: 'B',
      explanation: '"Thanks!" feels warm but small. "I really appreciate it" adds weight and sincerity. "I appreciate your assistance" feels corporate.'
    },
    anchor: {
      prompt: 'When has someone\'s help deserved deeper gratitude than a simple "thanks"?',
      categories: ['Gratitude', 'Teamwork', 'Relationships', 'Support']
    }
  },

  {
    word: 'understand',
    cluster: 'Relational Calibration',
    definition: 'To comprehend meaning or grasp a situation; also used to show empathy. Can accidentally center yourself when you mean to witness others.',
    exercise: {
      question: 'A friend is upset. Which response sounds empathetic versus presumptuous?',
      options: [
        { id: 'A', text: 'I understand how you feel' },
        { id: 'B', text: 'I hear how you feel' },
        { id: 'C', text: 'Both are exactly the same' }
      ],
      correctAnswer: 'B',
      explanation: '"I understand" = claiming comprehension. "I hear you" = offering witness. Choose based on what they need.'
    },
    anchor: {
      prompt: 'When has someone claimed to understand you, and it felt dismissive rather than supportive?',
      categories: ['Empathy', 'Listening', 'Emotional Support', 'Friendship'],
      examples: {
        'Empathy': 'When you understand another\'s pain as deeply as your own',
        'Listening': 'When truly listening means you understand before you respond',
        'Emotional Support': 'When understanding becomes a bridge instead of a barrier',
        'Friendship': 'When friends understand you in ways that matter'
      }
    }
  },

  {
    word: 'concern',
    cluster: 'Relational Calibration',
    definition: 'A worry or anxiety; something that matters to someone; to relate to or affect. The form changes the feeling.',
    exercise: {
      question: 'You need to give critical feedback. Which framing sounds like care versus judgment?',
      options: [
        { id: 'A', text: 'I have some concerns about your approach (plural, formal—feels serious)' },
        { id: 'B', text: 'I\'m concerned about you (singular, personal—feels supportive)' },
        { id: 'C', text: 'Both create the same emotional tone' }
      ],
      correctAnswer: 'B',
      explanation: '"Concerns" (noun) = formal issues. "Concerned" (adjective) = personal care. The form changes the feeling.'
    },
    anchor: {
      prompt: 'When has someone expressed concern for you in a way that felt caring versus critical?',
      categories: ['Feedback', 'Care', 'Criticism', 'Relationships']
    }
  },

  {
    word: 'support',
    cluster: 'Relational Calibration',
    definition: 'To give assistance or approval; to agree with or advocate for. Implies action and commitment, not just alignment.',
    exercise: {
      question: 'In a meeting, someone proposes a risky initiative. What\'s the difference between agreeing and supporting?',
      options: [
        { id: 'A', text: '"I agree" means you think it\'s right. "I support this" means you\'ll help make it happen.' },
        { id: 'B', text: 'They mean exactly the same thing' },
        { id: 'C', text: '"Support" is weaker than "agree"' }
      ],
      correctAnswer: 'A',
      explanation: '"Support" implies action and commitment. "Agree" is just alignment. Know which you\'re offering.'
    },
    anchor: {
      prompt: 'When have you moved from agreeing with an idea to actively supporting it?',
      categories: ['Commitment', 'Action', 'Advocacy', 'Teamwork'],
      examples: {
        Commitment: 'True commitment means you support your team through challenges.',
        Action: 'I chose to support the project by taking action, not just agreeing.',
        Advocacy: 'Advocacy requires you to support causes you believe in.',
        Teamwork: 'Support from teammates makes collaboration successful.'
      }
    }
  },

  {
    word: 'respect',
    cluster: 'Relational Calibration',
    definition: 'A feeling of admiration; due regard for someone\'s rights or wishes. Can signal boundary as much as admiration.',
    exercise: {
      question: 'You disagree with someone\'s decision. Does "I respect your choice" show genuine respect?',
      options: [
        { id: 'A', text: 'Always—it\'s a clear compliment' },
        { id: 'B', text: 'It can mean genuine admiration OR polite disagreement—tone determines which' },
        { id: 'C', text: 'Never—it\'s always sarcastic' }
      ],
      correctAnswer: 'B',
      explanation: 'Respect can signal boundary as much as admiration. "I respect that" with warmth = admiration. With distance = polite disagreement.'
    },
    anchor: {
      prompt: 'When have you "respected" someone\'s choice while privately disagreeing with it?',
      categories: ['Boundaries', 'Disagreement', 'Relationships', 'Acceptance']
    }
  },

  // === REGISTER TRAPS: INTELLECTUAL CLARITY ===

  {
    word: 'furthermore',
    cluster: 'Intellectual Clarity',
    definition: 'In addition; moreover (formal connector used in writing and speeches). Essay voice that sounds unnatural in speech.',
    exercise: {
      question: 'You\'re speaking in a team meeting. Which sounds natural in conversation?',
      options: [
        { id: 'A', text: 'Furthermore, we should consider the budget implications' },
        { id: 'B', text: 'Also, we need to consider the budget' },
        { id: 'C', text: 'Plus, we should think about budget' }
      ],
      correctAnswer: 'B',
      explanation: '"Furthermore" is essay voice. In speech, use "also" or "plus" unless you\'re giving a formal presentation.'
    },
    anchor: {
      prompt: 'When have you caught yourself using "writing voice" in conversation and felt awkward?',
      categories: ['Presentations', 'Meetings', 'Public Speaking', 'Communication']
    }
  },

  {
    word: 'utilize',
    cluster: 'Intellectual Clarity',
    definition: 'To make use of; to employ (often considered unnecessarily formal compared to "use"). Simple words signal confidence.',
    exercise: {
      question: 'You\'re writing documentation. When does "utilize" add value?',
      options: [
        { id: 'A', text: 'We will utilize this framework (sounds pretentious)' },
        { id: 'B', text: 'We will use this framework (clearer and more confident)' },
        { id: 'C', text: 'Always use "utilize" to sound professional' }
      ],
      correctAnswer: 'B',
      explanation: '"Use" is almost always better than "utilize" unless you\'re making technical specifications. Simple words signal confidence.'
    },
    anchor: {
      prompt: 'When have you simplified your language and felt more credible, not less?',
      categories: ['Writing', 'Communication', 'Clarity', 'Confidence'],
      examples: {
        'Writing': 'Writers often utilize complex words when simple ones work better.',
        'Communication': 'Clear communication rarely needs "utilize" instead of "use".',
        'Clarity': 'To maximize clarity, utilize direct and simple language.',
        'Confidence': 'Confident speakers utilize plain words to build trust.'
      }
    }
  },

  {
    word: 'significant',
    cluster: 'Intellectual Clarity',
    definition: 'Important; meaningful; having a particular meaning (can be vague without context). Often disguises vagueness as sophistication.',
    exercise: {
      question: 'You\'re reporting results: "We saw significant growth." What makes this problematic?',
      options: [
        { id: 'A', text: 'It\'s too technical' },
        { id: 'B', text: '"Significant" hides that you don\'t have exact numbers—precision would be more credible' },
        { id: 'C', text: 'It\'s perfect as-is' }
      ],
      correctAnswer: 'B',
      explanation: '"Significant" often disguises vagueness as sophistication. "23% growth" sounds more credible than "significant growth."'
    },
    anchor: {
      prompt: 'When have you used an impressive-sounding word to hide uncertainty?',
      categories: ['Presentations', 'Reports', 'Data', 'Communication']
    }
  },

  // === CONNOTATION PAIRS ===

  {
    word: 'assertive',
    cluster: 'Relational Calibration',
    definition: 'Confident and direct in claiming one\'s rights or expressing views (positive: confident; negative boundary: aggressive). Respects others while standing firm.',
    exercise: {
      question: 'You speak up in a meeting. Someone says you were "assertive." What does that mean?',
      options: [
        { id: 'A', text: 'It\'s a compliment—you were confident while respecting others' },
        { id: 'B', text: 'If they\'d said "aggressive," it would be criticism—same behavior, opposite connotation' },
        { id: 'C', text: 'Both A and B are true' }
      ],
      correctAnswer: 'C',
      explanation: '"Assertive" = confidence with respect. "Aggressive" = confidence without respect. The line between them matters.'
    },
    anchor: {
      prompt: 'When have you stood your ground while still respecting others in the room?',
      categories: ['Meetings', 'Conflict', 'Confidence', 'Communication'],
      examples: {
        'Meetings': 'Being assertive in meetings helps your ideas get heard.',
        'Conflict': 'Assertive responses can resolve conflict without aggression.',
        'Confidence': 'Assertive people show confidence by expressing their views.',
        'Communication': 'Clear, assertive communication prevents misunderstandings.'
      }
    }
  },

  {
    word: 'frugal',
    cluster: 'Relational Calibration',
    definition: 'Economical with money; sparing (positive: wise; negative: cheap). Your word choice exposes your judgment.',
    exercise: {
      question: 'Your friend splits dinner costs precisely. Which description reveals your judgment?',
      options: [
        { id: 'A', text: '"He\'s frugal" sounds wise and intentional' },
        { id: 'B', text: '"He\'s cheap" sounds small and stingy' },
        { id: 'C', text: 'Both describe the same behavior but reveal opposite judgments' }
      ],
      correctAnswer: 'C',
      explanation: '"Frugal" = wise economy. "Cheap" = excessive saving. Your word choice exposes whether you admire or criticize.'
    },
    anchor: {
      prompt: 'When have you judged someone\'s spending habits—positively or negatively?',
      categories: ['Money', 'Relationships', 'Values', 'Judgment'],
      examples: {
        'Money': 'A frugal approach to money means spending wisely, not excessively.',
        'Relationships': 'Frugal habits can cause tension or admiration in relationships.',
        'Values': 'Being frugal often reflects personal values about waste and need.',
        'Judgment': 'Calling someone frugal can be praise or a subtle judgment.'
      }
    }
  },

  {
    word: 'unique',
    cluster: 'Relational Calibration',
    definition: 'Being the only one of its kind; unlike anything else (positive: special; neutral: unusual). Genuinely positive only when paired with clear enthusiasm.',
    exercise: {
      question: 'Someone shows you their unconventional design. You say "That\'s... unique." How does it land?',
      options: [
        { id: 'A', text: 'Always as a compliment' },
        { id: 'B', text: 'The pause makes it ambiguous—do you love it or hate it?' },
        { id: 'C', text: 'Always as criticism' }
      ],
      correctAnswer: 'B',
      explanation: '"Unique" is genuinely positive only with clear enthusiasm. Alone, it\'s often diplomatic doubt hidden as compliment.'
    },
    anchor: {
      prompt: 'When have you given or received a compliment that felt ambiguous?',
      categories: ['Feedback', 'Art', 'Creativity', 'Communication']
    }
  },

  {
    word: 'simple',
    cluster: 'Intellectual Clarity',
    definition: 'Easy to understand or do; uncomplicated (positive: elegant; negative: simplistic/naive). Tone makes it praise or criticism.',
    exercise: {
      question: 'You present a streamlined design. Someone says "It\'s simple." What do they mean?',
      options: [
        { id: 'A', text: 'Enthusiastic "simple" = praise for elegance' },
        { id: 'B', text: 'Skeptical "simple" = criticism of shallowness' },
        { id: 'C', text: 'Tone determines whether simple is good or bad' }
      ],
      correctAnswer: 'C',
      explanation: '"Simple" is either high praise (elegant) or sharp criticism (simplistic)—tone makes the call entirely.'
    },
    anchor: {
      prompt: 'When has simplicity been your strength versus when has it been seen as a weakness?',
      categories: ['Design', 'Problem Solving', 'Creativity', 'Work'],
      examples: {
        'Design': 'A simple design can be both elegant and effective.',
        'Problem Solving': 'Simple solutions often solve complex problems best.',
        'Creativity': 'Creativity can shine in a simple, clear idea.',
        'Work': 'Simple processes at work reduce errors and stress.'
      }
    }
  },

  {
    word: 'critical',
    cluster: 'Intellectual Clarity',
    definition: 'Expressing disapproval (negative); or crucially important (positive). Never assume which meaning is intended.',
    exercise: {
      question: 'Email subject: "Critical Feedback." What should you expect?',
      options: [
        { id: 'A', text: 'Criticism incoming (negative meaning)' },
        { id: 'B', text: 'Crucially important feedback about success (positive meaning)' },
        { id: 'C', text: 'Impossible to know without reading—"critical" is two different words in one' }
      ],
      correctAnswer: 'C',
      explanation: '"Critical" as judgment = negative. "Critical" as importance = essential. Same spelling, opposite emotional impact.'
    },
    anchor: {
      prompt: 'When has the word "critical" caused you anxiety that turned out to be unnecessary?',
      categories: ['Work Email', 'Feedback', 'Anxiety', 'Miscommunication']
    }
  },

  {
    word: 'discuss',
    cluster: 'Professional Precision',
    definition: 'To talk about something to reach a decision or exchange ideas (neutral: collaborative; can feel evasive). The verb sets the conversation temperature.',
    exercise: {
      question: 'In a tense meeting, what\'s the difference between these phrases?',
      options: [
        { id: 'A', text: '"Let\'s discuss this" = open exploration' },
        { id: 'B', text: '"Let\'s debate this" = structured disagreement' },
        { id: 'C', text: 'All of the above—the verb choice sets expectations before the conversation begins' }
      ],
      correctAnswer: 'C',
      explanation: 'The verb you choose sets the temperature and endpoint of the entire conversation before it begins.'
    },
    anchor: {
      prompt: 'When has the framing of a conversation determined its outcome?',
      categories: ['Meetings', 'Conflict', 'Decision Making', 'Communication']
    }
  },

  {
    word: 'suggest',
    cluster: 'Professional Precision',
    definition: 'To put forward an idea tentatively; to recommend something without insisting. Signals lower confidence than "recommend."',
    exercise: {
      question: 'You have a strong opinion in a meeting. Which verb shows your conviction level?',
      options: [
        { id: 'A', text: '"I suggest we change" sounds tentative—one possibility among many' },
        { id: 'B', text: '"I recommend we change" sounds authoritative—you\'ve evaluated options' },
        { id: 'C', text: 'Your verb choice signals how seriously people should take you' }
      ],
      correctAnswer: 'C',
      explanation: '"Suggest" = tentative offering. "Recommend" = confident guidance. Choose based on your conviction level.'
    },
    anchor: {
      prompt: 'When have you downplayed your certainty and regretted not speaking more confidently?',
      categories: ['Meetings', 'Leadership', 'Confidence', 'Decision Making'],
      examples: {
        Meetings: 'I suggest a new approach during our meetings.',
        Leadership: 'Good leadership can suggest change without demanding it.',
        Confidence: 'Low confidence may suggest uncertainty to others.',
        'Decision Making': 'I suggest we review all options before deciding.'
      }
    }
  },

  {
    word: 'issue',
    cluster: 'Professional Precision',
    definition: 'A topic or subject; also a problem or difficulty (neutral: matter; negative: problem). Corporate cushioning around "problem."',
    exercise: {
      question: 'In a client meeting, how does word choice set expectations?',
      options: [
        { id: 'A', text: '"We have an issue to discuss" sounds manageable' },
        { id: 'B', text: '"We have a problem to discuss" sounds urgent' },
        { id: 'C', text: '"Issue" is corporate softening—use it to keep calm, "problem" to create urgency' }
      ],
      correctAnswer: 'C',
      explanation: '"Issue" = diplomatically neutral. "Problem" = directly negative. Choose based on what energy you need.'
    },
    anchor: {
      prompt: 'When have you softened language to manage perception rather than describe reality?',
      categories: ['Crisis Management', 'Client Communication', 'Spin', 'Professional']
    }
  },

  {
    word: 'leverage',
    cluster: 'Professional Precision',
    definition: 'To use something to maximum advantage; to utilize existing resources strategically. Means amplifying value, not just using.',
    exercise: {
      question: 'In a strategy meeting, when does "leverage" sound strategic versus like jargon?',
      options: [
        { id: 'A', text: '"Leverage our data" signals strategic thinking about multiplying value' },
        { id: 'B', text: '"Leverage our office space" sounds like verbal inflation—just say "use"' },
        { id: 'C', text: 'Both are true—there\'s a line where leverage means amplification versus pretension' }
      ],
      correctAnswer: 'C',
      explanation: '"Leverage" means using something to create outsized value. If you\'re not amplifying, just use "use."'
    },
    anchor: {
      prompt: 'When have you truly leveraged something versus just used corporate speak?',
      categories: ['Strategy', 'Business', 'Jargon', 'Communication']
    }
  },

  // === NATIVE SPEAKER SHIBBOLETHS ===

  {
    word: 'actual',
    cluster: 'Intellectual Clarity',
    definition: 'Existing in fact; real (NOT "current"—common non-native speaker error from Romance languages).',
    exercise: {
      question: 'Which is correct English?',
      options: [
        { id: 'A', text: 'In the actual moment, we face challenges (WRONG—confuses "actual" with "current")' },
        { id: 'B', text: 'In the current moment, we face challenges (CORRECT)' },
        { id: 'C', text: 'Both are correct' }
      ],
      correctAnswer: 'B',
      explanation: '"Actual" = real/genuine. "Current" = happening now. Never use "actual" to mean "current"—it\'s a shibboleth.'
    },
    anchor: {
      prompt: 'Have you caught yourself using a word that immediately marked you as non-native?',
      categories: ['Language Learning', 'False Friends', 'Communication', 'Identity']
    }
  },

  {
    word: 'eventually',
    cluster: 'Intellectual Clarity',
    definition: 'In the end; at some point in the future (NOT "possibly"—common error). Implies certainty about future timing.',
    exercise: {
      question: 'Which sentence is correct English?',
      options: [
        { id: 'A', text: 'Eventually, we might expand to Asia (WRONG—mixing certainty with possibility)' },
        { id: 'B', text: 'We\'ll eventually expand to Asia (CORRECT—certain future outcome)' },
        { id: 'C', text: 'Possibly, we\'ll expand to Asia (CORRECT—uncertain outcome)' }
      ],
      correctAnswer: 'B',
      explanation: '"Eventually" = will happen in the future. "Possibly" = might happen. Don\'t mix them—it\'s a clear non-native marker.'
    },
    anchor: {
      prompt: 'When has someone corrected your English in a way that taught you something important?',
      categories: ['Language Learning', 'Mistakes', 'Growth', 'Communication']
    }
  },

  {
    word: 'sensible',
    cluster: 'Relational Calibration',
    definition: 'Showing good judgment; practical (NOT "sensitive"—common confusion). Completely different from "sensitive."',
    exercise: {
      question: 'A friend shares something emotional. Which is correct?',
      options: [
        { id: 'A', text: '"You\'re very sensible about this" means practical/wise (WRONG for emotional awareness)' },
        { id: 'B', text: '"You\'re very sensitive about this" means emotionally perceptive (CORRECT)' },
        { id: 'C', text: 'They mean the same thing' }
      ],
      correctAnswer: 'B',
      explanation: '"Sensible" = practical/wise. "Sensitive" = emotionally aware/easily hurt. Never confuse them despite similar spelling.'
    },
    anchor: {
      prompt: 'When have you confused two similar-sounding words and created awkwardness?',
      categories: ['Language Learning', 'Embarrassment', 'False Friends', 'Communication'],
      examples: {
        'Language Learning': 'Learning English, I thought "sensible" meant sensitive.',
        'Embarrassment': 'I felt embarrassed when my sensible advice was misunderstood.',
        'False Friends': 'Sensible and sensitive are classic false friends in language.',
        'Communication': 'A sensible comment can help resolve misunderstandings.'
      }
    }
  },

  {
    word: 'salient',
    cluster: 'School',
    definition: 'Standing out prominently or notably; the most noticeable, important, or relevant aspect. In writing and research, what captures attention first.',
    exercise: {
      question: 'Which of these best illustrates "salient" in academic writing?',
      options: [
        { id: 'A', text: 'A detailed footnote that explains a minor historical detail' },
        { id: 'B', text: 'The opening sentence that frames the entire argument and remains in readers\' minds' },
        { id: 'C', text: 'A comprehensive list of every source consulted' }
      ],
      correctAnswer: 'B',
      explanation: 'Salient refers to what stands out and sticks with audiences—in academic work, that\'s usually the central claim or observation.'
    },
    anchor: {
      prompt: 'What salient detail has shaped how you understand a topic?',
      categories: ['Reading', 'Writing', 'Memory', 'Learning']
    }
  },

  {
    word: 'specious',
    cluster: 'School',
    definition: 'Misleadingly attractive or plausible in appearance but actually invalid or false. Reasoning that sounds convincing at first but doesn\'t withstand scrutiny.',
    exercise: {
      question: 'Which is an example of specious reasoning?',
      options: [
        { id: 'A', text: '"Everyone likes this, so it must be true" (popularity doesn\'t prove truth)' },
        { id: 'B', text: 'A carefully documented scientific experiment with peer review' },
        { id: 'C', text: 'Evidence gathered systematically over time' }
      ],
      correctAnswer: 'A',
      explanation: 'Specious arguments appeal to emotion or common belief rather than evidence. They sound reasonable until you examine the logic.'
    },
    anchor: {
      prompt: 'What specious argument have you encountered that initially seemed convincing?',
      categories: ['Critical Thinking', 'Debate', 'Media', 'Decision Making']
    }
  },

  {
    word: 'tenuous',
    cluster: 'School',
    definition: 'Very weak, slight, or insubstantial; barely supported or connected. A fragile link that can easily break under examination.',
    exercise: {
      question: 'What makes a connection "tenuous" rather than simply weak?',
      options: [
        { id: 'A', text: 'It\'s completely false' },
        { id: 'B', text: 'It barely exists but is still technically there—barely holding together' },
        { id: 'C', text: 'It\'s well-established but underappreciated' }
      ],
      correctAnswer: 'B',
      explanation: 'Tenuous means the link exists but is so fragile it\'s on the verge of breaking—more fragile than merely weak.'
    },
    anchor: {
      prompt: 'When have you felt a relationship or connection become tenuous?',
      categories: ['Relationships', 'Work', 'Learning', 'Change']
    }
  },

  {
    word: 'empirical',
    cluster: 'School',
    definition: 'Based on observation, experience, or experimentation rather than theory or assumptions alone. Grounded in evidence that can be measured or tested.',
    exercise: {
      question: 'Which approach is most empirical?',
      options: [
        { id: 'A', text: 'Assuming students learn best through lectures based on traditional methods' },
        { id: 'B', text: 'Testing different teaching methods, measuring student outcomes, and adjusting based on results' },
        { id: 'C', text: 'Philosophizing about what perfect learning might look like' }
      ],
      correctAnswer: 'B',
      explanation: 'Empirical means testing ideas against reality—measuring outcomes and adjusting based on actual evidence, not just theory.'
    },
    anchor: {
      prompt: 'When have you learned something through experience rather than being told?',
      categories: ['Learning', 'Testing', 'Science', 'Growth']
    }
  },

  {
    word: 'extrapolate',
    cluster: 'School',
    definition: 'To estimate, infer, or conclude by extending known information beyond its original scope. Making predictions or judgments based on limited data.',
    exercise: {
      question: 'Why can extrapolation be risky in research?',
      options: [
        { id: 'A', text: 'Because you\'re drawing conclusions beyond the data you actually have' },
        { id: 'B', text: 'Because it requires too much time' },
        { id: 'C', text: 'Because it\'s always more accurate than direct observation' }
      ],
      correctAnswer: 'A',
      explanation: 'Extrapolation means extending conclusions beyond available evidence. It\'s useful for prediction but risky if the pattern doesn\'t hold.'
    },
    anchor: {
      prompt: 'When have you had to make a prediction based on incomplete information?',
      categories: ['Prediction', 'Problem Solving', 'Planning', 'Inference'],
      examples: {
        'Prediction': 'To predict the outcome, I had to extrapolate from limited data.',
        'Problem Solving': 'Sometimes, you must extrapolate a solution from a few clues.',
        'Planning': 'We extrapolated future needs based on current trends.',
        'Inference': 'Extrapolating from past events helped me infer what might happen next.'
      }
    }
  },

  {
    word: 'paradigm',
    cluster: 'School',
    definition: 'A typical example or model; a framework of ideas, assumptions, and methods that shape how we understand and approach problems in a field.',
    exercise: {
      question: 'What happens during a paradigm shift?',
      options: [
        { id: 'A', text: 'People make small improvements within the existing framework' },
        { id: 'B', text: 'The fundamental assumptions and methods for understanding something change completely' },
        { id: 'C', text: 'Nothing significant—it\'s just a change in terminology' }
      ],
      correctAnswer: 'B',
      explanation: 'A paradigm shift is when a fundamental framework changes—like moving from seeing the Earth as the center of the universe to the sun.'
    },
    anchor: {
      prompt: 'What paradigm or worldview have you shifted in your own thinking?',
      categories: ['Perspective', 'Learning', 'Growth', 'Belief']
    }
  },

  {
    word: 'insouciant',
    cluster: 'Literary',
    definition: 'Carefree and nonchalant; showing casual indifference in a charming or sophisticated way. Effortless ease that seems almost cavalier.',
    exercise: {
      question: 'Which character would be described as insouciant?',
      options: [
        { id: 'A', text: 'Someone anxiously preparing for every possible outcome' },
        { id: 'B', text: 'A character who strolls through life with elegant indifference, unbothered by consequences' },
        { id: 'C', text: 'A person who works hard but remains modest' }
      ],
      correctAnswer: 'B',
      explanation: 'Insouciant suggests a carefree elegance—not carelessness, but a sophisticated unconcern that is almost charming.'
    },
    anchor: {
      prompt: 'When have you felt insouciant? When do you wish you could be?',
      categories: ['Confidence', 'Freedom', 'Attitude', 'Literature'],
      examples: {
        'Confidence': 'An insouciant attitude can project effortless confidence.',
        'Freedom': 'She felt insouciant, free from worry or restraint.',
        'Attitude': 'His insouciant smile disarmed the critics.',
        'Literature': 'Many literary heroes are admired for their insouciant charm.'
      }
    }
  },

  {
    word: 'lugubrious',
    cluster: 'Literary',
    definition: 'Mournfully sad or sorrowful; excessively gloomy or melancholic. A tone that is darkly, almost theatrically sorrowful.',
    exercise: {
      question: 'Which best describes a lugubrious atmosphere?',
      options: [
        { id: 'A', text: 'A sunny garden party with laughter' },
        { id: 'B', text: 'A dimly lit funeral parlor with heavy drapes and the scent of flowers, everything steeped in sorrow' },
        { id: 'C', text: 'A quiet but neutral empty room' }
      ],
      correctAnswer: 'B',
      explanation: 'Lugubrious evokes profound, almost theatrical mournfulness—the opposite of light or neutral.'
    },
    anchor: {
      prompt: 'What story, place, or moment struck you as lugubrious?',
      categories: ['Literature', 'Emotion', 'Atmosphere', 'Memory']
    }
  },

  {
    word: 'ineffable',
    cluster: 'Literary',
    definition: 'Too great, profound, or sacred to be expressed in words; indescribable and beyond language itself.',
    exercise: {
      question: 'What does "ineffable" suggest about language?',
      options: [
        { id: 'A', text: 'That some experiences are simple to describe' },
        { id: 'B', text: 'That some truths, feelings, or experiences transcend what words can capture' },
        { id: 'C', text: 'That language is always clear and complete' }
      ],
      correctAnswer: 'B',
      explanation: 'Ineffable implies that language itself fails—some things are too profound or sacred to be put into words.'
    },
    anchor: {
      prompt: 'What experience have you had that felt ineffable—beyond words?',
      categories: ['Spirituality', 'Art', 'Love', 'Mystery']
    }
  },

  {
    word: 'obdurate',
    cluster: 'Literary',
    definition: 'Stubbornly refusing to change opinion, course, or belief; hardened against persuasion. Inflexible and unyielding.',
    exercise: {
      question: 'Which situation shows obdurate behavior?',
      options: [
        { id: 'A', text: 'Someone listens to new evidence and changes their mind thoughtfully' },
        { id: 'B', text: 'A person refuses to budge from their belief despite overwhelming evidence and reasonable argument' },
        { id: 'C', text: 'Someone takes time to consider multiple perspectives' }
      ],
      correctAnswer: 'B',
      explanation: 'Obdurate means hardened against change—not just firm conviction, but stubborn refusal to yield even to reason.'
    },
    anchor: {
      prompt: 'When have you encountered obdurate resistance?',
      categories: ['Conflict', 'Character', 'Relationships', 'Growth']
    }
  },

  {
    word: 'lassitude',
    cluster: 'Literary',
    definition: 'A state of physical or mental weariness; lack of energy, vitality, or enthusiasm. The lethargy of exhaustion or apathy.',
    exercise: {
      question: 'Which scenario best illustrates lassitude?',
      options: [
        { id: 'A', text: 'Feeling energized and motivated after a good night\'s sleep' },
        { id: 'B', text: 'Lying in bed, drained of energy and motivation, unable to muster enthusiasm for anything' },
        { id: 'C', text: 'Being focused and engaged in meaningful work' }
      ],
      correctAnswer: 'B',
      explanation: 'Lassitude is the deep weariness—both physical and emotional—when vitality drains away.'
    },
    anchor: {
      prompt: 'When have you felt lassitude? What helped you recover?',
      categories: ['Fatigue', 'Emotion', 'Resilience', 'Health'],
      examples: {
        'Fatigue': 'After days of work, lassitude left me unable to focus.',
        'Emotion': 'A wave of lassitude followed the emotional news.',
        'Resilience': 'Resilience means finding energy even in lassitude.',
        'Health': 'Poor health can bring on a sense of lassitude.'
      }
    }
  },

  {
    word: 'anachronistic',
    cluster: 'Culture',
    definition: 'Out of its proper time period; belonging to or appearing in the wrong historical era. A contradiction in temporal context.',
    exercise: {
      question: 'Which is an example of something anachronistic?',
      options: [
        { id: 'A', text: 'A Roman character in a period drama wearing a wristwatch' },
        { id: 'B', text: 'A medieval knight carrying a sword appropriate to his time' },
        { id: 'C', text: 'A 1920s flapper wearing fashions from that era' }
      ],
      correctAnswer: 'A',
      explanation: 'Anachronistic means something appears in the wrong historical period—like a modern object in ancient times.'
    },
    anchor: {
      prompt: 'What anachronism have you noticed in a book, film, or historical account?',
      categories: ['History', 'Literature', 'Film', 'Culture'],
      examples: {
        History: 'A smartphone in ancient Rome is anachronistic.',
        Literature: 'The novel’s language felt anachronistic for its setting.',
        Film: 'Anachronistic costumes can distract viewers in historical films.',
        Culture: 'Some traditions seem anachronistic in today’s culture.'
      }
    }
  },

  {
    word: 'derivative',
    cluster: 'Culture',
    definition: 'Not original; based on or copied from something else. Lacking freshness, innovation, or creative independence.',
    exercise: {
      question: 'Why might a work be criticized as derivative?',
      options: [
        { id: 'A', text: 'Because it builds on established traditions in a respectful way' },
        { id: 'B', text: 'Because it copies or closely imitates another work without adding original insight' },
        { id: 'C', text: 'Because it takes inspiration from multiple sources' }
      ],
      correctAnswer: 'B',
      explanation: 'Derivative work is criticized for being copied or imitative without bringing something genuinely new—it lacks originality.'
    },
    anchor: {
      prompt: 'What work did you find derivative? What made it feel unoriginal?',
      categories: ['Art', 'Creativity', 'Criticism', 'Culture'],
      examples: {
        Art: 'The painting was dismissed as derivative, echoing styles seen countless times before.',
        Creativity: 'Her approach felt derivative, lacking the spark of true innovation.',
        Criticism: 'Critics called the novel derivative because it borrowed too heavily from earlier works.',
        Culture: 'In pop culture, derivative trends often fade quickly as audiences crave originality.'
      }
    }
  },

  {
    word: 'didactic',
    cluster: 'Culture',
    definition: 'Intended to teach or instruct, often in a preachy or moralistic way. Educational but potentially heavy-handed with its message.',
    exercise: {
      question: 'Which is most didactic?',
      options: [
        { id: 'A', text: 'A story that subtly explores a moral theme through character experience' },
        { id: 'B', text: 'A children\'s book that explicitly teaches "the lesson is: always share with others"' },
        { id: 'C', text: 'A novel that explores ambiguous ethical questions' }
      ],
      correctAnswer: 'B',
      explanation: 'Didactic works directly teach a lesson or moral—the educational goal is explicit and sometimes feels imposed.'
    },
    anchor: {
      prompt: 'When has didactic storytelling felt heavy-handed to you? When has it worked well?',
      categories: ['Teaching', 'Art', 'Literature', 'Learning'],
      examples: {
        'Teaching': 'Didactic teaching makes lessons clear but can feel rigid.',
        'Art': 'Art becomes didactic when it puts the message above the experience.',
        'Literature': 'Didactic literature spells out its moral for the reader.',
        'Learning': 'Learning can be stifled if the approach is too didactic.'
      }
    }
  },

  {
    word: 'parochial',
    cluster: 'Culture',
    definition: 'Limited in scope or outlook; narrow-minded and provincial. Concerned with local or sectarian interests rather than broader perspectives.',
    exercise: {
      question: 'Which viewpoint is parochial?',
      options: [
        { id: 'A', text: 'Understanding multiple cultures and considering global perspectives' },
        { id: 'B', text: '"Our town\'s way is the only right way; everywhere else is wrong"' },
        { id: 'C', text: 'Appreciating local traditions while respecting others\' differences' }
      ],
      correctAnswer: 'B',
      explanation: 'Parochial means narrow and provincial—focused only on one\'s own group or locality without regard for broader contexts.'
    },
    anchor: {
      prompt: 'When have you encountered parochial thinking? How do you balance local pride with openness?',
      categories: ['Culture', 'Travel', 'Perspective', 'Bias']
    }
  },

  {
    word: 'quotidian',
    cluster: 'Culture',
    definition: 'Daily or occurring every day; ordinary, commonplace, mundane. The everyday details of life that often go unnoticed.',
    exercise: {
      question: 'Which best describes quotidian experience?',
      options: [
        { id: 'A', text: 'Winning a lottery or traveling to exotic places' },
        { id: 'B', text: 'Making breakfast, commuting, doing chores—the routine of ordinary days' },
        { id: 'C', text: 'Major life-changing events' }
      ],
      correctAnswer: 'B',
      explanation: 'Quotidian refers to daily, ordinary life—the small, repeated rituals and mundane details that structure everyday existence.'
    },
    anchor: {
      prompt: 'What quotidian ritual or detail creates comfort or meaning for you?',
      categories: ['Routine', 'Meaning', 'Culture', 'Mindfulness'],
      examples: {
        Routine: 'Brushing my teeth is a quotidian act that starts and ends my day.',
        Meaning: 'A quotidian walk with my dog brings unexpected joy and reflection.',
        Culture: 'In every culture, quotidian customs shape the rhythm of daily life.',
        Mindfulness: 'By noticing the beauty in quotidian moments, I practice mindfulness each morning.'
      }
    }
  },

  // NUANCE TRAPS CLUSTER
  {
    word: 'ambivalent',
    cluster: 'Nuance Traps',
    definition: 'Feeling mixed or contradictory emotions simultaneously; having genuine internal conflict about something.',
    exercise: {
      question: 'Which describes true ambivalence?',
      options: [
        { id: 'A', text: 'Not caring one way or the other' },
        { id: 'B', text: 'Feeling both excited and terrified about a new opportunity at the same time' },
        { id: 'C', text: 'Having a clear preference' }
      ],
      correctAnswer: 'B',
      explanation: 'Ambivalence is not indifference—it\'s feeling genuinely conflicted, with two opposing emotions or desires pulling simultaneously.'
    },
    anchor: {
      prompt: 'What decision or situation have you felt ambivalent about?',
      categories: ['Emotion', 'Decision Making', 'Relationships', 'Growth']
    }
  },

  {
    word: 'nonplussed',
    cluster: 'Nuance Traps',
    definition: 'Surprised and confused; caught completely off-guard. Often confused with "unfazed" which means the opposite.',
    exercise: {
      question: 'If someone is nonplussed, they are most likely to feel:',
      options: [
        { id: 'A', text: 'Calm and unbothered' },
        { id: 'B', text: 'Confused and taken aback by surprise' },
        { id: 'C', text: 'Indifferent and unaffected' }
      ],
      correctAnswer: 'B',
      explanation: 'Nonplussed means confused and unsettled by surprise. The opposite—unfazed—means unbothered. This trap catches many people!'
    },
    anchor: {
      prompt: 'When were you last truly nonplussed by something unexpected?',
      categories: ['Surprise', 'Emotion', 'Reaction', 'Language']
    }
  },

  {
    word: 'ostensible',
    cluster: 'Nuance Traps',
    definition: 'Appearing to be true on the surface, but possibly concealing the real reason or truth. The stated reason, not the actual one.',
    exercise: {
      question: 'What is "ostensible" most likely to hide?',
      options: [
        { id: 'A', text: 'Something obvious and straightforward' },
        { id: 'B', text: 'The actual truth or real motivation behind an apparent reason' },
        { id: 'C', text: 'Something permanent and unchanging' }
      ],
      correctAnswer: 'B',
      explanation: 'Ostensible means the stated or surface reason may be misleading—real motivations often hide behind ostensible explanations.'
    },
    anchor: {
      prompt: 'When have you discovered the real reason behind someone\'s ostensible excuse?',
      categories: ['Truth', 'Deception', 'Relationships', 'Insight'],
      examples: {
        Truth: 'The truth was hidden behind an ostensible explanation.',
        Deception: 'Ostensible motives can be a form of deception.',
        Relationships: 'In relationships, ostensible reasons may mask deeper feelings.',
        Insight: 'Insight revealed the ostensible excuse was not the real reason.'
      }
    }
  },

  {
    word: 'invidious',
    cluster: 'Nuance Traps',
    definition: 'Calculated to create resentment or offense; unfairly discriminatory or offensive in comparison.',
    exercise: {
      question: 'Which comparison would be considered invidious?',
      options: [
        { id: 'A', text: 'Saying "Both A and B are good choices"' },
        { id: 'B', text: 'Saying "People from this group are naturally smarter than people from that group"' },
        { id: 'C', text: 'Observing neutral differences between things' }
      ],
      correctAnswer: 'B',
      explanation: 'Invidious comparisons breed resentment through unfair, discriminatory claims that demean one group over another.'
    },
    anchor: {
      prompt: 'What invidious comparison have you heard that felt unjust?',
      categories: ['Fairness', 'Bias', 'Social Justice', 'Ethics'],
      examples: {
        Fairness: 'Invidious remarks undermine fairness in any group.',
        Bias: 'Bias is often revealed through invidious comparisons.',
        'Social Justice': 'Social justice seeks to address invidious discrimination.',
        Ethics: 'Ethics demand we avoid making invidious judgments.'
      }
    }
  },

  {
    word: 'equivocal',
    cluster: 'Nuance Traps',
    definition: 'Open to more than one interpretation; ambiguous or deliberately evasive in meaning.',
    exercise: {
      question: 'What makes a statement equivocal?',
      options: [
        { id: 'A', text: 'It is absolutely clear and unambiguous' },
        { id: 'B', text: 'It can be interpreted in multiple ways or appears deliberately unclear' },
        { id: 'C', text: 'It is factually proven' }
      ],
      correctAnswer: 'B',
      explanation: 'Equivocal statements are ambiguous or open to interpretation—they may be deliberately unclear to avoid commitment.'
    },
    anchor: {
      prompt: 'When has an equivocal answer frustrated you? When have you given one?',
      categories: ['Communication', 'Ambiguity', 'Honesty', 'Language'],
      examples: {
        'Communication': 'Equivocal communication leaves room for multiple interpretations.',
        'Ambiguity': 'Ambiguity often results from an equivocal statement.',
        'Honesty': 'An equivocal answer can hide the truth or avoid commitment.',
        'Language': 'Language is powerful when it’s clear, but equivocal words can confuse.'
      }
    }
  },

  {
    word: 'perfunctory',
    cluster: 'Nuance Traps',
    definition: 'Done routinely without genuine interest, care, or attention. Going through the motions without real engagement.',
    exercise: {
      question: 'Which action would be described as perfunctory?',
      options: [
        { id: 'A', text: 'Listening deeply to a friend\'s problem with genuine interest' },
        { id: 'B', text: 'Nodding along and saying "mm-hmm" while scrolling your phone, clearly not engaged' },
        { id: 'C', text: 'Thoughtfully considering someone\'s perspective' }
      ],
      correctAnswer: 'B',
      explanation: 'Perfunctory actions lack genuine care or attention—they\'re surface-level, routine, and clearly disengaged.'
    },
    anchor: {
      prompt: 'When have you given a perfunctory response? When has someone done that to you?',
      categories: ['Attention', 'Respect', 'Connection', 'Authenticity'],
      examples: {
        Attention: 'A perfunctory glance shows little real attention.',
        Respect: 'Perfunctory greetings can feel disrespectful.',
        Connection: 'A perfunctory reply weakens genuine connection.',
        Authenticity: 'Authenticity is lost in perfunctory interactions.'
      }
    }
  },

  {
    word: 'oblique',
    cluster: 'Nuance Traps',
    definition: 'Indirect, slanting, or evasive; not straightforward or direct. Can refer to angles, indirect approaches, or indirect references.',
    exercise: {
      question: 'Which is an oblique approach?',
      options: [
        { id: 'A', text: 'Directly stating "I disagree with your idea"' },
        { id: 'B', text: 'Hinting that you doubt the idea without clearly saying why, hoping they\'ll pick up on it' },
        { id: 'C', text: 'Explicitly explaining your concerns' }
      ],
      correctAnswer: 'B',
      explanation: 'Oblique means indirect—hinting rather than stating directly, approaching from an angle rather than head-on.'
    },
    anchor: {
      prompt: 'When have you resorted to oblique hints instead of being direct? Why?',
      categories: ['Communication', 'Directness', 'Relationships', 'Courage']
    }
  },

  {
    word: 'incidental',
    cluster: 'Nuance Traps',
    definition: 'Occurring by chance or as a minor consequence; not essential or central. Secondary rather than primary.',
    exercise: {
      question: 'Which is incidental rather than central?',
      options: [
        { id: 'A', text: 'The main plot of a story' },
        { id: 'B', text: 'A minor detail that happens to come up but doesn\'t affect the main point' },
        { id: 'C', text: 'The core argument of an article' }
      ],
      correctAnswer: 'B',
      explanation: 'Incidental means secondary or minor—not part of the main point, just something that happens to occur.'
    },
    anchor: {
      prompt: 'What incidental discovery or detail changed your perspective on something?',
      categories: ['Chance', 'Discovery', 'Perspective', 'Attention'],
      examples: {
        Chance: 'Incidental meetings can lead to unexpected opportunities.',
        Discovery: 'An incidental discovery changed the course of my research.',
        Perspective: 'Incidental details sometimes shift your perspective.',
        Attention: 'Paying attention to the incidental can reveal hidden patterns.'
      }
    }
  },

  {
    word: 'consequential',
    cluster: 'Nuance Traps',
    definition: 'Important and having significant effects or consequences. Also can mean pompous or self-important in bearing.',
    exercise: {
      question: 'Which scenario shows something truly consequential?',
      options: [
        { id: 'A', text: 'A minor comment that offended no one' },
        { id: 'B', text: 'A decision that significantly altered the course of events for many people' },
        { id: 'C', text: 'A trivial detail nobody remembers' }
      ],
      correctAnswer: 'B',
      explanation: 'Consequential means having significant importance or impact—not trivial, but genuinely important.'
    },
    anchor: {
      prompt: 'What consequential moment or decision shaped your life?',
      categories: ['Impact', 'Importance', 'Choice', 'Life Direction']
    }
  },

  {
    word: 'speculative',
    cluster: 'Nuance Traps',
    definition: 'Based on guesswork or conjecture rather than facts; unproven. Also refers to risky business ventures seeking high potential returns.',
    exercise: {
      question: 'Which is most speculative?',
      options: [
        { id: 'A', text: 'A carefully researched conclusion based on evidence' },
        { id: 'B', text: '"I think this might happen, but I\'m just guessing—I don\'t really know"' },
        { id: 'C', text: 'A proven scientific fact' }
      ],
      correctAnswer: 'B',
      explanation: 'Speculative means based on conjecture or guesswork, not facts—it\'s uncertain and unproven.'
    },
    anchor: {
      prompt: 'When have you had to make a decision based on speculative thinking?',
      categories: ['Uncertainty', 'Decision Making', 'Risk', 'Intuition']
    }
  },

  // PRECISION CLUSTER
  {
    word: 'broach',
    cluster: 'Precision',
    definition: 'To bring up a topic for discussion, especially one that is difficult or sensitive. To open or introduce a subject.',
    exercise: {
      question: 'Which situation requires you to broach a topic?',
      options: [
        { id: 'A', text: 'A casual conversation about the weather' },
        { id: 'B', text: 'Carefully introducing a difficult subject like "We need to talk about your spending habits"' },
        { id: 'C', text: 'Discussing something both parties already know and agree about' }
      ],
      correctAnswer: 'B',
      explanation: 'Broach means to bring up a difficult or sensitive topic—to open a conversation that takes courage or care.'
    },
    anchor: {
      prompt: 'What difficult topic have you had to broach? How did you approach it?',
      categories: ['Communication', 'Courage', 'Relationships', 'Honesty']
    }
  },

  {
    word: 'impugn',
    cluster: 'Precision',
    definition: 'To challenge or attack the validity or integrity of something; to question or dispute skeptically.',
    exercise: {
      question: 'What does it mean to impugn someone\'s motives?',
      options: [
        { id: 'A', text: 'To assume their motives are good' },
        { id: 'B', text: 'To question or challenge whether their stated reasons are true or honest' },
        { id: 'C', text: 'To support their decisions' }
      ],
      correctAnswer: 'B',
      explanation: 'Impugn means to attack or challenge the validity or integrity—to cast doubt on whether something is true or legitimate.'
    },
    anchor: {
      prompt: 'When have you felt your motives or integrity impugned? How did it feel?',
      categories: ['Trust', 'Criticism', 'Integrity', 'Conflict'],
      examples: {
        Trust: 'It hurts when others impugn your trustworthiness without cause.',
        Criticism: 'The review seemed to impugn my work rather than offer helpful feedback.',
        Integrity: 'She refused to let anyone impugn her integrity during the investigation.',
        Conflict: 'In heated conflict, people sometimes impugn each other’s motives.'
      }
    }
  },

  {
    word: 'corroborate',
    cluster: 'Precision',
    definition: 'To confirm or support with additional evidence; to verify or substantiate a claim or statement.',
    exercise: {
      question: 'Which best shows corroboration?',
      options: [
        { id: 'A', text: 'One person\'s account of an event' },
        { id: 'B', text: 'Multiple independent witnesses confirming the same details of what happened' },
        { id: 'C', text: 'A rumor repeated many times' }
      ],
      correctAnswer: 'B',
      explanation: 'Corroborate means independent verification or support—when multiple sources confirm the same thing, they corroborate each other.'
    },
    anchor: {
      prompt: 'When has someone corroborated your experience or belief? How did that feel?',
      categories: ['Validation', 'Truth', 'Evidence', 'Support']
    }
  },

  {
    word: 'repudiate',
    cluster: 'Precision',
    definition: 'To reject, disown, or refuse to accept or be associated with something. To deny or refuse responsibility.',
    exercise: {
      question: 'Which action is repudiating something?',
      options: [
        { id: 'A', text: 'Continuing to support an old belief' },
        { id: 'B', text: 'Publicly stating "I no longer believe that" and distancing yourself from it' },
        { id: 'C', text: 'Quietly thinking it over' }
      ],
      correctAnswer: 'B',
      explanation: 'Repudiate means to actively reject or disown—to publicly distance yourself from something you no longer accept.'
    },
    anchor: {
      prompt: 'What belief or behavior have you repudiated as you\'ve grown?',
      categories: ['Growth', 'Change', 'Values', 'Identity']
    }
  },

  {
    word: 'attenuate',
    cluster: 'Precision',
    definition: 'To make thin, weak, or less intense; to reduce in force or effect over time.',
    exercise: {
      question: 'Which is an example of something being attenuated?',
      options: [
        { id: 'A', text: 'A signal growing stronger as it travels' },
        { id: 'B', text: 'Grief that gradually fades and loses its intensity over years' },
        { id: 'C', text: 'An impact hitting with full force' }
      ],
      correctAnswer: 'B',
      explanation: 'Attenuate means to weaken or reduce over time—like a signal fading or pain lessening gradually.'
    },
    anchor: {
      prompt: 'What strong feeling or situation has been attenuated by time?',
      categories: ['Time', 'Emotion', 'Healing', 'Perspective'],
      examples: {
        'Time': 'The effects of a mistake can attenuate with time.',
        'Emotion': 'Intense emotions often attenuate as circumstances change.',
        'Healing': 'Therapy can attenuate the pain of past trauma.',
        'Perspective': 'Distance helps attenuate the impact of old conflicts.'
      }
    }
  },

  {
    word: 'circumscribe',
    cluster: 'Precision',
    definition: 'To restrict within limits; to confine, bound, or set boundaries for something.',
    exercise: {
      question: 'Which describes being circumscribed?',
      options: [
        { id: 'A', text: 'Having unlimited freedom and options' },
        { id: 'B', text: 'Having your options limited by rules, resources, or circumstances' },
        { id: 'C', text: 'Being able to do whatever you want' }
      ],
      correctAnswer: 'B',
      explanation: 'Circumscribe means to draw a line around or set limits—your options are bounded or confined within certain parameters.'
    },
    anchor: {
      prompt: 'What circumstance has circumscribed your choices? How did you work within those limits?',
      categories: ['Constraint', 'Creativity', 'Boundaries', 'Adaptation'],
      examples: {
        Constraint: 'Strict rules circumscribe what is possible in this competition.',
        Creativity: 'Sometimes, being circumscribed by time sparks creative solutions.',
        Boundaries: 'The project was circumscribed by clear boundaries set at the start.',
        Adaptation: 'I learned to adapt when my options were circumscribed by circumstance.'
      }
    }
  },

  {
    word: 'elide',
    cluster: 'Precision',
    definition: 'To omit or leave out; to skip over or pass over in silence, often intentionally.',
    exercise: {
      question: 'What does it mean to elide something in a conversation?',
      options: [
        { id: 'A', text: 'To emphasize and repeat it' },
        { id: 'B', text: 'To deliberately skip over or avoid mentioning it' },
        { id: 'C', text: 'To discuss it in detail' }
      ],
      correctAnswer: 'B',
      explanation: 'Elide means to leave out or skip over—often intentionally ignoring a detail or topic rather than addressing it directly.'
    },
    anchor: {
      prompt: 'What topic have you chosen to elide in conversation? Why?',
      categories: ['Communication', 'Honesty', 'Avoidance', 'Tact']
    }
  },

  {
    word: 'undermine',
    cluster: 'Precision',
    definition: 'To weaken or erode the foundation, authority, or effectiveness of something—often gradually or subtly.',
    exercise: {
      question: 'Which behavior most undermines a team decision?',
      options: [
        { id: 'A', text: 'Offering constructive feedback to improve the plan' },
        { id: 'B', text: 'Quietly spreading doubt and eroding support without proposing alternatives' },
        { id: 'C', text: 'Implementing the agreed plan with confidence' }
      ],
      correctAnswer: 'B',
      explanation: 'Undermine means to weaken or erode something—often subtly and over time—such as trust or support.'
    },
    anchor: {
      prompt: 'When have you felt your work or authority undermined? What did you do?',
      categories: ['Trust', 'Power', 'Team Dynamics', 'Integrity']
    }
  },

  {
    word: 'resolve',
    cluster: 'Precision',
    definition: 'To settle or find a solution to a problem; also to decide firmly with determination.',
    exercise: {
      question: 'Which action best resolves a conflict?',
      options: [
        { id: 'A', text: 'Ignoring the issue and hoping it goes away' },
        { id: 'B', text: 'Listening to both sides and agreeing on a clear course of action' },
        { id: 'C', text: 'Escalating blame without proposing solutions' }
      ],
      correctAnswer: 'B',
      explanation: 'Resolve means to settle or decide—reaching a clear solution or firm decision that addresses the conflict.'
    },
    anchor: {
      prompt: 'What tough issue have you resolved recently? What made the resolution stick?',
      categories: ['Decision Making', 'Conflict', 'Clarity', 'Follow-through'],
      examples: {
        'Decision Making': 'I resolve to act after weighing all the options carefully.',
        'Conflict': 'We worked together to resolve the disagreement peacefully.',
        'Clarity': 'A clear plan can resolve confusion before it grows.',
        'Follow-through': 'Resolve is needed to follow through on tough commitments.'
      }
    }
  },

  {
    word: 'highlight',
    cluster: 'Precision',
    definition: 'To emphasize or draw attention to something so it stands out clearly.',
    exercise: {
      question: 'Which best highlights a critical risk in a report?',
      options: [
        { id: 'A', text: 'Burying it in an appendix' },
        { id: 'B', text: 'Placing it prominently at the top with clear examples and implications' },
        { id: 'C', text: 'Omitting it to keep the report brief' }
      ],
      correctAnswer: 'B',
      explanation: 'Highlight means to emphasize—to make something more visible and easy to notice and understand.'
    },
    anchor: {
      prompt: 'What do you need to highlight for your team right now? Why?',
      categories: ['Communication', 'Visibility', 'Leadership', 'Priorities'],
      examples: {
        Communication: 'I highlight key points to ensure everyone understands the message.',
        Visibility: 'Highlighting achievements increases visibility for the whole team.',
        Leadership: 'A good leader knows when to highlight the efforts of others.',
        Priorities: 'It is important to highlight our top priorities during busy times.'
      }
    }
  },

  {
    word: 'indicate',
    cluster: 'Precision',
    definition: 'To point out, show, or suggest something; to signal or give evidence of.',
    exercise: {
      question: 'Which best indicates the system is overheating?',
      options: [
        { id: 'A', text: 'Temperature readings show the normal range' },
        { id: 'B', text: 'A warning light and elevated temperature readings appear' },
        { id: 'C', text: 'No data is available' }
      ],
      correctAnswer: 'B',
      explanation: 'Indicate means to signal or show—evidence or signs point toward a condition or conclusion.'
    },
    anchor: {
      prompt: 'What signals indicate it’s time to change course in your work?',
      categories: ['Signals', 'Awareness', 'Strategy', 'Evidence'],
      examples: {
        Signals: 'A sudden drop in sales may indicate a problem with our product.',
        Awareness: 'My awareness of stress can indicate when I need a break.',
        Strategy: 'Changing market trends indicate it’s time to adjust our strategy.',
        Evidence: 'Clear evidence is needed to indicate a real improvement.'
      }
    }
  },

  {
    word: 'justify',
    cluster: 'Precision',
    definition: 'To show adequate reason for; to defend as right or reasonable with arguments or evidence.',
    exercise: {
      question: 'What does it mean to justify a decision to stakeholders?',
      options: [
        { id: 'A', text: 'Choose without explanation or rationale' },
        { id: 'B', text: 'Provide clear reasoning and evidence that supports the choice' },
        { id: 'C', text: 'Copy what another team did without context' }
      ],
      correctAnswer: 'B',
      explanation: 'Justify means to give reasons and evidence—defending a choice as reasonable and well supported.'
    },
    anchor: {
      prompt: 'When have you had to justify a tough choice? How did you frame your reasoning?',
      categories: ['Accountability', 'Reasoning', 'Stakeholders', 'Values']
    }
  },

  // ADJECTIVES CLUSTER
  {
    word: 'latent',
    cluster: 'Adjectives',
    definition: 'Present but not visible or developed; lying dormant and capable of becoming active. Hidden potential waiting to emerge.',
    exercise: {
      question: 'Which best illustrates something latent?',
      options: [
        { id: 'A', text: 'A skill you actively practice every day' },
        { id: 'B', text: 'An ability you have but haven\'t yet developed or revealed—lying dormant inside you' },
        { id: 'C', text: 'Something that has already fully developed' }
      ],
      correctAnswer: 'B',
      explanation: 'Latent means hidden or dormant—present but not yet visible or active. It\'s potential waiting to be activated.'
    },
    anchor: {
      prompt: 'What latent potential do you sense in yourself? What would awaken it?',
      categories: ['Growth', 'Potential', 'Self-Discovery', 'Dreams'],
      examples: {
        'Growth': 'Growth can remain latent until new challenges arise.',
        'Potential': 'You might not notice your potential is latent until the right moment.',
        'Self-Discovery': 'Through self-discovery, a hidden talent may prove to be latent.',
        'Dreams': 'Some dreams stay hidden, their latent power waiting to emerge.'
      }
    }
  },

  {
    word: 'contingent',
    cluster: 'Adjectives',
    definition: 'Dependent on or conditioned by something else; uncertain until certain conditions are met.',
    exercise: {
      question: 'Which describes a contingent plan?',
      options: [
        { id: 'A', text: 'A plan that is certain regardless of circumstances' },
        { id: 'B', text: 'A plan that depends on whether certain conditions happen or not' },
        { id: 'C', text: 'A plan that is already completed' }
      ],
      correctAnswer: 'B',
      explanation: 'Contingent means dependent on conditions—your plan might happen "contingent on" good weather, funding, or other factors.'
    },
    anchor: {
      prompt: 'What major decision are you making contingent on other factors?',
      categories: ['Planning', 'Uncertainty', 'Decision Making', 'Future'],
      examples: {
        'Planning': 'Our trip is contingent on the weather forecast.',
        'Uncertainty': 'There’s uncertainty because the outcome is contingent on funding.',
        'Decision Making': 'My next step is contingent on the results of this meeting.',
        'Future': 'The project’s future is contingent on market demand.'
      }
    }
  },

  {
    word: 'inchoate',
    cluster: 'Adjectives',
    definition: 'Just begun or recently started; not yet fully formed, developed, or organized. Barely started and still taking shape.',
    exercise: {
      question: 'Which describes something inchoate?',
      options: [
        { id: 'A', text: 'A fully developed and refined idea' },
        { id: 'B', text: 'A rough, barely-formed idea that\'s just beginning to take shape' },
        { id: 'C', text: 'Something finished and complete' }
      ],
      correctAnswer: 'B',
      explanation: 'Inchoate means just begun and not yet fully formed—like an embryonic idea or project in its earliest stages.'
    },
    anchor: {
      prompt: 'What inchoate dream or project are you nurturing? What would help it develop?',
      categories: ['Creativity', 'Growth', 'Beginning', 'Development'],
      examples: {
        'Creativity': 'An inchoate idea can spark creativity before it’s fully formed.',
        'Growth': 'Growth often starts in an inchoate stage, fragile and new.',
        'Beginning': 'Every beginning is inchoate—uncertain and unshaped.',
        'Development': 'Inchoate plans need nurturing to reach full development.'
      }
    }
  },

  {
    word: 'intractable',
    cluster: 'Adjectives',
    definition: 'Difficult or impossible to manage, control, or solve; stubbornly resistant to change or treatment.',
    exercise: {
      question: 'Which situation is intractable?',
      options: [
        { id: 'A', text: 'A problem that has a clear solution if you think about it' },
        { id: 'B', text: 'A stubborn problem that resists all attempts to solve it, seeming impossible to manage' },
        { id: 'C', text: 'A situation that\'s easy to fix' }
      ],
      correctAnswer: 'B',
      explanation: 'Intractable means stubbornly difficult—seemingly impossible to solve or manage despite efforts to address it.'
    },
    anchor: {
      prompt: 'What intractable challenge have you faced? How did you live with it?',
      categories: ['Resilience', 'Acceptance', 'Problem Solving', 'Patience'],
      examples: {
        'Resilience': 'When intractable realities demand resilience beyond quick fixes',
        'Acceptance': 'When you accept it as intractable and let go of control',
        'Problem Solving': 'When an intractable bottleneck forces you to reframe the approach',
        'Patience': 'When steady patience outlasts a problem that remains intractable'
      }
    }
  },

  {
    word: 'exigent',
    cluster: 'Adjectives',
    definition: 'Requiring immediate action or attention; demanding, urgent, and pressing.',
    exercise: {
      question: 'Which describes an exigent situation?',
      options: [
        { id: 'A', text: 'Something you can handle whenever you have time' },
        { id: 'B', text: 'An urgent matter demanding immediate attention and action' },
        { id: 'C', text: 'Something that can wait indefinitely' }
      ],
      correctAnswer: 'B',
      explanation: 'Exigent means urgent and demanding—it requires immediate attention; the circumstances are pressing and can\'t wait.'
    },
    anchor: {
      prompt: 'When have you faced exigent circumstances? How did you prioritize?',
      categories: ['Urgency', 'Crisis', 'Decision Making', 'Leadership'],
      examples: {
        'Urgency': 'Exigent needs require urgent action and focus.',
        'Crisis': 'In a crisis, exigent problems can’t be ignored.',
        'Decision Making': 'Exigent situations force quick decision making.',
        'Leadership': 'Leadership is tested by how one handles exigent demands.'
      }
    }
  },

  {
    word: 'nebulous',
    cluster: 'Adjectives',
    definition: 'Unclear, vague, or ill-defined; not clearly stated or easily understood. Cloudy and lacking clear form.',
    exercise: {
      question: 'Which describes a nebulous idea?',
      options: [
        { id: 'A', text: 'A clear, well-defined concept everyone understands' },
        { id: 'B', text: 'A vague, unclear idea that\'s hard to pin down or understand precisely' },
        { id: 'C', text: 'A concrete, measurable objective' }
      ],
      correctAnswer: 'B',
      explanation: 'Nebulous means vague and unclear—like a cloud, it lacks solid form and is difficult to grasp or define precisely.'
    },
    anchor: {
      prompt: 'What nebulous feeling or idea have you struggled to articulate?',
      categories: ['Communication', 'Clarity', 'Emotion', 'Understanding']
    }
  },

  {
    word: 'opaque',
    cluster: 'Adjectives',
    definition: 'Not transparent or translucent. Figuratively: hard to understand or see through; deliberately obscure.',
    exercise: {
      question: 'When would something be described as opaque?',
      options: [
        { id: 'A', text: 'When it\'s clear and easy to see through' },
        { id: 'B', text: 'When its meaning is deliberately hidden or very difficult to understand' },
        { id: 'C', text: 'When it\'s transparent and obvious' }
      ],
      correctAnswer: 'B',
      explanation: 'Opaque means hard to see through or understand—whether literally (blocked light) or figuratively (obscured meaning).'
    },
    anchor: {
      prompt: 'When has someone\'s motivation or intention felt opaque to you? What did you do?',
      categories: ['Understanding', 'Trust', 'Communication', 'Clarity']
    }
  },

  // TRADE-OFF (Work)
  {
    word: 'trade-off',
    cluster: 'Work',
    definition: 'A balance achieved between two desirable but incompatible features; a compromise involving giving up one thing in return for another. Core to strategic decision-making.',
    exercise: {
      question: 'Which scenario demonstrates a meaningful trade-off?',
      options: [
        { id: 'A', text: 'Getting everything you want without any concessions' },
        { id: 'B', text: 'Choosing faster delivery at higher cost, accepting expense for speed' },
        { id: 'C', text: 'Making a decision without considering alternatives' }
      ],
      correctAnswer: 'B',
      explanation: 'A trade-off requires consciously sacrificing one benefit to gain another—balancing competing priorities.'
    },
    anchor: {
      prompt: 'What significant trade-off have you made in your career or studies? What did you gain and give up?',
      categories: ['Career', 'Decision Making', 'Priorities', 'Strategy']
    }
  },

  // FALSIFIABLE (School)
  {
    word: 'falsifiable',
    cluster: 'School',
    definition: 'Capable of being proven false through empirical testing or observation. A core principle of scientific method; a claim must be testable to be scientific.',
    exercise: {
      question: 'Which statement is falsifiable?',
      options: [
        { id: 'A', text: 'Ghosts exist but cannot be detected by any means' },
        { id: 'B', text: 'Increasing study time by 10 hours per week will improve test scores' },
        { id: 'C', text: 'Life has meaning beyond what we can measure' }
      ],
      correctAnswer: 'B',
      explanation: 'Falsifiable claims can be tested and potentially disproven with evidence—B can be tested empirically.'
    },
    anchor: {
      prompt: 'What belief do you hold that could be proven wrong? How would you react if it were?',
      categories: ['Critical Thinking', 'Science', 'Beliefs', 'Learning'],
      examples: {
        'Critical Thinking': 'A falsifiable claim can be challenged and tested through evidence.',
        'Science': 'Scientific theories must be falsifiable to be considered valid.',
        'Beliefs': 'Not all beliefs are falsifiable, making them hard to disprove.',
        'Learning': 'Learning what is falsifiable sharpens critical thinking.'
      }
    }
  },

  // CANDID (Daily Life)
  {
    word: 'candid',
    cluster: 'Daily Life',
    definition: 'Truthful and straightforward; frank and sincere without evasion or pretense. Openness that builds trust through honest communication.',
    exercise: {
      question: 'When is candid communication most valuable?',
      options: [
        { id: 'A', text: 'Avoiding difficult topics to keep the peace' },
        { id: 'B', text: 'Providing honest feedback to help someone improve' },
        { id: 'C', text: 'Saying whatever comes to mind without considering impact' }
      ],
      correctAnswer: 'B',
      explanation: 'Candid means truthful and direct—it builds trust while still respecting others, unlike bluntness.'
    },
    anchor: {
      prompt: 'When has someone\'s candid feedback changed your perspective or behavior?',
      categories: ['Communication', 'Growth', 'Relationships', 'Honesty']
    }
  },

  // RESILIENT (Daily Life)
  {
    word: 'resilient',
    cluster: 'Daily Life',
    definition: 'Able to withstand or recover quickly from difficult conditions or setbacks. The capacity to bounce back and adapt in the face of adversity.',
    exercise: {
      question: 'What best demonstrates resilience?',
      options: [
        { id: 'A', text: 'Never experiencing failure or difficulty' },
        { id: 'B', text: 'Recovering from a major setback and trying a new approach' },
        { id: 'C', text: 'Avoiding challenges to prevent disappointment' }
      ],
      correctAnswer: 'B',
      explanation: 'Resilience is shown through recovery and adaptation after setbacks, not through avoiding them.'
    },
    anchor: {
      prompt: 'Describe a time when you bounced back from a setback. What helped you recover?',
      categories: ['Challenge', 'Growth', 'Strength', 'Adaptation']
    }
  },

  // FORTHRIGHT (Daily Life)
  {
    word: 'forthright',
    cluster: 'Daily Life',
    definition: 'Direct and outspoken; expressing thoughts or feelings clearly without hesitation. Combines honesty with confidence in communication.',
    exercise: {
      question: 'Which response is forthright?',
      options: [
        { id: 'A', text: 'Hinting indirectly at what you want' },
        { id: 'B', text: 'Clearly stating your position: "I disagree with this approach because..."' },
        { id: 'C', text: 'Agreeing publicly but complaining privately' }
      ],
      correctAnswer: 'B',
      explanation: 'Forthright communication is direct and clear, stating your position without evasion or hedging.'
    },
    anchor: {
      prompt: 'When did being forthright improve a situation? When might it have caused difficulty?',
      categories: ['Communication', 'Honesty', 'Courage', 'Leadership']
    }
  },

  // DISCERN (Daily Life)
  {
    word: 'discern',
    cluster: 'Daily Life',
    definition: 'To perceive or recognize something with careful attention or judgment. To detect subtle differences or underlying truths through keen observation.',
    exercise: {
      question: 'What does it mean to discern someone\'s true intentions?',
      options: [
        { id: 'A', text: 'Make quick assumptions based on first impressions' },
        { id: 'B', text: 'Carefully observe patterns and inconsistencies to understand their motives' },
        { id: 'C', text: 'Trust whatever they say at face value' }
      ],
      correctAnswer: 'B',
      explanation: 'Discerning requires careful judgment and attention to subtle cues, not surface-level observation.'
    },
    anchor: {
      prompt: 'When have you discerned something important that others missed? How did you notice it?',
      categories: ['Observation', 'Judgment', 'Insight', 'Understanding'],
      examples: {
        'Observation': 'Careful observation helps you discern subtle changes.',
        'Judgment': 'It takes sound judgment to discern truth from deception.',
        'Insight': 'Insightful people discern patterns others overlook.',
        'Understanding': 'To discern meaning requires deep understanding.'
      }
    }
  },

  // ZEITGEIST (Culture)
  {
    word: 'Zeitgeist',
    cluster: 'Culture',
    definition: 'The defining spirit, mood, or general intellectual and moral climate of an era. The characteristic worldview and values of a particular period in history.',
    exercise: {
      question: 'Which captures the concept of Zeitgeist?',
      options: [
        { id: 'A', text: 'Individual preferences and tastes' },
        { id: 'B', text: 'The shared optimism and tech-utopianism defining the late 1990s dot-com era' },
        { id: 'C', text: 'Timeless values that never change' }
      ],
      correctAnswer: 'B',
      explanation: 'Zeitgeist is the collective spirit of an age—the prevailing attitudes and assumptions of a specific time.'
    },
    anchor: {
      prompt: 'What do you think defines the Zeitgeist of our current era?',
      categories: ['Culture', 'Society', 'History', 'Values'],
      examples: {
        'Culture': 'Art and music often reflect the Zeitgeist of their time.',
        'Society': 'Social movements can shape the Zeitgeist of a generation.',
        'History': 'Each era’s Zeitgeist is recorded in its history.',
        'Values': 'Changing values signal a shift in the Zeitgeist.'
      }
    }
  },

  // DOGMA (Culture)
  {
    word: 'dogma',
    cluster: 'Culture',
    definition: 'A principle or set of principles laid down by an authority as incontrovertibly true. Beliefs accepted without question or critical examination.',
    exercise: {
      question: 'Which statement describes dogma?',
      options: [
        { id: 'A', text: 'Ideas tested and refined through debate' },
        { id: 'B', text: 'Beliefs accepted as absolute truth without room for questioning' },
        { id: 'C', text: 'Flexible principles adapted to new evidence' }
      ],
      correctAnswer: 'B',
      explanation: 'Dogma is characterized by unquestioning acceptance and resistance to challenge or revision.'
    },
    anchor: {
      prompt: 'What belief or rule did you once accept as dogma? What made you question it?',
      categories: ['Beliefs', 'Authority', 'Critical Thinking', 'Growth']
    }
  },

  // HEGEMONY (Culture)
  {
    word: 'hegemony',
    cluster: 'Culture',
    definition: 'Dominant influence or authority, especially of one group, nation, or culture over others. Leadership or dominance that shapes norms and values.',
    exercise: {
      question: 'Which example shows cultural hegemony?',
      options: [
        { id: 'A', text: 'Multiple cultures coexisting with equal influence' },
        { id: 'B', text: 'Hollywood films defining global entertainment standards and tastes' },
        { id: 'C', text: 'Local traditions preserved without outside influence' }
      ],
      correctAnswer: 'B',
      explanation: 'Hegemony is dominant influence that shapes norms—Hollywood\'s global reach exemplifies cultural hegemony.'
    },
    anchor: {
      prompt: 'Where do you see hegemony—cultural, economic, or ideological—in your daily life?',
      categories: ['Culture', 'Power', 'Society', 'Influence'],
      examples: {
        Culture: 'Hegemony shapes global culture.',
        Power: 'Hegemony in politics can silence minority voices.',
        Society: 'Social norms often reflect the hegemony of dominant groups.',
        Influence: 'Media influence is a form of hegemony that guides public opinion.'
      }
    }
  },

  // ELEGIAC (Literary)
  {
    word: 'elegiac',
    cluster: 'Literary',
    definition: 'Mournful, wistful, or reflective in tone, especially in a poetic or lyrical way. Expressive of sorrow or lamentation for what is past or lost.',
    exercise: {
      question: 'Which tone is elegiac?',
      options: [
        { id: 'A', text: 'Cheerful celebration of the present' },
        { id: 'B', text: 'Wistful reflection on lost youth and vanished summers' },
        { id: 'C', text: 'Angry denunciation of injustice' }
      ],
      correctAnswer: 'B',
      explanation: 'Elegiac combines mourning with poetic reflection—wistful sorrow for what has passed.'
    },
    anchor: {
      prompt: 'What song, film, or book has an elegiac quality? What loss does it mourn?',
      categories: ['Art', 'Literature', 'Memory', 'Emotion']
    }
  },

  // SARDONIC (Literary)
  {
    word: 'sardonic',
    cluster: 'Literary',
    definition: 'Grimly mocking, cynical, or scornfully humorous. Dark, cutting wit that conveys contempt or derision beneath the surface.',
    exercise: {
      question: 'Which comment is sardonic?',
      options: [
        { id: 'A', text: 'Genuine praise for good work' },
        { id: 'B', text: '"Oh brilliant, another meeting to discuss the meeting" (dripping with cynical sarcasm)' },
        { id: 'C', text: 'Playful teasing among friends' }
      ],
      correctAnswer: 'B',
      explanation: 'Sardonic humor is darkly mocking and cynical—cutting beneath the surface with contempt.'
    },
    anchor: {
      prompt: 'Who do you know with a sardonic sense of humor? How does it affect their communication?',
      categories: ['Humor', 'Communication', 'Tone', 'Personality'],
      examples: {
        'Humor': 'Sardonic humor uses wit to mask cynicism.',
        'Communication': 'A sardonic remark can change the mood of a conversation.',
        'Tone': 'A sardonic tone often sounds mocking or dry.',
        'Personality': 'A sardonic personality is quick with sharp, dark comments.'
      }
    }
  },

  // VERDANT (Literary)
  {
    word: 'verdant',
    cluster: 'Literary',
    definition: 'Green with lush vegetation; richly covered with grass or foliage. Evokes freshness, vitality, and abundant natural growth.',
    exercise: {
      question: 'When would you use "verdant"?',
      options: [
        { id: 'A', text: 'Describing a barren desert landscape' },
        { id: 'B', text: 'Describing rolling hills thick with emerald grass after spring rains' },
        { id: 'C', text: 'Describing a concrete urban plaza' }
      ],
      correctAnswer: 'B',
      explanation: 'Verdant evokes lush, vibrant greenery—it\'s both descriptive and poetically rich.'
    },
    anchor: {
      prompt: 'Think of the most verdant place you\'ve been. What made it memorable?',
      categories: ['Nature', 'Travel', 'Memory', 'Beauty']
    }
  },

  // DISINTERESTED (Nuance Traps)
  {
    word: 'disinterested',
    cluster: 'Nuance Traps',
    definition: 'Impartial, unbiased, not influenced by personal advantage. Often confused with "uninterested" (lacking interest), but means neutrality in judgment.',
    exercise: {
      question: 'Which sentence uses "disinterested" correctly?',
      options: [
        { id: 'A', text: 'I\'m disinterested in sports—they bore me' },
        { id: 'B', text: 'A disinterested judge ensures a fair trial by having no stake in the outcome' },
        { id: 'C', text: 'She seems disinterested in the conversation' }
      ],
      correctAnswer: 'B',
      explanation: 'Disinterested means impartial and unbiased. Use "uninterested" for lack of interest.'
    },
    anchor: {
      prompt: 'When have you needed a disinterested third party to help resolve a conflict?',
      categories: ['Fairness', 'Judgment', 'Conflict', 'Impartiality'],
      examples: {
        'Fairness': 'A disinterested approach ensures fairness for all sides.',
        'Judgment': 'Disinterested judgment is free from personal bias.',
        'Conflict': 'In conflict, a disinterested mediator can help both parties.',
        'Impartiality': 'Impartiality means being truly disinterested in the outcome.'
      }
    }
  },

  // ENORMITY (Nuance Traps)
  {
    word: 'enormity',
    cluster: 'Nuance Traps',
    definition: 'The extreme seriousness or wickedness of something; great moral wrongness. Often misused to mean "large size"—correct usage implies moral outrage.',
    exercise: {
      question: 'Which uses "enormity" correctly?',
      options: [
        { id: 'A', text: 'The enormity of the stadium impressed us' },
        { id: 'B', text: 'The enormity of the genocide became clear as evidence emerged' },
        { id: 'C', text: 'We were amazed by the enormity of the mountain' }
      ],
      correctAnswer: 'B',
      explanation: 'Enormity refers to moral wickedness or outrageousness, not physical size. Use "immensity" for size.'
    },
    anchor: {
      prompt: 'When did you first grasp the enormity of a historical injustice or wrongdoing?',
      categories: ['History', 'Morality', 'Justice', 'Understanding']
    }
  },

  // DISTILL (Precision Verbs)
  {
    word: 'distill',
    cluster: 'Precision',
    definition: 'To extract the essential meaning or core elements from something complex. To purify or concentrate by removing what is superfluous.',
    exercise: {
      question: 'Which action demonstrates distilling?',
      options: [
        { id: 'A', text: 'Adding more details and examples to a report' },
        { id: 'B', text: 'Condensing a 50-page document into a one-page summary of key insights' },
        { id: 'C', text: 'Repeating information without analysis' }
      ],
      correctAnswer: 'B',
      explanation: 'Distilling means extracting essence—removing complexity to reveal core truth or meaning.'
    },
    anchor: {
      prompt: 'What complex idea or experience have you distilled to its essence? How did you do it?',
      categories: ['Analysis', 'Clarity', 'Communication', 'Understanding'],
      examples: {
        Analysis: 'We tried to distill the data into a few key trends.',
        Clarity: 'Distill your message for clarity and impact.',
        Communication: 'Good communication can distill complex topics for any audience.',
        Understanding: 'I gained understanding by distilling the lesson to its core ideas.'
      }
    }
  },

  // CONFLATE (Precision Verbs)
  {
    word: 'conflate',
    cluster: 'Precision',
    definition: 'To combine two or more distinct things into one, often incorrectly merging separate concepts. To blend ideas in a way that obscures important differences.',
    exercise: {
      question: 'Which is an example of conflating?',
      options: [
        { id: 'A', text: 'Carefully distinguishing between correlation and causation' },
        { id: 'B', text: 'Treating "empathy" and "sympathy" as if they mean the same thing' },
        { id: 'C', text: 'Recognizing nuanced differences in meaning' }
      ],
      correctAnswer: 'B',
      explanation: 'Conflating means incorrectly merging distinct concepts—treating empathy and sympathy as identical conflates them.'
    },
    anchor: {
      prompt: 'What two concepts do people often conflate? How would you explain the difference?',
      categories: ['Precision', 'Language', 'Critical Thinking', 'Clarity'],
      examples: {
        'Precision': 'Precision is lost when you conflate separate ideas.',
        'Language': 'People sometimes conflate words with similar meanings.',
        'Critical Thinking': 'Critical thinking helps you not conflate facts and opinions.',
        'Clarity': 'To achieve clarity, avoid conflating unrelated issues.'
      }
    }
  },

  // PRECLUDE (Precision Verbs)
  {
    word: 'preclude',
    cluster: 'Precision',
    definition: 'To prevent something from happening; to make something impossible by taking advance action. To rule out or exclude a possibility beforehand.',
    exercise: {
      question: 'Which sentence uses "preclude" correctly?',
      options: [
        { id: 'A', text: 'The rain precluded our outdoor picnic, so we moved inside' },
        { id: 'B', text: 'I preclude going to the store later' },
        { id: 'C', text: 'We precluded a great time at the party' }
      ],
      correctAnswer: 'A',
      explanation: 'Preclude means to prevent or make impossible—the rain made the outdoor picnic impossible.'
    },
    anchor: {
      prompt: 'What decision or constraint has precluded an opportunity you wanted? How did you respond?',
      categories: ['Decisions', 'Limitations', 'Adaptation', 'Constraints']
    }
  },

  // AMELIORATE (Precision Verbs)
  {
    word: 'ameliorate',
    cluster: 'Precision',
    definition: 'To make something bad or unsatisfactory better; to improve a difficult situation. To reduce the severity or intensity of a problem.',
    exercise: {
      question: 'Which action ameliorates a problem?',
      options: [
        { id: 'A', text: 'Ignoring a conflict and hoping it resolves itself' },
        { id: 'B', text: 'Introducing flexible work hours to reduce employee burnout' },
        { id: 'C', text: 'Making a bad situation even worse' }
      ],
      correctAnswer: 'B',
      explanation: 'Ameliorate means to make better or improve—flexible hours reduce the severity of burnout.'
    },
    anchor: {
      prompt: 'What difficult situation have you helped ameliorate? What changes made it better?',
      categories: ['Problem Solving', 'Improvement', 'Leadership', 'Action'],
      examples: {
        'Problem Solving': 'We worked together to ameliorate the effects of the outage.',
        'Improvement': 'Small changes can ameliorate even persistent issues.',
        'Leadership': 'A good leader seeks to ameliorate team stress during busy times.',
        'Action': 'Taking action early helped ameliorate the crisis.'
      }
    }
  },

  // ELUCIDATE (Precision Verbs)
  {
    word: 'elucidate',
    cluster: 'Precision',
    definition: 'To make something clear by explaining it more fully or carefully. To shed light on a complex or obscure subject through detailed exposition.',
    exercise: {
      question: 'Which best demonstrates elucidating?',
      options: [
        { id: 'A', text: 'Using jargon without explanation' },
        { id: 'B', text: 'Breaking down a complex theory with examples and analogies to make it understandable' },
        { id: 'C', text: 'Making a topic more confusing with vague language' }
      ],
      correctAnswer: 'B',
      explanation: 'Elucidate means to clarify through careful explanation—examples and analogies illuminate understanding.'
    },
    anchor: {
      prompt: 'When has someone elucidated a concept that you previously found confusing? How did they do it?',
      categories: ['Learning', 'Teaching', 'Clarity', 'Understanding'],
      examples: {
        Learning: 'A good example can elucidate a difficult topic for learners.',
        Teaching: 'She used stories to elucidate complex ideas in her teaching.',
        Clarity: 'Analogies often elucidate abstract concepts, bringing clarity.',
        Understanding: 'My understanding improved when the teacher elucidated each step.'
      }
    }
  },

  // SCIENCE CLUSTER
  {
    word: 'granular',
    cluster: 'Science',
    definition: 'Composed of small discrete parts; highly detailed. Granular analysis breaks complex phenomena into fine components for precision.',
    exercise: {
      question: 'What does granular analysis emphasize?',
      options: [
        { id: 'A', text: 'Only the broad summary' },
        { id: 'B', text: 'The fine details and individual components' },
        { id: 'C', text: 'Ignoring specifics to move faster' }
      ],
      correctAnswer: 'B',
      explanation: 'Granular analysis dives into the smallest meaningful units to understand the whole accurately.'
    },
    anchor: {
      prompt: 'Recall a time you needed to dive into granular detail to solve an issue.',
      categories: ['Problem-Solving', 'Precision', 'Analysis', 'Learning'],
      examples: {
        'Problem-Solving': 'A granular approach helped me solve the complex problem step by step.',
        'Precision': 'Granular data allows for precise measurements and conclusions.',
        'Analysis': 'We performed a granular analysis to uncover hidden trends.',
        'Learning': 'Learning improves when you break concepts down to a granular level.'
      }
    }
  },
  {
    word: 'stochastic',
    cluster: 'Science',
    definition: 'Involving randomness or probability; unpredictable in specific instances but following statistical patterns overall.',
    exercise: {
      question: 'Which situation best illustrates a stochastic process?',
      options: [
        { id: 'A', text: 'A pendulum swinging the same every time' },
        { id: 'B', text: 'Daily weather—random day to day but patterned seasonally' },
        { id: 'C', text: 'A fixed multiplication table' }
      ],
      correctAnswer: 'B',
      explanation: 'Stochastic systems are individually unpredictable yet statistically patterned.'
    },
    anchor: {
      prompt: 'Where do you see randomness that still forms patterns over time?',
      categories: ['Uncertainty', 'Patterns', 'Observation', 'Risk'],
      examples: {
        Uncertainty: 'Stochastic events introduce uncertainty into predictions.',
        Patterns: 'Stochastic processes can reveal hidden patterns over time.',
        Observation: 'Careful observation helps distinguish stochastic noise from real signals.',
        Risk: 'Understanding stochastic risk is crucial in finance and science.'
      }
    }
  },
  {
    word: 'parsimonious',
    cluster: 'Science',
    definition: 'Preferring the simplest adequate explanation; economical with assumptions. Parsimony avoids unnecessary complexity.',
    exercise: {
      question: 'What is a parsimonious explanation?',
      options: [
        { id: 'A', text: 'The most complex theory possible' },
        { id: 'B', text: 'The simplest theory that still fits all observed data' },
        { id: 'C', text: 'An explanation that ignores evidence' }
      ],
      correctAnswer: 'B',
      explanation: 'Parsimony favors elegant simplicity that fully matches the evidence.'
    },
    anchor: {
      prompt: 'When did a simple explanation outperform a complex one for you?',
      categories: ['Decision-Making', 'Design', 'Efficiency', 'Strategy'],
      examples: {
        'Decision-Making': 'I made a parsimonious decision by picking the simplest solution.',
        'Design': 'The building’s parsimonious design used only what was needed.',
        'Efficiency': 'A parsimonious workflow cut out all unnecessary steps.',
        'Strategy': 'We chose a parsimonious strategy with one clear goal.'
      }
    }
  },
  {
    word: 'robust',
    cluster: 'Science',
    definition: 'Strong and resilient; stays valid across varied conditions. Robust systems handle noise and still function well.',
    exercise: {
      question: 'What makes a model robust?',
      options: [
        { id: 'A', text: 'It only works in perfect conditions' },
        { id: 'B', text: 'It performs reliably despite noise or variation' },
        { id: 'C', text: 'It breaks with minor changes' }
      ],
      correctAnswer: 'B',
      explanation: 'Robustness means resilience—staying accurate when reality is messy.'
    },
    anchor: {
      prompt: 'What personal habit of yours is robust across stressful conditions?',
      categories: ['Resilience', 'Reliability', 'Habits', 'Performance'],
      examples: {
        'Resilience': 'When robust systems absorb shocks without losing integrity',
        'Reliability': 'When your process stays robust across messy inputs',
        'Habits': 'When a robust habit carries you through chaos',
        'Performance': 'When even on bad days, your results stay robust'
      }
    }
  },
  {
    word: 'artefact',
    cluster: 'Science',
    definition: 'An unintended result caused by the measurement method, not the phenomenon itself. Spotting artefacts prevents false conclusions.',
    exercise: {
      question: 'How do you spot an experimental artefact?',
      options: [
        { id: 'A', text: 'It appears consistently regardless of method' },
        { id: 'B', text: 'It vanishes or changes when the measurement method changes' },
        { id: 'C', text: 'It always confirms the hypothesis' }
      ],
      correctAnswer: 'B',
      explanation: 'Artefacts depend on the method; change the method and artefacts disappear.'
    },
    anchor: {
      prompt: 'Have you ever mistaken a measurement or bias for a real pattern?',
      categories: ['Bias', 'Reflection', 'Learning', 'Objectivity'],
      examples: {
        'Bias': 'When a sampling artefact looks like bias',
        'Reflection': 'When you call it an artefact and rethink the claim',
        'Learning': 'When artefacts vanish after you change the method',
        'Objectivity': 'When objectivity demands that you test for artefacts first'
      }
    }
  },
  {
    word: 'emergent',
    cluster: 'Science',
    definition: 'Arising from interactions among simpler parts; not predictable by examining parts alone.',
    exercise: {
      question: 'Which is an emergent property?',
      options: [
        { id: 'A', text: 'The mass of a single atom' },
        { id: 'B', text: 'Wetness arising from many water molecules interacting' },
        { id: 'C', text: 'The weight of a brick' }
      ],
      correctAnswer: 'B',
      explanation: 'Wetness emerges from collective behavior—no single molecule is “wet.”'
    },
    anchor: {
      prompt: 'What group behavior have you seen that doesn’t exist at the individual level?',
      categories: ['Systems', 'Teams', 'Complexity', 'Observation'],
      examples: {
        'Systems': 'When emergent structure arises from simple local rules',
        'Teams': 'When a team’s emergent rhythm outperforms any single star',
        'Complexity': 'When complexity yields emergent patterns no part predicts alone',
        'Observation': 'When careful observation reveals truly emergent behavior'
      }
    }
  },
// Duplicate 'latent' entry removed as requested
  {
    word: 'degenerate',
    cluster: 'Science',
    definition: 'Declined in quality; in physics, distinct states sharing the same energy. Degeneracy often signals hidden symmetry.',
    exercise: {
      question: 'What does degeneracy in quantum states imply?',
      options: [
        { id: 'A', text: 'The system is broken' },
        { id: 'B', text: 'Different states have identical energy due to symmetry' },
        { id: 'C', text: 'Particles are colliding' }
      ],
      correctAnswer: 'B',
      explanation: 'Degeneracy shows multiple distinct states share energy, revealing symmetry.'
    },
    anchor: {
      prompt: 'When have different approaches led you to equivalent outcomes?',
      categories: ['Strategy', 'Equivalence', 'Insight', 'Efficiency']
    }
  },
  {
    word: 'scalable',
    cluster: 'Science',
    definition: 'Able to expand or shrink while keeping core relationships. A scalable model holds across different sizes or loads.',
    exercise: {
      question: 'What makes a model scalable?',
      options: [
        { id: 'A', text: 'It works only for one specific case' },
        { id: 'B', text: 'It preserves core relationships across different sizes' },
        { id: 'C', text: 'It requires manual tweaks for every new size' }
      ],
      correctAnswer: 'B',
      explanation: 'Scalability means the structure or relationships hold as you scale up or down.'
    },
    anchor: {
      prompt: 'When has scaling preserved the core relationships in your work?',
      categories: ['Systems', 'Design', 'Performance', 'Growth'],
      examples: {
        'Systems': 'A scalable system keeps working as users increase.',
        'Design': 'Scalable design adapts to many screen sizes.',
        'Performance': 'Performance stays strong if the solution is scalable.',
        'Growth': 'A scalable approach supports rapid growth without breaking.'
      }
    }
  },
  {
    word: 'scalable',
    cluster: 'Science',
    definition: 'Able to expand or shrink while keeping core relationships. A scalable model holds across different sizes or loads.',
    exercise: {
      question: 'What makes a model scalable?',
      options: [
        { id: 'A', text: 'It only works at one size' },
        { id: 'B', text: 'Its core relationships remain valid across scales' },
        { id: 'C', text: 'It needs different rules for every scale' }
      ],
      correctAnswer: 'B',
      explanation: 'Scalability means the model’s fundamentals transfer across magnitudes.'
    },
    anchor: {
      prompt: 'What principle in your life scales from personal use to team or org level?',
      categories: ['Principles', 'Transfer', 'Systems', 'Leadership'],
      examples: {
        'Principles': 'A scalable principle guides both individuals and teams.',
        'Transfer': 'Scalable solutions transfer easily from one context to another.',
        'Systems': 'If a system is scalable, it works at any size.',
        'Leadership': 'Scalable leadership adapts from small groups to large organizations.'
      }
    }
  },

  // PSYCHOLOGY CLUSTER
  {
    word: 'rumination',
    cluster: 'Psychology',
    definition: 'Repetitive dwelling on distressing thoughts without problem solving; mental looping that sustains anxiety or low mood.',
    exercise: {
      question: 'What distinguishes rumination from reflection?',
      options: [
        { id: 'A', text: 'Rumination is looping without resolution; reflection seeks insight and action' },
        { id: 'B', text: 'Reflection is always negative' },
        { id: 'C', text: 'Rumination always solves the problem' }
      ],
      correctAnswer: 'A',
      explanation: 'Rumination spins in circles; reflection moves toward understanding or action.'
    },
    anchor: {
      prompt: 'When have you noticed yourself stuck in rumination, and what breaks the loop?',
      categories: ['Coping', 'Awareness', 'Habits', 'Mental Health']
    }
  },
  {
    word: 'dysphoria',
    cluster: 'Psychology',
    definition: 'A state of deep unease or dissatisfaction; the opposite of euphoria; often tied to mood or identity distress.',
    exercise: {
      question: 'Which best illustrates dysphoria?',
      options: [
        { id: 'A', text: 'Feeling energized and joyful' },
        { id: 'B', text: 'A persistent sense of discomfort and discontent' },
        { id: 'C', text: 'Brief surprise at good news' }
      ],
      correctAnswer: 'B',
      explanation: 'Dysphoria is sustained unease, not brief or positive arousal.'
    },
    anchor: {
      prompt: 'How do you recognize early signs of dysphoria in yourself?',
      categories: ['Mood', 'Self-Monitoring', 'Wellbeing', 'Awareness']
    }
  },
  {
    word: 'alexithymia',
    cluster: 'Psychology',
    definition: 'Difficulty identifying or describing one’s emotions; emotional awareness and vocabulary are limited.',
    exercise: {
      question: 'What is a common marker of alexithymia?',
      options: [
        { id: 'A', text: 'Effortless emotional labeling' },
        { id: 'B', text: 'Struggling to name or describe what one feels' },
        { id: 'C', text: 'Exaggerated emotional expression' }
      ],
      correctAnswer: 'B',
      explanation: 'Alexithymia is about difficulty recognizing and articulating feelings.'
    },
    anchor: {
      prompt: 'What helps you notice and name your emotions more precisely?',
      categories: ['Emotional Literacy', 'Reflection', 'Communication', 'Growth']
    }
  },
  {
    word: 'ambivalence',
    cluster: 'Psychology',
    definition: 'Simultaneous, conflicting feelings toward the same person, object, or decision; genuine internal split.',
    exercise: {
      question: 'Which scenario shows ambivalence?',
      options: [
        { id: 'A', text: 'Loving the excitement of a move while fearing the loss of friends' },
        { id: 'B', text: 'Feeling only one clear preference' },
        { id: 'C', text: 'Feeling bored' }
      ],
      correctAnswer: 'A',
      explanation: 'Ambivalence is mixed, opposing feelings held at once.'
    },
    anchor: {
      prompt: 'Recall a decision where you felt ambivalent. What competing values were at play?',
      categories: ['Decisions', 'Values', 'Conflict', 'Self-Insight']
    }
  },
  {
    word: 'projection',
    cluster: 'Psychology',
    definition: 'Attributing one’s own unwanted feelings or impulses to others; a defense that externalizes inner conflict.',
    exercise: {
      question: 'What is a tell of projection?',
      options: [
        { id: 'A', text: 'Owning your feelings directly' },
        { id: 'B', text: 'Assuming others feel what you feel but won’t acknowledge' },
        { id: 'C', text: 'Listening carefully to others’ perspectives' }
      ],
      correctAnswer: 'B',
      explanation: 'Projection relocates your own feelings onto someone else.'
    },
    anchor: {
      prompt: 'When have you realized you were projecting? What emotion were you externalizing?',
      categories: ['Self-Awareness', 'Bias', 'Relationships', 'Emotions'],
      examples: {
        'Self-Awareness': 'Self-awareness helps me notice when projection is happening.',
        'Bias': 'Projection can bias our view of others unfairly.',
        'Relationships': 'In relationships, projection often causes misunderstandings.',
        'Emotions': 'Strong emotions may lead to projection onto those around us.'
      }
    }
  },
  {
    word: 'dissociation',
    cluster: 'Psychology',
    definition: 'A detachment from thoughts, feelings, or sense of self—ranging from mild zoning out to pronounced disconnection under stress.',
    exercise: {
      question: 'Which reflects dissociation?',
      options: [
        { id: 'A', text: 'Being fully absorbed in a task with clear memory' },
        { id: 'B', text: 'Feeling unreal or detached, as if watching yourself from outside' },
        { id: 'C', text: 'Feeling energized after exercise' }
      ],
      correctAnswer: 'B',
      explanation: 'Dissociation is detachment from self or surroundings, often under stress.'
    },
    anchor: {
      prompt: 'What grounding techniques help you return when you feel detached?',
      categories: ['Coping', 'Safety', 'Presence', 'Regulation']
    }
  },
  {
    word: 'anhedonia',
    cluster: 'Psychology',
    definition: 'Loss of pleasure or interest in normally rewarding activities; a hallmark symptom in depression.',
    exercise: {
      question: 'What signals anhedonia?',
      options: [
        { id: 'A', text: 'Finding hobbies more enjoyable than usual' },
        { id: 'B', text: 'Feeling flat or unmoved by activities that used to bring joy' },
        { id: 'C', text: 'Short-term excitement' }
      ],
      correctAnswer: 'B',
      explanation: 'Anhedonia is the blunting of pleasure and interest.'
    },
    anchor: {
      prompt: 'What small activities reliably spark even mild interest when you feel flat?',
      categories: ['Mood', 'Recovery', 'Habits', 'Self-Care']
    }
  },
  {
    word: 'resignation',
    cluster: 'Psychology',
    definition: 'Passive acceptance that change is unlikely; stepping back from effort after repeated setbacks.',
    exercise: {
      question: 'Which best shows resignation?',
      options: [
        { id: 'A', text: 'Persisting with adjustments after failure' },
        { id: 'B', text: 'Concluding “nothing will work” and ceasing effort' },
        { id: 'C', text: 'Strategizing a new approach' }
      ],
      correctAnswer: 'B',
      explanation: 'Resignation is giving up active attempts to change the situation.'
    },
    anchor: {
      prompt: 'Where do you feel resigned, and what small lever could restore agency?',
      categories: ['Agency', 'Motivation', 'Change', 'Mindset']
    }
  },
  {
    word: 'irritability',
    cluster: 'Psychology',
    definition: 'A lowered threshold for annoyance or anger; heightened reactivity to minor stimuli.',
    exercise: {
      question: 'What indicates irritability?',
      options: [
        { id: 'A', text: 'Calm responses to stressors' },
        { id: 'B', text: 'Snapping at small triggers that normally wouldn’t bother you' },
        { id: 'C', text: 'Feeling sleepy' }
      ],
      correctAnswer: 'B',
      explanation: 'Irritability shows as quick, amplified annoyance to minor inputs.'
    },
    anchor: {
      prompt: 'What patterns or needs (sleep, food, breaks) predict your irritability?',
      categories: ['Regulation', 'Stress', 'Self-Care', 'Awareness'],
      examples: {
        Regulation: 'Good regulation helps reduce irritability throughout the day.',
        Stress: 'High stress can quickly lead to irritability over small things.',
        'Self-Care': 'Neglecting self-care often increases my irritability.',
        Awareness: 'Awareness of my triggers helps me manage irritability.'
      }
    }
  },
  {
    word: 'desensitised',
    cluster: 'Psychology',
    definition: 'Diminished emotional response after repeated exposure; feelings become dulled.',
    exercise: {
      question: 'Which example shows desensitisation?',
      options: [
        { id: 'A', text: 'Growing more sensitive to a stimulus over time' },
        { id: 'B', text: 'Feeling less emotional impact after repeated exposure to the same news' },
        { id: 'C', text: 'Reacting strongly to every stimulus' }
      ],
      correctAnswer: 'B',
      explanation: 'Desensitisation blunts the response after repeated exposure.'
    },
    anchor: {
      prompt: 'Where might you be desensitised, and do you want to stay that way?',
      categories: ['Boundaries', 'Adaptation', 'Media', 'Wellbeing']
    }
  },

  // ETHICS CLUSTER
  {
    word: 'moral hazard',
    cluster: 'Ethics',
    definition: 'When protection from consequences encourages risky behavior; insulation that breeds recklessness.',
    exercise: {
      question: 'Which scenario demonstrates moral hazard?',
      options: [
        { id: 'A', text: 'A bank taking excessive risks knowing the government will bail them out' },
        { id: 'B', text: 'An entrepreneur investing their own savings carefully' },
        { id: 'C', text: 'Someone saving for retirement responsibly' }
      ],
      correctAnswer: 'A',
      explanation: 'Moral hazard occurs when protection from consequences incentivizes reckless behavior.'
    },
    anchor: {
      prompt: 'Where do you see moral hazard in everyday life or institutions?',
      categories: ['Risk', 'Economics', 'Incentives', 'Policy'],
      examples: {
        Risk: 'Moral hazard increases risk when people feel shielded from consequences.',
        Economics: 'In economics, moral hazard can distort market behavior.',
        Incentives: 'Poorly designed incentives may create moral hazard.',
        Policy: 'Policy makers must consider moral hazard when crafting regulations.'
      }
    }
  },
  {
    word: 'instrumentalise',
    cluster: 'Ethics',
    definition: 'To treat someone merely as a means to an end, ignoring their intrinsic dignity or value.',
    exercise: {
      question: 'What does it mean to instrumentalise someone?',
      options: [
        { id: 'A', text: 'To respect their autonomy and choices' },
        { id: 'B', text: 'To use them only as a tool for your goals without considering their humanity' },
        { id: 'C', text: 'To collaborate as equals' }
      ],
      correctAnswer: 'B',
      explanation: 'Instrumentalising reduces people to mere instruments—using them without respecting their value.'
    },
    anchor: {
      prompt: 'When have you felt instrumentalised, or caught yourself treating someone that way?',
      categories: ['Relationships', 'Ethics', 'Respect', 'Work']
    }
  },
  {
    word: 'culpable',
    cluster: 'Ethics',
    definition: 'Deserving blame for wrongdoing; morally or legally responsible. Culpability requires both agency and fault.',
    exercise: {
      question: 'What makes someone culpable?',
      options: [
        { id: 'A', text: 'Being present when something bad happens by chance' },
        { id: 'B', text: 'Having knowledge, agency, and responsibility for the harmful action' },
        { id: 'C', text: 'Being entirely coerced with no choice' }
      ],
      correctAnswer: 'B',
      explanation: 'Culpability requires knowledge and agency—you chose and could have chosen otherwise.'
    },
    anchor: {
      prompt: 'When did you hold yourself culpable for something, even though others might have excused you?',
      categories: ['Accountability', 'Integrity', 'Responsibility', 'Growth'],
      examples: {
        Accountability: 'I felt culpable and took accountability for my mistake.',
        Integrity: 'Integrity means admitting when you are culpable.',
        Responsibility: 'She was found culpable and accepted responsibility.',
        Growth: 'Growth comes from recognizing when you are culpable and learning from it.'
      }
    }
  },
  {
    word: 'exculpatory',
    cluster: 'Ethics',
    definition: 'Evidence or reasoning that clears someone from blame; shows innocence or justification.',
    exercise: {
      question: 'What is exculpatory evidence?',
      options: [
        { id: 'A', text: 'Proof of guilt' },
        { id: 'B', text: 'Information showing someone is not at fault or is innocent' },
        { id: 'C', text: 'Irrelevant details' }
      ],
      correctAnswer: 'B',
      explanation: 'Exculpatory means it absolves blame—showing innocence or lack of responsibility.'
    },
    anchor: {
      prompt: 'When has context or new information exculpated someone you initially blamed?',
      categories: ['Judgment', 'Fairness', 'Perspective', 'Justice'],
      examples: {
        'Judgment': 'Exculpatory facts can change your judgment about someone’s actions.',
        'Fairness': 'A fair process considers exculpatory evidence before blaming.',
        'Perspective': 'A new perspective may reveal exculpatory reasons for a mistake.',
        'Justice': 'Justice requires weighing all exculpatory information.'
      }
    }
  },
  {
    word: 'normative',
    cluster: 'Ethics',
    definition: 'Relating to standards or norms; prescribing what ought to be rather than describing what is.',
    exercise: {
      question: 'Which statement is normative?',
      options: [
        { id: 'A', text: 'People should treat each other with respect' },
        { id: 'B', text: 'Studies show 60% of people recycle' },
        { id: 'C', text: 'The temperature is 20 degrees' }
      ],
      correctAnswer: 'A',
      explanation: 'Normative claims say what ought to be—they prescribe values, not just describe facts.'
    },
    anchor: {
      prompt: 'What normative belief do you hold strongly—something you think should be true?',
      categories: ['Values', 'Philosophy', 'Standards', 'Beliefs'],
      examples: {
        'Values': 'Normative values guide our sense of right and wrong.',
        'Philosophy': 'Philosophers debate normative questions about how we should act.',
        'Standards': 'A normative standard sets expectations for behavior.',
        'Beliefs': 'Many beliefs are normative, expressing what ought to be.'
      }
    }
  },
  {
    word: 'paternalistic',
    cluster: 'Ethics',
    definition: 'Limiting freedom or autonomy for someone\'s perceived good, like a parent might; benevolent but controlling.',
    exercise: {
      question: 'Which behavior is paternalistic?',
      options: [
        { id: 'A', text: 'Respecting someone\'s informed choice even if you disagree' },
        { id: 'B', text: 'Blocking someone\'s choice because you think you know better what\'s good for them' },
        { id: 'C', text: 'Asking someone what they prefer' }
      ],
      correctAnswer: 'B',
      explanation: 'Paternalism overrides autonomy "for their own good"—control disguised as care.'
    },
    anchor: {
      prompt: 'Where do you see paternalism in policies, relationships, or institutions?',
      categories: ['Autonomy', 'Authority', 'Care', 'Control'],
      examples: {
        'Autonomy': 'A paternalistic rule can limit personal autonomy for perceived benefit.',
        'Authority': 'Paternalistic authority often justifies decisions as being for others’ good.',
        'Care': 'Care can become paternalistic when it overrides someone’s choices.',
        'Control': 'Paternalistic control restricts freedom under the guise of protection.'
      }
    }
  },
  {
    word: 'expedient',
    cluster: 'Ethics',
    definition: 'Convenient and practical though potentially improper; prioritizing short-term advantage over principle.',
    exercise: {
      question: 'What does it mean to choose the expedient path?',
      options: [
        { id: 'A', text: 'To uphold principles even when costly' },
        { id: 'B', text: 'To prioritize convenience and immediate benefit, possibly sacrificing ethics' },
        { id: 'C', text: 'To always choose the slowest option' }
      ],
      correctAnswer: 'B',
      explanation: 'Expedient means pragmatically convenient—often at the expense of deeper principles.'
    },
    anchor: {
      prompt: 'When have you chosen the expedient route and later questioned it?',
      categories: ['Decisions', 'Compromise', 'Integrity', 'Pragmatism'],
      examples: {
        Decisions: 'Choosing the expedient option can solve problems quickly.',
        Compromise: 'An expedient compromise may sacrifice long-term goals.',
        Integrity: 'Integrity sometimes means rejecting expedient solutions.',
        Pragmatism: 'Expedient actions are often favored by pragmatists.'
      }
    }
  },
  {
    word: 'principled',
    cluster: 'Ethics',
    definition: 'Adhering to moral or ethical principles consistently, even when inconvenient; demonstrating integrity.',
    exercise: {
      question: 'What shows principled behavior?',
      options: [
        { id: 'A', text: 'Changing values to fit what benefits you most' },
        { id: 'B', text: 'Holding to your values even when it costs you personally' },
        { id: 'C', text: 'Ignoring ethics entirely' }
      ],
      correctAnswer: 'B',
      explanation: 'Being principled means consistency in values—even when inconvenient or costly.'
    },
    anchor: {
      prompt: 'What principle have you stood by even when it was difficult or costly?',
      categories: ['Integrity', 'Values', 'Character', 'Courage']
    }
  },
  {
    word: 'moralising',
    cluster: 'Ethics',
    definition: 'Lecturing others on morality, often self-righteously; imposing moral standards sanctimoniously.',
    exercise: {
      question: 'What characterizes moralising?',
      options: [
        { id: 'A', text: 'Listening empathetically to different perspectives' },
        { id: 'B', text: 'Preaching moral superiority and judging others harshly from a high horse' },
        { id: 'C', text: 'Quietly living your values without forcing them on others' }
      ],
      correctAnswer: 'B',
      explanation: 'Moralising is judgmental preaching—imposing standards with self-righteousness.'
    },
    anchor: {
      prompt: 'When have you caught yourself moralising instead of engaging with nuance?',
      categories: ['Judgment', 'Communication', 'Humility', 'Perspective']
    }
  },
  {
    word: 'complicity',
    cluster: 'Ethics',
    definition: 'Involvement in wrongdoing with others; being an accomplice through action, inaction, or silent approval.',
    exercise: {
      question: 'What makes you complicit?',
      options: [
        { id: 'A', text: 'Actively speaking out against wrongdoing' },
        { id: 'B', text: 'Knowing about harm and staying silent or benefiting from it' },
        { id: 'C', text: 'Being unaware of any wrongdoing' }
      ],
      correctAnswer: 'B',
      explanation: 'Complicity means participating through action, inaction, or benefit—silent approval counts.'
    },
    anchor: {
      prompt: 'Where might you be complicit in something you don\'t fully endorse?',
      categories: ['Accountability', 'Systems', 'Responsibility', 'Ethics'],
      examples: {
        Accountability: 'Complicity requires accountability for silent approval.',
        Systems: 'Unjust systems can foster complicity among their members.',
        Responsibility: 'Taking responsibility means refusing complicity in harm.',
        Ethics: 'Ethical choices help us avoid complicity in wrongdoing.'
      }
    }
  },

  // Nature cluster
  {
    word: 'anthropogenic',
    cluster: 'Nature',
    definition: 'Caused or influenced by humans; originating from human activity. Used to describe environmental changes resulting from human actions.',
    exercise: {
      question: 'What does "anthropogenic climate change" mean?',
      options: [
        { id: 'A', text: 'Climate patterns caused by human activity' },
        { id: 'B', text: 'Natural climate cycles over geological time' },
        { id: 'C', text: 'Climate change affecting human populations' }
      ],
      correctAnswer: 'A',
      explanation: 'Anthropogenic means caused by humans—human-driven environmental change rather than natural variation.'
    },
    anchor: {
      prompt: 'Which everyday choices contribute to anthropogenic environmental impacts?',
      categories: ['Human Impact', 'Environment', 'Responsibility', 'Action']
    }
  },
  {
    word: 'rewilding',
    cluster: 'Nature',
    definition: 'Restoring areas to their natural uncultivated state by reintroducing native species and reducing human intervention. A conservation strategy.',
    exercise: {
      question: 'Rewilding a landscape means:',
      options: [
        { id: 'A', text: 'Building wildlife sanctuaries and zoos' },
        { id: 'B', text: 'Restoring natural processes and reintroducing native species' },
        { id: 'C', text: 'Planting decorative gardens' }
      ],
      correctAnswer: 'B',
      explanation: 'Rewilding restores ecosystems to self-regulating states by reducing human control and reintroducing keystone species.'
    },
    anchor: {
      prompt: 'What areas of your life might benefit from "rewilding"—less control, more natural flow?',
      categories: ['Nature', 'Control', 'Restoration', 'Balance'],
      examples: {
        'Nature': 'Restoring lost habitats and species is the goal of rewilding.',
        'Control': 'Letting go of control can feel like rewilding your routine.',
        'Restoration': 'Restoration sometimes means rewilding both land and mind.',
        'Balance': 'A better balance with nature can result from rewilding.'
      }
    }
  },
  {
    word: 'eutrophication',
    cluster: 'Nature',
    definition: 'Excessive nutrient enrichment in water bodies causing algal blooms and oxygen depletion. Often results from agricultural runoff.',
    exercise: {
      question: 'Eutrophication in a lake is caused by:',
      options: [
        { id: 'A', text: 'Excessive nutrients leading to algal blooms and oxygen depletion' },
        { id: 'B', text: 'Cold temperatures freezing the surface' },
        { id: 'C', text: 'Overfishing removing too many species' }
      ],
      correctAnswer: 'A',
      explanation: 'Eutrophication occurs when fertilizer runoff or waste adds nutrients, causing explosive algae growth that depletes oxygen.'
    },
    anchor: {
      prompt: 'What in your environment suffers from "too much of a good thing"—oversupply causing harm?',
      categories: ['Balance', 'Excess', 'Consequences', 'Systems'],
      examples: {
        'Balance': 'Eutrophication disrupts the natural balance of aquatic ecosystems.',
        'Excess': 'Excess nutrients in water lead to eutrophication.',
        'Consequences': 'A major consequence of eutrophication is oxygen depletion.',
        'Systems': 'Eutrophication shows how systems can collapse from oversupply.'
      }
    }
  },
  {
    word: 'carbon sink',
    cluster: 'Nature',
    definition: 'Natural or artificial reservoir that absorbs and stores carbon dioxide from the atmosphere. Forests and oceans are major carbon sinks.',
    exercise: {
      question: 'Which is the best example of a carbon sink?',
      options: [
        { id: 'A', text: 'A coal-fired power plant' },
        { id: 'B', text: 'An old-growth forest absorbing CO₂' },
        { id: 'C', text: 'An urban parking lot' }
      ],
      correctAnswer: 'B',
      explanation: 'Carbon sinks absorb more carbon than they emit—forests, oceans, and soils store atmospheric CO₂.'
    },
    anchor: {
      prompt: 'What acts as an emotional "carbon sink" in your life—absorbing negativity before it spreads?',
      categories: ['Balance', 'Absorption', 'Protection', 'Stability'],
      examples: {
        Balance: 'Forests act as a carbon sink, helping maintain balance in the atmosphere.',
        Absorption: 'A carbon sink absorbs more CO₂ than it releases.',
        Protection: 'Carbon sinks provide protection against climate change.',
        Stability: 'Stable carbon sinks are vital for long-term environmental health.'
      }
    }
  },
  {
    word: 'resilience',
    cluster: 'Nature',
    definition: 'The capacity of ecosystems to absorb disturbance and reorganize while retaining essential functions. Ability to recover from stress.',
    exercise: {
      question: 'Ecosystem resilience refers to:',
      options: [
        { id: 'A', text: 'The ability to recover from disturbance while maintaining core functions' },
        { id: 'B', text: 'Remaining completely unchanged over time' },
        { id: 'C', text: 'Expanding to dominate other ecosystems' }
      ],
      correctAnswer: 'A',
      explanation: 'Resilience is about absorbing shocks and reorganizing—not rigidity, but adaptive recovery.'
    },
    anchor: {
      prompt: 'When have you shown resilience—bouncing back while staying fundamentally yourself?',
      categories: ['Recovery', 'Adaptation', 'Strength', 'Growth']
    }
  },
  {
    word: 'biodiversity',
    cluster: 'Nature',
    definition: 'The variety of life forms in an ecosystem, region, or the planet. Higher biodiversity typically indicates ecosystem health.',
    exercise: {
      question: 'High biodiversity in an ecosystem means:',
      options: [
        { id: 'A', text: 'Many different species coexisting' },
        { id: 'B', text: 'A single species dominating the area' },
        { id: 'C', text: 'Rapid population growth of all organisms' }
      ],
      correctAnswer: 'A',
      explanation: 'Biodiversity measures variety—more species and genetic variation typically means greater ecosystem health and stability.'
    },
    anchor: {
      prompt: 'Where does diversity strengthen your life—social circles, ideas, experiences?',
      categories: ['Variety', 'Health', 'Connections', 'Strength'],
      examples: {
        'Variety': 'Biodiversity brings variety to every ecosystem.',
        'Health': 'Ecosystem health depends on rich biodiversity.',
        'Connections': 'Connections between species are shaped by biodiversity.',
        'Strength': 'Greater biodiversity gives strength and resilience to nature.'
      }
    }
  },
  {
    word: 'externality',
    cluster: 'Nature',
    definition: 'A cost or benefit from economic activity that affects third parties who didn\'t choose to incur it. Pollution is a negative externality.',
    exercise: {
      question: 'A negative externality occurs when:',
      options: [
        { id: 'A', text: 'A business pays all costs of production' },
        { id: 'B', text: 'Costs from an activity fall on people who didn\'t choose to bear them' },
        { id: 'C', text: 'Everyone benefits equally from economic growth' }
      ],
      correctAnswer: 'B',
      explanation: 'Externalities are unpriced consequences—pollution is a cost imposed on society, not reflected in product price.'
    },
    anchor: {
      prompt: 'What externalities do your choices create—unintended effects on others or the environment?',
      categories: ['Consequences', 'Responsibility', 'Impact', 'Awareness'],
      examples: {
        'Consequences': 'Pollution is a classic negative externality of industry.',
        'Responsibility': 'Responsible companies work to reduce externalities.',
        'Impact': 'Externality effects can ripple far beyond the original action.',
        'Awareness': 'Awareness of externality helps inform better decisions.'
      }
    }
  },
  {
    word: 'depletion',
    cluster: 'Nature',
    definition: 'The reduction in quantity of a resource through extraction or consumption faster than it can be replenished. Resource exhaustion.',
    exercise: {
      question: 'Resource depletion means:',
      options: [
        { id: 'A', text: 'Using resources faster than they can regenerate' },
        { id: 'B', text: 'Recycling materials efficiently' },
        { id: 'C', text: 'Discovering new resource deposits' }
      ],
      correctAnswer: 'A',
      explanation: 'Depletion is exhaustion through overuse—consuming renewable resources faster than replenishment or exhausting finite ones.'
    },
    anchor: {
      prompt: 'What personal resources are you depleting—energy, attention, relationships, health?',
      categories: ['Sustainability', 'Limits', 'Energy', 'Balance'],
      examples: {
        Sustainability: 'Depletion of forests threatens the sustainability of our planet.',
        Limits: 'Depletion shows the limits of our resources.',
        Energy: 'After a long week, I feel the depletion of my energy reserves.',
        Balance: 'To avoid depletion, I strive for balance between work and rest.'
      }
    }
  },
  {
    word: 'desertification',
    cluster: 'Nature',
    definition: 'The degradation of fertile land into desert through drought, deforestation, or inappropriate agriculture. Land becoming arid and barren.',
    exercise: {
      question: 'Desertification happens when:',
      options: [
        { id: 'A', text: 'Fertile land degrades into arid, barren terrain' },
        { id: 'B', text: 'Deserts naturally expand due to climate cycles' },
        { id: 'C', text: 'Sand dunes migrate across landscapes' }
      ],
      correctAnswer: 'A',
      explanation: 'Desertification is land degradation—often from overgrazing, deforestation, or poor agriculture—turning productive land barren.'
    },
    anchor: {
      prompt: 'What areas of your life risk "desertification"—becoming barren through neglect or overuse?',
      categories: ['Degradation', 'Neglect', 'Warning', 'Care'],
      examples: {
        'Degradation': 'Desertification is a warning sign of land degradation.',
        'Neglect': 'Neglect can lead to desertification in both land and life.',
        'Warning': 'Desertification serves as a warning to change our habits.',
        'Care': 'Care and attention can prevent desertification and restore vitality.'
      }
    }
  },
  {
    word: 'flashpoint',
    cluster: 'Nature',
    definition: 'The temperature at which vapor from a substance ignites; metaphorically, a point at which conflict or crisis becomes imminent.',
    exercise: {
      question: 'In environmental contexts, a flashpoint is:',
      options: [
        { id: 'A', text: 'A threshold where conditions suddenly ignite into crisis' },
        { id: 'B', text: 'The coldest temperature in a region' },
        { id: 'C', text: 'A location with frequent lightning strikes' }
      ],
      correctAnswer: 'A',
      explanation: 'A flashpoint is a critical threshold—the moment when accumulated stress, heat, or tension erupts into active crisis.'
    },
    anchor: {
      prompt: 'What are the flashpoints in your life—small triggers that could ignite bigger conflicts?',
      categories: ['Threshold', 'Crisis', 'Awareness', 'Prevention'],
      examples: {
        'Threshold': 'A flashpoint marks the threshold where change becomes inevitable.',
        'Crisis': 'Every crisis has a flashpoint that sets it off.',
        'Awareness': 'Awareness of flashpoints can help you avoid escalation.',
        'Prevention': 'Prevention means addressing issues before they reach a flashpoint.'
      }
    }
  },

  // Society cluster
  {
    word: 'othering',
    cluster: 'Society',
    definition: 'The process of treating a person or group as fundamentally different or alien, creating an "us vs. them" divide. Reinforces social boundaries.',
    exercise: {
      question: 'Othering occurs when:',
      options: [
        { id: 'A', text: 'People celebrate cultural differences respectfully' },
        { id: 'B', text: 'A group is portrayed as fundamentally different and lesser' },
        { id: 'C', text: 'Individuals express unique perspectives' }
      ],
      correctAnswer: 'B',
      explanation: 'Othering creates distance by framing a group as alien or inferior, reinforcing division and exclusion.'
    },
    anchor: {
      prompt: 'When have you witnessed or participated in othering—consciously or unconsciously?',
      categories: ['Exclusion', 'Awareness', 'Social Dynamics', 'Identity'],
      examples: {
        'Exclusion': 'Othering leads to exclusion and isolation of groups.',
        'Awareness': 'Awareness of othering helps challenge harmful stereotypes.',
        'Social Dynamics': 'Othering shapes social dynamics by creating in-groups and out-groups.',
        'Identity': 'Othering can impact how people see their own identity.'
      }
    }
  },
  {
    word: 'performative',
    cluster: 'Society',
    definition: 'Actions or statements done primarily for appearance or public approval rather than genuine commitment. Symbolic gestures without substance.',
    exercise: {
      question: 'Which is an example of performative action?',
      options: [
        { id: 'A', text: 'A company posting about social issues on social media but making no internal changes' },
        { id: 'B', text: 'An organization quietly implementing diversity programs without announcements' },
        { id: 'C', text: 'Someone volunteering regularly without posting about it' }
      ],
      correctAnswer: 'A',
      explanation: 'Performative actions prioritize appearance over substance—public gestures without meaningful commitment or change.'
    },
    anchor: {
      prompt: 'Where might your own actions be performative—done more for appearance than authentic belief?',
      categories: ['Authenticity', 'Self-Examination', 'Sincerity', 'Action']
    }
  },
  {
    word: 'social capital',
    cluster: 'Society',
    definition: 'The networks, relationships, and trust that enable cooperation and mutual benefit within communities. Connections as a resource.',
    exercise: {
      question: 'Social capital refers to:',
      options: [
        { id: 'A', text: 'Financial wealth shared among community members' },
        { id: 'B', text: 'Networks and trust that facilitate cooperation and support' },
        { id: 'C', text: 'Government investment in social programs' }
      ],
      correctAnswer: 'B',
      explanation: 'Social capital is relational wealth—the connections, trust, and norms that enable collective action and mutual aid.'
    },
    anchor: {
      prompt: 'What social capital do you have—networks and relationships you can rely on?',
      categories: ['Connections', 'Community', 'Resources', 'Support']
    }
  },
  {
    word: 'hegemony',
    cluster: 'Society',
    definition: 'Dominant influence or authority of one group over others, often maintained through cultural norms rather than force. Subtle structural power.',
    exercise: {
      question: 'Cultural hegemony operates through:',
      options: [
        { id: 'A', text: 'Direct military force and legal mandates' },
        { id: 'B', text: 'Widespread acceptance of norms that favor dominant groups' },
        { id: 'C', text: 'Equal representation of all cultural perspectives' }
      ],
      correctAnswer: 'B',
      explanation: 'Hegemony works through normalized beliefs and values—power maintained by making dominant perspectives seem natural and universal.'
    },
    anchor: {
      prompt: 'What hegemonic norms shape your environment—unquestioned assumptions that serve certain groups?',
      categories: ['Power', 'Culture', 'Norms', 'Awareness'],
      examples: {
        Power: 'Hegemony gives power to dominant groups in subtle ways.',
        Culture: 'Cultural hegemony influences what is seen as normal.',
        Norms: 'Social norms often reflect the hegemony of a majority.',
        Awareness: 'Awareness of hegemony helps challenge unfair systems.'
      }
    }
  },
  {
    word: 'cohesion',
    cluster: 'Society',
    definition: 'The bonds that hold a group together through shared values, trust, and solidarity. Unity and internal strength of communities.',
    exercise: {
      question: 'Strong social cohesion is characterized by:',
      options: [
        { id: 'A', text: 'Everyone thinking and acting identically' },
        { id: 'B', text: 'Shared values and trust enabling cooperation despite differences' },
        { id: 'C', text: 'Complete independence with no mutual obligations' }
      ],
      correctAnswer: 'B',
      explanation: 'Cohesion is unity through connection—shared purpose and trust that allow diverse people to work together effectively.'
    },
    anchor: {
      prompt: 'What creates cohesion in your communities—shared values, experiences, or goals?',
      categories: ['Unity', 'Community', 'Bonds', 'Belonging'],
      examples: {
        'Unity': 'Cohesion brings unity to diverse groups.',
        'Community': 'A sense of community grows from strong cohesion.',
        'Bonds': 'Shared experiences create bonds and cohesion.',
        'Belonging': 'Cohesion gives people a sense of belonging.'
      }
    }
  },
  {
    word: 'gatekeeping',
    cluster: 'Society',
    definition: "Controlling access to resources, opportunities, or communities by setting criteria for inclusion. Deciding who gets in and who doesn't.",
    exercise: {
      question: 'Gatekeeping in communities involves:',
      options: [
        { id: 'A', text: 'Welcoming all members without any requirements' },
        { id: 'B', text: 'Controlling who is considered a legitimate member or participant' },
        { id: 'C', text: 'Encouraging open access to all resources' }
      ],
      correctAnswer: 'B',
      explanation: 'Gatekeeping creates barriers to entry—defining who is "real" or "worthy" and controlling access to status, resources, or belonging.'
    },
    anchor: {
      prompt: 'Where do you encounter or participate in gatekeeping—in hobbies, work, or communities?',
      categories: ['Access', 'Exclusion', 'Control', 'Belonging'],
      examples: {
        'Access': 'Gatekeeping limits access to certain groups or resources.',
        'Exclusion': 'Strict boundaries can result from exclusion and gatekeeping.',
        'Control': 'Communities sometimes use gatekeeping to control who belongs.',
        'Belonging': 'A sense of belonging may be lost when gatekeeping is too strong.'
      }
    }
  },
  {
    word: 'legitimacy',
    cluster: 'Society',
    definition: 'The perceived right to exercise authority or make decisions, based on acceptance by those governed. Authority recognized as valid.',
    exercise: {
      question: 'Legitimacy in governance comes from:',
      options: [
        { id: 'A', text: 'Force and coercion alone' },
        { id: 'B', text: 'Recognition and acceptance by those being governed' },
        { id: 'C', text: 'Self-declaration of authority' }
      ],
      correctAnswer: 'B',
      explanation: 'Legitimacy requires acceptance—power becomes authority when those subject to it recognize it as rightful and valid.'
    },
    anchor: {
      prompt: 'What gives legitimacy to the authorities in your life—institutions, leaders, or rules?',
      categories: ['Authority', 'Recognition', 'Power', 'Acceptance'],
      examples: {
        'Authority': 'Legitimacy turns power into true authority.',
        'Recognition': 'Recognition by the people grants legitimacy to leaders.',
        'Power': 'Power without legitimacy is often challenged.',
        'Acceptance': 'Legitimacy depends on acceptance by those governed.'
      }
    }
  },
  {
    word: 'asymmetry',
    cluster: 'Society',
    definition: 'Lack of equality or balance in power, resources, or relationships. Unequal distribution creating imbalance.',
    exercise: {
      question: 'Power asymmetry in relationships means:',
      options: [
        { id: 'A', text: 'Both parties have equal influence and resources' },
        { id: 'B', text: 'One party has significantly more power or resources than the other' },
        { id: 'C', text: 'Power constantly shifts between parties' }
      ],
      correctAnswer: 'B',
      explanation: 'Asymmetry is imbalance—unequal distribution of power, knowledge, or resources that creates structural inequality.'
    },
    anchor: {
      prompt: 'Where do you notice asymmetry in your relationships or environments—who has more power?',
      categories: ['Imbalance', 'Power', 'Inequality', 'Awareness']
    }
  },
  {
    word: 'entitlement',
    cluster: 'Society',
    definition: 'The belief that one deserves certain privileges or treatment, often without corresponding effort or justification. Expecting special treatment.',
    exercise: {
      question: 'Entitlement is demonstrated when someone:',
      options: [
        { id: 'A', text: 'Works hard and earns recognition' },
        { id: 'B', text: 'Expects special treatment or privileges as inherently deserved' },
        { id: 'C', text: 'Advocates for equal rights and opportunities' }
      ],
      correctAnswer: 'B',
      explanation: 'Entitlement assumes unearned deservingness—expecting privileges or exemptions based on perceived inherent status rather than merit or fairness.'
    },
    anchor: {
      prompt: 'Where might you carry unexamined entitlement—assumptions about what you deserve?',
      categories: ['Privilege', 'Self-Examination', 'Expectations', 'Awareness'],
      examples: {
        Privilege: 'Entitlement often grows from unexamined privilege.',
        'Self-Examination': 'Self-examination can reveal hidden entitlement.',
        Expectations: 'High expectations may signal entitlement rather than merit.',
        Awareness: 'Awareness helps challenge entitlement in ourselves and others.'
      }
    }
  },
  {
    word: 'polarisation',
    cluster: 'Society',
    definition: 'The division of opinions, groups, or societies into opposing extremes with diminishing middle ground. Increasing ideological distance.',
    exercise: {
      question: 'Polarisation in society leads to:',
      options: [
        { id: 'A', text: 'Increased dialogue and mutual understanding' },
        { id: 'B', text: 'Growing extremes with less common ground and compromise' },
        { id: 'C', text: 'Unified consensus on major issues' }
      ],
      correctAnswer: 'B',
      explanation: 'Polarisation creates distance—opinions cluster at extremes, middle positions disappear, and opposing groups become increasingly hostile.'
    },
    anchor: {
      prompt: 'Where do you see polarisation affecting your communities—politics, values, or social groups?',
      categories: ['Division', 'Extremes', 'Conflict', 'Society']
    }
  },

  // Rhetoric cluster
  {
    word: 'equivocation',
    cluster: 'Rhetoric',
    definition: 'Using ambiguous language deliberately to mislead or avoid commitment. Speaking in a way that can be interpreted multiple ways.',
    exercise: {
      question: 'Equivocation is used to:',
      options: [
        { id: 'A', text: 'Express ideas with complete clarity' },
        { id: 'B', text: 'Deliberately use ambiguous language to avoid commitment' },
        { id: 'C', text: 'Provide balanced perspectives' }
      ],
      correctAnswer: 'B',
      explanation: 'Equivocation exploits ambiguity—choosing words with multiple meanings to hide true intent or avoid accountability.'
    },
    anchor: {
      prompt: 'When have you used equivocation—speaking ambiguously to avoid saying what you really mean?',
      categories: ['Honesty', 'Communication', 'Accountability', 'Self-Awareness'],
      examples: {
        'Honesty': 'Equivocation undermines honesty by hiding the truth.',
        'Communication': 'Clear communication avoids the trap of equivocation.',
        'Accountability': 'People use equivocation to dodge accountability.',
        'Self-Awareness': 'Recognizing your own equivocation takes self-awareness.'
      }
    }
  },
  {
    word: 'specious',
    cluster: 'Rhetoric',
    definition: 'Appearing to be true or valid but actually false or misleading. Superficially plausible but fundamentally flawed.',
    exercise: {
      question: 'A specious argument is:',
      options: [
        { id: 'A', text: 'Logically sound and well-supported' },
        { id: 'B', text: 'Superficially plausible but fundamentally false' },
        { id: 'C', text: 'Completely obvious and uncontroversial' }
      ],
      correctAnswer: 'B',
      explanation: 'Specious reasoning seems convincing at first glance but crumbles under scrutiny—appearance of validity without substance.'
    },
    anchor: {
      prompt: 'What specious claims do you encounter frequently—arguments that sound good but don\'t hold up?',
      categories: ['Critical Thinking', 'Debate', 'Media', 'Decision Making'],
      examples: {
        'Critical Thinking': 'Critical thinking helps you spot specious arguments quickly.',
        'Debate': 'In debate, specious claims can mislead the audience.',
        'Media': 'Specious headlines in media often distort the facts.',
        'Decision Making': 'Avoiding specious reasoning is key to sound decision making.'
      }
    }
  },
  {
    word: 'dogwhistle',
    cluster: 'Rhetoric',
    definition: 'Language or messaging with coded meaning understood by a specific group but appearing innocent to outsiders. Covert communication.',
    exercise: {
      question: 'Dogwhistle communication operates by:',
      options: [
        { id: 'A', text: 'Being completely transparent to all audiences' },
        { id: 'B', text: 'Using coded language that different groups interpret differently' },
        { id: 'C', text: 'Speaking to everyone equally' }
      ],
      correctAnswer: 'B',
      explanation: 'Dogwhistles use coded language—appearing innocent to outsiders while conveying specific meaning to intended audiences.'
    },
    anchor: {
      prompt: 'What dogwhistle language exists in your community—phrases with hidden meanings you\'re aware of?',
      categories: ['Language', 'Codes', 'Awareness', 'Interpretation']
    }
  },
  {
    word: 'loaded',
    cluster: 'Rhetoric',
    definition: 'Language deliberately chosen to evoke emotional response or bias perception; containing unstated assumptions or judgments.',
    exercise: {
      question: 'Loaded language is designed to:',
      options: [
        { id: 'A', text: 'Provide neutral, objective information' },
        { id: 'B', text: 'Evoke emotion and bias perception through word choice' },
        { id: 'C', text: 'Leave no room for interpretation' }
      ],
      correctAnswer: 'B',
      explanation: 'Loaded language manipulates through emotional triggers—words chosen not for accuracy but to influence feelings and judgments.'
    },
    anchor: {
      prompt: 'What loaded language shapes your thinking—words that trigger emotional reactions?',
      categories: ['Language', 'Emotion', 'Bias', 'Awareness']
    }
  },
  {
    word: 'prevarication',
    cluster: 'Rhetoric',
    definition: 'Deliberate evasion of truth through misleading statements or half-truths. Lying by distortion rather than outright denial.',
    exercise: {
      question: 'Prevarication differs from lying by being:',
      options: [
        { id: 'A', text: 'More honest and straightforward' },
        { id: 'B', text: 'Evasive distortion rather than outright falsehood' },
        { id: 'C', text: 'Always easily detected' }
      ],
      correctAnswer: 'B',
      explanation: 'Prevarication evades truth through misdirection—half-truths and selective facts that mislead without direct lies.'
    },
    anchor: {
      prompt: 'When are you tempted to prevaricate—to mislead without directly lying?',
      categories: ['Honesty', 'Integrity', 'Evasion', 'Ethics'],
      examples: {
        'Honesty': 'Prevarication undermines honesty by twisting the truth.',
        'Integrity': 'A person with integrity avoids prevarication in all forms.',
        'Evasion': 'Prevarication is a subtle form of evasion.',
        'Ethics': 'Ethical standards reject prevarication as misleading.'
      }
    }
  },
  {
    word: 'gaslighting',
    cluster: 'Rhetoric',
    definition: 'Manipulating someone into questioning their own reality, memory, or perception. Making someone doubt their sanity or judgment.',
    exercise: {
      question: 'Gaslighting involves:',
      options: [
        { id: 'A', text: 'Respectfully disagreeing with someone\'s perspective' },
        { id: 'B', text: 'Making someone question their reality and judgment' },
        { id: 'C', text: 'Providing factual corrections' }
      ],
      correctAnswer: 'B',
      explanation: 'Gaslighting is psychological manipulation—denying reality to make victims doubt their own perceptions and sanity.'
    },
    anchor: {
      prompt: 'Have you experienced gaslighting—being made to question what you know is true?',
      categories: ['Manipulation', 'Psychological', 'Awareness', 'Protection']
    }
  },
  {
    word: 'logical fallacy',
    cluster: 'Rhetoric',
    definition: 'An error in reasoning that makes an argument invalid. A flaw in logic that undermines the conclusion despite appearing sound.',
    exercise: {
      question: 'A logical fallacy is:',
      options: [
        { id: 'A', text: 'A factually incorrect statement' },
        { id: 'B', text: 'A flaw in reasoning that invalidates an argument' },
        { id: 'C', text: 'An unpopular opinion' }
      ],
      correctAnswer: 'B',
      explanation: 'Logical fallacies are reasoning errors—flaws in argument structure that undermine validity regardless of facts.'
    },
    anchor: {
      prompt: 'What logical fallacies do you notice in arguments around you—ad hominem, slippery slope, etc.?',
      categories: ['Critical Thinking', 'Logic', 'Reasoning', 'Skepticism']
    }
  },
  {
    word: 'false dichotomy',
    cluster: 'Rhetoric',
    definition: 'Presenting only two options when more possibilities exist. Forcing a choice between extremes while hiding middle ground.',
    exercise: {
      question: 'False dichotomy works by:',
      options: [
        { id: 'A', text: 'Acknowledging multiple perspectives' },
        { id: 'B', text: 'Forcing choice between two extremes, hiding other options' },
        { id: 'C', text: 'Presenting all available alternatives' }
      ],
      correctAnswer: 'B',
      explanation: 'False dichotomy oversimplifies—presenting only two options while ignoring nuanced middle positions or alternatives.'
    },
    anchor: {
      prompt: 'Where do you encounter false dichotomies—"you\'re either with us or against us" type thinking?',
      categories: ['Logic', 'Nuance', 'Critical Thinking', 'Polarization'],
      examples: {
        Logic: 'A false dichotomy ignores logical alternatives.',
        Nuance: 'Nuance is lost when a false dichotomy is presented.',
        'Critical Thinking': 'Critical thinking helps expose a false dichotomy in arguments.',
        Polarization: 'False dichotomy often fuels polarization in debates.'
      }
    }
  },
  {
    word: 'hedging',
    cluster: 'Rhetoric',
    definition: 'Using cautious, non-committal language to avoid responsibility or accountability. Softening statements with qualifications.',
    exercise: {
      question: 'Hedging language serves to:',
      options: [
        { id: 'A', text: 'Make strong, definitive claims' },
        { id: 'B', text: 'Avoid commitment or accountability through caution' },
        { id: 'C', text: 'Be completely transparent' }
      ],
      correctAnswer: 'B',
      explanation: 'Hedging uses qualifiers like "maybe," "possibly," "arguably"—softening statements to evade accountability for claims.'
    },
    anchor: {
      prompt: 'When do you hedge your language—using qualifications to avoid taking a stand?',
      categories: ['Communication', 'Accountability', 'Courage', 'Honesty']
    }
  },
  {
    word: 'obfuscation',
    cluster: 'Rhetoric',
    definition: 'Deliberately making something unclear or hard to understand. Obscuring truth through complexity, jargon, or misdirection.',
    exercise: {
      question: 'Obfuscation is used to:',
      options: [
        { id: 'A', text: 'Clarify complex ideas with simple language' },
        { id: 'B', text: 'Deliberately obscure truth through complexity or jargon' },
        { id: 'C', text: 'Make information more accessible' }
      ],
      correctAnswer: 'B',
      explanation: 'Obfuscation obscures—using complexity, jargon, or misdirection to hide truth or prevent understanding.'
    },
    anchor: {
      prompt: 'Where do you encounter obfuscation—information deliberately made unclear?',
      categories: ['Communication', 'Clarity', 'Deception', 'Awareness']
    }
  }
];

