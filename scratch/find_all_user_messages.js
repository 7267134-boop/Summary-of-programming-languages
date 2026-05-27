const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('C:\\Users\\72671\\.gemini\\antigravity-ide\\brain\\bfd691c3-e162-4386-9c66-12d316ef343b\\.system_generated\\logs\\transcript.jsonl');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    try {
        const obj = JSON.parse(line);
        if (obj.source === 'USER_EXPLICIT' && obj.type === 'USER_INPUT') {
            console.log(`[Step ${obj.step_index}] USER INPUT:`);
            console.log(obj.content);
            console.log('='.repeat(80));
        }
    } catch (e) {
        // Ignored
    }
});
