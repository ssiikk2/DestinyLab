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
    <article className="premium-card space-y-8 p-6 md:p-10">
      <header className="space-y-3">
        <p className="label-caps">Guide</p>
        <h1 className="text-4xl font-semibold text-text-main md:text-5xl">{post.title}</h1>
        <p className="max-w-3xl text-text-muted">{post.description}</p>
      </header>

      {post.sections.map((section) => (
        <section key={section.heading} className="space-y-4">
          <h2 className="text-3xl font-semibold text-text-main">{section.heading}</h2>
          <h3 className="text-xl font-semibold text-text-muted">{section.subheading}</h3>
          {section.paragraphs.map((paragraph, index) => (
            <p key={`${section.heading}-${index}`} className="text-text-muted">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <section className="rounded-2xl border border-border-soft bg-bg-muted p-5">
        <h2 className="text-2xl font-semibold text-text-main">FAQ</h2>
        <div className="mt-3 space-y-4">
          {post.faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-lg font-semibold text-text-main">{faq.question}</h3>
              <p className="mt-1 text-text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-text-main">Related reads</h2>
        <ul className="space-y-1 text-text-muted">
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

      <p className="text-sm font-semibold text-text-tertiary">
        {appEnv.siteName} content is for entertainment only and does not replace professional advice.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </article>
  );
}