import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/blog/how-love-calculators-work");

export async function generateMetadata() {
  return generateLandingMetadata("/blog/how-love-calculators-work", "article");
}

export default function HowLoveCalculatorsWorkPage() {
  return <SeoLandingPage page={page} />;
}
