import re
import sys

def extract_toc(pdf_text_path, out_path):
    try:
        with open(pdf_text_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        toc = []
        for line in lines:
            line = line.strip()
            # Capture standard chapter/section numbers like '1.', '1.1', '1.1.1' followed by text
            # Or phrases starting with 'פרק' or 'יחידה'
            if re.match(r'^(\d+\.\d+(\.\d+)?|פרק\s*\d+|יחידה\s*\d+)\b', line) or re.match(r'^\d+\.\s+[א-ת]', line):
                if len(line) < 100:
                    toc.append(line)
        
        with open(out_path, 'w', encoding='utf-8') as out:
            out.write('\n'.join(toc))
            
    except Exception as e:
        print(f"Error with {pdf_text_path}: {e}")

extract_toc('חוברת הקורס.pdf.txt', 'toc_course.txt')
extract_toc('מדריך למידה.pdf.txt', 'toc_guide.txt')
print("Done")
