import { InternalLinkEngine } from "@/components/InternalLinkEngine";

export type CompatibilityInsightType =
  | "love"
  | "name"
  | "initials"
  | "crush"
  | "friendship"
  | "zodiac"
  | "birthday"
  | "destiny";

interface CompatibilityInsightProps {
  score: number;
  type: CompatibilityInsightType;
}

interface InsightProfile {
  title: string;
  bond: string;
  communication: string;
  friction: string;
  growth: string;
  horizon: string;
}

const PROFILES: Record<CompatibilityInsightType, InsightProfile> = {
  love: {
    title: "Love compatibility insight",
    bond: "romantic pull, emotional safety, and daily warmth",
    communication: "honest timing, respectful tone, and clear follow-through",
    friction: "mixed expectations, delayed replies, and unspoken pressure",
    growth: "micro-rituals that make both people feel chosen every week",
    horizon: "building a relationship that stays calm during normal life stress",
  },
  name: {
    title: "Name compatibility insight",
    bond: "identity resonance, first impressions, and social chemistry",
    communication: "how names shape confidence, openness, and response style",
    friction: "misread intent, style differences, and overthinking short messages",
    growth: "consistent language that lowers defensiveness and keeps talks useful",
    horizon: "steady trust through familiar, low-drama communication habits",
  },
  initials: {
    title: "Initials compatibility insight",
    bond: "quick attraction signals, playful energy, and shared curiosity",
    communication: "short-form expression, pace matching, and fast clarification",
    friction: "snap judgments, mismatched pacing, and assumptions under stress",
    growth: "turning brief interactions into clear agreements and repeat routines",
    horizon: "moving from fun momentum to reliable day-to-day compatibility",
  },
  crush: {
    title: "Crush compatibility insight",
    bond: "anticipation, emotional excitement, and early-stage attraction",
    communication: "light flirting balanced with direct intention",
    friction: "uncertain signals, idealization, and fear of clear questions",
    growth: "small brave actions that replace guessing with real information",
    horizon: "deciding whether this connection can hold beyond first excitement",
  },
  friendship: {
    title: "Friendship compatibility insight",
    bond: "trust, loyalty, and shared emotional recovery after hard weeks",
    communication: "reliable check-ins, direct boundaries, and low-pressure honesty",
    friction: "uneven effort, unclear plans, and unresolved disappointment",
    growth: "friendship rituals that keep support practical and reciprocal",
    horizon: "long-lasting connection with fewer misunderstandings and cleaner repair",
  },
  zodiac: {
    title: "Zodiac compatibility insight",
    bond: "temperament alignment, energy rhythm, and emotional pacing",
    communication: "style contrasts translated into practical conversation habits",
    friction: "fixed patterns, reactive tone, and mismatched recovery speed",
    growth: "shared structure that protects connection when personalities clash",
    horizon: "using sign patterns as a tool, not a label, for better choices",
  },
  birthday: {
    title: "Birthday compatibility insight",
    bond: "life-stage fit, routine alignment, and emotional timing",
    communication: "expectation setting around pace, goals, and personal bandwidth",
    friction: "calendar pressure, future-planning mismatch, and energy imbalances",
    growth: "weekly planning habits that keep both people informed and supported",
    horizon: "stronger long-term rhythm through realistic planning and review",
  },
  destiny: {
    title: "Destiny insight",
    bond: "self-awareness, values clarity, and relationship readiness",
    communication: "how you express needs, boundaries, and emotional limits",
    friction: "overcommitment, uneven focus, and delayed self-correction",
    growth: "personal routines that make love and life decisions cleaner",
    horizon: "sustainable momentum by matching ambition with recovery and structure",
  },
};

function tier(score: number): "low" | "mid" | "high" {
  if (score < 60) {
    return "low";
  }

  if (score < 80) {
    return "mid";
  }

  return "high";
}

