import type { SeoFaq } from "@/content/seo-data";
import { parseOrThrowJson } from "@/lib/ai/parse";
import { appEnv } from "@/lib/env";
import { getCachedCalculatorValue, setCachedCalculatorValue } from "@/lib/server/calculator-cache";
import type { CalculatorMode } from "@/lib/test-themes";
import { generateWithAzureOpenAI } from "@/providers/azure-openai";

export interface ToolPageRichContent {
  concept: string[];
  scoreInterpretation: string[];
  practicalTips: string[];
  nextSteps: string[];
  faqs: SeoFaq[];
  disclaimer: string;
}

interface ToolGuideAiSchema {
  concept: string[];
  scoreInterpretation: string[];
  practicalTips: string[];
  nextSteps: string[];
  faqs: SeoFaq[];
  disclaimer: string;
}

function isShortString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= 260;
}

function isParagraphArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.length === 2 && value.every((item) => isShortString(item));
}

function isValidFaqArray(value: unknown): value is SeoFaq[] {
  return (
    Array.isArray(value) &&
    value.length === 5 &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        isShortString((item as SeoFaq).question) &&
        isShortString((item as SeoFaq).answer),
    )
  );
}

function isValidToolGuide(value: unknown): value is ToolGuideAiSchema {
  if (!value || typeof value !== "object") {
    return false;
  }

  const content = value as ToolGuideAiSchema;
  return (
    isParagraphArray(content.concept) &&
    isParagraphArray(content.scoreInterpretation) &&
    isParagraphArray(content.practicalTips) &&
    isParagraphArray(content.nextSteps) &&
    isValidFaqArray(content.faqs) &&
    isShortString(content.disclaimer)
  );
}

function buildPrompt(input: { mode: CalculatorMode; h1: string; keyword: string; styleSeed: number }) {
  return `Return JSON only.
Write user-facing copy in natural, playful, human English.
Do not use these words: SEO, optimization, long-tail, indexing, crawler, traffic, marketing, conversion, funnel, strategy, monetize, revenue.
No robotic phrasing. Vary sentence rhythm.
Keep content fun and curiosity-first.

Schema:
{
  "concept": [string, string],
  "scoreInterpretation": [string, string],
  "practicalTips": [string, string],
  "nextSteps": [string, string],
  "faqs": [
    {"question": string, "answer": string},
    {"question": string, "answer": string},
    {"question": string, "answer": string},
    {"question": string, "answer": string},
    {"question": string, "answer": string}
  ],
  "disclaimer": string
}

Rules:
- exactly 2 lines per section array
- each line under 260 characters
- FAQ questions should vary in tone
- disclaimer should be short and clear

Input:
mode="${input.mode}"
pageTitle="${input.h1}"
keyword="${input.keyword}"
styleSeed=${input.styleSeed}`;
}

export async function getToolPageRichContent(input: {
  mode: CalculatorMode;
  path: string;
  h1: string;
  keyword: string;
}): Promise<ToolPageRichContent | null> {
  if (!appEnv.azureOpenAiPrimaryEndpoint || !appEnv.azureOpenAiApiKey) {
    return null;
  }

  const cacheKey = {
    person1: input.path,
    person2: input.h1,
    calculatorType: `tool-guide-${input.mode}`,
  };

  const cached = await getCachedCalculatorValue<ToolPageRichContent>(cacheKey);
  if (cached && isValidToolGuide(cached)) {
    return cached;
  }

  try {
    const prompt = buildPrompt({
      mode: input.mode,
      h1: input.h1,
      keyword: input.keyword,
      styleSeed: Math.floor(Math.random() * 100000),
    });

    const raw = await generateWithAzureOpenAI(prompt, {
      json: true,
      temperature: 0.7,
      maxTokens: 1200,
    });
    const parsed = parseOrThrowJson<ToolGuideAiSchema>(raw, "azure-openai");

    if (!isValidToolGuide(parsed)) {
      throw new Error("[tool-guide] Invalid model response schema.");
    }

    const normalized: ToolPageRichContent = {
      concept: parsed.concept.map((line) => line.trim()),
      scoreInterpretation: parsed.scoreInterpretation.map((line) => line.trim()),
      practicalTips: parsed.practicalTips.map((line) => line.trim()),
      nextSteps: parsed.nextSteps.map((line) => line.trim()),
      faqs: parsed.faqs.map((faq) => ({
        question: faq.question.trim(),
        answer: faq.answer.trim(),
      })),
      disclaimer: parsed.disclaimer.trim(),
    };

    await setCachedCalculatorValue(cacheKey, normalized);
    return normalized;
  } catch (error) {
    console.error("[tool-guide]", error);
    return null;
  }
}
