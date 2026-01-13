export interface ThreeStepInteraction {
  word: string;
  difficulty: number;
  cluster: string;
  
  definition: {
    text: string;
    partOfSpeech: string;
    etymology?: string;
  };
  
  task: {
    type: 'scenario' | 'completion' | 'choice' | 'application';
    prompt: string;
    context: string;
    instruction: string;
    options?: string[];
    correctAnswer?: string;
    template?: string;
  };
  
  anchor: {
    type: 'visual_metaphor' | 'story_fragment' | 'sensory_scene' | 'power_moment';
    prompt: string;
    scene: string;
    context: string;
    reflection: string;
  };
}

export class ThreeStepSessionBuilder {
  static buildInteraction(word: any, userProfile: any): ThreeStepInteraction {
    const dominantContext = this.getDominantContext(userProfile);
    const difficultyLevel = userProfile?.vocabularyLevel?.estimatedLevel || 5;

    return {
      word: word.word || word.text,
      difficulty: word.difficulty || 5,
      cluster: word.cluster || 'general',
      definition: this.buildDefinition(word),
      task: this.buildPersonalizedTask(word, dominantContext, difficultyLevel),
      anchor: this.buildMemorableAnchor(word, dominantContext)
    };
  }

  private static buildDefinition(word: any): ThreeStepInteraction['definition'] {
    return {
      text: word.definition || `The meaning and usage of "${word.word || word.text}"`,
      partOfSpeech: word.partOfSpeech || this.inferPartOfSpeech(word.word || word.text),
      etymology: word.etymology
    };
  }

  private static buildPersonalizedTask(word: any, context: string, difficultyLevel: number): ThreeStepInteraction['task'] {
    const wordText = word.word || word.text;
    const taskTemplates = this.getTaskTemplates(context);

    const taskType = difficultyLevel < 4 ? 'choice' : difficultyLevel < 7 ? 'scenario' : 'application';

    switch (taskType) {
      case 'choice':
        return this.buildChoiceTask(wordText, context, taskTemplates);
      case 'scenario':
        return this.buildScenarioTask(wordText, context, taskTemplates);
      case 'application':
        return this.buildApplicationTask(wordText, context, taskTemplates);
      default:
        return this.buildScenarioTask(wordText, context, taskTemplates);
    }
  }

  private static buildMemorableAnchor(word: any, context: string): ThreeStepInteraction['anchor'] {
    const wordText = word.word || word.text;
    const anchorTemplates = this.getAnchorTemplates(context);
    const anchorType = this.selectAnchorType(word);

    return {
      type: anchorType,
      prompt: `Picture this moment where "${wordText}" becomes unforgettable:`,
      scene: anchorTemplates.scenes[anchorType].replace('{word}', wordText),
      context: context,
      reflection: anchorTemplates.reflections[anchorType].replace('{word}', wordText)
    };
  }

  private static getDominantContext(userProfile: any): string {
    if (!userProfile?.contextPreferences) return 'general';
    const prefs = userProfile.contextPreferences;
    const dominant = Object.entries(prefs).sort(([,a]: any, [,b]: any) => b - a)[0];
    return dominant?.[0] || 'general';
  }