function buildTierLine(score: number, tierKey: "low" | "mid" | "high"): string {
  if (tierKey === "high") {
    return `A ${score}/100 score reflects strong alignment with real long-term potential when consistency stays high.`;
  }

  if (tierKey === "mid") {
    return `A ${score}/100 score signals workable chemistry that improves quickly when habits become clearer.`;
  }

  return `A ${score}/100 score points to meaningful friction, but it can improve with direct effort and cleaner boundaries.`;
}

function buildParagraphs(profile: InsightProfile, score: number): string[] {
  const tierKey = tier(score);
  const tone =
    tierKey === "high"
      ? "optimistic and grounded"
      : tierKey === "mid"
        ? "curious and practical"
        : "honest and supportive";
  const conflictPriority =
    tierKey === "high"
      ? "protecting momentum before stress grows"
      : tierKey === "mid"
        ? "repairing small misses before they become patterns"
        : "stabilizing the connection before adding new goals";
  const cadence =
    tierKey === "high"
      ? "monthly reviews and weekly tune-ups"
      : tierKey === "mid"
        ? "weekly reviews with one measurable behavior change"
        : "short check-ins every two to three days";

  return [
    `${buildTierLine(score, tierKey)} This section reads your result with an ${tone} emotional tone, focusing on ${profile.bond}. Instead of treating compatibility as a fixed label, treat it as a behavior pattern that can shift with better choices. Strong pairs still drift when daily habits go unattended, and lower scores can improve when two people stop guessing and start communicating in specific language. The practical goal is to replace emotional noise with repeat actions that make both people feel secure and respected.`,
    `${profile.communication} matters more than any headline score because communication quality determines how often misunderstandings become conflict. Start by choosing one reliable format for important talks, such as a short voice call or an intentional in-person check-in, and avoid discussing high-pressure issues through fragmented texts. Confirm what you heard before arguing your point. That single habit lowers defensiveness and keeps conversations productive. When people feel heard early, they are more willing to cooperate, compromise, and respond with emotional maturity instead of reaction.`,
    `${profile.friction} should be managed with a clear sequence: pause, clarify, decide, and review. Your immediate priority is ${conflictPriority}. That means identifying the one recurring trigger that drains energy and fixing it first rather than trying to solve everything at once. Keep conflict rules simple: no piling on old issues, no sarcasm during tense moments, and no delayed punishment through silence. Healthy compatibility grows when both people can repair quickly after friction and return to normal warmth without replaying the same argument cycle.`,
    `${profile.growth} becomes real when you track outcomes, not promises. Set a shared cadence of ${cadence} and document one behavior each person will improve. Examples include clearer response windows, fewer mixed signals, or better planning around stressful days. Progress should feel visible within two weeks if the plan is realistic. If nothing changes, narrow the plan further and remove complexity. Relationship quality improves fastest when each person owns one concrete adjustment and follows through consistently without waiting for perfect conditions.`,
    `Your long-view focus is ${profile.horizon}. Keep expectations realistic and avoid all-or-nothing thinking. High scores still need maintenance, mid scores need structure, and lower scores need calm recovery systems before romance can thrive. Use this result as a decision tool: keep what works, replace what repeatedly harms trust, and review your pattern honestly after each tough week. Compatibility is most durable when emotional care, direct communication, and accountability are practiced as habits rather than discussed as ideals.`,
  ];
}

export function CompatibilityInsight({ score, type }: CompatibilityInsightProps) {
  const profile = PROFILES[type];
  const tierKey = tier(score);
  const badge =
    tierKey === "high"
      ? "High alignment"
      : tierKey === "mid"
        ? "Growth alignment"
        : "Repair alignment";
  const paragraphs = buildParagraphs(profile, score);

  return (
    <section className="premium-card p-6 fade-up">
      <div className="flex flex-wrap items-center gap-2">
        <p className="label-caps">Insight report</p>
        <span className="rounded-full border border-border-soft bg-white px-3 py-1 text-xs font-semibold text-text-main">
          {badge}
        </span>
      </div>
      <h3 className="mt-2 text-2xl font-semibold text-text-main">{profile.title}</h3>
      <div className="mt-3 space-y-4 text-sm leading-7 text-text-muted">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-5">
        <InternalLinkEngine score={score} />
      </div>
    </section>
  );
}
