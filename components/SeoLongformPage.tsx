import Link from "next/link";
import { CalculatorHook } from "@/components/CalculatorHook";
import { StructuredData } from "@/components/StructuredData";
import type { SeoPageRecord } from "@/content/seo-data";
import { getToolPageRichContent } from "@/content/tool-page-content";
import { buildArticleSchema, buildFaqSchema, buildWebApplicationSchema } from "@/lib/schema";
import { formatHumanDate } from "@/lib/seo";
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

export function SeoLongformPage({
  page,
  calculatorMode,
  includeArticleSchema = false,
  includeWebApplicationSchema = false,
}: SeoLongformPageProps) {
  const theme = getModeTheme(calculatorMode);
  const richToolContent = page.kind === "tool" ? getToolPageRichContent(calculatorMode) : null;
  const faqs = richToolContent?.faqs ?? page.faqs;
  const faqSchema = buildFaqSchema(faqs);
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
        { heading: "Pros", paragraphs: page.sections.pros },
        { heading: "Challenges", paragraphs: page.sections.challenges },
        { heading: "Tips", paragraphs: page.sections.tips },
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

      <CalculatorHook mode={calculatorMode} />

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

      <section className={cardClass}>
        <h2 className={`text-2xl font-semibold ${theme.accentTextClass}`}>FAQ</h2>
        <div className="mt-3 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="space-y-1">
              <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
              <p className="text-sm text-slate-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

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

      <p className="text-xs font-medium text-slate-600">
        {richToolContent?.disclaimer ?? "For reflection and entertainment purposes."}
      </p>

      <StructuredData data={faqSchema} />
      {articleSchema ? <StructuredData data={articleSchema} /> : null}
      {webApplicationSchema ? <StructuredData data={webApplicationSchema} /> : null}
    </article>
  );
}
