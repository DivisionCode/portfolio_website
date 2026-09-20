export type Layer = {
  id: string;
  index: string;
  title: string;
  caption: string;
  tech: string[];
};

/**
 * The shape of the Fundrev platform, top to bottom.
 *
 * Technologies and layer names only. Nothing here names an internal service,
 * a hostname, or anything else that is not already public.
 */
export const layers: Layer[] = [
  {
    id: "client",
    index: "01",
    title: "Client",
    caption: "Server components render the page; the client only hydrates what is interactive.",
    tech: ["Next.js App Router", "React 19", "TypeScript", "Tailwind CSS", "Glide Data Grid", "Plotly"],
  },
  {
    id: "edge",
    index: "02",
    title: "Edge and ingress",
    caption: "TLS, caching and the first authorisation decision, before anything reaches a pod.",
    tech: ["CloudFront", "AWS Load Balancer Controller", "Ingress", "Network policies", "Rate limiting"],
  },
  {
    id: "api",
    index: "03",
    title: "API",
    caption: "One typed boundary. Every request is schema-validated and traced end to end.",
    tech: ["Node.js", "Express 5", "Zod", "WebAuthn", "SAML SSO", "Argon2", "OpenTelemetry"],
  },
  {
    id: "orchestration",
    index: "04",
    title: "Orchestration",
    caption: "Diligence runs for hours. Durable execution means a deploy mid-run is survivable.",
    tech: ["Temporal", "RabbitMQ", "Workflow workers"],
  },
  {
    id: "intelligence",
    index: "05",
    title: "Intelligence",
    caption: "Model calls routed and costed through one gateway, every trace captured for evaluation.",
    tech: ["LiteLLM", "Arize Phoenix", "AWS Textract", "Retrieval", "Pyodide sandbox"],
  },
  {
    id: "data",
    index: "06",
    title: "Data",
    caption: "Transactional and analytical stores kept apart, with a semantic layer over the top.",
    tech: ["PostgreSQL", "ClickHouse", "Redis", "Cube", "Airbyte", "S3"],
  },
  {
    id: "platform",
    index: "07",
    title: "Platform",
    caption: "Defined in a repository and reconciled continuously. Nothing is clicked into existence.",
    tech: ["Terraform", "Amazon EKS", "Argo CD", "Kustomize", "Sealed Secrets", "HPA and PDBs"],
  },
  {
    id: "observability",
    index: "08",
    title: "Observability",
    caption: "Traces, logs, metrics and model spend on one pane, so an incident has one timeline.",
    tech: ["Grafana", "Loki", "Tempo", "Prometheus", "Grafana Faro", "CloudTrail"],
  },
];
