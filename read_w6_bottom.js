const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8');

let idx = html.indexOf('<!-- Sidebar with items and lock status -->');
if (idx !== -1) {
    console.log(html.substring(idx, idx + 1800));
} else {
    console.log("Widget 6 bottom not found");
}
