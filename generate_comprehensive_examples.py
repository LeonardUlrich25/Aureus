#!/usr/bin/env python3
import re
import json

# Read wordContent.ts
with open('data/wordContent.ts', 'r') as f:
    content = f.read()

# Extract manually-authored examples where they exist
def extract_existing_examples():
    """Extract examples already defined in wordContent.ts"""
    examples = {}
    
    # Find word blocks with examples
    word_pattern = r"word:\s*'([^']+)'.*?examples:\s*{(.*?)}"
    
    for match in re.finditer(word_pattern, content, re.DOTALL):
        word = match.group(1)
        examples_block = match.group(2)
        
        examples[word] = {}
        
        # Extract category: 'example' pairs
        example_pattern = r"'([^']+)':\s*'([^']*(?:[^']|'')*?)'"
        
        for ex_match in re.finditer(example_pattern, examples_block):
            category = ex_match.group(1)
            example = ex_match.group(2)
            examples[word][category] = example
    
    return examples

existing_examples = extract_existing_examples()
print(f"Found {len(existing_examples)} words with manually-authored examples")
for word in sorted(existing_examples.keys()):
    print(f"  ✓ {word}: {len(existing_examples[word])} categories")

# Extract all word definitions and categories
def extract_all_words_and_definitions():
    """Extract word data including definitions and categories"""
    words_data = []
    
    word_starts = [(m.start(), m.group(1)) for m in re.finditer(r"word:\s*'([^']+)'", content)]
    
    for i, (start, word) in enumerate(word_starts):
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

words_data = extract_all_words_and_definitions()
print(f"\nExtracted {len(words_data)} total words with categories")

