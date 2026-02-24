import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Love Compatibility Calculator",
  description:
    "About lovecompatibilitycalculator.com, our content approach, calculator philosophy, and entertainment-focused relationship guidance model.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl space-y-5 px-4 py-8 text-slate-800">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">About Love Compatibility Calculator</h1>
      <p className="text-sm text-slate-700">
        lovecompatibilitycalculator.com is an entertainment-focused relationship reflection platform. We build symbolic calculators and practical guides that help users think clearly about communication patterns, emotional pacing, and compatibility habits.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">What we publish</h2>
        <p className="text-sm text-slate-700">
          Our core pages include love compatibility, destiny, zodiac, birthday, crush, initials, friendship, and related educational articles. We focus on score interpretation and practical next steps rather than vague one-line predictions.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">How to use our tools</h2>
        <p className="text-sm text-slate-700">
          The best use case is reflection. Run a calculator, review the score tier, choose one behavior change, and revisit monthly. This process turns symbolic insights into measurable communication improvements and more grounded relationship decisions.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Editorial intent</h2>
        <p className="text-sm text-slate-700">
          We aim to provide clear, original, and user-first content that avoids manipulative claims. Our pages are designed for readability on mobile and desktop, with transparent policy pages and straightforward navigation to calculators and guides.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Important note</h2>
        <p className="text-sm text-slate-700">
          This website does not provide professional therapy, legal advice, medical diagnosis, or financial guidance. For serious decisions, consult qualified professionals.
        </p>
      </section>

      <p className="text-xs font-medium text-slate-600">For entertainment and reflection purposes only.</p>
    </article>
  );
}
