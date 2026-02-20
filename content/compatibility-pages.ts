export interface CompatibilityPairPage {
  slug: string;
  signA: string;
  signB: string;
  intro: string;
  strengths: string[];
  watchouts: string[];
}

const pairList: Array<[string, string]> = [
  ["aries", "scorpio"],
  ["taurus", "libra"],
  ["gemini", "capricorn"],
  ["cancer", "pisces"],
  ["leo", "sagittarius"],
  ["virgo", "aquarius"],
  ["libra", "cancer"],
  ["scorpio", "taurus"],
  ["sagittarius", "gemini"],
  ["capricorn", "virgo"],
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
    intro: `${cap(signA)} and ${cap(signB)} can build strong chemistry when they align communication timing, emotional language, and practical planning. This guide focuses on habits you can test in daily life.`,
    strengths: [
      "High motivation when both people feel seen",
      "Fast growth through explicit expectations",
      "Strong bond potential with consistent conflict repair",
    ],
    watchouts: [
      "Escalation from text-based misunderstandings",
      "Different pacing around commitment decisions",
      "Silent assumptions replacing direct requests",
    ],
  }),
);

export function getPairBySlug(slug: string): CompatibilityPairPage | undefined {
  return compatibilityPairPages.find((pair) => pair.slug === slug);
}