import os
import sys
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')

exams_dir = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\Exams"
output_dir = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\extracted_txt"
os.makedirs(output_dir, exist_ok=True)

print("Starting extraction of all PDFs to text...")
for root, dirs, files in os.walk(exams_dir):
    for file in files:
        if file.lower().endswith(".pdf"):
            pdf_path = os.path.join(root, file)
            rel_path = os.path.relpath(pdf_path, exams_dir)
            out_filename = rel_path.replace(os.sep, "__") + ".txt"
            out_path = os.path.join(output_dir, out_filename)
            
            print(f"Extracting {rel_path} -> {out_filename}...")
            try:
                reader = PdfReader(pdf_path)
                text_content = []
                for idx, page in enumerate(reader.pages):
                    txt = page.extract_text() or ""
                    text_content.append(f"=== PAGE {idx+1} ===\n{txt}\n")
                
                with open(out_path, "w", encoding="utf-8") as out_f:
                    out_f.write("\n".join(text_content))
                print(f"  Done. Extracted {len(reader.pages)} pages.")
            except Exception as e:
                print(f"  Error: {e}")
print("Finished extraction.")
