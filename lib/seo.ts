import type { Metadata } from "next";

export const CANONICAL_ORIGIN = "https://lovecompatibilitycalculator.com";
const DEFAULT_OG_IMAGE = `${CANONICAL_ORIGIN}/og?tool=compatibility&score=86&label=Relationship%20Insights`;

type MetaKind = "pair" | "tool" | "hub" | "guide";

export interface MetadataInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  ogImage?: string;
}

export interface PairMetaInput {
  signA: string;
  signB: string;
  path: string;
  year?: number;
  variantSeed?: string;
}

export interface ToolMetaInput {
  primaryKeyword: string;
  path: string;
  year?: number;
  variantSeed?: string;
}

export interface HubMetaInput {
  primaryKeyword: string;
  path: string;
  year?: number;
  variantSeed?: string;
}

export interface GuideMetaInput {
  primaryKeyword: string;
  path: string;
  year?: number;
  variantSeed?: string;
}

const DESCRIPTION_TRIGGERS = [
  "meaning",
  "strengths",
  "challenges",
  "advice",
  "next steps",
  "long-term",
  "communication",
] as const;

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function pickVariant<T>(pool: T[], seed: string): T {
  return pool[hashString(seed) % pool.length];
}

function truncateNear(input: string, max: number): string {
  const text = input.trim().replace(/\s+/g, " ");
  if (text.length <= max) return text;
  const slice = text.slice(0, max - 1);
  const cut = slice.lastIndexOf(" ");
  const head = cut > 20 ? slice.slice(0, cut) : slice;
  return `${head.trimEnd()}…`;
}

function ensureLengthRange(input: string, min: number, max: number): string {
  const text = input.trim().replace(/\s+/g, " ");
  if (text.length > max) return truncateNear(text, max);
  if (text.length >= min) return text;
  const filler = " Practical meaning and clear next steps for real conversations.";
  return truncateNear(`${text}${filler}`, max);
}

function enforceDescriptionTriggers(description: string): string {
  const lowered = description.toLowerCase();
  const matched = DESCRIPTION_TRIGGERS.filter((word) => lowered.includes(word));
  if (matched.length >= 2) {
    return description;
  }

  const missing = DESCRIPTION_TRIGGERS.filter((word) => !lowered.includes(word)).slice(0, 2 - matched.length);
  const tail = missing.length > 0 ? ` Includes ${missing.join(" and ")}.` : "";
  return `${description}${tail}`;
}

function normalizeCalculatorWord(text: string, kind: MetaKind): string {
  if (kind === "tool") {
    let seen = false;
    return text.replace(/\bcalculator\b/gi, (word) => {
      if (!seen) {
        seen = true;
        return word;
      }
      return "insight tool";
    });
  }

  return text.replace(/\bcalculator\b/gi, "insight tool");
}

function sanitizeTitle(title: string, kind: MetaKind): string {
  const normalized = normalizeCalculatorWord(title, kind);
  return truncateNear(normalized, 60);
}

function sanitizeDescription(description: string, kind: MetaKind): string {
  const normalized = normalizeCalculatorWord(description, kind);
  const withTriggers = enforceDescriptionTriggers(normalized);
  return ensureLengthRange(withTriggers, 120, 155);
}