  private static getTaskTemplates(context: string): any {
    const templates: Record<string, any> = {
      work: {
        scenario: [
          `You're in a team meeting and need to {verb}. A colleague suggests: "{incorrect}". You realize "{word}" is more precise. Why?`,
          `During a client presentation, you want to {verb}. Would you use "{word}" or a simpler term? When does "{word}" add value?`,
          `You're writing an important email to leadership. The word "{word}" comes to mind. Is this the moment to use it?`
        ],
        completion: [
          `In a performance review, you describe a colleague's contribution as _______ because "{word}" captures...`,
          `When negotiating a deadline, you explain the situation is _______ , using "{word}" to convey...`
        ],
        application: [
          `You're mediating a conflict between departments. How would "{word}" help you articulate the core issue without assigning blame?`,
          `A project is failing. Using "{word}", frame the situation in a way that motivates action rather than defensiveness.`
        ]
      },
      academic: {
        scenario: [
          `You're writing your thesis and need to {verb}. Your advisor suggests "{incorrect}". But "{word}" is more academically precise. How so?`,
          `During a seminar, a peer misuses "{word}". What distinction would you clarify?`,
          `You're presenting research findings. Where does "{word}" strengthen your argument vs. where it's unnecessary jargon?`
        ],
        completion: [
          `In your literature review, you describe the theoretical gap as _______ because "{word}" precisely indicates...`,
          `When critiquing a methodology, you note the approach is _______ , with "{word}" highlighting...`
        ],
        application: [
          `You're peer-reviewing a paper. The author's argument needs "{word}" to be complete. Where would you suggest adding it and why?`,
          `Explain a complex concept to undergraduates. How do you introduce "{word}" without overwhelming them?`
        ]
      },
      creative: {
        scenario: [
          `You're describing a character's emotional state. "{word}" captures something specific. What does it reveal that simpler words miss?`,
          `In your narrative, a scene needs tension. How does "{word}" create atmosphere vs. just stating facts?`,
          `You're editing dialogue. A character uses "{word}". Does it fit their voice, or does it feel forced?`
        ],
        completion: [
          `The protagonist's world feels _______ , and using "{word}" rather than a simpler term conveys...`,
          `In the climactic moment, the antagonist's motivation is revealed as _______ , with "{word}" suggesting...`
        ],
        application: [
          `Write a single sentence where "{word}" creates an image that lingers. What makes it work?`,
          `You're receiving feedback that your writing feels flat. How does "{word}" add dimension to this passage?`
        ]
      },
      social: {
        scenario: [
          `A friend is upset, and you want to {verb}. You think of "{word}". Is this the time for precision, or would simpler language show more empathy?`,
          `You're describing a relationship dynamic to someone. "{word}" articulates it perfectly. What nuance does it capture?`,
          `In a difficult conversation, "{word}" comes to mind. Does using it help understanding or create distance?`
        ],
        completion: [
          `You're explaining why a friendship changed: "It wasn't conflict, it was more _______ ," using "{word}" to express...`,
          `When someone asks about your feelings, you say they're _______ , choosing "{word}" because...`
        ],
        application: [
          `Someone misunderstands your intentions. How does "{word}" help you clarify without sounding defensive?`,
          `You want to compliment someone meaningfully. How does "{word}" make your appreciation specific and genuine?`
        ]
      },
      technical: {
        scenario: [
          `You're documenting a system architecture. A colleague writes "{incorrect}". You suggest "{word}" instead. What precision does it add?`,
          `During code review, you need to {verb}. Would "{word}" make your feedback clearer to the team?`,
          `You're explaining a technical concept to non-engineers. Is "{word}" necessary, or does it create unnecessary barriers?`
        ],
        completion: [
          `In the system design doc, you describe the data flow as _______ because "{word}" technically specifies...`,
          `When debugging, you identify the issue as _______ , using "{word}" to distinguish it from...`
        ],
        application: [
          `You're writing API documentation. Where does "{word}" improve clarity vs. where plain language is better?`,
          `A junior developer is confused. How do you use "{word}" to teach the concept without overwhelming them?`
        ]
      }
    };

    return templates[context] || templates['general'] || {
      scenario: [`How would you use "{word}" in context?`],
      completion: [`Complete this: The situation was _______ because "{word}"...`],
      application: [`Apply "{word}" to a real situation.`]
    };
  }

