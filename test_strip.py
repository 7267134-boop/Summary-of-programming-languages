import re

with open("5.html", "r", encoding="utf-8") as f:
    content = f.read()

pattern = r'(<!-- ===+.*?===+ -->|<!-- Exam 2025B Moed A2 - Q\d -->)'
parts = re.split(pattern, content, flags=re.DOTALL)

for idx in [6, 8, 10, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38]:
    part = parts[idx].strip()
    first_gt = part.find(">")
    last_lt = part.rfind("</div>")
    inner = part[first_gt+1:last_lt].strip()
    print(f"Part {idx} ID extracted: {part[:first_gt+1]}")
    print(f"  Inner length: {len(inner)}, starts with: {inner[:50].replace(chr(10), ' ')}")
    print(f"  Ends with: {inner[-50:].replace(chr(10), ' ')}")
    print("-" * 40)
