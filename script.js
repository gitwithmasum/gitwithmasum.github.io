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
