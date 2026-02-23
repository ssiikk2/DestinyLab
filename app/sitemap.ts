import type { MetadataRoute } from "next";
import { allSeoPages } from "@/content/seo-data";
import { getBaseUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date("2026-02-23T00:00:00.000Z");

  const staticRoutes = ["", "/tests", "/blog", "/zodiac", "/privacy", "/terms", "/disclaimer", "/contact"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const seoRoutes = allSeoPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(page.lastUpdated),
    changeFrequency: "weekly" as const,
    priority: page.kind === "tool" ? 0.95 : 0.85,
  }));

  return [...staticRoutes, ...seoRoutes];
}
