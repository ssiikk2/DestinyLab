import { appEnv } from "@/lib/env";
import type { GenerateTextOptions } from "@/lib/ai/provider";
import { fetchWithRetry } from "@/lib/ai/retry";

const DEFAULT_API_VERSION = "2024-10-21";
const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_TOKENS = 1200;

function getAzureConfig() {
  const endpoint = appEnv.azureOpenAiEndpoint?.trim();
  const apiKey = appEnv.azureOpenAiApiKey?.trim();
  const deployment = appEnv.azureOpenAiDeployment?.trim();

  if (!endpoint) {
    throw new Error(
      "[azure-openai] Missing AZURE_OPENAI_ENDPOINT configuration.",
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
  const maxTokens =
    options.maxTokens ?? appEnv.azureOpenAiMaxTokens ?? DEFAULT_MAX_TOKENS;

  const systemContent = options.json
    ? "Return ONLY valid JSON. No markdown."
    : "Be concise and avoid medical, legal, or financial guarantees.";

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
          max_tokens: maxTokens,
        }),
      }),
    2,
  );

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(
      `[azure-openai] Request failed (HTTP ${response.status}). ${detail}`,
    );
  }

  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = json.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("[azure-openai] Empty response content.");
  }

  return content;
}
