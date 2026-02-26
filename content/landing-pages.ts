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
  loveByName: {
    href: "/love-calculator-by-name",
    title: "Love Calculator By Name",
    keyword: "love by name",
    description: "Run a name-first match read and compare the vibe quickly.",
  },
  nameCompatibilityTest: {
    href: "/name-compatibility-test",
    title: "Name Compatibility Test",
    keyword: "name test",
    description: "A quick name test with short interpretation and easy follow-up moves.",
  },
  lovePercentageByName: {
    href: "/love-percentage-by-name",
    title: "Love Percentage By Name",
    keyword: "name percentage",
    description: "See your name-based love percentage and what to do with it.",
  },
  compatibilityByBirthday: {
    href: "/compatibility-by-birthday",
    title: "Compatibility By Birthday",
    keyword: "birthday read",
    description: "Use date rhythm to compare daily pacing and communication flow.",
  },
  birthdayCompatibilityTestHub: {
    href: "/birthday-compatibility-test",
    title: "Birthday Compatibility Test",
    keyword: "birthday test",
    description: "A simple birthday test page with interpretation and next steps.",
  },
  numerologyCompatibility: {
    href: "/numerology-compatibility",
    title: "Numerology Compatibility",
    keyword: "numerology match",
    description: "Explore numerology-style match patterns in a practical format.",
  },
  lifePathCompatibility: {
    href: "/life-path-number-compatibility",
    title: "Life Path Number Compatibility",
    keyword: "life path match",
    description: "Check life-path style alignment and likely pressure points.",
  },
  zodiacChartHub: {
    href: "/zodiac-compatibility-chart",
    title: "Zodiac Compatibility Chart",
    keyword: "zodiac chart",
    description: "Browse sign chemistry patterns in one chart-style hub page.",
  },
  bestTestsHub: {
    href: "/best-love-compatibility-tests",
    title: "Best Love Compatibility Tests",
    keyword: "best tests",
    description: "A curated path through the most useful compatibility tests.",
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
      heading: "Quick conclusion",
      paragraphs: [
        `At a glance, ${seed.focus} is most useful when you treat it as direction, not destiny.`,
        `The short version: check the score, compare it with real behavior, and choose one small action for this week.`,
      ],
    },
    {
      heading: "How to use this result",
      paragraphs: [
        `Treat ${seed.focus} like a conversation spark, not a verdict. Notice what feels smooth, what feels off, and what deserves one honest follow-up chat.`,
        `This page works best when ${seed.behavior}. Keep it short and real; two clear sentences beat a dramatic hour-long talk.`,
      ],
    },
    {
      heading: "What trips people up",
      paragraphs: [
        `One common miss is ${seed.risk}. If that sounds like your week, lower the pressure and test one small habit first.`,
        "After each result, keep a tiny ritual: write one thing that rang true, name one boundary, and choose one next conversation. That rhythm usually works better than trying to repair everything in one night.",
      ],
    },
    {
      heading: "Keep it fun and useful",
      paragraphs: [
        `Most people come back for perspective, not perfection. Keep short notes and compare how your mood shifts from month to month.`,
        "Use this page for fun and reflection, then pair it with honest conversations and grounded expectations.",
      ],
    },
    {
      heading: "Real-life scenario",
      paragraphs: [
        "Example: one person felt ignored after delayed replies, the other thought everything was fine. A ten-minute reset talk solved the confusion faster than a long argument.",
        "In moments like that, simple beats dramatic. One clear ask, one clear response window, one quick follow-up.",
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
    ctaHref: "/calculator",
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
    ctaHref: "/calculator",
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
    ctaHref: "/calculator",
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
    ctaHref: "/calculator",
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
    ctaHref: "/calculator",
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
    ctaHref: "/calculator",
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
    ctaHref: "/calculator",
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
    ctaHref: "/calculator",
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
    ctaHref: "/calculator",
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
    ctaHref: "/calculator",
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
    path: "/love-calculator-by-name",
    title: "Love Calculator By Name",
    description: "Try a name-first love calculator and get a quick interpretation with practical follow-up.",
    h1: "Love Calculator By Name",
    intro:
      "This page is for the classic name-style check. Add two names, read the snapshot, and use it as a low-pressure conversation starter.",
    focus: "name-based love output",
    behavior: "both people compare the score with real conversation quality from the same week",
    risk: "treating one number as a final label instead of a quick signal",
    action: "A short review chat after the result usually keeps the reading useful and grounded.",
    longTerm: "Over time, repeating this with honest check-ins can reveal which habits actually improve your day-to-day vibe.",
    calculatorMode: "name",
    includeWebApplication: true,
    ctaLabel: "Try the name calculator",
    ctaHref: "/calculator",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Love Calculator By Name", path: "/love-calculator-by-name" },
    ],
    relatedKeys: [
      "nameCompatibility",
      "nameCompatibilityTest",
      "lovePercentageByName",
      "calculator",
      "trueLoveTest",
      "zodiacCompatibility",
      "blog",
      "howCalculatorsWork",
    ],
    faqs: [
      { question: "Does this only work with full legal names?", answer: "No. You can try preferred names too and compare what feels more accurate." },
      { question: "Should we retest often?", answer: "Use it after meaningful changes, not every day." },
      { question: "Can this predict the whole relationship?", answer: "No. It is a quick reflection tool, not a guarantee." },
      { question: "What should we do after the score?", answer: "Pick one communication move and try it this week." },
      { question: "Is this for fun only?", answer: "Fun first, but useful when paired with honest conversation." },
    ],
  },
  {
    path: "/name-compatibility-test",
    title: "Name Compatibility Test",
    description: "Run a name compatibility test with clear score interpretation and simple next steps.",
    h1: "Name Compatibility Test",
    intro:
      "Use this when you want a clean name test flow with quick interpretation. It is lightweight, readable, and easy to compare over time.",
    focus: "name compatibility test output",
    behavior: "you test once, then compare the result against real behavior for a week",
    risk: "retesting repeatedly without changing any habits",
    action: "One test plus one behavior tweak is usually more useful than ten back-to-back tests.",
    longTerm: "Simple tracking over a month shows whether communication quality is moving in a better direction.",
    calculatorMode: "name",
    includeWebApplication: true,
    ctaLabel: "Run name test",
    ctaHref: "/calculator",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Name Compatibility Test", path: "/name-compatibility-test" },
    ],
    relatedKeys: [
      "loveByName",
      "nameCompatibility",
      "lovePercentageByName",
      "initialsLoveTest",
      "calculator",
      "coupleTest",
      "blog",
      "tests",
    ],
    faqs: [
      { question: "Can nicknames change the score?", answer: "They can. Try both versions and compare against real interactions." },
      { question: "What if the score feels off?", answer: "Use that as a cue to review communication style, not as a hard verdict." },
      { question: "How many times should we run it?", answer: "A few focused checks are better than constant reruns." },
      { question: "Is this better than zodiac tests?", answer: "It is just a different angle. Compare both for context." },
      { question: "Can long-term couples use this?", answer: "Yes, especially as a light weekly check-in." },
    ],
  },
  {
    path: "/love-percentage-by-name",
    title: "Love Percentage By Name",
    description: "Check love percentage by name and use the score as a practical conversation cue.",
    h1: "Love Percentage By Name",
    intro:
      "This version focuses on name-based percentage reads. Quick to run, easy to share, and best used with one practical follow-up action.",
    focus: "name percentage result",
    behavior: "you treat the percentage as a prompt for one clear next conversation",
    risk: "assuming a single percentage tells the full relationship story",
    action: "When the score surprises you, compare notes instead of arguing with the number.",
    longTerm: "Tracking reactions over time often reveals more than the score itself.",
    calculatorMode: "name",
    includeWebApplication: true,
    ctaLabel: "Show my name percentage",
    ctaHref: "/calculator",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Love Percentage By Name", path: "/love-percentage-by-name" },
    ],
    relatedKeys: [
      "loveByName",
      "nameCompatibilityTest",
      "lovePercentage",
      "calculator",
      "crushCalculator",
      "trueLoveTest",
      "blog",
      "howCalculatorsWork",
    ],
    faqs: [
      { question: "Is this the same as regular love percentage?", answer: "It shares format, but this one centers on name inputs." },
      { question: "What is a strong result here?", answer: "Context matters more than one threshold." },
      { question: "Can low numbers improve?", answer: "Yes, especially with clearer communication habits." },
      { question: "Should we compare with other tests?", answer: "Yes. A second angle usually makes interpretation easier." },
      { question: "Is this page entertainment-focused?", answer: "Yes. Use it for fun and reflection." },
    ],
  },
  {
    path: "/compatibility-by-birthday",
    title: "Compatibility By Birthday",
    description: "Use birthday-based matching to read timing, pace, and day-to-day rhythm.",
    h1: "Compatibility By Birthday",
    intro:
      "Birthday-based reads are useful when timing keeps causing friction. Compare dates, spot pacing patterns, and test one clear adjustment.",
    focus: "birthday-based compatibility result",
    behavior: "both partners align on one timing rule after reading the score",
    risk: "assuming a date mismatch means the relationship cannot improve",
    action: "Most pressure drops when scheduling and response expectations are explicit.",
    longTerm: "A monthly review of timing habits usually gives cleaner progress than emotional guessing.",
    calculatorMode: "birthday",
    includeWebApplication: true,
    ctaLabel: "Check birthday compatibility",
    ctaHref: "/calculator",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Compatibility By Birthday", path: "/compatibility-by-birthday" },
    ],
    relatedKeys: [
      "birthdayCompatibility",
      "birthdayCompatibilityTestHub",
      "numerologyCompatibility",
      "lifePathCompatibility",
      "zodiacCompatibility",
      "calculator",
      "blog",
      "tests",
    ],
    faqs: [
      { question: "Do I need exact birth time?", answer: "No, this version is date-first and easy to use." },
      { question: "What does a low result usually indicate?", answer: "Most often it points to timing and routine friction." },
      { question: "Can this replace direct communication?", answer: "No. Use it to support better talks." },
      { question: "How often should we check again?", answer: "Every few weeks is enough for most pairs." },
      { question: "Can this be used just for fun?", answer: "Yes, and it works best when kept light." },
    ],
  },
  {
    path: "/birthday-compatibility-test",
    title: "Birthday Compatibility Test",
    description: "Take a birthday compatibility test and get practical interpretation you can use this week.",
    h1: "Birthday Compatibility Test",
    intro:
      "This test page keeps birthday matching simple: score first, then clear interpretation and one next action you can try right away.",
    focus: "birthday compatibility test score",
    behavior: "you translate the score into one concrete schedule or communication change",
    risk: "reading the result as fate instead of current rhythm feedback",
    action: "Treat the score like a practical prompt and it becomes far more useful.",
    longTerm: "Consistency in small routines usually matters more than one dramatic conversation.",
    calculatorMode: "birthday",
    includeWebApplication: true,
    ctaLabel: "Run birthday test",
    ctaHref: "/calculator",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Birthday Compatibility Test", path: "/birthday-compatibility-test" },
    ],
    relatedKeys: [
      "compatibilityByBirthday",
      "birthdayCompatibility",
      "numerologyCompatibility",
      "lifePathCompatibility",
      "zodiacCompatibility",
      "destiny",
      "blog",
      "howCalculatorsWork",
    ],
    faqs: [
      { question: "Is this different from zodiac compatibility?", answer: "Yes. This one emphasizes timing and rhythm first." },
      { question: "What is the best follow-up to a low score?", answer: "Set one predictable check-in routine and review after a week." },
      { question: "Can this work for long-distance couples?", answer: "Yes, timing structure is often even more important there." },
      { question: "Should we retake immediately?", answer: "Better to test a change first, then rerun." },
      { question: "Is this a professional counseling tool?", answer: "No. It is a reflection and entertainment page." },
    ],
  },
  {
    path: "/numerology-compatibility",
    title: "Numerology Compatibility",
    description: "Explore numerology compatibility patterns with practical relationship context.",
    h1: "Numerology Compatibility",
    intro:
      "Numerology-style matching can be a fun mirror for relationship rhythm. Use it for reflection, then compare against real behavior.",
    focus: "numerology compatibility read",
    behavior: "you connect symbolic patterns to clear weekly communication habits",
    risk: "using symbolic labels without checking actual day-to-day behavior",
    action: "The read becomes more useful when paired with simple actions and reviews.",
    longTerm: "The strongest gains come from consistency, not one perfect interpretation.",
    calculatorMode: "birthday",
    includeWebApplication: true,
    ctaLabel: "Open numerology-style test",
    ctaHref: "/calculator",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Numerology Compatibility", path: "/numerology-compatibility" },
    ],
    relatedKeys: [
      "lifePathCompatibility",
      "compatibilityByBirthday",
      "birthdayCompatibility",
      "destiny",
      "calculator",
      "zodiacCompatibility",
      "blog",
      "tests",
    ],
    faqs: [
      { question: "Is numerology compatibility scientific?", answer: "No. It is symbolic and best used as a reflection tool." },
      { question: "Can symbolic insight still help?", answer: "Yes, when it leads to specific actions." },
      { question: "How should we use the output?", answer: "Pick one pattern to test in daily behavior." },
      { question: "Can this replace real conversations?", answer: "No. Conversation stays central." },
      { question: "Is this page for fun and curiosity?", answer: "Yes, exactly." },
    ],
  },
  {
    path: "/life-path-number-compatibility",
    title: "Life Path Number Compatibility",
    description: "Check life path number compatibility and turn insights into practical relationship habits.",
    h1: "Life Path Number Compatibility",
    intro:
      "Life-path style reads are great for spotting pacing and expectation differences. Keep it practical and compare with real interactions.",
    focus: "life path compatibility score",
    behavior: "you use the score to plan one small relationship experiment for the week",
    risk: "arguing about labels instead of fixing repeat friction",
    action: "Simple experiments usually beat long debates about meaning.",
    longTerm: "A pattern log over a month gives much better clarity than one-off impressions.",
    calculatorMode: "birthday",
    includeWebApplication: true,
    ctaLabel: "Check life path match",
    ctaHref: "/calculator",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Life Path Number Compatibility", path: "/life-path-number-compatibility" },
    ],
    relatedKeys: [
      "numerologyCompatibility",
      "compatibilityByBirthday",
      "birthdayCompatibilityTestHub",
      "destiny",
      "calculator",
      "nameCompatibility",
      "blog",
      "tests",
    ],
    faqs: [
      { question: "What should we do with this score?", answer: "Turn one insight into one weekly habit and review it." },
      { question: "Can life path reads conflict with zodiac reads?", answer: "They can show different angles, which is normal." },
      { question: "Is one test enough to decide everything?", answer: "No. Use multiple signals and real behavior." },
      { question: "How often should we revisit?", answer: "Monthly is usually enough." },
      { question: "Is this page predictive certainty?", answer: "No. It is reflective, not deterministic." },
    ],
  },
  {
    path: "/zodiac-compatibility-chart",
    title: "Zodiac Compatibility Chart",
    description: "Use a zodiac compatibility chart-style guide to compare sign chemistry and pressure points quickly.",
    h1: "Zodiac Compatibility Chart",
    intro:
      "If you want a chart-style sign overview, this page gives quick direction plus clear next-click paths into pair pages and tests.",
    focus: "zodiac compatibility chart read",
    behavior: "you compare sign patterns with real relationship habits before concluding",
    risk: "leaning on sign labels while ignoring communication quality",
    action: "Pair-level pages and test comparisons make chart reads much more useful.",
    longTerm: "When you combine chart insight with routine check-ins, recurring friction gets easier to spot and fix.",
    calculatorMode: "zodiac",
    includeWebApplication: true,
    ctaLabel: "Open zodiac calculator",
    ctaHref: "/calculator",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Zodiac Compatibility Chart", path: "/zodiac-compatibility-chart" },
    ],
    relatedKeys: [
      "zodiacCompatibility",
      "zodiacChartHub",
      "bestTestsHub",
      "calculator",
      "birthdayCompatibility",
      "nameCompatibility",
      "blog",
      "tests",
    ],
    faqs: [
      { question: "Is this an actual static chart?", answer: "It is a chart-style guide plus interactive pair and test links." },
      { question: "What should we click after this page?", answer: "Try a pair page and the main calculator for contrast." },
      { question: "Can chart reads predict outcomes?", answer: "No. They are orientation tools, not guarantees." },
      { question: "How to use this with a partner?", answer: "Compare one shared strength and one pressure point." },
      { question: "Is this page entertainment-focused?", answer: "Yes, with practical reflection." },
    ],
  },
  {
    path: "/best-love-compatibility-tests",
    title: "Best Love Compatibility Tests",
    description: "A practical guide to the best love compatibility tests and when to use each one.",
    h1: "Best Love Compatibility Tests",
    intro:
      "Use this page when you are not sure where to start. It helps you pick the right test for your mood, timing, and depth.",
    focus: "test selection flow",
    behavior: "you run one primary test first, then one contrast test for perspective",
    risk: "jumping between tests without a simple interpretation plan",
    action: "A two-test comparison usually gives better clarity than one isolated result.",
    longTerm: "A light monthly cadence makes test results easier to compare and apply.",
    calculatorMode: "love",
    includeWebApplication: true,
    ctaLabel: "Start with primary test",
    ctaHref: "/calculator",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Best Love Compatibility Tests", path: "/best-love-compatibility-tests" },
    ],
    relatedKeys: [
      "tests",
      "calculator",
      "zodiacCompatibility",
      "nameCompatibility",
      "birthdayCompatibility",
      "trueLoveTest",
      "blog",
      "howCalculatorsWork",
    ],
    faqs: [
      { question: "Which test should we run first?", answer: "Start with the main calculator, then add one contrast test." },
      { question: "What is a contrast test?", answer: "A second test from a different angle, like zodiac or birthday." },
      { question: "Do we need to run every test?", answer: "No. Two to three focused tests are enough." },
      { question: "How do we compare results well?", answer: "Look for repeat themes across tests." },
      { question: "Is this page only for couples?", answer: "No, solo reflection works too." },
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


