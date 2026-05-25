import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

html_files = [f for f in os.listdir(".") if f.endswith(".html")]

print("Searching for '83' in HTML files...")
for fname in html_files:
    with open(fname, "r", encoding="utf-8") as f:
        content = f.read()
    
    # find all occurrences of "83" and print context
    matches = re.findall(r'.{0,30}83.{0,30}', content)
    if matches:
        print(f"\nFile: {fname} (found {len(matches)} matches)")
        for m in matches[:10]:
            print(f"  {m.strip()}")
