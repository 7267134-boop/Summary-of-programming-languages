path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html.bak"
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

import re
matches = re.finditer(r'id="explicit-interp"', html)
print("Occurrences of explicit-interp in 3.html.bak:")
lines = html.split('\n')
for m in matches:
    char_idx = m.start()
    line_num = html[:char_idx].count('\n') + 1
    print(f"Line {line_num}: {lines[line_num-1].strip()}")
    # print surrounding 50 lines
    for j in range(max(0, line_num - 5), min(len(lines), line_num + 150)):
        if "script" in lines[j].lower() or "button" in lines[j].lower() or "step" in lines[j].lower():
            print(f"  Line {j+1}: {lines[j].strip()}")
