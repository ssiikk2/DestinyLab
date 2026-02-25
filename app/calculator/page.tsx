import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/calculator");

export async function generateMetadata() {
  return generateLandingMetadata("/calculator");
}

export default function CalculatorPage() {
  return <SeoLandingPage page={page} />;
}
