import { appendFile, mkdir, readFile } from "fs/promises";
import { tmpdir } from "os";
import { dirname, resolve } from "path";

export interface AoaiUsageEvent {
  timestamp: string;
  source: "provider-azure-openai" | "multi-region-azure-openai";
  endpoint: string;
  deployment: string;
  model: string;
  apiVersion: string;
  maxTokens: number;
  temperature: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  success: boolean;
  statusCode?: number;
  errorMessage?: string;
  cached?: boolean;
  nanoMode?: boolean;
}

export interface AoaiUsageSummary {
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  avgInputTokensPerCall: number;
  avgOutputTokensPerCall: number;
  avgTotalTokensPerCall: number;
  avgMaxTokens: number;
  avgTemperature: number;
  models: string[];
}

const USAGE_LOG_PATH = resolve(
  process.env.AOAI_USAGE_LOG_DIR || tmpdir(),
  "destinylab",
  "aoai-usage-events.jsonl",
);

function round(value: number): number {
  return Math.round(value * 10000) / 10000;
}

export async function appendAoaiUsageEvent(event: AoaiUsageEvent): Promise<void> {
  await mkdir(dirname(USAGE_LOG_PATH), { recursive: true });
  await appendFile(
    USAGE_LOG_PATH,
    `${JSON.stringify({
      ...event,
      input_tokens: event.promptTokens,
      output_tokens: event.completionTokens,
      total_tokens: event.totalTokens,
    })}\n`,
    "utf-8",
  );
}

export async function readAoaiUsageEvents(options?: {
  sinceIso?: string;
  untilIso?: string;
}): Promise<AoaiUsageEvent[]> {
  let raw = "";

  try {
    raw = await readFile(USAGE_LOG_PATH, "utf-8");
  } catch {
    return [];
  }

  const sinceMs = options?.sinceIso ? Date.parse(options.sinceIso) : Number.NEGATIVE_INFINITY;
  const untilMs = options?.untilIso ? Date.parse(options.untilIso) : Number.POSITIVE_INFINITY;
  const events: AoaiUsageEvent[] = [];

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();

    if (!trimmed) {
      continue;
    }

    try {
      const item = JSON.parse(trimmed) as AoaiUsageEvent;
      const ts = Date.parse(item.timestamp);

      if (!Number.isFinite(ts)) {
        continue;
      }

      if (ts < sinceMs || ts > untilMs) {
        continue;
      }

      events.push(item);
    } catch {
      continue;
    }
  }

  return events;
}

export function summarizeAoaiUsage(events: AoaiUsageEvent[]): AoaiUsageSummary {
  const successful = events.filter((event) => event.success);
  const failed = events.length - successful.length;

  const inputTokens = successful.reduce((sum, event) => sum + (event.promptTokens || 0), 0);
  const outputTokens = successful.reduce((sum, event) => sum + (event.completionTokens || 0), 0);
  const totalTokens = successful.reduce((sum, event) => sum + (event.totalTokens || 0), 0);
  const successfulCalls = successful.length;
  const averageDivisor = successfulCalls > 0 ? successfulCalls : 1;

  const maxTokenSum = successful.reduce((sum, event) => sum + (event.maxTokens || 0), 0);
  const tempSum = successful.reduce((sum, event) => sum + (event.temperature || 0), 0);

  return {
    totalCalls: events.length,
    successfulCalls,
    failedCalls: failed,
    inputTokens,
    outputTokens,
    totalTokens,
    avgInputTokensPerCall: round(inputTokens / averageDivisor),
    avgOutputTokensPerCall: round(outputTokens / averageDivisor),
    avgTotalTokensPerCall: round(totalTokens / averageDivisor),
    avgMaxTokens: round(maxTokenSum / averageDivisor),
    avgTemperature: round(tempSum / averageDivisor),
    models: Array.from(new Set(successful.map((event) => event.model))).sort(),
  };
}
