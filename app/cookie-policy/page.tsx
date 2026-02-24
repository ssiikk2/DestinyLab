import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

const CONTACT_EMAIL = "siik0924@naver.com";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "Cookie policy for lovecompatibilitycalculator.com describing essential cookies, analytics usage, and Google AdSense cookie disclosures.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-5 px-4 py-8 text-slate-800">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Cookie Policy</h1>
      <p className="text-sm text-slate-700">
        This Cookie Policy explains how lovecompatibilitycalculator.com uses cookies and similar technologies when you browse our website.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Essential cookies</h2>
        <p className="text-sm text-slate-700">
          Essential cookies support core site operations such as request reliability, anti-abuse controls, and security protections. Without these cookies, parts of the site may not function correctly.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Preference cookies</h2>
        <p className="text-sm text-slate-700">
          Preference storage may be used to remember user choices such as cookie consent decisions and basic interface behavior. This helps provide a stable and consistent browsing experience.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Analytics and performance cookies</h2>
        <p className="text-sm text-slate-700">
          We may use analytics technologies to understand aggregate traffic patterns, session depth, and page performance. These insights help us improve usability, reduce loading issues, and maintain content quality.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Google AdSense cookies</h2>
        <p className="text-sm text-slate-700">
          Google AdSense and participating third-party vendors may use cookies to serve and measure ads based on prior visits to this and other websites. You can manage advertising preferences through Google Ad Settings and relevant browser controls.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Managing cookies</h2>
        <p className="text-sm text-slate-700">
          You can control cookies through your browser or device settings, including blocking or deleting stored cookies. Disabling certain cookies may affect site functionality or personalization behavior.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
        <p className="text-sm text-slate-700">
          For cookie policy inquiries, email <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">{CONTACT_EMAIL}</a>.
        </p>
      </section>

      <p className="text-xs font-medium text-slate-600">For entertainment and reflection purposes only.</p>
    </article>
  );
}
