import { parseOrThrowJson } from "@/lib/ai/parse";
import { buildResultBasePrompt } from "@/lib/ai/prompts/result-base-prompt";
import { resolveResultStyleKey } from "@/lib/ai/prompts/result-style-map";
import { getResultStylePrompt } from "@/lib/ai/prompts/result-style-prompts";
import type { CalculatorMode } from "@/lib/test-themes";
import { generateWithAzureOpenAI } from "@/providers/azure-openai";

export interface GeneratedFaq {
  question: string;
  answer: string;
}

export interface GeneratedTryAlsoItem {
  href: string;
  note: string;
}

export interface GeneratedResultPayload {
  score: number;
  title: string;
  summary: string;
  strengths: string[];
  watchouts: string[];
  tips: string[];
  faq: GeneratedFaq[];
  tryAlso: GeneratedTryAlsoItem[];
}

const MODE_TRY_ALSO: Record<CalculatorMode, string[]> = {
  love: ["/zodiac-compatibility", "/name-compatibility", "/couple-test"],
  zodiac: ["/calculator", "/birthday-compatibility", "/true-love-test"],
  name: ["/calculator", "/initials-love-test", "/zodiac-compatibility"],
  destiny: ["/calculator", "/true-love-test", "/couple-test"],
  birthday: ["/zodiac-compatibility", "/calculator", "/name-compatibility"],
  crush: ["/love-percentage", "/name-compatibility", "/true-love-test"],
  initials: ["/name-compatibility", "/calculator", "/crush-calculator"],
  friendship: ["/calculator", "/destiny", "/zodiac-compatibility"],
};

interface AiResultSchema {
  score: number;
  title: string;
  summary: string;
  strengths: string[];
  watchouts: string[];
  tips: string[];
  faq: GeneratedFaq[];
  tryAlsoNotes: string[];
}

function normalizeMojibake(value: string): string {
  return value
    .replace(/â/g, "'")
    .replace(/â/g, "'")
    .replace(/â/g, '"')
    .replace(/â/g, '"')
    .replace(/â/g, "-")
    .replace(/â/g, "-")
    .replace(/Ã©/g, "e")
    .replace(/Ã¨/g, "e")
    .replace(/Ã¡/g, "a")
    .replace(/Ã¶/g, "o")
    .replace(/Ã¼/g, "u")
    .replace(/\uFFFD/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasFixedLengthStringArray(value: unknown, length: number): value is string[] {
  return Array.isArray(value) && value.length === length && value.every((item) => isNonEmptyString(item));
}

function isValidFaqArray(value: unknown, length: number): value is GeneratedFaq[] {
  return (
    Array.isArray(value) &&
    value.length === length &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        isNonEmptyString((item as GeneratedFaq).question) &&
        isNonEmptyString((item as GeneratedFaq).answer),
    )
  );
}

function validateAiPayload(value: unknown): value is AiResultSchema {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as AiResultSchema;
  return (
    typeof payload.score === "number" &&
    Number.isFinite(payload.score) &&
    payload.score >= 0 &&
    payload.score <= 100 &&
    isNonEmptyString(payload.title) &&
    isNonEmptyString(payload.summary) &&
    hasFixedLengthStringArray(payload.strengths, 3) &&
    hasFixedLengthStringArray(payload.watchouts, 3) &&
    hasFixedLengthStringArray(payload.tips, 3) &&
    isValidFaqArray(payload.faq, 5) &&
    hasFixedLengthStringArray(payload.tryAlsoNotes, 3)
  );
}

function normalizeInput(value: string): string {
  return value.trim().slice(0, 120);
}

function buildResultPrompt(input: {
  mode: CalculatorMode;
  first: string;
  second: string;
  variantKey?: string;
  tryAlsoTargets: string[];
}): string {
  const styleKey = resolveResultStyleKey({ mode: input.mode, variantKey: input.variantKey });
  const stylePrompt = getResultStylePrompt(styleKey);
  const basePrompt = buildResultBasePrompt();
  const secondText = input.second || "reflection";

  return `Return JSON only.
${basePrompt}
${stylePrompt}

JSON schema:
{
  "score": number,
  "title": string,
  "summary": string,
  "strengths": [string, string, string],
  "watchouts": [string, string, string],
  "tips": [string, string, string],
  "faq": [{"question": string, "answer": string}, {"question": string, "answer": string}, {"question": string, "answer": string}, {"question": string, "answer": string}, {"question": string, "answer": string}],
  "tryAlsoNotes": [string, string, string]
}

Rules:
- score must be an integer from 0 to 100.
- title should be short and distinct.
- summary should be exactly one sentence.
- strengths/watchouts/tips must each have exactly 3 short lines.
- faq must contain exactly 5 Q&A items with varied question tones.
- Do not reuse the same opening phrase across list items.
- tryAlsoNotes must have 3 short notes in the same order as tryAlsoTargets.

Input:
mode="${input.mode}"
variantKey="${input.variantKey || input.mode}"
first="${input.first}"
second="${secondText}"
tryAlsoTargets="${input.tryAlsoTargets.join(", ")}"`;
}

export async function createUnifiedResult(input: {
  mode: CalculatorMode;
  first: string;
  second: string;
  variantKey?: string;
}): Promise<GeneratedResultPayload> {
  const mode = input.mode;
  const first = normalizeInput(input.first);
  const second = normalizeInput(input.second);
  const tryAlsoTargets = MODE_TRY_ALSO[mode];

  const prompt = buildResultPrompt({
    mode,
    first,
    second,
    variantKey: input.variantKey,
    tryAlsoTargets,
  });

  const raw = await generateWithAzureOpenAI(prompt, {
    json: true,
    temperature: 0.82,
    maxTokens: 900,
  });
  const parsed = parseOrThrowJson<AiResultSchema>(raw, "azure-openai");

  if (!validateAiPayload(parsed)) {
    throw new Error("[calculate] Invalid response schema from model.");
  }

  return {
    score: Math.trunc(parsed.score),
    title: normalizeMojibake(parsed.title),
    summary: normalizeMojibake(parsed.summary),
    strengths: parsed.strengths.map((item) => normalizeMojibake(item)),
    watchouts: parsed.watchouts.map((item) => normalizeMojibake(item)),
    tips: parsed.tips.map((item) => normalizeMojibake(item)),
    faq: parsed.faq.map((item) => ({
      question: normalizeMojibake(item.question),
      answer: normalizeMojibake(item.answer),
    })),
    tryAlso: tryAlsoTargets.map((href, index) => ({
      href,
      note: normalizeMojibake(parsed.tryAlsoNotes[index]),
    })),
  };
}
