import re

path = r"c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's verify the file contains what we expect

# 1. Parsons Puzzle Code Fix (Widget 7)
# Replacing "(define setleft-exp" with "(define setleft"
content = content.replace('"(define setleft-exp",', '"(define setleft",')

# 2. Widget 1: Architectural Drag & Drop (Dependency Graph HTML)
target_drag_feedback = """                    <div id="drag-feedback" class="mt-3 p-3 rounded-lg text-xs font-medium hidden"></div>
                </div>"""

replacement_drag_feedback = """                    <div id="drag-feedback" class="mt-3 p-3 rounded-lg text-xs font-medium hidden"></div>
                    
                    <!-- Dependency Graph SVG -->
                    <div id="arch-dependency-graph" class="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl hidden transition-all duration-500">
                        <span class="text-xs font-bold text-slate-700 block mb-3 font-sans">דיאגרמת יחסי תלויות וזרימת ננתונים (Dependency Graph):</span>
                        <div class="flex justify-center relative">
                            <svg width="100%" height="220" viewBox="0 0 540 220" fill="none" class="max-w-lg overflow-visible">
                                <!-- Nodes -->
                                <rect x="20" y="90" width="100" height="40" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="2" id="arch-node-store"/>
                                <text x="70" y="115" fill="#92400e" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">store.scm</text>

                                <rect x="220" y="20" width="100" height="40" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="2" id="arch-node-lang"/>
                                <text x="270" y="45" fill="#1e40af" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">lang.scm</text>

                                <rect x="220" y="160" width="100" height="40" rx="6" fill="#d1fae5" stroke="#059669" stroke-width="2" id="arch-node-interp"/>
                                <text x="270" y="185" fill="#065f46" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">interp.scm</text>

                                <rect x="420" y="90" width="100" height="40" rx="6" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2" id="arch-node-data"/>
                                <text x="470" y="115" fill="#5b21b6" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">data-structures.scm</text>

                                <!-- Arrows -->
                                <path id="arch-edge-lang-interp" d="M 270,60 L 270,150" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow-gray)"/>
                                <text x="270" y="110" fill="#64748b" font-size="8" text-anchor="middle" font-family="sans-serif" class="bg-white">מעביר AST</text>

                                <path id="arch-edge-interp-store" d="M 220,180 L 120,130" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow-gray)"/>
                                <text x="155" y="150" fill="#64748b" font-size="8" text-anchor="middle" font-family="sans-serif">מבצע מוטציות</text>

                                <path id="arch-edge-interp-data" d="M 320,180 L 420,130" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow-gray)"/>
                                <text x="385" y="150" fill="#64748b" font-size="8" text-anchor="middle" font-family="sans-serif">מחלץ/עוטף ערכים</text>

                                <path id="arch-edge-data-store" d="M 420,110 L 130,110" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow-gray)"/>
                                <text x="275" y="105" fill="#64748b" font-size="8" text-anchor="middle" font-family="sans-serif">ref-val מצביע לתא</text>

                                <defs>
                                    <marker id="arrow-gray" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                        <path d="M 0 2 L 8 5 L 0 8 z" fill="#94a3b8" />
                                    </marker>
                                    <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                        <path d="M 0 2 L 8 5 L 0 8 z" fill="#10b981" />
                                    </marker>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>"""

content = content.replace(target_drag_feedback, replacement_drag_feedback)

# 3. Widget 2: AST Explorer
target_ast = """                <div id="ast-explain-card" class="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700">
                    <span class="font-bold text-slate-800 text-sm">חוקר ה-AST:</span>
                    <p class="mt-1">לחץ על מילים בקוד או על צמתי העץ כדי לקבל הסבר מורחב על תפקידם בארכיטקטורת המפרש.</p>
                </div>"""

