import { buildSeed, seededInt } from "@/lib/results/seed";

type ScoreBandId = "legend" | "strong" | "potential" | "caution" | "chaos";
type ViralityContext = "love" | "zodiac" | "destiny" | "compatibility" | "general";

export interface ScoreBandMeta {
  bandId: ScoreBandId;
  label: string;
  colorHint: "green" | "teal" | "yellow" | "orange" | "red";
}

function contextNoun(context: ViralityContext): string {
  if (context === "zodiac") return "cosmic chemistry";
  if (context === "destiny") return "life rhythm";
  if (context === "compatibility") return "pair energy";
  if (context === "love") return "relationship vibe";
  return "connection vibe";
}

function bandFromScore(score: number): ScoreBandId {
  if (score >= 90) return "legend";
  if (score >= 70) return "strong";
  if (score >= 50) return "potential";
  if (score >= 30) return "caution";
  return "chaos";
}

function bandWords(bandId: ScoreBandId) {
  const map: Record<ScoreBandId, { label: string; color: ScoreBandMeta["colorHint"] }> = {
    legend: { label: "Legend Match", color: "green" },
    strong: { label: "Strong Match", color: "teal" },
    potential: { label: "High Potential", color: "yellow" },
    caution: { label: "Caution Zone", color: "orange" },
    chaos: { label: "Chaos Mode", color: "red" },
  };
  return map[bandId];
}

function shockPool(bandId: ScoreBandId, context: ViralityContext): string[] {
  const noun = contextNoun(context);
  const startsByBand: Record<ScoreBandId, string[]> = {
    legend: [
      "This score is basically fireworks with a game plan.",
      "You two are moving like a synced playlist.",
      "The signal is loud and clear right now.",
      "This is peak alignment energy.",
      "You landed in the rare easy-flow zone.",
    ],
    strong: [
      "This is strong, not perfect, and that is a good sign.",
      "There is real pull here with room to level up.",
      "The base is solid and communication can make it great.",
      "This pair has momentum and clear upside.",
      "You are in the zone where habits decide the glow-up.",
    ],
    potential: [
      "There is spark here, but timing decides everything.",
      "This score says maybe, not never.",
      "Potential is real if communication gets cleaner.",
      "You are one or two habits away from a different result.",
      "The vibe is mixed, but very workable.",
    ],
    caution: [
      "This is the part where honesty beats fantasy.",
      "The chemistry is noisy; structure is missing.",
      "You can turn this around, but not by guessing.",
      "This band needs calm communication, fast.",
      "The signal is unstable, not doomed.",
    ],
    chaos: [
      "This score is pure plot twist territory.",
      "Right now it is giving hot-mess energy.",
      "The vibe is chaotic, but at least it is honest.",
      "This band screams: reset the rules first.",
      "You unlocked full drama mode. Keep it playful.",
    ],
  };

  const ends = [
    `Your ${noun} has strengths, challenges, and very clear next steps.`,
    `Communication moves will decide whether this climbs or crashes.`,
    `The good news: one solid conversation can shift the whole tone.`,
    `If you play this smart, the long-term story can still improve.`,
    `This is a snapshot, so your next step matters more than the headline.`,
  ];

  const pool: string[] = [];
  for (const start of startsByBand[bandId]) {
    for (const end of ends) {
      pool.push(`${start} ${end}`);
    }
  }
  return pool;
}

function memePool(bandId: ScoreBandId, context: ViralityContext): string[] {
  const noun = contextNoun(context);
  const startsByBand: Record<ScoreBandId, string[]> = {
    legend: [
      "This card is relationship main-character energy.",
      "Someone frame this score immediately.",
      "This is suspiciously iconic.",
      "You two are trending in my brain.",
      "Certified power duo behavior.",
    ],
    strong: [
      "This is giving soft-launch success.",
      "The score said yes, now keep receipts.",
      "Strong core, tiny chaos, very fixable.",
      "You are one check-in away from elite mode.",
      "This pair passes the vibe check.",
    ],
    potential: [
      "Half spark, half mystery, full storyline.",
      "Potential detected: proceed with better texting.",
      "This score is a cliffhanger episode.",
      "Not perfect, still interesting, keep watching.",
      "It is complicated, but in a watchable way.",
    ],
    caution: [
      "The vibe is buffering; do not panic.",
      "This needs boundaries and maybe snacks.",
      "Score says: less mind-reading, more plain words.",
      "A little chaos, a lot of communication work.",
      "This card is your sign to simplify everything.",
    ],
    chaos: [
      "Do not show this to your ex unless you are brave.",
      "This score arrived with dramatic lighting.",
      "It is giving season finale cliffhanger.",
      "Chaotic, hilarious, and weirdly educational.",
      "Screenshot now, process feelings later.",
    ],
  };

  const ends = [
    `Tag your person and compare ${noun} notes.`,
    "Save this for your next group chat debate.",
    "This one deserves a screenshot.",
    "Share it before the mood changes.",
    "Use this as your conversation starter tonight.",
  ];

  const pool: string[] = [];
  for (const start of startsByBand[bandId]) {
    for (const end of ends) {
      pool.push(`${start} ${end}`);
    }
  }
  return pool;
}

