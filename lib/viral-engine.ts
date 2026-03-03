import { buildSeed, seededInt } from "@/lib/results/seed";

export type BandId = "god" | "green" | "yellow" | "red" | "chaos";

export interface ViralContext {
  testId: string;
  a?: string;
  b?: string;
  focus?: string;
  seed: string;
}

const SHOCK_STARTS: Record<BandId, string[]> = {
  god: [
    "This score is flying with full momentum.",
    "You unlocked elite connection timing.",
    "The vibe is synced and loud.",
    "This is top-tier chemistry territory.",
    "You are in rare smooth-flow mode.",
    "Everything is lining up cleanly.",
    "This score hits like a perfect chorus.",
    "The signal is strong and stable.",
  ],
  green: [
    "This is a strong match with clear upside.",
    "You have a real base to build on.",
    "The connection is warm and consistent.",
    "Strong pull, manageable friction.",
    "This score says keep going with intention.",
    "The momentum here is very workable.",
    "You are one habit away from even higher.",
    "This is healthy energy, not hype.",
  ],
  yellow: [
    "This score is a maybe with potential.",
    "There is spark, but timing decides it.",
    "Workable chemistry, mixed rhythm.",
    "Potential is real if communication improves.",
    "This is the 'could be great' zone.",
    "There is tension, but not a dead end.",
    "This score rewards better habits fast.",
    "The upside is there if both show up.",
  ],
  red: [
    "This one needs clarity before intensity.",
    "The chemistry is noisy right now.",
    "You need cleaner communication first.",
    "This score asks for a reset, not drama.",
    "Hard mode, but still fixable.",
    "The mismatch is loud, but useful.",
    "Less guessing, more direct language.",
    "This band needs structure quickly.",
  ],
  chaos: [
    "This score is full plot twist energy.",
    "Welcome to absolute chaos mode.",
    "Hot mess, high signal, zero filter.",
    "This one came with dramatic lighting.",
    "The vibe is chaotic but honest.",
    "This is meme territory with lessons.",
    "Everything is loud, nothing is subtle.",
    "You just unlocked storyline mode.",
  ],
};

const SHOCK_ENDS = [
  "Use strengths and next steps before jumping to conclusions.",
  "Communication will decide whether this climbs.",
  "One clear conversation can shift the whole tone.",
  "Treat this as a snapshot and act on it.",
  "Long-term direction depends on what you do next.",
];

const MEME_STARTS: Record<BandId, string[]> = {
  god: [
    "Frame this score and put it on the fridge.",
    "This is main-character relationship energy.",
    "Certified iconic pair behavior.",
    "Someone call this an instant classic.",
    "This card is suspiciously powerful.",
    "You two are trending in my mind.",
    "This result has victory music.",
    "That score walked in with confidence.",
  ],
  green: [
    "This is giving strong soft-launch vibes.",
    "The score said yes, now keep receipts.",
    "Stable core, spicy enough to stay fun.",
    "You pass the vibe check with margin.",
    "This pair has momentum and range.",
    "Strong match with room to glow up.",
    "This is calm confidence energy.",
    "Solid score, cleaner habits, bigger win.",
  ],
  yellow: [
    "Half spark, half mystery, full storyline.",
    "This is a cliffhanger with potential.",
    "Not perfect, still very watchable.",
    "Messy middle, interesting outcome.",
    "Potential detected: proceed with intention.",
    "This score likes effort and honesty.",
    "Mixed signals, clear next steps.",
    "Complicated, but not boring.",
  ],
  red: [
    "This card says: simplify everything.",
    "It is giving 'we need a reset' energy.",
    "Low score, high lesson density.",
    "This needs boundaries and a deep breath.",
    "Chaos is optional if tone improves.",
    "Less spiral, more structure.",
    "This is a repair-season score.",
    "The fix starts with one clear ask.",
  ],
  chaos: [
    "Do not send this to your ex unless brave.",
    "Screenshot now, process feelings later.",
    "This is season-finale cliffhanger energy.",
    "Pure chaos, surprisingly educational.",
    "A dramatic score with practical lessons.",
    "This card has group-chat potential.",
    "No notes, only plot twists.",
    "The meme writes itself here.",
  ],
};

const MEME_ENDS = [
  "Tag your partner and compare notes.",
  "Send this to your crush for science.",
  "Save this for tonight's group chat.",
  "Share now before the mood changes.",
  "Use this as your conversation opener.",
  "This one deserves a screenshot.",
  "Keep this card for your next debate.",
  "Pass this to someone who needs it.",
];

function deterministicPick(pool: string[], ctx: ViralContext, salt: string, index = 0): string {
  const seed = buildSeed([ctx.seed, ctx.testId, ctx.a, ctx.b, ctx.focus, salt, String(index)]);
  const i = seededInt(seed + 17, 0, pool.length - 1, index + 1);
  return pool[i];
}

export function getBand(score: number): { bandId: BandId; label: string; colorHint: string } {
  if (score >= 90) return { bandId: "god", label: "God Tier", colorHint: "green" };
  if (score >= 70) return { bandId: "green", label: "Strong Match", colorHint: "teal" };
  if (score >= 50) return { bandId: "yellow", label: "Potential", colorHint: "yellow" };
  if (score >= 30) return { bandId: "red", label: "Caution", colorHint: "orange" };
  return { bandId: "chaos", label: "Chaos Mode", colorHint: "red" };
}

export function getShockLine(score: number, ctx: ViralContext): string {
  const band = getBand(score).bandId;
  const start = deterministicPick(SHOCK_STARTS[band], ctx, "shock-start");
  const end = deterministicPick(SHOCK_ENDS, ctx, "shock-end");
  return `${start} ${end}`;
}

export function getMemeLine(score: number, ctx: ViralContext): string {
  const band = getBand(score).bandId;
  const start = deterministicPick(MEME_STARTS[band], ctx, "meme-start");
  const end = deterministicPick(MEME_ENDS, ctx, "meme-end");
  return `${start} ${end}`;
}

export function getMiniStats(score: number, ctx: ViralContext): { passion: number; communication: number; longTerm: number } {
  const spread = Math.max(4, Math.round((100 - Math.abs(score - 50)) / 12));
  const s = buildSeed([ctx.seed, ctx.testId, ctx.a, ctx.b, ctx.focus, "mini"]);
  return {
    passion: Math.max(0, Math.min(100, score + seededInt(s + 11, -spread, spread))),
    communication: Math.max(0, Math.min(100, score + seededInt(s + 17, -spread, spread, 2))),
    longTerm: Math.max(0, Math.min(100, score + seededInt(s + 23, -spread, spread, 3))),
  };
}
