const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8');

// Parse all div tags in body (excluding scripts/comments)
let pos = 0;
const len = html.length;
let lineNum = 1;
let openCount = 0;
let closeCount = 0;
let stack = [];

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
            lineNum += (scriptText.match(/\n/g) || []).length;
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
            lineNum += (commentText.match(/\n/g) || []).length;
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
                
                if (isClose) {
                    closeCount++;
                    if (stack.length === 0) {
                        console.log(`[Line ${lineNum}] Extra close tag: ${tagText}`);
                    } else {
                        stack.pop();
                    }
                } else {
                    openCount++;
                    stack.push({ line: lineNum, tag: tagText });
                }
                
                lineNum += (fullTag.match(/\n/g) || []).length;
                pos = endTag + 1;
                continue;
            }
        }
    }
    
    pos++;
}

console.log(`\n=== 4.html Global Div Tag Analysis ===`);
console.log(`Total opening divs: ${openCount}`);
console.log(`Total closing divs: ${closeCount}`);
console.log(`Net balance: ${openCount - closeCount}`);
console.log(`Stack size remaining: ${stack.length}`);
stack.forEach(s => {
    console.log(`  Unclosed: opened at line ${s.line} | ${s.tag}`);
});
