// ===================================
// Initialize Application
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    generateHeader();
    generateTOC();
    generateSections();
    loadMarkdownContent();
    initializeToggles();
});

// ===================================
// Generate Header from Config
// ===================================
function generateHeader() {
    const header = document.getElementById('documentHeader');
    header.innerHTML = `
        <h1>${SITE_CONFIG.title}</h1>
        <p class="subtitle">${SITE_CONFIG.subtitle}</p>
        <p class="last-updated">Last Updated: <span id="lastUpdated">${SITE_CONFIG.lastUpdated}</span></p>
    `;
}

// ===================================
// Generate Table of Contents from Config
// ===================================
function generateTOC() {
    const toc = document.getElementById('tableOfContents');
    const ul = document.createElement('ul');
    ul.className = 'nav-main-list';

    SITE_CONFIG.sections.forEach((section, index) => {
        const li = document.createElement('li');
        li.className = 'toc-item collapsed'; // collapsed by default

        const headerDiv = document.createElement('div');
        headerDiv.className = 'toc-section-header';
        headerDiv.innerHTML = `
            <div class="nav-item-wrapper">
                <span class="toc-toggle">🔽</span>
                <span class="section-number">${index + 1}</span>
                <a href="#${section.id}" class="toc-link">${section.title}</a>
                <span class="nav-indicator"></span>
            </div>
        `;

        li.appendChild(headerDiv);

        if (section.subsections && section.subsections.length > 0) {
            const subUl = document.createElement('ul');
            subUl.className = 'toc-subsections';

            section.subsections.forEach((sub, subIndex) => {
                const subLi = document.createElement('li');
                subLi.innerHTML = `
                    <div class="nav-subitem-wrapper">
                        <span class="subsection-dot">•</span>
                        <a href="#${section.id}" class="toc-sublink">${index + 1}.${subIndex + 1} ${sub}</a>
                    </div>
                `;
                subUl.appendChild(subLi);
            });

            li.appendChild(subUl);
        }

        ul.appendChild(li);
    });

    toc.appendChild(ul);
}

// ===================================
// Generate Section Containers from Config
// ===================================
function generateSections() {
    const container = document.getElementById('contentContainer');

    SITE_CONFIG.sections.forEach(section => {
        const sectionElement = document.createElement('section');
        sectionElement.id = section.id;
        sectionElement.className = 'content-section';
        sectionElement.setAttribute('data-markdown', section.file);
        sectionElement.innerHTML = '<div class="loading">Loading content...</div>';

        container.appendChild(sectionElement);
    });
}

// ===================================
// Load Markdown Content
// ===================================
async function loadMarkdownContent() {
    const sections = document.querySelectorAll('[data-markdown]');

    for (const section of sections) {
        const markdownFile = section.getAttribute('data-markdown');

        try {
            const response = await fetch(markdownFile, { cache: 'no-cache' });
            if (!response.ok) throw new Error(`Failed to load ${markdownFile}`);

            const markdownText = await response.text();
            const htmlContent = marked.parse(markdownText);
            section.innerHTML = htmlContent;
        } catch (error) {
            console.error(`Error loading ${markdownFile}:`, error);
            section.innerHTML = `<p class="error">Failed to load content from ${markdownFile}</p>`;
        }
    }

    // Apply features after all content is loaded
    setTimeout(() => {
        makeChaptersCollapsible();
        makeExternalLinksOpenInNewTab();
        highlightActiveSection();
    }, 100);
}

// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('toc-link') || e.target.classList.contains('toc-sublink')) {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    }
});

