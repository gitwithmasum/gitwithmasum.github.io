/* Developer LinkHub • Release 2.0.0 Foundation */
'use strict';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Button ripple is decorative; keyboard navigation works without it.
if (!reduceMotion) {
    document.querySelectorAll('.btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            const bounds = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const fromPointer = event.detail !== 0;
            ripple.style.left = `${fromPointer ? event.clientX - bounds.left : bounds.width / 2}px`;
            ripple.style.top = `${fromPointer ? event.clientY - bounds.top : bounds.height / 2}px`;
            ripple.setAttribute('aria-hidden', 'true');
            button.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
        });
    });
}

// No element is hidden while waiting for JavaScript or intersection events.
const cards = document.querySelectorAll('.project-card');
if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                instance.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    cards.forEach((card) => observer.observe(card));
}

const copyButton = document.querySelector('[data-copy-email]');
const copyStatus = document.getElementById('copy-status');
if (copyButton && copyStatus) {
    copyButton.addEventListener('click', async () => {
        const address = copyButton.dataset.email;
        try {
            if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
            await navigator.clipboard.writeText(address);
            copyStatus.textContent = 'Email address copied.';
        } catch {
            // Always give a usable fallback instead of claiming the copy succeeded.
            copyStatus.textContent = 'Copy unavailable. Email: ' + address;
        }
    });
}

const year = document.getElementById('current-year');
if (year) year.textContent = String(new Date().getFullYear());


// Release v2.4.0: accessible, combined filters/search/sorting.
// Without JavaScript, all project cards stay visible.
const filterContainer = document.getElementById('project-filters');
const filterStatus = document.getElementById('project-filter-status');
const filterButtons = Array.from(document.querySelectorAll('[data-project-filter]'));
const projectToolbar = document.getElementById('project-toolbar');
const projectSearch = document.getElementById('project-search');
const projectSearchClear = document.getElementById('project-search-clear');
const projectSort = document.getElementById('project-sort');
const projectGrid = document.querySelector('.projects-grid');
const projectEmpty = document.getElementById('project-empty');
const projectEmptyReset = document.getElementById('project-empty-reset');
const projectCards = Array.from(cards);

if (filterContainer && filterStatus && filterButtons.length &&
    projectToolbar && projectSearch && projectSearchClear && projectSort &&
    projectGrid && projectEmpty && projectEmptyReset && projectCards.length) {
    const originalOrder = new Map(projectCards.map((card, index) => [card, index]));
    const searchIndex = new Map(projectCards.map((card) => [card, [
        card.querySelector('h3')?.textContent || '',
        card.querySelector('.project-type')?.textContent || '',
        card.querySelector('.project-description')?.textContent || '',
        card.querySelector('.project-tags')?.textContent || ''
    ].join(' ').toLocaleLowerCase()]));
    let activeCategory = 'all';
    const renderProjects = () => {
        const query = projectSearch.value.trim().toLocaleLowerCase();
        const mode = projectSort.value;
        let visible = 0;
        const ordered = projectCards.slice().sort((a, b) => {
            if (mode === 'name') {
                return (a.querySelector('h3')?.textContent || '').localeCompare(
                    b.querySelector('h3')?.textContent || '') ||
                    originalOrder.get(a) - originalOrder.get(b);
            }
            if (mode === 'demo') {
                const demoA = a.dataset.preview === 'source' ? 1 : 0;
                const demoB = b.dataset.preview === 'source' ? 1 : 0;
                return demoA - demoB || originalOrder.get(a) - originalOrder.get(b);
            }
            return originalOrder.get(a) - originalOrder.get(b);
        });
        ordered.forEach((card) => projectGrid.appendChild(card));
        projectCards.forEach((card) => {
            const matchesCategory = activeCategory === 'all' ||
                card.dataset.category === activeCategory;
            const matchesQuery = !query || searchIndex.get(card).includes(query);
            card.hidden = !(matchesCategory && matchesQuery);
            if (!card.hidden) visible += 1;
        });
        filterButtons.forEach((button) => {
            const active = button.dataset.projectFilter === activeCategory;
            button.setAttribute('aria-pressed', String(active));
            button.classList.toggle('is-active', active);
        });
        projectSearchClear.hidden = projectSearch.value.length === 0;
        projectEmpty.hidden = visible !== 0;
        filterStatus.textContent = 'Showing ' + visible + ' of ' + projectCards.length + ' projects';
    };
    filterButtons.forEach((button) => button.addEventListener('click', () => {
        activeCategory = button.dataset.projectFilter;
        renderProjects();
    }));
    projectSearch.addEventListener('input', renderProjects);
    projectSort.addEventListener('change', renderProjects);
    projectSearchClear.addEventListener('click', () => {
        projectSearch.value = '';
        renderProjects();
        projectSearch.focus();
    });
    projectEmptyReset.addEventListener('click', () => {
        activeCategory = 'all';
        projectSearch.value = '';
        projectSort.value = 'featured';
        renderProjects();
        projectSearch.focus();
    });
    renderProjects();
    projectToolbar.hidden = false;
    filterContainer.hidden = false;
}


