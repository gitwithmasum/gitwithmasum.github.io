# Muhammad Masum Billah — Developer LinkHub

Live website: https://gitwithmasum.github.io/

A lightweight, responsive personal link hub showcasing professional profiles, selected development projects, and a downloadable resume. Hosted on GitHub Pages.

## Release 2.0.0 — Foundation
- Search and sharing metadata: canonical URL, description, Open Graph, and Twitter card
- Fixed portfolio destination to the `masum-billah-portfolio` repository
- Corrected the `mailto:` link and added a mobile-friendly Copy Email action
- Replaced non-functional `href="#"` Coming Soon links with plain status labels
- Improved keyboard focus, skip navigation, image accessibility, narrow-screen sizing, and reduced-motion support
- Prevented invisible content if JavaScript or scroll effects fail
- Updated ripple placement for touch/pointer/keyboard actions and protected external links
- Added a simple favicon, robots.txt, and sitemap.xml

## Files
- `index.html` — site markup and metadata
- `style.css` — responsive design, components, and accessibility
- `script.js` — decorative ripple, optional reveal, copy email, footer year
- `Assets/` — profile image and downloadable resume
- `favicon.svg` — site identity mark
- `robots.txt` / `sitemap.xml` — crawler discovery

## Local development
```bash
git clone https://github.com/gitwithmasum/gitwithmasum.github.io.git
cd gitwithmasum.github.io
```

Open `index.html` in a browser (or use the VS Code Live Server extension). This project uses plain HTML, CSS, and JavaScript; there is no build step.

## Deployment
GitHub Pages serves the `main` branch at https://gitwithmasum.github.io/. Verify the latest deployment under **Actions** after changes reach `main`.

## Checks before the next release
- Confirm the bundled resume is the most recent approved CV
- Verify that linked project **live demos**, not only their GitHub repositories, work
- Validate responsive layout on mobile and run Lighthouse/keyboard/screen reader checks
- Replace the relatively large profile PNG with an optimized WebP/AVIF alternative after visual QA
- Plan new sections (Skills, Experience, Research) separately in Release 2.1+

© Muhammad Masum Billah. See LICENSE for terms.
