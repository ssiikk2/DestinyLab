import { createHash } from "crypto";

export interface MemeOutput {
  shockLine: string;
  memeLine: string;
  miniStory: string;
  shareCta: string;
  compareCta: string;
  bandTokens: string[];
}

interface CacheEntry {
  expiresAt: number;
  value: MemeOutput;
}

interface MemeCacheStore {
  get(key: string): Promise<MemeOutput | null>;
  set(key: string, value: MemeOutput, ttlMs: number): Promise<void>;
}

class InMemoryMemeCache implements MemeCacheStore {
  private map = globalThis.__destinyLabAoaiMemeCache ?? new Map<string, CacheEntry>();

  constructor() {
    globalThis.__destinyLabAoaiMemeCache = this.map;
    if (!globalThis.__destinyLabAoaiMemeGcStarted) {
      globalThis.__destinyLabAoaiMemeGcStarted = true;
      setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of this.map.entries()) {
          if (entry.expiresAt <= now) this.map.delete(key);
        }
      }, 60_000).unref();
    }
  }

  async get(key: string): Promise<MemeOutput | null> {
    const entry = this.map.get(key);
    if (!entry) return null;
    if (entry.expiresAt <= Date.now()) {
      this.map.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: MemeOutput, ttlMs: number): Promise<void> {
    this.map.set(key, { value, expiresAt: Date.now() + ttlMs });
  }
}

declare global {
  var __destinyLabAoaiMemeCache: Map<string, CacheEntry> | undefined;
  var __destinyLabAoaiMemeGcStarted: boolean | undefined;
}

const PROMPT_VERSION = "meme-v2";
const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function normalize(value?: string): string {
  return (value || "").trim().toLowerCase();
}

export function buildAoaiMemeCacheKey(input: {
  testId: string;
  tone: string;
  score: number;
  band: string;
  a?: string;
  b?: string;
  focus?: string;
  promptVersion?: string;
}): string {
  const key = [
    normalize(input.testId),
    normalize(input.tone),
    String(Math.trunc(input.score)),
    normalize(input.band),
    normalize(input.a),
    normalize(input.b),
    normalize(input.focus),
    normalize(input.promptVersion || PROMPT_VERSION),
  ].join("|");
  return createHash("sha256").update(key).digest("hex");
}

function resolveStore(): MemeCacheStore {
  const usePersistent = process.env.USE_PERSISTENT_CACHE === "true";
  if (usePersistent) {
    return new InMemoryMemeCache();
  }
  return new InMemoryMemeCache();
}

const store = resolveStore();

export async function getAoaiMemeCache(key: string): Promise<MemeOutput | null> {
  return store.get(key);
}

export async function setAoaiMemeCache(key: string, value: MemeOutput, ttlMs = DEFAULT_TTL_MS): Promise<void> {
  await store.set(key, value, ttlMs);
}

export const AOAI_MEME_PROMPT_VERSION = PROMPT_VERSION;
