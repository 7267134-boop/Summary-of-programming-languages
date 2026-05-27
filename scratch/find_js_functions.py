path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html"
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

import re
matches = re.finditer(r'toggleLangSim|stepLangSim', html)
print("Occurrences in 3.html:")
lines = html.split('\n')
for m in matches:
    char_idx = m.start()
    line_num = html[:char_idx].count('\n') + 1
    print(f"Line {line_num}: {lines[line_num-1].strip()}")
