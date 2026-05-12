import Link from "next/link";
import { Suspense } from "react";
import { CalculatorHook } from "@/components/CalculatorHook";
import { SeoClusterLinks } from "@/components/SeoClusterLinks";
import { StructuredData } from "@/components/StructuredData";
import type { SeoPageRecord } from "@/content/seo-data";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema, buildWebApplicationSchema } from "@/lib/schema";
import { formatHumanDate } from "@/lib/seo";
import { getToolPageRichContent } from "@/lib/tool-guide-content-service";
import { getModeTheme, type CalculatorMode } from "@/lib/test-themes";

interface SeoLongformPageProps {
  page: SeoPageRecord;
  calculatorMode: CalculatorMode;
  includeArticleSchema?: boolean;
  includeWebApplicationSchema?: boolean;
}

interface RenderSection {
  heading: string;
  paragraphs: string[];
}

interface ConversionLink {
  href: string;
  label: string;
  note: string;
}

function crumbsForPage(page: SeoPageRecord): Array<{ name: string; path: string }> {
  if (page.path.startsWith("/blog/")) {
    return [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: page.h1, path: page.path },
    ];
  }

  if (page.path.startsWith("/zodiac/")) {
    return [
      { name: "Home", path: "/" },
      { name: "Zodiac", path: "/zodiac" },
      { name: page.h1, path: page.path },
    ];
  }

  return [
    { name: "Home", path: "/" },
    { name: page.h1, path: page.path },
  ];
}

function getConversionLinks(page: SeoPageRecord, calculatorMode: CalculatorMode): ConversionLink[] {
  const keyword = `${page.keyword} ${page.slug}`.toLowerCase();

  if (keyword.includes("zodiac") || page.kind === "zodiac" || calculatorMode === "zodiac") {
    return [
      {
        href: "/zodiac-compatibility",
        label: "Run a zodiac compatibility test",
        note: "Compare your sign match with a live score and practical next steps.",
      },
      {
        href: "/zodiac",
        label: "Browse the zodiac hub",
        note: "Jump into sign-pair guides when you want a more specific read.",
      },
      {
        href: "/calculator",
        label: "Check the main calculator",
        note: "Use the general tool to compare zodiac insight with a broader match score.",
      },
    ];
  }

  if (keyword.includes("name")) {
    return [
      {
        href: "/name-compatibility",
        label: "Run the name compatibility test",
        note: "Use two names to get a quick chemistry score and interpretation.",
      },
      {
        href: "/love-calculator-by-name",
        label: "Try love calculator by name",
        note: "A better fit when the search intent is a name-first love score.",
      },
      {
        href: "/initials-love-test",
        label: "Try initials next",
        note: "Use initials for a lighter, faster comparison after the name result.",
      },
    ];
  }

  if (keyword.includes("birthday") || keyword.includes("life path") || keyword.includes("numerology")) {
    return [
      {
        href: "/birthday-compatibility",
        label: "Run birthday compatibility",
        note: "Use birthdays to compare timing, pace, and daily rhythm.",
      },
      {
        href: "/compatibility-by-birthday",
        label: "Open compatibility by birthday",
        note: "A focused page for date-based matching and rhythm interpretation.",
      },
      {
        href: "/destiny",
        label: "Try a solo destiny reading",
        note: "Use this when you want personal pattern context before comparing with someone else.",
      },
    ];
  }

  if (keyword.includes("crush")) {
    return [
      {
        href: "/crush-calculator",
        label: "Run the crush calculator",
        note: "A low-pressure way to check early interest and next-step energy.",
      },
      {
        href: "/love-percentage",
        label: "Get a quick love percentage",
        note: "Use a fast percentage when you want something easy to share.",
      },
      {
        href: "/true-love-test",
        label: "Compare with true love",
        note: "Use this only if the crush is starting to feel more serious.",
      },
    ];
  }

  if (keyword.includes("low") || keyword.includes("next steps") || keyword.includes("advice")) {
    return [
      {
        href: "/true-love-test",
        label: "Run the true love test",
        note: "Use a deeper test to compare trust, effort, and staying power.",
      },
      {
        href: "/couple-test",
        label: "Try the couple test",
        note: "A good follow-up when the guide points to habits, timing, or repair work.",
      },
      {
        href: "/calculator",
        label: "Retake the main calculator",
        note: "Use the main score as your baseline before checking a second angle.",
      },
    ];
  }

  return [
    {
      href: "/calculator",
      label: "Run the main compatibility calculator",
      note: "Start with the broad score, then use the guide to interpret what changed.",
    },
    {
      href: "/love-percentage",
      label: "Check love percentage",
      note: "Use this when you want a faster, more shareable result.",
    },
    {
      href: "/tests",
      label: "Compare all tests",
      note: "Pick a second test to see whether the same theme repeats.",
    },
  ];
}

