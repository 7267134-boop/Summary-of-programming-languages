path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html"
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

js_lines = lines[2926:] # 0-indexed index for line 2927

with open(r"c:\Users\72671\Desktop\שפות תכנות\סיכום\scratch\widgets_3.js", 'w', encoding='utf-8') as f:
    f.writelines(js_lines)

print(f"Extracted {len(js_lines)} lines of JS to scratch/widgets_3.js")
