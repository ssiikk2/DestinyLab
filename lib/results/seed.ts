export function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function buildSeed(parts: Array<string | undefined>): number {
  return hashString(
    parts
      .map((part) => (part || "").trim().toLowerCase())
      .join("|"),
  );
}

export function seededUnit(seed: number, offset = 0): number {
  const mixed = Math.imul(seed + offset * 2654435761, 1597334677) >>> 0;
  return mixed / 4294967295;
}

export function seededInt(seed: number, min: number, max: number, offset = 0): number {
  const unit = seededUnit(seed, offset);
  return Math.floor(unit * (max - min + 1)) + min;
}

export function deterministicShuffle<T>(items: T[], seed: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = seededInt(seed, 0, i, i + 1);
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}