export async function SeoLongformPage({
  page,
  calculatorMode,
  includeArticleSchema = false,
  includeWebApplicationSchema = false,
}: SeoLongformPageProps) {
  const theme = getModeTheme(calculatorMode);
  const richToolContent =
    page.kind === "tool" || page.kind === "zodiac"
      ? await getToolPageRichContent({
          mode: calculatorMode,
          path: page.path,
          h1: page.h1,
          keyword: page.keyword,
        })
      : null;
  const faqs = richToolContent?.faqs ?? page.faqs;
  const fallbackFaqs = [
    {
      question: "How should I use this score meaning in real life?",
      answer: "Use it to choose one communication action, then review what changed after a week.",
    },
    {
      question: "What if the insights feel mixed?",
      answer: "Look for repeated strengths and challenges, then prioritize the clearest next step.",
    },
    {
      question: "Can this help with long-term decisions?",
      answer: "It helps frame the conversation, but long-term outcomes still depend on behavior.",
    },
  ];
  const displayFaqs = faqs.length >= 6 ? faqs : [...faqs, ...fallbackFaqs].slice(0, 6);
  const faqSchema = buildFaqSchema(displayFaqs);
  const breadcrumbSchema = buildBreadcrumbSchema(crumbsForPage(page));
  const articleSchema = includeArticleSchema
    ? buildArticleSchema({
        path: page.path,
        title: page.title,
        description: page.description,
        publishedAt: page.lastUpdated,
        updatedAt: page.lastUpdated,
      })
    : null;

  const webApplicationSchema = includeWebApplicationSchema
    ? buildWebApplicationSchema({
        path: page.path,
        title: page.title,
        description: page.description,
      })
    : null;
  const conversionLinks = getConversionLinks(page, calculatorMode);

  const sections: RenderSection[] = richToolContent
    ? [
        {
          heading: "Symbolic compatibility concept",
          paragraphs: richToolContent.concept,
        },
        {
          heading: "How to interpret your score",
          paragraphs: richToolContent.scoreInterpretation,
        },
        {
          heading: "Practical relationship tips",
          paragraphs: richToolContent.practicalTips,
        },
        {
          heading: "Next steps for better results",
          paragraphs: richToolContent.nextSteps,
        },
      ]
    : [
        { heading: "Breakdown", paragraphs: page.sections.breakdown },
        { heading: "What feels easy", paragraphs: page.sections.pros },
        { heading: "What needs care", paragraphs: page.sections.challenges },
        { heading: "Tiny moves that help", paragraphs: page.sections.tips },
      ];

  const cardClass = `rounded-3xl border ${theme.cardBorderClass} bg-white/88 p-6 shadow-[0_12px_36px_rgba(15,23,42,0.08)] backdrop-blur-sm`;

  return (
    <article className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <header
        className={`rounded-3xl border ${theme.cardBorderClass} bg-gradient-to-br ${theme.heroGradientClass} p-6 shadow-[0_12px_36px_rgba(15,23,42,0.08)]`}
      >
        <p
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${theme.pillClass}`}
        >
          {theme.label} guide
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">{page.h1}</h1>
        <p className="mt-2 text-base text-slate-700">{page.intro}</p>
        <p className="mt-2 text-xs font-medium text-slate-500">
          Last updated: {formatHumanDate(page.lastUpdated)}
        </p>
      </header>

      <Suspense fallback={null}>
        <CalculatorHook mode={calculatorMode} variantKey={page.path} titleOverride={page.h1} />
      </Suspense>

      <section className={cardClass}>
        <h2 className={`text-2xl font-semibold ${theme.accentTextClass}`}>Use this guide with a live test</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          A guide is useful, but a live result makes it easier to compare strengths, pressure points, and next steps.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {conversionLinks.map((item) => (
            <article key={`${page.slug}-${item.href}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">{item.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.note}</p>
              <Link
                href={item.href}
                className="mt-3 inline-flex rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                Open test
              </Link>
            </article>
          ))}
        </div>
      </section>

      {sections.map((section) => (
        <section key={`${page.slug}-${section.heading}`} className={cardClass}>
          <h2 className={`text-2xl font-semibold ${theme.accentTextClass}`}>{section.heading}</h2>
          <div className="mt-3 space-y-3">
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${page.slug}-${section.heading}-${index}`} className="text-sm text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      {displayFaqs.length > 0 ? (
        <section className={cardClass}>
          <h2 className={`text-2xl font-semibold ${theme.accentTextClass}`}>FAQ</h2>
          <div className="mt-3 space-y-4">
            {displayFaqs.map((faq) => (
              <div key={faq.question} className="space-y-1">
                <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
                <p className="text-sm text-slate-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className={cardClass}>
        <h2 className={`text-2xl font-semibold ${theme.accentTextClass}`}>Related links</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {page.relatedLinks.map((link) => (
            <li key={`${page.slug}-${link.href}`}>
              <Link href={link.href} className="underline decoration-slate-400 hover:decoration-slate-900">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SeoClusterLinks context={{ type: page.kind === "blog" ? "guide" : "tool", tags: [page.kind, page.slug] }} />

      <section className={cardClass}>
        <h2 className={`text-2xl font-semibold ${theme.accentTextClass}`}>Try the calculator</h2>
        <p className="mt-2 text-sm text-slate-700">
          Run the main test, then compare this guide with your live result.
        </p>
        <Link
          href="/calculator"
          className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Open calculator
        </Link>
      </section>

      {richToolContent?.disclaimer ? (
        <p className="text-xs font-medium text-slate-600">{richToolContent.disclaimer}</p>
      ) : null}

      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      {articleSchema ? <StructuredData data={articleSchema} /> : null}
      {webApplicationSchema ? <StructuredData data={webApplicationSchema} /> : null}
    </article>
  );
}
