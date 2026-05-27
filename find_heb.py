import re
with open('1.html', 'r', encoding='utf-8') as f:
    text = f.read()

# find all occurrences of "הבא" or "הקודם"
for match in re.finditer(r'.{0,30}(הבא|הקודם).{0,30}', text):
    print(match.group(0).encode('utf-8').decode('utf-8'))
