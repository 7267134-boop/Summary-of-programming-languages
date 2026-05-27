import re
with open('1.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('id="racket-philosophy"')
end_idx = text.find('id="racket-bindings"', idx)
print(text[end_idx-500:end_idx].encode('utf-8').decode('utf-8'))
