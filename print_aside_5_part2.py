import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\5.html"
with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for aside
aside_match = re.search(r'<aside.*?>.*?</aside>', content, re.DOTALL)
if aside_match:
    aside_html = aside_match.group(0)
    print(aside_html[2000:])
