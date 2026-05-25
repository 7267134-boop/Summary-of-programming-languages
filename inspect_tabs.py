import re

with open("5.html", "r", encoding="utf-8") as f:
    content = f.read()

# find all tab divs
tabs = re.findall(r'<div\s+id="([^"]+)"\s+class="tab-content[^"]*"', content)
print("Tabs in HTML:")
for t in tabs:
    # let's search if there's a button pointing to this tab
    in_sidebar = content.count(f"showTab('{t}')")
    print(f"  ID: {t} | in_sidebar count: {in_sidebar}")
