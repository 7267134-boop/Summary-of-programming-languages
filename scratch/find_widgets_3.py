import re

path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html"
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")

# Let's search for script tags, widget IDs, or headings
script_indices = []
for idx, line in enumerate(lines):
    if "<script" in line:
        script_indices.append(idx)
    # Search for inline scripts or IDs
    if 'id="widget' in line or 'id="btn-' in line or 'class="tab-content' in line:
        print(f"Line {idx+1}: {line.strip()}")

print("\n--- Script Tags ---")
for idx in script_indices:
    # Print the line and the next 2 lines
    context = "".join(lines[idx:idx+4])
    print(f"Line {idx+1}:\n{context}")