function bulletPool(bandId: ScoreBandId, context: ViralityContext): string[] {
  const noun = contextNoun(context);
  const shared = [
    "Call out one strength before naming one challenge.",
    "Use one clear ask instead of hint-based messages.",
    "Run a 7-day communication experiment before retesting.",
    "Protect tone first; the rest gets easier after that.",
    "Short check-ins beat one giant emotional dump.",
    "Treat this score as direction, not destiny.",
    "When in doubt, switch from text to voice for hard topics.",
    "Pick one next step and track it for a week.",
  ];

  const bandSpecific: Record<ScoreBandId, string[]> = {
    legend: [
      `Your ${noun} is strong, so focus on keeping routines steady.`,
      "Celebrate the win, then protect what is already working.",
      "Do not coast; consistency keeps high scores high.",
      "Use your momentum for one future-planning conversation.",
      "This is the band for building long-term habits.",
    ],
    strong: [
      `Your ${noun} is healthy, but clarity still matters.`,
      "One awkward topic handled well can move this higher.",
      "Turn assumptions into explicit agreements.",
      "Set a weekly reset ritual and keep it short.",
      "Prioritize follow-through over big promises.",
    ],
    potential: [
      `Your ${noun} has upside if both people stay intentional.`,
      "This band rewards small, repeatable changes.",
      "Name friction early before it becomes a pattern.",
      "Keep plans simple and expectations explicit.",
      "Progress here is usually communication-driven.",
    ],
    caution: [
      `Your ${noun} needs structure more than intensity.`,
      "Pause hot conversations and return with calmer wording.",
      "Stop stacking complaints into one thread.",
      "Agree on one repair rule before the next conflict.",
      "Focus on one issue at a time.",
    ],
    chaos: [
      `Your ${noun} is noisy right now, so simplify everything.`,
      "Reset ground rules before trying to fix emotions.",
      "Use humor kindly, then get specific.",
      "Do not spiral; pick one tiny move and do it.",
      "A low score can still improve with better pacing.",
    ],
  };

  const pool = [...bandSpecific[bandId], ...shared, ...shared.map((line) => `${line} (${context})`)];
  return pool.slice(0, 25);
}

export function getScoreBand(score: number): ScoreBandMeta {
  const bandId = bandFromScore(score);
  const words = bandWords(bandId);
  return { bandId, label: words.label, colorHint: words.color };
}

export function getShockLine(input: { score: number; context: ViralityContext; seed?: number }): string {
  const bandId = bandFromScore(input.score);
  const pool = shockPool(bandId, input.context);
  const seed = input.seed ?? buildSeed([String(input.score), input.context, "shock"]);
  return pool[seededInt(seed + 33, 0, pool.length - 1, 2)];
}

export function getMemeLine(input: { score: number; context: ViralityContext; seed?: number }): string {
  const bandId = bandFromScore(input.score);
  const pool = memePool(bandId, input.context);
  const seed = input.seed ?? buildSeed([String(input.score), input.context, "meme"]);
  return pool[seededInt(seed + 37, 0, pool.length - 1, 3)];
}

export function getSubscores(input: { score: number; seed: number }): {
  passion: number;
  communication: number;
  longTerm: number;
} {
  const base = input.score;
  const spread = Math.max(4, Math.round((100 - Math.abs(base - 50)) / 12));
  const passion = Math.max(0, Math.min(100, base + seededInt(input.seed + 101, -spread, spread)));
  const communication = Math.max(0, Math.min(100, base + seededInt(input.seed + 103, -spread, spread, 2)));
  const longTerm = Math.max(0, Math.min(100, base + seededInt(input.seed + 107, -spread, spread, 3)));
  return { passion, communication, longTerm };
}

export function getBullets(input: { score: number; context: ViralityContext; seed?: number }): string[] {
  const bandId = bandFromScore(input.score);
  const pool = bulletPool(bandId, input.context);
  const seed = input.seed ?? buildSeed([String(input.score), input.context, "bullets"]);
  const picked = new Set<string>();
  for (let i = 0; picked.size < 5 && i < 20; i += 1) {
    const idx = seededInt(seed + 211, 0, pool.length - 1, i + 1);
    picked.add(pool[idx]);
  }
  return [...picked].slice(0, 5);
}

export function getMeaningLink(score: number, context: ViralityContext): string {
  if (context === "zodiac") {
    return score < 50 ? "/blog/low-compatibility-score-meaning" : "/blog/love-compatibility-score-meaning";
  }
  if (score < 50) return "/blog/low-compatibility-score-meaning";
  if (score < 70) return "/blog/love-compatibility-score-meaning#50-69";
  if (score < 90) return "/blog/love-compatibility-score-meaning#70-89";
  return "/blog/next-steps-after-compatibility-score";
}

export type { ViralityContext };
