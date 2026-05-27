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
        if (obj.step_index >= 830 && obj.step_index <= 880 && obj.source === 'MODEL') {
            console.log(`[Step ${obj.step_index}] Type: ${obj.type}`);
            if (obj.content) {
                console.log("Content:");
                console.log(obj.content.substring(0, 500));
            }
            if (obj.tool_calls) {
                console.log("Tool Calls:");
                console.log(JSON.stringify(obj.tool_calls, null, 2));
            }
            console.log('='.repeat(80));
        }
    } catch (e) {
        // Ignored
    }
});
