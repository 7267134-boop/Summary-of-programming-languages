import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\5.html"
with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for divs with id exam-2024b-q1, q2, q3
# We can print their line numbers and surrounding tags
for qid in ['exam-2024b-q1', 'exam-2024b-q2', 'exam-2024b-q3']:
    matches = [m.start() for m in re.finditer(f'id="{qid}"', content)]
    print(f"=== {qid} has {len(matches)} occurrences ===")
    for m_pos in matches:
        # get line number
        line_num = content.count('\n', 0, m_pos) + 1
        # get 200 chars before
        before = content[max(0, m_pos-300):m_pos]
        # find the enclosing divs or headers
        print(f"  Line {line_num}:")
        print(f"    Context before: {repr(before[-150:])}")
