const fs = require('fs');

const filePath = 'c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html';
const html = fs.readFileSync(filePath, 'utf8');

// A simple tokenizer to find all div opens and closes, and print their context
// We want to skip scripts and comments.
const divRegex = /(<\/?div\b[^>]*>|<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script>)/gi;

let match;
let openDivs = 0;
let stack = [];
let tabStack = [];
let currentTab = null;

// Find all matches
let index = 0;
let pos = 0;

// Helper to find line number from index
function getLineNum(index) {
    return html.substring(0, index).split('\n').length;
}

while ((match = divRegex.exec(html)) !== null) {
    const token = match[0];
    const lineNum = getLineNum(match.index);

    if (token.startsWith('<!--')) {
        // Comment, skip
        continue;
    }
    if (token.toLowerCase().startsWith('<script')) {
        // Script, skip
        continue;
    }

    // It's a div
    if (token.startsWith('</')) {
        openDivs--;
        const opened = stack.pop();
        
        // If we close a tab container
        if (currentTab && openDivs < currentTab.startGlobalDivs) {
            console.log(`Tab "${currentTab.id}" CLOSED at line ${lineNum} by: ${token}`);
            currentTab = null;
        }
    } else {
        openDivs++;
        const idMatch = token.match(/id="([^"]+)"/);
        const classMatch = token.match(/class="([^"]+)"/);
        const id = idMatch ? idMatch[1] : null;
        const className = classMatch ? classMatch[1] : '';

        const node = {
            line: lineNum,
            tag: token,
            id: id,
            class: className,
            openDivsAtStart: openDivs
        };
        stack.push(node);

        if (className.includes('tab-content')) {
            if (currentTab) {
                console.log(`WARNING: Nested or unclosed tab detected. Old: "${currentTab.id}" at line ${currentTab.line}, New: "${id}" at line ${lineNum}`);
            }
            currentTab = {
                id: id,
                line: lineNum,
                startGlobalDivs: openDivs // this is the depth including the tab div itself
            };
            console.log(`Tab "${id}" STARTED at line ${lineNum}`);
        }
    }
}

console.log(`\nRemaining open divs: ${openDivs}`);
stack.forEach(d => {
    console.log(`  Unclosed div at line ${d.line}: ${d.tag}`);
});
