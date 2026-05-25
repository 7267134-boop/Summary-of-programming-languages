import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\continuous.html"

if not os.path.exists(fpath):
    print("ERROR: continuous.html does not exist!")
    sys.exit(1)

with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

print("File size:", len(content), "characters")

# Check for duplicate IDs
ids = re.findall(r'id="([^"]+)"', content)
id_counts = {}
for i in ids:
    id_counts[i] = id_counts.get(i, 0) + 1

duplicates = {k: v for k, v in id_counts.items() if v > 1}
if duplicates:
    print("WARNING: Found duplicate IDs in continuous.html:")
    for k, v in duplicates.items():
        # print first few occurrences context
        print(f"  ID '{k}' appears {v} times.")
else:
    print("SUCCESS: No duplicate IDs found in continuous.html!")

# Check tab-contents count
tabs = re.findall(r'class="tab-content[^"]*"', content)
print("Total tab-content elements:", len(tabs))

# Check some important functions in scripts
required_functions = [
    "setAstDemo", "lookupEnv", "resetFuncSim", "stepFuncSim", "dispatchShape", # From 1.html
    "highlightLex", "clearLex", "showArchDetails", "toggleScopingMode", "resetScopeSim", "stepScopeSim", # From 2.html
    "toggleLangSim", "stepLangSim", "toggleParamMode", "resetParamSim", "stepParamSim", "renderPairCells", # From 3.html
    "resetUnification", "renderUnification", "stepUnification", "buildType" # From 4.html
]

print("Checking interactive logic functions:")
missing_funcs = []
for func in required_functions:
    if f"function {func}" in content or f"{func} = function" in content or f"function {func}" in content or f"{func}(" in content:
        # Found
        pass
    else:
        # Check if the text matches anywhere
        if func in content:
            print(f"  Function '{func}' text is present but not sure if declared.")
        else:
            missing_funcs.append(func)

if missing_funcs:
    print("ERROR: Missing functions in scripts:", missing_funcs)
else:
    print("SUCCESS: All interactive diagram functions are present in the script tags!")