replacement_ast = """                <div id="ast-explain-card" class="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700">
                    <span class="font-bold text-slate-800 text-sm">חוקר ה-AST:</span>
                    <p class="mt-1">לחץ על מילים בקוד או על צמתי העץ כדי לקבל הסבר מורחב על תפקידם בארכיטקטורת המפרש.</p>
                </div>
                <div class="mt-4 flex gap-2">
                    <button id="btn-ast-sim" onclick="startASTSim()" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg active:scale-95 transition-all cursor-pointer font-sans">סמלץ הערכה (Bottom-Up)</button>
                    <button id="btn-ast-sim-reset" onclick="resetASTSim()" class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg transition-all cursor-pointer font-sans hidden">איפוס סימולציה</button>
                </div>"""

content = content.replace(target_ast, replacement_ast)

# 4. Widget 3: Visual Stepper (Environment stack)
target_stepper_env = """                            <div class="bg-white border border-slate-200 rounded-lg p-3">
                                <span class="text-[10px] font-bold text-slate-500 uppercase">הסביבה (Environment)</span>
                                <div id="stepper-env" class="mt-1 text-xs font-mono text-blue-700 min-h-[24px] flex items-center justify-center border-dashed border border-slate-200 rounded bg-slate-50/50">
                                    Empty Env
                                </div>
                            </div>"""

replacement_stepper_env = """                            <div class="bg-white border border-slate-200 rounded-lg p-3">
                                <span class="text-[10px] font-bold text-slate-500 uppercase">הסביבה (Environment Stack)</span>
                                <div id="stepper-env" class="mt-2 relative min-h-[90px] flex flex-col-reverse gap-1.5 p-2 border border-slate-200 rounded bg-slate-50 overflow-hidden">
                                    <div class="w-full bg-slate-100 border border-slate-300 rounded p-1.5 text-center text-[10px] font-mono text-slate-500">
                                        Empty Env
                                    </div>
                                </div>
                            </div>"""

content = content.replace(target_stepper_env, replacement_stepper_env)

# 5. Widget 4: Code Diff (Crash Test Simulator HTML)
target_diff_code = """                        <!-- Var Lookup Code -->
                        <div class="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs border border-slate-800">
                            <span class="text-slate-500 text-[10px] font-bold block mb-2">2. קוד חיפוש משתנה (interp.scm):</span>
                            <div id="diff-interp-code" class="p-2 bg-slate-950 rounded border border-slate-800/50 leading-relaxed min-h-[60px]" style="background-color: #0b0f19;">
                                <!-- Injected dynamically -->
                            </div>
                            <p id="diff-interp-desc" class="text-slate-400 text-[11px] mt-3 leading-relaxed">
                                <!-- Explanation -->
                            </p>
                        </div>
                    </div>
                </div>
        </div>"""

replacement_diff_code = """                        <!-- Var Lookup Code -->
                        <div class="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs border border-slate-800">
                            <span class="text-slate-500 text-[10px] font-bold block mb-2">2. קוד חיפוש משתנה (interp.scm):</span>
                            <div id="diff-interp-code" class="p-2 bg-slate-950 rounded border border-slate-800/50 leading-relaxed min-h-[60px]" style="background-color: #0b0f19;">
                                <!-- Injected dynamically -->
                            </div>
                            <p id="diff-interp-desc" class="text-slate-400 text-[11px] mt-3 leading-relaxed">
                                <!-- Explanation -->
                            </p>
                        </div>
                    </div>
                    
                    <!-- Crash Test Lab -->
                    <div class="mt-4 p-4 border rounded-xl bg-slate-50">
                        <span class="text-xs font-bold text-slate-700 block mb-2 font-sans">מעבדת קריסה אקדמית (Crash Test Lab):</span>
                        <p class="text-xs text-slate-600 mb-3 leading-relaxed">
                            בוא ננסה להריץ את פקודת ההשמה של משתנה פשוט שאינו מצביע: <code>set x = 10</code>.
                        </p>
                        <div class="flex flex-col md:flex-row gap-3 items-stretch">
                            <button onclick="runCrashTest()" class="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg active:scale-95 transition-all cursor-pointer font-sans whitespace-nowrap">
                                הפעל מבחן ריסוק: set x = 10
                            </button>
                            <div id="crash-test-feedback" class="flex-1 p-3 rounded-lg text-xs font-mono hidden min-h-[60px] border"></div>
                        </div>
                    </div>
                </div>
        </div>"""

