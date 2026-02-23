import type { Metadata } from "next";
import { SeoLongformPage } from "@/components/SeoLongformPage";
import { getToolPageBySlug } from "@/content/seo-data";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 86400;

const page = (() => {
  const found = getToolPageBySlug("crush-compatibility");
  if (!found) {
    throw new Error("Missing content for /crush-compatibility");
  }
  return found;
})();

export const metadata: Metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function CrushCompatibilityPage() {
  return <SeoLongformPage page={page} calculatorMode="crush" includeWebApplicationSchema />;
}
