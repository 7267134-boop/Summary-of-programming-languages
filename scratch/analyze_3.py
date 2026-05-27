import re

file_path = r'c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in 3.html: {len(lines)}")

# 1. Let's find all lines that start or contain tab-content divs
tab_regex = re.compile(r'class="[^"]*tab-content[^"]*"')
tab_id_regex = re.compile(r'id="([^"]+)"')

tabs = []
current_tab = None

# Let's count open/close divs in script tags to ignore them
in_script = False

for idx, line in enumerate(lines):
    line_num = idx + 1
    
    if '<script>' in line or '<script ' in line:
        in_script = True
        continue
    if '</script>' in line:
        in_script = False
        continue
        
    if in_script:
        continue

    # Search for tab content start
    # Let's see if the line matches tab-content
    if 'tab-content' in line and '<div' in line:
        id_match = tab_id_regex.search(line)
        tab_id = id_match.group(1) if id_match else 'unknown'
        
        if current_tab:
            tabs.append(current_tab)
        current_tab = {
            'id': tab_id,
            'start_line': line_num,
            'div_stack': [],
            'open_divs': 0,
            'close_divs': 0,
            'net_balance': 0,
            'end_line': None
        }
        
    if current_tab:
        # We count div occurrences
        open_tags = len(re.findall(r'<div\b', line))
        close_tags = len(re.findall(r'</div>', line))
        current_tab['open_divs'] += open_tags
        current_tab['close_divs'] += close_tags
        current_tab['net_balance'] += (open_tags - close_tags)
        
        # We can also track tag stack within tab
        # (Though we might have open div from the tab wrapper itself, so balance should end at 0 or 1 depending on where we close it)
        # If net_balance drops to 0 (which means the wrapper div itself is closed), that might be the end of the tab
        if current_tab['net_balance'] <= 0 and (open_tags > 0 or close_tags > 0):
            # This tab might have been closed!
            current_tab['end_line'] = line_num
            tabs.append(current_tab)
            current_tab = None

if current_tab:
    tabs.append(current_tab)

print("\n--- Tabs Found and Balances ---")
for t in tabs:
    print(f"Tab ID: {t['id']}")
    print(f"  Line range: {t['start_line']} to {t['end_line']}")
    print(f"  Total open divs inside/including tab container: {t['open_divs']}")
    print(f"  Total close divs: {t['close_divs']}")
    print(f"  Net balance at end: {t['net_balance']}")
