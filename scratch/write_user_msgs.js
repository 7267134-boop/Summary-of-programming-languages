const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('C:\\Users\\72671\\.gemini\\antigravity-ide\\brain\\bfd691c3-e162-4386-9c66-12d316ef343b\\.system_generated\\logs\\transcript.jsonl');
const outStream = fs.createWriteStream('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\scratch\\all_user_messages.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    try {
        const obj = JSON.parse(line);
        if (obj.source === 'USER_EXPLICIT' && obj.type === 'USER_INPUT') {
            outStream.write(`[Step ${obj.step_index}] USER INPUT:\n`);
            outStream.write(obj.content + '\n');
            outStream.write('='.repeat(80) + '\n');
        }
    } catch (e) {
        // Ignored
    }
});

rl.on('close', () => {
    console.log("Done writing all user messages to file!");
});
