import os
from pypdf import PdfReader

exams_dir = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\Exams\2025"
for root, dirs, files in os.walk(exams_dir):
    for file in files:
        if file.lower().endswith(".pdf"):
            path = os.path.join(root, file)
            try:
                reader = PdfReader(path)
                has_text = False
                for p in reader.pages[:3]:
                    txt = p.extract_text() or ""
                    if len(txt.strip()) > 50:
                        has_text = True
                        break
                print(f"{os.path.relpath(path, exams_dir)}: has_text={has_text}")
            except Exception as e:
                print(f"Error {file}: {e}")
