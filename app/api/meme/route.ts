import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseOrThrowJson } from "@/lib/ai/parse";
import {
  AOAI_MEME_PROMPT_VERSION,
  buildAoaiMemeCacheKey,
  getAoaiMemeCache,
  setAoaiMemeCache,
  type MemeOutput,
} from "@/lib/aoai-meme-cache";
import { getClientIp } from "@/lib/ip";
import { checkRateLimit } from "@/lib/rate-limit";
import { generateWithAzureOpenAI } from "@/providers/azure-openai";

type Tone = "playful" | "spicy" | "dramatic";
type BandId = "god" | "green" | "yellow" | "red" | "chaos";

interface BandRules {
  id: BandId;
  title: string;
  tone: string;
  vibe: string;
  requiredGroups: [string[], string[]];
  forbidden: string[];
}

interface MemeBody {
  testId?: string;
  tone?: Tone;
  inputs?: { a?: string; b?: string; birthdate?: string; focus?: string };
  baseResult?: {
    score?: number;
    grade?: string;
    topStrengths?: string[];
    topWatchouts?: string[];
    breakdown?: Array<{ label: string; value: number }>;
  };
}

const BAND_RULES: Record<BandId, BandRules> = {
  god: {
    id: "god",
    title: "GOD",
    tone: "euphoric, dangerously compatible",
    vibe: "euphoric, confident, playful brag",
    requiredGroups: [
      ["unstoppable", "dangerous", "legendary", "soulmate-level"],
      ["post", "share", "tag", "flex"],
    ],
    forbidden: ["toxic", "run", "avoid"],
  },
  green: {
    id: "green",
    title: "GREEN",
    tone: "confident, strong match with one caution",
    vibe: "optimistic plus one actionable caution",
    requiredGroups: [
      ["solid", "strong", "steady", "real"],
      ["one thing", "small catch", "watch this"],
    ],
    forbidden: ["doomed", "never", "impossible"],
  },
  yellow: {
    id: "yellow",
    title: "YELLOW",
    tone: "teasing, potential but effort required",
    vibe: "teasing with clear effort-based upside",
    requiredGroups: [
      ["effort", "work", "practice", "grow"],
      ["ex", "best friend", "crush"],
    ],
    forbidden: ["soulmate", "hopeless"],
  },
  red: {
    id: "red",
    title: "RED",
    tone: "warning-but-fun, chemistry vs friction",
    vibe: "warning but funny, never mean",
    requiredGroups: [
      ["caution", "fragile", "hot-and-cold", "friction"],
      ["boundaries", "space", "timing"],
    ],
    forbidden: ["stupid", "pathetic"],
  },
  chaos: {
    id: "chaos",
    title: "CHAOS",
    tone: "chaotic-comedic, plot twist popcorn",
    vibe: "comedic chaos, not cruel",
    requiredGroups: [
      ["chaos", "plot twist", "wild", "popcorn"],
      ["this is giving...", "main character energy", "npc moment"],
    ],
    forbidden: ["kill", "worthless", "trash"],
  },
};

function clamp(value: string, max: number): string {
  const clean = value.trim().replace(/\s+/g, " ");
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 3).trimEnd()}...`;
}

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function includesToken(value: string, token: string): boolean {
  return normalizeText(value).includes(normalizeText(token));
}

function normalizeTokens(tokens: string[]): string[] {
  const cleaned: string[] = [];
  for (const token of tokens) {
    const t = normalizeText(token);
    if (!t || cleaned.includes(t)) continue;
    cleaned.push(t);
    if (cleaned.length >= 3) break;
  }
  return cleaned;
}

function validate(payload: unknown): payload is MemeOutput {
  if (!payload || typeof payload !== "object") return false;
  const p = payload as MemeOutput;
  return (
    typeof p.shockLine === "string" &&
    typeof p.memeLine === "string" &&
    typeof p.miniStory === "string" &&
    typeof p.shareCta === "string" &&
    typeof p.compareCta === "string" &&
    Array.isArray(p.bandTokens) &&
    p.bandTokens.every((token) => typeof token === "string")
  );
}

function resolveBand(score: number): BandRules {
  if (score >= 90) return BAND_RULES.god;
  if (score >= 70) return BAND_RULES.green;
  if (score >= 50) return BAND_RULES.yellow;
  if (score >= 30) return BAND_RULES.red;
  return BAND_RULES.chaos;
}

function validateBandCompliance(payload: MemeOutput, rules: BandRules): boolean {
  const bandTokens = normalizeTokens(payload.bandTokens);
  if (bandTokens.length < 2) return false;

  const combined = `${payload.shockLine} ${payload.memeLine} ${payload.miniStory}`;
  const normalizedCombined = normalizeText(combined);
  const fields = [payload.shockLine, payload.memeLine, payload.miniStory].map(normalizeText);

  for (const forbidden of rules.forbidden) {
    if (includesToken(normalizedCombined, forbidden)) return false;
  }

  const hasRequiredA = rules.requiredGroups[0].some((option) => bandTokens.includes(normalizeText(option)));
  const hasRequiredB = rules.requiredGroups[1].some((option) => bandTokens.includes(normalizeText(option)));
  if (!hasRequiredA || !hasRequiredB) return false;

  for (const token of bandTokens) {
    if (!includesToken(normalizedCombined, token)) return false;
  }

  const everyFieldHasToken = fields.every((field) => bandTokens.some((token) => includesToken(field, token)));
  if (!everyFieldHasToken) return false;

  return true;
}

function buildPrompt(input: {
  testId: string;
  tone: Tone;
  a?: string;
  b?: string;
  focus?: string;
  score: number;
  grade?: string;
  topStrengths: string[];
  topWatchouts: string[];
  breakdown?: Array<{ label: string; value: number }>;
  bandRules: BandRules;
  variation: "primary" | "retry";
}): string {
  const breakdown = (input.breakdown || [])
    .slice(0, 3)
    .map((item) => `${item.label}:${item.value}`)
    .join(", ");

  return `SYSTEM RULES
