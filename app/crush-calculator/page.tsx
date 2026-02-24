import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { requireLandingPage } from "@/lib/landing-page";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/crush-calculator");

export const metadata: Metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function CrushCalculatorPage() {
  return <SeoLandingPage page={page} />;
}