content = content.replace(target_diff_code, replacement_diff_code)

# 6. Widget 5: L-value vs R-value Game
target_lr_diagram = """                    <div id="lr-explain-box" class="p-4 bg-slate-50 rounded-xl border text-xs text-slate-700 hidden leading-relaxed">
                        <!-- Dynamic explanation -->
                    </div>
                </div>
        </div>"""

replacement_lr_diagram = """                    <div id="lr-explain-box" class="p-4 bg-slate-50 rounded-xl border text-xs text-slate-700 hidden leading-relaxed">
                        <!-- Dynamic explanation -->
                    </div>
                    
                    <!-- AST Branching Router SVG -->
                    <div id="lr-router-diagram" class="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-800 hidden flex flex-col items-center">
                        <span class="text-[10px] font-bold text-slate-500 uppercase block mb-3 font-mono">Interpreter Routing Path Map (L-Value vs R-Value)</span>
                        <svg width="100%" height="120" viewBox="0 0 460 120" class="max-w-md overflow-visible">
                            <!-- Node: Start -->
                            <rect x="10" y="45" width="70" height="30" rx="4" fill="#3b82f6" stroke="#2563eb" stroke-width="1.5"/>
                            <text x="45" y="64" fill="white" font-size="8" font-weight="bold" text-anchor="middle" font-family="monospace">x</text>

                            <!-- Branch Split lines -->
                            <path id="path-lvalue" d="M 80,60 L 150,25 L 250,25 L 320,25" stroke="#475569" stroke-width="2" fill="none"/>
                            <path id="path-rvalue" d="M 80,60 L 150,95 L 250,95 L 320,95" stroke="#475569" stroke-width="2" fill="none"/>

                            <!-- Node: L-Value Target -->
                            <rect x="320" y="10" width="130" height="30" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5"/>
                            <text x="385" y="29" fill="white" font-size="8" font-weight="bold" text-anchor="middle" font-family="sans-serif">L-Value: apply-env ➔ L0</text>

                            <!-- Node: R-Value Target -->
                            <rect x="320" y="80" width="130" height="30" rx="4" fill="#10b981" stroke="#059669" stroke-width="1.5"/>
                            <text x="385" y="99" fill="white" font-size="8" font-weight="bold" text-anchor="middle" font-family="sans-serif">R-Value: apply-env ➔ deref ➔ 5</text>

                            <!-- Glowing dots -->
                            <circle id="dot-lvalue" cx="80" cy="60" r="4" fill="#38bdf8" class="hidden"/>
                            <circle id="dot-rvalue" cx="80" cy="60" r="4" fill="#34d399" class="hidden"/>
                        </svg>
                    </div>
                </div>
        </div>"""

content = content.replace(target_lr_diagram, replacement_lr_diagram)

# 7. Widget 6: Dynamic Dispatch Router (Closure Inspector HTML)
target_router = """                            <!-- Animated Dot -->
                            <circle id="router-ball" cx="140" cy="17" r="5" fill="#ffffff" class="hidden shadow-lg"/>
                        </svg>
                    </div>
                    
                    <div id="router-explain-box" class="p-3 bg-slate-50 rounded-xl border text-xs text-slate-700 leading-relaxed min-h-[40px] mt-3">
                        לחץ על אחד מסוגי הקלטים למעלה כדי לראות את אנימציית הניתוב והסבר מורחב על התהליך.
                    </div>
                </div>"""

