import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { appEnv, getBaseUrl } from "@/lib/env";

interface IndexNowBody {
  urls?: string[];
  host?: string;
}

export async function POST(request: NextRequest) {
  if (!appEnv.indexNowKey) {
    return NextResponse.json(
      { error: "INDEXNOW_KEY is not configured." },
      { status: 400 },
    );
  }

  const body = (await request.json().catch(() => null)) as IndexNowBody | null;
  if (!body?.urls || !Array.isArray(body.urls) || body.urls.length === 0) {
    return NextResponse.json(
      { error: "urls array is required." },
      { status: 400 },
    );
  }

  const baseUrl = getBaseUrl();
  const host = body.host || new URL(baseUrl).host;
  const key = appEnv.indexNowKey;
  const keyLocation = `${baseUrl}/${key}.txt`;

  const payload = {
    host,
    key,
    keyLocation,
    urlList: body.urls,
  };

  const result = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    const text = await result.text();
    return NextResponse.json(
      {
        error: "IndexNow request failed.",
        status: result.status,
        detail: text,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, submitted: body.urls.length });
}