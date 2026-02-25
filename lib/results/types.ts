export type ResultTestKey =
  | "primary-love"
  | "love-percentage"
  | "true-love"
  | "couple-test"
  | "zodiac"
  | "name"
  | "initials"
  | "crush"
  | "friendship"
  | "birthday"
  | "destiny"
  | "compatibility";

export interface ResultInput {
  testKey: ResultTestKey;
  primary: string;
  secondary?: string;
}

export interface ResultFaqItem {
  question: string;
  answer: string;
}

export interface BaseResultOutput {
  score?: number;
  title?: string;
  summary?: string;
  strengths?: string[];
  watchouts?: string[];
  tips?: string[];
  faq?: ResultFaqItem[];
}

export interface BreakdownCategoryConfig {
  key: string;
  label: string;
  weight: number;
  lowNote: string;
  midNote: string;
  highNote: string;
}

export interface ResultConfig {
  testKey: ResultTestKey;
  displayName: string;
  badgeLabel: string;
  catchphrases: [string, string, string];
  categories: BreakdownCategoryConfig[];
  storyTemplates: {
    low: string[];
    mid: string[];
    high: string[];
  };
  strengthsPool: string[];
  watchoutsPool: string[];
  tipsPool: string[];
  dateIdeasPool: string[];
  conversationPool: string[];
  faqPool: ResultFaqItem[];
}

export interface BreakdownItem {
  key: string;
  label: string;
  score: number;
  note: string;
}

export interface ResultHeader {
  score: number;
  grade: string;
  badge: string;
  catchphrase: string;
  title: string;
  summary: string;
}

export interface ResultReportData {
  testKey: ResultTestKey;
  input: ResultInput;
  header: ResultHeader;
  breakdown: BreakdownItem[];
  story: string[];
  strengths: string[];
  watchouts: string[];
  tips: string[];
  dateIdeas: string[];
  conversationStarters: string[];
  faq: ResultFaqItem[];
}