# Generate context-aware examples
def generate_context_aware_example(word, definition, category):
    """Generate a contextual example that connects word to category"""
    
    def_lower = definition.lower()
    cat_lower = category.lower()
    
    # Default - more specific than before
    example = f"When {word} shapes {category.lower()}"
    
    # WORK/PROFESSIONAL CONTEXT
    if any(x in def_lower for x in ['work', 'job', 'professional', 'business', 'team', 'collaborate', 'project']):
        if 'team' in cat_lower or 'collaboration' in cat_lower or 'teamwork' in cat_lower:
            example = f"When {word} strengthens your team"
        elif 'project' in cat_lower or 'projects' in cat_lower:
            example = f"When {word} determines project success"
        elif 'leadership' in cat_lower:
            example = f"When {word} defines strong leadership"
        elif 'communication' in cat_lower or 'communicate' in cat_lower:
            example = f"When {word} transforms workplace communication"
        elif 'manage' in cat_lower or 'delegation' in cat_lower:
            example = f"When {word} enables better delegation"
        elif 'conflict' in cat_lower or 'dispute' in cat_lower:
            example = f"When {word} resolves workplace conflict"
        elif 'efficiency' in cat_lower or 'productivity' in cat_lower:
            example = f"When {word} multiplies your efficiency"
        elif 'management' in cat_lower:
            example = f"When {word} improves team management"
    
    # GROWTH/LEARNING CONTEXT
    elif any(x in def_lower for x in ['learn', 'skill', 'ability', 'develop', 'improve', 'progress', 'growth']):
        if any(x in cat_lower for x in ['growth', 'development', 'learning', 'learn']):
            example = f"When {word} accelerates your growth"
        elif 'mastery' in cat_lower:
            example = f"When {word} marks real mastery"
        elif 'practice' in cat_lower:
            example = f"When {word} emerges through deliberate practice"
        elif 'challenge' in cat_lower or 'challenges' in cat_lower:
            example = f"When {word} presents a worthy challenge"
        elif 'skill' in cat_lower or 'skills' in cat_lower:
            example = f"When {word} sharpens your skills"
    
    # RELATIONSHIP/EMOTIONAL CONTEXT
    elif any(x in def_lower for x in ['feel', 'emotion', 'connect', 'relation', 'human', 'care', 'support', 'empathy']):
        if any(x in cat_lower for x in ['relationship', 'connection', 'relate', 'connections']):
            example = f"When {word} deepens your relationships"
        elif 'empathy' in cat_lower:
            example = f"When {word} opens emotional understanding"
        elif any(x in cat_lower for x in ['support', 'emotional', 'help']):
            example = f"When {word} provides genuine support"
        elif 'belonging' in cat_lower:
            example = f"When {word} creates a sense of belonging"
        elif 'family' in cat_lower:
            example = f"When {word} matters in family"
    
    # DECISION/JUDGMENT CONTEXT
    elif any(x in def_lower for x in ['choose', 'choice', 'decision', 'decide', 'judge', 'evaluate', 'assess']):
        if any(x in cat_lower for x in ['decision', 'choose', 'choosing', 'choices']):
            example = f"When {word} guides your important decisions"
        elif 'judgment' in cat_lower or 'judge' in cat_lower:
            example = f"When {word} informs good judgment"
        elif 'value' in cat_lower or 'priority' in cat_lower or 'priorities' in cat_lower:
            example = f"When {word} clarifies what truly matters"
        elif 'risk' in cat_lower:
            example = f"When {word} shapes risk assessment"
    
    # PROBLEM/SOLUTION CONTEXT
    elif any(x in def_lower for x in ['problem', 'solution', 'solve', 'trouble', 'challenge', 'obstacle']):
        if any(x in cat_lower for x in ['problem', 'solving', 'solve', 'trouble']):
            example = f"When {word} becomes key to solving the problem"
        elif any(x in cat_lower for x in ['challenge', 'obstacle', 'difficulty']):
            example = f"When {word} presents a real challenge"
        elif 'resilience' in cat_lower:
            example = f"When {word} tests your resilience"
        elif 'courage' in cat_lower:
            example = f"When {word} requires courage"
    
    # CHANGE/TRANSFORMATION CONTEXT
    elif any(x in def_lower for x in ['change', 'transform', 'shift', 'evolve', 'evolving', 'transition']):
        if any(x in cat_lower for x in ['change', 'transform', 'evolution']):
            example = f"When {word} signals transformative change"
        elif 'progress' in cat_lower:
            example = f"When {word} marks real progress"
        elif any(x in cat_lower for x in ['adapt', 'flexibility', 'flexible']):
            example = f"When {word} demands flexibility"
        elif 'time' in cat_lower or 'history' in cat_lower:
            example = f"When {word} marks a turning point"
    
    # UNDERSTANDING/KNOWLEDGE CONTEXT
    elif any(x in def_lower for x in ['understand', 'know', 'aware', 'insight', 'realize', 'knowledge']):
        if any(x in cat_lower for x in ['insight', 'aware', 'understand', 'awareness']):
            example = f"When {word} brings genuine understanding"
        elif 'reflection' in cat_lower or 'reflect' in cat_lower:
            example = f"When {word} enables self-reflection"
        elif any(x in cat_lower for x in ['truth', 'reality']):
            example = f"When {word} shows reality"
    
    # QUALITY/VALUE CONTEXT
    elif any(x in def_lower for x in ['quality', 'value', 'worth', 'excellence', 'standard']):
        if any(x in cat_lower for x in ['quality', 'excellence', 'standard']):
            example = f"When {word} elevates quality"
        elif 'craft' in cat_lower:
            example = f"When {word} shows true craftsmanship"
        elif any(x in cat_lower for x in ['worth', 'value']):
            example = f"When {word} demonstrates real value"
    
    # CREATIVE/ARTISTIC CONTEXT
    elif any(x in def_lower for x in ['creative', 'art', 'imagine', 'express', 'create']):
        if any(x in cat_lower for x in ['creative', 'art', 'express', 'creativity']):
            example = f"When {word} fuels creative expression"
        elif 'beauty' in cat_lower or 'aesthetic' in cat_lower:
            example = f"When {word} reveals beauty"
        elif any(x in cat_lower for x in ['story', 'narrative']):
            example = f"When {word} shapes a story"
    
    # SOCIAL/CULTURAL CONTEXT
    elif any(x in def_lower for x in ['social', 'culture', 'group', 'community', 'society']):
        if any(x in cat_lower for x in ['culture', 'society', 'community']):
            example = f"When {word} shapes cultural moments"
        elif any(x in cat_lower for x in ['norm', 'convention']):
            example = f"When {word} challenges convention"
        elif 'identity' in cat_lower:
            example = f"When {word} shapes identity"
    
    # LANGUAGE/COMMUNICATION CONTEXT
    elif any(x in def_lower for x in ['word', 'language', 'speak', 'communicate', 'express', 'meaning']):
        if any(x in cat_lower for x in ['language', 'communicate', 'speak', 'communication']):
            example = f"When {word} transforms how you speak"
        elif any(x in cat_lower for x in ['meaning', 'nuance']):
            example = f"When {word} adds crucial nuance"
        elif 'clarity' in cat_lower:
            example = f"When {word} brings clarity"
    
    # MORAL/ETHICAL CONTEXT
    elif any(x in def_lower for x in ['good', 'bad', 'right', 'wrong', 'ethical', 'moral', 'principle']):
        if any(x in cat_lower for x in ['ethical', 'moral', 'right', 'good']):
            example = f"When {word} guides ethical choices"
        elif 'integrity' in cat_lower or 'honest' in cat_lower:
            example = f"When {word} tests your integrity"
        elif any(x in cat_lower for x in ['justice', 'fair', 'fairness']):
            example = f"When {word} demands fairness"
    
    # PEACE/CALM CONTEXT
    elif any(x in def_lower for x in ['peace', 'calm', 'quiet', 'rest', 'balance', 'tranquil']):
        if any(x in cat_lower for x in ['peace', 'calm', 'quiet']):
            example = f"When {word} brings inner peace"
        elif 'sanctuary' in cat_lower or 'refuge' in cat_lower:
            example = f"When {word} offers sanctuary"
        elif 'mindfulness' in cat_lower:
            example = f"When {word} enables presence"
    
    # FAILURE/SUCCESS CONTEXT
    elif any(x in def_lower for x in ['fail', 'success', 'achieve', 'accomplish', 'win', 'lose']):
        if any(x in cat_lower for x in ['failure', 'fail', 'mistake']):
            example = f"When {word} emerges from failure"
        elif any(x in cat_lower for x in ['success', 'achieve', 'achievement']):
            example = f"When {word} leads to real success"
    
    # TIME CONTEXT
    elif any(x in def_lower for x in ['time', 'moment', 'period', 'history', 'age', 'era', 'temporal']):
        if any(x in cat_lower for x in ['time', 'moment', 'history', 'historical']):
            example = f"When {word} marks a defining moment"
        elif 'nostalgia' in cat_lower or 'memory' in cat_lower:
            example = f"When {word} awakens memory"
    
    # NATURE/ENVIRONMENT CONTEXT
    elif any(x in def_lower for x in ['nature', 'environment', 'natural', 'earth', 'world']):
        if any(x in cat_lower for x in ['nature', 'environment', 'world']):
            example = f"When {word} reflects in nature"
        elif any(x in cat_lower for x in ['sustain', 'responsibility']):
            example = f"When {word} shapes environmental choice"
    
    return example

# Build comprehensive examples - using manual ones where available
word_examples = {}
for word, definition, categories in words_data:
    word_examples[word] = {}
    
    for category in categories:
        # Use manual example if it exists
        if word in existing_examples and category in existing_examples[word]:
            example = existing_examples[word][category]
        else:
            # Generate contextual example
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

print(f"\n✓ Generated comprehensive examples for {len(word_examples)} words")
print(f"  - Including {len(existing_examples)} manually-authored entries")
print(f"  - Generated {len(word_examples) - len(existing_examples)} contextual entries")
print("✓ Wrote to lib/wordAnchorExamples.ts")

# Show samples with manual examples highlighted
print("\nSample high-quality manual examples:")
for word in sorted(existing_examples.keys()):
    print(f"\n  {word}:")
    for category, example in list(existing_examples[word].items())[:2]:
        print(f"    {category}: {example}")
