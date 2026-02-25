import type { CalculatorMode } from "@/lib/test-themes";
import type { ResultStyleKey } from "@/lib/ai/prompts/result-style-prompts";

const VARIANT_STYLE_MAP: Record<string, ResultStyleKey> = {
  "/calculator": "primary-love",
  "/love-percentage": "love-percentage",
  "/true-love-test": "true-love",
  "/couple-test": "couple-test",
  "/name-compatibility": "name",
  "/initials-love-test": "initials",
  "/crush-calculator": "crush",
  "/friendship-compatibility": "friendship",
  "/zodiac-compatibility": "zodiac",
  "/birthday-compatibility": "birthday",
  "/destiny": "destiny",
};

const MODE_STYLE_MAP: Record<CalculatorMode, ResultStyleKey> = {
  love: "primary-love",
  name: "name",
  initials: "initials",
  crush: "crush",
  friendship: "friendship",
  zodiac: "zodiac",
  birthday: "birthday",
  destiny: "destiny",
};

export function resolveResultStyleKey(input: {
  mode: CalculatorMode;
  variantKey?: string;
}): ResultStyleKey {
  const normalizedVariant = input.variantKey?.trim();
  if (normalizedVariant && VARIANT_STYLE_MAP[normalizedVariant]) {
    return VARIANT_STYLE_MAP[normalizedVariant];
  }

  return MODE_STYLE_MAP[input.mode];
}
