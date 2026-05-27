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
        if (obj.source === 'MODEL' && obj.content) {
            const content = obj.content.toLowerCase();
            if (content.includes('div') || content.includes('mismatch') || content.includes('duplicate') || content.includes('balance') || content.includes('כפל') || content.includes('כפיל') || content.includes('בתחתית')) {
                console.log(`[Step ${obj.step_index}] MODEL content mentions div/balance/duplicate:`);
                // Print first 300 chars of content
                console.log(obj.content.substring(0, 500) + '...');
                console.log('='.repeat(80));
            }
        }
    } catch (e) {
        // Ignored
    }
});
