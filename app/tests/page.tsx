import type { Metadata } from "next";
import Link from "next/link";
import { landingPages } from "@/content/landing-pages";
import { getGeneratedLandingCopy } from "@/lib/landing-copy-service";
import { buildMetadata } from "@/lib/seo";
import { getModeTheme } from "@/lib/test-themes";

export const metadata: Metadata = buildMetadata({
  title: "All Compatibility Tests",
  description:
    "Pick your favorite love test, from zodiac and names to crush, birthday, and couple readings.",
  path: "/tests",
});

export const revalidate = 86400;
export const dynamic = "force-static";

export default async function TestsHubPage() {
  const tools = landingPages.filter((page) => page.calculatorMode);
  const toolMap = new Map(tools.map((tool) => [tool.path, tool]));
  const generatedCopies = await Promise.all(
    tools.map(async (tool) => {
      if (!tool.calculatorMode) {
        return null;
      }

      const copy = await getGeneratedLandingCopy({
        mode: tool.calculatorMode,
        path: tool.path,
        h1: tool.h1,
      });

      return copy ? [tool.path, copy.cardDescription] as const : null;
    }),
  );

  const generatedDescriptionsMap = new Map<string, string>(
    generatedCopies.filter(Boolean) as Array<readonly [string, string]>,
  );

  const positionedDescriptions: Record<string, string> = {
    "/calculator":
      "Your main love read. Start here for the full vibe check, then branch out.",
    "/love-percentage":
      "A fast spark meter for right-now energy. Quick, playful, and easy to share.",
    "/true-love-test":
      "A deeper check for trust, follow-through, and how you handle hard moments.",
    "/couple-test":
      "A playful duo challenge. Compare habits, laugh a little, and spot your next move.",
  };

  const groups = [
    {
      title: "Name-Based Tests",
      intro: "Type names or initials and see what kind of chemistry shows up.",
      paths: ["/name-compatibility", "/initials-love-test"],
    },
    {
      title: "Zodiac-Based Tests",
      intro: "Pick signs and compare how your styles click or clash.",
      paths: ["/zodiac-compatibility"],
    },
    {
      title: "Birth-Date Tests",
      intro: "Use birth dates for timing, rhythm, and personality patterns.",
      paths: ["/birthday-compatibility", "/destiny"],
    },
    {
      title: "Fun Relationship Games",
      intro: "Light, social, and a little chaotic in the best way.",
      paths: ["/love-percentage", "/true-love-test", "/couple-test", "/crush-calculator", "/friendship-compatibility"],
    },
  ] as const;

  const primaryTool = toolMap.get("/calculator");

  function renderCard(tool: (typeof tools)[number]) {
    const theme = getModeTheme(tool.calculatorMode || "love");
    const cardDescription = positionedDescriptions[tool.path] || generatedDescriptionsMap.get(tool.path);

    return (
      <article
        key={tool.path}
        className={`rounded-3xl border ${theme.cardBorderClass} bg-white/90 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.07)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,23,42,0.12)]`}
      >
        <div className="flex flex-wrap gap-2">
          <p className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme.pillClass}`}>{theme.label}</p>
        </div>
        <h2 className="mt-3 text-xl font-semibold text-slate-900">{tool.h1}</h2>
        <p className="mt-2 text-sm text-slate-700">{cardDescription || "Pick this test for a fresh angle."}</p>
        <Link
          href={tool.path}
          className={`mt-4 inline-block rounded-xl px-4 py-2 text-sm font-semibold transition ${theme.buttonClass} ${theme.buttonHoverClass}`}
        >
          Try this test
        </Link>
      </article>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">All compatibility tests</h1>
        <p className="mt-2 text-sm text-slate-700 md:text-base">
          Start with the main tool, then jump into the exact style you want.
        </p>
      </header>

      {primaryTool ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Primary Love Compatibility Tool</h2>
          <p className="text-sm text-slate-700">
            This is the anchor test. Run it first, then compare with one category below.
          </p>
          <div className="grid gap-4 md:grid-cols-2">{renderCard(primaryTool)}</div>
        </section>
      ) : null}

      {groups.map((group) => {
        const groupTools = group.paths
          .map((path) => toolMap.get(path))
          .filter(Boolean) as (typeof tools)[number][];

        if (groupTools.length === 0) {
          return null;
        }

        return (
          <section key={group.title} className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">{group.title}</h2>
            <p className="text-sm text-slate-700">{group.intro}</p>
            <div className="grid gap-4 md:grid-cols-2">{groupTools.map(renderCard)}</div>
          </section>
        );
      })}
    </section>
  );
}
