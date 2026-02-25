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
    description: "Run the classic match test and see what the vibe looks like today.",
  },
  destiny: {
    href: "/destiny",
    title: "Destiny Calculator",
    keyword: "destiny test",
    description: "Get a solo reading about your relationship style and emotional rhythm.",
  },
  nameCompatibility: {
    href: "/name-compatibility",
    title: "Name Compatibility",
    keyword: "name match",
    description: "Type in two names for a quick read on chemistry and communication style.",
  },
  zodiacCompatibility: {
    href: "/zodiac-compatibility",
    title: "Zodiac Compatibility",
    keyword: "zodiac match",
    description: "Check your sign match and see where sparks fly or clash.",
  },
  lovePercentage: {
    href: "/love-percentage",
    title: "Love Percentage Calculator",
    keyword: "love percentage",
    description: "Get a fast love score you can laugh about and talk through together.",
  },
  trueLoveTest: {
    href: "/true-love-test",
    title: "True Love Test",
    keyword: "true love test",
    description: "Take a deeper love check focused on trust, effort, and staying power.",
  },
  crushCalculator: {
    href: "/crush-calculator",
    title: "Crush Calculator",
    keyword: "crush score",
    description: "Perfect for crush energy when you want answers without overthinking it.",
  },
  birthdayCompatibility: {
    href: "/birthday-compatibility",
    title: "Birthday Compatibility",
    keyword: "birthday match",
    description: "Use birthdays to check timing, flow, and day-to-day fit.",
  },
  initialsLoveTest: {
    href: "/initials-love-test",
    title: "Initials Love Test",
    keyword: "initials test",
    description: "Try a light initials match for a fun first read.",
  },
  coupleTest: {
    href: "/couple-test",
    title: "Couple Test",
    keyword: "couple test",
    description: "Run a full couple check when you want the bigger relationship picture.",
  },
  tests: {
    href: "/tests",
    title: "All Compatibility Tests",
    keyword: "all tests",
    description: "Browse every test and pick whatever fits your mood right now.",
  },
  blog: {
    href: "/blog",
    title: "Compatibility Guides",
    keyword: "blog picks",
    description: "Read fun guides about signs, scores, and relationship moments.",
  },
  howCalculatorsWork: {
    href: "/blog/how-love-calculators-work",
    title: "How Love Calculators Work",
    keyword: "quick guide",
    description: "See what these tests mean and how to read the results without the drama.",
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
      heading: "How to use this result",
      paragraphs: [
        `Think of ${seed.focus} as a conversation starter, not a final answer. Use it to spot what feels easy, what feels tense, and what you want to talk about next.`,
        `The page feels most useful when ${seed.behavior}. Small, honest check-ins usually beat big emotional speeches.`,
      ],
    },
    {
      heading: "What trips people up",
      paragraphs: [
        `A common pitfall is ${seed.risk}. If that sounds familiar, slow it down and pick one small habit to try this week.`,
        "After each result, do one simple thing: note what felt true, name one boundary, and have one follow-up chat. Keeping it simple usually works better than trying to fix everything at once.",
      ],
    },
    {
      heading: "Keep it fun and useful",
      paragraphs: [
        `Most people come back for fresh perspective, not perfection. Keep short notes and compare how things feel month to month.`,
        "This page is for entertainment purposes and works best with honest conversations and realistic expectations.",
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
    title: "Love Compatibility Calculator for Curious Couples",
    description:
      "Try the classic love test for a quick score and a fun read on your relationship vibe.",
    h1: "Love Compatibility Calculator",
    intro:
      "Start here when you want the classic score with a little more story behind it. Run the test, compare notes, and see what feels surprisingly accurate.",
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
    ctaLabel: "Try this love test",
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
    title: "Destiny Calculator for a Personal Love Snapshot",
    description:
      "Get a solo destiny reading to explore your emotional style and relationship rhythm.",
    h1: "Destiny Calculator",
    intro:
      "This one is all about you. Use it to check your patterns before you overread someone else.",
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
    ctaLabel: "Get my destiny reading",
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
    title: "Name Compatibility Test",
    description:
      "Type in two names and get a playful take on chemistry, flow, and communication style.",
    h1: "Name Compatibility",
    intro:
      "Name tests are simple and fun. Add both names, check the score, and see which parts feel right.",
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
    ctaLabel: "Check our name match",
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
    title: "Zodiac Compatibility Reading",
    description:
      "Check your sign match and get a lively read on chemistry, conflict style, and connection.",
    h1: "Zodiac Compatibility",
    intro:
      "If you're into sign chemistry, this page gives you more than one-line labels. Compare signs and see the bigger picture.",
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
    ctaLabel: "Check our sign match",
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
    title: "Love Percentage Calculator",
    description:
      "Get your love percentage instantly and see what that number might mean in real life.",
    h1: "Love Percentage Calculator",
    intro:
      "This is the quick one. Run your percentage, compare reactions, and decide what to talk about next.",
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
    ctaLabel: "Show our love percentage",
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
    title: "True Love Test",
    description:
      "Take a deeper love test focused on trust, consistency, and how you show up for each other.",
    h1: "True Love Test",
    intro:
      "Think of this as the deeper check. It looks past butterflies and leans into trust, effort, and follow-through.",
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
    ctaLabel: "Take the true love test",
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
    title: "Crush Calculator",
    description:
      "Got a crush? Run a quick score and get a fun read before you spiral.",
    h1: "Crush Calculator",
    intro:
      "Crush energy can get loud fast. This page helps you slow down, check the signs, and keep your balance.",
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
    ctaLabel: "Run my crush score",
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
    title: "Birthday Compatibility Calculator",
    description:
      "Use birthdays to check timing, emotional rhythm, and how naturally you two click.",
    h1: "Birthday Compatibility",
    intro:
      "Birthday matching is great for spotting differences in pace. Compare dates and see where your rhythms sync up.",
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
    ctaLabel: "Check birthday match",
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
    title: "Initials Love Test",
    description:
      "Run a fast initials test for a light, fun compatibility check.",
    h1: "Initials Love Test",
    intro:
      "This one is fast and playful. Type your initials, get the score, and enjoy the moment.",
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
    ctaLabel: "Try the initials test",
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
    title: "Couple Test",
    description:
      "Take a full couple check when you want a broader look at your relationship dynamic.",
    h1: "Couple Test",
    intro:
      "Use this when you want the bigger picture. It blends chemistry, communication, and day-to-day reality.",
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
    ctaLabel: "Take the couple test",
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
    title: "How Love Calculators Work",
    description:
      "A simple guide to what these love tests measure and how to read the results.",
    h1: "How Love Calculators Work",
    intro:
      "Wondering what these scores are actually doing? This guide breaks it down in plain language.",
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
    ctaLabel: "Go to the main test",
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
