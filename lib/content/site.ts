export const SITE_URL = "https://dcrohit-portfolio.netlify.app";

export const GA_MEASUREMENT_ID = "G-3M228E733R";

/** FormSubmit inbox alias. Set after activating the endpoint once (see README). */
export const CONTACT_FORM_ENDPOINT =
  "https://formsubmit.co/ajax/singh.rsingh.rohit@gmail.com";

export const profile = {
  name: "Rohit Singh",
  /** The parent brand. Everything he owns sits under it. */
  group: "Sushraj Ventures",
  groupUrl: "https://sushrajventures.netlify.app/",
  /** The engineering studio inside the group, and the name on the product line. */
  brand: "DCodeIntellect",
  /** Rendered as the <h1> support line. Kept short on purpose. */
  headline: "Senior software engineer. Founder of Sushraj Ventures.",
  role: "Senior Software Engineer · Founder, Sushraj Ventures",
  bio: "I build the systems companies actually run on. Sushraj Ventures is my group: Sushraj Pharma, a pharmaceutical manufacturing consulting practice, the craft studio Arthmala, and the DCodeIntellect product line. Outside the group I am the senior software engineer behind Fundrev, an AI operating system for private capital, and co-founder and tech lead at Tunegram.",
  /** Used in metadata and the JSON-LD Person node. */
  seoDescription:
    "Rohit Singh, senior software engineer and founder of Sushraj Ventures: Sushraj Pharma, a pharmaceutical manufacturing consulting practice, the craft studio Arthmala and the DCodeIntellect product line. Senior software engineer on Fundrev, co-founder and tech lead at Tunegram. Building AI systems, marketplaces and enterprise platforms with TypeScript, React, Next.js, Vue, Node.js and .NET.",
  tagline: "Where code meets clarity, and data drives decisions.",
  location: {
    city: "Daulatpur Chowk",
    region: "Himachal Pradesh",
    country: "India",
    timezone: "IST · UTC+05:30",
    postal: "177204",
    street: "Tehsil Ghanari, District Una",
  },
  email: "singh.rsingh.rohit@gmail.com",
  phone: "+918219622638",
  phoneDisplay: "+91 82196 22638",
  availability: "Open to founding-engineer, staff and advisory conversations",
  cv: "/docs/rohit-singh-cv.pdf",
} as const;

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  /** Key into the inline icon set in components/ui/Icon.tsx */
  icon: "github" | "linkedin" | "x" | "instagram" | "pinterest" | "mail";
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/DivisionCode",
    handle: "@DivisionCode",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rohit-singh-b751b8350/",
    handle: "Rohit Singh",
    icon: "linkedin",
  },
  {
    label: "X",
    href: "https://x.com/Divisioncode_Dc",
    handle: "@Divisioncode_Dc",
    icon: "x",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/divisioncode/",
    handle: "@divisioncode",
    icon: "instagram",
  },
  {
    label: "Pinterest",
    href: "https://in.pinterest.com/divisioncode/",
    handle: "@divisioncode",
    icon: "pinterest",
  },
];

export const navLinks = [
  { label: "Ventures", href: "/#ventures" },
  { label: "Architecture", href: "/#architecture" },
  { label: "Products", href: "/#products" },
  { label: "Approach", href: "/#approach" },
  { label: "Stack", href: "/#stack" },
  { label: "Credentials", href: "/#credentials" },
  { label: "Contact", href: "/#contact" },
] as const;

/**
 * First year of professional work. The years figure is derived from it rather
 * than hardcoded, so it cannot quietly go stale between rebuilds.
 */
export const CAREER_START = 2013;

const yearsBuilding = new Date().getFullYear() - CAREER_START;

/** Headline counters. Numeric so the hero can animate them up. */
export const metrics = [
  {
    value: yearsBuilding,
    suffix: "+",
    label: "Years building",
    detail: "Enterprise systems in production",
  },
  { value: 3, suffix: "", label: "Ventures", detail: "Founded, under Sushraj" },
  { value: 6, suffix: "", label: "Products shipped", detail: "Under DCodeIntellect" },
  { value: 87, suffix: "", label: "Technologies", detail: "Across the production stack" },
] as const;
