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
        if (obj.content && (obj.source === 'USER_EXPLICIT' || obj.source === 'MODEL')) {
            const content = obj.content;
            if (content.includes('כפל') || content.includes('בתחתית') || content.includes('div') || content.includes('double') || content.includes('tab')) {
                console.log(`[Step ${obj.step_index}] Source: ${obj.source}`);
                console.log(content);
                console.log('-'.repeat(50));
            }
        }
    } catch (e) {
        // Ignored
    }
});
