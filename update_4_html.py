import os

file_path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\4.html"

new_html_content = """<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mastering Interpreters - כרך ד': נושאים מתקדמים וטיפוסים (פרק 7)</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        racket: '#9e0000',
                        primary: '#1d4ed8',
                        dark: '#0f172a',
                        darker: '#020617',
                        codebg: '#1e293b',
                        highlight: '#38bdf8'
                    },
                    fontFamily: {
                        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
                        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace']
                    }
                }
            }
        }
    </script>
    <script>
        MathJax = { tex: { inlineMath: [['$', '$']], displayMath: [['$$', '$$']] } };
    </script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
    <style>
        body { background-color: #f8fafc; }
        .tab-content { display: none; opacity: 0; transition: opacity 0.3s ease-in-out; }
        .tab-content.active { display: block; opacity: 1; animation: slideUp 0.4s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        pre { direction: ltr; text-align: left; background-color: #1e293b; color: #e2e8f0; padding: 1.5rem; border-radius: 0.75rem; overflow-x: auto; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3); border: 1px solid #334155; margin-top: 1rem; margin-bottom: 1.5rem; font-size: 0.95rem; line-height: 1.6;}
        code { font-family: 'Consolas', monospace; }
        .token-comment { color: #94a3b8; font-style: italic; }
        .token-keyword { color: #c678dd; font-weight: bold; }
        .token-function { color: #61afef; }
        .token-string { color: #98c379; }
        
        .nav-group { margin-top: 1.5rem; padding-right: 0.5rem; }
        .nav-group-title { font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
        .nav-btn { display: block; width: 100%; text-align: right; padding: 0.85rem 1rem; border-radius: 0.5rem; color: #cbd5e1; transition: all 0.2s; margin-bottom: 0.25rem; font-size: 0.95rem; }
        .nav-btn:hover { background-color: #1e293b; color: #fff; padding-right: 1.5rem; }
        .nav-btn.active-nav { background-color: #2563eb; color: #fff; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2); border-right: 4px solid #60a5fa;}
        
        .thought-box { background: #fdf4ff; border-right: 4px solid #d946ef; padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .tip-box { background: #fffbeb; border-right: 4px solid #f59e0b; padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .grammar-box { background: #eff6ff; border-right: 4px solid #3b82f6; padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0; font-family: 'Consolas', monospace; direction: ltr; text-align: left; }
        .concept-box { background: #f0fdf4; border-right: 4px solid #22c55e; padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .deep-dive { background: #f8fafc; border: 1px solid #cbd5e1; border-right: 4px solid #64748b; padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;}

        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .dark-scroll::-webkit-scrollbar-track { background: #020617; }
        .dark-scroll::-webkit-scrollbar-thumb { background: #334155; }
    </style>
</head>
<body class="text-slate-800 h-screen flex overflow-hidden">

    <!-- Sidebar Navigation -->
    <aside class="w-80 bg-darker text-slate-300 flex flex-col h-full shadow-2xl z-20 flex-shrink-0 border-l border-slate-800">
        <div class="p-6 border-b border-slate-800 bg-darker">
            <h1 class="text-3xl font-black text-white tracking-tight leading-tight">Mastering<br><span class="text-purple-500">Types</span></h1>
            <p class="text-xs text-slate-400 mt-2">כרך ד': נושאים מתקדמים (פרק 7)</p>
        </div>
        
        <div class="flex-1 overflow-y-auto dark-scroll p-4 pb-20">
            
            <div class="nav-group">
                <div class="nav-group-title">מבוא למערכות טיפוסים</div>
                <button onclick="showTab('intro-types')" id="btn-intro-types" class="nav-btn active-nav">
                    <span>🛡️ למה צריך טיפוסים (Types)?</span>
                </button>
            </div>

            <div class="nav-group">
                <div class="nav-group-title">שפת CHECKED</div>
                <button onclick="showTab('checked-files')" id="btn-checked-files" class="nav-btn">
                    <span>🏗️ 1.1 הקבצים שיוצרים אותה</span>
                </button>
                <button onclick="showTab('lang-checked')" id="btn-lang-checked" class="nav-btn">
                    <span>✔️ 1.2 שפת CHECKED (בדיקה סטטית)</span>
                </button>
                <button onclick="showTab('type-of-func')" id="btn-type-of-func" class="nav-btn">
                    <span>⚙️ 1.3 מנוע הבדיקה: type-of</span>
                </button>
            </div>

            <div class="nav-group">
                <div class="nav-group-title">שפת INFERRED</div>
                <button onclick="showTab('inferred-files')" id="btn-inferred-files" class="nav-btn">
                    <span>🏗️ 2.1 הקבצים שיוצרים אותה</span>
                </button>
                <button onclick="showTab('lang-inferred')" id="btn-lang-inferred" class="nav-btn">
                    <span>✨ 2.2 שפת INFERRED (הסקה אוטומטית)</span>
                </button>
            </div>

            <div class="nav-group">
                <div class="nav-group-title">אלגוריתם הסקת טיפוסים</div>
                <button onclick="showTab('algo-equations')" id="btn-algo-equations" class="nav-btn">
                    <span>📝 3.1 יצירת המשוואות (Constraints)</span>
                </button>
                <button onclick="showTab('algo-unification')" id="btn-algo-unification" class="nav-btn">
                    <span>🧩 3.2 פתרון משוואות (Unification)</span>
                </button>
            </div>

            <div class="nav-group">
                <div class="nav-group-title">סדנת הכנה למבחן</div>
                <button onclick="showTab('exam-trace')" id="btn-exam-trace" class="nav-btn">
                    <span>🎓 4.1 פתרון מלא: מועד 2020ב (88)</span>
                </button>
            </div>
        </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-y-auto scroll-smooth bg-white relative">
        <div class="max-w-5xl mx-auto p-10 lg:p-16 pb-32">

            <!-- ==========================================
                 INTRO: WHY DO WE NEED TYPES?
            =========================================== -->
            <div id="intro-types" class="tab-content active">
                <header class="mb-12 border-b pb-6">
                    <div class="inline-block px-4 py-1 bg-purple-100 text-purple-800 rounded-full font-bold text-sm mb-4 tracking-wider uppercase">מבוא לפרק 7</div>
                    <h2 class="text-5xl font-black text-slate-800 tracking-tight mb-4">למה צריך <span class="text-purple-600">מערכות טיפוסים (Type Systems)?</span></h2>
                    <p class="text-xl text-slate-600 leading-relaxed">עד עכשיו, השפות שבנינו (LET, PROC, IMPLICIT-REFS) היו שפות שבדקו טיפוסים <strong>בזמן ריצה (Run-time / Dynamic Typing)</strong>. מה זה אומר? אם המתכנת עשה טעות וכתב <code>-(5, true)</code>, המפרש שלנו התחיל לעבוד, ניסה לעשות <code>expval->num</code> לבוליאני, ואז קרס עם שגיאה באמצע הריצה.</p>
                </header>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div class="concept-box border-l-4 border-l-purple-500 !my-0">
                        <h3 class="text-2xl font-bold mb-4 text-purple-800">הבעיה עם גילוי שגיאות מאוחר</h3>
                        <p class="mb-4 text-slate-700">דמיינו מערכת להטסת חללית. הפונקציה <code>deployParachute()</code> נקראת רק כאשר גובה החללית יורד מתחת ל-1000 מטר. אם בפונקציה הזו יש שגיאת טיפוס (למשל, מנסים להכפיל פונקציה במספר), אנחנו נגלה את זה רק בזמן שהחללית נופלת! זה מאוחר מדי.</p>
                        <p class="text-slate-700 font-bold bg-white p-3 rounded border border-purple-100">המטרה של פרק 7 היא ליצור שפות שתופסות את השגיאות האלו לפני שהתוכנית בכלל מתחילה לרוץ (Compile-time / Static Typing).</p>
                    </div>

                    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 class="text-xl font-bold text-slate-800 mb-3 border-b pb-2">מה זה "טיפוס" (Type)?</h3>
                        <p class="text-sm text-slate-700 mb-4">טיפוס הוא תווית שמודבקת לכל ביטוי בשפה, שאומרת "איזה סוג של מידע יצא מכאן בסוף?". בשפות שלנו יש שלושה טיפוסים מרכזיים:</p>
                        <ul class="list-disc list-inside space-y-2 text-sm text-slate-700 font-mono">
                            <li><strong>int</strong> - עבור כל המספרים.</li>
                            <li><strong>bool</strong> - עבור אמת ושקר.</li>
                            <li><strong>T1 -> T2</strong> - עבור פונקציות. פונקציה שמקבלת טיפוס T1 ומחזירה טיפוס T2 (למשל: פונקציה שמקבלת int ומחזירה bool תיכתב כ- <code>int -> bool</code>).</li>
                        </ul>
                    </div>
                </div>

                <div class="thought-box">
                    <h3 class="text-2xl font-bold mb-4 text-fuchsia-800">איך בודקים קוד בלי להריץ אותו?</h3>
                    <p class="mb-4 text-slate-700">הטריק הוא לבנות מפרש מקביל. אם למדנו שהפונקציה <code>value-of</code> רצה על ה-AST ומחשבת <strong>ערכים</strong>, אנחנו נבנה פונקציה חדשה שנקראת <code>type-of</code>. היא תרוץ על אותו ה-AST, אבל במקום לחשב מספרים, היא תחשב <strong>טיפוסים</strong>.</p>
                    <p class="text-slate-700">במקום סביבה רגילה (Environment) ששומרת <code>[x=5]</code>, היא תשתמש ב<strong>סביבת טיפוסים (Type Environment)</strong> ששומרת <code>[x=int]</code>.</p>
                </div>
            </div>

            <!-- ==========================================
                 PART 1.1: CHECKED FILES
            =========================================== -->
            <div id="checked-files" class="tab-content">
                <header class="mb-12 border-b pb-6">
                    <div class="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-sm mb-4 tracking-wider uppercase">שפת CHECKED</div>
                    <h2 class="text-5xl font-black text-slate-800 tracking-tight mb-4">קבצי המקור של שפת <span class="text-blue-600">CHECKED</span></h2>
                    <p class="text-xl text-slate-600 leading-relaxed">שפת CHECKED היא שפה בעלת מערכת טיפוסים סטטית המוכרזת במפורש. בואו נראה אילו קבצים מגדירים אותה וכיצד הם משתלבים בארכיטקטורה של השפה.</p>
                </header>

                <div class="flex flex-col md:flex-row gap-6 mb-10">
                    <div class="w-full md:w-1/3 space-y-3">
                        <div class="bg-blue-50 border-r-4 border-blue-500 p-4 rounded shadow-sm">
                            <h4 class="font-bold text-blue-800 font-mono text-sm mb-1">checker.scm (חדש!)</h4>
                            <p class="text-xs text-slate-700">לב מערכת הטיפוסים. מכיל את הפונקציה <code>type-of</code> ואת ייצוג סביבת הטיפוסים (Tenv).</p>
                        </div>
                        <div class="bg-amber-50 border-r-4 border-amber-500 p-4 rounded shadow-sm">
                            <h4 class="font-bold text-amber-800 font-mono text-sm mb-1">lang.scm</h4>
                            <p class="text-xs text-slate-700">מגדיר את הדקדוק המעודכן, הכולל ביטויי טיפוסים (Types) והערות טיפוס על משתנים.</p>
                        </div>
                        <div class="bg-green-50 border-r-4 border-green-500 p-4 rounded shadow-sm">
                            <h4 class="font-bold text-green-800 font-mono text-sm mb-1">interp.scm & data-structures.scm</h4>
                            <p class="text-xs text-slate-700">המפרש וערכי הריצה. שים לב: <strong>הם אינם כוללים בדיקות טיפוסים בזמן ריצה!</strong> אנו מסתמכים ב-100% על ה-Type Checker.</p>
                        </div>
                        <div class="bg-purple-50 border-r-4 border-purple-500 p-4 rounded shadow-sm">
                            <h4 class="font-bold text-purple-800 font-mono text-sm mb-1">top.scm</h4>
                            <p class="text-xs text-slate-700">הקובץ המקשר שמנהל את ה-Pipeline הדו-שלבי: בדיקה סטטית (Type Check) ולאחר מכן ריצה (Evaluation).</p>
                        </div>
                    </div>

                    <div class="w-full md:w-2/3 bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h4 class="font-bold text-slate-800 mb-4">צינור העיבוד הדו-שלבי (EOPL Pipeline)</h4>
                        <p class="text-sm text-slate-700 mb-4">בשפות הקודמות, הקוד עבר ישירות לפענוח (Parsing) ולאחר מכן לריצה. בשפת CHECKED אנו מוסיפים שלב ביניים קריטי:</p>
                        
                        <div class="flex flex-col items-center gap-2 font-mono text-xs my-6">
                            <div class="px-4 py-2 bg-slate-200 rounded border border-slate-300 w-48 text-center font-bold">Source Code (String)</div>
                            <div class="text-slate-400">⬇️ (scan&parse)</div>
                            <div class="px-4 py-2 bg-blue-100 rounded border border-blue-300 w-48 text-center font-bold text-blue-800">AST</div>
                            <div class="text-slate-400">⬇️ (type-of-program)</div>
                            <div class="flex gap-4">
                                <div class="px-4 py-2 bg-green-100 rounded border border-green-300 w-36 text-center font-bold text-green-800">Safe! (returns Type)</div>
                                <div class="px-4 py-2 bg-red-100 rounded border border-red-300 w-36 text-center font-bold text-red-800">Error! (Halt)</div>
                            </div>
                            <div class="text-slate-400">⬇️ (value-of-program)</div>
                            <div class="px-4 py-2 bg-purple-100 rounded border border-purple-300 w-48 text-center font-bold text-purple-800">ExpVal</div>
                        </div>

                        <div class="tip-box !m-0">
                            <h5 class="font-bold text-amber-800 text-sm mb-1">🚀 Zero-Cost Abstraction</h5>
                            <p class="text-xs text-slate-700">בגלל שהוכחנו סטטית שאין שגיאות טיפוס, מפרש הריצה ב-<code>interp.scm</code> רץ מהר יותר ופשוט יותר. אין צורך לבדוק ב-<code>if-exp</code> האם התנאי הוא בוליאני, או ב-<code>diff-exp</code> האם האיברים הם מספרים. הבטיחות מובטחת מראש!</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 PART 1.2: CHECKED LANGUAGE
            =========================================== -->
            <div id="lang-checked" class="tab-content">
                <header class="mb-12 border-b pb-6">
                    <div class="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-sm mb-4 tracking-wider uppercase">שפת CHECKED</div>
                    <h2 class="text-5xl font-black text-slate-800 tracking-tight mb-4">שפת <span class="text-emerald-600">CHECKED</span> (בדיקה סטטית)</h2>
                    <p class="text-xl text-slate-600 leading-relaxed">שפת CHECKED היא השפה הראשונה שמוסיפה Type Checking (בדיקת טיפוסים). היא דורשת מהמתכנת <strong>להכריז במפורש (Explicit Annotations)</strong> על הטיפוס של כל פרמטר בפונקציה. זה מזכיר מאוד את שפת C או Java.</p>
                </header>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <div class="grammar-box !my-0">
                        <h3 class="text-xl font-bold mb-4 border-b pb-2 text-blue-800">הדקדוק החדש (lang.scm)</h3>
                        <p class="text-sm text-slate-700 mb-4 font-sans">נוסף לנו מבנה תחבירי חדש שנקרא <code>Type</code>, ושינינו את הגדרת הפונקציה (proc) כך שתדרוש את הטיפוס של הפרמטר שלה:</p>
                        <code class="text-sm">
<span class="token-comment">% הגדרות הטיפוסים בשפה:</span><br>
Type ::= int<br>
Type ::= bool<br>
Type ::= (Type -> Type)<br><br>

<span class="token-comment">% השינוי בפונקציות ורקורסיה:</span><br>
Expression ::= proc (Identifier : Type) Expression<br>
Expression ::= letrec Type Identifier (Identifier : Type) = Expression in Expression
                        </code>
                    </div>

                    <div class="concept-box border-l-4 border-l-emerald-500 !my-0">
                        <h3 class="text-xl font-bold text-emerald-800 mb-3 border-b border-emerald-200 pb-2">איך הקוד נראה?</h3>
                        <p class="text-sm text-slate-700 mb-3">כדי להגדיר פונקציה שמקבלת x ומחסרת ממנו 1, המתכנת <strong>חייב</strong> להצהיר ש-x הוא מסוג <code>int</code>.</p>
                        <pre class="!bg-white !text-slate-800 border border-slate-300 text-sm"><code>let f = proc (x : int) -(x, 1)
in (f 10)</code></pre>
                        <p class="text-sm text-slate-700 mt-2">בלולאת <code>letrec</code> ההכרזה ארוכה אפילו יותר, כי צריך להצהיר גם על טיפוס החזרה של הפונקציה עצמה:</p>
                        <pre class="!bg-white !text-slate-800 border border-slate-300 text-sm"><code>letrec int fact (n : int) = 
  if zero?(n) then 1 else *(n, (fact -(n,1)))
in (fact 5)</code></pre>
                    </div>
                </div>

                <div class="deep-dive">
                    <h3 class="text-2xl font-bold mb-4 text-slate-800">השוואה לשפות קודמות</h3>
                    <p class="mb-4 text-slate-700">בשפת PROC הישנה, פונקציות היו "דינמיות" לחלוטין. ב-CHECKED אנו מעבירים חלק מהאחריות למערכת הטיפוסים הסטטית. נשים לב להבדל התחבירי והסמנטי המרכזי:</p>
                    <table class="min-w-full bg-white rounded-lg overflow-hidden border border-slate-200 text-sm">
                        <thead class="bg-slate-100 text-slate-700">
                            <tr>
                                <th class="py-2 px-4 text-right font-bold border-b">נושא</th>
                                <th class="py-2 px-4 text-right font-bold border-b">שפת PROC (דינמית)</th>
                                <th class="py-2 px-4 text-right font-bold border-b text-emerald-700">שפת CHECKED (סטטית)</th>
                            </tr>
                        </thead>
                        <tbody class="text-slate-600 divide-y divide-slate-100">
                            <tr>
                                <td class="py-3 px-4 font-bold text-slate-800">הגדרת פונקציה</td>
                                <td class="py-3 px-4 font-mono"><code>proc (x) ...</code></td>
                                <td class="py-3 px-4 font-mono text-emerald-600"><code>proc (x : int) ...</code></td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4 font-bold text-slate-800">שגיאת טיפוסים</td>
                                <td class="py-3 px-4">מתגלה רק בזמן ריצה כשמנסים לחשב את הביטוי.</td>
                                <td class="py-3 px-4 text-emerald-600">מתגלה בשלב ה-Compilation (בדיקת הטיפוסים הסטטית) ללא הרצת קוד.</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4 font-bold text-slate-800">הגדרת רקורסיה</td>
                                <td class="py-3 px-4 font-mono"><code>letrec f(x) = ...</code></td>
                                <td class="py-3 px-4 font-mono text-emerald-600"><code>letrec bool f(x : int) = ...</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- ==========================================
                 PART 1.2: CHECKED - TYPE-OF FUNCTION
            =========================================== -->
            <div id="type-of-func" class="tab-content">
                <header class="mb-12 border-b pb-6">
                    <div class="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-sm mb-4 tracking-wider uppercase">שפת CHECKED</div>
                    <h2 class="text-5xl font-black text-slate-800 tracking-tight mb-4">מנוע הבדיקה: <span class="text-emerald-600">type-of</span></h2>
                    <p class="text-xl text-slate-600 leading-relaxed">הפונקציה <code>type-of</code> היא המקבילה המושלמת ל-<code>value-of</code>, אבל במקום לעבוד בעולם של מספרים, היא עובדת בעולם של טיפוסים (Types). היא רצה לאורך עץ ה-AST ומוודאת שכל פעולה היא חוקית.</p>
                </header>

                <div class="bg-codebg text-white p-6 rounded-xl overflow-x-auto shadow-lg mb-10">
                    <h4 class="font-bold text-lg text-highlight mb-3">מימוש type-of ב-checker.scm</h4>
                    <pre class="!bg-transparent !p-0 !m-0 !shadow-none !border-none"><code>(define type-of
  (lambda (exp tenv) <span class="token-comment">; tenv = Type Environment!</span>
    (cases expression exp
      
      <span class="token-comment">; 1. מספר: הטיפוס שלו הוא תמיד int</span>
      (const-exp (num) (int-type))
      
      <span class="token-comment">; 2. שליפת משתנה מסביבת הטיפוסים (Tenv)</span>
      (var-exp (var) (apply-tenv tenv var))
      
      <span class="token-comment">; 3. חיסור מתמטי:</span>
      (diff-exp (exp1 exp2)
        (let ((ty1 (type-of exp1 tenv))
              (ty2 (type-of exp2 tenv)))
          (check-equal-type! ty1 (int-type) exp1)
          (check-equal-type! ty2 (int-type) exp2)
          (int-type)))
          
      <span class="token-comment">; 4. בדיקת אפס (zero?):</span>
      (zero?-exp (exp1)
        (let ((ty1 (type-of exp1 tenv)))
          (check-equal-type! ty1 (int-type) exp1)
          (bool-type)))
          
      <span class="token-comment">; 5. פקודת תנאי (if):</span>
      (if-exp (exp1 exp2 exp3)
        (let ((ty1 (type-of exp1 tenv))
              (ty2 (type-of exp2 tenv))
              (ty3 (type-of exp3 tenv)))
          (check-equal-type! ty1 (bool-type) exp1)
          (check-equal-type! ty2 ty3 exp)
          ty2))
          
      <span class="token-comment">; 6. ביטוי Let:</span>
      (let-exp (var exp1 body)
        (let ((exp1-type (type-of exp1 tenv)))
          (type-of body (extend-tenv var exp1-type tenv))))
          
      <span class="token-comment">; 7. יצירת פונקציה (proc):</span>
      (proc-exp (var var-type body)
        (let ((result-type (type-of body (extend-tenv var var-type tenv))))
          (proc-type var-type result-type)))
          
      <span class="token-comment">; 8. הפעלת פונקציה (call):</span>
      (call-exp (rator rand)
        (let ((rator-type (type-of rator tenv))
              (rand-type  (type-of rand tenv)))
          (cases type rator-type
            (proc-type (arg-type result-type)
              (begin
                (check-equal-type! arg-type rand-type rand)
                result-type))
            (else (eopl:error 'type-of "Rator not a proc type!")))))
            
      <span class="token-comment">; 9. רקורסיה (letrec):</span>
      (letrec-exp (p-result-type p-name b-var b-var-type p-body letrec-body)
        (let ((tenv-for-letrec-body
                (extend-tenv p-name (proc-type b-var-type p-result-type) tenv)))
          (let ((p-body-type 
                  (type-of p-body (extend-tenv b-var b-var-type tenv-for-letrec-body)))) 
            (check-equal-type! p-body-type p-result-type p-body)
            (type-of letrec-body tenv-for-letrec-body))))
    )))</code></pre>
                </div>

                <div class="deep-dive">
                    <h4 class="font-bold text-slate-800 mb-2">🧠 סביבת טיפוסים (Tenv) מול סביבת ריצה (Env)</h4>
                    <p class="text-slate-700">חשוב להבין את ההפרדה המוחלטת בין שני סוגי הסביבות:</p>
                    <ul class="list-disc list-inside space-y-2 mt-2 text-slate-700">
                        <li><strong>סביבת ריצה (Environment)</strong>: מופעלת ב-<code>value-of</code>, שומרת שמות של משתנים ומקשרת אותם לערכי ריצה אמיתיים כמו מספרים או קלוז'רים (למשל: <code>x = num-val(5)</code>).</li>
                        <li><strong>סביבת טיפוסים (Type Environment - Tenv)</strong>: מופעלת ב-<code>type-of</code>, שומרת שמות של משתנים ומקשרת אותם לטיפוסים הסטטיים שלהם (למשל: <code>x = int-type</code>). סביבה זו קיימת רק בזמן הקומפילציה!</li>
                    </ul>
                </div>
            </div>

            <!-- ==========================================
                 PART 2.1: INFERRED FILES
            =========================================== -->
            <div id="inferred-files" class="tab-content">
                <header class="mb-12 border-b pb-6">
                    <div class="inline-block px-4 py-1 bg-fuchsia-100 text-fuchsia-800 rounded-full font-bold text-sm mb-4 tracking-wider uppercase">שפת INFERRED</div>
                    <h2 class="text-5xl font-black text-slate-800 tracking-tight mb-4">קבצי המקור של שפת <span class="text-fuchsia-600">INFERRED</span></h2>
                    <p class="text-xl text-slate-600 leading-relaxed">שפת INFERRED מאפשרת להשמיט את הגדרות הטיפוסים באמצעות שימוש בסימן שאלה <code>?</code>. כדי לבצע את פלא הסקת הטיפוסים, המפרש משתמש במערכת קבצים מתוחכמת יותר.</p>
                </header>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 class="text-xl font-bold text-slate-800 mb-3 border-b pb-2">מבנה הקבצים החדש</h3>
                        <ul class="space-y-4">
                            <li class="border-b pb-2">
                                <span class="font-bold text-fuchsia-800 font-mono">inferrer.scm (מחליף את checker.scm)</span>
                                <p class="text-xs text-slate-600 mt-1">מבצע את בדיקת הטיפוסים הסטטית תוך החזרת ערך מסוג <code>an-answer</code> המכיל את הטיפוס שחושב ואת טבלת ההצבות (Substitutions) המעודכנת.</p>
                            </li>
                            <li class="border-b pb-2">
                                <span class="font-bold text-fuchsia-800 font-mono">substitutions.scm (חדש!)</span>
                                <p class="text-xs text-slate-600 mt-1">מנהל את מפת הטיפוסים הזמניים (Type Variables) להצבות שלהם. מספק את <code>extend-subst</code> ו-<code>apply-subst-to-type</code>.</p>
                            </li>
                            <li class="border-b pb-2">
                                <span class="font-bold text-fuchsia-800 font-mono">unifier.scm (חדש!)</span>
                                <p class="text-xs text-slate-600 mt-1">מנוע האיחוד (Unification) המרכזי שמקבל שני טיפוסים, משווה ביניהם ומעדכן את מפת ההצבות בהתאם.</p>
                            </li>
                            <li>
                                <span class="font-bold text-fuchsia-800 font-mono">equal-up-to-gensyms.scm (חדש!)</span>
                                <p class="text-xs text-slate-600 mt-1">מודול בדיקות המשווה בין שני טיפוסים שנוצרו באופן אוטומטי (למשל tvar1 לעומת tvar2) ומוודא שהמבנה שלהם זהה ללא תלות במספר הסידורי שנוצר להם.</p>
                            </li>
                        </ul>
                    </div>

                    <div class="concept-box border-l-4 border-l-fuchsia-500 !my-0">
                        <h3 class="text-xl font-bold text-fuchsia-800 mb-3 border-b border-fuchsia-200 pb-2">הארכיטקטורה של הסקת טיפוסים</h3>
                        <p class="text-sm text-slate-700 leading-relaxed mb-4">
                            כאשר המפרש נתקל בסימן <code>?</code> (המיוצג תחבירית כ-<code>no-type</code> בדקדוק), הוא מייצר עבורו משתנה טיפוס טרי (Fresh Type Variable) המסומן כ-<code>%tvar-type</code> עם מספר סידורי רץ (למשל tvar1, tvar2, tvar3).
                        </p>
                        <p class="text-sm text-slate-700 leading-relaxed mb-4">
                            בזמן ריצת ה-Inferrer, אנו אוספים משוואות ומאחדים אותן בעזרת ה-Unifier. ה-Unifier מעדכן את מאגר ה-Substitutions שמייצג את כל ה"ידע הקיים" שיש לנו על אותם משתנים זמניים. בסיום הריצה, אנו מפעילים <code>apply-subst-to-type</code> כדי להחליף את כל משתני הטיפוס הזמניים בטיפוסים האמיתיים שהסקנו.
                        </p>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 PART 2.1: INFERRED LANGUAGE
            =========================================== -->
            <div id="lang-inferred" class="tab-content">
                <header class="mb-12 border-b pb-6">
                    <div class="inline-block px-4 py-1 bg-fuchsia-100 text-fuchsia-800 rounded-full font-bold text-sm mb-4 tracking-wider uppercase">שפת INFERRED</div>
                    <h2 class="text-5xl font-black text-slate-800 tracking-tight mb-4">הסקה אוטומטית: <span class="text-fuchsia-600">שפת INFERRED</span></h2>
                    <p class="text-xl text-slate-600 leading-relaxed">שפת CHECKED היא בטוחה, אבל הופכת את הקוד למסורבל. מתכנתים לא רוצים לכתוב <code>(x : int)</code> בכל מקום. שפות מתקדמות כמו TypeScript או Haskell מאפשרות <strong>הסקת טיפוסים (Type Inference)</strong>. המהדר חכם מספיק להסתכל על הקוד ולנחש לבד מה צריך להיות הטיפוס!</p>
                </header>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 class="text-xl font-bold text-slate-800 mb-3 border-b pb-2">הדקדוק: סימן השאלה (?)</h3>
                        <p class="text-sm text-slate-700 mb-4">בשפת INFERRED, המתכנת יכול לכתוב סימן שאלה <code>?</code> במקום לכתוב את הטיפוס. הוא אומר למפרש: "תגלה לבד".</p>
                        <pre class="text-xs"><code><span class="token-comment">; הטיפוס הוסתר בעזרת ?</span>
let f = proc (x : ?) -(x, 1)
in (f 10)</code></pre>
                        <p class="text-sm text-slate-700 mt-2">המטרה של האלגוריתם (שעליו נשאלים במבחן) היא לפענח מה מסתתר מאחורי כל סימן שאלה בתוכנית, על ידי איסוף רמזים ופתרון משוואות.</p>
                    </div>

                    <div class="concept-box border-l-4 border-l-fuchsia-500 !my-0">
                        <h3 class="text-xl font-bold text-fuchsia-800 mb-3 border-b border-fuchsia-200 pb-2">שלושת השלבים להסקה</h3>
                        <p class="text-sm text-slate-700 mb-3">איך אלגוריתם כזה עובד? ממש כמו פתרון מערכת משוואות במתמטיקה (נעלמים $x, y$):</p>
                        <ol class="list-decimal list-inside space-y-2 text-sm text-slate-700 font-bold ml-2">
                            <li><strong>מיפוי משתנים זמניים:</strong> מעניקים משתנה זמני (Type Variable המסומן באות $t$) לכל סימן שאלה ולכל ביטוי בקוד.</li>
                            <li><strong>איסוף אילוצים (Constraints):</strong> עוברים על ה-AST ומייצרים משוואות לפי החוקים (למשל, חיסור דורש $int$).</li>
                            <li><strong>הצבה (Unification):</strong> פותרים את המשוואות בשיטת האלימינציה. ככל שפותרים יותר משוואות, ערך הנעלמים נחשף, עד שכל ה- $t$-ים הופכים לטיפוסים אמיתיים!</li>
                        </ol>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 PART 3.1: ALGORITHM - EQUATIONS
            =========================================== -->
            <div id="algo-equations" class="tab-content">
                <header class="mb-12 border-b pb-6">
                    <div class="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-sm mb-4 tracking-wider uppercase">אלגוריתם הסקת טיפוסים</div>
                    <h2 class="text-5xl font-black text-slate-800 tracking-tight mb-4">שלב 1: <span class="text-amber-600">יצירת המשוואות (Constraints)</span></h2>
                    <p class="text-xl text-slate-600 leading-relaxed">השלב הראשון במבחן הוא לקחת את התוכנית, להעניק שמות (Type Variables) לכל ביטוי, ולהוציא מהקוד את החוקים (המשוואות) שהוא מחייב. כל פעולה מתמטית או לוגית מפיקה משוואה.</p>
                </header>

                <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-10">
                    <h3 class="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">חוקי הגזירה (The Rules)</h3>
                    <p class="mb-4 text-slate-700">בואו נכיר את התבניות. נניח שסימנו ביטוי $E$ במשתנה טיפוס $t_E$. אילו רמזים נוכל לדלות?</p>
                    
                    <div class="space-y-6">
                        <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center">
                            <div class="w-1/3 font-bold text-blue-700 text-lg" dir="ltr">-(E1, E2)</div>
                            <div class="w-2/3 text-slate-700">פעולת חיסור דורשת מספרים. לכן: $t_{E1} = int$, וגם $t_{E2} = int$. בנוסף, התוצאה של הפעולה כולה היא $int$.</div>
                        </div>
                        
                        <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center">
                            <div class="w-1/3 font-bold text-blue-700 text-lg" dir="ltr">zero?(E1)</div>
                            <div class="w-2/3 text-slate-700">הפעולה <code>zero?</code> בודקת האם מספר הוא 0. לכן: הקלט $t_{E1} = int$. התוצאה של הפעולה כולה היא תמיד $bool$.</div>
                        </div>

                        <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center">
                            <div class="w-1/3 font-bold text-blue-700 text-lg" dir="ltr">if E1 then E2 else E3</div>
                            <div class="w-2/3 text-slate-700">התנאי חייב להיות בוליאני: $t_{E1} = bool$. שני הבלוקים חייבים להחזיר אותו דבר: $t_{E2} = t_{E3}$. התוצאה של ה-if כולו שווה ל-$t_{E2}$.</div>
                        </div>

                        <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center">
                            <div class="w-1/3 font-bold text-purple-700 text-lg" dir="ltr">proc (x) Body</div>
                            <div class="w-2/3 text-slate-700">יצירת פונקציה. הפונקציה יוצרת מבנה של חץ. הטיפוס של הפונקציה כולה שווה ל: $t_x \rightarrow t_{Body}$ (מקבלת את טיפוס x ומחזירה את טיפוס הגוף).</div>
                        </div>

                        <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center">
                            <div class="w-1/3 font-bold text-emerald-700 text-lg" dir="ltr">(Rator Rand)</div>
                            <div class="w-2/3 text-slate-700">הפעלת פונקציה! זה החוק שהכי מבלבל. אם מפעילים את הפונקציה <code>Rator</code> על הארגומנט <code>Rand</code>, והפעולה כולה מחזירה תוצאה <code>Res</code>, אזי הפונקציה חייבת להיות מהמבנה: $t_{Rator} = t_{Rand} \rightarrow t_{Res}$.</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ==========================================
                 PART 3.2: ALGORITHM - UNIFICATION
            =========================================== -->
            <div id="algo-unification" class="tab-content">
                <header class="mb-12 border-b pb-6">
                    <div class="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-sm mb-4 tracking-wider uppercase">אלגוריתם הסקת טיפוסים</div>
                    <h2 class="text-5xl font-black text-slate-800 tracking-tight mb-4">שלב 2: <span class="text-amber-600">פתרון המשוואות (Unification)</span></h2>
                    <p class="text-xl text-slate-600 leading-relaxed">לאחר שיצרנו את כל המשוואות, אנחנו מתחילים "לנקות" אותן בעזרת טבלה של שתי עמודות: עמודת ה<strong>משוואות (Equations)</strong> שעוד צריך לפתור, ועמודת ה<strong>הצבות (Substitutions)</strong> שבה אנו שומרים עובדות מוגמרות שמצאנו.</p>
                </header>

                <div class="thought-box mb-10">
                    <h3 class="text-2xl font-bold mb-4 text-fuchsia-800">איך פותרים (אלגוריתם ההצבה)?</h3>
                    <p class="mb-4 text-slate-700">אנו עוברים על עמודת המשוואות אחת-אחת ומפעילים את החוקים הבאים:</p>
                    <ul class="list-decimal list-inside space-y-3 text-slate-700 font-bold ml-4">
                        <li><strong>זהות:</strong> אם הגענו למשוואה כמו $int = int$ או $t_1 = t_1$, פשוט מוחקים אותה. אין לה משמעות.</li>
                        <li><strong>גילוי משתנה (Substitution):</strong> אם הגענו למשוואה $t_1 = int$ (או $t_1 = t_2 \rightarrow bool$). מצאנו עובדה! מעבירים אותה לעמודת ההצבות. אבל, החלק החשוב ביותר: <strong>עוברים על כל שאר המשוואות שנותרו, ובכל מקום שכתוב $t_1$, מוחקים וכותבים במקומו את הערך שמצאנו!</strong></li>
                        <li><strong>פירוק פונקציות:</strong> אם הגענו למשוואה המורכבת מחצים, למשל $t_1 \rightarrow int = bool \rightarrow t_2$. כדי שזה יהיה שווה, החלק השמאלי חייב להיות שווה לשמאלי, והימני לימני. לכן, מוחקים את המשוואה הזו ומפצלים אותה לשתי משוואות חדשות בתחתית הרשימה: $t_1 = bool$ ו-$int = t_2$.</li>
                        <li><strong>שגיאת טיפוס (Failure):</strong> אם הגענו למצב של התנגשות, למשל $int = bool$, או $int = t_1 \rightarrow t_2$, האלגוריתם קורס. המשמעות: יש שגיאת טיפוס בקוד!</li>
                    </ul>
                </div>

                <div class="tip-box border-l-4 border-l-rose-500 bg-rose-50 !mb-10">
                    <h3 class="text-xl font-bold text-rose-800 mb-2">⚠️ מניעת רקורסיה אינסופית בטיפוסים (Occurs Check)</h3>
                    <p class="text-sm text-slate-700">
                        מדוע אנו בודקים האם משתנה הטיפוס $t_1$ מופיע בתוך הביטוי שאנו רוצים להציב לו?
                        אם ננסה לאחד את המשוואה: $t_1 = t_1 \rightarrow int$ ללא בדיקה, נקבל טיפוס אינסופי:
                        $$t_1 = (t_1 \rightarrow int) \rightarrow int = ((t_1 \rightarrow int) \rightarrow int) \rightarrow int ...$$
                        זהו מצב לא חוקי במערכת טיפוסים פשוטה (Simple Types). לכן, האלגוריתם בודק זאת באמצעות הפונקציה <code>no-occurrence?</code> ב-<code>unifier.scm</code>, ואם הוא מזהה שמשתנה הטיפוס מופיע בצד השני, הוא זורק שגיאת <strong>Occurs Check Violation</strong> ומכשיל את התוכנית.
                    </p>
                </div>
            </div>

            <!-- ==========================================
                 PART 4.1: EXAM TRACE (2020B - 88)
            =========================================== -->
            <div id="exam-trace" class="tab-content">
                <header class="mb-12 border-b pb-6">
                    <div class="inline-block px-4 py-1 bg-red-100 text-red-800 rounded-full font-bold text-sm mb-4 tracking-wider uppercase">סדנת אומן למבחן</div>
                    <h2 class="text-5xl font-black text-slate-800 tracking-tight mb-4">פתרון מלא: <span class="text-red-600">מבחן 2020ב מועד 88</span></h2>
                    <p class="text-xl text-slate-600 leading-relaxed">נפתור כעת במלואה את השאלה המורכבת שהופיעה במבחן, משלב גזירת המשתנים, דרך בניית המשוואות, ועד לפתרון בשיטת האלימינציה לקביעת הטיפוס הסופי. זהו המודל לאיך שהבוחן מצפה לראות את התשובה במחברת!</p>
                </header>

                <div class="bg-slate-800 text-slate-200 p-6 rounded-xl border border-slate-700 shadow-xl mb-10 font-mono text-lg text-center" dir="ltr">
                    let q = proc (y:?) zero?(-(y,10))<br>
                    in let p = proc(x: ?) if (x 5) then (q 10) else (q 20)<br>
                    in (p q)
                </div>

                <div class="concept-box border-l-4 border-l-blue-500 !my-0 mb-10">
                    <h3 class="text-2xl font-bold mb-4 text-blue-800">שלב א': חלוקת משתנים וייצור משוואות</h3>
                    <p class="text-slate-700 mb-4">נעבור על הקוד ונעניק $t$ לכל חלק. נתחיל מבפנים החוצה:</p>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-right border-collapse bg-white">
                            <thead>
                                <tr class="bg-blue-100 text-blue-800 border-b border-blue-200">
                                    <th class="p-3 font-bold border-l border-blue-200 w-1/4">הביטוי (Expression)</th>
                                    <th class="p-3 font-bold border-l border-blue-200 w-1/4">משתנה הטיפוס</th>
                                    <th class="p-3 font-bold text-center">המשוואות שנוצרות (Constraints) / הסבר</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm">
                                <tr class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">y</td>
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">$t_y$</td>
                                    <td class="p-3">פרמטר של הפונקציה q</td>
                                </tr>
                                <tr class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">-(y, 10)</td>
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">$t_1$</td>
                                    <td class="p-3 font-bold text-red-600">1. $t_y = int$<br>2. $t_1 = int$ <span class="text-xs font-normal text-slate-500">(חיסור דורש ומחזיר int)</span></td>
                                </tr>
                                <tr class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">zero?(-(y, 10))</td>
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">$t_2$</td>
                                    <td class="p-3 font-bold text-red-600">3. $t_1 = int$ <span class="text-xs font-normal text-slate-500">(קלט חייב להיות int)</span><br>4. $t_2 = bool$ <span class="text-xs font-normal text-slate-500">(תוצאת zero? היא בוליאנית)</span></td>
                                </tr>
                                <tr class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">proc(y:?)...</td>
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">$t_q$</td>
                                    <td class="p-3 font-bold text-red-600">5. $t_q = t_y \rightarrow t_2$ <span class="text-xs font-normal text-slate-500">(פונקציה מהפרמטר לגוף)</span></td>
                                </tr>
                                <tr class="border-b border-slate-100 bg-slate-100">
                                    <td colspan="3" class="p-2 text-center text-slate-500 font-bold">--- עוברים לחלק השני של הקוד ---</td>
                                </tr>
                                <tr class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">x</td>
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">$t_x$</td>
                                    <td class="p-3">פרמטר של הפונקציה p</td>
                                </tr>
                                <tr class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">(x 5)</td>
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">$t_3$</td>
                                    <td class="p-3 font-bold text-red-600">6. $t_x = int \rightarrow t_3$ <span class="text-xs font-normal text-slate-500">(x מופעל כפונקציה על המספר 5, ומחזיר את t_3)</span></td>
                                </tr>
                                <tr class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">(q 10)</td>
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">$t_4$</td>
                                    <td class="p-3 font-bold text-red-600">7. $t_q = int \rightarrow t_4$ <span class="text-xs font-normal text-slate-500">(q מופעל כפונקציה על 10, ומחזיר את t_4)</span></td>
                                </tr>
                                <tr class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">(q 20)</td>
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">$t_5$</td>
                                    <td class="p-3 font-bold text-red-600">8. $t_q = int \rightarrow t_5$ <span class="text-xs font-normal text-slate-500">(q מופעל על 20, ומחזיר את t_5)</span></td>
                                </tr>
                                <tr class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">if (x 5) then...</td>
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">$t_{if}$</td>
                                    <td class="p-3 font-bold text-red-600">9. $t_3 = bool$ <span class="text-xs font-normal text-slate-500">(תנאי ה-if חייב להיות בוליאני)</span><br>10. $t_4 = t_5$ <span class="text-xs font-normal text-slate-500">(שני ענפי ה-if זהים)</span><br>11. $t_{if} = t_4$ <span class="text-xs font-normal text-slate-500">(תוצאת ה-if)</span></td>
                                </tr>
                                <tr class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">proc(x:?)...</td>
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">$t_p$</td>
                                    <td class="p-3 font-bold text-red-600">12. $t_p = t_x \rightarrow t_{if}$ <span class="text-xs font-normal text-slate-500">(הפונקציה p)</span></td>
                                </tr>
                                <tr class="border-b border-slate-100 hover:bg-slate-50">
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">(p q)</td>
                                    <td class="p-3 font-mono border-l border-slate-100" dir="ltr">$t_{prog}$</td>
                                    <td class="p-3 font-bold text-red-600">13. $t_p = t_q \rightarrow t_{prog}$ <span class="text-xs font-normal text-slate-500">(התוכנית כולה - p מופעלת על q)</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="bg-green-50 p-8 rounded-2xl shadow-sm border border-green-200 mb-10">
                    <h3 class="text-2xl font-bold mb-6 text-green-800 border-b border-green-200 pb-2">שלב ב': פתרון - אלגוריתם ההצבות (Unification)</h3>
                    <p class="mb-4 text-slate-700">כעת, ניקח את 13 המשוואות שמצאנו, ונפעיל אלימינציה שלב אחר שלב. שימו לב איך הערכים מחלחלים (Substitute) במורד המשוואות.</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 class="font-bold text-lg text-slate-500 mb-4 underline">המשוואות שלנו:</h4>
                            <ul class="space-y-2 font-mono text-slate-600 text-sm" dir="ltr">
                                <li>1. $t_y = int$</li>
                                <li>2. $t_1 = int$</li>
                                <li>3. $t_1 = int$</li>
                                <li>4. $t_2 = bool$</li>
                                <li>5. $t_q = t_y \rightarrow t_2$</li>
                                <li>6. $t_x = int \rightarrow t_3$</li>
                                <li>7. $t_q = int \rightarrow t_4$</li>
                                <li>8. $t_q = int \rightarrow t_5$</li>
                                <li>9. $t_3 = bool$</li>
                                <li>10. $t_4 = t_5$</li>
                                <li>11. $t_{if} = t_4$</li>
                                <li>12. $t_p = t_x \rightarrow t_{if}$</li>
                                <li>13. $t_p = t_q \rightarrow t_{prog}$</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="font-bold text-lg text-green-700 mb-4 underline">עמודת ההצבות (Substitutions) - הפתרון!</h4>
                            <ul class="space-y-3 font-mono text-green-900 font-bold" dir="ltr">
                                <li>$\rightarrow t_y = int$ <span class="text-xs text-green-600 font-normal ml-2">(ממשוואה 1)</span></li>
                                <li>$\rightarrow t_1 = int$ <span class="text-xs text-green-600 font-normal ml-2">(משוואות 2,3 - נמחקות)</span></li>
                                <li>$\rightarrow t_2 = bool$ <span class="text-xs text-green-600 font-normal ml-2">(ממשוואה 4)</span></li>
                                <li class="mt-4 border-t border-green-200 pt-2"><span class="text-slate-500 text-sm block mb-1">נציב את ty ו-t2 בתוך משוואה 5:</span>
                                    $\rightarrow t_q = int \rightarrow bool$
                                </li>
                                <li class="mt-4 border-t border-green-200 pt-2"><span class="text-slate-500 text-sm block mb-1">נציב את tq החדש בתוך 7 ו-8:</span>
                                    $int \rightarrow bool = int \rightarrow t_4 \implies t_4 = bool$<br>
                                    $int \rightarrow bool = int \rightarrow t_5 \implies t_5 = bool$<br>
                                    $\rightarrow t_4 = bool, \ t_5 = bool$
                                </li>
                                <li class="mt-4 border-t border-green-200 pt-2"><span class="text-slate-500 text-sm block mb-1">ממשוואות 9, 11 נובע:</span>
                                    $\rightarrow t_3 = bool$<br>
                                    $\rightarrow t_{if} = bool$ <span class="text-xs text-green-600 font-normal">(כי t4 הוא bool)</span>
                                </li>
                                <li class="mt-4 border-t border-green-200 pt-2"><span class="text-slate-500 text-sm block mb-1">נציב את t3 במשוואה 6:</span>
                                    $\rightarrow t_x = int \rightarrow bool$
                                </li>
                                <li class="mt-4 border-t border-green-200 pt-2"><span class="text-slate-500 text-sm block mb-1">נבנה את משוואה 12 (הפונקציה p) עם tx ו-tif:</span>
                                    $\rightarrow t_p = (int \rightarrow bool) \rightarrow bool$
                                </li>
                                <li class="mt-6 border-t border-green-400 pt-4 bg-white p-4 rounded-lg shadow-sm transform scale-105 text-xl"><span class="text-slate-500 text-sm block mb-1">השלב הסופי! נציב את tp ואת tq במשוואה 13:</span>
                                    $(int \rightarrow bool) \rightarrow bool = (int \rightarrow bool) \rightarrow t_{prog}$<br>
                                    <span class="text-red-500 text-2xl mt-2 block">$\implies t_{prog} = bool$ 🎯</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="tip-box">
                    <h4 class="font-bold text-lg mb-2 text-amber-800">סיכום התוצאה למבחן</h4>
                    <p class="text-slate-700">בסיום המעקב, על הסטודנט לרשום: "האלגוריתם סיים בהצלחה ללא סתירות. טיפוס התוכנית הסופי הוא <code>bool</code>". אם הייתם נתקלים בדרך במצב שבו למשל $t_3$ היה מחויב להיות גם $int$ (ממשוואה אחת) וגם $bool$ (ממשוואה אחרת) - הייתם צריכים לעצור, לכתוב Type Error ולציין שהתוכנית לא חוקית!</p>
                </div>

                <!-- NEW EXAM EXAMPLE TRACE (CLASSIC INFERENCE FAILURE) -->
                <div class="deep-dive mt-10">
                    <h3 class="text-2xl font-bold mb-4 text-slate-800">דוגמה ב': מקרה כשל קלאסי במבחנים (Self-Application)</h3>
                    <p class="text-sm text-slate-700 mb-4">
                        ננסה להסיק את הטיפוס של הביטוי הבא:
                    </p>
                    <div class="bg-slate-800 text-slate-200 p-4 rounded font-mono text-center mb-6" dir="ltr">
                        proc (x:?) (x x)
                    </div>
                    <p class="text-sm text-slate-700 mb-4">
                        1. נסמן את $x$ במשתנה טיפוס זמני: $t_x$.<br>
                        2. הביטוי בקוד הוא הפעלה של $x$ על עצמו: <code>(x x)</code>. נסמן את תוצאת ההפעלה ב-$t_{res}$.<br>
                        3. לפי חוק ההפעלה (Call-Exp Rule), מפעילים את $x$ (שהוא $t_x$) על $x$ (שהוא $t_x$), והתוצאה היא $t_{res}$. לכן נוצרת המשוואה הבאה:
                        $$t_x = t_x \rightarrow t_{res}$$
                        4. ה-Unifier מקבל את המשוואה הזו ומנסה לאחד אותה. הוא מבצע בדיקת שייכות (Occurs Check): <strong>האם משתנה הטיפוס $t_x$ מופיע בתוך הביטוי $t_x \rightarrow t_{res}$?</strong><br>
                        5. התשובה היא **כן** ($t_x$ מופיע בצד שמאל של החץ).<br>
                        6. <strong>תוצאה:</strong> ה-Unifier זורק שגיאת <strong>Occurs Check Violation</strong>. התוכנית אינה ניתנת לטיפוס (Not Typeable) בשפת INFERRED!
                    </p>
                </div>
            </div>

        </div>
    </main>

    <script>
        function showTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav'));
            
            document.getElementById(tabId).classList.add('active');
            document.getElementById('btn-' + tabId).classList.add('active-nav');
            
            document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
        }
    </script>
</body>
</html>
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_html_content)

print("Successfully updated 4.html")
