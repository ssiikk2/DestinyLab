import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClientIp } from "@/lib/ip";
import { checkRateLimit } from "@/lib/rate-limit";
import { isThrottled } from "@/lib/server/request-throttle";
import type { CalculatorMode } from "@/lib/test-themes";
import { createUnifiedResult } from "@/lib/unified-result-service";

interface CalculateRequestBody {
  mode?: string;
  first?: string;
  second?: string;
  variantKey?: string;
  website?: string;
}

const CALCULATOR_MODES: CalculatorMode[] = [
  "love",
  "name",
  "initials",
  "crush",
  "friendship",
  "zodiac",
  "birthday",
  "destiny",
];

function isCalculatorMode(value: string): value is CalculatorMode {
  return CALCULATOR_MODES.includes(value as CalculatorMode);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`calculate:${ip}`, 8, 60_000);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again shortly." },
      { status: 429 },
    );
  }

  if (isThrottled(`calculate:${ip}`, 350)) {
    return NextResponse.json(
      { error: "Too many requests in a short burst." },
      { status: 429 },
    );
  }

  const body = (await request.json().catch(() => null)) as CalculateRequestBody | null;

  if (body?.website?.trim()) {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  if (!body?.mode || !isCalculatorMode(body.mode)) {
    return NextResponse.json(
      { error: "A valid calculator mode is required." },
      { status: 400 },
    );
  }

  const first = body.first?.trim() || "";
  const second = body.second?.trim() || "";

  if (!first) {
    return NextResponse.json(
      { error: "First input is required." },
      { status: 400 },
    );
  }

  if (body.mode !== "destiny" && !second) {
    return NextResponse.json(
      { error: "Second input is required." },
      { status: 400 },
    );
  }

  const secondSafe = body.mode === "destiny" ? second || "reflection" : second;

  try {
    const result = await createUnifiedResult({
      mode: body.mode,
      first,
      second: secondSafe,
      variantKey: body.variantKey,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[calculate-api]", error);
    return NextResponse.json(
      { error: "Could not load your result just now. Please try again." },
      { status: 502 },
    );
  }
}
