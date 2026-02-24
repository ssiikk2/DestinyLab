import { NextResponse } from "next/server";
import { estimateDailyCostFromEvents } from "@/lib/server/aoai-pricing";
import { readAoaiUsageEvents } from "@/lib/server/aoai-usage-log";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function round(value: number): number {
  return Math.round(value * 10000) / 10000;
}

export async function GET() {
  const events = await readAoaiUsageEvents();
  const successful = events.filter((event) => event.success);
  const totalCalls = events.length;
  const totalTokens = successful.reduce((sum, event) => sum + (event.totalTokens || 0), 0);
  const avgTokensPerCall = totalCalls > 0 ? totalTokens / totalCalls : 0;

  const dayBuckets = new Map<string, number>();
  const modelDistribution = new Map<string, number>();
  const nanoTokens: number[] = [];
  const standardTokens: number[] = [];

  for (const event of events) {
    const day = event.timestamp.slice(0, 10);
    dayBuckets.set(day, (dayBuckets.get(day) || 0) + 1);
    modelDistribution.set(event.model, (modelDistribution.get(event.model) || 0) + 1);

    if (event.success && event.totalTokens) {
      if (event.nanoMode) {
        nanoTokens.push(event.totalTokens);
      } else {
        standardTokens.push(event.totalTokens);
      }
    }
  }

  const avgPerDay = dayBuckets.size > 0 ? totalCalls / dayBuckets.size : 0;
  const estimatedDailyCost = estimateDailyCostFromEvents(successful);
  const avgNanoTokens =
    nanoTokens.length > 0 ? nanoTokens.reduce((sum, value) => sum + value, 0) / nanoTokens.length : 0;
  const avgStandardTokens =
    standardTokens.length > 0
      ? standardTokens.reduce((sum, value) => sum + value, 0) / standardTokens.length
      : 0;

  return NextResponse.json({
    total_calls: totalCalls,
    avg_tokens_per_call: round(avgTokensPerCall),
    avg_per_day: round(avgPerDay),
    model_distribution: Object.fromEntries(
      Array.from(modelDistribution.entries()).sort((a, b) => a[0].localeCompare(b[0])),
    ),
    estimated_daily_cost: round(estimatedDailyCost),
    nano_performance: {
      avg_tokens_nano_mode: round(avgNanoTokens),
      avg_tokens_standard_mode: round(avgStandardTokens),
    },
  });
}
