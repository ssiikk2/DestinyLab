import { compatibilityConfig, birthdayConfig, destinyConfig } from "@/lib/results/configs/date";
import { coupleTestConfig, lovePercentageConfig, primaryLoveConfig, trueLoveConfig } from "@/lib/results/configs/love";
import { initialsConfig, nameConfig } from "@/lib/results/configs/name";
import { crushConfig, friendshipConfig } from "@/lib/results/configs/social";
import { zodiacConfig } from "@/lib/results/configs/zodiac";
import type { ResultConfig, ResultTestKey } from "@/lib/results/types";

const CONFIG_MAP: Record<ResultTestKey, ResultConfig> = {
  "primary-love": primaryLoveConfig,
  "love-percentage": lovePercentageConfig,
  "true-love": trueLoveConfig,
  "couple-test": coupleTestConfig,
  zodiac: zodiacConfig,
  name: nameConfig,
  initials: initialsConfig,
  crush: crushConfig,
  friendship: friendshipConfig,
  birthday: birthdayConfig,
  destiny: destinyConfig,
  compatibility: compatibilityConfig,
};

export function getResultConfig(testKey: ResultTestKey): ResultConfig {
  return CONFIG_MAP[testKey];
}
