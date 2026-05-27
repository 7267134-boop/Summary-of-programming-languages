import re

with open('1.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's find all divs with class="tab-content"
# and look at their last few lines (bottom of the tab content)
tab_starts = list(re.finditer(r'<div\s+id="([^"]+)"\s+class="tab-content[^"]*"', content))
for i, start_m in enumerate(tab_starts):
    tab_id = start_m.group(1)
    start_pos = start_m.start()
    
    # find closing div matching opening tag
    depth = 1
    pos = start_pos + 5
    while depth > 0 and pos < len(content):
        next_open = content.find('<div', pos)
        next_close = content.find('</div>', pos)
        if next_close == -1:
            pos = tab_starts[i+1].start() if i+1 < len(tab_starts) else len(content)
            break
        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            pos = next_close + 6
            
    tab_html = content[start_pos:pos]
    print(f"Tab ID: {tab_id}")
    
    # Look for button or link at the bottom of this tab_html
    # We can search for tags with showTab
    btns = re.findall(r'<[^>]+showTab[^>]+>', tab_html)
    print(f"  showTab triggers: {btns}")
