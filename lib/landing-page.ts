import type { LandingPageRecord } from "@/content/landing-pages";
import { getLandingPageByPath } from "@/content/landing-pages";

export function requireLandingPage(path: string): LandingPageRecord {
  const page = getLandingPageByPath(path);
  if (!page) {
    throw new Error(`Missing landing page content for ${path}`);
  }

  return page;
}
