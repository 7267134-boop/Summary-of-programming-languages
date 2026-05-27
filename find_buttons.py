import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

f = open('1.html', encoding='utf-8').read()
res = re.findall(r'<button[^>]*onclick="showTab[^>]*>.*?</button>', f, re.IGNORECASE | re.DOTALL)
others = [b for b in res if 'nav-btn' not in b]
for b in others[:5]:
    print(b)
    print('---')
