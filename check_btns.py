import re

for fname in ['1.html', '2.html', '3.html', '4.html']:
    with open(fname, 'r', encoding='utf-8') as f:
        html = f.read()

    tabs = re.findall(r'id="([^"]+)"[^>]*class="[^"]*tab-content[^"]*"', html)
    tabs += re.findall(r'class="[^"]*tab-content[^"]*"[^>]*id="([^"]+)"', html)
    
    btns = re.findall(r'id="btn-([^"]+)"', html)

    tabs_set = set(tabs)
    btns_set = set(btns)
    
    missing_btns = tabs_set - btns_set
    print(f'=== {fname} ===')
    print('Tabs:', len(tabs_set))
    print('Btns:', len(btns_set))
    if missing_btns:
        print('Tabs missing btns:', missing_btns)
