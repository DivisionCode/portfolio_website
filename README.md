# DCodeIntellect, portfolio of Rohit Singh

Senior software engineer and co-founder. Live at
**[dcrohit-portfolio.netlify.app](https://dcrohit-portfolio.netlify.app)**.

Rebuilt in 2026 from a hand-written static site to a statically-exported
Next.js application. The previous version is still in git history at
`d6de307`.

---

## Stack

| Layer     | Choice                                                    |
| --------- | --------------------------------------------------------- |
| Framework | Next.js 16 (App Router, React Server Components)          |
| Runtime   | React 19                                                  |
| Language  | TypeScript 5, `strict`                                    |
| Styling   | Tailwind CSS v4 (CSS-first `@theme`, no JS config)        |
| Output    | `output: "export"`, plain files, no Node runtime needed  |
| Hosting   | Netlify (`netlify.toml` sets headers, CSP and redirects)  |

Everything the page needs ships as static HTML. Seven components are client
components: the header, the scroll-progress bar, the command palette, the
theme toggle, the metric counters, the product explorer and the credential
tabs. There is no animation library; motion is native CSS.

Degrees and schooling are deliberately not on the page. They are on the CV,
and on a page that leads with four ventures they were the least interesting
thing in the section.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into out/
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run shoot      # screenshots into screens/
npm run verify     # fails if any settled element is faded or blurred
npm run smoke      # clicks the nav, CTA and command palette for real
npm run navspy     # checks the nav highlights the section you are in
npm run navclick   # same, but by clicking, with smooth scroll on
npm run dashes     # fails on any em dash, or anything that renders as one
```

`npm run build` writes `out/`, which is exactly what Netlify publishes.

---

## Where the content lives

All copy is data. Nothing is hard-coded into a component, so editing the site
means editing one of these files, no JSX required.

| File                          | Holds                                              |
| ----------------------------- | -------------------------------------------------- |
| `lib/content/site.ts`         | Name, bio, contact details, socials, nav, metrics   |
| `lib/content/work.ts`         | The 4 ventures and 8 products, incl. case studies   |
| `lib/content/stack.ts`        | The 11 technology groups                            |
| `lib/content/architecture.ts` | The 8 platform layers in the architecture section   |
| `lib/content/approach.ts`     | The five engineering principles                     |
| `lib/content/credentials.ts`  | Certifications, with verify links                   |
| `lib/content/experience.ts`   | Employment history, **see below**                  |

Adding a venture or product to `work.ts` automatically creates its
`/work/<slug>/` page, adds it to the sitemap, and puts it in the ⌘K palette.

### Experience needs filling in

`lib/content/experience.ts` carries four companies whose logos were in the old
site (Ancile Technologies, Illimitable, Mona Medicos, Super Infotech) but whose
roles and dates were never listed anywhere. Each entry has empty `title`,
`period`, `summary` and `work` fields.

The section renders nothing while those are empty, no placeholder history goes
live. Fill in a role's `title` and `period` and it appears on the home page
between Stack and Credentials.

---

## The contact form

The form posts to [FormSubmit](https://formsubmit.co), no backend, no API key.

**It needs activating once.** Submit the form yourself after the first deploy;
FormSubmit emails a confirmation link to `singh.rsingh.rohit@gmail.com`. Click
it and every later submission is delivered. Until then submissions are held.

Built in:

- AJAX submission with real loading, success and error states
- A plain `action`/`method` fallback, so it still works with JS disabled
- A `_honey` honeypot field for bots
- The address is never revealed as a mailto target in the markup

To route mail elsewhere, change `CONTACT_FORM_ENDPOINT` in
`lib/content/site.ts` to the FormSubmit alias for that inbox.

---

## Conventions worth knowing

- **No em dashes, and nothing shaped like one.** Not in copy, not in comments.
  Use a colon, a full stop or a comma; a middle dot (·) separates title
  segments. This also rules out a decorative 1px rule sitting next to text,
  which renders as an em dash even though no dash exists in the source.
  `npm run dashes` checks every dash-like codepoint across the source *and*
  the built HTML, plus that faux-rule pattern.
- **Monochrome.** There is no accent hue. Emphasis is luminance, and the only
  chromatic thing on the site is the green "live" dot. Gradient text, a
  violet-to-cyan ramp and blurred glow blobs are what made an earlier pass read
  as generated.
- **One typeface, no monospace.** A terminal face on labels reads as a
  developer default rather than a design decision. Hierarchy comes from size,
  weight, case and tracking: `label-mono` for uppercase eyebrows, `meta` for
  small metadata. Geist is avoided because it is the Next.js default.
- **Light and dark.** Token values live on `:root` and flip under
  `:root[data-theme="light"]`; `@theme inline` points Tailwind's utilities at
  them. An inline script in `<body>` applies the stored choice before paint, so
  there is no flash. Anything drawn in SVG must use `currentColor`, not a
  hard-coded white, or it vanishes in light mode.
- **Nav order must match page order.** The scroll spy walks sections in
  document order and takes the last one past the header.
- **Only one scroll offset.** `scroll-padding-top` on `<html>` and `scroll-mt`
  on each section both apply and add up, which landed a clicked section 192px
  down while the spy line sat at 140px and left the highlight one behind. The
  sections own the offset; `<html>` sets none.
- `npm run navspy` checks the highlight while scrolling, `npm run navclick`
  checks it after clicking each nav link with smooth scroll on. The bug only
  reproduced under the second.
- **Design tokens** live in `app/globals.css` under `@theme`, including a 4px
  radius scale and per-heading optical tracking.
- **Custom utilities** (`container-page`, `card`, `spotlight`, `grid-field`,
  `dot-field`, `label-mono`, `rule-fade`, `text-gradient`) are defined with
  Tailwind v4's `@utility`.
- **Animation may never gate content.** Scroll reveals use the native
  `animation-timeline: view()`, declared *only* inside
  `@supports (animation-timeline: view())`, so an unsupporting browser applies
  no rule and the content is simply visible.
- **Never `overflow-hidden` around a `data-reveal`.** `overflow: hidden` makes
  an element a scroll container, and a descendant's `view()` timeline binds to
  the nearest scroll container, so the reveal measures against a box that never
  scrolls and sticks at partial opacity. Use `overflow-clip`, which clips
  identically without becoming a scroller.
- **`animation-range` starts at `cover 0%`, not `cover 0`.** A bare zero is
  invalid and the whole declaration is dropped for the default `normal` range.
- `npm run verify` enforces all of the above: it scrolls every page and fails
  if anything settled on screen is faded or blurred.
- **Geometry is SVG and CSS**, not a canvas or a WebGL bundle. The hero lattice
  renders in the static HTML and costs no JavaScript.
- **Tabs render every panel**, with inactive ones `hidden`. That is the correct
  ARIA shape and it keeps all content in the static HTML for crawlers.
- **Images are unoptimised** by necessity, `next/image` optimisation needs a
  server, and this is a static export. Sizes are set explicitly instead.

---

## SEO and structured data

- Per-route metadata via the Metadata API, with OpenGraph and Twitter cards
- `schema.org/Person` JSON-LD in the root layout, including `worksFor` for each
  venture and `sameAs` for every social profile
- `app/sitemap.ts` and `app/robots.ts` generate `sitemap.xml` and `robots.txt`
- Google Search Console verification file preserved at
  `public/google11e1704e48f5c4c0.html`
- Legacy URLs (`/brief.html`, `/contact.html`, `/login.html`,
  `/payrollDashboard.html`) 301 to their new homes via `netlify.toml`

---

## Structure

```
app/
├── layout.tsx            Fonts, metadata, JSON-LD, analytics, chrome
├── page.tsx              Home, composes the section components
├── globals.css           Design tokens + custom utilities
├── work/[slug]/page.tsx  Case studies, statically generated per work item
├── sitemap.ts robots.ts icon.svg not-found.tsx
components/
├── site/                 Header, Footer, CommandPalette
├── home/                 One component per home-page section
└── ui/                   Icon, Reveal, SectionHeading, Tag
lib/
├── content/              All site copy, as typed data
└── cn.ts                 Class joiner
scripts/
├── shoot.mjs             Playwright screenshots into screens/
└── sections.mjs          One screenshot per home-page section
public/
├── media/  logos/  docs/
```

---

© DCodeIntellect 2026 · Himachal Pradesh, India
