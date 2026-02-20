import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog-seeds";
import { compatibilityPairPages } from "@/content/compatibility-pages";
import { getBaseUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const fixedRoutes = ["", "/about", "/contact", "/privacy", "/terms", "/disclaimer"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.6,
    }),
  );

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const pairRoutes = compatibilityPairPages.map((pair) => ({
    url: `${baseUrl}/compatibility/${pair.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...fixedRoutes, ...blogRoutes, ...pairRoutes];
}