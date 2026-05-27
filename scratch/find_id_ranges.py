path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html"
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

import re
target_ids = [
    'target-store',      # Widget 1 (Drag & Drop)
    'ast-let',           # Widget 2 (AST)
    'src-line-1',        # Widget 3 (Stepper)
    'diff-env-code',     # Widget 4 (Code Diff)
    'lr-question',       # Widget 5 (L-value vs R-value)
    'router-ball',       # Widget 6 (Dynamic Dispatch)
    'parsons-container', # Widget 7 (Parsons Puzzle)
    'mem-title',         # Widget 8 (Pair Animator)
    'flow-arg-var',      # Widget 9 (value-of-operand)
    'alias-input',       # Widget 10 (Aliasing)
    'lazy-title'         # Widget 11 (Thunk)
]

lines = html.split('\n')
out = []
for tid in target_ids:
    found = False
    for idx, line in enumerate(lines):
        if f'id="{tid}"' in line or f"id='{tid}'" in line:
            out.append(f"\n=== Found ID '{tid}' at line {idx+1} ===")
            start = max(0, idx - 4)
            end = min(len(lines), idx + 25)
            for j in range(start, end):
                out.append(f"{j+1}: {lines[j]}")
            found = True
            break
    if not found:
        out.append(f"ID '{tid}' not found!")

with open(r"c:\Users\72671\Desktop\שפות תכנות\סיכום\scratch\widget_ranges.txt", 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print("Done writing to scratch/widget_ranges.txt")
