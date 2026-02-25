import type { InternalLinkItem } from "@/components/InternalLinks";
import type { CalculatorMode } from "@/lib/test-themes";

export interface LandingFaq {
  question: string;
  answer: string;
}

export interface LandingSection {
  heading: string;
  paragraphs: string[];
}

export interface LandingBreadcrumb {
  name: string;
  path: string;
}

export interface LandingPageRecord {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: LandingSection[];
  faqs: LandingFaq[];
  relatedLinks: InternalLinkItem[];
  ctaLabel: string;
  ctaHref: string;
  calculatorMode?: CalculatorMode;
  includeWebApplication?: boolean;
  breadcrumbs: LandingBreadcrumb[];
  lastUpdated: string;
}

const LAST_UPDATED = "2026-02-24";

const linkCatalog: Record<string, InternalLinkItem> = {
  calculator: {
    href: "/calculator",
    title: "Love Compatibility Calculator",
    keyword: "love calculator",
    description: "Run the main relationship score and read practical interpretation notes.",
  },
  destiny: {
    href: "/destiny",
    title: "Destiny Calculator",
    keyword: "destiny test",
    description: "Review solo relationship rhythm and weekly behavior patterns.",
  },
  nameCompatibility: {
    href: "/name-compatibility",
    title: "Name Compatibility",
    keyword: "name match",
    description: "Compare communication style and emotional pacing through name-based prompts.",
  },
  zodiacCompatibility: {
    href: "/zodiac-compatibility",
    title: "Zodiac Compatibility",
    keyword: "zodiac match",
    description: "Check sign dynamics with strengths, risk patterns, and practical tips.",
  },
  lovePercentage: {
    href: "/love-percentage",
    title: "Love Percentage Calculator",
    keyword: "love percentage",
    description: "Use a quick percentage score as a prompt for better conversations.",
  },
  trueLoveTest: {
    href: "/true-love-test",
    title: "True Love Test",
    keyword: "true love test",
    description: "Evaluate long-term consistency, trust, and conflict repair habits.",
  },
  crushCalculator: {
    href: "/crush-calculator",
    title: "Crush Calculator",
    keyword: "crush score",
    description: "Use early-stage attraction prompts without overcommitting too quickly.",
  },
  birthdayCompatibility: {
    href: "/birthday-compatibility",
    title: "Birthday Compatibility",
    keyword: "birthday match",
    description: "Compare rhythm timing and lifestyle cadence with date-based input.",
  },
  initialsLoveTest: {
    href: "/initials-love-test",
    title: "Initials Love Test",
    keyword: "initials test",
    description: "Run a lightweight initials check and connect it to real behavior signals.",
  },
  coupleTest: {
    href: "/couple-test",
    title: "Couple Test",
    keyword: "couple test",
    description: "Audit communication quality, repair speed, and long-term decision flow.",
  },
  tests: {
    href: "/tests",
    title: "All Compatibility Tests",
    keyword: "tools hub",
    description: "Browse all tests and choose the format that matches your question.",
  },
  blog: {
    href: "/blog",
    title: "Compatibility Guides",
    keyword: "guide hub",
    description: "Read long-form practical guides connected to calculator outcomes.",
  },
  howCalculatorsWork: {
    href: "/blog/how-love-calculators-work",
    title: "How Love Calculators Work",
    keyword: "calculator guide",
    description: "Understand the scoring logic, limitations, and interpretation workflow.",
  },
};

function resolveLinks(keys: (keyof typeof linkCatalog)[]): InternalLinkItem[] {
  return keys.map((key) => linkCatalog[key]);
}

export const homeToolsLinks: InternalLinkItem[] = resolveLinks([
  "calculator",
  "destiny",
  "nameCompatibility",
  "zodiacCompatibility",
  "lovePercentage",
  "trueLoveTest",
  "crushCalculator",
  "birthdayCompatibility",
  "initialsLoveTest",
  "coupleTest",
]);

export const homeGuideLinks: InternalLinkItem[] = resolveLinks(["howCalculatorsWork", "blog", "tests"]);

