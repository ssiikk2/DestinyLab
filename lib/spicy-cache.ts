import { createHash } from "crypto";

interface SpicyPayload {
  spicyShockLine: string;
  spicyMemeLine: string;
  spicyMiniStory: string;
}

interface CacheEntry {
  expiresAt: number;
  value: SpicyPayload;
}

declare global {
  var __destinyLabSpicyCache: Map<string, CacheEntry> | undefined;
  var __destinyLabSpicyGcStarted: boolean | undefined;
}

const spicyCache = globalThis.__destinyLabSpicyCache ?? new Map<string, CacheEntry>();
globalThis.__destinyLabSpicyCache = spicyCache;

const TTL_MS = 24 * 60 * 60 * 1000;

export function buildSpicyCacheKey(input: {
  testId: string;
  score: number;
  a?: string;
  b?: string;
  focus?: string;
  tone: string;
}): string {
  return createHash("sha256")
    .update(
      [
        input.testId,
        String(input.score),
        input.a || "",
        input.b || "",
        input.focus || "",
        input.tone,
      ].join("|"),
    )
    .digest("hex");
}

export function getSpicyCache(key: string): SpicyPayload | null {
  const entry = spicyCache.get(key);
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) {
    spicyCache.delete(key);
    return null;
  }
  return entry.value;
}

export function setSpicyCache(key: string, value: SpicyPayload): SpicyPayload {
  spicyCache.set(key, { value, expiresAt: Date.now() + TTL_MS });
  return value;
}

if (!globalThis.__destinyLabSpicyGcStarted) {
  globalThis.__destinyLabSpicyGcStarted = true;
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of spicyCache.entries()) {
      if (entry.expiresAt <= now) spicyCache.delete(key);
    }
  }, 60_000).unref();
}
