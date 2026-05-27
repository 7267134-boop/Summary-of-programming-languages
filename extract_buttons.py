import re

def extract_buttons(filename, outfile):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    buttons = re.findall(r'<button.*?nav-btn.*?>.*?</button>', content, re.IGNORECASE | re.DOTALL)
    with open(outfile, 'w', encoding='utf-8') as f:
        f.write('\n'.join(buttons))

extract_buttons('1.html', 'buttons_1.txt')
extract_buttons('2.html', 'buttons_2.txt')
