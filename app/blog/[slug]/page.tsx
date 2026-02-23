import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLongformPage } from "@/components/SeoLongformPage";
import { getBlogPageBySlug, getBlogPages } from "@/content/seo-data";
import { buildMetadata } from "@/lib/seo";

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
    return buildMetadata({
      title: "Compatibility Blog",
      description: "Compatibility blog guide",
      path: "/blog",
    });
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    type: "article",
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
