import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/initials-love-test");

export async function generateMetadata() {
  return generateLandingMetadata("/initials-love-test");
}

export default function InitialsLoveTestPage() {
  return <SeoLandingPage page={page} />;
}
