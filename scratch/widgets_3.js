    <script>
        function showTab(tabId) {
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
    </script>
    <script>
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

        document.addEventListener("DOMContentLoaded", () => {
            // Initialize Parameter Passing and Pair structure simulators
            resetParamSim();
            changePairStructure('simple');

            // 1. Create and inject sidebar toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.id = 'sidebar-toggle-btn';
            toggleBtn.className = 'fixed top-6 p-2 rounded-lg bg-white/80 backdrop-blur-md hover:bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-md z-30 flex items-center justify-center w-10 h-10 transition-all duration-300 active:scale-95 cursor-pointer';
            toggleBtn.title = 'הצג/הסתר תפריט ניווט';
            toggleBtn.onclick = toggleSidebar;
            toggleBtn.innerHTML = '<svg id="sidebar-toggle-icon" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"></svg>';
            document.body.appendChild(toggleBtn);

            // 2. Load sidebar collapsed state from localStorage
            const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (isCollapsed) {
                document.body.classList.add('sidebar-collapsed');
            }
            updateToggleBtnIcon(isCollapsed);

            // 3. Inject navigation buttons at the bottom of each tab
            const tabs = [];
            const seenIds = new Set();
            document.querySelectorAll('.tab-content').forEach(el => {
                const id = el.id;
                if (id && !seenIds.has(id)) {
                    seenIds.add(id);
                    tabs.push(el);
                }
            });

            tabs.forEach((tab, index) => {
                const navContainer = document.createElement('div');
                navContainer.className = 'flex justify-between items-center mt-12 pt-6 border-t border-slate-200';

                // Previous Button (on the right)
                if (index > 0) {
                    const prevTabId = tabs[index - 1].id;
                    const prevBtn = document.createElement('button');
                    prevBtn.onclick = () => showTab(prevTabId);
                    prevBtn.className = 'nav-btn-prev flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all duration-200 shadow-sm text-sm cursor-pointer';
                    prevBtn.innerHTML = `
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <span>הקודם</span>
                    `;
                    navContainer.appendChild(prevBtn);
                } else {
                    // Placeholder to keep spacing alignment
                    const placeholder = document.createElement('div');
                    placeholder.className = 'w-10 invisible';
                    navContainer.appendChild(placeholder);
                }

                // Next Button (on the left)
                if (index < tabs.length - 1) {
                    const nextTabId = tabs[index + 1].id;
                    const nextBtn = document.createElement('button');
                    nextBtn.onclick = () => showTab(nextTabId);
                    nextBtn.className = 'nav-btn-next flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all duration-200 shadow-sm text-sm cursor-pointer';
                    nextBtn.innerHTML = `
                        <span>הבא</span>
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    `;
                    navContainer.appendChild(nextBtn);
                } else {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'w-10 invisible';
                    navContainer.appendChild(placeholder);
                }

                tab.appendChild(navContainer);
            });
        });
    </script>

    <script>
        
        // ==========================================
        // DYNAMIC WIDGETS LOGIC
        // ==========================================

        // --- Widget 1.1: Architecture Game Logic ---
        const archSnippets = [
            { id: 'a1', text: "(define the-store 'uninitialized)", file: 'store' },
            { id: 'a2', text: "(ref-val (loc) (location loc))", file: 'data' },
            { id: 'a3', text: "(newref val)", file: 'store' },
            { id: 'a4', text: "(newref-exp (exp1))", file: 'interp' },
            { id: 'a5', text: "Expression ::= newref ( Expression )", file: 'lang' },
            { id: 'a6', text: "(setref! ref val)", file: 'store' },
            { id: 'a7', text: "(cases expression exp ... (setref-exp ...))", file: 'interp' },
            { id: 'a8', text: "(ref-val? val)", file: 'data' }
        ];
        let selectedSnippetId = null;
        let userAssignments = {}; // snippetId -> file

        function resetArchitectureGame() {
            selectedSnippetId = null;
            userAssignments = {};
            
            // Clear drop boxes
            document.getElementById('box-store').innerHTML = '';
            document.getElementById('box-lang').innerHTML = '';
            document.getElementById('box-interp').innerHTML = '';
            document.getElementById('box-data').innerHTML = '';
            
            // Remove highlighting
            document.querySelectorAll('.file-box').forEach(box => {
                box.classList.remove('active-target', 'border-red-500', 'border-green-500');
            });
            
            const feedback = document.getElementById('drag-feedback');
            feedback.className = 'mt-3 p-3 rounded-lg text-xs font-medium hidden';
            feedback.innerText = '';
            
            renderSnippets();
        }

        function renderSnippets() {
            const container = document.getElementById('source-snippets');
            container.innerHTML = '';
            
            archSnippets.forEach(snip => {
                if (!userAssignments[snip.id]) {
                    const btn = document.createElement('button');
                    btn.className = 'snippet-btn';
                    btn.innerText = snip.text;
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        selectSnippet(snip.id);
                    };
                    container.appendChild(btn);
                }
            });
        }

        function selectSnippet(id) {
            selectedSnippetId = id;
            document.querySelectorAll('.snippet-btn').forEach(btn => {
                btn.classList.remove('selected');
                if (btn.innerText === archSnippets.find(s => s.id === id).text) {
                    btn.classList.add('selected');
                }
            });
            
            // Highlight targets
            document.querySelectorAll('.file-box').forEach(box => {
                box.classList.add('active-target');
            });
        }

        function selectTarget(file) {
            if (!selectedSnippetId) return;
            
            userAssignments[selectedSnippetId] = file;
            selectedSnippetId = null;
            
            // Remove targets highlight
            document.querySelectorAll('.file-box').forEach(box => {
                box.classList.remove('active-target');
            });
            
            renderSnippets();
            updateAssignedViews();
        }

        function updateAssignedViews() {
            // Clear boxes
            const storeBox = document.getElementById('box-store');
            const langBox = document.getElementById('box-lang');
            const interpBox = document.getElementById('box-interp');
            const dataBox = document.getElementById('box-data');
            
            storeBox.innerHTML = '';
            langBox.innerHTML = '';
            interpBox.innerHTML = '';
            dataBox.innerHTML = '';
            
            Object.keys(userAssignments).forEach(snipId => {
                const snip = archSnippets.find(s => s.id === snipId);
                const file = userAssignments[snipId];
                
                const item = document.createElement('div');
                item.className = 'bg-white p-1.5 border rounded shadow-sm flex justify-between items-center text-[10px] mt-1';
                item.innerHTML = `
                    <span class="font-mono truncate mr-1" title="${snip.text}">${snip.text}</span>
                    <button class="text-red-500 font-bold hover:text-red-700 cursor-pointer ml-1 text-sm font-sans" onclick="removeAssignment('${snipId}', event)">×</button>
                `;
                
                document.getElementById('box-' + file).appendChild(item);
            });
        }

        function removeAssignment(snipId, event) {
            event.stopPropagation();
            delete userAssignments[snipId];
            renderSnippets();
            updateAssignedViews();
        }

        function checkArchitectureGame() {
            const feedback = document.getElementById('drag-feedback');
            feedback.classList.remove('hidden');
            
            const total = archSnippets.length;
            let correct = 0;
            
            // Reset box styles
            document.querySelectorAll('.file-box').forEach(box => {
                box.classList.remove('border-red-500', 'border-green-500');
            });
            
            let allAssigned = true;
            archSnippets.forEach(snip => {
                if (!userAssignments[snip.id]) {
                    allAssigned = false;
                } else if (userAssignments[snip.id] === snip.file) {
                    correct++;
                }
            });
            
            if (!allAssigned) {
                feedback.className = 'mt-3 p-3 rounded-lg text-xs font-medium bg-amber-50 text-amber-800';
                feedback.innerText = '⚠️ נא לשייך את כל שורות הקוד לקבצים לפני הבדיקה.';
                return;
            }
            
            if (correct === total) {
                feedback.className = 'mt-3 p-3 rounded-lg text-xs font-medium bg-green-50 text-green-800 border border-green-200';
                feedback.innerHTML = '🎉 <strong>דיוק מושלם!</strong> כל שורות הקוד שוייכו לקבצים הנכונים בהתאם לעקרון הפרדת האחריות (Separation of Concerns). המודל הפיזי (Store) מופרד לחלוטין מהדקדוק (Lang) ומהלוגיקה (Interp).';
                document.querySelectorAll('.file-box').forEach(box => box.classList.add('border-green-500'));
            } else {
                feedback.className = 'mt-3 p-3 rounded-lg text-xs font-medium bg-red-50 text-red-800 border border-red-200';
                feedback.innerHTML = `❌ <strong>יש שגיאות!</strong> שייכת נכון ${correct} מתוך ${total} שורות. בדוק שוב את מיקומי הפונקציות המטפלות בזיכרון, ייצוג הטיפוסים, והדקדוק.`;
                
                // Highlight incorrect boxes
                ['store', 'lang', 'interp', 'data'].forEach(file => {
                    const hasError = archSnippets.some(snip => userAssignments[snip.id] === file && snip.file !== file);
                    const boxEl = document.getElementById('target-' + file);
                    if (hasError) {
                        boxEl.classList.add('border-red-500');
                    } else {
                        boxEl.classList.add('border-green-500');
                    }
                });
            }
        }


        // --- Widget 1.2: AST Explorer Logic ---
        const astNodes = {
            'let': {
                title: 'let-exp (ביטוי הגדרת משתנה)',
                desc: 'זהו השורש של התוכנית שלנו. הוא מקבל שם משתנה (binder), ביטוי לאתחול (bound expression) וגוף (body) בו המשתנה קיים.'
            },
            'x': {
                title: 'var (משתנה)',
                desc: 'המזהה המקשר. בשפה זו הוא קשור לכתובת הזיכרון שתיווצר.'
            },
            'newref': {
                title: 'newref-exp (הקצאת תא זיכרון)',
                desc: 'ביטוי הקצאה מפורש. הוא מעריך את הארגומנט (0) בתוך ה-Store, מקבל כתובת חדשה, ועוטף אותה בתוך <code>ref-val</code>.'
            },
            'c0': {
                title: 'const-exp(0) (ביטוי מספר קבוע)',
                desc: 'מייצג מספר קבוע פשוט (0) שיוערך ל-<code>num-val(0)</code>.'
            },
            'setref': {
                title: 'setref-exp (שינוי ערך תא)',
                desc: 'ביטוי המשנה את הערך השמור בכתובת מסוימת ב-Store. הוא מקבל ביטוי לכתובת (x) וביטוי לערך החדש (5).'
            },
            'vx': {
                title: 'var-exp(x) (ביטוי קריאת משתנה)',
                desc: 'שליפת ערך המשתנה מהסביבה. הערך שמתקבל כאן הוא <code>ref-val</code> (כתובת הזיכרון).'
            },
            'c5': {
                title: 'const-exp(5) (ביטוי מספר קבוע)',
                desc: 'הערך החדש (5) שיוערך ל-<code>num-val(5)</code> וייכתב לתוך הכתובת.'
            }
        };

        function highlightAST(nodeId) {
            // Remove active class from all tokens and nodes
            document.querySelectorAll('.token-word').forEach(tok => tok.classList.remove('active-token'));
            document.querySelectorAll('.ast-node').forEach(node => node.classList.remove('highlighted'));
            document.querySelectorAll('.ast-node text').forEach(t => t.classList.remove('highlighted'));
            
            // Highlight current token
            const tokEl = document.getElementById('tok-' + nodeId);
            if (tokEl) tokEl.classList.add('active-token');
            if (nodeId === 'let') {
                const tokIn = document.getElementById('tok-in');
                if (tokIn) tokIn.classList.add('active-token');
            }
            
            // Highlight current SVG node
            const nodeEl = document.getElementById('ast-' + nodeId);
            if (nodeEl) {
                nodeEl.classList.add('highlighted');
                const circle = nodeEl.querySelector('circle');
                if (circle) circle.setAttribute('fill', '#ca8a04');
                const text = nodeEl.querySelector('text');
                if (text) text.classList.add('highlighted');
            }
            
            // Update explanation card
            const explain = document.getElementById('ast-explain-card');
            if (explain && astNodes[nodeId]) {
                explain.innerHTML = `
                    <span class="font-bold text-amber-800 text-sm font-sans">${astNodes[nodeId].title}:</span>
                    <p class="mt-1 leading-relaxed font-sans">${astNodes[nodeId].desc}</p>
                `;
            }
        }

        function clickAST(nodeId) {
            highlightAST(nodeId);
        }


        // --- Widget 1.3: Stepper Logic ---
        let stepperCurrentStep = 0;
        const stepperSteps = [
            {
                srcHighlight: 'src-line-1',
                schHighlight: 'sch-let',
                env: 'Empty Env',
                store: '[Empty Store]',
                explain: '<strong>שלב 1: התחלת הרצת let-exp</strong><br>המפרש נכנס לטיפול בביטוי ה-let הראשי. הוא יוערך בסביבה הריקה הנוכחית.'
            },
            {
                srcHighlight: 'src-line-1',
                schHighlight: 'sch-let-val',
                env: 'Empty Env',
                store: '[Empty Store]',
                explain: '<strong>שלב 2: הערכת הביטוי המאותחל</strong><br>כעת המפרש פונה להעריך את הביטוי המאותחל <code>newref(42)</code>.'
            },
            {
                srcHighlight: 'src-line-1',
                schHighlight: 'sch-newref',
                env: 'Empty Env',
                store: '[Empty Store]',
                explain: '<strong>שלב 3: כניסה ל-newref-exp</strong><br>המפרש מזהה ביטוי הקצאה. הוא מעריך תחילה את הארגומנט <code>42</code>.'
            },
            {
                srcHighlight: 'src-line-1',
                schHighlight: 'sch-newref-eval',
                env: 'Empty Env',
                store: 'L0: num-val(42)',
                explain: '<strong>שלב 4: הרצת newref והקצאה ב-Store</strong><br>הערך <code>num-val(42)</code> נדחף ל-Store במיקום הפנוי הראשון <code>L0</code>. הפונקציה <code>newref</code> מחזירה <code>0</code>, והמפרש אורז אותו לתוך <code>ref-val(0)</code>.'
            },
            {
                srcHighlight: 'src-line-1',
                schHighlight: 'sch-let-body',
                env: 'x ➔ ref-val(L0)',
                store: 'L0: num-val(42)',
                explain: '<strong>שלב 5: הרחבת הסביבה</strong><br>המפרש קושר את שם המשתנה <code>x</code> לערך המוחזר <code>ref-val(L0)</code>. הסביבה מורחבת כעת, ופונים להעריך את גוף ה-let.'
            },
            {
                srcHighlight: 'src-line-2',
                schHighlight: 'sch-deref',
                env: 'x ➔ ref-val(L0)',
                store: 'L0: num-val(42)',
                explain: '<strong>שלב 6: כניסה ל-deref-exp</strong><br>בתוך גוף ה-let, המפרש מעריך את ביטוי הקריאה מהזיכרון <code>deref(x)</code>. השלב הראשון הוא הערכת הארגומנט <code>x</code>.'
            },
            {
                srcHighlight: 'src-line-2',
                schHighlight: 'sch-deref-eval',
                env: 'x ➔ ref-val(L0)',
                store: 'L0: num-val(42)',
                explain: '<strong>שלב 7: שליפת המשתנה x מהסביבה</strong><br>חיפוש המשתנה <code>x</code> בסביבה מחזיר את הכתובת <code>ref-val(L0)</code>.'
            },
            {
                srcHighlight: 'src-line-2',
                schHighlight: 'sch-deref-get',
                env: 'x ➔ ref-val(L0)',
                store: '<span class="bg-yellow-200 p-0.5 rounded text-amber-900 font-bold">L0: num-val(42) [נשלף!]</span>',
                explain: '<strong>שלב 8: ביצוע deref על הכתובת</strong><br>המפרש מחלץ את המספר <code>0</code>, פונה ל-Store בכתובת <code>L0</code> ומחזיר את הערך השמור שם: <code>num-val(42)</code>. הריצה הושלמה בהצלחה!'
            }
        ];

        function updateStepperView() {
            const step = stepperSteps[stepperCurrentStep];
            
            // Clear highlights
            document.querySelectorAll('.step-code-line').forEach(el => el.classList.remove('active'));
            
            // Highlight source code
            const srcEl = document.getElementById(step.srcHighlight);
            if (srcEl) srcEl.classList.add('active');
            
            // Highlight scheme code
            const schEl = document.getElementById(step.schHighlight);
            if (schEl) schEl.classList.add('active');
            
            // Update env and store views
            document.getElementById('stepper-env').innerHTML = step.env;
            document.getElementById('stepper-store').innerHTML = step.store;
            
            // Update explanation text
            document.getElementById('stepper-explain').innerHTML = step.explain;
            
            // Enable/disable buttons
            const btnPrev = document.getElementById('btn-stepper-prev');
            const btnNext = document.getElementById('btn-stepper-next');
            
            btnPrev.disabled = stepperCurrentStep === 0;
            if (stepperCurrentStep === stepperSteps.length - 1) {
                btnNext.innerText = 'סיים / אפס';
            } else {
                btnNext.innerText = 'צעד הבא';
            }
        }

        function nextStepStepper() {
            if (stepperCurrentStep === stepperSteps.length - 1) {
                resetStepper();
            } else {
                stepperCurrentStep++;
                updateStepperView();
            }
        }

        function prevStepStepper() {
            if (stepperCurrentStep > 0) {
                stepperCurrentStep--;
                updateStepperView();
            }
        }

        function resetStepper() {
            stepperCurrentStep = 0;
            updateStepperView();
        }


        // --- Widget 2.1: Code Diff Logic ---
        const diffData = {
            'explicit': {
                envCode: `<span class="token-comment">; environments.scm:</span><br><span class="token-keyword">define</span> extend-env<br>&nbsp;&nbsp;(<span class="token-keyword">lambda</span> (var val env)<br>&nbsp;&nbsp;&nbsp;&nbsp;(extend-env-record var <span class="bg-blue-900/50 text-blue-300 font-bold px-1 rounded">val</span> env)))`,
                envDesc: 'ב-EXPLICIT-REFS, הסביבה קושרת משתנה רגיל ישירות לערך שמתקבל בארגומנט (val). אין שיוך אוטומטי ל-Store.',
                interpCode: `<span class="token-comment">; interp.scm:</span><br>(var-exp (var)<br>&nbsp;&nbsp;(apply-env env var))`,
                interpDesc: 'חיפוש משתנה בסביבה מחזיר ישירות את הטיפוס השמור. אם רצינו כתובת, המשתמש היה צריך להפעיל <code>newref</code> מראש.'
            },
            'implicit': {
                envCode: `<span class="token-comment">; environments.scm:</span><br><span class="token-keyword">define</span> extend-env<br>&nbsp;&nbsp;(<span class="token-keyword">lambda</span> (var val env)<br>&nbsp;&nbsp;&nbsp;&nbsp;(extend-env-record var <span class="bg-emerald-950 text-emerald-300 font-bold px-1 rounded">(newref val)</span> env)))`,
                envDesc: 'ב-IMPLICIT-REFS, <strong>סביבת המפרש מכילה רק כתובות!</strong> בכל פעם שיוצרים קשירה, המפרש מבצע אוטומטית הקצאה (<code>newref</code>) ב-Store ושומר את הכתובת.',
                interpCode: `<span class="token-comment">; interp.scm:</span><br>(var-exp (var)<br>&nbsp;&nbsp;<span class="bg-emerald-950 text-emerald-300 font-bold px-1 rounded">(deref</span> (apply-env env var)<span class="bg-emerald-950 text-emerald-300 font-bold px-1 rounded">)</span>)`,
                interpDesc: 'כיוון שמשתנה בסביבה קשור תמיד לכתובת בזיכרון, בכל פעם שמאתרים משתנה (var-exp) המפרש מבצע אוטומטית <code>deref</code> בסתר ומחזיר את הערך הפנימי.'
            }
        };

        function setDiffMode(mode) {
            const data = diffData[mode];
            document.getElementById('diff-env-code').innerHTML = data.envCode;
            document.getElementById('diff-env-desc').innerHTML = data.envDesc;
            document.getElementById('diff-interp-code').innerHTML = data.interpCode;
            document.getElementById('diff-interp-desc').innerHTML = data.interpDesc;
            
            const btnExp = document.getElementById('btn-diff-exp');
            const btnImp = document.getElementById('btn-diff-imp');
            
            if (mode === 'explicit') {
                btnExp.className = 'px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 text-white shadow-sm cursor-pointer';
                btnImp.className = 'px-4 py-2 text-xs font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
            } else {
                btnImp.className = 'px-4 py-2 text-xs font-bold rounded-lg bg-red-600 text-white shadow-sm cursor-pointer';
                btnExp.className = 'px-4 py-2 text-xs font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
            }
        }


        // --- Widget 2.3: L-value vs R-value Logic ---
        let lrQuestionState = 'lvalue'; // or 'rvalue'

        function clickLR(xId) {
            const feedback = document.getElementById('lr-explain-box');
            feedback.classList.remove('hidden');
            
            const x1 = document.getElementById('lv-x1');
            const x2 = document.getElementById('lv-x2');
            
            if (lrQuestionState === 'lvalue') {
                if (xId === 'x1') {
                    x1.className = 'px-2 py-1 bg-green-100 border-2 border-green-500 rounded font-bold text-green-700 transition-all';
                    feedback.className = 'p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 leading-relaxed font-sans';
                    feedback.innerHTML = '🎉 <strong>נכון מאוד!</strong> ה-x הראשון (משמאל ל-<code>=</code>) הוא <strong>L-value</strong> (Location Value). במפרש מופעל <code>assign-exp</code> המחשב את הביטוי ומעדכן את כתובת התא באמצעות <code>setref!</code>. <br>כעת, בוא נזהה את ה-R-value.';
                    
                    lrQuestionState = 'rvalue';
                    document.getElementById('lr-question').innerText = 'לחץ על ה-x שהוא הערך שנקרא מהזיכרון (R-value)';
                    document.getElementById('lr-question').className = 'text-xs font-bold text-slate-700 bg-purple-50 text-purple-800 px-4 py-2 rounded-full font-sans';
                } else {
                    x2.className = 'px-2 py-1 bg-red-100 border-2 border-red-500 rounded font-bold text-red-700 transition-all';
                    feedback.className = 'p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-sans';
                    feedback.innerHTML = '❌ <strong>לא נכון.</strong> ה-x שבתוך <code>+(x, 1)</code> משמש לקריאת ערך ולא לכתיבה. נסה ללחוץ על ה-x השני.';
                    setTimeout(() => {
                        x2.className = 'px-2 py-1 bg-slate-100 border border-slate-300 rounded cursor-pointer hover:bg-yellow-100 transition-colors font-bold';
                    }, 1500);
                }
            } else {
                if (xId === 'x2') {
                    x2.className = 'px-2 py-1 bg-green-100 border-2 border-green-500 rounded font-bold text-green-700 transition-all';
                    feedback.className = 'p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 leading-relaxed font-sans';
                    feedback.innerHTML = '🎉 <strong>נכון מאוד!</strong> ה-x השני הוא <strong>R-value</strong> (Retrieve Value). במפרש מופעל <code>var-exp</code> אשר מאתר את הכתובת של x מהסביבה ומבצע אוטומטית <code>(deref ref)</code> כדי לחלץ את תוכנו (הערך הנוכחי).';
                    
                    document.getElementById('lr-question').innerText = 'הושלם בהצלחה!';
                    document.getElementById('lr-question').className = 'text-xs font-bold text-emerald-800 bg-emerald-100 px-4 py-2 rounded-full font-sans';
                } else {
                    x1.className = 'px-2 py-1 bg-red-100 border-2 border-red-500 rounded font-bold text-red-700 transition-all';
                    feedback.className = 'p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-sans';
                    feedback.innerHTML = '❌ <strong>לא נכון.</strong> ה-x הראשון הוא הכתובת אליה כותבים. לחץ על ה-x שבתוך החיבור.';
                    setTimeout(() => {
                        x1.className = 'px-2 py-1 bg-green-100 border-2 border-green-500 rounded font-bold text-green-700 transition-all';
                    }, 1500);
                }
            }
        }


        // --- Widget 2.4: Dynamic Dispatch Router Logic ---
        function routeType(type) {
            const ball = document.getElementById('router-ball');
            const explain = document.getElementById('router-explain-box');
            if (!ball || !explain) return;
            
            ball.classList.remove('hidden');
            
            // Reset active paths
            document.getElementById('path-int').setAttribute('stroke', '#475569');
            document.getElementById('path-bool').setAttribute('stroke', '#475569');
            document.getElementById('path-func').setAttribute('stroke', '#475569');
            
            // Animation coordinates based on type
            let path = '';
            let targetStroke = '';
            let expText = '';
            
            if (type === 'int') {
                path = 'path-int';
                targetStroke = '#3b82f6';
                expText = `<strong>ניתוב ל-proc-int:</strong><br>הקלט <code>100</code> זוהה כ-<code>num-val</code>. פונקציית <code>get-arg-type</code> מחזירה את הטיפוס <code>Int</code>, ומנגנון הדיספאץ' קורא לפרוצדורה המתאימה שתוצאתה: <code>100 - 300 = -200</code>.`;
            } else if (type === 'bool') {
                path = 'path-bool';
                targetStroke = '#10b981';
                expText = `<strong>ניתוב ל-proc-bool:</strong><br>הקלט <code>true</code> זוהה כ-<code>bool-val</code>. הטיפוס שזוהה הוא <code>Bool</code>, והנתב מפנה לפונקציה המצפה לבוליאנים, המריצה את קוד הטיפול בבוליאני.`;
            } else {
                path = 'path-func';
                targetStroke = '#a855f7';
                expText = `<strong>ניתוב ל-proc-func:</strong><br>הקלט <code>proc(w)...</code> זוהה כ-<code>proc-val</code>. הטיפוס שזוהה הוא <code>Func</code>, והניתוב מפנה לגרסת הפונקציות שמבצעת את הערכת הפרוצדורה בהתאם.`;
            }
            
            // Animation of the ball along the path
            const pathEl = document.getElementById(path);
            const pathLength = pathEl.getTotalLength();
            
            let start = null;
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const duration = 1200; // ms
                
                const percent = Math.min(progress / duration, 1);
                const point = pathEl.getPointAtLength(percent * pathLength);
                
                ball.setAttribute('cx', point.x);
                ball.setAttribute('cy', point.y);
                
                if (percent < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    // Animation complete
                    pathEl.setAttribute('stroke', targetStroke);
                    explain.innerHTML = expText;
                }
            }
            window.requestAnimationFrame(step);
        }


        // --- Widget 3.1: Parsons Problem Logic ---
        const parsonsCorrectOrder = [
            "(define setleft-exp",
            "  (lambda (p val)",
            "    (cases expval p",
            "      (mutpair-val (loc)",
            "        (let ((ref1 (left-cell-ref loc)))",
            "          (setref! ref1 val)))",
            "      (else (eopl:error 'setleft \"not a pair: ~s\" p)))))"
        ];
        let parsonsUserOrder = [];

        function resetParsons() {
            // Shuffle
            parsonsUserOrder = [...parsonsCorrectOrder].sort(() => Math.random() - 0.5);
            renderParsons();
            
            const feedback = document.getElementById('parsons-feedback');
            feedback.className = 'mt-3 p-3 rounded-lg text-xs font-medium hidden';
            feedback.innerText = '';
        }

        function renderParsons() {
            const container = document.getElementById('parsons-container');
            container.innerHTML = '';
            
            parsonsUserOrder.forEach((line, index) => {
                const el = document.createElement('div');
                el.className = 'parsons-line';
                
                const codeSpan = document.createElement('span');
                codeSpan.className = 'font-mono text-slate-800 font-bold';
                codeSpan.innerText = line;
                el.appendChild(codeSpan);
                
                const btnContainer = document.createElement('div');
                btnContainer.className = 'flex gap-1';
                
                // Up btn
                if (index > 0) {
                    const upBtn = document.createElement('button');
                    upBtn.className = 'px-1.5 py-0.5 bg-slate-200 rounded text-[10px] font-bold hover:bg-slate-300 cursor-pointer font-sans';
                    upBtn.innerText = '↑';
                    upBtn.onclick = () => moveParsons(index, -1);
                    btnContainer.appendChild(upBtn);
                }
                
                // Down btn
                if (index < parsonsUserOrder.length - 1) {
                    const downBtn = document.createElement('button');
                    downBtn.className = 'px-1.5 py-0.5 bg-slate-200 rounded text-[10px] font-bold hover:bg-slate-300 cursor-pointer font-sans';
                    downBtn.innerText = '↓';
                    downBtn.onclick = () => moveParsons(index, 1);
                    btnContainer.appendChild(downBtn);
                }
                
                el.appendChild(btnContainer);
                container.appendChild(el);
            });
        }

        function moveParsons(index, direction) {
            const temp = parsonsUserOrder[index];
            parsonsUserOrder[index] = parsonsUserOrder[index + direction];
            parsonsUserOrder[index + direction] = temp;
            renderParsons();
        }

        function checkParsons() {
            const feedback = document.getElementById('parsons-feedback');
            feedback.classList.remove('hidden');
            
            let isCorrect = true;
            for (let i = 0; i < parsonsCorrectOrder.length; i++) {
                if (parsonsUserOrder[i] !== parsonsCorrectOrder[i]) {
                    isCorrect = false;
                    break;
                }
            }
            
            if (isCorrect) {
                feedback.className = 'mt-3 p-3 rounded-lg text-xs font-medium bg-green-50 text-green-800 border border-green-200 font-sans';
                feedback.innerHTML = '🎉 <strong>קוד מסודר נכון!</strong> הפעולה <code>setleft</code> מתחילה בחילוץ הכתובת הפנימית מ-<code>mutpair-val</code> (זוהי כתובת התא השמאלי ב-Store), ואז מבצעת עדכון זיכרון באמצעות <code>setref!</code> של התא השמאלי.';
            } else {
                feedback.className = 'mt-3 p-3 rounded-lg text-xs font-medium bg-red-50 text-red-800 border border-red-200 font-sans';
                feedback.innerHTML = '❌ <strong>סדר שגוי!</strong> נסה שוב. זכור: יש לעבור על ה-cases תחילה, לחלץ את המשתנה מתוך ה-variant, לקבל את הכתובת של התא השמאלי בעזרת <code>left-cell-ref</code>, ורק אז להריץ <code>setref!</code>.';
            }
        }


        // --- Widget 3.3: Memory Layout Logic ---
        let currentMemMode = 1;

        function setMemMode(mode) {
            currentMemMode = mode;
            
            const btnP1 = document.getElementById('btn-mem-p1');
            const btnP2 = document.getElementById('btn-mem-p2');
            
            if (mode === 1) {
                btnP1.className = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-600 text-white shadow-sm cursor-pointer';
                btnP2.className = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
                document.getElementById('mem-title').innerText = 'גישה 1: PairVal1';
                document.getElementById('mem-desc').innerText = 'בגישה זו, יצירת זוג מקצה שני תאים נפרדים בזיכרון (עבור car ו-cdr), ויוצרת אובייקט שלישי (הזוג עצמו) המכיל את שתי הכתובות. זה עלול לגרום לפרגמנטציה בזיכרון בגלל אי-רציפות.';
            } else {
                btnP2.className = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-600 text-white shadow-sm cursor-pointer';
                btnP1.className = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
                document.getElementById('mem-title').innerText = 'גישה 2: PairVal2';
                document.getElementById('mem-desc').innerText = 'בגישה זו, יצירת זוג מקצה בלוק רציף אחד המכיל שני תאים צמודים. הערך שמתקבל במפרש (mutpair-val) מחזיק רק את הכתובת הראשונה (L_base) ומאחורי הקלעים ה-cdr מחושב פשוט כאינדקס L_base + 1. שיטה זו מונעת פרגמנטציה וחוסכת הקצאת תא שלישי!';
            }
            
            // Reset grid
            for (let i = 0; i < 8; i++) {
                const cell = document.getElementById('mem-cell-' + i);
                cell.className = 'border border-slate-800 p-2 rounded bg-slate-900 text-slate-500';
                cell.innerText = `L${i}: -`;
            }
            document.getElementById('mem-conn-canvas').innerHTML = '';
        }

        function allocPairMemory() {
            // Reset grid
            setMemMode(currentMemMode);
            
            if (currentMemMode === 1) {
                // PairVal1: Allocate L1, L4, and L2 for pair
                setTimeout(() => {
                    const c1 = document.getElementById('mem-cell-1');
                    c1.className = 'border-2 border-blue-500 p-2 rounded bg-blue-950 text-blue-300 font-bold';
                    c1.innerText = 'L1: num(11)';
                }, 200);
                
                setTimeout(() => {
                    const c4 = document.getElementById('mem-cell-4');
                    c4.className = 'border-2 border-purple-500 p-2 rounded bg-purple-950 text-purple-300 font-bold';
                    c4.innerText = 'L4: num(22)';
                }, 500);
                
                setTimeout(() => {
                    const c2 = document.getElementById('mem-cell-2');
                    c2.className = 'border-2 border-emerald-500 p-2 rounded bg-emerald-950 text-emerald-300 font-bold';
                    c2.innerText = 'L2: pair(L1, L4)';
                    document.getElementById('mem-conn-canvas').innerHTML = 'הזוג הוקצה ב-L2. הוא מצביע ל-L1 (car) ול-L4 (cdr). בוצעו 3 הקצאות בזיכרון.';
                }, 800);
            } else {
                // PairVal2: Contiguous allocate L2 and L3
                setTimeout(() => {
                    const c2 = document.getElementById('mem-cell-2');
                    c2.className = 'border-2 border-blue-500 p-2 rounded bg-blue-950 text-blue-300 font-bold';
                    c2.innerText = 'L2: num(11) [car]';
                }, 200);
                
                setTimeout(() => {
                    const c3 = document.getElementById('mem-cell-3');
                    c3.className = 'border-2 border-purple-500 p-2 rounded bg-purple-950 text-purple-300 font-bold';
                    c3.innerText = 'L3: num(22) [cdr]';
                }, 500);
                
                setTimeout(() => {
                    document.getElementById('mem-conn-canvas').innerHTML = 'הזוג מיוצג פשוט על ידי הכתובת L2. ה-car הוא L2 וה-cdr מחושב מתמטית כ-L3 (L2+1). נחסכה הקצאה שלישית!';
                }, 800);
            }
        }


        // --- Widget 4.1: value-of-operand Flowchart Logic ---
        function traceFlowchart() {
            const isVar = document.getElementById('flow-arg-var').checked;
            const isCbr = document.getElementById('flow-mode-cbr').checked;
            
            // Reset active nodes and lines
            document.querySelectorAll('.flow-node').forEach(node => {
                node.setAttribute('fill', '#f8fafc');
                node.setAttribute('stroke', '#64748b');
            });
            document.querySelectorAll('.flow-line').forEach(line => {
                line.classList.remove('active-line');
                line.setAttribute('stroke', '#cbd5e1');
            });
            
            const step_start = () => {
                document.getElementById('node-start').setAttribute('fill', '#ccfbf1');
                document.getElementById('node-start').setAttribute('stroke', '#14b8a6');
                document.getElementById('line-1-2').classList.add('active-line');
                document.getElementById('flow-explain').innerHTML = 'מתחילים בעיבוד הארגומנט ב-<code>value-of-operand</code>...';
                setTimeout(step_valop, 600);
            };
            
            const step_valop = () => {
                document.getElementById('node-valop').setAttribute('fill', '#ccfbf1');
                document.getElementById('node-valop').setAttribute('stroke', '#14b8a6');
                
                if (isCbr && isVar) {
                    document.getElementById('line-left').classList.add('active-line');
                    document.getElementById('flow-explain').innerHTML = 'המתווך מזהה שההעברה היא CBR וגם שהארגומנט הוא משתנה חיצוני!';
                    setTimeout(step_decision, 600);
                } else {
                    document.getElementById('line-right').classList.add('active-line');
                    document.getElementById('flow-explain').innerHTML = 'ההעברה היא CBV או שהארגומנט הוא ביטוי מתמטי.';
                    setTimeout(step_eval, 600);
                }
            };
            
            const step_decision = () => {
                document.getElementById('node-dec').setAttribute('fill', '#ccfbf1');
                document.getElementById('node-dec').setAttribute('stroke', '#14b8a6');
                document.getElementById('line-dec-yes').classList.add('active-line');
                document.getElementById('flow-explain').innerHTML = '<strong>כן!</strong> הארגומנט הוא משתנה ב-CBR. אנו עוקפים את ההערכה הרגילה.';
                setTimeout(step_alias, 800);
            };
            
            const step_alias = () => {
                document.getElementById('node-alias').setAttribute('fill', '#99f6e4');
                document.getElementById('node-alias').setAttribute('stroke', '#0d9488');
                document.getElementById('flow-explain').innerHTML = '<strong>תוצאה:</strong> הכתובת המקורית של המשתנה נשלפת ומחזרת ישירות! נוצר Aliasing ב-Store.';
            };
            
            const step_eval = () => {
                document.getElementById('node-eval').setAttribute('fill', '#ccfbf1');
                document.getElementById('node-eval').setAttribute('stroke', '#14b8a6');
                document.getElementById('line-eval-new').classList.add('active-line');
                document.getElementById('flow-explain').innerHTML = 'מעריכים את הביטוי כדי לקבל ExpVal, ומקצים לו תא חדש ב-Store.';
                setTimeout(step_newref, 800);
            };
            
            const step_newref = () => {
                document.getElementById('node-newref').setAttribute('fill', '#99f6e4');
                document.getElementById('node-newref').setAttribute('stroke', '#0d9488');
                document.getElementById('flow-explain').innerHTML = '<strong>תוצאה:</strong> נוצר תא זיכרון חדש ב-Store. הפרמטר נקשר לכתובת החדשה הזו. אין סכנת Aliasing.';
            };
            
            step_start();
        }


        // --- Widget 4.3: Aliasing Live Editor Logic ---
        function updateAliasSim(val) {
            const storeVal = document.getElementById('alias-store-val');
            const valX = document.getElementById('alias-var-x');
            const valY = document.getElementById('alias-var-y');
            const cell = document.getElementById('alias-store-cell');
            
            storeVal.innerText = `num-val(${val})`;
            valX.innerText = val;
            valY.innerText = val;
            
            // Visual pulse highlight
            valX.className = 'w-14 h-10 rounded border bg-yellow-100 border-yellow-400 text-slate-800 flex items-center justify-center font-mono font-bold mt-1 scale-105';
            cell.className = 'w-28 h-12 rounded-lg border-2 border-yellow-500 bg-yellow-50 text-yellow-800 flex flex-col items-center justify-center mt-1 scale-105';
            
            setTimeout(() => {
                valX.className = 'w-14 h-10 rounded border bg-blue-50 text-blue-700 flex items-center justify-center font-mono font-bold mt-1 transition-all';
                cell.className = 'w-28 h-12 rounded-lg border-2 border-emerald-500 bg-emerald-50 text-emerald-800 flex flex-col items-center justify-center mt-1 transition-all';
            }, 500);
        }


        // --- Widget 4.4: Thunk Unboxing Logic ---
        let lazyMode = 'name';
        let lazyAccesses = 0;
        let lazyEvaluations = 0;
        let isEvaluated = false;

        function setLazyMode(mode) {
            lazyMode = mode;
            lazyAccesses = 0;
            lazyEvaluations = 0;
            isEvaluated = false;
            
            const btnName = document.getElementById('btn-lazy-name');
            const btnNeed = document.getElementById('btn-lazy-need');
            
            if (mode === 'name') {
                btnName.className = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-teal-600 text-white shadow-sm cursor-pointer';
                btnNeed.className = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
                document.getElementById('lazy-title').innerText = 'Call-by-Name (עצלנות ללא שמירה)';
                document.getElementById('lazy-desc').innerText = 'בגישת Name, בכל פעם שניגשים למשתנה, ה-Thunk נפתח, מעריך מחדש את הביטוי (מריץ את גלגלי השיניים), ומחזיר את הערך. אין שימור זיכרון.';
            } else {
                btnNeed.className = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-teal-600 text-white shadow-sm cursor-pointer';
                btnName.className = 'px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer';
                document.getElementById('lazy-title').innerText = 'Call-by-Need (עצלנות עם שמירה)';
                document.getElementById('lazy-desc').innerText = 'בגישת Need, בפעם הראשונה שניגשים למשתנה, ה-Thunk נפתח ומחשב את הערך. לאחר מכן, הוא מעדכן את עצמו (Memoization) באמצעות השמה ב-Store. קריאות נוספות ישלפו את הערך מיידית ללא צורך בחישוב מחדש!';
            }
            
            document.getElementById('lazy-access-cnt').innerText = '0';
            document.getElementById('lazy-eval-cnt').innerText = '0';
            
            // Show closed chest
            document.getElementById('chest-closed').classList.remove('hidden');
            document.getElementById('chest-open').classList.add('hidden');
            document.getElementById('chest-solid').classList.add('hidden');
            document.getElementById('chest-label').innerText = 'thunk(+(10,5))';
            document.getElementById('chest-status').innerText = 'Chest status: CLOSED (Lazy Thunk)';
        }

        function accessLazyVar() {
            lazyAccesses++;
            document.getElementById('lazy-access-cnt').innerText = lazyAccesses;
            
            const svg = document.getElementById('thunk-chest');
            svg.classList.add('shake');
            setTimeout(() => svg.classList.remove('shake'), 500);
            
            if (lazyMode === 'name') {
                lazyEvaluations++;
                document.getElementById('lazy-eval-cnt').innerText = lazyEvaluations;
                
                // Show open anim
                document.getElementById('chest-closed').classList.add('hidden');
                document.getElementById('chest-open').classList.remove('hidden');
                document.getElementById('chest-status').innerText = 'Evaluating Thunk (gears turning...)';
                
                setTimeout(() => {
                    document.getElementById('chest-open').classList.add('hidden');
                    document.getElementById('chest-closed').classList.remove('hidden');
                    document.getElementById('chest-status').innerText = 'Result returned: 15. Chest CLOSED.';
                }, 800);
            } else {
                // Need mode
                if (!isEvaluated) {
                    lazyEvaluations++;
                    document.getElementById('lazy-eval-cnt').innerText = lazyEvaluations;
                    isEvaluated = true;
                    
                    document.getElementById('chest-closed').classList.add('hidden');
                    document.getElementById('chest-open').classList.remove('hidden');
                    document.getElementById('chest-status').innerText = 'First access: Evaluating and memoizing...';
                    
                    setTimeout(() => {
                        document.getElementById('chest-open').classList.add('hidden');
                        document.getElementById('chest-solid').classList.remove('hidden');
                        document.getElementById('chest-label').innerText = 'Evaluated: 15';
                        document.getElementById('chest-status').innerText = 'Memoized! Thunk converted to solid block.';
                    }, 800);
                } else {
                    // Already evaluated
                    document.getElementById('chest-status').innerText = 'Instant lookup! Value read from solid block.';
                }
            }
        }
    
        
        document.addEventListener("DOMContentLoaded", () => {
            // Initialize new dynamic widgets
            resetArchitectureGame();
            highlightAST('let');
            resetStepper();
            setDiffMode('explicit');
            resetParsons();
            setMemMode(1);
            setLazyMode('name');
        });
    
    </script>
    </body>
    

</html>