// Release v2.3.0 — progressive enhancement for mobile navigation.
// If JS is unavailable, the original horizontal navigation stays visible.
const mobileMenuButton = document.getElementById('nav-toggle');
const primaryNavigation = document.getElementById('primary-navigation');
const navigationHeader = document.querySelector('.site-header');
const mobileMenuQuery = window.matchMedia('(max-width: 780px)');
const sectionNavLinks = primaryNavigation
    ? Array.from(primaryNavigation.querySelectorAll('a[href^="#"]'))
    : [];

if (mobileMenuButton && primaryNavigation && navigationHeader && sectionNavLinks.length) {
    const label = mobileMenuButton.querySelector('.nav-toggle-text');
    const icon = mobileMenuButton.querySelector('.nav-toggle-icon i');

    const closeOrOpenMenu = (requestedOpen, restoreFocus = false) => {
        const opened = Boolean(requestedOpen && mobileMenuQuery.matches);
        primaryNavigation.classList.toggle('is-open', opened);
        mobileMenuButton.setAttribute('aria-expanded', String(opened));
        mobileMenuButton.setAttribute('aria-label', opened ? 'Close navigation menu' : 'Open navigation menu');
        if (label) label.textContent = opened ? 'Close' : 'Menu';
        if (icon) {
            icon.classList.toggle('fa-bars', !opened);
            icon.classList.toggle('fa-xmark', opened);
        }
        if (!opened && restoreFocus) mobileMenuButton.focus();
    };

    mobileMenuButton.addEventListener('click', () => {
        closeOrOpenMenu(mobileMenuButton.getAttribute('aria-expanded') !== 'true');
    });

    sectionNavLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (!mobileMenuQuery.matches) return;
            closeOrOpenMenu(false);
            const hash = link.getAttribute('href');
            const target = hash && document.getElementById(hash.slice(1));
            if (target) {
                // The previously focused link becomes hidden when the menu closes.
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileMenuButton.getAttribute('aria-expanded') === 'true') {
            closeOrOpenMenu(false, true);
        }
    });

    document.addEventListener('click', (event) => {
        if (mobileMenuQuery.matches && !navigationHeader.contains(event.target)) {
            closeOrOpenMenu(false);
        }
    });

    const resetMenuOnResize = () => closeOrOpenMenu(false);
    if (mobileMenuQuery.addEventListener) {
        mobileMenuQuery.addEventListener('change', resetMenuOnResize);
    } else if (mobileMenuQuery.addListener) {
        mobileMenuQuery.addListener(resetMenuOnResize);
    }

    // Indicate the current in-page section without changing any routes or hrefs.
    const updateActiveSection = () => {
        const threshold = Math.min(window.innerHeight * 0.33, 185);
        let activeLink = sectionNavLinks[0];
        sectionNavLinks.forEach((link) => {
            const section = document.getElementById(link.getAttribute('href').slice(1));
            if (section && section.getBoundingClientRect().top <= threshold) activeLink = link;
        });
        sectionNavLinks.forEach((link) => {
            const selected = link === activeLink;
            link.classList.toggle('is-active', selected);
            if (selected) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    };

    let navScrollQueued = false;
    const scheduleActiveNavUpdate = () => {
        if (navScrollQueued) return;
        navScrollQueued = true;
        window.requestAnimationFrame(() => {
            navScrollQueued = false;
            updateActiveSection();
        });
    };
    window.addEventListener('scroll', scheduleActiveNavUpdate, { passive: true });
    window.addEventListener('resize', scheduleActiveNavUpdate);
    window.addEventListener('hashchange', scheduleActiveNavUpdate);
    updateActiveSection();

    // Enable the responsive collapsed state only after every handler exists.
    closeOrOpenMenu(false);
    mobileMenuButton.hidden = false;
    document.documentElement.classList.add('has-js-nav');
}


// Release v2.6.0 — switchable public-site theme.
// Only the preference key is stored; never read or modify login/session/app data.
const themeToggle = document.getElementById('theme-toggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const themePreferenceKey = 'masum-linkhub-theme-v1';

if (themeToggle) {
    const themeIcon = themeToggle.querySelector('.theme-toggle-icon i');
    const themeText = themeToggle.querySelector('.theme-toggle-text');

    const applySiteTheme = (theme, persist = false) => {
        const light = theme === 'light';
        document.documentElement.dataset.theme = light ? 'light' : 'dark';
        themeToggle.setAttribute('aria-pressed', String(light));
        const nextThemeLabel = light ? 'Switch to Midnight Galaxy theme' : 'Switch to Aurora Light theme';
        themeToggle.setAttribute('aria-label', nextThemeLabel);
        themeToggle.setAttribute('title', nextThemeLabel);
        if (themeText) themeText.textContent = light ? 'Midnight Galaxy' : 'Aurora Light';
        if (themeIcon) {
            themeIcon.classList.toggle('fa-moon', light);
            themeIcon.classList.toggle('fa-sun', !light);
        }
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', light ? '#eaf5fc' : '#080F1F');
        }
        if (persist) {
            try { localStorage.setItem(themePreferenceKey, light ? 'light' : 'dark'); }
            catch (_) { /* Theme works in this tab even when storage is denied. */ }
        }
    };

    applySiteTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    themeToggle.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        applySiteTheme(next, true);
    });
}
