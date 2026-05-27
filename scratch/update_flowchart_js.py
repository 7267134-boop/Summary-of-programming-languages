path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

target_flowchart = """        function traceFlowchart() {
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
        }"""

replacement_flowchart = """        function traceFlowchart() {
            const isVar = document.getElementById('flow-arg-var').checked;
            const isExpr = document.getElementById('flow-arg-expr').checked;
            const isSideEffect = document.getElementById('flow-arg-sideeffect') ? document.getElementById('flow-arg-sideeffect').checked : false;
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
                    if (isSideEffect) {
                        document.getElementById('flow-explain').innerHTML = 'הארגומנט הוא ביטוי עם אפקט צד! בשתי השיטות (CBV ו-CBR) הוא מוערך מיידית כי הוא אינו משתנה.';
                    } else {
                        document.getElementById('flow-explain').innerHTML = 'ההעברה היא CBV או שהארגומנט הוא ביטוי מתמטי.';
                    }
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
                
                if (isSideEffect) {
                    document.getElementById('flow-explain').innerHTML = '<strong>הערכת הביטוי מתבצעת:</strong> ה-side-effect מופעל מיידית! הערך של <code>global_cnt</code> משתנה ל-1 ב-Store.';
                } else {
                    document.getElementById('flow-explain').innerHTML = 'מעריכים את הביטוי כדי לקבל ExpVal, ומקצים לו תא חדש ב-Store.';
                }
                setTimeout(step_newref, 800);
            };
            
            const step_newref = () => {
                document.getElementById('node-newref').setAttribute('fill', '#99f6e4');
                document.getElementById('node-newref').setAttribute('stroke', '#0d9488');
                if (isSideEffect) {
                    document.getElementById('flow-explain').innerHTML = '<strong>תוצאה:</strong> הוקצה תא חדש לתוצאה. האפקט התרחש מיד.<br><span class="text-fuchsia-600 block mt-1 font-bold">* הערה אקדמית: לו היינו משתמשים בקריאה עצלנית (Lazy passing), האפקט לא היה קורה כעת כלל, אלא נארז ב-Thunk ומושהה!</span>';
                } else {
                    document.getElementById('flow-explain').innerHTML = '<strong>תוצאה:</strong> נוצר תא זיכרון חדש ב-Store. הפרמטר נקשר לכתובת החדשה הזו. אין סכנת Aliasing.';
                }
            };
            
            step_start();
        }"""

content = content.replace(target_flowchart, replacement_flowchart)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Flowchart JS in 3.html updated successfully.")
