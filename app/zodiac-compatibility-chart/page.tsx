import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/zodiac-compatibility-chart");

export async function generateMetadata() {
  return generateLandingMetadata("/zodiac-compatibility-chart");
}

export default function Page() {
  return <SeoLandingPage page={page} />;
}
