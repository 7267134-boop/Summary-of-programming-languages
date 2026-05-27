const fs = require('fs');

const content = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\scratch\\history_solutions.txt', 'utf8');
const regex = /\[Step (\d+)\] MODEL content mentions div\/balance\/duplicate:([\s\S]*?)(?=={80})/g;
let match;

while ((match = regex.exec(content)) !== null) {
    const stepNum = match[1];
    const body = match[2];
    if (body.includes('bg-green-50') || body.includes('Unification')) {
        console.log(`[Step ${stepNum}]`);
        console.log(body.substring(0, 500));
        console.log('='.repeat(50));
    }
}
