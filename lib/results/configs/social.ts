import { makeCategories, makeConfig, makeFaq } from "@/lib/results/configs/shared";
import type { ResultConfig } from "@/lib/results/types";

const baseSocial = makeConfig({
  testKey: "crush",
  displayName: "Crush Calculator",
  badgeLabel: "Fun Spiral",
  catchphrases: ["Cute chaos", "Heart flutter", "Keep it cool"],
  categories: makeCategories([
    { key: "spark", label: "Spark" },
    { key: "comfort", label: "Comfort" },
    { key: "clarity", label: "Clarity" },
    { key: "momentum", label: "Momentum" },
  ]),
  storyLow: [
    "{{a}} and {{b}} look intriguing, but the signal is mixed.",
    "At {{score}}, this feels more curious than stable right now.",
    "{{topLabel}} is the clearest place to improve quickly.",
    "Focus on directness over guessing games.",
    "Keep it light, not stressful.",
  ],
  storyMid: [
    "{{a}} and {{b}} have playful potential with decent balance.",
    "A {{score}} suggests this can grow with clear moves.",
    "{{topLabel}} is where your momentum lives.",
    "Gentle honesty will do more than overthinking.",
    "Fun with real upside.",
  ],
  storyHigh: [
    "{{a}} and {{b}} have obvious spark and easy social flow.",
    "At {{score}}, the attraction signal is strong and friendly.",
    "{{topLabel}} gives this pairing real lift.",
    "Keep it natural and consistent.",
    "Cute, clear, and promising.",
  ],
  strengthsPool: ["Strong playful energy", "Easy conversational spark", "Comfort grows quickly", "Mutual curiosity is visible", "Momentum feels natural"],
  watchoutsPool: ["Mixed signals from delays", "Overthinking small details", "Reading too much into silence", "Fast pace can overwhelm", "Unclear expectations"],
  tipsPool: ["Send one clear message", "Keep plans simple", "Ask directly, kindly", "Do not stack assumptions", "Keep your own pace"],
  dateIdeasPool: [
    "Do a short coffee date with one bold question.",
    "Try a mini arcade challenge.",
    "Swap favorite songs and explain one choice.",
    "Take a sunset walk and keep it easy.",
    "Pick a dessert spot and rate the top three.",
    "Try a bookstore scavenger challenge.",
    "Play one round of quick-fire questions.",
    "Do a tiny photo walk in your neighborhood.",
  ],
  conversationPool: [
    "What made you smile first about us?",
    "What kind of date feels easy for you?",
    "Where do we overthink the vibe?",
    "What keeps things comfortable for you?",
    "What's one thing you'd like to try together?",
    "What signals do you appreciate most?",
    "How do you like to handle awkward moments?",
    "What tone feels most natural between us?",
    "What should we keep simple this week?",
    "What feels surprisingly good already?",
  ],
  faqPool: makeFaq("crush"),
});

export const crushConfig = baseSocial;

export const friendshipConfig: ResultConfig = {
  ...baseSocial,
  testKey: "friendship",
  displayName: "Friendship Compatibility",
  badgeLabel: "Bestie Meter",
  catchphrases: ["Team energy", "Solid banter", "Friend mode strong"],
};
