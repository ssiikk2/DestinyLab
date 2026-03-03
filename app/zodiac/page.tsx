import type { Metadata } from "next";
import { InternalLinkCluster } from "@/components/InternalLinkCluster";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { ZodiacHubExplorer } from "@/components/ZodiacHubExplorer";
import { getZodiacPages } from "@/content/seo-data";
import { absoluteUrl, buildHubMeta } from "@/lib/seo";

export const metadata: Metadata = buildHubMeta({
  primaryKeyword: "Zodiac Compatibility Hub",
  path: "/zodiac",
  year: 2026,
  variantSeed: "/zodiac",
});

export const revalidate = 86400;

export default function ZodiacHubPage() {
  const pages = getZodiacPages();
  const faqItems = [
    {
      question: "How should I read zodiac score meaning?",
      answer: "Use it as a guide to strengths, challenges, and the tone of your communication.",
    },
    {
      question: "Which pair insight matters most first?",
      answer: "Start with the biggest challenge section and agree on one practical next step.",
    },
    {
      question: "Can zodiac compatibility show communication style?",
      answer: "Yes, it often highlights pace differences, conflict tone, and repair habits.",
    },
    {
      question: "What if our score is lower than expected?",
      answer: "Focus on advice and communication tips before drawing long-term conclusions.",
    },
    {
      question: "Should we compare more than one pair page?",
      answer: "Yes, comparing pages helps you separate recurring patterns from one-off moods.",
    },
    {
      question: "What next steps should we try this week?",
      answer: "Pick one small communication change and review it together after seven days.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Zodiac Hub", item: absoluteUrl("/zodiac") },
    ],
  };

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <header className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Zodiac Match Hub</h1>
        <p className="text-sm text-slate-700 md:text-base">
          Some sign pairs feel like fireworks, others feel like slow-burn poetry. Pick two signs and open their story.
        </p>
      </header>

      <ZodiacHubExplorer pages={pages.map((page) => ({ slug: page.slug, path: page.path, h1: page.h1 }))} />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
        <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
        <div className="mt-4 space-y-3">
          {faqItems.map((faq) => (
            <details key={faq.question} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">{faq.question}</summary>
              <p className="mt-2 text-sm text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <InternalLinkCluster context={{ type: "hub", tags: ["zodiac", "cosmic"] }} />
      <SeoJsonLd schema={faqSchema} />
      <SeoJsonLd schema={breadcrumbSchema} />
    </section>
  );
}
