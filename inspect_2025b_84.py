import sys
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\Exams\2025\2025ב א\N102453778.pdf"
reader = PdfReader(pdf_path)
print(f"Total pages: {len(reader.pages)}")

# let's search page 4-6 text which usually has comments
for idx in range(min(10, len(reader.pages))):
    txt = reader.pages[idx].extract_text() or ""
    if "שאלה" in txt or "הלאש" in txt or "event" in txt.lower():
        print(f"--- Page {idx+1} ---")
        lines = [l.strip() for l in txt.split('\n') if l.strip()]
        for line in lines[:20]:
            print(line)
