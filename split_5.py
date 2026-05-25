import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("5.html", "r", encoding="utf-8") as f:
    content = f.read()

# Let's split using re.split on these comment patterns
pattern = r'(<!-- ===+.*?===+ -->|<!-- Exam 2025B Moed A2 - Q\d -->)'
parts = re.split(pattern, content, flags=re.DOTALL)

print(f"Total parts split: {len(parts)}")
for idx, part in enumerate(parts):
    # odd indices are the comments/separators themselves, even indices are the content blocks
    if idx % 2 == 1:
        print(f"[{idx}] Separator: {part.strip()}")
    else:
        print(f"[{idx}] Content len={len(part)}, prefix: {part[:100].strip()}...")
        print("-" * 30)
