import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResultReport } from "@/components/results/ResultReport";
import { SeoClusterLinks } from "@/components/SeoClusterLinks";
import { StructuredData } from "@/components/StructuredData";
import { compatibilityPairPages, getPairBySlug } from "@/content/compatibility-pages";
import { appEnv } from "@/lib/env";
import { buildResultReport } from "@/lib/results/engine";
import { buildSeed, deterministicShuffle } from "@/lib/results/seed";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { buildPairMeta } from "@/lib/seo";

interface PairPageProps {
  params: Promise<{ pair: string }>;
  searchParams?: Promise<{ a?: string; b?: string }>;
}

interface PairSection {
  title: string;
  body: string;
  items?: string[];
  faqs?: Array<{ question: string; answer: string }>;
}

function makePairSections(signA: string, signB: string): PairSection[] {
  const seed = buildSeed([signA, signB]);
  const uniqueParagraphs = [
    `${signA} often pushes movement while ${signB} looks for emotional safety first, so this pair works best when speed and reassurance are negotiated together.`,
    `${signA} and ${signB} usually share strong attraction but different value signals around timing, which is why clear communication makes such a dramatic difference.`,
    `With ${signA} and ${signB}, the chemistry is rarely the issue; consistency is. When both protect each other's communication style, long-term stability improves.`,
  ];

  const quickSnapshotPool = [
    "Your strongest moments come from direct and kind communication, not guessing games.",
    "This pair usually improves fast when expectations are named before stress spikes.",
    "Shared momentum is good, but conflict repair speed decides the long-term mood.",
    "Texting tone can create friction unless both people clarify intent early.",
    "Small weekly habits outperform big one-time talks in this match.",
  ];

  const strengthsPool = [
    "High curiosity about each other's perspective during calm conversations.",
    "Strong emotional pull that helps both return after disagreement.",
    "Good momentum when plans are explicit and time windows are clear.",
    "Natural chemistry in playful settings and low-pressure activities.",
    "Ability to recover quickly when appreciation is spoken out loud.",
  ];

  const challengesPool = [
    "Different pacing needs can feel like mixed signals under pressure.",
    "Silence during conflict may be read as distance instead of cooldown.",
    "Unclear text tone can trigger overthinking on both sides.",
    "Stacking too many issues in one talk creates defensiveness.",
    "Busy schedules can make both people feel under-prioritized.",
  ];

  const communicationTipsPool = [
    "Use one clear ask per serious message and one clear response window.",
    "When tone gets sharp, switch to voice and keep it under ten minutes.",
    "Start difficult talks with one appreciation before one request.",
    "Repeat what you heard before defending your own point.",
    "Agree on a reset phrase both people can use mid-conflict.",
  ];

  const nextStepsPool = [
    "Pick one friction point and run a seven-day experiment before judging progress.",
    "Schedule one short weekly check-in with a fixed time and no multitasking.",
    "Choose one shared rule for texting during stressful days.",
    "After your next disagreement, end with one concrete action each.",
    "Run this pair page again in two weeks and compare what changed.",
  ];

  const faqPool = [
    {
      question: `What does the ${signA} and ${signB} score meaning tell us?`,
      answer: "It points to likely strengths and challenges, then gives advice on what to adjust next.",
    },
    {
      question: "What is the biggest strength in this pair?",
      answer: "Most often it is natural pull plus curiosity, especially when communication stays direct.",
    },
    {
      question: "What challenge shows up most often?",
      answer: "Pace mismatch and tone misreads are common, especially in text-only conversations.",
    },
    {
      question: "How should we improve communication first?",
      answer: "Set one clear check-in routine and one rule for handling heated moments.",
    },
    {
      question: "What does long-term outlook depend on here?",
      answer: "Less on chemistry, more on how consistently both people repair after friction.",
    },
    {
      question: "What should we do if the score feels low?",
      answer: "Pick one practical next step this week and re-check after real behavior changes.",
    },
  ];

  return [
    {
      title: "Quick Snapshot",
      body: deterministicShuffle(uniqueParagraphs, seed + 1)[0],
      items: deterministicShuffle(quickSnapshotPool, seed + 2).slice(0, 5),
    },
    {
      title: "Strengths",
      body: "",
      items: deterministicShuffle(strengthsPool, seed + 3).slice(0, 4),
    },
    {
      title: "Challenges",
      body: "",
      items: deterministicShuffle(challengesPool, seed + 4).slice(0, 4),
    },
    {
      title: "Communication Tips",
      body: "",
      items: deterministicShuffle(communicationTipsPool, seed + 5).slice(0, 4),
    },
    {
      title: "Long-term Outlook",
      body: deterministicShuffle(
        [
          `The long-term outlook for ${signA} and ${signB} improves when both protect repair habits, not just chemistry highs.`,
          `${signA} and ${signB} can build strong long-term alignment by treating communication rituals as non-negotiable.`,
        ],
        seed + 6,
      )[0],
    },
    {
      title: "Next Steps",
      body: "",
      items: deterministicShuffle(nextStepsPool, seed + 7).slice(0, 4),
    },
    {
      title: "FAQ",
      body: "",
      faqs: deterministicShuffle(faqPool, seed + 8).slice(0, 6),
    },
  ];
}

