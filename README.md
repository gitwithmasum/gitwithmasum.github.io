# Muhammad Masum Billah — Professional LinkHub

**Website:** https://gitwithmasum.github.io/  
**Stack:** HTML · CSS · Vanilla JavaScript · GitHub Pages

A responsive developer identity hub with a futuristic midnight-galaxy, glassmorphism visual system.

## Aurora Bachelor privacy-safe guest demo
- [Open guest preview](https://gitwithmasum.github.io/aurora-bachelor-demo.html) — a separate, read-only interactive preview using fictional sample records.
- The Aurora Bachelor **View demo** card now opens this public preview, **not** the authenticated application URL.
- `aurora-bachelor-demo.html` loads no authentication SDK, makes no API calls, does not register a service worker, and never reads/writes cookies, localStorage, sessionStorage, IndexedDB, or the household database.
- The real [Aurora Bachelor application](https://github.com/gitwithmasum/Aurora-Bachelor) and its stored user information have not been modified or cleared.

## Release v3.0.0 — Performance, SEO and Mobile Quality
- Loads an existing, verified 49.9 KB WebP portrait from the MB-Portfolio assets, keeping the original ~2.1 MB PNG as a fallback. The original profile asset is never deleted or overwritten.
- Preconnect to Font Awesome CDN; the current Google font CSS keeps its display=swap behavior.
- schema.org Person / WebSite structured data; updated sitemap lastmod for the homepage.
- Branded accessible noindex 404 page with safe return links.
- Reproducible 12-check Node.js audit (`node tools/audit-site.cjs`) and automated GitHub Actions checks.
- Preserves all projects, source/demo links, pilot-study PDFs, v2.6 themes, v2.4 project search, v2.3 mobile navigation, and separate privacy-safe Aurora Bachelor Guest Demo.
- No backend, user session, auth or database changes. CSS cache version bumped to v3.0.0, while JavaScript remains unchanged.
- **Scope:** offline/CI validation, not a measured Lighthouse score or direct mobile visual/browser audit. External demo availability still needs live testing.

## Release v2.6.0 — Aurora Light Theme + Accessibility
- Added an accessible header theme switch between the original **Midnight Galaxy** (default) and a contrast-aware **Aurora Light** style.
- Visitor theme preference is stored only as `masum-linkhub-theme-v1` on the LinkHub's own origin. It does not read, update or erase authentication/session keys, household data or any backend records.
- Small pre-CSS initialization script restores Aurora Light before paint to avoid an incorrect initial flash; failed/blocked storage safely falls back to Midnight Galaxy.
- Updated browser theme-color, aria-pressed, icon, title and spoken label when the button changes modes. Native button works by click, touch, Enter and Space.
- Refined visible focus outlines, minimum 44px project links, responsive header controls, mobile touch targets and section scrolling offsets.
- Preserved all projects, demo URLs, v2.4 search/sort, v2.3 mobile navigation, v2.5 career/research manuscripts, and the privacy-safe Aurora Bachelor guest preview.
- Asset cache-busting CSS/JS paths moved to v2.6.0; no change to any other repository or persisted personal data.

## Release v2.5.0 — Professional Experience Timeline + Research Showcase
- Added an accessible, responsive experience/education/project-work milestone timeline with no fabricated job dates, titles or degree details.
- Preserved the user-confirmed **Genex Infosys · Grameenphone Process — Live Chat** experience, university BUBT details, and the original project links.
- Clearly labelled independent software projects as portfolio work rather than employment.
- Kept the original AI/ML/climate research-interest cards, and added three actual computational pilot-study manuscript cards linking directly to existing PDFs hosted in `MB-Portfolio`.
- Manuscript figures are explicitly identified as **reported results**; pilot studies are not peer-reviewed or accepted journal/conference publications.
- Responsive research cards, PDF buttons, timeline spacing, keyboard focus and reduced-motion support.
- Updated CSS cache version to v2.5.0; JavaScript untouched to keep v2.4 search, filters, sorting, copy email and v2.3 mobile menu behavior unchanged.
- No changes to `MB-Portfolio`, `Aurora-Bachelor`, the Aurora Bachelor guest demo, or any backend/user information.

## Release v2.4.0 — Advanced Project Showcase
- Instant client-side search across eight existing public projects by name, technology and description.
- Search and category filters work together; sort by featured order, name A–Z or demo links first.
- Clear search, reset filters, zero-result feedback and live results status for accessible operation.
- Card status labels distinguish Demo link, Aurora Bachelor Guest preview and Source only. These labels do not claim demos were independently tested.
- Responsive search toolbar; controls are enabled only after JavaScript loads, with all projects visible without JS.
- All original project source/demo links, content, mobile menu, Skills, Experience and Research preserved.
- Versioned CSS/JS assets for v2.4.0.

## Release v2.3.0 — Mobile Navigation + Hero Polish
- Converted the mobile horizontal navigation to a touch-friendly two-column hamburger menu on screens <=780px; narrower screens use one column.
- Accessibility: button `aria-expanded`, `aria-controls`, live active-section indicator, close on Escape/outside click/link activation, and focus restoration on Escape.
- Progressive enhancement: mobile links remain visible and horizontally scrollable if JavaScript is unavailable.
- Refined hero layout, portrait glow, focus tags, mobile action sizing, and low-cost CSS ambient animations with reduced-motion support.
- Versioned CSS and JS URLs to avoid stale browser caches.
- Existing project filters, portfolio / demo URLs, résumé, profile image, experience, research interests and privacy-safe Aurora Bachelor guest demo preserved.

## Release 2.2.1 — Skills & Experience Polish
- Corrected the Genex work entry to **Grameenphone Process — Live Chat Customer Support**
- Added practical live-chat communication skills alongside development skills
- Harmonized Skills and Experience cards with the rest of the dark glassmorphism design
- Improved responsive Experience and Skills card layouts, spacing, typography, icons, and tags
- Added a versioned CSS URL to avoid browsers reusing an outdated stylesheet

## Release 2.2.0 — Developer Showcase
- Verified public source repositories for eight selected projects, including Masum AI Agent and Masum Galaxy CP Arena
- Updated renamed repository links to `MB-Portfolio` and `Jurassic-IT-Park`
- Accessible project filters for All, Web, Apps, AI/Python and Developer Tools; JavaScript-disabled visitors still see every project
- Skills grouped as hands-on web work, developer workflow and clearly labeled ongoing learning
- Short professional experience and university education sections without unverified dates or degree labels
- AI, machine learning and climate/global warming research interests explicitly **not** represented as published papers
- Preserved Release 2.0.0 SEO/accessibility and 2.1.0 visual design
- Some project demo URLs have not been independently tested; source repository verification does not guarantee live demo availability

## Release 2.1.0 — Design Refresh
- Two-column introductory hero, existing profile portrait, and clear project/resume actions
- MASUM.DEV brand navigation and consistent visual tokens
- Lightweight CSS-only galaxy accents, rounded glass surfaces, cyan/indigo gradients
- Responsive professional link cards, social links, and Copy Email
- Six selected project cards, illustrated with icons/CSS rather than unverified screenshots
- Source links to GitHub and existing demo URLs where available
- Five unreleased project ideas shown in a compact **On the roadmap** list
- Preserved Release 2.0.0 SEO, canonical/social metadata, keyboard focus, reduced-motion support, and content visibility without JavaScript

## Release 2.0.0 — Foundation
- SEO, Open Graph, robots.txt, sitemap.xml, and favicon
- Safe external links, corrected portfolio and email links, accessible Copy Email fallback
- Responsive and reduced-motion safeguards

## Files
- `index.html` — semantic markup, content, links, and SEO
- `style.css` — responsive visual system, cards, and accessibility
- `script.js` — decorative ripple/reveal, accessible project filters, Copy Email, and footer year
- `Assets/` — existing profile PNG and resume PDF
- `favicon.svg`, `robots.txt`, `sitemap.xml`, `LICENSE`

## Local development
```bash
git clone https://github.com/gitwithmasum/gitwithmasum.github.io.git
cd gitwithmasum.github.io
```
Open `index.html` or use VS Code Live Server. No build tools are required.

## Deployment
After changes reach the `main` branch, check GitHub Pages under [Actions](https://github.com/gitwithmasum/gitwithmasum.github.io/actions).

## Before the next release
- Verify existing demo URLs and that the bundled resume is up to date
- Optimize the original ~2 MB profile image without compromising appearance
- Manually test on mobile, with a keyboard, and with reduced motion
- Run Lighthouse on the deployed site; targets do not replace measured scores
- Consider future releases for verified publications, actual project screenshots and more advanced portfolio features

© Muhammad Masum Billah. See LICENSE for license terms.
