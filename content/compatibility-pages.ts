export interface CompatibilityPairPage {
  slug: string;
  signA: string;
  signB: string;
  intro: string;
  strengths: string[];
  watchouts: string[];
  lastUpdated: string;
}

const pairList: Array<[string, string]> = [
  ["aries", "scorpio"],
  ["taurus", "libra"],
  ["gemini", "capricorn"],
  ["cancer", "pisces"],
  ["cancer", "libra"],
  ["leo", "sagittarius"],
  ["leo", "aries"],
  ["virgo", "aquarius"],
  ["libra", "cancer"],
  ["scorpio", "taurus"],
  ["scorpio", "pisces"],
  ["sagittarius", "gemini"],
  ["capricorn", "virgo"],
  ["taurus", "capricorn"],
  ["aquarius", "aries"],
  ["pisces", "leo"],
];

function cap(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const compatibilityPairPages: CompatibilityPairPage[] = pairList.map(
  ([signA, signB]) => ({
    slug: `${signA}-and-${signB}`,
    signA: cap(signA),
    signB: cap(signB),
    intro: `${cap(signA)} and ${cap(signB)} often click when both people keep communication direct and timing intentional. This page focuses on practical dynamics, not vague labels.`,
    strengths: [
      "Mutual momentum when goals are clear",
      "Good upside when feedback stays honest",
      "High growth potential through small routines",
    ],
    watchouts: [
      "Assumptions made through short text messages",
      "Different decision speed under pressure",
      "Letting unresolved tension carry into new issues",
    ],
    lastUpdated: "2026-02-26",
  }),
);

export function getPairBySlug(slug: string): CompatibilityPairPage | undefined {
  return compatibilityPairPages.find((pair) => pair.slug === slug);
}
