const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html', 'utf8');
const lines = html.split('\n');

lines.forEach((line, index) => {
    if (line.includes('bg-green-50')) {
        console.log(`Line ${index + 1}: ${line.trim()}`);
    }
});
