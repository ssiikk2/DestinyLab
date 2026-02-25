export const RESULT_BANNED_WORDS = [
  "SEO",
  "optimization",
  "long-tail",
  "indexing",
  "crawler",
  "traffic",
  "marketing",
  "conversion",
  "funnel",
  "strategy",
  "monetize",
  "revenue",
];

export const RESULT_BANNED_CLICHES = [
  "love is in the air",
  "match made in heaven",
  "written in the stars",
  "opposites attract",
  "soulmate",
];

export function buildResultBasePrompt(): string {
  return [
    "Global writing rules:",
    "- Write natural, playful English like a witty friend.",
    "- Avoid robotic structure and repeated sentence starters.",
    "- Keep each line short and specific.",
    `- Never use these words: ${RESULT_BANNED_WORDS.join(", ")}.`,
    `- Avoid these cliches: ${RESULT_BANNED_CLICHES.join(", ")}.`,
    "- No mystical certainty and no fake authority tone.",
  ].join("\n");
}
