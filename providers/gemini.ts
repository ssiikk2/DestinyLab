import { appEnv } from "@/lib/env";

export async function generateWithGemini(prompt: string): Promise<string | null> {
  if (!appEnv.geminiApiKey) {
    return null;
  }

  const model = appEnv.aiMode === "draft" ? "gemini-1.5-flash" : "gemini-1.5-pro";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${appEnv.geminiApiKey}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: `${prompt}\n\nReturn only valid JSON.` }],
        },
      ],
      generationConfig: {
        temperature: appEnv.aiMode === "draft" ? 0.7 : 0.4,
      },
    }),
  });

  if (!response.ok) {
    return null;
  }

  const json = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
}