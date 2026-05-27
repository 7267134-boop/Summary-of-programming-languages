path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\scratch\widgets_3.js"
with open(path, 'r', encoding='utf-8') as f:
    js = f.read()

lines = js.split('\n')
for idx, line in enumerate(lines):
    if 'toggleLangSim' in line or 'stepLangSim' in line:
        print(f"Line {idx+1}: {line}")
