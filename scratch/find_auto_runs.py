path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html"
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

import re
# Let's search for settimeout, setinterval, or transitions in the file
matches = re.finditer(r'(setInterval|setTimeout|requestAnimationFrame)', html, re.IGNORECASE)
print("Found timing/anim functions:")
lines = html.split('\n')
for m in matches:
    # Find line number
    char_idx = m.start()
    line_num = html[:char_idx].count('\n') + 1
    print(f"Line {line_num}: {lines[line_num-1].strip()}")
