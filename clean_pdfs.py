import os

exams_dir = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\Exams"

print("Checking and cleaning PDFs...")
cleaned_count = 0
for root, dirs, files in os.walk(exams_dir):
    for file in files:
        if file.lower().endswith(".pdf"):
            path = os.path.join(root, file)
            try:
                with open(path, "rb") as f:
                    data = f.read()
                
                # Check if it starts with HTTP headers
                if data.startswith(b"Content-") or data.startswith(b"content-") or b"%PDF" in data[:500] and not data.startswith(b"%PDF"):
                    idx = data.find(b"%PDF")
                    if idx != -1:
                        print(f"Cleaning {os.path.relpath(path, exams_dir)}: stripping {idx} bytes from header.")
                        with open(path, "wb") as f:
                            f.write(data[idx:])
                        cleaned_count += 1
            except Exception as e:
                print(f"Error checking {file}: {e}")

print(f"Done. Cleaned {cleaned_count} PDF files.")
