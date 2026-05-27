
        
/* ==============================================
   VOLUME 1 SCOPED SIMULATORS
   ============================================== */
{
function showTab_old(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav'));

            document.getElementById(tabId).classList.add('active');
            document.getElementById('btn-' + tabId).classList.add('active-nav');

            document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
        }

        // --- Interactive Diagrams JS Logic ---
        function setAstDemo(type) {
            const simpleBtn = document.getElementById('btn-ast-simple');
            const nestedBtn = document.getElementById('btn-ast-nested');
            const codeDisplay = document.getElementById('ast-code-display');
            const tokensDisplay = document.getElementById('ast-tokens-display');
            const treeContainer = document.getElementById('ast-tree-container');

            if (!simpleBtn || !nestedBtn || !codeDisplay || !tokensDisplay || !treeContainer) return;

            if (type === 'simple') {
                simpleBtn.className = "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer";
                nestedBtn.className = "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
                codeDisplay.innerText = "-(55, 11)";
                tokensDisplay.innerHTML = `
                    <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Terminal">-</span>
                    <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Terminal">(</span>
                    <span class="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Number">55</span>
                    <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Terminal">,</span>
                    <span class="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Number">11</span>
                    <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Terminal">)</span>
                `;
                treeContainer.innerHTML = `
                    <div class="flex flex-col items-center">
                        <div class="bg-blue-600 text-white font-mono text-xs px-3 py-1.5 rounded-lg font-bold shadow-sm z-10">diff-exp</div>
                        <div class="w-20 h-6 border-r-2 border-l-2 border-t-2 border-slate-300 mt-0.5"></div>
                        <div class="flex gap-8 -mt-0.5">
                            <div class="bg-emerald-500 text-white font-mono text-xs px-3 py-1.5 rounded-lg shadow-sm animate-pulse">const-exp (55)</div>
                            <div class="bg-emerald-500 text-white font-mono text-xs px-3 py-1.5 rounded-lg shadow-sm animate-pulse">const-exp (11)</div>
                        </div>
                    </div>
                `;
            } else {
                simpleBtn.className = "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
                nestedBtn.className = "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer";
                codeDisplay.innerText = "-(55, -(22, 11))";
                tokensDisplay.innerHTML = `
                    <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Terminal">-</span>
                    <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Terminal">(</span>
                    <span class="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Number">55</span>
                    <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Terminal">,</span>
                    <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Terminal">-</span>
                    <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Terminal">(</span>
                    <span class="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Number">22</span>
                    <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Terminal">,</span>
                    <span class="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Number">11</span>
                    <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Terminal">)</span>
                    <span class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-mono font-bold" title="Terminal">)</span>
                `;
                treeContainer.innerHTML = `
                    <div class="flex flex-col items-center">
                        <div class="bg-blue-600 text-white font-mono text-xs px-3 py-1.5 rounded-lg font-bold shadow-sm z-10">diff-exp</div>
                        <div class="w-36 h-6 border-r-2 border-l-2 border-t-2 border-slate-300 mt-0.5"></div>
                        <div class="flex gap-6 -mt-0.5">
                            <div class="bg-emerald-500 text-white font-mono text-xs px-3 py-1.5 rounded-lg shadow-sm h-fit">const-exp (55)</div>
                            <div class="flex flex-col items-center">
                                <div class="bg-blue-600 text-white font-mono text-xs px-3 py-1.5 rounded-lg font-bold shadow-sm z-10">diff-exp</div>
                                <div class="w-20 h-6 border-r-2 border-l-2 border-t-2 border-slate-300 mt-0.5"></div>
                                <div class="flex gap-4 -mt-0.5">
                                    <div class="bg-emerald-500 text-white font-mono text-xs px-3 py-1.5 rounded-lg shadow-sm animate-pulse">const-exp (22)</div>
                                    <div class="bg-emerald-500 text-white font-mono text-xs px-3 py-1.5 rounded-lg shadow-sm animate-pulse">const-exp (11)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        let envLookupTimeout = null;
        function lookupEnv(variable) {
            if (envLookupTimeout) {
                clearTimeout(envLookupTimeout);
                envLookupTimeout = null;
            }

            const frames = {
                'x3': document.getElementById('env-frame-x3'),
                'y2': document.getElementById('env-frame-y2'),
                'x1': document.getElementById('env-frame-x1'),
                'empty': document.getElementById('env-frame-empty')
            };
            const output = document.getElementById('env-lookup-output');
            if (!output) return;

            // Reset colors
            for (let k in frames) {
                if (!frames[k]) continue;
                frames[k].className = frames[k].className.replace(/border-red-500|border-emerald-500|border-blue-500/g, 'border-slate-200');
                if (k === 'empty') {
                    frames[k].className = frames[k].className.replace(/border-red-500/g, 'border-slate-700');
                }
            }

            if (variable === 'x') {
                // Find x in layer 3
                frames['x3'].className = frames['x3'].className.replace('border-slate-200', 'border-emerald-500');
                output.innerHTML = `<strong>שלב 1:</strong> <code>apply-env</code> בודק את השכבה הפנימית ביותר.<br>נמצאה התאמה מיידית: <code>x = 3</code>! החיפוש מסתיים בהצלחה והערך המוחזר הוא <strong>3</strong>.<br><span class="text-emerald-600 font-bold">הסבר:</span> הערך <code>x = 1</code> בשכבה החיצונית מוסתר (Shadowed).`;
            } else if (variable === 'y') {
                // Step 1: Look at layer 3
                frames['x3'].className = frames['x3'].className.replace('border-slate-200', 'border-blue-500');
                output.innerHTML = `<strong>שלב 1:</strong> בודקים בשכבה 3. המשתנה בשכבה הוא <code>x</code> אך מחפשים <code>y</code>. אין התאמה.<br>עוברים לשכבה הבאה דרך <code>saved-env</code>...`;

                // Step 2: Look at layer 2
                envLookupTimeout = setTimeout(() => {
                    frames['y2'].className = frames['y2'].className.replace('border-slate-200', 'border-emerald-500');
                    output.innerHTML = `<strong>שלב 2:</strong> בודקים בשכבה 2. המשתנה הוא <code>y</code>. נמצאה התאמה!<br>החיפוש מסתיים בהצלחה והערך המוחזר הוא <strong>2</strong>.`;
                }, 1000);
            } else if (variable === 'z') {
                // Step 1: Look at layer 3
                frames['x3'].className = frames['x3'].className.replace('border-slate-200', 'border-blue-500');
                output.innerHTML = `<strong>שלב 1:</strong> בודקים בשכבה 3 (<code>x</code>). אין התאמה. עוברים לשכבה 2...`;

                // Step 2: Look at layer 2
                envLookupTimeout = setTimeout(() => {
                    frames['x3'].className = frames['x3'].className.replace('border-blue-500', 'border-slate-200');
                    frames['y2'].className = frames['y2'].className.replace('border-slate-200', 'border-blue-500');
                    output.innerHTML = `<strong>שלב 2:</strong> בודקים בשכבה 2 (<code>y</code>). אין התאמה. עוברים לשכבה 1...`;

                    // Step 3: Look at layer 1
                    envLookupTimeout = setTimeout(() => {
                        frames['y2'].className = frames['y2'].className.replace('border-blue-500', 'border-slate-200');
                        frames['x1'].className = frames['x1'].className.replace('border-slate-200', 'border-blue-500');
                        output.innerHTML = `<strong>שלב 3:</strong> בודקים בשכבה 1 (<code>x</code>). אין התאמה. עוברים ל-empty-env...`;

                        // Step 4: Look at empty-env
                        envLookupTimeout = setTimeout(() => {
                            frames['x1'].className = frames['x1'].className.replace('border-blue-500', 'border-slate-200');
                            frames['empty'].className = frames['empty'].className.replace('border-slate-700', 'border-red-500');
                            output.innerHTML = `<strong>שלב 4:</strong> הגענו ל-<code>empty-env</code>.<br><span class="text-red-500 font-bold">שגיאה:</span> המשתנה <code>z</code> אינו מוגדר בסביבה! (Unbound variable error).`;
                        }, 1200);
                    }, 1200);
                }, 1200);
            }
        }

        // --- Map/Filter/Foldr Pipeline Simulator JS Logic ---
        let funcMode = 'map';
        let funcStep = 0;
        const origList = [1, 2, 3, 4];
        let currentList = [1, 2, 3, 4];

        function setFuncSim(mode) {
            funcMode = mode;
            funcStep = 0;

            const mapBtn = document.getElementById('btn-func-map');
            const filterBtn = document.getElementById('btn-func-filter');
            const foldrBtn = document.getElementById('btn-func-foldr');

            if (mapBtn) mapBtn.className = mode === 'map' ? "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer" : "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
            if (filterBtn) filterBtn.className = mode === 'filter' ? "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer" : "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
            if (foldrBtn) foldrBtn.className = mode === 'foldr' ? "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer" : "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";

            resetFuncSim();
        }

        function resetFuncSim() {
            funcStep = 0;
            currentList = [...origList];

            const stepBtn = document.getElementById('btn-func-step');
            if (stepBtn) {
                stepBtn.innerText = "בצע צעד (Step)";
                stepBtn.className = stepBtn.className.replace('bg-slate-400 hover:bg-slate-500', 'bg-emerald-600 hover:bg-emerald-700');
            }

            renderFuncList();
            const explain = document.getElementById('func-explain');
            if (explain) explain.innerHTML = 'לחצו על "בצע צעד" כדי לראות את הפעלת הפונקציה על הרשימה.';
        }

        function renderFuncList() {
            const listContainer = document.getElementById('func-list-view');
            if (!listContainer) return;

            if (funcMode === 'foldr' && funcStep > 0) {
                let expr = '0';
                for (let i = 3; i >= 4 - funcStep; i--) {
                    expr = `(+ ${origList[i]} ${expr})`;
                }
                listContainer.innerHTML = `<span class="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-lg border border-yellow-300 font-bold">${expr}</span>`;
                return;
            }

            listContainer.innerHTML = currentList.map((item, idx) => {
                let bgClass = "bg-white text-slate-800 border-slate-200";
                if (funcMode === 'map') {
                    if (idx < funcStep) bgClass = "bg-blue-100 text-blue-800 border-blue-300 font-bold";
                    else if (idx === funcStep) bgClass = "bg-yellow-100 border-yellow-400 border-2 font-bold animate-pulse";
                } else if (funcMode === 'filter') {
                    if (idx < funcStep) {
                        if (origList[idx] % 2 === 0) bgClass = "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold";
                        else bgClass = "bg-red-50 text-red-400 border-red-200 line-through opacity-50";
                    } else if (idx === funcStep) bgClass = "bg-yellow-100 border-yellow-400 border-2 font-bold animate-pulse";
                }
                return `
                    <div class="${bgClass} w-10 h-10 border rounded-full flex items-center justify-center shadow-sm text-xs font-bold transition-all duration-300">
                        ${item}
                    </div>
                `;
            }).join(currentList.length > 0 ? ' <span class="text-slate-400 font-bold">➔</span> ' : '<span class="text-slate-400 italic">רשימה ריקה</span>');
        }

        function stepFuncSim() {
            const explain = document.getElementById('func-explain');
            const stepBtn = document.getElementById('btn-func-step');
            if (!explain || !stepBtn) return;

            if (funcMode === 'map') {
                if (funcStep >= 4) {
                    explain.innerHTML = `<strong>סיום תהליך Map!</strong><br>הפקודה <code>map</code> סיימה לעבור על כל האיברים והחזירה רשימה חדשה: <code>'(2 4 6 8)</code>.<br>שימו לב שגודל הרשימה נשמר.`;
                    stepBtn.innerText = "הסתיים";
                    stepBtn.className = stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
                    return;
                }

                currentList[funcStep] = origList[funcStep] * 2;
                explain.innerHTML = `<strong>צעד ${funcStep + 1}: הכפלת האיבר</strong><br>מפעילים את הפונקציה <code>(* ${origList[funcStep]} 2)</code> על האיבר באינדקס ${funcStep}.<br>האיבר הופך מ-<code>${origList[funcStep]}</code> ל-<code>${currentList[funcStep]}</code>.`;
                funcStep++;
                renderFuncList();
            } else if (funcMode === 'filter') {
                if (funcStep >= 4) {
                    const filtered = origList.filter(x => x % 2 === 0);
                    currentList = filtered;
                    renderFuncList();
                    explain.innerHTML = `<strong>סיום תהליך Filter!</strong><br>הפקודה <code>filter</code> סיימה וסילקה את האיברים שלא החזירו אמת עבור הפרדיקט <code>even?</code>.<br>הרשימה החדשה שהתקבלה היא <code>'(2 4)</code>.`;
                    stepBtn.innerText = "הסתיים";
                    stepBtn.className = stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
                    return;
                }

                const isEven = (origList[funcStep] % 2 === 0);
                explain.innerHTML = `<strong>צעד ${funcStep + 1}: בדיקת זוגיות</strong><br>מפעילים <code>(even? ${origList[funcStep]})</code>.<br>התוצאה היא <code>${isEven ? '#t' : '#f'}</code>. ${isEven ? 'האיבר נשאר.' : 'האיבר יסונן מהרשימה.'}`;
                funcStep++;
                renderFuncList();
            } else if (funcMode === 'foldr') {
                if (funcStep >= 4) {
                    explain.innerHTML = `<strong>סיום תהליך Foldr!</strong><br>המפרש חישב את עץ הפעולות מימין לשמאל (מלמעלה למטה):<br><code>(+ 1 (+ 2 (+ 3 (+ 4 0)))) = 10</code>.`;
                    stepBtn.innerText = "הסתיים";
                    stepBtn.className = stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
                    return;
                }

                funcStep++;
                renderFuncList();

                let expr = '0';
                for (let i = 3; i >= 4 - funcStep; i--) {
                    expr = `(+ ${origList[i]} ${expr})`;
                }
                explain.innerHTML = `<strong>צעד ${funcStep}: קיפול איבר מהסוף</strong><br>מפעילים את פונקציית החיבור על האיבר <code>${origList[4 - funcStep]}</code> יחד עם תוצאת הקיפול שנצברה מימין (המתחיל מ-0):<br><code>${expr}</code>.`;
            }
        }

        // --- Shape Datatype Cases Simulator JS Logic ---
        function dispatchShape(type) {
            const lineCircle = document.getElementById('cases-line-circle');
            const lineRect = document.getElementById('cases-line-rect');
            const lineElse = document.getElementById('cases-line-else');
            const explain = document.getElementById('shape-explain');

            if (!explain || !lineCircle || !lineRect || !lineElse) return;

            // Clear highlights
            lineCircle.className = lineCircle.className.replace(' bg-emerald-950 text-emerald-200 font-bold', '');
            lineRect.className = lineRect.className.replace(' bg-emerald-950 text-emerald-200 font-bold', '');
            lineElse.className = lineElse.className.replace(' bg-red-950 text-red-200 font-bold', '');

            if (type === 'circle') {
                lineCircle.className += ' bg-emerald-950 text-emerald-200 font-bold';
                explain.innerHTML = `<strong>התאמה נמצאה!</strong><br>הערך הוא מסוג <code>circle</code>.<br>הפרסר שולף את רדיוס המעגל לתוך המשתנה <code>r = 5</code> ומחשב:<br><code>(* 3.14 5 5) = 78.5</code>.`;
            } else if (type === 'rect') {
                lineRect.className += ' bg-emerald-950 text-emerald-200 font-bold';
                explain.innerHTML = `<strong>התאמה נמצאה!</strong><br>הערך הוא מסוג <code>rectangle</code>.<br>הפרסר שולף את הרוחב <code>w = 4</code> והגובה <code>h = 6</code> ומחשב:<br><code>(* 4 6) = 24</code>.`;
            } else {
                lineElse.className += ' bg-red-950 text-red-200 font-bold';
                explain.innerHTML = `<strong>אין התאמה לטיפוס!</strong><br>הערך שנשלח אינו <code>circle</code> ואינו <code>rectangle</code>.<br>בלוק ה-<code>else</code> מופעל וזורק שגיאת ריצה בעזרת <code>eopl:error</code>.`;
            }
        }

        // --- Prefix AST Builder JS Logic ---
        let prefixTokens = [];
        const targetPrefix = ['(', '-', '(', '/', '4', '8', ')', '(', '*', '2', '5', ')', ')'];

        let prefixEvalStep = 0;
        function stepPrefixEval() {
            if (prefixEvalStep < 3) {
                prefixEvalStep++;
            } else {
                prefixEvalStep = 0;
            }
            renderPrefixSim();
        }

        function addPrefixToken(token) {
            prefixEvalStep = 0;
            prefixTokens.push(token);
            renderPrefixSim();
        }

        function clearLastPrefixToken() {
            prefixEvalStep = 0;
            prefixTokens.pop();
            renderPrefixSim();
        }

        function resetPrefixSim() {
            prefixEvalStep = 0;
            prefixTokens = [];
            renderPrefixSim();
        }

        function renderPrefixSim() {
            const ws = document.getElementById('prefix-workspace');
            const fb = document.getElementById('prefix-feedback');
            const ast = document.getElementById('prefix-ast-view');
            if (!ws || !fb || !ast) return;

            if (prefixTokens.length === 0) {
                ws.innerHTML = `<span class="text-slate-500 italic text-sm">לחצו על האסימונים למעלה כדי להתחיל</span>`;
            } else {
                let formatted = "";
                for (let i = 0; i < prefixTokens.length; i++) {
                    let tok = prefixTokens[i];
                    if (tok === '(') {
                        formatted += tok;
                    } else if (tok === ')') {
                        if (formatted.endsWith(" ")) formatted = formatted.slice(0, -1);
                        formatted += tok + " ";
                    } else {
                        formatted += tok + " ";
                    }
                }
                ws.innerText = formatted.trim();
            }

            let isCorrect = prefixTokens.length === targetPrefix.length && prefixTokens.every((t, i) => t === targetPrefix[i]);

            if (isCorrect) {
                let evalBtnText = prefixEvalStep === 3 ? "איפוס חישוב" : "חשב צעד (Step)";
                let evalBtnClass = prefixEvalStep === 3 ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white";

                fb.className = "mt-4 p-3 rounded-lg text-xs text-center bg-emerald-50 text-emerald-800 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-3 font-bold";

                if (prefixEvalStep === 0) {
                    fb.innerHTML = `
                        <span>🏆 כל הכבוד! בניתם קוד Scheme תקין. כעת התחילו בצמצום ה-AST:</span>
                        <button onclick="stepPrefixEval()" class="${evalBtnClass} font-bold py-1.5 px-4 rounded-lg text-xs transition-all cursor-pointer shadow-sm">${evalBtnText}</button>
                    `;

                    ast.innerHTML = `
                        <div class="flex flex-col items-center scale-90 transition-all duration-500">
                            <div class="bg-indigo-600 text-white font-mono text-sm w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">-</div>
                            <div class="w-36 h-6 border-r-2 border-l-2 border-t-2 border-slate-300 mt-1"></div>
                            <div class="flex gap-12 -mt-1">
                                <div class="flex flex-col items-center">
                                    <div class="bg-sky-500 text-white font-mono text-sm w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm">/</div>
                                    <div class="w-12 h-4 border-r border-l border-t border-slate-300 mt-1"></div>
                                    <div class="flex gap-4 -mt-1">
                                        <div class="bg-emerald-500 text-white font-mono text-xs w-6 h-6 rounded-md flex items-center justify-center font-bold shadow-sm">4</div>
                                        <div class="bg-emerald-500 text-white font-mono text-xs w-6 h-6 rounded-md flex items-center justify-center font-bold shadow-sm">8</div>
                                    </div>
                                </div>
                                <div class="flex flex-col items-center">
                                    <div class="bg-sky-500 text-white font-mono text-sm w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm">*</div>
                                    <div class="w-12 h-4 border-r border-l border-t border-slate-300 mt-1"></div>
                                    <div class="flex gap-4 -mt-1">
                                        <div class="bg-emerald-500 text-white font-mono text-xs w-6 h-6 rounded-md flex items-center justify-center font-bold shadow-sm">2</div>
                                        <div class="bg-emerald-500 text-white font-mono text-xs w-6 h-6 rounded-md flex items-center justify-center font-bold shadow-sm">5</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                } else if (prefixEvalStep === 1) {
                    fb.innerHTML = `
                        <span>🔄 <strong>שלב 1:</strong> צמצום פוסט-אורדר של <code>(/ 4 8)</code> ל-<code>0.5</code>.</span>
                        <button onclick="stepPrefixEval()" class="${evalBtnClass} font-bold py-1.5 px-4 rounded-lg text-xs transition-all cursor-pointer shadow-sm">${evalBtnText}</button>
                    `;

                    ast.innerHTML = `
                        <div class="flex flex-col items-center scale-90 transition-all duration-500">
                            <div class="bg-indigo-600 text-white font-mono text-sm w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">-</div>
                            <div class="w-36 h-6 border-r-2 border-l-2 border-t-2 border-slate-300 mt-1"></div>
                            <div class="flex gap-12 -mt-1">
                                <div class="flex flex-col items-center justify-center">
                                    <div class="bg-emerald-500 text-white font-mono text-xs px-3 py-1.5 rounded-md flex items-center justify-center font-bold shadow-md transform scale-110 ring-2 ring-yellow-400 transition-all duration-500">0.5</div>
                                    <div class="text-[9px] text-slate-500 mt-1">(/ 4 8)</div>
                                </div>
                                <div class="flex flex-col items-center">
                                    <div class="bg-sky-500 text-white font-mono text-sm w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm">*</div>
                                    <div class="w-12 h-4 border-r border-l border-t border-slate-300 mt-1"></div>
                                    <div class="flex gap-4 -mt-1">
                                        <div class="bg-emerald-500 text-white font-mono text-xs w-6 h-6 rounded-md flex items-center justify-center font-bold shadow-sm">2</div>
                                        <div class="bg-emerald-500 text-white font-mono text-xs w-6 h-6 rounded-md flex items-center justify-center font-bold shadow-sm">5</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                } else if (prefixEvalStep === 2) {
                    fb.innerHTML = `
                        <span>🔄 <strong>שלב 2:</strong> צמצום פוסט-אורדר של <code>(* 2 5)</code> ל-<code>10</code>.</span>
                        <button onclick="stepPrefixEval()" class="${evalBtnClass} font-bold py-1.5 px-4 rounded-lg text-xs transition-all cursor-pointer shadow-sm">${evalBtnText}</button>
                    `;

                    ast.innerHTML = `
                        <div class="flex flex-col items-center scale-90 transition-all duration-500">
                            <div class="bg-indigo-600 text-white font-mono text-sm w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">-</div>
                            <div class="w-36 h-6 border-r-2 border-l-2 border-t-2 border-slate-300 mt-1"></div>
                            <div class="flex gap-12 -mt-1">
                                <div class="flex flex-col items-center justify-center hover:scale-105 transition-all">
                                    <div class="bg-emerald-500 text-white font-mono text-xs px-3 py-1.5 rounded-md flex items-center justify-center font-bold shadow-md opacity-80">0.5</div>
                                </div>
                                <div class="flex flex-col items-center justify-center">
                                    <div class="bg-emerald-500 text-white font-mono text-xs px-3 py-1.5 rounded-md flex items-center justify-center font-bold shadow-md transform scale-110 ring-2 ring-yellow-400 transition-all duration-500">10</div>
                                    <div class="text-[9px] text-slate-500 mt-1">(* 2 5)</div>
                                </div>
                            </div>
                        </div>
                    `;
                } else if (prefixEvalStep === 3) {
                    fb.innerHTML = `
                        <span>🏆 <strong>שלב 3:</strong> צמצום שורש העץ <code>(- 0.5 10)</code> לתוצאה הסופית: <strong dir="ltr">-9.5</strong>!</span>
                        <button onclick="stepPrefixEval()" class="${evalBtnClass} font-bold py-1.5 px-4 rounded-lg text-xs transition-all cursor-pointer shadow-sm">${evalBtnText}</button>
                    `;

                    ast.innerHTML = `
                        <div class="flex flex-col items-center justify-center min-h-[140px] transition-all duration-500">
                            <div class="bg-indigo-600 text-white font-mono text-base px-6 py-4 rounded-xl flex flex-col items-center justify-center font-bold shadow-lg transform scale-125 transition-all duration-500">
                                <span dir="ltr">-9.5</span>
                                <span class="text-[9px] font-normal opacity-75 mt-1">(- 0.5 10)</span>
                            </div>
                        </div>
                    `;
                }
            } else {
                let isWrong = false;
                for (let i = 0; i < prefixTokens.length; i++) {
                    if (prefixTokens[i] !== targetPrefix[i]) {
                        isWrong = true;
                        break;
                    }
                }
                if (isWrong) {
                    fb.className = "mt-4 p-3 rounded-lg text-xs text-center bg-red-50 text-red-800 border border-red-200 font-bold";
                    fb.innerHTML = "❌ שגיאה בתחביר! סדר האופרטורים או הסוגריים אינו נכון. נסו לאפס או למחוק.";
                } else if (prefixTokens.length > 0) {
                    fb.className = "mt-4 p-3 rounded-lg text-xs text-center bg-yellow-50 text-yellow-800 border border-yellow-200";
                    fb.innerHTML = "הקוד נבנה נכון בינתיים, המשיכו להרכיב...";
                } else {
                    fb.className = "mt-4 p-3 rounded-lg text-xs text-center bg-slate-50 text-slate-500";
                    fb.innerHTML = "ממתין לבניית ביטוי...";
                }
                ast.innerHTML = `<span class="text-xs text-slate-400 italic">השלימו את הביטוי התקין כדי לצפות בעץ ה-AST</span>`;
            }
        }

        // --- Scope Resolver JS Logic ---
        let scopeMode = 'let';
        function setScopeMode(mode) {
            scopeMode = mode;
            const bLet = document.getElementById('btn-scope-let');
            const bStar = document.getElementById('btn-scope-letstar');
            const bRec = document.getElementById('btn-scope-letrec');
            if (bLet) bLet.className = mode === 'let' ? "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer" : "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
            if (bStar) bStar.className = mode === 'letstar' ? "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer" : "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
            if (bRec) bRec.className = mode === 'letrec' ? "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer" : "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";

            renderScopeCode();
            renderScopeEnvVisualizer(null);
            const exp = document.getElementById('scope-explain-box');
            if (exp) exp.innerHTML = "רחפו מעל המשתנים המוגדרים בקוד כדי לחקור מאיזו סביבה הם מגיעים.";
        }

        function renderScopeCode() {
            const container = document.getElementById('scope-code-container');
            if (!container) return;

            if (scopeMode === 'let') {
                container.innerHTML = `
<span class="token-comment">; הגדרה גלובלית</span>
(define x 10)

(let (<span id="bind-x" class="border-b-2 border-dotted border-blue-400 font-bold px-0.5 cursor-help bg-slate-855 hover:bg-blue-900 transition-all" onmouseover="inspectScope('let-bind-x')" onmouseout="clearScopeInspect()">x 2</span>)
     (<span id="bind-y" class="border-b-2 border-dotted border-purple-400 font-bold px-0.5 cursor-help bg-slate-855 hover:bg-purple-900 transition-all" onmouseover="inspectScope('let-bind-y')" onmouseout="clearScopeInspect()">y (+ <span id="ref-x-in-y" class="border-b border-red-500 font-bold text-red-400 cursor-help" onmouseover="inspectScope('let-ref-x-in-y')" onmouseout="clearScopeInspect()">x</span> 3)</span>))
  (* <span id="ref-x-in-body" class="border-b border-blue-400 font-bold text-blue-300 cursor-help" onmouseover="inspectScope('let-ref-x-in-body')" onmouseout="clearScopeInspect()">x</span> <span id="ref-y-in-body" class="border-b border-purple-400 font-bold text-purple-300 cursor-help" onmouseover="inspectScope('let-ref-y-in-body')" onmouseout="clearScopeInspect()">y</span>))`.trim();
            } else if (scopeMode === 'letstar') {
                container.innerHTML = `
<span class="token-comment">; הגדרה גלובלית</span>
(define x 10)

(let* (<span id="bind-xstar" class="border-b-2 border-dotted border-blue-400 font-bold px-0.5 cursor-help bg-slate-855 hover:bg-blue-900 transition-all" onmouseover="inspectScope('star-bind-x')" onmouseout="clearScopeInspect()">x 2</span>)
      (<span id="bind-ystar" class="border-b-2 border-dotted border-purple-400 font-bold px-0.5 cursor-help bg-slate-855 hover:bg-purple-900 transition-all" onmouseover="inspectScope('star-bind-y')" onmouseout="clearScopeInspect()">y (+ <span id="ref-x-in-ystar" class="border-b border-blue-400 font-bold text-blue-300 cursor-help" onmouseover="inspectScope('star-ref-x-in-y')" onmouseout="clearScopeInspect()">x</span> 3)</span>))
  (* <span id="ref-x-in-bodystar" class="border-b border-blue-400 font-bold text-blue-300 cursor-help" onmouseover="inspectScope('star-ref-x-in-body')" onmouseout="clearScopeInspect()">x</span> <span id="ref-y-in-bodystar" class="border-b border-purple-400 font-bold text-purple-300 cursor-help" onmouseover="inspectScope('star-ref-y-in-body')" onmouseout="clearScopeInspect()">y</span>))`.trim();
            } else {
                container.innerHTML = `
(letrec ((<span id="bind-rec" class="border-b-2 border-dotted border-blue-400 font-bold px-0.5 cursor-help bg-slate-855 hover:bg-blue-900 transition-all" onmouseover="inspectScope('rec-bind')" onmouseout="clearScopeInspect()">double</span> (lambda (n)
                   (if (= n 0)
                       0
                       (+ 2 (<span id="ref-rec-self" class="border-b border-blue-400 font-bold text-blue-300 cursor-help" onmouseover="inspectScope('rec-ref-self')" onmouseout="clearScopeInspect()">double</span> (- n 1)))))))
  (<span id="ref-rec-body" class="border-b border-blue-400 font-bold text-blue-300 cursor-help" onmouseover="inspectScope('rec-ref-body')" onmouseout="clearScopeInspect()">double</span> 5))`.trim();
            }
        }

        function renderScopeEnvVisualizer(varId) {
            const visualizer = document.getElementById('scope-env-visualizer');
            if (!visualizer) return;

            let globalHighlight = "";
            let localHighlight1 = "";
            let localHighlight2 = "";

            if (scopeMode === 'let') {
                if (varId === 'let-ref-x-in-y') {
                    globalHighlight = "border-red-500 bg-red-950/40 text-red-300 ring-2 ring-red-400 font-bold";
                } else if (varId === 'let-ref-x-in-body' || varId === 'let-bind-x') {
                    localHighlight1 = "border-yellow-500 bg-yellow-950/40 text-yellow-300 ring-2 ring-yellow-400 font-bold";
                } else if (varId === 'let-ref-y-in-body' || varId === 'let-bind-y') {
                    localHighlight2 = "border-yellow-500 bg-yellow-950/40 text-yellow-300 ring-2 ring-yellow-400 font-bold";
                }

                visualizer.innerHTML = `
                    <div class="flex flex-col gap-2 items-center w-full" dir="ltr">
                        <!-- Let Env Box -->
                        <div class="border-2 border-slate-700 bg-slate-900 rounded-lg p-3 w-48 text-center shadow-md relative">
                            <div class="text-[10px] text-slate-400 mb-1 border-b border-slate-800 pb-1">Let Env (Local)</div>
                            <div class="flex justify-around text-xs font-bold">
                                <span class="px-1.5 py-0.5 rounded transition-all ${localHighlight1}">x: 2</span>
                                <span class="px-1.5 py-0.5 rounded transition-all ${localHighlight2}">y: 13</span>
                            </div>
                            <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-blue-500 text-xs">▼ points to</div>
                        </div>
                        
                        <div class="h-2"></div>
                        
                        <!-- Global Env Box -->
                        <div class="border-2 border-slate-750 bg-slate-950 rounded-lg p-3 w-48 text-center shadow-md">
                            <div class="text-[10px] text-slate-500 mb-1 border-b border-slate-900 pb-1">Global Env</div>
                            <div class="flex justify-center text-xs font-bold">
                                <span class="px-1.5 py-0.5 rounded transition-all ${globalHighlight}">x: 10</span>
                            </div>
                        </div>
                    </div>
                `;
            } else if (scopeMode === 'letstar') {
                let xHighlight = "";
                let yHighlight = "";
                if (varId === 'star-ref-x-in-y' || varId === 'star-bind-x') {
                    xHighlight = "border-emerald-500 bg-emerald-950/40 text-emerald-300 ring-2 ring-emerald-400 font-bold";
                } else if (varId === 'star-ref-x-in-body') {
                    xHighlight = "border-yellow-500 bg-yellow-950/40 text-yellow-300 ring-2 ring-yellow-400 font-bold";
                } else if (varId === 'star-ref-y-in-body' || varId === 'star-bind-y') {
                    yHighlight = "border-yellow-500 bg-yellow-950/40 text-yellow-300 ring-2 ring-yellow-400 font-bold";
                }

                visualizer.innerHTML = `
                    <div class="flex flex-col gap-1 items-center w-full" dir="ltr">
                        <!-- Env 2 Box (y) -->
                        <div class="border-2 border-slate-700 bg-slate-900 rounded-lg p-2 w-44 text-center shadow-sm relative">
                            <div class="text-[9px] text-slate-400 mb-0.5">Env2 (y)</div>
                            <div class="text-xs font-bold"><span class="px-1.5 py-0.5 rounded transition-all ${yHighlight}">y: 5</span></div>
                            <div class="text-[9px] text-blue-500">▼ points to</div>
                        </div>
                        
                        <!-- Env 1 Box (x) -->
                        <div class="border-2 border-slate-700 bg-slate-900 rounded-lg p-2 w-44 text-center shadow-sm relative">
                            <div class="text-[9px] text-slate-400 mb-0.5">Env1 (x)</div>
                            <div class="text-xs font-bold"><span class="px-1.5 py-0.5 rounded transition-all ${xHighlight}">x: 2</span></div>
                            <div class="text-[9px] text-blue-500">▼ points to</div>
                        </div>
                        
                        <!-- Global Env Box -->
                        <div class="border-2 border-slate-755 bg-slate-950 rounded-lg p-2 w-44 text-center shadow-sm">
                            <div class="text-[9px] text-slate-500 mb-0.5">Global Env</div>
                            <div class="text-xs font-bold">x: 10</div>
                        </div>
                    </div>
                `;
            } else if (scopeMode === 'letrec') {
                let recHighlight = "";

                if (varId === 'rec-bind') {
                    recHighlight = "border-yellow-500 bg-yellow-950/40 text-yellow-300 ring-2 ring-yellow-400 font-bold";
                } else if (varId === 'rec-ref-self') {
                    recHighlight = "border-emerald-500 bg-emerald-950/40 text-emerald-300 ring-2 ring-emerald-400 font-bold";
                } else if (varId === 'rec-ref-body') {
                    recHighlight = "border-yellow-500 bg-yellow-950/40 text-yellow-300 ring-2 ring-yellow-400 font-bold";
                }

                visualizer.innerHTML = `
                    <div class="flex flex-col gap-2 items-center w-full" dir="ltr">
                        <!-- Letrec Env Box -->
                        <div class="border-2 border-slate-700 bg-slate-900 rounded-lg p-3 w-56 text-center shadow-md relative">
                            <div class="text-[10px] text-slate-400 mb-1 border-b border-slate-800 pb-1">Letrec Env (Recursive)</div>
                            <div class="text-xs font-bold mb-1">
                                <span class="px-1.5 py-0.5 rounded transition-all ${recHighlight}">double: Closure</span>
                            </div>
                            <div class="text-[10px] text-slate-400 mt-2 font-mono text-left leading-normal w-full" style="font-family: monospace; white-space: pre; text-align: left;" dir="ltr">
Closure birth env ──┐
▲                   │
└───────────────────┘ (circular!)
                            </div>
                            <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-blue-500 text-xs">▼ points to</div>
                        </div>
                        
                        <div class="h-2"></div>
                        
                        <!-- Global Env Box -->
                        <div class="border-2 border-slate-755 bg-slate-950 rounded-lg p-3 w-56 text-center shadow-md">
                            <div class="text-[10px] text-slate-500 mb-1 border-b border-slate-900 pb-1">Global Env</div>
                            <div class="text-xs font-bold">x: 10</div>
                        </div>
                    </div>
                `;
            }
        }

        function inspectScope(varId) {
            const box = document.getElementById('scope-explain-box');
            if (!box) return;

            document.querySelectorAll('#scope-code-container span').forEach(el => el.classList.remove('bg-yellow-950', 'ring-2', 'ring-yellow-400', 'bg-red-950', 'ring-red-500', 'bg-emerald-950', 'ring-emerald-500'));
            renderScopeEnvVisualizer(varId);

            if (varId === 'let-bind-x') {
                box.innerHTML = `<strong>הגדרת המשתנה <code>x</code>:</strong><br>קושרת את השם <code>x</code> לערך <code>2</code> בטווח ההכרה של גוף ה-<code>let</code> בלבד.`;
                document.getElementById('bind-x').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
            } else if (varId === 'let-bind-y') {
                box.innerHTML = `<strong>הגדרת המשתנה <code>y</code>:</strong><br>קושרת את השם <code>y</code> לערך <code>(+ x 3)</code> בתוך ה-<code>let</code>.`;
                document.getElementById('bind-y').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
            } else if (varId === 'let-ref-x-in-y') {
                box.innerHTML = `
                    <strong><span class="text-red-500 font-bold">⚠️ שגיאת טווח הכרה! (Unbound Variable):</span></strong><br>
                    מכיוון שב-<code>let</code> רגיל ההערכה נעשית <strong>במקביל</strong>, המשתנה <code>x</code> הנמצא בהגדרת <code>y</code> אינו מכיר את ה-<code>x</code> שמוגדר לצידו!<br>
                    <span class="text-red-400 font-bold">תוצאה:</span> המפרש ינסה לחפש את <code>x</code> בסביבה החיצונית (הגלובלית) וישלוף את הערך <strong>10</strong> (מתוך <code>(define x 10)</code>) במקום את 2!
                `;
                document.getElementById('ref-x-in-y').classList.add('bg-red-950', 'ring-2', 'ring-red-500');
            } else if (varId === 'let-ref-x-in-body') {
                box.innerHTML = `<strong>שימוש ב-<code>x</code> בגוף ה-<code>let</code>:</strong><br>נמצא בטווח ההכרה של <code>let</code>. מצביע ישירות להשמה <code>x = 2</code>.`;
                document.getElementById('ref-x-in-body').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
                document.getElementById('bind-x').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
            } else if (varId === 'let-ref-y-in-body') {
                box.innerHTML = `<strong>שימוש ב-<code>y</code> בגוף ה-<code>let</code>:</strong><br>נמצא בטווח ההכרה של <code>let</code>. מצביע להשמה של <code>y</code> (שחושב כ-10 + 3 = 13).`;
                document.getElementById('ref-y-in-body').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
                document.getElementById('bind-y').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
            }
            // let*
            else if (varId === 'star-bind-x') {
                box.innerHTML = `<strong>הגדרת <code>x</code> ב-<code>let*</code>:</strong><br>קושרת את השם <code>x</code> לערך <code>2</code>. הגדרה זו מתבצעת ראשונה.`;
                document.getElementById('bind-xstar').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
            } else if (varId === 'star-bind-y') {
                box.innerHTML = `<strong>הגדרת <code>y</code> ב-<code>let*</code>:</strong><br>מתבצעת לאחר הגדרת <code>x</code> ולכן יכולה להתבסס עליה.`;
                document.getElementById('bind-ystar').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
            } else if (varId === 'star-ref-x-in-y') {
                box.innerHTML = `
                    <strong><span class="text-emerald-500 font-bold">✓ טווח הכרה תקין (Sequential Scoping):</span></strong><br>
                    מכיוון שב-<code>let*</code> ההערכה נעשית <strong>בסדר סדרתי</strong>, המשתנה <code>x</code> בהגדרת <code>y</code> מכיר את ההגדרה <code>x = 2</code> שבוצעה שורה אחת מעל!<br>
                    <span class="text-emerald-400 font-bold">תוצאה:</span> ערכו של <code>x</code> כאן הוא <strong>2</strong>, ולכן <code>y</code> יחושב ל-<code>2 + 3 = 5</code>.
                `;
                document.getElementById('ref-x-in-ystar').classList.add('bg-emerald-950', 'ring-2', 'ring-emerald-500');
                document.getElementById('bind-xstar').classList.add('bg-emerald-950', 'ring-2', 'ring-emerald-500');
            } else if (varId === 'star-ref-x-in-body') {
                box.innerHTML = `<strong>שימוש ב-<code>x</code> בגוף ה-<code>let*</code>:</strong><br>מצביע להגדרה <code>x = 2</code>.`;
                document.getElementById('ref-x-in-bodystar').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
                document.getElementById('bind-xstar').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
            } else if (varId === 'star-ref-y-in-body') {
                box.innerHTML = `<strong>שימוש ב-<code>y</code> בגוף ה-<code>let*</code>:</strong><br>מצביע להגדרה <code>y = 5</code> (שחושבה סדרתית מתוך <code>2 + 3</code>).`;
                document.getElementById('ref-y-in-bodystar').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
                document.getElementById('bind-ystar').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
            }
            // letrec
            else if (varId === 'rec-bind') {
                box.innerHTML = `<strong>הגדרת הפונקציה <code>double</code> ב-<code>letrec</code>:</strong><br>מייצרת סביבה רקורסיבית מיוחדת שבה המפתח <code>double</code> נרשם בזיכרון עוד לפני הערכת גוף הפונקציה.`;
                document.getElementById('bind-rec').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
            } else if (varId === 'rec-ref-self') {
                box.innerHTML = `
                    <strong><span class="text-emerald-500 font-bold">✓ פנייה רקורסיבית (Self Reference):</span></strong><br>
                    בזכות מנגנון ה-<code>letrec</code>, הפונקציה <code>double</code> מסוגלת לקרוא לעצמה מתוך גוף הפונקציה ללא שגיאה.<br>
                    בזמן הריצה המפרש יזהה את השם וישלוף את אותה פונקציה עצמה מהסביבה.
                `;
                document.getElementById('ref-rec-self').classList.add('bg-emerald-950', 'ring-2', 'ring-emerald-500');
                document.getElementById('bind-rec').classList.add('bg-emerald-950', 'ring-2', 'ring-emerald-500');
            } else if (varId === 'rec-ref-body') {
                box.innerHTML = `<strong>קריאה לפונקציה בגוף ה-<code>letrec</code>:</strong><br>קריאה התחלתית המזמנת את <code>(double 5)</code>.`;
                document.getElementById('ref-rec-body').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
                document.getElementById('bind-rec').classList.add('bg-yellow-950', 'ring-2', 'ring-yellow-400');
            }
        }

        function clearScopeInspect() {
            document.querySelectorAll('#scope-code-container span').forEach(el => el.classList.remove('bg-yellow-950', 'ring-2', 'ring-yellow-400', 'bg-red-950', 'ring-red-500', 'bg-emerald-950', 'ring-emerald-500'));
            renderScopeEnvVisualizer(null);
        }

        // --- Cond Crash Simulator JS Logic ---
        let condStep = 0;

        function updateCondCodePreview() {
            const version = document.getElementById('cond-code-version').value;
            const l4 = document.getElementById('cond-line-4');
            const l5 = document.getElementById('cond-line-5');
            const l6 = document.getElementById('cond-line-6');
            if (!l4 || !l5 || !l6) return;

            if (version === 'buggy') {
                l4.innerHTML = `((&gt; n 0) 'positive) <span class="text-slate-500 text-xs font-sans">; בדיקת ערך ישירה (באג)</span>`;
                l5.innerHTML = `((string? n) 'text)`;
                l6.innerHTML = `(else 'other)`;
            } else {
                l4.innerHTML = `((number? n) (if (&gt; n 0) 'positive 'negative-or-zero)) <span class="text-slate-500 text-xs font-sans">; בדיקת טיפוס תחילה</span>`;
                l5.innerHTML = `((string? n) 'text)`;
                l6.innerHTML = `(else 'not-a-number-or-string)`;
            }
            resetCondSim();
        }

        function resetCondSimColors() {
            for (let i = 1; i <= 7; i++) {
                const line = document.getElementById('cond-line-' + i);
                if (line) line.className = "p-1 rounded transition-colors text-slate-100";
            }
        }

        function resetCondSim() {
            condStep = 0;
            resetCondSimColors();
            const btn = document.getElementById('btn-cond-step');
            if (btn) {
                btn.innerText = "הרץ סימולציה (צעד 1)";
                btn.className = "flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors cursor-pointer";
            }
            const explain = document.getElementById('cond-explain-box');
            if (explain) explain.innerHTML = "לחצו על \"צעד הבא\" כדי לראות את שלבי ההערכה של ה-cond.";
            const engine = document.getElementById('cond-engine-panel');
            if (engine) engine.classList.add('hidden');
            const engineCode = document.getElementById('cond-engine-code');
            if (engineCode) engineCode.innerHTML = "";
            const engineVisual = document.getElementById('cond-engine-visual');
            if (engineVisual) engineVisual.innerHTML = "";
        }

        function stepCondSim() {
            const valSelect = document.getElementById('cond-input-val');
            const version = document.getElementById('cond-code-version').value;
            const explain = document.getElementById('cond-explain-box');
            const engine = document.getElementById('cond-engine-panel');
            const engineCode = document.getElementById('cond-engine-code');
            const engineVisual = document.getElementById('cond-engine-visual');
            const btn = document.getElementById('btn-cond-step');
            if (!valSelect || !explain || !engine || !engineCode || !engineVisual || !btn) return;

            const valRaw = valSelect.value;
            condStep++;

            resetCondSimColors();

            // Step 1: Call function
            if (condStep === 1) {
                btn.innerText = "צעד הבא (צעד 2)";
                document.getElementById('cond-line-1').className = "p-1 rounded bg-slate-800 text-yellow-300 font-bold";
                explain.innerHTML = `<strong>שלב 1:</strong> קריאה לפונקציה analyze-number עם הקלט: <code>${valRaw}</code>.`;
                return;
            }

            // Step 2: Bind n
            if (condStep === 2) {
                btn.innerText = "צעד הבא (צעד 3)";
                document.getElementById('cond-line-2').className = "p-1 rounded bg-slate-800 text-yellow-300 font-bold";
                explain.innerHTML = `<strong>שלב 2:</strong> השמת המשתנה <code>n = ${valRaw}</code> בתוך גוף הפונקציה.`;
                return;
            }

            // Step 3: Enter cond
            if (condStep === 3) {
                btn.innerText = "צעד הבא (צעד 4)";
                document.getElementById('cond-line-3').className = "p-1 rounded bg-slate-800 text-yellow-300 font-bold";
                explain.innerHTML = `<strong>שלב 3:</strong> כניסה למבנה ה-<code>cond</code>. המפרש בודק את הזרועות לפי הסדר...`;
                return;
            }

            // Step 4: Check first branch
            if (condStep === 4) {
                if (version === 'buggy') {
                    if (valRaw === '5') {
                        document.getElementById('cond-line-4').className = "p-1 rounded bg-emerald-950 text-emerald-300 font-bold";
                        explain.innerHTML = `<strong>שלב 4 (סופי):</strong> הערכת התנאי הראשון: <code>(&gt; 5 0)</code>.<br>התוצאה היא <code>#t</code>! הזרוע נבחרת והערך המוחזר הוא <strong>'positive</strong>.`;
                        btn.innerText = "איפוס סימולציה";
                        btn.className = "flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors cursor-pointer";
                    } else if (valRaw === '-3') {
                        document.getElementById('cond-line-4').className = "p-1 rounded bg-red-950/40 text-red-300 font-bold";
                        explain.innerHTML = `<strong>שלב 4:</strong> הערכת התנאי הראשון: <code>(&gt; -3 0)</code>.<br>התוצאה היא <code>#f</code>. ממשיכים לזרוע הבאה...`;
                        btn.innerText = "צעד הבא (צעד 5)";
                    } else {
                        // "hello"
                        document.getElementById('cond-line-4').className = "p-1 rounded bg-red-950 text-red-300 font-bold animate-pulse";
                        explain.innerHTML = `<strong>שלב 4:</strong> הערכת התנאי הראשון: <code>(&gt; "hello" 0)</code>.<br>המפרש קורא לפרימיטיבה <code>&gt;</code> ומעביר לה את <code>"hello"</code>. שומר הסף בודק את חוזה הפונקציה...`;

                        engine.classList.remove('hidden');
                        engineCode.innerHTML = `(define primitive-&gt;\n  (lambda (x y)\n    (if (not (real? x))\n        (eopl:error '&gt; "contract violation\\n expected: real?\\n given: ~s" x)\n        (if (not (real? y))\n            (eopl:error '&gt; "contract violation\\n expected: real?\\n given: ~s" y)\n            (raw-&gt; x y)))))`;

                        engineVisual.innerHTML = `
                            <div class="flex items-center gap-3 bg-slate-900 p-3 rounded border border-slate-800 w-full justify-between" dir="ltr">
                                <div class="flex items-center gap-2">
                                    <span class="text-xl">🛑</span>
                                    <span class="text-xs font-bold text-slate-300">שומר סף: check (real? "hello")</span>
                                </div>
                                <span class="text-red-400 font-bold text-sm">#f (DANGER)</span>
                            </div>
                            <div class="mt-3 flex items-center justify-center w-full">
                                <div id="exception-bubble" class="bg-red-600 text-white font-bold px-4 py-2 rounded-full text-xs shadow-lg border border-red-400">
                                    💥 Exceptions Bubble: Contract Violation!
                                </div>
                            </div>
                        `;
                        btn.innerText = "צעד הבא (קריסה)";
                    }
                } else {
                    // correct version
                    if (valRaw === '5') {
                        document.getElementById('cond-line-4').className = "p-1 rounded bg-emerald-950 text-emerald-300 font-bold";
                        explain.innerHTML = `<strong>שלב 4 (סופי):</strong> הערכת התנאי הראשון: <code>(number? 5)</code>. התוצאה היא <code>#t</code>.<br>המפרש נכנס לתת-תנאי הפנימי: <code>(if (&gt; 5 0) 'positive 'negative-or-zero)</code>.<br>התוצאה היא <strong>'positive</strong>.`;
                        btn.innerText = "איפוס סימולציה";
                        btn.className = "flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors cursor-pointer";
                    } else if (valRaw === '-3') {
                        document.getElementById('cond-line-4').className = "p-1 rounded bg-emerald-950 text-emerald-300 font-bold";
                        explain.innerHTML = `<strong>שלב 4 (סופי):</strong> הערכת התנאי הראשון: <code>(number? -3)</code>. התוצאה היא <code>#t</code>.<br>המפרש נכנס לתנאי הפנימי: <code>(if (&gt; -3 0) 'positive 'negative-or-zero)</code>.<br>התוצאה היא <strong>'negative-or-zero</strong>.`;
                        btn.innerText = "איפוס סימולציה";
                        btn.className = "flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors cursor-pointer";
                    } else {
                        // "hello"
                        document.getElementById('cond-line-4').className = "p-1 rounded bg-slate-800 text-slate-400";
                        explain.innerHTML = `<strong>שלב 4:</strong> הערכת התנאי הראשון: <code>(number? "hello")</code>. התוצאה היא <code>#f</code>. הקוד ממשיך בבטחה לזרוע הבאה.`;

                        engine.classList.remove('hidden');
                        engineCode.innerHTML = `(define analyze-number\n  (lambda (n)\n    (cond\n      ((number? n) ...) ; &lt;-- check (number? "hello") = #f\n      ((string? n) 'text)\n      (else ...))))`;

                        engineVisual.innerHTML = `
                            <div class="flex items-center gap-3 bg-slate-900 p-3 rounded border border-slate-800 w-full justify-between" dir="ltr">
                                <div class="flex items-center gap-2">
                                    <span class="text-xl">🛡️</span>
                                    <span class="text-xs font-bold text-emerald-400">שומר סף: check (number? "hello")</span>
                                </div>
                                <span class="text-slate-400 font-bold text-sm">#f (בטוח)</span>
                            </div>
                            <div class="text-[10px] text-emerald-400 mt-1 font-sans text-left" dir="ltr">✓ הבדיקה נכשלה בבטחה, נמנעת קריסה של הפונקציה &gt;!</div>
                        `;
                        btn.innerText = "צעד הבא (צעד 5)";
                    }
                }
                return;
            }

            // Step 5: Check second branch or crash
            if (condStep === 5) {
                if (version === 'buggy') {
                    if (valRaw === '-3') {
                        document.getElementById('cond-line-5').className = "p-1 rounded bg-slate-800 text-yellow-300 font-bold";
                        explain.innerHTML = `<strong>שלב 5:</strong> הערכת התנאי השני: <code>(string? -3)</code>.<br>התוצאה היא <code>#f</code>. ממשיכים לזרוע הבאה...`;
                        btn.innerText = "צעד הבא (צעד 6)";
                    } else if (valRaw === '"hello"') {
                        // Crash transition
                        explain.innerHTML = `
                            <div class="border-r-4 border-red-500 bg-red-50 p-3 text-red-800 rounded">
                                <strong class="text-sm">💥 קריסה! (Runtime Exception):</strong><br>
                                <code>&gt;: contract violation</code><br>
                                expected: <code>real?</code><br>
                                given: <code>"hello"</code><br><br>
                                <span class="text-xs">הסבר: המפרש ניסה לבצע השוואה חשבונית בעזרת הפונקציה המובנית <code>&gt;</code> לפני שבדק שהקלט הוא מספר. שומר הסף זרק חריגה ופוצץ את התוכנית!</span>
                            </div>
                        `;
                        document.getElementById('cond-line-4').className = "p-1 rounded bg-red-900 text-red-100 font-bold";
                        btn.innerText = "איפוס סימולציה";
                        btn.className = "flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors cursor-pointer";
                    }
                } else {
                    // correct version for "hello"
                    document.getElementById('cond-line-5').className = "p-1 rounded bg-emerald-950 text-emerald-300 font-bold";
                    explain.innerHTML = `<strong>שלב 5 (סופי):</strong> הערכת התנאי השני: <code>(string? "hello")</code>. התוצאה היא <code>#t</code>!<br>הערך המוחזר הוא <strong>'text</strong>.`;
                    btn.innerText = "איפוס סימולציה";
                    btn.className = "flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors cursor-pointer";
                }
                return;
            }

            // Step 6: Else branch (for buggy version input = -3)
            if (condStep === 6) {
                document.getElementById('cond-line-6').className = "p-1 rounded bg-emerald-950 text-emerald-300 font-bold";
                explain.innerHTML = `<strong>שלב 6 (סופי):</strong> הגענו לזרוע ה-<code>else</code>.<br>התוצאה המוחזרת היא <strong>'other</strong>.`;
                btn.innerText = "איפוס סימולציה";
                btn.className = "flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors cursor-pointer";
                return;
            }

            // If we click again on finished/reset state:
            resetCondSim();
        }

        // --- Box and Pointer Simulator JS Logic ---
        function drawPairModel(type) {
            const area = document.getElementById('pair-visual-area');
            const explain = document.getElementById('pair-explain-box');
            if (!area || !explain) return;

            const bCons = document.getElementById('btn-pair-cons12');
            const bList = document.getElementById('btn-pair-list12');
            const bNested = document.getElementById('btn-pair-nestedcons');
            if (bCons) bCons.className = type === 'cons12' ? "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer" : "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
            if (bList) bList.className = type === 'list12' ? "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer" : "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
            if (bNested) bNested.className = type === 'nestedcons' ? "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer" : "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";

            if (type === 'cons12') {
                area.innerHTML = `
                    <svg width="220" height="100" viewBox="0 0 220 100" class="max-w-full">
                        <rect x="20" y="30" width="80" height="40" rx="4" fill="white" stroke="#334155" stroke-width="2" />
                        <line x1="60" y1="30" x2="60" y2="70" stroke="#334155" stroke-width="2" />
                        <text x="40" y="55" fill="#1e293b" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">1</text>
                        <circle cx="80" cy="50" r="3" fill="#3b82f6" />
                        <path d="M 80,50 L 140,50" stroke="#3b82f6" stroke-width="2" marker-end="url(#vol1-arrow-pair-blue)" />
                        <rect x="150" y="35" width="30" height="30" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
                        <text x="165" y="55" fill="#1e293b" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">2</text>
                        <defs>
                            <marker id="vol1-arrow-pair-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                            </marker>
                        </defs>
                    </svg>
                `;
                explain.innerHTML = `
                    <strong>ניתוח <code>(cons 1 2)</code>:</strong><br>
                    נוצר תא cons בודד (Cons Cell) בזיכרון:<br>
                    - ה-<strong>car</strong> שלו מכיל את הערך הישיר <code>1</code>.<br>
                    - ה-<strong>cdr</strong> שלו מצביע ישירות אל הערך <code>2</code>.<br>
                    זהו אינו זוג תקין של רשימה, אלא סתם זוג (Dotted Pair). ב-Racket הוא יודפס כ-<code>'(1 . 2)</code>.
                `;
            } else if (type === 'list12') {
                area.innerHTML = `
                    <svg width="340" height="100" viewBox="0 0 340 100" class="max-w-full">
                        <rect x="10" y="30" width="80" height="40" rx="4" fill="white" stroke="#334155" stroke-width="2" />
                        <line x1="50" y1="30" x2="50" y2="70" stroke="#334155" stroke-width="2" />
                        <text x="30" y="55" fill="#1e293b" font-size="14" font-weight="bold" text-anchor="middle">1</text>
                        <circle cx="70" cy="50" r="3" fill="#3b82f6" />
                        <path d="M 70,50 L 120,50" stroke="#3b82f6" stroke-width="2" marker-end="url(#vol1-arrow-pair-blue)" />

                        <rect x="130" y="30" width="80" height="40" rx="4" fill="white" stroke="#334155" stroke-width="2" />
                        <line x1="170" y1="30" x2="170" y2="70" stroke="#334155" stroke-width="2" />
                        <text x="150" y="55" fill="#1e293b" font-size="14" font-weight="bold" text-anchor="middle">2</text>
                        <circle cx="190" cy="50" r="3" fill="#3b82f6" />
                        <line x1="170" y1="70" x2="210" y2="30" stroke="#ef4444" stroke-width="2" />

                        <text x="235" y="55" fill="#ef4444" font-size="12" font-weight="bold" font-family="sans-serif">null</text>
                        
                        <defs>
                            <marker id="vol1-arrow-pair-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                            </marker>
                        </defs>
                    </svg>
                `;
                explain.innerHTML = `
                    <strong>ניתוח <code>(list 1 2)</code> שהוא שקול ל-<code>(cons 1 (cons 2 '()))</code>:</strong><br>
                    זוהי <strong>רשימה מקושרת תקינה</strong> בת 2 איברים:<br>
                    - התא הראשון מחזיק ב-car את <code>1</code>, וב-cdr שלו חץ המצביע לתא הבא.<br>
                    - התא השני מחזיק ב-car את <code>2</code>, וב-cdr שלו יש <code>'()</code> (Null), המסומן באלכסון אדום.<br>
                    ב-Racket מודפס כ-<code>'(1 2)</code>.
                `;
            } else {
                area.innerHTML = `
                    <svg width="280" height="150" viewBox="0 0 280 150" class="max-w-full">
                        <rect x="130" y="20" width="80" height="40" rx="4" fill="white" stroke="#334155" stroke-width="2" />
                        <line x1="170" y1="20" x2="170" y2="60" stroke="#334155" stroke-width="2" />
                        <circle cx="150" cy="40" r="3" fill="#10b981" />
                        <path d="M 150,40 L 150,90" stroke="#10b981" stroke-width="2" marker-end="url(#arrow-pair-green)" />
                        
                        <circle cx="190" cy="40" r="3" fill="#3b82f6" />
                        <path d="M 190,40 L 235,40" stroke="#3b82f6" stroke-width="2" marker-end="url(#vol1-arrow-pair-blue)" />
                        <rect x="245" y="25" width="25" height="25" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
                        <text x="257" y="42" fill="#1e293b" font-size="12" font-weight="bold" text-anchor="middle">3</text>

                        <rect x="110" y="100" width="80" height="40" rx="4" fill="white" stroke="#334155" stroke-width="2" />
                        <line x1="150" y1="100" x2="150" y2="140" stroke="#334155" stroke-width="2" />
                        <text x="130" y="125" fill="#1e293b" font-size="14" font-weight="bold" text-anchor="middle">1</text>
                        <circle cx="170" cy="120" r="3" fill="#3b82f6" />
                        <path d="M 170,120 L 210,120" stroke="#3b82f6" stroke-width="2" marker-end="url(#vol1-arrow-pair-blue)" />
                        <rect x="220" y="105" width="25" height="25" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
                        <text x="232" y="122" fill="#1e293b" font-size="12" font-weight="bold" text-anchor="middle">2</text>

                        <defs>
                            <marker id="vol1-arrow-pair-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                            </marker>
                            <marker id="arrow-pair-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                            </marker>
                        </defs>
                    </svg>
                `;
                explain.innerHTML = `
                    <strong>ניתוח <code>(cons (cons 1 2) 3)</code>:</strong><br>
                    כאן נוצר מבנה מקונן (עץ זוגות):<br>
                    - ה-<strong>car</strong> של התא הראשי אינו ערך פשוט, אלא מצביע <strong>למטה</strong> אל תא cons אחר המייצג את הזוג <code>(cons 1 2)</code>.<br>
                    - ה-<strong>cdr</strong> של התא הראשי מצביע ימינה אל הערך <code>3</code>.<br>
                    שימו לב שקריאה ל-<code>(car (car my-list))</code> תחזיר <code>1</code>.
                `;
            }
        }

        // --- Strict Type Checker JS Logic ---
        function runTypeCheckSim() {
            const bvar = document.getElementById('type-check-bvar').value;
            const bval = document.getElementById('type-check-bval').value;
            const senv = document.getElementById('type-check-senv').value;
            const out = document.getElementById('type-check-output');
            if (!out) return;

            let errors = [];
            let codeBuilt = "(extend-env ";

            if (bvar === 'symbol-x') {
                codeBuilt += "'x ";
            } else {
                codeBuilt += "5 ";
                errors.push("שדה <strong>bvar</strong> קיבל את הערך <code>5</code> אשר אינו מקיים את הפרדיקט <code>symbol?</code>.");
            }

            if (bval === 'exp-10') {
                codeBuilt += "(num-val 10) ";
            } else {
                codeBuilt += "'val ";
                errors.push("שדה <strong>bval</strong> קיבל ערך Scheme גולמי <code>'val</code> אשר אינו מקיים את הפרדיקט <code>expval?</code> (רק Variant של <code>define-datatype expval</code> כמו <code>num-val</code> חוקי).");
            }

            if (senv === 'env-empty') {
                codeBuilt += "(empty-env))";
            } else {
                codeBuilt += "100)";
                errors.push("שדה <strong>saved-env</strong> קיבל את הערך <code>100</code> אשר אינו מקיים את הפרדיקט <code>environment?</code>.");
            }

            if (errors.length > 0) {
                out.innerHTML = `
                    <div class="border-r-4 border-red-500 bg-red-50 p-4 text-right rounded">
                        <span class="text-red-700 font-bold text-base">💥 שגיאת טיפוס חמורה! (Type Violation)</span><br>
                        <p class="font-mono text-xs bg-slate-900 text-red-400 p-2 rounded my-2" dir="ltr">${codeBuilt}</p>
                        <ul class="list-disc list-inside space-y-1.5 text-xs text-red-800 pr-4 mt-2">
                            ${errors.map(err => `<li>${err}</li>`).join('')}
                        </ul>
                        <div class="mt-3 text-xs text-slate-500 font-medium">המערכת דחתה את יצירת האובייקט כדי לשמור על יציבות המפרש (Type Safety).</div>
                    </div>
                `;
            } else {
                out.innerHTML = `
                    <div class="border-r-4 border-emerald-500 bg-emerald-50 p-4 text-right rounded">
                        <span class="text-emerald-700 font-bold text-base">🏆 יצירת האובייקט הושלמה בהצלחה! (Type Safe)</span><br>
                        <p class="font-mono text-xs bg-slate-900 text-emerald-400 p-2 rounded my-2" dir="ltr">${codeBuilt}</p>
                        <div class="text-xs text-slate-700 leading-relaxed">
                            כל הארגומנטים עברו את בדיקת החוזה (Contracts) בהצלחה. נוצר אובייקט זיכרון חוקי ב-Heap.
                        </div>
                    </div>
                `;
            }
        }

        // --- Stack Frame TCO Simulator JS Logic ---
        let tcoStep = 0;
        const normalFrames = [
            [],
            ["(fact 4)"],
            ["(* 4 (fact 3))", "(fact 3)"],
            ["(* 4 (fact 3))", "(* 3 (fact 2))", "(fact 2)"],
            ["(* 4 (fact 3))", "(* 3 (fact 2))", "(* 2 (fact 1))", "(fact 1)"],
            ["(* 4 (fact 3))", "(* 3 (fact 2))", "(* 2 1)"],
            ["(* 4 (fact 3))", "(* 3 2)"],
            ["(* 4 6)"],
            ["24"]
        ];
        const optimizedFrames = [
            [],
            ["(fact-iter 4 1)"],
            ["(fact-iter 3 4) <span class='text-xs text-slate-400 block'>(Frame recycled)</span>"],
            ["(fact-iter 2 12) <span class='text-xs text-slate-400 block'>(Frame recycled)</span>"],
            ["(fact-iter 1 24) <span class='text-xs text-slate-400 block'>(Frame recycled)</span>"],
            ["24"]
        ];

        function resetTcoSim() {
            tcoStep = 0;
            renderTcoSim();
        }

        function stepTcoSim() {
            if (tcoStep < 8) {
                tcoStep++;
                renderTcoSim();
            }
        }

        function renderTcoSim() {
            const normalContainer = document.getElementById('tco-stack-normal');
            const optimizedContainer = document.getElementById('tco-stack-optimized');
            const normalDesc = document.getElementById('tco-desc-normal');
            const optimizedDesc = document.getElementById('tco-desc-optimized');
            const stepBtn = document.getElementById('btn-tco-step');

            if (!normalContainer || !optimizedContainer || !normalDesc || !optimizedDesc || !stepBtn) return;

            stepBtn.className = tcoStep >= 8 ? stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500') : stepBtn.className.replace('bg-slate-400 hover:bg-slate-500', 'bg-emerald-600 hover:bg-emerald-700');
            stepBtn.innerText = tcoStep >= 8 ? "הסתיים" : "בצע צעד (Step)";

            const nFrameSet = normalFrames[tcoStep] || [];
            if (nFrameSet.length === 0) {
                normalContainer.innerHTML = `<span class="text-xs text-slate-400 italic">מחסנית ריקה</span>`;
                normalDesc.innerText = "המפרש מוכן להרצה.";
            } else {
                normalContainer.innerHTML = nFrameSet.map((f, i) => {
                    let color = "bg-red-50 border-red-200 text-red-800";
                    if (i === nFrameSet.length - 1 && tcoStep < 5) color = "bg-yellow-100 border-yellow-300 text-yellow-900 animate-pulse";
                    return `<div class="${color} border p-2 rounded-lg font-mono text-xs w-full text-center shadow-sm">${f}</div>`;
                }).join('');
                normalDesc.innerHTML = `גובה המחסנית: <strong>${nFrameSet.length}</strong>. סיבוכיות זיכרון מקסימלית: <strong class="text-red-600">O(N)</strong>`;
            }

            const optIdx = tcoStep >= 5 ? 5 : tcoStep;
            const oFrameSet = optimizedFrames[optIdx] || [];
            if (oFrameSet.length === 0) {
                optimizedContainer.innerHTML = `<span class="text-xs text-slate-400 italic">מחסנית ריקה</span>`;
                optimizedDesc.innerText = "המפרש מוכן להרצה.";
            } else {
                optimizedContainer.innerHTML = oFrameSet.map((f, i) => {
                    let color = "bg-emerald-50 border-emerald-200 text-emerald-800";
                    if (tcoStep > 0 && tcoStep < 5) color = "bg-yellow-100 border-yellow-300 text-yellow-900 animate-pulse";
                    return `<div class="${color} border p-2 rounded-lg font-mono text-xs w-full text-center shadow-sm">${f}</div>`;
                }).join('');
                optimizedDesc.innerHTML = `גובה המחסנית: <strong>${oFrameSet.length}</strong>. סיבוכיות זיכרון מקסימלית: <strong class="text-emerald-600">O(1) (TCO Active)</strong>`;
            }

            // IP positioning & active line highlight
            const ipNormal = document.getElementById('tco-ip-normal');
            const ipOpt = document.getElementById('tco-ip-opt');

            if (ipNormal) {
                let normalTop = "4px";
                let activeLine = 1;
                if (tcoStep === 1) { normalTop = "22px"; activeLine = 2; }
                else if (tcoStep >= 2 && tcoStep <= 4) { normalTop = "58px"; activeLine = 4; }
                else if (tcoStep === 5) { normalTop = "40px"; activeLine = 3; }
                else if (tcoStep > 5) { normalTop = "58px"; activeLine = 4; }

                ipNormal.style.top = normalTop;
                for (let i = 1; i <= 4; i++) {
                    const el = document.getElementById('tco-code-normal-' + i);
                    if (el) el.className = "py-0.5 px-2 rounded transition-all";
                }
                const el = document.getElementById('tco-code-normal-' + activeLine);
                if (el) el.className = "py-0.5 px-2 rounded transition-all bg-slate-800 text-white font-bold";
            }

            if (ipOpt) {
                let optTop = "4px";
                let activeLine = 1;
                if (optIdx === 1) { optTop = "22px"; activeLine = 2; }
                else if (optIdx >= 2 && optIdx <= 4) { optTop = "58px"; activeLine = 4; }
                else if (optIdx === 5) { optTop = "40px"; activeLine = 3; }

                ipOpt.style.top = optTop;
                for (let i = 1; i <= 4; i++) {
                    const el = document.getElementById('tco-code-opt-' + i);
                    if (el) el.className = "py-0.5 px-2 rounded transition-all";
                }
                const el = document.getElementById('tco-code-opt-' + activeLine);
                if (el) el.className = "py-0.5 px-2 rounded transition-all bg-slate-800 text-white font-bold";
            }
        }

        // --- Polynomial Flattener JS Logic ---
        let flatStep = 0;
        function resetFlattenSim() {
            flatStep = 0;
            renderFlattenTree();
            const exp = document.getElementById('flat-explain-box');
            if (exp) exp.innerHTML = "לחצו על \"שטח ומיין\" כדי לראות את שלבי האלגוריתם.";
            const btn = document.getElementById('btn-flat-step');
            if (btn) {
                btn.innerText = "שטח ומיין (Step)";
                btn.className = btn.className.replace('bg-slate-400 hover:bg-slate-500', 'bg-emerald-600 hover:bg-emerald-700');
            }
        }

        function renderFlattenTree() {
            const area = document.getElementById('flat-tree-area');
            if (!area) return;

            let addNodeColor = "bg-indigo-600 text-white";
            let term1Color = "bg-blue-500 text-white";
            let term2Color = "bg-blue-500 text-white";
            let term3Color = "bg-blue-500 text-white";

            if (flatStep === 1) addNodeColor = "bg-yellow-500 text-slate-900 ring-4 ring-yellow-300 animate-pulse";
            else if (flatStep === 2) term1Color = "bg-yellow-500 text-slate-900 ring-4 ring-yellow-300 animate-pulse";
            else if (flatStep === 3) term2Color = "bg-yellow-500 text-slate-900 ring-4 ring-yellow-300 animate-pulse";
            else if (flatStep === 4) term3Color = "bg-yellow-500 text-slate-900 ring-4 ring-yellow-300 animate-pulse";

            if (flatStep <= 4) {
                area.innerHTML = `
                    <div class="flex flex-col items-center scale-95 transition-all duration-300">
                        <div class="${addNodeColor} font-mono text-xs px-3 py-1.5 rounded-lg font-bold shadow-sm z-10">add-poly</div>
                        <div class="w-40 h-6 border-r-2 border-l-2 border-t-2 border-slate-300 mt-1"></div>
                        
                        <div class="flex gap-4 -mt-1">
                            <div class="${term1Color} font-mono text-xs px-2 py-1.5 rounded shadow-sm">term (coef:3, exp:2)</div>
                            
                            <div class="flex flex-col items-center">
                                <div class="${addNodeColor} font-mono text-xs px-3 py-1.5 rounded-lg font-bold shadow-sm z-10">add-poly</div>
                                <div class="w-32 h-6 border-r-2 border-l-2 border-t-2 border-slate-300 mt-1"></div>
                                <div class="flex gap-4 -mt-1">
                                    <div class="${term2Color} font-mono text-xs px-2 py-1.5 rounded shadow-sm">term (coef:-3, exp:2)</div>
                                    <div class="${term3Color} font-mono text-xs px-2 py-1.5 rounded shadow-sm">term (coef:5, exp:0)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (flatStep === 5) {
                area.innerHTML = `
                    <div class="flex gap-2 items-center justify-center min-h-[100px] font-mono text-xs transition-all duration-500">
                        <div class="bg-blue-600 text-white p-2.5 rounded shadow border border-blue-500 font-bold">[coef:3, exp:2]</div>
                        <span class="text-slate-600 font-bold">+</span>
                        <div class="bg-blue-600 text-white p-2.5 rounded shadow border border-blue-500 font-bold">[coef:-3, exp:2]</div>
                        <span class="text-slate-600 font-bold">+</span>
                        <div class="bg-blue-600 text-white p-2.5 rounded shadow border border-blue-500 font-bold">[coef:5, exp:0]</div>
                    </div>
                `;
            } else if (flatStep === 6) {
                area.innerHTML = `
                    <div class="flex gap-2 items-center justify-center min-h-[100px] font-mono text-xs overflow-hidden">
                        <div id="flat-term-left" class="bg-red-600 text-white p-2.5 rounded shadow border border-red-500 font-bold transition-all duration-1000" style="transform: translateX(0px);">[coef:3, exp:2]</div>
                        <span class="text-slate-600 font-bold transition-opacity duration-1000 opacity-50">+</span>
                        <div id="flat-term-right" class="bg-red-600 text-white p-2.5 rounded shadow border border-red-500 font-bold transition-all duration-1000" style="transform: translateX(0px);">[coef:-3, exp:2]</div>
                        <span class="text-slate-600 font-bold">+</span>
                        <div class="bg-blue-600 text-white p-2.5 rounded shadow border border-blue-500 font-bold">[coef:5, exp:0]</div>
                    </div>
                `;
                setTimeout(() => {
                    const left = document.getElementById('flat-term-left');
                    const right = document.getElementById('flat-term-right');
                    if (left && right) {
                        left.style.transform = "translateX(25px) scale(0)";
                        left.style.opacity = "0";
                        right.style.transform = "translateX(-25px) scale(0)";
                        right.style.opacity = "0";
                    }
                }, 100);
            } else if (flatStep === 7) {
                area.innerHTML = `
                    <div class="flex gap-2 items-center justify-center min-h-[100px] font-mono text-xs transition-all duration-500">
                        <div class="bg-emerald-600 text-white p-3 rounded-lg shadow-md border border-emerald-500 font-bold text-sm transform scale-110 animate-bounce">[coef:5, exp:0]</div>
                    </div>
                `;
            }
        }

        function stepFlattenSim() {
            const explain = document.getElementById('flat-explain-box');
            const btn = document.getElementById('btn-flat-step');
            if (!explain || !btn) return;

            if (flatStep >= 7) {
                resetFlattenSim();
                return;
            }

            flatStep++;
            renderFlattenTree();

            if (flatStep === 1) {
                explain.innerHTML = `<strong>שלב 1: התחלת סריקה</strong><br>האלגוריתם מתחיל בראש עץ הפולינום <code>3x^2 + (-3x^2) + 5</code> (שורש <code>add-poly</code>) ומתכונן לבצע סריקה רקורסיבית (DFS).`;
            } else if (flatStep === 2) {
                explain.innerHTML = `<strong>שלב 2: איסוף איבר ראשון</strong><br>המשתמש מגיע לענף השמאלי <code>term (coef:3, exp:2)</code>.<br>הוא אוסף אותו לרשימה השטוחה.<br>רשימה זמנית: <code class="bg-slate-900 text-yellow-300 px-2 py-1 rounded font-bold font-mono text-xs">[3x^2]</code>.`;
            } else if (flatStep === 3) {
                explain.innerHTML = `<strong>שלב 3: איסוף איבר שני</strong><br>המפרש עובר לענף הימני המקונן, ומגיע ל-<code>term (coef:-3, exp:2)</code>.<br>הוא שולף ומצרף אותו.<br>רשימה זמנית: <code class="bg-slate-900 text-yellow-300 px-2 py-1 rounded font-bold font-mono text-xs">[3x^2, -3x^2]</code>.`;
            } else if (flatStep === 4) {
                explain.innerHTML = `<strong>שלב 4: איסוף איבר שלישי</strong><br>המפרש מסיים בענף האחרון <code>term (coef:5, exp:0)</code>.<br>הוא אוסף את הקבוע <code>5</code>.<br>הסריקה הסתיימה! הרשימה השטוחה המלאה: <code class="bg-slate-900 text-yellow-300 px-2 py-1 rounded font-bold font-mono text-xs">[3x^2, -3x^2, 5]</code>.`;
            } else if (flatStep === 5) {
                explain.innerHTML = `<strong>שלב 5: מיון הרשימה לפי מעריכים</strong><br>כעת, המערכת מריצה <code>sort</code> ומציבה את האיברים הדומים זה לצד זה.<br>רשימה ממוינת זמנית: <code class="bg-slate-900 text-yellow-300 px-2 py-1 rounded font-bold font-mono text-xs">[3x^2, -3x^2, 5]</code>.`;
            } else if (flatStep === 6) {
                explain.innerHTML = `<strong>שלב 6: צמצום וכינוס איברים (Algebraic Annihilation)</strong><br>המפרש מזהה שני איברים בעלי מעריך זהה <code>exp:2</code> ומבצע פעולת חיבור למקדמים שלהם:<br><code>3x^2 + (-3x^2) = 0x^2 = 0</code>.<br>שני האיברים מתנגשים, מאפסים זה את זה ונמחקים לחלוטין!`;
            } else if (flatStep === 7) {
                explain.innerHTML = `<strong>שלב 7: תוצאה סופית מפושטת</strong><br>האיברים המנוגדים נעלמו לחלוטין! הרשימה הסופית הממוינת מכילה איבר יחיד:<br><code class="bg-slate-900 text-emerald-400 px-2 py-1 rounded font-bold font-mono text-sm">[5]</code>.<br>הפולינום צומצם לקבוע 5.`;
                btn.innerText = "הסתיים (לחץ לאיפוס)";
                btn.className = btn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
            }
        }

        // --- Token Conveyor Belt Simulator JS Logic ---
        let lexerTimeout = null;

        function runLexerSim() {
            if (lexerTimeout) clearTimeout(lexerTimeout);
            const codeInput = document.getElementById('lexer-input-code');
            const belt = document.getElementById('lexer-belt-view');
            const explain = document.getElementById('lexer-explain-box');
            if (!codeInput || !belt || !explain) return;

            const text = codeInput.value;
            if (!text.trim()) {
                belt.innerHTML = `<span class="text-red-400 italic text-sm">הקלט ריק!</span>`;
                return;
            }

            const states = ['start', 'letter', 'digit', 'op', 'comment'];
            states.forEach(s => {
                const el = document.getElementById(`lex-state-${s}`);
                if (el) el.className = "px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400 font-bold transition-all";
            });

            let steps = [];
            let tokens = [];
            let i = 0;
            let n = text.length;

            while (i < n) {
                let char = text[i];

                if (/\s/.test(char)) {
                    steps.push({
                        charIndex: i,
                        char: char,
                        state: 'start',
                        explain: `<strong>תו רווח (Whitespace):</strong> הלקסר קורא רווח במצב Start ומדלג עליו.`,
                        tokens: [...tokens]
                    });
                    i++;
                    continue;
                }

                if (char === '%' || (char === '/' && i + 1 < n && text[i + 1] === '/')) {
                    let val = "";
                    let isSlash = (char === '/');

                    if (isSlash) {
                        val += "//";
                        steps.push({
                            charIndex: i,
                            char: "/",
                            state: 'comment',
                            explain: `<strong>זיהוי הערה:</strong> התו <code>/</code> השני יוצר רצף <code>//</code>. מעבר למצב Comment.`,
                            tokens: [...tokens]
                        });
                        i += 2;
                    } else {
                        val += "%";
                        steps.push({
                            charIndex: i,
                            char: "%",
                            state: 'comment',
                            explain: `<strong>זיהוי הערה:</strong> התו <code>%</code> מתחיל הערה לפי הגדרת SLLGen. מעבר למצב Comment.`,
                            tokens: [...tokens]
                        });
                        i++;
                    }

                    while (i < n && text[i] !== '\n' && text[i] !== '\r') {
                        val += text[i];
                        steps.push({
                            charIndex: i,
                            char: text[i],
                            state: 'comment',
                            explain: `<strong>תו בתוך הערה:</strong> התו <code>${text[i]}</code> נסרק כחלק מההערה. הלקסר מתעלם.`,
                            tokens: [...tokens]
                        });
                        i++;
                    }
                    continue;
                }

                if (char === '=') {
                    steps.push({
                        charIndex: i,
                        char: char,
                        state: 'op',
                        explain: `<strong>אופרטור:</strong> התו <code>=</code> מתקבל. מעבר למצב Op.`,
                        tokens: [...tokens, { type: 'operator', val: '=' }]
                    });
                    tokens.push({ type: 'operator', val: '=' });
                    i++;
                    continue;
                }

                if (/[a-zA-Z_]/.test(char)) {
                    let val = char;
                    steps.push({
                        charIndex: i,
                        char: char,
                        state: 'letter',
                        explain: `<strong>אות ראשונה:</strong> התו <code>${char}</code> מתחיל מזהה (Identifier). מעבר למצב Letter.`,
                        tokens: [...tokens]
                    });
                    i++;

                    while (i < n && /[a-zA-Z0-9_\-\?]/.test(text[i])) {
                        val += text[i];
                        steps.push({
                            charIndex: i,
                            char: text[i],
                            state: 'letter',
                            explain: `<strong>המשך מזהה (שם):</strong> התו <code>${text[i]}</code> חוקי במצב Letter. נשאר במצב Letter.`,
                            tokens: [...tokens]
                        });
                        i++;
                    }

                    let isKeyword = (val === 'let');
                    let tokenType = isKeyword ? 'keyword' : 'identifier';
                    let label = isKeyword ? 'keyword (מילת מפתח)' : 'identifier (מזהה)';

                    steps.push({
                        charIndex: i - 1,
                        char: text[i - 1],
                        state: 'start',
                        explain: `<strong>יצירת אסימון:</strong> המילה <code>${val}</code> הושלמה. נוצר אסימון מסוג <strong>${label}</strong>. חוזר ל-Start.`,
                        tokens: [...tokens, { type: tokenType, val: val }]
                    });
                    tokens.push({ type: tokenType, val: val });
                    continue;
                }

                if (/[0-9]/.test(char)) {
                    let val = char;
                    steps.push({
                        charIndex: i,
                        char: char,
                        state: 'digit',
                        explain: `<strong>ספרה ראשונה:</strong> התו <code>${char}</code> מתחיל מספר. מעבר למצב Digit.`,
                        tokens: [...tokens]
                    });
                    i++;

                    while (i < n && /[0-9]/.test(text[i])) {
                        val += text[i];
                        steps.push({
                            charIndex: i,
                            char: text[i],
                            state: 'digit',
                            explain: `<strong>המשך ספרה:</strong> התו <code>${text[i]}</code> הוא ספרה. נשאר במצב Digit.`,
                            tokens: [...tokens]
                        });
                        i++;
                    }

                    steps.push({
                        charIndex: i - 1,
                        char: text[i - 1],
                        state: 'start',
                        explain: `<strong>יצירת אסימון מספר:</strong> המספר <code>${val}</code> הושלם. נוצר אסימון מסוג <strong>number</strong>. חוזר ל-Start.`,
                        tokens: [...tokens, { type: 'number', val: val }]
                    });
                    tokens.push({ type: 'number', val: val });
                    continue;
                }

                steps.push({
                    charIndex: i,
                    char: char,
                    state: 'start',
                    explain: `<strong>תו בודד/לא מוכר:</strong> התו <code>${char}</code> מסווג כאסימון בודד/שגיאה.`,
                    tokens: [...tokens, { type: 'other', val: char }]
                });
                tokens.push({ type: 'other', val: char });
                i++;
            }

            let stepIdx = 0;
            function processNextToken() {
                if (stepIdx >= steps.length) {
                    const finalTokens = tokens.filter(t => t.type !== 'whitespace');

                    belt.innerHTML = finalTokens.map(t => {
                        let badge = "bg-blue-900 border-blue-700 text-blue-100";
                        if (t.type === 'number') badge = "bg-emerald-900 border-emerald-700 text-emerald-100";
                        else if (t.type === 'keyword') badge = "bg-purple-900 border-purple-700 text-purple-100";
                        else if (t.type === 'operator') badge = "bg-rose-900 border-rose-700 text-rose-100";
                        return `<div class="${badge} border px-3 py-1.5 rounded-lg text-xs font-bold text-center shadow-md animate-bounce">[${t.type.toUpperCase()}: ${t.val}]</div>`;
                    }).join(' <span class="text-slate-600 font-bold">→</span> ');

                    states.forEach(s => {
                        const el = document.getElementById(`lex-state-${s}`);
                        if (el) el.className = "px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400 font-bold transition-all";
                    });
                    const startEl = document.getElementById('lex-state-start');
                    if (startEl) startEl.className = "px-2 py-1 rounded bg-yellow-500 text-slate-900 ring-2 ring-yellow-400 font-bold scale-110 transition-all";

                    explain.className = "mt-4 p-3 rounded-lg text-xs text-center bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold";
                    explain.innerHTML = `🏆 הלקסינג הושלם בהצלחה! התוצרים מוכנים להעברה לפרסר. נותרו רק <strong>${finalTokens.length}</strong> אסימונים.`;
                    return;
                }

                const currentStep = steps[stepIdx];

                let textPreview = "";
                for (let k = 0; k < text.length; k++) {
                    if (k === currentStep.charIndex) {
                        textPreview += `<span class="bg-yellow-400 text-slate-900 px-1 rounded font-bold ring-2 ring-yellow-300 animate-pulse">${text[k] === ' ' ? '&nbsp;' : text[k]}</span>`;
                    } else {
                        textPreview += text[k] === ' ' ? '&nbsp;' : text[k];
                    }
                }

                let currentTokensHtml = currentStep.tokens.map(t => {
                    let badge = "border-slate-700 text-slate-300";
                    if (t.type === 'keyword') badge = "border-purple-800 text-purple-300 bg-purple-950/20";
                    else if (t.type === 'number') badge = "border-emerald-800 text-emerald-300 bg-emerald-950/20";
                    else if (t.type === 'operator') badge = "border-rose-800 text-rose-300 bg-rose-950/20";
                    return `<div class="${badge} border px-2 py-1 rounded text-xs text-center">${t.val}</div>`;
                }).join(' <span class="text-slate-700 font-bold">➔</span> ');

                belt.innerHTML = `
                    <div class="w-full flex flex-col gap-3">
                        <div class="text-xs text-slate-400 mb-1 border-b border-slate-800 pb-1" dir="rtl">קלט נסרק:</div>
                        <div class="font-mono text-sm text-left bg-slate-900/60 p-2 rounded border border-slate-850 self-start" dir="ltr">
                            ${textPreview}
                        </div>
                        <div class="text-xs text-slate-400 mt-2 border-b border-slate-800 pb-1" dir="rtl">מסוע אסימונים (Conveyor Belt):</div>
                        <div class="flex items-center gap-2 flex-wrap min-h-[40px]">
                            ${currentTokensHtml || '<span class="text-slate-600 italic">אין אסימונים עדיין</span>'}
                        </div>
                    </div>
                `;

                states.forEach(s => {
                    const el = document.getElementById(`lex-state-${s}`);
                    if (el) el.className = "px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400 font-bold transition-all";
                });

                const activeStateEl = document.getElementById(`lex-state-${currentStep.state}`);
                if (activeStateEl) {
                    activeStateEl.className = "px-2 py-1 rounded bg-yellow-500 text-slate-900 ring-2 ring-yellow-400 font-bold scale-110 transition-all";
                }

                explain.className = "mt-4 p-3 rounded-lg text-xs text-slate-600 border border-slate-100 bg-slate-50";
                explain.innerHTML = currentStep.explain;

                stepIdx++;
                lexerTimeout = setTimeout(processNextToken, 1000);
            }

            processNextToken();
        }

        // --- Closure Router JS Logic ---
        let closureTimeout = null;

        function resetClosureRouter() {
            if (closureTimeout) clearTimeout(closureTimeout);
            const area = document.getElementById('closure-router-area');
            const explain = document.getElementById('closure-explain-box');
            if (!area || !explain) return;

            area.innerHTML = `
                <div id="clos-env3" class="border border-slate-700 bg-slate-900 rounded-lg p-3 w-28 text-center text-xs font-mono text-slate-400">
                    <div class="font-bold text-white mb-1">Env3 Closure</div>
                    (x = 3)
                </div>
                <span class="text-slate-700 font-bold">➔</span>
                <div id="clos-env2" class="border border-slate-700 bg-slate-900 rounded-lg p-3 w-28 text-center text-xs font-mono text-slate-400">
                    <div class="font-bold text-white mb-1">Env2 Closure</div>
                    (y = 2)
                </div>
                <span class="text-slate-700 font-bold">➔</span>
                <div id="clos-env1" class="border border-slate-700 bg-slate-900 rounded-lg p-3 w-28 text-center text-xs font-mono text-slate-400">
                    <div class="font-bold text-white mb-1">Env1 Closure</div>
                    (x = 1)
                </div>
                <span class="text-slate-700 font-bold">➔</span>
                <div id="clos-empty" class="border border-slate-800 bg-slate-950 rounded-lg p-3 w-24 text-center text-xs font-mono text-slate-600">
                    empty-env
                </div>
            `;
            explain.innerHTML = "לחצו על חיפוש משתנה כדי להתחיל לשלוח הודעות לקופסאות הסביבה.";
        }

        function routeClosure(variable) {
            resetClosureRouter();
            const explain = document.getElementById('closure-explain-box');
            if (!explain) return;

            explain.innerHTML = `<strong>שלב 1:</strong> שליחת שאילתה <code>(apply-env env3 '${variable})</code>.<br>ההודעה <code>'${variable}</code> נשלחת ל-<strong>Env3 Closure</strong>.`;
            document.getElementById('clos-env3').className = "border border-yellow-500 bg-slate-900 rounded-lg p-3 w-28 text-center text-xs font-mono text-yellow-400 ring-2 ring-yellow-400 animate-pulse";

            closureTimeout = setTimeout(() => {
                if (variable === 'x') {
                    document.getElementById('clos-env3').className = "border border-emerald-500 bg-slate-900 rounded-lg p-3 w-28 text-center text-xs font-mono text-emerald-400 ring-2 ring-emerald-500";
                    explain.innerHTML = `<strong>שלב 2:</strong> <strong>Env3 Closure</strong> מזהה פנימית את המשתנה <code>x</code>.<br>היא מחזירה מיד את הערך <strong>3</strong> ומסיימת את הניתוב בהצלחה!<br><span class="text-emerald-600 font-bold">שימו לב:</span> <code>x=1</code> שנמצא עמוק יותר בסביבה מוסתר לחלוטין.`;
                } else {
                    document.getElementById('clos-env3').className = "border border-red-500 bg-slate-900 rounded-lg p-3 w-28 text-center text-xs font-mono text-red-400";
                    explain.innerHTML = `<strong>שלב 2:</strong> <strong>Env3 Closure</strong> לא מכיל את <code>${variable}</code>.<br>היא משגרת את השאילתה אל פונקציית הכישלון (המצביעה ל-<strong>Env2 Closure</strong>)...`;
                    document.getElementById('clos-env2').className = "border border-yellow-500 bg-slate-900 rounded-lg p-3 w-28 text-center text-xs font-mono text-yellow-400 ring-2 ring-yellow-400 animate-pulse";

                    closureTimeout = setTimeout(() => {
                        if (variable === 'y') {
                            document.getElementById('clos-env2').className = "border border-emerald-500 bg-slate-900 rounded-lg p-3 w-28 text-center text-xs font-mono text-emerald-400 ring-2 ring-emerald-500";
                            explain.innerHTML = `<strong>שלב 3:</strong> <strong>Env2 Closure</strong> מזהה את המשתנה <code>y</code> ומחזירה את הערך <strong>2</strong> בהצלחה!`;
                        } else {
                            document.getElementById('clos-env2').className = "border border-red-500 bg-slate-900 rounded-lg p-3 w-28 text-center text-xs font-mono text-red-400";
                            explain.innerHTML = `<strong>שלב 3:</strong> <strong>Env2 Closure</strong> לא מכיל את <code>${variable}</code>.<br>היא משגרת את השאילתה הלאה אל פונקציית הכישלון הבאה (<strong>Env1 Closure</strong>)...`;
                            document.getElementById('clos-env1').className = "border border-yellow-500 bg-slate-900 rounded-lg p-3 w-28 text-center text-xs font-mono text-yellow-400 ring-2 ring-yellow-400 animate-pulse";

                            closureTimeout = setTimeout(() => {
                                document.getElementById('clos-env1').className = "border border-red-500 bg-slate-900 rounded-lg p-3 w-28 text-center text-xs font-mono text-red-400";
                                explain.innerHTML = `<strong>שלב 4:</strong> <strong>Env1 Closure</strong> מכיל רק את <code>x</code> ולא את <code>z</code>.<br>היא משגרת את השאילתה אל סביבת הבסיס <strong>empty-env</strong>...`;
                                document.getElementById('clos-empty').className = "border border-red-500 bg-slate-955 rounded-lg p-3 w-24 text-center text-xs font-mono text-red-400 ring-2 ring-red-500 animate-pulse";

                                closureTimeout = setTimeout(() => {
                                    explain.innerHTML = `
                                        <div class="border-r-4 border-red-500 bg-red-50 p-3 text-red-800 rounded">
                                            <strong>שגיאת חיפוש! (Lookup Error):</strong><br>
                                            הגענו ל-<code>empty-env</code> אשר תמיד זורקת שגיאה: <code>(eopl:error 'apply-env "Unbound variable ~s" '${variable})</code>.
                                        </div>
                                    `;
                                }, 1500);
                            }, 1500);
                        }
                    }, 1500);
                }
            }, 1500);
        }

        // --- De Bruijn Translator Grid JS Logic ---
        let dbWrapped = false;
        let dbRippleTimeouts = [];

        function clearDeBruijn() {
            dbRippleTimeouts.forEach(clearTimeout);
            dbRippleTimeouts = [];

            const srcX = document.getElementById('vol1-db-src-x');
            const srcA = document.getElementById('vol1-db-src-a');
            const explain = document.getElementById('debruijn-explain-box');

            if (srcX) {
                srcX.className = "transition-all duration-300 px-1 rounded text-blue-300 bg-blue-900/40";
            }
            if (srcA) {
                srcA.className = "transition-all duration-300 px-1 rounded text-emerald-300 bg-emerald-900/40";
            }
            if (explain) {
                explain.innerHTML = "רחפו מעל אחד מביטויי ה-<code>%lexref</code> בקוד המתורגם כדי לראות את שלבי המיפוי של הרדאר הלקסיקלי.";
            }

            ['outer', 'inner', 'innermost'].forEach(scope => {
                const el = document.getElementById(`db-scope-${scope}`);
                if (el) {
                    el.classList.remove('ripple-blue', 'ripple-green', 'ripple-purple');
                }
            });
        }

        function inspectDeBruijn(depth, pos) {
            clearDeBruijn();

            const srcX = document.getElementById('vol1-db-src-x');
            const srcA = document.getElementById('vol1-db-src-a');
            const explain = document.getElementById('debruijn-explain-box');

            const scopeOuter = document.getElementById('vol1-db-scope-outer');
            const scopeInner = document.getElementById('vol1-db-scope-inner');
            const scopeInnermost = document.getElementById('db-scope-innermost');

            if (!explain) return;

            function triggerBorderRipple(el, rippleClass) {
                if (el) {
                    el.classList.remove('ripple-blue', 'ripple-green', 'ripple-purple');
                    void el.offsetWidth;
                    el.classList.add(rippleClass);
                }
            }

            if (!dbWrapped) {
                if (depth === 0 && pos === 0) {
                    if (srcA) srcA.className = "transition-colors px-2 py-0.5 rounded bg-emerald-600 text-white font-bold ring-2 ring-emerald-400 transform scale-110";
                    triggerBorderRipple(scopeInner, 'ripple-green');

                    explain.innerHTML = `
                        <strong>ניתוח קואורדינטה <code>%lexref 0 0</code> (מצביעה למשתנה <code>a</code>):</strong><br>
                        - <strong>עומק 0 (Depth = 0):</strong> המשתנה מוגדר בסביבה הנוכחית המיידית (Scope 0). גל המכ"ם הלקסיקלי חוצה <strong>0 גבולות סביבה</strong> מחוץ לתחום הנוכחי.<br>
                        - <strong>מיקום 0 (Position = 0):</strong> זהו האיבר הראשון ברשימת הפרמטרים של למדא זו <code>(a)</code>, שהוא המשתנה <strong>a</strong>.
                    `;
                } else if (depth === 1 && pos === 0) {
                    if (srcX) srcX.className = "transition-colors px-2 py-0.5 rounded bg-blue-600 text-white font-bold ring-2 ring-blue-400 transform scale-110";

                    triggerBorderRipple(scopeInner, 'ripple-green');
                    dbRippleTimeouts.push(setTimeout(() => {
                        triggerBorderRipple(scopeOuter, 'ripple-blue');
                    }, 250));

                    explain.innerHTML = `
                        <strong>ניתוח קואורדינטה <code>%lexref 1 0</code> (מצביעה למשתנה <code>x</code>):</strong><br>
                        - <strong>עומק 1 (Depth = 1):</strong> גל המכ"ם הלקסיקלי יוצא מ-Scope 0, חוצה <strong>גבול סביבה אחד (Scope 1)</strong> אל הלמדא החיצונית ביותר.<br>
                        - <strong>מיקום 0 (Position = 0):</strong> המפרש לוקח את האיבר באינדקס 0 מרשימת הפרמטרים של למדא זו <code>(x y)</code>, שהוא המשתנה <strong>x</strong>!<br>
                        בזכות המיפוי הדו-ממדי הזה, המפרש מגיע ישר לתא הזיכרון המתאים ב-<code>O(1)</code> ללא חיפוש שם.
                    `;
                }
            } else {
                if (depth === 1 && pos === 0) {
                    if (srcA) srcA.className = "transition-colors px-2 py-0.5 rounded bg-emerald-600 text-white font-bold ring-2 ring-emerald-400 transform scale-110";

                    triggerBorderRipple(scopeInnermost, 'ripple-purple');
                    dbRippleTimeouts.push(setTimeout(() => {
                        triggerBorderRipple(scopeInner, 'ripple-green');
                    }, 250));

                    explain.innerHTML = `
                        <strong>ניתוח קואורדינטה <code>%lexref 1 0</code> במצב עטוף (מצביעה למשתנה <code>a</code>):</strong><br>
                        - <strong>עומק 1 (Depth = 1):</strong> בגלל העטיפה של <code>(lambda (z))</code>, המשתנה <code>a</code> רחוק כעת בסביבה אחת מחוץ לקריאה שלו. גל המכ"ם חוצה <strong>גבול סביבה אחד (Scope 0)</strong> כדי למצוא את <code>a</code> ב-Scope 1.<br>
                        - <strong>מיקום 0 (Position = 0):</strong> המשתנה הראשון ב-Scope 1 <code>(a)</code>, שהוא המשתנה <strong>a</strong>.
                    `;
                } else if (depth === 2 && pos === 0) {
                    if (srcX) srcX.className = "transition-colors px-2 py-0.5 rounded bg-blue-600 text-white font-bold ring-2 ring-blue-400 transform scale-110";

                    triggerBorderRipple(scopeInnermost, 'ripple-purple');
                    dbRippleTimeouts.push(setTimeout(() => {
                        triggerBorderRipple(scopeInner, 'ripple-green');
                    }, 250));
                    dbRippleTimeouts.push(setTimeout(() => {
                        triggerBorderRipple(scopeOuter, 'ripple-blue');
                    }, 500));

                    explain.innerHTML = `
                        <strong>ניתוח קואורדינטה <code>%lexref 2 0</code> במצב עטוף (מצביעה למשתנה <code>x</code>):</strong><br>
                        - <strong>עומק 2 (Depth = 2):</strong> הוספת המעטפת הלקסיקלית הפנימית <code>(lambda (z))</code> העמיקה את המרחק הלקסיקלי אל <code>x</code>.<br>
                        - גל המכ"ם חוצה <strong>שני גבולות סביבה</strong> (Scope 0 ו-Scope 1) לפני שהוא מגיע ל-Scope 2 בו מוגדר <code>x</code>.<br>
                        - <strong>מיקום 0:</strong> המשתנה הראשון ב-Scope 2 <code>(x y)</code>, שהוא <strong>x</strong>.
                    `;
                }
            }
        }

        function updateDeBruijnView() {
            const srcArea = document.getElementById('debruijn-src');
            const transArea = document.getElementById('debruijn-trans');
            const btn = document.getElementById('btn-db-wrap');
            if (!srcArea || !transArea) return;

            if (dbWrapped) {
                if (btn) {
                    btn.innerHTML = "<span>הסר מעטפת פונקציה</span>";
                    btn.className = "bg-rose-600 hover:bg-rose-700 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95";
                }

                srcArea.innerHTML = `
<div class="space-y-1">
  <div id="vol1-db-scope-outer" class="border border-blue-400/30 bg-blue-500/5 p-3 rounded-lg transition-all duration-300 relative">
    <div class="absolute top-1 left-2 text-[9px] text-blue-400 font-sans">Scope 2 (lambda (x y))</div>
    <div class="text-blue-300 font-bold mb-1">(lambda (x y)</div>
    
    <div id="vol1-db-scope-inner" class="border border-emerald-400/30 bg-emerald-500/5 p-3 rounded-lg transition-all duration-300 relative ml-4 my-2">
      <div class="absolute top-1 left-2 text-[9px] text-emerald-400 font-sans">Scope 1 (lambda (a))</div>
      <div class="text-emerald-300 font-bold mb-1">(lambda (a)</div>
      
      <div id="db-scope-innermost" class="border border-purple-400/30 bg-purple-500/5 p-3 rounded-lg transition-all duration-300 relative ml-4 my-2">
        <div class="absolute top-1 left-2 text-[9px] text-purple-400 font-sans">Scope 0 (lambda (z))</div>
        <div class="text-purple-300 font-bold mb-1">(lambda (z)</div>
        
        <div class="ml-4 font-mono text-slate-300">
          (+ <span id="vol1-db-src-x" class="transition-all duration-300 px-1 rounded text-blue-300 bg-blue-900/40">x</span> 
             <span id="vol1-db-src-a" class="transition-all duration-300 px-1 rounded text-emerald-300 bg-emerald-900/40">a</span>)
        </div>
        <div class="text-purple-300 font-bold mt-1">)</div>
      </div>
      <div class="text-emerald-300 font-bold">)</div>
    </div>
    <div class="text-blue-300 font-bold">)</div>
  </div>
</div>
                `;

                transArea.innerHTML = `
<div>
  (nameless-lambda<br>
  &nbsp;&nbsp;(nameless-lambda<br>
  &nbsp;&nbsp;&nbsp;&nbsp;(nameless-lambda<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(+ <span id="db-ref-2-0" class="border-b border-blue-400 font-bold text-blue-300 cursor-help px-1 bg-slate-800 rounded hover:bg-blue-900 transition-colors" onmouseover="inspectDeBruijn(2, 0)" onmouseout="clearDeBruijn()">%lexref 2 0</span> 
         <span id="vol1-db-ref-1-0" class="border-b border-emerald-400 font-bold text-emerald-300 cursor-help px-1 bg-slate-800 rounded hover:bg-emerald-900 transition-colors" onmouseover="inspectDeBruijn(1, 0)" onmouseout="clearDeBruijn()">%lexref 1 0</span>))))
</div>
                `;
            } else {
                if (btn) {
                    btn.innerHTML = "<span>עטוף בפונקציה נוספת (lambda (z))</span>";
                    btn.className = "bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95";
                }

                srcArea.innerHTML = `
<div class="space-y-1">
  <div id="vol1-db-scope-outer" class="border border-blue-400/30 bg-blue-500/5 p-3 rounded-lg transition-all duration-300 relative">
    <div class="absolute top-1 left-2 text-[9px] text-blue-400 font-sans">Scope 1 (lambda (x y))</div>
    <div class="text-blue-300 font-bold mb-1">(lambda (x y)</div>
    
    <div id="vol1-db-scope-inner" class="border border-emerald-400/30 bg-emerald-500/5 p-3 rounded-lg transition-all duration-300 relative ml-4 my-2">
      <div class="absolute top-1 left-2 text-[9px] text-emerald-400 font-sans">Scope 0 (lambda (a))</div>
      <div class="text-emerald-300 font-bold mb-1">(lambda (a)</div>
      
      <div class="ml-4 font-mono text-slate-300">
        (+ <span id="vol1-db-src-x" class="transition-all duration-300 px-1 rounded text-blue-300 bg-blue-900/40">x</span> 
           <span id="vol1-db-src-a" class="transition-all duration-300 px-1 rounded text-emerald-300 bg-emerald-900/40">a</span>)
      </div>
      <div class="text-emerald-300 font-bold mt-1">)</div>
    </div>
    <div class="text-blue-300 font-bold">)</div>
  </div>
</div>
                `;

                transArea.innerHTML = `
<div>
  (nameless-lambda<br>
  &nbsp;&nbsp;(nameless-lambda<br>
  &nbsp;&nbsp;&nbsp;&nbsp;(+ <span id="vol1-db-ref-1-0" class="border-b border-blue-400 font-bold text-blue-300 cursor-help px-1 bg-slate-800 rounded hover:bg-blue-900 transition-colors" onmouseover="inspectDeBruijn(1, 0)" onmouseout="clearDeBruijn()">%lexref 1 0</span> 
     <span id="db-ref-0-0" class="border-b border-emerald-400 font-bold text-emerald-300 cursor-help px-1 bg-slate-800 rounded hover:bg-emerald-900 transition-colors" onmouseover="inspectDeBruijn(0, 0)" onmouseout="clearDeBruijn()">%lexref 0 0</span>)))
</div>
                `;
            }
            clearDeBruijn();
        }

        function toggleDeBruijnWrap() {
            dbWrapped = !dbWrapped;
            updateDeBruijnView();
        }

  /* --- Global Exports --- */
