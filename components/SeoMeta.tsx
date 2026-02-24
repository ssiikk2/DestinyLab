import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export interface SeoMetaProps {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: "website" | "article";
}

export function createSeoMeta({
  title,
  description,
  canonical,
  image,
  type = "website",
}: SeoMetaProps): Metadata {
  const canonicalUrl = absoluteUrl(canonical);
  const ogImage = absoluteUrl(image || "/og?tool=compatibility&score=88&label=Love%20Compatibility");

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type,
      url: canonicalUrl,
      siteName: "Love Compatibility Calculator",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function SeoMeta(props: SeoMetaProps): Metadata {
  return createSeoMeta(props);
}
