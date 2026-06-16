(function() {
    // Only run if dictionaryData is available
    if (typeof dictionaryData === 'undefined') {
        console.warn('dictionaryData not found. Please include functions_data.js before dictionary-tooltip.js');
        return;
    }

    // 1. Inject minimal CSS for the modal and tooltip
    const style = document.createElement('style');
    style.textContent = `
        .dict-word {
            cursor: pointer;
            border-bottom: 1px dashed #38bdf8;
            position: relative;
            transition: all 0.2s;
        }
        .dict-word:hover {
            background-color: rgba(56, 189, 248, 0.15);
            color: #38bdf8 !important;
        }
        .modal-glass {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .dir-ltr { direction: ltr; }
    `;
    document.head.appendChild(style);

    // 2. Inject Modal HTML into body
    const modalHTML = `
    <!-- Modal Backdrop -->
    <div id="functionModal" class="fixed inset-0 z-50 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true" style="direction: rtl;">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity opacity-0 duration-300" id="modalBackdrop"></div>

        <!-- Modal Panel -->
        <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div id="modalContent" class="modal-glass relative transform overflow-hidden rounded-2xl text-right shadow-xl transition-all duration-300 sm:my-8 sm:w-full sm:max-w-2xl opacity-0 scale-95 flex flex-col max-h-[90vh]">
                    
                    <!-- Close button -->
                    <button id="closeModalBtn" class="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>

                    <!-- Modal Header -->
                    <div class="px-6 pt-6 pb-4 border-b border-slate-100">
                        <div class="flex items-center gap-3 mb-2">
                            <span id="modalCategoryBadge" class="inline-flex items-center rounded-md bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700 ring-1 ring-inset ring-sky-700/10"></span>
                            <span id="modalSubCategoryBadge" class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10"></span>
                        </div>
                        <h3 id="modalTitle" class="text-3xl font-black font-mono text-slate-800 dir-ltr text-left inline-block"></h3>
                    </div>

                    <!-- Modal Body (Scrollable) -->
                    <div class="px-6 py-5 overflow-y-auto flex-grow">
                        <!-- Model / Description -->
                        <div class="mb-6">
                            <h4 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                מה זה בעצם עושה?
                            </h4>
                            <p id="modalModel" class="text-lg text-slate-800 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100"></p>
                        </div>

                        <!-- Code Example -->
                        <div class="mb-6 relative group">
                            <h4 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                איך זה נראה בקוד?
                            </h4>
                            <div class="relative">
                                <pre><code id="modalCode" class="language-scheme"></code></pre>
                            </div>
                        </div>

                        <!-- Usage -->
                        <div class="mb-2">
                            <h4 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                מתי משתמשים בזה במבחן?
                            </h4>
                            <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 text-md leading-relaxed">
                                <span id="modalUsage"></span>
                            </div>
                        </div>
                        
                        <!-- Detailed Examples (If any) -->
                        <div id="modalDetailedContainer" class="hidden mt-6">
                             <h4 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                דוגמאות מפורטות / הערות
                            </h4>
                            <div class="text-slate-700 text-sm leading-relaxed" id="modalDetailed"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = modalHTML;
    document.body.appendChild(div);

    // 3. Modal logic
    const modal = document.getElementById('functionModal');
    const backdrop = document.getElementById('modalBackdrop');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.getElementById('closeModalBtn');

    function openModal(item) {
        document.getElementById('modalTitle').textContent = item.title;
        document.getElementById('modalCategoryBadge').textContent = item.category || 'כללי';
        document.getElementById('modalSubCategoryBadge').textContent = item.subCategory || '';
        document.getElementById('modalModel').textContent = item.model;
        
        const codeBlock = document.getElementById('modalCode');
        codeBlock.textContent = item.code;
        if (window.Prism) {
            Prism.highlightElement(codeBlock);
        }

        document.getElementById('modalUsage').innerHTML = item.usage;

        const detailedContainer = document.getElementById('modalDetailedContainer');
        const detailedBlock = document.getElementById('modalDetailed');
        if (item.detailed && item.detailed.trim() !== '') {
            detailedBlock.innerHTML = item.detailed;
            detailedContainer.classList.remove('hidden');
        } else {
            detailedContainer.classList.add('hidden');
        }

        // Show modal with animation
        modal.classList.remove('hidden');
        // Force reflow
        void modal.offsetWidth;
        backdrop.classList.add('opacity-100');
        backdrop.classList.remove('opacity-0');
        modalContent.classList.add('opacity-100', 'scale-100');
        modalContent.classList.remove('opacity-0', 'scale-95');
    }

    function closeModal() {
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');
        modalContent.classList.remove('opacity-100', 'scale-100');
        modalContent.classList.add('opacity-0', 'scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300); // match transition duration
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // 4. Hook into Prism to identify words in the dictionary
    if (window.Prism) {
        Prism.hooks.add('complete', function(env) {
            if (env.element.id === 'modalCode') return; // Don't highlight inside the modal itself

            const tokens = env.element.querySelectorAll('.token');
            tokens.forEach(token => {
                const text = token.textContent.trim();
                // Find in dictionary (check both title and id)
                const item = dictionaryData.find(d => d.title === text || d.id === text);
                if (item) {
                    token.classList.add('dict-word');
                    token.title = "לחץ להסבר ממילון הפונקציות";
                    token.dataset.dictId = item.id;
                }
            });
        });
    }

    // 5. Global click listener for .dict-word
    document.addEventListener('click', function(e) {
        const token = e.target.closest('.dict-word');
        if (token) {
            const dictId = token.dataset.dictId;
            const text = token.textContent.trim();
            const item = dictionaryData.find(d => d.id === dictId || d.title === text || d.id === text);
            if (item) {
                openModal(item);
            }
        }
    });

})();
