import { requestStructuredJson } from "@/lib/ai-client";
import {
  buildCompatibilityFallback,
  buildDestinyFallback,
} from "@/lib/reading-generator";
import {
  getCachedCalculatorValue,
  setCachedCalculatorValue,
} from "@/lib/server/calculator-cache";
import type {
  CompatibilityReading,
  CompatibilitySectionKey,
  DestinyReading,
  DestinySectionKey,
} from "@/lib/types";

const compatibilitySections: CompatibilitySectionKey[] = [
  "emotional",
  "communication",
  "long-term",
  "conflict",
  "advice",
];

const destinySections: DestinySectionKey[] = [
  "personality-core",
  "love-style",
  "money-pattern",
  "career-strength",
  "hidden-talent",
  "weakness",
];

const COMPATIBILITY_PROMPT_TEMPLATE = `Generate compact JSON only.
Schema keys:
kind, score, title, summary, sections(emotional, communication, long-term, conflict, advice), highlights[3], dos[3], donts[3], birthDateA, birthDateB.
Rules:
- kind must be "compatibility".
- score integer 0-100.
- title exactly "Compatibility result".
- summary max 16 words.
- each section max 2 short sentences.
- highlights/dos/donts: short action lines.
- practical tone only; no mystical terms; no medical/legal/financial advice.
Input: birthDateA="{{birthDateA}}", birthDateB="{{birthDateB}}".`;

const DESTINY_PROMPT_TEMPLATE = `Generate compact JSON only.
Schema keys:
kind, title, summary, sections(personality-core, love-style, money-pattern, career-strength, hidden-talent, weakness), highlights[3], dos[3], donts[3], birthDate.
Rules:
- kind must be "destiny".
- title exactly "Destiny result".
- summary max 16 words.
- each section max 2 short sentences.
- highlights/dos/donts: short action lines.
- practical tone only; no mystical terms; no medical/legal/financial advice.
Input: birthDate="{{birthDate}}".`;

function fillPrompt(template: string, data: Record<string, string>): string {
  return Object.entries(data).reduce(
    (result, [key, value]) => result.replaceAll(`{{${key}}}`, value),
    template,
  );
}

function isValidCompatibility(value: unknown): value is CompatibilityReading {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as CompatibilityReading;
  return (
    item.kind === "compatibility" &&
    typeof item.score === "number" &&
    item.score >= 0 &&
    item.score <= 100 &&
    typeof item.title === "string" &&
    typeof item.summary === "string" &&
    compatibilitySections.every((key) => typeof item.sections?.[key] === "string") &&
    Array.isArray(item.highlights) &&
    Array.isArray(item.dos) &&
    Array.isArray(item.donts) &&
    typeof item.birthDateA === "string" &&
    typeof item.birthDateB === "string"
  );
}

function isValidDestiny(value: unknown): value is DestinyReading {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as DestinyReading;
  return (
    item.kind === "destiny" &&
    typeof item.title === "string" &&
    typeof item.summary === "string" &&
    destinySections.every((key) => typeof item.sections?.[key] === "string") &&
    Array.isArray(item.highlights) &&
    Array.isArray(item.dos) &&
    Array.isArray(item.donts) &&
    typeof item.birthDate === "string"
  );
}

export async function createCompatibilityReading(
  birthDateA: string,
  birthDateB: string,
): Promise<CompatibilityReading> {
  const cached = await getCachedCalculatorValue<CompatibilityReading>({
    person1: birthDateA,
    person2: birthDateB,
    calculatorType: "compatibility",
  });

  if (cached && isValidCompatibility(cached)) {
    return cached;
  }

  const prompt = fillPrompt(COMPATIBILITY_PROMPT_TEMPLATE, {
    birthDateA,
    birthDateB,
  });

  const aiResult = await requestStructuredJson<CompatibilityReading>(prompt);

  if (aiResult && isValidCompatibility(aiResult)) {
    await setCachedCalculatorValue(
      {
        person1: birthDateA,
        person2: birthDateB,
        calculatorType: "compatibility",
      },
      aiResult,
    );
    return aiResult;
  }

  const fallback = buildCompatibilityFallback(birthDateA, birthDateB);
  await setCachedCalculatorValue(
    {
      person1: birthDateA,
      person2: birthDateB,
      calculatorType: "compatibility",
    },
    fallback,
  );
  return fallback;
}

export async function createDestinyReading(
  birthDate: string,
): Promise<DestinyReading> {
  const cached = await getCachedCalculatorValue<DestinyReading>({
    person1: birthDate,
    person2: "",
    calculatorType: "destiny",
  });

  if (cached && isValidDestiny(cached)) {
    return cached;
  }

  const prompt = fillPrompt(DESTINY_PROMPT_TEMPLATE, {
    birthDate,
  });

  const aiResult = await requestStructuredJson<DestinyReading>(prompt);

  if (aiResult && isValidDestiny(aiResult)) {
    await setCachedCalculatorValue(
      {
        person1: birthDate,
        person2: "",
        calculatorType: "destiny",
      },
      aiResult,
    );
    return aiResult;
  }

  const fallback = buildDestinyFallback(birthDate);
  await setCachedCalculatorValue(
    {
      person1: birthDate,
      person2: "",
      calculatorType: "destiny",
    },
    fallback,
  );
  return fallback;
}
