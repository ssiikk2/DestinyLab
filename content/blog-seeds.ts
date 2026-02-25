export interface BlogSeed {
  slug: string;
  title: string;
  keyword: string;
  description: string;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogSection {
  heading: string;
  subheading: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  keyword: string;
  description: string;
  sections: BlogSection[];
  faqs: BlogFAQ[];
}

const seeds: BlogSeed[] = [
  {
    slug: "aries-and-scorpio-compatibility-guide",
    title: "Aries and Scorpio Compatibility Guide for Modern Couples",
    keyword: "aries and scorpio compatibility",
    description:
      "A practical compatibility guide for Aries and Scorpio focused on emotional rhythm, communication, and long-term balance.",
  },
  {
    slug: "taurus-and-libra-love-patterns",
    title: "Taurus and Libra Love Patterns You Can Actually Use",
    keyword: "taurus and libra love patterns",
    description:
      "How Taurus and Libra can align comfort, romance, and decision-making without overcomplicating daily life.",
  },
  {
    slug: "gemini-and-capricorn-relationship-rules",
    title: "Gemini and Capricorn Relationship Rules That Reduce Friction",
    keyword: "gemini and capricorn relationship",
    description:
      "Build a stronger Gemini-Capricorn connection with practical rules for trust, planning, and conflict recovery.",
  },
  {
    slug: "cancer-and-pisces-emotional-compatibility",
    title: "Cancer and Pisces Emotional Compatibility Deep Dive",
    keyword: "cancer and pisces emotional compatibility",
    description:
      "A grounded exploration of emotional safety, affection styles, and boundaries for Cancer and Pisces pairs.",
  },
  {
    slug: "leo-and-sagittarius-passion-balance",
    title: "Leo and Sagittarius: Passion Without Burnout",
    keyword: "leo and sagittarius compatibility",
    description:
      "Learn how Leo and Sagittarius can keep passion high while preserving stability and long-term direction.",
  },
  {
    slug: "virgo-and-aquarius-communication-habits",
    title: "Virgo and Aquarius Communication Habits That Work",
    keyword: "virgo and aquarius communication",
    description:
      "Communication systems Virgo and Aquarius can use to avoid mixed signals and maintain momentum.",
  },
  {
    slug: "libra-and-cancer-dating-framework",
    title: "Libra and Cancer Dating Framework for Lasting Trust",
    keyword: "libra and cancer dating",
    description:
      "A practical framework for Libra and Cancer couples to align needs, values, and pacing.",
  },
  {
    slug: "scorpio-and-taurus-conflict-repair",
    title: "Scorpio and Taurus Conflict Repair Playbook",
    keyword: "scorpio and taurus conflict repair",
    description:
      "Step-by-step conflict repair methods for intense Scorpio-Taurus relationship moments.",
  },
  {
    slug: "sagittarius-and-gemini-long-term-match",
    title: "Sagittarius and Gemini Long-Term Match Blueprint",
    keyword: "sagittarius and gemini long term compatibility",
    description:
      "A realistic blueprint for sustaining curiosity, commitment, and growth for Sagittarius and Gemini.",
  },
  {
    slug: "capricorn-and-virgo-money-dynamics",
    title: "Capricorn and Virgo Money Dynamics in Relationships",
    keyword: "capricorn and virgo money compatibility",
    description:
      "How Capricorn and Virgo can reduce financial stress and build predictable progress together.",
  },
  {
    slug: "aquarius-and-aries-romance-energy",
    title: "Aquarius and Aries Romance Energy: What to Expect",
    keyword: "aquarius and aries romance",
    description:
      "Discover how Aquarius and Aries can channel high energy into stable emotional connection.",
  },
  {
    slug: "pisces-and-leo-boundary-guide",
    title: "Pisces and Leo Boundary Guide for Emotional Clarity",
    keyword: "pisces and leo relationship boundaries",
    description:
      "A boundary-first guide to reduce misinterpretation and strengthen trust between Pisces and Leo.",
  },
  {
    slug: "destiny-reading-birth-date-basics",
    title: "Destiny Reading Birth Date Basics for Beginners",
    keyword: "destiny reading by birth date",
    description:
      "Understand what birth-date based destiny readings can reveal and how to use them responsibly.",
  },
  {
    slug: "daily-habits-to-improve-compatibility",
    title: "Daily Habits to Improve Compatibility in Any Pair",
    keyword: "how to improve compatibility",
    description:
      "Simple daily habits that increase emotional safety, communication quality, and long-term alignment.",
  },
  {
    slug: "sign-compatibility-vs-real-life",
    title: "Sign Compatibility vs Real-Life Relationship Skills",
    keyword: "sign compatibility meaning",
    description:
      "What zodiac compatibility can teach you and where practical relationship skills matter more.",
  },
  {
    slug: "best-questions-after-compatibility-score",
    title: "Best Questions to Ask After You Get a Compatibility Score",
    keyword: "compatibility score interpretation",
    description:
      "Use this question framework to turn a compatibility score into useful relationship actions.",
  },
  {
    slug: "how-to-share-reading-results-social",
    title: "How to Share Reading Results on Social Without Cringe",
    keyword: "share compatibility results",
    description:
      "A practical social-sharing guide that keeps your reading results fun and respectful.",
  },
  {
    slug: "when-compatibility-talks-repeat",
    title: "When Compatibility Talks Repeat: How to Reset the Conversation",
    keyword: "stuck compatibility conversations",
    description:
      "A practical guide for couples who keep repeating the same argument after checking compatibility results.",
  },
  {
    slug: "cookie-consent-and-adsense-basics",
    title: "Cookie Consent and AdSense Basics for Reading Sites",
    keyword: "adsense policy for astrology site",
    description:
      "A practical compliance checklist for cookie banners, disclaimers, and ad placement.",
  },
  {
    slug: "reconnect-after-a-distant-week",
    title: "How to Reconnect After a Distant Week",
    keyword: "reconnect in relationship",
    description:
      "Simple steps to rebuild warmth and communication after a week that felt cold or disconnected.",
  },
];

function pickVariant(seed: string, variants: string[]): string {
  const index =
    Math.abs(seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)) %
    variants.length;
  return variants[index];
}

