import { parseOrThrowJson } from "@/lib/ai/parse";
import { appEnv } from "@/lib/env";
import { getCachedCalculatorValue, setCachedCalculatorValue } from "@/lib/server/calculator-cache";
import type { CalculatorMode } from "@/lib/test-themes";
import { generateWithAzureOpenAI } from "@/providers/azure-openai";

export interface GeneratedLandingFaq {
  question: string;
  answer: string;
}

export interface GeneratedLandingSection {
  heading: string;
  paragraphs: string[];
}

export interface GeneratedLandingCopy {
  intro: string;
  cardDescription: string;
  ctaLabel: string;
  sections: GeneratedLandingSection[];
  faqs: GeneratedLandingFaq[];
}

interface LandingCopySchema {
  intro: string;
  cardDescription: string;
  ctaLabel: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
  faqs: GeneratedLandingFaq[];
}

function isShortString(value: unknown, max = 260): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= max;
}

function isValidSections(value: unknown): value is GeneratedLandingSection[] {
  return (
    Array.isArray(value) &&
    value.length === 3 &&
    value.every(
      (section) =>
        section &&
        typeof section === "object" &&
        isShortString((section as GeneratedLandingSection).heading, 70) &&
        Array.isArray((section as GeneratedLandingSection).paragraphs) &&
        (section as GeneratedLandingSection).paragraphs.length === 2 &&
        (section as GeneratedLandingSection).paragraphs.every((line) => isShortString(line)),
    )
  );
}

function isValidFaqs(value: unknown): value is GeneratedLandingFaq[] {
  return (
    Array.isArray(value) &&
    value.length === 5 &&
    value.every(
      (faq) =>
        faq &&
        typeof faq === "object" &&
        isShortString((faq as GeneratedLandingFaq).question, 110) &&
        isShortString((faq as GeneratedLandingFaq).answer),
    )
  );
}

function isValidLandingCopy(value: unknown): value is LandingCopySchema {
  if (!value || typeof value !== "object") {
    return false;
  }

  const copy = value as LandingCopySchema;
  return (
    isShortString(copy.intro, 320) &&
    isShortString(copy.cardDescription, 170) &&
    isShortString(copy.ctaLabel, 40) &&
    isValidSections(copy.sections) &&
    isValidFaqs(copy.faqs)
  );
}

function buildPrompt(input: {
  mode: CalculatorMode;
  path: string;
  h1: string;
  styleSeed: number;
}): string {
  return `Return JSON only.
Write natural, playful English for a fun relationship test page.
No robotic phrasing. Vary sentence rhythm.
Do not use these words: SEO, optimization, long-tail, indexing, crawler, traffic, marketing, conversion, funnel, strategy, monetize, revenue.

Schema:
{
  "intro": string,
  "cardDescription": string,
  "ctaLabel": string,
  "sections": [
    {"heading": string, "paragraphs": [string, string]},
    {"heading": string, "paragraphs": [string, string]},
    {"heading": string, "paragraphs": [string, string]}
  ],
  "faqs": [
    {"question": string, "answer": string},
    {"question": string, "answer": string},
    {"question": string, "answer": string},
    {"question": string, "answer": string},
    {"question": string, "answer": string}
  ]
}

Rules:
- intro: one short paragraph, under 320 chars
- cardDescription: one line, under 170 chars
- ctaLabel: short button text
- sections: exactly 3
- each section has exactly 2 short paragraphs
- faqs: exactly 5 with varied question tone

Input:
mode="${input.mode}"
path="${input.path}"
title="${input.h1}"
styleSeed=${input.styleSeed}`;
}

export async function getGeneratedLandingCopy(input: {
  mode: CalculatorMode;
  path: string;
  h1: string;
}): Promise<GeneratedLandingCopy | null> {
  if (!appEnv.azureOpenAiPrimaryEndpoint || !appEnv.azureOpenAiApiKey) {
    return null;
  }

  const cacheKey = {
    person1: input.path,
    person2: input.h1,
    calculatorType: `landing-copy-${input.mode}`,
  };

  const cached = await getCachedCalculatorValue<GeneratedLandingCopy>(cacheKey);
  if (cached && isValidLandingCopy(cached)) {
    return cached;
  }

  try {
    const prompt = buildPrompt({
      mode: input.mode,
      path: input.path,
      h1: input.h1,
      styleSeed: Math.floor(Math.random() * 100000),
    });

    const raw = await generateWithAzureOpenAI(prompt, {
      json: true,
      temperature: 0.7,
      maxTokens: 1300,
    });
    const parsed = parseOrThrowJson<LandingCopySchema>(raw, "azure-openai");

    if (!isValidLandingCopy(parsed)) {
      throw new Error("[landing-copy] Invalid model response schema.");
    }

    const normalized: GeneratedLandingCopy = {
      intro: parsed.intro.trim(),
      cardDescription: parsed.cardDescription.trim(),
      ctaLabel: parsed.ctaLabel.trim(),
      sections: parsed.sections.map((section) => ({
        heading: section.heading.trim(),
        paragraphs: section.paragraphs.map((line) => line.trim()),
      })),
      faqs: parsed.faqs.map((faq) => ({
        question: faq.question.trim(),
        answer: faq.answer.trim(),
      })),
    };

    await setCachedCalculatorValue(cacheKey, normalized);
    return normalized;
  } catch (error) {
    console.error("[landing-copy]", error);
    return null;
  }
}
