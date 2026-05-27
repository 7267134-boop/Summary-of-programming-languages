const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('C:\\Users\\72671\\.gemini\\antigravity-ide\\brain\\bfd691c3-e162-4386-9c66-12d316ef343b\\.system_generated\\logs\\transcript.jsonl');
const outStream = fs.createWriteStream('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\scratch\\history_solutions.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    try {
        const obj = JSON.parse(line);
        if (obj.source === 'MODEL' && obj.content) {
            const content = obj.content.toLowerCase();
            if (content.includes('div') || content.includes('mismatch') || content.includes('duplicate') || content.includes('balance') || content.includes('כפל') || content.includes('כפיל') || content.includes('בתחתית')) {
                outStream.write(`[Step ${obj.step_index}] MODEL content mentions div/balance/duplicate:\n`);
                outStream.write(obj.content.substring(0, 1000) + '...\n');
                outStream.write('='.repeat(80) + '\n');
            }
        }
    } catch (e) {
        // Ignored
    }
});

rl.on('close', () => {
    console.log("Done writing history solutions to file!");
});
