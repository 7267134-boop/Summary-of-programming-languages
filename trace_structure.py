import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('5.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

stack = []
for idx, line in enumerate(lines):
    line_num = idx + 1
    # Find all opening and closing tags
    # Let's match them one by one in order on the line
    for m in re.finditer(r'<(div|main|aside|section|header|script)(?:\s+[^>]*)?>|</(div|main|aside|section|header|script)>', line):
        if m.group(1): # Opening tag
            tag_name = m.group(1)
            id_match = re.search(r'id="([^"]+)"', m.group(0))
            class_match = re.search(r'class="([^"]+)"', m.group(0))
            stack.append({
                'tag': tag_name,
                'line': line_num,
                'id': id_match.group(1) if id_match else None,
                'class': class_match.group(1) if class_match else None
            })
        else: # Closing tag
            tag_name = m.group(2)
            if stack:
                popped = stack.pop()
                if popped['tag'] != tag_name:
                    print(f"Warning: line {line_num} closes {tag_name} but expected {popped['tag']} (opened at line {popped['line']})")
            else:
                print(f"Warning: line {line_num} closes {tag_name} but stack is empty")

print("--- Warnings ---")
# Only print warnings, don't list all unclosed tags at the end of file unless stack size > 50
print("Stack at end of file:", len(stack))
if len(stack) > 0:
    # Print the last few unclosed items
    for item in stack[-10:]:
        print(f"  Unclosed {item['tag']} opened at line {item['line']} (id: {item['id']}, class: {item['class']})")