window.setAstDemo = setAstDemo;
window.lookupEnv = lookupEnv;
window.setFuncSim = setFuncSim;
window.resetFuncSim = resetFuncSim;
window.renderFuncList = renderFuncList;
window.stepFuncSim = stepFuncSim;
window.dispatchShape = dispatchShape;
window.stepPrefixEval = stepPrefixEval;
window.addPrefixToken = addPrefixToken;
window.clearLastPrefixToken = clearLastPrefixToken;
window.resetPrefixSim = resetPrefixSim;
window.renderPrefixSim = renderPrefixSim;
window.setScopeMode = setScopeMode;
window.renderScopeCode = renderScopeCode;
window.renderScopeEnvVisualizer = renderScopeEnvVisualizer;
window.inspectScope = inspectScope;
window.clearScopeInspect = clearScopeInspect;
window.updateCondCodePreview = updateCondCodePreview;
window.resetCondSimColors = resetCondSimColors;
window.resetCondSim = resetCondSim;
window.stepCondSim = stepCondSim;
window.drawPairModel = drawPairModel;
window.runTypeCheckSim = runTypeCheckSim;
window.resetTcoSim = resetTcoSim;
window.stepTcoSim = stepTcoSim;
window.renderTcoSim = renderTcoSim;
window.resetFlattenSim = resetFlattenSim;
window.renderFlattenTree = renderFlattenTree;
window.stepFlattenSim = stepFlattenSim;
window.runLexerSim = runLexerSim;
window.processNextToken = processNextToken;
window.resetClosureRouter = resetClosureRouter;
window.routeClosure = routeClosure;
window.clearDeBruijn = clearDeBruijn;
window.inspectDeBruijn = inspectDeBruijn;
window.triggerBorderRipple = triggerBorderRipple;
window.updateDeBruijnView = updateDeBruijnView;
window.toggleDeBruijnWrap = toggleDeBruijnWrap;
}



