import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
fpath = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\5.html"
with open(fpath, "r", encoding="utf-8") as f:
    content = f.read()

# Let's find the exact starting index of the first occurrence of EXAM 2024b Q1
# and the start of the second occurrence of EXAM 2024b Q1.
# First occurrence comment:
# <!-- ==========================================
#      EXAM 2024b Q1 - ENUM & MATCH
# =========================================== -->
# <div id="exam-2024b-q1" ...

pattern = r'<!-- ==========================================\s+EXAM 2024b Q1 - ENUM & MATCH\s+=========================================== -->'
matches = list(re.finditer(pattern, content))
print(f"Found {len(matches)} matches of the EXAM 2024b Q1 comment")

if len(matches) == 2:
    idx1 = matches[0].start()
    idx2 = matches[1].start()
    
    # We want to remove from idx1 to idx2
    new_content = content[:idx1] + content[idx2:]
    
    # Let's verify that after removing, we only have 1 occurrence of each question
    q1_count = len(re.findall(r'id="exam-2024b-q1"', new_content))
    q2_count = len(re.findall(r'id="exam-2024b-q2"', new_content))
    q3_count = len(re.findall(r'id="exam-2024b-q3"', new_content))
    print(f"After cleanup counts: Q1={q1_count}, Q2={q2_count}, Q3={q3_count}")
    
    if q1_count == 1 and q2_count == 1 and q3_count == 1:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Successfully cleaned up 5.html duplicates!")
    else:
        print("Counts are not 1, aborting write!")
else:
    print("Cannot clean up, number of matches is not 2")
