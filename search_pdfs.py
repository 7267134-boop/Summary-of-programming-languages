import re

def extract_pdf_chapters(txt_path):
    print(f"=== {txt_path} ===")
    with open(txt_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for line in lines:
        line = line.strip()
        # Look for typical chapter numbers like '1.1', 'פרק 1', etc.
        if re.match(r'^(פרק\s*\d+|יחידה\s*\d+|\d+\.\d+)\b', line):
            if len(line) < 80:
                print(line)

extract_pdf_chapters('חוברת הקורס.pdf.txt')
extract_pdf_chapters('מדריך למידה.pdf.txt')
