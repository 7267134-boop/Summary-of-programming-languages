import os
from pypdf import PdfReader

exams_dir = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\Exams"

print("Scanning exams PDFs...")
for root, dirs, files in os.walk(exams_dir):
    for file in files:
        if file.lower().endswith(".pdf"):
            path = os.path.join(root, file)
            print(f"\nFile: {os.path.relpath(path, exams_dir)}")
            try:
                reader = PdfReader(path)
                print(f"  Pages: {len(reader.pages)}")
                # let's extract first 2 pages text to see what questions are in it
                text = ""
                for i in range(min(5, len(reader.pages))):
                    text += reader.pages[i].extract_text() or ""
                # print some lines from extracted text to identify the exam and questions
                lines = [line.strip() for line in text.split('\n') if line.strip()]
                print("  Sample text:")
                printed = 0
                for line in lines:
                    # Look for keywords like "שאלה", "מועד", "נקודות"
                    if any(kw in line for kw in ["שאלה 1", "שאלה 2", "שאלה 3", "מועד"]):
                        print(f"    {line}")
                        printed += 1
                if printed == 0:
                    # just print first 5 lines
                    for line in lines[:10]:
                        print(f"    {line}")
            except Exception as e:
                print(f"  Error reading PDF: {e}")
