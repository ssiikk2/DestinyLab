import { createHash } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, resolve } from "path";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

interface CacheRecord<T> {
  key: string;
  calculatorType: string;
  person1: string;
  person2: string;
  expiresAt: number;
  createdAt: string;
  value: T;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function buildCalculatorCacheKey(input: {
  person1: string;
  person2: string;
  calculatorType: string;
}): string {
  const digest = createHash("sha256");
  digest.update(`${normalize(input.person1)}|${normalize(input.person2)}|${normalize(input.calculatorType)}`);
  return digest.digest("hex");
}

function cachePathByKey(key: string): string {
  return resolve(process.cwd(), "content", ".cache", "calculator", `${key}.json`);
}

export async function getCachedCalculatorValue<T>(input: {
  person1: string;
  person2: string;
  calculatorType: string;
}): Promise<T | null> {
  const key = buildCalculatorCacheKey(input);
  const path = cachePathByKey(key);

  try {
    const raw = await readFile(path, "utf-8");
    const parsed = JSON.parse(raw) as CacheRecord<T>;

    if (!parsed?.expiresAt || parsed.expiresAt <= Date.now()) {
      return null;
    }

    return parsed.value;
  } catch {
    return null;
  }
}

export async function setCachedCalculatorValue<T>(
  input: {
    person1: string;
    person2: string;
    calculatorType: string;
  },
  value: T,
): Promise<void> {
  const key = buildCalculatorCacheKey(input);
  const path = cachePathByKey(key);
  const record: CacheRecord<T> = {
    key,
    calculatorType: normalize(input.calculatorType),
    person1: normalize(input.person1),
    person2: normalize(input.person2),
    createdAt: new Date().toISOString(),
    expiresAt: Date.now() + THIRTY_DAYS_MS,
    value,
  };

  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(record), "utf-8");
}
