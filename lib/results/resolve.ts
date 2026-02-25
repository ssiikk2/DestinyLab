import type { CalculatorMode } from "@/lib/test-themes";
import type { ResultTestKey } from "@/lib/results/types";

export function resolveResultTestKey(input: {
  mode: CalculatorMode;
  variantKey?: string;
}): ResultTestKey {
  const variant = input.variantKey || "";
  if (variant === "/love-percentage") return "love-percentage";
  if (variant === "/true-love-test") return "true-love";
  if (variant === "/couple-test") return "couple-test";
  if (variant === "/calculator") return "primary-love";
  if (variant === "/name-compatibility") return "name";
  if (variant === "/initials-love-test") return "initials";
  if (variant === "/crush-calculator") return "crush";
  if (variant === "/friendship-compatibility") return "friendship";
  if (variant === "/zodiac-compatibility") return "zodiac";
  if (variant === "/birthday-compatibility") return "birthday";
  if (variant === "/destiny") return "destiny";

  if (input.mode === "love") return "primary-love";
  if (input.mode === "name") return "name";
  if (input.mode === "initials") return "initials";
  if (input.mode === "crush") return "crush";
  if (input.mode === "friendship") return "friendship";
  if (input.mode === "zodiac") return "zodiac";
  if (input.mode === "birthday") return "birthday";
  if (input.mode === "destiny") return "destiny";

  return "primary-love";
}
