#!/usr/bin/env python3
import re
import json

# Read the examples
with open('examples_output.json', 'r') as f:
    word_examples = json.load(f)

# Read the wordContent.ts
with open('data/wordContent.ts', 'r') as f:
    content = f.read()

# For each word, find its anchor block and add examples
for word, data in word_examples.items():
    examples = data['examples']
    
    # Create the examples object string
    examples_str = '      examples: {\n'
    for category, example in examples.items():
        examples_str += f"        '{category}': '{example}',\n"
    examples_str += '      }'
    
    # Find the anchor block for this word
    # Pattern: "word: 'wordname'" ... "anchor: { ... "categories: [...]" ... "}"
    pattern = f"(word: '{re.escape(word)}'[^}}]*anchor: {{[^}}]*categories: \\[[^\\]]+\\])(\n    }})"
    
    def replace_func(match):
        return match.group(1) + ',\n' + examples_str + match.group(2)
    
    content = re.sub(pattern, replace_func, content, flags=re.DOTALL)

# Write back
with open('data/wordContent.ts', 'w') as f:
    f.write(content)

print("Updated wordContent.ts with examples")
