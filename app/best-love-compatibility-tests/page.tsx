import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/best-love-compatibility-tests");

export async function generateMetadata() {
  return generateLandingMetadata("/best-love-compatibility-tests");
}

export default function Page() {
  return <SeoLandingPage page={page} />;
}
