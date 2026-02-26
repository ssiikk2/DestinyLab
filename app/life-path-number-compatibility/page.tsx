import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/life-path-number-compatibility");

export async function generateMetadata() {
  return generateLandingMetadata("/life-path-number-compatibility");
}

export default function Page() {
  return <SeoLandingPage page={page} />;
}
