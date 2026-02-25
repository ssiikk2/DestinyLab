import { SeoLandingPage } from "@/components/SeoLandingPage";
import { generateLandingMetadata, requireLandingPage } from "@/lib/landing-page";

export const revalidate = 86400;
export const dynamic = "force-static";

const page = requireLandingPage("/birthday-compatibility");

export async function generateMetadata() {
  return generateLandingMetadata("/birthday-compatibility");
}

export default function BirthdayCompatibilityPage() {
  return <SeoLandingPage page={page} />;
}
