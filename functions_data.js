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
    model: "שולף את הערך המספרי הגולמי (Scheme number) מתוך עטיפת num-val. אם הקופסה מכילה טיפוס אחר, תיזרק שגיאת זמן ריצה.",
    code: `(define expval->num
  (lambda (v)
    (cases expval v
      (num-val (num) num)
      (else (expval-extractor-error 'num v)))))`,
    usage: "לפני ביצוע פעולות אריתמטיות במפרש (כמו חיבור או חיסור) על ערכים שהתקבלו מחישוב ביטויים בתוכנית.",
    detailed: "<strong>מקור מבחנים:</strong> תבנית יסוד שחוזרת בשאלות בהן מוסיפים אופרטורים מתמטיים חדשים, פעולות על אינדקסים או הרחבות הדורשות חישוב.<br><strong>הבעיה התאורטית:</strong> שפת ה-Host (Scheme) לא מכירה את הטיפוס המופשט של שפת ה-Guest (קופסת ה-num-val). החולץ מתפקד כ-Guard: הוא מוודא בזמן ריצה שהערך הוא אכן מספר, מסיר את העטיפה, ורק אז מאפשר לפונקציות ה-Scheme הרגילות (כמו +, zero?) לפעול עליו בבטחה."
  },
  {
    id: "expval-to-bool",
    title: "expval->bool",
    category: "data-structures",
    subCategory: "expval",
    model: "שולף את הערך הבוליאני הגולמי (#t או #f) מתוך עטיפת bool-val, כדי לאפשר למפרש לקבל החלטות מותנות.",
    code: `(define expval->bool
  (lambda (v)
    (cases expval v
      (bool-val (bool) bool)
      (else (expval-extractor-error 'bool v)))))`,
    usage: "הכרחי למימוש מבני בקרה כמו if-exp או while-exp, שבהם המפרש עצמו צריך לדעת לאיזה ענף להמשיך.",
    detailed: "<strong>מקור מבחנים:</strong> נדרש כאשר מממשים לולאות חדשות, Guards או פקודות התניה מורכבות במבחן.<br><strong>הבעיה התאורטית:</strong> פקודת ה-if של Scheme מצפה לקבל #t או #f. אם נעביר לה קופסת bool-val שלמה, השפה המארחת תמיד תתייחס אליה כאל ערך אמת (כי הקופסה עצמה קיימת בזיכרון, גם אם בתוכה יש #f). החולץ מבטיח שאנו בודקים את הערך הלוגי האמיתי שמאוחסן בפנים."
  },
  {
    id: "expval-to-proc",
    title: "expval->proc",
    category: "data-structures",
    subCategory: "expval",
    model: "שולף את ייצוג הפרוצדורה (Closure) מתוך קופסת proc-val, לקראת הפעלתה עם ארגומנטים חדשים.",
    code: `(define expval->proc
  (lambda (v)
    (cases expval v
      (proc-val (proc) proc)
      (else (expval-extractor-error 'proc v)))))`,
    usage: "במימוש call-exp, מיד לאחר הערכת ה-rator ולפני העברתו לפונקציית apply-procedure.",
    detailed: "<strong>מקור מבחנים:</strong> קריטי בשאלות הנוגעות להעברת פונקציות כארגומנטים, יצירת מבני נתונים המכילים פונקציות (כמו אובייקטים), או הרחבת אופן הקריאה לפונקציות.<br><strong>הבעיה התאורטית:</strong> לא כל ביטוי הניתן להערכה הוא אכן פונקציה. החולץ הזה מאבטח את נקודת הקריאה (Call) בכך שהוא מוודא שהמשתמש אינו מנסה להפעיל מספר או רשימה כאילו היו פרוצדורה, ומחלץ את ה-Closure שמכיל את הקוד וסביבת השמירה."
  },
  {
    id: "expval-to-list",
    title: "expval->list",
    category: "data-structures",
    subCategory: "expval",
    model: "פותח קופסת list-val ומחזיר את רשימת הערכים שבתוכה, במידה ושפת היעד תומכת ברשימות.",
    code: `(define expval->list
  (lambda (v)
    (cases expval v
      (list-val (lst) lst)
      (else (expval-extractor-error 'list v)))))`,
    usage: "כאשר מוסיפים פעולות על רשימות (כמו car, cdr, null?) וצריך לעבוד עליהן ברמת ה-Scheme.",
    detailed: "<strong>מקור מבחנים:</strong> הרחבה נפוצה מאוד במבחנים המשלבים מבני נתונים דינמיים, כגון הוספת תמיכה מובנית במערכים, רשימות או עצים.<br><strong>הבעיה התאורטית:</strong> כדי לבצע פעולות רקורסיביות על רשימה בשפת היעד, המפרש חייב לפרק את הקופסה, לבצע את הפעולה (למשל car) על הרשימה הגולמית ב-Scheme, ולרוב לארוז שוב את התוצאה בחזרה לתוך קופסת expval חדשה."
  },
  {
    id: "expval-to-tuple-list",
    title: "expval->tuple-list",
    category: "data-structures",
    subCategory: "expval",
    model: "שולף רשימת ערכים מתוך קופסת tuple-val, המייצגת אוסף מאוגד של נתונים תחת מבנה אחד.",
    code: `(define expval->tuple-list
  (lambda (v)
    (cases expval v
      (tuple-val (lst) lst)
      (else (expval-extractor-error 'tuple v)))))`,
    usage: "בהרחבות שפה הדורשות השמות מרובות (Multiple Assignment) או פונקציות המחזירות מספר ערכים במקביל.",
    detailed: "<strong>מקור מבחנים:</strong> מופיע בשאלות ספציפיות על Tuples (כמו מועד 57), מילונים, או מנגנוני פירוק מבנים (Destructuring).<br><strong>הבעיה התאורטית:</strong> Tuple מייצג רצף של ערכים (המאוחסן לרוב כרשימה) שמתנהג כיחידה אחת בשפת היעד. החולץ מאפשר למפרש לחשוף את רצף הערכים הפנימי כדי להתאים אותם לרשימת משתנים חדשה, למשל בזמן יצירת סביבה (Environment) חדשה."
  },
  {
    id: "expval-to-ref",
    title: "expval->ref",
    category: "data-structures",
    subCategory: "expval",
    model: "שולף את הכתובת בזיכרון (Reference) מתוך עטיפת ref-val, כדי לגשת למיקום הפיזי ב-Store.",
    code: `(define expval->ref
  (lambda (v)
    (cases expval v
      (ref-val (ref) ref)
      (else (expval-extractor-error 'reference v)))))`,
    usage: "חובה לפני קריאה ל-deref או setref!, המצפות לקבל כתובת חוקית לזיכרון המנוהל (ה-Store).",
    detailed: "<strong>מקור מבחנים:</strong> מופיע באופן קבוע בשאלות עבודה עם מצביעים (Pointers), העברת ארגומנטים לפי הפניה (Call by Reference) או מערכים דינמיים (כמו מועד 98).<br><strong>הבעיה התאורטית:</strong> כתובת זיכרון במפרש מיוצגת בפועל כמספר (אינדקס במערך ה-Store). החולץ הזה מספק בטיחות זיכרון בסיסית: הוא מוודא שהערך שאנו מנסים לקרוא ממנו או לכתוב אליו הוא אכן מצביע חוקי (ref-val) ולא סתם מספר אקראי."
  },
  {
    id: "expval-extractor-error",
    title: "expval-extractor-error",
    category: "data-structures",
    subCategory: "expval",
    model: "פונקציית עזר המייצרת ומדפיסה הודעת שגיאת טיפוס אחידה וברורה כשחילוץ נכשל.",
    code: `(define expval-extractor-error
  (lambda (variant value)
    (eopl:error 'expval-extractor
      "Expected ~s but got ~s"
      variant
      value)))`,
    usage: "נקראת תמיד מתוך ענף ה-else בכל פונקציות ה-expval->... כדי למנוע קריסה פתאומית של המפרש.",
    detailed: "<strong>מקור מבחנים:</strong> חלק מתשתית הקוד של eopl שנועדה להקל על דיבוג בזמן כתיבת מבחנים או פתרון בעיות מורכבות.<br><strong>הבעיה התאורטית:</strong> מערכת הטיפוסים הדינמית מחייבת אותנו לבדוק תקינות בזמן ריצה. ללא פונקציה זו, ניסיון לחלץ מספר מרשימה יגרום למפרש לקרוס בשגיאת Scheme פנימית קשה להבנה. פונקציה זו מייצרת 'חוזה' שקוף: היא עוצרת את הריצה מיידית ומדווחת בדיוק איזה טיפוס התבקש לעומת איזה טיפוס התקבל בפועל."
  },

  // ENV
{
    id: "empty-env",
    title: "empty-env",
    category: "data-structures",
    subCategory: "env",
    model: "מייצג את תחתית שרשרת הסביבות (Lexical Scope) – סביבה ריקה ללא משתנים כלל. מהווה את תנאי העצירה בחיפוש.",
    code: `(empty-env)`,
    usage: "משמש לאתחול הסביבה הגלובלית הריקה (ב-init-env), וכעוגן העצירה הרקורסיבי ב-apply-env שזורק שגיאת 'משתנה לא מוגדר'.",
    detailed: "<strong>מקור מבחנים:</strong> תשתית ליבה המשתנה רבות במבחנים – למשל הוספת שמירת מספר משתנים יחד (Multiple Extend), תמיכה במודולים או סביבות לטיפול ב-Overloading.<br><strong>הבעיה התאורטית:</strong> משתנים בשפת היעד (Guest) הם רק שמות (Symbols). כדי להעניק להם משמעות, המפרש זקוק למבנה נתונים הממפה שם לערך (או לכתובת). מודל הסביבה הזה מממש Scope לקסיקלי כמעין רשימה מקושרת של 'שכבות', כאשר empty-env הוא סוף הרשימה."
  },
  {
    id: "extend-env",
    title: "extend-env",
    category: "data-structures",
    subCategory: "env",
    model: "יוצר שכבת סביבה חדשה המקשרת שם משתנה לערך ועוטפת סביבה קיימת. מסתירה משתנים בעלי אותו שם מהסביבות הקודמות.",
    code: `(extend-env 'x (num-val 5) saved-env)`,
    usage: "בזמן הערכת let-exp (יצירת משתנה מקומי) או בעת הפעלת פונקציה דרך apply-procedure (קישור הארגומנט לפרמטר).",
    detailed: "<strong>מקור מבחנים:</strong> תשתית שמורחבת במבחנים לשמירת מספר משתנים יחד (כמו extend-env* במועד 78) או לתמיכה בסוגי משתנים שונים.<br><strong>הבעיה התאורטית:</strong> כדי לממש Scope לקסיקלי שמאפשר 'הסתרת משתנים' (Shadowing), המפרש לא מוחק ערכים קודמים. הוא פשוט יוצר 'חוליה' חדשה בראש הרשימה של הסביבות. כשנחפש את המשתנה, תמיד נמצא את העדכני ביותר."
  },
  {
    id: "extend-env-rec",
    title: "extend-env-rec",
    category: "data-structures",
    subCategory: "env",
    model: "מרחיב את הסביבה באופן שמייצר הפניה מעגלית, כך שהפונקציה תכיר את השם של עצמה ותוכל לבצע רקורסיה.",
    code: `(extend-env-rec 'factorial 'n body-exp saved-env)`,
    usage: "קריטי למימוש פקודת letrec-exp או בלוקים המאפשרים הגדרת פונקציות המזמנות את עצמן.",
    detailed: "<strong>מקור מבחנים:</strong> נדרש לרוב להרחבה במבחנים בהם מוסיפים פונקציות רקורסיביות הדדיות (Mutual Recursion) או תמיכה במספר פרמטרים ברקורסיה.<br><strong>הבעיה התאורטית:</strong> ב-let רגיל, הפונקציה נוצרת בסביבה החיצונית <b>לפני</b> שהשם שלה מקושר אליה, ולכן אינה מזהה את עצמה. הסביבה הרקורסיבית פותרת זאת: כאשר apply-env מחלץ את הפונקציה מכאן, הוא אורז אותה בתוך Closure שמצביע חזרה לאותה סביבה בדיוק, וכך 'סוגר את המעגל' הרקורסיבי."
  },
  {
    id: "apply-env",
    title: "apply-env",
    category: "data-structures",
    subCategory: "env",
    model: "סורק את שרשרת הסביבות (מהפנימית לחיצונית) כדי לחלץ את הערך המקושר לשם המשתנה המבוקש.",
    code: `(apply-env env 'x)`,
    usage: "השימוש המרכזי הוא ב-var-exp – ברגע שהמפרש נתקל בשם של משתנה בקוד התוכנית, הוא מפעיל את פונקציית החיפוש הזו.",
    detailed: "<strong>מקור מבחנים:</strong> פונקציה שמשתנה מהותית במבחנים של 'העברה לפי הפניה' (Call by Reference) כגון במועד 98, או במבחני מודולים.<br><strong>מנגנון הפעולה:</strong> הפונקציה מבצעת חיפוש לינארי מבוסס רקורסיה. היא בודקת את השכבה הנוכחית, ואם השם לא תואם היא יורדת ל-saved-env. חשוב להבין שבשפות מתקדמות עם Store (זיכרון מנוהל), apply-env מחזירה לרוב <b>כתובת בזיכרון</b> (Reference) ולא את הערך עצמו, ולכן לאחר מכן נידרש להפעיל deref."
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
    model: "אורז מספר גולמי של Scheme לתוך 'קופסה' המייצגת ערך מספרי בשפת היעד (Guest), לשמירה על אחידות טיפוסים.",
    code: `(num-val 5)`,
    usage: "מופעל בסוף ההערכה של ביטויים מתמטיים (כמו const-exp או diff-exp) לפני שהמפרש מחזיר את התוצאה.",
    detailed: "<strong>מקור מבחנים:</strong> בנאי בסיס הקיים בכל המפרשים, שעליו נשענות כל פעולות החישוב.<br><strong>הבעיה התאורטית:</strong> הפונקציה value-of חייבת להחזיר תמיד ערך מטיפוס אחד אחיד: expval. אם נחזיר פעם אחת מספר של Scheme ופעם אחת Closure, המפרש לא ידע איך להמשיך לעבוד עם התוצאות (למשל, לשמור אותן בסביבה או להעביר אותן לפונקציה). האריזה ב-num-val מגשרת על הפער הזה והופכת את המספר ל'אזרח' חוקי בשפת היעד."
  },
  {
    id: "bool-val",
    title: "bool-val",
    category: "interp",
    subCategory: "constructors",
    model: "אורז ערך אמת/שקר של Scheme (#t או #f) לתוך קופסה המייצגת ערך בוליאני בשפת היעד.",
    code: `(bool-val #t)`,
    usage: "מופעל בסוף הערכת ביטויי תנאי והשוואה (כמו zero?-exp או פעולות יחס) כדי שהמפרש יחזיר expval תקין.",
    detailed: "<strong>מקור מבחנים:</strong> קריטי בכל הרחבה הדורשת פעולות לוגיות חדשות או בקרת זרימה (Guards).<br><strong>הבעיה התאורטית:</strong> ב-Scheme, כל דבר שאינו #f נחשב כ-True. לכן, אם המפרש יעביר קופסה שלמה (אפילו כזו שמכילה שקר) להערכת תנאי ב-Scheme, היא תמיד תתפרש כאמת. השימוש ב-bool-val מפריד בצורה מוחלטת בין הלוגיקה הפנימית של המפרש (שפת ה-Host) לבין הערך הלוגי שמקבלת התוכנית שרצה (שפת ה-Guest)."
  },
  {
    id: "list-val",
    title: "list-val",
    category: "interp",
    subCategory: "constructors",
    model: "אורז רשימה של ערכי expval לתוך קופסה מרכזית המייצגת רשימה בשפת היעד.",
    code: `(list-val (list (num-val 1) (num-val 2)))`,
    usage: "בניית רשימות מקושרות בשפת ה-Guest. יש לשים לב שאיברי הרשימה עצמם חייבים להיות קופסאות expval.",
    detailed: "<strong>מקור מבחנים:</strong> נפוץ מאוד במבחנים המבקשים להוסיף רשימות (Lists) כאזרחים מסוג ראשון בשפה.<br><strong>הבעיה התאורטית:</strong> רשימה בשפת היעד אינה סתם רשימה של מספרי Scheme, אלא מבנה רקורסיבי של ערכי התוכנית. list-val עוטף את המבנה הזה כך שיהיה ניתן לשמור אותו במשתנה רגיל בסביבה או להחזיר אותו מפונקציה, בדיוק כמו שמחזירים מספר."
  },
  {
    id: "tuple-val",
    title: "tuple-val",
    category: "interp",
    subCategory: "constructors",
    model: "אורז רצף קבוע של ערכים מאוגדים לתוך קופסת Tuple ייעודית, המייצגת מבנה נתונים יחיד.",
    code: `(tuple-val (list val1 val2))`,
    usage: "שימושי כששפת היעד תומכת בהחזרת מספר ערכים במקביל או במבנים סטטיים (כמו רשומות/מילונים).",
    detailed: "<strong>מקור מבחנים:</strong> מופיע בשאלות ספציפיות המבקשות להוסיף טיפוסי Tuple (למשל מועד 57) או מערכות Destructuring.<br><strong>הבעיה התאורטית:</strong> בניגוד לרשימה שגודלה דינמי ויש עליה פעולות car/cdr, Tuple נועד לרוב לאריזה מהירה של מספר ערכים שיפורקו מיד לאחר מכן למספר משתנים. הקופסה הזו מאפשרת ל-value-of להחזיר את כל המקבץ כערך expval בודד מבלי לשבור את חתימת הפונקציה."
  },
  {
    id: "proc-val",
    title: "proc-val",
    category: "interp",
    subCategory: "constructors",
    model: "אורז פונקציה מחושבת (Closure - הכוללת קוד וסביבה) בתוך קופסת ExpVal.",
    code: `(proc-val (procedure bvar body env))`,
    usage: "מופעל בסוף הערכת proc-exp (הגדרת פונקציה אנונימית), והופך אותה לערך שניתן לשמור במשתנה.",
    detailed: "<strong>מקור מבחנים:</strong> לב הליבה של שפות מבוססות פונקציות. נדרש בכל שינוי שמשפיע על אופן יצירת פונקציות.<br><strong>הבעיה התאורטית:</strong> זו בדיוק המשמעות של 'פונקציות כאזרחיות מסוג ראשון' (First-Class Citizens). ברגע שאנו לוקחים את ה-Closure ומכניסים אותו לתוך proc-val, הוא הופך לערך expval שווה זכויות לחלוטין ל-num-val. בזכות זה, אפשר להעביר פונקציה כארגומנט לפונקציה אחרת, להחזיר אותה, או לשמור אותה במערך."
  },
  // --- Q2 (STORE & REFS) ---
  // STORE
{
    id: "newref",
    title: "newref",
    category: "q2",
    subCategory: "store",
    model: "מקצה תא חדש בזיכרון הפיזי המדומה (Store), מאחסן בו את הערך המבוקש, ומחזיר את הכתובת (Pointer) לאותו תא.",
    code: `(newref val)`,
    usage: "מבוצע כמעט תמיד בזמן אתחול משתנים (let), העברת פרמטרים לפונקציות (Implicit Refs), או יצירת תאים למערכים דינמיים.",
    detailed: "<strong>מקור מבחנים:</strong> תשתית מרכזית לשאלות Q2 ולכל מנגנון של State ו-Mutation (למשל מועד 78).<br><strong>הבעיה התאורטית:</strong> בסביבה רגילה (ללא State), משתנה פשוט שווה לערך. אבל כדי לאפשר השמה (עדכון ערך של משתנה קיים), המפרש זקוק לניהול זיכרון עקיף (Indirection). מודל ה-Store מייצר מנגנון של RAM מדומה: אנחנו 'קונים' תא בזיכרון עם newref, מקבלים מספר (האינדקס של התא), ואת המספר הזה בלבד אנו שומרים בסביבה הלקסיקלית תחת שם המשתנה."
  },
  {
    id: "deref",
    title: "deref",
    category: "q2",
    subCategory: "store",
    model: "ניגש לזיכרון המנוהל (Store) באמצעות הכתובת (Reference) שסופקה, ושולף את הערך השמור באותו תא.",
    code: `(deref ref)`,
    usage: "שימושי בעיקר ב-var-exp: כאשר שולפים כתובת של משתנה מתוך הסביבה (apply-env), מפעילים deref כדי לקבל את הערך האמיתי.",
    detailed: "<strong>מקור מבחנים:</strong> חלק מובנה מפתרון Q2 ושאלות מערכים/מצביעים. קריטי להבנה בהעברה לפי הפניה (Call by Reference) מועד 98.<br><strong>הבעיה התאורטית:</strong> מכיוון שהסביבה (env) מחזיקה רק מצביעים לתאים בזיכרון ולא את הערכים עצמם, חילוץ ערך של משתנה הופך לפעולה דו-שלבית: השלב הראשון הוא apply-env שמחזיר את המצביע, והשלב השני הוא deref שלוקח את המצביע, 'קופץ' למיקום הפיזי ב-Store, ומביא משם את התוכן."
  },
  {
    id: "setref",
    title: "setref!",
    category: "q2",
    subCategory: "store",
    model: "ניגש לתא קיים בזיכרון (Store) באמצעות הכתובת שלו, ודורס את הערך הישן בערך חדש (Side Effect).",
    code: `(setref! ref new-val)`,
    usage: "מופעל במימוש פעולות השמה כמו set-exp (למשל set x = 5) או עדכון אינדקסים במערכים (begin/set).",
    detailed: "<strong>מקור מבחנים:</strong> לב הליבה של תכנות אימפרטיבי. נדרש בכל מבחן שבו משנים מצב קיים בזמן ריצה.<br><strong>הבעיה התאורטית:</strong> זוהי הפעולה היחידה שבאמת משנה את המצב הגלובלי של התוכנית (Mutation). שים לב: הסביבה (env) לא משתנה כלל! המשתנה x ימשיך להצביע לאותה כתובת בדיוק, אבל התוכן שיושב בכתובת הזו בתוך ה-Store יתחלף. פעולה זו גורמת לפונקציות להחזיר תוצאות שונות בכל קריאה גם אם קיבלו את אותם קלטים."
  },
  {
    id: "ref-val",
    title: "ref-val",
    category: "q2",
    subCategory: "store",
    model: "אורז כתובת זיכרון גולמית (Reference) לתוך קופסת expval, כך שניתן יהיה להתייחס למצביע עצמו כאל ערך בשפה.",
    code: `(ref-val ref)`,
    usage: "שימושי כששפת היעד חושפת מצביעים במפורש (Explicit Refs) ומאפשרת לפונקציות להחזיר כתובות זיכרון.",
    detailed: "<strong>מקור מבחנים:</strong> מופיע בהרחבות בהן מצביע הוא אזרח מסוג ראשון (למשל הפעלת & או * כמו ב-C), ומערכים רב-ממדיים.<br><strong>הבעיה התאורטית:</strong> בשפה עם הפניות סמויות (Implicit), המשתמש אף פעם לא רואה את הכתובת עצמה (הוא רואה רק את הערך שחולץ עם deref). אך בשפות המאפשרות למשתמש להתעסק עם מצביעים ישירות, הכתובת עצמה (המספר של ה-ref) חייבת לחזור אל המשתמש כערך חוקי של השפה. אריזתה ב-ref-val מאפשרת למפרש להתייחס למצביע כמו לכל משתנה אחר – לשמור אותו ברשימה, להחזיר אותו מפונקציה או להעביר אותו הלאה."
  },

  // AST-Q2
{
    id: "assign-exp",
    title: "assign-exp",
    category: "q2",
    subCategory: "ast-q2",
    model: "ביטוי ה-AST המבצע השמה (Mutation) למשתנה קיים. מפריד בין איתור המצביע בסביבה לבין דריסת הערך בזיכרון.",
    code: `(assign-exp (var exp1)
  (let ((val (value-of exp1 env)))
    (begin
      (setref! (apply-env env var) val)
      (num-val 27))))`,
    usage: "שימוש מובהק כאשר נדרשת השמה (למשל x = 5). זהו הבסיס לכל פעולת Side-Effect (תופעת לוואי) במפרש.",
    detailed: "<strong>המנגנון התיאורטי:</strong> פעולת ההשמה מוכיחה מדוע אנו חייבים להפריד בין הסביבה (env) לזיכרון (Store). תחילה, הביטוי החדש (exp1) מחושב כדי לקבל את ערכו הגולמי. לאחר מכן, `apply-env` מחפש את המשתנה, אך הוא מחזיר את <strong>הכתובת</strong> שלו בזיכרון, לא את הערך הישן. הפקודה `setref!` פונה ישירות לכתובת הזו ודורסת את התא. <strong>שים לב: הסביבה לא משתנה כלל!</strong> המצביע נשאר אותו מצביע, אבל התוכן בזיכרון התחלף.<br><strong>למה מחזירים 27?</strong> בשפות מסוימות (כמו ב-EOPL), לפעולת השמה אין ערך חזרה שימושי, ולכן מוחזר ערך שרירותי (כמו 27) שרק מסמן שהפעולה הסתיימה. במבחנים, יש לעקוב אחרי דרישות השאלה – לעיתים יבקשו להחזיר את הערך שהושם."
  },
  {
    id: "begin-exp",
    title: "begin-exp",
    category: "q2",
    subCategory: "ast-q2",
    model: "ביטוי לביצוע רצף פקודות (Block). הפקודות מבוצעות בזו אחר זו לשם השפעתן על הזיכרון, והאחרונה קובעת את ערך החזרה.",
    code: `(begin-exp (exps)
  (let loop ((exps exps))
    (if (null? (cdr exps))
        (value-of (car exps) env)
        (begin
          (value-of (car exps) env)
          (loop (cdr exps))))))`,
    usage: "מופעל כשרוצים להריץ גוש פקודות יחד. קריטי למימוש לולאות, או פונקציות המבצעות גם חישוב וגם עדכון משתנים (כמו קידום מונה).",
    detailed: "<strong>המנגנון התיאורטי:</strong> בשפה פונקציונלית טהורה (ללא Store), בלוק begin הוא חסר משמעות, משום שביטוי שלא שומרים את תוצאתו פשוט מתאדה. לעומת זאת, בסביבה הכוללת State (כמו שפת היעד שלנו), כל שורה בבלוק עשויה לשנות את הזיכרון הגלובלי מאחורי הקלעים. הלולאה הרקורסיבית `loop` עוברת על כל הביטויים: היא מחשבת כל ביטוי (מעוררת את ה-Side Effect שלו), זורקת את התוצאה לפח, וכאשר היא מגיעה לביטוי האחרון ברשימה – היא מחשבת אותו ומחזירה אותו כערך המייצג את כל הבלוק."
  },
  {
    id: "var-exp-q2",
    title: "var-exp",
    category: "q2",
    subCategory: "ast-q2",
    model: "משיכת ערכו של משתנה בסביבת הפניות סמויות (Implicit Refs), הכוללת חילוץ המצביע מהסביבה וקריאת הערך מהזיכרון.",
    code: `(var-exp (var) (deref (apply-env env var)))`,
    usage: "מופעל בכל פעם שהמפרש נתקל בשם של משתנה (כמו x או y) וצריך להפוך אותו לערך שהוא מייצג בפועל.",
    detailed: "<strong>המנגנון התיאורטי:</strong> זהו הציר שעליו סובבת שפת ה-Implicit Refs וההבדל הקריטי ביותר בין מפרש ללא State למפרש עם State. בשפה פונקציונלית, `apply-env` מחזיר ישירות את ערך ה-expval. כאן, מכיוון שמשתנים עשויים להשתנות (Mutation), הסביבה שומרת רק <strong>כתובות זיכרון</strong> (References). לכן, חובה להשתמש ב-deref! הפעולה היא דו-שלבית: השלב הראשון (`apply-env`) אומר למפרש 'היכן המשתנה הזה נמצא', והשלב השני (`deref`) ניגש פיזית למחסן ושולף את הערך העדכני. שכחת deref? המפרש יקרוס כי הוא ינסה לבצע פעולות על כתובת במקום על ערך."
  },
  {
    id: "let-exp-implicit",
    title: "let-exp (Implicit)",
    category: "q2",
    subCategory: "infra",
    model: "יצירת משתנה זמני. מקצה תא פיזי חדש בזיכרון, ומקשר את שם המשתנה למצביע לתא זה בסביבה המורחבת.",
    code: `(let-exp (var exp1 body)
  (let ((val (value-of exp1 env)))
    (value-of body 
      (extend-env var (newref val) env))))`,
    usage: "מבוצע כשהתוכנית מגדירה משתנה מקומי. הכרחי כדי לאפשר שינוי עתידי (set!) של אותו משתנה בתוך גוף ה-let.",
    detailed: "<strong>המנגנון התיאורטי:</strong> ב-let פשוט (ללא State), הסביבה מורחבת על ידי קשירת השם ישירות לערך. אך ברגע שאנו תומכים בהשמות, כל משתנה מקומי <strong>חייב להיות ניתן לשינוי</strong> (Mutable). הדרך היחידה לאפשר זאת היא לקנות עבורו 'נדלן' בזיכרון: המפרש מחשב את הערך של exp1, מקצה עבורו תא חדש ב-Store (`newref`), ומייצר סביבה חדשה שבה השם מקושר ל<strong>מצביע</strong> החדש. בזכות הארכיטקטורה הזו, פקודות כמו `assign-exp` בתוך ה-body ידעו בדיוק לאיזה תא לפנות מבלי לדרוס משתנים אחרים."
  },
  {
    id: "apply-procedure-implicit",
    title: "apply-procedure (Implicit)",
    category: "q2",
    subCategory: "infra",
    model: "מנגנון העברת פרמטרים לפונקציה (Call). מיישם 'העברה לפי ערך' (Pass-by-Value) באמצעות יצירת תא זיכרון חדש לארגומנט.",
    code: `(let ((new-env (extend-env var (newref val) saved-env)))
  (value-of body new-env))`,
    usage: "חלק ממימוש Call-exp, ברגע שהפונקציה עצמה מתחילה לרוץ עם הארגומנט שהועבר אליה.",
    detailed: "<strong>המנגנון התיאורטי (העברה לפי ערך):</strong> כשאנו מעבירים ארגומנט לפונקציה, המפרש לוקח את הערך שכבר חושב (`val`) ומייצר עבורו תא זיכרון <strong>חדש לחלוטין</strong> (`newref`). הסביבה החדשה של הפונקציה תכיר את הפרמטר רק כמצביע לתא החדש הזה. המשמעות המעשית היא שהפונקציה מקבלת <strong>עותק מבודד</strong>. אם הפונקציה תבצע השמה (`set!`) לפרמטר שלה, הפעולה תשפיע רק על התא החדש ולא תשנה את המשתנה המקורי שנמצא בסביבת הקריאה (Caller). <br><strong>הקשר למבחן:</strong> כאשר נדרשים לממש 'העברה לפי הפניה' (Call-by-Reference), מנגנון זה משתנה מן היסוד: המפרש מדלג על ה-`newref`, ומעביר את הכתובת המקורית של המשתנה ישירות לתוך ה-`extend-env`, כך שהפונקציה והקוד הקורא חולקים את אותו תא זיכרון."
  },
];

window.dictionaryData = dictionaryData;
