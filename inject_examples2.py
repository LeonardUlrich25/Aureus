#!/usr/bin/env python3
import re
import json

# Read the examples
with open('examples_output.json', 'r') as f:
    word_examples = json.load(f)

# Read the wordContent.ts
with open('data/wordContent.ts', 'r') as f:
    lines = f.readlines()

# Process line by line
output_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    output_lines.append(line)
    
    # Check if this is a word line
    if "word: '" in line:
        # Extract word name
        match = re.search(r"word: '([^']+)'", line)
        if match:
            word = match.group(1)
            # Skip to anchor section
            i += 1
            while i < len(lines) and 'anchor:' not in lines[i]:
                output_lines.append(lines[i])
                i += 1
            
            if i < len(lines) and 'anchor:' in lines[i]:
                output_lines.append(lines[i])  # anchor: {
                i += 1
                
                # Copy prompt
                while i < len(lines) and 'categories:' not in lines[i]:
                    output_lines.append(lines[i])
                    i += 1
                
                # Copy categories line
                if i < len(lines) and 'categories:' in lines[i]:
                    output_lines.append(lines[i])
                    i += 1
                    
                    # Add examples if they exist for this word
                    if word in word_examples:
                        examples = word_examples[word]['examples']
                        # Add comma after categories if needed
                        if examples:
                            # Check last line - add comma if needed
                            if not output_lines[-1].rstrip().endswith(','):
                                output_lines[-1] = output_lines[-1].rstrip() + ',\n'
                            
                            output_lines.append("      examples: {\n")
                            for category, example in examples.items():
                                # Escape quotes in example
                                example_escaped = example.replace("'", "\\'")
                                output_lines.append(f"        '{category}': '{example_escaped}',\n")
                            output_lines.append("      }\n")
                    
                    # Skip the old closing brace on same line if present
                    while i < len(lines) and '}' not in lines[i]:
                        i += 1
                    
                    if i < len(lines):
                        output_lines.append(lines[i])
                        i += 1
    else:
        i += 1

# Write back
with open('data/wordContent.ts', 'w') as f:
    f.writelines(output_lines)

print("Updated wordContent.ts with examples")