interface LandingSeed {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  focus: string;
  behavior: string;
  risk: string;
  action: string;
  longTerm: string;
  calculatorMode?: CalculatorMode;
  includeWebApplication?: boolean;
  ctaLabel: string;
  ctaHref: string;
  breadcrumbs: LandingBreadcrumb[];
  relatedKeys: (keyof typeof linkCatalog)[];
  faqs: LandingFaq[];
}

function makeSections(seed: LandingSeed): LandingSection[] {
  return [
    {
      heading: "How to read this page",
      paragraphs: [
        `${seed.focus} should be treated as a reflection signal, not a fixed prediction. Use the result to spot strengths, repeated tension, and the next conversation. The score is a planning aid, not a verdict.`,
        `The strongest outcome appears when ${seed.behavior}. That habit turns symbolic output into practical change and keeps interpretation grounded in real behavior.`,
      ],
    },
    {
      heading: "Common mistakes and practical fixes",
      paragraphs: [
        `A frequent issue is ${seed.risk}. When this happens, interpretation gets emotional and inconsistent. The fastest fix is one measurable habit and a retest date.`,
        `Use this sequence after every test: run the score, note one strength, define one boundary, and schedule one follow-up conversation. ${seed.action}`,
      ],
    },
    {
      heading: "Building steady clarity over time",
      paragraphs: [
        `People come back to these tools for perspective, not just a number. Keep notes short and compare trends monthly. If the same pressure point appears across tools, focus there first.`,
        `${seed.longTerm} This page is for entertainment purposes and works best with direct communication and realistic expectations.`,
      ],
    },
  ];
}

function makeRecord(seed: LandingSeed): LandingPageRecord {
  return {
    path: seed.path,
    title: seed.title,
    description: seed.description,
    h1: seed.h1,
    intro: seed.intro,
    sections: makeSections(seed),
    faqs: seed.faqs,
    relatedLinks: resolveLinks(seed.relatedKeys),
    ctaLabel: seed.ctaLabel,
    ctaHref: seed.ctaHref,
    calculatorMode: seed.calculatorMode,
    includeWebApplication: seed.includeWebApplication,
    breadcrumbs: seed.breadcrumbs,
    lastUpdated: LAST_UPDATED,
  };
}

