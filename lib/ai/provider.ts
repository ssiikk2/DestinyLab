export type ProviderName = "azure-openai" | "openai" | "gemini";

export interface GenerateTextOptions {
  json?: boolean;
  temperature?: number;
  maxTokens?: number;
}
