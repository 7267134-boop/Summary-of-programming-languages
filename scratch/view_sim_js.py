path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\scratch\widgets_3.js"
with open(path, 'r', encoding='utf-8') as f:
    js = f.read()

import re
matches = re.findall(r'function (toggleLangSim|stepLangSim)\(.*?\}', js, re.DOTALL)
print("Found functions:")
for m in re.finditer(r'function (toggleLangSim|stepLangSim)\(.*?\n\s*\}', js, re.DOTALL):
    print(m.group(0))

# Let's print lines 440 to 520 of widgets_3.js where toggleLangSim might be
lines = js.split('\n')
for idx in range(440, 520):
    if idx < len(lines):
        print(f"{idx+1}: {lines[idx]}")
