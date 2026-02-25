import { makeCategories, makeConfig, makeFaq } from "@/lib/results/configs/shared";
import type { ResultConfig } from "@/lib/results/types";

export const nameConfig = makeConfig({
  testKey: "name",
  displayName: "Name Compatibility",
  badgeLabel: "Flirty Nerd",
  catchphrases: ["Letter chemistry", "Nerdy spark", "Cute logic"],
  categories: makeCategories([
    { key: "nameRhythm", label: "Name Rhythm" },
    { key: "firstImpression", label: "First Impression" },
    { key: "playfulness", label: "Playfulness" },
    { key: "conversationFlow", label: "Conversation Flow" },
  ]),
  storyLow: [
    "{{a}} and {{b}} feel like a mismatched beat on first pass.",
    "With {{score}}, the charm is there but rhythm may need work.",
    "{{topLabel}} is the area to pay attention to first.",
    "Try clearer cues and less mind-reading.",
    "This one can still be fun with better pacing.",
  ],
  storyMid: [
    "{{a}} and {{b}} have a nice mix of ease and curiosity.",
    "At {{score}}, the vibe works when communication stays light but clear.",
    "{{topLabel}} gives the pair real momentum.",
    "Small acts of consistency make this score feel stronger fast.",
    "A playful, workable middle with upside.",
  ],
  storyHigh: [
    "{{a}} and {{b}} click with that smooth first-minute vibe.",
    "A {{score}} here usually means easy banter and clean chemistry.",
    "{{topLabel}} looks especially strong for this duo.",
    "Keep it light, honest, and specific.",
    "This pair reads as naturally magnetic.",
  ],
  strengthsPool: ["Playful banter lands well", "Easy first impressions", "Curiosity stays high", "Low-friction chat flow", "Natural social energy"],
  watchoutsPool: ["Teasing can go too far", "Mixed signals under stress", "Overthinking tiny details", "Avoiding direct asks", "Quick assumptions"],
  tipsPool: ["Ask one simple direct question", "Use clear, kind wording", "Keep jokes supportive", "Confirm what you meant", "Do one tiny follow-through"],
  dateIdeasPool: [
    "Trade name nicknames and rate each one.",
    "Pick a letter and find three words for each other.",
    "Do a quick personality quiz and compare answers.",
    "Create two mini playlists based on your names.",
    "Pick a cafe by alphabetical order challenge.",
    "Write a one-line compliment starting with the same letter.",
    "Try a word-game date with a timer.",
    "Swap voice notes with one bold question.",
  ],
  conversationPool: [
    "What first drew you to me?",
    "Which part of our vibe feels easiest?",
    "Where do we misread each other?",
    "What compliment lands best with you?",
    "What should we say more often?",
    "What small habit would make us smoother?",
    "Where do we overcomplicate things?",
    "What's one thing you want more of this week?",
    "Which conversation are we avoiding?",
    "What makes our chats feel fun?",
  ],
  faqPool: makeFaq("name"),
});

export const initialsConfig: ResultConfig = {
  ...nameConfig,
  testKey: "initials",
  displayName: "Initials Love Test",
  badgeLabel: "Quick Flirt",
  catchphrases: ["Tiny but spicy", "Fast smile", "Initial spark"],
};
