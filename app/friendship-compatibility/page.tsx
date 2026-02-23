import type { Metadata } from "next";
import { SeoLongformPage } from "@/components/SeoLongformPage";
import { getToolPageBySlug } from "@/content/seo-data";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 86400;

const page = (() => {
  const found = getToolPageBySlug("friendship-compatibility");
  if (!found) {
    throw new Error("Missing content for /friendship-compatibility");
  }
  return found;
})();

export const metadata: Metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function FriendshipCompatibilityPage() {
  return <SeoLongformPage page={page} calculatorMode="friendship" includeWebApplicationSchema />;
}