replacement_router = """                            <!-- Animated Dot -->
                            <circle id="router-ball" cx="140" cy="17" r="5" fill="#ffffff" class="hidden shadow-lg"/>
                            
                            <!-- Magnifier buttons (initially hidden) -->
                            <g id="inspect-int" class="cursor-pointer hidden" onclick="inspectClosure('int')">
                                <circle cx="82" cy="122.5" r="7" fill="#f8fafc" stroke="#3b82f6" stroke-width="1"/>
                                <text x="82" y="125.5" fill="#3b82f6" font-size="8" text-anchor="middle" font-weight="bold">🔍</text>
                            </g>
                            <g id="inspect-bool" class="cursor-pointer hidden" onclick="inspectClosure('bool')">
                                <circle cx="172" cy="122.5" r="7" fill="#f8fafc" stroke="#10b981" stroke-width="1"/>
                                <text x="172" y="125.5" fill="#10b981" font-size="8" text-anchor="middle" font-weight="bold">🔍</text>
                            </g>
                            <g id="inspect-func" class="cursor-pointer hidden" onclick="inspectClosure('func')">
                                <circle cx="262" cy="122.5" r="7" fill="#f8fafc" stroke="#a855f7" stroke-width="1"/>
                                <text x="262" y="125.5" fill="#a855f7" font-size="8" text-anchor="middle" font-weight="bold">🔍</text>
                            </g>
                        </svg>
                    </div>
                    
                    <div id="router-explain-box" class="p-3 bg-slate-50 rounded-xl border text-xs text-slate-700 leading-relaxed min-h-[40px] mt-3">
                        לחץ על אחד מסוגי הקלטים למעלה כדי לראות את אנימציית הניתוב והסבר מורחב על התהליך.
                    </div>
                    
                    <div id="closure-inspector-panel" class="mt-3 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 font-mono hidden">
                        <!-- Injected via JS -->
                    </div>
                </div>"""

content = content.replace(target_router, replacement_router)

# 8. Widget 8: Pair Memory Animator (GC Earthquake Button)
target_mem_btn = """                            <button id="btn-mem-alloc" class="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg active:scale-95 transition-all cursor-pointer font-sans" onclick="allocPairMemory()">Allocate Pair (pair 11 22)</button>
                        </div>"""

replacement_mem_btn = """                            <button id="btn-mem-alloc" class="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg active:scale-95 transition-all cursor-pointer font-sans" onclick="allocPairMemory()">Allocate Pair (pair 11 22)</button>
                            <button id="btn-mem-gc" class="w-full py-2 mt-2 bg-red-800 hover:bg-red-900 text-white font-bold text-xs rounded-lg active:scale-95 transition-all cursor-pointer font-sans" onclick="runGarbageCollector()">הפעל Garbage Collector (איסוף זבל)</button>
                        </div>"""

content = content.replace(target_mem_btn, replacement_mem_btn)

# 9. Widget 9: value-of-operand Flowchart (Side-Effect option)
target_flow_arg = """                                <label class="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer font-sans">
                                    <input type="radio" name="flow-arg" id="flow-arg-expr" value="expr"> ביטוי <code>+(1, 2)</code>
                                </label>
                            </div>"""

replacement_flow_arg = """                                <label class="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer font-sans">
                                    <input type="radio" name="flow-arg" id="flow-arg-expr" value="expr"> ביטוי <code>+(1, 2)</code>
                                </label>
                                <label class="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer font-sans">
                                    <input type="radio" name="flow-arg" id="flow-arg-sideeffect" value="sideeffect"> אפקט צד: <code>setref(global_cnt, 1)</code>
                                </label>
                            </div>"""

content = content.replace(target_flow_arg, replacement_flow_arg)

# 10. Widget 10: Aliasing (Double Alias button)
target_alias_btn = """                            <div class="mt-4 p-3 bg-teal-50/50 border border-teal-100 rounded-lg text-xs text-teal-800 leading-relaxed font-sans">
                                <strong>הסבר:</strong> מאחר ששני המשתנים <code>x</code> ו-<code>y</code> מצביעים ל-<code>L0</code>, כל עדכון של <code>y</code> (למשל פקודת השמה set) משנה ישירות את הערך ב-<code>L0</code>, ולכן x יקרא את הערך החדש מיד.
                            </div>
                        </div>"""

