import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomeQuickStart } from "@/components/HomeQuickStart";
import { InternalLinkCluster } from "@/components/InternalLinkCluster";
import { InternalLinks } from "@/components/InternalLinks";
import { LiveCompatibilityBoard } from "@/components/LiveCompatibilityBoard";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { homeGuideLinks, homeToolsLinks } from "@/content/landing-pages";
import { absoluteUrl, buildHubMeta } from "@/lib/seo";

export const revalidate = 86400;
export const dynamic = "force-static";

export const metadata: Metadata = buildHubMeta({
  primaryKeyword: "Love compatibility insights",
  path: "/",
  year: 2026,
  variantSeed: "/",
});

const homeFaqs = [
  {
    question: "Which compatibility test should I try first?",
    answer:
      "Start with the main calculator for a broad score, then compare with name, zodiac, or birthday compatibility if you want a second angle.",
  },
  {
    question: "What makes a result useful?",
    answer:
      "A useful result gives a score, explains the pattern, and suggests one small next move instead of stopping at a number.",
  },
  {
    question: "Can I share a result with someone?",
    answer:
      "Yes. Result pages include share links so you can send the test without rebuilding the score from scratch.",
  },
  {
    question: "How often should we retake a test?",
    answer: "About once a month is plenty, or after a big change in your relationship.",
  },
  {
    question: "Why compare more than one test?",
    answer: "Different tests highlight different signals. Repeated themes across two tests are usually more useful than one isolated score.",
  },
  {
    question: "Is this website for entertainment purposes?",
    answer: "Yes. All pages are for entertainment purposes and reflection.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl("/"),
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Love Compatibility Calculator",
  description:
    "Compatibility calculators and relationship guides with playful score explanations.",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  url: absoluteUrl("/"),
};

const resultPreview = [
  {
    label: "Score",
    value: "82/100",
    text: "Strong spark, easy conversation, and one timing habit worth protecting.",
  },
  {
    label: "Strength",
    value: "Chemistry",
    text: "The match reads as warm, playful, and quick to recover after small misunderstandings.",
  },
  {
    label: "Watchout",
    value: "Pace",
    text: "Different response rhythms can create doubt if expectations are not named early.",
  },
];

const heroStats = [
  { label: "Tests", value: "20+" },
  { label: "Result card", value: "2 formats" },
  { label: "Signup", value: "0" },
];

const testRoutes = [
  {
    title: "Fast score",
    href: "/calculator",
    note: "Best when you want the classic compatibility result first.",
  },
  {
    title: "Name chemistry",
    href: "/name-compatibility",
    note: "Best for a playful, low-pressure match check.",
  },
  {
    title: "Zodiac angle",
    href: "/zodiac-compatibility",
    note: "Best when signs are part of the conversation.",
  },
  {
    title: "Deeper signal",
    href: "/true-love-test",
    note: "Best when trust, effort, and staying power matter most.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-[0_24px_70px_rgba(15,23,42,0.22)]">
        <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="bg-[linear-gradient(135deg,#fff7ed_0%,#fdf2f8_45%,#e0f2fe_100%)] p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-full border border-rose-200 bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-rose-700">
                Free compatibility test
              </div>
              <div className="inline-flex rounded-full border border-sky-200 bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-sky-700">
                Shareable result cards
              </div>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black text-slate-950 md:text-6xl">
              Get your love score, then send the result card.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-700 md:text-lg">
              Type two names, signs, or birthdays and get a playful compatibility report with a score, meaning,
              next move, and share-ready card.
            </p>
            <div className="mt-6">
              <HomeQuickStart />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/70 bg-white/70 p-3">
                  <p className="text-2xl font-black text-slate-950">{item.value}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/calculator"
                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Try main calculator
              </Link>
              <Link
                href="/tests"
                className="rounded-2xl border border-slate-300 bg-white/90 px-5 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
              >
                Browse all tests
              </Link>
              <Link
                href="/best-love-compatibility-tests"
                className="rounded-2xl border border-slate-300 bg-white/90 px-5 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pick a test
              </Link>
            </div>
          </div>

          <aside className="relative border-t border-white/10 bg-slate-950 p-6 text-white lg:border-l lg:border-t-0 md:p-10">
            <div className="absolute right-6 top-6 hidden rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-sky-100 md:block">
              sample card
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.08] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-4">
                <Image
                  src="/brand/favicon2.png"
                  alt="Love Compatibility Calculator mascot"
                  width={92}
                  height={92}
                  priority
                  className="h-18 w-18 rounded-2xl border border-white/20 bg-white p-1 shadow-[0_12px_26px_rgba(0,0,0,0.25)]"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky-200">Alex + Jamie</p>
                  <p className="mt-1 text-lg font-semibold text-white">Strong match energy</p>
                </div>
              </div>
              <div className="mt-8 flex items-end gap-3">
                <p className="text-8xl font-black leading-none text-white">82</p>
                <p className="pb-4 text-2xl font-black text-slate-300">/100</p>
              </div>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-100">
                Strong spark, easy conversation, and one timing habit worth protecting.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                  <p className="text-xs text-slate-300">Spark</p>
                  <p className="mt-1 text-xl font-black">89</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                  <p className="text-xs text-slate-300">Talk</p>
                  <p className="mt-1 text-xl font-black">78</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                  <p className="text-xs text-slate-300">Long-term</p>
                  <p className="mt-1 text-xl font-black">80</p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950">
                Download story card
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {resultPreview.map((item) => (
                <article key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-300">{item.label}</p>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.text}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Choose your path</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Start with the result you actually want</h2>
          </div>
          <Link href="/tests" className="text-sm font-semibold text-slate-900 hover:text-slate-600">
            View every test
          </Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {testRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
            >
              <h3 className="text-base font-semibold text-slate-900">{route.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{route.note}</p>
            </Link>
          ))}
        </div>
      </section>

      <LiveCompatibilityBoard />

      <InternalLinks heading="Pick a Test" links={homeToolsLinks} />
      <InternalLinks heading="Quick Reads" links={homeGuideLinks} />
      <InternalLinkCluster context={{ type: "home", tags: ["home", "insights"] }} />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
        <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
        <div className="mt-4 space-y-4">
          {homeFaqs.map((faq) => (
            <article key={faq.question}>
              <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
              <p className="mt-1 text-sm text-slate-700">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <p className="text-xs font-medium text-slate-600">
        All calculators and guides on this website are for entertainment purposes and reflection.
      </p>

      <SeoJsonLd schema={faqSchema} />
      <SeoJsonLd schema={breadcrumbSchema} />
      <SeoJsonLd schema={webAppSchema} />
    </div>
  );
}
