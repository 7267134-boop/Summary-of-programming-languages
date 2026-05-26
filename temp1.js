
        function showTab(tabId) {
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

        // --- Cons-Cell Visualizer JS Logic ---
        function setConsDemo(type) {
            const btns = ['pair', 'proper', 'nested-pair', 'nested-list'];
            btns.forEach(b => {
                const btn = document.getElementById('btn-cons-' + b);
                if (btn) {
                    btn.className = b === type 
                        ? "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer"
                        : "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
                }
            });

            const area = document.getElementById('cons-visual-area');
            if (!area) return;

            if (type === 'pair') {
                area.innerHTML = `
                    <div class="flex items-center gap-4">
                        <div class="flex border-2 border-slate-700 rounded-lg overflow-hidden font-mono text-sm bg-white shadow">
                            <div class="w-12 h-12 flex items-center justify-center border-r-2 border-slate-700 bg-slate-50 font-bold">1</div>
                            <div class="w-12 h-12 flex items-center justify-center font-bold">2</div>
                        </div>
                    </div>
                `;
            } else if (type === 'proper') {
                area.innerHTML = `
                    <div class="flex items-center gap-6">
                        <!-- Cell 1 -->
                        <div class="flex border-2 border-slate-700 rounded-lg overflow-hidden font-mono text-sm bg-white shadow relative">
                            <div class="w-12 h-12 flex items-center justify-center border-r-2 border-slate-700 bg-slate-50 font-bold">1</div>
                            <div class="w-12 h-12 flex items-center justify-center font-bold relative">
                                <div class="w-2 h-2 rounded-full bg-slate-800"></div>
                            </div>
                        </div>
                        <div class="text-slate-400 font-bold">➔</div>
                        <!-- Cell 2 -->
                        <div class="flex border-2 border-slate-700 rounded-lg overflow-hidden font-mono text-sm bg-white shadow relative">
                            <div class="w-12 h-12 flex items-center justify-center border-r-2 border-slate-700 bg-slate-50 font-bold">2</div>
                            <div class="w-12 h-12 flex items-center justify-center font-bold bg-slate-100 text-slate-400">/</div>
                        </div>
                    </div>
                `;
            } else if (type === 'nested-pair') {
                area.innerHTML = `
                    <div class="flex flex-col items-center gap-4">
                        <div class="flex border-2 border-slate-700 rounded-lg overflow-hidden font-mono text-sm bg-white shadow">
                            <!-- left is pointer to nested pair -->
                            <div class="w-12 h-12 flex items-center justify-center border-r-2 border-slate-700 relative">
                                <div class="w-2 h-2 rounded-full bg-slate-800"></div>
                            </div>
                            <!-- right is 3 -->
                            <div class="w-12 h-12 flex items-center justify-center font-bold">3</div>
                        </div>
                        <div class="text-slate-400 font-bold text-center">↓</div>
                        <!-- Nested Cell -->
                        <div class="flex border-2 border-slate-700 rounded-lg overflow-hidden font-mono text-sm bg-white shadow">
                            <div class="w-12 h-12 flex items-center justify-center border-r-2 border-slate-700 bg-slate-50 font-bold">1</div>
                            <div class="w-12 h-12 flex items-center justify-center font-bold">2</div>
                        </div>
                    </div>
                `;
            } else if (type === 'nested-list') {
                area.innerHTML = `
                    <div class="flex items-start gap-6">
                        <!-- Main Cell 1 -->
                        <div class="flex border-2 border-slate-700 rounded-lg overflow-hidden font-mono text-sm bg-white shadow relative">
                            <div class="w-12 h-12 flex items-center justify-center border-r-2 border-slate-700 relative">
                                <div class="w-2 h-2 rounded-full bg-slate-800"></div>
                            </div>
                            <div class="w-12 h-12 flex items-center justify-center relative">
                                <div class="w-2 h-2 rounded-full bg-slate-800"></div>
                            </div>
                        </div>
                        <div class="text-slate-400 font-bold pt-3">➔</div>
                        <!-- Main Cell 2 -->
                        <div class="flex border-2 border-slate-700 rounded-lg overflow-hidden font-mono text-sm bg-white shadow relative">
                            <div class="w-12 h-12 flex items-center justify-center border-r-2 border-slate-700 bg-slate-50 font-bold">2</div>
                            <div class="w-12 h-12 flex items-center justify-center font-bold bg-slate-100 text-slate-400">/</div>
                        </div>

                        <!-- Absolute positioned nested cell arrow and box -->
                        <div class="absolute mt-20 flex flex-col items-center ml-2">
                            <div class="text-slate-400 font-bold">↓</div>
                            <div class="flex border-2 border-slate-700 rounded-lg overflow-hidden font-mono text-sm bg-white shadow mt-1">
                                <div class="w-12 h-12 flex items-center justify-center border-r-2 border-slate-700 bg-slate-50 font-bold">1</div>
                                <div class="w-12 h-12 flex items-center justify-center font-bold bg-slate-100 text-slate-400">/</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // --- Tail Recursion call stack JS logic ---
        let recMode = 'standard';
        let recStep = 0;
        const maxStandardSteps = 8;
        const maxTailSteps = 5;

        function setRecMode(mode) {
            recMode = mode;
            resetRecSim();
            const stdBtn = document.getElementById('btn-rec-standard');
            const tailBtn = document.getElementById('btn-rec-tail');
            if (stdBtn) stdBtn.className = mode === 'standard' ? "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer" : "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
            if (tailBtn) tailBtn.className = mode === 'tail' ? "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer" : "px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
        }

        function resetRecSim() {
            recStep = 0;
            const stepBtn = document.getElementById('btn-rec-step');
            if (stepBtn) {
                stepBtn.innerText = "בצע צעד (Step)";
                stepBtn.className = stepBtn.className.replace('bg-slate-400 hover:bg-slate-500', 'bg-emerald-600 hover:bg-emerald-700');
            }
            const explain = document.getElementById('rec-explain');
            if (explain) explain.innerHTML = 'לחצו על "בצע צעד" כדי לראות את תחילת ההרצה.';
            const stack = document.getElementById('rec-stack-view');
            if (stack) stack.innerHTML = '';
        }

        function stepRecSim() {
            const explain = document.getElementById('rec-explain');
            const stack = document.getElementById('rec-stack-view');
            const stepBtn = document.getElementById('btn-rec-step');
            if (!explain || !stack || !stepBtn) return;

            if (recMode === 'standard') {
                if (recStep >= maxStandardSteps) {
                    stepBtn.innerText = "הסתיים";
                    stepBtn.className = stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
                    return;
                }
                recStep++;

                if (recStep === 1) {
                    stack.innerHTML = `<div class="bg-blue-600 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-blue-700">(fact 4) -> waiting for (* 4 (fact 3))</div>`;
                    explain.innerHTML = `<strong>צעד 1: קריאה ראשונה</strong><br>המערכת קוראת ל-<code>(fact 4)</code>. מכיוון שאינו אפס, עליה לחשב <code>(* 4 (fact 3))</code>. הקריאה ל-<code>(fact 3)</code> נדחפת למחסנית.`;
                } else if (recStep === 2) {
                    stack.innerHTML += `<div class="bg-blue-500 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-blue-600">(fact 3) -> waiting for (* 3 (fact 2))</div>`;
                    explain.innerHTML = `<strong>צעד 2: גדילת מחסנית</strong><br>המערכת קוראת ל-<code>(fact 3)</code>. הקריאה ל-<code>(fact 2)</code> נדחפת למחסנית. כעת יש 2 פריימים במחסנית.`;
                } else if (recStep === 3) {
                    stack.innerHTML += `<div class="bg-blue-400 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-blue-500">(fact 2) -> waiting for (* 2 (fact 1))</div>`;
                    explain.innerHTML = `<strong>צעד 3: גדילה נוספת</strong><br>המערכת קוראת ל-<code>(fact 2)</code>. הקריאה ל-<code>(fact 1)</code> נדחפת למחסנית.`;
                } else if (recStep === 4) {
                    stack.innerHTML += `<div class="bg-purple-600 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-purple-700">(fact 1) -> base case! returns 1</div>`;
                    explain.innerHTML = `<strong>צעד 4: הגעה למקרה הבסיס</strong><br>הקריאה <code>(fact 1)</code> מגיעה למקרה הבסיס ומחזירה 1 ללא קריאות נוספות. המחסנית הגיעה לגובה מקסימלי (4 פריימים).`;
                } else if (recStep === 5) {
                    stack.innerHTML = `
                        <div class="bg-blue-600 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-blue-700">(fact 4) -> waiting for (* 4 (fact 3))</div>
                        <div class="bg-blue-500 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-blue-600">(fact 3) -> waiting for (* 3 (fact 2))</div>
                        <div class="bg-emerald-600 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-emerald-700">(fact 2) -> returns (* 2 1) = 2</div>
                    `;
                    explain.innerHTML = `<strong>צעד 5: התחלת צמצום (Unwinding)</strong><br>הערך 1 מוחזר מ-<code>(fact 1)</code>. הפריים העליון מוסר, והחישוב של <code>(* 2 1)</code> מתבצע בפריים <code>(fact 2)</code> ומחזיר 2.`;
                } else if (recStep === 6) {
                    stack.innerHTML = `
                        <div class="bg-blue-600 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-blue-700">(fact 4) -> waiting for (* 4 (fact 3))</div>
                        <div class="bg-emerald-600 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-emerald-700">(fact 3) -> returns (* 3 2) = 6</div>
                    `;
                    explain.innerHTML = `<strong>צעד 6: המשך צמצום</strong><br>הערך 2 מוחזר. פריים נוסף מוסר, החישוב <code>(* 3 2)</code> מתבצע ומחזיר 6.`;
                } else if (recStep === 7) {
                    stack.innerHTML = `
                        <div class="bg-emerald-600 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-emerald-700">(fact 4) -> returns (* 4 6) = 24</div>
                    `;
                    explain.innerHTML = `<strong>צעד 7: פריים אחרון</strong><br>הערך 6 מוחזר לקריאה המקורית <code>(fact 4)</code>. החישוב הסופי <code>(* 4 6)</code> מתבצע ומחזיר 24.`;
                } else if (recStep === 8) {
                    stack.innerHTML = `<div class="bg-slate-800 text-slate-400 font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center border border-slate-700">Empty Stack (Done: 24)</div>`;
                    explain.innerHTML = `<strong>צעד 8: סיום</strong><br>המחסנית התרוקנה והתוצאה היא 24. שימו לב שעבור 4 איברים, המחסנית הגיעה לגובה 4. עבור $N$, זיכרון המחסנית גדל ב-$O(N)$.`;
                }
            } else {
                if (recStep >= maxTailSteps) {
                    stepBtn.innerText = "הסתיים";
                    stepBtn.className = stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
                    return;
                }
                recStep++;

                if (recStep === 1) {
                    stack.innerHTML = `<div class="bg-purple-600 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-purple-700">fact-iter: n=4, acc=1</div>`;
                    explain.innerHTML = `<strong>צעד 1: אתחול</strong><br>קריאה ראשונה ל-<code>(fact-iter 4 1)</code>. אין חישוב שממתין בחוץ! הפריים היחיד במחסנית מכיל את הפרמטרים הנוכחיים.`;
                } else if (recStep === 2) {
                    stack.innerHTML = `<div class="bg-purple-600 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-purple-700">fact-iter: n=3, acc=4</div>`;
                    explain.innerHTML = `<strong>צעד 2: עדכון פריים קיים</strong><br>קריאה ל-<code>(fact-iter 3 (* 4 1))</code> ➔ <code>(fact-iter 3 4)</code>. מכיוון שמדובר ברקורסיית זנב, <strong>אין צורך להקצות פריים חדש!</strong> אנו מעדכנים את ערכי המשתנים בפריים הקיים.`;
                } else if (recStep === 3) {
                    stack.innerHTML = `<div class="bg-purple-600 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-purple-700">fact-iter: n=2, acc=12</div>`;
                    explain.innerHTML = `<strong>צעד 3: עדכון פריים קיים</strong><br>קריאה ל-<code>(fact-iter 2 (* 3 4))</code> ➔ <code>(fact-iter 2 12)</code>. המחסנית נותרת בגובה 1.`;
                } else if (recStep === 4) {
                    stack.innerHTML = `<div class="bg-purple-600 text-white font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center font-bold border border-purple-700">fact-iter: n=1, acc=24</div>`;
                    explain.innerHTML = `<strong>צעד 4: הגעה לסוף הרקורסיה</strong><br>קריאה ל-<code>(fact-iter 1 (* 2 12))</code> ➔ <code>(fact-iter 1 24)</code>. הגענו למקרה הבסיס $n \le 1$.`;
                } else if (recStep === 5) {
                    stack.innerHTML = `<div class="bg-slate-800 text-slate-400 font-mono text-xs px-4 py-2 rounded shadow w-full max-w-[260px] text-center border border-slate-700">Empty Stack (Done: 24)</div>`;
                    explain.innerHTML = `<strong>צעד 5: סיום מיידי</strong><br>המערכת מחזירה ישירות את <code>acc</code> (24) מבלי שום צורך לבצע פעולות Unwinding במחסנית. זיכרון המחסנית נשאר $O(1)$ לכל אורך הדרך!`;
                }
            }
        }

        // --- Lexical Spec Rules Matcher JS logic ---
        let lexspecMode = 'simple';
        let lexspecStep = 0;
        let lexspecTokens = [];

        function resetLexSpecSim() {
            const select = document.getElementById('lexspec-code-select');
            if (select) lexspecMode = select.value;
            lexspecStep = 0;
            lexspecTokens = [];

            const stepBtn = document.getElementById('btn-lexspec-step');
            if (stepBtn) {
                stepBtn.innerText = "צעד הבא (Scan Step)";
                stepBtn.className = stepBtn.className.replace('bg-slate-400 hover:bg-slate-500', 'bg-emerald-600 hover:bg-emerald-700');
            }

            const explain = document.getElementById('lexspec-explain');
            if (explain) explain.innerHTML = 'לחצו על "צעד הבא" כדי להתחיל בסריקה.';

            const tokensArea = document.getElementById('lexspec-tokens-display');
            if (tokensArea) tokensArea.innerHTML = '<span class="text-slate-400 italic text-xs">רשימה ריקה</span>';

            const codeDisplay = document.getElementById('lexspec-code-display');
            if (codeDisplay) {
                if (lexspecMode === 'simple') {
                    codeDisplay.innerHTML = `let x = 55 in x`;
                } else {
                    codeDisplay.innerHTML = `% this is comment\nlet y = -12`;
                }
            }
        }

        function stepLexSpecSim() {
            const explain = document.getElementById('lexspec-explain');
            const tokensArea = document.getElementById('lexspec-tokens-display');
            const codeDisplay = document.getElementById('lexspec-code-display');
            const stepBtn = document.getElementById('btn-lexspec-step');
            if (!explain || !tokensArea || !codeDisplay || !stepBtn) return;

            if (lexspecMode === 'simple') {
                const steps = [
                    { code: `<span class="bg-yellow-300 text-slate-900 font-bold">let</span> x = 55 in x`, desc: `<strong>שלב 1:</strong> זיהוי המילה השמורה <code>"let"</code>. מותאם לחוק ה-identifier, אך מזוהה כמילת מפתח בשפה.`, token: { type: 'let-keyword', val: 'let', cls: 'bg-indigo-100 text-indigo-800' } },
                    { code: `let <span class="bg-yellow-300 text-slate-900 font-bold">x</span> = 55 in x`, desc: `<strong>שלב 2:</strong> הלקסר דילג על הרווח (whitespace) לפי חוק skip, וזיהה את המזהה <code>x</code> לפי החוק <code>identifier</code>.`, token: { type: 'identifier', val: 'x', cls: 'bg-blue-100 text-blue-800' } },
                    { code: `let x <span class="bg-yellow-300 text-slate-900 font-bold">=</span> 55 in x`, desc: `<strong>שלב 3:</strong> דילוג על רווח, וזיהוי הסימן <code>=</code>. זהו תו קבוע (Terminal).`, token: { type: 'equal-sign', val: '=', cls: 'bg-slate-100 text-slate-800' } },
                    { code: `let x = <span class="bg-yellow-300 text-slate-900 font-bold">55</span> in x`, desc: `<strong>שלב 4:</strong> דילוג על רווח, וזיהוי הרצף <code>55</code>. מותאם לחוק <code>number (digit (arbno digit))</code> ומומר למספר.`, token: { type: 'number', val: '55', cls: 'bg-emerald-100 text-emerald-800' } },
                    { code: `let x = 55 <span class="bg-yellow-300 text-slate-900 font-bold">in</span> x`, desc: `<strong>שלב 5:</strong> דילוג על רווח, וזיהוי מילת המפתח <code>"in"</code>.`, token: { type: 'in-keyword', val: 'in', cls: 'bg-indigo-100 text-indigo-800' } },
                    { code: `let x = 55 in <span class="bg-yellow-300 text-slate-900 font-bold">x</span>`, desc: `<strong>שלב 6:</strong> דילוג על רווח, וזיהוי המזהה <code>x</code> שוב.`, token: { type: 'identifier', val: 'x', cls: 'bg-blue-100 text-blue-800' } },
                ];

                if (lexspecStep >= steps.length) {
                    explain.innerHTML = `<strong>סריקה הושלמה!</strong><br>הלקסר סרק את כל הקלט בהצלחה והעביר את רשימת האסימונים לפרסר.`;
                    stepBtn.innerText = "הסתיים";
                    stepBtn.className = stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
                    return;
                }

                const curr = steps[lexspecStep];
                codeDisplay.innerHTML = curr.code;
                explain.innerHTML = curr.desc;
                lexspecTokens.push(curr.token);
                lexspecStep++;
            } else {
                const steps = [
                    { code: `<span class="bg-yellow-300 text-slate-900 font-bold">% this is comment</span>\nlet y = -12`, desc: `<strong>שלב 1:</strong> זיהוי הערה שמתחילה ב-<code>%</code>. הלקסר קורא עד סוף השורה ומפעיל את הפעולה <code>skip</code> (כלומר, לא נוצר שום אסימון והטקסט נזרק).`, token: null },
                    { code: `% this is comment\n<span class="bg-yellow-300 text-slate-900 font-bold">let</span> y = -12`, desc: `<strong>שלב 2:</strong> דילוג על ירידת שורה (רווח) וזיהוי המילה השמורה <code>"let"</code>.`, token: { type: 'let-keyword', val: 'let', cls: 'bg-indigo-100 text-indigo-800' } },
                    { code: `% this is comment\nlet <span class="bg-yellow-300 text-slate-900 font-bold">y</span> = -12`, desc: `<strong>שלב 3:</strong> זיהוי המזהה <code>y</code> לפי חוק <code>identifier</code>.`, token: { type: 'identifier', val: 'y', cls: 'bg-blue-100 text-blue-800' } },
                    { code: `% this is comment\nlet y <span class="bg-yellow-300 text-slate-900 font-bold">=</span> -12`, desc: `<strong>שלב 4:</strong> זיהוי הסימן השווה <code>=</code>.`, token: { type: 'equal-sign', val: '=', cls: 'bg-slate-100 text-slate-800' } },
                    { code: `% this is comment\nlet y = <span class="bg-yellow-300 text-slate-900 font-bold">-12</span>`, desc: `<strong>שלב 5:</strong> זיהוי המספר השלילי <code>-12</code>. מותאם לחוק <code>number ("-", digit, (arbno digit))</code>.`, token: { type: 'number', val: '-12', cls: 'bg-emerald-100 text-emerald-800' } },
                ];

                if (lexspecStep >= steps.length) {
                    explain.innerHTML = `<strong>סריקה הושלמה!</strong><br>הלקסר סינן את ההערה בהצלחה והעביר רק את האסימונים הרלוונטיים של <code>let y = -12</code>.`;
                    stepBtn.innerText = "הסתיים";
                    stepBtn.className = stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
                    return;
                }

                const curr = steps[lexspecStep];
                codeDisplay.innerHTML = curr.code;
                explain.innerHTML = curr.desc;
                if (curr.token) {
                    lexspecTokens.push(curr.token);
                }
                lexspecStep++;
            }

            // Render tokens
            if (lexspecTokens.length === 0) {
                tokensArea.innerHTML = '<span class="text-slate-400 italic text-xs">לא נוצרו אסימונים עדיין (skip)</span>';
            } else {
                tokensArea.innerHTML = lexspecTokens.map(t => `
                    <div class="${t.cls} text-xs px-2.5 py-1.5 rounded font-mono font-bold flex flex-col items-center border shadow-sm">
                        <span class="text-[9px] text-slate-400 uppercase tracking-tight">${t.type}</span>
                        <span>${t.val}</span>
                    </div>
                `).join('');
            }
        }
            }
        }
    