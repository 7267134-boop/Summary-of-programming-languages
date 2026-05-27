import re
import sys

fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\continuous.html"

with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

# Extract script blocks
script_match = re.search(r'<script>\s*(.*?)\s*</script>\s*</body>', content, re.DOTALL)
if not script_match:
    print("Could not find main script block before </body>")
    sys.exit(1)

script_content = script_match.group(1)
print(f"Main script length: {len(script_content)} chars")

# Write script content to a temp file to analyze syntax
temp_js = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\scratch\temp_extracted.js"
with open(temp_js, "w", encoding="utf-8") as f:
    f.write(script_content)

print(f"Extracted JS saved to {temp_js}")
