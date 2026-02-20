import { requestStructuredJson } from "@/lib/ai-client";
import {
  buildCompatibilityFallback,
  buildDestinyFallback,
} from "@/lib/reading-generator";
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
  const prompt = `Create a JSON object for a compatibility reading.
Schema:
{
  "kind": "compatibility",
  "score": number,
  "title": string,
  "summary": string,
  "sections": {
    "emotional": string,
    "communication": string,
    "long-term": string,
    "conflict": string,
    "advice": string
  },
  "highlights": string[3],
  "dos": string[3],
  "donts": string[3],
  "birthDateA": "${birthDateA}",
  "birthDateB": "${birthDateB}"
}
Rules:
- Keep each section practical and concise.
- Use entertainment tone only.
- No medical or legal claims.
- Score must be 0-100.`;

  const aiResult = await requestStructuredJson<CompatibilityReading>(prompt);

  if (aiResult && isValidCompatibility(aiResult)) {
    return aiResult;
  }

  return buildCompatibilityFallback(birthDateA, birthDateB);
}

export async function createDestinyReading(
  birthDate: string,
): Promise<DestinyReading> {
  const prompt = `Create a JSON object for a destiny reading.
Schema:
{
  "kind": "destiny",
  "title": string,
  "summary": string,
  "sections": {
    "personality-core": string,
    "love-style": string,
    "money-pattern": string,
    "career-strength": string,
    "hidden-talent": string,
    "weakness": string
  },
  "highlights": string[3],
  "dos": string[3],
  "donts": string[3],
  "birthDate": "${birthDate}"
}
Rules:
- Keep language engaging but grounded.
- Entertainment only.
- No medical or legal guarantees.`;

  const aiResult = await requestStructuredJson<DestinyReading>(prompt);

  if (aiResult && isValidDestiny(aiResult)) {
    return aiResult;
  }

  return buildDestinyFallback(birthDate);
}