import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinkCluster } from "@/components/InternalLinkCluster";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { getBlogPages } from "@/content/seo-data";
import { absoluteUrl, buildHubMeta } from "@/lib/seo";

export const metadata: Metadata = buildHubMeta({
  primaryKeyword: "Compatibility Insights Blog",
  path: "/blog",
  year: 2026,
  variantSeed: "/blog",
});

export const revalidate = 86400;

type BlogCategory = "Playful Tips" | "Zodiac Stories" | "Relationship Truths" | "Quiz Explained";

function categorize(slug: string): BlogCategory {
  if (slug.includes("zodiac") || slug.includes("aries") || slug.includes("taurus") || slug.includes("gemini") || slug.includes("cancer") || slug.includes("leo") || slug.includes("virgo") || slug.includes("libra") || slug.includes("scorpio") || slug.includes("sagittarius") || slug.includes("capricorn") || slug.includes("aquarius") || slug.includes("pisces")) {
    return "Zodiac Stories";
  }

  if (slug.includes("how-accurate") || slug.includes("score") || slug.includes("compatibility-by-name") || slug.includes("explained")) {
    return "Quiz Explained";
  }

  if (slug.includes("repair") || slug.includes("growth") || slug.includes("long-term") || slug.includes("reconnect") || slug.includes("truth")) {
    return "Relationship Truths";
  }

  return "Playful Tips";
}

const CATEGORY_STYLE: Record<BlogCategory, string> = {
  "Playful Tips": "border-fuchsia-200 bg-fuchsia-50/70",
  "Zodiac Stories": "border-teal-200 bg-teal-50/70",
  "Relationship Truths": "border-amber-200 bg-amber-50/70",
  "Quiz Explained": "border-sky-200 bg-sky-50/70",
};

export default function BlogIndexPage() {
  const posts = getBlogPages().slice(0, 12);
  const faqItems = [
    {
      question: "What can I learn from these compatibility guides?",
      answer: "Each guide explains score meaning, strengths, challenges, and realistic next steps.",
    },
    {
      question: "How do these guides improve communication?",
      answer: "They turn broad scores into concrete conversation advice you can use right away.",
    },
    {
      question: "Should I read guides before taking a test?",
      answer: "Either order works, but combining both gives clearer context for decisions.",
    },
    {
      question: "Do guides include long-term relationship outlook?",
      answer: "Yes, many pages cover long-term rhythm and likely pressure points.",
    },
    {
      question: "What if two guides feel different?",
      answer: "Compare overlap in strengths and challenges, then follow the most practical advice.",
    },
    {
      question: "Where should I go after reading one post?",
      answer: "Open a related test and compare the live result with the guide's next steps.",
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
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
    ],
  };

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <header className="space-y-3 rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Compatibility Blog Hub</h1>
        <p className="text-sm text-slate-700 md:text-base">
          Pick a lane: playful tips, zodiac stories, relationship truths, or quiz explainers.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => {
          const category = categorize(post.slug);
          return (
            <article
              key={post.slug}
              className={`rounded-3xl border p-5 shadow-[0_12px_30px_rgba(15,23,42,0.07)] ${CATEGORY_STYLE[category]}`}
            >
              <p className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-800">
                {category}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">{post.h1}</h2>
              <p className="mt-2 text-sm text-slate-700">{post.description}</p>
              <Link href={post.path} className="mt-4 inline-block text-sm font-semibold text-slate-900 underline">
                Read this story
              </Link>
            </article>
          );
        })}
      </div>

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

      <InternalLinkCluster context={{ type: "hub", tags: ["blog", "guide"] }} />
      <SeoJsonLd schema={faqSchema} />
      <SeoJsonLd schema={breadcrumbSchema} />
    </section>
  );
}
