import type { MetadataRoute } from "next";
import { getPublicSitemapEntries } from "@/lib/sitemap-data";

function resolvePriority(pathname: string): number {
  if (pathname === "/") {
    return 1;
  }

  if (
    pathname === "/calculator" ||
    pathname === "/destiny" ||
    pathname === "/love-percentage" ||
    pathname === "/true-love-test" ||
    pathname === "/crush-calculator" ||
    pathname === "/initials-love-test" ||
    pathname === "/couple-test" ||
    pathname === "/birthday-compatibility" ||
    pathname === "/zodiac-compatibility" ||
    pathname === "/name-compatibility" ||
    pathname === "/friendship-compatibility"
  ) {
    return 0.95;
  }

  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return 0.9;
  }

  if (pathname === "/zodiac" || pathname.startsWith("/zodiac/") || pathname.startsWith("/compatibility/")) {
    return 0.85;
  }

  if (
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === "/cookie-policy" ||
    pathname === "/disclaimer" ||
    pathname === "/about" ||
    pathname === "/contact"
  ) {
    return 0.7;
  }

  return 0.8;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getPublicSitemapEntries().map((entry) => {
    const pathname = new URL(entry.url).pathname;

    return {
      url: entry.url,
      lastModified: entry.lastModified,
      changeFrequency: "weekly" as const,
      priority: resolvePriority(pathname),
    };
  });
}
