const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8');

const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;

while ((match = scriptRegex.exec(html)) !== null) {
    count++;
    const code = match[1];
    console.log(`\n--- Checking Script Block ${count} ---`);
    try {
        new vm.Script(code);
        console.log(`Script ${count} parsed successfully.`);
    } catch (e) {
        console.error(`Script ${count} parsing error:`, e.message);
        
        // Find line number
        const lines = code.split('\n');
        try {
            new vm.Script(code);
        } catch (err) {
            if (err.stack) {
                const stackLines = err.stack.split('\n');
                console.log(stackLines[0]);
                console.log(stackLines[1]);
                console.log(stackLines[2]);
            }
        }
    }
}
