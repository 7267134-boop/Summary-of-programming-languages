const fs = require('fs');

const filePath = 'c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html';
const html = fs.readFileSync(filePath, 'utf8');
const lines = html.split('\n');

console.log(`Total lines: ${lines.length}`);

let currentTab = null;
let inScript = false;
let openDivs = 0; // global open divs
let tabList = [];
let globalErrors = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Check script boundary
    if (line.includes('<script>') || line.includes('<script ')) {
        inScript = true;
    }
    if (inScript) {
        if (line.includes('</script>')) {
            inScript = false;
        }
        continue;
    }

    // Ignore comment-only lines
    if (line.trim().startsWith('<!--') && line.trim().endsWith('-->')) {
        continue;
    }

    // Find tab content starts
    // In 3.html, let's see how tabs are declared. Usually they have class="tab-content" or class="..." and id="..."
    // Let's match `<div id="..."` that represents a tab content
    // Let's look for `<div` with id and check if it's a tab container
    const isTabStart = line.includes('tab-content') && line.includes('<div');
    
    // We also count div tokens in the line
    const divRegex = /<\/?div\b[^>]*>/gi;
    let match;
    let lineDivs = [];
    while ((match = divRegex.exec(line)) !== null) {
        lineDivs.push({
            tag: match[0],
            isClose: match[0].startsWith('</')
        });
    }

    if (isTabStart) {
        const idMatch = line.match(/id="([^"]+)"/);
        const tabId = idMatch ? idMatch[1] : 'unknown';
        
        if (currentTab) {
            currentTab.endLine = lineNum - 1;
            tabList.push(currentTab);
        }

        currentTab = {
            id: tabId,
            startLine: lineNum,
            endLine: null,
            openCount: 0,
            closeCount: 0,
            depthStack: [],
            startGlobalDivs: openDivs
        };
    }

    lineDivs.forEach(div => {
        if (div.isClose) {
            openDivs--;
            if (currentTab) {
                currentTab.closeCount++;
                if (currentTab.depthStack.length > 0) {
                    currentTab.depthStack.pop();
                } else {
                    // Underflow: closed the tab wrapper itself, or closed more than opened inside
                    // Let's record this
                }
            }
        } else {
            openDivs++;
            if (currentTab) {
                currentTab.openCount++;
                const idAttr = div.tag.match(/id="([^"]+)"/);
                const classAttr = div.tag.match(/class="([^"]+)"/);
                currentTab.depthStack.push({
                    line: lineNum,
                    tag: div.tag,
                    id: idAttr ? idAttr[1] : null,
                    class: classAttr ? classAttr[1] : null
                });
            }
        }
    });

    if (currentTab && openDivs <= currentTab.startGlobalDivs) {
        // If we drop below or hit the global div count we started with, the tab has ended!
        currentTab.endLine = lineNum;
        tabList.push(currentTab);
        currentTab = null;
    }
}

if (currentTab) {
    currentTab.endLine = lines.length;
    tabList.push(currentTab);
}

console.log("\n=== TABS DETECTED IN 3.HTML ===");
tabList.forEach(t => {
    console.log(`Tab: "${t.id}" (Lines ${t.startLine} -> ${t.endLine})`);
    console.log(`  Opened divs: ${t.openCount}, Closed divs: ${t.closeCount}`);
    console.log(`  Unclosed at end of tab: ${t.depthStack.length}`);
    if (t.depthStack.length > 0) {
        console.log(`  Unclosed list:`);
        t.depthStack.forEach(d => {
            console.log(`    Line ${d.line}: ${d.tag}`);
        });
    }
});

console.log(`\nFinal global open divs in document: ${openDivs}`);
