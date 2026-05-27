import re
import sys
import subprocess

fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\continuous.html"

with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

# Find all script blocks
scripts = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
if not scripts:
    print("No script blocks found!")
    sys.exit(1)

# The last script block is the main one
main_script = scripts[-1]
print(f"Main script length: {len(main_script)} chars")

temp_js = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\scratch\temp_extracted.js"
with open(temp_js, "w", encoding="utf-8") as f:
    f.write(main_script)

print(f"Extracted main JS saved to {temp_js}")

# Run node syntax check
res = subprocess.run(["node", "-c", temp_js], capture_output=True, text=True)
if res.returncode == 0:
    print("SUCCESS: Node.js compilation check passed! No syntax errors.")
else:
    print("ERROR: Node.js compilation failed:")
    print(res.stderr)
