#!/usr/bin/env python3
import re

# Read wordContent.ts
with open('data/wordContent.ts', 'r') as f:
    content = f.read()

# Split by word objects - they start with "{ word: '" and end with "},"
word_pattern = r"\{\s*word:\s*'([^']+)'.*?definition:\s*'([^']+?(?=',\s*(?:exercise|cluster)))"
word_blocks = re.findall(word_pattern, content, re.DOTALL)

print(f"Found {len(word_blocks)} words (basic method)")

# Better approach: find each word entry with its anchor categories
def extract_all_words():
    """Extract word data by parsing the actual structure"""
    words_data = []
    
    # Find all word: 'xxx' entries
    word_starts = [(m.start(), m.group(1)) for m in re.finditer(r"word:\s*'([^']+)'", content)]
    
    for i, (start, word) in enumerate(word_starts):
        # Find the section for this word (until next word entry or end)
        if i + 1 < len(word_starts):
            end = word_starts[i + 1][0]
        else:
            end = len(content)
        
        word_section = content[start:end]
        
        # Extract definition
        def_match = re.search(r"definition:\s*'([^']*(?:[^']|'')*?)',", word_section, re.DOTALL)
        definition = def_match.group(1) if def_match else ""
        
        # Extract categories
        cat_match = re.search(r"categories:\s*\[([^\]]+)\]", word_section, re.DOTALL)
        if cat_match:
            categories_str = cat_match.group(1)
            categories = [c.strip().strip("'\"") for c in categories_str.split(',')]
            words_data.append((word, definition, categories))
    
    return words_data

words_data = extract_all_words()
print(f"Successfully extracted {len(words_data)} words with categories")