  private static getAnchorTemplates(context: string): any {
    const templates: Record<string, any> = {
      work: {
        scenes: {
          visual_metaphor: `Imagine a conference room. Someone uses "{word}" at exactly the right moment—and the whole room shifts. What changed?`,
          story_fragment: `You're drafting an email. You hover over "send", then replace a weak phrase with "{word}". The response you get is different. How?`,
          sensory_scene: `It's a tense negotiation. The air is thick. Then someone says "{word}", and suddenly everyone understands what's really at stake.`,
          power_moment: `The CEO asks for clarity. Everyone fumbles. Then you say "{word}"—one word that cuts through the confusion. You see it click.`
        },
        reflections: {
          visual_metaphor: `"{word}" is the difference between being heard and being understood.`,
          story_fragment: `"{word}" transforms vague concern into actionable insight.`,
          sensory_scene: `"{word}" names what everyone feels but hasn't articulated.`,
          power_moment: `"{word}" is precision when precision matters most.`
        }
      },
      academic: {
        scenes: {
          visual_metaphor: `Picture a tangled web of ideas. "{word}" is the single thread that, when pulled, makes the pattern clear.`,
          story_fragment: `You're defending your thesis. A question threatens your argument. Then you use "{word}"—and the examiner nods. They get it now.`,
          sensory_scene: `The library at 2am. You've read twenty papers. Finally, "{word}" appears in a footnote—and suddenly your entire argument crystallizes.`,
          power_moment: `In a seminar, someone challenges your claim. You respond with one phrase containing "{word}". The room goes quiet—in the good way.`
        },
        reflections: {
          visual_metaphor: `"{word}" reveals structure in apparent chaos.`,
          story_fragment: `"{word}" is the conceptual anchor your argument needs.`,
          sensory_scene: `"{word}" is the breakthrough after hours of confusion.`,
          power_moment: `"{word}" transforms intuition into rigorous analysis.`
        }
      },
      creative: {
        scenes: {
          visual_metaphor: `Imagine painting a face. Without "{word}", you have features. With it, you have expression.`,
          story_fragment: `A character walks into a room. You could say they entered. But "{word}" shows how they entered—and everything about them shifts.`,
          sensory_scene: `Picture twilight. Not just "getting dark", but that specific moment "{word}" captures—when day hasn't quite surrendered to night.`,
          power_moment: `You read your draft aloud. One word feels wrong. You replace it with "{word}"—and suddenly the sentence breathes.`
        },
        reflections: {
          visual_metaphor: `"{word}" adds dimension to flat description.`,
          story_fragment: `"{word}" shows what telling merely states.`,
          sensory_scene: `"{word}" captures the specific in the general.`,
          power_moment: `"{word}" is the difference between prose and poetry.`
        }
      },
      social: {
        scenes: {
          visual_metaphor: `Think of a friend struggling to explain their feelings. They circle around it. Then you offer "{word}"—and they exhale with relief.`,
          story_fragment: `You're trying to describe why a relationship feels different. Everything you say is close but not quite right. Then: "{word}". That's it exactly.`,
          sensory_scene: `A difficult conversation. You're both frustrated. Then you use "{word}"—not to win, but to understand. The tension drops.`,
          power_moment: `Someone shares something vulnerable. You respond with "{word}" in a way that shows you truly heard them. They know they're not alone.`
        },
        reflections: {
          visual_metaphor: `"{word}" gives form to what we feel but can't name.`,
          story_fragment: `"{word}" creates recognition: "Yes, exactly that."`,
          sensory_scene: `"{word}" builds bridges across misunderstanding.`,
          power_moment: `"{word}" is how we show each other we're truly listening.`
        }
      },
      technical: {
        scenes: {
          visual_metaphor: `Imagine debugging for hours. Then you see it: the issue is "{word}". One word that explains everything that was breaking.`,
          story_fragment: `You're reviewing code. Something feels wrong but you can't pinpoint it. Then you realize: it's "{word}". The architecture finally makes sense.`,
          sensory_scene: `3am, production is down. Everyone's panicking. Someone says "{word}" and suddenly the team knows exactly what to check.`,
          power_moment: `The client asks a technical question. Your team uses jargon. You rephrase with "{word}"—and the client understands immediately.`
        },
        reflections: {
          visual_metaphor: `"{word}" is diagnostic precision when systems fail.`,
          story_fragment: `"{word}" transforms scattered symptoms into clear diagnosis.`,
          sensory_scene: `"{word}" is the shared language of effective teams.`,
          power_moment: `"{word}" bridges expert knowledge and clear communication.`
        }
      }
    };

    return templates[context] || templates['general'] || {
      scenes: {
        visual_metaphor: `Picture a moment where "{word}" perfectly captures what's happening.`,
        story_fragment: `Think of a time "{word}" would have been the exact right choice.`,
        sensory_scene: `Imagine a scene where "{word}" creates instant understanding.`,
        power_moment: `Envision using "{word}" at precisely the right moment.`
      },
      reflections: {
        visual_metaphor: `"{word}" creates clarity.`,
        story_fragment: `"{word}" is precision when it matters.`,
        sensory_scene: `"{word}" names the specific.`,
        power_moment: `"{word}" is the exact right choice.`
      }
    };
  }

  private static buildChoiceTask(word: string, context: string, templates: any): any {
    const scenarios = templates.scenario || [];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)] || '';
    const filled = scenario.replace('{word}', word).replace('{verb}', 'describe the situation').replace('{incorrect}', this.getConfusableWord(word));

    return {
      type: 'choice',
      prompt: filled,
      context,
      instruction: 'Which situation shows authentic use of this word?',
      options: [
        `When you need precise, specific communication`,
        `When simpler language would work just as well`,
        `When you want to sound more sophisticated`,
        `Anytime in casual conversation`
      ],
      correctAnswer: `When you need precise, specific communication`
    };
  }

  private static buildScenarioTask(word: string, context: string, templates: any): any {
    const scenarios = templates.scenario || [];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)] || '';
    const filled = scenario.replace('{word}', word).replace('{verb}', 'communicate clearly').replace('{incorrect}', this.getConfusableWord(word));

    return {
      type: 'scenario',
      prompt: filled,
      context,
      instruction: 'Type your response:'
    };
  }

  private static buildApplicationTask(word: string, context: string, templates: any): any {
    const applications = templates.application || [];
    const application = applications[Math.floor(Math.random() * applications.length)] || '';
    const filled = application.replace('{word}', word);

    return {
      type: 'application',
      prompt: filled,
      context,
      instruction: 'Apply this word to solve the situation:'
    };
  }

  private static selectAnchorType(word: any): ThreeStepInteraction['anchor']['type'] {
    const cluster = (word.cluster || '').toLowerCase();
    if (cluster.includes('emotion') || cluster.includes('feeling') || cluster.includes('abstract')) return 'sensory_scene';
    if (cluster.includes('technical') || cluster.includes('concrete') || cluster.includes('business')) return 'visual_metaphor';
    if (word.partOfSpeech === 'verb') return 'power_moment';
    return 'story_fragment';
  }

  private static getConfusableWord(word: string): string {
    return 'describe';
  }

  private static inferPartOfSpeech(word: string): string {
    if (!word) return 'noun';
    if (word.endsWith('ly')) return 'adverb';
    if (word.endsWith('tion') || word.endsWith('ness')) return 'noun';
    if (word.endsWith('ive') || word.endsWith('ful')) return 'adjective';
    return 'noun';
  }
}

export default ThreeStepSessionBuilder;
