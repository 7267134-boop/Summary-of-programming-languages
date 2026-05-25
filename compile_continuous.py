import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
base_dir = r"c:\Users\72671\Desktop\שפות תכנות\סיכום"
files = ["1.html", "2.html", "3.html", "4.html"]

# Volume names
volume_names = {
    "1.html": "כרך א': יסודות וכלים",
    "2.html": "כרך ב': התפתחות השפות",
    "3.html": "כרך ג': ניהול זיכרון ומצב",
    "4.html": "כרך ד': נושאים מתקדמים וטיפוסים"
}

# Volume colors for sidebar accordion headers
volume_colors = {
    "1.html": "bg-red-950/40 text-red-200 border-red-800/40 hover:bg-red-950/60",
    "2.html": "bg-blue-950/40 text-blue-200 border-blue-800/40 hover:bg-blue-950/60",
    "3.html": "bg-emerald-950/40 text-emerald-200 border-emerald-800/40 hover:bg-emerald-950/60",
    "4.html": "bg-purple-950/40 text-purple-200 border-purple-800/40 hover:bg-purple-950/60"
}

# We will collect sections and build a unified page
all_styles = []
all_tab_contents = []
all_diagram_scripts = []
sidebar_accordions = []

for idx, fname in enumerate(files):
    vol_num = idx + 1
    fpath = os.path.join(base_dir, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    # 1. Extract style block contents
    style_blocks = re.findall(r'<style[^>]*>(.*?)</style>', html_content, re.DOTALL)
    for s in style_blocks:
        if s.strip():
            all_styles.append(s.strip())
            
    # 2. Extract tab content divs
    # Find all divs with class="tab-content"
    # We can match: <div id="..." class="tab-content...">
    # Since they can contain nested divs, we parse using regex of matching divs.
    # To do this robustly without bs4, let's find the start position of each tab-content div, 
    # and find its closing tag by counting open/close tags.
    tab_starts = list(re.finditer(r'<div\s+id="([^"]+)"\s+class="tab-content[^"]*"', html_content))
    for i, start_m in enumerate(tab_starts):
        tab_id = start_m.group(1)
        start_pos = start_m.start()
        
        # Find closing div tag matching this opening div tag
        # We start counting from start_pos + 5 (after "<div ")
        depth = 1
        pos = start_pos + 5
        while depth > 0 and pos < len(html_content):
            next_open = html_content.find('<div', pos)
            next_close = html_content.find('</div>', pos)
            
            if next_close == -1:
                # Malformed HTML, just fallback to next tab start or end of content
                pos = tab_starts[i+1].start() if i+1 < len(tab_starts) else len(html_content)
                break
                
            if next_open != -1 and next_open < next_close:
                depth += 1
                pos = next_open + 4
            else:
                depth -= 1
                pos = next_close + 6
                
        tab_html = html_content[start_pos:pos]
        # Add data-volume attribute for ScrollSpy and styling
        tab_html_modified = tab_html.replace(
            f'id="{tab_id}" class="tab-content',
            f'id="{tab_id}" data-volume="{vol_num}" class="tab-content'
        )
        all_tab_contents.append(tab_html_modified)

    # 3. Extract Sidebar Nav Groups to build unified Accordions
    aside_m = re.search(r'<aside[^>]*>(.*?)</aside>', html_content, re.DOTALL)
    if aside_m:
        aside_html = aside_m.group(1)
        # Split by nav-group
        nav_groups = aside_html.split('<div class="nav-group">')[1:]
        
        accordion_content = []
        for ng in nav_groups:
            title_m = re.search(r'<div class="nav-group-title[^>]*>(.*?)</div>', ng, re.DOTALL)
            title = title_m.group(1).strip() if title_m else ""
            title_clean = re.sub(r'<[^>]+>', '', title).strip()
            
            buttons = re.findall(r'<button[^>]*onclick="showTab\(\'([^\'\"]+)\'\)"[^>]*>(.*?)</button>', ng, re.DOTALL)
            
            if not buttons:
                continue
                
            group_html = []
            group_html.append(f'  <div class="nav-group-title mt-3 text-slate-500 font-bold border-b border-slate-800/40 pb-1 mb-2 text-xs">{title_clean}</div>')
            for b in buttons:
                b_text = re.sub(r'<[^>]+>', '', b[1]).strip().replace("\n", " ")
                # Replace the ID in compiled sidebar to avoid collisions, but trigger showTab
                # We can add an indicator class or custom id for the sidebar button
                group_html.append(f'  <button onclick="showTab(\'{b[0]}\')" id="btn-{b[0]}" class="nav-btn text-right w-full text-sm py-2 px-3 hover:bg-slate-800/50 hover:text-white rounded-md transition-all text-slate-400 mb-1 flex items-center gap-2">')
                group_html.append(f'    <span>{b_text}</span>')
                group_html.append(f'  </button>')
                
            accordion_content.append("\n".join(group_html))
            
        accordion_html = f"""
        <div class="volume-accordion mb-3 border border-slate-800/60 rounded-xl overflow-hidden shadow-sm">
            <button onclick="toggleVolumeAccordion('volume-{vol_num}')" class="volume-hdr flex items-center justify-between w-full p-4 font-black transition-all text-right {volume_colors[fname]}">
                <span>{volume_names[fname]}</span>
                <svg id="arrow-volume-{vol_num}" class="w-4 h-4 transform transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div id="volume-{vol_num}-content" class="volume-content hidden bg-slate-950/20 p-3 max-h-[400px] overflow-y-auto border-t border-slate-850">
                {"".join(accordion_content)}
            </div>
        </div>
        """
        sidebar_accordions.append(accordion_html)

    # 4. Extract Diagram Script Logic (5th script tag)
    # Let's search for script tags containing function definitions (not config or MathJax)
    scripts = re.findall(r'<script>(.*?)</script>', html_content, re.DOTALL)
    for s in scripts:
        if "function showTab" in s:
            # This is the main logic script!
            # Let's remove the showTab implementation since we will write a unified custom showTab,
            # but keep all the other function declarations (e.g. setAstDemo, resetFuncSim, etc.)
            clean_s = s.replace("function showTab(tabId) {", "function showTab_old(tabId) {")
            # Remove anything related to DOMContentLoaded of individual files so we can write our own
            clean_s = re.sub(r'document\.addEventListener\("DOMContentLoaded".*?\}\);', '', clean_s, flags=re.DOTALL)
            all_diagram_scripts.append(clean_s.strip())

# Build the final stylesheet block
custom_continuous_style = """
    body {
        background-color: #f8fafc;
    }
    .continuous-mode .tab-content {
        display: block !important;
        opacity: 1 !important;
        margin-bottom: 5rem;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 5rem;
    }
    .continuous-mode .tab-content:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    .volume-content::-webkit-scrollbar {
        width: 6px;
    }
    .volume-content::-webkit-scrollbar-track {
        background: transparent;
    }
    .volume-content::-webkit-scrollbar-thumb {
        background: #334155;
        border-radius: 3px;
    }
    /* Active navigation button in unified sidebar */
    .nav-btn.active-nav {
        background-color: #0284c7 !important; /* Sky 600 */
        color: #fff !important;
        font-weight: 600;
        box-shadow: 0 4px 6px -1px rgba(2, 132, 199, 0.2);
    }
"""

unified_styles = "\n".join(all_styles) + "\n" + custom_continuous_style

# Build the final body contents
unified_sidebar = "\n".join(sidebar_accordions)
unified_body = "\n".join(all_tab_contents)
unified_diagram_scripts = "\n\n/* === DIAGRAM SCRIPT FROM SOURCE FILES === */\n\n".join(all_diagram_scripts)

# Unified DOMContentLoaded Script
unified_setup_script = """
    // Custom unified showTab that scrolls smoothly to target section
    function showTab(tabId) {
        const el = document.getElementById(tabId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Highlight in sidebar
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav'));
            const btn = document.getElementById('btn-' + tabId);
            if (btn) btn.classList.add('active-nav');
            
            // Expand parent accordion
            const volumeNum = el.getAttribute('data-volume');
            if (volumeNum) {
                expandVolumeAccordion('volume-' + volumeNum);
            }
        }
    }

    function toggleVolumeAccordion(volumeId) {
        const content = document.getElementById(volumeId + '-content');
        const arrow = document.getElementById('arrow-' + volumeId);
        if (!content || !arrow) return;
        
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            arrow.classList.add('rotate-180');
        } else {
            content.classList.add('hidden');
            arrow.classList.remove('rotate-180');
        }
    }

    function expandVolumeAccordion(volumeId) {
        const content = document.getElementById(volumeId + '-content');
        const arrow = document.getElementById('arrow-' + volumeId);
        if (content && arrow && content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            arrow.classList.add('rotate-180');
        }
    }

    function toggleSidebar() {
        document.body.classList.toggle('sidebar-collapsed');
        const isCollapsed = document.body.classList.contains('sidebar-collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
        updateToggleBtnIcon(isCollapsed);
    }

    function updateToggleBtnIcon(isCollapsed) {
        const icon = document.getElementById('sidebar-toggle-icon');
        if (!icon) return;
        if (isCollapsed) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />';
        } else {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />';
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        // 1. Create and inject sidebar toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'sidebar-toggle-btn';
        toggleBtn.className = 'fixed top-6 p-2 rounded-lg bg-white/80 backdrop-blur-md hover:bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-md z-30 flex items-center justify-center w-10 h-10 transition-all duration-300 active:scale-95 cursor-pointer';
        toggleBtn.title = 'הצג/הסתר תפריט ניווט';
        toggleBtn.onclick = toggleSidebar;
        toggleBtn.innerHTML = '<svg id="sidebar-toggle-icon" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"></svg>';
        document.body.appendChild(toggleBtn);

        // 2. Load sidebar collapsed state
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isCollapsed) {
            document.body.classList.add('sidebar-collapsed');
        }
        updateToggleBtnIcon(isCollapsed);

        // 3. Expand the first accordion by default
        expandVolumeAccordion('volume-1');

        // 4. Initialize Diagram State (checking function existence)
        if (typeof resetFuncSim === 'function') resetFuncSim();
        if (typeof resetScopeSim === 'function') resetScopeSim();
        if (typeof resetParamSim === 'function') resetParamSim();
        if (typeof resetPairSim === 'function') resetPairSim();
        if (typeof resetUnification === 'function') resetUnification();
        if (typeof resetPipeSim === 'function') resetPipeSim();

        // 5. Setup ScrollSpy
        const mainEl = document.querySelector('main');
        const tabs = Array.from(document.querySelectorAll('.tab-content'));
        const navButtons = document.querySelectorAll('.nav-btn');
        let currentActiveTabId = '';

        mainEl.addEventListener('scroll', () => {
            let activeTabId = '';
            const buffer = 150; // offset in px from top to trigger section change
            
            for (let tab of tabs) {
                const rect = tab.getBoundingClientRect();
                if (rect.top <= buffer) {
                    activeTabId = tab.id;
                }
            }

            if (activeTabId && activeTabId !== currentActiveTabId) {
                currentActiveTabId = activeTabId;
                
                // Highlight button
                navButtons.forEach(btn => {
                    if (btn.getAttribute('onclick') === `showTab('${activeTabId}')`) {
                        btn.classList.add('active-nav');
                    } else {
                        btn.classList.remove('active-nav');
                    }
                });
                
                // Expand matching volume, collapse others
                const activeTabEl = document.getElementById(activeTabId);
                if (activeTabEl) {
                    const volNum = activeTabEl.getAttribute('data-volume');
                    if (volNum) {
                        for (let i = 1; i <= 4; i++) {
                            const content = document.getElementById(`volume-${i}-content`);
                            const arrow = document.getElementById(`arrow-volume-${i}`);
                            if (content && arrow) {
                                if (i == volNum) {
                                    content.classList.remove('hidden');
                                    arrow.classList.add('rotate-180');
                                } else {
                                    content.classList.add('hidden');
                                    arrow.classList.remove('rotate-180');
                                }
                            }
                        }
                    }
                }
            }
        });

        // 6. Navigation buttons removed as requested
    });
"""

# Build the complete continuous.html template
continuous_html = f"""<!DOCTYPE html>
<html lang="he" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mastering Interpreters - קריאה ברצף</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {{
            theme: {{
                extend: {{
                    colors: {{
                        racket: '#9e0000',
                        primary: '#1d4ed8',
                        dark: '#0f172a',
                        darker: '#020617',
                        codebg: '#1e293b',
                        highlight: '#38bdf8'
                    }},
                    fontFamily: {{
                        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
                        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace']
                    }}
                }}
            }}
        }}
    </script>
    <script>
        MathJax = {{ tex: {{ inlineMath: [['$', '$']], displayMath: [['$$', '$$']] }} }};
    </script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
    <style>
        {unified_styles}
    </style>
</head>

<body class="text-slate-800 h-screen flex overflow-hidden continuous-mode">

    <!-- Unified Sidebar Navigation -->
    <aside class="w-80 bg-darker text-slate-300 flex flex-col h-full shadow-2xl z-20 flex-shrink-0 border-l border-slate-800">
        <div class="p-6 border-b border-slate-800 bg-darker">
            <h1 class="text-3xl font-black text-white tracking-tight leading-tight">Mastering<br><span class="text-teal-400">Continuous</span></h1>
            <p class="text-xs text-slate-400 mt-2">קריאה ברצף של כרכים א'-ד'</p>
            <div class="mt-4">
                <a href="index.html" class="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60 transition-colors">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12h18M3 12l9-9m-9 9l9 9" />
                    </svg>
                    חזרה לדף הבית
                </a>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto dark-scroll p-4 pb-20">
            {unified_sidebar}
        </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-y-auto scroll-smooth bg-white relative">
        <div class="max-w-5xl mx-auto p-10 lg:p-16 pb-32">
            
            <div class="mb-12 border-b pb-8">
                <div class="inline-block px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-800 rounded-full font-bold text-xs mb-4 tracking-wide">קריאה ברצף</div>
                <h1 class="text-5xl font-black text-slate-900 mb-4 tracking-tight">שפות תכנות: כרכים א'-ד' ברצף קריאה</h1>
                <p class="text-lg text-slate-500 leading-relaxed max-w-3xl">
                    כאן תוכלו לקרוא את ארבעת הכרכים של הסיכום ברצף למידה אחד, ללא צורך במעבר בין קבצים שונים. הניווט הצדדי מסייע לדפדף במהירות, והוא יעקוב אחריכם אוטומטית לפי מיקומכם בדף.
                </p>
            </div>

            {unified_body}
            
        </div>
    </main>

    <script>
        {unified_diagram_scripts}
        
        {unified_setup_script}
    </script>
</body>
</html>
"""

# Write to continuous.html
output_file = os.path.join(base_dir, "continuous.html")
with open(output_file, "w", encoding="utf-8") as f:
    f.write(continuous_html)

print("SUCCESS: continuous.html generated successfully!")
print("File size:", len(continuous_html), "chars")