// ===================================
// Active Section Highlighting
// ===================================
function highlightActiveSection() {
    const sections = document.querySelectorAll('.content-section');
    const tocLinks = document.querySelectorAll('.toc-link');

    let currentSection = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

window.addEventListener('scroll', throttle(highlightActiveSection, 100));

// ===================================
// Toggle Functionality for TOC and Chapters
// ===================================
function initializeToggles() {
    setTimeout(() => {
        // TOC section toggles
        const tocToggles = document.querySelectorAll('.toc-section-header');
        tocToggles.forEach(header => {
            header.addEventListener('click', (e) => {
                if (e.target.classList.contains('toc-link')) return;
                header.parentElement.classList.toggle('collapsed');
            });
        });
    }, 100);

    // Enhanced Collapse/Expand All Button
    const collapseAllBtn = document.getElementById('collapseAllBtn');
    const navToggleBtn = document.getElementById('navToggleBtn');
    let allCollapsed = true;
    collapseAllBtn.innerHTML = '📋 Expand All';

    collapseAllBtn.addEventListener('click', () => {
        const tocItems = document.querySelectorAll('.toc-item');
        const chapters = document.querySelectorAll('.content-section h2');
        const wrappers = document.querySelectorAll('.chapter-content');

        if (allCollapsed) {
            tocItems.forEach(item => {
                item.classList.remove('collapsed');
                item.classList.add('expanding');
                setTimeout(() => item.classList.remove('expanding'), 300);
            });
            chapters.forEach(h2 => h2.classList.remove('collapsed'));
            wrappers.forEach(w => w.classList.remove('collapsed'));
            collapseAllBtn.innerHTML = '📁 Collapse All';
        } else {
            tocItems.forEach(item => {
                item.classList.add('collapsed');
                item.classList.add('collapsing');
                setTimeout(() => item.classList.remove('collapsing'), 300);
            });
            chapters.forEach(h2 => h2.classList.add('collapsed'));
            wrappers.forEach(w => w.classList.add('collapsed'));
            collapseAllBtn.innerHTML = '📋 Expand All';
        }

        allCollapsed = !allCollapsed;
    });

    // Navigation visibility toggle
    let navMinimized = false;
    navToggleBtn.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        if (navMinimized) {
            sidebar.classList.remove('minimized');
            navToggleBtn.innerHTML = '☰';
            navToggleBtn.title = 'Minimize navigation';
        } else {
            sidebar.classList.add('minimized');
            navToggleBtn.innerHTML = '⚏';
            navToggleBtn.title = 'Expand navigation';
        }
        navMinimized = !navMinimized;
    });
}

// ===================================
// Make Chapters Collapsible (collapsed by default)
// ===================================
function makeChaptersCollapsible() {
    const h2Elements = document.querySelectorAll('.content-section h2');

    h2Elements.forEach(h2 => {
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'chapter-content collapsed'; // collapsed by default

        let nextElement = h2.nextElementSibling;

        h2.parentNode.insertBefore(contentWrapper, nextElement);

        while (nextElement && nextElement.tagName !== 'H2' && nextElement.tagName !== 'HR') {
            const current = nextElement;
            nextElement = nextElement.nextElementSibling;
            contentWrapper.appendChild(current);
        }

        // Start collapsed
        h2.classList.add('collapsed');

        h2.addEventListener('click', () => {
            h2.classList.toggle('collapsed');
            contentWrapper.classList.toggle('collapsed');
        });
    });
}

// ===================================
// Make External Links Open in New Tab
// ===================================
function makeExternalLinksOpenInNewTab() {
    const links = document.querySelectorAll('.content-section a');

    links.forEach(link => {
        const href = link.getAttribute('href');

        if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');

            if (!link.querySelector('.external-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-icon';
                icon.textContent = ' ↗';
                link.appendChild(icon);
            }
        }
    });
}

// ===================================
// Smooth Scroll Enhancement
// ===================================
document.addEventListener('click', (e) => {
    if (e.target.matches('.toc-link, .toc-sublink')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 20;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// ===================================
// Console Message
// ===================================
console.log('📚 Knowledge Archive Loaded Successfully!');
console.log('💡 Tip: Edit config.js to add/remove sections.');
console.log('📝 Click chapter headings or TOC sections to collapse/expand.');
