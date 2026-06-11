(function() {
    const THEME_STORAGE_KEY = 'site-theme';
    const THEMES = ['normal', 'dark', 'reading'];
    
    // Get current theme or default to normal
    let currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'normal';
    
    // Create style element for theme
    const styleEl = document.createElement('style');
    styleEl.id = 'dynamic-theme-style';
    document.head.appendChild(styleEl);

    function applyTheme(theme) {
        let css = '';
        if (theme === 'dark') {
            // Dark mode via inversion
            css = `
                html {
                    filter: invert(0.9) hue-rotate(180deg);
                }
                /* Re-invert media and already-dark elements so they look normal */
                img, video, iframe, aside, pre, .bg-slate-900, .bg-slate-800, .bg-darker, .bg-dark, .no-invert {
                    filter: invert(1) hue-rotate(180deg);
                }
            `;
        } else if (theme === 'reading') {
            // Reading mode via sepia and slightly reduced brightness
            css = `
                html {
                    filter: sepia(0.5) brightness(0.95);
                    background-color: #fdf6e3;
                }
            `;
        }
        
        styleEl.textContent = css;
        
        // Update button icon if it exists
        updateButtonIcon(theme);
    }

    function updateButtonIcon(theme) {
        const btnIcon = document.getElementById('theme-toggle-icon');
        const btnText = document.getElementById('theme-toggle-text');
        if (!btnIcon) return;
        
        // Assuming we use Lucide icons which are already loaded in index.html
        if (theme === 'normal') {
            btnIcon.setAttribute('data-lucide', 'sun');
            if (btnText) btnText.innerHTML = 'מצב<br>רגיל';
        } else if (theme === 'dark') {
            btnIcon.setAttribute('data-lucide', 'moon');
            if (btnText) btnText.innerHTML = 'מצב<br>כהה';
        } else if (theme === 'reading') {
            btnIcon.setAttribute('data-lucide', 'book-open');
            if (btnText) btnText.innerHTML = 'מצב<br>קריאה';
        }
        
        // Re-initialize lucide icons if the function exists
        if (window.lucide && window.lucide.createIcons) {
            window.lucide.createIcons();
        }
    }

    // Expose toggle function globally
    window.toggleTheme = function() {
        const currentIndex = THEMES.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % THEMES.length;
        currentTheme = THEMES[nextIndex];
        
        localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
        applyTheme(currentTheme);
    };

    // Apply on load
    applyTheme(currentTheme);
    
    // Ensure icons update after DOM is fully loaded if button is rendered later
    document.addEventListener('DOMContentLoaded', () => {
        updateButtonIcon(currentTheme);
        
        // Hide button on all pages except index.html
        const isIndex = window.location.pathname.endsWith('index.html') || 
                        window.location.pathname.endsWith('/') || 
                        window.location.pathname === '';
        
        if (!isIndex) {
            const btn = document.querySelector('button[onclick="toggleTheme()"]');
            if (btn) {
                btn.style.display = 'none';
            }
        }
    });
})();
