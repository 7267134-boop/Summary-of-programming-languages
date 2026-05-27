const fs = require('fs');
const html = fs.readFileSync('c:/Users/72671/Desktop/שפות תכנות/סיכום/3.html', 'utf8');
const lines = html.split('\n');
let openDivs = 0;
lines.forEach((line, i) => {
    const openCount = (line.match(/<div/g) || []).length;
    const closeCount = (line.match(/<\/div>/g) || []).length;
    if (line.includes('class="tab-content')) {
        console.log(`Tab started at line ${i+1} with depth ${openDivs}`);
    }
    openDivs += openCount - closeCount;
    if (line.includes('</main>')) {
        console.log(`</main> found at line ${i+1} with depth ${openDivs}`);
    }
});
console.log(`Final depth: ${openDivs}`);
