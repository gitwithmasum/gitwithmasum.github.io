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


// Release 2.2.0: progressive enhancement for accessible project filtering.
// All projects remain visible when JavaScript is disabled.
const filterContainer = document.getElementById('project-filters');
const filterStatus = document.getElementById('project-filter-status');
const filterButtons = Array.from(document.querySelectorAll('[data-project-filter]'));

if (filterContainer && filterStatus && filterButtons.length && cards.length) {
    const applyProjectFilter = (category) => {
        let visible = 0;
        cards.forEach((card) => {
            const matches = category === 'all' || card.dataset.category === category;
            card.hidden = !matches;
            if (matches) visible += 1;
        });
        filterButtons.forEach((button) => {
            const active = button.dataset.projectFilter === category;
            button.setAttribute('aria-pressed', String(active));
            button.classList.toggle('is-active', active);
        });
        filterStatus.textContent = `Showing ${visible} of ${cards.length} projects`;
    };

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => applyProjectFilter(button.dataset.projectFilter));
    });
    applyProjectFilter('all');
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