# Generate context-aware examples
def generate_context_aware_example(word, definition, category):
    """Generate a contextual example that connects word to category"""
    
    def_lower = definition.lower()
    cat_lower = category.lower()
    
    # Default
    example = f"When {word} influences {category.lower()}"
    
    # WORK/PROFESSIONAL CONTEXT
    if 'work' in def_lower or 'job' in def_lower or 'professional' in def_lower or 'business' in def_lower:
        if 'team' in cat_lower or 'collaboration' in cat_lower:
            example = f"When your {word} strengthens your team"
        elif 'project' in cat_lower:
            example = f"When {word} determines project success"
        elif 'leadership' in cat_lower:
            example = f"When {word} defines strong leadership"
        elif 'communication' in cat_lower:
            example = f"When {word} shapes workplace communication"
        elif 'manage' in cat_lower or 'delegation' in cat_lower:
            example = f"When {word} enables better delegation"
        elif 'conflict' in cat_lower:
            example = f"When {word} resolves workplace conflict"
        elif 'efficiency' in cat_lower or 'productivity' in cat_lower:
            example = f"When {word} boosts your efficiency"
    
    # GROWTH/LEARNING CONTEXT
    elif 'learn' in def_lower or 'skill' in def_lower or 'ability' in def_lower or 'develop' in def_lower or 'improve' in def_lower:
        if 'growth' in cat_lower or 'development' in cat_lower or 'learning' in cat_lower:
            example = f"When {word} accelerates your growth"
        elif 'mastery' in cat_lower:
            example = f"When {word} marks real mastery"
        elif 'practice' in cat_lower:
            example = f"When {word} emerges through deliberate practice"
        elif 'challenge' in cat_lower:
            example = f"When {word} presents a worthy challenge"
    
    # RELATIONSHIP/EMOTIONAL CONTEXT
    elif 'feel' in def_lower or 'emotion' in def_lower or 'connection' in def_lower or 'relationship' in def_lower or 'human' in def_lower:
        if 'relationship' in cat_lower or 'connection' in cat_lower:
            example = f"When {word} deepens your relationships"
        elif 'empathy' in cat_lower or 'emotional' in cat_lower:
            example = f"When {word} opens emotional understanding"
        elif 'support' in cat_lower:
            example = f"When {word} provides genuine support"
        elif 'belonging' in cat_lower:
            example = f"When {word} creates a sense of belonging"
    
    # DECISION/JUDGMENT CONTEXT
    elif 'choice' in def_lower or 'decision' in def_lower or 'judge' in def_lower or 'evaluate' in def_lower:
        if 'decision' in cat_lower or 'choose' in cat_lower:
            example = f"When {word} guides your important decisions"
        elif 'judgment' in cat_lower:
            example = f"When {word} informs good judgment"
        elif 'value' in cat_lower or 'priority' in cat_lower:
            example = f"When {word} clarifies what truly matters"
    
    # PROBLEM/SOLUTION CONTEXT
    elif 'problem' in def_lower or 'solution' in def_lower or 'solve' in def_lower or 'trouble' in def_lower:
        if 'problem' in cat_lower or 'solving' in cat_lower:
            example = f"When {word} becomes key to solving the problem"
        elif 'challenge' in cat_lower:
            example = f"When {word} presents a real challenge"
        elif 'obstacle' in cat_lower:
            example = f"When {word} presents an obstacle"
    
    # CHANGE/TRANSFORMATION CONTEXT
    elif 'change' in def_lower or 'transform' in def_lower or 'shift' in def_lower or 'evolve' in def_lower:
        if 'change' in cat_lower or 'transform' in cat_lower:
            example = f"When {word} signals transformative change"
        elif 'progress' in cat_lower:
            example = f"When {word} marks real progress"
        elif 'adapt' in cat_lower or 'flexibility' in cat_lower:
            example = f"When {word} demands flexibility"
    
    # UNDERSTANDING/KNOWLEDGE CONTEXT
    elif 'understand' in def_lower or 'know' in def_lower or 'aware' in def_lower or 'insight' in def_lower or 'realize' in def_lower:
        if 'insight' in cat_lower or 'aware' in cat_lower or 'understand' in cat_lower:
            example = f"When {word} brings genuine understanding"
        elif 'reflection' in cat_lower or 'self' in cat_lower:
            example = f"When {word} enables self-reflection"
    
    # QUALITY/VALUE CONTEXT
    elif 'quality' in def_lower or 'value' in def_lower or 'worth' in def_lower or 'excellence' in def_lower or 'standard' in def_lower:
        if 'quality' in cat_lower or 'excellence' in cat_lower:
            example = f"When {word} elevates quality"
        elif 'craft' in cat_lower:
            example = f"When {word} shows true craftsmanship"
        elif 'worth' in cat_lower or 'value' in cat_lower:
            example = f"When {word} demonstrates real value"
    
    # CREATIVE/ARTISTIC CONTEXT
    elif 'creative' in def_lower or 'art' in def_lower or 'imagine' in def_lower or 'express' in def_lower:
        if 'creative' in cat_lower or 'art' in cat_lower:
            example = f"When {word} fuels creative expression"
        elif 'beauty' in cat_lower:
            example = f"When {word} reveals beauty"
    
    # SOCIAL/CULTURAL CONTEXT
    elif 'social' in def_lower or 'culture' in def_lower or 'group' in def_lower or 'community' in def_lower:
        if 'culture' in cat_lower or 'society' in cat_lower:
            example = f"When {word} shapes cultural moments"
        elif 'identity' in cat_lower:
            example = f"When {word} shapes identity"
    
    # LANGUAGE/COMMUNICATION CONTEXT
    elif 'word' in def_lower or 'language' in def_lower or 'speak' in def_lower or 'communicate' in def_lower:
        if 'language' in cat_lower or 'communicate' in cat_lower:
            example = f"When {word} transforms how you speak"
        elif 'meaning' in cat_lower or 'nuance' in cat_lower:
            example = f"When {word} adds crucial nuance"
    
    # MORAL/ETHICAL CONTEXT
    elif 'good' in def_lower or 'bad' in def_lower or 'right' in def_lower or 'wrong' in def_lower or 'ethical' in def_lower or 'moral' in def_lower:
        if 'ethical' in cat_lower or 'moral' in cat_lower:
            example = f"When {word} guides ethical choices"
        elif 'integrity' in cat_lower:
            example = f"When {word} tests your integrity"
    
    # PEACE/CALM CONTEXT
    elif 'peace' in def_lower or 'calm' in def_lower or 'quiet' in def_lower or 'rest' in def_lower or 'balance' in def_lower:
        if 'peace' in cat_lower or 'calm' in cat_lower:
            example = f"When {word} brings inner peace"
        elif 'sanctuary' in cat_lower:
            example = f"When {word} offers sanctuary"
    
    # FAILURE/SUCCESS CONTEXT
    elif 'fail' in def_lower or 'success' in def_lower or 'achieve' in def_lower or 'accomplish' in def_lower:
        if 'failure' in cat_lower or 'fail' in cat_lower:
            example = f"When {word} emerges from failure"
        elif 'success' in cat_lower or 'achieve' in cat_lower:
            example = f"When {word} leads to real success"
    
    # TIME CONTEXT
    elif 'time' in def_lower or 'moment' in def_lower or 'period' in def_lower or 'history' in def_lower:
        if 'time' in cat_lower or 'moment' in cat_lower:
            example = f"When {word} marks a defining moment"
        elif 'history' in cat_lower:
            example = f"When {word} shapes history"
    
    # NATURE/ENVIRONMENT CONTEXT
    elif 'nature' in def_lower or 'environment' in def_lower or 'natural' in def_lower:
        if 'nature' in cat_lower or 'environment' in cat_lower:
            example = f"When {word} reflects in nature"
    
    # EFFICIENCY/SCALE CONTEXT  
    elif 'efficient' in def_lower or 'scale' in def_lower or 'grow' in def_lower or 'system' in def_lower:
        if 'efficiency' in cat_lower or 'productivity' in cat_lower:
            example = f"When {word} multiplies your efficiency"
        elif 'growth' in cat_lower or 'scale' in cat_lower:
            example = f"When {word} enables sustainable growth"
    
    return example


# Generate all examples
word_examples = {}
for word, definition, categories in words_data:
    word_examples[word] = {}
    for category in categories:
        example = generate_context_aware_example(word, definition, category)
        word_examples[word][category] = example

# Output as TypeScript
output = "const wordAnchorExamples: Record<string, Record<string, string>> = {\n"

for word in sorted(word_examples.keys()):
    output += f"  '{word}': {{\n"
    for category, example in word_examples[word].items():
        example_escaped = example.replace("'", "\\'")
        output += f"    '{category}': '{example_escaped}',\n"
    output += "  },\n"

output += "};\n\nexport default wordAnchorExamples;"

with open('lib/wordAnchorExamples.ts', 'w') as f:
    f.write(output)

print(f"✓ Generated {len(word_examples)} words with context-aware examples")
print("✓ Wrote to lib/wordAnchorExamples.ts")

# Show sample
if word_examples:
    print("\nSample examples:")
    for word in sorted(word_examples.keys())[:3]:
        print(f"\n  {word}:")
        for category, example in list(word_examples[word].items())[:2]:
            print(f"    {category}: {example}")
