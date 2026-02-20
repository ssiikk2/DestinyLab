import crypto from "crypto";
import type {
  CompatibilityReading,
  DestinyReading,
  CompatibilitySectionKey,
  DestinySectionKey,
} from "@/lib/types";

function seededNumber(input: string, min: number, max: number): number {
  const hash = crypto.createHash("sha256").update(input).digest("hex");
  const value = parseInt(hash.slice(0, 8), 16);

  return min + (value % (max - min + 1));
}

function zodiacOf(dateIso: string): string {
  const date = new Date(dateIso);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

export function buildCompatibilityFallback(
  birthDateA: string,
  birthDateB: string,
): CompatibilityReading {
  const seed = `${birthDateA}:${birthDateB}`;
  const signA = zodiacOf(birthDateA);
  const signB = zodiacOf(birthDateB);
  const score = seededNumber(seed, 58, 96);

  const sections: Record<CompatibilitySectionKey, string> = {
    emotional: `${signA} brings emotional intensity while ${signB} adds perspective. Your best moments happen when one shares openly and the other listens without fixing everything. Weekly check-ins keep trust high and prevent silent assumptions.`,
    communication: `You both respond well to direct but gentle wording. Keep messages simple during stressful days and avoid interpreting short texts as rejection. If a topic matters, move from chat to a real conversation quickly.`,
    "long-term": `This pairing is strongest when goals are visible: savings target, travel plan, and a shared timeline. Small rituals such as a monthly review make the relationship feel stable and progressive.`,
    conflict: `Arguments usually come from timing, not values. Pause for twenty minutes before reacting, then return with one clear point each. Focus on the current issue instead of collecting past examples.`,
    advice: `Protect your momentum by celebrating tiny wins. Give compliments in public, discuss hard topics in private, and leave room for each person to keep independent interests.`,
  };

  return {
    kind: "compatibility",
    score,
    title: `${signA} + ${signB} Compatibility Reading`,
    summary:
      "A practical, entertainment-focused reading based on your birth date dynamics.",
    sections,
    highlights: [
      "Strong potential for emotional growth",
      "Communication improves with clear timing",
      "Shared planning increases long-term harmony",
    ],
    dos: [
      "Schedule one focused conversation per week",
      "Define one shared monthly goal",
      "Name needs directly instead of hinting",
    ],
    donts: [
      "Do not reopen solved arguments",
      "Do not rely on text for serious topics",
      "Do not compare your pace with other couples",
    ],
    birthDateA,
    birthDateB,
  };
}

export function buildDestinyFallback(birthDate: string): DestinyReading {
  const sign = zodiacOf(birthDate);

  const sections: Record<DestinySectionKey, string> = {
    "personality-core": `${sign} energy in your chart points to a builder mindset. You gain confidence from progress and become most magnetic when your day has structure and clear purpose.`,
    "love-style": `You love with loyalty and visible effort. You prefer consistency over drama and respond best to partners who communicate expectations early.`,
    "money-pattern": `Your money pattern improves when cash flow is automated. You do well with simple systems: fixed savings rate, focused spending categories, and low-friction investing habits.`,
    "career-strength": `Career growth comes from reliability plus pattern recognition. You spot what can be optimized and often become the person others trust to stabilize complex projects.`,
    "hidden-talent": `Your hidden talent is translating chaos into action. In teams, you can convert abstract ideas into practical plans without losing creative intent.`,
    weakness: `Your main weakness is overcommitting when motivated. Protect energy by limiting active priorities and using weekly review blocks to reset boundaries.`,
  };

  return {
    kind: "destiny",
    title: `${sign} Destiny Reading`,
    summary:
      "An entertainment-focused personal profile shaped around your birth date rhythm.",
    sections,
    highlights: [
      "You are strongest with clear systems",
      "Consistency multiplies your outcomes",
      "Boundary management unlocks better results",
    ],
    dos: [
      "Use one planning method for 90 days",
      "Protect deep-work hours",
      "Track one growth metric every week",
    ],
    donts: [
      "Do not chase too many goals at once",
      "Do not ignore rest cycles",
      "Do not delay difficult conversations",
    ],
    birthDate,
  };
}
