const fs = require('fs');

function traceMismatches(filePath, tabId, tabIds) {
    const html = fs.readFileSync(filePath, 'utf8');
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

    // Find our specific tab
    let tabTokens = [];
    let insideTab = false;
    
    for (let i = 0; i < tokens.length; i++) {
        const tok = tokens[i];
        if (tok.type === 'open') {
            const idMatch = tok.tag.match(/id="([^"]+)"/i);
            if (idMatch && tabIds.includes(idMatch[1].toLowerCase())) {
                const currentId = idMatch[1].toLowerCase();
                if (currentId === tabId.toLowerCase()) {
                    insideTab = true;
                } else if (insideTab) {
                    // Reached the next tab
                    break;
                }
            }
        }
        
        if (insideTab) {
            tabTokens.push(tok);
        }
    }

    console.log(`\n=== Tracing Tab: ${tabId} in ${filePath} ===`);
    let stack = [];
    tabTokens.forEach(tok => {
        if (tok.type === 'open') {
            stack.push(tok);
            console.log(`[Line ${tok.line}] PUSH: ${tok.tag}`);
        } else {
            if (stack.length === 0) {
                console.log(`[Line ${tok.line}] POP ERROR: Extra close tag! ${tok.tag}`);
            } else {
                const popped = stack.pop();
                console.log(`[Line ${tok.line}] POP: Closed div opened at line ${popped.line} (${popped.tag})`);
            }
        }
    });
}

const tabIds3 = [
    'explicit-files', 'explicit-concept', 'explicit-interp',
    'implicit-files', 'implicit-concept', 'implicit-interp', 'implicit-maman',
    'mutable-files', 'mutable-concept', 'mutable-interp',
    'param-files', 'param-cbv', 'param-cbr', 'param-lazy'
];
traceMismatches('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html', 'param-lazy', tabIds3);

const tabIds4 = [
    'intro-types', 'checked-files', 'lang-checked', 'type-of-func',
    'inferred-files', 'lang-inferred', 'algo-equations', 'algo-unification',
    'algo-examples', 'algo-errors', 'algo-comprehensive', 'algo-maman'
];
traceMismatches('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'algo-maman', tabIds4);
