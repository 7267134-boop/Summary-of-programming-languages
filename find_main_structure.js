const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8');

const lines = html.split('\n');

// Find lines containing <main, </main>, or any tab-content
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('<main') || line.includes('</main>') || line.includes('tab-content')) {
        console.log(`Line ${i+1}: ${line.trim()}`);
    }
}
