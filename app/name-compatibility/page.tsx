import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/name-compatibility");

export async function generateMetadata() {
  return generateLandingMetadata("/name-compatibility");
}

export default function NameCompatibilityPage() {
  return <SeoLandingPage page={page} />;
}
