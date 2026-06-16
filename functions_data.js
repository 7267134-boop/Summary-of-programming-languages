const dictionaryData = [
  // --- GENERAL ---
  // LISTS
  {
    id: "car",
    title: "car",
    category: "general",
    subCategory: "lists",
    model: "שולף את האיבר הראשון (הראש) מתוך רשימה או צמד.",
    code: `(car '(a b c d)) ; => a`,
    usage: "במבחן, נשתמש בזה לרוב בעת קריאה של איברים מתוך רשימות AST (כמו exp1) במימוש מנוע ההרצה.",
    detailed: "<strong>אזהרה:</strong> חובה לבדוק שהרשימה אינה ריקה לפני השימוש, אחרת המפרש יקרוס."
  },
  {
    id: "cdr",
    title: "cdr",
    category: "general",
    subCategory: "lists",
    model: "שולף את כל שאר השרשרת (הזנב) ללא האיבר הראשון.",
    code: `(cdr '(a b c d)) ; => (b c d)`,
    usage: "משמש לרקורסיות - כשרוצים להתקדם לאיברים הבאים ברשימה.",
    detailed: "הפעלת <code>cdr</code> על רשימה מחזירה רשימה. חובה להיזהר לא להפעילו על רשימה ריקה."
  },
  {
    id: "cadr",
    title: "cadr",
    category: "general",
    subCategory: "lists",
    model: "שולף את האיבר השני ברשימה.",
    code: `(cadr '(a b c d)) ; => b`,
    usage: "חילוץ איבר שני מתוך מבנים קפואים מ-AST.",
    detailed: "קיצור דרך שווה ערך ל-<code>(car (cdr lst))</code>."
  },
  {
    id: "caddr",
    title: "caddr",
    category: "general",
    subCategory: "lists",
    model: "שולף את האיבר השלישי ברשימה.",
    code: `(caddr '(a b c d)) ; => c`,
    usage: "שימושי בפקודות כמו if-exp שיש להן 3 ביטויים פנימיים (תנאי, אמת, שקר).",
    detailed: "קיצור דרך שווה ערך ל-<code>(car (cdr (cdr lst)))</code>."
  },
  {
    id: "cons",
    title: "cons",
    category: "general",
    subCategory: "lists",
    model: "מדביק איבר בודד לראש של רשימה קיימת.",
    code: `(cons 1 '(2 3)) ; => (1 2 3)`,
    usage: "בניית רשימות תוצאות בהדרגה בתוך פונקציות רקורסיביות.",
    detailed: "יוצר צמד חדש. אם האיבר השני אינו רשימה, תיווצר רשימה מנוקדת (Dotted Pair)."
  },
  {
    id: "list",
    title: "list",
    category: "general",
    subCategory: "lists",
    model: "אורז מספר איברים נפרדים לרשימה אחת חדשה.",
    code: `(list 1 2 3) ; => (1 2 3)`,
    usage: "איסוף מספר ערכים מחושבים מתוך let ואריזתם יחד להמשך.",
    detailed: "חוסך כתיבה של הרבה שרשראות <code>cons</code>."
  },
  {
    id: "append",
    title: "append",
    category: "general",
    subCategory: "lists",
    model: "משרשר שתי רשימות שלמות (או יותר) לרשימה אחת ארוכה.",
    code: `(append '(1 2) '(3 4)) ; => (1 2 3 4)`,
    usage: "שימושי למשל בעת חיבור שתי סביבות, או איחוד תוצאות משני ענפי חישוב.",
    detailed: "בניגוד ל-cons שמוסיף את הרשימה הראשונה כאיבר פנימי, append 'ממיס' את הגבולות."
  },
  {
    id: "length",
    title: "length",
    category: "general",
    subCategory: "lists",
    model: "מחזיר את כמות האיברים הכוללת ברשימה.",
    code: `(length '(a b c)) ; => 3`,
    usage: "שימושי לבדוק אם מספר הארגומנטים שהועברו לפונקציה תואם למה שהיא מצפה לקבל.",
    detailed: "פעולה שלוקחת זמן ריצה שעולה עם גודל הרשימה (O(N))."
  },
  {
    id: "list-ref",
    title: "list-ref",
    category: "general",
    subCategory: "lists",
    model: "שולף איבר מתוך רשימה לפי האינדקס שלו (הספירה מתחילה מ-0).",
    code: `(list-ref '(a b c) 1) ; => b`,
    usage: "בחירת מקרה ספציפי מתוך switch לפי אינדקס שנמצא מראש.",
    detailed: "יש לזכור שזו סריקה ליניארית ולא גישה ישירה כמו במערכים אמיתיים."
  },
  {
    id: "reverse",
    title: "reverse",
    category: "general",
    subCategory: "lists",
    model: "הופך את סדר האיברים ברשימה.",
    code: `(reverse '(1 2 3)) ; => (3 2 1)`,
    usage: "בסיום בניית רשימה ברקורסיית-זנב, שלעיתים מייצרת תוצאה הפוכה.",
    detailed: "מחזיר רשימה חדשה לגמרי בזיכרון, אינו משנה את המקורית."
  },
  {
    id: "list-tail",
    title: "list-tail",
    category: "general",
    subCategory: "lists",
    model: "חותך ומחזיר את הרשימה החל מאינדקס N והלאה.",
    code: `(list-tail '(a b c d) 2) ; => (c d)`,
    usage: "כאשר רוצים לדלג על התחלת הרשימה מסיבות שונות.",
    detailed: "פעולה שווה ערך להפעלת cdr שוב ושוב N פעמים."
  },
  {
    id: "cddr",
    title: "cddr",
    category: "general",
    subCategory: "lists",
    model: "קיצור דרך לשליפת המשך הרשימה החל מהאיבר השלישי.",
    code: `(cddr '(a b c d)) ; => (c d)`,
    usage: "בשאלה 1 או 2, בדילוג על איברים ראשוניים ברשימות פרמטרים או חתימות.",
    detailed: "שווה ערך להרצה של <code>(cdr (cdr lst))</code>."
  },
  {
    id: "cdar",
    title: "cdar",
    category: "general",
    subCategory: "lists",
    model: "קיצור דרך לשליפת הזנב (cdr) של האיבר הראשון ברשימה.",
    code: `(cdar '((a b) c d)) ; => (b)`,
    usage: "בעבודה עם מילונים או רשימות זוגות (כמו סביבות המיוצגות כרשימות של זוגות).",
    detailed: "שווה ערך להרצה של <code>(cdr (car lst))</code>."
  },

  // HIGHER ORDER
  {
    id: "map",
    title: "map",
    category: "general",
    subCategory: "higher-order",
    model: "עובר על כל איבר ברשימה, מפעיל עליו פונקציה, ואוסף את כל התוצאות לרשימה חדשה.",
    code: `(map (lambda (x) (* x 2)) '(1 2 3)) ; => (2 4 6)`,
    usage: "הדרך העיקרית לממש פקודות שמקבלות רשימות, למשל חישוב value-of על רשימת ארגומנטים.",
    detailed: "הפונקציה המועברת חובה שתחזיר ערך, כי התוצאה היא הרשימה המעודכנת."
  },
  {
    id: "apply",
    title: "apply",
    category: "general",
    subCategory: "higher-order",
    model: "לוקח פונקציה ורשימה, 'שופך' את הרשימה ומזריק את איבריה כפרמטרים ישירים לפונקציה.",
    code: `(apply + '(1 2 3)) ; => 6`,
    usage: "בהפעלת פונקציות מתמטיות של Scheme מתוך המפרש, כאשר הערכים שמורים כרשימה (args-list).",
    detailed: "לא ניתן לעשות <code>(+ '(1 2 3))</code>. השימוש ב-apply הכרחי לחלוטין כאן."
  },
  {
    id: "filter",
    title: "filter",
    category: "general",
    subCategory: "higher-order",
    model: "מסנן רשימה: מחזיר רק את האיברים שהפונקציה החזירה עבורם אמת (#t).",
    code: `(filter even? '(1 2 3 4 5)) ; => (2 4)`,
    usage: "מציאת משתנים ספציפיים (לדוגמה הוצאת כל הפרוצדורות מתוך סביבה).",
    detailed: ""
  },
  {
    id: "fold-left",
    title: "fold-left",
    category: "general",
    subCategory: "higher-order",
    model: "צובר ערך תוך כדי מעבר על רשימה משמאל לימין.",
    code: `(fold-left + 0 '(1 2 3)) ; => 6`,
    usage: "סכימת איברים בלולאות מיוחדות, כמו במימוש של פקודת reduce או sum.",
    detailed: ""
  },
  {
    id: "fold-right",
    title: "fold-right",
    category: "general",
    subCategory: "higher-order",
    model: "צובר ערך תוך כדי מעבר על הרשימה מימין לשמאל.",
    code: `(fold-right cons '() '(1 2 3)) ; => (1 2 3)`,
    usage: "בניית מבנים מימין לשמאל כשסדר ההרכבה חשוב.",
    detailed: ""
  },
  {
    id: "for-each",
    title: "for-each",
    category: "general",
    subCategory: "higher-order",
    model: "מפעיל פונקציה על כל האיברים אבל זורק את התוצאות לפח. מיועד לאפקטי לוואי בלבד.",
    code: `(for-each display '("A" "B" "C"))`,
    usage: "בשאלה 2 כשמעדכנים סדרת תאים בזיכרון בעזרת setref! ואין צורך בערכי החזר.",
    detailed: ""
  },

  // LOGIC
  {
    id: "if",
    title: "if",
    category: "general",
    subCategory: "logic",
    model: "צומת החלטות בסיסי (כן/לא).",
    code: `(if (null? lst) 'empty 'not-empty)`,
    usage: "לבדיקות קצרות ופשוטות של תקינות במפרש.",
    detailed: ""
  },
  {
    id: "cond",
    title: "cond",
    category: "general",
    subCategory: "logic",
    model: "רכבת הרים של שאלות - בודק תנאים לפי סדר עד שאחד מצליח (switch).",
    code: `(cond
  ((null? lst) -1)
  ((eqv? val 5) 0)
  (else 1))`,
    usage: "מושלם לפונקציות עזר רקורסיביות במבחן.",
    detailed: ""
  },
  {
    id: "let",
    title: "let",
    category: "general",
    subCategory: "logic",
    model: "הגדרת טיוטות משתנים 'באותו זמן'. המשתנים לא מכירים זה את זה.",
    code: `(let ((x 1) (y 2)) (+ x y))`,
    usage: "בתוך value-of לשמירת הערכים האמיתיים לפני שממשיכים לחשב את גוף הביטוי.",
    detailed: ""
  },
  {
    id: "let-star",
    title: "let*",
    category: "general",
    subCategory: "logic",
    model: "הגדרת טיוטות מדרגות מדרגות. כל משתנה יכול להשתמש בזה שהוגדר מעליו.",
    code: `(let* ((x 5) (y (+ x 2))) y) ; => 7`,
    usage: "כשחישוב ב-value-of דורש תוצאה שכבר חושבה בבלוק ההגדרות הנוכחי.",
    detailed: ""
  },
  {
    id: "begin",
    title: "begin",
    category: "general",
    subCategory: "logic",
    model: "מריץ בלוק קוד וזורק את התוצאות, שומר רק את תוצאת הפקודה האחרונה.",
    code: `(begin
  (display "hello")
  (num-val 5)) ; יוחזר 5`,
    usage: "בשאלה 2 כשצריך קודם לשנות זיכרון (השמה) ואז להחזיר ערך נטול משמעות (כמו 27).",
    detailed: ""
  },
  {
    id: "and",
    title: "and",
    category: "general",
    subCategory: "logic",
    model: "מחזיר אמת רק אם הכל אמת. עוצר בבדיקה הראשונה שנכשלת.",
    code: `(and (> 5 3) (< 1 2)) ; => #f`,
    usage: "לבדיקת עמידה במספר תנאים לפעולות לוגיות.",
    detailed: ""
  },
  {
    id: "or",
    title: "or",
    category: "general",
    subCategory: "logic",
    model: "מחזיר אמת אם אחד הביטויים אמת. עוצר בבדיקה הראשונה שמצליחה.",
    code: `(or (> 5 10) (= 1 1)) ; => #t`,
    usage: "כשאנו רוצים לקבל כל תנאי שעומד בדרישה (למשל סוגי שגיאות מסוימות).",
    detailed: ""
  },
  {
    id: "lambda",
    title: "lambda",
    category: "general",
    subCategory: "logic",
    model: "פונקציה אנונימית להרצה במקום.",
    code: `((lambda (x) (* x 2)) 5) ; => 10`,
    usage: "העברת לוגיקה זריזה ל-map או filter ללא צורך בהגדרת פונקציית עזר מלאה.",
    detailed: ""
  },

  // PREDICATES
  {
    id: "null-q",
    title: "null?",
    category: "general",
    subCategory: "predicates",
    model: "בודק האם הרשימה ריקה.",
    code: `(null? '()) ; => #t`,
    usage: "תנאי העצירה הראשי של כל הרקורסיות.",
    detailed: ""
  },
  {
    id: "pair-q",
    title: "pair?",
    category: "general",
    subCategory: "predicates",
    model: "בודק האם הערך הוא צמד שניתן לבצע עליו car/cdr.",
    code: `(pair? '(1 2)) ; => #t`,
    usage: "בתוך data-structures.scm לאישוש טיפוסים למבנים.",
    detailed: ""
  },
  {
    id: "list-q",
    title: "list?",
    category: "general",
    subCategory: "predicates",
    model: "בודק האם המבנה הוא רשימה שלמה (ולא רק צמד).",
    code: `(list? '(a b c)) ; => #t`,
    usage: "לוודא שהקלט הוא רשימה תקינה.",
    detailed: ""
  },
  {
    id: "symbol-q",
    title: "symbol?",
    category: "general",
    subCategory: "predicates",
    model: "בודק האם זהו סמל שמיועד לזיהוי שמות משתנים.",
    code: `(symbol? 'x) ; => #t`,
    usage: "ב-define-datatype כאשר השדה הוא שם משתנה (כמו identifier).",
    detailed: ""
  },
  {
    id: "number-q",
    title: "number?",
    category: "general",
    subCategory: "predicates",
    model: "בודק האם זהו מספר.",
    code: `(number? 5) ; => #t`,
    usage: "ב-define-datatype לשדה המקבל מספר קבוע.",
    detailed: ""
  },
  {
    id: "boolean-q",
    title: "boolean?",
    category: "general",
    subCategory: "predicates",
    model: "בודק האם הערך הוא אמת/שקר.",
    code: `(boolean? #f) ; => #t`,
    usage: "ב-define-datatype לקופסאות bool-val.",
    detailed: ""
  },
  {
    id: "zero-q",
    title: "zero?",
    category: "general",
    subCategory: "predicates",
    model: "בודק ישירות האם המספר שווה 0.",
    code: `(zero? 0) ; => #t`,
    usage: "בדיקת אפס זריזה במימוש של פקודות כמו zero?-exp במפרש.",
    detailed: ""
  },
  {
    id: "integer-q",
    title: "integer?",
    category: "general",
    subCategory: "predicates",
    model: "בודק האם הערך הוא מספר שלם.",
    code: `(integer? 5) ; => #t`,
    usage: "ב-define-datatype לשם הגדרת שדות המייצגים גודל מערך או אינדקס קשיח.",
    detailed: "חלק ממשפחת בדיקות הטיפוסים הבסיסיות של Scheme."
  },
  {
    id: "string-q",
    title: "string?",
    category: "general",
    subCategory: "predicates",
    model: "בודק האם הערך הוא מחרוזת טקסט.",
    code: `(string? "abc") ; => #t`,
    usage: "אימות קלטים וטיפולי טיפוסים בריצת המפרש.",
    detailed: "מחזיר אמת רק עבור מחרוזות."
  },

  // COMPARISONS
  {
    id: "equal",
    title: "=",
    category: "general",
    subCategory: "comparisons",
    model: "השוואה מתמטית נטו.",
    code: `(= 5 5) ; => #t`,
    usage: "כשהמבחן מבקש להוסיף ביטוי שוויון לאריתמטיקה.",
    detailed: "<strong>אזהרה:</strong> יקריס את המפרש אם יעבירו לו טקסט! השתמש אך ורק למספרים."
  },
  {
    id: "eq-q",
    title: "eq?",
    category: "general",
    subCategory: "comparisons",
    model: "השוואת כתובות זיכרון מהירה.",
    code: `(eq? 'apple 'apple) ; => #t`,
    usage: "נהדר לבדיקת שוויון בין סמלים (שמות משתנים) במנוע.",
    detailed: "לא בטוח להשוואת מספרים במערכות מסוימות."
  },
  {
    id: "eqv-q",
    title: "eqv?",
    category: "general",
    subCategory: "comparisons",
    model: "כמו eq? אבל בטוח גם למספרים.",
    code: `(eqv? 5 5) ; => #t`,
    usage: "החיפוש המומלץ ב-apply-env.",
    detailed: ""
  },
  {
    id: "equal-q",
    title: "equal?",
    category: "general",
    subCategory: "comparisons",
    model: "השוואת עומק שסורקת הכל איבר-איבר.",
    code: `(equal? '(1 2) '(1 2)) ; => #t`,
    usage: "כאשר המבחן מבקש לממש מילונים, חיפושי רשימות או השוואות עמוקות.",
    detailed: ""
  },

  // SEARCH / DICTIONARIES
  {
    id: "assoc",
    title: "assoc",
    category: "general",
    subCategory: "search",
    model: "חיפוש מפתח ברשימת זוגות בעזרת equal?.",
    code: `(assoc 'b '((a 1) (b 2))) ; => (b 2)`,
    usage: "הוצאת ערך ממבני מילון שמממשים לרוב בשאלות של מבחנים.",
    detailed: "הפונקציה מחזירה את הצמד (ה-Pair) כולו. אם המפתח לא קיים, יוחזר #f."
  },
  {
    id: "assq",
    title: "assq",
    category: "general",
    subCategory: "search",
    model: "חיפוש מילון שמשתמש ב-eq? (מהיר).",
    code: `(assq 'b '((a 1) (b 2))) ; => (b 2)`,
    usage: "כאשר המפתחות מובטחים להיות רק סמלים (Symbols).",
    detailed: ""
  },
  {
    id: "assv",
    title: "assv",
    category: "general",
    subCategory: "search",
    model: "חיפוש מילון שמשתמש ב-eqv?.",
    code: `(assv 5 '((1 a) (5 b))) ; => (5 b)`,
    usage: "כשהמפתחות עשויים לכלול מספרים.",
    detailed: ""
  },
  {
    id: "member",
    title: "member",
    category: "general",
    subCategory: "search",
    model: "בודק 'האם אתה בפנים' ברשימה רגילה, לפי equal?.",
    code: `(member 'c '(a b c d)) ; => (c d)`,
    usage: "בדיקת ולידציה של טיפוסים או אישורים של ENUM במבחנים (האם הערך ברשימה המותרת).",
    detailed: "מחזיר את שאר הרשימה מאותה נקודה. אם לא קיים, מחזיר #f."
  },
  {
    id: "memq",
    title: "memq",
    category: "general",
    subCategory: "search",
    model: "בודק האם האיבר בפנים, משתמש ב-eq?.",
    code: `(memq 'c '(a b c)) ; => (c)`,
    usage: "חיפוש מהיר של סמלים ברשימות.",
    detailed: ""
  },
  {
    id: "memv",
    title: "memv",
    category: "general",
    subCategory: "search",
    model: "בודק האם האיבר בפנים, משתמש ב-eqv?.",
    code: `(memv 5 '(1 5 10)) ; => (5 10)`,
    usage: "מושלם לבדיקת מספרים/משתנים.",
    detailed: ""
  },

  // VECTORS
  {
    id: "make-vector",
    title: "make-vector",
    category: "general",
    subCategory: "vectors",
    model: "יוצר מערך בגודל רצוי, עם ערך ברירת מחדל לכל תאיו.",
    code: `(make-vector 3 0) ; => #(0 0 0)`,
    usage: "כשהמבחן דורש מימוש 'מערכים משתנים' ב-EXPLICIT-REFS.",
    detailed: ""
  },
  {
    id: "vector-ref",
    title: "vector-ref",
    category: "general",
    subCategory: "vectors",
    model: "קריאה ישירה של תא מהמערך לפי אינדקס (O(1)).",
    code: `(vector-ref #(a b c) 1) ; => b`,
    usage: "שליפת ערכים ממערכים שמימשנו במפרש.",
    detailed: ""
  },
  {
    id: "vector-set",
    title: "vector-set!",
    category: "general",
    subCategory: "vectors",
    model: "השמה ישירה (דורס ערך בתא ספציפי במערך).",
    code: `(vector-set! my-vec 1 'apple)`,
    usage: "הזרקת ערכים חדשים או שינוי מצב (Mutation) במערך.",
    detailed: ""
  },
  {
    id: "vector-length",
    title: "vector-length",
    category: "general",
    subCategory: "vectors",
    model: "מחזיר את הגודל המוגדר של המערך.",
    code: `(vector-length #(a b c)) ; => 3`,
    usage: "בדיקות גבול למניעת שגיאות Out-of-bounds.",
    detailed: ""
  },
  {
    id: "vector-q",
    title: "vector?",
    category: "general",
    subCategory: "vectors",
    model: "מזהה האם הטיפוס הוא מערך.",
    code: `(vector? #(1 2)) ; => #t`,
    usage: "במימוש של מערכת הטיפוסים לזיהוי קופסאות מסוג array-val.",
    detailed: ""
  },

  // STRINGS AND DEBUG
  {
    id: "string-append",
    title: "string-append",
    category: "general",
    subCategory: "strings",
    model: "חיבור מחרוזות למחרוזת אחת.",
    code: `(string-append "Error " "here") ; => "Error here"`,
    usage: "הכנת הודעות שגיאה קריאות.",
    detailed: ""
  },
  {
    id: "string-equal-q",
    title: "string=?",
    category: "general",
    subCategory: "strings",
    model: "השוואה אבסולוטית בין שתי מחרוזות טקסט.",
    code: `(string=? "hello" "hello") ; => #t`,
    usage: "בדיקה אם מחרוזת קלט שווה לשם רצוי.",
    detailed: ""
  },
  {
    id: "symbol-to-string",
    title: "symbol->string",
    category: "general",
    subCategory: "strings",
    model: "המרת סמל למחרוזת שניתן להדפיס או להוסיף לטקסט.",
    code: `(symbol->string 'my-var) ; => "my-var"`,
    usage: "בהדפסת שמות משתנים כחלק מהודעת eopl:error מותאמת אישית.",
    detailed: ""
  },
  {
    id: "string-to-symbol",
    title: "string->symbol",
    category: "general",
    subCategory: "strings",
    model: "המרת טקסט רגיל לסמל מזוהה זיכרון.",
    code: `(string->symbol "x") ; => 'x`,
    usage: "נדיר במבחנים, אך מועיל ביצירת משתנים דינמיים.",
    detailed: ""
  },
  {
    id: "display",
    title: "display",
    category: "general",
    subCategory: "strings",
    model: "הדפסת טקסט אלטרנטיבית שלא יורדת שורה.",
    code: `(display "hello")`,
    usage: "הדפסות דיבאג רציפות.",
    detailed: ""
  },
  {
    id: "newline",
    title: "newline",
    category: "general",
    subCategory: "strings",
    model: "מדפיס ירידת שורה למסך הטרמינל.",
    code: `(newline)`,
    usage: "אחרי הדפסת טקסטים בעזרת display.",
    detailed: ""
  },
  {
    id: "error",
    title: "error",
    category: "general",
    subCategory: "strings",
    model: "פקודת עזר של סכמה (או eopl:error) לקריסת התוכנית המבוקרת.",
    code: `(eopl:error 'value-of "not found ~s" var)`,
    usage: "טיפול במקרי קצה, משתנים לא קיימים, והדפסות יפות למשתמש.",
    detailed: ""
  },
  {
    id: "eopl-error",
    title: "eopl:error",
    category: "general",
    subCategory: "strings",
    model: "פונקציית זריקת השגיאות הרשמית של ספריית EoPL.",
    code: `(eopl:error 'value-of "unsupported type ~s" val)`,
    usage: "בכל מקרה של שגיאת ריצה, אימות טיפוסים שנכשל, או מפתח שלא נמצא בסביבה.",
    detailed: "מדפיסה הודעת שגיאה מפורטת ומפסיקה את הרצת המפרש באופן מבוקר."
  },

  // MATH
  {
    id: "modulo",
    title: "modulo",
    category: "general",
    subCategory: "math",
    model: "שארית חלוקה חכמה (לרוב חיובית).",
    code: `(modulo 10 3) ; => 1`,
    usage: "מימוש פעולות מודולו מורחבות בסביבת ההרצה.",
    detailed: ""
  },
  {
    id: "quotient",
    title: "quotient",
    category: "general",
    subCategory: "math",
    model: "חלוקת שלמים, השמטת השארית.",
    code: `(quotient 10 3) ; => 3`,
    usage: "מימוש פקודות של חלוקה ללא נקודה עשרונית.",
    detailed: ""
  },
  {
    id: "remainder",
    title: "remainder",
    category: "general",
    subCategory: "math",
    model: "שארית חלוקה רגילה.",
    code: `(remainder 10 3) ; => 1`,
    usage: "כלי נוסף במימוש אריתמטיקה.",
    detailed: ""
  },
  {
    id: "even-q",
    title: "even?",
    category: "general",
    subCategory: "math",
    model: "בודק האם המספר זוגי.",
    code: `(even? 4) ; => #t`,
    usage: "מימוש של אופרטור זוגי/אי זוגי בשפת המבחן.",
    detailed: ""
  },
  {
    id: "odd-q",
    title: "odd?",
    category: "general",
    subCategory: "math",
    model: "בודק האם המספר אי-זוגי.",
    code: `(odd? 3) ; => #t`,
    usage: "בדיקות תנאי אריתמטיות.",
    detailed: ""
  },
  {
    id: "max",
    title: "max",
    category: "general",
    subCategory: "math",
    model: "שולף את המספר הגדול ביותר.",
    code: `(max 1 9 5) ; => 9`,
    usage: "מימוש פקודות מערכים והגדרות אורך.",
    detailed: ""
  },
  {
    id: "min",
    title: "min",
    category: "general",
    subCategory: "math",
    model: "שולף את המספר הקטן ביותר.",
    code: `(min 1 9 5) ; => 1`,
    usage: "שימושי למדידת חסמים.",
    detailed: ""
  },
  {
    id: "abs",
    title: "abs",
    category: "general",
    subCategory: "math",
    model: "ערך מוחלט.",
    code: `(abs -5) ; => 5`,
    usage: "הרחבות מתמטיות של המבחן.",
    detailed: ""
  },

  // MUTATION
  {
    id: "set-bang",
    title: "set!",
    category: "general",
    subCategory: "mutation",
    model: "השמה ישירה על משתנה (דורס את הערך הקיים).",
    code: `(set! x 10)`,
    usage: "לרוב לא יהיה שימוש במבחן כי אנו ממשים Store בעזרת setref! ולא set! טבעי.",
    detailed: "פונקציה 'אלימה' של סכמה."
  },
  {
    id: "set-car-bang",
    title: "set-car!",
    category: "general",
    subCategory: "mutation",
    model: "דריסת האיבר הראשון ברשימה קיימת (Physical Mutation).",
    code: `(set-car! lst 99)`,
    usage: "נדיר במבחנים רגילים, אך מופיע לעיתים בשאלות מתקדמות על סביבות (Env) רקורסיביות.",
    detailed: ""
  },
  {
    id: "set-cdr-bang",
    title: "set-cdr!",
    category: "general",
    subCategory: "mutation",
    model: "דריסת המשך הרשימה.",
    code: `(set-cdr! lst '(1 2))`,
    usage: "יצירת מבנים מעגליים מורכבים.",
    detailed: ""
  },

  // EOPL TYPES
  {
    id: "list-of",
    title: "list-of",
    category: "general",
    subCategory: "eopl-types",
    model: "יוצר בודק טיפוסים על כל איברי רשימה.",
    code: `(list-of expval?)`,
    usage: "משמש ב-define-datatype כאשר יש לנו קופסה שמכילה סדרה של ערכים מטיפוס ספציפי.",
    detailed: ""
  },
  {
    id: "always-q",
    title: "always?",
    category: "general",
    subCategory: "eopl-types",
    model: "כלי של EoPL שמעביר כל טיפוס שהוא.",
    code: `(always? 5) ; => #t`,
    usage: "כאשר לא אכפת לנו מאיזה סוג משתנה נשמר בקופסה.",
    detailed: ""
  },
  {
    id: "maybe",
    title: "maybe",
    category: "general",
    subCategory: "eopl-types",
    model: "כלי שמאפשר קבלת טיפוס ספציפי או השארת הערך ריק (#f).",
    code: `((maybe environment?) #f) ; => #t`,
    usage: "כשצריך לתמוך בסביבות משתנות, כמו שמירת Closure שלפעמים אין לו סביבה.",
    detailed: ""
  },

  // --- LANG ---
  // LEXER
  {
    id: "the-lexical-spec",
    title: "the-lexical-spec",
    category: "lang",
    subCategory: "lexer",
    model: "מילון השפה. מגדיר איך אוספים תווים והופכים אותם למילים.",
    code: `(define the-lexical-spec
  '((whitespace (whitespace) skip)
    (number (digit (arbno digit)) number)))`,
    usage: "שינוי כללים של מילים בסיסיות (כמו צורות ייצוג מספרים או הערות).",
    detailed: "כמעט תמיד לא ניגע פה אלא אם נתבקש במפורש לתמוך בסוג משתנים חדש."
  },
  {
    id: "letter",
    title: "letter",
    category: "lang",
    subCategory: "lexer",
    model: "מזהה תו בודד של אות באנגלית (A-Z, a-z).",
    code: `(identifier (letter (arbno letter)) symbol)`,
    usage: "הגדרת מבנה של שמות משתנים חוקיים.",
    detailed: ""
  },
  {
    id: "digit",
    title: "digit",
    category: "lang",
    subCategory: "lexer",
    model: "מזהה תו ספרתי (0-9).",
    code: `(number (digit (arbno digit)) number)`,
    usage: "הגדרת איסוף מספרים.",
    detailed: ""
  },
  {
    id: "any",
    title: "any",
    category: "lang",
    subCategory: "lexer",
    model: "כל תו שהוא מתוך מקלדת האותיות.",
    code: `(string ("\"" (arbno any) "\"") string)`,
    usage: "הגדרת מחרוזות שמקבלות הכל.",
    detailed: ""
  },
  {
    id: "whitespace",
    title: "whitespace",
    category: "lang",
    subCategory: "lexer",
    model: "רווחים, כרטיסיות (Tab) ושורות חדשות.",
    code: `(whitespace (whitespace) skip)`,
    usage: "כדי לומר לסורק להתעלם מרווחים מיותרים בתוכנית המקור.",
    detailed: ""
  },
  {
    id: "skip",
    title: "skip",
    category: "lang",
    subCategory: "lexer",
    model: "פקודה פנימית האומרת לסורק לזרוק את המידע לאחר הקריאה.",
    code: `(comment ("%" (arbno any)) skip)`,
    usage: "מושלם לבניית התעלמות מהערות קוד (Comments).",
    detailed: ""
  },
  {
    id: "symbol-lexer",
    title: "symbol",
    category: "lang",
    subCategory: "lexer",
    model: "הפיכת רצף תווים לסמל מזוהה בזיכרון Scheme.",
    code: `(identifier (letter) symbol)`,
    usage: "הכרחי לכל דבר שהוא שם-משתנה (Identifier).",
    detailed: ""
  },
  {
    id: "number-lexer",
    title: "number",
    category: "lang",
    subCategory: "lexer",
    model: "הפיכת רצף ספרות לערך מתמטי של Scheme.",
    code: `(number (digit) number)`,
    usage: "זיהוי מספרים לצורכי אריתמטיקה.",
    detailed: ""
  },

  // PARSER
  {
    id: "the-grammar",
    title: "the-grammar",
    category: "lang",
    subCategory: "parser",
    model: "ספר הדקדוק. בונה את עץ התחביר (AST) ממילים (Tokens).",
    code: `(define the-grammar
  '((expression (identifier) var-exp)
    (expression ("if" expression "then" expression) if-exp)))`,
    usage: "הוספת פקודות חדשות לשפה במבחן מחייבת הוספה כאן.",
    detailed: "כל ביטוי שנכתב בין מירכאות (\"if\") ייזרק על ידי המנתח, והמידע הנותר יגיע ל-interp."
  },
  {
    id: "arbno",
    title: "arbno",
    category: "lang",
    subCategory: "parser",
    model: "אפס או יותר הופעות ברצף של תבנית. אורז את כולן לרשימה.",
    code: `(expression ("begin" (arbno expression) "end") begin-exp)`,
    usage: "לכל פקודה שדורשת בלוק ביטויים ללא פסיקים (למשל Switch / Cases).",
    detailed: "ברגע ששמים תבנית ב-arbno, ב-interp חובה לרוץ עליה בעזרת map או for-each."
  },
  {
    id: "separated-list",
    title: "separated-list",
    category: "lang",
    subCategory: "parser",
    model: "רשימה של ביטויים המופרדת על ידי תו פרימיטיבי (למשל פסיק).",
    code: `(expression ("sum" "(" (separated-list expression ",") ")") sum-exp)`,
    usage: "חובה כאשר פונקציה דורשת פרמטרים מופרדים (f(x, y, z)).",
    detailed: ""
  },
  {
    id: "non-terminals",
    title: "non-terminals",
    category: "lang",
    subCategory: "parser",
    model: "קטגוריות משנה פרטיות (כמו my-case) ולא חלקי expression ראשיים.",
    code: `(my-case ("case" expression ":" expression) simple-case)`,
    usage: "ארגון מובנה ומופרד של חלקי פקודה, כדי שלא יופיעו במקומות לא נכונים.",
    detailed: "כל חריגה מקטגוריית 'expression' דורשת בניית מערכת datatype נפרדת ב-data-structures!"
  },

  // --- DATA STRUCTURES ---
  // DATATYPE
  {
    id: "define-datatype",
    title: "define-datatype",
    category: "data-structures",
    subCategory: "datatype",
    model: "המפעל ליצירת קופסאות טיפוסים (Classes) למפרש.",
    code: `(define-datatype expval expval?
  (num-val (num number?))
  (bool-val (bool boolean?)))`,
    usage: "יצירת טיפוסי משתנים חדשים (מערכים, מילונים) או מבני AST (למשל my-case).",
    detailed: "מגדיר משפחה וצורות אריזה קשיחות השולטות בטיפוסי הנתונים בזיכרון."
  },
  {
    id: "environment-type",
    title: "environment",
    category: "data-structures",
    subCategory: "datatype",
    model: "משפחת הקופסאות של סביבות המשתנים.",
    code: `(define-datatype environment environment?
  (empty-env)
  (extend-env (var symbol?) (val expval?) (env environment?)))`,
    usage: "מוסתר לרוב, אך לעיתים יש לבנות פונקציות סביבה חדשות לשאלות מתקדמות.",
    detailed: ""
  },

  // EXPVAL
  {
    id: "expval",
    title: "expval",
    category: "data-structures",
    subCategory: "expval",
    model: "מחלקת העל הכוללת. כל דבר שהמפרש מחשב חייב להיות ארוז בה.",
    code: `(cases expval v
  (num-val (n) n))`,
    usage: "בדיקת ולידציה של פלט המנוע.",
    detailed: ""
  },
  {
    id: "expval-to-num",
    title: "expval->num",
    category: "data-structures",
    subCategory: "expval",
    model: "חולץ מספר טהור מקופסה, מתריע אם זו אינה קופסת מספרית.",
    code: `(define expval->num
  (lambda (v)
    (cases expval v
      (num-val (num) num)
      (else (expval-extractor-error 'num v)))))`,
    usage: "לפני ביצוע אריתמטיקה ב-interp.",
    detailed: ""
  },
  {
    id: "expval-to-bool",
    title: "expval->bool",
    category: "data-structures",
    subCategory: "expval",
    model: "חולץ בוליאני אמיתי מתוך קופסת bool-val.",
    code: `(if (expval->bool val) ...)`,
    usage: "בדיקות תנאים (למשל if-exp או guard).",
    detailed: ""
  },
  {
    id: "expval-to-proc",
    title: "expval->proc",
    category: "data-structures",
    subCategory: "expval",
    model: "חולץ פרוצדורה ארוזה (Closure).",
    code: `(let ((proc (expval->proc proc-val))) ...)`,
    usage: "לפני קריאה ל-apply-procedure.",
    detailed: ""
  },
  {
    id: "expval-to-list",
    title: "expval->list",
    category: "data-structures",
    subCategory: "expval",
    model: "פותח קופסת רשימה (במידה והוספת list-val במבחן).",
    code: `(cases expval v (list-val (lst) lst))`,
    usage: "לפני הפעלת map או פונקציות Scheme על רשימות.",
    detailed: ""
  },
  {
    id: "expval-to-tuple-list",
    title: "expval->tuple-list",
    category: "data-structures",
    subCategory: "expval",
    model: "פותחן קופסאות ייעודי לשאלות מילונים או Tuples.",
    code: `(cases expval v (tuple-val (lst) lst))`,
    usage: "רק אם נתבקשת ליצור תשתית Tuple במבחן.",
    detailed: ""
  },
  {
    id: "expval-to-ref",
    title: "expval->ref",
    category: "data-structures",
    subCategory: "expval",
    model: "חולץ כתובת/הפניה בזיכרון (Reference) מתוך קופסת ref-val.",
    code: `(define expval->ref
  (lambda (v)
    (cases expval v
      (ref-val (ref) ref)
      (else (expval-extractor-error 'reference v)))))`,
    usage: "במנוע ההרצה (interp) כאשר אנו מחזיקים ערך ומעוניינים לבצע עליו deref או setref!.",
    detailed: "מחלץ את ה-Reference הגולמי מתוך העטיפה הבטוחה של ExpVal."
  },
  {
    id: "expval-extractor-error",
    title: "expval-extractor-error",
    category: "data-structures",
    subCategory: "expval",
    model: "זורק הודעת שגיאה מסודרת על אי התאמת קופסאות.",
    code: `(else (expval-extractor-error 'num v))`,
    usage: "תמיד בתחתית (else) של פותחן קופסאות.",
    detailed: "פלט דוגמה: Error: expected num but got #(struct:list-val (1 2))"
  },

  // ENV
  {
    id: "empty-env",
    title: "empty-env",
    category: "data-structures",
    subCategory: "env",
    model: "יצירת סביבה ראשונית וריקה.",
    code: `(define init-env (lambda () (empty-env)))`,
    usage: "כנקודת פתיחה או כאשר רוצים סביבה נקייה.",
    detailed: ""
  },
  {
    id: "extend-env",
    title: "extend-env",
    category: "data-structures",
    subCategory: "env",
    model: "הנחת 'פתק' משתנה בסביבה נוכחית (מסתיר פתקים ישנים בעלי אותו שם).",
    code: `(value-of body-exp (extend-env var-name val env))`,
    usage: "בפקודות let ויצירת משתנים זמניים.",
    detailed: ""
  },
  {
    id: "extend-env-rec",
    title: "extend-env-rec",
    category: "data-structures",
    subCategory: "env",
    model: "מרחיב סביבה באופן רקורסיבי, מאפשר לפונקציות להכיר את שמן.",
    code: `(letrec-exp (names vars bodies letrec-body)
  (value-of letrec-body 
    (extend-env-rec names vars bodies env)))`,
    usage: "כאשר מוסיפים דרכים חדשות להכריז על פונקציות (למשל מודולים או class).",
    detailed: "חייב לקבל 3 רשימות באותו אורך!"
  },
  {
    id: "apply-env",
    title: "apply-env",
    category: "data-structures",
    subCategory: "env",
    model: "מחפש ומושך ערך השייך למשתנה מסוים מהסביבה.",
    code: `(var-exp (var-name) (apply-env env var-name))`,
    usage: "תרגום קבוע של משתנים (var-exp) במנוע הרצה לערכים.",
    detailed: "שימו לב: בשאלה 2 (IMPLICIT) היא מחזירה Pointer, ולא ערך ממשי!"
  },

  // --- INTERP ---
  // EVAL
  {
    id: "value-of",
    title: "value-of",
    category: "interp",
    subCategory: "eval",
    model: "הלב הפועם של המפרש. מקבל קוד (AST) וסביבה, ומחזיר תוצאה (ExpVal).",
    code: `(define value-of
  (lambda (exp env)
    (cases expression exp ...)))`,
    usage: "לכל פקודה שצריך לחשב את הערך שלה לפני שימוש (למשל ארגומנט או תנאי).",
    detailed: "הצינור קשיח: מקבל 'expression', ומחזיר תמיד 'expval'."
  },
  {
    id: "cases-expression",
    title: "cases expression",
    category: "interp",
    subCategory: "eval",
    model: "הנתב הרשמי לזיהוי וחילוץ שדות מה-AST.",
    code: `(cases expression exp
  (assign-exp (var exp1) ...))`,
    usage: "בכל פקודה חדשה במפרש, חובה להוסיף 'case' עם השם שהוגדר בגרמר.",
    detailed: "שגיאה במיפוי שדות הסוגריים תגרום לקריסת ריצה."
  },
  {
    id: "cases-expval",
    title: "cases expval",
    category: "interp",
    subCategory: "eval",
    model: "פירוק אריזות של תהליך ההרצה, בדומה למה שקורה בפותחנים.",
    code: `(cases expval val
  (num-val (n) (num-val (+ n 1))))`,
    usage: "לעיתים משתמשים בזה בתוך interp כדי לבצע עבודת חילוץ מהירה (Inline).",
    detailed: ""
  },
  {
    id: "apply-procedure",
    title: "apply-procedure",
    category: "interp",
    subCategory: "eval",
    model: "מרחיב את סביבת הפונקציה הקפואה עם הפרמטרים החדשים, ומריץ.",
    code: `(let ((new-env (extend-env var val saved-env)))
  (value-of body new-env))`,
    usage: "כל העברת פרמטרים או יצירת scope של closure.",
    detailed: "ההרחבה מתבצעת על סביבת ה-saved-env ולא הסביבה הקוראת (Lexical Scoping)."
  },
  {
    id: "cases-general",
    title: "cases (כללי)",
    category: "interp",
    subCategory: "eval",
    model: "מבנה הנתב הכללי של EoPL למיפוי ושליפת שדות מתוך Datatypes.",
    code: `(cases datatype-name value
  (variant-name (fields...) expression)
  (else default-expr))`,
    usage: "בכל מקום במפרש שבו עובדים עם datatype (כמו expression, expval, env, proc, type).",
    detailed: "מבטיח חילוץ שדות בטוח ומהיר על פי החתימות של ה-variants שהוגדרו ב-define-datatype."
  },

  // CONSTRUCTORS
  {
    id: "num-val",
    title: "num-val",
    category: "interp",
    subCategory: "constructors",
    model: "אורז מספר אמיתי לקופסת ExpVal.",
    code: `(const-exp (num) (num-val num))`,
    usage: "חובה לעטוף כל ערך מתמטי שמחזירים מ-value-of.",
    detailed: ""
  },
  {
    id: "bool-val",
    title: "bool-val",
    category: "interp",
    subCategory: "constructors",
    model: "אורז #t או #f לקופסת ExpVal.",
    code: `(zero?-exp (exp1) (bool-val (zero? ...)))`,
    usage: "אריזת תוצאות השוואות או בדיקות.",
    detailed: ""
  },
  {
    id: "list-val",
    title: "list-val",
    category: "interp",
    subCategory: "constructors",
    model: "אורז רשימת ExpVal לטיפוס מרכזי (אם נתבקש במבחן).",
    code: `(list-val (list (num-val 1) (num-val 2)))`,
    usage: "יצירת מערכים דינמיים ורשימות בזיכרון של המפרש.",
    detailed: ""
  },
  {
    id: "proc-val",
    title: "proc-val",
    category: "interp",
    subCategory: "constructors",
    model: "אורז פרוצדורה מחושבת (closure) בתוך קופסת ExpVal.",
    code: `(proc-val (procedure var body env))`,
    usage: "ב-value-of, בעת פיענוח ביטוי הגדרת פונקציה (proc-exp) אנו מחזירים proc-val.",
    detailed: "אריזה פנימית המאפשרת להעביר פונקציות כערכים (first-class values)."
  },

  // --- Q2 (STORE & REFS) ---
  // STORE
  {
    id: "newref",
    title: "newref",
    category: "q2",
    subCategory: "store",
    model: "מקצה תא פיזי בזיכרון הפיקטיבי, דוחף אליו ערך ומחזיר מצביע (Pointer).",
    code: `(let ((ptr (newref (num-val 5)))) ...)`,
    usage: "שאלה 2: כל יצירת משתנה חדש (let/arguments) דורשת newref לפני השמה ב-Env.",
    detailed: ""
  },
  {
    id: "deref",
    title: "deref",
    category: "q2",
    subCategory: "store",
    model: "ניגש לזיכרון הפיקטיבי לפי המצביע ושולף את הערך ששמור שם.",
    code: `(deref my-pointer)`,
    usage: "ב-var-exp בשאלה 2, הסביבה מחזירה מצביע, חובה למשוך את הערך עם deref.",
    detailed: ""
  },
  {
    id: "setref",
    title: "setref!",
    category: "q2",
    subCategory: "store",
    model: "ניגש למצביע קיים במחסן, ודורס את הערך הישן ששם בערך חדש.",
    code: `(setref! my-pointer (num-val 99))`,
    usage: "מימוש פקודת ההשמה הרשמית של השפה (assign-exp).",
    detailed: ""
  },
  {
    id: "ref-val",
    title: "ref-val",
    category: "q2",
    subCategory: "store",
    model: "אורז כתובת/הפנייה בזיכרון (Reference) בתוך קופסת ExpVal.",
    code: `(ref-val ref)`,
    usage: "ב-index-exp או getref, כאשר אנו רוצים להחזיר את ההפניה עצמה ולא את הערך שבתוכה.",
    detailed: "חיוני ביותר בשאלות מערכים/מצביעים ב-Explicit Refs כדי לאפשר שימוש ב-setref! ו-deref."
  },

  // AST-Q2
  {
    id: "assign-exp",
    title: "assign-exp",
    category: "q2",
    subCategory: "ast-q2",
    model: "ביטוי ה-AST המבצע השמה (x = 5). מחפש את המצביע ב-env ומשנה אותו ב-Store.",
    code: `(assign-exp (var exp1)
  (let ((val (value-of exp1 env)))
    (begin
      (setref! (apply-env env var) val)
      (num-val 27))))`,
    usage: "הצומת הבסיסית להכנסת נתונים בשאלה 2.",
    detailed: ""
  },
  {
    id: "begin-exp",
    title: "begin-exp",
    category: "q2",
    subCategory: "ast-q2",
    model: "ביטוי לביצוע מספר פקודות המייצרות Mutation ברצף.",
    code: `(begin-exp (exps)
  (let loop ((exps exps))
    (if (null? (cdr exps))
        (value-of (car exps) env)
        (begin
          (value-of (car exps) env)
          (loop (cdr exps))))))`,
    usage: "הרצת בלוקים שמכילים השמות רבות.",
    detailed: ""
  },
  {
    id: "var-exp-q2",
    title: "var-exp",
    category: "q2",
    subCategory: "ast-q2",
    model: "משיכת משתנה בסביבת Implicit Refs (דורשת deref).",
    code: `(var-exp (var) (deref (apply-env env var)))`,
    usage: "ההבדל הכי קריטי בין שאלה 1 לשאלה 2.",
    detailed: ""
  },

  // INFRA
  {
    id: "let-exp-implicit",
    title: "let-exp (Implicit)",
    category: "q2",
    subCategory: "infra",
    model: "יצירת משתנה זמני מקומי המצריך שימוש ב-newref לפני extend-env.",
    code: `(let-exp (var exp1 body)
  (let ((val (value-of exp1 env)))
    (value-of body 
      (extend-env var (newref val) env))))`,
    usage: "בשאלה 2, משתני let שמורים במחסן הפיזי ולכן חובה להעביר pointer ל-Env.",
    detailed: ""
  },
  {
    id: "apply-procedure-implicit",
    title: "apply-procedure (Implicit)",
    category: "q2",
    subCategory: "infra",
    model: "המנגנון להעברת פרמטרים. דורש newref (Pass by value) בסביבת Implicit.",
    code: `(let ((new-env (extend-env var (newref val) saved-env)))
  (value-of body new-env))`,
    usage: "בשאלה 2, הארגומנטים הופכים למשתנים פיזיים במחסן.",
    detailed: ""
  }
];

window.dictionaryData = dictionaryData;
