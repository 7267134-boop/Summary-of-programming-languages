const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8');

const tagRegex = /<\/?div\b[^>]*>/gi;
let match;

let currentTab = null;
let currentBalance = 0;
let minBalance = 0;
let tabStartLine = 0;

function getLineFromIndex(index) {
    return html.substring(0, index).split('\n').length;
}

while ((match = tagRegex.exec(html)) !== null) {
    const tag = match[0];
    const lineNum = getLineFromIndex(match.index);
    const lineStr = html.substring(0, match.index).split('\n').pop() + tag;
    
    // Ignore if inside a comment or script
    const commentStart = html.lastIndexOf('<!--', match.index);
    const commentEnd = html.lastIndexOf('-->', match.index);
    if (commentStart > commentEnd) continue;
    
    const scriptStart = html.lastIndexOf('<script', match.index);
    const scriptEnd = html.lastIndexOf('</script>', match.index);
    if (scriptStart > scriptEnd) continue;
    
    if (tag.includes('tab-content')) {
        if (currentTab) {
            console.log(`Tab ${currentTab} ended at line ${lineNum}. Final balance: ${currentBalance}, Min balance: ${minBalance}`);
            if (currentBalance !== 0 || minBalance < 0) {
                console.log(`  >>> ERROR in ${currentTab}: Balance dipped to ${minBalance} or didn't finish at 0.`);
            }
        }
        
        const idMatch = tag.match(/id="([^"]+)"/);
        currentTab = idMatch ? idMatch[1] : 'unknown';
        currentBalance = 1; // open the tab itself
        minBalance = 1;
        continue;
    }
    
    if (currentTab) {
        if (tag.toLowerCase().startsWith('</')) {
            currentBalance--;
        } else {
            currentBalance++;
        }
        
        if (currentBalance < minBalance) {
            minBalance = currentBalance;
        }
        
        if (currentBalance === 0 && minBalance === 0) {
            console.log(`Tab ${currentTab} prematurely reached 0 balance at line ${lineNum}!`);
            minBalance = -999; // prevent printing again
        }
    }
}

if (currentTab) {
    console.log(`Tab ${currentTab} ended at EOF. Final balance: ${currentBalance}, Min balance: ${minBalance}`);
}
