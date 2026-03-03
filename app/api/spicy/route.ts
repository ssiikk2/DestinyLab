import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseOrThrowJson } from "@/lib/ai/parse";
import { generateWithAzureOpenAI } from "@/providers/azure-openai";
import { getClientIp } from "@/lib/ip";
import { checkRateLimit } from "@/lib/rate-limit";
import { buildSpicyCacheKey, getSpicyCache, setSpicyCache } from "@/lib/spicy-cache";

type Tone = "playful" | "spicy" | "dramatic";

interface SpicyBody {
  testId?: string;
  score?: number;
  band?: string;
  a?: string;
  b?: string;
  focus?: string;
  tone?: Tone;
}

interface SpicyResponsePayload {
  spicyShockLine: string;
  spicyMemeLine: string;
  spicyMiniStory: string;
}

function clampText(value: string, max = 220): string {
  const clean = value.trim().replace(/\s+/g, " ");
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

function validate(payload: unknown): payload is SpicyResponsePayload {
  if (!payload || typeof payload !== "object") return false;
  const p = payload as SpicyResponsePayload;
  return (
    typeof p.spicyShockLine === "string" &&
    typeof p.spicyMemeLine === "string" &&
    typeof p.spicyMiniStory === "string" &&
    p.spicyShockLine.trim().length > 0 &&
    p.spicyMemeLine.trim().length > 0 &&
    p.spicyMiniStory.trim().length > 0
  );
}

function buildPrompt(input: {
  testId: string;
  score: number;
  band: string;
  a?: string;
  b?: string;
  focus?: string;
  tone: Tone;
}) {
  return `You are writing short, viral, playful relationship commentary.
Tone must be entertaining, meme-like, emotionally engaging.
Never include hate, harassment, medical claims, guarantees, or explicit sexual language.
Keep sentences short and safe for general audiences.
No mention of AI.

Return JSON only:
{
  "spicyShockLine": string,
  "spicyMemeLine": string,
  "spicyMiniStory": string
}

Length rules:
- Total 80-120 words.
- spicyShockLine: one line.
- spicyMemeLine: one line.
- spicyMiniStory: 2-3 sentences.

Input:
Score: ${input.score}
Band: ${input.band}
Tone: ${input.tone}
Context:
- Test: ${input.testId}
- Person A: ${input.a || "unknown"}
- Person B: ${input.b || "unknown"}
- Focus: ${input.focus || "relationship"}
`;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`spicy:${ip}`, 5, 60_000);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many spicy requests right now." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as SpicyBody | null;
  if (!body?.testId || typeof body.score !== "number" || !Number.isFinite(body.score)) {
    return NextResponse.json({ error: "Invalid spicy request." }, { status: 400 });
  }

  const tone: Tone = body.tone && ["playful", "spicy", "dramatic"].includes(body.tone) ? body.tone : "playful";
  const cacheKey = buildSpicyCacheKey({
    testId: body.testId,
    score: Math.trunc(body.score),
    a: body.a,
    b: body.b,
    focus: body.focus,
    tone,
  });
  const cached = getSpicyCache(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    const raw = await generateWithAzureOpenAI(buildPrompt({
      testId: body.testId,
      score: Math.trunc(body.score),
      band: body.band || "unknown",
      a: body.a,
      b: body.b,
      focus: body.focus,
      tone,
    }), {
      json: true,
      temperature: 0.9,
      maxTokens: 260,
    });
    const parsed = parseOrThrowJson<SpicyResponsePayload>(raw, "azure-openai-spicy");
    if (!validate(parsed)) {
      throw new Error("Invalid spicy schema");
    }

    const safe = {
      spicyShockLine: clampText(parsed.spicyShockLine, 120),
      spicyMemeLine: clampText(parsed.spicyMemeLine, 120),
      spicyMiniStory: clampText(parsed.spicyMiniStory, 300),
    };
    setSpicyCache(cacheKey, safe);
    return NextResponse.json(safe);
  } catch (error) {
    console.error("[spicy-api]", error);
    return NextResponse.json({ error: "Could not spice this up right now. Try again in a moment." }, { status: 502 });
  }
}
