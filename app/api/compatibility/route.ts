import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClientIp } from "@/lib/ip";
import { checkRateLimit } from "@/lib/rate-limit";
import { createCompatibilityReading } from "@/lib/reading-service";
import { saveReading } from "@/lib/reading-store";
import { isThrottled } from "@/lib/server/request-throttle";

function isValidDate(value: string): boolean {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`compatibility:${ip}`, 5, 60_000);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again shortly." },
      { status: 429 },
    );
  }

  if (isThrottled(`compatibility:${ip}`, 400)) {
    return NextResponse.json(
      { error: "Too many requests in a short burst." },
      { status: 429 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { birthDateA?: string; birthDateB?: string; website?: string }
    | null;

  if (body?.website?.trim()) {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  if (!body?.birthDateA || !body.birthDateB) {
    return NextResponse.json(
      { error: "birthDateA and birthDateB are required." },
      { status: 400 },
    );
  }

  if (!isValidDate(body.birthDateA) || !isValidDate(body.birthDateB)) {
    return NextResponse.json(
      { error: "Invalid date format. Use YYYY-MM-DD." },
      { status: 400 },
    );
  }

  try {
    const reading = await createCompatibilityReading(body.birthDateA, body.birthDateB);
    const stored = saveReading(reading);

    return NextResponse.json({
      id: stored.id,
      route: `/reading/${stored.id}`,
      kind: reading.kind,
      score: reading.score,
      stored,
    });
  } catch (error) {
    console.error("[compatibility-api]", error);
    return NextResponse.json(
      { error: "Model deployment failed. Please retry later." },
      { status: 502 },
    );
  }
}
