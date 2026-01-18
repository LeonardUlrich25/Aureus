#!/usr/bin/env python3
import re
import json

# Read wordContent.ts
with open('data/wordContent.ts', 'r') as f:
    content = f.read()

# Extract all words with their definitions and anchor categories
words_data = {}

# Split by wordContent entries
word_blocks = re.findall(r"{\s*word: '([^']+)'.*?definition: '([^']+)'.*?anchor:\s*{\s*categories:\s*\[([^\]]+)\]", content, re.DOTALL)

print(f"Found {len(word_blocks)} words with anchors")

# Create a mapping of contextual examples
def generate_context_aware_example(word, definition, category):
    """Generate a contextual example that connects word to category"""
    
    # Make the example feel natural and specific to the word-category pairing
    def_lower = definition.lower()
    cat_lower = category.lower()
    
    # Generic fallback - will be specialized by patterns below
    example = f"When {word} matters in {category.lower()}"
    
    # WORK/PROFESSIONAL CONTEXT
    if 'work' in def_lower or 'job' in def_lower or 'professional' in def_lower:
        if 'teamwork' in cat_lower or 'team' in cat_lower or 'collaboration' in cat_lower:
            example = f"When your {word} makes a difference in team success"
        elif 'project' in cat_lower:
            example = f"When {word} determines project outcome"
        elif 'leadership' in cat_lower:
            example = f"When {word} defines your leadership style"
        elif 'communication' in cat_lower:
            example = f"When {word} shapes workplace communication"
        elif 'manage' in cat_lower or 'delegation' in cat_lower:
            example = f"When {word} enables better delegation"
        elif 'conflict' in cat_lower or 'dispute' in cat_lower:
            example = f"When {word} resolves workplace conflict"
    
    # GROWTH/LEARNING CONTEXT
    elif 'learn' in def_lower or 'skill' in def_lower or 'ability' in def_lower or 'develop' in def_lower:
        if 'growth' in cat_lower or 'development' in cat_lower or 'learning' in cat_lower:
            example = f"When {word} accelerates your growth"
        elif 'mastery' in cat_lower:
            example = f"When {word} signals mastery"
        elif 'challenge' in cat_lower:
            example = f"When {word} becomes a learning challenge"
        elif 'practice' in cat_lower:
            example = f"When {word} emerges through deliberate practice"
        elif 'resilience' in cat_lower:
            example = f"When {word} builds resilience in learning"
    
    # RELATIONSHIP/EMOTIONAL CONTEXT
    elif 'feel' in def_lower or 'emotion' in def_lower or 'connection' in def_lower or 'relationship' in def_lower:
        if 'relationship' in cat_lower or 'connection' in cat_lower:
            example = f"When {word} deepens your relationships"
        elif 'empathy' in cat_lower or 'emotional' in cat_lower:
            example = f"When {word} opens emotional understanding"
        elif 'love' in cat_lower or 'affection' in cat_lower:
            example = f"When {word} deepens affection"
        elif 'support' in cat_lower:
            example = f"When {word} provides emotional support"
        elif 'grief' in cat_lower or 'loss' in cat_lower:
            example = f"When {word} helps you through loss"
        elif 'belonging' in cat_lower:
            example = f"When {word} creates belonging"
        elif 'alone' in cat_lower or 'solitude' in cat_lower:
            example = f"When {word} deepens solitude"
    
    # DECISION/JUDGMENT CONTEXT
    elif 'choice' in def_lower or 'decision' in def_lower or 'judge' in def_lower or 'evaluate' in def_lower:
        if 'decision' in cat_lower or 'choose' in cat_lower:
            example = f"When {word} guides an important decision"
        elif 'judgment' in cat_lower:
            example = f"When {word} informs your judgment"
        elif 'value' in cat_lower or 'priority' in cat_lower:
            example = f"When {word} clarifies what matters"
        elif 'risk' in cat_lower:
            example = f"When {word} shapes risk assessment"
    
    # PROBLEM/SOLUTION CONTEXT
    elif 'problem' in def_lower or 'solution' in def_lower or 'challenge' in def_lower or 'solve' in def_lower:
        if 'problem' in cat_lower or 'solving' in cat_lower or 'trouble' in cat_lower:
            example = f"When {word} becomes key to solving the problem"
        elif 'struggle' in cat_lower or 'difficulty' in cat_lower:
            example = f"When {word} marks real struggle"
        elif 'obstacle' in cat_lower:
            example = f"When {word} presents an obstacle"
        elif 'resilience' in cat_lower:
            example = f"When {word} tests your resilience"
        elif 'courage' in cat_lower:
            example = f"When {word} requires courage"
    
    # CHANGE/TRANSFORMATION CONTEXT
    elif 'change' in def_lower or 'transform' in def_lower or 'shift' in def_lower or 'evolve' in def_lower:
        if 'change' in cat_lower or 'transform' in cat_lower or 'evolution' in cat_lower:
            example = f"When {word} signals transformative change"
        elif 'time' in cat_lower or 'history' in cat_lower:
            example = f"When {word} marks a turning point"
        elif 'adapt' in cat_lower or 'flexibility' in cat_lower:
            example = f"When {word} demands flexibility"
        elif 'progress' in cat_lower:
            example = f"When {word} proves your progress"
    
    # UNDERSTANDING/KNOWLEDGE CONTEXT
    elif 'understand' in def_lower or 'know' in def_lower or 'aware' in def_lower or 'insight' in def_lower:
        if 'understand' in cat_lower or 'insight' in cat_lower or 'aware' in cat_lower:
            example = f"When {word} brings true understanding"
        elif 'reflection' in cat_lower or 'self' in cat_lower:
            example = f"When {word} enables self-reflection"
        elif 'bias' in cat_lower or 'assumption' in cat_lower:
            example = f"When {word} reveals hidden bias"
        elif 'truth' in cat_lower or 'reality' in cat_lower:
            example = f"When {word} shows reality"
    
    # QUALITY/VALUE CONTEXT
    elif 'quality' in def_lower or 'value' in def_lower or 'worth' in def_lower or 'excellence' in def_lower:
        if 'excellence' in cat_lower or 'quality' in cat_lower or 'standard' in cat_lower:
            example = f"When {word} elevates quality"
        elif 'craft' in cat_lower or 'skill' in cat_lower:
            example = f"When {word} shows true craftsmanship"
        elif 'appreciation' in cat_lower:
            example = f"When {word} deepens appreciation"
    
    # CREATIVE/ARTISTIC CONTEXT
    elif 'creative' in def_lower or 'art' in def_lower or 'imagine' in def_lower or 'express' in def_lower:
        if 'creative' in cat_lower or 'art' in cat_lower or 'express' in cat_lower:
            example = f"When {word} fuels creative expression"
        elif 'beauty' in cat_lower or 'aesthetic' in cat_lower:
            example = f"When {word} reveals beauty"
        elif 'story' in cat_lower or 'narrative' in cat_lower:
            example = f"When {word} shapes a story"
    
    # SOCIAL/CULTURAL CONTEXT
    elif 'social' in def_lower or 'culture' in def_lower or 'group' in def_lower or 'community' in def_lower:
        if 'culture' in cat_lower or 'society' in cat_lower or 'community' in cat_lower:
            example = f"When {word} shapes cultural moment"
        elif 'norm' in cat_lower or 'convention' in cat_lower:
            example = f"When {word} challenges convention"
        elif 'identity' in cat_lower:
            example = f"When {word} shapes identity"
    
    # LANGUAGE/COMMUNICATION CONTEXT
    elif 'word' in def_lower or 'language' in def_lower or 'speak' in def_lower or 'communicate' in def_lower or 'express' in def_lower:
        if 'language' in cat_lower or 'communicate' in cat_lower or 'speak' in cat_lower:
            example = f"When {word} transforms how you speak"
        elif 'meaning' in cat_lower or 'nuance' in cat_lower:
            example = f"When {word} adds crucial nuance"
        elif 'misunderstand' in cat_lower or 'clarity' in cat_lower:
            example = f"When {word} prevents misunderstanding"
    
    # MORAL/ETHICAL CONTEXT
    elif 'good' in def_lower or 'bad' in def_lower or 'right' in def_lower or 'wrong' in def_lower or 'ethical' in def_lower or 'moral' in def_lower:
        if 'ethical' in cat_lower or 'moral' in cat_lower or 'right' in cat_lower or 'good' in cat_lower:
            example = f"When {word} guides ethical choice"
        elif 'integrity' in cat_lower or 'honest' in cat_lower:
            example = f"When {word} tests your integrity"
        elif 'justice' in cat_lower or 'fair' in cat_lower:
            example = f"When {word} demands fairness"
    
    # BOUNDARY/LIMIT CONTEXT
    elif 'boundary' in def_lower or 'limit' in def_lower or 'edge' in def_lower or 'border' in def_lower:
        if 'boundary' in cat_lower or 'limit' in cat_lower:
            example = f"When {word} establishes healthy boundaries"
        elif 'self' in cat_lower or 'respect' in cat_lower:
            example = f"When {word} protects your self-respect"
    
    # PEACE/CALM CONTEXT
    elif 'peace' in def_lower or 'calm' in def_lower or 'quiet' in def_lower or 'rest' in def_lower:
        if 'peace' in cat_lower or 'calm' in cat_lower or 'quiet' in cat_lower:
            example = f"When {word} brings inner peace"
        elif 'sanctuary' in cat_lower or 'refuge' in cat_lower:
            example = f"When {word} offers sanctuary"
        elif 'mindfulness' in cat_lower:
            example = f"When {word} enables presence"
    
    # FAILURE/SUCCESS CONTEXT
    elif 'fail' in def_lower or 'success' in def_lower or 'win' in def_lower or 'lose' in def_lower or 'achievement' in def_lower:
        if 'failure' in cat_lower or 'fail' in cat_lower or 'mistake' in cat_lower:
            example = f"When {word} emerges from failure"
        elif 'success' in cat_lower or 'win' in cat_lower or 'achieve' in cat_lower:
            example = f"When {word} leads to success"
        elif 'setback' in cat_lower or 'obstacle' in cat_lower:
            example = f"When {word} overcomes setback"
    
    # TIME CONTEXT
    elif 'time' in def_lower or 'moment' in def_lower or 'period' in def_lower or 'age' in def_lower or 'era' in def_lower:
        if 'time' in cat_lower or 'moment' in cat_lower or 'history' in cat_lower:
            example = f"When {word} marks a defining moment"
        elif 'nostalgia' in cat_lower or 'memory' in cat_lower:
            example = f"When {word} awakens memory"
    
    # NATURE/ENVIRONMENT CONTEXT
    elif 'nature' in def_lower or 'environment' in def_lower or 'natural' in def_lower or 'earth' in def_lower:
        if 'nature' in cat_lower or 'environment' in cat_lower or 'world' in cat_lower:
            example = f"When {word} reflects in nature"
        elif 'sustain' in cat_lower or 'responsibility' in cat_lower:
            example = f"When {word} shapes environmental choice"
    
    # If no specific pattern matched, use a more natural default
    if example == f"When {word} matters in {category.lower()}":
        example = f"When {word} influences {category.lower()}"
    
    return example


# Process all words
word_examples = {}
for word, definition, categories_str in word_blocks:
    categories = [cat.strip().strip("'\"") for cat in categories_str.split(',')]
    word_examples[word] = {}
    
    for category in categories:
        example = generate_context_aware_example(word, definition, category)
        word_examples[word][category] = example

# Output as TypeScript
output = "const wordAnchorExamples: Record<string, Record<string, string>> = {\n"

for word in sorted(word_examples.keys()):
    output += f"  '{word}': {{\n"
    for category, example in word_examples[word].items():
        # Escape single quotes
        example_escaped = example.replace("'", "\\'")
        output += f"    '{category}': '{example_escaped}',\n"
    output += "  },\n"

output += "};\n\nexport default wordAnchorExamples;"

with open('lib/wordAnchorExamples.ts', 'w') as f:
    f.write(output)

print(f"Generated {len(word_examples)} words with context-aware examples")
print("Wrote to lib/wordAnchorExamples.ts")

# Also print some samples
print("\nSample examples:")
for word in sorted(word_examples.keys())[:5]:
    print(f"\n{word}:")
    for category, example in list(word_examples[word].items())[:2]:
        print(f"  {category}: {example}")
