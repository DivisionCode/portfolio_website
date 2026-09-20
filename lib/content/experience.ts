export type Role = {
  company: string;
  logo?: string;
  /** Leave empty to hide the entry, the section renders only complete records. */
  title: string;
  period: string;
  summary: string;
  /** What you actually shipped there. One line each. */
  work: string[];
  href?: string;
};

/**
 * ── FILL ME IN ────────────────────────────────────────────────────────────
 * These four companies are carried over from the previous site's logo set, but
 * it never listed the roles, dates or scope. Entries with an empty `title` or
 * `period` are skipped at render time, so the section stays hidden until the
 * real details are in, nothing here is invented.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const experience: Role[] = [
  {
    company: "Ancile Technologies",
    logo: "/logos/anciletech.png",
    title: "",
    period: "",
    summary: "",
    work: [],
  },
  {
    company: "Illimitable",
    logo: "/logos/illimitable.png",
    title: "",
    period: "",
    summary: "",
    work: [],
  },
  {
    company: "Mona Medicos",
    logo: "/logos/monamedicos.png",
    title: "",
    period: "",
    summary: "",
    work: [],
  },
  {
    company: "Super Infotech",
    logo: "/logos/superinfotech.png",
    title: "",
    period: "",
    summary: "",
    work: [],
  },
];

export const publishedExperience = experience.filter(
  (role) => role.title.trim() !== "" && role.period.trim() !== "",
);
