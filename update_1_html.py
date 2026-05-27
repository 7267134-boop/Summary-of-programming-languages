import re

def update_1_html():
    with open('1.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Buttons to insert
    nav_buttons = """
                <button onclick="showTab('data-abstraction')" id="btn-data-abstraction" class="nav-btn">
                    <span class="font-bold ml-2">2.5</span> הפשטת נתונים
                </button>
                <button onclick="showTab('lambda-calculus')" id="btn-lambda-calculus" class="nav-btn">
                    <span class="font-bold ml-2">2.6</span> תחשיב למדא ו-Unparse
                </button>
"""

    # Tabs to insert
    tab_contents = """
            <!-- ==========================================
                 PART 2.5: DATA ABSTRACTION
            =========================================== -->
            <div id="data-abstraction" class="tab-content">
                <header class="mb-12 border-b pb-6">
                    <div class="inline-block px-4 py-1 bg-slate-800 text-white rounded-full font-bold text-sm mb-4 tracking-wider uppercase">פרק 2</div>
                    <h2 class="text-5xl font-black text-slate-800 tracking-tight mb-4">הפשטת נתונים: <span class="text-blue-600">Data Abstraction</span></h2>
                    <p class="text-xl text-slate-600 leading-relaxed">הפשטת נתונים היא העיקרון שמאפשר לנו להפריד בין האופן שבו הנתונים בתוכנית מיוצגים לבין הפעולות שניתן לבצע עליהם. הרעיון הוא להסתיר את פרטי המימוש הפנימיים.</p>
                </header>
                
                <h3 class="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-blue-500 pr-4">ייצוגים למספרים: אונרי ובינארי</h3>
                <p class="text-lg text-slate-700 mb-4">
                    נניח שאנו רוצים לייצג מספרים טבעיים (Bignum). נוכל לייצג אותם בדרכים שונות - כל עוד הממשק (<code>zero</code>, <code>is-zero?</code>, <code>successor</code>, <code>predecessor</code>) נשאר זהה!
                </p>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h4 class="font-bold text-xl mb-4 text-blue-800">ייצוג אונרי (Unary)</h4>
                        <p class="text-slate-700 mb-4">מספר <code>n</code> מיוצג כרשימה באורך <code>n</code>. (למשל `(#t #t #t)` מייצג 3).</p>
                        <pre><code class="language-scheme">(define zero '())
(define is-zero? null?)
(define successor
  (lambda (n) (cons #t n)))
(define predecessor
  (lambda (n) (cdr n)))</code></pre>
                    </div>
                    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h4 class="font-bold text-xl mb-4 text-purple-800">ייצוג בינארי (Binary)</h4>
                        <p class="text-slate-700 mb-4">מספר מיוצג כרשימה של סיביות, מהספרה הפחות משמעותית למשמעותית (Base 16 בספר).</p>
                        <pre><code class="language-scheme">(define zero '())
(define is-zero? null?)
;; ...successor & predecessor מורכבים יותר
;; אבל הממשק לשאר התוכנית זהה לחלוטין!</code></pre>
                    </div>
                </div>

                <h3 class="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-amber-500 pr-4 mt-12">מספרי צ'רץ' (Church Numerals)</h3>
                <p class="text-lg text-slate-700 mb-4">
                    בתחשיב למדא המקורי לא היו מספרים, אלא רק פונקציות. אלונזו צ'רץ' הראה שניתן לייצג מספר טבעי <code>n</code> כפונקציה שמקבלת פונקציה <code>f</code> וערך <code>x</code>, ומפעילה את <code>f</code> על <code>x</code> בדיוק <code>n</code> פעמים.
                </p>
                <div class="bg-[#1e293b] rounded-xl p-6 shadow-xl mb-8">
                    <pre><code class="language-scheme">;; Zero is a function that applies f 0 times to x.
(define zero
  (lambda (f)
    (lambda (x) x)))

;; One applies f 1 time to x.
(define one
  (lambda (f)
    (lambda (x) (f x))))

;; Successor takes a church numeral n, and returns a new numeral
;; that applies f one more time than n did.
(define successor
  (lambda (n)
    (lambda (f)
      (lambda (x)
        (f ((n f) x))))))</code></pre>
                </div>
            </div>

            <!-- ==========================================
                 PART 2.6: LAMBDA CALCULUS AST
            =========================================== -->
            <div id="lambda-calculus" class="tab-content">
                <header class="mb-12 border-b pb-6">
                    <div class="inline-block px-4 py-1 bg-slate-800 text-white rounded-full font-bold text-sm mb-4 tracking-wider uppercase">פרק 2 המשך</div>
                    <h2 class="text-5xl font-black text-slate-800 tracking-tight mb-4">תחשיב למדא: <span class="text-purple-600">LcExp & Unparse</span></h2>
                    <p class="text-xl text-slate-600 leading-relaxed">שפת תחשיב למדא (Lambda Calculus) היא השפה התיאורטית עליה מבוסס המפרש שלנו. כל תוכנית בשפה מיוצגת בעץ תחביר מופשט (AST).</p>
                </header>

                <h3 class="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-blue-500 pr-4">הייצוג הפנימי של עץ התחביר (LcExp)</h3>
                <p class="text-lg text-slate-700 mb-4">לפני השימוש ב-<code>define-datatype</code>, עץ התחביר יוצג על ידי רשימות רגילות של Scheme.</p>
                <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                    <ul class="list-disc list-inside space-y-2 text-slate-700 text-lg">
                        <li><strong>VarExp:</strong> ייצוג למשתנה (סמל בודד כמו <code>'x</code>).</li>
                        <li><strong>LambdaExp:</strong> ייצוג לפונקציה (למשל <code>(lambda (x) x)</code>).</li>
                        <li><strong>AppExp:</strong> ייצוג להפעלת פונקציה (למשל <code>(f x)</code>).</li>
                    </ul>
                </div>
                <div class="bg-[#1e293b] rounded-xl p-6 shadow-xl mb-8">
                    <pre><code class="language-scheme">;; Constructors
(define var-exp (lambda (id) id))
(define lambda-exp (lambda (id body) (list 'lambda (list id) body)))
(define app-exp (lambda (rator rand) (list rator rand)))

;; Predicates
(define var-exp? (lambda (x) (symbol? x)))
(define lambda-exp?
  (lambda (x) (and (pair? x) (eqv? (car x) 'lambda))))
(define app-exp?
  (lambda (x) (and (pair? x) (not (eqv? (car x) 'lambda)))))</code></pre>
                </div>

                <h3 class="text-3xl font-bold text-slate-800 mb-6 border-r-4 border-emerald-500 pr-4 mt-12">הפונקציה Unparse</h3>
                <p class="text-lg text-slate-700 mb-4">פעולת ה-<strong>Unparse</strong> לוקחת עץ תחביר (AST) שנוצר מה-<code>define-datatype</code> ומרכיבה חזרה את תצורת הרשימות (S-expressions) כפי שהמשתמש היה מקליד.</p>
                <div class="bg-[#1e293b] rounded-xl p-6 shadow-xl mb-8">
                    <pre><code class="language-scheme">(define unparse-lc-exp
  (lambda (exp)
    (cases lc-exp exp
      (var-exp (var) var)
      (lambda-exp (bound-var body)
        (list 'lambda (list bound-var)
              (unparse-lc-exp body)))
      (app-exp (rator rand)
        (list (unparse-lc-exp rator) (unparse-lc-exp rand))))))</code></pre>
                </div>
                <div class="tip-box">
                    <h4 class="font-bold text-lg mb-2 text-amber-800">💡 דגש למבחן</h4>
                    <p class="text-slate-700">בזמן ש-<code>parse</code> מקבל מחרוזת טקסט או רשימה ומייצר מבנה עץ <code>(cases)</code>, פונקציית ה-<code>unparse</code> עושה את ההפך הגמור: משתמשת ב-<code>cases</code> כדי לפרק את העץ בחזרה לרשימות.</p>
                </div>
            </div>
"""

    # Injecting nav buttons
    # Assuming there's a button with id="btn-sllgen-lexer"
    html = re.sub(
        r'(<button onclick="showTab\(\'sllgen-lexer\'\)"[^>]*>)',
        nav_buttons + r'\1',
        html
    )

    # Injecting tab contents
    # Assuming there's <div id="sllgen-lexer" class="tab-content">
    html = re.sub(
        r'(<!-- =+[\s\S]*?PART 3\.1: SLLGEN LEXER[\s\S]*?<div id="sllgen-lexer")',
        tab_contents + r'\1',
        html
    )

    with open('1_updated.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    print("1.html updated as 1_updated.html")

update_1_html()