export async function generateStaticParams() {
  return compatibilityPairPages.map((pair) => ({ pair: pair.slug }));
}

export async function generateMetadata({ params }: PairPageProps): Promise<Metadata> {
  const { pair } = await params;
  const data = getPairBySlug(pair);

  if (!data) {
    return buildPairMeta({
      signA: "Zodiac",
      signB: "Pair",
      path: "/compatibility",
      year: 2026,
      variantSeed: "/compatibility",
    });
  }

  return buildPairMeta({
    signA: data.signA,
    signB: data.signB,
    path: `/compatibility/${data.slug}`,
    year: 2026,
    variantSeed: data.slug,
  });
}

export default async function PairPage({ params, searchParams }: PairPageProps) {
  const { pair } = await params;
  const data = getPairBySlug(pair);

  if (!data) {
    notFound();
  }

  const query = searchParams ? await searchParams : undefined;
  const primaryInput = query?.a?.trim() || data.signA;
  const secondaryInput = query?.b?.trim() || data.signB;
  const pairSections = makePairSections(data.signA, data.signB);
  const faqItems = pairSections.find((section) => section.faqs)?.faqs || [];
  const faqSchema = buildFaqSchema(faqItems);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Compatibility", path: "/tests" },
    { name: `${data.signA} and ${data.signB}`, path: `/compatibility/${data.slug}` },
  ]);
  const shareLink = `/compatibility/${data.slug}?a=${encodeURIComponent(primaryInput)}&b=${encodeURIComponent(secondaryInput)}`;
  const report = buildResultReport({
    testKey: "compatibility",
    userInput: {
      testKey: "compatibility",
      primary: primaryInput,
      secondary: secondaryInput,
    },
    base: {
      title: `${primaryInput} and ${secondaryInput} Compatibility`,
      summary: data.intro,
      strengths: data.strengths,
      watchouts: data.watchouts,
    },
  });

  return (
    <article className="premium-card space-y-6 p-6 md:p-10">
      <header className="space-y-3">
        <p className="label-caps">Compatibility Guide</p>
        <h1 className="text-4xl font-semibold text-text-main md:text-5xl">
          {data.signA} and {data.signB}
        </h1>
        <p className="text-text-muted">{data.intro}</p>
      </header>

      <section className="space-y-3">
        {pairSections.map((section) => (
          <div key={section.title} className="space-y-1 rounded-2xl border border-border-soft bg-white p-4">
            <h2 className="text-xl font-semibold text-text-main">{section.title}</h2>
            {section.body ? <p className="text-text-muted">{section.body}</p> : null}
            {section.items ? (
              <ul className="mt-2 space-y-2 text-text-muted">
                {section.items.map((item) => (
                  <li key={`${section.title}-${item}`} className="leading-6">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {section.faqs ? (
              <div className="mt-2 space-y-2">
                {section.faqs.map((faq) => (
                  <details key={faq.question} className="rounded-xl border border-border-soft bg-bg-muted p-3">
                    <summary className="cursor-pointer text-sm font-semibold text-text-main">{faq.question}</summary>
                    <p className="mt-2 text-sm text-text-muted">{faq.answer}</p>
                  </details>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </section>

      <ResultReport report={report} shareLink={shareLink} />
      <SeoClusterLinks context={{ type: "pair", pair: data.slug, tags: [data.signA.toLowerCase(), data.signB.toLowerCase()] }} />

      <section className="rounded-2xl border border-border-soft bg-bg-muted p-5">
        <h2 className="text-2xl font-semibold text-text-main">Try one more pair</h2>
        <p className="mt-2 text-text-muted">Open another pair page and compare what changes in the tone.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/calculator"
            className="inline-flex rounded-full bg-brand-primary px-5 py-2 text-sm font-bold text-white hover:bg-[#2b2f8f]"
          >
            Try the calculator
          </Link>
          <Link
            href="/zodiac"
            className="inline-flex rounded-full border border-border-soft bg-white px-5 py-2 text-sm font-bold text-text-main hover:bg-bg-muted"
          >
            Explore zodiac hub
          </Link>
        </div>
      </section>

      <p className="text-sm font-semibold text-text-tertiary">{appEnv.siteName} is for entertainment purposes only.</p>
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
    </article>
  );
}

