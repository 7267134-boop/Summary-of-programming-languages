const fs = require('fs');
const filePath = 'c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html';
const html = fs.readFileSync(filePath, 'utf8');
const lines = html.split('\n');

const len = 340; // Let's check 340 lines
let matchCount = 0;
for (let i = 0; i < len; i++) {
    const l1 = lines[3495 - 1 + i].trim();
    const l2 = lines[4845 - 1 + i].trim();
    if (l1 === l2) {
        matchCount++;
    } else {
        console.log(`Mismatch at offset ${i}:`);
        console.log(`  Line ${3495 + i}: "${l1}"`);
        console.log(`  Line ${4845 + i}: "${l2}"`);
        break;
    }
}
console.log(`Matched lines: ${matchCount} / ${len}`);
