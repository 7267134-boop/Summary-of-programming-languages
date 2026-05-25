import sys
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\Exams\2025\2025ג\מבחן שפות תכנות - מועד 93 - 25ג - ציון 98.pdf"
reader = PdfReader(pdf_path)
print(f"Total pages: {len(reader.pages)}")
for i in range(min(5, len(reader.pages))):
    txt = reader.pages[i].extract_text() or ""
    print(f"--- Page {i+1} ---")
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    for line in lines[:15]:
        print(line)
