const fs = require('fs');
const filePath = 'c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html';
const html = fs.readFileSync(filePath, 'utf8');

// Strip out script tags to analyze only HTML
const htmlWithoutScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');

const lines = htmlWithoutScripts.split('\n');
console.log('--- HTML IDs in 3.html (excluding scripts) ---');
let idCounts = {};
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/id="([^"]+)"/g);
    if (match) {
        match.forEach(m => {
            const id = m.match(/id="([^"]+)"/)[1];
            if (!idCounts[id]) idCounts[id] = [];
            idCounts[id].push(i + 1);
        });
    }
}

for (let id in idCounts) {
    if (idCounts[id].length > 1) {
        console.log(`❌ Duplicate ID: "${id}" on lines: ${idCounts[id].join(', ')}`);
    } else {
        // console.log(`ID: "${id}" on line ${idCounts[id][0]}`);
    }
}
