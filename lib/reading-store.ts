import { randomUUID } from "crypto";
import type { ReadingData, StoredReading } from "@/lib/types";

declare global {
  var __destinyLabReadings: Map<string, StoredReading> | undefined;
  var __destinyLabGcStarted: boolean | undefined;
}

const readings = globalThis.__destinyLabReadings ?? new Map<string, StoredReading>();
globalThis.__destinyLabReadings = readings;

export function saveReading(
  data: ReadingData,
  ttlMs = 1000 * 60 * 60 * 6,
): StoredReading {
  const id = randomUUID();
  const now = Date.now();
  const stored: StoredReading = {
    id,
    createdAt: new Date(now).toISOString(),
    expiresAt: now + ttlMs,
    data,
  };

  readings.set(id, stored);

  return stored;
}

export function putReading(stored: StoredReading): StoredReading {
  readings.set(stored.id, stored);
  return stored;
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

if (!globalThis.__destinyLabGcStarted) {
  globalThis.__destinyLabGcStarted = true;

  setInterval(() => {
    const now = Date.now();

    for (const [id, entry] of readings.entries()) {
      if (entry.expiresAt <= now) {
        readings.delete(id);
      }
    }
  }, 60_000).unref();
}