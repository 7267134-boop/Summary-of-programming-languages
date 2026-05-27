import re
with open('c:/Users/72671/Desktop/שפות תכנות/סיכום/4.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    
balance = 0
for i in range(339, 463):
    line = lines[i]
    opens = len(re.findall(r'<div\b', line, re.IGNORECASE))
    closes = len(re.findall(r'</div>', line, re.IGNORECASE))
    balance += (opens - closes)
    if opens > 0 or closes > 0:
        print(f'{i+1:04d}: O={opens} C={closes} Bal={balance} | {line.strip()}')
