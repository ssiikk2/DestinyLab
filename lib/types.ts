export type CompatibilitySectionKey =
  | "emotional"
  | "communication"
  | "long-term"
  | "conflict"
  | "advice";

export type DestinySectionKey =
  | "personality-core"
  | "love-style"
  | "money-pattern"
  | "career-strength"
  | "hidden-talent"
  | "weakness";

export interface CompatibilityReading {
  kind: "compatibility";
  score: number;
  title: string;
  summary: string;
  sections: Record<CompatibilitySectionKey, string>;
  highlights: string[];
  dos: string[];
  donts: string[];
  birthDateA: string;
  birthDateB: string;
}

export interface DestinyReading {
  kind: "destiny";
  title: string;
  summary: string;
  sections: Record<DestinySectionKey, string>;
  highlights: string[];
  dos: string[];
  donts: string[];
  birthDate: string;
}

export type ReadingData = CompatibilityReading | DestinyReading;

export interface StoredReading {
  id: string;
  createdAt: string;
  expiresAt: number;
  data: ReadingData;
}