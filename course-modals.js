/**
 * course-modals.js - שפות תכנות (20905)
 * מערכת מודאלים אוטונומית ב-Vanilla JS לניהול חוויית משתמש:
 * 1. מדריך כניסה ראשונה (Welcome Roadmap Modal) - מותאם אישית לפדגוגיה, לקטלוג שאלות המבחן ולמפת הלימוד של שפות תכנות.
 * 2. חלון שיתוף ומאגר הקורסים הראשי (Share Modal) - מופיע לגולשים חוזרים מעל 24 שעות וחוזר מדי 5 ימים בלבד.
 * 
 * הכל מנוהל בצורה פרטית ב-localStorage ללא מעקב חיצוני וללא שום שרת.
 */

(function () {
    'use strict';

    const STORAGE_KEYS = {
        FIRST_SEEN: 'proglang_modal_first_seen_ts',
        WELCOME_SHOWN: 'proglang_welcome_modal_shown',
        LAST_SHARE_POPUP: 'proglang_last_share_popup_ts',
        SHARE_DISMISSED: 'proglang_share_modal_dismissed'
    };

    const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;
    const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

        function isMainPage() {
        try {
            const path = (window.location.pathname || '').toLowerCase().replace(/\\/g, '/');
            const segments = path.split('/').filter(Boolean);
            if (segments.length === 0) return true;
            const lastSegment = segments[segments.length - 1];
            return lastSegment === '' || lastSegment === 'index.html' || lastSegment === 'index';
        } catch (e) {
            return true;
        }
    }

function injectStyles() {
        if (document.getElementById('proglang-modals-styles')) return;

        const styleEl = document.createElement('style');
        styleEl.id = 'proglang-modals-styles';
        styleEl.textContent = `
            /* אנימציות כניסה ויציאה */
            @keyframes proglangFadeInBackdrop {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes proglangScaleInModal {
                from { opacity: 0; transform: scale(0.93) translateY(18px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes proglangPulseGlow {
                0%, 100% { box-shadow: 0 0 20px rgba(5, 150, 105, 0.22); }
                50% { box-shadow: 0 0 35px rgba(5, 150, 105, 0.35); }
            }
            @keyframes proglangRainbowSpin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes proglangToastSlide {
                from { opacity: 0; transform: translate(-50%, -20px); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }

            /* מעטפת הרקע (Backdrop) */
            .proglang-backdrop {
                position: fixed;
                inset: 0;
                background: rgba(15, 23, 42, 0.68);
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px;
                opacity: 0;
                animation: proglangFadeInBackdrop 0.25s ease-out forwards;
                font-family: 'Heebo', 'Rubik', system-ui, -apple-system, sans-serif;
                direction: rtl;
                text-align: right;
                box-sizing: border-box;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            .proglang-backdrop * {
                box-sizing: border-box;
            }

            /* כרטיס המודאל - מותאם באופן מלא לפלטת הצבעים של הקורס */
            .proglang-modal-card {
                position: relative;
                width: 100%;
                background: #ffffff;
                border: 1.5px solid #a7f3d0;
                border-radius: 22px;
                box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.4), 0 0 25px rgba(5, 150, 105, 0.22);
                display: flex;
                flex-direction: column;
                max-height: 88vh;
                opacity: 0;
                animation: proglangScaleInModal 0.3s ease-out forwards;
                overflow: hidden;
                transform: none !important;
            }

            /* גדלים מותאמים */
            .proglang-modal-card.welcome-size {
                max-width: 800px;
            }
            .proglang-modal-card.share-size {
                max-width: 520px;
            }

            /* כפתור סגירה X */
            .proglang-close-btn {
                position: absolute;
                top: 14px;
                left: 14px;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: #f1f5f9;
                border: 1px solid #cbd5e1;
                color: #334155;
                font-size: 18px;
                font-weight: 700;
                line-height: 1;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                z-index: 10;
            }
            .proglang-close-btn:hover {
                background: #ef4444;
                color: #ffffff;
                border-color: #ef4444;
                transform: rotate(90deg);
            }

            /* כותרת עליונה */
            .proglang-header {
                padding: 22px 26px 14px 26px;
                border-bottom: 1px solid #a7f3d0;
                background: linear-gradient(180deg, #ecfdf5 0%, #ffffff 100%);
                position: relative;
                flex-shrink: 0;
            }

            .proglang-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 4px 12px;
                border-radius: 9999px;
                font-size: 12.5px;
                font-weight: 800;
                background: #ecfdf5;
                color: #047857;
                border: 1px solid #a7f3d0;
                margin-bottom: 8px;
            }

            .proglang-title {
                margin: 0 0 4px 0;
                font-size: 20px;
                font-weight: 900;
                color: #047857;
                line-height: 1.3;
            }

            .proglang-subtitle {
                margin: 0;
                font-size: 13.5px;
                color: #475569;
                line-height: 1.45;
            }

            /* גוף המודאל עם גלילה נעימה */
            .proglang-body {
                padding: 18px 26px;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                flex-grow: 1;
            }

            /* כרטיס מדריך ראשי מעוצב */
            .proglang-guide-card {
                background: linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%);
                border: 1px solid #a7f3d0;
                border-radius: 14px;
                padding: 14px 16px;
                margin-bottom: 18px;
            }

            .proglang-guide-title {
                font-size: 14.5px;
                font-weight: 800;
                color: #047857;
                margin-bottom: 4px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .proglang-guide-text {
                font-size: 13.5px;
                color: #334155;
                line-height: 1.55;
                margin: 0;
            }

            /* רשימת האקורדיונים - פריטים סגורים במבנה מעטפה ("תיבת מכתב") */
            .proglang-acc-container {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 12px;
            }

            .proglang-acc-item {
                border: 1.5px solid #e2e8f0;
                background: #ffffff;
                border-radius: 14px;
                transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
                overflow: hidden;
                flex-shrink: 0;
            }
            .proglang-acc-item:hover {
                border-color: #a7f3d0;
                background: #ecfdf5;
                box-shadow: 0 4px 14px rgba(5, 150, 105, 0.22);
            }
            .proglang-acc-item.open {
                border-color: #059669;
                box-shadow: 0 4px 18px rgba(5, 150, 105, 0.22);
                background: #ffffff;
            }

            /* כפתור כותרת אקורדיון */
            .proglang-acc-header {
                width: 100%;
                background: none;
                border: none;
                padding: 13px 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                text-align: right;
                gap: 12px;
                font-family: inherit;
                transition: background-color 0.15s ease;
            }

            .proglang-acc-header-left {
                display: flex;
                align-items: center;
                gap: 12px;
                flex: 1;
                min-width: 0;
            }

            .proglang-acc-icon {
                font-size: 20px;
                width: 38px;
                height: 38px;
                border-radius: 10px;
                background: #ecfdf5;
                border: 1px solid #a7f3d0;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .proglang-acc-header-text {
                flex: 1;
                min-width: 0;
            }

            .proglang-acc-name {
                font-size: 14.5px;
                font-weight: 800;
                color: #0f172a;
                line-height: 1.35;
                margin-bottom: 2px;
            }
            .proglang-acc-item.open .proglang-acc-name {
                color: #047857;
            }

            .proglang-acc-snippet {
                font-size: 12.5px;
                color: #64748b;
                line-height: 1.4;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .proglang-acc-chevron {
                font-size: 12px;
                color: #94a3b8;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.25s ease, color 0.2s ease, background 0.2s ease;
                flex-shrink: 0;
            }
            .proglang-acc-item.open .proglang-acc-chevron {
                transform: rotate(180deg);
                color: #059669;
                background: #ecfdf5;
            }

            /* תוכן אקורדיון מורחב */
            .proglang-acc-content {
                display: none;
                padding: 0 18px 16px 18px;
                animation: proglangFadeInBackdrop 0.2s ease-out forwards;
            }
            .proglang-acc-item.open .proglang-acc-content {
                display: block;
            }

            .proglang-acc-desc {
                font-size: 13.5px;
                color: #0f172a;
                line-height: 1.65;
                padding-top: 12px;
                border-top: 1px dashed #a7f3d0;
            }

            .proglang-acc-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                margin: 12px 0 8px 0;
            }

            .proglang-tag {
                font-size: 11.5px;
                font-weight: 700;
                background: #ecfdf5;
                color: #047857;
                border: 1px solid #a7f3d0;
                padding: 2px 10px;
                border-radius: 9999px;
            }

            .proglang-acc-action-btn {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                font-size: 12.5px;
                font-weight: 800;
                color: #ffffff;
                background: #059669;
                padding: 6px 14px;
                border-radius: 8px;
                text-decoration: none;
                margin-top: 6px;
                transition: background 0.15s ease, transform 0.15s ease;
            }
            .proglang-acc-action-btn:hover {
                background: #047857;
                transform: translateX(-2px);
            }

            /* חלק תחתון (Footer) */
            .proglang-footer {
                padding: 14px 26px;
                border-top: 1px solid #e2e8f0;
                background: #f8fafc;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                flex-wrap: wrap;
                flex-shrink: 0;
            }

            .proglang-footer-notice {
                font-size: 12.5px;
                color: #475569;
                font-weight: 600;
                line-height: 1.45;
                flex: 1;
                min-width: 220px;
            }

            .proglang-btn-row {
                display: flex;
                gap: 8px;
                align-items: center;
            }

            .proglang-btn-primary {
                background: #059669;
                color: #ffffff;
                border: none;
                padding: 8px 18px;
                border-radius: 10px;
                font-size: 13.5px;
                font-weight: 800;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: background 0.15s ease, transform 0.15s ease;
            }
            .proglang-btn-primary:hover {
                background: #047857;
                transform: translateY(-1px);
            }

            .proglang-btn-secondary {
                background: #ffffff;
                border: 1.5px solid #cbd5e1;
                color: #334155;
                padding: 8px 14px;
                border-radius: 10px;
                font-size: 13px;
                font-weight: 700;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: all 0.15s ease;
            }
            .proglang-btn-secondary:hover {
                background: #f1f5f9;
                border-color: #94a3b8;
            }

            .proglang-btn-success {
                background: #10b981 !important;
                border-color: #10b981 !important;
                color: #ffffff !important;
            }

            /* כרטיס שיתוף מיוחד */
            .proglang-share-hub-card {
                display: flex;
                align-items: center;
                gap: 14px;
                padding: 14px 16px;
                background: #ecfdf5;
                border: 1.5px solid #a7f3d0;
                border-radius: 14px;
                text-decoration: none;
                margin-top: 14px;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .proglang-share-hub-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 18px rgba(5, 150, 105, 0.22);
            }

            /* הודעת טוסט (Toast) */
            .proglang-toast {
                position: fixed;
                top: 24px;
                left: 50%;
                transform: translateX(-50%);
                background: #0f172a;
                color: #ffffff;
                padding: 12px 24px;
                border-radius: 9999px;
                font-size: 14px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
                border: 1px solid #059669;
                z-index: 100000;
                animation: proglangToastSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }

            /* רספונסיביות למובייל */
            @media (max-width: 640px) {
                .proglang-header {
                    padding: 20px 20px 14px 20px;
                }
                .proglang-title {
                    font-size: 18px;
                }
                .proglang-body {
                    padding: 16px 18px;
                }
                .proglang-footer {
                    padding: 14px 18px 18px 18px;
                }
                .proglang-btn-row {
                    flex-direction: column;
                    width: 100%;
                }
                .proglang-btn-primary, .proglang-btn-secondary {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(styleEl);
    }

    function showToast(message, emoji = '✓') {
        const existing = document.querySelector('.proglang-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'proglang-toast';
        toast.innerHTML = `<span>${emoji}</span> <span>${message}</span>`;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    function copyCourseLink(btnElement) {
        // קישור ישיר לדף הראשי של האתר - נטו קישור בלבד ללא טקסט נלווה
        const baseUrl = 'https://summary-of-programming-languages.pages.dev/';

        const handleSuccess = () => {
            showToast('הקישור הועתק ללוח: ' + baseUrl, '📋');
            if (btnElement) {
                const origHtml = btnElement.innerHTML;
                btnElement.classList.add('proglang-btn-success');
                btnElement.innerHTML = `<span>✓</span> <span>הקישור הועתק!</span>`;
                setTimeout(() => {
                    btnElement.classList.remove('proglang-btn-success');
                    btnElement.innerHTML = origHtml;
                }, 2500);
            }
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(baseUrl).then(handleSuccess).catch(() => {
                fallbackCopy(baseUrl, handleSuccess);
            });
        } else {
            fallbackCopy(baseUrl, handleSuccess);
        }
    }

    function fallbackCopy(text, callback) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            if (callback) callback();
        } catch (e) {
            alert('העתק את הקישור מטה:\n\n' + text);
        }
        document.body.removeChild(textArea);
    }

    function createWelcomeModal() {
        try { localStorage.setItem(STORAGE_KEYS.WELCOME_SHOWN, 'true'); } catch (e) {}

        injectStyles();

        // הסרת מודאל קיים אם פתוח
        const existing = document.getElementById('proglang-welcome-backdrop');
        if (existing) existing.remove();

        const backdrop = document.createElement('div');
        backdrop.id = 'proglang-welcome-backdrop';
        backdrop.className = 'proglang-backdrop';

        backdrop.innerHTML = `
            <div class="proglang-modal-card welcome-size" role="dialog" aria-modal="true" aria-labelledby="proglang-welcome-title">
                <button type="button" class="proglang-close-btn" id="proglang-welcome-close-x" aria-label="סגור חלון">✕</button>

                <div class="proglang-header">
                    <div class="proglang-badge">
                        <span>🧭</span>
                        <span>מדריך התמצאות ולמידה בקורס</span>
                    </div>
                    <h2 class="proglang-title" id="proglang-welcome-title">שפות תכנות (EOPL) (20905)</h2>
                    <p class="proglang-subtitle">הסבר על מבנה האתר, מצבי הלימוד ביחידות, תרגול השאלות ומאגרי הבחינות</p>
                </div>

                <div class="proglang-body">
                    <div class="proglang-guide-card">
                        <div class="proglang-guide-title">
                            <span>💡</span>
                            <span>איך ללמוד ולהצליח בקורס</span>
                        </div>
                        <p class="proglang-guide-text">
                            כל הסעיפים מטה מוצגים כתיבות מכתב סגורות ומסודרות. לחצו על כל סעיף כדי לפתוח אותו ולקבל פירוט מלא על אופן הפעולה, הכלים והיתרונות המובנים בו:
                        </p>
                    </div>

                    <div class="proglang-acc-container">
                        <!-- פריט 1: פרקי הלימוד (סגור בהתחלה) -->
                        <div class="proglang-acc-item" id="proglang-acc-1">
                            <button type="button" class="proglang-acc-header" onclick="window.__proglangToggleAcc(1)">
                                <div class="proglang-acc-header-left">
                                    <div class="proglang-acc-icon">📚</div>
                                    <div class="proglang-acc-header-text">
                                        <div class="proglang-acc-name">1. פרקי הלימוד ואופן הלמידה המובנה</div>
                                        <div class="proglang-acc-snippet">כיסוי מלא של סילבוס הקורס, מצבי תצוגה מותאמים ושאלות הכוונה עצמית</div>
                                    </div>
                                </div>
                                <div class="proglang-acc-chevron">▼</div>
                            </button>
                            <div class="proglang-acc-content">
                                <div class="proglang-acc-desc">
                                    כרכי EOPL (כרכים 1–5: רקורסיה תחבירית ב-Scheme, מבני סביבות Environments, מפרשים, העברת פרמטרים, המרת המשכים CPS, ומערכות טיפוסים). כולל דף קריאה רציפה continuous.html לחיפוש מהיר.
                                    
                                <div style="background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 12px; padding: 12px 14px; margin: 10px 0;">
                                    <strong style="color: #047857; font-size: 14px; display: block; margin-bottom: 6px;">📑 מבנה הלימוד המודולרי:</strong>
                                    <p style="margin: 0 0 8px 0; font-size: 13px; line-height: 1.55; color: #334155;">
                                        הפרקים בנויים בלמידה מודולרית הדרגתית: מעבר מתפיסה עיונית, דרך פירוק מנגנונים ותרשימי זרימה, ועד תרגול מעשי של שאלות מבחן מוטמעות בכל נושא.
                                    </p>
                                </div>
                                </div>
                                <div class="proglang-acc-tags">
                                    <span class="proglang-tag">כיסוי מלא של הסילבוס</span>
                                    <span class="proglang-tag">מצבי תצוגה מובנים</span>
                                    <span class="proglang-tag">שאלות הכוונה עצמית ❓</span>
                                </div>
                                <a href="1.html" class="proglang-acc-action-btn">
                                    <span>כניסה לכרך 1: תחביר וסמנטיקה</span>
                                    <span>←</span>
                                </a>
                            </div>
                        </div>

                        <!-- פריט 2: הסימולציות והעזרים הגרפיים (סגור בהתחלה) -->
                        <div class="proglang-acc-item" id="proglang-acc-2">
                            <button type="button" class="proglang-acc-header" onclick="window.__proglangToggleAcc(2)">
                                <div class="proglang-acc-header-left">
                                    <div class="proglang-acc-icon">🌊</div>
                                    <div class="proglang-acc-header-text">
                                        <div class="proglang-acc-name">2. הסימולציות והעזרים הגרפיים — מה לומדים מהם ואיך לתפעל</div>
                                        <div class="proglang-acc-snippet">המחשת מנגנונים דינמיים, חקירת פרמטרים ומקרי קצה בזמן אמת במקום שינון יבש</div>
                                    </div>
                                </div>
                                <div class="proglang-acc-chevron">▼</div>
                            </button>
                            <div class="proglang-acc-content">
                                <div class="proglang-acc-desc">
                                    העזרים הוויזואליים והמעבדות האינטראקטיביות שזורים ישירות בתוך פרקי הלימוד:
                                    <ul style="margin: 6px 0; padding-right: 20px; line-height: 1.65; font-size: 13.5px; color: #1e293b;">
                                        <li><strong>🎯 מה הערך הפדגוגי שלהם:</strong> הסימולציות נועדו להמחיש את המנגנונים הדינמיים (התנהגות תהליכים, תנועת נתונים, פעולת אלגוריתמים, שינויים במרחב וגבולות) שקשה לתפוס מטקסט סטטי בלבד.</li>
                                        <li><strong>💡 איך ללמוד מהם נכון:</strong> אל תסתפקו בהתבוננות פסיבית! שנו ערכים בסליידרים, הזינו קלטים שונים, הריצו תהליכים צעד-אחר-צעד, ובדקו מקרי קצה כדי לראות את התגובה בזמן אמת.</li>
                                        <li><strong>🔍 בקורס זה:</strong> מעקב אינטראקטיבי אחר עצי סביבות (Ribcage/Extended Env), מעקב שלב-אחר-שלב אחרי שרשרת Continuations ב-CPS, ותרשימי Unification במערכות טיפוסים.</li>
                                    </ul>
                                </div>
                                <div class="proglang-acc-tags">
                                    <span class="proglang-tag">המחשה ויזואלית חיה</span>
                                    <span class="proglang-tag">שינוי פרמטרים ומקרי קצה</span>
                                    <span class="proglang-tag">הבנה אינטואיטיבית עמוקה</span>
                                </div>
                                <a href="1.html" class="proglang-acc-action-btn">
                                    <span>למעבדות בפרק הראשון</span>
                                    <span>←</span>
                                </a>
                            </div>
                        </div>

                        <!-- פריט 3: תרגול שאלות ומצבי התשובה (סגור בהתחלה) -->
                        <div class="proglang-acc-item" id="proglang-acc-3">
                            <button type="button" class="proglang-acc-header" onclick="window.__proglangToggleAcc(3)">
                                <div class="proglang-acc-header-left">
                                    <div class="proglang-acc-icon">🎯</div>
                                    <div class="proglang-acc-header-text">
                                        <div class="proglang-acc-name">3. תרגול שאלות, מצבי הפתרון וניתוח מסיחים</div>
                                        <div class="proglang-acc-snippet">שאלות הכוונה ❓ בפרקים, דרגות פתרון מדורגות (רמז, שלד, פתרון מלא) ופירוק מלכודות</div>
                                    </div>
                                </div>
                                <div class="proglang-acc-chevron">▼</div>
                            </button>
                            <div class="proglang-acc-content">
                                <div class="proglang-acc-desc">
                                    המערכת מעודדת תרגול אקטיבי ולא רק קריאה פסיבית:
                                    <ul style="margin: 6px 0; padding-right: 20px; line-height: 1.65; font-size: 13.5px; color: #1e293b;">
                                        <li><strong>❓ שאלות הכוונה (Active Recall):</strong> לצד תת-סעיפים מוטמע כפתור ❓. לפני שאתם קוראים את ההסבר או הפתרון, לחצו עליו ונסו לנסח את התשובה בעצמכם כדי לוודא שאתם מסוגלים לשחזר את החומר לבד.</li>
                                        <li><strong>🎚️ מצבי התשובה והפתרון בשאלות:</strong>
                                            <div style="margin-top: 4px; padding: 6px 12px; background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 8px; font-size: 12.5px; line-height: 1.6;">
                                                • <strong>רמז (Hint):</strong> כיוון מחשבה ראשוני להתמודדות עצמאית מבלי לחשוף את התשובה.<br>
                                                • <strong>שלד פתרון (Solution Outline):</strong> ראשי הפרקים ושלבי העבודה המרכזיים של התשובה.<br>
                                                • <strong>פתרון מלא ומנומק (Full Solution):</strong> פתרון פורמלי ומלא שלב-אחר-שלב ברמת בחינה.
                                            </div>
                                        </li>
                                        <li><strong>🧠 ניתוח מסיחים מעמיק:</strong> בשאלות רב-ברירה, המערכת מפרקת עבורכם כל אחד מהמסיחים השגויים: למה הוא נראה מפתה, איזו טעות חישוב או הנחה מוטעית הובילה אליו, ואיך להיזהר מהמלכודת של כותבי הבחינה.</li>
                                        
                                    </ul>
                                </div>
                                <div class="proglang-acc-tags">
                                    <span class="proglang-tag">שאלות הכוונה ❓</span>
                                    <span class="proglang-tag">רמז / שלד / פתרון מלא</span>
                                    <span class="proglang-tag">ניתוח מעמיק לכל מסיח</span>
                                </div>
                                <a href="1.html" class="proglang-acc-action-btn">
                                    <span>לתרגול בפרקים</span>
                                    <span>←</span>
                                </a>
                            </div>
                        </div>

                        <!-- פריט 4: מאגר הבחינות והדרייב (סגור בהתחלה) -->
                        <div class="proglang-acc-item" id="proglang-acc-4">
                            <button type="button" class="proglang-acc-header" onclick="window.__proglangToggleAcc(4)">
                                <div class="proglang-acc-header-left">
                                    <div class="proglang-acc-icon">📑</div>
                                    <div class="proglang-acc-header-text">
                                        <div class="proglang-acc-name">4. מאגר הבחינות, קובצי המקור ב-Google Drive ומחברות (91–100)</div>
                                        <div class="proglang-acc-snippet">עשרות בחינות משוחזרות, קישורים לטפסי מקור בדרייב, פתרונות רשמיים והשוואה למחברות שקיבלו 100</div>
                                    </div>
                                </div>
                                <div class="proglang-acc-chevron">▼</div>
                            </button>
                            <div class="proglang-acc-content">
                                <div class="proglang-acc-desc">
                                    הכנה מעשית ממוקדת לבחינת הגמר של האוניברסיטה הפתוחה:
                                    <ul style="margin: 6px 0; padding-right: 20px; line-height: 1.65; font-size: 13.5px; color: #1e293b;">
                                        <li><strong>📁 מה כולל מאגר ה-Google Drive:</strong>
                                            <div style="margin-top: 4px; padding: 6px 12px; background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 8px; font-size: 12.5px; line-height: 1.6;">
                                                • <strong>טפסי בחינה סרוקים מקוריים</strong> של האוניברסיטה הפתוחה ממועדי א', ב' ומיוחדים.<br>
                                                • <strong>פתרונות רשמיים</strong> מלאים ומפורטים.<br>
                                                • <strong>מחברות בחינה אמיתיות של סטודנטים שקיבלו ציונים 91–100:</strong> מאפשר להשוות את דרך הכתיבה, הפירוט והנימוק שלכם לכתיבה שקיבלה ניקוד מלא במבחן.
                                            </div>
                                        </li>
                                        <li><strong>🎯 מצב מיקוד לבחינה:</strong> בדפי המבחנים ניתן להפעיל מצב מיקוד (קיפול תפריטים והסחות דעת) ולתרגל עם שעון עצר כדי להתרגל לזמני הבחינה האמיתיים.</li>
                                    </ul>
                                </div>
                                <div class="proglang-acc-tags">
                                    <span class="proglang-tag">עשרות בחינות</span>
                                    <span class="proglang-tag">קובצי מקור ב-Google Drive</span>
                                    <span class="proglang-tag">מחברות מצטיינים (91–100)</span>
                                    <span class="proglang-tag">מצב מיקוד וטיימר</span>
                                </div>
                                <a href="index.html#exams" class="proglang-acc-action-btn">
                                    <span>קטלוג שאלות עבר ממוין Q1/Q2/Q3 וארכיון הדרייב</span>
                                    <span>←</span>
                                </a>
                            </div>
                        </div>

                        <!-- פריט 5: חומרי הסיכום והעזרים המשלימים (סגור בהתחלה) -->
                        <div class="proglang-acc-item" id="proglang-acc-5">
                            <button type="button" class="proglang-acc-header" onclick="window.__proglangToggleAcc(5)">
                                <div class="proglang-acc-header-left">
                                    <div class="proglang-acc-icon">📝</div>
                                    <div class="proglang-acc-header-text">
                                        <div class="proglang-acc-name">5. חומרי הסיכום והעזרים המשלימים</div>
                                        <div class="proglang-acc-snippet">מחברת סיכום מקיפה עם מרקרים פסטליים וטבלאות השוואה לחזרה מהירה לפני המבחן</div>
                                    </div>
                                </div>
                                <div class="proglang-acc-chevron">▼</div>
                            </button>
                            <div class="proglang-acc-content">
                                <div class="proglang-acc-desc">
                                    כלי עיון וחזרה מרוכזת לשלבי הסיום של הלמידה:
                                    <ul style="margin: 6px 0; padding-right: 20px; line-height: 1.65; font-size: 13.5px; color: #1e293b;">
                                        <li><strong>📝 סיכום הקורס המקיף:</strong> זמין בדף <a href="eopl_complete_summary.html" style="color: #059669; font-weight: bold; text-decoration: underline;">סיכום EOPL המלא ומילון הפונקציות</a> — מחברת סיכום דיגיטלית מסודרת עם הדגשות צבעוניות וטבלאות השוואה מהירות.</li>
                                    <li><strong>📖 מצב קריאה ברצף של כל הכרכים:</strong> זמין בדף <a href="continuous.html" style="color: #059669; font-weight: bold; text-decoration: underline;">continuous.html</a> — קריאה שוטפת של כל הכרכים בדף אחד וחיפוש מהיר ב-Ctrl+F.</li>
                                    </ul>
                                </div>
                                <div class="proglang-acc-tags">
                                    <span class="proglang-tag">סיכום מקיף ומסודר</span>
                                    <span class="proglang-tag">מרקרים פסטליים</span>
                                    <span class="proglang-tag">טבלאות השוואה מהירות</span>
                                </div>
                                <a href="eopl_complete_summary.html" class="proglang-acc-action-btn">
                                    <span>לסיכום הקורס המקיף</span>
                                    <span>←</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- פוטר עם העתקת קישור בלבד -->
                    <div class="proglang-footer">
                        <div class="proglang-footer-notice">
                            💬 מכירים חברים שלומדים את הקורס? נשמח שתשתפו אותם בקישור הישיר לאתר.
                        </div>
                        <div class="proglang-btn-row">
                            <button type="button" class="proglang-btn-secondary" id="proglang-welcome-copy-btn">
                                📋 העתקת קישור לאתר
                            </button>
                            <button type="button" class="proglang-btn-primary" id="proglang-welcome-start-btn">
                                🚀 הבנתי, בואו נתחיל
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(backdrop);

        const closeModal = () => {
            try { localStorage.setItem(STORAGE_KEYS.WELCOME_SHOWN, 'true'); } catch (e) {}

            backdrop.style.opacity = '0';
            backdrop.style.transition = 'opacity 0.25s ease';
            setTimeout(() => backdrop.remove(), 250);
        };

        // אירועים
        document.getElementById('proglang-welcome-close-x').addEventListener('click', closeModal);
        document.getElementById('proglang-welcome-start-btn').addEventListener('click', closeModal);
        document.getElementById('proglang-welcome-copy-btn').addEventListener('click', function () {
            copyCourseLink(this);
        });

        // סגירה בלחיצה על הרקע החיצוני
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeModal();
        });

        // סגירה ב-Escape
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
    }

    function createShareModal() {
        injectStyles();

        const existing = document.getElementById('proglang-share-backdrop');
        if (existing) existing.remove();

        const backdrop = document.createElement('div');
        backdrop.id = 'proglang-share-backdrop';
        backdrop.className = 'proglang-backdrop';

        backdrop.innerHTML = `
            <div class="proglang-modal-card share-size" role="dialog" aria-modal="true" aria-labelledby="proglang-share-title">
                <button class="proglang-close-btn" id="proglang-share-close-x" title="סגור חלון" aria-label="סגור חלון">✕</button>

                <div class="proglang-header" style="text-align: center;">
                    <div class="proglang-badge" style="margin: 0 auto 8px auto;">
                        <span>💙</span>
                        <span>אוהבים את האתר? עוזרים לחברים!</span>
                    </div>
                    <h2 class="proglang-title" id="proglang-share-title" style="font-size: 20px;">
                        נהנים מהלימוד בשפות תכנות? שתפו והמליצו! 😊
                    </h2>
                    <p class="proglang-subtitle">
                        מאגר הקורסים והסיכומים שלנו מתעדכן באופן שוטף. אם האתר מסייע לכם בלמידה, או אם אתם מכירים סטודנטים שמחפשים דרך יעילה להבין את החומר ולהתכונן למבחן — נשמח שתשתפו אותם בקישור הישיר לאתר.
                    </p>
                </div>

                <div class="proglang-body" style="padding-top: 14px; padding-bottom: 14px; gap: 14px;">
                    <!-- כרטיס קישור ישיר להעתקה -->
                    <div style="background: #ffffff; border: 1.5px solid #bae6fd; border-radius: 16px; padding: 14px 16px;">
                        <label style="display: block; font-size: 13px; font-weight: 800; color: #0c4a6e; margin-bottom: 8px;">
                            📋 קישור ישיר לאתר (נטו קישור):
                        </label>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <input id="proglang-share-link-input" type="text" readonly value="https://summary-of-programming-languages.pages.dev/"
                                style="flex: 1; padding: 10px 14px; border: 1.5px solid #7dd3fc; border-radius: 10px; font-size: 13.5px; background: #f0f9ff; color: #0c4a6e; direction: ltr; text-align: left; font-family: monospace; font-weight: 600; outline: none;">
                            <button type="button" class="proglang-btn-primary" id="proglang-share-copy-btn" style="min-width: unset; padding: 10px 18px; font-size: 13.5px; white-space: nowrap; display: flex; align-items: center; gap: 6px;">
                                <span>📋</span>
                                <span>העתק קישור</span>
                            </button>
                        </div>
                    </div>

                    <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 14px 16px;">
                        <div style="font-weight: 800; color: #0f172a; font-size: 14.5px; margin-bottom: 4px; display: flex; items-center; gap: 6px;">
                            <span>🌐</span> <span>מאגר כל הקורסים הראשי:</span>
                        </div>
                        <p style="font-size: 12.5px; color: #475569; margin: 0 0 10px 0; line-height: 1.45;">
                            מחפשים קורסים נוספים במדעי המחשב ובמתמטיקה? היכנסו לפורטל הראשי המרכז את כל האתרים האינטראקטיביים שלנו.
                        </p>
                        <a href="https://all-the-courses.pages.dev/" target="_blank" rel="noopener noreferrer" class="proglang-btn-secondary" style="width: 100%; min-width: unset; padding: 10px 16px; font-size: 13.5px; text-decoration: none;">
                            <span>למעבר למאגר הקורסים הראשי</span>
                            <span>←</span>
                        </a>
                    </div>
                </div>

                <div class="proglang-footer" style="padding-top: 12px; padding-bottom: 14px;">
                    <button type="button" class="proglang-btn-secondary" id="proglang-share-dismiss-btn" style="width: 100%; min-width: unset; padding: 9px 16px; font-size: 13px; border-color: transparent; background: transparent; color: #64748b;">
                        <span>המשך בלימוד (סגור חלון)</span>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(backdrop);

        const closeShare = () => {
            const now = Date.now();
            localStorage.setItem(STORAGE_KEYS.LAST_SHARE_POPUP, now.toString());
            backdrop.style.opacity = '0';
            backdrop.style.transition = 'opacity 0.25s ease';
            setTimeout(() => backdrop.remove(), 250);
        };

        document.getElementById('proglang-share-close-x').addEventListener('click', closeShare);
        document.getElementById('proglang-share-dismiss-btn').addEventListener('click', closeShare);
        document.getElementById('proglang-share-copy-btn').addEventListener('click', function () {
            copyCourseLink(this);
        });

        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeShare();
        });
    }

    window.__proglangToggleAcc = function (index) {
        const item = document.getElementById(`proglang-acc-${index}`);
        if (!item) return;

        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.proglang-acc-item').forEach(el => el.classList.remove('open'));

        if (!isOpen) {
            item.classList.add('open');
        }
    };

    window.showCourseWelcomeModal = function () {
        createWelcomeModal();
    };
    window.showCourseShareModal = function () {
        createShareModal();
    };

    function checkAndTriggerModals() {
        try {
            const isMain = isMainPage();
            const welcomeShown = localStorage.getItem(STORAGE_KEYS.WELCOME_SHOWN) === 'true';

            // מניעת הקפצה חוזרת בעמודים פנימיים (פרקים, מבחנים, סיכומים)
            if (!isMain && welcomeShown) {
                return;
            }

            const now = Date.now();
            let firstSeen = localStorage.getItem(STORAGE_KEYS.FIRST_SEEN);
            if (!firstSeen) {
                firstSeen = now.toString();
                try {
                    localStorage.setItem(STORAGE_KEYS.FIRST_SEEN, firstSeen);
                } catch (e) {}
            } else {
                firstSeen = parseInt(firstSeen, 10);
            }

            // תרחיש 1: כניסה ראשונה אי-פעם לאתר (בכל עמוד שהוא)
            if (!welcomeShown) {
                try {
                    localStorage.setItem(STORAGE_KEYS.WELCOME_SHOWN, 'true');
                } catch (e) {}
                setTimeout(() => {
                    createWelcomeModal();
                }, 800);
                return;
            }

            // תרחיש 2: גולש חוזר (חלון שיתוף 5 ימים) - באופן בלעדי בעמוד הראשי בלבד!
            if (!isMain) {
                return;
            }

            const timeSinceFirstSeen = now - firstSeen;
            const lastSharePopup = parseInt(localStorage.getItem(STORAGE_KEYS.LAST_SHARE_POPUP) || '0', 10);

            if (timeSinceFirstSeen >= TWENTY_FOUR_HOURS_MS) {
                const timeSinceLastShare = now - lastSharePopup;
                if (lastSharePopup === 0 || timeSinceLastShare >= FIVE_DAYS_MS) {
                    setTimeout(() => {
                        createShareModal();
                    }, 1200);
                }
            }
        } catch (e) {
            console.error('Error in checkAndTriggerModals:', e);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndTriggerModals);
    } else {
        checkAndTriggerModals();
    }

})();
