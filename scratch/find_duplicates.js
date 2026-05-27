const fs = require('fs');
const filePath = 'c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\3.html';
const html = fs.readFileSync(filePath, 'utf8');
const lines = html.split('\n');

function findOccurrences(query) {
    let matches = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(query)) {
            matches.push(i + 1);
        }
    }
    return matches;
}

console.log('--- Comment Header Occurrences ---');
console.log('AST Evaluation (Widget 2):', findOccurrences('Added for bottom-up AST Evaluation'));
console.log('Crash Test (Widget 4):', findOccurrences('Added for Crash Test'));
console.log('AST Branching Router (Widget 5):', findOccurrences('Added for AST Branching Router'));
console.log('Closure Inspector (Widget 6):', findOccurrences('Added for Closure Inspector'));
console.log('GC Earthquake (Widget 8):', findOccurrences('Added for GC Earthquake'));
console.log('Double Aliasing (Widget 10):', findOccurrences('Added for Double Aliasing'));
console.log('Closure Vacuum (Widget 11):', findOccurrences('Added for Closure Vacuum'));
