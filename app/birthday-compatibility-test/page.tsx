import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/birthday-compatibility-test");

export async function generateMetadata() {
  return generateLandingMetadata("/birthday-compatibility-test");
}

export default function Page() {
  return <SeoLandingPage page={page} />;
}
