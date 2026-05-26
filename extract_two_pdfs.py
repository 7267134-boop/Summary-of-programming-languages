import os
from pypdf import PdfReader

pdfs = ['חוברת הקורס.pdf', 'מדריך למידה.pdf']
for p in pdfs:
    try:
        reader = PdfReader(p)
        text = []
        for idx, page in enumerate(reader.pages):
            txt = page.extract_text() or ""
            text.append(f"=== PAGE {idx+1} ===\n{txt}\n")
        with open(f"{p}.txt", "w", encoding="utf-8") as f:
            f.write("\n".join(text))
        print(f"Extracted {p}")
    except Exception as e:
        print(f"Failed {p}: {e}")
