path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html"
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx in range(1770, 1815):
    if idx < len(lines):
        print(f"{idx+1}: {lines[idx].strip()}")
