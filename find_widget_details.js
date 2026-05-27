const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\4.html', 'utf8');

function findSnippet(title, markerStart, countChars) {
    console.log(`\n\n==================== ${title} ====================`);
    let idx = html.indexOf(markerStart);
    if (idx !== -1) {
        console.log(html.substring(idx, idx + countChars));
    } else {
        console.log('Not found');
    }
}

// Let's find specific widget skeletons
findSnippet("Widget 1: Architecture Folders", "<!-- Widget 1: Drag & Drop Architecture Builder -->", 2500);
findSnippet("Widget 2: Type Puzzle Details", "<!-- Widget 2: Type Annotation Puzzle -->", 3000);
findSnippet("Widget 3: State-Threading Details", "<!-- Widget 3: The State-Threading Visualizer -->", 2500);
findSnippet("Widget 5: AST Details", "<!-- Widget 5: Interactive AST Equation Extractor -->", 3000);
findSnippet("Widget 6: Lock-in Details", "<!-- Widget 6: Polymorphism Lock-in Simulator -->", 2500);
findSnippet("Widget 7: Exploder Details", "<!-- Widget 7: The Occurs-Check Memory Exploder -->", 3500);
