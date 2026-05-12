import type { Metadata } from "next";
import { BlogGuideExplorer, type BlogCategory } from "@/components/BlogGuideExplorer";
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

type PostCategory = Exclude<BlogCategory, "All">;

function categorize(slug: string): PostCategory {
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

export default function BlogIndexPage() {
  const posts = getBlogPages().map((post) => ({
    slug: post.slug,
    path: post.path,
    h1: post.h1,
    description: post.description,
    category: categorize(post.slug),
  }));
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
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <BlogGuideExplorer posts={posts} />

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
