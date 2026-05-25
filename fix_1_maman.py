import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\1.html"
with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

# Let's find occurrences of id="maman12-poly"
matches = list(re.finditer(r'id="maman12-poly"', content))
if len(matches) == 2:
    print("Found 2 occurrences of maman12-poly. Fixing...")
    # Replace the second occurrence ID
    # Since we want to replace only the second one, we do it by splitting at matches[1].start()
    split_idx = matches[1].start()
    part1 = content[:split_idx]
    part2 = content[split_idx:].replace('id="maman12-poly"', 'id="maman12-poly-spec"', 1)
    new_content = part1 + part2
    
    # Now let's add the button in the sidebar of part1
    # We find the button btn-maman12-poly:
    # <button onclick="showTab('maman12-poly')" id="btn-maman12-poly" class="nav-btn">
    #     <span>📦 2.6 ממן 12: ADT פולינומים (define-datatype)</span>
    # </button>
    
    btn_pattern = r'(<button onclick="showTab\(\'maman12-poly\'\)" id="btn-maman12-poly" class="nav-btn">.*?<span>📦 2.6 ממן 12: ADT פולינומים \(define-datatype\)</span>.*?</button>)'
    btn_match = re.search(btn_pattern, new_content, re.DOTALL)
    if btn_match:
        print("Found btn-maman12-poly in sidebar.")
        old_btn_code = btn_match.group(1)
        new_btn_code = old_btn_code + """
                <button onclick="showTab('maman12-poly-spec')" id="btn-maman12-poly-spec" class="nav-btn">
                    <span>📦 2.7 ממן 12: ADT פולינומים (ספציפיקציה ומימוש)</span>
                </button>"""
        new_content = new_content.replace(old_btn_code, new_btn_code, 1)
        
        # Let's also verify that the header division of the second tab matches 2.7 (or remains 2.6 but with separate ID)
        # Let's see: the header has "חלק 2.6 (ממן 12 שאלה 1)". We can change it to "חלק 2.7" to make it sequential
        header_pattern = r'(<div\s+class="inline-block px-4 py-1 bg-slate-800 text-white rounded-full font-bold text-sm mb-4 tracking-wider uppercase">\s*חלק 2.6 \(ממן 12 שאלה 1\)</div>)'
        # There are two of these. The first is at line 852. The second is at line 1172 (now 1175ish).
        # We can find matches after the second tab-content starts:
        tab_spec_pos = new_content.find('id="maman12-poly-spec"')
        if tab_spec_pos != -1:
            sub_part = new_content[tab_spec_pos:]
            sub_part_replaced = re.sub(header_pattern, r'<div class="inline-block px-4 py-1 bg-slate-800 text-white rounded-full font-bold text-sm mb-4 tracking-wider uppercase">חלק 2.7 (ממן 12 שאלה 1 - המשך)</div>', sub_part, 1)
            new_content = new_content[:tab_spec_pos] + sub_part_replaced
            
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Successfully fixed 1.html duplicates and added sidebar button!")
    else:
        print("Could not find btn-maman12-poly in sidebar")
else:
    print(f"Number of occurrences of maman12-poly is {len(matches)}, expected 2. Aborting.")
