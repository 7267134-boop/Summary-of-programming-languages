import re

fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\continuous.html"

with open(fpath, "r", encoding="utf-8") as f:
    html = f.read()

# Find all script blocks
scripts = re.findall(r'<script>(.*?)</script>', html, re.DOTALL)
print(f"Total script blocks found: {len(scripts)}")

# Check for duplicate function declarations
all_funcs = []
for i, s in enumerate(scripts):
    funcs = re.findall(r'function\s+(\w+)\s*\(', s)
    all_funcs.extend(funcs)
    print(f"Script {i} contains {len(funcs)} functions.")

duplicates = set([x for x in all_funcs if all_funcs.count(x) > 1])
if duplicates:
    print("WARNING: Duplicate function declarations found in scripts:")
    for d in duplicates:
        print(f"  - {d}")
else:
    print("SUCCESS: No duplicate function declarations found.")

# Look for specific selectors in scripts that might be failing
selectors = re.findall(r"getElementById\(['\"]([^'\"]+)['\"]\)", html)
unique_selectors = set(selectors)
print(f"Total unique getElementById selectors: {len(unique_selectors)}")

# Check if any selector is missing from the HTML body
for sel in sorted(unique_selectors):
    # Check if this ID is defined in the HTML as id="sel" or similar
    if f'id="{sel}"' not in html and f"id='{sel}'" not in html:
        # Check if it might be dynamically created, but flag it
        print(f"  Selector ID '{sel}' used in JS but not found in static HTML body.")
