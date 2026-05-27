path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html"
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

out = []
for idx in range(1250, 1420):
    if idx < len(lines):
        out.append(f"{idx+1}: {lines[idx].strip()}")

with open(r"c:\Users\72671\Desktop\שפות תכנות\סיכום\scratch\around_1300.txt", 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print("Done writing to scratch/around_1300.txt")
