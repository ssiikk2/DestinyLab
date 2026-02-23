import { appEnv } from "@/lib/env";
import type { GenerateTextOptions } from "@/lib/ai/provider";

export async function generateWithGemini(
  prompt: string,
  options: GenerateTextOptions = {},
): Promise<string> {
  if (!appEnv.geminiApiKey) {
    throw new Error("[gemini] Missing GEMINI_API_KEY configuration.");
  }

  const model = appEnv.aiMode === "draft" ? "gemini-1.5-flash" : "gemini-1.5-pro";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${appEnv.geminiApiKey}`;

  const systemPrompt = options.json
    ? "Return ONLY valid JSON. No markdown."
    : "Be concise and avoid legal or medical guarantees.";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\n${prompt}` }],
        },
      ],
      generationConfig: {
        temperature: options.temperature ?? (appEnv.aiMode === "draft" ? 0.7 : 0.4),
        maxOutputTokens: options.maxTokens ?? 1200,
      },
    }),
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(
      `[gemini] Request failed (HTTP ${response.status}). ${detail}`,
    );
  }

  const json = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  const content = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!content) {
    throw new Error("[gemini] Empty response content.");
  }

  return content;
}
