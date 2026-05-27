const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('C:\\Users\\72671\\.gemini\\antigravity-ide\\brain\\999d8e73-0f56-4bdb-85db-7b18f24bfcd5\\.system_generated\\logs\\transcript.jsonl');
const outStream = fs.createWriteStream('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\scratch\\subagent_diffs.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    try {
        const obj = JSON.parse(line);
        if (obj.type === 'CODE_ACTION' && obj.content && obj.content.includes('[diff_block_start]')) {
            outStream.write(`[Step ${obj.step_index}] CODE ACTION:\n`);
            outStream.write(obj.content + '\n');
            outStream.write('='.repeat(80) + '\n');
        }
    } catch (e) {
        // Ignored
    }
});

rl.on('close', () => {
    console.log("Done writing subagent diffs!");
});
