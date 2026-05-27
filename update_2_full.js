const fs = require('fs');

const file = 'c:\\Users\\72671\\Desktop\\שפות תכנות\\סיכום\\2.html';
let code = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

// 1. Comma in Multi-Arg Grammar syntax
const targetGrammar = '                                <div class="ml-4 bg-white p-2 border mt-1">("(" expression (arbno expression) ")") call-exp</div>';
const replacementGrammar = '                                <div class="ml-4 bg-white p-2 border mt-1">("(" expression (arbno "," expression) ")") call-exp</div>';

if (code.indexOf(targetGrammar) === -1) {
    console.error('Target grammar not found!');
    process.exit(1);
}
code = code.replace(targetGrammar, replacementGrammar);

// 2. Mutual Recursion code block
const targetRecText = `                    <p class="text-sm text-slate-700 mt-2 font-bold">כיצד <code>apply-env</code> עובד עם רשימות אלו?</p>
                    <p class="text-sm text-slate-700">החיפוש ייעשה בעזרת פונקציית עזר למציאת ה<strong>אינדקס</strong> של הפונקציה המבוקשת בתוך רשימת <code>p-names</code>. אם הפונקציה נמצאה באינדקס <code>i</code>, נשלוף את הפרמטר והגוף מאותו האינדקס (באמצעות <code>list-ref</code> על <code>b-vars</code> ו-<code>p-bodies</code>) ונרכיב מהם את הקלוז'ר בו במקום.</p>
                </div>`;

const replacementRecText = `                    <p class="text-sm text-slate-700 mt-2 font-bold">כיצד <code>apply-env</code> עובד עם רשימות אלו?</p>
                    <p class="text-sm text-slate-700">החיפוש ייעשה בעזרת פונקציית עזר למציאת ה<strong>אינדקס</strong> של הפונקציה המבוקשת בתוך רשימת <code>p-names</code>. אם הפונקציה נמצאה באינדקס <code>i</code>, נשלוף את הפרמטר והגוף מאותו האינדקס (באמצעות <code>list-ref</code> על <code>b-vars</code> ו-<code>p-bodies</code>) ונרכיב מהם את הקלוז'ר בו במקום.</p>
                    <pre class="text-xs mt-2"><code>(extend-env-rec* (p-names b-vars p-bodies saved-env)
  <span class="token-comment">; חיפוש האינדקס של הפונקציה המבוקשת ברשימת השמות</span>
  (let ((n (location search-var p-names)))
    (if n
        <span class="token-comment">; אם נמצא: שולפים מאותו אינדקס בדיוק את הפרמטר והגוף, וסוגרים מעגל (JIT)</span>
        (proc-val (procedure (list-ref b-vars n)
                             (list-ref p-bodies n)
                             env))
        <span class="token-comment">; אם לא נמצא: ממשיכים לחפש בסביבה השמורה</span>
        (apply-env saved-env search-var))))</code></pre>
                </div>`;

if (code.indexOf(targetRecText) === -1) {
    console.error('Target recursion text not found!');
    process.exit(1);
}
code = code.replace(targetRecText, replacementRecText);

// 3. AST Visual Tree container in Sim 1
const targetAstHTML = `                <!-- Feedback & Output -->
                <div class="flex flex-col justify-between p-4 bg-slate-900 text-white rounded-xl font-mono text-xs">
                    <div>
                        <span class="text-slate-400 font-bold block mb-2">Scheme AST Output:</span>
                        <div id="ast-output-code" class="text-slate-300 font-bold p-3 bg-black/40 rounded-lg min-h-[60px] flex items-center">
                            ממתין להרכבת השורש...
                        </div>
                    </div>`;

const replacementAstHTML = `                <!-- Feedback & Output -->
                <div class="flex flex-col justify-between p-4 bg-slate-900 text-white rounded-xl font-mono text-xs font-sans">
                    <div>
                        <span class="text-slate-400 font-bold block mb-2 font-sans">עץ ה-AST חזותי (Interactive AST Tree):</span>
                        <div id="ast-visual-tree" class="w-full bg-slate-950 rounded-lg p-2 mb-4 flex items-center justify-center min-h-[160px] border border-slate-800 text-slate-500 italic text-[11px] text-center">
                            התחילו לבחור צמתים כדי לצייר את העץ...
                        </div>
                        <span class="text-slate-400 font-bold block mb-2 font-sans">Scheme AST Output:</span>
                        <div id="ast-output-code" class="text-slate-300 font-bold p-3 bg-black/40 rounded-lg min-h-[50px] flex items-center font-mono">
                            ממתין להרכבת השורש...
                        </div>
                    </div>`;

if (code.indexOf(targetAstHTML) === -1) {
    console.error('Target AST HTML not found!');
    process.exit(1);
}
code = code.replace(targetAstHTML, replacementAstHTML);

// 4. Memory Visualizer container in Sim 3
const targetDebugHTML = `                <!-- Monitor Screen -->
                <div id="debug-monitor" class="rounded-xl p-5 font-mono text-xs flex flex-col justify-between min-h-[180px] bg-slate-950 text-emerald-400 border border-slate-800">
                    <div>
                        <span class="text-slate-500 font-bold block mb-2">Interpreter Output Console:</span>`;

const replacementDebugHTML = `                <!-- Monitor Screen -->
                <div id="debug-monitor" class="rounded-xl p-5 font-mono text-xs flex flex-col justify-between min-h-[180px] bg-slate-950 text-emerald-400 border border-slate-800">
                    <div>
                        <span class="text-slate-500 font-bold block mb-2 font-sans">מצב הזיכרון מתחת למכסה המנוע (Memory Inspector):</span>
                        <div id="debug-memory-visual" class="w-full bg-black/40 rounded-lg p-3 mb-4 flex items-center justify-center min-h-[100px] border border-slate-900 text-slate-500 italic text-[11px] text-center font-sans">
                            הריצו את התוכנית כדי לצפות במצב הזיכרון הגולמי...
                        </div>
                        <span class="text-slate-500 font-bold block mb-2 font-sans">Interpreter Output Console:</span>`;

if (code.indexOf(targetDebugHTML) === -1) {
    console.error('Target Debug HTML not found!');
    process.exit(1);
}
code = code.replace(targetDebugHTML, replacementDebugHTML);

// 5. Closure Factory container in Sim 5
const targetMrecHTML = `                </div>
                
                <div class="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900 text-white p-3 rounded-lg">
                    <div class="flex items-center gap-2">
                        <button id="btn-mrec-step" onclick="stepMrecSim()"`;

