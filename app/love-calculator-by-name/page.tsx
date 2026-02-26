import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/love-calculator-by-name");

export async function generateMetadata() {
  return generateLandingMetadata("/love-calculator-by-name");
}

export default function Page() {
  return <SeoLandingPage page={page} />;
}
