import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { requireLandingPage } from "@/lib/landing-page";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/name-compatibility");

export const metadata: Metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function NameCompatibilityPage() {
  return <SeoLandingPage page={page} />;
}