const replacementMrecHTML = `                </div>
                
                <!-- Closure Assembly Factory Area -->
                <div id="mrec-factory-area" class="w-full bg-slate-950 border border-slate-900 rounded-xl p-4 min-h-[100px] flex items-center justify-center text-xs font-mono text-slate-400">
                    <span class="text-slate-500 italic text-[11px] font-sans">מפעל הרכבת הקלוז'ר: ייווצר כאן לאחר מציאת האינדקס...</span>
                </div>
                
                <div class="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900 text-white p-3 rounded-lg">
                    <div class="flex items-center gap-2">
                        <button id="btn-mrec-step" onclick="stepMrecSim()"`;

if (code.indexOf(targetMrecHTML) === -1) {
    console.error('Target Mrec HTML not found!');
    process.exit(1);
}
code = code.replace(targetMrecHTML, replacementMrecHTML);

// 6. Flowchart container in Sim 6
const targetJitHTML = `                <!-- Feedback & Interactive Output Console -->
                <div class="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                        <span class="font-bold text-xs text-slate-700 block mb-2 border-b pb-1">פלט הדמיית ההרצה (Simulation Output):</span>`;

const replacementJitHTML = `                <!-- Feedback & Interactive Output Console -->
                <div class="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between font-sans">
                    <div>
                        <span class="font-bold text-xs text-slate-700 block mb-2 border-b pb-1">תרשים זרימה אינטראקטיבי (Scoping Radar):</span>
                        <div id="jit-flowchart" class="w-full bg-slate-950 rounded-lg p-2 mb-4 flex items-center justify-center min-h-[120px] border border-slate-800 text-[11px] text-slate-400">
                            <span class="text-slate-500 italic text-[11px] text-center">השלימו את תפריטי הבחירה משמאל לצפייה בתרשים הזרימה...</span>
                        </div>
                        <span class="font-bold text-xs text-slate-700 block mb-2 border-b pb-1">פלט הדמיית ההרצה (Simulation Output):</span>`;

if (code.indexOf(targetJitHTML) === -1) {
    console.error('Target JIT HTML not found!');
    process.exit(1);
}
code = code.replace(targetJitHTML, replacementJitHTML);

// 7. JS code updates (Simulators 1-7)
const jsStartMarker = '        // --- Simulator 1: AST Building Workshop JS Logic ---';
const jsEndMarker = '        // Sidebar toggle and Navigation Button Injection Logic';

const jsStartIndex = code.indexOf(jsStartMarker);
const jsEndIndex = code.indexOf(jsEndMarker);

if (jsStartIndex === -1 || jsEndIndex === -1) {
    console.error('JS markers not found!');
    process.exit(1);
}

