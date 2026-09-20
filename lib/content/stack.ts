export type Tech = {
  name: string;
  /** Path under /public/logos. Omitted entries render as a mono wordmark chip. */
  logo?: string;
  note?: string;
};

export type StackGroup = {
  id: string;
  title: string;
  blurb: string;
  items: Tech[];
};

export const stackGroups: StackGroup[] = [
  {
    id: "languages",
    title: "Languages",
    blurb: "Typed where it earns its keep, and two decades of .NET still paying rent.",
    items: [
      { name: "TypeScript", note: "Strict, everywhere new" },
      { name: "JavaScript", logo: "/logos/javascript.svg" },
      { name: "C#" },
      { name: "VB.NET" },
      { name: "SQL" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Server components where the page is content, client state only where it is earned.",
    items: [
      { name: "React", logo: "/logos/react.svg" },
      { name: "Next.js", note: "App Router, RSC" },
      { name: "Vue 3", logo: "/logos/vue.svg", note: "Composition API" },
      { name: "Tailwind CSS", note: "v4" },
      { name: "Vite" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "REST contracts a second team can pick up without a handover call.",
    items: [
      { name: "Node.js", logo: "/logos/node.svg" },
      { name: "Express", logo: "/logos/express.svg" },
      { name: "Koa", logo: "/logos/koa.svg" },
      { name: "ASP.NET", logo: "/logos/aspnet.svg" },
    ],
  },
  {
    id: "data",
    title: "Data",
    blurb: "Document and relational, chosen per domain rather than per habit.",
    items: [
      { name: "MongoDB", logo: "/logos/mongodb.svg" },
      { name: "SQL Server", logo: "/logos/sqlserver.svg" },
    ],
  },
  {
    id: "ai",
    title: "AI systems",
    blurb: "Agents that cite their sources, because an unsourced number is not an answer.",
    items: [
      { name: "Claude Agent SDK", note: "Tunegram" },
      { name: "Agentic workflows" },
      { name: "Document intelligence" },
      { name: "RAG & retrieval" },
    ],
  },
  {
    id: "platform",
    title: "Platform",
    blurb: "Edge-first delivery, with the security headers actually set.",
    items: [
      { name: "AWS", logo: "/logos/aws.svg" },
      { name: "Cloudflare", note: "Edge network" },
      { name: "Vercel" },
      { name: "Netlify" },
    ],
  },
  {
    id: "tooling",
    title: "Tooling",
    blurb: "The unglamorous half that decides whether anything ships twice.",
    items: [
      { name: "Git & GitHub", logo: "/logos/github.svg" },
      { name: "Postman", logo: "/logos/postman.svg" },
      { name: "VS Code", logo: "/logos/vscode.svg" },
      { name: "Visual Studio", logo: "/logos/visual-studio.svg" },
      { name: "Atlassian", logo: "/logos/atlassian.svg" },
      { name: "Trello", logo: "/logos/trello.svg" },
      { name: "Slack", logo: "/logos/slack.svg" },
    ],
  },
];

/** Flat list used by the marquee band under the hero. */
export const marqueeTech: Tech[] = stackGroups
  .flatMap((group) => group.items)
  .filter((item) => Boolean(item.logo));