replacement_alias_btn = """                            <div class="mt-4 p-3 bg-teal-50/50 border border-teal-100 rounded-lg text-xs text-teal-800 leading-relaxed font-sans">
                                <strong>הסבר:</strong> מאחר ששני המשתנים <code>x</code> ו-<code>y</code> מצביעים ל-<code>L0</code>, כל עדכון של <code>y</code> (למשל פקודת השמה set) משנה ישירות את הערך ב-<code>L0</code>, ולכן x יקרא את הערך החדש מיד.
                            </div>
                            <button onclick="runDoubleAlias()" id="btn-double-alias" class="w-full py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-lg active:scale-95 transition-all cursor-pointer font-sans mt-2">
                                סמלץ אסון כינוי כפול: (f x x)
                            </button>
                        </div>"""

content = content.replace(target_alias_btn, replacement_alias_btn)

# 11. Widget 11: Thunk Animator (Vacuum button and SVG vars)
target_thunk_svg = """                            <!-- visual chest box -->
                        <div class="bg-slate-900 rounded-xl p-4 flex flex-col items-center justify-center border border-slate-800 min-h-[160px]" style="background-color: #0b0f19;">
                            <!-- Box SVG -->
                            <svg id="thunk-chest" width="120" height="100" viewBox="0 0 120 100" class="thunk-box-svg overflow-visible cursor-pointer" onclick="accessLazyVar()">
                                <!-- Closed box outline -->
                                <g id="chest-closed">
                                    <rect x="20" y="35" width="80" height="50" rx="3" fill="#0f766e" stroke="#0d9488" stroke-width="2"/>
                                    <rect x="50" y="45" width="20" height="10" rx="1" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
                                    <circle cx="60" cy="50" r="3" fill="#1e293b"/>
                                </g>"""

replacement_thunk_svg = """                            <!-- visual chest box -->
                        <div class="bg-slate-900 rounded-xl p-4 flex flex-col items-center justify-center border border-slate-800 min-h-[160px]" style="background-color: #0b0f19;">
                            <!-- Box SVG -->
                            <svg id="thunk-chest" width="120" height="100" viewBox="0 0 120 100" class="thunk-box-svg overflow-visible cursor-pointer" onclick="accessLazyVar()">
                                <!-- Environment variables floating around for Vacuum animation -->
                                <g id="vacuum-vars" class="hidden">
                                    <circle id="vac-x" cx="10" cy="15" r="5" fill="#f43f5e"/>
                                    <text id="vac-x-text" x="10" y="24" fill="#f43f5e" font-size="6" font-weight="bold" text-anchor="middle">x=5</text>
                                    
                                    <circle id="vac-z" cx="110" cy="15" r="5" fill="#3b82f6"/>
                                    <text id="vac-z-text" x="110" y="24" fill="#3b82f6" font-size="6" font-weight="bold" text-anchor="middle">z=10</text>
                                </g>
                                <!-- Closed box outline -->
                                <g id="chest-closed">
                                    <rect x="20" y="35" width="80" height="50" rx="3" fill="#0f766e" stroke="#0d9488" stroke-width="2"/>
                                    <rect x="50" y="45" width="20" height="10" rx="1" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
                                    <circle cx="60" cy="50" r="3" fill="#1e293b"/>
                                </g>"""

content = content.replace(target_thunk_svg, replacement_thunk_svg)

target_thunk_btn = """                                <button id="btn-lazy-access" class="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg active:scale-95 transition-all cursor-pointer font-sans" onclick="accessLazyVar()">קרא למשתנה (Access Variable)</button>
                            </div>
                        </div>"""

replacement_thunk_btn = """                                <button id="btn-lazy-access" class="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg active:scale-95 transition-all cursor-pointer font-sans" onclick="accessLazyVar()">קרא למשתנה (Access Variable)</button>
                                <button id="btn-thunk-vacuum" class="py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-lg active:scale-95 transition-all cursor-pointer font-sans mt-2" onclick="runThunkVacuum()">הפעל שואב סביבה (Closure Vacuum)</button>
                            </div>
                        </div>"""

content = content.replace(target_thunk_btn, replacement_thunk_btn)

# Write back content temporarily to see if basic HTML modifications are complete
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML modifications in 3.html complete.")
