from pypdf import PdfReader
import sys

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\Exams\2025\2025ג\מבחן שפות תכנות - מועד 83 - 2025ג (מועד .pdf"
print(f"Reading {pdf_path}...")
reader = PdfReader(pdf_path)
print(f"Total pages: {len(reader.pages)}")
for i, page in enumerate(reader.pages):
    txt = page.extract_text() or ""
    print(f"--- Page {i+1} ---")
    print(txt[:300])
