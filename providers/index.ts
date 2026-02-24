import type { GenerateTextOptions, ProviderName } from "@/lib/ai/provider";
import { generateWithAzureOpenAI } from "@/providers/azure-openai";

export function getActiveProviderName(): ProviderName {
  return "azure-openai";
}

export async function generateWithActiveProvider(
  prompt: string,
  options: GenerateTextOptions = {},
): Promise<{ provider: ProviderName; text: string }> {
  const text = await generateWithAzureOpenAI(prompt, options);
  return { provider: "azure-openai", text };
}
