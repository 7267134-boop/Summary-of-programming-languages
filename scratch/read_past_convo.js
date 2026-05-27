const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('C:\\Users\\72671\\.gemini\\antigravity-ide\\brain\\999d8e73-0f56-4bdb-85db-7b18f24bfcd5\\.system_generated\\logs\\transcript.jsonl');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    try {
        const obj = JSON.parse(line);
        if (obj.type === 'USER_INPUT' || obj.type === 'CODE_ACTION') {
            console.log(`[Step ${obj.step_index}] Source: ${obj.source}, Type: ${obj.type}`);
            if (obj.content) {
                console.log(obj.content.substring(0, 1000));
            }
            console.log('='.repeat(80));
        }
    } catch (e) {
        // Ignored
    }
});
