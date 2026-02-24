import { parseOrThrowJson } from "@/lib/ai/parse";
import { generateWithAzureOpenAI } from "@/providers/azure-openai";

export async function requestStructuredJson<T>(prompt: string): Promise<T> {
  const text = await generateWithAzureOpenAI(prompt, {
    json: true,
    maxTokens: 560,
  });
  return parseOrThrowJson<T>(text, "azure-openai");
}