const newJS = `        // --- Simulator 1: AST Building Workshop JS Logic ---
        function renderVisualAstTree(slot1, slot2, slot3, slot4, slot5, slot6) {
            const container = document.getElementById('ast-visual-tree');
            if (!container) return;

            if (!slot1) {
                container.innerHTML = \`<span class="text-slate-500 italic text-[11px] text-center">התחילו לבחור צמתים כדי לצייר את העץ...</span>\`;
                return;
            }

            let svgContent = \`<svg width="100%" height="160" viewBox="0 0 320 160" fill="none" class="max-w-xs mx-auto transition-all duration-500">\`;
            svgContent += \`
                <defs>
                    <marker id="arrow-ast" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                </defs>
            \`;

            // Draw root node
            svgContent += \`
                <g class="transition-all duration-300">
                    <rect x="110" y="10" width="100" height="24" rx="5" fill="\${slot1 === 'let-exp' ? '#1d4ed8' : '#ef4444'}" stroke="#3b82f6" stroke-width="1.5" />
                    <text x="160" y="25" fill="white" font-size="9" font-weight="bold" text-anchor="middle" font-family="monospace">\${slot1}</text>
                </g>
            \`;

            if (slot1 === 'let-exp') {
                svgContent += \`<line x1="160" y1="34" x2="60" y2="65" stroke="#94a3b8" stroke-width="1.5" />\`;
                svgContent += \`<line x1="160" y1="34" x2="160" y2="65" stroke="#94a3b8" stroke-width="1.5" />\`;
                svgContent += \`<line x1="160" y1="34" x2="260" y2="65" stroke="#94a3b8" stroke-width="1.5" />\`;

                // Child 1: var
                let varLabel = slot2 ? \`x\` : '?';
                svgContent += \`
                    <g>
                        <rect x="25" y="65" width="70" height="22" rx="4" fill="#3b82f6" fill-opacity="0.2" stroke="#60a5fa" stroke-dasharray="\${slot2 ? '' : '3 3'}" stroke-width="1" />
                        <text x="60" y="79" fill="#93c5fd" font-size="8" text-anchor="middle" font-family="monospace">var: \${varLabel}</text>
                    </g>
                \`;

                // Child 2: exp1
                let exp1Label = slot3 ? (slot3 === 'const-5' ? 'const(5)' : (slot3 === 'const-1' ? 'const(1)' : 'var(x)')) : 'exp1: ?';
                svgContent += \`
                    <g>
                        <rect x="115" y="65" width="90" height="22" rx="4" fill="\${slot3 === 'const-5' ? '#10b981' : (slot3 ? '#ef4444' : '#334155')}" stroke="\${slot3 === 'const-5' ? '#34d399' : '#475569'}" stroke-dasharray="\${slot3 ? '' : '3 3'}" stroke-width="1" />
                        <text x="160" y="79" fill="white" font-size="8" text-anchor="middle" font-family="monospace">\${exp1Label}</text>
                    </g>
                \`;

                // Child 3: body
                let bodyLabel = slot4 ? (slot4 === 'diff-exp' ? 'diff-exp' : slot4) : 'body: ?';
                svgContent += \`
                    <g>
                        <rect x="215" y="65" width="90" height="22" rx="4" fill="\${slot4 === 'diff-exp' ? '#8b5cf6' : (slot4 ? '#ef4444' : '#334155')}" stroke="\${slot4 === 'diff-exp' ? '#a78bfa' : '#475569'}" stroke-dasharray="\${slot4 ? '' : '3 3'}" stroke-width="1" />
                        <text x="260" y="79" fill="white" font-size="8" text-anchor="middle" font-family="monospace">\${bodyLabel}</text>
                    </g>
                \`;

                if (slot4 === 'diff-exp') {
                    svgContent += \`<line x1="260" y1="87" x2="220" y2="120" stroke="#94a3b8" stroke-width="1.5" />\`;
                    svgContent += \`<line x1="260" y1="87" x2="300" y2="120" stroke="#94a3b8" stroke-width="1.5" />\`;

                    // Left Operand
                    let leftLabel = slot5 ? (slot5 === 'var-x' ? 'var(x)' : (slot5 === 'const-5' ? 'const(5)' : 'const(1)')) : '?';
                    svgContent += \`
                        <g>
                            <rect x="185" y="120" width="70" height="22" rx="4" fill="\${slot5 === 'var-x' ? '#10b981' : (slot5 ? '#ef4444' : '#334155')}" stroke="\${slot5 === 'var-x' ? '#34d399' : '#475569'}" stroke-dasharray="\${slot5 ? '' : '3 3'}" stroke-width="1" />
                            <text x="220" y="134" fill="white" font-size="8" text-anchor="middle" font-family="monospace">\${leftLabel}</text>
                        </g>
                    \`;

                    // Right Operand
                    let rightLabel = slot6 ? (slot6 === 'const-1' ? 'const(1)' : (slot6 === 'var-x' ? 'var(x)' : 'const(5)')) : '?';
                    svgContent += \`
                        <g>
                            <rect x="265" y="120" width="70" height="22" rx="4" fill="\${slot6 === 'const-1' ? '#10b981' : (slot6 ? '#ef4444' : '#334155')}" stroke="\${slot6 === 'const-1' ? '#34d399' : '#475569'}" stroke-dasharray="\${slot6 ? '' : '3 3'}" stroke-width="1" />
                            <text x="300" y="134" fill="white" font-size="8" text-anchor="middle" font-family="monospace">\${rightLabel}</text>
                        </g>
                    \`;
                }
            }

            const isCorrect = (slot1 === 'let-exp' && slot2 === 'x' && slot3 === 'const-5' && slot4 === 'diff-exp' && slot5 === 'var-x' && slot6 === 'const-1');
            if (isCorrect) {
                svgContent += \`
                    <path d="M 160 34 L 160 60" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-ast)">
                        <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
                    </path>
                    <path d="M 260 87 L 225 115" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-ast)">
                        <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
                    </path>
                \`;
            }

            svgContent += \`</svg>\`;
            container.innerHTML = svgContent;
        }

        function checkAstPuzzle() {
            const slot1 = document.getElementById('ast-slot-1').value;
            const slot2 = document.getElementById('ast-slot-2').value;
            const slot3 = document.getElementById('ast-slot-3').value;
            const slot4 = document.getElementById('ast-slot-4').value;
            const slot5 = document.getElementById('ast-slot-5').value;
            const slot6 = document.getElementById('ast-slot-6').value;
            
            const letSub = document.getElementById('ast-let-sub');
            const diffSub = document.getElementById('ast-diff-sub');
            const output = document.getElementById('ast-output-code');
            const feedback = document.getElementById('ast-feedback');
            
            renderVisualAstTree(slot1, slot2, slot3, slot4, slot5, slot6);

            // Toggle visibility of let-exp subtree
            if (slot1 === 'let-exp') {
                letSub.classList.remove('hidden');
            } else {
                letSub.classList.add('hidden');
                diffSub.classList.add('hidden');
                output.textContent = slot1 ? \`(\${slot1} ...)\` : "ממתין להרכבת השורש...";
                feedback.innerHTML = "💡 צומת השורש let-exp נכון! כעת השלימו את הפרמטרים שלו.";
                feedback.className = "mt-4 p-3 rounded-lg bg-blue-50 text-blue-700 flex items-center gap-2";
                if (slot1 && slot1 !== 'let-exp') {
                    feedback.innerHTML = "❌ שגיאה תחבירית! הביטוי הכולל מתחיל ב-let ולכן השורש חייב להיות let-exp.";
                    feedback.className = "mt-4 p-3 rounded-lg bg-red-50 text-red-700 flex items-center gap-2";
                }
                return;
            }
            
            // Toggle visibility of diff-exp subtree
            if (slot4 === 'diff-exp') {
                diffSub.classList.remove('hidden');
            } else {
                diffSub.classList.add('hidden');
            }
            
            // Construct AST Representation
            let varText = slot2 ? \`'\${slot2}\` : "?";
            let exp1Text = "?";
            if (slot3 === 'const-5') exp1Text = "(const-exp 5)";
            else if (slot3 === 'const-1') exp1Text = "(const-exp 1)";
            else if (slot3 === 'var-exp') exp1Text = "(var-exp 'x)";
            
            let bodyText = "?";
            if (slot4 === 'let-exp') bodyText = "(let-exp ...)";
            else if (slot4 === 'const-exp') bodyText = "(const-exp ...)";
            else if (slot4 === 'var-exp') bodyText = "(var-exp ...)";
            else if (slot4 === 'diff-exp') {
                let d1 = slot5 === 'var-x' ? "(var-exp 'x)" : (slot5 === 'const-5' ? "(const-exp 5)" : (slot5 === 'const-1' ? "(const-exp 1)" : "?"));
                let d2 = slot6 === 'var-x' ? "(var-exp 'x)" : (slot6 === 'const-5' ? "(const-exp 5)" : (slot6 === 'const-1' ? "(const-exp 1)" : "?"));
                bodyText = \`(diff-exp \${d1} \${d2})\`;
            }
            
            output.textContent = \`(let-exp \${varText} \${exp1Text} \${bodyText})\`;
            
            // Check Correctness
            const isCorrect = (slot1 === 'let-exp' && slot2 === 'x' && slot3 === 'const-5' && slot4 === 'diff-exp' && slot5 === 'var-x' && slot6 === 'const-1');
            
            if (isCorrect) {
                feedback.innerHTML = "🎉 מעולה! בניתם את ה-AST בצורה נכונה לחלוטין! המפרש יוכל כעת להעריך את הביטוי בהצלחה.";
                feedback.className = "mt-4 p-3 rounded-lg bg-green-100 text-green-800 flex items-center gap-2 font-bold";
            } else {
                feedback.innerHTML = "💡 המשיכו להרכיב את הבלוקים של המשתנה, ערך ההשמה וגוף ה-let.";
                feedback.className = "mt-4 p-3 rounded-lg bg-slate-800 text-slate-300 flex items-center gap-2";
                
                // Specific errors
                if (slot2 && slot2 !== 'x') {
                    feedback.innerHTML = "⚠️ שם המשתנה המוגדר הוא x, ולא ערך מספרי.";
                    feedback.className = "mt-4 p-3 rounded-lg bg-amber-50 text-amber-700 flex items-center gap-2";
                } else if (slot3 && slot3 !== 'const-5') {
                    feedback.innerHTML = "⚠️ הביטוי let x = 5 משייך את המספר 5 ל-x, לכן exp1 צריך להיות const-exp (5).";
                    feedback.className = "mt-4 p-3 rounded-lg bg-amber-50 text-amber-700 flex items-center gap-2";
                } else if (slot4 && slot4 !== 'diff-exp') {
                    feedback.innerHTML = "⚠️ גוף ה-let הוא פעולת חיסור -(x, 1), לכן הצומת כאן חייב להיות diff-exp.";
                    feedback.className = "mt-4 p-3 rounded-lg bg-amber-50 text-amber-700 flex items-center gap-2";
                } else if (slot4 === 'diff-exp' && slot5 && slot5 !== 'var-x') {
                    feedback.innerHTML = "⚠️ באופרנד השמאלי של החיסור -(x, 1) אנו ניגשים למשתנה x, לכן עלינו להשתמש ב-var-exp (x).";
                    feedback.className = "mt-4 p-3 rounded-lg bg-amber-50 text-amber-700 flex items-center gap-2";
                } else if (slot4 === 'diff-exp' && slot6 && slot6 !== 'const-1') {
                    feedback.innerHTML = "⚠️ באופרנד הימני של החיסור -(x, 1) אנו מחסירים את הקבוע 1, לכן נשתמש ב-const-exp (1).";
                    feedback.className = "mt-4 p-3 rounded-lg bg-amber-50 text-amber-700 flex items-center gap-2";
                }
            }
        }
        
        // --- Simulator 2: Value-of logic puzzle JS Logic ---
        let valPuzzleLines = [
            { id: 1, text: "(let-exp (var exp1 body)", correctIdx: 0, indent: 0 },
            { id: 2, text: "  (let ((val1 (value-of exp1 env)))", correctIdx: 1, indent: 2 },
            { id: 3, text: "    (value-of body", correctIdx: 2, indent: 4 },
            { id: 4, text: "      (extend-env var val1 env))))", correctIdx: 3, indent: 6 }
        ];
        
        function initValPuzzle() {
            valPuzzleLines.sort(() => Math.random() - 0.5);
            renderValPuzzle();
        }
        
        function renderValPuzzle() {
            const list = document.getElementById('val-scrambled-list');
            if (!list) return;
            list.innerHTML = '';
            
            valPuzzleLines.forEach((line, idx) => {
                const item = document.createElement('div');
                item.className = "flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm font-mono text-xs text-right";
                
                item.innerHTML = \`
                    <div class="flex items-center gap-2">
                        <button onclick="moveValLine(\${idx}, -1)" class="p-1 rounded hover:bg-slate-200 text-slate-500 font-bold transition-colors cursor-pointer" title="הזז למעלה">▲</button>
                        <button onclick="moveValLine(\${idx}, 1)" class="p-1 rounded hover:bg-slate-200 text-slate-500 font-bold transition-colors cursor-pointer" title="הזז למטה">▼</button>
                    </div>
                    <div class="flex-1 text-left select-none text-slate-800 font-bold font-mono" style="padding-left: 20px; direction: ltr; white-space: pre;">\${line.text}</div>
                \`;
                list.appendChild(item);
            });
        }
        
        function moveValLine(idx, dir) {
            const newIdx = idx + dir;
            if (newIdx < 0 || newIdx >= valPuzzleLines.length) return;
            
            const temp = valPuzzleLines[idx];
            valPuzzleLines[idx] = valPuzzleLines[newIdx];
            valPuzzleLines[newIdx] = temp;
            
            renderValPuzzle();
        }
        
        function checkValPuzzle() {
            let correct = true;
            let idxLet = -1;
            let idxVal1 = -1;
            let idxBody = -1;
            let idxExtend = -1;

            valPuzzleLines.forEach((line, idx) => {
                if (line.correctIdx !== idx) {
                    correct = false;
                }
                if (line.correctIdx === 0) idxLet = idx;
                if (line.correctIdx === 1) idxVal1 = idx;
                if (line.correctIdx === 2) idxBody = idx;
                if (line.correctIdx === 3) idxExtend = idx;
            });
            
            const feedback = document.getElementById('val-puzzle-feedback');
            if (correct) {
                feedback.innerHTML = "🎉 <strong>נכון מאוד! סדר השערוך מדויק:</strong><br>ראשית מפרקים את ה-let-exp, מריצים את exp1, שומרים את התוצאה ב-val1, ורק אז יוצרים סביבה מורחבת ומריצים את הגוף.";
                feedback.className = "text-xs font-bold text-green-600 bg-green-50 p-2.5 rounded border border-green-200 leading-relaxed";
            } else {
                let errMsg = "❌ <strong>הסדר שגוי! זכרו את זרימת המפרש:</strong><br>";
                if (idxVal1 < idxLet) {
                    errMsg += "<span class='text-red-700 font-bold'>[Error] Cannot reference 'exp1' or 'env' before destructuring the let-exp AST node!</span>";
                } else if (idxExtend < idxVal1) {
                    errMsg += "<span class='text-red-700 font-bold'>[Crash] Variable 'val1' is uninitialized before use in extend-env!</span>";
                } else if (idxBody < idxExtend) {
                    errMsg += "<span class='text-red-700 font-bold'>[Crash] Variable 'x' not found in environment during body evaluation! (Missing extend-env scope)</span>";
                } else {
                    errMsg += "המבנה התחבירי של סוגריים וסדר השערוך (השמה, הרחבת סביבה, גוף) אינו תואם.";
                }
                feedback.innerHTML = errMsg;
                feedback.className = "text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded border border-red-200 leading-relaxed";
            }
        }
        
        // --- Simulator 3: Debugging Lab JS Logic ---
        function runDebugLab() {
            const ext1 = document.getElementById('debug-extractor-1').value;
            const ext2 = document.getElementById('debug-extractor-2').value;
            const consoleBox = document.getElementById('debug-console');
            const badge = document.getElementById('debug-status-badge');
            const monitor = document.getElementById('debug-monitor');
            const memVisual = document.getElementById('debug-memory-visual');
            
            consoleBox.innerHTML = "Evaluating program...\\n";
            badge.className = "mt-4 p-2 rounded text-center font-bold bg-amber-500 text-white animate-pulse";
            badge.textContent = "STATUS: RUNNING";
            
            setTimeout(() => {
                if (ext1 === 'raw' || ext2 === 'raw') {
                    monitor.className = "rounded-xl p-5 font-mono text-xs flex flex-col justify-between min-h-[180px] bg-red-950 text-red-200 border-2 border-red-500 shadow-lg shadow-red-900/20";
                    badge.className = "mt-4 p-2 rounded text-center font-bold bg-red-600 text-white";
                    badge.textContent = "STATUS: CRASHED (HOST ENGINE)";
                    consoleBox.innerHTML = \`[HOST ERROR] Scheme Racket Exception:
contract violation
expected: number?
given: (bool-val #t)
in math subtraction operation: -

💥 קריסה במפרש השרת!
מכיוון שלא חילצתם את הערכים מתוך ה-struct של expval, המפרש שלכם ניסה לחסר ישירות את המבנה struct (bool-val #t) מהמבנה struct (num-val 5) במקום לחסר מספרים ממשיים.\`;
                    
                    memVisual.innerHTML = \`
                        <div class="flex flex-col items-center w-full">
                            <div class="flex items-center gap-2 justify-center text-[10.5px] w-full" dir="ltr">
                                <div class="bg-blue-950 border border-blue-500 px-2 py-1 rounded text-blue-300">num-val(5)</div>
                                <span class="text-red-500 font-bold">─( - )─</span>
                                <div class="bg-red-950 border border-red-500 px-2 py-1 rounded text-red-300 animate-bounce">bool-val(#t) 💥</div>
                            </div>
                            <div class="text-[9.5px] text-red-400 mt-2 text-center">שגיאת טיפוס פיזית: ניסיון לבצע חיסור מתמטי על Struct שלם ולא על מספר טהור!</div>
                        </div>
                    \`;
                } else if (ext1 === 'bool' || ext2 === 'bool') {
                    monitor.className = "rounded-xl p-5 font-mono text-xs flex flex-col justify-between min-h-[180px] bg-red-950 text-red-200 border-2 border-red-500 shadow-lg shadow-red-900/20";
                    badge.className = "mt-4 p-2 rounded text-center font-bold bg-red-600 text-white";
                    badge.textContent = "STATUS: RUNTIME ERROR (MANAGED)";
                    consoleBox.innerHTML = \`[EOPL ERROR] expval->bool: Expected boolean, found (num-val 5)

⚠️ שגיאת ריצה מנוהלת!
הגדרתם חילוץ בוליאני עבור משתנה שהערך שלו הוא מספר (5). ה-extractor זרק שגיאת eopl:error מנוהלת ומנע את קריסת המנוע, אך התוכנית עדיין נכשלה כי החילוץ לא תואם.\`;

                    memVisual.innerHTML = \`
                        <div class="flex flex-col items-center gap-2 w-full">
                            <div class="flex items-center gap-3 justify-center text-[10.5px]" dir="ltr">
                                <div class="bg-blue-900 border border-blue-400 px-2 py-1 rounded text-blue-100">num-val(5)</div>
                                <span class="text-slate-400">➔ expval-&gt;bool ➔</span>
                                <div class="bg-red-950 border border-red-500 px-2 py-1 rounded text-red-300">💥 שגיאת התאמה!</div>
                            </div>
                            <div class="text-[9.5px] text-red-400 text-center mt-1">מחלץ הבוליאנים (expval-&gt;bool) מצפה למצוא תגית "bool-val" אך פגש ב-"num-val"!</div>
                        </div>
                    \`;
                } else {
                    monitor.className = "rounded-xl p-5 font-mono text-xs flex flex-col justify-between min-h-[180px] bg-slate-950 text-emerald-400 border border-slate-800";
                    badge.className = "mt-4 p-2 rounded text-center font-bold bg-green-600 text-white";
                    badge.textContent = "STATUS: SUCCESS / SAFE RUNTIME ERROR";
                    consoleBox.innerHTML = \`[EOPL ERROR] expval->num: Looking for a number, found bool-val(bool-val #t)

✅ המפרש ניצל מקריסה גולמית!
שני החילוצים הוגדרו נכון כ-expval->num. כאשר המפרש ניגש לחסר את x=5 ו-y=bool-val(#t), הוא זיהה ש-y הוא בוליאני וזרק שגיאה לקסיקלית נקייה המדווחת ללומד שהוזן טיפוס לא נכון!\`;

                    memVisual.innerHTML = \`
                        <div class="flex flex-col items-center gap-3 w-full">
                            <div class="flex items-center gap-3 justify-center text-[10.5px]" dir="ltr">
                                <div class="bg-blue-950 border border-blue-500 px-2 py-1 rounded text-blue-300">num-val(5) ➔ 5</div>
                                <span class="text-slate-400">─( - )─</span>
                                <div class="bg-emerald-950 border border-emerald-500 px-2 py-1 rounded text-emerald-300">bool-val(#t) ➔ 💥 שגיאת טיפוס!</div>
                            </div>
                            <div class="text-[9.5px] text-emerald-400 text-center">שני הערכים חולצו בבטחה. המפרש זיהה ש-y הוא בוליאני וזרק שגיאה מנוהלת ומסודרת ללקוח במקום לקרוס!</div>
                        </div>
                    \`;
                }
            }, 800);
        }
        
        // --- Simulator 4: Environment Router JS Logic ---
        function checkRouterPuzzle() {
            const slot = document.getElementById('router-select-slot').value;
            const animBox = document.getElementById('router-anim-box');
            const feedback = document.getElementById('router-feedback');
            
            if (slot === '') {
                animBox.innerHTML = "בחר מימוש בקוד משמאל כדי להפעיל את הנתב";
                feedback.textContent = "ממתין להשלמת הקוד...";
                feedback.className = "mt-4 p-2 rounded text-center text-xs font-bold bg-slate-100 text-slate-600";
                return;
            }
            
            if (slot === 'single') {
                animBox.innerHTML = \`
                    <div class="text-red-500 font-bold text-xs text-center">
                        ❌ שגיאת טיפוסים במפרש!<br>
                        הפונקציה extend-env מצפה למשתנה יחיד וערך יחיד.<br>
                        קלט הנתב: '("x" "y" "z") ו-'(num-val(10) num-val(20) num-val(30))
                    </div>
                \`;
                feedback.textContent = "שגיאה: extend-env אינו מיועד לרשימות של ארגומנטים.";
                feedback.className = "mt-4 p-2 rounded text-center text-xs font-bold bg-red-100 text-red-700";
            } else if (slot === 'eval-inside') {
                animBox.innerHTML = \`
                    <div class="text-red-500 font-bold text-xs text-center">
                        ❌ שגיאה: כפל ריצות (Double Evaluation)!<br>
                        הערכים המועברים ל-apply-procedure כבר חושבו קודם לכן ע"י הלקוח.<br>
                        אין לקרוא שוב ל-value-of בתוך מנוע ההרצה הפיזי של הפונקציה!
                    </div>
                \`;
                feedback.textContent = "שגיאה: vals הם כבר ExpVals מוערכים. אין צורך להעריך שוב.";
                feedback.className = "mt-4 p-2 rounded text-center text-xs font-bold bg-red-100 text-red-700";
            } else if (slot === 'correct') {
                animBox.innerHTML = \`
                    <svg width="100%" height="90" viewBox="0 0 280 90" fill="none" class="max-w-xs mx-auto">
                        <g>
                            <rect x="10" y="5" width="40" height="20" rx="4" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" />
                            <text x="30" y="18" fill="#3b82f6" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">x</text>
                            
                            <rect x="70" y="5" width="40" height="20" rx="4" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" />
                            <text x="90" y="18" fill="#3b82f6" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">y</text>
                            
                            <rect x="130" y="5" width="40" height="20" rx="4" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" />
                            <text x="150" y="18" fill="#3b82f6" font-size="10" font-weight="bold" text-anchor="middle" font-family="monospace">z</text>
                        </g>

                        <path d="M 30 25 L 30 55" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-router)" class="animate-pulse" />
                        <path d="M 90 25 L 90 55" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-router)" class="animate-pulse" />
                        <path d="M 150 25 L 150 55" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-router)" class="animate-pulse" />

                        <g>
                            <rect x="10" y="55" width="40" height="20" rx="4" fill="#10b981" fill-opacity="0.2" stroke="#10b981" />
                            <text x="30" y="68" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle" font-family="monospace">10</text>
                            
                            <rect x="70" y="55" width="40" height="20" rx="4" fill="#10b981" fill-opacity="0.2" stroke="#10b981" />
                            <text x="90" y="68" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle" font-family="monospace">20</text>
                            
                            <rect x="130" y="55" width="40" height="20" rx="4" fill="#10b981" fill-opacity="0.2" stroke="#10b981" />
                            <text x="150" y="68" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle" font-family="monospace">30</text>
                        </g>

                        <g>
                            <rect x="190" y="20" width="80" height="45" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1.5" />
                            <text x="230" y="38" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="sans-serif">saved-env</text>
                            <text x="230" y="52" fill="#64748b" font-size="8" text-anchor="middle" font-family="monospace">(E0)</text>
                        </g>

                        <path d="M 175 42 L 190 42" stroke="#38bdf8" stroke-width="1.5" marker-end="url(#arrow-router)" />
                        
                        <defs>
                            <marker id="arrow-router" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                            </marker>
                        </defs>
                    </svg>
                \`;
                feedback.innerHTML = "🎉 מושלם! extend-env* הוא המימוש המדויק לקשירת רשימות משתנים וערכים בסביבה חדשה ללא הערכה חוזרת (פעולת זיפ פשוטה).";
                feedback.className = "mt-4 p-2 rounded text-center text-xs font-bold bg-green-100 text-green-800";
            }
        }
        
        // --- Simulator 5: Mutual Recursion Parallel Lists Scanner JS Logic ---
        let mrecStep = 0;
        
        function resetMrecSim() {
            mrecStep = 0;
            const feedback = document.getElementById('mrec-feedback');
            feedback.innerHTML = "לחצו \\"בצע צעד\\" כדי להתחיל את החיפוש הדינמי.";
            
            const factory = document.getElementById('mrec-factory-area');
            if (factory) {
                factory.innerHTML = \`<span class="text-slate-500 italic text-[11px] font-sans">מפעל הרכבת הקלוז'ר: ייווצר כאן לאחר מציאת האינדקס...</span>\`;
            }

            for (let i = 0; i <= 1; i++) {
                document.getElementById(\`mrec-name-\${i}\`).className = "p-2 border rounded font-mono text-xs text-center transition-colors border-slate-200 bg-white text-slate-800";
                document.getElementById(\`mrec-var-\${i}\`).className = "p-2 border rounded font-mono text-xs text-center transition-colors border-slate-200 bg-white text-slate-800";
                document.getElementById(\`mrec-body-\${i}\`).className = "p-2 border rounded font-mono text-[10px] text-center transition-colors border-slate-200 bg-white text-slate-800 truncate";
            }
            
            const btn = document.getElementById('btn-mrec-step');
            if (btn) {
                btn.disabled = false;
                btn.textContent = "בצע צעד (Step)";
                btn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }
        
        function stepMrecSim() {
            mrecStep++;
            const feedback = document.getElementById('mrec-feedback');
            
            if (mrecStep === 1) {
                feedback.innerHTML = "🔍 <strong>שלב 1: חיפוש location ברשימת השמות p-names</strong><br>המפרש מריץ פונקציית location כדי לאתר את האינדקס של odd?.<br>בודק אינדקס 0: 'even? -> לא תואם.";
                document.getElementById('mrec-name-0').className = "p-2 border rounded font-mono text-xs text-center transition-colors border-red-300 bg-red-50 text-red-700 font-bold";
            } else if (mrecStep === 2) {
                feedback.innerHTML = "🔍 <strong>שלב 2: מציאת האינדקס ברשימת p-names</strong><br>בודק אינדקס 1: 'odd? -> <strong>תואם!</strong> האינדקס שנמצא הוא 1.";
                document.getElementById('mrec-name-0').className = "p-2 border rounded font-mono text-xs text-center transition-colors border-slate-200 bg-white text-slate-400";
                document.getElementById('mrec-name-1').className = "p-2 border rounded font-mono text-xs text-center transition-colors border-green-500 bg-green-50 text-green-800 font-bold animate-bounce";
            } else if (mrecStep === 3) {
                feedback.innerHTML = "📦 <strong>שלב 3: שליפת פרמטר וגוף מאינדקס 1</strong><br>שולף את b-var באינדקס 1 (הוא 'x) ואת p-body באינדקס 1 (גוף odd?).";
                document.getElementById('mrec-var-1').className = "p-2 border rounded font-mono text-xs text-center transition-colors border-blue-500 bg-blue-50 text-blue-800 font-bold";
                document.getElementById('mrec-body-1').className = "p-2 border rounded font-mono text-[10px] text-center transition-colors border-blue-500 bg-blue-50 text-blue-800 font-bold";
            } else if (mrecStep === 4) {
                feedback.innerHTML = "🎨 <strong>שלב 4: הרכבת הקלוז'ר</strong><br>המפרש מרכיב procedure סגורה: <code class='bg-slate-800 px-1 py-0.5 rounded text-[11px] font-mono text-yellow-400'>(procedure 'x body env)</code> עם הפניה לרשימות המקוריות המאפשרת רקורסיה הדדית!";
                
                const factory = document.getElementById('mrec-factory-area');
                if (factory) {
                    factory.innerHTML = \`
                        <div class="flex flex-col items-center gap-3 w-full">
                            <div class="text-emerald-400 font-bold text-[10px] uppercase tracking-wider">📦 מפעל הרכבת הקלוז'ר (Closure Assembled!)</div>
                            <div class="flex items-center gap-4 justify-center w-full">
                                <div class="border-2 border-emerald-500 bg-emerald-950/80 p-3 rounded-xl shadow-md text-emerald-300 w-64 relative" dir="ltr">
                                    <div class="font-bold text-center border-b border-emerald-800 pb-1 mb-2 text-xs">proc-val (Procedure Struct)</div>
                                    <div class="space-y-1 text-[10.5px]">
                                        <div><span class="text-emerald-500 font-bold">b-var:</span> 'x</div>
                                        <div class="truncate"><span class="text-emerald-500 font-bold">body:</span> (if (zero? x) false (even? (- x 1)))</div>
                                        <div class="text-[9px] text-yellow-400 font-bold mt-1">
                                            saved-env ──┐ (Circular pointer)
                                            ▲           │
                                            └───────────┘ (References env E1)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    \`;
                }

                const btn = document.getElementById('btn-mrec-step');
                if (btn) {
                    btn.disabled = true;
                    btn.textContent = "הסתיים";
                    btn.classList.add('opacity-50', 'cursor-not-allowed');
                }
            }
        }
        
        // --- Simulator 6: The JIT Puzzle JS Logic ---
        function drawJitFlowchart(slot1, slot2) {
            const chart = document.getElementById('jit-flowchart');
            if (!chart) return;

            if (!slot1 || !slot2) {
                chart.innerHTML = \`<span class="text-slate-500 italic text-[11px] text-center">השלימו את תפריטי הבחירה משמאל לצפייה בתרשים הזרימה...</span>\`;
                return;
            }

            let svg = \`<svg width="100%" height="110" viewBox="0 0 280 110" fill="none" class="max-w-xs mx-auto">\`;
            svg += \`
                <defs>
                    <marker id="arrow-jit" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
                    </marker>
                </defs>
            \`;

            if (slot1 === 'env' && slot2 === 'env') {
                svg += \`
                    <circle cx="140" cy="50" r="32" stroke="#ef4444" stroke-width="2" stroke-dasharray="4" />
                    <text x="140" y="53" fill="#ef4444" font-size="9" font-weight="bold" text-anchor="middle">Stack Overflow!</text>
                    <text x="140" y="98" fill="#f87171" font-size="8" text-anchor="middle">לולאת חיפוש אינסופית באותו Env</text>
\`;
            } else if (slot1 === 'saved-env' && slot2 === 'saved-env') {
                svg += \`
                    <rect x="15" y="25" width="80" height="35" rx="5" fill="#f87171" fill-opacity="0.1" stroke="#ef4444" />
                    <text x="55" y="46" fill="#f87171" font-size="8" text-anchor="middle" font-weight="bold">closure (saved-env)</text>
                    
                    <path d="M 95 42 L 165 42" stroke="#f87171" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-jit)" />
                    <text x="130" y="34" fill="#f87171" font-size="7" text-anchor="middle">חיפוש חיצוני</text>
                    
                    <circle cx="205" cy="42" r="14" stroke="#f87171" stroke-width="1.5" stroke-dasharray="2 2" />
                    <text x="205" y="45" fill="#ef4444" font-size="8" font-weight="bold" text-anchor="middle">?</text>
                    <text x="140" y="95" fill="#f87171" font-size="8" text-anchor="middle">הפונקציה מנותקת מה-letrec! (Unbound Variable)</text>
\`;
            } else if (slot1 === 'env' && slot2 === 'saved-env') {
                svg += \`
                    <rect x="10" y="25" width="90" height="40" rx="6" fill="#065f46" stroke="#059669" stroke-width="1.5" />
                    <text x="55" y="44" fill="#a7f3d0" font-size="8" font-weight="bold" text-anchor="middle">extend-env-rec (E1)</text>
                    <text x="55" y="56" fill="#34d399" font-size="8" text-anchor="middle">even?, odd?</text>
                    
                    <path d="M 45 25 C 35 -5, 75 -5, 65 25" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arrow-jit)" />
                    <text x="55" y="8" fill="#fbbf24" font-size="7" font-weight="bold" text-anchor="middle">מעגל רקורסיבי</text>
                    
                    <path d="M 100 45 L 160 45" stroke="#34d399" stroke-width="1.5" marker-end="url(#arrow-jit)" />
                    <text x="130" y="38" fill="#34d399" font-size="7" text-anchor="middle">חיפוש חיצוני</text>
                    
                    <rect x="170" y="25" width="90" height="40" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1.5" />
                    <text x="215" y="48" fill="#94a3b8" font-size="8" text-anchor="middle">saved-env (E0)</text>
                    
                    <text x="140" y="98" fill="#34d399" font-size="8" font-weight="bold" text-anchor="middle">✓ רקורסיביות הדדית עובדת ומניעת לולאות!</text>
\`;
            } else {
                svg += \`
                    <text x="140" y="55" fill="#fbbf24" font-size="9" text-anchor="middle">שילוב זה אינו תקין. נסו שוב.</text>
\`;
            }

            svg += \`</svg>\`;
            chart.innerHTML = svg;
        }

        function runJitPuzzle() {
            const slot1 = document.getElementById('jit-select-slot-1').value;
            const slot2 = document.getElementById('jit-select-slot-2').value;
            const consoleBox = document.getElementById('jit-console');
            const feedback = document.getElementById('jit-feedback-text');
            
            drawJitFlowchart(slot1, slot2);

            if (slot1 === '' || slot2 === '') {
                consoleBox.textContent = "Select options to test the recursive lookup environment rules.";
                feedback.innerHTML = "בחר בשתי התיבות כדי להפעיל את הבדיקה.";
                feedback.className = "mt-4 p-2.5 rounded text-center text-xs font-bold bg-slate-100 text-slate-600";
                return;
            }
            
            if (slot1 === 'saved-env' && slot2 === 'saved-env') {
                consoleBox.innerHTML = \`(apply-env env 'f) -> f found!
Creating closure procedure with saved-env (E0).
Inside f: Calling (f) recursively.
(apply-env E0 'f) -> ❌ Variable 'f not found!
Program Crashed.\`;
                feedback.innerHTML = "❌ שגיאה! שימוש ב-saved-env בקלוז'ר מונע ממנו להכיר את עצמו, וכאשר יבצע קריאה רקורסיבית המפרש יחפש מחוץ ל-letrec ויכשל.";
                feedback.className = "mt-4 p-2.5 rounded text-center text-xs font-bold bg-red-100 text-red-700";
            } else if (slot1 === 'env' && slot2 === 'env') {
                consoleBox.innerHTML = \`(apply-env env 'g) -> not found!
Continuing search on 'env.
(apply-env env 'g) -> not found!
Continuing search on 'env.
...
❌ Stack Overflow! Infinite Loop Detected!\`;
                feedback.innerHTML = "❌ שגיאה! אם לא מצאנו את המשתנה ונמשיך לחפש ב-env (הסביבה הרקורסיבית הנוכחית) במקום ב-saved-env (הסביבה שקדמה לה), המפרש יכנס ללולאה אינסופית בחיפוש משתנים חיצוניים.";
                feedback.className = "mt-4 p-2.5 rounded text-center text-xs font-bold bg-red-100 text-red-700";
            } else if (slot1 === 'env' && slot2 === 'saved-env') {
                consoleBox.innerHTML = \`(apply-env env 'even?) -> found!
Creating closure with circular environment 'env'.
Evaluating body: (odd? (- x 1))
(apply-env env 'odd?) -> found!
Creating closure with circular environment 'env'.
Evaluating body: (even? (- x 1))
Calculation complete. Result: (bool-val #t)\`;
                feedback.innerHTML = "🎉 מדהים! זוהי בדיוק מהות ה-JIT. סוגרים את המעגל הרקורסיבי ע\"י הזרקת env לקלוז'ר, וממשיכים בחיפוש למעלה ע\"י קריאה ל-saved-env.";
                feedback.className = "mt-4 p-2.5 rounded text-center text-xs font-bold bg-green-100 text-green-800";
            } else {
                consoleBox.innerHTML = \`(apply-env env 'f) -> found!
Using circular env for closure.
Recursive calls work.
But if search-var is not found:
(apply-env saved-env search-var)
No loops. But wait, search-var not found in recursion...\`;
                feedback.innerHTML = "⚠️ שילוב זה אינו תקין. נסו שוב.";
                feedback.className = "mt-4 p-2.5 rounded text-center text-xs font-bold bg-amber-50 text-amber-700";
            }
        }
        
        // --- Simulator 7: Named vs Nameless Execution Race JS Logic ---
        let raceInterval = null;
        
        function runRace() {
            const btn = document.getElementById('btn-race-run');
            const namedConsole = document.getElementById('race-named-console');
            const namelessConsole = document.getElementById('race-nameless-console');
            const namedSteps = document.getElementById('race-named-steps');
            const namelessSteps = document.getElementById('race-nameless-steps');
            const banner = document.getElementById('race-winner-banner');
            
            if (raceInterval) clearInterval(raceInterval);
            
            btn.disabled = true;
            btn.textContent = "במרוץ...";
            btn.classList.add('opacity-50', 'cursor-not-allowed');
            
            namedConsole.innerHTML = "Starting Named Lookup for x1...\\n";
            namelessConsole.innerHTML = "Starting Nameless Translation (Static Analysis)...\\n";
            namedSteps.textContent = "שלבים: 0";
            namelessSteps.textContent = "שלבים: 0";
            banner.innerHTML = "האנליזה הסטטית וההרצה החלו...";
            banner.className = "text-xs font-bold text-amber-500 animate-pulse";
            
            setTimeout(() => {
                namelessConsole.innerHTML += "➔ translating: x1 ➔ %lexref(0, 9) [DONE]\\n";
                namelessConsole.innerHTML += "➔ Phase B: Executing Nameless code...\\n";
                namelessConsole.innerHTML += "➔ Accessing nameless-env at index 9 immediately...\\n";
                namelessConsole.innerHTML += "➔ Found value 1 in O(1) time!\\n";
                namelessConsole.innerHTML += "🎉 COMPLETED Nameless Runtime!\\n";
                namelessSteps.textContent = "שלבים: 2 (1 compilation, 1 execution)";
            }, 700);
            
            let step = 0;
            const scopes = [
                "x10=10", "x9=9", "x8=8", "x7=7", "x6=6",
                "x5=5", "x4=4", "x3=3", "x2=2", "x1=1"
            ];
            
            raceInterval = setInterval(() => {
                if (step < scopes.length) {
                    const currentScope = scopes[step];
                    const varToCheck = currentScope.split('=')[0];
                    namedConsole.innerHTML += \`Scanning scope: \${currentScope}. Is x1 == \${varToCheck}? No.\\n\`;
                    step++;
                    namedSteps.textContent = \`שלבים: \${step}\`;
                } else {
                    clearInterval(raceInterval);
                    namedConsole.innerHTML += "➔ Found value of x1: 1!\\n";
                    namedConsole.innerHTML += "🏁 Finished lookup.\\n";
                    
                    banner.innerHTML = \`
                        <div class="flex flex-col gap-2 p-2 bg-slate-900 border border-slate-800 rounded-lg w-full text-slate-300 font-sans">
                            <div class="text-xs font-bold text-center text-green-400 mb-1">🏁 תוצאות המרוץ: מד העלות הכוללת (Compilation vs Runtime)</div>
                            
                            <div class="space-y-2 text-[10.5px]">
                                <div class="flex flex-col gap-0.5">
                                    <div class="flex justify-between font-mono">
                                        <span>Named (סריקת שמות):</span>
                                        <span class="font-bold text-red-400">2000ms (0ms compile + 2000ms run)</span>
                                    </div>
                                    <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                        <div class="bg-red-500 h-full rounded-full" style="width: 100%"></div>
                                    </div>
                                </div>
                                
                                <div class="flex flex-col gap-0.5">
                                    <div class="flex justify-between font-mono">
                                        <span>Nameless (כתובות לקסיקליות):</span>
                                        <span class="font-bold text-green-400">710ms (700ms compile + 10ms run)</span>
                                    </div>
                                    <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                        <div class="bg-green-500 h-full rounded-full" style="width: 35.5%"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-[9px] text-slate-400 text-center mt-1 leading-relaxed">
                                💡 <b>הלקח ההנדסי:</b> מפרש Nameless משלם "מחיר מקדים" (Overhead) של אנליזה סטטית ותרגום, אך מרוויח גישה מיידית ב-$O(1)$ בזמן הריצה – מה שחוסך זמן עצום בריצות חוזרות או לולאות!
                            </div>
                        </div>
                    \`;
                    banner.className = "text-xs font-bold text-slate-100 w-full mt-2";
                    
                    btn.disabled = false;
                    btn.textContent = "הרץ מרוץ מחדש";
                    btn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            }, 200);
        }
`;

code = code.substring(0, jsStartIndex) + newJS + code.substring(jsEndIndex);

// 8. DomContentLoaded initialization calls
const targetLoad = `        document.addEventListener("DOMContentLoaded", () => {
            // Initialize Scope Simulator and Architecture Details
            resetScopeSim();
            showArchDetails('input');`;

const replacementLoad = `        document.addEventListener("DOMContentLoaded", () => {
            // Initialize Scope Simulator and Architecture Details
            resetScopeSim();
            showArchDetails('input');
            initValPuzzle();
            checkAstPuzzle();
            drawJitFlowchart('', '');`;

if (code.indexOf(targetLoad) === -1) {
    console.error('Target DOMContentLoaded load not found!');
    process.exit(1);
}
code = code.replace(targetLoad, replacementLoad);

fs.writeFileSync(file, code, 'utf8');
console.log('Successfully completed all upgrades on 2.html!');
