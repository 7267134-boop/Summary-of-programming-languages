import os
from pypdf import PdfReader

exams_dir = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\Exams\2025"

with open("grades_debug.txt", "w", encoding="utf-8") as out:
    for root, dirs, files in os.walk(exams_dir):
        for file in files:
            if file.lower().endswith(".pdf"):
                path = os.path.join(root, file)
                try:
                    reader = PdfReader(path)
                    txt = reader.pages[0].extract_text() or ""
                    out.write(f"\n=== {os.path.relpath(path, exams_dir)} ===\n")
                    lines = [l.strip() for l in txt.split('\n') if l.strip()]
                    for line in lines[:30]:
                        out.write(f"  {line}\n")
                except Exception as e:
                    out.write(f"  Error: {e}\n")
print("Wrote to grades_debug.txt")
