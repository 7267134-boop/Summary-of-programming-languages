import re

fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\continuous.html"

with open(fpath, "r", encoding="utf-8") as f:
    html = f.read()

onclicks = re.findall(r'onclick="([^"]+)"', html)
print(f"Total onclick handlers: {len(onclicks)}")

# Parse out the function names
func_names = set()
for o in onclicks:
    # Match something like functionName(args) or functionName
    m = re.match(r'^\s*(\w+)', o)
    if m:
        func_names.add(m.group(1))

print("Unique function names called in onclick attributes:")
for name in sorted(func_names):
    print(f"  - {name}")
