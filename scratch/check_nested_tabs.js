const fs = require('fs');

function checkNestedTabs(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    let pos = 0;
    const len = html.length;
    let lineNum = 1;
    let stack = [];
    let tabStack = [];

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
                    
                    if (isClose) {
                        if (stack.length > 0) {
                            const popped = stack.pop();
                            if (popped.isTab) {
                                tabStack.pop();
                            }
                        }
                    } else {
                        const isTab = fullTag.includes('tab-content');
                        const idMatch = fullTag.match(/id="([^"]+)"/);
                        const id = idMatch ? idMatch[1] : null;
                        
                        if (isTab) {
                            if (tabStack.length > 0) {
                                console.log(`[Line ${lineNum}] NESTED TAB FOUND: "${id || 'unknown'}" is inside "${tabStack[tabStack.length - 1].id}"!`);
                            }
                            tabStack.push({ line: lineNum, id: id });
                        }
                        
                        stack.push({ line: lineNum, tag: fullTag, isTab: isTab });
                    }
                    
                    lineNum += (fullTag.match(/\n/g) || []).length;
                    pos = endTag + 1;
                    continue;
                }
            }
        }
        
        pos++;
    }
}

console.log("=== Checking 3.html ===");
checkNestedTabs('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html');

console.log("\n=== Checking 4.html ===");
checkNestedTabs('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html');
