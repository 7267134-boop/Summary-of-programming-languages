
        function showTab(tabId) {
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

        // --- Let vs Let* Simulator JS Logic ---
        let letMode2 = 'parallel';
        let letStep2 = 0;

        function setLetMode(mode) {
            letMode2 = mode;
            resetLetSim2();
            const btnP = document.getElementById('btn-letmode-parallel');
            const btnS = document.getElementById('btn-letmode-sequential');
            if (btnP) btnP.className = mode === 'parallel' ? "px-4 py-2 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer" : "px-4 py-2 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
            if (btnS) btnS.className = mode === 'sequential' ? "px-4 py-2 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-sm cursor-pointer" : "px-4 py-2 text-xs font-bold rounded-lg transition-all bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer";
        }

        function resetLetSim2() {
            letStep2 = 0;
            const stepBtn = document.getElementById('btn-let-step2');
            if (stepBtn) {
                stepBtn.innerText = "בצע צעד (Step)";
                stepBtn.className = stepBtn.className.replace('bg-slate-400 hover:bg-slate-500', 'bg-emerald-600 hover:bg-emerald-700');
            }
            const explain = document.getElementById('let-explain2');
            if (explain) explain.innerHTML = 'לחצו על "בצע צעד" כדי לראות את שלבי הרצת הקוד ומעקב הסביבות.';
            const envView = document.getElementById('let-env-view2');
            if (envView) envView.innerHTML = `
                <div class="w-full max-w-[240px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
            `;
        }

        function stepLetSim2() {
            const explain = document.getElementById('let-explain2');
            const envView = document.getElementById('let-env-view2');
            const stepBtn = document.getElementById('btn-let-step2');
            if (!explain || !envView || !stepBtn) return;

            if (letMode2 === 'parallel') {
                if (letStep2 >= 3) {
                    stepBtn.innerText = "הסתיים";
                    stepBtn.className = stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
                    return;
                }
                letStep2++;

                if (letStep2 === 1) {
                    envView.innerHTML = `
                        <div class="w-full max-w-[240px] bg-white p-3 rounded-lg border border-slate-300 flex justify-between items-center shadow-sm">
                            <span class="text-[10px] text-slate-400 font-bold">E1 (let x=2)</span>
                            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-mono font-bold">x = 2</span>
                        </div>
                        <div class="text-slate-400 text-[10px] font-bold">↓</div>
                        <div class="w-full max-w-[240px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
                    `;
                    explain.innerHTML = `<strong>צעד 1: הגדרת x חיצוני</strong><br>המפרש מעריך <code>x = 2</code> ומחדיר אותו לסביבה חדשה <code>E1</code>.`;
                } else if (letStep2 === 2) {
                    envView.innerHTML = `
                        <div class="w-full max-w-[240px] bg-white p-3 rounded-lg border-2 border-emerald-500 flex justify-between items-center shadow">
                            <span class="text-[10px] text-slate-400 font-bold">E2 (let x=10, y=3)</span>
                            <span class="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded font-mono font-bold">x = 10, y = 3</span>
                        </div>
                        <div class="text-slate-400 text-[10px] font-bold">↓</div>
                        <div class="w-full max-w-[240px] bg-white p-3 rounded-lg border border-slate-300 flex justify-between items-center shadow-sm">
                            <span class="text-[10px] text-slate-400 font-bold">E1 (let x=2)</span>
                            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-mono font-bold">x = 2</span>
                        </div>
                        <div class="text-slate-400 text-[10px] font-bold">↓</div>
                        <div class="w-full max-w-[240px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
                    `;
                    explain.innerHTML = `<strong>צעד 2: הרחבה במקביל (Multi-Let)</strong><br>המפרש מעריך את כל ביטויי ההשמה <strong>בסביבה E1</strong>:<br>
                    - <code>10</code> מוערך ל-10.<br>
                    - <code>+(x, 1)</code> מוערך ל-<code>+(2, 1) = 3</code> (כי x ב-E1 הוא 2).<br>
                    שני המשתנים מוכנסים יחד בשכבה אחת חדשה <code>E2</code>.`;
                } else if (letStep2 === 3) {
                    explain.innerHTML = `<strong>צעד 3: חישוב הגוף</strong><br>המפרש מעריך את <code>-(x, y)</code> בתוך הסביבה החדשה <code>E2</code>.<br>
                    x נמצא ב-E2 כ-10, y נמצא ב-E2 כ-3. החישוב: <code>-(10, 3) = 7</code>.`;
                }
            } else {
                if (letStep2 >= 4) {
                    stepBtn.innerText = "הסתיים";
                    stepBtn.className = stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
                    return;
                }
                letStep2++;

                if (letStep2 === 1) {
                    envView.innerHTML = `
                        <div class="w-full max-w-[240px] bg-white p-3 rounded-lg border border-slate-300 flex justify-between items-center shadow-sm">
                            <span class="text-[10px] text-slate-400 font-bold">E1 (let x=2)</span>
                            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-mono font-bold">x = 2</span>
                        </div>
                        <div class="text-slate-400 text-[10px] font-bold">↓</div>
                        <div class="w-full max-w-[240px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
                    `;
                    explain.innerHTML = `<strong>צעד 1: הגדרת x חיצוני</strong><br>המפרש מעריך <code>x = 2</code> ומחדיר אותו לסביבה חדשה <code>E1</code>.`;
                } else if (letStep2 === 2) {
                    envView.innerHTML = `
                        <div class="w-full max-w-[240px] bg-white p-3 rounded-lg border-2 border-emerald-500 flex justify-between items-center shadow font-bold">
                            <span class="text-[10px] text-slate-400 font-bold">E2 (let x=10)</span>
                            <span class="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded font-mono">x = 10</span>
                        </div>
                        <div class="text-slate-400 text-[10px] font-bold">↓</div>
                        <div class="w-full max-w-[240px] bg-white p-3 rounded-lg border border-slate-300 flex justify-between items-center shadow-sm">
                            <span class="text-[10px] text-slate-400 font-bold">E1 (let x=2)</span>
                            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-mono font-bold">x = 2</span>
                        </div>
                        <div class="text-slate-400 text-[10px] font-bold">↓</div>
                        <div class="w-full max-w-[240px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
                    `;
                    explain.innerHTML = `<strong>צעד 2: הרחבה סדרתית - השמה 1</strong><br>המפרש מעריך <code>x = 10</code> בסביבה <code>E1</code>, ומייצר שכבה חדשה <code>E2</code> שבה <code>x = 10</code>.`;
                } else if (letStep2 === 3) {
                    envView.innerHTML = `
                        <div class="w-full max-w-[240px] bg-white p-3 rounded-lg border-2 border-indigo-500 flex justify-between items-center shadow">
                            <span class="text-[10px] text-slate-400 font-bold">E3 (let y=11)</span>
                            <span class="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-mono font-bold">y = 11</span>
                        </div>
                        <div class="text-slate-400 text-[10px] font-bold">↓</div>
                        <div class="w-full max-w-[240px] bg-white p-3 rounded-lg border border-slate-300 flex justify-between items-center shadow-sm">
                            <span class="text-[10px] text-slate-400 font-bold">E2 (let x=10)</span>
                            <span class="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded font-mono font-bold">x = 10</span>
                        </div>
                        <div class="text-slate-400 text-[10px] font-bold">↓</div>
                        <div class="w-full max-w-[240px] bg-white p-3 rounded-lg border border-slate-300 flex justify-between items-center shadow-sm">
                            <span class="text-[10px] text-slate-400 font-bold">E1 (let x=2)</span>
                            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-mono font-bold">x = 2</span>
                        </div>
                        <div class="text-slate-400 text-[10px] font-bold">↓</div>
                        <div class="w-full max-w-[240px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
                    `;
                    explain.innerHTML = `<strong>צעד 3: הרחבה סדרתית - השמה 2</strong><br>כעת המפרש מעריך את <code>y = +(x, 1)</code> **בסביבה E2**! ב-E2 ערכו של x הוא כבר 10, לכן הוא מעריך <code>+(10, 1) = 11</code> ומייצר שכבה חדשה נוספת <code>E3</code> שבה <code>y = 11</code>.`;
                } else if (letStep2 === 4) {
                    explain.innerHTML = `<strong>צעד 4: חישוב הגוף</strong><br>המפרש מעריך את <code>-(x, y)</code> בתוך הסביבה <code>E3</code>.<br>
                    x נמצא ב-E2 (מעליו) כ-10, y נמצא ב-E3 כ-11. החישוב: <code>-(10, 11) = -1</code>.`;
                }
            }
        }

        // --- Procedure Call Simulator JS Logic ---
        let procCallStep = 0;

        function resetProcCallSim() {
            procCallStep = 0;
            const stepBtn = document.getElementById('btn-proccall-step');
            if (stepBtn) {
                stepBtn.innerText = "בצע צעד (Step)";
                stepBtn.className = stepBtn.className.replace('bg-slate-400 hover:bg-slate-500', 'bg-emerald-600 hover:bg-emerald-700');
            }
            const explain = document.getElementById('proccall-explain');
            if (explain) explain.innerHTML = 'לחצו על "בצע צעד" כדי להתחיל את המעקב.';
            const envView = document.getElementById('proccall-env-view');
            if (envView) envView.innerHTML = `
                <div class="w-full max-w-[260px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
            `;
        }

        function stepProcCallSim() {
            const explain = document.getElementById('proccall-explain');
            const envView = document.getElementById('proccall-env-view');
            const stepBtn = document.getElementById('btn-proccall-step');
            if (!explain || !envView || !stepBtn) return;

            if (procCallStep >= 4) {
                stepBtn.innerText = "הסתיים";
                stepBtn.className = stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
                return;
            }
            procCallStep++;

            if (procCallStep === 1) {
                envView.innerHTML = `
                    <div class="w-full max-w-[260px] bg-white p-3 rounded-lg border border-slate-300 flex justify-between items-center shadow-sm">
                        <span class="text-[10px] text-slate-400 font-bold">E1 (let y=10)</span>
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-mono font-bold">y = 10</span>
                    </div>
                    <div class="text-slate-400 text-[10px] font-bold">↓</div>
                    <div class="w-full max-w-[260px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
                `;
                explain.innerHTML = `<strong>צעד 1: הקמת סביבה פנימית והגדרת f</strong><br>המפרש יוצר סביבה <code>E1</code> שבה <code>y = 10</code>. בתוכה הוא מגדיר את הפונקציה <code>proc(x) -(x, y)</code>. הפונקציה (Closure) מצלמת את הסביבה <code>E1</code> כסביבה השמורה שלה!`;
            } else if (procCallStep === 2) {
                envView.innerHTML = `
                    <div class="w-full max-w-[260px] bg-white p-3 rounded-lg border border-slate-300 flex justify-between items-center shadow-sm">
                        <span class="text-[10px] text-slate-400 font-bold">E2 (let f=..., y=20)</span>
                        <span class="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded font-mono font-bold">f = closure, y = 20</span>
                    </div>
                    <div class="text-slate-400 text-[10px] font-bold">↓</div>
                    <div class="w-full max-w-[260px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
                `;
                explain.innerHTML = `<strong>צעד 2: הגדרת y חדש בסביבה חיצונית</strong><br>הסקופ של ה-let הפנימי מסתיים. המפרש עובר ל-<code>let y = 20</code> ומקים את הסביבה <code>E2</code>. ב-E2 המשתנה <code>f</code> מצביע ל-closure, ומשתנה חדש <code>y = 20</code> נוצר (מסתיר את ה-y הקודם בריצה הגלובלית).`;
            } else if (procCallStep === 3) {
                envView.innerHTML = `
                    <div class="w-full max-w-[260px] bg-white p-3 rounded-lg border-2 border-emerald-500 flex justify-between items-center shadow">
                        <span class="text-[10px] text-slate-400 font-bold">E3 (local parameter call)</span>
                        <span class="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-mono font-bold">x = 15</span>
                    </div>
                    <div class="text-slate-400 text-[10px] font-bold">↓ saved-env</div>
                    <div class="w-full max-w-[260px] bg-white p-3 rounded-lg border border-slate-300 flex justify-between items-center shadow-sm">
                        <span class="text-[10px] text-slate-400 font-bold">E1 (let y=10)</span>
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-mono font-bold">y = 10</span>
                    </div>
                    <div class="text-slate-400 text-[10px] font-bold">↓</div>
                    <div class="w-full max-w-[260px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
                `;
                explain.innerHTML = `<strong>צעד 3: קריאה לפונקציה f עם 15 (פתיחת ה-Closure)</strong><br>המפרש קורא ל-<code>(f 15)</code>. פונקציית <code>apply-procedure</code> פותחת את הקלוז'ר של f. היא לוקחת את ה-<strong>saved-env</strong> השמורה (שהיא <code>E1</code> שבה <code>y=10</code>) ומרחיבה אותה עם הארגומנט <code>x = 15</code>. הסביבה E2 שבה y=20 מנותקת לגמרי מריצה זו!`;
            } else if (procCallStep === 4) {
                explain.innerHTML = `<strong>צעד 4: הערכת גוף הפונקציה</strong><br>גוף הפונקציה <code>-(x, y)</code> מחושב בסביבה <code>E3</code>. <br>
                - x נמצא ב-E3 כ-15.<br>
                - y נמצא ב-E1 כ-10.<br>
                התוצאה: <code>-(15, 10) = 5</code>.<br>
                <span class="text-emerald-600 font-bold">שימו לב:</span> זוהי סמנטיקה לקסיקלית (Lexical Scoping). ה-y הדינמי (20) לא השפיע!`;
            }
        }

        // --- LETREC Simulator JS Logic ---
        let letrecStep = 0;

        function resetLetrecSim() {
            letrecStep = 0;
            const stepBtn = document.getElementById('btn-letrec-step');
            if (stepBtn) {
                stepBtn.innerText = "בצע צעד (Step)";
                stepBtn.className = stepBtn.className.replace('bg-slate-400 hover:bg-slate-500', 'bg-emerald-600 hover:bg-emerald-700');
            }
            const explain = document.getElementById('letrec-explain');
            if (explain) explain.innerHTML = 'לחצו על "בצע צעד" כדי להתחיל את מעקב ה-LETREC.';
            const envView = document.getElementById('letrec-env-view');
            if (envView) envView.innerHTML = `
                <div class="w-full max-w-[300px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
            `;
        }

        function stepLetrecSim() {
            const explain = document.getElementById('letrec-explain');
            const envView = document.getElementById('letrec-env-view');
            const stepBtn = document.getElementById('btn-letrec-step');
            if (!explain || !envView || !stepBtn) return;

            if (letrecStep >= 4) {
                stepBtn.innerText = "הסתיים";
                stepBtn.className = stepBtn.className.replace('bg-emerald-600 hover:bg-emerald-700', 'bg-slate-400 hover:bg-slate-500');
                return;
            }
            letrecStep++;

            if (letrecStep === 1) {
                envView.innerHTML = `
                    <div class="w-full max-w-[300px] bg-white p-3 rounded-lg border-2 border-purple-500 flex flex-col shadow-sm gap-1" dir="ltr">
                        <span class="text-[10px] text-slate-400 font-bold">E1 (extend-env-rec)</span>
                        <div class="text-xs font-mono"><b>p-name:</b> double</div>
                        <div class="text-xs font-mono"><b>b-var:</b> x</div>
                        <div class="text-xs font-mono"><b>p-body:</b> if zero?(x)...</div>
                    </div>
                    <div class="text-slate-400 text-[10px] font-bold">↓</div>
                    <div class="w-full max-w-[300px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
                `;
                explain.innerHTML = `<strong>צעד 1: הקמת סביבה רקורסיבית (extend-env-rec)</strong><br>המפרש יוצר סביבה מיוחדת <code>E1</code>. היא אינה מחשבת את ה-Closure מראש, אלא רק רושמת את ה"מתכון" ליצירתו (שם, פרמטר וגוף).`;
            } else if (letrecStep === 2) {
                envView.innerHTML = `
                    <div class="w-full max-w-[300px] bg-white p-3 rounded-lg border-2 border-emerald-500 flex justify-between items-center shadow" dir="ltr">
                        <span class="text-[10px] text-slate-400 font-bold">E2 (local call: x=1)</span>
                        <span class="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-mono font-bold">x = 1</span>
                    </div>
                    <div class="text-slate-400 text-[10px] font-bold">↓</div>
                    <div class="w-full max-w-[300px] bg-white p-3 rounded-lg border border-slate-300 flex flex-col shadow-sm gap-1" dir="ltr">
                        <span class="text-[10px] text-slate-400 font-bold">E1 (extend-env-rec)</span>
                        <div class="text-xs font-mono"><b>p-name:</b> double</div>
                        <div class="text-xs font-mono"><b>b-var:</b> x</div>
                    </div>
                    <div class="text-slate-400 text-[10px] font-bold">↓</div>
                    <div class="w-full max-w-[300px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
                `;
                explain.innerHTML = `<strong>צעד 2: קריאה ל-(double 1)</strong><br>המפרש קורא ל-<code>(double 1)</code>. הוא מחפש את double ב-E1. אלגוריתם ה-<code>apply-env</code> מזהה שזה ב-extend-env-rec ומייצר JIT (בזמן ריצה) closure מיוחד שסביבתו השמורה היא E1 (הסביבה הרקורסיבית עצמה!). הקריאה מקימה את <code>E2</code> שבה <code>x = 1</code>.`;
            } else if (letrecStep === 3) {
                envView.innerHTML = `
                    <div class="w-full max-w-[300px] bg-white p-3 rounded-lg border-2 border-emerald-500 flex justify-between items-center shadow" dir="ltr">
                        <span class="text-[10px] text-slate-400 font-bold">E3 (recursive call: x=0)</span>
                        <span class="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-mono font-bold">x = 0</span>
                    </div>
                    <div class="text-slate-400 text-[10px] font-bold">↓</div>
                    <div class="w-full max-w-[300px] bg-white p-3 rounded-lg border border-slate-300 flex flex-col shadow-sm gap-1" dir="ltr">
                        <span class="text-[10px] text-slate-400 font-bold">E1 (extend-env-rec)</span>
                        <div class="text-xs font-mono"><b>p-name:</b> double</div>
                        <div class="text-xs font-mono"><b>b-var:</b> x</div>
                    </div>
                    <div class="text-slate-400 text-[10px] font-bold">↓</div>
                    <div class="w-full max-w-[300px] bg-slate-800 text-slate-400 p-2 text-center rounded font-mono text-xs">(empty-env)</div>
                `;
                explain.innerHTML = `<strong>צעד 3: קריאה רקורסיבית ל-(double 0)</strong><br>בתוך E2, אנו מעריכים את גוף הפונקציה: <code>-((double -(x,1)), -2)</code> ➔ <code>(double 0)</code>. המפרש מחפש שוב את double בסביבה E2, לא מוצא, פונה לסביבה ההורה E1 (שם הוא מוצא את double), ובונה JIT closure חדש שמצביע חזרה ל-E1. הקריאה מייצרת את <code>E3</code> עם <code>x = 0</code>.`;
            } else if (letrecStep === 4) {
                explain.innerHTML = `<strong>צעד 4: הערכת מקרה בסיס וצמצום</strong><br>הקריאה <code>(double 0)</code> בסביבה <code>E3</code> פוגשת ב-<code>zero?(x)</code> שהוא אמת, ומחזירה 0. <br>
                החישוב חוזר ל-E2 כדי להשלים את החיסור: <code>-(0, -2) = 2</code>. התוצאה הסופית היא 2.`;
            }
        }
        }
    