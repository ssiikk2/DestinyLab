import { makeCategories, makeConfig, makeFaq } from "@/lib/results/configs/shared";
import type { ResultConfig } from "@/lib/results/types";

const baseDateIdeas = [
  "Swap playlists and explain one song choice each.",
  "Take a slow evening walk with phones away.",
  "Pick a snack challenge and rate it together.",
  "Cook one simple dish as a two-person team.",
  "Recreate your first favorite conversation topic.",
  "Write tiny notes and trade them over coffee.",
  "Take a bookstore lap and choose one page to read aloud.",
  "Try a 20-minute sunset chat with one honest question.",
];

const baseConvos = [
  "What made you feel most seen this week?",
  "Where do we feel easiest right now?",
  "What tiny habit would make next week smoother?",
  "What do we do really well under stress?",
  "Where do we rush each other without noticing?",
  "What's one thing we should laugh about more?",
  "What kind of support felt best lately?",
  "What should we stop overthinking together?",
  "Where are we strongest as a team?",
  "What conversation are we postponing?",
];

export const primaryLoveConfig = makeConfig({
  testKey: "primary-love",
  displayName: "Primary Love Compatibility Tool",
  badgeLabel: "Matchmaker",
  catchphrases: ["Steady spark", "Warm momentum", "Story worth keeping"],
  categories: makeCategories([
    { key: "chemistry", label: "Chemistry" },
    { key: "timing", label: "Timing" },
    { key: "communication", label: "Communication" },
    { key: "trust", label: "Trust" },
    { key: "followthrough", label: "Follow-through" },
  ]),
  storyLow: [
    "{{a}} and {{b}} have interesting energy, but the rhythm feels uneven.",
    "The score sits at {{score}}, which suggests friction in day-to-day timing.",
    "The biggest clue is {{topLabel}}: when it misses, small moments feel louder.",
    "This can improve fast if both people reduce assumptions and ask directly.",
    "Think reset, not drama. One clear habit can shift the whole mood.",
  ],
  storyMid: [
    "{{a}} and {{b}} show real potential with room to polish the edges.",
    "At {{score}}, this pair works best when communication stays clean and short.",
    "{{topLabel}} looks promising, and that gives the relationship a stable center.",
    "A little structure around hard talks can unlock much smoother days.",
    "This is the kind of match that grows with consistency.",
  ],
  storyHigh: [
    "{{a}} and {{b}} feel naturally synced in the moments that matter.",
    "A {{score}} read usually means the baseline connection is strong.",
    "{{topLabel}} stands out as a reliable advantage for this pair.",
    "Protect what already works, then tune the smaller friction points.",
    "This is warm, fun, and very workable long-term.",
  ],
  strengthsPool: ["Easy emotional timing", "Mutual curiosity stays alive", "Repair talks happen quickly", "Shared humor feels natural", "Strong everyday teamwork"],
  watchoutsPool: ["Mood assumptions creep in", "Hard talks may get delayed", "Text tone gets overread", "Pace mismatch on busy days", "Small issues can stack"],
  tipsPool: ["Name one need clearly", "Schedule a short reset chat", "Use one sentence at a time", "Appreciate effort in real time", "Pause before reacting"],
  dateIdeasPool: baseDateIdeas,
  conversationPool: baseConvos,
  faqPool: makeFaq("love"),
});

export const lovePercentageConfig: ResultConfig = {
  ...primaryLoveConfig,
  testKey: "love-percentage",
  displayName: "Love Percentage",
  badgeLabel: "Chaos Button",
  catchphrases: ["Quick spark", "Fast pulse", "Fun snapshot"],
};

export const trueLoveConfig: ResultConfig = {
  ...primaryLoveConfig,
  testKey: "true-love",
  displayName: "True Love Test",
  badgeLabel: "Late-Night Check",
  catchphrases: ["Honest signal", "Quiet depth", "Real feelings mode"],
};

export const coupleTestConfig: ResultConfig = {
  ...primaryLoveConfig,
  testKey: "couple-test",
  displayName: "Couple Test",
  badgeLabel: "Game Night",
  catchphrases: ["Two-player mode", "Team vibe", "Playful challenge"],
};
