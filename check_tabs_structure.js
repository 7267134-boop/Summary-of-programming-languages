const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8');

// Find all occurrences of class="tab-content" or id="algo-..." / id="lang-..."
// Let's parse the HTML using a regex-based tag tokenizer to find unclosed divs.
const lines = html.split('\n');

let openDivs = 0;
let tabDetails = [];
let currentTab = null;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for open/close div tags
    const openMatches = (line.match(/<div(\s|>)/gi) || []).length;
    const closeMatches = (line.match(/<\/div>/gi) || []).length;
    
    // Check if line contains a tab start
    const tabMatch = line.match(/class="[^"]*tab-content[^"]*"/i) || line.match(/id="(checked-files|lang-checked|inferred-files|lang-inferred|algo-equations|algo-unification|algo-examples|algo-errors|algo-comprehensive|algo-maman)"/i);
    
    if (tabMatch) {
        // Extract ID
        const idMatch = line.match(/id="([^"]+)"/);
        const id = idMatch ? idMatch[1] : 'unknown';
        console.log(`Tab start found: ID="${id}" at line ${i+1}. Current open divs: ${openDivs}`);
        
        if (currentTab) {
            tabDetails.push({
                id: currentTab.id,
                startLine: currentTab.line,
                endLine: i,
                startedDivs: currentTab.openDivsAtStart,
                endedDivs: openDivs
            });
        }
        
        currentTab = {
            id: id,
            line: i + 1,
            openDivsAtStart: openDivs
        };
    }
    
    openDivs += openMatches;
    openDivs -= closeMatches;
}

if (currentTab) {
    tabDetails.push({
        id: currentTab.id,
        startLine: currentTab.line,
        endLine: lines.length,
        startedDivs: currentTab.openDivsAtStart,
        endedDivs: openDivs
    });
}

console.log("\n=== Tab Summary ===");
tabDetails.forEach(tab => {
    console.log(`Tab ID: ${tab.id} (Lines ${tab.startLine}-${tab.endLine})`);
    console.log(`  Divs open when tab started: ${tab.startedDivs}`);
    console.log(`  Divs open when tab ended/next started: ${tab.endedDivs}`);
});
console.log(`Final open divs in document: ${openDivs}`);
