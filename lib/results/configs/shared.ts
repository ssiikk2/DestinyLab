import type { BreakdownCategoryConfig, ResultConfig, ResultFaqItem, ResultTestKey } from "@/lib/results/types";

export function makeFaq(prefix: string): ResultFaqItem[] {
  return [
    { question: `What does this ${prefix} score actually mean?`, answer: "Treat it like a snapshot of your current vibe, not a final verdict." },
    { question: "Can this change over time?", answer: "Yes. Small shifts in communication and timing can change how this feels." },
    { question: "Why do we get mixed signals sometimes?", answer: "Most mixed reads happen when mood and routine are moving in different directions." },
    { question: "Should we take this literally?", answer: "Use it as a playful mirror. Keep real conversations at the center." },
    { question: "How often should we check again?", answer: "Once every few weeks is enough, or after a big change." },
    { question: "What if we disagree with the result?", answer: "Great. Compare notes and see which part each of you felt most strongly." },
    { question: "Can this help with conflict?", answer: "It can help you name tension faster, which makes repair talks easier." },
    { question: "Is a high score always perfect?", answer: "Not always. Strong chemistry still needs consistency." },
    { question: "Is a low score hopeless?", answer: "No. Low scores usually highlight where attention is needed." },
    { question: "What should we do right after this?", answer: "Pick one tiny action and test it this week." },
    { question: "Can this be just for fun?", answer: "Absolutely. Fun is a valid reason to run it." },
    { question: "Does this replace professional support?", answer: "No. This is for reflection and entertainment." },
  ];
}

export function makeCategories(labels: Array<{ key: string; label: string }>): BreakdownCategoryConfig[] {
  return labels.map((item, index) => ({
    key: item.key,
    label: item.label,
    weight: index % 2 === 0 ? 1.1 : 0.9,
    lowNote: `${item.label} feels a little shaky right now.`,
    midNote: `${item.label} looks promising with a little care.`,
    highNote: `${item.label} is clearly one of your strengths.`,
  }));
}

export function makeConfig(input: {
  testKey: ResultTestKey;
  displayName: string;
  badgeLabel: string;
  catchphrases: [string, string, string];
  categories: BreakdownCategoryConfig[];
  storyLow: string[];
  storyMid: string[];
  storyHigh: string[];
  strengthsPool: string[];
  watchoutsPool: string[];
  tipsPool: string[];
  dateIdeasPool: string[];
  conversationPool: string[];
  faqPool: ResultFaqItem[];
}): ResultConfig {
  return {
    testKey: input.testKey,
    displayName: input.displayName,
    badgeLabel: input.badgeLabel,
    catchphrases: input.catchphrases,
    categories: input.categories,
    storyTemplates: {
      low: input.storyLow,
      mid: input.storyMid,
      high: input.storyHigh,
    },
    strengthsPool: input.strengthsPool,
    watchoutsPool: input.watchoutsPool,
    tipsPool: input.tipsPool,
    dateIdeasPool: input.dateIdeasPool,
    conversationPool: input.conversationPool,
    faqPool: input.faqPool,
  };
}
