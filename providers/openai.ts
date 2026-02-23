import { appEnv } from "@/lib/env";
import type { GenerateTextOptions } from "@/lib/ai/provider";
import { fetchWithRetry } from "@/lib/ai/retry";

const DEFAULT_TEMPERATURE = 0.6;
const DEFAULT_MAX_TOKENS = 1200;

export async function generateWithOpenAI(
  prompt: string,
  options: GenerateTextOptions = {},
): Promise<string> {
  if (!appEnv.openAiApiKey) {
    throw new Error("[openai] Missing OPENAI_API_KEY configuration.");
  }

  const response = await fetchWithRetry(
    () =>
      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appEnv.openAiApiKey}`,
        },
        body: JSON.stringify({
          model: appEnv.aiMode === "draft" ? "gpt-4o-mini" : "gpt-4.1-mini",
          temperature:
            options.temperature ?? appEnv.openAiTemperature ?? DEFAULT_TEMPERATURE,
          max_tokens: options.maxTokens ?? appEnv.openAiMaxTokens ?? DEFAULT_MAX_TOKENS,
          messages: [
            {
              role: "system",
              content: options.json
                ? "Return ONLY valid JSON. No markdown."
                : "Be concise and avoid legal or medical guarantees.",
            },
            { role: "user", content: prompt },
          ],
        }),
      }),
    2,
  );

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(
      `[openai] Request failed (HTTP ${response.status}). ${detail}`,
    );
  }

  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = json.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("[openai] Empty response content.");
  }

  return content;
}
