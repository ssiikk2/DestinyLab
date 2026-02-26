import { absoluteUrl, formatIsoDate } from "@/lib/seo";
import type { SeoFaq } from "@/content/seo-data";

export function buildFaqSchema(faqs: SeoFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildArticleSchema(input: {
  path: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
}) {
  const url = absoluteUrl(input.path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: formatIsoDate(input.publishedAt),
    dateModified: formatIsoDate(input.updatedAt),
    mainEntityOfPage: url,
    url,
    author: {
      "@type": "Organization",
      name: "Love Compatibility Calculator",
    },
    publisher: {
      "@type": "Organization",
      name: "Love Compatibility Calculator",
    },
  };
}

export function buildWebApplicationSchema(input: {
  path: string;
  title: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: input.title,
    description: input.description,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    url: absoluteUrl(input.path),
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
