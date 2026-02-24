import { appEnv } from "@/lib/env";
import type { GenerateTextOptions } from "@/lib/ai/provider";
import { fetchWithRetry } from "@/lib/ai/retry";
import { appendAoaiUsageEvent } from "@/lib/server/aoai-usage-log";

const DEFAULT_API_VERSION = "2024-10-21";
const DEFAULT_TEMPERATURE = 0.35;
const DEFAULT_MAX_OUTPUT_TOKENS = 560;
const HARD_MAX_OUTPUT_TOKENS = 600;

function clampOutputTokens(value: number | undefined): number {
  if (!value || !Number.isFinite(value)) {
    return DEFAULT_MAX_OUTPUT_TOKENS;
  }

  return Math.max(200, Math.min(Math.trunc(value), HARD_MAX_OUTPUT_TOKENS));
}

function resolveDeployment(): string {
  const standard = appEnv.azureOpenAiDeployment?.trim() || "gpt-4o-mini";
  const nano = appEnv.azureOpenAiNanoDeployment?.trim();

  if (!appEnv.useNano) {
    return standard;
  }

  if (nano) {
    return nano;
  }

  if (standard.toLowerCase().includes("nano")) {
    return standard;
  }

  throw new Error(
    "[azure-openai] USE_NANO=true requires AZURE_OPENAI_NANO_DEPLOYMENT or a nano deployment in AZURE_OPENAI_DEPLOYMENT.",
  );
}

function getAzureConfig() {
  const endpoint = appEnv.azureOpenAiPrimaryEndpoint?.trim();
  const apiKey = appEnv.azureOpenAiApiKey?.trim();
  const deployment = resolveDeployment();

  if (!endpoint) {
    throw new Error(
      "[azure-openai] Missing AZURE_OPENAI_PRIMARY_ENDPOINT configuration.",
    );
  }

  if (!apiKey) {
    throw new Error(
      "[azure-openai] Missing AZURE_OPENAI_API_KEY configuration.",
    );
  }

  if (!deployment) {
    throw new Error(
      "[azure-openai] Missing AZURE_OPENAI_DEPLOYMENT configuration.",
    );
  }

  return {
    endpoint: endpoint.replace(/\/+$/, ""),
    apiKey,
    deployment,
    apiVersion: appEnv.azureOpenAiApiVersion || DEFAULT_API_VERSION,
  };
}

export async function generateWithAzureOpenAI(
  prompt: string,
  options: GenerateTextOptions = {},
): Promise<string> {
  const { endpoint, apiKey, deployment, apiVersion } = getAzureConfig();

  const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;
  const temperature =
    options.temperature ?? appEnv.azureOpenAiTemperature ?? DEFAULT_TEMPERATURE;
  const maxOutputTokens = clampOutputTokens(
    options.maxTokens ?? appEnv.azureOpenAiMaxTokens,
  );

  const systemContent = options.json
    ? "Return valid JSON only."
    : "Keep the response concise, clear, and practical.";

  console.info(
    `[aoai] deployment=${deployment} useNano=${String(appEnv.useNano)} maxOutputTokens=${maxOutputTokens}`,
  );

  const response = await fetchWithRetry(
    () =>
      fetch(url, {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemContent },
            { role: "user", content: prompt },
          ],
          temperature,
          max_tokens: maxOutputTokens,
        }),
      }),
    2,
  );

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);

    try {
      await appendAoaiUsageEvent({
        timestamp: new Date().toISOString(),
        source: "provider-azure-openai",
        endpoint,
        deployment,
        model: deployment,
        apiVersion,
        maxTokens: maxOutputTokens,
        temperature,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        success: false,
        statusCode: response.status,
        errorMessage: detail,
        nanoMode: appEnv.useNano,
      });
    } catch {
      // Best-effort logging only.
    }

    throw new Error(
      `[azure-openai] Request failed (HTTP ${response.status}). ${detail}`,
    );
  }

  const json = (await response.json()) as {
    model?: string;
    choices?: Array<{ message?: { content?: string } }>;
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
    };
  };

  const content = json.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("[azure-openai] Empty response content.");
  }

  try {
    await appendAoaiUsageEvent({
      timestamp: new Date().toISOString(),
      source: "provider-azure-openai",
      endpoint,
      deployment,
      model: json.model || deployment,
      apiVersion,
      maxTokens: maxOutputTokens,
      temperature,
      promptTokens: json.usage?.prompt_tokens ?? 0,
      completionTokens: json.usage?.completion_tokens ?? 0,
      totalTokens: json.usage?.total_tokens ?? 0,
      success: true,
      nanoMode: appEnv.useNano,
    });
  } catch {
    // Best-effort logging only.
  }

  return content;
}
