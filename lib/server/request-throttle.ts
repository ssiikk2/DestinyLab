interface ThrottleRecord {
  lastSeenAt: number;
}

declare global {
  var __destinyLabThrottle: Map<string, ThrottleRecord> | undefined;
}

const throttleMap = globalThis.__destinyLabThrottle ?? new Map<string, ThrottleRecord>();
globalThis.__destinyLabThrottle = throttleMap;

export function isThrottled(key: string, minIntervalMs = 500): boolean {
  const now = Date.now();
  const existing = throttleMap.get(key);

  if (!existing) {
    throttleMap.set(key, { lastSeenAt: now });
    return false;
  }

  if (now - existing.lastSeenAt < minIntervalMs) {
    existing.lastSeenAt = now;
    return true;
  }

  existing.lastSeenAt = now;
  return false;
}

setInterval(() => {
  const now = Date.now();

  for (const [key, value] of throttleMap.entries()) {
    if (now - value.lastSeenAt > 10 * 60 * 1000) {
      throttleMap.delete(key);
    }
  }
}, 60_000).unref();
