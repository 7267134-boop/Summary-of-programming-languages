path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html"
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

lines = html.split('\n')
for idx, line in enumerate(lines):
    if 'setleft-exp' in line:
        print(f"Line {idx+1}: {line}")
