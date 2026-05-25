import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\extracted_txt\2025__2025ג__מבחן שפות תכנות - מועד 93 - 25ג - ציון 98.pdf.txt"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

print("Searching for grader comments in Moed 93...")
lines = text.split('\n')
current_page = 0
for idx, line in enumerate(lines):
    if "PAGE" in line:
        current_page = line
    if any(k in line for k in ["שאלה", "הלאש", "event", "foreach", "zero?", "proc"]):
        # print context
        print(f"Page {current_page} | Line {idx+1}: {line}")
