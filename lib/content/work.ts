export type WorkKind = "venture" | "product";
export type WorkStatus = "live" | "building" | "archived";

export type WorkLink = {
  label: string;
  href: string;
  kind: "site" | "repo" | "mail";
};

export type WorkHighlight = {
  title: string;
  body: string;
};

export type WorkItem = {
  slug: string;
  name: string;
  /** Optional stylised wordmark shown in place of `name` in display contexts. */
  wordmark?: string;
  kind: WorkKind;
  role: string;
  period: string;
  status: WorkStatus;
  /** One line, in the product's own voice where it has one. */
  tagline: string;
  summary: string;
  /** Longer narrative shown on the case-study page. */
  narrative: string[];
  links: WorkLink[];
  /** CSS custom property holding this item's identity hue. */
  accentVar: string;
  cover?: string;
  coverAlt?: string;
  domains: string[];
  stack: string[];
  highlights: WorkHighlight[];
  facts?: { label: string; value: string }[];
  /** Featured items get the large treatment on the home page. */
  featured?: boolean;
};

/* ------------------------------------------------------------------------- *
 * Ventures — companies founded or co-founded.
 * ------------------------------------------------------------------------- */
export const ventures: WorkItem[] = [
  {
    slug: "fundrev",
    name: "Fundrev",
    kind: "venture",
    role: "Senior Software Engineer · Co-founder",
    period: "Present",
    status: "live",
    tagline: "The AI operating system for private capital.",
    summary:
      "One AI-first system that runs a fund's investment process and its portfolio companies' finance function — origination, diligence, monitoring, value creation and exit prep — instead of a drawer of disconnected point tools.",
    narrative: [
      "Private capital does not lose returns to a shortage of tools. It loses them to a process split across a dozen of them: sourcing in one inbox, diligence in a data room, monitoring in a spreadsheet rebuilt every month, and value creation in a deck nobody reconciles against live operating data.",
      "Fundrev's position is that roughly 70% of the return comes from changing the process, not the tools — so the product is an operating system rather than an assistant. It spans the whole lifecycle and, critically, reaches into the portfolio company's finance function too, which is where the numbers actually originate.",
      "The engineering constraint that shapes everything: every figure the system produces has to be tied back to its source document or ERP record. An investment committee cannot act on a number it cannot trace, so traceability is a property of the data model, not a feature bolted on at the reporting layer.",
    ],
    links: [{ label: "fundrev.ai", href: "https://fundrev.ai/", kind: "site" }],
    accentVar: "--color-fundrev",
    domains: ["Private equity", "AI systems", "Fintech"],
    stack: [
      "AI agent workflows",
      "Document intelligence",
      "Financial modelling",
      "ERP integrations",
      "Single-tenant architecture",
      "RBAC",
    ],
    highlights: [
      {
        title: "Origination & screening",
        body: "Screens inbound and sourced deals against the fund's thesis and maps banker coverage, so the pipeline arrives ranked rather than as an undifferentiated inbox.",
      },
      {
        title: "Diligence automation",
        body: "Reads the data room, surfaces risk, and ties every extracted figure back to the document it came from — an auditable review rather than a black box.",
      },
      {
        title: "Portfolio monitoring",
        body: "Unifies financial models across portfolio-company ERPs and generates the monthly board pack from live data instead of a spreadsheet rebuilt from scratch each cycle.",
      },
      {
        title: "Value creation & exit",
        body: "100-day plans tracked against live operating data, and a sell-side data room kept current from day one rather than assembled under deadline.",
      },
    ],
    facts: [
      { label: "Security", value: "SOC 2 audited" },
      { label: "Isolation", value: "Single-tenant, role-based access" },
      { label: "Encryption", value: "End to end" },
      { label: "Compliance", value: "GDPR · CCPA" },
      { label: "Integrations", value: "Major ERPs, incl. NetSuite" },
      { label: "Time to live", value: "30-day implementation" },
    ],
    featured: true,
  },
  {
    slug: "tunegram",
    name: "Tunegram",
    kind: "venture",
    role: "Co-founder · Tech Lead",
    period: "Present",
    status: "live",
    tagline: "Where indie musicians stream, perform, and get booked.",
    summary:
      "An independent platform where vocalists, instrumentalists, producers, DJs and event managers find each other — without middlemen taking a cut.",
    narrative: [
      "Live music booking in India runs through intermediaries who take a percentage for making an introduction. For an independent artist playing weekend gigs, that percentage is the difference between the work being worth doing and not.",
      "Tunegram removes the intermediary by making discovery and booking the same surface. Artists build a presence by doing what they already do — recording over the karaoke catalogue, charting, publishing to a feed — and event managers browse that living record instead of a static roster, then message and book directly.",
      "As tech lead I own the platform end to end. It runs on Cloudflare's edge network, which keeps audio-heavy pages fast across Indian mobile networks, and its agentic features are built on the Claude Agent SDK.",
    ],
    links: [
      { label: "tunegramlive.in", href: "https://tunegramlive.in/", kind: "site" },
      { label: "hello@tunegramlive.in", href: "mailto:hello@tunegramlive.in", kind: "mail" },
    ],
    accentVar: "--color-tunegram",
    domains: ["Marketplace", "Music tech", "Consumer"],
    stack: [
      "Claude Agent SDK",
      "Cloudflare edge",
      "TypeScript",
      "Realtime messaging",
      "Audio processing",
    ],
    highlights: [
      {
        title: "Make music",
        body: "Karaoke catalogue, live charts, artist discovery, a browser audio editor, and a dashboard that becomes the artist's public track record.",
      },
      {
        title: "Book artists",
        body: "Browse artists, post a gig, message directly, and sign up as an event manager — the whole booking path with nobody standing in the middle of it.",
      },
      {
        title: "Commission-free by design",
        body: "The platform does not sit between artist and organiser on the transaction, which is the entire reason the product exists.",
      },
      {
        title: "Edge-delivered",
        body: "Served from Cloudflare's edge so discovery and playback stay fast on the mobile networks the audience is actually on.",
      },
    ],
    facts: [
      { label: "Built with", value: "Claude Agent SDK" },
      { label: "Hosted on", value: "Cloudflare's edge network" },
      { label: "Made in", value: "India" },
    ],
    featured: true,
  },
  {
    slug: "arthmala",
    name: "Arthmala",
    wordmark: "अर्थ Mala",
    kind: "venture",
    role: "Founder",
    period: "Present",
    status: "live",
    tagline: "Art that Heals. Patterns that Speak.",
    summary:
      "A boutique studio preserving four living Indian crafts — Lipan art, mandala, embroidery and crochet. Every piece made by hand, on commission.",
    narrative: [
      "Lipan art, mandala, embroidery and crochet are living crafts, not heritage exhibits — but the commission market for them runs on direct messages and screenshots, which caps how far a maker can reach.",
      "Arthmala gives the studio a proper front of house: a catalogue that shows the work at the resolution it deserves, and a commission flow that captures a brief without a dozen back-and-forth messages.",
      "It is a deliberately small, well-built stack. A Vue 3 front end on Vite, an Express and MongoDB back end, deployed to Vercel as a single unified application with the API running as serverless functions alongside the static client.",
    ],
    links: [
      { label: "arthmala.vercel.app", href: "https://arthmala.vercel.app/", kind: "site" },
      {
        label: "DivisionCode/arthmala",
        href: "https://github.com/DivisionCode/arthmala",
        kind: "repo",
      },
    ],
    accentVar: "--color-arthmala",
    domains: ["Craft commerce", "Brand", "Full-stack"],
    stack: ["Vue 3", "Vite", "Express", "MongoDB", "Vercel Functions"],
    highlights: [
      {
        title: "Four living crafts",
        body: "Lipan art, mandala, embroidery and crochet — each with its own catalogue treatment rather than a single flattened product grid.",
      },
      {
        title: "Commission-first",
        body: "Pieces are made to order, so the flow is built around capturing a brief, not around a checkout.",
      },
      {
        title: "One deployable unit",
        body: "Client and API ship together to Vercel — the Express app wrapped as a serverless function, the Vue build served statically, one repository, one deploy.",
      },
    ],
    featured: true,
  },
  {
    slug: "dcodeintellect",
    name: "DCodeIntellect",
    kind: "venture",
    role: "Founder",
    period: "2018 — Present",
    status: "live",
    tagline: "The studio behind the product line.",
    summary:
      "My engineering brand and the home of eight shipped systems — ERP, CRM, pharmacy, trade, analytics, commerce and the tooling around them.",
    narrative: [
      "DCodeIntellect started as a name to put on work and became the studio the rest of it runs through. Everything in the product line below was designed, built and shipped under it.",
      "The through-line across those systems is enterprise shape: modular boundaries, role-based access from the first migration rather than bolted on later, REST contracts that a second team can pick up, and reporting that reconciles against the operational data it came from.",
    ],
    links: [
      {
        label: "github.com/DivisionCode",
        href: "https://github.com/DivisionCode",
        kind: "repo",
      },
    ],
    accentVar: "--color-dcode",
    domains: ["Product studio", "Enterprise systems"],
    stack: ["Node.js", "Express", "MongoDB", "SQL Server", "React", "Vue", ".NET"],
    highlights: [
      {
        title: "Eight systems shipped",
        body: "ERP, CRM, pharmacy management, trade operations, analytics, commerce, geolocation and the meta hub that indexes them.",
      },
      {
        title: "Enterprise shape by default",
        body: "JWT auth, role-based access, modular MVC structure and REST APIs — the parts that decide whether a system survives its second year.",
      },
    ],
    featured: true,
  },
];

