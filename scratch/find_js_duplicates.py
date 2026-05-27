import re

temp_js = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\scratch\temp_extracted.js"

with open(temp_js, "r", encoding="utf-8") as f:
    js = f.read()

# Let's find all:
# 1. let varName
# 2. const varName
# 3. var varName
# 4. function funcName

declarations = []

# Regex patterns
let_const_var_pat = r'\b(?:let|const|var)\s+(\w+)\b'
func_pat = r'\bfunction\s+(\w+)\b'

for m in re.finditer(let_const_var_pat, js):
    declarations.append(('var', m.group(1), m.start()))

for m in re.finditer(func_pat, js):
    declarations.append(('func', m.group(1), m.start()))

# Find duplicates
seen = {}
duplicates = []

for dtype, name, pos in declarations:
    if name in seen:
        duplicates.append((dtype, name, seen[name], pos))
    else:
        seen[name] = (dtype, pos)

print(f"Total declarations: {len(declarations)}")
print(f"Total unique names: {len(seen)}")
print(f"Total duplicate names: {len(duplicates)}")

# Print duplicates with context (their line numbers)
lines = js.split('\n')
def get_line_num(char_pos):
    current = 0
    for idx, l in enumerate(lines):
        current += len(l) + 1 # +1 for newline
        if current >= char_pos:
            return idx + 1
    return len(lines)

for dtype, name, first_info, second_pos in duplicates:
    first_type, first_pos = first_info
    line_first = get_line_num(first_pos)
    line_second = get_line_num(second_pos)
    print(f"Duplicate {dtype} '{name}': first declared as {first_type} at line {line_first}, redefined at line {line_second}")
