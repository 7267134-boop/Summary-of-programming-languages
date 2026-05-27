import re

with open('1.html', 'r', encoding='utf-8') as f:
    text = f.read()

res = re.findall(r'onclick="([^"]+)"', text)
for r in set(res):
    print(r)
