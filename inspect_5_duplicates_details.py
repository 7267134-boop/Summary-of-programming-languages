import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\5.html"
with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

# Let's find all divs with id="exam-2024b-q1", q2, q3
for qid in ['exam-2024b-q1', 'exam-2024b-q2', 'exam-2024b-q3']:
    matches = list(re.finditer(f'id="{qid}"', content))
    print(f"=== {qid} ===")
    for idx, m in enumerate(matches):
        start = m.start()
        # Find next div tab-content
        next_m = re.search(r'<div\s+id="[^"]+"\s+class="tab-content', content[m.end():])
        end = (m.end() + next_m.start()) if next_m else len(content)
        chunk = content[start:end]
        
        # Check if there are script blocks or interactive elements
        has_script = "script" in chunk.lower()
        has_diagram = "diagram" in chunk.lower() or "canvas" in chunk.lower() or "svg" in chunk.lower()
        print(f"  Occurrence {idx+1}: line={content.count(chr(10), 0, start)+1}, len={len(chunk)}, has_script={has_script}, has_diagram={has_diagram}")
        # print first 300 chars of text content
        text_only = re.sub(r'<[^>]+>', '', chunk).strip()
        print(f"    Text: {text_only[:150].replace(chr(10), ' ')}")
