import { compatibilityPairPages } from "@/content/compatibility-pages";
import { getLandingPaths } from "@/content/landing-pages";
import { allSeoPages } from "@/content/seo-data";
import { absoluteUrl } from "@/lib/seo";

export interface PublicSitemapEntry {
  url: string;
  lastModified: Date;
}

const STATIC_PUBLIC_PATHS = [
  "/",
  "/tests",
  "/blog",
  "/zodiac",
  ...getLandingPaths(),
  "/friendship-compatibility",
  "/privacy",
  "/terms",
  "/cookie-policy",
  "/disclaimer",
  "/about",
  "/contact",
] as const;

const BUILD_LAST_MODIFIED = new Date();
const LEGACY_REDIRECT_PATHS = new Set([
  "/love-compatibility-calculator",
  "/destiny-calculator",
  "/crush-compatibility",
  "/initials-compatibility",
]);

function dedupeByUrl(entries: PublicSitemapEntry[]): PublicSitemapEntry[] {
  const map = new Map<string, PublicSitemapEntry>();

  for (const entry of entries) {
    const existing = map.get(entry.url);
    if (!existing || existing.lastModified < entry.lastModified) {
      map.set(entry.url, entry);
    }
  }

  return [...map.values()].sort((a, b) => a.url.localeCompare(b.url));
}

export function getPublicSitemapEntries(): PublicSitemapEntry[] {
  const staticEntries: PublicSitemapEntry[] = STATIC_PUBLIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: BUILD_LAST_MODIFIED,
  }));

  const seoEntries: PublicSitemapEntry[] = allSeoPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.lastUpdated ? new Date(page.lastUpdated) : BUILD_LAST_MODIFIED,
  })).filter((entry) => !LEGACY_REDIRECT_PATHS.has(new URL(entry.url).pathname));

  const compatibilityEntries: PublicSitemapEntry[] = compatibilityPairPages.map((pair) => ({
    url: absoluteUrl(`/compatibility/${pair.slug}`),
    lastModified: pair.lastUpdated ? new Date(pair.lastUpdated) : BUILD_LAST_MODIFIED,
  }));

  return dedupeByUrl([...staticEntries, ...seoEntries, ...compatibilityEntries]);
}