/* ==============================================
   VOLUME 2 SCOPED SIMULATORS
   ============================================== */
{
function showTab_old(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav'));
            
            document.getElementById(tabId).classList.add('active');
            document.getElementById('btn-' + tabId).classList.add('active-nav');
            
            document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
        }

        // --- Lexical Address Visualizer JS Logic ---
        function highlightLex(variable) {
            const lineX = document.getElementById('lex-line-x');
            const lineY = document.getElementById('lex-line-y');
            const lineZ = document.getElementById('lex-line-z');
            const senvZ = document.getElementById('senv-z');
            const senvY = document.getElementById('senv-y');
            const senvX = document.getElementById('senv-x');
            const explain = document.getElementById('lex-explain-box');
            
            if (!explain) return;
            
            clearLex();
            
            if (variable === 'x') {
                if (lineX) lineX.className += ' bg-red-950 text-red-200';
                if (senvX) senvX.className = senvX.className.replace('border-slate-200', 'border-red-500 bg-red-50');
                explain.innerHTML = `המשתנה <strong>x</strong> נמצא בסביבה הסטטית במרחק של <strong>2 שלבים</strong> (אינדקס 2).<br>הקומפיילר יחליף אותו ב: <code>(nameless-var-exp 2)</code>.`;
            } else if (variable === 'z') {
                if (lineZ) lineZ.className += ' bg-emerald-950 text-emerald-200';
                if (senvZ) senvZ.className = senvZ.className.replace('border-slate-200', 'border-emerald-500 bg-emerald-50');
                explain.innerHTML = `המשתנה <strong>z</strong> הוא הפנימי ביותר (הוגדר אחרון), לכן הוא ממוקם בראש המחסנית.<br>מרחקו הוא <strong>0 שלבים</strong> (אינדקס 0). מוחלף ב: <code>(nameless-var-exp 0)</code>.`;
            }
        }

        function clearLex() {
            const lineX = document.getElementById('lex-line-x');
            const lineY = document.getElementById('lex-line-y');
            const lineZ = document.getElementById('lex-line-z');
            const senvZ = document.getElementById('senv-z');
            const senvY = document.getElementById('senv-y');
            const senvX = document.getElementById('senv-x');
            const explain = document.getElementById('lex-explain-box');
            
            if (lineX) lineX.className = lineX.className.replace(' bg-red-950 text-red-200', '');
            if (lineY) lineY.className = lineY.className.replace(' bg-purple-950 text-purple-200', '');
            if (lineZ) lineZ.className = lineZ.className.replace(' bg-emerald-950 text-emerald-200', '');
            
            if (senvZ) senvZ.className = senvZ.className.replace('border-emerald-500 bg-emerald-50', 'border-slate-200');
            if (senvY) senvY.className = senvY.className.replace('border-purple-500 bg-purple-50', 'border-slate-200');
            if (senvX) senvX.className = senvX.className.replace('border-red-500 bg-red-50', 'border-slate-200');
            
            if (explain) {
                explain.innerHTML = "הציבו את העכבר מעל x או z בקוד משמאל כדי לראות את חישוב הכתובת הלקסיקלית שלו.";
            }
        }

        // --- EOPL Architecture Data-Flow Details JS Logic ---
        function showArchDetails(step) {
            const box = document.getElementById('arch-details-box');
            if (!box) return;
            
            const cardIds = ['input', 'lang', 'ast', 'interp', 'expval'];
            cardIds.forEach(id => {
                const card = document.getElementById('arch-card-' + id);
                if (card) {
                    card.classList.remove('border-amber-400', 'ring-2', 'ring-amber-200');
                }
            });
            
            const activeCard = document.getElementById('arch-card-' + step);
            if (activeCard) {
                activeCard.classList.add('border-amber-400', 'ring-2', 'ring-amber-200');
            }
            
            let html = '';
            switch(step) {
                case 'input':
                    html = `
                        <p class="font-bold text-slate-800 mb-1 text-sm">📝 קוד המקור (Source Code)</p>
                        <p class="text-slate-600 text-xs leading-relaxed">
                            <strong>תפקיד:</strong> מחרוזת טקסט חופשית שכותב המשתמש. בשלב זה אין למחשב שום הבנה מבנית של הקוד.
                            <br><strong>דוגמה:</strong> <code class="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">"-(5, 2)"</code>
                            <br><strong>מאחורי הקלעים:</strong> מועבר ישירות כקלט (String) לפונקציה הראשית <code class="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">(run "...")</code>.
                        </p>
                    `;
                    break;
                case 'lang':
                    html = `
                        <p class="font-bold text-slate-800 mb-1 text-sm">📁 הגדרת השפה (lang.scm - scan&parse)</p>
                        <p class="text-slate-600 text-xs leading-relaxed">
                            <strong>תפקיד:</strong> ניתוח לקסיקלי ותחבירי המתרגם את מחרוזת הטקסט למבנה עץ.
                            <br><strong>מאחורי הקלעים:</strong> מבוסס על כלי ה-Parser הגנרי של EOPL שנקרא <strong>SLLGen</strong>. הוא משתמש ב-<code>the-lexical-spec</code> (להגדרת תווים, רווחים ומזהים) וב-<code>the-grammar</code> (להגדרת כללי התחביר).
                            <br><strong>מדריך למבחן:</strong> כאשר מבקשים להוסיף ביטוי חדש לשפה, חובה לעדכן קודם כל את <code>the-grammar</code> בקובץ זה כדי שה-Parser ידע לזהות אותו.
                        </p>
                    `;
                    break;
                case 'ast':
                    html = `
                        <p class="font-bold text-slate-800 mb-1 text-sm">🌳 עץ תחבירי מופשט (AST - Abstract Syntax Tree)</p>
                        <p class="text-slate-600 text-xs leading-relaxed">
                            <strong>תפקיד:</strong> ייצוג מובנה של מבנה הקוד, המקל על עיבוד וחישוב.
                            <br><strong>דוגמה:</strong> הביטוי <code class="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">"-(5, 2)"</code> הופך לצומת <code class="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">(diff-exp (const-exp 5) (const-exp 2))</code>.
                            <br><strong>מאחורי הקלעים:</strong> מוגדר באמצעות <code>define-datatype expression</code> בקובץ <code>data-structures.scm</code>. כל צומת מיוצג על ידי Variant של הטיפוס expression.
                        </p>
                    `;
                    break;
                case 'interp':
                    html = `
                        <p class="font-bold text-slate-800 mb-1 text-sm">⚙️ המפרש (interp.scm - value-of)</p>
                        <p class="text-slate-600 text-xs leading-relaxed">
                            <strong>תפקיד:</strong> מנוע ההרצה הסמנטי של המפרש. מקבל עץ ביטוי וסביבה לקסיקלית, ומחשב את התוצאה שלו.
                            <br><strong>מאחורי הקלעים:</strong> הפונקציה <code>value-of</code> משתמשת ב-<code>(cases expression exp ...)</code> כדי לבצע Pattern Matching על צומת ה-AST ולחשב את ערכו בהתאם לסוג הביטוי.
                            <br><strong>מדריך למבחן:</strong> זהו הלב של כתיבת הפיצ'רים. כאן מחליטים מתי ואיך להעריך ביטויי משנה, כיצד לעדכן או לגשת לסביבה (או לזיכרון), ואיזה ערך להחזיר.
                        </p>
                    `;
                    break;
                case 'expval':
                    html = `
                        <p class="font-bold text-slate-800 mb-1 text-sm">📦 ערך מבוטא (ExpVal - Expressed Value)</p>
                        <p class="text-slate-600 text-xs leading-relaxed">
                            <strong>תפקיד:</strong> ערך החזרת החישוב כפי שמיוצג בתוך שפת היעד (Target Language).
                            <br><strong>דוגמה:</strong> <code class="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">(num-val 3)</code> או <code class="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">(bool-val #t)</code>.
                            <br><strong>מאחורי הקלעים:</strong> שפת LET לא מחזירה סתם מספרים או בוליאנים של Scheme, אלא עוטפת אותם בטיפוס <code>expval</code> המוגדר ב-<code>data-structures.scm</code>. זהו מנגנון המיסוך המפריד בין ערכי שפת המפרש לבין ערכי שפת היישום.
                        </p>
                    `;
                    break;
            }
            box.innerHTML = html;
        }

        // --- Lexical vs Dynamic Scoping Simulator JS Logic ---
        let scopeMode = 'lexical';
        let scopeStep = 0;
        
        function toggleScopingMode(mode) {
            scopeMode = mode;
            const btnLex = document.getElementById('btn-scope-lexical');
            const btnDyn = document.getElementById('btn-scope-dynamic');
            
            if (mode === 'lexical') {
                btnLex.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer';
                btnDyn.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
            } else {
                btnDyn.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer';
                btnLex.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
            }
            resetScopeSim();
        }
        
        function resetScopeSim() {
            scopeStep = 0;
            const explain = document.getElementById('scope-explain-text');
            if (explain) {
                explain.innerHTML = 'לחצו על "בצע צעד" כדי לראות את שלבי הרצת הקוד ומעקב הסביבות.';
            }
            const envView = document.getElementById('scope-env-view');
            if (envView) {
                envView.innerHTML = `
                    <div class="text-slate-400 text-xs italic py-8">סביבה ריקה. התחילו להריץ צעדים.</div>
                `;
            }
            const stepBtn = document.getElementById('btn-scope-step');
            if (stepBtn) {
                stepBtn.disabled = false;
                stepBtn.textContent = 'בצע צעד (Step)';
                stepBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }
        
        function stepScopeSim() {
            scopeStep++;
            const explain = document.getElementById('scope-explain-text');
            const envView = document.getElementById('scope-env-view');
            
            if (!explain || !envView) return;
            
            if (scopeStep === 1) {
                explain.innerHTML = '<strong>שלב 1: let x = 3</strong><br>הערך 3 מוערך ונשמר בסביבה חדשה המשוייכת ל-x. כעת המפרש יפנה להעריך את גוף ה-let.';
                envView.innerHTML = `
                    <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between transition-all duration-300 transform scale-100">
                        <div class="flex items-center gap-2">
                            <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_1</span>
                            <span class="text-slate-700 font-mono text-xs">x : num-val(3)</span>
                        </div>
                        <span class="text-[10px] text-slate-400 font-mono">📍 נוצר ב-let x = 3</span>
                    </div>
                    <div class="text-slate-300 text-sm">↓</div>
                    <div class="w-full max-w-md bg-slate-100 border border-dashed border-slate-300 rounded-lg p-2 text-center text-slate-500 font-mono text-[10px]">
                        Empty Env (סביבה ריקה)
                    </div>
                `;
            } else if (scopeStep === 2) {
                if (scopeMode === 'lexical') {
                    explain.innerHTML = '<strong>שלב 2: הגדרת הפונקציה f (לקסיקלי)</strong><br>הפונקציה <code>proc(z) -(z, x)</code> מוערכת. בסקופ לקסיקלי נוצרת Procedure השומרת בתוכה צילום (Closure) של הסביבה שבה היא הוגדרה. הסביבה השמורה (Saved Env) מכילה את <code>[x: 3]</code>.';
                    envView.innerHTML = `
                        <div class="w-full max-w-md bg-white border border-blue-400 rounded-lg p-3 shadow-sm flex flex-col gap-2 transition-all duration-300">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_2</span>
                                    <span class="text-slate-700 font-mono text-xs">f : proc-val(z, body, <span class="text-blue-600 font-bold">saved_env=ENV_1</span>)</span>
                                </div>
                                <span class="text-[10px] text-slate-400 font-mono">📍 נוצר ב-let f = proc...</span>
                            </div>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_1</span>
                                <span class="text-slate-700 font-mono text-xs"><span class="text-blue-600 font-bold">x : 3</span></span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">📍 סביבה שמורה ב-f</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-slate-100 border border-dashed border-slate-300 rounded-lg p-2 text-center text-slate-500 font-mono text-[10px]">
                            Empty Env
                        </div>
                    `;
                } else {
                    explain.innerHTML = '<strong>שלב 2: הגדרת הפונקציה f (דינמי)</strong><br>הפונקציה <code>proc(z) -(z, x)</code> מוערכת. בסקופ דינמי היא <strong>אינה שומרת</strong> את הסביבה הלקסיקלית שלה. היא תשתמש בכל סביבה שתהיה פעילה ברגע הקריאה.';
                    envView.innerHTML = `
                        <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between transition-all duration-300">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_2</span>
                                <span class="text-slate-700 font-mono text-xs">f : proc-val(z, body, <span class="text-red-500 font-bold">no_saved_env</span>)</span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">📍 נוצר ב-let f = proc...</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_1</span>
                                <span class="text-slate-700 font-mono text-xs">x : 3</span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">📍 סביבה נוכחית</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-slate-100 border border-dashed border-slate-300 rounded-lg p-2 text-center text-slate-500 font-mono text-[10px]">
                            Empty Env
                        </div>
                    `;
                }
            } else if (scopeStep === 3) {
                explain.innerHTML = '<strong>שלב 3: let x = 4</strong><br>הערך 4 מוערך ונשמר בסביבה חדשה. x = 4 מסתיר (shadowing) את הקישור הקודם של x = 3 עבור ביטויי המשך.';
                if (scopeMode === 'lexical') {
                    envView.innerHTML = `
                        <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between transition-all duration-300">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_3</span>
                                <span class="text-slate-700 font-mono text-xs"><span class="text-purple-600 font-bold">x : 4</span></span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">📍 נוצר ב-let x = 4</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex flex-col gap-2">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_2</span>
                                    <span class="text-slate-700 font-mono text-xs">f : proc-val(z, body, saved_env=ENV_1)</span>
                                </div>
                                <span class="text-[10px] text-slate-400 font-mono">📍 f מוגדרת</span>
                            </div>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_1</span>
                                <span class="text-slate-700 font-mono text-xs">x : 3</span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">📍 x = 3 (נסתר בסביבה השוטפת)</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-slate-100 border border-dashed border-slate-300 rounded-lg p-2 text-center text-slate-500 font-mono text-[10px]">
                            Empty Env
                        </div>
                    `;
                } else {
                    envView.innerHTML = `
                        <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between transition-all duration-300">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_3</span>
                                <span class="text-slate-700 font-mono text-xs"><span class="text-red-500 font-bold">x : 4</span></span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">📍 נוצר ב-let x = 4</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_2</span>
                                <span class="text-slate-700 font-mono text-xs">f : proc-val(z, body, no_saved_env)</span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">📍 f מוגדרת</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_1</span>
                                <span class="text-slate-700 font-mono text-xs">x : 3</span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">📍 x = 3 (נסתר בסביבה השוטפת)</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-slate-100 border border-dashed border-slate-300 rounded-lg p-2 text-center text-slate-500 font-mono text-[10px]">
                            Empty Env
                        </div>
                    `;
                }
            } else if (scopeStep === 4) {
                if (scopeMode === 'lexical') {
                    explain.innerHTML = '<strong>שלב 4: קריאה לפונקציה (f 10) - (לקסיקלי)</strong><br>הקריאה לפונקציה f מתבצעת. המפרש שולף את f, מזהה שהיא procedure עם <strong>סביבה שמורה ENV_1</strong>, ויוצר סביבה חדשה עבור z = 10 <strong>המצביעה ל-ENV_1</strong>. שימו לב: הסביבה שבה x = 4 נעקפה לחלוטין!';
                    envView.innerHTML = `
                        <div class="w-full max-w-md bg-blue-50 border border-blue-500 rounded-lg p-3 shadow-sm flex items-center justify-between transition-all duration-300">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">ENV_CALL</span>
                                <span class="text-slate-800 font-bold font-mono text-xs">z : 10</span>
                            </div>
                            <span class="text-[10px] text-blue-600 font-bold">📍 סביבת הרצת גוף הפונקציה</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_1</span>
                                <span class="text-slate-700 font-mono text-xs"><span class="text-blue-600 font-bold">x : 3</span></span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">📍 סביבה שמורה (ENV_1)</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-slate-100 border border-dashed border-slate-300 rounded-lg p-2 text-center text-slate-500 font-mono text-[10px]">
                            Empty Env
                        </div>
                    `;
                } else {
                    explain.innerHTML = '<strong>שלב 4: קריאה לפונקציה (f 10) - (דינמי)</strong><br>בסביבה דינמית, המפרש יוצר סביבה חדשה z = 10 <strong>המצביעה ישירות לסביבה השוטפת הנוכחית</strong> ברגע הקריאה (היא ENV_3 שבה x = 4). לכן הסביבה שבה x = 4 משתתפת בחישוב!';
                    envView.innerHTML = `
                        <div class="w-full max-w-md bg-red-50 border border-red-500 rounded-lg p-3 shadow-sm flex items-center justify-between transition-all duration-300">
                            <div class="flex items-center gap-2">
                                <span class="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">ENV_CALL</span>
                                <span class="text-slate-800 font-bold font-mono text-xs">z : 10</span>
                            </div>
                            <span class="text-[10px] text-red-600 font-bold">📍 סביבת הרצת גוף הפונקציה</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_3</span>
                                <span class="text-slate-700 font-mono text-xs"><span class="text-red-500 font-bold">x : 4</span></span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">📍 סביבת הקריאה (ENV_3)</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_2</span>
                                <span class="text-slate-700 font-mono text-xs">f : proc-val(...)</span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">📍 f מוגדרת</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">ENV_1</span>
                                <span class="text-slate-700 font-mono text-xs">x : 3</span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">📍 סביבה ישנה</span>
                        </div>
                        <div class="text-slate-300 text-sm">↓</div>
                        <div class="w-full max-w-md bg-slate-100 border border-dashed border-slate-300 rounded-lg p-2 text-center text-slate-500 font-mono text-[10px]">
                            Empty Env
                        </div>
                    `;
                }
            } else if (scopeStep === 5) {
                if (scopeMode === 'lexical') {
                    explain.innerHTML = '<strong>שלב 5: חישוב גוף הפונקציה -(z, x)</strong><br>המפרש מחפש את הערכים בסביבה הלקסיקלית הפעילה:<br>• z נמצא מיד: 10<br>• x מחופש ב-ENV_CALL (לא נמצא) ועובר ל-ENV_1 (נמצא: 3).<br>החישוב הוא: <code>10 - 3 = 7</code>.<br><span class="text-green-600 font-bold text-sm block mt-2">תוצאה סופית: 7</span>';
                } else {
                    explain.innerHTML = '<strong>שלב 5: חישוב גוף הפונקציה -(z, x)</strong><br>המפרש מחפש את הערכים בסביבה הדינמית הפעילה:<br>• z נמצא מיד: 10<br>• x מחופש ב-ENV_CALL (לא נמצא) ועובר ל-ENV_3 (נמצא: 4).<br>החישוב הוא: <code>10 - 4 = 6</code>.<br><span class="text-red-600 font-bold text-sm block mt-2">תוצאה סופית: 6</span>';
                }
                const stepBtn = document.getElementById('btn-scope-step');
                if (stepBtn) {
                    stepBtn.disabled = true;
                    stepBtn.textContent = 'הסתיים';
                    stepBtn.classList.add('opacity-50', 'cursor-not-allowed');
                }
            }
        }
        // --- Simulator 1: AST Building Workshop JS Logic ---
        function renderVisualAstTree(slot1, slot2, slot3, slot4, slot5, slot6) {
            const container = document.getElementById('ast-visual-tree');
            if (!container) return;

            if (!slot1) {
                container.innerHTML = `<span class="text-slate-500 italic text-[11px] text-center">התחילו לבחור צמתים כדי לצייר את העץ...</span>`;
                return;
            }

            let svgContent = `<svg width="100%" height="160" viewBox="0 0 320 160" fill="none" class="max-w-xs mx-auto transition-all duration-500">`;
            svgContent += `
                <defs>
                    <marker id="arrow-ast" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                </defs>
            `;

            // Draw root node
            svgContent += `
                <g class="transition-all duration-300">
                    <rect x="110" y="10" width="100" height="24" rx="5" fill="${slot1 === 'let-exp' ? '#1d4ed8' : '#ef4444'}" stroke="#3b82f6" stroke-width="1.5" />
                    <text x="160" y="25" fill="white" font-size="9" font-weight="bold" text-anchor="middle" font-family="monospace">${slot1}</text>
                </g>
            `;

            if (slot1 === 'let-exp') {
                svgContent += `<line x1="160" y1="34" x2="60" y2="65" stroke="#94a3b8" stroke-width="1.5" />`;
                svgContent += `<line x1="160" y1="34" x2="160" y2="65" stroke="#94a3b8" stroke-width="1.5" />`;
                svgContent += `<line x1="160" y1="34" x2="260" y2="65" stroke="#94a3b8" stroke-width="1.5" />`;

                // Child 1: var
                let varLabel = slot2 ? `x` : '?';
                svgContent += `
                    <g>
                        <rect x="25" y="65" width="70" height="22" rx="4" fill="#3b82f6" fill-opacity="0.2" stroke="#60a5fa" stroke-dasharray="${slot2 ? '' : '3 3'}" stroke-width="1" />
                        <text x="60" y="79" fill="#93c5fd" font-size="8" text-anchor="middle" font-family="monospace">var: ${varLabel}</text>
                    </g>
                `;

                // Child 2: exp1
                let exp1Label = slot3 ? (slot3 === 'const-5' ? 'const(5)' : (slot3 === 'const-1' ? 'const(1)' : 'var(x)')) : 'exp1: ?';
                svgContent += `
                    <g>
                        <rect x="115" y="65" width="90" height="22" rx="4" fill="${slot3 === 'const-5' ? '#10b981' : (slot3 ? '#ef4444' : '#334155')}" stroke="${slot3 === 'const-5' ? '#34d399' : '#475569'}" stroke-dasharray="${slot3 ? '' : '3 3'}" stroke-width="1" />
                        <text x="160" y="79" fill="white" font-size="8" text-anchor="middle" font-family="monospace">${exp1Label}</text>
                    </g>
                `;

                // Child 3: body
                let bodyLabel = slot4 ? (slot4 === 'diff-exp' ? 'diff-exp' : slot4) : 'body: ?';
                svgContent += `
                    <g>
                        <rect x="215" y="65" width="90" height="22" rx="4" fill="${slot4 === 'diff-exp' ? '#8b5cf6' : (slot4 ? '#ef4444' : '#334155')}" stroke="${slot4 === 'diff-exp' ? '#a78bfa' : '#475569'}" stroke-dasharray="${slot4 ? '' : '3 3'}" stroke-width="1" />
                        <text x="260" y="79" fill="white" font-size="8" text-anchor="middle" font-family="monospace">${bodyLabel}</text>
                    </g>
                `;

                if (slot4 === 'diff-exp') {
                    svgContent += `<line x1="260" y1="87" x2="220" y2="120" stroke="#94a3b8" stroke-width="1.5" />`;
                    svgContent += `<line x1="260" y1="87" x2="300" y2="120" stroke="#94a3b8" stroke-width="1.5" />`;

                    // Left Operand
                    let leftLabel = slot5 ? (slot5 === 'var-x' ? 'var(x)' : (slot5 === 'const-5' ? 'const(5)' : 'const(1)')) : '?';
                    svgContent += `
                        <g>
                            <rect x="185" y="120" width="70" height="22" rx="4" fill="${slot5 === 'var-x' ? '#10b981' : (slot5 ? '#ef4444' : '#334155')}" stroke="${slot5 === 'var-x' ? '#34d399' : '#475569'}" stroke-dasharray="${slot5 ? '' : '3 3'}" stroke-width="1" />
                            <text x="220" y="134" fill="white" font-size="8" text-anchor="middle" font-family="monospace">${leftLabel}</text>
                        </g>
                    `;

                    // Right Operand
                    let rightLabel = slot6 ? (slot6 === 'const-1' ? 'const(1)' : (slot6 === 'var-x' ? 'var(x)' : 'const(5)')) : '?';
                    svgContent += `
                        <g>
                            <rect x="265" y="120" width="70" height="22" rx="4" fill="${slot6 === 'const-1' ? '#10b981' : (slot6 ? '#ef4444' : '#334155')}" stroke="${slot6 === 'const-1' ? '#34d399' : '#475569'}" stroke-dasharray="${slot6 ? '' : '3 3'}" stroke-width="1" />
                            <text x="300" y="134" fill="white" font-size="8" text-anchor="middle" font-family="monospace">${rightLabel}</text>
                        </g>
                    `;
                }
            }

            const isCorrect = (slot1 === 'let-exp' && slot2 === 'x' && slot3 === 'const-5' && slot4 === 'diff-exp' && slot5 === 'var-x' && slot6 === 'const-1');
            if (isCorrect) {
                svgContent += `
                    <path d="M 160 34 L 160 60" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-ast)">
                        <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
                    </path>
                    <path d="M 260 87 L 225 115" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-ast)">
                        <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
                    </path>
                `;
            }

            svgContent += `</svg>`;
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
                output.textContent = slot1 ? `(${slot1} ...)` : "ממתין להרכבת השורש...";
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
            let varText = slot2 ? `'${slot2}` : "?";
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
                bodyText = `(diff-exp ${d1} ${d2})`;
            }
            
            output.textContent = `(let-exp ${varText} ${exp1Text} ${bodyText})`;
            
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
                
                item.innerHTML = `
                    <div class="flex items-center gap-2">
                        <button onclick="moveValLine(${idx}, -1)" class="p-1 rounded hover:bg-slate-200 text-slate-500 font-bold transition-colors cursor-pointer" title="הזז למעלה">▲</button>
                        <button onclick="moveValLine(${idx}, 1)" class="p-1 rounded hover:bg-slate-200 text-slate-500 font-bold transition-colors cursor-pointer" title="הזז למטה">▼</button>
                    </div>
                    <div class="flex-1 text-left select-none text-slate-800 font-bold font-mono" style="padding-left: 20px; direction: ltr; white-space: pre;">${line.text}</div>
                `;
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
            
            consoleBox.innerHTML = "Evaluating program...\n";
            badge.className = "mt-4 p-2 rounded text-center font-bold bg-amber-500 text-white animate-pulse";
            badge.textContent = "STATUS: RUNNING";
            
            setTimeout(() => {
                if (ext1 === 'raw' || ext2 === 'raw') {
                    monitor.className = "rounded-xl p-5 font-mono text-xs flex flex-col justify-between min-h-[180px] bg-red-950 text-red-200 border-2 border-red-500 shadow-lg shadow-red-900/20";
                    badge.className = "mt-4 p-2 rounded text-center font-bold bg-red-600 text-white";
                    badge.textContent = "STATUS: CRASHED (HOST ENGINE)";
                    consoleBox.innerHTML = `[HOST ERROR] Scheme Racket Exception:
contract violation
expected: number?
given: (bool-val #t)
in math subtraction operation: -

💥 קריסה במפרש השרת!
מכיוון שלא חילצתם את הערכים מתוך ה-struct של expval, המפרש שלכם ניסה לחסר ישירות את המבנה struct (bool-val #t) מהמבנה struct (num-val 5) במקום לחסר מספרים ממשיים.`;
                    
                    memVisual.innerHTML = `
                        <div class="flex flex-col items-center w-full">
                            <div class="flex items-center gap-2 justify-center text-[10.5px] w-full" dir="ltr">
                                <div class="bg-blue-950 border border-blue-500 px-2 py-1 rounded text-blue-300">num-val(5)</div>
                                <span class="text-red-500 font-bold">─( - )─</span>
                                <div class="bg-red-950 border border-red-500 px-2 py-1 rounded text-red-300 animate-bounce">bool-val(#t) 💥</div>
                            </div>
                            <div class="text-[9.5px] text-red-400 mt-2 text-center">שגיאת טיפוס פיזית: ניסיון לבצע חיסור מתמטי על Struct שלם ולא על מספר טהור!</div>
                        </div>
                    `;
                } else if (ext1 === 'bool' || ext2 === 'bool') {
                    monitor.className = "rounded-xl p-5 font-mono text-xs flex flex-col justify-between min-h-[180px] bg-red-950 text-red-200 border-2 border-red-500 shadow-lg shadow-red-900/20";
                    badge.className = "mt-4 p-2 rounded text-center font-bold bg-red-600 text-white";
                    badge.textContent = "STATUS: RUNTIME ERROR (MANAGED)";
                    consoleBox.innerHTML = `[EOPL ERROR] expval->bool: Expected boolean, found (num-val 5)

⚠️ שגיאת ריצה מנוהלת!
הגדרתם חילוץ בוליאני עבור משתנה שהערך שלו הוא מספר (5). ה-extractor זרק שגיאת eopl:error מנוהלת ומנע את קריסת המנוע, אך התוכנית עדיין נכשלה כי החילוץ לא תואם.`;

                    memVisual.innerHTML = `
                        <div class="flex flex-col items-center gap-2 w-full">
                            <div class="flex items-center gap-3 justify-center text-[10.5px]" dir="ltr">
                                <div class="bg-blue-900 border border-blue-400 px-2 py-1 rounded text-blue-100">num-val(5)</div>
                                <span class="text-slate-400">➔ expval-&gt;bool ➔</span>
                                <div class="bg-red-950 border border-red-500 px-2 py-1 rounded text-red-300">💥 שגיאת התאמה!</div>
                            </div>
                            <div class="text-[9.5px] text-red-400 text-center mt-1">מחלץ הבוליאנים (expval-&gt;bool) מצפה למצוא תגית "bool-val" אך פגש ב-"num-val"!</div>
                        </div>
                    `;
                } else {
                    monitor.className = "rounded-xl p-5 font-mono text-xs flex flex-col justify-between min-h-[180px] bg-slate-950 text-emerald-400 border border-slate-800";
                    badge.className = "mt-4 p-2 rounded text-center font-bold bg-green-600 text-white";
                    badge.textContent = "STATUS: SUCCESS / SAFE RUNTIME ERROR";
                    consoleBox.innerHTML = `[EOPL ERROR] expval->num: Looking for a number, found bool-val(bool-val #t)

✅ המפרש ניצל מקריסה גולמית!
שני החילוצים הוגדרו נכון כ-expval->num. כאשר המפרש ניגש לחסר את x=5 ו-y=bool-val(#t), הוא זיהה ש-y הוא בוליאני וזרק שגיאה לקסיקלית נקייה המדווחת ללומד שהוזן טיפוס לא נכון!`;

                    memVisual.innerHTML = `
                        <div class="flex flex-col items-center gap-3 w-full">
                            <div class="flex items-center gap-3 justify-center text-[10.5px]" dir="ltr">
                                <div class="bg-blue-950 border border-blue-500 px-2 py-1 rounded text-blue-300">num-val(5) ➔ 5</div>
                                <span class="text-slate-400">─( - )─</span>
                                <div class="bg-emerald-950 border border-emerald-500 px-2 py-1 rounded text-emerald-300">bool-val(#t) ➔ 💥 שגיאת טיפוס!</div>
                            </div>
                            <div class="text-[9.5px] text-emerald-400 text-center">שני הערכים חולצו בבטחה. המפרש זיהה ש-y הוא בוליאני וזרק שגיאה מנוהלת ומסודרת ללקוח במקום לקרוס!</div>
                        </div>
                    `;
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
                animBox.innerHTML = `
                    <div class="text-red-500 font-bold text-xs text-center">
                        ❌ שגיאת טיפוסים במפרש!<br>
                        הפונקציה extend-env מצפה למשתנה יחיד וערך יחיד.<br>
                        קלט הנתב: '("x" "y" "z") ו-'(num-val(10) num-val(20) num-val(30))
                    </div>
                `;
                feedback.textContent = "שגיאה: extend-env אינו מיועד לרשימות של ארגומנטים.";
                feedback.className = "mt-4 p-2 rounded text-center text-xs font-bold bg-red-100 text-red-700";
            } else if (slot === 'eval-inside') {
                animBox.innerHTML = `
                    <div class="text-red-500 font-bold text-xs text-center">
                        ❌ שגיאה: כפל ריצות (Double Evaluation)!<br>
                        הערכים המועברים ל-apply-procedure כבר חושבו קודם לכן על ידי הלקוח.<br>
                        אין לקרוא שוב ל-value-of בתוך מנוע ההרצה הפיזי של הפונקציה!
                    </div>
                `;
                feedback.textContent = "שגיאה: vals הם כבר ExpVals מוערכים. אין צורך להעריך שוב.";
                feedback.className = "mt-4 p-2 rounded text-center text-xs font-bold bg-red-100 text-red-700";
            } else if (slot === 'correct') {
                animBox.innerHTML = `
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
                `;
                feedback.innerHTML = "🎉 מושלם! extend-env* הוא המימוש המדויק לקשירת רשימות משתנים וערכים בסביבה חדשה ללא הערכה חוזרת (פעולת זיפ פשוטה).";
                feedback.className = "mt-4 p-2 rounded text-center text-xs font-bold bg-green-100 text-green-800";
            }
        }
        
        // --- Simulator 5: Mutual Recursion Parallel Lists Scanner JS Logic ---
        let mrecStep = 0;
        
        function resetMrecSim() {
            mrecStep = 0;
            const feedback = document.getElementById('mrec-feedback');
            feedback.innerHTML = "לחצו \"בצע צעד\" כדי להתחיל את החיפוש הדינמי.";
            
            const factory = document.getElementById('mrec-factory-area');
            if (factory) {
                factory.innerHTML = `<span class="text-slate-500 italic text-[11px] font-sans">מפעל הרכבת הקלוז'ר: ייווצר כאן לאחר מציאת האינדקס...</span>`;
            }

            for (let i = 0; i <= 1; i++) {
                document.getElementById(`mrec-name-${i}`).className = "p-2 border rounded font-mono text-xs text-center transition-colors border-slate-200 bg-white text-slate-800";
                document.getElementById(`mrec-var-${i}`).className = "p-2 border rounded font-mono text-xs text-center transition-colors border-slate-200 bg-white text-slate-800";
                document.getElementById(`mrec-body-${i}`).className = "p-2 border rounded font-mono text-[10px] text-center transition-colors border-slate-200 bg-white text-slate-800 truncate";
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
                    factory.innerHTML = `
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
                    `;
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
                chart.innerHTML = `<span class="text-slate-500 italic text-[11px] text-center">השלימו את תפריטי הבחירה משמאל לצפייה בתרשים הזרימה...</span>`;
                return;
            }

            let svg = `<svg width="100%" height="110" viewBox="0 0 280 110" fill="none" class="max-w-xs mx-auto">`;
            svg += `
                <defs>
                    <marker id="arrow-jit" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
                    </marker>
                </defs>
            `;

            if (slot1 === 'env' && slot2 === 'env') {
                svg += `
                    <circle cx="140" cy="50" r="32" stroke="#ef4444" stroke-width="2" stroke-dasharray="4" />
                    <text x="140" y="53" fill="#ef4444" font-size="9" font-weight="bold" text-anchor="middle">Stack Overflow!</text>
                    <text x="140" y="98" fill="#f87171" font-size="8" text-anchor="middle">לולאת חיפוש אינסופית באותו Env</text>
`;
            } else if (slot1 === 'saved-env' && slot2 === 'saved-env') {
                svg += `
                    <rect x="15" y="25" width="80" height="35" rx="5" fill="#f87171" fill-opacity="0.1" stroke="#ef4444" />
                    <text x="55" y="46" fill="#f87171" font-size="8" text-anchor="middle" font-weight="bold">closure (saved-env)</text>
                    
                    <path d="M 95 42 L 165 42" stroke="#f87171" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-jit)" />
                    <text x="130" y="34" fill="#f87171" font-size="7" text-anchor="middle">חיפוש חיצוני</text>
                    
                    <circle cx="205" cy="42" r="14" stroke="#f87171" stroke-width="1.5" stroke-dasharray="2 2" />
                    <text x="205" y="45" fill="#ef4444" font-size="8" font-weight="bold" text-anchor="middle">?</text>
                    <text x="140" y="95" fill="#f87171" font-size="8" text-anchor="middle">הפונקציה מנותקת מה-letrec! (Unbound Variable)</text>
`;
            } else if (slot1 === 'env' && slot2 === 'saved-env') {
                svg += `
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
`;
            } else {
                svg += `
                    <text x="140" y="55" fill="#fbbf24" font-size="9" text-anchor="middle">שילוב זה אינו תקין. נסו שוב.</text>
`;
            }

            svg += `</svg>`;
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
                consoleBox.innerHTML = `(apply-env env 'f) -> f found!
Creating closure procedure with saved-env (E0).
Inside f: Calling (f) recursively.
(apply-env E0 'f) -> ❌ Variable 'f not found!
Program Crashed.`;
                feedback.innerHTML = "❌ שגיאה! שימוש ב-saved-env בקלוז'ר מונע ממנו להכיר את עצמו, וכאשר יבצע קריאה רקורסיבית המפרש יחפש מחוץ ל-letrec ויכשל.";
                feedback.className = "mt-4 p-2.5 rounded text-center text-xs font-bold bg-red-100 text-red-700";
            } else if (slot1 === 'env' && slot2 === 'env') {
                consoleBox.innerHTML = `(apply-env env 'g) -> not found!
Continuing search on 'env.
(apply-env env 'g) -> not found!
Continuing search on 'env.
...
❌ Stack Overflow! Infinite Loop Detected!`;
                feedback.innerHTML = "❌ שגיאה! אם לא מצאנו את המשתנה ונמשיך לחפש ב-env (הסביבה הרקורסיבית הנוכחית) במקום ב-saved-env (הסביבה שקדמה לה), המפרש יכנס ללולאה אינסופית בחיפוש משתנים חיצוניים.";
                feedback.className = "mt-4 p-2.5 rounded text-center text-xs font-bold bg-red-100 text-red-700";
            } else if (slot1 === 'env' && slot2 === 'saved-env') {
                consoleBox.innerHTML = `(apply-env env 'even?) -> found!
Creating closure with circular environment 'env'.
Evaluating body: (odd? (- x 1))
(apply-env env 'odd?) -> found!
Creating closure with circular environment 'env'.
Evaluating body: (even? (- x 1))
Calculation complete. Result: (bool-val #t)`;
                feedback.innerHTML = "🎉 מדהים! זוהי בדיוק מהות ה-JIT. סוגרים את המעגל הרקורסיבי על ידי הזרקת env לקלוז'ר, וממשיכים בחיפוש למעלה על ידי קריאה ל-saved-env.";
                feedback.className = "mt-4 p-2.5 rounded text-center text-xs font-bold bg-green-100 text-green-800";
            } else {
                consoleBox.innerHTML = `(apply-env env 'f) -> found!
Using circular env for closure.
Recursive calls work.
But if search-var is not found:
(apply-env saved-env search-var)
No loops. But wait, search-var not found in recursion...`;
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
            
            namedConsole.innerHTML = "Starting Named Lookup for x1...\n";
            namelessConsole.innerHTML = "Starting Nameless Translation (Static Analysis)...\n";
            namedSteps.textContent = "שלבים: 0";
            namelessSteps.textContent = "שלבים: 0";
            banner.innerHTML = "האנליזה הסטטית וההרצה החלו...";
            banner.className = "text-xs font-bold text-amber-500 animate-pulse";
            
            setTimeout(() => {
                namelessConsole.innerHTML += "➔ translating: x1 ➔ %lexref(0, 9) [DONE]\n";
                namelessConsole.innerHTML += "➔ Phase B: Executing Nameless code...\n";
                namelessConsole.innerHTML += "➔ Accessing nameless-env at index 9 immediately...\n";
                namelessConsole.innerHTML += "➔ Found value 1 in O(1) time!\n";
                namelessConsole.innerHTML += "🎉 COMPLETED Nameless Runtime!\n";
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
                    namedConsole.innerHTML += `Scanning scope: ${currentScope}. Is x1 == ${varToCheck}? No.\n`;
                    step++;
                    namedSteps.textContent = `שלבים: ${step}`;
                } else {
                    clearInterval(raceInterval);
                    namedConsole.innerHTML += "➔ Found value of x1: 1!\n";
                    namedConsole.innerHTML += "🏁 Finished lookup.\n";
                    
                    banner.innerHTML = `
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
                    `;
                    banner.className = "text-xs font-bold text-slate-100 w-full mt-2";
                    
                    btn.disabled = false;
                    btn.textContent = "הרץ מרוץ מחדש";
                    btn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            }, 200);
        }
        // Sidebar toggle and Navigation Button Injection Logic
        function toggleSidebar() {
            document.body.classList.toggle('sidebar-collapsed');
            const isCollapsed = document.body.classList.contains('sidebar-collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed);
            updateToggleBtnIcon(isCollapsed);
        }

        function updateToggleBtnIcon(isCollapsed) {
            const icon = document.getElementById('sidebar-toggle-icon');
            if (!icon) return;
            if (isCollapsed) {
                // Show << (chevron left to open/expand in RTL)
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />';
            } else {
                // Show >> (chevron right to close/collapse in RTL)
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />';
            }
        }

  /* --- Global Exports --- */
window.highlightLex = highlightLex;
window.clearLex = clearLex;
window.showArchDetails = showArchDetails;
window.toggleScopingMode = toggleScopingMode;
window.resetScopeSim = resetScopeSim;
window.stepScopeSim = stepScopeSim;
window.renderVisualAstTree = renderVisualAstTree;
window.checkAstPuzzle = checkAstPuzzle;
window.initValPuzzle = initValPuzzle;
window.renderValPuzzle = renderValPuzzle;
window.moveValLine = moveValLine;
window.checkValPuzzle = checkValPuzzle;
window.runDebugLab = runDebugLab;
window.checkRouterPuzzle = checkRouterPuzzle;
window.resetMrecSim = resetMrecSim;
window.stepMrecSim = stepMrecSim;
window.drawJitFlowchart = drawJitFlowchart;
window.runJitPuzzle = runJitPuzzle;
window.runRace = runRace;
}



/* ==============================================
   VOLUME 3 SCOPED SIMULATORS
   ============================================== */
{
function showTab_old(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav'));

            document.getElementById(tabId).classList.add('active');
            document.getElementById('btn-' + tabId).classList.add('active-nav');

            document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
        }

        // --- Env vs Store Simulator JS Logic ---
        let currentSimLang = 'explicit';
        let currentSimStep = 0;

        function toggleLangSim(lang) {
            currentSimLang = lang;
            currentSimStep = 0;

            const expBtn = document.getElementById('btn-sim-explicit');
            const impBtn = document.getElementById('btn-sim-implicit');
            const codePreview = document.getElementById('sim-code-preview');
            const stepBtn = document.getElementById('btn-sim-step');
            const explain = document.getElementById('sim-explain-text');
            const envBody = document.getElementById('sim-env-body');
            const storeBody = document.getElementById('sim-store-body');

            if (!expBtn || !impBtn || !codePreview || !stepBtn || !explain || !envBody || !storeBody) return;

            if (lang === 'explicit') {
                expBtn.className = "px-4 py-2 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer";
                impBtn.className = "px-4 py-2 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
                codePreview.innerText = "let x = newref(5)\nin setref(x, 10)";
            } else {
                impBtn.className = "px-4 py-2 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer";
                expBtn.className = "px-4 py-2 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
                codePreview.innerText = "let x = 5\nin set x = 10";
            }

            stepBtn.innerText = "בצע צעד (Step)";
            stepBtn.className = stepBtn.className.replace('bg-slate-400 hover:bg-slate-500', 'bg-emerald-600 hover:bg-emerald-700');
            explain.innerText = 'לחצו על "בצע צעד" כדי להריץ את השורה הראשונה (הקצאת המשתנה).';
            envBody.innerHTML = '<tr class="text-slate-400"><td colspan="2" class="p-4 border border-slate-200 italic">סביבה ריקה</td></tr>';
            storeBody.innerHTML = '<tr class="text-slate-400"><td colspan="2" class="p-4 border border-slate-200 italic">זיכרון ריק</td></tr>';
        }

        function stepLangSim() {
            const explain = document.getElementById('sim-explain-text');
            const envBody = document.getElementById('sim-env-body');
            const storeBody = document.getElementById('sim-store-body');
            const stepBtn = document.getElementById('btn-sim-step');

            if (!explain || !envBody || !storeBody || !stepBtn) return;

            if (currentSimStep === 0) {
                if (currentSimLang === 'explicit') {
                    envBody.innerHTML = `
                        <tr class="bg-white border-b hover:bg-slate-50 transition-colors">
                            <td class="p-2 border border-slate-200 font-bold">x</td>
                            <td class="p-2 border border-slate-200 text-blue-700 font-bold">ref-val(L0)</td>
                        </tr>
                    `;
                    storeBody.innerHTML = `
                        <tr class="bg-white border-b hover:bg-slate-50 transition-colors">
                            <td class="p-2 border border-slate-200 font-bold text-amber-700">L0</td>
                            <td class="p-2 border border-slate-200">num-val(5)</td>
                        </tr>
                    `;
                    explain.innerHTML = `<strong>צעד 1: הקצאה מפורשת</strong><br>המפרש יוצר תא בזיכרון (כתובת <code>L0</code>) עם הערך <code>5</code>. המשתנה <code>x</code> נשמר בסביבה כערך מטיפוס כתובת: <code>ref-val(L0)</code>.`;
                } else {
                    envBody.innerHTML = `
                        <tr class="bg-white border-b hover:bg-slate-50 transition-colors">
                            <td class="p-2 border border-slate-200 font-bold">x</td>
                            <td class="p-2 border border-slate-200 text-purple-700 font-bold">L0 (כתובת ישירה)</td>
                        </tr>
                    `;
                    storeBody.innerHTML = `
                        <tr class="bg-white border-b hover:bg-slate-50 transition-colors">
                            <td class="p-2 border border-slate-200 font-bold text-amber-700">L0</td>
                            <td class="p-2 border border-slate-200">num-val(5)</td>
                        </tr>
                    `;
                    explain.innerHTML = `<strong>צעד 1: הקצאה סמויה</strong><br>המפרש מקצה אוטומטית תא זיכרון <code>L0</code> עם הערך <code>5</code>. בשפה זו Denoted Values הם תמיד כתובות, לכן המשתנה <code>x</code> מצביע בסביבה ישירות לכתובת <code>L0</code> ללא עטיפה!`;
                }
                currentSimStep = 1;
                stepBtn.innerText = "בצע צעד שני (Mutate)";
            } else if (currentSimStep === 1) {
                if (currentSimLang === 'explicit') {
                    storeBody.innerHTML = `
                        <tr class="bg-yellow-50 border-b hover:bg-yellow-100 transition-colors animate-pulse">
                            <td class="p-2 border border-slate-200 font-bold text-amber-700">L0</td>
                            <td class="p-2 border border-slate-200 text-emerald-700 font-bold">num-val(10)</td>
                        </tr>
                    `;
                    explain.innerHTML = `<strong>צעד 2: שינוי ערך (setref)</strong><br>המתכנת קורא מפורשות ל-<code>setref(x, 10)</code>. המפרש מוצא ש-<code>x</code> מכיל את הכתובת <code>L0</code>, והולך ל-Store לעדכן את תוכנה ל-<code>10</code>. שימו לב: <strong>הסביבה לא השתנתה כלל!</strong> רק ה-Store עודכן.`;
                } else {
                    storeBody.innerHTML = `
                        <tr class="bg-yellow-50 border-b hover:bg-yellow-100 transition-colors animate-pulse">
                            <td class="p-2 border border-slate-200 font-bold text-amber-700">L0</td>
                            <td class="p-2 border border-slate-200 text-emerald-700 font-bold">num-val(10)</td>
                        </tr>
                    `;
                    explain.innerHTML = `<strong>צעד 2: שינוי ערך (assign)</strong><br>הפקודה <code>set x = 10</code> מופעלת. המפרש מוצא שמשתנה <code>x</code> מצביע בסביבה לכתובת <code>L0</code> ומעדכן את הערך שלה ל-<code>10</code>. גם כאן, רק ה-Store השתנה. השינוי סמוי וקל למתכנת.`;
                }
                currentSimStep = 2;
                stepBtn.innerText = "איפוס סימולציה";
                stepBtn.className = stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
            } else {
                toggleLangSim(currentSimLang);
            }
        }

        // --- Call-by-Value vs Call-by-Reference Simulator JS Logic ---
        let paramMode = 'cbv';
        let paramStep = 0;

        function toggleParamMode(mode) {
            paramMode = mode;
            const btnCBV = document.getElementById('btn-param-mode-cbv');
            const btnCBR = document.getElementById('btn-param-mode-cbr');

            if (mode === 'cbv') {
                btnCBV.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all bg-teal-600 text-white shadow-sm cursor-pointer';
                btnCBR.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
            } else {
                btnCBR.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all bg-teal-600 text-white shadow-sm cursor-pointer';
                btnCBV.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
            }
            resetParamSim();
        }

        function resetParamSim() {
            paramStep = 0;
            const explain = document.getElementById('param-explain-text');
            if (explain) {
                explain.innerHTML = 'לחצו על "בצע צעד" כדי לראות את שלבי הרצת הקוד ומעקב הזיכרון.';
            }
            const envView = document.getElementById('param-env-view');
            if (envView) {
                envView.innerHTML = `
                    <div class="text-slate-400 text-xs italic py-8">סביבה ריקה</div>
                `;
            }
            const storeView = document.getElementById('param-store-view');
            if (storeView) {
                storeView.innerHTML = `
                    <div class="text-slate-400 text-xs italic py-8">זיכרון ריק</div>
                `;
            }
            const stepBtn = document.getElementById('btn-param-step');
            if (stepBtn) {
                stepBtn.disabled = false;
                stepBtn.textContent = 'בצע צעד (Step)';
                stepBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        function stepParamSim() {
            paramStep++;
            const explain = document.getElementById('param-explain-text');
            const envView = document.getElementById('param-env-view');
            const storeView = document.getElementById('param-store-view');

            if (!explain || !envView || !storeView) return;

            if (paramStep === 1) {
                explain.innerHTML = '<strong>שלב 1: let x = 10</strong><br>הערך 10 מוערך ומאוחסן בתא הזיכרון הפנוי הראשון L0. המשתנה x נקשר ל-L0 בסביבה.';
                envView.innerHTML = `
                    <div class="w-full bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono">
                        x ➔ <span class="text-teal-600 font-bold">L0</span>
                    </div>
                `;
                storeView.innerHTML = `
                    <div class="w-full bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono">
                        <span class="text-amber-600 font-bold">L0</span> : num-val(10)
                    </div>
                `;
            } else if (paramStep === 2) {
                explain.innerHTML = '<strong>שלב 2: הגדרת הפרוצדורה f</strong><br>הפונקציה <code>proc(y) ...</code> מוערכת. המפרש יוצר Procedure ומאחסן אותו בתא זיכרון חדש L1. המשתנה f נקשר ל-L1.';
                envView.innerHTML = `
                    <div class="w-full bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                        <div>x ➔ L0</div>
                        <div class="text-teal-600 font-bold border-t pt-1">f ➔ L1</div>
                    </div>
                `;
                storeView.innerHTML = `
                    <div class="w-full bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                        <div>L0 : num-val(10)</div>
                        <div class="text-amber-600 font-bold border-t pt-1">L1 : proc-val(y, body)</div>
                    </div>
                `;
            } else if (paramStep === 3) {
                if (paramMode === 'cbv') {
                    explain.innerHTML = '<strong>שלב 3: קריאה לפונקציה (f x) - לפי ערך</strong><br>בשיטת <strong>CBV</strong>, המערכת מחשבת את ערכו של x (הוא 10) ומקצה עבורו <strong>תא זיכרון חדש לגמרי L2</strong>. המשתנה y נקשר ל-L2. הזיכרון המקורי של x (הוא L0) נותר מוגן משינויים בתוך הפונקציה!';
                    envView.innerHTML = `
                        <div class="w-full bg-blue-50 border border-blue-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                            <div class="text-slate-400 text-[10px] mb-1">סביבת גוף הפונקציה f:</div>
                            <div class="text-blue-700 font-bold">y ➔ L2</div>
                            <div class="text-slate-400 border-t pt-1">מצביע לסביבה השמורה (f, x)</div>
                        </div>
                    `;
                    storeView.innerHTML = `
                        <div class="w-full bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                            <div>L0 : num-val(10)</div>
                            <div>L1 : proc-val(...)</div>
                            <div class="text-teal-600 font-bold border-t pt-1">L2 : num-val(10) [חדש!]</div>
                        </div>
                    `;
                } else {
                    explain.innerHTML = '<strong>שלב 3: קריאה לפונקציה (f x) - לפי הפניה</strong><br>בשיטת <strong>CBR</strong>, המערכת מזהה שהארגומנט x הוא משתנה. היא שולפת את ההפניה שלו L0 מהסביבה וקושרת את y <strong>ישירות לאותו תא זיכרון L0</strong>! כעת y הוא Alias של x.';
                    envView.innerHTML = `
                        <div class="w-full bg-red-50 border border-red-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                            <div class="text-slate-400 text-[10px] mb-1">סביבת גוף הפונקציה f:</div>
                            <div class="text-red-700 font-bold">y ➔ L0 [הפניה משותפת!]</div>
                        </div>
                    `;
                    storeView.innerHTML = `
                        <div class="w-full bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                            <div class="text-red-600 font-bold">L0 : num-val(10) [משותף]</div>
                            <div>L1 : proc-val(...)</div>
                        </div>
                    `;
                }
            } else if (paramStep === 4) {
                if (paramMode === 'cbv') {
                    explain.innerHTML = '<strong>שלב 4: השמה set y = 20 - לפי ערך</strong><br>מתבצע שינוי ערך בתוך הפונקציה. y מצביע ל-L2, ולכן רק הערך ב-L2 משתנה ל-20. שימו לב: הערך של x ב-L0 נשאר 10!';
                    envView.innerHTML = `
                        <div class="w-full bg-blue-50 border border-blue-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                            <div class="text-blue-700 font-bold">y ➔ L2</div>
                        </div>
                    `;
                    storeView.innerHTML = `
                        <div class="w-full bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                            <div class="text-green-600 font-bold">L0 : num-val(10) [לא השתנה]</div>
                            <div>L1 : proc-val(...)</div>
                            <div class="bg-yellow-50 text-teal-600 font-bold border-t pt-1">L2 : num-val(20) [השתנה]</div>
                        </div>
                    `;
                } else {
                    explain.innerHTML = '<strong>שלב 4: השמה set y = 20 - לפי הפניה</strong><br>מתבצע שינוי ערך בתוך הפונקציה. מכיוון ש-y מצביע ישירות ל-L0, הערך של התא המשותף L0 משתנה ל-20! פירוש הדבר הוא ששינינו גם את x מחוץ לפונקציה!';
                    envView.innerHTML = `
                        <div class="w-full bg-red-50 border border-red-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                            <div class="text-red-700 font-bold">y ➔ L0</div>
                        </div>
                    `;
                    storeView.innerHTML = `
                        <div class="w-full bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                            <div class="bg-yellow-50 text-red-600 font-bold">L0 : num-val(20) [השתנה!]</div>
                            <div>L1 : proc-val(...)</div>
                        </div>
                    `;
                }
            } else if (paramStep === 5) {
                if (paramMode === 'cbv') {
                    explain.innerHTML = '<strong>שלב 5: חזרה לגוף הראשי והערכת x</strong><br>הקריאה לפונקציה הסתיימה וסביבתה נהרסה. המפרש חוזר לסביבה החיצונית ומעריך את הביטוי x. x קשור ל-L0, שערכו נשאר 10.<br><span class="text-green-600 font-bold text-sm block mt-2">תוצאה סופית ב-CBV היא: 10</span>';
                    envView.innerHTML = `
                        <div class="w-full bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono">
                            x ➔ L0
                        </div>
                    `;
                    storeView.innerHTML = `
                        <div class="w-full bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                            <div class="text-green-600 font-bold">L0 : num-val(10)</div>
                            <div>L1 : proc-val(...)</div>
                        </div>
                    `;
                } else {
                    explain.innerHTML = '<strong>שלב 5: חזרה לגוף הראשי והערכת x</strong><br>הקריאה לפונקציה הסתיימה. המפרש חוזר לסביבה החיצונית ומעריך את x. x קשור ל-L0, שערכו שונה ל-20 בעקבות הפעלת הפונקציה.<br><span class="text-red-600 font-bold text-sm block mt-2">תוצאה סופית ב-CBR היא: 20!</span>';
                    envView.innerHTML = `
                        <div class="w-full bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono">
                            x ➔ L0
                        </div>
                    `;
                    storeView.innerHTML = `
                        <div class="w-full bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                            <div class="text-red-600 font-bold">L0 : num-val(20)</div>
                            <div>L1 : proc-val(...)</div>
                        </div>
                    `;
                }
                const stepBtn = document.getElementById('btn-param-step');
                if (stepBtn) {
                    stepBtn.disabled = true;
                    stepBtn.textContent = 'הסתיים';
                    stepBtn.classList.add('opacity-50', 'cursor-not-allowed');
                }
            }
        }

        // --- cons-cell Box Pointer Visualizer JS Logic ---
        let pairStruct = 'simple';
        let pairMutations = { left: false, right: false };

        function changePairStructure(struct) {
            pairStruct = struct;

            const btnSimple = document.getElementById('btn-pair-struct-simple');
            const btnList = document.getElementById('btn-pair-struct-list');
            const btnTree = document.getElementById('btn-pair-struct-tree');

            const btns = [btnSimple, btnList, btnTree];
            btns.forEach(btn => {
                if (btn) {
                    btn.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
                }
            });

            let activeBtn = btnSimple;
            if (struct === 'list') activeBtn = btnList;
            if (struct === 'tree') activeBtn = btnTree;
            if (activeBtn) {
                activeBtn.className = 'px-4 py-2 text-xs font-bold rounded-lg transition-all bg-purple-600 text-white shadow-sm cursor-pointer';
            }

            resetPairSim();
        }

        function resetPairSim() {
            pairMutations = { left: false, right: false };
            renderPairCells();
        }

        function mutatePairCell(type) {
            if (type === 'left') pairMutations.left = true;
            if (type === 'right') pairMutations.right = true;
            renderPairCells();
        }

        function renderPairCells() {
            const canvas = document.getElementById('pair-cells-canvas');
            const explain = document.getElementById('pair-explain-text');
            if (!canvas || !explain) return;

            let canvasHtml = '';
            let explainHtml = '';

            if (pairStruct === 'simple') {
                const leftVal = pairMutations.left ? '99' : '11';
                const rightVal = pairMutations.right ? '88' : '22';

                canvasHtml = `
                    <div class="flex items-center justify-center py-4">
                        <div class="bg-white border-2 border-purple-500 rounded-lg shadow-md overflow-hidden flex flex-col w-48 transition-all duration-300">
                            <div class="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-1 border-b border-purple-200 text-center font-mono">PAIR_1 (L0)</div>
                            <div class="flex text-center font-mono divide-x divide-purple-200">
                                <div class="flex-1 p-4 ${pairMutations.left ? 'bg-yellow-100 text-yellow-800 font-bold' : 'text-slate-800'}">CAR: ${leftVal}</div>
                                <div class="flex-1 p-4 ${pairMutations.right ? 'bg-yellow-100 text-yellow-800 font-bold' : 'text-slate-800'}">CDR: ${rightVal}</div>
                            </div>
                        </div>
                    </div>
                `;

                explainHtml = `
                    <p class="font-bold text-purple-800 mb-1 text-xs">מבנה: זוג פשוט</p>
                    <p class="text-slate-600 text-[11px] leading-relaxed">
                        זהו זוג המאחסן שני ערכים פשוטים. בקוד השפה: <code>(pair 11 22)</code>.
                        ${pairMutations.left || pairMutations.right ? '<br><span class="text-purple-600 font-bold">לאחר השינוי:</span> בוצעו פקודות mutation הדורסות את ה-CAR או ה-CDR באמצעות <code>setleft</code>/<code>setright</code>.' : ''}
                    </p>
                `;
            } else if (pairStruct === 'list') {
                const leftVal = pairMutations.left ? '99' : '11';
                const rightVal2 = pairMutations.right ? '88' : '33';

                canvasHtml = `
                    <div class="flex flex-col md:flex-row items-center gap-6 py-4">
                        <div class="bg-white border-2 border-purple-500 rounded-lg shadow-md overflow-hidden flex flex-col w-44 transition-all duration-300">
                            <div class="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-1 border-b border-purple-200 text-center font-mono">PAIR_1 (L0)</div>
                            <div class="flex text-center font-mono divide-x divide-purple-200">
                                <div class="flex-1 p-4 ${pairMutations.left ? 'bg-yellow-100 text-yellow-800 font-bold' : 'text-slate-800'}">CAR: ${leftVal}</div>
                                <div class="flex-1 p-4 text-purple-600 font-bold bg-purple-50/50">CDR: 🔗 L1</div>
                            </div>
                        </div>
                        <div class="text-purple-400 font-bold text-2xl rotate-90 md:rotate-0">➔</div>
                        <div class="bg-white border-2 border-purple-400 rounded-lg shadow-md overflow-hidden flex flex-col w-44 transition-all duration-300">
                            <div class="bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-1 border-b border-purple-200 text-center font-mono">PAIR_2 (L1)</div>
                            <div class="flex text-center font-mono divide-x divide-purple-200">
                                <div class="flex-1 p-4 text-slate-800">CAR: 22</div>
                                <div class="flex-1 p-4 ${pairMutations.right ? 'bg-yellow-100 text-yellow-800 font-bold' : 'text-slate-800'}">CDR: ${rightVal2}</div>
                            </div>
                        </div>
                    </div>
                `;

                explainHtml = `
                    <p class="font-bold text-purple-800 mb-1 text-xs">מבנה: רשימה מקושרת</p>
                    <p class="text-slate-600 text-[11px] leading-relaxed">
                        ה-CDR של PAIR_1 מכיל הפניה (Pointer) ל-PAIR_2. בקוד: <code>(pair 11 (pair 22 33))</code>.
                        ${pairMutations.left ? '<br>• <code>setleft(PAIR_1, 99)</code> שינה את הערך השמאלי של האיבר הראשון.' : ''}
                        ${pairMutations.right ? '<br>• <code>setright(PAIR_2, 88)</code> שינה את ה-CDR של PAIR_2 ל-88.' : ''}
                    </p>
                `;
            } else if (pairStruct === 'tree') {
                const leftVal2 = pairMutations.left ? '99' : '11';
                const rightVal = pairMutations.right ? '88' : '33';

                canvasHtml = `
                    <div class="flex flex-col items-center gap-4 py-2">
                        <div class="bg-white border-2 border-purple-500 rounded-lg shadow-md overflow-hidden flex flex-col w-44 transition-all duration-300">
                            <div class="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-1 border-b border-purple-200 text-center font-mono">PAIR_1 (L0)</div>
                            <div class="flex text-center font-mono divide-x divide-purple-200">
                                <div class="flex-1 p-4 text-purple-600 font-bold bg-purple-50/50">CAR: 🔗 L1</div>
                                <div class="flex-1 p-4 ${pairMutations.right ? 'bg-yellow-100 text-yellow-800 font-bold' : 'text-slate-800'}">CDR: ${rightVal}</div>
                            </div>
                        </div>
                        <div class="text-purple-400 font-bold text-xl">↑</div>
                        <div class="bg-white border-2 border-purple-400 rounded-lg shadow-md overflow-hidden flex flex-col w-44 transition-all duration-300">
                            <div class="bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-1 border-b border-purple-200 text-center font-mono">PAIR_2 (L1)</div>
                            <div class="flex text-center font-mono divide-x divide-purple-200">
                                <div class="flex-1 p-4 ${pairMutations.left ? 'bg-yellow-100 text-yellow-800 font-bold' : 'text-slate-800'}">CAR: ${leftVal2}</div>
                                <div class="flex-1 p-4 text-slate-800">CDR: 22</div>
                            </div>
                        </div>
                    </div>
                `;

                explainHtml = `
                    <p class="font-bold text-purple-800 mb-1 text-xs">מבנה: עץ בינארי פשוט</p>
                    <p class="text-slate-600 text-[11px] leading-relaxed">
                        ה-CAR (ולא ה-CDR) של PAIR_1 מכיל הפניה ל-PAIR_2. בקוד: <code>(pair (pair 11 22) 33)</code>.
                        ${pairMutations.left ? '<br>• שינוי השמאל של PAIR_2 ל-99 עדכן את העלה השמאלי בעץ.' : ''}
                        ${pairMutations.right ? '<br>• שינוי הימין של PAIR_1 ל-88 עדכן את העלה הימני ישירות.' : ''}
                    </p>
                `;
            }

            canvas.innerHTML = canvasHtml;
            explain.innerHTML = explainHtml;
        }

  /* --- Global Exports --- */
window.toggleLangSim = toggleLangSim;
window.stepLangSim = stepLangSim;
window.toggleParamMode = toggleParamMode;
window.resetParamSim = resetParamSim;
window.stepParamSim = stepParamSim;
window.changePairStructure = changePairStructure;
window.resetPairSim = resetPairSim;
window.mutatePairCell = mutatePairCell;
window.renderPairCells = renderPairCells;
}



/* ==============================================
   VOLUME 4 SCOPED SIMULATORS
   ============================================== */
{
function showTab_old(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav'));

            document.getElementById(tabId).classList.add('active');
            document.getElementById('btn-' + tabId).classList.add('active-nav');

            document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
        }

        // --- Unification Solver JS Logic ---
        let unifStep = 0;
        const initialEqs = [
            { left: 't_x', right: 'int' },
            { left: 't_body', right: 'int' },
            { left: 't_f', right: 't_x ➔ t_body' },
            { left: 't_f', right: 'int ➔ t_res' },
            { left: 't_let', right: 't_res' }
        ];

        let eqs = [];
        let subs = [];

        function resetUnification() {
            unifStep = 0;
            eqs = JSON.parse(JSON.stringify(initialEqs));
            subs = [];

            const stepBtn = document.getElementById('btn-unif-step');
            if (stepBtn) {
                stepBtn.innerText = "צעד הבא (Step)";
                stepBtn.className = stepBtn.className.replace('bg-slate-400 hover:bg-slate-500', 'bg-emerald-600 hover:bg-emerald-700');
            }

            renderUnification();
            const explain = document.getElementById('unif-explain');
            if (explain) explain.innerHTML = 'לחצו על "צעד הבא" כדי להתחיל לפתור את מערכת המשוואות.';
        }

        function renderUnification() {
            const eqsContainer = document.getElementById('unif-eqs');
            const subsContainer = document.getElementById('unif-subs');
            if (!eqsContainer || !subsContainer) return;

            if (eqs.length === 0) {
                eqsContainer.innerHTML = '<span class="text-slate-400 italic">אין משוואות שנותרו</span>';
            } else {
                eqsContainer.innerHTML = eqs.map((eq, i) => `
                    <div class="${i === 0 ? 'bg-amber-100 border-amber-300 font-bold' : 'bg-white border-slate-200'} border p-2 rounded flex justify-between items-center transition-all duration-300">
                        <span>${eq.left}</span>
                        <span class="text-slate-400">=</span>
                        <span>${eq.right}</span>
                    </div>
                `).join('');
            }

            if (subs.length === 0) {
                subsContainer.innerHTML = '<span class="text-slate-400 italic">אין הצבות מוגמרות</span>';
            } else {
                subsContainer.innerHTML = subs.map(sub => `
                    <div class="bg-emerald-50 border-emerald-200 border p-2 rounded flex justify-between items-center animate-pulse">
                        <span>${sub.from}</span>
                        <span class="text-emerald-500">➔</span>
                        <span>${sub.to}</span>
                    </div>
                `).join('');
            }
        }

        function stepUnification() {
            const explain = document.getElementById('unif-explain');
            const stepBtn = document.getElementById('btn-unif-step');
            if (!explain || !stepBtn) return;

            if (eqs.length === 0) {
                explain.innerHTML = `<strong>סיום מוצלח!</strong><br>האלגוריתם סיים לפתור בהצלחה.<br>טיפוס ה-letrec כולו נקבע ל-<code>int</code>. הקוד תקין טיפוסית!`;
                stepBtn.innerText = "הסתיים";
                stepBtn.className = stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
                return;
            }

            const active = eqs[0];

            if (active.left === 't_x' && active.right === 'int') {
                subs.push({ from: 't_x', to: 'int' });
                eqs.shift();
                eqs = eqs.map(eq => ({
                    left: eq.left.replace('t_x', 'int'),
                    right: eq.right.replace('t_x', 'int')
                }));
                explain.innerHTML = `<strong>שלב 1: גילוי משתנה (Substitution)</strong><br>המשוואה הראשונה היא <code>t_x = int</code>. מצאנו הצבה! אנו מוסיפים אותה לטבלת ההצבות ומחליפים את <code>t_x</code> ב-<code>int</code> בכל שאר המשוואות.`;
            } else if (active.left === 't_body' && active.right === 'int') {
                subs.push({ from: 't_body', to: 'int' });
                eqs.shift();
                eqs = eqs.map(eq => ({
                    left: eq.left.replace('t_body', 'int'),
                    right: eq.right.replace('t_body', 'int')
                }));
                explain.innerHTML = `<strong>שלב 2: גילוי משתנה</strong><br>המשוואה הראשונה היא <code>t_body = int</code>. אנו מוסיפים אותה להצבות ומבצעים החלפה של <code>t_body</code> ב-<code>int</code> בשאר המשוואות שנותרו.`;
            } else if (active.left === 't_f' && active.right === 'int ➔ int') {
                subs.push({ from: 't_f', to: 'int ➔ int' });
                eqs.shift();
                eqs = eqs.map(eq => ({
                    left: eq.left.replace('t_f', 'int ➔ int'),
                    right: eq.right.replace('t_f', 'int ➔ int')
                }));
                explain.innerHTML = `<strong>שלב 3: גילוי משתנה</strong><br>המשוואה הראשונה היא <code>t_f = int ➔ int</code>. אנו מוסיפים הצבה זו לטבלה ומחליפים את <code>t_f</code> בשאר המשוואות.`;
            } else if (active.left === 'int ➔ int' && active.right === 'int ➔ t_res') {
                eqs.shift();
                eqs.push({ left: 'int', right: 'int' });
                eqs.push({ left: 'int', right: 't_res' });
                explain.innerHTML = `<strong>שלב 4: פירוק פונקציות (Decomposition)</strong><br>הגענו למשוואת חצים: <code>int ➔ int = int ➔ t_res</code>.<br>כדי שפונקציות יהיו שוות, טיפוס הקלט והפלט חייב להיות זהה. אנו מפרקים אותה לשתי משוואות חדשות: <code>int = int</code> ו-<code>int = t_res</code>.`;
            } else if (active.left === 'int' && active.right === 'int') {
                eqs.shift();
                explain.innerHTML = `<strong>שלב 5: זהות (Identity)</strong><br>המשוואה היא <code>int = int</code>. משוואה זו טריוויאלית, ולכן אנו פשוט זורקים אותה וממשיכים הלאה.`;
            } else if (active.left === 'int' && active.right === 't_res') {
                subs.push({ from: 't_res', to: 'int' });
                eqs.shift();
                eqs = eqs.map(eq => ({
                    left: eq.left.replace('t_res', 'int'),
                    right: eq.right.replace('t_res', 'int')
                }));
                explain.innerHTML = `<strong>שלב 6: גילוי משתנה (Substitution)</strong><br>המשוואה היא <code>int = t_res</code>. אנו מוסיפים את ההצבה <code>t_res = int</code> ומחליפים את <code>t_res</code> ב-<code>int</code> במשוואות שנותרו.`;
            } else if (active.left === 't_let' && active.right === 'int') {
                subs.push({ from: 't_let', to: 'int' });
                eqs.shift();
                explain.innerHTML = `<strong>שלב 7: גילוי משתנה (סיום)</strong><br>המשוואה האחרונה היא <code>t_let = int</code>. אנו רושמים את ההצבה האחרונה.<br>לא נותרו יותר משוואות!`;
            }

            renderUnification();
        }

        // --- Static Checker vs Interpreter Simulator JS Logic ---
        let pipeMode = 'checker';
        let pipeStep = 0;

        function setPipeMode(mode) {
            pipeMode = mode;
            const btnChecker = document.getElementById('btn-pipe-checker');
            const btnInterp = document.getElementById('btn-pipe-interp');

            if (mode === 'checker') {
                btnChecker.className = 'flex-1 px-3 py-2 text-xs font-bold rounded bg-purple-600 text-white shadow-sm cursor-pointer';
                btnInterp.className = 'flex-1 px-3 py-2 text-xs font-bold rounded bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
            } else {
                btnInterp.className = 'flex-1 px-3 py-2 text-xs font-bold rounded bg-purple-600 text-white shadow-sm cursor-pointer';
                btnChecker.className = 'flex-1 px-3 py-2 text-xs font-bold rounded bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
            }
            resetPipeSim();
        }

        function resetPipeSim() {
            pipeStep = 0;
            const explain = document.getElementById('pipe-explain-text');
            if (explain) {
                explain.innerHTML = 'לחצו על "בצע שלב" כדי להתחיל את הדמיית צינור העיבוד.';
            }
            const visual = document.getElementById('pipe-visual-area');
            if (visual) {
                visual.innerHTML = `
                    <div class="text-slate-400 text-xs italic py-8">מערכת מוכנה להרצה</div>
                `;
            }
            const stepBtn = document.getElementById('btn-pipe-step');
            if (stepBtn) {
                stepBtn.disabled = false;
                stepBtn.textContent = 'בצע שלב (Step)';
                stepBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        function stepPipeSim() {
            pipeStep++;
            const select = document.getElementById('pipe-code-select');
            const explain = document.getElementById('pipe-explain-text');
            const visual = document.getElementById('pipe-visual-area');

            if (!select || !explain || !visual) return;
            const codeType = select.value;

            if (pipeStep === 1) {
                explain.innerHTML = '<strong>שלב 1: Parsing (ניתוח תחבירי)</strong><br>הקוד מנותח על ידי ה-Parser ומיוצר עץ AST. שלב זה משותף לשני המסלולים.';
                visual.innerHTML = `
                    <div class="w-full max-w-sm bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono">
                        Source Code ➔ scan&amp;parse ➔ AST
                    </div>
                `;
            } else if (pipeStep === 2) {
                if (pipeMode === 'checker') {
                    explain.innerHTML = '<strong>שלב 2: סביבת טיפוסים (Type Environment)</strong><br>הפונקציה <code>type-of</code> מתחילה לעבוד עם סביבת טיפוסים ריקה. היא קושרת את <code>x</code> לטיפוס <code>int</code>.';
                    visual.innerHTML = `
                        <div class="w-full max-w-sm bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                            <div>AST: let x = 5 in -(x, 2)</div>
                            <div class="text-purple-600 font-bold border-t pt-1">Tenv: [x : int]</div>
                        </div>
                    `;
                } else {
                    explain.innerHTML = '<strong>שלב 2: סביבת ריצה (Runtime Environment)</strong><br>הפונקציה <code>value-of</code> מתחילה לעבוד עם סביבת ערכים ריקה. היא מעריכה את 5 ומקשרת את <code>x</code> לערך <code>num-val(5)</code>.';
                    visual.innerHTML = `
                        <div class="w-full max-w-sm bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                            <div>AST: let x = 5 in -(x, ...)</div>
                            <div class="text-green-600 font-bold border-t pt-1">Env: [x : num-val(5)]</div>
                        </div>
                    `;
                }
            } else if (pipeStep === 3) {
                if (pipeMode === 'checker') {
                    if (codeType === 'valid') {
                        explain.innerHTML = '<strong>שלב 3: בדיקת גוף ה-let (תקין)</strong><br>המנוע בודק את <code>-(x, 2)</code>. הוא מוודא שמשתנה x הוא int (נמצא: int) ו-2 הוא int (נמצא: int). הכל תקין!';
                        visual.innerHTML = `
                            <div class="w-full max-w-sm bg-green-50 border border-green-300 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                                <div>Check: diff-exp(x, 2)</div>
                                <div class="text-green-700 font-bold">int = int &amp;&amp; int = int</div>
                                <div class="text-slate-500 text-[10px] mt-1">Status: Success (Compile Pass)</div>
                            </div>
                        `;
                    } else {
                        explain.innerHTML = '<strong>שלב 3: בדיקת גוף ה-let (שגיאת טיפוס!)</strong><br>המנוע בודק את <code>-(x, true)</code>. הוא מוודא ש-x הוא int, אך מגלה ש-true הוא bool. מכיוון שפעולת חיסור דורשת int, מתרחשת <strong>שגיאת קומפילציה סטטית</strong>!';
                        visual.innerHTML = `
                            <div class="w-full max-w-sm bg-red-50 border border-red-400 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                                <div>Check: diff-exp(x, true)</div>
                                <div class="text-red-600 font-bold">Expected int, found bool!</div>
                                <div class="text-red-700 font-bold text-[10px] mt-1">Status: Compile Error (Rejected)</div>
                            </div>
                        `;
                        const stepBtn = document.getElementById('btn-pipe-step');
                        if (stepBtn) {
                            stepBtn.disabled = true;
                            stepBtn.textContent = 'הקומפילציה נכשלה';
                            stepBtn.classList.add('opacity-50', 'cursor-not-allowed');
                        }
                    }
                } else {
                    explain.innerHTML = '<strong>שלב 3: הערכת גוף ה-let</strong><br>המפרש מריץ את גוף ה-let בסביבה. הוא שולף את הערך של x (הוא 5) ומבצע את פעולת החיסור.';
                    visual.innerHTML = `
                        <div class="w-full max-w-sm bg-white border border-slate-200 rounded p-2 text-center text-xs font-mono flex flex-col gap-1">
                            <div>Eval: diff-exp(x, operand)</div>
                            <div>x = 5</div>
                        </div>
                    `;
                }
            } else if (pipeStep === 4) {
                if (pipeMode === 'checker') {
                    explain.innerHTML = '<strong>שלב 4: תוצאה סטטית</strong><br>הקוד עבר קומפילציה בהצלחה והוכח כבטוח מטיפוסים! כעת ניתן להריץ אותו בבטחה ללא שום בדיקות טיפוסים בזמן ריצה.<br><span class="text-green-600 font-bold text-sm block mt-2">תוצאה: הטיפוס הוא int</span>';
                    visual.innerHTML = `
                        <div class="w-full max-w-sm bg-green-100 border border-green-400 rounded p-3 text-center text-xs font-mono">
                            <span class="text-green-800 font-bold">Success! Static Type: int</span>
                        </div>
                    `;
                } else {
                    if (codeType === 'valid') {
                        explain.innerHTML = '<strong>שלב 4: תוצאה בזמן ריצה (תקין)</strong><br>המפרש מחסר 2 מ-5 ומחזיר את הערך המבוטא 3.<br><span class="text-green-600 font-bold text-sm block mt-2">תוצאה סופית: num-val(3)</span>';
                        visual.innerHTML = `
                            <div class="w-full max-w-sm bg-green-100 border border-green-400 rounded p-3 text-center text-xs font-mono">
                                <span class="text-green-800 font-bold">Result: num-val(3)</span>
                            </div>
                        `;
                    } else {
                        explain.innerHTML = '<strong>שלב 4: קריסת המפרש בזמן ריצה!</strong><br>המפרש מנסה לחסר את הבוליאני true (bool-val) מהמספר 5 (num-val). מכיוון שאין שלב בדיקה מוקדם, המפרש קורס בזמן הריצה!<br><span class="text-red-600 font-bold text-sm block mt-2">תוצאה: Runtime Crash!</span>';
                        visual.innerHTML = `
                            <div class="w-full max-w-sm bg-red-100 border border-red-400 rounded p-3 text-center text-xs font-mono">
                                <span class="text-red-800 font-bold">CRASH: Expected number, got true</span>
                            </div>
                        `;
                    }
                }
                const stepBtn = document.getElementById('btn-pipe-step');
                if (stepBtn) {
                    stepBtn.disabled = true;
                    stepBtn.textContent = 'הסתיים';
                    stepBtn.classList.add('opacity-50', 'cursor-not-allowed');
                }
            }
        }

        // --- High-Order Type Builder JS Logic ---
        function buildType() {
            const arg = document.getElementById('builder-arg').value;
            const res = document.getElementById('builder-res').value;

            const friendlyEl = document.getElementById('builder-friendly');
            const eoplEl = document.getElementById('builder-eopl');
            const descEl = document.getElementById('builder-desc');

            if (!friendlyEl || !eoplEl || !descEl) return;

            let argText = '';
            let argEopl = '';
            if (arg === 'int') {
                argText = 'int';
                argEopl = '(int-type)';
            } else if (arg === 'bool') {
                argText = 'bool';
                argEopl = '(bool-type)';
            } else if (arg === 'int_to_int') {
                argText = '(int -> int)';
                argEopl = '(proc-type (int-type) (int-type))';
            } else if (arg === 'int_to_bool') {
                argText = '(int -> bool)';
                argEopl = '(proc-type (int-type) (bool-type))';
            }

            let resText = '';
            let resEopl = '';
            if (res === 'int') {
                resText = 'int';
                resEopl = '(int-type)';
            } else if (res === 'bool') {
                resText = 'bool';
                resEopl = '(bool-type)';
            } else if (res === 'int_to_int') {
                resText = '(int -> int)';
                resEopl = '(proc-type (int-type) (int-type))';
            } else if (res === 'int_to_bool') {
                resText = '(int -> bool)';
                resEopl = '(proc-type (int-type) (bool-type))';
            }

            friendlyEl.textContent = `${argText} -> ${resText}`;
            eoplEl.textContent = `(proc-type ${argEopl} ${resEopl})`;

            let desc = '';
            const isArgProc = arg.includes('to');
            const isResProc = res.includes('to');

            if (!isArgProc && !isResProc) {
                desc = `פונקציה בסיסית מטיפוס פשוט. היא מקבלת ערך בסיסי מטיפוס <strong>${arg}</strong> ומחזירה ערך מטיפוס <strong>${res}</strong>.`;
            } else if (isArgProc && !isResProc) {
                desc = `פונקציה מסדר גבוה (High-order function). היא <strong>מקבלת פונקציה כקלט</strong> (פונקציה מסוג ${argText}) ומחזירה ערך בסיסי מסוג <strong>${resText}</strong>. למשל: פונקציית אינטגרל שמקבלת פונקציה מתמטית ומחזירה מספר.`;
            } else if (!isArgProc && isResProc) {
                desc = `פונקציה המבצעת קארינג (Currying). היא מקבלת ערך בסיסי מסוג <strong>${argText}</strong> ו<strong>מחזירה פונקציה חדשה</strong> (מטיפוס ${resText}). למשל: פונקציה המקבלת מזהה של עובד ומחזירה פונקציית שאילתה מתאימה.`;
            } else {
                desc = `פונקציה מסדר גבוה מורכבת במיוחד. היא גם <strong>מקבלת פונקציה כקלט</strong> וגם <strong>מחזירה פונקציה כפלט</strong>. למשל: פונקציה שמבצעת הרכבת פונקציות (Composition).`;
            }
            descEl.innerHTML = desc;
        }

        // =========================================================================
        // --- NEW WIDGETS CONTROLLERS (MANUALLY INJECTED) ---
        // =========================================================================

        // --- Widget 1: Architecture Builder JS Logic ---
        let selectedArchSnippet = null;
        const archSnippetsData = [
            { text: `(apply-tenv ...)`, correct: `checker.scm`, bg: `bg-blue-100 text-blue-800 border-blue-200` },
            { text: `(apply-env ...)`, correct: `interp.scm`, bg: `bg-indigo-100 text-indigo-800 border-indigo-200` },
            { text: `(check-equal-type! ...)`, correct: `checker.scm`, bg: `bg-sky-100 text-sky-800 border-sky-200` },
            { text: `(num-val ...)`, correct: `interp.scm`, bg: `bg-emerald-100 text-emerald-800 border-emerald-200` },
            { text: `(scan&parse ...)`, correct: `lang.scm`, bg: `bg-purple-100 text-purple-800 border-purple-200` }
        ];
        let archPlacements = {};

        function resetArchBuilder() {
            selectedArchSnippet = null;
            archPlacements = {};
            const feedback = document.getElementById('arch-feedback');
            if (feedback) {
                feedback.classList.add('hidden');
                feedback.innerHTML = '';
            }

            const boxes = [
                { id: 'target-checker', border: 'border-blue-300' },
                { id: 'vol4-target-interp', border: 'border-emerald-300' },
                { id: 'vol4-target-lang', border: 'border-amber-300' }
            ];
            boxes.forEach(b => {
                const el = document.getElementById(b.id);
                if (el) {
                    el.className = el.className.replace(/border-rose-500|border-emerald-500/g, b.border);
                }
            });

            renderArchSnippets();
            renderPlacedSnippets();
        }

        function renderArchSnippets() {
            const container = document.getElementById('arch-snippets');
            if (!container) return;
            container.innerHTML = '';

            archSnippetsData.forEach(snippet => {
                if (!archPlacements[snippet.text]) {
                    const isSelected = selectedArchSnippet === snippet.text;
                    const btn = document.createElement('button');
                    btn.className = `arch-snippet-btn px-3 py-1.5 rounded-lg border text-xs font-mono cursor-grab transition-all ${snippet.bg} ${isSelected ? 'ring-4 ring-blue-500' : 'hover:scale-105 shadow-sm'}`;
                    btn.draggable = true;
                    btn.textContent = snippet.text;

                    btn.ondragstart = (e) => {
                        e.dataTransfer.setData("text", snippet.text);
                    };

                    btn.onclick = () => {
                        if (selectedArchSnippet === snippet.text) {
                            selectedArchSnippet = null;
                            btn.classList.remove('ring-4', 'ring-blue-500');
                        } else {
                            selectedArchSnippet = snippet.text;
                            document.querySelectorAll('.arch-snippet-btn').forEach(b => b.classList.remove('ring-4', 'ring-blue-500'));
                            btn.classList.add('ring-4', 'ring-blue-500');
                        }
                    };

                    container.appendChild(btn);
                }
            });
        }

        function renderPlacedSnippets() {
            const zones = {
                'checker.scm': document.getElementById('zone-checker'),
                'interp.scm': document.getElementById('zone-interp'),
                'lang.scm': document.getElementById('zone-lang')
            };

            const counts = {
                'checker.scm': document.getElementById('count-checker'),
                'interp.scm': document.getElementById('count-interp'),
                'lang.scm': document.getElementById('count-lang')
            };

            Object.keys(zones).forEach(key => {
                if (zones[key]) zones[key].innerHTML = '';
                if (counts[key]) counts[key].textContent = '0';
            });

            let boxCounts = { 'checker.scm': 0, 'interp.scm': 0, 'lang.scm': 0 };
            Object.keys(archPlacements).forEach(snippetText => {
                const box = archPlacements[snippetText];
                const zone = zones[box];
                if (zone) {
                    boxCounts[box]++;
                    const div = document.createElement('div');
                    div.className = "p-2 bg-white rounded border border-slate-200 shadow-sm text-xs font-mono font-bold text-slate-800 flex justify-between items-center";
                    div.innerHTML = `
                        <span>${snippetText}</span>
                        <button onclick="removeArchSnippet('${snippetText.replace(/'/g, "\\'")}')" class="text-rose-500 hover:text-rose-700 font-bold ml-2">×</button>
                    `;
                    zone.appendChild(div);
                }
            });

            Object.keys(counts).forEach(key => {
                if (counts[key]) counts[key].textContent = boxCounts[key].toString();
            });
        }

        function removeArchSnippet(snippetText) {
            delete archPlacements[snippetText];
            renderArchSnippets();
            renderPlacedSnippets();
        }

        function allowDrop(event) {
            event.preventDefault();
        }

        function handleDrop(event, targetBox) {
            event.preventDefault();
            const snippetText = event.dataTransfer.getData("text");
            if (!snippetText) return;
            placeSnippet(snippetText, targetBox);
        }

        function clickTargetBox(targetBox) {
            if (selectedArchSnippet) {
                placeSnippet(selectedArchSnippet, targetBox);
                selectedArchSnippet = null;
            }
        }

        function placeSnippet(snippetText, targetBox) {
            const valid = archSnippetsData.some(s => s.text === snippetText);
            if (!valid) return;
            archPlacements[snippetText] = targetBox;
            renderArchSnippets();
            renderPlacedSnippets();
        }

        function checkArchBuilder() {
            const feedback = document.getElementById('arch-feedback');
            if (!feedback) return;

            const totalSnippets = archSnippetsData.length;
            const placedCount = Object.keys(archPlacements).length;

            if (placedCount < totalSnippets) {
                feedback.className = "mt-4 p-3 rounded-lg text-xs leading-relaxed bg-amber-50 border border-amber-200 text-amber-800 font-bold";
                feedback.innerHTML = `⚠️ נא לשייך את כל 5 קטעי הקוד לפני הבדיקה!`;
                feedback.classList.remove('hidden');
                return;
            }

            let incorrectList = [];
            archSnippetsData.forEach(snippet => {
                const placedBox = archPlacements[snippet.text];
                if (placedBox !== snippet.correct) {
                    incorrectList.push({ text: snippet.text, placed: placedBox, correct: snippet.correct });
                }
            });

            if (incorrectList.length === 0) {
                feedback.className = "mt-4 p-3 rounded-lg text-xs leading-relaxed bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold";
                feedback.innerHTML = `🎉 <strong>דיוק מושלם!</strong> כל קטעי הקוד שויכו בצורה נכונה לחלוטין!<br>שמתם לב שהמפרש בזמן הריצה (<code>interp.scm</code>) לא מתעסק בכלל בבדיקות טיפוסים, בעוד ש-<code>checker.scm</code> מטפל אך ורק בהסקה ובדיקה סטטית. זהו מנגנון הפרדת האחריות.`;
                feedback.classList.remove('hidden');

                ['target-checker', 'vol4-target-interp', 'vol4-target-lang'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.className = el.className.replace(/border-blue-300|border-emerald-300|border-slate-300|border-rose-500/g, 'border-emerald-500');
                    }
                });
            } else {
                feedback.className = "mt-4 p-3 rounded-lg text-xs leading-relaxed bg-rose-50 border border-rose-300 text-rose-800";
                let errorMsg = `<strong>נמצאו שגיאות בשיוך הארכיטקטורה:</strong><ul class="list-disc list-inside mt-2 space-y-1.5 font-bold">`;
                incorrectList.forEach(err => {
                    if (err.correct === 'checker.scm') {
                        errorMsg += `<li>הקטע <code>${err.text}</code> שייך לשלב בדיקת הטיפוסים הסטטי ב-<code>checker.scm</code>, ולא ל-<code>${err.placed}</code>.</li>`;
                    } else if (err.correct === 'interp.scm') {
                        errorMsg += `<li>הקטע <code>${err.text}</code> משמש בזמן ריצה ומנוהל על ידי המפרש ב-<code>interp.scm</code>, ולא ב-<code>${err.placed}</code>.</li>`;
                    } else if (err.correct === 'lang.scm') {
                        errorMsg += `<li>הקטע <code>${err.text}</code> מגדיר את מבנה השפה והדקדוק, לכן מקומו ב-<code>lang.scm</code> ולא ב-<code>${err.placed}</code>.</li>`;
                    }
                });
                errorMsg += `</ul>`;
                feedback.innerHTML = errorMsg;
                feedback.classList.remove('hidden');

                ['target-checker', 'vol4-target-interp', 'vol4-target-lang'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.className = el.className.replace(/border-blue-300|border-emerald-300|border-slate-300|border-emerald-500/g, 'border-rose-500');
                    }
                });
            }
        }

        // --- Widget 2: Type Annotation Puzzle JS Logic ---
        let puzzleState = { 1: null, 2: null };

        function openPuzzleMenu(holeId) {
            const otherId = holeId === 1 ? 2 : 1;
            const otherMenu = document.getElementById(`puzzle-menu-${otherId}`);
            if (otherMenu) otherMenu.classList.add('hidden');

            const menu = document.getElementById(`puzzle-menu-${holeId}`);
            if (menu) {
                menu.classList.toggle('hidden');
            }
        }

        function selectPuzzleOption(holeId, option) {
            puzzleState[holeId] = option;
            const hole = document.getElementById(`puzzle-hole-${holeId}`);
            if (hole) {
                hole.textContent = option;
                hole.className = "bg-emerald-600 text-white px-3 py-1 rounded cursor-pointer border border-solid border-emerald-500 font-bold transition-all relative";
            }

            const menu = document.getElementById(`puzzle-menu-${holeId}`);
            if (menu) menu.classList.add('hidden');

            checkPuzzle();
        }

        function checkPuzzle() {
            const feedback = document.getElementById('puzzle-feedback');
            if (!feedback) return;

            const h1 = puzzleState[1];
            const h2 = puzzleState[2];

            if (!h1 || !h2) {
                feedback.classList.add('hidden');
                return;
            }

            feedback.classList.remove('hidden');

            if (h1 === 'bool' && h2 === 'true') {
                feedback.className = "p-3 rounded-lg text-xs leading-relaxed bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold";
                feedback.innerHTML = `✅ <strong>פתרון נכון!</strong> הגדרת ש-x הוא bool (מכיוון שהוא משמש כתנאי בתוך ה-if) ושלחת לפונקציה f את הערך הבוליאני true. הקוד יעבור קומפילציה סטטית בשלום!`;
            } else if (h1 === 'int') {
                feedback.className = "p-3 rounded-lg text-xs leading-relaxed bg-rose-50 border border-rose-300 text-rose-800 font-bold";
                feedback.innerHTML = `❌ <strong>שגיאת טיפוס!</strong> הפרמטר x משמש כביטוי התנאי בתוך ה-<code>if x then ...</code>. בשפות סטטיות כמו CHECKED, התנאי בתוך if חייב להיות מטיפוס bool. הגדרתו כ-int תגרור שגיאת בדיקת טיפוסים (Type Check Error)!`;
            } else if (h1 === 'int -> int') {
                feedback.className = "p-3 rounded-lg text-xs leading-relaxed bg-rose-50 border border-rose-300 text-rose-800 font-bold";
                feedback.innerHTML = `❌ <strong>שגיאת טיפוס!</strong> הפרמטר x משמש כביטוי התנאי בתוך ה-if. פונקציה (int -> int) אינה יכולה לשמש כתנאי בתוך if!`;
            } else if (h1 === 'bool' && h2 === '5') {
                feedback.className = "p-3 rounded-lg text-xs leading-relaxed bg-amber-50 border border-amber-300 text-amber-800 font-bold";
                feedback.innerHTML = `⚠️ <strong>כמעט!</strong> הגדרת בצורה נכונה ש-x הוא bool, אבל אז שלחת לפונקציה f את הערך 5 (שהוא int). מערכת הטיפוסים הסטטית תראה קריאה של פונקציה המצפה ל-bool עם ארגומנט מסוג int ותיכשל!`;
            } else if (h1 === 'bool' && h2 === 'proc(y:int) y') {
                feedback.className = "p-3 rounded-lg text-xs leading-relaxed bg-amber-50 border border-amber-300 text-amber-800 font-bold";
                feedback.innerHTML = `⚠️ <strong>כמעט!</strong> הגדרת בצורה נכונה ש-x הוא bool, אבל שלחת לפונקציה f פרוצדורה (proc). הטיפוסים אינם מתאימים!`;
            }
        }

        function resetPuzzle() {
            puzzleState = { 1: null, 2: null };
            const h1 = document.getElementById('puzzle-hole-1');
            const h2 = document.getElementById('puzzle-hole-2');
            if (h1) {
                h1.textContent = "[ ? ]";
                h1.className = "bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded cursor-pointer border border-dashed border-slate-400 font-bold transition-all relative";
            }
            if (h2) {
                h2.textContent = "[ ? ]";
                h2.className = "bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded cursor-pointer border border-dashed border-slate-400 font-bold transition-all relative";
            }

            const menu1 = document.getElementById('puzzle-menu-1');
            const menu2 = document.getElementById('puzzle-menu-2');
            if (menu1) menu1.classList.add('hidden');
            if (menu2) menu2.classList.add('hidden');

            const feedback = document.getElementById('puzzle-feedback');
            if (feedback) {
                feedback.classList.add('hidden');
                feedback.innerHTML = '';
            }
        }

        // --- Widget 3: State-Threading Visualizer JS Logic ---
        let threadStep = 0;
        const threadSteps = [
            {
                title: `התחלה`,
                explain: `ה-Inferrer נכנס ל-E1 עם טבלת הצבות ריקה. הוא מסיק טיפוס עבור E1 ומייצר הצבה חדשה.`,
                bubbleTitle: `an-answer (קלט)`,
                bubbleSubst: `subst: []`,
                bubblePos: { top: `10px`, left: `calc(50% - 48px)` },
                activeNode: `ast-node-root`,
                showBubble: true
            },
            {
                title: `שלב 1: E1`,
                explain: `ה-Inferrer סורק את E1 ומסיק שטיפוסו int. הוא מחזיר an-answer מעודכן המכיל את ההצבה [t1=int].`,
                bubbleTitle: `an-answer (פלט מ-E1)`,
                bubbleSubst: `subst: [t1=int]`,
                bubblePos: { top: `100px`, left: `calc(25% - 48px)` },
                activeNode: `ast-node-e1`,
                showBubble: true
            },
            {
                title: `שלב 2: E2`,
                explain: `ההצבה [t1=int] מושחלת ('threaded') ישירות כקלט לתוך E2. ה-Inferrer סורק את E2 ומסיק שטיפוסו int, ומוסיף את ההצבה [t2=int].`,
                bubbleTitle: `an-answer (פלט מ-E2)`,
                bubbleSubst: `subst: [t1=int, t2=int]`,
                bubblePos: { top: `100px`, left: `calc(75% - 48px)` },
                activeNode: `ast-node-e2`,
                showBubble: true
            },
            {
                title: `שלב 3: שורש`,
                explain: `ה-Inferrer חוזר לשורש (ביטוי החיסור) עם ההצבה המעודכנת, ומבצע Unification סופי כדי לוודא ששני האופרנדים הם מספרים ותוצאת החיסור היא int.`,
                bubbleTitle: `an-answer (פלט סופי)`,
                bubbleSubst: `subst: [t1=int, t2=int, t_diff=int]`,
                bubblePos: { top: `10px`, left: `calc(50% - 48px)` },
                activeNode: `ast-node-root`,
                showBubble: true
            }
        ];

        function stepStateThreading() {
            if (threadStep >= threadSteps.length) {
                resetStateThreading();
                return;
            }
            const stepData = threadSteps[threadStep];

            const explainEl = document.getElementById('thread-explain');
            if (explainEl) {
                explainEl.innerHTML = `<strong>${stepData.title}</strong><br>${stepData.explain}`;
            }

            [`ast-node-root`, `ast-node-e1`, `ast-node-e2`].forEach(nodeId => {
                const el = document.getElementById(nodeId);
                if (el) {
                    if (nodeId === stepData.activeNode) {
                        el.classList.remove('bg-slate-200', 'border-slate-400');
                        el.classList.add('bg-fuchsia-600', 'border-fuchsia-700', 'text-white');
                    } else {
                        el.classList.remove('bg-fuchsia-600', 'border-fuchsia-700', 'text-white');
                        el.classList.add('bg-slate-200', 'border-slate-400', 'text-slate-700');
                    }
                }
            });

            const bubble = document.getElementById('thread-state-bubble');
            if (bubble) {
                bubble.style.top = stepData.bubblePos.top;
                bubble.style.left = stepData.bubblePos.left;
                bubble.style.opacity = stepData.showBubble ? "1" : "0";

                const titleEl = bubble.querySelector('.bubble-title');
                const substEl = bubble.querySelector('.bubble-subst');
                if (titleEl) titleEl.textContent = stepData.bubbleTitle;
                if (substEl) substEl.textContent = stepData.bubbleSubst;
            }

            const btn = document.getElementById('btn-thread-step');
            if (btn) {
                if (threadStep === threadSteps.length - 1) {
                    btn.textContent = `התחל מחדש`;
                } else {
                    btn.textContent = `צעד הבא (Step)`;
                }
            }

            threadStep++;
        }

        function resetStateThreading() {
            threadStep = 0;
            const btn = document.getElementById('btn-thread-step');
            if (btn) btn.textContent = `התחל הדמיה`;

            const explainEl = document.getElementById('thread-explain');
            if (explainEl) explainEl.innerHTML = `לחצו על "צעד הבא" כדי להתחיל את הדמיית מעבר המצב בעץ.`;

            const bubble = document.getElementById('thread-state-bubble');
            if (bubble) {
                bubble.style.opacity = "0";
                bubble.style.top = "0px";
                bubble.style.left = "0px";
            }

            [`ast-node-root`, `ast-node-e1`, `ast-node-e2`].forEach(nodeId => {
                const el = document.getElementById(nodeId);
                if (el) {
                    el.classList.remove('bg-fuchsia-600', 'border-fuchsia-700', 'text-white');
                    el.classList.add('bg-slate-200', 'border-slate-400', 'text-slate-700');
                }
            });
        }

        // --- Widget 4: Gensym X-Ray Scanner JS Logic ---
        function initXrayScanner() {
            const editor = document.getElementById('xray-editor');
            const lens = document.getElementById('xray-lens');
            const output = document.getElementById('xray-output');

            if (!editor || !lens || !output) return;

            document.querySelectorAll('.xray-hoverable').forEach(el => {
                el.addEventListener('mouseenter', (e) => {
                    lens.classList.remove('hidden');
                    const desc = el.getAttribute('data-desc');
                    output.innerHTML = desc;
                });

                el.addEventListener('mousemove', (e) => {
                    const rect = editor.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    lens.style.left = `${x}px`;
                    lens.style.top = `${y}px`;
                });

                el.addEventListener('mouseleave', () => {
                    lens.classList.add('hidden');
                    output.innerHTML = `העבירו את העכבר על אחד הרכיבים המסומנים בקו מקווקו מעל עורך הקוד.`;
                });
            });
        }

        // --- Widget 5: Interactive AST Equation Extractor JS Logic ---
        let resolvedNodes = { x: false, 5: false, diff: false, zero: false };
        let extractorEquations = [];
        let currentExtractorNode = null;

        function resetEqExtractor() {
            resolvedNodes = { x: false, 5: false, diff: false, zero: false };
            extractorEquations = [];
            currentExtractorNode = null;

            const btnX = document.getElementById('ast-eq-x');
            const btn5 = document.getElementById('ast-eq-5');
            const btnDiff = document.getElementById('ast-eq-diff');
            const btnZero = document.getElementById('ast-eq-zero');

            if (btnX) {
                btnX.disabled = false;
                btnX.className = "w-14 h-10 rounded-lg bg-amber-500 border-2 border-amber-600 text-white flex items-center justify-center shadow-md transition-all cursor-pointer";
            }
            if (btn5) {
                btn5.disabled = false;
                btn5.className = "w-14 h-10 rounded-lg bg-amber-500 border-2 border-amber-600 text-white flex items-center justify-center shadow-md transition-all cursor-pointer";
            }
            if (btnDiff) {
                btnDiff.disabled = true;
                btnDiff.className = "w-16 h-10 rounded-lg bg-slate-100 border-2 border-slate-300 text-slate-400 flex items-center justify-center transition-all cursor-not-allowed";
            }
            if (btnZero) {
                btnZero.disabled = true;
                btnZero.className = "w-20 h-10 rounded-lg bg-slate-100 border-2 border-slate-300 text-slate-400 flex items-center justify-center transition-all cursor-not-allowed";
            }

            const listEl = document.getElementById('extractor-eqs-list');
            if (listEl) {
                listEl.innerHTML = `<div class="text-slate-400 italic text-center py-4">טרם נאספו משוואות</div>`;
            }

            const questionPanel = document.getElementById('extractor-question-panel');
            if (questionPanel) questionPanel.classList.add('hidden');
        }

        function clickAstEqNode(nodeId) {
            const btn = document.getElementById(`ast-eq-${nodeId}`);
            if (btn && btn.disabled) return;

            currentExtractorNode = nodeId;

            const questionPanel = document.getElementById('extractor-question-panel');
            const qTitle = document.getElementById('extractor-q-title');
            const qOptions = document.getElementById('extractor-q-options');

            if (!questionPanel || !qTitle || !qOptions) return;

            questionPanel.classList.remove('hidden');

            let titleText = "";
            let options = [];

            if (nodeId === 'x') {
                titleText = `מהו הטיפוס המשוייך למשתנה x בסביבה הסטטית (Tenv)?`;
                options = [
                    { text: `t_x = int`, correct: false, feedback: `לא נכון. ה-Tenv לא יודע ש-x הוא מספר עדיין, הוא רק מקצה לו משתנה טיפוס חופשי t_x.` },
                    { text: `x : t_x (משתנה טיפוס חופשי מהסביבה)`, correct: true, feedback: `נכון מאוד! המזהה x מקבל משתנה טיפוס טרי בסביבת הטיפוסים.` },
                    { text: `t_x = bool`, correct: false, feedback: `לא נכון. בסביבה הסטטית x מקבל משתנה טיפוס חופשי t_x.` }
                ];
            } else if (nodeId === '5') {
                titleText = `מהו הטיפוס המשוייך לקבוע המספרי 5?`;
                options = [
                    { text: `t_5 = int (קבוע מספרי)`, correct: true, feedback: `נכון מאוד! כל מספר קבוע מטיפוסו int.` },
                    { text: `t_5 = bool`, correct: false, feedback: `לא נכון. 5 הוא מספר, לא בוליאני.` },
                    { text: `t_5 = t_x`, correct: false, feedback: `לא נכון. קבוע לא תלוי במזהים אחרים.` }
                ];
            } else if (nodeId === 'diff') {
                titleText = `איזה משוואות נוצרות בביטוי החיסור -(x, 5)?`;
                options = [
                    { text: `t_x = bool, t_5 = bool`, correct: false, feedback: `לא נכון. פעולת חיסור מצפה לארגומנטים מסוג int.` },
                    { text: `t_x = int, t_5 = int (שני האופרנדים int), וכן t_diff = int`, correct: true, feedback: `נכון מאוד! האופרנדים של חיסור חייבים להיות int, וגם תוצאת החיסור היא int.` },
                    { text: `t_x = t_5`, correct: false, feedback: `לא מספיק. החיסור דורש במפורש ששניהם יהיו int, ולא רק שווים זה לזה.` }
                ];
            } else if (nodeId === 'zero') {
                titleText = `איזו משוואה נוצרת מפעולת zero? שמקבלת את תוצאת החיסור?`;
                options = [
                    { text: `t_diff = bool`, correct: false, feedback: `לא נכון. zero? מקבל ביטוי מטיפוס int.` },
                    { text: `t_diff = int (קלט מספרי), וכן t_zero = bool`, correct: true, feedback: `נכון מאוד! zero? מקבל מספר ומחזיר בוליאני.` },
                    { text: `t_zero = int`, correct: false, feedback: `לא נכון. zero? מחזיר ערך בוליאני.` }
                ];
            }

            qTitle.textContent = titleText;
            qOptions.innerHTML = options.map((opt, i) => `
                <button onclick="selectExtractorOption(\${i})" class="w-full text-right p-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer">
                    \${opt.text}
                </button>
            `).join('');

            window.currentExtractorOptions = options;
        }

        function selectExtractorOption(index) {
            const options = window.currentExtractorOptions;
            if (!options || !options[index]) return;
            const opt = options[index];

            const qOptions = document.getElementById('extractor-q-options');
            if (!qOptions) return;

            if (opt.correct) {
                qOptions.innerHTML = `
                    <div class="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-bold leading-relaxed mb-3">
                        ✅ \${opt.feedback}
                    </div>
                `;

                resolvedNodes[currentExtractorNode] = true;

                const btn = document.getElementById(`ast-eq-\${currentExtractorNode}`);
                if (btn) {
                    btn.disabled = true;
                    btn.className = btn.className.replace(/bg-amber-500|border-amber-600|bg-slate-100|border-slate-300|text-slate-400/g, 'bg-emerald-600 border-emerald-700 text-white font-bold cursor-not-allowed');
                }

                if (currentExtractorNode === 'x') {
                    extractorEquations.push("x : t_x (lookup)");
                } else if (currentExtractorNode === '5') {
                    extractorEquations.push("t_5 = int");
                } else if (currentExtractorNode === 'diff') {
                    extractorEquations.push("t_x = int", "t_5 = int", "t_diff = int");
                } else if (currentExtractorNode === 'zero') {
                    extractorEquations.push("t_diff = int", "t_zero = bool");
                }

                const listEl = document.getElementById('extractor-eqs-list');
                if (listEl) {
                    listEl.innerHTML = extractorEquations.map(eq => `
                        <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 p-1.5 rounded text-center transition-all duration-300">
                            \${eq}
                        </div>
                    `).join('');
                }

                if (resolvedNodes.x && resolvedNodes['5'] && !resolvedNodes.diff) {
                    const diffBtn = document.getElementById('ast-eq-diff');
                    if (diffBtn) {
                        diffBtn.disabled = false;
                        diffBtn.className = "w-16 h-10 rounded-lg bg-amber-500 border-2 border-amber-600 text-white flex items-center justify-center shadow-md transition-all cursor-pointer";
                    }
                } else if (resolvedNodes.diff && !resolvedNodes.zero) {
                    const zeroBtn = document.getElementById('ast-eq-zero');
                    if (zeroBtn) {
                        zeroBtn.disabled = false;
                        zeroBtn.className = "w-20 h-10 rounded-lg bg-amber-500 border-2 border-amber-600 text-white flex items-center justify-center shadow-md transition-all cursor-pointer";
                    }
                } else if (resolvedNodes.zero) {
                    setTimeout(() => {
                        const questionPanel = document.getElementById('extractor-question-panel');
                        if (questionPanel) {
                            questionPanel.innerHTML = `
                                <div class="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-center font-bold text-xs leading-relaxed">
                                    🎉 מעולה! חילצתם את כל המשוואות בהצלחה!
                                    <br>אלגוריתם ה-Unification כעת יכול לפתור אותן מלמטה למעלה:
                                    <br><span class="font-mono mt-1 block">t_x = int, t_5 = int, t_diff = int, t_zero = bool</span>
                                </div>
                            `;
                        }
                    }, 1000);
                }
            } else {
                qOptions.innerHTML = `
                    <div class="p-3 bg-rose-100 border border-rose-300 text-rose-800 rounded-lg text-xs font-bold leading-relaxed mb-3">
                        ❌ \${opt.feedback}
                    </div>
                    <button onclick="clickAstEqNode('\\${currentExtractorNode}')" class="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg text-xs transition-colors cursor-pointer">
                        נסה שוב
                    </button>
                `;
            }
        }

        // --- Widget 6: Polymorphism Lock-in Simulator JS Logic ---
        let lockinState = {
            slot1: null,
            slot2: null,
            lockedType: null
        };
        let selectedLockinSnippet = null;

        function resetLockin() {
            lockinState = { slot1: null, slot2: null, lockedType: null };
            selectedLockinSnippet = null;

            const statusBox = document.getElementById('lockin-status-box');
            if (statusBox) {
                statusBox.textContent = `t_x = חופשי (Unbound)`;
                statusBox.className = "text-xs font-mono font-bold text-slate-500 text-center py-2 bg-slate-100 rounded";
            }

            const varType = document.getElementById('lockin-var-type');
            if (varType) {
                varType.textContent = `? (t_x)`;
                varType.className = "bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30 font-bold";
            }

            const feedback = document.getElementById('lockin-feedback');
            if (feedback) {
                feedback.classList.add('hidden');
                feedback.innerHTML = '';
            }

            [1, 2].forEach(slotNum => {
                const slot = document.getElementById(`lockin-slot-${slotNum}`);
                if (slot) {
                    slot.textContent = `[ קריאה ${slotNum} ]`;
                    slot.className = "inline-block bg-slate-800 border-2 border-dashed border-slate-600 hover:border-slate-400 text-slate-400 px-4 py-2 rounded cursor-pointer transition-all min-w-[80px] text-center font-bold";
                }
            });

            const f5 = document.getElementById('drag-f5');
            if (f5) f5.className = "p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing text-xs font-mono font-bold text-blue-600 flex justify-between items-center";
            const ftrue = document.getElementById('drag-ftrue');
            if (ftrue) ftrue.className = "p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing text-xs font-mono font-bold text-emerald-600 flex justify-between items-center";
        }

        function handleLockinDragStart(event, text) {
            event.dataTransfer.setData("text", text);
        }

        function selectLockinSnippet(text) {
            selectedLockinSnippet = text;
            const f5 = document.getElementById('drag-f5');
            const ftrue = document.getElementById('drag-ftrue');

            if (text === '(f 5)') {
                if (f5) f5.classList.add('ring-4', 'ring-blue-500');
                if (ftrue) ftrue.classList.remove('ring-4', 'ring-blue-500');
            } else {
                if (ftrue) ftrue.classList.add('ring-4', 'ring-blue-500');
                if (f5) f5.classList.remove('ring-4', 'ring-blue-500');
            }
        }

        function handleLockinDrop(event, slotNum) {
            event.preventDefault();
            const text = event.dataTransfer.getData("text");
            if (text) {
                placeLockinCall(text, slotNum);
            }
        }

        function clickLockinSlot(slotNum) {
            if (selectedLockinSnippet) {
                placeLockinCall(selectedLockinSnippet, slotNum);
                selectedLockinSnippet = null;
                const f5 = document.getElementById('drag-f5');
                if (f5) f5.classList.remove('ring-4', 'ring-blue-500');
                const ftrue = document.getElementById('drag-ftrue');
                if (ftrue) ftrue.classList.remove('ring-4', 'ring-blue-500');
            }
        }

        function placeLockinCall(text, slotNum) {
            const feedback = document.getElementById('lockin-feedback');
            const statusBox = document.getElementById('lockin-status-box');
            const varType = document.getElementById('lockin-var-type');
            const slot = document.getElementById(`lockin-slot-${slotNum}`);

            if (!feedback || !statusBox || !varType || !slot) return;

            if (slotNum === 1) {
                lockinState.slot1 = text;
            } else {
                lockinState.slot2 = text;
            }

            slot.textContent = text;
            slot.className = "inline-block bg-slate-800 border-2 border-solid border-slate-400 text-white px-4 py-2 rounded cursor-pointer transition-all min-w-[80px] text-center font-bold";

            const callType = text === '(f 5)' ? 'int' : 'bool';

            if (lockinState.lockedType === null) {
                lockinState.lockedType = callType;
                varType.textContent = `${callType} (ננעל)`;
                varType.className = "bg-amber-500 text-white px-2 py-0.5 rounded border border-amber-600 font-bold";

                statusBox.textContent = `t_x = ${callType} (נעול)`;
                statusBox.className = "text-xs font-mono font-bold text-white text-center py-2 bg-amber-600 rounded";

                feedback.classList.add('hidden');
                feedback.innerHTML = '';
            } else {
                if (lockinState.lockedType !== callType) {
                    slot.className = "inline-block bg-rose-950 border-2 border-rose-600 text-rose-200 px-4 py-2 rounded cursor-pointer transition-all min-w-[80px] text-center font-bold";
                    feedback.classList.remove('hidden');
                    feedback.innerHTML = `
                        <div class="p-4 bg-rose-100 border border-rose-300 text-rose-800 rounded-lg text-xs leading-relaxed font-bold">
                            💥 שגיאת טיפוס! (Type Clash)
                            <br>משתנה הטיפוס t_x של הפונקציה f כבר ננעל לטיפוס <strong>${lockinState.lockedType}</strong> בעקבות הקריאה האחרת.
                            <br>לא ניתן לקרוא לה כעת עם הטיפוס <strong>${callType}</strong> באותה תוכנית.
                            <br><span class="text-[10px] font-normal block mt-1">מערכת הטיפוסים הסטטית של INFERRED היא מונומורפית - כל משתנה טיפוס חייב לקבל ייצוג יחיד ומוגדר בכל התוכנית!</span>
                        </div>
                    `;
                } else {
                    feedback.classList.remove('hidden');
                    feedback.innerHTML = `
                        <div class="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-xs leading-relaxed font-bold">
                            ✅ שיוך תקין!
                            <br>שתי הקריאות משתמשות בטיפוס <strong>${callType}</strong>, ולכן אין סתירה ומערכת הטיפוסים מאשרת את התוכנית.
                        </div>
                    `;
                }
            }
        }

        // --- Widget 7: Occurs-Check Memory Exploder JS Logic ---
        let occursCheckActive = false;
        let exploderSubstCount = 0;
        let currentExploderTypeString = "t_x";

        function resetExploder() {
            exploderSubstCount = 0;
            currentExploderTypeString = "t_x";

            const statusText = document.getElementById('exploder-status-text');
            if (statusText) statusText.innerHTML = `מוכן להרצה. המשוואה: t_x = t_x ➔ t_res`;

            const display = document.getElementById('exploder-display');
            if (display) {
                display.innerHTML = `<div class="text-slate-500">t_x</div>`;
            }

            const crashScreen = document.getElementById('exploder-crash-screen');
            if (crashScreen) crashScreen.classList.add('hidden');

            const card = document.getElementById('exploder-card');
            if (card) card.classList.remove('animate-shake');

            const subBtn = document.getElementById('btn-exploder-sub');
            if (subBtn) {
                subBtn.disabled = false;
                subBtn.className = "w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm cursor-pointer";
            }
        }

        function toggleOccursCheck() {
            occursCheckActive = !occursCheckActive;
            const dot = document.getElementById('exploder-toggle-dot');
            const toggle = document.getElementById('exploder-toggle');
            if (dot && toggle) {
                if (occursCheckActive) {
                    dot.className = "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-6";
                    toggle.className = "relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600 transition-colors duration-200 focus:outline-none cursor-pointer";
                } else {
                    dot.className = "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-1";
                    toggle.className = "relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 transition-colors duration-200 focus:outline-none cursor-pointer";
                }
            }
            resetExploder();
        }

        function performSubstitution() {
            if (occursCheckActive) {
                const statusText = document.getElementById('exploder-status-text');
                if (statusText) {
                    statusText.innerHTML = `
                        <span class="text-rose-600 font-bold">שגיאה: Occurs Check Violation!</span>
                        <br>משתנה הטיפוס t_x מופיע בתוך הביטוי t_x ➔ t_res. התהליך הופסק למניעת לולאה אינסופית.
                    `;
                }

                const subBtn = document.getElementById('btn-exploder-sub');
                if (subBtn) {
                    subBtn.disabled = true;
                    subBtn.className = "w-full py-2.5 bg-slate-400 text-white font-bold rounded-lg text-xs transition-colors cursor-not-allowed";
                }
                return;
            }

            exploderSubstCount++;
            let term = "t_x";
            for (let i = 0; i < exploderSubstCount; i++) {
                term = `(${term} ➔ t_res)`;
            }
            currentExploderTypeString = term;

            const display = document.getElementById('exploder-display');
            if (display) {
                let stackHtml = "";
                let currentTerm = "t_x";
                for (let i = 0; i <= exploderSubstCount; i++) {
                    stackHtml = `
                        <div class="bg-rose-950/80 border border-rose-800 text-rose-300 p-2 rounded-lg font-mono text-[10px] w-full text-center transition-all duration-300 scale-95 shadow-md">
                            ${currentTerm}
                        </div>
                    ` + stackHtml;
                    currentTerm = `(${currentTerm} ➔ t_res)`;
                }
                display.innerHTML = stackHtml;
            }

            const statusText = document.getElementById('exploder-status-text');
            if (statusText) {
                statusText.innerHTML = `הצבה מספר ${exploderSubstCount} בוצעה בהצלחה בזיכרון.`;
            }

            if (exploderSubstCount >= 4) {
                const crashScreen = document.getElementById('exploder-crash-screen');
                if (crashScreen) crashScreen.classList.remove('hidden');

                const card = document.getElementById('exploder-card');
                if (card) {
                    card.classList.add('animate-shake');
                    if (!document.getElementById('shake-style')) {
                        const style = document.createElement('style');
                        style.id = 'shake-style';
                        style.innerHTML = `
                            @keyframes shake {
                                0%, 100% { transform: translateX(0); }
                                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                                20%, 40%, 60%, 80% { transform: translateX(5px); }
                            }
                            .animate-shake {
                                animation: shake 0.5s ease-in-out infinite;
                            }
                        `;
                        document.head.appendChild(style);
                    }
                }

                const subBtn = document.getElementById('btn-exploder-sub');
                if (subBtn) {
                    subBtn.disabled = true;
                    subBtn.className = "w-full py-2.5 bg-slate-400 text-white font-bold rounded-lg text-xs transition-colors cursor-not-allowed";
                }
            }
        }

        // --- Widget 8: Fill-in-the-Blank Trace Table JS Logic ---
        function toggleCompTableMode() {
            const staticTable = document.getElementById('comp-table-static');
            const interactiveTable = document.getElementById('comp-table-interactive');
            const btn = document.getElementById('btn-comp-table-toggle');

            if (!staticTable || !interactiveTable || !btn) return;

            if (staticTable.classList.contains('hidden')) {
                staticTable.classList.remove('hidden');
                interactiveTable.classList.add('hidden');
                btn.innerHTML = `✍️ מעבר למצב תרגול אינטראקטיבי`;
            } else {
                staticTable.classList.add('hidden');
                interactiveTable.classList.remove('hidden');
                btn.innerHTML = `📄 מעבר למצב טבלה מוכנה`;
            }
        }

        function checkCompPractice() {
            const selects = document.querySelectorAll('.comp-practice-select');
            let correctCount = 0;
            let totalCount = selects.length;

            selects.forEach(sel => {
                const answer = sel.value;
                const correct = sel.getAttribute('data-correct');
                if (answer === correct) {
                    correctCount++;
                    sel.className = "comp-practice-select font-mono bg-emerald-100 border border-emerald-500 rounded p-1 text-xs text-emerald-800 font-bold";
                } else {
                    sel.className = "comp-practice-select font-mono bg-rose-100 border border-rose-500 rounded p-1 text-xs text-rose-800 font-bold";
                }
            });

            const feedback = document.getElementById('comp-practice-feedback');
            if (feedback) {
                if (correctCount === totalCount) {
                    feedback.innerHTML = `🎉 מעולה! כל התשובות נכונות! (${correctCount}/${totalCount})`;
                    feedback.className = "text-xs font-bold text-emerald-600";
                } else {
                    feedback.innerHTML = `❌ חלק מהתשובות שגויות. בדקו את הסימונים באדום. (${correctCount}/${totalCount})`;
                    feedback.className = "text-xs font-bold text-rose-600";
                }
            }
        }

        // Dropdown closer for Widget 2
        document.addEventListener('click', (e) => {
            const isHole1 = e.target.id === 'puzzle-hole-1' || e.target.closest('#puzzle-menu-1');
            const isHole2 = e.target.id === 'puzzle-hole-2' || e.target.closest('#puzzle-menu-2');
            if (!isHole1) {
                const m1 = document.getElementById('puzzle-menu-1');
                if (m1) m1.classList.add('hidden');
            }
            if (!isHole2) {
                const m2 = document.getElementById('puzzle-menu-2');
                if (m2) m2.classList.add('hidden');
            }
        });

        function toggleMamanTableMode() {
            const staticTable = document.getElementById('maman-table-static');
            const interactiveTable = document.getElementById('maman-table-interactive');
            const btn = document.getElementById('btn-maman-table-toggle');

            if (!staticTable || !interactiveTable || !btn) return;

            if (staticTable.classList.contains('hidden')) {
                staticTable.classList.remove('hidden');
                interactiveTable.classList.add('hidden');
                btn.innerHTML = `✍️ מעבר למצב תרגול אינטראקטיבי`;
            } else {
                staticTable.classList.add('hidden');
                interactiveTable.classList.remove('hidden');
                btn.innerHTML = `📄 מעבר למצב טבלה מוכנה`;
            }
        }

        function checkMamanPractice() {
            const selects = document.querySelectorAll('.maman-practice-select');
            let correctCount = 0;
            let totalCount = selects.length;

            selects.forEach(sel => {
                const answer = sel.value;
                const correct = sel.getAttribute('data-correct');
                if (answer === correct) {
                    correctCount++;
                    sel.className = "maman-practice-select font-mono bg-emerald-100 border border-emerald-500 rounded p-1 text-xs text-emerald-800 font-bold";
                } else {
                    sel.className = "maman-practice-select font-mono bg-rose-100 border border-rose-500 rounded p-1 text-xs text-rose-800 font-bold";
                }
            });

            const feedback = document.getElementById('maman-practice-feedback');
            if (feedback) {
                if (correctCount === totalCount) {
                    feedback.innerHTML = `🎉 מעולה! כל התשובות נכונות! (${correctCount}/${totalCount})`;
                    feedback.className = "text-xs font-bold text-emerald-600";
                } else {
                    feedback.innerHTML = `❌ חלק מהתשובות שגויות. בדקו את הסימונים באדום. (${correctCount}/${totalCount})`;
                    feedback.className = "text-xs font-bold text-rose-600";
                }
            }
        }

  /* --- Global Exports --- */
window.resetUnification = resetUnification;
window.renderUnification = renderUnification;
window.stepUnification = stepUnification;
window.setPipeMode = setPipeMode;
window.resetPipeSim = resetPipeSim;
window.stepPipeSim = stepPipeSim;
window.buildType = buildType;
window.resetArchBuilder = resetArchBuilder;
window.renderArchSnippets = renderArchSnippets;
window.renderPlacedSnippets = renderPlacedSnippets;
window.removeArchSnippet = removeArchSnippet;
window.allowDrop = allowDrop;
window.handleDrop = handleDrop;
window.clickTargetBox = clickTargetBox;
window.placeSnippet = placeSnippet;
window.checkArchBuilder = checkArchBuilder;
window.openPuzzleMenu = openPuzzleMenu;
window.selectPuzzleOption = selectPuzzleOption;
window.checkPuzzle = checkPuzzle;
window.resetPuzzle = resetPuzzle;
window.stepStateThreading = stepStateThreading;
window.resetStateThreading = resetStateThreading;
window.initXrayScanner = initXrayScanner;
window.resetEqExtractor = resetEqExtractor;
window.clickAstEqNode = clickAstEqNode;
window.selectExtractorOption = selectExtractorOption;
window.resetLockin = resetLockin;
window.handleLockinDragStart = handleLockinDragStart;
window.selectLockinSnippet = selectLockinSnippet;
window.handleLockinDrop = handleLockinDrop;
window.clickLockinSlot = clickLockinSlot;
window.placeLockinCall = placeLockinCall;
window.resetExploder = resetExploder;
window.toggleOccursCheck = toggleOccursCheck;
window.performSubstitution = performSubstitution;
window.toggleCompTableMode = toggleCompTableMode;
window.checkCompPractice = checkCompPractice;
window.toggleMamanTableMode = toggleMamanTableMode;
window.checkMamanPractice = checkMamanPractice;
}

        
        
/* ==============================================
   UNIFIED SETUP AND SCROLLSPY LOGIC
   ============================================== */

    function showTab(tabId) {
        const el = document.getElementById(tabId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Highlight in sidebar
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav'));
            const btn = document.getElementById('btn-' + tabId);
            if (btn) btn.classList.add('active-nav');
            
            // Expand parent accordion
            const volumeNum = el.getAttribute('data-volume');
            if (volumeNum) {
                expandVolumeAccordion('volume-' + volumeNum);
            }
        }
    }

    function toggleVolumeAccordion(volumeId) {
        const content = document.getElementById(volumeId + '-content');
        const arrow = document.getElementById('arrow-' + volumeId);
        if (!content || !arrow) return;
        
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            arrow.classList.add('rotate-180');
        } else {
            content.classList.add('hidden');
            arrow.classList.remove('rotate-180');
        }
    }

    function expandVolumeAccordion(volumeId) {
        const content = document.getElementById(volumeId + '-content');
        const arrow = document.getElementById('arrow-' + volumeId);
        if (content && arrow && content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            arrow.classList.add('rotate-180');
        }
    }

    function toggleSidebar() {
        document.body.classList.toggle('sidebar-collapsed');
        const isCollapsed = document.body.classList.contains('sidebar-collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
        updateToggleBtnIcon(isCollapsed);
    }

    function updateToggleBtnIcon(isCollapsed) {
        const icon = document.getElementById('sidebar-toggle-icon');
        if (!icon) return;
        if (isCollapsed) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />';
        } else {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />';
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        // 1. Create and inject sidebar toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'sidebar-toggle-btn';
        toggleBtn.className = 'fixed top-6 p-2 rounded-lg bg-white/80 backdrop-blur-md hover:bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-md z-30 flex items-center justify-center w-10 h-10 transition-all duration-300 active:scale-95 cursor-pointer';
        toggleBtn.title = 'הצג/הסתר תפריט ניווט';
        toggleBtn.onclick = toggleSidebar;
        toggleBtn.innerHTML = '<svg id="sidebar-toggle-icon" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"></svg>';
        document.body.appendChild(toggleBtn);

        // 2. Load sidebar collapsed state
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isCollapsed) {
            document.body.classList.add('sidebar-collapsed');
        }
        updateToggleBtnIcon(isCollapsed);

        // 3. Expand the first accordion by default
        expandVolumeAccordion('volume-1');

        // 4. Initialize Diagram State (checking function existence)
        if (typeof resetFuncSim === 'function') resetFuncSim();
        if (typeof resetPrefixSim === 'function') resetPrefixSim();
        if (typeof setScopeMode === 'function') setScopeMode('let');
        if (typeof updateCondCodePreview === 'function') updateCondCodePreview();
        if (typeof drawPairModel === 'function') drawPairModel('cons12');
        if (typeof resetFlattenSim === 'function') resetFlattenSim();
        if (typeof resetClosureRouter === 'function') resetClosureRouter();
        if (typeof updateDeBruijnView === 'function') updateDeBruijnView();
        
        if (typeof resetScopeSim === 'function') resetScopeSim();
        if (typeof resetParamSim === 'function') resetParamSim();
        if (typeof resetPairSim === 'function') resetPairSim();
        if (typeof resetUnification === 'function') resetUnification();
        if (typeof resetPipeSim === 'function') resetPipeSim();

        // 5. Setup ScrollSpy
        const mainEl = document.querySelector('main');
        const tabs = Array.from(document.querySelectorAll('.tab-content'));
        const navButtons = document.querySelectorAll('.nav-btn');
        let currentActiveTabId = '';

        mainEl.addEventListener('scroll', () => {
            let activeTabId = '';
            const buffer = 150; // offset in px from top to trigger section change
            
            for (let tab of tabs) {
                const rect = tab.getBoundingClientRect();
                if (rect.top <= buffer) {
                    activeTabId = tab.id;
                }
            }

            if (activeTabId && activeTabId !== currentActiveTabId) {
                currentActiveTabId = activeTabId;
                
                // Highlight button
                navButtons.forEach(btn => {
                    if (btn.getAttribute('onclick') === `showTab('${activeTabId}')`) {
                        btn.classList.add('active-nav');
                    } else {
                        btn.classList.remove('active-nav');
                    }
                });
                
                // Expand matching volume, collapse others
                const activeTabEl = document.getElementById(activeTabId);
                if (activeTabEl) {
                    const volNum = activeTabEl.getAttribute('data-volume');
                    if (volNum) {
                        for (let i = 1; i <= 4; i++) {
                            const content = document.getElementById(`volume-${i}-content`);
                            const arrow = document.getElementById(`arrow-volume-${i}`);
                            if (content && arrow) {
                                if (i == volNum) {
                                    content.classList.remove('hidden');
                                    arrow.classList.add('rotate-180');
                                } else {
                                    content.classList.add('hidden');
                                    arrow.classList.remove('rotate-180');
                                }
                            }
                        }
                    }
                }
            }
        });
    });

    