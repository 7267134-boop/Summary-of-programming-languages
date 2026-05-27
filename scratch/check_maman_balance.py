import html.parser
import sys

class DivTracer(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.in_script = False
        
    def handle_starttag(self, tag, attrs):
        if tag == 'script':
            self.in_script = True
        if self.in_script:
            return
            
        if tag == 'div':
            attrs_dict = dict(attrs)
            self.stack.append({
                'line': self.getpos()[0],
                'id': attrs_dict.get('id'),
                'class': attrs_dict.get('class'),
                'tag': f"<div id='{attrs_dict.get('id')}' class='{attrs_dict.get('class')}'>"
            })
            
    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_script = False
        if self.in_script:
            return
            
        if tag == 'div':
            if not self.stack:
                print(f"[Line {self.getpos()[0]}] ERROR: Extra </div> tag!")
            else:
                popped = self.stack.pop()
                # print(f"[Line {self.getpos()[0]}] Closed div opened at line {popped['line']} (id={popped['id']})")

with open('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'r', encoding='utf-8') as f:
    content = f.read()

tracer = DivTracer()
tracer.feed(content)

print(f"\nRemaining unclosed divs on stack: {len(tracer.stack)}")
for d in tracer.stack:
    print(f"  Unclosed: line {d['line']}, id={d['id']}, class={d['class']}")
