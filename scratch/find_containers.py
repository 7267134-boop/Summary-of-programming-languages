import re

path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html"
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

# Let's find IDs in the HTML
ids = re.findall(r'id="([^"]+)"', html)
print("Found IDs in HTML:")
for idx, id_val in enumerate(ids):
    if idx < 60 or id_val.startswith(('box-', 'target-', 'source-', 'ast-', 'stepper-', 'diff-', 'lr-', 'router-', 'parsons-', 'mem-', 'flow-', 'alias-', 'lazy-', 'chest-', 'thunk-')):
        print(f"  {id_val}")
