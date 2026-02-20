import { appEnv } from "@/lib/env";

export async function generateWithOpenAI(prompt: string): Promise<string | null> {
  if (!appEnv.openAiApiKey) {
    return null;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${appEnv.openAiApiKey}`,
    },
    body: JSON.stringify({
      model: appEnv.aiMode === "draft" ? "gpt-4o-mini" : "gpt-4.1-mini",
      temperature: appEnv.aiMode === "draft" ? 0.6 : 0.4,
      messages: [
        {
          role: "system",
          content:
            "Return only valid JSON. Keep output concise and avoid legal or medical guarantees.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    return null;
  }

  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return json.choices?.[0]?.message?.content?.trim() || null;
}