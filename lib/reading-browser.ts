import type { StoredReading } from "@/lib/types";

function keyOf(id: string): string {
  return `destinylab:reading:${id}`;
}

export function saveReadingLocal(stored: StoredReading) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(keyOf(stored.id), JSON.stringify(stored));
}

export function loadReadingLocal(id: string): StoredReading | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(keyOf(id));

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredReading;
  } catch {
    return null;
  }
}