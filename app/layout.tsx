import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { GA_MEASUREMENT_ID, SITE_URL, profile, socials } from "@/lib/content/site";
import { ventures } from "@/lib/content/work";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.seoDescription,
  applicationName: profile.brand,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: [
    "Rohit Singh",
    "DCodeIntellect",
    "Fundrev",
    "Tunegram",
    "Arthmala",
    "senior software engineer",
    "founding engineer",
    "TypeScript",
    "Next.js",
    "React",
    "Vue.js",
    "Node.js",
    "AI systems",
    "ERP developer",
    "India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: profile.brand,
    title: `${profile.name} — ${profile.role}`,
    description: profile.seoDescription,
    url: SITE_URL,
    locale: "en_IN",
    images: [{ url: "/media/profile.webp", width: 1200, height: 1200, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Divisioncode_Dc",
    creator: "@Divisioncode_Dc",
    title: `${profile.name} — ${profile.role}`,
    description: profile.seoDescription,
    images: ["/media/profile.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "p:domain_verify": "324779d2993b5ab33e0ab3a8db99c8c6",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfbf9",
  colorScheme: "light",
};

/** Structured data so search and LLM surfaces get the relationships right. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}/media/profile.webp`,
  jobTitle: "Senior Software Engineer & Co-founder",
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  description: profile.seoDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.city,
    addressRegion: profile.location.region,
    postalCode: profile.location.postal,
    addressCountry: "IN",
  },
  sameAs: socials.map((social) => social.href),
  worksFor: ventures
    .filter((venture) => venture.links.some((link) => link.kind === "site"))
    .map((venture) => ({
      "@type": "Organization",
      name: venture.name,
      url: venture.links.find((link) => link.kind === "site")?.href,
      description: venture.tagline,
    })),
  knowsAbout: [
    "AI agent systems",
    "Private capital technology",
    "Enterprise resource planning",
    "Marketplace platforms",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Node.js",
    "MongoDB",
    "SQL Server",
    ".NET",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-canvas text-ink">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        <script
          type="application/ld+json"
          // Static, author-controlled payload.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{anonymize_ip:true});`}
        </Script>
      </body>
    </html>
  );
}
