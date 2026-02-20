import { appEnv } from "@/lib/env";
import { generateWithGemini } from "@/providers/gemini";
import { generateWithOpenAI } from "@/providers/openai";

function stripCodeFence(input: string): string {
  return input
    .replace(/^```json\s*/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();
}

function pickJsonText(input: string): string {
  const stripped = stripCodeFence(input);
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");

  if (start >= 0 && end > start) {
    return stripped.slice(start, end + 1);
  }

  return stripped;
}

export async function requestStructuredJson<T>(prompt: string): Promise<T | null> {
  const raw =
    appEnv.aiProvider === "openai"
      ? await generateWithOpenAI(prompt)
      : await generateWithGemini(prompt);

  if (!raw) {
    return null;
  }

  try {
    const jsonText = pickJsonText(raw);
    return JSON.parse(jsonText) as T;
  } catch {
    return null;
  }
}