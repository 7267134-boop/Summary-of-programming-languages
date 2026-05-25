import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\5.html"
with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

matches = list(re.finditer(r'<div\s+id="exam-2024b-q1"\s+class="tab-content[^"]*"', content))
for i, m in enumerate(matches):
    start = m.start()
    # find the next div with tab-content or end of main content
    next_match = re.search(r'<div\s+id="[^"]+"\s+class="tab-content', content[m.end():])
    end = (m.end() + next_match.start()) if next_match else len(content)
    chunk = content[start:end]
    print(f"Occurrence {i+1}: length={len(chunk)}")
    print(chunk[:500])
    print("=" * 80)
