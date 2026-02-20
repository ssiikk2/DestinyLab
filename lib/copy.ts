import type { ReadingData } from "@/lib/types";

const sectionFallbacks: Record<string, string[]> = {
  emotional: [
    "You feel closest when responses are clear and timely.",
    "Mood swings are manageable when check-ins stay short.",
    "Warmth lands best when it is specific, not vague.",
    "Small reassurance beats big speeches.",
  ],
  communication: [
    "Direct wording works better than hints.",
    "Text is fine for logistics, not for conflict.",
    "Timing matters as much as tone.",
    "Clarify intent before reacting.",
  ],
  "long-term": [
    "Shared plans calm uncertainty.",
    "One monthly review keeps momentum.",
    "Consistency matters more than intensity.",
    "Progress is visible when goals are written.",
  ],
  conflict: [
    "Pause before replying when emotions spike.",
    "Solve one issue per conversation.",
    "Repair speed matters more than perfect wording.",
    "Avoid stacking old examples onto new tension.",
  ],
  advice: [
    "Keep requests simple and specific.",
    "Protect each person's space and routine.",
    "Celebrate small wins out loud.",
    "Use weekly resets to avoid drift.",
  ],
  "personality-core": [
    "You do your best work with clear structure.",
    "Momentum grows when priorities stay narrow.",
    "You trust plans more than hype.",
    "Confidence follows completion, not noise.",
  ],
  "love-style": [
    "You show care through consistency.",
    "You prefer honesty over mixed signals.",
    "Clear expectations reduce stress quickly.",
    "Reliability is your love language.",
  ],
  "money-pattern": [
    "Simple systems beat complex budgets.",
    "Automation protects progress.",
    "Impulse fades when rules are written.",
    "Steady habits outperform short bursts.",
  ],
  "career-strength": [
    "You add value through dependable execution.",
    "Pattern spotting is one of your strengths.",
    "You handle pressure best with clear priorities.",
    "Process clarity gives you an edge.",
  ],
  "hidden-talent": [
    "You turn ambiguity into action.",
    "You translate abstract ideas into plans.",
    "You connect details others miss.",
    "You stabilize teams under pressure.",
  ],
  weakness: [
    "Overcommitting can blur your focus.",
    "Boundaries need regular maintenance.",
    "Fatigue can hide as productivity.",
    "Fewer active goals creates better outcomes.",
  ],
};

const tabActions: Record<string, { dos: string[]; donts: string[] }> = {
  emotional: {
    dos: [
      "Name your feeling before the story around it.",
      "Use short check-ins when the day gets heavy.",
      "Ask for reassurance directly.",
    ],
    donts: [
      "Do not test each other with silence.",
      "Do not assume tone from short messages.",
      "Do not delay hard talks for too long.",
    ],
  },
  communication: {
    dos: [
      "Use clear words and one point at a time.",
      "Switch to voice for high-stakes topics.",
      "Confirm what you heard before responding.",
    ],
    donts: [
      "Do not stack several issues in one argument.",
      "Do not use sarcasm when tension is high.",
      "Do not leave key decisions vague.",
    ],
  },
  "long-term": {
    dos: [
      "Set one shared goal for the next 30 days.",
      "Review money and time plans monthly.",
      "Protect one ritual you both value.",
    ],
    donts: [
      "Do not wing every important decision.",
      "Do not ignore mismatched timelines.",
      "Do not confuse intensity with commitment.",
    ],
  },
  conflict: {
    dos: [
      "Take a short pause before replying.",
      "Return to the exact issue at hand.",
      "End with one actionable agreement.",
    ],
    donts: [
      "Do not bring up settled arguments.",
      "Do not debate over text when upset.",
      "Do not chase a winner in a relationship talk.",
    ],
  },
  advice: {
    dos: [
      "Keep expectations visible and simple.",
      "Appreciate effort in real time.",
      "Leave space for independent routines.",
    ],
    donts: [
      "Do not over-analyze every mood shift.",
      "Do not compare your pace with other couples.",
      "Do not hide needs behind hints.",
    ],
  },
  "personality-core": {
    dos: [
      "Plan your week before you start it.",
      "Protect your peak focus window.",
      "Track one metric that matters.",
    ],
    donts: [
      "Do not chase too many goals at once.",
      "Do not mistake motion for progress.",
      "Do not skip your reset routine.",
    ],
  },
  "love-style": {
    dos: [
      "Say what support looks like this week.",
      "Express appreciation with specifics.",
      "Create predictable quality time.",
    ],
    donts: [
      "Do not play guessing games.",
      "Do not avoid direct asks.",
      "Do not leave conflict unresolved for days.",
    ],
  },
  "money-pattern": {
    dos: [
      "Automate savings first.",
      "Use clear spending buckets.",
      "Review subscriptions monthly.",
    ],
    donts: [
      "Do not rely on memory for budgeting.",
      "Do not treat stress shopping as relief.",
      "Do not postpone money talks.",
    ],
  },
  "career-strength": {
    dos: [
      "Build systems for repeat tasks.",
      "Block deep work on your calendar.",
      "Define what done means early.",
    ],
    donts: [
      "Do not overcommit in one sprint.",
      "Do not multitask during focus blocks.",
      "Do not keep unclear priorities.",
    ],
  },
  "hidden-talent": {
    dos: [
      "Write ideas as action steps fast.",
      "Share concise plans with timelines.",
      "Use your pattern-spotting in team reviews.",
    ],
    donts: [
      "Do not undersell your execution skill.",
      "Do not wait for perfect conditions.",
      "Do not bury useful ideas in notes.",
    ],
  },
  weakness: {
    dos: [
      "Limit active priorities.",
      "Use weekly boundary check-ins.",
      "Schedule recovery time.",
    ],
    donts: [
      "Do not fill every free slot with work.",
      "Do not ignore signs of burnout.",
      "Do not delay uncomfortable decisions.",
    ],
  },
};

