import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\5.html"
with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

# Let's find all <div id="..." class="tab-content"> blocks and check their content lengths and headers
matches = list(re.finditer(r'<div\s+id="([^"]+)"\s+class="tab-content[^"]*"', content))
for i, m in enumerate(matches):
    tid = m.group(1)
    start = m.start()
    end = matches[i+1].start() if i+1 < len(matches) else len(content)
    chunk = content[start:end]
    header = re.search(r'<h[23][^>]*>(.*?)</h[23]>', chunk, re.DOTALL)
    header_text = header.group(1) if header else "No Header"
    header_text = re.sub(r'<[^>]+>', '', header_text).strip()
    print(f"Index {i}: ID={tid}, Header={header_text[:50]}, Len={len(chunk)}")
