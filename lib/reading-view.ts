import type {
  CompatibilityReading,
  DestinyReading,
  ReadingData,
  CompatibilitySectionKey,
  DestinySectionKey,
} from "@/lib/types";

export const compatibilityTabs: Array<{ key: CompatibilitySectionKey; label: string }> = [
  { key: "emotional", label: "Emotional" },
  { key: "communication", label: "Communication" },
  { key: "long-term", label: "Long-Term" },
  { key: "conflict", label: "Conflict" },
  { key: "advice", label: "Advice" },
];

export const destinyTabs: Array<{ key: DestinySectionKey; label: string }> = [
  { key: "personality-core", label: "Personality Core" },
  { key: "love-style", label: "Love Style" },
  { key: "money-pattern", label: "Money Pattern" },
  { key: "career-strength", label: "Career Strength" },
  { key: "hidden-talent", label: "Hidden Talent" },
  { key: "weakness", label: "Weakness" },
];

export function getDefaultSection(data: ReadingData): string {
  if (data.kind === "compatibility") {
    return compatibilityTabs[0].key;
  }

  return destinyTabs[0].key;
}

export function getSectionText(data: ReadingData, section: string): string | null {
  if (data.kind === "compatibility") {
    const key = section as CompatibilitySectionKey;
    return data.sections[key] || null;
  }

  const key = section as DestinySectionKey;
  return data.sections[key] || null;
}

export function getTabs(data: CompatibilityReading | DestinyReading) {
  return data.kind === "compatibility" ? compatibilityTabs : destinyTabs;
}