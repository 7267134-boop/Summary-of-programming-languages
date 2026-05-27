const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8');

let pos = 0;
const len = html.length;

let lineNum = 1;
let tokens = [];

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
    
    if (matchStr('<script')) {
        const endScript = html.toLowerCase().indexOf('</script>', pos);
        if (endScript !== -1) {
            const scriptText = html.substring(pos, endScript);
            const linesInScript = (scriptText.match(/\n/g) || []).length;
            lineNum += linesInScript;
            pos = endScript + '</script>'.length;
        } else {
            pos += 7;
        }
        continue;
    }
    
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
    
    if (char === '<') {
        const isClose = html[pos + 1] === '/';
        const tagStart = isClose ? pos + 2 : pos + 1;
        
        if (html.substring(tagStart, tagStart + 3).toLowerCase() === 'div') {
            const endTag = html.indexOf('>', pos);
            if (endTag !== -1) {
                const fullTag = html.substring(pos, endTag + 1);
                const tagText = fullTag.replace(/\s+/g, ' ');
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

console.log(`Total div tokens parsed: ${tokens.length}`);

let tabs = [];
let currentTab = null;

const tabIds = [
    'intro-types', 'checked-files', 'lang-checked', 'type-of-func',
    'inferred-files', 'lang-inferred', 'algo-equations', 'algo-unification',
    'algo-examples', 'algo-errors', 'algo-comprehensive', 'algo-maman'
];

for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    
    if (tok.type === 'open') {
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

console.log("\n=== Robust Tab Balance Analysis for 4.html ===");
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
