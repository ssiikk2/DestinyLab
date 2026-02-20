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
    emotional:
      `${signA} tends to lead with intensity while ${signB} often stabilizes the tone. You will feel closest when both people say what they need early, not after frustration builds. Short weekly check-ins keep trust from drifting.`,
    communication:
      "This match works best with direct wording and fast clarification. Text is fine for logistics, but important topics should move to voice or in-person quickly. Most friction here comes from timing, not intent.",
    "long-term":
      "You gain momentum when priorities are visible. Shared plans around time, money, and routines reduce noise. A quick monthly review helps you stay aligned without over-managing each other.",
    conflict:
      "When pressure rises, pause first and return with one clear point each. Keep discussions on the current issue and avoid stacking old examples. Repair is usually easier when both sides summarize before defending.",
    advice:
      "Keep the relationship simple: one weekly reset, one shared goal, one habit to improve. Ask directly, praise specifically, and leave room for individual space.",
  };

  return {
    kind: "compatibility",
    score,
    title: `${signA} + ${signB} Compatibility Reading`,
    summary: "A quick compatibility read with practical sections you can use right away.",
    sections,
    highlights: [
      "Chemistry is strong when timing is clear",
      "Communication quality will decide the pace",
      "Shared routines create long-term stability",
    ],
    dos: [
      "Schedule one honest check-in each week",
      "Name needs in plain language",
      "Review one shared goal every month",
    ],
    donts: [
      "Do not turn serious topics into text threads",
      "Do not reopen solved conflicts",
      "Do not assume silence means agreement",
    ],
    birthDateA,
    birthDateB,
  };
}

export function buildDestinyFallback(birthDate: string): DestinyReading {
  const sign = zodiacOf(birthDate);

  const sections: Record<DestinySectionKey, string> = {
    "personality-core":
      `${sign} energy here points to a practical builder mindset. You feel best when priorities are clear and progress is visible. Structure gives you confidence, and consistency multiplies your results.`,
    "love-style":
      "You value direct care over drama. Reliability matters more than grand gestures, and mixed signals drain you quickly. Relationships improve when expectations are explicit from the start.",
    "money-pattern":
      "Simple systems suit you best: automatic savings, clear spending lanes, and regular reviews. You tend to do better with boring consistency than high-risk bursts.",
    "career-strength":
      "Your edge is dependable execution with sharp pattern recognition. You often spot what is inefficient and know how to make it cleaner without unnecessary complexity.",
    "hidden-talent":
      "You are good at turning messy ideas into usable plans. In teams, this makes you a stabilizer when others are stuck between possibilities.",
    weakness:
      "Overcommitting is the pattern to watch. Protecting your energy and narrowing active priorities helps you sustain quality without burnout.",
  };

  return {
    kind: "destiny",
    title: `${sign} Destiny Reading`,
    summary: "A practical profile focused on strengths, pressure points, and next steps.",
    sections,
    highlights: [
      "Your best output comes from clear structure",
      "Consistency beats intensity for your profile",
      "Boundaries protect your long-term momentum",
    ],
    dos: [
      "Keep your weekly plan short and realistic",
      "Protect one deep-focus block each day",
      "Review progress before adding new goals",
    ],
    donts: [
      "Do not stack too many priorities at once",
      "Do not ignore recovery time",
      "Do not postpone difficult decisions",
    ],
    birthDate,
  };
}