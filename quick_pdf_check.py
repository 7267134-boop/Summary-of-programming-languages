import os
from pypdf import PdfReader

exams_dir = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\Exams"
for root, dirs, files in os.walk(exams_dir):
    for file in files:
        if file.lower().endswith(".pdf"):
            path = os.path.join(root, file)
            try:
                reader = PdfReader(path)
                print(f"{os.path.relpath(path, exams_dir)}: {len(reader.pages)} pages")
            except Exception as e:
                print(f"FAILED: {os.path.relpath(path, exams_dir)} - {e}")
