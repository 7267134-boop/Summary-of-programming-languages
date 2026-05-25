import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\extracted_txt\2025__2025ב א__N102453778.pdf.txt"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

print("Searching for 'שאלה 2' or 'הלאש 2' in 2025b feedback...")
lines = text.split('\n')
for idx, line in enumerate(lines):
    if "שאלה 2" in line or "הלאש 2" in line:
        print(f"Line {idx+1}: {line}")
        start = max(0, idx - 5)
        end = min(len(lines), idx + 25)
        for i in range(start, end):
            print(f"  {i+1}: {lines[i]}")
        print("="*40)
