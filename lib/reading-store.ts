import { randomUUID } from "crypto";
import type { ReadingData, StoredReading } from "@/lib/types";

const readings = new Map<string, StoredReading>();

export function saveReading(data: ReadingData, ttlMs = 1000 * 60 * 60 * 6): string {
  const id = randomUUID();
  const now = Date.now();

  readings.set(id, {
    id,
    createdAt: new Date(now).toISOString(),
    expiresAt: now + ttlMs,
    data,
  });

  return id;
}

export function getReading(id: string): StoredReading | null {
  const entry = readings.get(id);

  if (!entry) {
    return null;
  }

  if (entry.expiresAt <= Date.now()) {
    readings.delete(id);
    return null;
  }

  return entry;
}

setInterval(() => {
  const now = Date.now();

  for (const [id, entry] of readings.entries()) {
    if (entry.expiresAt <= now) {
      readings.delete(id);
    }
  }
}, 60_000).unref();