const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8');
const lines = html.split('\n');

const startLine = 1969;
const endLine = 2322;

let stack = [];

for (let i = startLine - 1; i < endLine; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    
    if (line.trim().startsWith('<!--') && line.trim().endsWith('-->')) {
        continue;
    }
    
    const tagRegex = /<\/?div\b[^>]*>/gi;
    let match;
    while ((match = tagRegex.exec(line)) !== null) {
        const tag = match[0];
        if (tag.startsWith('</')) {
            if (stack.length === 0) {
                console.log(`[Line ${lineNum}] Extra closing tag found: ${tag}`);
            } else {
                const popped = stack.pop();
                console.log(`[Line ${lineNum}] Closed ${popped.tag} (opened at line ${popped.line})`);
            }
        } else {
            stack.push({ line: lineNum, tag: tag });
            console.log(`[Line ${lineNum}] Opened ${tag}`);
        }
    }
}
