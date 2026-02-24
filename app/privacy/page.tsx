import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

const CONTACT_EMAIL = "siik0924@naver.com";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for lovecompatibilitycalculator.com including data collection, cookie usage, AdSense disclosures, retention, and user rights.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-5 px-4 py-8 text-slate-800">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Privacy Policy</h1>
      <p className="text-sm text-slate-700">
        This Privacy Policy explains how lovecompatibilitycalculator.com collects, uses, stores, and protects information when you use our calculators, guides, and related pages.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Information we collect</h2>
        <p className="text-sm text-slate-700">
          We may collect technical and usage information such as IP address, device type, browser type, referring page, request timestamp, and basic interaction logs. If you submit names, initials, birth dates, or sign inputs into a calculator, those inputs may be processed to generate requested results.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">How we use data</h2>
        <p className="text-sm text-slate-700">
          We use collected information to provide calculator outputs, prevent abuse, enforce rate limits, monitor infrastructure reliability, improve site content quality, and measure service performance. We also use logs to diagnose errors and maintain service availability.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Cookies and similar technologies</h2>
        <p className="text-sm text-slate-700">
          Our site and trusted partners may use cookies, local storage, and similar technologies to keep sessions stable, remember consent preferences, support analytics, and improve user experience. Browser settings allow you to control or delete cookies at any time.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Google AdSense and third-party vendors</h2>
        <p className="text-sm text-slate-700">
          We use Google AdSense to display ads. Google and other third-party vendors may use cookies to serve ads based on prior visits to this and other sites. You can manage ad personalization through Google Ad Settings and learn more through Google advertising policy pages.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Data retention</h2>
        <p className="text-sm text-slate-700">
          Operational logs and usage records are retained only as long as needed for security, abuse prevention, performance analysis, and legal compliance. Cached calculator outputs may be retained for up to 30 days to improve response speed and reduce duplicate processing costs.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">GDPR and user rights</h2>
        <p className="text-sm text-slate-700">
          Depending on your location, you may have rights to request access, correction, deletion, restriction, objection, or portability of personal data. You may also withdraw consent where processing relies on consent. We will review and respond to valid requests within a reasonable period.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
        <p className="text-sm text-slate-700">
          For privacy inquiries, email <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">{CONTACT_EMAIL}</a>.
        </p>
      </section>

      <p className="text-xs font-medium text-slate-600">For entertainment and reflection purposes only.</p>
    </article>
  );
}