const landingSeeds: LandingSeed[] = [
  {
    path: "/calculator",
    title: "Love Compatibility Calculator: Meaningful Score Reading for Real Couples",
    description:
      "Use the love compatibility calculator to check chemistry, communication rhythm, and practical next-step actions.",
    h1: "Love Compatibility Calculator",
    intro:
      "This page is built for users who want practical interpretation, not just a score. Run the calculator, then translate the output into one concrete weekly behavior change.",
    focus:
      "the love compatibility score",
    behavior:
      "both partners review one communication habit and one timing habit before making conclusions",
    risk:
      "assuming high chemistry automatically means long-term stability",
    action:
      "That sequence keeps each result actionable and prevents repeated conflict loops.",
    longTerm:
      "Over time, this creates a cleaner data trail for relationship decisions and improves confidence in what is actually changing.",
    calculatorMode: "love",
    includeWebApplication: true,
    ctaLabel: "Run the compatibility score now",
    ctaHref: "#calculator-form",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Calculator", path: "/calculator" },
    ],
    relatedKeys: [
      "destiny",
      "nameCompatibility",
      "zodiacCompatibility",
      "lovePercentage",
      "trueLoveTest",
      "crushCalculator",
      "birthdayCompatibility",
      "howCalculatorsWork",
    ],
    faqs: [
      {
        question: "How often should we use the main calculator?",
        answer: "A monthly cadence works well, or immediately after a major behavior change.",
      },
      {
        question: "Does a high score guarantee relationship success?",
        answer: "No. Stability still depends on clear communication, boundaries, and repair habits.",
      },
      {
        question: "What should we do after a low result?",
        answer: "Select one measurable communication action and retest after two to four weeks.",
      },
      {
        question: "Can long-distance couples use this format?",
        answer: "Yes. It is especially useful for evaluating response timing and planning consistency.",
      },
      {
        question: "Is this page giving professional counseling?",
        answer: "No. It is an entertainment and reflection tool.",
      },
    ],
  },
  {
    path: "/destiny",
    title: "Destiny Calculator for Relationship Reflection and Personal Timing",
    description:
      "Run a destiny calculator reading to review personal rhythm, emotional pacing, and practical relationship actions.",
    h1: "Destiny Calculator",
    intro:
      "Destiny reflection works best before couple-level decisions. This page helps users evaluate personal patterns that affect communication quality and emotional consistency.",
    focus:
      "the destiny result",
    behavior:
      "you compare your score to real routines like sleep, stress load, and response discipline",
    risk:
      "treating destiny output like future certainty instead of present-behavior feedback",
    action:
      "When users do this, they usually reduce emotional reactivity and make clearer decisions.",
    longTerm:
      "A stable solo rhythm often improves every couple tool result because your baseline communication quality rises first.",
    calculatorMode: "destiny",
    includeWebApplication: true,
    ctaLabel: "Run your destiny reading",
    ctaHref: "#calculator-form",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Destiny", path: "/destiny" },
    ],
    relatedKeys: [
      "calculator",
      "coupleTest",
      "lovePercentage",
      "trueLoveTest",
      "nameCompatibility",
      "zodiacCompatibility",
      "blog",
      "howCalculatorsWork",
    ],
    faqs: [
      {
        question: "Does destiny output predict my future?",
        answer: "No. It summarizes current tendencies and is best used for behavior planning.",
      },
      {
        question: "Can I use destiny if I am not in a relationship?",
        answer: "Yes. It helps with self-awareness, pacing, and communication readiness.",
      },
      {
        question: "What is the best follow-up to a destiny score?",
        answer: "Define one small routine change and review whether your daily behavior improved.",
      },
      {
        question: "Why is this useful with other tools?",
        answer: "It isolates personal factors so shared compatibility pages are easier to interpret.",
      },
      {
        question: "Is this page for entertainment purposes?",
        answer: "Yes. It is for entertainment and reflective planning.",
      },
    ],
  },
  {
    path: "/name-compatibility",
    title: "Name Compatibility Test with Communication-Focused Score Guidance",
    description:
      "Use our name compatibility page to compare communication style, pacing, and realistic relationship next steps.",
    h1: "Name Compatibility",
    intro:
      "Name-based matching is a symbolic tool. The practical value comes from how you use the result to improve communication clarity and reduce avoidable misunderstandings.",
    focus:
      "name compatibility output",
    behavior:
      "users convert score interpretation into one direct communication agreement",
    risk:
      "assuming the score alone defines compatibility without behavior evidence",
    action:
      "Short written agreements on timing and expectations can change outcomes faster than repeated testing.",
    longTerm:
      "Using name pages with periodic reviews creates better trend visibility than one-time emotional decisions.",
    calculatorMode: "name",
    includeWebApplication: true,
    ctaLabel: "Check name compatibility now",
    ctaHref: "#calculator-form",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Name Compatibility", path: "/name-compatibility" },
    ],
    relatedKeys: [
      "calculator",
      "lovePercentage",
      "trueLoveTest",
      "initialsLoveTest",
      "crushCalculator",
      "birthdayCompatibility",
      "zodiacCompatibility",
      "howCalculatorsWork",
    ],
    faqs: [
      {
        question: "Is name compatibility scientific?",
        answer: "No. It is symbolic and intended for entertainment-oriented reflection.",
      },
      {
        question: "Should I test nicknames and legal names?",
        answer: "You can test both, then compare which version aligns better with observed behavior.",
      },
      {
        question: "What if name score is lower than expected?",
        answer: "Use it as a prompt to improve communication process before making hard conclusions.",
      },
      {
        question: "Can this help early-stage dating?",
        answer: "Yes. It gives a low-pressure way to start clearer conversations.",
      },
      {
        question: "Is this page for entertainment purposes?",
        answer: "Yes. It is for entertainment and reflection only.",
      },
    ],
  },
  {
    path: "/zodiac-compatibility",
    title: "Zodiac Compatibility Guide with Practical Match Interpretation",
    description:
      "Explore zodiac compatibility with score context, challenge patterns, and actionable relationship habits.",
    h1: "Zodiac Compatibility",
    intro:
      "Zodiac content performs best when it goes beyond labels. This page translates symbolic sign dynamics into behavior-focused interpretation users can actually apply.",
    focus:
      "zodiac compatibility scoring",
    behavior:
      "you translate each sign pattern into real habits like response timing and conflict recovery",
    risk:
      "over-relying on sign labels while ignoring how people actually behave under stress",
    action:
      "When symbolic insight is tied to behavior tracking, users can make practical adjustments quickly.",
    longTerm:
      "Combining zodiac output with other tools usually exposes the same recurring friction point, which helps prioritize the next fix.",
    calculatorMode: "zodiac",
    includeWebApplication: true,
    ctaLabel: "Run zodiac compatibility now",
    ctaHref: "#calculator-form",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Zodiac Compatibility", path: "/zodiac-compatibility" },
    ],
    relatedKeys: [
      "calculator",
      "coupleTest",
      "birthdayCompatibility",
      "nameCompatibility",
      "lovePercentage",
      "trueLoveTest",
      "blog",
      "howCalculatorsWork",
    ],
    faqs: [
      {
        question: "Can zodiac compatibility decide relationship fate?",
        answer: "No. It provides symbolic context, while outcomes depend on behavior and decisions.",
      },
      {
        question: "Why do strong sign matches still argue?",
        answer: "Shared traits can magnify both strengths and stress reactions.",
      },
      {
        question: "How should we apply zodiac results?",
        answer: "Turn one insight into one measurable weekly communication change.",
      },
      {
        question: "Should zodiac output replace direct conversations?",
        answer: "No. Direct communication is always the primary signal.",
      },
      {
        question: "Is this page for entertainment purposes?",
        answer: "Yes. It is for entertainment and practical reflection.",
      },
    ],
  },
  {
    path: "/love-percentage",
    title: "Love Percentage Calculator with Score Context and Practical Follow-Up",
    description:
      "Check your love percentage and learn how to interpret each range with practical relationship actions.",
    h1: "Love Percentage Calculator",
    intro:
      "Percentage tools are fast, but a fast number is only useful when paired with interpretation. This page is built to convert percentage output into practical action.",
    focus:
      "the love percentage",
    behavior:
      "users document one strength and one risk after every result",
    risk:
      "treating the percentage as a final judgment instead of a discussion trigger",
    action:
      "This method keeps users from overreacting and improves the quality of follow-up conversations.",
    longTerm:
      "Over months, percentage tracking becomes useful trend data when paired with consistent behavior notes.",
    calculatorMode: "love",
    includeWebApplication: true,
    ctaLabel: "Calculate your love percentage",
    ctaHref: "#calculator-form",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Love Percentage", path: "/love-percentage" },
    ],
    relatedKeys: [
      "calculator",
      "trueLoveTest",
      "coupleTest",
      "nameCompatibility",
      "initialsLoveTest",
      "crushCalculator",
      "birthdayCompatibility",
      "howCalculatorsWork",
    ],
    faqs: [
      {
        question: "What is a good love percentage?",
        answer: "There is no fixed threshold. Context and behavior matter more than one number.",
      },
      {
        question: "Can a low percentage improve over time?",
        answer: "Yes. Better communication structure often improves relationship quality quickly.",
      },
      {
        question: "Should we retest daily?",
        answer: "No. Monthly or event-based retests produce cleaner trend signals.",
      },
      {
        question: "Can this help long-distance couples?",
        answer: "Yes. It is useful for reviewing pacing and planning discipline.",
      },
      {
        question: "Is this page for entertainment purposes?",
        answer: "Yes. It is for entertainment and self-reflection.",
      },
    ],
  },
  {
    path: "/true-love-test",
    title: "True Love Test: Evaluate Consistency, Trust, and Long-Term Potential",
    description:
      "Take a true love test built around consistency, emotional safety, and practical maintenance habits.",
    h1: "True Love Test",
    intro:
      "True love is clearer in repeated behavior than in isolated emotional moments. This page helps users evaluate consistency and follow-through with a structured score interpretation.",
    focus:
      "the true love score",
    behavior:
      "couples evaluate repair speed, reliability under stress, and consistency after difficult conversations",
    risk:
      "confusing short-term intensity with long-term compatibility",
    action:
      "This keeps the discussion grounded in observable actions instead of fantasy-driven assumptions.",
    longTerm:
      "When users revisit this test monthly, they can see whether trust and execution quality are improving together.",
    calculatorMode: "love",
    includeWebApplication: true,
    ctaLabel: "Start the true love test",
    ctaHref: "#calculator-form",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "True Love Test", path: "/true-love-test" },
    ],
    relatedKeys: [
      "calculator",
      "coupleTest",
      "destiny",
      "lovePercentage",
      "nameCompatibility",
      "zodiacCompatibility",
      "birthdayCompatibility",
      "blog",
    ],
    faqs: [
      {
        question: "Can one test prove true love?",
        answer: "No. Long-term behavior and repeated trust signals are more important than a single score.",
      },
      {
        question: "What is the strongest true-love signal?",
        answer: "Respectful behavior during stress is often the strongest indicator.",
      },
      {
        question: "How should couples use this after conflict?",
        answer: "Define one repair protocol, apply it consistently, then retest after a fixed period.",
      },
      {
        question: "Is this only for new relationships?",
        answer: "No. Long-term couples can use it as a recurring maintenance check.",
      },
      {
        question: "Is this page for entertainment purposes?",
        answer: "Yes. It is for entertainment and reflective planning.",
      },
    ],
  },
  {
    path: "/crush-calculator",
    title: "Crush Calculator: Early Attraction Signals and Communication Readiness",
    description:
      "Use the crush calculator to evaluate early-stage chemistry while staying grounded in clear boundaries.",
    h1: "Crush Calculator",
    intro:
      "Crush dynamics can be emotionally loud and data-light. This page helps users slow down and evaluate whether attraction is supported by communication quality and consistent effort.",
    focus:
      "the crush score",
    behavior:
      "you compare emotional excitement with real indicators like planning consistency and respectful tone",
    risk:
      "overcommitting emotionally before behavior patterns are stable",
    action:
      "A short waiting period and direct expectation check can prevent most early-stage confusion.",
    longTerm:
      "Users who apply these filters early usually avoid avoidable mismatch and make better long-term decisions.",
    calculatorMode: "crush",
    includeWebApplication: true,
    ctaLabel: "Run the crush calculator",
    ctaHref: "#calculator-form",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Crush Calculator", path: "/crush-calculator" },
    ],
    relatedKeys: [
      "lovePercentage",
      "nameCompatibility",
      "trueLoveTest",
      "calculator",
      "coupleTest",
      "birthdayCompatibility",
      "initialsLoveTest",
      "howCalculatorsWork",
    ],
    faqs: [
      {
        question: "Is a crush score enough to start a relationship?",
        answer: "No. It should be combined with behavior evidence and clear communication.",
      },
      {
        question: "Can mixed crush scores improve?",
        answer: "Yes. Better pacing and expectation alignment often improve outcomes.",
      },
      {
        question: "How often should I retest crush results?",
        answer: "Retest after meaningful interaction changes, not on a daily cycle.",
      },
      {
        question: "What if my crush avoids direct communication?",
        answer: "Treat avoidance as important data and prioritize boundary clarity.",
      },
      {
        question: "Is this page for entertainment purposes?",
        answer: "Yes. It is for entertainment and reflective use.",
      },
    ],
  },
  {
    path: "/birthday-compatibility",
    title: "Birthday Compatibility Calculator for Timing, Rhythm, and Lifestyle Fit",
    description:
      "Check birthday compatibility and interpret score patterns with practical communication improvements.",
    h1: "Birthday Compatibility",
    intro:
      "Birthday matching is useful for spotting rhythm mismatch in planning, pacing, and daily expectations. This page connects symbolic output to practical behavior design.",
    focus:
      "birthday compatibility results",
    behavior:
      "partners align on timing rules and communication cadence after each score review",
    risk:
      "assuming date-based mismatch means the relationship cannot improve",
    action:
      "When users optimize scheduling and conflict timing, many recurring issues become easier to resolve.",
    longTerm:
      "Date-based trend checks are most useful when compared with real improvements in planning discipline.",
    calculatorMode: "birthday",
    includeWebApplication: true,
    ctaLabel: "Calculate birthday compatibility",
    ctaHref: "#calculator-form",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Birthday Compatibility", path: "/birthday-compatibility" },
    ],
    relatedKeys: [
      "zodiacCompatibility",
      "coupleTest",
      "calculator",
      "destiny",
      "lovePercentage",
      "nameCompatibility",
      "blog",
      "howCalculatorsWork",
    ],
    faqs: [
      {
        question: "Can birthday compatibility predict long-term outcomes?",
        answer: "No. It highlights timing patterns, while outcomes depend on behavior quality.",
      },
      {
        question: "Do I need exact birth time for this tool?",
        answer: "No. This version is optimized for date-level accessibility.",
      },
      {
        question: "What is the best fix for low birthday scores?",
        answer: "Improve timing habits first: scheduling clarity, response windows, and conflict cooldown.",
      },
      {
        question: "How does this differ from zodiac compatibility?",
        answer: "Birthday pages emphasize timing rhythm; zodiac pages focus on sign dynamics.",
      },
      {
        question: "Is this page for entertainment purposes?",
        answer: "Yes. It is for entertainment and practical reflection.",
      },
    ],
  },
  {
    path: "/initials-love-test",
    title: "Initials Love Test with Fast Score Insight and Practical Context",
    description:
      "Run an initials love test for a quick compatibility read and a practical communication follow-up plan.",
    h1: "Initials Love Test",
    intro:
      "Initials tools are intentionally simple, which makes interpretation discipline important. This page helps users convert quick symbolic output into practical decisions.",
    focus:
      "the initials love score",
    behavior:
      "users compare lightweight score output with real consistency signals in daily communication",
    risk:
      "retesting too often without making any behavior change",
    action:
      "Keep one baseline result, apply one communication improvement, and then retest on a fixed cadence.",
    longTerm:
      "This method preserves the fun speed of initials tools while still producing useful relationship insight over time.",
    calculatorMode: "initials",
    includeWebApplication: true,
    ctaLabel: "Run the initials love test",
    ctaHref: "#calculator-form",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Initials Love Test", path: "/initials-love-test" },
    ],
    relatedKeys: [
      "nameCompatibility",
      "calculator",
      "lovePercentage",
      "crushCalculator",
      "trueLoveTest",
      "coupleTest",
      "birthdayCompatibility",
      "howCalculatorsWork",
    ],
    faqs: [
      {
        question: "Is the initials test only for fun?",
        answer: "It is fun-first, but can be useful when paired with practical follow-up actions.",
      },
      {
        question: "Can I test multiple initials variants?",
        answer: "Yes, but keep comparisons limited and grounded in real behavior evidence.",
      },
      {
        question: "Why can initials and name scores differ?",
        answer: "Each tool uses different symbolic input patterns, so outputs can highlight different angles.",
      },
      {
        question: "Can long-term couples use this page?",
        answer: "Yes. It works as a quick pulse check before deeper conversations.",
      },
      {
        question: "Is this page for entertainment purposes?",
        answer: "Yes. It is for entertainment and reflection only.",
      },
    ],
  },
  {
    path: "/couple-test",
    title: "Couple Test for Communication Quality and Long-Term Stability",
    description:
      "Take a couple test to evaluate communication consistency, conflict repair, and practical relationship momentum.",
    h1: "Couple Test",
    intro:
      "This page is designed for users who want a broad relationship audit. It prioritizes communication quality, execution reliability, and repair capability over one-dimensional labels.",
    focus:
      "the couple test score",
    behavior:
      "both partners align on one measurable improvement and track completion weekly",
    risk:
      "trying to fix everything at once, which usually reduces consistency",
    action:
      "A narrow weekly objective creates clear momentum and makes score changes more meaningful.",
    longTerm:
      "Couples that review this framework monthly often sustain progress better than couples relying on emotional resets.",
    calculatorMode: "love",
    includeWebApplication: true,
    ctaLabel: "Start the couple test",
    ctaHref: "#calculator-form",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Couple Test", path: "/couple-test" },
    ],
    relatedKeys: [
      "calculator",
      "destiny",
      "trueLoveTest",
      "lovePercentage",
      "birthdayCompatibility",
      "zodiacCompatibility",
      "nameCompatibility",
      "blog",
    ],
    faqs: [
      {
        question: "How is this different from love percentage pages?",
        answer: "This page focuses on operational habits, not only compact percentage output.",
      },
      {
        question: "Can engaged or married couples use this?",
        answer: "Yes. It is suitable for both early-stage and long-term relationships.",
      },
      {
        question: "What if we disagree with the result?",
        answer: "Use disagreement as data and define one shared metric for the next review period.",
      },
      {
        question: "How often should we run this couple test?",
        answer: "Monthly is usually enough unless you are in an active repair phase.",
      },
      {
        question: "Is this page for entertainment purposes?",
        answer: "Yes. It is for entertainment and practical reflection.",
      },
    ],
  },
  {
    path: "/blog/how-love-calculators-work",
    title: "How Love Calculators Work: Scoring Logic, Limits, and Best Practices",
    description:
      "Learn how love calculators generate results, where limits exist, and how to use scores responsibly.",
    h1: "How Love Calculators Work",
    intro:
      "This informational guide explains why calculator results can be useful without being absolute truth. It is designed for users who want clear expectations before relying on a score.",
    focus:
      "calculator scoring logic",
    behavior:
      "readers compare score output with observed behavior instead of using one result as certainty",
    risk:
      "building major decisions on thin interpretation and no follow-up framework",
    action:
      "When users add context and track behavior, calculators become much more informative.",
    longTerm:
      "Clear interpretation and thoughtful page connections make it easier for readers to move from curiosity to useful action.",
    includeWebApplication: false,
    ctaLabel: "Try the main calculator",
    ctaHref: "/calculator",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "How Love Calculators Work", path: "/blog/how-love-calculators-work" },
    ],
    relatedKeys: [
      "calculator",
      "destiny",
      "lovePercentage",
      "trueLoveTest",
      "coupleTest",
      "zodiacCompatibility",
      "nameCompatibility",
      "tests",
    ],
    faqs: [
      {
        question: "Are love calculators random?",
        answer: "No. Most tools are deterministic and return consistent output for the same input.",
      },
      {
        question: "Why do different calculators show different scores?",
        answer: "Each site uses different scoring models and interpretation frameworks.",
      },
      {
        question: "Can calculators replace real-world communication?",
        answer: "No. They should support communication, not replace it.",
      },
      {
        question: "Why do some calculator pages feel shallow?",
        answer: "When a page only shows a form and score, people are left without context. Helpful interpretation makes results much more useful.",
      },
      {
        question: "Is this guide for entertainment purposes?",
        answer: "Yes. It is for entertainment and educational reflection.",
      },
    ],
  },
];

export const landingPages: LandingPageRecord[] = landingSeeds.map(makeRecord);

const landingMap = new Map<string, LandingPageRecord>(landingPages.map((page) => [page.path, page]));

export function getLandingPageByPath(path: string): LandingPageRecord | undefined {
  return landingMap.get(path);
}

export function getLandingPaths(): string[] {
  return landingPages.map((page) => page.path);
}
