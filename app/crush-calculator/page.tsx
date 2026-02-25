import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/crush-calculator");

export async function generateMetadata() {
  return generateLandingMetadata("/crush-calculator");
}

export default function CrushCalculatorPage() {
  return <SeoLandingPage page={page} />;
}
