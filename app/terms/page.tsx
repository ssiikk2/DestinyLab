import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

const CONTACT_EMAIL = "siik0924@naver.com";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "Terms of use for lovecompatibilitycalculator.com covering acceptable use, advertising disclosures, and liability limitations.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-5 px-4 py-8 text-slate-800">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Terms of Use</h1>
      <p className="text-sm text-slate-700">
        By accessing or using lovecompatibilitycalculator.com, you agree to these Terms of Use. If you do not agree, please do not use this website.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Service scope</h2>
        <p className="text-sm text-slate-700">
          This site provides symbolic compatibility calculators, relationship guides, and educational content for reflection and entertainment. Content on this website is not a substitute for medical, legal, financial, or professional counseling advice.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Acceptable use</h2>
        <p className="text-sm text-slate-700">
          You agree not to misuse the platform, submit malicious traffic, attempt to bypass rate limits, interfere with service availability, scrape protected resources, or use automated methods that degrade performance for other users.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Intellectual property</h2>
        <p className="text-sm text-slate-700">
          Site design, text, branding, and generated page structure are protected by applicable intellectual property laws. You may reference the service for personal use, but unauthorized reproduction or redistribution of substantial site content is not permitted.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Advertising disclosure</h2>
        <p className="text-sm text-slate-700">
          This website may display advertising through Google AdSense and third-party vendor systems. Ads are managed by advertising partners under their own policies. We do not guarantee or endorse third-party products, claims, or services shown in ads.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Availability and changes</h2>
        <p className="text-sm text-slate-700">
          We may update, suspend, or remove features, pages, prompts, and scoring logic at any time to improve reliability, legal compliance, and safety. We do not guarantee uninterrupted access and are not liable for temporary outages.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Limitation of liability</h2>
        <p className="text-sm text-slate-700">
          You are responsible for how you use any result or content from this site. To the maximum extent permitted by law, we are not liable for direct or indirect losses arising from use of this website or reliance on generated outputs.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
        <p className="text-sm text-slate-700">
          For terms inquiries, email <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">{CONTACT_EMAIL}</a>.
        </p>
      </section>

      <p className="text-xs font-medium text-slate-600">For entertainment and reflection purposes only.</p>
    </article>
  );
}
