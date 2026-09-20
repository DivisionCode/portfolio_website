export type Credential = {
  title: string;
  issuer: string;
  scope: string;
  year: string;
  validity: string;
  /** Verification link, or null when the record is a physical copy only. */
  verify: string | null;
  verifyLabel?: string;
};

export type CredentialGroup = {
  id: string;
  label: string;
  caption: string;
  items: Credential[];
};

export const credentialGroups: CredentialGroup[] = [
  {
    id: "education",
    label: "Education",
    caption: "Degrees and general education",
    items: [
      {
        title: "Bachelor of Computer Applications",
        issuer: "Indira Gandhi National Open University (IGNOU) · Vikas Bhawan",
        scope: "Open & distance learning",
        year: "Pursuing",
        validity: "n/a",
        verify: null,
      },
      {
        title: "Diploma in Computer Science & Engineering",
        issuer:
          "Karnataka State Open University (KSOU) · Baba Saheb Ambedkar Institute of Technology and Management",
        scope: "Regular",
        year: "2014",
        validity: "n/a",
        verify: null,
      },
      {
        title: "Higher Secondary (12th)",
        issuer:
          "West Bengal Council of Higher Secondary Education · Shree Satyanarayan Madhav Mishra Vidyalaya",
        scope: "Regular",
        year: "2012",
        validity: "n/a",
        verify: null,
      },
      {
        title: "Secondary (10th)",
        issuer: "West Bengal Board of Secondary Education · Hindmotor High School",
        scope: "Regular",
        year: "2010",
        validity: "n/a",
        verify: null,
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    caption: "Engineering and machine-learning certifications",
    items: [
      {
        title: "IBM Certified React Developer",
        issuer: "IBM · Coursera",
        scope: "Global professional",
        year: "2025",
        validity: "Lifetime",
        verify:
          "https://www.coursera.org/account/accomplishments/verify/XE06LJ7KOTVN",
      },
      {
        title: "Supervised Machine Learning: Regression and Classification",
        issuer: "DeepLearning.AI · Stanford University",
        scope: "Global professional",
        year: "2024",
        validity: "Lifetime",
        verify:
          "https://www.coursera.org/account/accomplishments/verify/CGRHU1JNRE6N",
      },
      {
        title: "Mathematics for Machine Learning: Linear Algebra",
        issuer: "Imperial College London",
        scope: "Global professional",
        year: "2024",
        validity: "Lifetime",
        verify:
          "https://www.coursera.org/account/accomplishments/verify/9H4XWK4B1PB5",
      },
      {
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        scope: "Global",
        year: "2025",
        validity: "Lifetime",
        verify:
          "https://www.freecodecamp.org/certification/divisioncode/responsive-web-design",
      },
      {
        title: "O Level",
        issuer:
          "National Institute of Electronics and Information Technology (NIELIT)",
        scope: "National",
        year: "2017",
        validity: "Lifetime",
        verify: null,
        verifyLabel: "Hard copy",
      },
    ],
  },
  {
    id: "professional",
    label: "Professional",
    caption: "Process and quality certifications",
    items: [
      {
        title: "Six Sigma White Belt",
        issuer: "The Council for Six Sigma Certification (CSSC)",
        scope: "Global",
        year: "2025",
        validity: "Lifetime",
        verify: "/docs/six-sigma-white-belt.pdf",
      },
    ],
  },
];
