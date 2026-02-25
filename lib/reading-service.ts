import { createUnifiedResult } from "@/lib/unified-result-service";
import {
  getCachedCalculatorValue,
  setCachedCalculatorValue,
} from "@/lib/server/calculator-cache";
import type { CompatibilityReading, DestinyReading } from "@/lib/types";

function compactLines(lines: string[], joiner: string): string {
  return lines.map((line) => line.trim()).filter(Boolean).join(joiner);
}

function toCompatibilityReading(
  birthDateA: string,
  birthDateB: string,
  payload: Awaited<ReturnType<typeof createUnifiedResult>>,
): CompatibilityReading {
  return {
    kind: "compatibility",
    score: payload.score,
    title: "Compatibility result",
    summary: payload.summary,
    sections: {
      emotional: compactLines(
        [payload.title, payload.summary, payload.strengths[0], payload.watchouts[0]],
        " ",
      ),
      communication: compactLines(
        [payload.strengths[1], payload.watchouts[1], payload.tips[0]],
        " ",
      ),
      "long-term": compactLines(
        [payload.strengths[2], payload.watchouts[2], payload.tips[1]],
        " ",
      ),
      conflict: compactLines(
        [payload.watchouts[0], payload.watchouts[1], payload.tips[2]],
        " ",
      ),
      advice: compactLines([payload.tips[0], payload.tips[1], payload.tips[2]], " "),
    },
    highlights: [...payload.strengths],
    dos: [...payload.tips],
    donts: [...payload.watchouts],
    birthDateA,
    birthDateB,
  };
}

function toDestinyReading(
  birthDate: string,
  payload: Awaited<ReturnType<typeof createUnifiedResult>>,
): DestinyReading {
  return {
    kind: "destiny",
    title: "Destiny result",
    summary: payload.summary,
    sections: {
      "personality-core": compactLines(
        [payload.title, payload.strengths[0], payload.watchouts[0]],
        " ",
      ),
      "love-style": compactLines([payload.strengths[1], payload.tips[0]], " "),
      "money-pattern": compactLines([payload.watchouts[1], payload.tips[1]], " "),
      "career-strength": compactLines([payload.strengths[2], payload.tips[2]], " "),
      "hidden-talent": compactLines([payload.summary, payload.tips[0]], " "),
      weakness: compactLines([payload.watchouts[2], payload.tips[1]], " "),
    },
    highlights: [...payload.strengths],
    dos: [...payload.tips],
    donts: [...payload.watchouts],
    birthDate,
  };
}

export async function createCompatibilityReading(
  birthDateA: string,
  birthDateB: string,
): Promise<CompatibilityReading> {
  const cacheKey = {
    person1: birthDateA,
    person2: birthDateB,
    calculatorType: "compatibility",
  } as const;

  const cached = await getCachedCalculatorValue<CompatibilityReading>(cacheKey);
  if (cached) {
    return cached;
  }

  const payload = await createUnifiedResult({
    mode: "birthday",
    first: birthDateA,
    second: birthDateB,
    variantKey: "compatibility-legacy",
  });

  const reading = toCompatibilityReading(birthDateA, birthDateB, payload);
  await setCachedCalculatorValue(cacheKey, reading);
  return reading;
}

export async function createDestinyReading(
  birthDate: string,
): Promise<DestinyReading> {
  const cacheKey = {
    person1: birthDate,
    person2: "",
    calculatorType: "destiny",
  } as const;

  const cached = await getCachedCalculatorValue<DestinyReading>(cacheKey);
  if (cached) {
    return cached;
  }

  const payload = await createUnifiedResult({
    mode: "destiny",
    first: birthDate,
    second: "self",
    variantKey: "destiny-legacy",
  });

  const reading = toDestinyReading(birthDate, payload);
  await setCachedCalculatorValue(cacheKey, reading);
  return reading;
}
