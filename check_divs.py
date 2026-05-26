import glob

for fname in ['1.html', '2.html', '3.html', '4.html']:
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    open_divs = content.count("<div")
    close_divs = content.count("</div")
    print(f"{fname}: <div count = {open_divs}, </div count = {close_divs}, diff = {open_divs - close_divs}")
