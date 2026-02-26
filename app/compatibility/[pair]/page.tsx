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
import { buildMetadata } from "@/lib/seo";

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
  const summaryPool = [
    `${signA} and ${signB} tend to do well when the tone stays clear and warm. Their best moments usually come from simple check-ins, not grand speeches.`,
    `${signA} with ${signB} can feel both lively and layered. When both people say what they mean early, this pairing becomes much easier to navigate.`,
    `${signA} and ${signB} often have real pull, but pace matters. A little structure around tough moments helps this match feel calmer and closer.`,
  ];

  const worksBestPool = [
    "Both people name expectations before a stressful week starts.",
    "Hard topics happen in short, focused talks instead of late-night spirals.",
    "Each person says one appreciation out loud during conflict repair.",
    "Plans are confirmed clearly, especially around timing changes.",
    "You check assumptions before reacting to tone.",
  ];

  const pressurePointsPool = [
    "One person wants an answer now while the other needs breathing room.",
    "Text tone gets misread when energy is low.",
    "Old tension leaks into a new conversation.",
    "Silence is interpreted as distance instead of cooldown.",
    "Busy schedules make both people feel under-prioritized.",
  ];

  const weekPlanPool = [
    "Day 1: Trade one thing that felt easy this week and one thing that felt tense.",
    "Day 2: Set a 10-minute check-in time for the same day next week.",
    "Day 3: During one chat, repeat back what you heard before replying.",
    "Day 4: Send one direct message instead of a hint.",
    "Day 5: Do one light activity together with phones away for 20 minutes.",
    "Day 6: Name one recurring friction point and agree on one small fix.",
    "Day 7: End the week with one appreciation and one practical next step.",
    "Day 1: Start with a clean slate question: what do we want this week to feel like?",
    "Day 2: Pick one phrase you both use when a talk gets heated.",
    "Day 3: Share one personal trigger without blaming language.",
    "Day 4: Keep one conversation short on purpose: 12 minutes max.",
    "Day 5: Plan a small date with a clear start and end time.",
    "Day 6: Review one misunderstanding and rewrite it in plain words.",
    "Day 7: Decide one habit to keep for next week.",
  ];

  const textingRulesPool = [
    "If a message can be read two ways, rewrite it once before sending.",
    "Use one clear ask per message during serious topics.",
    "When tone feels off, switch to voice instead of escalating in text.",
    "Do not stack complaints in one long paragraph.",
    "If either person is overwhelmed, send a reset line with a return time.",
  ];

  const faqPool = [
    {
      question: `Is ${signA} and ${signB} a naturally easy match?`,
      answer: "It can be, but it depends more on timing and communication habits than labels.",
    },
    {
      question: "What matters most first: chemistry or consistency?",
      answer: "Chemistry starts things. Consistency decides whether things stay healthy.",
    },
    {
      question: "How often should we check this page again?",
      answer: "Every few weeks is enough, especially after you test a new habit.",
    },
    {
      question: "What should we do right after a low-feeling week?",
      answer: "Pick one small repair rule and run it for seven days before judging progress.",
    },
    {
      question: "Can texting alone carry this match?",
      answer: "Usually no. Important topics land better in voice or in person.",
    },
    {
      question: "What is the fastest way to reduce misunderstandings?",
      answer: "Repeat what you heard, then respond. That one step prevents many loops.",
    },
    {
      question: "Should we try to fix every issue at once?",
      answer: "No. One pressure point at a time gives better results.",
    },
    {
      question: "How do we keep this fun while still improving?",
      answer: "Use tiny weekly experiments, not heavy rules.",
    },
    {
      question: "What if we disagree with this read?",
      answer: "Good. Compare notes and use the disagreement as a conversation starter.",
    },
    {
      question: "Can this page predict the whole future?",
      answer: "No. It is a snapshot for reflection, not a fixed outcome.",
    },
  ];

  return [
    {
      title: "Quick Summary",
      body: deterministicShuffle(summaryPool, seed + 1)[0],
    },
    {
      title: "Works best when...",
      body: "",
      items: deterministicShuffle(worksBestPool, seed + 2).slice(0, 3),
    },
    {
      title: "Pressure points",
      body: "",
      items: deterministicShuffle(pressurePointsPool, seed + 3).slice(0, 3),
    },
    {
      title: "Do this this week",
      body: "",
      items: deterministicShuffle(weekPlanPool, seed + 4).slice(0, 7),
    },
    {
      title: "Texting rules",
      body: "",
      items: deterministicShuffle(textingRulesPool, seed + 5).slice(0, 3),
    },
    {
      title: "FAQ",
      body: "",
      faqs: deterministicShuffle(faqPool, seed + 6).slice(0, 10),
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
    return buildMetadata({
      title: "Compatibility",
      description: "Compatibility guide",
      path: "/compatibility",
    });
  }

  return buildMetadata({
    title: `${data.signA} and ${data.signB} Compatibility`,
    description: data.intro,
    path: `/compatibility/${data.slug}`,
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
      <SeoClusterLinks />

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

