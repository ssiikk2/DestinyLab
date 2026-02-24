import Link from "next/link";
import { CalculatorHook } from "@/components/CalculatorHook";
import { InternalLinks } from "@/components/InternalLinks";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import type { LandingPageRecord } from "@/content/landing-pages";
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

export function SeoLandingPage({ page }: SeoLandingPageProps) {
  const faqSchema = buildFaqSchema(page);
  const breadcrumbSchema = buildBreadcrumbSchema(page);

  return (
    <article className="mx-auto max-w-5xl space-y-6 px-4 py-8">
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

      <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-7 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{page.h1}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base">{page.intro}</p>
        <p className="mt-3 text-xs font-medium text-slate-500">
          Last updated: {formatHumanDate(page.lastUpdated)}
        </p>
      </header>

      {page.calculatorMode ? (
        <div id="calculator-form">
          <CalculatorHook mode={page.calculatorMode} />
        </div>
      ) : null}

      {page.sections.map((section) => (
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

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
        <h2 className="text-2xl font-semibold text-slate-900">Frequently asked questions</h2>
        <div className="mt-4 space-y-4">
          {page.faqs.map((faq) => (
            <article key={`${page.path}-${faq.question}`}>
              <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
              <p className="mt-1 text-sm text-slate-700">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <InternalLinks heading="Related pages for deeper analysis" links={page.relatedLinks} />

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-semibold text-slate-900">Next step</h2>
        <p className="mt-2 text-sm text-slate-700">
          Use one result to pick one behavior change, then retest after your next review cycle.
        </p>
        <Link
          href={page.ctaHref}
          className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {page.ctaLabel}
        </Link>
      </section>

      <p className="text-xs font-medium text-slate-600">
        This content is for entertainment purposes and personal reflection.
      </p>

      <SeoJsonLd schema={faqSchema} />
      <SeoJsonLd schema={breadcrumbSchema} />
      {page.includeWebApplication ? <SeoJsonLd schema={buildWebApplicationSchema(page)} /> : null}
    </article>
  );
}
