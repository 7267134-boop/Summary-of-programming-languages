import re

path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's verify we can find the target functions and replace them.

# 1. Update checkArchitectureGame
target_check_arch = """        function checkArchitectureGame() {
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
        }"""

replacement_check_arch = """        function checkArchitectureGame() {
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
                
                // Show Dependency Graph
                const graph = document.getElementById('arch-dependency-graph');
                if (graph) {
                    graph.classList.remove('hidden');
                    setTimeout(() => {
                        document.getElementById('arch-edge-lang-interp').setAttribute('stroke', '#10b981');
                        document.getElementById('arch-edge-interp-store').setAttribute('stroke', '#10b981');
                        document.getElementById('arch-edge-interp-data').setAttribute('stroke', '#10b981');
                        document.getElementById('arch-edge-data-store').setAttribute('stroke', '#10b981');
                        document.getElementById('arch-edge-lang-interp').setAttribute('marker-end', 'url(#arrow-green)');
                        document.getElementById('arch-edge-interp-store').setAttribute('marker-end', 'url(#arrow-green)');
                        document.getElementById('arch-edge-interp-data').setAttribute('marker-end', 'url(#arrow-green)');
                        document.getElementById('arch-edge-data-store').setAttribute('marker-end', 'url(#arrow-green)');
                        document.getElementById('arch-edge-lang-interp').classList.add('active-line');
                        document.getElementById('arch-edge-interp-store').classList.add('active-line');
                        document.getElementById('arch-edge-interp-data').classList.add('active-line');
                        document.getElementById('arch-edge-data-store').classList.add('active-line');
                    }, 300);
                }
            } else {
                feedback.className = 'mt-3 p-3 rounded-lg text-xs font-medium bg-red-50 text-red-800 border border-red-200';
                feedback.innerHTML = `❌ <strong>יש שגיאות!</strong> שייכת נכון ${correct} מתוך ${total} שורות. בדוק שוב את מיקומי הפונקציות המטפלות בזיכרון, ייצוג הטיפוסים, והדקדוק.`;
                
                // Highlight incorrect boxes
                ['store', 'lang', 'interp', 'data'].forEach(file => {
                    const hasError = archSnippets.some(snip => userAssignments[snip.id] === file && snip.file !== file);
                    const boxEl = document.getElementById('target-' + file);
                    if (boxEl) {
                        if (hasError) {
                            boxEl.classList.add('border-red-500');
                        } else {
                            boxEl.classList.add('border-green-500');
                        }
                    }
                });
            }
        }"""

content = content.replace(target_check_arch, replacement_check_arch)

# 2. Update updateStepperView
target_stepper_view = """        function updateStepperView() {
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
        }"""

replacement_stepper_view = """        function updateStepperView() {
            const step = stepperSteps[stepperCurrentStep];
            
            // Clear highlights
            document.querySelectorAll('.step-code-line').forEach(el => el.classList.remove('active'));
            
            // Highlight source code
            const srcEl = document.getElementById(step.srcHighlight);
            if (srcEl) srcEl.classList.add('active');
            
            // Highlight scheme code
            const schEl = document.getElementById(step.schHighlight);
            if (schEl) schEl.classList.add('active');
            
            // Update env and store views with Stack Frame Animation
            const envContainer = document.getElementById('stepper-env');
            if (envContainer) {
                if (step.env === 'Empty Env') {
                    envContainer.innerHTML = `
                        <div class="w-full bg-slate-100 border border-slate-300 rounded p-1.5 text-center text-[10px] font-mono text-slate-500 transition-all duration-300">
                            Empty Environment Frame
                        </div>
                    `;
                } else {
                    envContainer.innerHTML = `
                        <div class="w-full bg-slate-100 border border-slate-300 rounded p-1.5 text-center text-[10px] font-mono text-slate-400">
                            Empty Environment Frame
                        </div>
                        <div class="w-full bg-blue-50 border-2 border-blue-400 rounded p-1.5 text-center text-xs font-mono text-blue-800 font-bold transition-all duration-300 shadow-sm animate-bounce">
                            extend-env: x ➔ ref-val(L0)
                        </div>
                    `;
                }
            }
            
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
        }"""

content = content.replace(target_stepper_view, replacement_stepper_view)

# 3. Update setDiffMode to store mode and reset crash feedback
target_diff_mode = """        function setDiffMode(mode) {
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
        }"""

replacement_diff_mode = """        let currentDiffMode = 'explicit';
        function setDiffMode(mode) {
            currentDiffMode = mode;
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
            
            // Hide crash feedback on tab change
            const feedback = document.getElementById('crash-test-feedback');
            if (feedback) {
                feedback.classList.add('hidden');
            }
        }"""

content = content.replace(target_diff_mode, replacement_diff_mode)

# 4. Update clickLR to animate path routing
target_click_lr = """        function clickLR(xId) {
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
        }"""

