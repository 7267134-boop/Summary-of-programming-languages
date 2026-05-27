const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html', 'utf8');

// A robust HTML tag parser that extracts all div tags (opening and closing) with their lines
// We will parse character by character to correctly handle multi-line tags, comments, and scripts.

let pos = 0;
const len = html.length;

let lineNum = 1;
let tokens = [];

// Helper to check if we match a string at current position
function matchStr(str) {
    return html.substring(pos, pos + str.length).toLowerCase() === str.toLowerCase();
}

while (pos < len) {
    const char = html[pos];
    
    if (char === '\n') {
        lineNum++;
        pos++;
        continue;
    }
    
    // Skip scripts
    if (matchStr('<script')) {
        // find closing </script>
        const endScript = html.toLowerCase().indexOf('</script>', pos);
        if (endScript !== -1) {
            // Count lines inside script
            const scriptText = html.substring(pos, endScript);
            const linesInScript = (scriptText.match(/\n/g) || []).length;
            lineNum += linesInScript;
            pos = endScript + '</script>'.length;
        } else {
            pos += 7;
        }
        continue;
    }
    
    // Skip comments
    if (matchStr('<!--')) {
        const endComment = html.indexOf('-->', pos);
        if (endComment !== -1) {
            const commentText = html.substring(pos, endComment);
            const linesInComment = (commentText.match(/\n/g) || []).length;
            lineNum += linesInComment;
            pos = endComment + 3;
        } else {
            pos += 4;
        }
        continue;
    }
    
    // Check for div tag
    if (char === '<') {
        const isClose = html[pos + 1] === '/';
        const tagStart = isClose ? pos + 2 : pos + 1;
        
        if (html.substring(tagStart, tagStart + 3).toLowerCase() === 'div') {
            // It's a div tag! Let's find its end '>'
            const endTag = html.indexOf('>', pos);
            if (endTag !== -1) {
                const fullTag = html.substring(pos, endTag + 1);
                const tagText = fullTag.replace(/\s+/g, ' ');
                
                // Count lines inside tag (if multi-line)
                const linesInTag = (fullTag.match(/\n/g) || []).length;
                
                tokens.push({
                    type: isClose ? 'close' : 'open',
                    line: lineNum,
                    tag: tagText
                });
                
                lineNum += linesInTag;
                pos = endTag + 1;
                continue;
            }
        }
    }
    
    pos++;
}

// Now we have a list of all opening and closing div tokens in the body (excluding scripts/comments)
console.log(`Total div tokens parsed: ${tokens.length}`);

// Let's identify the tabs and analyze their balances
let tabs = [];
let currentTab = null;

const tabIds = [
    'explicit-files', 'explicit-concept', 'explicit-interp',
    'implicit-files', 'implicit-concept', 'implicit-interp', 'implicit-maman',
    'mutable-files', 'mutable-concept', 'mutable-interp',
    'param-files', 'param-cbv', 'param-cbr', 'param-lazy'
];

for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    
    // Check if this token is a tab start div
    if (tok.type === 'open') {
        // Extract id if it matches one of our tabs
        const idMatch = tok.tag.match(/id="([^"]+)"/i);
        if (idMatch && tabIds.includes(idMatch[1].toLowerCase())) {
            const tabId = idMatch[1].toLowerCase();
            
            if (currentTab) {
                currentTab.endTokenIndex = i - 1;
                tabs.push(currentTab);
            }
            
            currentTab = {
                id: tabId,
                startLine: tok.line,
                startTokenIndex: i,
                tokens: []
            };
        }
    }
    
    if (currentTab) {
        currentTab.tokens.push(tok);
    }
}

if (currentTab) {
    currentTab.endTokenIndex = tokens.length - 1;
    tabs.push(currentTab);
}

console.log("\n=== Robust Tab Balance Analysis ===");
tabs.forEach(t => {
    let stack = [];
    let errors = [];
    
    t.tokens.forEach(tok => {
        if (tok.type === 'open') {
            stack.push(tok);
        } else {
            if (stack.length === 0) {
                errors.push(tok);
            } else {
                stack.pop();
            }
        }
    });
    
    console.log(`Tab: ${t.id} (Line ${t.startLine})`);
    console.log(`  Total divs: ${t.tokens.length} (${t.tokens.filter(x => x.type === 'open').length} open, ${t.tokens.filter(x => x.type === 'close').length} close)`);
    console.log(`  Unclosed at end of tab: ${stack.length}`);
    stack.forEach(s => {
        console.log(`    - Opened at line ${s.line}: ${s.tag}`);
    });
    console.log(`  Extra closing divs in tab: ${errors.length}`);
    errors.forEach(e => {
        console.log(`    - Closed at line ${e.line}: ${e.tag}`);
    });
});
