# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2026-09-24

The site is rebuilt as a statically exported Next.js application and restructured around Sushraj Ventures. This release covers every commit from `667b52a` to `62a8e7e`, plus the repository standards added with it.

### Added

- Next.js 16 App Router application, compiled as a static export (`output: "export"`), with React 19, strict TypeScript and Tailwind CSS v4 configured in CSS.
- Typed content modules in `lib/content/` for the profile, work, architecture, approach, stack, credentials and experience. Components hold no copy of their own.
- A case study page at `/work/<slug>/` for every venture and product, generated from `lib/content/work.ts`, with its own metadata and sitemap entry.
- Sushraj Ventures as the parent group, with Sushraj Pharma added as a venture alongside Arthmala and DCodeIntellect.
- An "Outside the group" section that lists engagements outside Sushraj Ventures separately from the group's own businesses.
- Architecture section: a layered reference architecture, naming the systems each layer runs in.
- Stack section and a scrolling stack ticker, drawn from the technologies in production.
- Credentials register grouped by year, with a verification link for each certification where one exists.
- Experience section, which stays hidden until complete records are filled in.
- Contact form posting to FormSubmit, with loading, success and error states, a fallback that works without JavaScript, and a honeypot field.
- Command palette, opened with Cmd+K or Ctrl+K, over sections, case studies, social profiles and actions.
- Light theme alongside the dark theme, applied before first paint from the stored or system preference.
- Monogram identity mark, SVG hero lattice, scroll progress bar, metric counters and card spotlight.
- Scroll-driven reveals using native `animation-timeline: view()`, applied only where the browser supports it and the visitor has not asked for reduced motion.
- Each venture's live site shown behind its case study masthead, from screenshots taken by `scripts/capture.mjs`.
- Per-route metadata, Open Graph and Twitter cards, `schema.org/Person` JSON-LD, and generated `sitemap.xml` and `robots.txt`.
- `netlify.toml` with build settings, security headers, cache headers and 301 redirects from the legacy `.html` URLs.
- Playwright checks and tools in `scripts/`, run as `shoot`, `verify`, `smoke`, `navspy`, `navclick`, `form`, `gaps`, `perf`, `capture` and `ga`, and the `dashes` house style guard.
- Repository standards: a rewritten README, this changelog, `LICENSE`, `SECURITY.md`, `CONTRIBUTING.md`, `CODEOWNERS`, issue and pull request templates, a GitHub Actions CI workflow, `.editorconfig` and `.nvmrc`.

### Changed

- The site is organised by ownership. Businesses inside Sushraj Ventures lead the page, and engagements outside the group follow as a separate group.
- Role titles for engagements outside the group are corrected to match each engagement.
- Visual design: a monochrome palette with no accent hue, one typeface (Schibsted Grotesk), hairline structure and numbered sections.
- Ventures are equal tiles aligned on shared rows, products a tiled grid, the stack rows of text, the approach a numbered list, and the contact form fields hairline underlines.
- Stack content is rebuilt from the technologies actually in production, and lists technologies only.
- Space between sections is halved, because sections now pad the top only.
- The years of experience figure is derived from the career start year rather than written as a fixed number.
- The package is renamed to `rohit-singh-portfolio` and declares its licence, author, repository, homepage and Node.js engine. The repository is renamed to `DivisionCode/rohit-singh-portfolio`.

### Fixed

- Contact form messages are delivered. The previous form had no action and its request was commented out, so submitting did nothing.
- The Content Security Policy blocked Google Analytics on the live domain. `script-src` and `connect-src` now allow the Google Analytics and Tag Manager hosts, including the bare `analytics.google.com`.
- Scroll reveals no longer leave content invisible, faded or blurred. Visibility no longer depends on an animation running, tall sections finish their reveal, and `overflow-clip` replaces `overflow-hidden` around revealed content.
- The nav highlight no longer sticks on one section while scrolling, or lags one section behind after a nav link is clicked.
- Scroll jank from the grain overlay, and layout thrash in the card spotlight's pointer handler.
- Links showed the default cursor in Safari until the page had been clicked.
- A decorative 1px rule rendered as an em dash.

### Removed

- The hand-written HTML pages, their stylesheets and scripts, and the unused background images under `utlities/`. The ERP login page and payroll dashboard demo went with them, and their URLs redirect.
- Education and schooling from the page. They remain on the CV.
- D-Trade and D-Analysis from the product line. Their URLs redirect to the products section.
- Product mockup images from the product presentation, because they were stock UI kits rather than this work.

### Security

- Netlify sends security headers on every path: HSTS with preload, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy` and `Permissions-Policy`.
- The Content Security Policy moves from a `<meta>` tag to a response header, adding `frame-ancestors 'none'`, `base-uri 'self'`, `object-src 'none'` and a `form-action` limited to the site and FormSubmit.
- Google advertising and remarketing endpoints are deliberately left out of the CSP, and Analytics runs with `anonymize_ip`.
- The CI workflow runs with read-only repository permissions.

## [1.0.0] - 2025-05-12

The original hand-written HTML, CSS and JavaScript portfolio, published under the DCodeIntellect brand. Work on it began with the first commit on 2025-05-12 and continued up to 2025-07-08, the commit tagged `v1.0.0`.

### Added

- Landing page with a career summary, the technology stack and the logos of companies worked with.
- Profile brief page with education details, later folded into the landing page.
- Project samples for the DCodeIntellect systems: ERP, CRM, pharmacy management, trade and analysis.
- ERP-style login page and a payroll dashboard page.
- Contact page with a contact form and a chat interface, still in development at the end of this version.
- Downloadable CV and Six Sigma White Belt certificate.
- Responsive layouts for mobile and desktop.
- Google Analytics through gtag.js.
- Google Search Console verification file and Pinterest domain verification tag.
- README.

### Security

- Security policy `<meta>` tags, including a Content Security Policy.

[Unreleased]: https://github.com/DivisionCode/rohit-singh-portfolio/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/DivisionCode/rohit-singh-portfolio/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/DivisionCode/rohit-singh-portfolio/releases/tag/v1.0.0
