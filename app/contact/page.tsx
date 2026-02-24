import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

const CONTACT_EMAIL = "siik0924@naver.com";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact lovecompatibilitycalculator.com for support, policy requests, and website-related inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-5 px-4 py-8 text-slate-800">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Contact</h1>
      <p className="text-sm text-slate-700">
        For support, policy requests, content questions, or business inquiries, contact us by email.
      </p>

      <p className="text-sm text-slate-700">
        Email:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
          {CONTACT_EMAIL}
        </a>
      </p>

      <p className="text-xs font-medium text-slate-600">For entertainment and reflection purposes only.</p>
    </article>
  );
}
