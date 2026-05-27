
const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8');

let idx = html.indexOf('id="puzzle-feedback"');
if (idx === -1) {
    idx = html.indexOf('puzzle-feedback');
}
if (idx !== -1) {
    console.log(html.substring(idx - 100, idx + 1000));
} else {
    console.log("puzzle-feedback not found");
}
