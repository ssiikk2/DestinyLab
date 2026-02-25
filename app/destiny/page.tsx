import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/destiny");

export async function generateMetadata() {
  return generateLandingMetadata("/destiny");
}

export default function DestinyPage() {
  return <SeoLandingPage page={page} />;
}