function createParagraph(keyword: string, angle: string, action: string): string {
  const opener = pickVariant(keyword + angle, [
    `Use ${keyword} as a lens, not a verdict.`,
    `${keyword} is most useful when it guides decisions, not ego.`,
    `Treat ${keyword} like a pattern check, not a fixed label.`,
  ]);

  const bridge = pickVariant(keyword + action, [
    "The point is not prediction. The point is cleaner decisions.",
    "This works when insight becomes behavior in real life.",
    "You get value only when interpretation turns into a weekly habit.",
  ]);

  const closer = pickVariant(angle + action, [
    "If results feel mixed, narrow the focus to one repeatable behavior for two weeks and review together.",
    "Progress tends to compound when both people run short feedback loops instead of one-off emotional talks.",
    "Keep it practical: one action, one review window, one adjustment. Then repeat.",
  ]);

  return `${opener} ${angle}. ${bridge} ${action} Most friction in couples comes from fuzzy expectations, vague timing, and assumptions made under stress. Strong pairs remove that noise with clear asks, short check-ins, and simple rules for conflict recovery. ${closer}`;
}

function buildFaqs(keyword: string): BlogFAQ[] {
  return [
    {
      question: `How accurate is ${keyword}?`,
      answer:
        "Think of it as a reflection tool. It gets more useful when paired with direct communication and specific actions.",
    },
    {
      question: "Can a low score still lead to a healthy relationship?",
      answer:
        "Yes. A lower score usually points to pressure zones. Good habits and clear expectations can change the outcome.",
    },
    {
      question: "How often should we generate a new reading?",
      answer:
        "Monthly is enough for most couples, or after a major life shift. The real value is what you do next.",
    },
    {
      question: "What should we do first after reading the report?",
      answer:
        "Pick one action to start and one habit to stop. Review in a week and adjust based on what actually happened.",
    },
    {
      question: "Are destiny readings a substitute for professional advice?",
      answer:
        "No. Readings are for entertainment and reflection. They should not replace medical, legal, or financial advice.",
    },
    {
      question: "How can this content help with long-term planning?",
      answer:
        "Use it to identify communication patterns, conflict triggers, and priorities, then convert those into weekly routines.",
    },
  ];
}

