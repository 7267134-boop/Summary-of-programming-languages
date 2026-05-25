import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\5.html"
with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

# Find the sidebar navigation items
sidebar_start = content.find('<aside')
sidebar_end = content.find('</aside>')
sidebar_content = content[sidebar_start:sidebar_end]

groups = re.findall(r'<div class="nav-group">(.*?)</div>', sidebar_content, re.DOTALL)
for idx, g in enumerate(groups):
    title = re.search(r'<div class="nav-group-title">(.*?)</div>', g)
    title_text = title.group(1) if title else "No Title"
    print(f"Group {idx+1}: {title_text.strip()}")
    buttons = re.findall(r'<button onclick="showTab\(\'([^\'\"]+)\'\)"[^>]* id="([^"]+)"[^>]*>(.*?)</button>', g, re.DOTALL)
    for b in buttons:
        btn_text = re.sub(r'<[^>]+>', '', b[2]).strip().replace("\n", " ")
        print(f"  TabID: {b[0]} | BtnID: {b[1]} | Text: {btn_text}")
