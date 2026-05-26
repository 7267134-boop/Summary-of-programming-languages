import re

for fname in ['1.html', '2.html']:
    with open(fname, 'r', encoding='utf-8') as f:
        html = f.read()

    tab_contents = re.finditer(r'<div[^>]*class="[^"]*tab-content[^"]*"[^>]*>', html)
    print(f'=== {fname} ===')
    for m in tab_contents:
        tag = m.group(0)
        pos = m.start()
        text_before = html[:pos]
        open_count = len(re.findall(r'<div\b', text_before))
        close_count = len(re.findall(r'</div\b', text_before))
        depth = open_count - close_count
        print(f'Depth: {depth} - {tag}')
