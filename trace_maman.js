const fs = require('fs');
const lines = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8').split('\n');
let balance = 0;
for (let i = 2323; i <= 2690; i++) {
    const line = lines[i];
    if (!line) continue;
    const opens = (line.match(/<div\b/gi) || []).length;
    const closes = (line.match(/<\/div>/gi) || []).length;
    balance += (opens - closes);
    if (opens > 0 || closes > 0) {
        console.log(`${i+1}: O=${opens} C=${closes} Bal=${balance} | ${line.trim()}`);
    }
}
