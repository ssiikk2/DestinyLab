import { parseOrThrowJson } from "@/lib/ai/parse";
import { generateWithActiveProvider } from "@/providers";

export async function requestStructuredJson<T>(prompt: string): Promise<T | null> {
  try {
    const { provider, text } = await generateWithActiveProvider(prompt, { json: true });
    return parseOrThrowJson<T>(text, provider);
  } catch (error) {
    console.error(error);
    return null;
  }
}
