import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLongformPage } from "@/components/SeoLongformPage";
import { getBlogPageBySlug, getBlogPages } from "@/content/seo-data";
import { buildGuideMeta } from "@/lib/seo";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400;

export const dynamicParams = false;

export async function generateStaticParams() {
  return getBlogPages().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getBlogPageBySlug(slug);

  if (!page) {
    return buildGuideMeta({
      primaryKeyword: "Compatibility guide",
      path: "/blog",
      year: 2026,
      variantSeed: "/blog",
    });
  }

  return buildGuideMeta({
    primaryKeyword: page.keyword || page.h1,
    path: page.path,
    year: 2026,
    variantSeed: page.slug,
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const page = getBlogPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <SeoLongformPage page={page} calculatorMode="love" includeArticleSchema />;
}
