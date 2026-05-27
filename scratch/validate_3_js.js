const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html', 'utf8');
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
let errors = 0;

while ((match = scriptRegex.exec(html)) !== null) {
    const code = match[1].trim();
    if (!code) continue;
    // skip cdn tailwind import script (or scripts with src)
    if (match[0].includes('src=')) {
        console.log(`Skipping external script ${match[0].substring(0, 50)}...`);
        continue;
    }
    
    count++;
    console.log(`\nChecking Script Block ${count}...`);
    try {
        new vm.Script(code);
        console.log(`Script Block ${count} parsed successfully.`);
    } catch (e) {
        console.error(`Script Block ${count} parsing error:`, e.message);
        console.log(e.stack);
        errors++;
    }
}

console.log(`\nSyntax verification finished. Errors found: ${errors}`);
process.exit(errors === 0 ? 0 : 1);
