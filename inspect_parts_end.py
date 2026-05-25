import re

with open("5.html", "r", encoding="utf-8") as f:
    content = f.read()

pattern = r'(<!-- ===+.*?===+ -->|<!-- Exam 2025B Moed A2 - Q\d -->)'
parts = re.split(pattern, content, flags=re.DOTALL)

p40 = parts[40]
main_end_idx = p40.find("</main>")
if main_end_idx != -1:
    print(f"Found </main> at index {main_end_idx}")
    print(f"Tab-content part length: {main_end_idx}")
    print(f"Footer part length: {len(p40) - main_end_idx}")
    print("Footer start:")
    print(p40[main_end_idx:main_end_idx+300])
else:
    print("Could not find </main> in parts[40]")
