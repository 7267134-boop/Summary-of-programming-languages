const fs = require('fs');

function checkDuplicateIds(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    const idRegex = /\bid="([^"]+)"/g;
    let match;
    let ids = {};
    while ((match = idRegex.exec(html)) !== null) {
        const id = match[1];
        if (ids[id]) {
            ids[id].count++;
            ids[id].lines.push(html.substring(0, match.index).split('\n').length);
        } else {
            ids[id] = { count: 1, lines: [html.substring(0, match.index).split('\n').length] };
        }
    }
    
    console.log(`\n=== Duplicate IDs in ${filePath} ===`);
    let found = false;
    for (const id in ids) {
        if (ids[id].count > 1) {
            console.log(`ID "${id}" appears ${ids[id].count} times on lines: ${ids[id].lines.join(', ')}`);
            found = true;
        }
    }
    if (!found) {
        console.log("No duplicate IDs found!");
    }
}

checkDuplicateIds('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html');
checkDuplicateIds('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html');
