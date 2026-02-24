import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClientIp } from "@/lib/ip";
import { checkRateLimit } from "@/lib/rate-limit";
import { createDestinyReading } from "@/lib/reading-service";
import { saveReading } from "@/lib/reading-store";
import { isThrottled } from "@/lib/server/request-throttle";

function isValidDate(value: string): boolean {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`destiny:${ip}`, 5, 60_000);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again shortly." },
      { status: 429 },
    );
  }

  if (isThrottled(`destiny:${ip}`, 400)) {
    return NextResponse.json(
      { error: "Too many requests in a short burst." },
      { status: 429 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { birthDate?: string; website?: string }
    | null;

  if (body?.website?.trim()) {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  if (!body?.birthDate) {
    return NextResponse.json({ error: "birthDate is required." }, { status: 400 });
  }

  if (!isValidDate(body.birthDate)) {
    return NextResponse.json(
      { error: "Invalid date format. Use YYYY-MM-DD." },
      { status: 400 },
    );
  }

  try {
    const reading = await createDestinyReading(body.birthDate);
    const stored = saveReading(reading);

    return NextResponse.json({
      id: stored.id,
      route: `/reading/${stored.id}`,
      kind: reading.kind,
      stored,
    });
  } catch (error) {
    console.error("[destiny-api]", error);
    return NextResponse.json(
      { error: "Model deployment failed. Please retry later." },
      { status: 502 },
    );
  }
}
