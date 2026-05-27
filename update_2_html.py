import re

def update_2_html():
    with open('2.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Buttons to insert
    nav_buttons = """
                <button onclick="showTab('let-error')" id="btn-let-error" class="nav-btn">
                    <span class="font-bold ml-2">M1</span> שגיאות והמרות טיפוסים (Errors)
                </button>
                <button onclick="showTab('let-run')" id="btn-let-run" class="nav-btn">
                    <span class="font-bold ml-2">M2</span> אתחול המפרש (Run setup)
                </button>
"""

    # Tabs to insert
    tab_contents = """
            <!-- ==========================================
                 PART M1: ERROR HANDLING (expval->num)
            =========================================== -->
            <div id="let-error" class="tab-content">
                <header class="mb-12 border-b pb-6">
                    <div class="inline-block px-4 py-1 bg-slate-800 text-white rounded-full font-bold text-sm mb-4 tracking-wider uppercase">מפרש ה-LET</div>
                    <h2 class="text-5xl font-black text-slate-800 tracking-tight mb-4">טיפול בשגיאות זמן ריצה: <span class="text-red-600">expval->num</span></h2>
                    <p class="text-xl text-slate-600 leading-relaxed">אחת החובות המרכזיות של כל מפרש היא להבטיח שפעולות מתבצעות רק על טיפוסים חוקיים (Type Checking בזמן ריצה).</p>
                </header>
                
                <h3 class="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-red-500 pr-4">פונקציות חילוץ והגנה (Extractors)</h3>
                <p class="text-lg text-slate-700 mb-4">
                    כאשר אנחנו עוטפים ערך רגיל (DenVal) למבנה של <code>ExpVal</code> (למשל, הפיכת 5 ל-<code>num-val(5)</code>), עלינו לפרק אותו חזרה לפני ביצוע פעולה מתמטית כמו חיבור. אם הערך אינו מספר - נרצה להפסיק את הריצה ולזרוק שגיאה מפורשת. הקובץ המטפל בכך הוא לרוב <code>data-structures.scm</code> או סקריפט ייעודי של אובייקטי שגיאה.
                </p>
                <div class="bg-[#1e293b] rounded-xl p-6 shadow-xl mb-8">
                    <pre><code class="language-scheme">;; expval->num : ExpVal -> Int
;; Extracts the number from a num-val, or reports an error.
(define expval->num
  (lambda (v)
    (cases expval v
      (num-val (num) num)
      (else (expval-extractor-error 'num v)))))

(define expval-extractor-error
  (lambda (variant value)
    (eopl:error 'expval-extractors 
                "Looking for a ~s, found ~s" variant value)))</code></pre>
                </div>
                <div class="tip-box">
                    <h4 class="font-bold text-lg mb-2 text-amber-800">💡 דגש למבחן (מנגנון Type-Safety דינמי)</h4>
                    <p class="text-slate-700">בזמן בניית שפה, חובה להשתמש ב-<code>expval->num</code> במקום סתם לחלץ. זה מגן על המפרש מקריסה במקרה של תוכנית כמו: <code>+(5, zero?(0))</code> בה מנסים לחבר מספר עם בוליאני.</p>
                </div>
            </div>

            <!-- ==========================================
                 PART M2: RUN SETUP (value-of-program)
            =========================================== -->
            <div id="let-run" class="tab-content">
                <header class="mb-12 border-b pb-6">
                    <div class="inline-block px-4 py-1 bg-slate-800 text-white rounded-full font-bold text-sm mb-4 tracking-wider uppercase">מעטפת המפרש</div>
                    <h2 class="text-5xl font-black text-slate-800 tracking-tight mb-4">אתחול המפרש: <span class="text-blue-600">run & value-of-program</span></h2>
                    <p class="text-xl text-slate-600 leading-relaxed">פונקציית <code>value-of</code> תמיד מצפה לקבל AST (העץ המנותח) וסביבה (Environment). אבל איך זה קורה בפועל מהרגע שהזנו טקסט?</p>
                </header>

                <h3 class="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-blue-500 pr-4">הפונקציה העליונה - run</h3>
                <p class="text-lg text-slate-700 mb-4">
                    הפונקציה <code>run</code> משמשת כנקודת הכניסה (Entry point) למפרש כולו. היא מקבלת מחרוזת, מפעילה את הלקסר והפארסר (`scan&parse`) ומוסרת את ה-AST (מסוג Program) ל-<code>value-of-program</code>.
                </p>
                <div class="bg-[#1e293b] rounded-xl p-6 shadow-xl mb-8">
                    <pre><code class="language-scheme">(define run
  (lambda (string)
    (value-of-program (scan&parse string))))</code></pre>
                </div>

                <h3 class="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-emerald-500 pr-4">אתחול הסביבה - value-of-program</h3>
                <p class="text-lg text-slate-700 mb-4">
                    תוכנית שלמה (A-Program) מכילה בתוכה ביטוי אחד. התפקיד של <code>value-of-program</code> הוא לחלץ את הביטוי (Exp) מהתוכנית ולקרוא ל-<code>value-of</code>, תוך הזרקת <strong>הסביבה ההתחלתית (Initial Environment)</strong>.
                </p>
                <div class="bg-[#1e293b] rounded-xl p-6 shadow-xl mb-8">
                    <pre><code class="language-scheme">(define value-of-program 
  (lambda (pgm)
    (cases program pgm
      (a-program (exp1)
        (value-of exp1 (init-env))))))

;; init-env sets up initial bindings like x=10, v=5, i=1
(define init-env 
  (lambda ()
    (extend-env 'i (num-val 1)
      (extend-env 'v (num-val 5)
        (extend-env 'x (num-val 10)
          (empty-env))))))</code></pre>
                </div>
            </div>
"""

    # Injecting nav buttons
    html = re.sub(
        r'(<button onclick="showTab\(\'let-interpreter\'\)"[^>]*>)',
        nav_buttons + r'\1',
        html
    )

    # Injecting tab contents
    html = re.sub(
        r'(<!-- =+[\s\S]*?<div id="let-interpreter" class="tab-content">)',
        tab_contents + r'\1',
        html
    )

    with open('2_updated.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    print("2.html updated as 2_updated.html")

update_2_html()
