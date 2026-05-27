const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html', 'utf8');

// We only care about the HTML body, let's ignore the <script> tags entirely!
const bodyOnly = html.split('<script>')[0];

const lines = bodyOnly.split('\n');
let divStack = [];
let errorCount = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Ignore HTML comments
    if (line.trim().startsWith('<!--') && line.trim().endsWith('-->')) {
        continue;
    }
    
    // Find all tags in this line
    const tagRegex = /<\/?div\b[^>]*>/gi;
    let match;
    while ((match = tagRegex.exec(line)) !== null) {
        const tag = match[0];
        const lineNum = i + 1;
        
        if (tag.startsWith('</')) {
            // Closing tag
            if (divStack.length === 0) {
                console.error(`Error: Unmatched </div> at line ${lineNum}: "${line.trim()}"`);
                errorCount++;
            } else {
                divStack.pop();
            }
        } else {
            // Opening tag
            const idMatch = tag.match(/id="([^"]+)"/);
            const classMatch = tag.match(/class="([^"]+)"/);
            divStack.push({
                line: lineNum,
                id: idMatch ? idMatch[1] : null,
                class: classMatch ? classMatch[1] : null,
                tag: tag
            });
        }
    }
}

console.log(`\n=== Balance Check Done ===`);
console.log(`Unclosed divs remaining in stack: ${divStack.length}`);
divStack.forEach(d => {
    console.log(`  Unclosed <div id="${d.id}" class="${d.class ? d.class.substring(0, 50) : null}"> opened at line ${d.line}`);
});
console.log(`Total unmatched closing divs: ${errorCount}`);
