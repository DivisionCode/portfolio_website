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

Everything the page needs ships as static HTML. Only three components are
client components: the header, the command palette and the credential tabs.
There is no animation library: content must never depend on an animation
succeeding in order to be visible.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into out/
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
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
| `lib/content/approach.ts`     | The five engineering principles                     |
| `lib/content/credentials.ts`  | Education and certifications, with verify links     |
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

- **No em dashes.** Anywhere, in copy or in comments. Use a colon, a full stop
  or a comma. A middle dot (·) separates title segments.
- **Design tokens** live in `app/globals.css` under `@theme`. One canvas, one
  accent (`--color-accent`), monochrome everywhere else. Change a token there
  and it propagates.
- **Custom utilities** (`container-page`, `panel`, `label-mono`, `row-rule`)
  are defined with Tailwind v4's `@utility`.
- **No scroll animations.** An earlier build hid every section behind a
  `whileInView` reveal that never fired, leaving the page blank. Content
  renders immediately.
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
