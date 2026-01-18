#!/usr/bin/env python3
import re
import json

# Read the wordContent.ts file
with open('data/wordContent.ts', 'r') as f:
    content = f.read()

# Extract all word-category pairs
word_pattern = r"word: '([^']+)'.*?anchor:\s*{[^}]*categories:\s*\[([^\]]+)\]"
matches = re.finditer(word_pattern, content, re.DOTALL)

word_examples = {}

for match in matches:
    word = match.group(1)
    categories_str = match.group(2)
    categories = [cat.strip().strip("'\"") for cat in categories_str.split(',')]
    
    word_examples[word] = {
        'categories': categories,
        'examples': {}
    }

# Generate examples for each word-category combination
example_templates = {
    'Team Project': 'When {word} makes the team project stronger',
    'Collaboration': 'When {word} brings people together',
    'Creative Work': 'When {word} fuels creative expression',
    'Problem Solving': 'When {word} unlocks a solution',
    'Leadership': 'When {word} defines true leadership',
    'Team Management': 'When {word} shapes how you manage the team',
    'Projects': 'When {word} becomes critical to project success',
    'Learning': 'When {word} deepens your understanding',
    'Growth': 'When {word} marks meaningful growth',
    'Efficiency': 'When {word} streamlines what matters',
    'Mastery': 'When {word} shows true mastery',
    'Personal Goals': 'When {word} matters to your personal goal',
    'Competition': 'When {word} gives you competitive advantage',
    'Self-Assessment': 'When honest {word} assessment reveals the truth',
    'Progress': 'When {word} proves your progress',
    'Mentorship': 'When {word} shapes mentor-student connection',
    'Teaching': 'When you teach others about {word}',
    'Inspiration': 'When {word} inspires you forward',
    'Skill Development': 'When {word} accelerates skill growth',
    'Practice': 'When {word} comes through dedicated practice',
    'Confidence': 'When {word} builds your confidence',
    'Achievement': 'When {word} leads to real achievement',
    'Loyalty': 'When {word} demonstrates true loyalty',
    'Commitment': 'When {word} strengthens commitment',
    'Belonging': 'When {word} creates sense of belonging',
    'Values': 'When {word} reflects your deepest values',
    'Education': 'When {word} transforms education',
    'Self-Teaching': 'When {word} guides your self-teaching',
    'Communication': 'When {word} enhances communication',
    'Art': 'When {word} emerges in artistic expression',
    'Relationships': 'When {word} deepens relationships',
    'Decision Making': 'When {word} influences decisions',
    'Workplace': 'When {word} shapes workplace culture',
    'Networking': 'When {word} strengthens your network',
    'Social Events': 'When {word} makes social moments special',
    'Customer Service': 'When {word} defines customer service excellence',
    'Boundaries': 'When {word} helps establish healthy boundaries',
    'Courage': 'When {word} requires courage',
    'Self-Respect': 'When {word} honors self-respect',
    'Understanding': 'When {word} deepens mutual understanding',
    'Vulnerability': 'When {word} invites vulnerability',
    'Connection': 'When {word} creates genuine connection',
    'Writing': 'When {word} elevates your writing',
    'Advice': 'When {word} becomes sage advice',
    'Wisdom': 'When {word} reveals timeless wisdom',
    'Travel': 'When {word} shapes travel experiences',
    'Memory': 'When {word} etches itself into memory',
    'Reading': 'When {word} captures you in reading',
    'Film': 'When {word} moves you in film',
    'Literature': 'When {word} resonates in literature',
    'History': 'When {word} shapes historical moments',
    'Mythology': 'When {word} echoes through mythology',
    'Failure': 'When {word} becomes failure',
    'Meaning': 'When {word} reveals deeper meaning',
    'Loss': 'When {word} accompanies loss',
    'Perspective': 'When {word} shifts your perspective',
    'Hope': 'When {word} kindles hope',
    'Light': 'When {word} shines as light',
    'Possibility': 'When {word} opens new possibilities',
    'Nostalgia': 'When {word} awakens nostalgia',
    'Childhood': 'When {word} connects to childhood',
    'Change': 'When {word} signals change',
    'Love': 'When {word} expresses love',
    'Devotion': 'When {word} shows devotion',
    'Romance': 'When {word} blooms in romance',
    'Repetition': 'When {word} echoes through repetition',
    'Prophecy': 'When {word} feels like prophecy',
    'Attachment': 'When {word} creates attachment',
    'Conflict': 'When {word} fuels conflict',
    'Identity': 'When {word} shapes identity',
    'Nature': 'When {word} appears in nature',
    'Peace': 'When {word} brings peace',
    'Sanctuary': 'When {word} offers sanctuary',
    'Home': 'When {word} feels like home',
    'Consequences': 'When {word} carries consequences',
    'Innocence': 'When {word} represents innocence',
    'Revelation': 'When {word} brings revelation',
    'Impact': 'When {word} makes real impact',
    'Divine': 'When {word} touches the divine',
    'Transformation': 'When {word} transforms everything',
}

# Generate for each word
for word, data in word_examples.items():
    for category in data['categories']:
        if category in example_templates:
            data['examples'][category] = example_templates[category].format(word=word)
        else:
            # Fallback for unknown categories
            data['examples'][category] = f'When {word} matters in {category}'

# Print output
print(json.dumps(word_examples, indent=2))
