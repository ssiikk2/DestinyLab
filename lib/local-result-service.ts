import { getResultConfig } from "@/lib/results/configs";
import { resolveResultTestKey } from "@/lib/results/resolve";
import { buildSeed, deterministicShuffle, seededInt } from "@/lib/results/seed";
import type { CalculatorMode } from "@/lib/test-themes";
import type { GeneratedResultPayload } from "@/lib/unified-result-service";

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

export function createLocalResult(input: {
  mode: CalculatorMode;
  first: string;
  second: string;
  variantKey?: string;
}): GeneratedResultPayload {
  const testKey = resolveResultTestKey({ mode: input.mode, variantKey: input.variantKey });
  const config = getResultConfig(testKey);
  const seed = buildSeed([testKey, input.first, input.second, input.variantKey]);
  const score = seededInt(seed + 7, 28, 98);
  const strengths = deterministicShuffle(config.strengthsPool, seed + 21).slice(0, 3);
  const watchouts = deterministicShuffle(config.watchoutsPool, seed + 31).slice(0, 3);
  const tips = deterministicShuffle(config.tipsPool, seed + 41).slice(0, 3);
  const faq = deterministicShuffle(config.faqPool, seed + 51).slice(0, 5);
  const tryAlsoTargets = MODE_TRY_ALSO[input.mode] || ["/tests", "/calculator", "/blog"];

  const titlePrefix = input.second ? `${input.first} + ${input.second}` : input.first;
  const bandLabel =
    score >= 90 ? "high-voltage" : score >= 70 ? "strong" : score >= 50 ? "mixed" : score >= 30 ? "tricky" : "chaotic";
  const summary = `A ${score}/100 snapshot with ${bandLabel} energy. Focus on communication timing and one practical next step this week.`;

  return {
    score,
    title: `${titlePrefix} ${config.displayName}`.trim(),
    summary,
    strengths,
    watchouts,
    tips,
    faq,
    tryAlso: tryAlsoTargets.slice(0, 3).map((href, index) => ({
      href,
      note: deterministicShuffle(
        [
          "Check this angle for a sharper meaning read.",
          "Use this test to compare communication patterns.",
          "Run this one next for a different vibe check.",
          "Good contrast test after this score.",
        ],
        seed + 61 + index,
      )[0],
    })),
  };
}
