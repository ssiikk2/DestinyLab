import { NextResponse } from "next/server";
import { getReading } from "@/lib/reading-store";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: RouteParams) {
  const { id } = await params;
  const stored = getReading(id);

  if (!stored) {
    return NextResponse.json({ error: "Reading not found." }, { status: 404 });
  }

  return NextResponse.json(stored, { status: 200 });
}