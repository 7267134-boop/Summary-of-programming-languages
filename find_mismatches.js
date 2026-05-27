const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8');

const lines = html.split('\n');

let divStack = [];
let errorCount = 0;

for (let i = 329; i < 2690; i++) { // Lines 330 to 2690
    const line = lines[i];
    const lineNum = i + 1;
    
    // Ignore lines that are fully comments
    if (line.trim().startsWith('<!--') && line.trim().endsWith('-->')) {
        continue;
    }
    
    // Search for <div or </div> tags
    const tagRegex = /<\/?div\b[^>]*>/gi;
    let match;
    while ((match = tagRegex.exec(line)) !== null) {
        const tag = match[0];
        
        if (tag.startsWith('</')) {
            if (divStack.length === 0) {
                console.log(`❌ ERROR: Unmatched </div> at line ${lineNum}: "${line.trim()}"`);
                errorCount++;
            } else {
                divStack.pop();
            }
        } else {
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

console.log(`\n=== Analysis Complete ===`);
console.log(`Remaining unclosed divs in stack: ${divStack.length}`);
divStack.forEach(d => {
    console.log(`  Opened at line ${d.line}: ${d.tag}`);
});
console.log(`Total unmatched closing divs: ${errorCount}`);
