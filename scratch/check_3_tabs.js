const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html', 'utf8');

const lines = html.split('\n');

let tabs = [];
let currentTab = null;

let insideScript = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('<script>')) {
        insideScript = true;
        continue;
    }
    if (line.includes('</script>')) {
        insideScript = false;
        continue;
    }
    
    if (insideScript) {
        continue;
    }
    
    // Stop processing at </main>
    if (line.includes('</main>')) {
        if (currentTab) {
            currentTab.endLine = i + 1;
            tabs.push(currentTab);
            currentTab = null;
        }
        break;
    }
    
    // Check if line contains a tab-content class or specific tab IDs for 3.html
    // Let's see what tab IDs exist in 3.html by matching class="tab-content" or similar
    const tabMatch = line.match(/class="[^"]*tab-content[^"]*"/i) || line.match(/id="(explicit-refs|implicit-refs|mutable-pairs|parameter-passing)"/i);
    
    if (tabMatch) {
        const idMatch = line.match(/id="([^"]+)"/);
        const id = idMatch ? idMatch[1] : 'unknown';
        
        if (currentTab) {
            currentTab.endLine = i;
            tabs.push(currentTab);
        }
        
        currentTab = {
            id: id,
            startLine: i + 1,
            endLine: null,
            openDivs: 0,
            closeDivs: 0
        };
    }
    
    if (currentTab) {
        if (!line.trim().startsWith('<!--')) {
            const openMatches = (line.match(/<div\b[^>]*>/gi) || []).length;
            const closeMatches = (line.match(/<\/div>/gi) || []).length;
            currentTab.openDivs += openMatches;
            currentTab.closeDivs += closeMatches;
        }
    }
}

console.log("=== Tab Balance Analysis for 3.html ===");
tabs.forEach(t => {
    const diff = t.openDivs - t.closeDivs;
    console.log(`Tab: ${t.id} (Lines ${t.startLine} to ${t.endLine})`);
    console.log(`  Open <div> tags: ${t.openDivs}`);
    console.log(`  Close </div> tags: ${t.closeDivs}`);
    console.log(`  Balance (Open - Close): ${diff}`);
    if (diff !== 0) {
        console.log(`  ⚠️ WARNING: Unbalanced! ${diff > 0 ? 'Fewer' : 'More'} closing divs than opening divs inside this tab.`);
    }
});
