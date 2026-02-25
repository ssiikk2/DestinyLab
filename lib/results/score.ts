import { seededInt } from "@/lib/results/seed";
import type { BreakdownCategoryConfig, BreakdownItem } from "@/lib/results/types";

function bandNote(score: number, category: BreakdownCategoryConfig): string {
  if (score >= 75) {
    return category.highNote;
  }
  if (score >= 55) {
    return category.midNote;
  }
  return category.lowNote;
}

export function normalizeScore(baseScore: number | undefined, seed: number): number {
  if (typeof baseScore === "number" && Number.isFinite(baseScore)) {
    return Math.max(0, Math.min(100, Math.trunc(baseScore)));
  }

  return seededInt(seed, 42, 88, 9);
}

export function buildBreakdown(
  categories: BreakdownCategoryConfig[],
  overallScore: number,
  seed: number,
): BreakdownItem[] {
  const totalWeight = categories.reduce((sum, item) => sum + item.weight, 0);
  return categories.map((category, index) => {
    const weightedCenter = overallScore * (category.weight / totalWeight) + overallScore * 0.55;
    const jitter = seededInt(seed, -12, 12, index + 30);
    const raw = Math.round(weightedCenter + jitter);
    const score = Math.max(0, Math.min(100, raw));

    return {
      key: category.key,
      label: category.label,
      score,
      note: bandNote(score, category),
    };
  });
}
