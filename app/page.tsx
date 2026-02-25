import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/InternalLinks";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { homeGuideLinks, homeToolsLinks } from "@/content/landing-pages";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const revalidate = 86400;
export const dynamic = "force-static";

export const metadata: Metadata = buildMetadata({
  title: "Love Compatibility Calculator and Relationship Guide Hub",
  description:
    "Explore calculator, destiny, zodiac, name, and couple-test pages with practical interpretation, FAQs, and internal guides.",
  path: "/",
});

const homeFaqs = [
  {
    question: "How is this site different from a simple one-page calculator?",
    answer:
      "Each route includes interpretation, FAQs, and internal links so users can act on results instead of seeing only a number.",
  },
  {
    question: "Which page should I start with for fastest clarity?",
    answer:
      "Start with /calculator, then use /couple-test or /destiny to validate whether issues are shared or individual.",
  },
  {
    question: "Do these tools explain what to do after the score?",
    answer:
      "Yes. Each tool page includes simple follow-up steps you can try in daily conversations.",
  },
  {
    question: "How often should users retest compatibility?",
    answer: "Monthly retests after behavior changes provide clearer trend signal than frequent retests.",
  },
  {
    question: "Can users navigate to guides from every tool page?",
    answer: "Yes. Internal links connect tool pages to related tests and informational guides.",
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
    "Compatibility calculators and relationship guides with practical score interpretation.",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  url: absoluteUrl("/"),
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-rose-50 to-sky-50 p-7 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Love Compatibility Calculator with practical relationship guides
          </h1>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 md:text-base">
            <p>
              This website helps you do two things: get a quick score and understand what to do next. Instead of
              leaving you with one number, each page connects to related tests, FAQs, and clear next steps.
            </p>
            <p>
              Whether you are checking love percentage, a crush score, or zodiac compatibility, the goal is the same:
              turn results into better conversations. The guides stay practical and focus on habits you can actually
              test together.
            </p>
            <p>
              Treat every score as a reflection prompt. Choose one improvement, run it for a few weeks, and retest with
              context. That habit turns symbolic tools into useful decision support while keeping expectations realistic.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/calculator"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Start main calculator
            </Link>
            <Link
              href="/tests"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Browse all tools
            </Link>
            <Link
              href="/blog/how-love-calculators-work"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Read methodology guide
            </Link>
          </div>
        </div>
      </section>

      <InternalLinks heading="Tools" links={homeToolsLinks} />
      <InternalLinks heading="Guides" links={homeGuideLinks} />

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
