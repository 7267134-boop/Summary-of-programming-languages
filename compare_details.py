import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\5.html"
with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

def compare_chunks(qid):
    matches = list(re.finditer(f'id="{qid}"', content))
    if len(matches) < 2:
        print(f"{qid} does not have duplicate occurrences.")
        return
    
    chunks = []
    for m in matches:
        start = m.start()
        next_m = re.search(r'<div\s+id="[^"]+"\s+class="tab-content', content[m.end():])
        end = (m.end() + next_m.start()) if next_m else len(content)
        chunks.append(content[start:end])
        
    print(f"=== Comparing {qid} ===")
    print(f"  Occ 1 length: {len(chunks[0])}, Occ 2 length: {len(chunks[1])}")
    # let's find if there are images, canvases, scripts in one but not the other
    for idx, c in enumerate(chunks):
        canvas_count = c.count("<canvas")
        svg_count = c.count("<svg")
        script_count = c.count("<script")
        button_count = c.count("<button")
        print(f"    Occ {idx+1}: canvas={canvas_count}, svg={svg_count}, script={script_count}, button={button_count}")
    
    # Are there any differences in text? Let's check how many lines are in common
    lines1 = re.sub(r'<[^>]+>', '', chunks[0]).strip().split('\n')
    lines2 = re.sub(r'<[^>]+>', '', chunks[1]).strip().split('\n')
    print(f"    Occ 1 text lines: {len(lines1)}, Occ 2 text lines: {len(lines2)}")

compare_chunks('exam-2024b-q1')
compare_chunks('exam-2024b-q2')
compare_chunks('exam-2024b-q3')
