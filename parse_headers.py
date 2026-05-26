import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

def print_headers(filename):
    print(f"=== {filename} ===")
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        headers = re.findall(r'<h([1-3]).*?>(.*?)</h\1>', content, re.IGNORECASE | re.DOTALL)
        for level, text in headers:
            text = re.sub(r'<[^>]+>', '', text).strip()
            text = ' '.join(text.split())
            print(f"h{level}: {text}")

print_headers('1.html')
print_headers('2.html')
