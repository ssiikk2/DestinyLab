import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLongformPage } from "@/components/SeoLongformPage";
import { getZodiacPageBySlug, getZodiacPages } from "@/content/seo-data";
import { buildPairMeta } from "@/lib/seo";

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
    return buildPairMeta({
      signA: "Zodiac",
      signB: "Pair",
      path: "/zodiac",
      year: 2026,
      variantSeed: "/zodiac",
    });
  }

  const pairName = page.h1.replace(/ Compatibility$/i, "");
  const [signA = "Zodiac", signB = "Pair"] = pairName.split(/\s+and\s+/i);

  return buildPairMeta({
    signA,
    signB,
    path: page.path,
    year: 2026,
    variantSeed: page.slug,
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
