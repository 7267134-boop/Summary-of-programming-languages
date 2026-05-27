const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8');

function findAndPrint(title, markerStart, chars) {
    let idx = html.indexOf(markerStart);
    if (idx !== -1) {
        console.log(`\n\n==================== ${title} ====================`);
        console.log(html.substring(idx, idx + chars));
    } else {
        console.log(`\n\n==================== NOT FOUND: ${title} ====================`);
    }
}

findAndPrint("Widget 3: State-Threading Visualizer", "<!-- Widget 3: The State-Threading Visualizer -->", 3000);
findAndPrint("Widget 5: Interactive AST Equation Extractor", "<!-- Widget 5: Interactive AST Equation Extractor -->", 3500);
findAndPrint("Widget 6: Polymorphism Lock-in Simulator", "<!-- Widget 6: Polymorphism Lock-in Simulator -->", 3000);
