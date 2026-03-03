import type { Metadata } from "next";
import type { LandingPageRecord } from "@/content/landing-pages";
import { getLandingPageByPath } from "@/content/landing-pages";
import { getGeneratedLandingMetadata } from "@/lib/landing-metadata-service";
import { buildGuideMeta, buildHubMeta, buildToolMeta } from "@/lib/seo";

export function requireLandingPage(path: string): LandingPageRecord {
  const page = getLandingPageByPath(path);
  if (!page) {
    throw new Error(`Missing landing page content for ${path}`);
  }

  return page;
}

export async function generateLandingMetadata(
  path: string,
  type: "website" | "article" = "website",
): Promise<Metadata> {
  const page = requireLandingPage(path);
  const generated = await getGeneratedLandingMetadata({
    path: page.path,
    h1: page.h1,
    mode: page.calculatorMode,
  });

  const hubPaths = new Set(["/tests", "/zodiac", "/zodiac-compatibility-chart", "/best-love-compatibility-tests"]);

  if (type === "article" || page.path.startsWith("/blog/")) {
    return buildGuideMeta({
      primaryKeyword: generated?.title || page.h1,
      path: page.path,
      year: 2026,
      variantSeed: page.path,
    });
  }

  if (hubPaths.has(page.path)) {
    return buildHubMeta({
      primaryKeyword: generated?.title || page.h1,
      path: page.path,
      year: 2026,
      variantSeed: page.path,
    });
  }

  return buildToolMeta({
    primaryKeyword: generated?.title || page.h1,
    path: page.path,
    year: 2026,
    variantSeed: page.path,
  });
}