function buildByKind(input: {
  kind: MetaKind;
  title: string;
  description: string;
  path: string;
  ogImage: string;
  type?: "website" | "article";
}): Metadata {
  return buildMetadata({
    title: sanitizeTitle(input.title, input.kind),
    description: sanitizeDescription(input.description, input.kind),
    path: input.path,
    ogImage: input.ogImage,
    type: input.type || (input.kind === "guide" ? "article" : "website"),
  });
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${CANONICAL_ORIGIN}${clean}`;
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: input.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [ogImage],
    },
  };
}

export function buildPairMeta(input: PairMetaInput): Metadata {
  const year = input.year || new Date().getFullYear();
  const seed = input.variantSeed || input.path;
  const A = input.signA;
  const B = input.signB;

  const title = pickVariant(
    [
      `${A} & ${B} Compatibility (${year}) - Score, Strengths & Advice`,
      `${A} + ${B} Compatibility (${year}): Meaning, Challenges & Next Steps`,
      `Are ${A} and ${B} Compatible? (${year}) Score + Relationship Tips`,
      `${A} & ${B} Love Match (${year}) - Strengths, Weak Spots & What To Do`,
    ],
    `${seed}:pair:title`,
  );

  const description = pickVariant(
    [
      `Learn what the ${A}-${B} compatibility score means, key strengths, common challenges, and practical next steps.`,
      `Discover ${A} and ${B} compatibility: score meaning, communication tips, long-term outlook, and clear next steps.`,
      `Explore strengths, challenges, and advice for ${A} and ${B}, plus what to do together when the score feels low.`,
      `${A} and ${B} insights with meaning, strengths, pressure points, and useful next steps for better communication.`,
    ],
    `${seed}:pair:description`,
  );

  return buildByKind({
    kind: "pair",
    title,
    description,
    path: input.path,
    ogImage: `/og?tool=zodiac&score=82&label=${encodeURIComponent(`${A} & ${B}`)}`,
  });
}

export function buildToolMeta(input: ToolMetaInput): Metadata {
  const year = input.year || new Date().getFullYear();
  const seed = input.variantSeed || input.path;
  const keyword = input.primaryKeyword;

  const title = pickVariant(
    [
      `${keyword} (${year}) - Score Meaning, Advice & Next Steps`,
      `${keyword}: Meaning, Strengths & Practical Next Steps (${year})`,
      `${keyword} Guide (${year}) - What Your Score Means`,
      `${keyword} - Relationship Insights, Challenges & Advice (${year})`,
    ],
    `${seed}:tool:title`,
  );

  const description = pickVariant(
    [
      `Check ${keyword} for score meaning, strengths, communication guidance, and next steps you can try today.`,
      `Understand your ${keyword} result with clear meaning, challenge signals, advice, and long-term communication tips.`,
      `${keyword} explained: score meaning, strengths, common challenges, and practical next steps for better conversations.`,
      `Use ${keyword} as a starting point, then follow advice and next steps to improve communication and long-term fit.`,
    ],
    `${seed}:tool:description`,
  );

  return buildByKind({
    kind: "tool",
    title,
    description,
    path: input.path,
    ogImage: `/og?tool=compatibility&score=88&label=${encodeURIComponent(keyword)}`,
  });
}

export function buildHubMeta(input: HubMetaInput): Metadata {
  const year = input.year || new Date().getFullYear();
  const seed = input.variantSeed || input.path;
  const keyword = input.primaryKeyword;

  const title = pickVariant(
    [
      `${keyword} (${year}) - Meaning, Insights & Best Next Steps`,
      `${keyword}: Compare Strengths, Challenges & Advice (${year})`,
      `${keyword} Hub (${year}) - Score Meaning and What To Try Next`,
      `${keyword} Guide (${year}) - Insights, Communication & Next Steps`,
    ],
    `${seed}:hub:title`,
  );

  const description = pickVariant(
    [
      `Browse ${keyword} insights with score meaning, strengths, challenges, and next steps to choose your best path.`,
      `${keyword} hub with practical meaning, communication advice, long-term perspective, and clear next steps.`,
      `Compare pages by meaning, strengths, communication patterns, and advice so each next step feels clear.`,
      `${keyword} explained with challenge signals, strengths, and next steps for better relationship conversations.`,
    ],
    `${seed}:hub:description`,
  );

  return buildByKind({
    kind: "hub",
    title,
    description,
    path: input.path,
    ogImage: `/og?tool=compatibility&score=85&label=${encodeURIComponent(keyword)}`,
  });
}

export function buildGuideMeta(input: GuideMetaInput): Metadata {
  const year = input.year || new Date().getFullYear();
  const seed = input.variantSeed || input.path;
  const keyword = input.primaryKeyword;

  const title = pickVariant(
    [
      `${keyword} (${year}) - Meaning, Ranges & Advice`,
      `${keyword}: Score Meaning, Challenges & Next Steps (${year})`,
      `${keyword} Guide (${year}) - Strengths, Communication, Next Steps`,
      `What ${keyword} Means (${year}) - Insights and Practical Advice`,
    ],
    `${seed}:guide:title`,
  );

  const description = pickVariant(
    [
      `Learn ${keyword} meaning, key strengths, common challenges, and practical advice with clear next steps.`,
      `${keyword} explained in plain language: score meaning, communication guidance, long-term outlook, and next steps.`,
      `Explore ${keyword} insights with strengths, challenges, and advice so your next relationship steps feel actionable.`,
      `Get a clearer read on ${keyword} with meaning, communication tips, and practical next steps for day-to-day progress.`,
    ],
    `${seed}:guide:description`,
  );

  return buildByKind({
    kind: "guide",
    title,
    description,
    path: input.path,
    ogImage: `/og?tool=compatibility&score=83&label=${encodeURIComponent(keyword)}`,
    type: "article",
  });
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
    return new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  return parsed.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
