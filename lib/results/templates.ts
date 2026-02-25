import { deterministicShuffle } from "@/lib/results/seed";
import type { ResultConfig, ResultFaqItem } from "@/lib/results/types";

export type ScoreBand = "low" | "mid" | "high";

export function scoreBand(score: number): ScoreBand {
  if (score >= 75) {
    return "high";
  }
  if (score >= 55) {
    return "mid";
  }
  return "low";
}

function fill(
  line: string,
  input: { a: string; b: string; score: number; topLabel: string },
): string {
  return line
    .replaceAll("{{a}}", input.a)
    .replaceAll("{{b}}", input.b)
    .replaceAll("{{score}}", String(input.score))
    .replaceAll("{{topLabel}}", input.topLabel);
}

export function pickStory(
  config: ResultConfig,
  band: ScoreBand,
  seed: number,
  input: { a: string; b: string; score: number; topLabel: string },
): string[] {
  return deterministicShuffle(config.storyTemplates[band], seed)
    .slice(0, 5)
    .map((line) => fill(line, input));
}

export function pickAdvice(pool: string[], seed: number, count = 3): string[] {
  return deterministicShuffle(pool, seed).slice(0, count);
}

export function pickFaq(
  config: ResultConfig,
  baseFaq: ResultFaqItem[] | undefined,
  seed: number,
): ResultFaqItem[] {
  const base = (baseFaq || []).filter((item) => item.question && item.answer);
  const shuffled = deterministicShuffle(config.faqPool, seed + 111);
  const merged = [...base];
  for (const item of shuffled) {
    if (merged.find((entry) => entry.question.toLowerCase() === item.question.toLowerCase())) {
      continue;
    }
    merged.push(item);
    if (merged.length >= 12) {
      break;
    }
  }
  return merged.slice(0, 12);
}
