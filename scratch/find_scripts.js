const fs = require('fs');
const filePath = 'c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html';
const html = fs.readFileSync(filePath, 'utf8');
const lines = html.split('\n');

console.log('--- Script Blocks in 3.html ---');
let inside = false;
let startLine = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('<script>') || line.includes('<script ')) {
        console.log(`Open tag <script> at line ${i + 1}: ${line.trim()}`);
    }
    if (line.includes('</script>')) {
        console.log(`Close tag </script> at line ${i + 1}`);
    }
}
