import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogBySlug } from "@/content/blog-seeds";
import { appEnv, getBaseUrl } from "@/lib/env";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return { title: "Article" };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${getBaseUrl()}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const relatedPosts = blogPosts.filter((entry) => entry.slug !== post.slug).slice(0, 3);

  return (
    <article className="space-y-8 rounded-3xl border border-white/40 bg-white/85 p-6 shadow-lg md:p-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">SEO Guide</p>
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">{post.title}</h1>
        <p className="max-w-3xl text-slate-700">{post.description}</p>
      </header>

      {post.sections.map((section) => (
        <section key={section.heading} className="space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">{section.heading}</h2>
          <h3 className="text-xl font-semibold text-slate-700">{section.subheading}</h3>
          {section.paragraphs.map((paragraph, index) => (
            <p key={`${section.heading}-${index}`} className="leading-8 text-slate-700">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
        {post.faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
            <p className="mt-1 text-slate-700">{faq.answer}</p>
          </div>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Internal Links</h2>
        <ul className="space-y-1 text-slate-700">
          <li>
            <Link className="underline" href="/compatibility/aries-and-scorpio">
              Aries and Scorpio compatibility page
            </Link>
          </li>
          {relatedPosts.map((related) => (
            <li key={related.slug}>
              <Link className="underline" href={`/blog/${related.slug}`}>
                {related.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm text-slate-500">
        {appEnv.siteName} content is for entertainment purposes only. No medical, legal, or financial guarantees.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </article>
  );
}