replacement_click_lr = """        function clickLR(xId) {
            const feedback = document.getElementById('lr-explain-box');
            feedback.classList.remove('hidden');
            
            const x1 = document.getElementById('lv-x1');
            const x2 = document.getElementById('lv-x2');
            const diagram = document.getElementById('lr-router-diagram');
            
            if (lrQuestionState === 'lvalue') {
                if (xId === 'x1') {
                    x1.className = 'px-2 py-1 bg-green-100 border-2 border-green-500 rounded font-bold text-green-700 transition-all';
                    feedback.className = 'p-4 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 leading-relaxed font-sans';
                    feedback.innerHTML = '🎉 <strong>נכון מאוד!</strong> ה-x הראשון (משמאל ל-<code>=</code>) הוא <strong>L-value</strong> (Location Value). במפרש מופעל <code>assign-exp</code> המחשב את הביטוי ומעדכן את כתובת התא באמצעות <code>setref!</code>. <br>כעת, בוא נזהה את ה-R-value.';
                    
                    if (diagram) {
                        diagram.classList.remove('hidden');
                        animatePath('path-lvalue', 'dot-lvalue', '#06b6d4');
                    }
                    
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
                    
                    if (diagram) {
                        animatePath('path-rvalue', 'dot-rvalue', '#10b981');
                    }
                    
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
        }"""

content = content.replace(target_click_lr, replacement_click_lr)

# 5. Update routeType to support closing the inspector panel and showing magnifier icons
target_route_type = """        function routeType(type) {
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
        }"""

replacement_route_type = """        function routeType(type) {
            const ball = document.getElementById('router-ball');
            const explain = document.getElementById('router-explain-box');
            if (!ball || !explain) return;
            
            ball.classList.remove('hidden');
            
            // Hide all magnifier icons and closure inspector panels
            document.getElementById('inspect-int').classList.add('hidden');
            document.getElementById('inspect-bool').classList.add('hidden');
            document.getElementById('inspect-func').classList.add('hidden');
            const panel = document.getElementById('closure-inspector-panel');
            if (panel) panel.classList.add('hidden');
            
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
                expText = `<strong>ניתוב ל-proc-int:</strong><br>הקלט <code>100</code> זוהה כ-<code>num-val</code>. פונקציית <code>get-arg-type</code> מחזירה את הטיפוס <code>Int</code>, ומנגנון הדיספאץ' קורא לפרוצדורה המתאימה שתוצאתה: <code>100 - 300 = -200</code>. לחץ על ה-🔍 כדי לחקור את ה-backpack שלו.`;
            } else if (type === 'bool') {
                path = 'path-bool';
                targetStroke = '#10b981';
                expText = `<strong>ניתוב ל-proc-bool:</strong><br>הקלט <code>true</code> זוהה כ-<code>bool-val</code>. הטיפוס שזוהה הוא <code>Bool</code>, והנתב מפנה לפונקציה המצפה לבוליאנים. לחץ על ה-🔍 כדי לחקור את ה-backpack שלו.`;
            } else {
                path = 'path-func';
                targetStroke = '#a855f7';
                expText = `<strong>ניתוב ל-proc-func:</strong><br>הקלט <code>proc(w)...</code> זוהה כ-<code>proc-val</code>. הטיפוס שזוהה הוא <code>Func</code>, והניתוב מפנה לגרסת הפונקציות. לחץ על ה-🔍 כדי לחקור את ה-backpack שלו.`;
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
                    
                    // Show magnifying glass inspect button
                    document.getElementById('inspect-' + type).classList.remove('hidden');
                }
            }
            window.requestAnimationFrame(step);
        }"""

content = content.replace(target_route_type, replacement_route_type)

# 6. Update checkParsons to show retro console on incorrect sorting
target_check_parsons = """        function checkParsons() {
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
        }"""

replacement_check_parsons = """        function checkParsons() {
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
                feedback.className = 'mt-3 p-3 rounded-lg text-xs font-mono bg-red-950 text-red-400 border border-red-800 font-sans';
                feedback.innerHTML = `
                    <div class="font-bold text-red-500 mb-1">🛑 שגיאת ריצה מדומיינת (Runtime Crash Console):</div>
                    <pre class="!bg-black !text-red-500 !p-3 !border-red-900 rounded font-mono text-[10px] leading-relaxed">
[CRASH] Racket Runtime Error: Memory Access Violation!
You tried to update memory offset (setref! ref1 val) using a raw MutpairVal structure.
Attempted to call (left-cell-ref loc) on uninitialized or corrupted variable.
Reason: You executed setref! before left-cell-ref resolved the reference pointer.
                    </pre>
                    <div class="mt-2 text-red-300 font-sans text-xs">כאשר אנו מסדרים את השורות הפוך, אנו מנסים לבצע כתיבה לכתובת לא חוקית בזיכרון, מה שמחרב את ה-Heap!</div>
                `;
            }
        }"""

content = content.replace(target_check_parsons, replacement_check_parsons)

# Write back content temporarily
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement in 3.html completed.")
