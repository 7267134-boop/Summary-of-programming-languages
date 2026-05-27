import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('1.html', 'r', encoding='utf-8') as f:
    content = f.read()

aside_start = content.find('<aside')
aside_end = content.find('</aside>', aside_start)
aside_html = content[aside_start:aside_end]

# Find all buttons
btns = re.findall(r'<button[^>]*>(.*?)</button>', aside_html, re.DOTALL)
print("=== Sidebar Buttons ===")
for b in btns:
    text = re.sub(r'<[^>]+>', '', b).strip().replace('\n', ' ')
    print(text)
