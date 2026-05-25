import os
from pypdf import PdfReader

pdf_path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\Exams\2025\2025ג\מבחן שפות תכנות - מועד 83 - 2025ג (מועד .pdf"
output_dir = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\extracted_images"
os.makedirs(output_dir, exist_ok=True)

reader = PdfReader(pdf_path)
print(f"Total pages: {len(reader.pages)}")

for page_idx, page in enumerate(reader.pages):
    print(f"Page {page_idx+1}:")
    count = 0
    for image_file_object in page.images:
        count += 1
        img_name = f"page_{page_idx+1}_img_{count}.png"
        img_path = os.path.join(output_dir, img_name)
        with open(img_path, "wb") as fp:
            fp.write(image_file_object.data)
        print(f"  Extracted image to: {img_name}")
