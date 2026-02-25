import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/true-love-test");

export async function generateMetadata() {
  return generateLandingMetadata("/true-love-test");
}

export default function TrueLoveTestPage() {
  return <SeoLandingPage page={page} />;
}
