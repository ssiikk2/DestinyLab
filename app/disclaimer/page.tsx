import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

const CONTACT_EMAIL = "siik0924@naver.com";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description:
    "Disclaimer for lovecompatibilitycalculator.com regarding entertainment-only content, non-professional advice, and third-party ad responsibility.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-5 px-4 py-8 text-slate-800">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Disclaimer</h1>
      <p className="text-sm text-slate-700">
        All calculators, scores, and written guidance on lovecompatibilitycalculator.com are provided for entertainment and reflection purposes only.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">No professional advice</h2>
        <p className="text-sm text-slate-700">
          Content on this site is not medical, legal, financial, or mental-health advice. It should not be used as a substitute for licensed professional services or emergency support.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Accuracy and limitations</h2>
        <p className="text-sm text-slate-700">
          Compatibility outputs are symbolic and heuristic in nature. Results may be incomplete, simplified, or unsuitable for specific personal circumstances. Users are responsible for independent judgment and final decisions.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Third-party advertisements</h2>
        <p className="text-sm text-slate-700">
          This website may display ads through Google AdSense and other third-party vendors. We do not control or guarantee third-party claims, offers, or outcomes and are not responsible for external websites or services.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">External links</h2>
        <p className="text-sm text-slate-700">
          Pages may include links to external content for reference. We are not responsible for the availability, security, or content accuracy of third-party domains linked from this site.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
        <p className="text-sm text-slate-700">
          For disclaimer inquiries, email <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">{CONTACT_EMAIL}</a>.
        </p>
      </section>

      <p className="text-xs font-medium text-slate-600">For entertainment and reflection purposes only.</p>
    </article>
  );
}
