import { getResultConfig } from "@/lib/results/configs";
import { buildBreakdown, normalizeScore } from "@/lib/results/score";
import { buildSeed, deterministicShuffle, seededInt } from "@/lib/results/seed";
import { pickAdvice, pickFaq, pickStory, scoreBand } from "@/lib/results/templates";
import type { BaseResultOutput, ResultInput, ResultReportData, ResultTestKey } from "@/lib/results/types";

function gradeLabel(score: number): string {
  if (score >= 85) return "A";
  if (score >= 75) return "B+";
  if (score >= 65) return "B";
  if (score >= 55) return "C+";
  if (score >= 45) return "C";
  return "D";
}

export function buildResultReport(input: {
  testKey: ResultTestKey;
  userInput: ResultInput;
  base?: BaseResultOutput;
}): ResultReportData {
  const config = getResultConfig(input.testKey);
  const seed = buildSeed([input.testKey, input.userInput.primary, input.userInput.secondary]);
  const score = normalizeScore(input.base?.score, seed);
  const breakdown = buildBreakdown(config.categories, score, seed);
  const top = [...breakdown].sort((a, b) => b.score - a.score)[0];
  const band = scoreBand(score);
  const catchphrase = config.catchphrases[band === "high" ? 0 : band === "mid" ? 1 : 2];
  const story = pickStory(
    config,
    band,
    seed + 13,
    {
      a: input.userInput.primary || "You",
      b: input.userInput.secondary || "someone",
      score,
      topLabel: top?.label || "connection",
    },
  );
  const strengths = (input.base?.strengths && input.base.strengths.length >= 3)
    ? input.base.strengths.slice(0, 3)
    : pickAdvice(config.strengthsPool, seed + 41, 3);
  const watchouts = (input.base?.watchouts && input.base.watchouts.length >= 3)
    ? input.base.watchouts.slice(0, 3)
    : pickAdvice(config.watchoutsPool, seed + 51, 3);
  const tips = (input.base?.tips && input.base.tips.length >= 3)
    ? input.base.tips.slice(0, 3)
    : pickAdvice(config.tipsPool, seed + 61, 3);

  const dateIdeas = deterministicShuffle(config.dateIdeasPool, seed + 71).slice(0, 6);
  const conversationStarters = deterministicShuffle(config.conversationPool, seed + 81).slice(0, 8);
  const faq = pickFaq(config, input.base?.faq, seed + 91);

  return {
    testKey: input.testKey,
    input: input.userInput,
    header: {
      score,
      grade: gradeLabel(score),
      badge: config.badgeLabel,
      catchphrase,
      title: input.base?.title || config.displayName,
      summary:
        input.base?.summary ||
        `This ${config.displayName.toLowerCase()} snapshot suggests a ${band} band vibe right now.`,
    },
    breakdown,
    story,
    strengths,
    watchouts,
    tips,
    dateIdeas,
    conversationStarters,
    faq,
  };
}

export function rotateDeterministic<T>(items: T[], seed: number, step: number): T[] {
  if (items.length === 0) return items;
  const offset = seededInt(seed, 0, items.length - 1, step + 3);
  const pivot = (offset + step) % items.length;
  return [...items.slice(pivot), ...items.slice(0, pivot)];
}
