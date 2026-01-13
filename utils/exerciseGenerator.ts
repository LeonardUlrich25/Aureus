interface ExerciseOption {
  id: string;
  text: string;
}

interface Exercise {
  question: string;
  options: ExerciseOption[];
  correctAnswer: string;
}

export function generateExerciseForWord(word: string, cluster: string): Exercise {
  const exercises: Record<string, Exercise> = {
    synergy: {
      question: 'Where is synergy happening?',
      options: [
        { id: 'A', text: 'Two people working separately' },
        { id: 'B', text: 'One person doing everything' },
        { id: 'C', text: 'Two people combining skills for better results' }
      ],
      correctAnswer: 'C'
    },
    nuance: {
      question: 'Which sentence shows nuance?',
      options: [
        { id: 'A', text: 'The movie was good' },
        { id: 'B', text: 'The film balanced humor with melancholy, creating unexpected depth' },
        { id: 'C', text: 'I liked the movie' }
      ],
      correctAnswer: 'B'
    },
    pedagogy: {
      question: 'What does pedagogy involve?',
      options: [
        { id: 'A', text: 'Only teaching children' },
        { id: 'B', text: 'The theory and practice of education' },
        { id: 'C', text: 'Grading tests' }
      ],
      correctAnswer: 'B'
    },
    pithy: {
      question: 'Which statement is pithy?',
      options: [
        { id: 'A', text: 'Less is more' },
        { id: 'B', text: 'I think that perhaps in some situations it might be better to use fewer words when you are trying to communicate something important' },
        { id: 'C', text: 'Words are important' }
      ],
      correctAnswer: 'A'
    },
    forlorn: {
      question: 'What best describes forlorn?',
      options: [
        { id: 'A', text: 'Excited and energetic' },
        { id: 'B', text: 'Pitifully sad and abandoned' },
        { id: 'C', text: 'Angry and loud' }
      ],
      correctAnswer: 'B'
    }
  };

  return exercises[word] || {
    question: `Which sentence best uses "${word}"?`,
    options: [
      { id: 'A', text: 'Option A (context-appropriate use)' },
      { id: 'B', text: 'Option B (incorrect use)' },
      { id: 'C', text: 'Option C (incorrect use)' }
    ],
    correctAnswer: 'A'
  };
}

export default generateExerciseForWord;
