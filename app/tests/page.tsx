import type { Metadata } from "next";
import { TestsExplorer } from "@/app/tests/tests-explorer";
import { landingPages } from "@/content/landing-pages";
import { buildHubMeta } from "@/lib/seo";

export const metadata: Metadata = buildHubMeta({
  primaryKeyword: "Relationship Compatibility Tests",
  path: "/tests",
  year: 2026,
  variantSeed: "/tests",
});

export const revalidate = 86400;
export const dynamic = "force-static";

export default function TestsHubPage() {
  const tools = landingPages
    .filter((page) => page.calculatorMode)
    .map((page) => ({
      path: page.path,
      h1: page.h1,
      description: page.description,
      mode: page.calculatorMode || "love",
    }));

  return <TestsExplorer tools={tools} />;
}
