import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/couple-test");

export async function generateMetadata() {
  return generateLandingMetadata("/couple-test");
}

export default function CoupleTestPage() {
  return <SeoLandingPage page={page} />;
}
