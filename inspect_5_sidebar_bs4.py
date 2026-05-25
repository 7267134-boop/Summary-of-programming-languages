import re
import os
import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\5.html"
with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

soup = BeautifulSoup(content, 'html.parser')

print("=== Topics Sidebar ===")
topics_div = soup.find('div', id='sidebar-topics')
if topics_div:
    groups = topics_div.find_all('div', class_='nav-group')
    for idx, g in enumerate(groups):
        title_el = g.find('div', class_='nav-group-title')
        title = title_el.text.strip() if title_el else "No Title"
        print(f"  Group {idx+1}: {title}")
        buttons = g.find_all('button')
        for b in buttons:
            print(f"    TabID: {b.get('onclick')} | Text: {b.text.strip()}")
else:
    print("No topics sidebar found!")

print("\n=== Exams Sidebar ===")
exams_div = soup.find('div', id='sidebar-exams')
if exams_div:
    groups = exams_div.find_all('div', class_='nav-group')
    for idx, g in enumerate(groups):
        title_el = g.find('div', class_='nav-group-title')
        title = title_el.text.strip() if title_el else "No Title"
        print(f"  Group {idx+1}: {title}")
        buttons = g.find_all('button')
        for b in buttons:
            print(f"    TabID: {b.get('onclick')} | Text: {b.text.strip()}")
else:
    print("No exams sidebar found!")
