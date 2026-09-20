export type Credential = {
  title: string;
  issuer: string;
  /** Technical certifications versus process and quality ones. */
  category: "Technical" | "Professional";
  scope: string;
  year: string;
  validity: string;
  /** Verification link, or null when the record is a physical copy only. */
  verify: string | null;
  verifyLabel?: string;
};

/**
 * Certifications only.
 *
 * Schools and degrees used to sit here too, under a third tab. They are on the
 * CV, and on a page that leads with four ventures they were the least
 * interesting thing in the section.
 *
 * Newest first: the list is rendered grouped by year, so the order here is the
 * order on the page.
 */
export const credentials: Credential[] = [
  {
    title: "IBM Certified React Developer",
    issuer: "IBM · Coursera",
    category: "Technical",
    scope: "Global professional",
    year: "2025",
    validity: "Lifetime",
    verify: "https://www.coursera.org/account/accomplishments/verify/XE06LJ7KOTVN",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    category: "Technical",
    scope: "Global",
    year: "2025",
    validity: "Lifetime",
    verify:
      "https://www.freecodecamp.org/certification/divisioncode/responsive-web-design",
  },
  {
    title: "Six Sigma White Belt",
    issuer: "The Council for Six Sigma Certification (CSSC)",
    category: "Professional",
    scope: "Global",
    year: "2025",
    validity: "Lifetime",
    verify: "/docs/six-sigma-white-belt.pdf",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI · Stanford University",
    category: "Technical",
    scope: "Global professional",
    year: "2024",
    validity: "Lifetime",
    verify: "https://www.coursera.org/account/accomplishments/verify/CGRHU1JNRE6N",
  },
  {
    title: "Mathematics for Machine Learning: Linear Algebra",
    issuer: "Imperial College London",
    category: "Technical",
    scope: "Global professional",
    year: "2024",
    validity: "Lifetime",
    verify: "https://www.coursera.org/account/accomplishments/verify/9H4XWK4B1PB5",
  },
  {
    title: "O Level",
    issuer: "National Institute of Electronics and Information Technology (NIELIT)",
    category: "Technical",
    scope: "National",
    year: "2017",
    validity: "Lifetime",
    verify: null,
    verifyLabel: "Hard copy",
  },
];

/** Grouped by year, newest first, for the register layout. */
export const credentialsByYear: { year: string; items: Credential[] }[] =
  credentials.reduce<{ year: string; items: Credential[] }[]>((years, item) => {
    const existing = years.find((entry) => entry.year === item.year);
    if (existing) existing.items.push(item);
    else years.push({ year: item.year, items: [item] });
    return years;
  }, []);
