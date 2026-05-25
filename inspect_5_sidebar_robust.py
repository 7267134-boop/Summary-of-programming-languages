import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\5.html"
with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

# Let's find the sidebar content
sidebar_start = content.find('<aside')
sidebar_end = content.find('</aside>', sidebar_start)
sidebar = content[sidebar_start:sidebar_end]

# Split by divs
# Let's find sidebar-topics and sidebar-exams
topics_start = sidebar.find('id="sidebar-topics"')
exams_start = sidebar.find('id="sidebar-exams"')

def parse_section(sec_html, name):
    print(f"=== {name} ===")
    # find all nav-groups
    groups = re.findall(r'<div class="nav-group">(.*?)</div>\s*(?=<div class="nav-group">|<div id="sidebar-exams"|</div>\s*</aside>|</div>\s*</div>)', sec_html, re.DOTALL)
    if not groups:
        # try another split
        groups = sec_html.split('<div class="nav-group">')[1:]
    
    for idx, g in enumerate(groups):
        title_m = re.search(r'<div class="nav-group-title[^>]*>(.*?)</div>', g, re.DOTALL)
        title = title_m.group(1).strip() if title_m else "No Title"
        # strip inner tags
        title = re.sub(r'<[^>]+>', '', title).strip()
        print(f"  Group {idx+1}: {title}")
        buttons = re.findall(r'<button[^>]*onclick="showTab\(\'([^\'\"]+)\'\)"[^>]*>(.*?)</button>', g, re.DOTALL)
        for b in buttons:
            btn_text = re.sub(r'<[^>]+>', '', b[1]).strip().replace("\n", " ")
            print(f"    TabID: {b[0]} | Text: {btn_text}")

if topics_start != -1 and exams_start != -1:
    topics_html = sidebar[topics_start:exams_start]
    exams_html = sidebar[exams_start:]
    parse_section(topics_html, "Topics Sidebar")
    parse_section(exams_html, "Exams Sidebar")
else:
    print("Could not find topics or exams sections in sidebar")
