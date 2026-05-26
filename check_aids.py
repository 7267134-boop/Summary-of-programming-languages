import re
import os

base_dir = r"c:\Users\72671\Desktop\שפות תכנות\סיכום"
files = ["1.html", "2.html", "3.html", "4.html"]

for fname in files:
    fpath = os.path.join(base_dir, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        html = f.read()
    
    print(f"\n=== File: {fname} ===")
    
    # Find all tab content divs
    # Let's find matches for: <div id="..." class="tab-content...">
    tab_starts = list(re.finditer(r'<div\s+id="([^"]+)"\s+class="tab-content[^"]*"', html))
    for i, start_m in enumerate(tab_starts):
        tab_id = start_m.group(1)
        start_pos = start_m.start()
        
        # Find closing tag
        depth = 1
        pos = start_pos + 5
        while depth > 0 and pos < len(html):
            next_open = html.find('<div', pos)
            next_close = html.find('</div>', pos)
            if next_close == -1:
                pos = tab_starts[i+1].start() if i+1 < len(tab_starts) else len(html)
                break
            if next_open != -1 and next_open < next_close:
                depth += 1
                pos = next_open + 4
            else:
                depth -= 1
                pos = next_close + 6
        
        tab_html = html[start_pos:pos]
        
        # Check if tab_html has an interactive simulator or image or diagram
        has_sim = "onclick=" in tab_html or "id=\"env-lookup-output\"" in tab_html or "sim" in tab_id or "Interactive" in tab_html or "אינטראקטיבי" in tab_html
        has_table = "<table" in tab_html
        has_svg = "<svg" in tab_html
        
        # Print tab ID and status
        status = []
        if has_sim:
            status.append("Interactive Simulator")
        if has_table:
            status.append("Table")
        if has_svg:
            status.append("SVG")
        
        status_str = ", ".join(status) if status else "Text only"
        print(f"  Tab: {tab_id:25} | Status: {status_str}")
