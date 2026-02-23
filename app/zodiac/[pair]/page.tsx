import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLongformPage } from "@/components/SeoLongformPage";
import { getZodiacPageBySlug, getZodiacPages } from "@/content/seo-data";
import { buildMetadata } from "@/lib/seo";

interface ZodiacPageProps {
  params: Promise<{ pair: string }>;
}

export const revalidate = 86400;

export const dynamicParams = false;

export async function generateStaticParams() {
  return getZodiacPages().map((page) => ({ pair: page.slug }));
}

export async function generateMetadata({ params }: ZodiacPageProps): Promise<Metadata> {
  const { pair } = await params;
  const page = getZodiacPageBySlug(pair);

  if (!page) {
    return buildMetadata({
      title: "Zodiac Compatibility",
      description: "Zodiac compatibility guide",
      path: "/zodiac",
    });
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export default async function ZodiacPairPage({ params }: ZodiacPageProps) {
  const { pair } = await params;
  const page = getZodiacPageBySlug(pair);

  if (!page) {
    notFound();
  }

  return <SeoLongformPage page={page} calculatorMode="zodiac" />;
}
