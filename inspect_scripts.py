import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
files = ["1.html", "2.html", "3.html", "4.html", "5.html"]
base_dir = r"c:\Users\72671\Desktop\שפות תכנות\סיכום"

for fname in files:
    fpath = os.path.join(base_dir, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # find all <script> blocks
    scripts = re.findall(r'<script>(.*?)</script>|<script\s+[^>]*>(.*?)</script>', content, re.DOTALL)
    print(f"=== {fname} has {len(scripts)} scripts ===")
    for idx, s_tuple in enumerate(scripts):
        s = s_tuple[0] or s_tuple[1] or ""
        if not s.strip():
            continue
        # Find functions declared in this script
        funcs = re.findall(r'function\s+([a-zA-Z0-9_]+)', s)
        # Find vars declared in this script (let, const, var at start of line or with spaces)
        vars_let = re.findall(r'(?:let|const|var)\s+([a-zA-Z0-9_]+)', s)
        print(f"  Script {idx+1}:")
        if funcs:
            print(f"    Functions: {funcs}")
        if vars_let:
            print(f"    Vars (let/const/var): {list(set(vars_let))}")
