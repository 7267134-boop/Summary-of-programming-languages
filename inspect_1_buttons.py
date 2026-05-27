with open('1.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's find all occurrences of buttons or links containing "הבא" or "הקודם" or "nav-btn"
# Or let's just inspect the end of one tab, e.g. "racket-philosophy"
import re
tab_starts = list(re.finditer(r'<div\s+id="racket-philosophy"\s+class="tab-content[^"]*"', content))
if tab_starts:
    start_pos = tab_starts[0].start()
    # find next tab
    next_tab = re.search(r'<div\s+id="[^"]+"\s+class="tab-content', content[tab_starts[0].end():])
    end_pos = (tab_starts[0].end() + next_tab.start()) if next_tab else len(content)
    tab_html = content[start_pos:end_pos]
    print("racket-philosophy tab length:", len(tab_html))
    # print the last 1500 chars of this tab
    print("=== Last 1500 chars of racket-philosophy ===")
    print(tab_html[-1500:])
else:
    print("racket-philosophy not found")
