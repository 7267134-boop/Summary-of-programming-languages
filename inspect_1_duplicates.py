import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\1.html"
with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

matches = list(re.finditer(r'id="maman12-poly"', content))
print(f"maman12-poly has {len(matches)} occurrences in 1.html")
for idx, m in enumerate(matches):
    start = m.start()
    next_m = re.search(r'<div\s+id="[^"]+"\s+class="tab-content', content[m.end():])
    end = (m.end() + next_m.start()) if next_m else len(content)
    chunk = content[start:end]
    print(f"Occurrence {idx+1}: line={content.count('\n', 0, start)+1}, len={len(chunk)}")
    print(chunk[:400])
    print("=" * 80)