/* ------------------------------------------------------------------------- *
 * Products — systems shipped under DCodeIntellect.
 * ------------------------------------------------------------------------- */
export const products: WorkItem[] = [
  {
    slug: "d-erp",
    name: "D-ERP",
    kind: "product",
    role: "Design · Architecture · Build",
    period: "DCodeIntellect",
    status: "live",
    tagline: "Modular ERP for real-world business operations.",
    summary:
      "A full-stack ERP covering inventory, sales, HR, payroll and finance — built as a modular system with role-based access and a clean MVC split rather than one screen per table.",
    narrative: [
      "Most small-business ERPs fail the same way: they model screens instead of the business, and by year two every new requirement means another bolted-on table.",
      "D-ERP is organised around modules that own their data — inventory, sales, HR and payroll, finance — each exposing a REST contract rather than reaching into another module's collections. Role-based access is enforced at the API, not hidden in the UI.",
      "Payroll is the module that proves the design: payslips, deductions and reporting all reconcile against the same ledger the finance module reads, so there is exactly one answer to what a month cost.",
    ],
    links: [],
    accentVar: "--color-dcode",
    cover: "/media/work/erp.webp",
    coverAlt: "D-ERP interface wireframe",
    domains: ["ERP", "Operations"],
    stack: ["Node.js", "Express", "MongoDB", "React", "JWT"],
    highlights: [
      { title: "Payroll & payslips", body: "Run payroll, generate payslips, reconcile against the finance ledger." },
      { title: "Invoicing", body: "Sales invoices tied to inventory movement and customer records." },
      { title: "Inventory tracking", body: "Stock levels, movements and valuation kept consistent across modules." },
      { title: "Roles & permissions", body: "Role-based access enforced at the API boundary." },
      { title: "Reporting", body: "Operational and financial reporting off the live data set." },
    ],
    featured: true,
  },
  {
    slug: "d-crm",
    name: "D-CRM",
    kind: "product",
    role: "Design · Architecture · Build",
    period: "DCodeIntellect",
    status: "live",
    tagline: "Lead to close, with the history attached.",
    summary:
      "A CRM for leads, pipelines, interactions and follow-ups — scored, logged and reminded, so the context travels with the account instead of living in one rep's memory.",
    narrative: [
      "A CRM earns its keep on the day the person who owned an account leaves. Everything in D-CRM is built so the next person can reconstruct the relationship from the record.",
      "Leads are scored as they move, every interaction is logged against the account, and follow-ups are reminders on the record rather than notes in a calendar. Funnel tracking then reads that same history instead of a separately maintained forecast.",
    ],
    links: [],
    accentVar: "--color-dcode",
    cover: "/media/work/crm.webp",
    coverAlt: "D-CRM interface wireframe",
    domains: ["CRM", "Sales"],
    stack: ["Node.js", "Express", "MongoDB", "React", "JWT"],
    highlights: [
      { title: "Lead scoring", body: "Leads ranked as they move through the pipeline." },
      { title: "Activity log", body: "Every interaction recorded against the account, not the rep." },
      { title: "Follow-up reminders", body: "Scheduled against the record so nothing depends on memory." },
      { title: "Funnel tracking", body: "Forecast read off real pipeline history." },
      { title: "Email engagement", body: "Outbound engagement tracked back to the contact." },
    ],
    featured: true,
  },
  {
    slug: "d-pms",
    name: "D-PMS",
    kind: "product",
    role: "Design · Architecture · Build",
    period: "DCodeIntellect",
    status: "live",
    tagline: "End-to-end pharmacy management.",
    summary:
      "A pharmacy management system covering stock, prescriptions, billing and supplier records — built for a counter that cannot afford a stockout or an expired batch on the shelf.",
    narrative: [
      "A pharmacy runs on two numbers being right at the same time: what is physically on the shelf, and when it expires. Get either wrong and you are either turning customers away or selling something you should not.",
      "D-PMS keeps stock, batches and billing on one record so the counter, the store room and the accounts all read the same state.",
    ],
    links: [],
    accentVar: "--color-dcode",
    cover: "/media/work/pms.webp",
    coverAlt: "D-PMS interface wireframe",
    domains: ["Healthcare", "Retail operations"],
    stack: ["Vue.js", "Node.js", "Express", "MongoDB"],
    highlights: [
      { title: "Stock & batches", body: "Inventory tracked at batch level, with expiry visible before it matters." },
      { title: "Prescriptions", body: "Dispensing recorded against the prescription and the customer." },
      { title: "Billing", body: "Counter billing that writes straight through to stock." },
      { title: "Suppliers", body: "Supplier records and purchase history in the same system." },
    ],
    featured: true,
  },
  {
    slug: "d-trade",
    name: "D-Trade",
    kind: "product",
    role: "Design · Architecture · Build",
    period: "DCodeIntellect",
    status: "live",
    tagline: "Trade operations, end to end.",
    summary:
      "Domestic and international trade operations — purchase orders, vendor contracts, logistics and export documentation — with configurable workflows and document tracking for supply-chain transparency.",
    narrative: [
      "Export trade is a documentation problem wearing a logistics costume. The goods move on time when the paperwork does.",
      "D-Trade models the workflow rather than the forms: a purchase order carries its vendor contract, its delivery milestones and its export documents as one tracked object, so at any point you can answer where a shipment is and what is still missing before it clears.",
    ],
    links: [],
    accentVar: "--color-dcode",
    cover: "/media/work/trade.webp",
    coverAlt: "D-Trade interface wireframe",
    domains: ["Supply chain", "Trade"],
    stack: ["Node.js", "Express", "MongoDB", "React", "JWT"],
    highlights: [
      { title: "PO automation", body: "Purchase orders generated and tracked through their lifecycle." },
      { title: "Vendor & customer master", body: "One authoritative record per counterparty." },
      { title: "Delivery tracking", body: "Milestones against the order, not a separate spreadsheet." },
      { title: "Export documentation", body: "Documents attached to the shipment they clear." },
      { title: "Compliance", body: "Configurable workflow gates before a shipment can advance." },
    ],
    featured: true,
  },
  {
    slug: "d-analysis",
    name: "D-Analysis",
    kind: "product",
    role: "Design · Architecture · Build",
    period: "DCodeIntellect",
    status: "live",
    tagline: "Dashboards built for decisions.",
    summary:
      "A BI and analytics layer over sales, finance, KPI and operational data — filterable charts, KPI widgets and exportable reports behind role-based access.",
    narrative: [
      "A dashboard that everyone can see everything on is a dashboard nobody trusts with real numbers. D-Analysis puts analytics behind the same role model as the systems feeding it.",
      "Charts are filterable rather than fixed, KPIs are widgets over live queries rather than cached snapshots, and every view exports — because the number always ends up in a deck eventually.",
    ],
    links: [],
    accentVar: "--color-dcode",
    cover: "/media/work/analysis.webp",
    coverAlt: "D-Analysis dashboard wireframe",
    domains: ["Business intelligence", "Analytics"],
    stack: ["Node.js", "Express", "MongoDB", "Chart.js", "Recharts"],
    highlights: [
      { title: "Filterable charts", body: "Slice by period, segment and owner without a rebuild." },
      { title: "KPI widgets", body: "Live queries rather than nightly snapshots." },
      { title: "Exportable reports", body: "Every view leaves as a file when it needs to." },
      { title: "Role-based analytics", body: "Access scoped the same way the source systems scope it." },
    ],
    featured: true,
  },
  {
    slug: "shopverse",
    name: "ShopVerse",
    kind: "product",
    role: "Design · Architecture · Build",
    period: "DCodeIntellect",
    status: "live",
    tagline: "A full-featured MERN commerce platform.",
    summary:
      "A modern eCommerce platform built on the MERN stack — secure, responsive and scaled for real-world catalogues rather than a demo storefront.",
    narrative: [
      "ShopVerse covers the parts of commerce that only show up under load: catalogue structure that survives a few thousand SKUs, a cart that holds state honestly, and an order pipeline that can be audited after the fact.",
    ],
    links: [
      {
        label: "DivisionCode/shopverse-ecommerce",
        href: "https://github.com/DivisionCode/shopverse-ecommerce",
        kind: "repo",
      },
    ],
    accentVar: "--color-dcode",
    domains: ["eCommerce"],
    stack: ["MongoDB", "Express", "React", "Node.js"],
    highlights: [
      { title: "Catalogue & cart", body: "Structured catalogue with a cart that keeps state consistent." },
      { title: "Secure checkout", body: "Auth and order handling built for production, not demo." },
      { title: "Responsive", body: "Mobile-first throughout." },
    ],
  },
  {
    slug: "d-geo",
    name: "D-Geo",
    kind: "product",
    role: "Design · Build",
    period: "DCodeIntellect",
    status: "live",
    tagline: "Region maps and a geolocation API.",
    summary:
      "State and region map visualisations backed by a geolocation API — the mapping layer the other DCodeIntellect systems draw on when data needs a place attached.",
    narrative: [
      "Operational data almost always has a where. D-Geo is the shared layer that turns that into something you can look at: state and region visualisations served off a geolocation API the other systems can call.",
    ],
    links: [],
    accentVar: "--color-dcode",
    domains: ["Geospatial", "APIs"],
    stack: ["JavaScript", "Node.js", "REST"],
    highlights: [
      { title: "Region visualisation", body: "State and region map rendering." },
      { title: "Geolocation API", body: "A single lookup service the rest of the line calls." },
    ],
  },
  {
    slug: "dcode-meta",
    name: "DCodeIntellect Meta",
    kind: "product",
    role: "Design · Build",
    period: "DCodeIntellect",
    status: "live",
    tagline: "One index for everything shipped.",
    summary:
      "A lightweight hub that indexes every project — live demo, source and environment, one click each. Data-driven: a new entry in links.json surfaces a new project.",
    narrative: [
      "The product line outgrew being explainable in a sentence, so Meta became the index: every system with its demo, its source and its live environment in one place.",
      "It is deliberately tiny — semantic HTML, lazy-loaded assets, CDN delivery, and a JSON file as the only thing you edit to add a project.",
    ],
    links: [
      {
        label: "DivisionCode/DCodeIntellect-Meta",
        href: "https://github.com/DivisionCode/DCodeIntellect-Meta",
        kind: "repo",
      },
    ],
    accentVar: "--color-dcode",
    domains: ["Tooling"],
    stack: ["HTML", "CSS", "JavaScript", "Vite", "Netlify"],
    highlights: [
      { title: "Data-driven", body: "Add an entry to links.json; the project appears." },
      { title: "Accessible & fast", body: "Semantic markup, ARIA labels, keyboard navigation, minified and CDN-delivered." },
    ],
  },
];

export const allWork: WorkItem[] = [...ventures, ...products];

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return allWork.find((item) => item.slug === slug);
}

export const featuredProducts = products.filter((p) => p.featured);
export const otherProducts = products.filter((p) => !p.featured);
