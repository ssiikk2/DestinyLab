import type { Metadata } from "next";
import type { LandingPageRecord } from "@/content/landing-pages";
import { getLandingPageByPath } from "@/content/landing-pages";
import { getGeneratedLandingMetadata } from "@/lib/landing-metadata-service";
import { buildMetadata } from "@/lib/seo";

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

  const fallbackTitle = `${page.h1} | Love Compatibility Calculator`;
  const fallbackDescription = `Try ${page.h1.toLowerCase()} and get a quick, fun read you can share.`;

  return buildMetadata({
    title: generated?.title || fallbackTitle,
    description: generated?.description || fallbackDescription,
    path: page.path,
    type,
  });
}
