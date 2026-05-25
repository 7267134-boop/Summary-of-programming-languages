import os
import re
from pypdf import PdfReader

exams_dir = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\Exams\2025"

for root, dirs, files in os.walk(exams_dir):
    for file in files:
        if file.lower().endswith(".pdf"):
            path = os.path.join(root, file)
            try:
                reader = PdfReader(path)
                txt = reader.pages[0].extract_text() or ""
                # look for question numbers and grades
                print(f"\n=== {os.path.relpath(path, exams_dir)} ===")
                lines = [l.strip() for l in txt.split('\n') if l.strip()]
                for line in lines[:30]:
                    if any(x in line for x in ["שאלה", "ניקוד", "ציון", "סך"]):
                        print(f"  {line}")
            except Exception as e:
                pass
