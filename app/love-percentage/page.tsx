import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/love-percentage");

export async function generateMetadata() {
  return generateLandingMetadata("/love-percentage");
}

export default function LovePercentagePage() {
  return <SeoLandingPage page={page} />;
}