You write short viral relationship commentary.
You MUST obey the band rules and checklist.
No hate or harassment, no slurs, no explicit sexual content, no medical claims, and no guarantees.
Do not mention AI or ChatGPT.
Output ONLY valid JSON.

USER TASK
Band: ${input.bandRules.title}
Band tone: ${input.bandRules.tone}
Band vibe: ${input.bandRules.vibe}
Primary tone request: ${input.tone}
Generation mode: ${input.variation === "retry" ? "retry with stronger band language" : "primary"}

Band checklist (MUST PASS):
1) Include at least one token from group A: ${input.bandRules.requiredGroups[0].join(" | ")}
2) Include at least one token from group B: ${input.bandRules.requiredGroups[1].join(" | ")}
3) Avoid these words: ${input.bandRules.forbidden.join(" | ")}
4) Put chosen required tokens in bandTokens (2-3 strings).
5) Ensure shockLine, memeLine, and miniStory each include at least one band token.

Return ONLY valid JSON with keys:
shockLine, memeLine, miniStory, shareCta, compareCta, bandTokens

Hard limits:
- shockLine <= 90 chars
- memeLine <= 90 chars
- miniStory <= 220 chars and max 2 sentences
- shareCta <= 60 chars
- compareCta <= 60 chars
- bandTokens: array with 2-3 items
- Use baseResult facts only, no extreme claims

Format hint:
- shockLine: one line in band vibe
- memeLine: one line in band meme style
- miniStory: two sentences max (sentence 1 = strength, sentence 2 = caution or next action)
- shareCta and compareCta: very short

Context:
testId=${input.testId}
a=${input.a || "n/a"}
b=${input.b || "n/a"}
focus=${input.focus || "relationship"}

baseResult:
score=${input.score}
grade=${input.grade || "n/a"}
topStrengths=${input.topStrengths.slice(0, 2).join("; ")}
topWatchouts=${input.topWatchouts.slice(0, 2).join("; ")}
breakdown=${breakdown || "n/a"}`;
}

async function generateCandidate(input: {
  testId: string;
  tone: Tone;
  a?: string;
  b?: string;
  focus?: string;
  score: number;
  grade?: string;
  topStrengths: string[];
  topWatchouts: string[];
  breakdown?: Array<{ label: string; value: number }>;
  bandRules: BandRules;
  variation: "primary" | "retry";
}): Promise<MemeOutput> {
  const raw = await generateWithAzureOpenAI(buildPrompt(input), {
    json: true,
    temperature: input.variation === "primary" ? 0.35 : 0.5,
    maxTokens: 260,
  });
  const parsed = parseOrThrowJson<MemeOutput>(raw, "aoai-meme");
  if (!validate(parsed)) throw new Error("invalid schema");

  return {
    shockLine: clamp(parsed.shockLine, 90),
    memeLine: clamp(parsed.memeLine, 90),
    miniStory: clamp(parsed.miniStory, 220),
    shareCta: clamp(parsed.shareCta, 60),
    compareCta: clamp(parsed.compareCta, 60),
    bandTokens: normalizeTokens(parsed.bandTokens),
  };
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`meme:${ip}`, 10, 60_000);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many meme requests right now." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as MemeBody | null;
  const score = body?.baseResult?.score;
  if (!body?.testId || typeof score !== "number" || !Number.isFinite(score)) {
    return NextResponse.json({ error: "Invalid meme request payload." }, { status: 400 });
  }

  const tone: Tone = body.tone && ["playful", "spicy", "dramatic"].includes(body.tone) ? body.tone : "playful";
  const a = body.inputs?.a || body.inputs?.birthdate || "";
  const b = body.inputs?.b || "";
  const focus = body.inputs?.focus || "";
  const bandRules = resolveBand(score);

  const key = buildAoaiMemeCacheKey({
    testId: body.testId,
    tone,
    score,
    band: bandRules.id,
    a,
    b,
    focus,
    promptVersion: AOAI_MEME_PROMPT_VERSION,
  });

  const cached = await getAoaiMemeCache(key);
  if (cached) return NextResponse.json(cached);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const safe = (await Promise.race([
      (async () => {
        const commonInput = {
          testId: body.testId!,
          tone,
          a,
          b,
          focus,
          score: Math.trunc(score),
          grade: body.baseResult?.grade,
          topStrengths: body.baseResult?.topStrengths || [],
          topWatchouts: body.baseResult?.topWatchouts || [],
          breakdown: body.baseResult?.breakdown,
          bandRules,
        };

        const primary = await generateCandidate({ ...commonInput, variation: "primary" });
        if (validateBandCompliance(primary, bandRules)) return primary;

        const retry = await generateCandidate({ ...commonInput, variation: "retry" });
        if (validateBandCompliance(retry, bandRules)) return retry;

        throw new Error("band validation failed after retry");
      })(),
      new Promise<MemeOutput>((_, reject) => {
        controller.signal.addEventListener("abort", () => reject(new Error("timeout")));
      }),
    ])) as MemeOutput;

    await setAoaiMemeCache(key, safe);
    return NextResponse.json(safe);
  } catch (error) {
    console.error("[meme-api]", error);
    return NextResponse.json({ error: "Meme upgrade unavailable right now." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
