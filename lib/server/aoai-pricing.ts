import type { AoaiUsageEvent } from "@/lib/server/aoai-usage-log";

export interface TokenPrice {
  input: number;
  output: number;
}

export const AOAI_PRICING_MAP: Record<string, TokenPrice> = {
  "gpt-4o-mini": {
    input: 0.15 / 1_000_000,
    output: 0.6 / 1_000_000,
  },
  "gpt-4o": {
    input: 2.5 / 1_000_000,
    output: 10 / 1_000_000,
  },
};

function resolvePriceKey(model: string): keyof typeof AOAI_PRICING_MAP {
  const normalized = model.trim().toLowerCase();

  if (normalized.includes("gpt-4o-mini")) {
    return "gpt-4o-mini";
  }

  return "gpt-4o";
}

export function estimateEventCost(event: AoaiUsageEvent): number {
  if (!event.success) {
    return 0;
  }

  const pricing = AOAI_PRICING_MAP[resolvePriceKey(event.model)];
  const inputCost = (event.promptTokens || 0) * pricing.input;
  const outputCost = (event.completionTokens || 0) * pricing.output;
  return inputCost + outputCost;
}

export function estimateDailyCostFromEvents(events: AoaiUsageEvent[]): number {
  if (events.length === 0) {
    return 0;
  }

  const timestamps = events
    .map((event) => Date.parse(event.timestamp))
    .filter((value) => Number.isFinite(value))
    .sort((a, b) => a - b);

  if (timestamps.length === 0) {
    return 0;
  }

  const totalCost = events.reduce((sum, event) => sum + estimateEventCost(event), 0);
  const daySpan = Math.max(
    1,
    Math.ceil((timestamps[timestamps.length - 1] - timestamps[0]) / (24 * 60 * 60 * 1000)),
  );

  return totalCost / daySpan;
}
