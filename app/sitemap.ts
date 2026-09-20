import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content/site";
import { allWork } from "@/lib/content/work";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...allWork.map((item) => ({
      url: `${SITE_URL}/work/${item.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: item.kind === "venture" ? 0.8 : 0.6,
    })),
  ];
}
