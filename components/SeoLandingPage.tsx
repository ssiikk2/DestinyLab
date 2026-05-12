import Link from "next/link";
import { Suspense } from "react";
import { CalculatorHook } from "@/components/CalculatorHook";
import { InternalLinks } from "@/components/InternalLinks";
import { SeoClusterLinks } from "@/components/SeoClusterLinks";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import type { LandingPageRecord } from "@/content/landing-pages";
import { getGeneratedLandingCopy } from "@/lib/landing-copy-service";
import { absoluteUrl, formatHumanDate } from "@/lib/seo";

interface SeoLandingPageProps {
  page: LandingPageRecord;
}

function buildFaqSchema(page: LandingPageRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function buildBreadcrumbSchema(page: LandingPageRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

function buildWebApplicationSchema(page: LandingPageRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: page.h1,
    description: page.description,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    url: absoluteUrl(page.path),
  };
}

const scoreGuides = {
  love: {
    example: "Example result: 82/100 with strong chemistry, fast attraction, and one timing habit to clean up.",
    high: "70-100 means the match has an easy hook. Use the result to protect the strength that already works.",
    middle: "45-69 means the connection may work, but only if communication gets more direct and predictable.",
    low: "0-44 means the score is a warning light, not a final answer. Start with one simple boundary or check-in.",
    next: "Best next move: compare the score with one real behavior from this week before retesting.",
  },
  name: {
    example: "Example result: 76/100 with playful name chemistry and a note about first-message energy.",
    high: "70-100 suggests an easy symbolic match and a strong opening vibe.",
    middle: "45-69 suggests mixed signals. Look for effort, response timing, and emotional clarity.",
    low: "0-44 suggests the names make a fun contrast, but real behavior matters much more.",
    next: "Best next move: try the same pair on the main calculator and compare the repeated themes.",
  },
  initials: {
    example: "Example result: 68/100 with quick spark, light tension, and one conversation starter.",
    high: "70-100 means the initials read as smooth and easy to share.",
    middle: "45-69 means the result is best used as a quick icebreaker.",
    low: "0-44 means keep it playful and avoid overreading the number.",
    next: "Best next move: use initials first, then run a name-based test for a fuller read.",
  },
  crush: {
    example: "Example result: 71/100 with obvious interest, a little uncertainty, and a low-pressure next step.",
    high: "70-100 means the crush read has momentum. Keep the next move light and specific.",
    middle: "45-69 means the signal needs more context before you chase it.",
    low: "0-44 means the result points to caution. Protect your confidence and keep it casual.",
    next: "Best next move: send one simple message or compare with the true love test if things get serious.",
  },
  friendship: {
    example: "Example result: 84/100 with steady trust, easy humor, and one reminder about boundaries.",
    high: "70-100 means the friendship has strong rhythm and low-friction support.",
    middle: "45-69 means the friendship may need clearer expectations.",
    low: "0-44 means the connection may still be fun, but trust and timing need care.",
    next: "Best next move: choose one check-in habit that makes the friendship easier to maintain.",
  },
  zodiac: {
    example: "Example result: Aries + Scorpio at 79/100, with strong spark and a warning about control battles.",
    high: "70-100 means the signs share an easy symbolic pattern or complementary energy.",
    middle: "45-69 means the match depends on maturity, communication, and conflict style.",
    low: "0-44 means the signs may clash unless both people create clear rules for pressure moments.",
    next: "Best next move: open the zodiac hub and compare the pair guide with your live score.",
  },
  birthday: {
    example: "Example result: 73/100 with compatible pacing, different stress rhythms, and a scheduling tip.",
    high: "70-100 means timing, rhythm, or routine may feel naturally easier.",
    middle: "45-69 means daily pacing may need explicit planning.",
    low: "0-44 means the date-based read points to timing friction, not relationship failure.",
    next: "Best next move: set one response-time or planning expectation and review it after a week.",
  },
  destiny: {
    example: "Example result: a solo destiny read that highlights emotional style, hidden strength, and a growth edge.",
    high: "70-100 means your current pattern is easier to work with when you stay consistent.",
    middle: "45-69 means self-awareness matters more than guessing someone else's motives.",
    low: "0-44 means the result is asking for rest, boundaries, or a smaller next step.",
    next: "Best next move: pick one personal habit to test before comparing with another relationship tool.",
  },
} as const;

const intentGuides: Record<
  string,
  {
    heading: string;
    intro: string;
    useCases: string[];
    comparePath: { href: string; label: string; note: string };
    searcherPromise: string;
  }
> = {
  "/calculator": {
    heading: "Best for a complete compatibility check",
    intro:
      "Use this page when you want the broadest read: attraction, communication, pressure points, and one realistic next move.",
    useCases: [
      "You want one main score before trying niche tests.",
      "You are comparing a crush, partner, or long-term match.",
      "You want a shareable result that still gives practical advice.",
    ],
    comparePath: {
      href: "/true-love-test",
      label: "Compare with the True Love Test",
      note: "Use the true love version when you want a deeper read on trust and staying power.",
    },
    searcherPromise:
      "Searchers usually want a fast score first, then a plain explanation of what that score means. This page is built for that flow.",
  },
  "/love-percentage": {
    heading: "Best for a quick love percentage",
    intro:
      "Use this page when the number matters most and you want a result that is easy to screenshot, copy, or send.",
    useCases: [
      "You want an instant percentage without a long setup.",
      "You are making a playful comparison with friends.",
      "You want to see whether the score feels high, mixed, or surprising.",
    ],
    comparePath: {
      href: "/love-calculator-by-name",
      label: "Try Love Calculator By Name",
      note: "Run the same pair by name if you want a second percentage-style angle.",
    },
    searcherPromise:
      "People searching for a love percentage usually expect speed. Keep the result light, then use the score bands to avoid overreading it.",
  },
  "/name-compatibility": {
    heading: "Best for name-based chemistry",
    intro:
      "Use this page when you want a symbolic read based on two names and a quick interpretation of the vibe.",
    useCases: [
      "You want to compare preferred names, nicknames, or full names.",
      "You are testing early dating chemistry in a low-pressure way.",
      "You want a second angle before using zodiac or birthday tests.",
    ],
    comparePath: {
      href: "/initials-love-test",
      label: "Try the Initials Love Test",
      note: "Initials are faster and lighter, which makes them useful for quick comparisons.",
    },
    searcherPromise:
      "Name compatibility searches are usually playful, but the page still needs useful interpretation. This version keeps both.",
  },
  "/zodiac-compatibility": {
    heading: "Best for sign chemistry and conflict style",
    intro:
      "Use this page when signs are the starting point and you want chemistry, communication, and friction explained together.",
    useCases: [
      "You want to compare two zodiac signs quickly.",
      "You are checking whether a sign match is easy, intense, or high-effort.",
      "You want to move from a broad zodiac read into a specific pair guide.",
    ],
    comparePath: {
      href: "/zodiac",
      label: "Open the Zodiac Hub",
      note: "Use the hub to jump into specific sign-pair pages and compare patterns.",
    },
    searcherPromise:
      "Zodiac searchers expect more than a yes or no. The useful answer is where the spark is, where friction starts, and what to do next.",
  },
  "/true-love-test": {
    heading: "Best for trust, effort, and staying power",
    intro:
      "Use this page when you want a slightly deeper result than a quick percentage and care about long-term signals.",
    useCases: [
      "You want to test whether the connection feels stable, not just exciting.",
      "You are comparing attraction with communication and effort.",
      "You want a result that can start a more honest conversation.",
    ],
    comparePath: {
      href: "/couple-test",
      label: "Compare with the Couple Test",
      note: "The couple test is better when you want a broader shared-habits snapshot.",
    },
    searcherPromise:
      "People searching for a true love test usually want reassurance, but the better result is a grounded read on trust and follow-through.",
  },
};

function buildHowToSchema(page: LandingPageRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${page.h1}`,
    description: page.description,
    step: [
      {
        "@type": "HowToStep",
        name: "Enter your details",
        text: "Add the names, signs, birthdays, or focus words requested by the calculator.",
      },
      {
        "@type": "HowToStep",
        name: "Read the score band",
        text: "Compare the score with the high, medium, or low interpretation on the page.",
      },
      {
        "@type": "HowToStep",
        name: "Choose one next move",
        text: "Use the result as a conversation starter and pick one practical action to try.",
      },
    ],
  };
}

export async function SeoLandingPage({ page }: SeoLandingPageProps) {
  const generatedCopy =
    page.calculatorMode
      ? await getGeneratedLandingCopy({
          mode: page.calculatorMode,
          path: page.path,
          h1: page.h1,
        })
      : null;

  const pageForSchema = {
    ...page,
    faqs: generatedCopy?.faqs ?? page.faqs,
  };
  const faqSchema = buildFaqSchema(pageForSchema);
  const breadcrumbSchema = buildBreadcrumbSchema(page);
  const scoreGuide = page.calculatorMode ? scoreGuides[page.calculatorMode] : null;
  const intentGuide = intentGuides[page.path];
  const howToSchema = page.calculatorMode ? buildHowToSchema(page) : null;
  const isToolPage = Boolean(page.calculatorMode);

  return (
    <article className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-xs text-slate-600">
        <ol className="flex flex-wrap items-center gap-2">
          {page.breadcrumbs.map((crumb, index) => (
            <li key={`${crumb.path}-${crumb.name}`} className="flex items-center gap-2">
              {index > 0 ? <span className="text-slate-400">/</span> : null}
              {index === page.breadcrumbs.length - 1 ? (
                <span className="font-semibold text-slate-800">{crumb.name}</span>
              ) : (
                <Link href={crumb.path} className="hover:text-slate-900">
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {isToolPage && page.calculatorMode ? (
        <section className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-7 shadow-[0_16px_40px_rgba(15,23,42,0.08)] lg:sticky lg:top-24">
            <p className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-slate-600">
              Interactive test
            </p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">{page.h1}</h1>
            <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base">
              {generatedCopy?.intro ?? page.intro}
            </p>
            <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-3 lg:grid-cols-1">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Result</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Score, meaning, and next move</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Compare</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Run another match from the result</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Share</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Copy links and score cards</p>
              </div>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-500">
              Last updated: {formatHumanDate(page.lastUpdated)}
            </p>
          </header>

          <div id="calculator-form">
            <Suspense fallback={null}>
              <CalculatorHook mode={page.calculatorMode} variantKey={page.path} titleOverride={page.h1} />
            </Suspense>
          </div>
        </section>
      ) : (
        <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-7 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{page.h1}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base">
            {generatedCopy?.intro ?? page.intro}
          </p>
          <p className="mt-3 text-xs font-medium text-slate-500">
            Last updated: {formatHumanDate(page.lastUpdated)}
          </p>
        </header>
      )}

      {scoreGuide ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
          <h2 className="text-2xl font-semibold text-slate-900">How to read your result</h2>
          <p className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-800">
            {scoreGuide.example}
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <h3 className="text-sm font-semibold text-emerald-900">High score</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-950">{scoreGuide.high}</p>
            </article>
            <article className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <h3 className="text-sm font-semibold text-amber-900">Middle score</h3>
              <p className="mt-2 text-sm leading-6 text-amber-950">{scoreGuide.middle}</p>
            </article>
            <article className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
              <h3 className="text-sm font-semibold text-rose-900">Low score</h3>
              <p className="mt-2 text-sm leading-6 text-rose-950">{scoreGuide.low}</p>
            </article>
          </div>
          <p className="mt-4 text-sm font-medium leading-6 text-slate-700">{scoreGuide.next}</p>
        </section>
      ) : null}

      {intentGuide ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
          <h2 className="text-2xl font-semibold text-slate-900">{intentGuide.heading}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">{intentGuide.intro}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_0.9fr]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">Use this when</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                {intentGuide.useCases.map((item) => (
                  <li key={`${page.path}-${item}`}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
              <h3 className="text-sm font-semibold text-sky-950">Compare next</h3>
              <p className="mt-2 text-sm leading-6 text-sky-950">{intentGuide.comparePath.note}</p>
              <Link
                href={intentGuide.comparePath.href}
                className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {intentGuide.comparePath.label}
              </Link>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-700">{intentGuide.searcherPromise}</p>
        </section>
      ) : null}

      {(generatedCopy?.sections ?? page.sections).map((section) => (
        <section
          key={`${page.path}-${section.heading}`}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]"
        >
          <h2 className="text-2xl font-semibold text-slate-900">{section.heading}</h2>
          <div className="mt-3 space-y-3">
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${page.path}-${section.heading}-${index}`} className="text-sm leading-7 text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      {(generatedCopy?.faqs ?? page.faqs).length > 0 ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
          <h2 className="text-2xl font-semibold text-slate-900">Frequently asked questions</h2>
          <div className="mt-4 space-y-4">
            {(generatedCopy?.faqs ?? page.faqs).map((faq) => (
              <article key={`${page.path}-${faq.question}`}>
                <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-1 text-sm text-slate-700">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <InternalLinks heading="More to Explore" links={page.relatedLinks} />
      <SeoClusterLinks context={{ type: page.calculatorMode ? "tool" : "guide", tags: [page.path.replace(/\//g, "")] }} />

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-semibold text-slate-900">Try one more</h2>
        <p className="mt-2 text-sm text-slate-700">
          Check one more angle and compare how each result feels side by side.
        </p>
        <Link
          href={page.ctaHref}
          className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {generatedCopy?.ctaLabel ?? page.ctaLabel}
        </Link>
      </section>

      <p className="text-xs font-medium text-slate-600">
        This content is for entertainment purposes and personal reflection.
      </p>

      <SeoJsonLd schema={faqSchema} />
      <SeoJsonLd schema={breadcrumbSchema} />
      {howToSchema ? <SeoJsonLd schema={howToSchema} /> : null}
      {page.includeWebApplication ? <SeoJsonLd schema={buildWebApplicationSchema(page)} /> : null}
    </article>
  );
}
