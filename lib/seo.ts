import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/env";

export interface MetadataInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

export function absoluteUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${getBaseUrl()}${cleanPath}`;
}

export function buildMetadata(input: MetadataInput): Metadata {
  const canonicalUrl = absoluteUrl(input.path);

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      type: input.type || "website",
      url: canonicalUrl,
      siteName: "Love Compatibility Calculator",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
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
