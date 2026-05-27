import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('1.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all buttons that have showTab but are not nav-btn
btns = re.findall(r'<button[^>]*onclick="showTab\([^)]+\)"[^>]*>.*?</button>', text, re.IGNORECASE | re.DOTALL)
for b in btns:
    if 'nav-btn' not in b:
        print(b.strip())
        print("---")
        break
