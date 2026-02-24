import type { Metadata } from "next";

export const CANONICAL_ORIGIN = "https://lovecompatibilitycalculator.com";
const DEFAULT_OG_IMAGE = `${CANONICAL_ORIGIN}/og?tool=compatibility&score=88&label=Love%20Compatibility`;

export interface MetadataInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  ogImage?: string;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${CANONICAL_ORIGIN}${cleanPath}`;
}

export function buildMetadata(input: MetadataInput): Metadata {
  const canonicalUrl = absoluteUrl(input.path);
  const ogImage = absoluteUrl(input.ogImage || DEFAULT_OG_IMAGE);

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: input.title,
      description: input.description,
      type: input.type || "website",
      url: canonicalUrl,
      siteName: "Love Compatibility Calculator",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [ogImage],
    },
  };
}

export function buildSeoMetaTemplate(input: MetadataInput): Metadata {
  return buildMetadata(input);
}

export function formatIsoDate(dateInput: string): string {
  const parsed = new Date(dateInput);
  return Number.isNaN(parsed.valueOf()) ? new Date().toISOString() : parsed.toISOString();
}

export function formatHumanDate(dateInput: string): string {
  const parsed = new Date(dateInput);

  if (Number.isNaN(parsed.valueOf())) {
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