function buildSections(seed: BlogSeed): BlogSection[] {
  return [
    {
      heading: "What This Reading Actually Measures",
      subheading: "Signal over noise",
      paragraphs: [
        createParagraph(
          seed.keyword,
          "It highlights emotional pacing, communication clarity, and conflict style",
          "Start by identifying one high-friction pattern and one easy-win behavior.",
        ),
        createParagraph(
          seed.keyword,
          "A useful reading separates temporary mood swings from stable behavioral patterns",
          "Document recurring moments in a shared note so both people see the same story.",
        ),
      ],
    },
    {
      heading: "Emotional Alignment in Daily Life",
      subheading: "Small rituals that lower stress",
      paragraphs: [
        createParagraph(
          seed.keyword,
          "Emotional alignment grows through predictable check-ins and explicit reassurance",
          "Use a weekly ten-minute conversation to confirm needs and expectations.",
        ),
        createParagraph(
          seed.keyword,
          "Most disconnect comes from assumptions, not from incompatible values",
          "When tension rises, ask for clarification before interpreting tone.",
        ),
      ],
    },
    {
      heading: "Communication Frameworks That Scale",
      subheading: "From reactive chats to clear agreements",
      paragraphs: [
        createParagraph(
          seed.keyword,
          "Communication quality improves when timing and format are intentional",
          "Handle high-stakes topics by voice or in person instead of fragmented text.",
        ),
        createParagraph(
          seed.keyword,
          "A stable communication framework reduces repeated misunderstandings",
          "Define a shared rule for pauses, restarts, and final decisions.",
        ),
      ],
    },
    {
      heading: "Long-Term Planning Without Pressure",
      subheading: "Structure without rigidity",
      paragraphs: [
        createParagraph(
          seed.keyword,
          "Long-term stability comes from visible priorities and realistic pacing",
          "Set one ninety-day goal that supports both people equally.",
        ),
        createParagraph(
          seed.keyword,
          "Healthy pairs review progress instead of assuming progress",
          "Use monthly retro questions: what worked, what drained energy, what to change.",
        ),
      ],
    },
    {
      heading: "Conflict Recovery and Trust Rebuild",
      subheading: "Repair speed beats perfect wording",
      paragraphs: [
        createParagraph(
          seed.keyword,
          "Conflict becomes productive when each person names impact before intent",
          "After disagreement, summarize the other side before defending your position.",
        ),
        createParagraph(
          seed.keyword,
          "Trust rebuilds through consistency, not one perfect conversation",
          "Track one repair habit for thirty days and evaluate outcomes honestly.",
        ),
      ],
    },
    {
      heading: "Action Plan for the Next 30 Days",
      subheading: "Turn insight into routine",
      paragraphs: [
        createParagraph(
          seed.keyword,
          "Results improve when goals are observable and reviewable",
          "Pick one communication habit, one boundary habit, and one appreciation habit.",
        ),
        createParagraph(
          seed.keyword,
          "Momentum is built through repetition and fast feedback loops",
          "Re-run your reading after thirty days and compare what changed in practice.",
        ),
      ],
    },
  ];
}

export const blogSeeds = seeds;

export const blogPosts: BlogPost[] = seeds.map((seed) => ({
  ...seed,
  sections: buildSections(seed),
  faqs: buildFaqs(seed.keyword),
}));

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

