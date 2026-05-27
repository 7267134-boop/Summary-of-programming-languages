const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8');

let balance = 0;
const tagRegex = /<\/?div\b/gi;
let match;
const lines = html.split('\n');

function getLineFromIndex(index) {
    return html.substring(0, index).split('\n').length;
}

let tabBalances = {};
let currentTab = null;

while ((match = tagRegex.exec(html)) !== null) {
    const isClosing = match[0].toLowerCase() === '</div';
    const lineNum = getLineFromIndex(match.index);
    const lineStr = lines[lineNum - 1];
    
    // Ignore if inside a comment
    const commentStart = html.lastIndexOf('<!--', match.index);
    const commentEnd = html.lastIndexOf('-->', match.index);
    if (commentStart > commentEnd) continue;
    
    // Ignore if inside a script
    const scriptStart = html.lastIndexOf('<script', match.index);
    const scriptEnd = html.lastIndexOf('</script>', match.index);
    if (scriptStart > scriptEnd) continue;
    
    if (lineStr.includes('tab-content')) {
        currentTab = lineStr.match(/id="([^"]+)"/) ? lineStr.match(/id="([^"]+)"/)[1] : currentTab;
        tabBalances[currentTab] = { startLine: lineNum, balance: 0 };
    }

    if (isClosing) {
        balance--;
        if (currentTab) tabBalances[currentTab].balance--;
    } else {
        balance++;
        if (currentTab) tabBalances[currentTab].balance++;
    }
}

console.log(`Final overall balance: ${balance}`);
console.log("Tab balances:");
for (const [tab, data] of Object.entries(tabBalances)) {
    console.log(`  Tab: ${tab} (starts at ${data.startLine}), internal balance: ${data.balance}`);
}
