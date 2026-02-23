import { createHash } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, resolve } from "path";
import { appEnv } from "@/lib/env";

export type AzureModelTier = "gpt-5-mini" | "gpt-5-nano";

export interface UsageStats {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AzureGenerationResult {
  text: string;
  model: AzureModelTier;
  endpointUsed: string;
  usage: UsageStats;
  cached: boolean;
}

interface AzureGenerateOptions {
  prompt: string;
  systemPrompt?: string;
  model: AzureModelTier;
  maxOutputTokens?: number;
  temperature?: number;
  jsonMode?: boolean;
  cacheNamespace?: string;
  forceRefresh?: boolean;
}

interface CacheRecord {
  text: string;
  model: AzureModelTier;
  endpointUsed: string;
  usage: UsageStats;
  createdAt: string;
}

const HARD_MAX_OUTPUT_TOKENS = 2200;
const HARD_MAX_INPUT_CHARS = 16000;
const MAX_RETRIES_PER_ENDPOINT = 3;
const BASE_BACKOFF_MS = 400;
const DEFAULT_TEMPERATURE = 0.2;

function ensureServerOnly() {
  if (typeof window !== "undefined") {
    throw new Error("azure-openai-multi-region is server-only.");
  }
}

function sanitizeEndpoint(endpoint: string): string {
  return endpoint.replace(/\/+$/, "");
}

function ensureConfig() {
  const primary = appEnv.azureOpenAiPrimaryEndpoint?.trim();
  const secondary = appEnv.azureOpenAiSecondaryEndpoint?.trim();
  const key = appEnv.azureOpenAiApiKey?.trim();
  const deployment = appEnv.azureOpenAiDeploymentName?.trim();

  if (!primary) {
    throw new Error("Missing AZURE_OPENAI_PRIMARY_ENDPOINT.");
  }

  if (!key) {
    throw new Error("Missing AZURE_OPENAI_API_KEY.");
  }

  if (!deployment) {
    throw new Error("Missing AZURE_OPENAI_DEPLOYMENT_NAME.");
  }

  return {
    primary: sanitizeEndpoint(primary),
    secondary: secondary ? sanitizeEndpoint(secondary) : undefined,
    key,
    deployment,
    nanoDeployment: appEnv.azureOpenAiNanoDeploymentName?.trim(),
    apiVersion: appEnv.azureOpenAiApiVersion,
  };
}

function deploymentByModel(model: AzureModelTier, defaultDeployment: string, nanoDeployment?: string): string {
  if (model === "gpt-5-nano" && nanoDeployment) {
    return nanoDeployment;
  }

  return defaultDeployment;
}

function clampMaxTokens(requested?: number): number {
  if (!requested) {
    return 1200;
  }

  return Math.max(200, Math.min(requested, HARD_MAX_OUTPUT_TOKENS));
}

function trimPrompt(prompt: string): string {
  if (prompt.length <= HARD_MAX_INPUT_CHARS) {
    return prompt;
  }

  return prompt.slice(0, HARD_MAX_INPUT_CHARS);
}

function makeCachePath(namespace: string, hash: string): string {
  return resolve(process.cwd(), "content", ".cache", namespace, `${hash}.json`);
}

function makeCacheKey(input: {
  prompt: string;
  systemPrompt: string;
  model: AzureModelTier;
  maxOutputTokens: number;
  temperature: number;
  jsonMode: boolean;
}): string {
  const digest = createHash("sha256");
  digest.update(JSON.stringify(input));
  return digest.digest("hex");
}

async function readCache(path: string): Promise<CacheRecord | null> {
  try {
    const raw = await readFile(path, "utf-8");
    return JSON.parse(raw) as CacheRecord;
  } catch {
    return null;
  }
}

async function writeCache(path: string, record: CacheRecord): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(record, null, 2), "utf-8");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
}

function isCapacityOrRateLimit(status: number, detail: string): boolean {
  if (status === 429) {
    return true;
  }

  return /capacity|rate limit|too many requests|throttle/i.test(detail);
}

