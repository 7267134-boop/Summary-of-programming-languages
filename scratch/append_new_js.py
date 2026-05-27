path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html"
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

# Let's insert the CSS shake style in the head
target_head = "</head>"
style_addition = """<style>
.shake {
    animation: shake 0.5s;
}
</style>
</head>"""
html = html.replace(target_head, style_addition)

# Let's define the new JS functions we need to append
new_js_code = """
        // --- Added for bottom-up AST Evaluation (Widget 2) ---
        let astSimTimeout = null;
        function startASTSim() {
            resetASTSim();
            document.getElementById('btn-ast-sim-reset').classList.remove('hidden');
            
            const step1 = () => {
                highlightAST('c0');
                document.getElementById('ast-explain-card').innerHTML = `
                    <span class="font-bold text-amber-800 text-sm">שלב 1: הערכת num:0 (עלה תחתון)</span>
                    <p class="mt-1 font-sans">העלה מוערך ומחזיר <code>num-val(0)</code>.</p>
                `;
                astSimTimeout = setTimeout(step2, 2000);
            };
            
            const step2 = () => {
                highlightAST('newref');
                document.getElementById('ast-explain-card').innerHTML = `
                    <span class="font-bold text-amber-800 text-sm">שלב 2: הקצאה בזיכרון בתוך newref-exp</span>
                    <p class="mt-1 font-sans">המפרש מבצע <code>newref</code> עבור <code>num-val(0)</code>. נוצר תא L0 ב-Store המכיל 0, והביטוי מחזיר <code>ref-val(L0)</code>.</p>
                `;
                astSimTimeout = setTimeout(step3, 2500);
            };
            
            const step3 = () => {
                highlightAST('c5');
                document.getElementById('ast-explain-card').innerHTML = `
                    <span class="font-bold text-amber-800 text-sm">שלב 3: הערכת num:5 (עלה ימני)</span>
                    <p class="mt-1 font-sans">העלה מוערך ומחזיר <code>num-val(5)</code>.</p>
                `;
                astSimTimeout = setTimeout(step4, 2000);
            };
            
            const step4 = () => {
                highlightAST('vx');
                document.getElementById('ast-explain-card').innerHTML = `
                    <span class="font-bold text-amber-800 text-sm">שלב 4: שליפת משתנה x (var-exp)</span>
                    <p class="mt-1 font-sans">קריאת המשתנה בסביבה הלקסיקלית מחזירה את הכתובת <code>ref-val(L0)</code>.</p>
                `;
                astSimTimeout = setTimeout(step5, 2500);
            };
            
            const step5 = () => {
                highlightAST('setref');
                document.getElementById('ast-explain-card').innerHTML = `
                    <span class="font-bold text-amber-800 text-sm">שלב 5: ביצוע setref-exp (שינוי ערך תא)</span>
                    <p class="mt-1 font-sans">המפרש משנה את הערך בכתובת <code>L0</code> מ-0 ל-5. הביטוי מחזיר את ערך הדאמי <code>num-val(23)</code>.</p>
                `;
                astSimTimeout = setTimeout(step6, 2500);
            };
            
            const step6 = () => {
                highlightAST('let');
                document.getElementById('ast-explain-card').innerHTML = `
                    <span class="font-bold text-amber-800 text-sm">שלב 6: סיום הערכת let-exp (שורש העץ)</span>
                    <p class="mt-1 font-sans">הסביבה מורחבת (x נקשר ל-L0), גוף ה-let מוערך ומחזיר 23. זהו הערך הסופי שמוחזר מהתוכנית כולה!</p>
                `;
            };
            
            step1();
        }
        
        function resetASTSim() {
            if (astSimTimeout) clearTimeout(astSimTimeout);
            highlightAST('let');
            document.getElementById('btn-ast-sim-reset').classList.add('hidden');
        }

        // --- Added for Crash Test (Widget 4) ---
        function runCrashTest() {
            const feedback = document.getElementById('crash-test-feedback');
            if (!feedback) return;
            feedback.classList.remove('hidden');
            
            if (currentDiffMode === 'explicit') {
                feedback.className = 'flex-1 p-3 rounded-lg text-xs font-mono bg-red-950 text-red-400 border border-red-800 animate-pulse';
                feedback.innerHTML = `
                    <span class="text-red-500 font-bold block mb-1">🛑 Racket Exception (EXPLICIT-REFS):</span>
                    Error in value-of: setref! expected a reference, but got num-val(5).<br><br>
                    <strong>הסבר אקדמי:</strong> בשפה מפורשת, המשתנה x מחזיק את הערך 5 ישירות (ולא כתובת זיכרון). ניסיון לעדכן אותו בעזרת setref ללא newref נכשל!
                `;
            } else {
                feedback.className = 'flex-1 p-3 rounded-lg text-xs font-mono bg-green-950 text-green-400 border border-green-800';
                feedback.innerHTML = `
                    <span class="text-emerald-500 font-bold block mb-1">✅ Success (IMPLICIT-REFS):</span>
                    Command executed successfully!<br><br>
                    <strong>הסבר אקדמי:</strong> ההרצה הצליחה! בשפה סמויה, x קשור אוטומטית לכתובת בזיכרון (L0) המכילה את 5. פקודת ההשמה set מבצעת setref! על הכתובת הזו בסתר, ולכן השינוי עובד והתוכנית לא קורסת.
                `;
            }
        }

        // --- Added for AST Branching Router (Widget 5) ---
        function animatePath(pathId, dotId, color) {
            const path = document.getElementById(pathId);
            const dot = document.getElementById(dotId);
            if (!path || !dot) return;
            
            dot.classList.remove('hidden');
            path.setAttribute('stroke', color);
            
            const pathLength = path.getTotalLength();
            let start = null;
            
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const duration = 800; // ms
                
                const percent = Math.min(progress / duration, 1);
                const point = path.getPointAtLength(percent * pathLength);
                
                dot.setAttribute('cx', point.x);
                dot.setAttribute('cy', point.y);
                
                if (percent < 1) {
                    window.requestAnimationFrame(step);
                }
            }
            window.requestAnimationFrame(step);
        }

        // --- Added for Closure Inspector (Widget 6) ---
        function inspectClosure(type) {
            const panel = document.getElementById('closure-inspector-panel');
            if (!panel) return;
            panel.classList.remove('hidden');
            
            let html = '';
            if (type === 'int') {
                html = `
                    <span class="text-blue-400 font-bold block mb-1">🔍 Closure Inspector - proc-int</span>
                    <div class="text-[10px] leading-relaxed font-sans">
                        <strong>saved-env (סביבה לקסיקלית):</strong> [z = ref-val(L2) ➔ 300, overload-list = (...)]<br>
                        <strong>procedure backpack (תרמיל הפונקציה):</strong> { var: x, body: -(x, z) }<br>
                        <span class="text-slate-400 mt-1 block">* הפונקציה סגורה מעל המשתנה z=300 מסביבת ההגדרה שלה!</span>
                    </div>
                `;
            } else if (type === 'bool') {
                html = `
                    <span class="text-emerald-400 font-bold block mb-1">🔍 Closure Inspector - proc-bool</span>
                    <div class="text-[10px] leading-relaxed font-sans">
                        <strong>saved-env (סביבה לקסיקלית):</strong> [y = ref-val(L1) ➔ true]<br>
                        <strong>procedure backpack (תרמיל הפונקציה):</strong> { var: x, body: if x then y else false }<br>
                        <span class="text-slate-400 mt-1 block">* הפונקציה נושאת איתה את y מהקונטקסט שבו נוצרה.</span>
                    </div>
                `;
            } else {
                html = `
                    <span class="text-purple-400 font-bold block mb-1">🔍 Closure Inspector - proc-func</span>
                    <div class="text-[10px] leading-relaxed font-sans">
                        <strong>saved-env (סביבה לקסיקלית):</strong> [w = ref-val(L3) ➔ proc-val]<br>
                        <strong>procedure backpack (תרמיל הפונקציה):</strong> { var: x, body: (w x) }<br>
                        <span class="text-slate-400 mt-1 block">* הפונקציה נושאת איתה את הפרוצדורה w בסביבתה הלקסיקלית.</span>
                    </div>
                `;
            }
            panel.innerHTML = html;
        }

        // --- Added for GC Earthquake (Widget 8) ---
        function runGarbageCollector() {
            const canvas = document.getElementById('mem-conn-canvas');
            if (!canvas) return;
            
            // Shake all memory cells
            for (let i = 0; i < 8; i++) {
                const cell = document.getElementById('mem-cell-' + i);
                if (cell) {
                    cell.classList.add('shake');
                    setTimeout(() => cell.classList.remove('shake'), 600);
                }
            }
            
            if (currentMemMode === 1) {
                // PairVal1: relocate L1, L4, L2 to L0, L1, L2
                setTimeout(() => {
                    // Clear old cells
                    for (let i = 0; i < 8; i++) {
                        const cell = document.getElementById('mem-cell-' + i);
                        cell.className = 'border border-slate-800 p-2 rounded bg-slate-900 text-slate-500';
                        cell.innerText = `L${i}: -`;
                    }
                    
                    // Compact
                    const c0 = document.getElementById('mem-cell-0');
                    c0.className = 'border-2 border-blue-500 p-2 rounded bg-blue-950 text-blue-300 font-bold';
                    c0.innerText = 'L0: num(11)';
                    
                    const c1 = document.getElementById('mem-cell-1');
                    c1.className = 'border-2 border-purple-500 p-2 rounded bg-purple-950 text-purple-300 font-bold';
                    c1.innerText = 'L1: num(22)';
                    
                    const c2 = document.getElementById('mem-cell-2');
                    c2.className = 'border-2 border-emerald-500 p-2 rounded bg-emerald-950 text-emerald-300 font-bold';
                    c2.innerText = 'L2: pair(L0, L1)';
                    
                    canvas.innerHTML = '<span class="text-green-400 font-bold font-sans text-xs">🎉 איסוף זבל (GC) הצליח!</span> התאים נדחסו לכתובות L0, L1, L2. המפרש תיקן את כל הפוינטרים אוטומטית כי הטיפוס PairVal1 מחזיק שתי כתובות ממשיות (location).';
                }, 700);
            } else {
                // PairVal2: GC compacts but breaks arithmetic
                setTimeout(() => {
                    // Clear old cells
                    for (let i = 0; i < 8; i++) {
                        const cell = document.getElementById('mem-cell-' + i);
                        cell.className = 'border border-slate-800 p-2 rounded bg-slate-900 text-slate-500';
                        cell.innerText = `L${i}: -`;
                    }
                    
                    // Relocate CAR to L0
                    const c0 = document.getElementById('mem-cell-0');
                    c0.className = 'border-2 border-blue-500 p-2 rounded bg-blue-950 text-blue-300 font-bold';
                    c0.innerText = 'L0: num(11) [car]';
                    
                    // Relocate CDR to L5 (not contiguous!)
                    const c5 = document.getElementById('mem-cell-5');
                    c5.className = 'border-2 border-purple-500 p-2 rounded bg-purple-950 text-purple-300 font-bold';
                    c5.innerText = 'L5: num(22) [cdr]';
                    
                    canvas.innerHTML = '<span class="text-red-500 font-bold font-sans text-xs">🛑 שגיאת זיכרון (Memory Corruption)!</span> ה-GC העתיק את ה-CAR ל-L0 ואת ה-CDR ל-L5. אך מאחר ו-PairVal2 מניח מתמטית שה-CDR נמצא תמיד בכתובת base+1, המפרש קורא מ-L1 (תא ריק) ומקבל זבל!';
                }, 700);
            }
        }

        // --- Added for Double Aliasing (Widget 10) ---
        function runDoubleAlias() {
            // Show double alias setup
            const container = document.getElementById('alias-var-x').parentElement.parentElement;
            container.innerHTML = `
                <div class="flex flex-col items-center">
                    <span class="text-xs font-bold text-slate-500 font-sans">משתנה חיצוני (x)</span>
                    <div id="alias-var-x" class="w-14 h-10 rounded border bg-blue-50 text-blue-700 flex items-center justify-center font-mono font-bold mt-1">10</div>
                    <span class="text-[10px] text-blue-600 font-mono mt-1">Env: x ➔ L0</span>
                </div>
                <div class="flex flex-col items-center bg-yellow-50 p-2 rounded border border-yellow-200">
                    <span class="text-xs font-bold text-slate-500 font-sans">פרמטר 1 (arg1)</span>
                    <div id="alias-var-arg1" class="w-14 h-10 rounded border bg-purple-50 text-purple-700 flex items-center justify-center font-mono font-bold mt-1">10</div>
                    <span class="text-[10px] text-purple-600 font-mono mt-1">Env: arg1 ➔ L0</span>
                </div>
                <div class="flex flex-col items-center bg-yellow-50 p-2 rounded border border-yellow-200">
                    <span class="text-xs font-bold text-slate-500 font-sans">פרמטר 2 (arg2)</span>
                    <div id="alias-var-arg2" class="w-14 h-10 rounded border bg-purple-50 text-purple-700 flex items-center justify-center font-mono font-bold mt-1">10</div>
                    <span class="text-[10px] text-purple-600 font-mono mt-1">Env: arg2 ➔ L0</span>
                </div>
            `;
            
            // Update explanation text
            const controller = document.getElementById('alias-input').parentElement.parentElement;
            controller.innerHTML = `
                <span class="text-xs font-bold text-slate-500 block mb-2 font-sans">שנה את ערך arg1 (הפרמטר הראשון):</span>
                <div class="flex gap-2 items-center">
                    <input type="number" id="alias-input-arg1" value="10" class="w-24 p-2 border rounded-lg text-center font-mono font-bold focus:ring-2 focus:ring-teal-500" oninput="updateDoubleAliasSim(this.value)">
                    <span class="text-xs text-slate-500 font-sans">שנה ערך!</span>
                </div>
                <div class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 leading-relaxed font-sans">
                    <strong>אסון הכינוי הכפול (Double Alias Disaster):</strong> קראנו לפונקציה עם שני ארגומנטים זהים: <code>(f x x)</code>. כעת הן <code>arg1</code> והן <code>arg2</code> מצביעים לאותה כתובת זיכרון <code>L0</code>! כל שינוי ב-<code>arg1</code> ישנה פלאים את <code>arg2</code> ואת <code>x</code> בו-זמנית!
                </div>
            `;
        }
        
        function updateDoubleAliasSim(val) {
            document.getElementById('alias-var-x').innerText = val;
            document.getElementById('alias-var-arg1').innerText = val;
            document.getElementById('alias-var-arg2').innerText = val;
            document.getElementById('alias-store-val').innerText = `num-val(${val})`;
            
            // Highlight cells
            const c1 = document.getElementById('alias-var-arg1');
            const c2 = document.getElementById('alias-var-arg2');
            const cx = document.getElementById('alias-var-x');
            const storeCell = document.getElementById('alias-store-cell');
            
            [c1, c2, cx, storeCell].forEach(el => {
                if (el) {
                    el.classList.add('animate-pulse', 'bg-yellow-200');
                    setTimeout(() => el.classList.remove('animate-pulse', 'bg-yellow-200'), 500);
                }
            });
        }

        // --- Added for Closure Vacuum (Widget 11) ---
        function runThunkVacuum() {
            const vacuumVars = document.getElementById('vacuum-vars');
            if (!vacuumVars) return;
            vacuumVars.classList.remove('hidden');
            
            const vacX = document.getElementById('vac-x');
            const vacZ = document.getElementById('vac-z');
            const vacXtext = document.getElementById('vac-x-text');
            const vacZtext = document.getElementById('vac-z-text');
            const chest = document.getElementById('thunk-chest');
            
            // Animate positions to center of chest (60, 60)
            let start = null;
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const duration = 1200; // ms
                
                const percent = Math.min(progress / duration, 1);
                
                // Move x from 10,15 to 60,60
                vacX.setAttribute('cx', 10 + percent * 50);
                vacX.setAttribute('cy', 15 + percent * 45);
                vacXtext.setAttribute('x', 10 + percent * 50);
                vacXtext.setAttribute('y', 24 + percent * 36);
                
                // Move z from 110,15 to 60,60
                vacZ.setAttribute('cx', 110 - percent * 50);
                vacZ.setAttribute('cy', 15 + percent * 45);
                vacZtext.setAttribute('x', 110 - percent * 50);
                vacZtext.setAttribute('y', 24 + percent * 36);
                
                // Fade out
                vacX.setAttribute('opacity', 1 - percent);
                vacZ.setAttribute('opacity', 1 - percent);
                vacXtext.setAttribute('opacity', 1 - percent);
                vacZtext.setAttribute('opacity', 1 - percent);
                
                if (percent < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    vacuumVars.classList.add('hidden');
                    chest.classList.add('shake');
                    setTimeout(() => chest.classList.remove('shake'), 500);
                    
                    document.getElementById('chest-status').innerText = 'סכנת Lexical Scope נמנעה! ה-Thunk "שאב" ונעל בתוכו את המשתנים המקומיים x=5 ו-z=10 כדי להבטיח שיעריכו אותם נכון כשהתיבה תיפתח בעתיד.';
                }
            }
            window.requestAnimationFrame(step);
        }
"""

# Let's insert new_js_code right before the DOMContentLoaded script registration
target_listener = '        document.addEventListener("DOMContentLoaded", () => {'
content_with_js = html.replace(target_listener, new_js_code + "\n" + target_listener)

# Let's save it to 3.html
with open(path, 'w', encoding='utf-8') as f:
    f.write(content_with_js)

print("JS append to 3.html complete.")