function splitIntoLines(text: string): string[] {
  return text
    .split(/[.!?]+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .map((line) => `${line}.`);
}

function sharpen(line: string): string {
  const clean = line.replace(/^[-*\s]+/, "").trim();

  if (clean.length <= 110) {
    return clean;
  }

  return `${clean.slice(0, 107).trimEnd()}...`;
}

export function toTabInsights(sectionKey: string, text: string): string[] {
  const lines = splitIntoLines(text)
    .map(sharpen)
    .filter((line, index, arr) => arr.indexOf(line) === index)
    .slice(0, 4);

  if (lines.length >= 4) {
    return lines;
  }

  const fallback = sectionFallbacks[sectionKey] || [
    "Focus on clear expectations.",
    "Keep communication specific.",
    "Review progress weekly.",
    "Adjust fast when friction appears.",
  ];

  return [...lines, ...fallback].slice(0, 4);
}

export function getTabActions(sectionKey: string): { dos: string[]; donts: string[] } {
  return (
    tabActions[sectionKey] || {
      dos: [
        "Keep your requests short and clear.",
        "Review what worked this week.",
        "Stay consistent with one routine.",
      ],
      donts: [
        "Do not assume intent without asking.",
        "Do not overcomplicate simple issues.",
        "Do not ignore recurring friction.",
      ],
    }
  );
}

export function buildResultSummary(reading: ReadingData): string {
  if (reading.kind === "compatibility") {
    if (reading.score >= 85) {
      return "Strong long-term potential. Keep communication clean when pressure rises.";
    }

    if (reading.score >= 72) {
      return "Good overall match. The key is timing and direct conversations.";
    }

    if (reading.score >= 60) {
      return "Mixed fit with real upside. Structure and consistency matter most.";
    }

    return "This match needs deliberate effort. Clear boundaries make the biggest difference.";
  }

  return "Clear strengths are visible. The win comes from applying one insight at a time.";
}

export function buildOgLabel(reading: ReadingData): string {
  if (reading.kind === "compatibility") {
    return reading.title.replace(" Compatibility Reading", "");
  }

  return reading.title.replace(" Destiny Reading", "");
}

/**
 * Tone checklist for UI strings:
 * - short sentence first
 * - no cosmic cliche
 * - one concrete action
 * - avoid guaranteed outcomes
 */
export const copyToneChecklist = [
  "Use concise, specific lines.",
  "Avoid repeated phrase openings.",
  "Include one clear next action.",
  "Keep entertainment disclaimer visible.",
];