async function requestCompletion(input: {
  endpoint: string;
  key: string;
  apiVersion: string;
  deployment: string;
  prompt: string;
  systemPrompt: string;
  maxOutputTokens: number;
  temperature: number;
  jsonMode: boolean;
}): Promise<AzureGenerationResult> {
  const url = `${input.endpoint}/openai/deployments/${input.deployment}/chat/completions?api-version=${input.apiVersion}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": input.key,
    },
    body: JSON.stringify({
      temperature: input.temperature,
      max_tokens: input.maxOutputTokens,
      messages: [
        { role: "system", content: input.systemPrompt },
        { role: "user", content: input.prompt },
      ],
      response_format: input.jsonMode ? { type: "json_object" } : undefined,
    }),
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 400);
    const error = new Error(`HTTP ${response.status}: ${detail}`) as Error & {
      status?: number;
      detail?: string;
      isCapacity?: boolean;
    };

    error.status = response.status;
    error.detail = detail;
    error.isCapacity = isCapacityOrRateLimit(response.status, detail);

    throw error;
  }

  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
    };
  };

  const text = json.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error("Azure OpenAI returned empty content.");
  }

  return {
    text,
    model: "gpt-5-mini",
    endpointUsed: input.endpoint,
    usage: {
      promptTokens: json.usage?.prompt_tokens ?? 0,
      completionTokens: json.usage?.completion_tokens ?? 0,
      totalTokens: json.usage?.total_tokens ?? 0,
    },
    cached: false,
  };
}

async function tryEndpointWithRetry(input: {
  endpoint: string;
  key: string;
  apiVersion: string;
  deployment: string;
  prompt: string;
  systemPrompt: string;
  maxOutputTokens: number;
  temperature: number;
  jsonMode: boolean;
  model: AzureModelTier;
}): Promise<AzureGenerationResult> {
  let attempt = 0;
  let lastError: unknown;

  while (attempt < MAX_RETRIES_PER_ENDPOINT) {
    try {
      const result = await requestCompletion({
        endpoint: input.endpoint,
        key: input.key,
        apiVersion: input.apiVersion,
        deployment: input.deployment,
        prompt: input.prompt,
        systemPrompt: input.systemPrompt,
        maxOutputTokens: input.maxOutputTokens,
        temperature: input.temperature,
        jsonMode: input.jsonMode,
      });

      return { ...result, model: input.model };
    } catch (error) {
      lastError = error;
      const status = (error as { status?: number })?.status;
      const detail = (error as { detail?: string })?.detail ?? "";
      const isCapacity = (error as { isCapacity?: boolean })?.isCapacity ?? false;
      const isRetryable = isCapacity || (typeof status === "number" && status >= 500);

      if (!isRetryable || attempt === MAX_RETRIES_PER_ENDPOINT - 1) {
        throw error;
      }

      const waitMs = BASE_BACKOFF_MS * 2 ** attempt;
      await sleep(waitMs);

      // Keep this around to preserve context for fallback decisions.
      if (isCapacity && /capacity|rate limit|throttle|too many requests/i.test(detail)) {
        attempt += 1;
        continue;
      }

      attempt += 1;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Retry loop exhausted.");
}

export async function generateTextWithAzureMultiRegion(options: AzureGenerateOptions): Promise<AzureGenerationResult> {
  ensureServerOnly();

  const config = ensureConfig();
  const deployment = deploymentByModel(options.model, config.deployment, config.nanoDeployment);
  const maxOutputTokens = clampMaxTokens(options.maxOutputTokens);
  const prompt = trimPrompt(options.prompt);
  const temperature = options.temperature ?? DEFAULT_TEMPERATURE;
  const systemPrompt = (options.systemPrompt || "Return clear, concise output.").slice(0, 500);
  const cacheNamespace = options.cacheNamespace || "seo";
  const jsonMode = options.jsonMode ?? false;

  const cacheKey = makeCacheKey({
    prompt,
    systemPrompt,
    model: options.model,
    maxOutputTokens,
    temperature,
    jsonMode,
  });
  const cachePath = makeCachePath(cacheNamespace, cacheKey);

  if (!options.forceRefresh) {
    const cached = await readCache(cachePath);

    if (cached) {
      return {
        text: cached.text,
        model: cached.model,
        endpointUsed: cached.endpointUsed,
        usage: cached.usage,
        cached: true,
      };
    }
  }

  try {
    const primary = await tryEndpointWithRetry({
      endpoint: config.primary,
      key: config.key,
      apiVersion: config.apiVersion,
      deployment,
      prompt,
      systemPrompt,
      maxOutputTokens,
      temperature,
      jsonMode,
      model: options.model,
    });

    await writeCache(cachePath, {
      text: primary.text,
      model: primary.model,
      endpointUsed: primary.endpointUsed,
      usage: primary.usage,
      createdAt: new Date().toISOString(),
    });

    return primary;
  } catch (primaryError) {
    const shouldFallback =
      Boolean(config.secondary) &&
      ((primaryError as { status?: number })?.status === 429 ||
        Boolean((primaryError as { isCapacity?: boolean })?.isCapacity));

    if (!shouldFallback || !config.secondary) {
      throw primaryError;
    }

    const secondary = await tryEndpointWithRetry({
      endpoint: config.secondary,
      key: config.key,
      apiVersion: config.apiVersion,
      deployment,
      prompt,
      systemPrompt,
      maxOutputTokens,
      temperature,
      jsonMode,
      model: options.model,
    });

    await writeCache(cachePath, {
      text: secondary.text,
      model: secondary.model,
      endpointUsed: secondary.endpointUsed,
      usage: secondary.usage,
      createdAt: new Date().toISOString(),
    });

    return secondary;
  }
}

