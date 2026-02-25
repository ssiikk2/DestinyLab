import { parseOrThrowJson } from "@/lib/ai/parse";
import { appEnv } from "@/lib/env";
import { getCachedCalculatorValue, setCachedCalculatorValue } from "@/lib/server/calculator-cache";
import type { CalculatorMode } from "@/lib/test-themes";
import { generateWithAzureOpenAI } from "@/providers/azure-openai";

interface MetadataSchema {
  title: string;
  description: string;
}

function isValidMetadata(value: unknown): value is MetadataSchema {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as MetadataSchema;
  return (
    typeof item.title === "string" &&
    item.title.trim().length > 0 &&
    item.title.trim().length <= 70 &&
    typeof item.description === "string" &&
    item.description.trim().length > 0 &&
    item.description.trim().length <= 160
  );
}

function buildPrompt(input: {
  path: string;
  h1: string;
  mode?: CalculatorMode;
  styleSeed: number;
}): string {
  return `Return JSON only.
Write natural English metadata for a fun relationship test page.
Keep it clear and human, not salesy.
Do not use these words: SEO, optimization, long-tail, indexing, crawler, traffic, marketing, conversion, funnel, strategy, monetize, revenue.

Schema:
{"title": string, "description": string}

Rules:
- title max 70 chars
- description max 160 chars
- avoid repetitive phrasing

Input:
path="${input.path}"
h1="${input.h1}"
mode="${input.mode || "guide"}"
styleSeed=${input.styleSeed}`;
}

export async function getGeneratedLandingMetadata(input: {
  path: string;
  h1: string;
  mode?: CalculatorMode;
}): Promise<MetadataSchema | null> {
  if (!appEnv.azureOpenAiPrimaryEndpoint || !appEnv.azureOpenAiApiKey) {
    return null;
  }

  const cacheKey = {
    person1: input.path,
    person2: input.h1,
    calculatorType: `landing-meta-${input.mode || "guide"}`,
  };

  const cached = await getCachedCalculatorValue<MetadataSchema>(cacheKey);
  if (cached && isValidMetadata(cached)) {
    return {
      title: cached.title.trim(),
      description: cached.description.trim(),
    };
  }

  try {
    const prompt = buildPrompt({
      path: input.path,
      h1: input.h1,
      mode: input.mode,
      styleSeed: Math.floor(Math.random() * 100000),
    });
    const raw = await generateWithAzureOpenAI(prompt, {
      json: true,
      temperature: 0.6,
      maxTokens: 220,
    });
    const parsed = parseOrThrowJson<MetadataSchema>(raw, "azure-openai");

    if (!isValidMetadata(parsed)) {
      throw new Error("[landing-meta] Invalid model response schema.");
    }

    const normalized = {
      title: parsed.title.trim(),
      description: parsed.description.trim(),
    };
    await setCachedCalculatorValue(cacheKey, normalized);
    return normalized;
  } catch (error) {
    console.error("[landing-meta]", error);
    return null;
  }
}
