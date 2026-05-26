const fs = require('fs');

['3.html', '4.html'].forEach(file => {
    const html = fs.readFileSync(file, 'utf8');
    const regex = /<script.*?>([\s\S]*?)<\/script>/gi;
    let match;
    let count = 0;
    while ((match = regex.exec(html)) !== null) {
        const code = match[1];
        try {
            new Function(code);
        } catch (e) {
            console.error(`Error in ${file} script ${count}: ${e.message}`);
        }
        count++;
    }
});
