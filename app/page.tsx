import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InternalLinks } from "@/components/InternalLinks";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { homeGuideLinks, homeToolsLinks } from "@/content/landing-pages";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const revalidate = 86400;
export const dynamic = "force-static";

export const metadata: Metadata = buildMetadata({
  title: "Love Compatibility Calculator and Fun Relationship Readings",
  description:
    "Try love, zodiac, name, and destiny readings with playful explanations and shareable results.",
  path: "/",
});

const homeFaqs = [
  {
    question: "How is this different from a basic one-screen calculator?",
    answer:
      "You get a score plus fun follow-up ideas, related tests, and quick explainers so it never stops at one number.",
  },
  {
    question: "Where should I start first?",
    answer:
      "Start with /calculator, then jump to /couple-test or /destiny for a second angle.",
  },
  {
    question: "Do these tools say what to do after the score?",
    answer:
      "Yes. Every test comes with simple next moves you can try right away.",
  },
  {
    question: "How often should we retake a test?",
    answer: "About once a month is plenty, or after a big change in your relationship.",
  },
  {
    question: "Can I hop between related tests easily?",
    answer: "Yes. Each page links to other tests and guides that match what you just checked.",
  },
  {
    question: "Is this website for entertainment purposes?",
    answer: "Yes. All pages are for entertainment purposes and reflection.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl("/"),
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Love Compatibility Calculator",
  description:
    "Compatibility calculators and relationship guides with playful score explanations.",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  url: absoluteUrl("/"),
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-rose-50 to-sky-50 p-8 md:p-10 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_240px]">
          <div>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Love Compatibility Calculator for fun, curious relationship check-ins
          </h1>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 md:text-base">
            <p>
              Start with a quick score, then keep the vibe going with extra tests, light explainers, and ideas you can
              talk about together.
            </p>
            <p>
              Whether you are checking love percentage, a crush reading, or zodiac chemistry, this is built for
              curiosity and good conversation, not heavy labels.
            </p>
            <p>
              Use each result like a conversation starter. Pick one small thing to try, come back later, and see how
              the mood changes.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/calculator"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try the main calculator
            </Link>
            <Link
              href="/tests"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              See all tests
            </Link>
            <Link
              href="/blog/how-love-calculators-work"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Read how it works
            </Link>
          </div>
        </div>
          <div className="mx-auto md:mx-0">
            <Image
              src="/icons/faviconfinal.png"
              alt="Cat and calculator mascot"
              width={220}
              height={220}
              priority
              className="h-40 w-40 rounded-3xl border border-slate-200 bg-white p-2 shadow-[0_12px_26px_rgba(15,23,42,0.14)] md:h-52 md:w-52"
            />
          </div>
        </div>
      </section>

      <InternalLinks heading="Pick a Test" links={homeToolsLinks} />
      <InternalLinks heading="Quick Reads" links={homeGuideLinks} />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
        <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
        <div className="mt-4 space-y-4">
          {homeFaqs.map((faq) => (
            <article key={faq.question}>
              <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
              <p className="mt-1 text-sm text-slate-700">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <p className="text-xs font-medium text-slate-600">
        All calculators and guides on this website are for entertainment purposes and reflection.
      </p>

      <SeoJsonLd schema={faqSchema} />
      <SeoJsonLd schema={breadcrumbSchema} />
      <SeoJsonLd schema={webAppSchema} />
    </div>
  );
}
