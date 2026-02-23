import type { GenerateTextOptions, ProviderName } from "@/lib/ai/provider";
import { appEnv } from "@/lib/env";
import { generateWithAzureOpenAI } from "@/providers/azure-openai";
import { generateWithGemini } from "@/providers/gemini";
import { generateWithOpenAI } from "@/providers/openai";

export function getActiveProviderName(): ProviderName {
  return appEnv.aiProvider;
}

export async function generateWithActiveProvider(
  prompt: string,
  options: GenerateTextOptions = {},
): Promise<{ provider: ProviderName; text: string }> {
  const provider = getActiveProviderName();

  const text =
    provider === "azure-openai"
      ? await generateWithAzureOpenAI(prompt, options)
      : provider === "openai"
        ? await generateWithOpenAI(prompt, options)
        : await generateWithGemini(prompt, options);

  return { provider, text };
}
