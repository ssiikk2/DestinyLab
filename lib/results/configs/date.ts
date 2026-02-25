import { makeCategories, makeConfig, makeFaq } from "@/lib/results/configs/shared";
import type { ResultConfig } from "@/lib/results/types";

const sharedDateConfig = makeConfig({
  testKey: "birthday",
  displayName: "Birth-Date Compatibility",
  badgeLabel: "Calm Reader",
  catchphrases: ["Quiet clarity", "Steady rhythm", "Grounded read"],
  categories: makeCategories([
    { key: "timingFit", label: "Timing Fit" },
    { key: "dailyFlow", label: "Daily Flow" },
    { key: "emotionalLoad", label: "Emotional Load" },
    { key: "futurePacing", label: "Future Pacing" },
    { key: "repairSpeed", label: "Repair Speed" },
  ]),
  storyLow: [
    "{{a}} and {{b}} may feel out of sync on timing right now.",
    "A {{score}} suggests routines are pulling in different directions.",
    "{{topLabel}} is where this pair can recover fastest.",
    "Use simpler schedules and clearer expectations this week.",
    "Slow, steady fixes work best here.",
  ],
  storyMid: [
    "{{a}} and {{b}} have a workable rhythm with a few rough edges.",
    "At {{score}}, this pair benefits from predictable check-ins.",
    "{{topLabel}} gives you something solid to build on.",
    "When plans are explicit, tension drops quickly.",
    "This can become very stable.",
  ],
  storyHigh: [
    "{{a}} and {{b}} look naturally aligned in pace and tone.",
    "A {{score}} here usually means daily rhythm is already in a good place.",
    "{{topLabel}} stands out as a real strength.",
    "Protect your current habits and avoid over-tuning.",
    "Calm, strong, and sustainable.",
  ],
  strengthsPool: ["Daily rhythm feels manageable", "Planning tone stays practical", "Emotional timing is readable", "You recover faster than average", "Consistency is possible here"],
  watchoutsPool: ["Schedules can drift apart", "Emotional fatigue builds quietly", "Hard topics get postponed", "Mismatch in decision pace", "Routine changes cause tension"],
  tipsPool: ["Set one weekly sync check", "Name deadlines early", "Clarify plans in writing", "Keep conflict scope small", "Close talks with one decision"],
  dateIdeasPool: [
    "Plan a quiet coffee date with one honest check-in.",
    "Take a planning walk and map next week together.",
    "Do a low-key home date and cook something simple.",
    "Try a bookstore date and pick one shared read.",
    "Set a mini budget date and plan one treat.",
    "Build a shared calendar ritual for fun plans.",
    "Do a sunset walk and swap one appreciation each.",
    "Run a no-screen dinner and simple recap chat.",
  ],
  conversationPool: [
    "Where does our timing feel smoothest?",
    "What drains our energy faster than expected?",
    "Which weekly routine helps us most?",
    "Where do we need clearer planning?",
    "What should we simplify this week?",
    "How do we want conflict talks to end?",
    "What helps you feel steady with me?",
    "What routine should we protect no matter what?",
    "Where are we rushing too much?",
    "What's one realistic goal for this month?",
  ],
  faqPool: makeFaq("birth-date"),
});

export const birthdayConfig = sharedDateConfig;

export const destinyConfig: ResultConfig = {
  ...sharedDateConfig,
  testKey: "destiny",
  displayName: "Destiny Reading",
  badgeLabel: "Fortune Calm",
  catchphrases: ["Quiet insight", "Personal mirror", "Soft clarity"],
};

export const compatibilityConfig: ResultConfig = {
  ...sharedDateConfig,
  testKey: "compatibility",
  displayName: "Compatibility Reading",
  badgeLabel: "Classic Pair",
  catchphrases: ["Balanced view", "Clear signal", "Useful snapshot"],
};
