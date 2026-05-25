import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\1.html"
with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

sidebar_start = content.find('<aside')
sidebar_end = content.find('</aside>', sidebar_start)
sidebar = content[sidebar_start:sidebar_end]

buttons = re.findall(r'<button[^>]*onclick="showTab\(\'([^\'\"]+)\'\)"[^>]* id="([^"]+)"[^>]*>(.*?)</button>', sidebar, re.DOTALL)
for b in buttons:
    btn_text = re.sub(r'<[^>]+>', '', b[2]).strip().replace("\n", " ")
    print(f"TabID: {b[0]} | BtnID: {b[1]} | Text: {btn_text}")
