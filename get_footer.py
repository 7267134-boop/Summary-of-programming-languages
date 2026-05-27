import re

with open('1.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Find one tab's footer
m = re.search(r'(<div[^>]*flex[^>]*justify-between[^>]*>.*?</div>\s*</div>\s*</div>)', text, re.DOTALL)
if m:
    with open('footer_example.txt', 'w', encoding='utf-8') as out:
        out.write(m.group(1))
else:
    print("Not found")
