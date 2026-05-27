import sys
with open('c:/Users/72671/Desktop/שפות תכנות/סיכום/3.html', 'r', encoding='utf-8') as f:
    html = f.read()

lines = html.split('\n')
open_divs = 0
for i, line in enumerate(lines):
    open_count = line.count('<div')
    close_count = line.count('</div')
    if 'class="tab-content' in line:
        print(f"Tab started at line {i+1} with depth {open_divs}")
    open_divs += open_count - close_count

print(f"Final depth: {open_divs}")
