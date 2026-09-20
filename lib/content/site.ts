export const SITE_URL = "https://dcrohit-portfolio.netlify.app";

export const GA_MEASUREMENT_ID = "G-3M228E733R";

/** FormSubmit inbox alias — set after activating the endpoint once (see README). */
export const CONTACT_FORM_ENDPOINT =
  "https://formsubmit.co/ajax/singh.rsingh.rohit@gmail.com";

export const profile = {
  name: "Rohit Singh",
  brand: "DCodeIntellect",
  /** Rendered as the <h1> support line. Kept short on purpose. */
  headline: "Senior software engineer. Founder, three times over.",
  role: "Senior Software Engineer & Co-founder, Fundrev",
  bio: "I build the systems companies actually run on — investment workflows, marketplaces, ERP and finance operations. Currently co-founding Fundrev, an AI operating system for private capital. Before and alongside it: Tunegram, Arthmala, and the DCodeIntellect product line.",
  /** Used in metadata and the JSON-LD Person node. */
  seoDescription:
    "Rohit Singh — senior software engineer and co-founder of Fundrev. Founder of Arthmala and DCodeIntellect, co-founder and tech lead at Tunegram. Building AI systems, marketplaces and enterprise platforms with TypeScript, React, Next.js, Vue, Node.js and .NET.",
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
  { label: "Products", href: "/#products" },
  { label: "Approach", href: "/#approach" },
  { label: "Stack", href: "/#stack" },
  { label: "Credentials", href: "/#credentials" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Headline counters. Derived where possible so they cannot drift from the data. */
export const metrics = [
  { value: "7+", label: "Years building", detail: "Enterprise systems in production" },
  { value: "4", label: "Ventures", detail: "Founded or co-founded" },
  { value: "8", label: "Products shipped", detail: "Under DCodeIntellect" },
  { value: "3+", label: "Industries", detail: "Private capital, music, commerce" },
] as const;
