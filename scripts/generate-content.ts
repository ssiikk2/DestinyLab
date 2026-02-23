import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { resolve } from "path";
import {
  allSeoPages,
  getBlogPages,
  getToolPages,
  getZodiacPages,
  type SeoPageRecord,
  type SeoSections,
  type SeoFaq,
} from "../content/seo-data";
import {
  generateTextWithAzureMultiRegion,
  type AzureModelTier,
  type UsageStats,
} from "../lib/server/azure-openai-multi-region";

interface GeneratedContent {
  slug: string;
  path: string;
  keyword: string;
  title: string;
  description: string;
  intro: string;
  sections: SeoSections;
  faqs: SeoFaq[];
  lastUpdated: string;
}

interface ScriptArgs {
  force: boolean;
  keywords?: string[];
  targetWords?: number;
}

interface GenerationStats {
  generated: number;
  skipped: number;
  failed: number;
  usageTotals: UsageStats;
}

const CONTENT_DIR = resolve(process.cwd(), "content", "generated");
const DEFAULT_BATCH_SIZE = 3;

function parseArgs(): ScriptArgs {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const keywordsArg = args.find((arg) => arg.startsWith("--keywords="));
  const wordsArg = args.find((arg) => arg.startsWith("--words="));

  const keywords = keywordsArg
    ? keywordsArg
        .replace("--keywords=", "")
        .split(",")
        .map((entry) => entry.trim().toLowerCase())
        .filter(Boolean)
    : undefined;

  const targetWords = wordsArg
    ? Number.parseInt(wordsArg.replace("--words=", ""), 10)
    : undefined;

  return {
    force,
    keywords,
    targetWords: Number.isFinite(targetWords) ? targetWords : undefined,
  };
}

function chooseModel(targetWords: number): AzureModelTier {
  return targetWords < 900 ? "gpt-5-nano" : "gpt-5-mini";
}

function defaultTargetWords(page: SeoPageRecord): number {
  if (page.kind === "zodiac") {
    return 900;
  }

  if (page.kind === "tool") {
    return 980;
  }

  return 1020;
}

function pickTargets(args: ScriptArgs): SeoPageRecord[] {
  if (!args.keywords || args.keywords.length === 0) {
    return allSeoPages;
  }

  const wanted = new Set(args.keywords);

  return allSeoPages.filter((page) => wanted.has(page.keyword.toLowerCase()));
}

function stripFences(input: string): string {
  return input.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
}

function parseJson<T>(input: string): T | null {
  try {
    return JSON.parse(stripFences(input)) as T;
  } catch {
    return null;
  }
}

function asParagraphs(input: unknown): string[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
    .slice(0, 4);
}

function asFaqs(input: unknown): SeoFaq[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const question = "question" in item && typeof item.question === "string" ? item.question.trim() : "";
      const answer = "answer" in item && typeof item.answer === "string" ? item.answer.trim() : "";

      if (!question || !answer) {
        return null;
      }

      return { question, answer };
    })
    .filter((item): item is SeoFaq => Boolean(item))
    .slice(0, 6);
}

function buildPrompt(page: SeoPageRecord, targetWords: number): string {
  return [
    `Keyword: ${page.keyword}`,
    `Page type: ${page.kind}`,
    `Target words: ${targetWords}`,
    "Return JSON only with this schema:",
    '{"intro":string,"sections":{"breakdown":[string],"pros":[string],"challenges":[string],"tips":[string]},"faqs":[{"question":string,"answer":string}]}',
    "Rules:",
    "- Total article body 800 to 1200 words.",
    "- Intro must include exact keyword once.",
    "- Keep reading level simple with short paragraphs.",
    "- 5 FAQ entries minimum.",
    "- Use wording: 'This calculator estimates...' and 'For reflection and entertainment purposes.' where relevant.",
    "- Do not use these terms: AI-generated, Powered by AI, Advanced algorithm, Machine learning, ChatGPT.",
    "- Keep each section actionable and non-repetitive.",
  ].join("\n");
}

function fallbackGenerated(page: SeoPageRecord): GeneratedContent {
  return {
    slug: page.slug,
    path: page.path,
    keyword: page.keyword,
    title: page.title,
    description: page.description,
    intro: page.intro,
    sections: page.sections,
    faqs: page.faqs,
    lastUpdated: page.lastUpdated,
  };
}

function validateGenerated(page: SeoPageRecord, payload: unknown): GeneratedContent | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const intro = "intro" in payload && typeof payload.intro === "string" ? payload.intro.trim() : "";
  const sectionsRaw = "sections" in payload && payload.sections ? payload.sections : null;
  const faqsRaw = "faqs" in payload ? payload.faqs : null;

  const sections = {
    breakdown:
      sectionsRaw && typeof sectionsRaw === "object" && "breakdown" in sectionsRaw
        ? asParagraphs(sectionsRaw.breakdown)
        : [],
    pros:
      sectionsRaw && typeof sectionsRaw === "object" && "pros" in sectionsRaw
        ? asParagraphs(sectionsRaw.pros)
        : [],
    challenges:
      sectionsRaw && typeof sectionsRaw === "object" && "challenges" in sectionsRaw
        ? asParagraphs(sectionsRaw.challenges)
        : [],
    tips:
      sectionsRaw && typeof sectionsRaw === "object" && "tips" in sectionsRaw
        ? asParagraphs(sectionsRaw.tips)
        : [],
  };

  const faqs = asFaqs(faqsRaw);

  if (!intro || sections.breakdown.length < 3 || sections.pros.length < 3 || sections.challenges.length < 3 || sections.tips.length < 3 || faqs.length < 5) {
    return null;
  }

  return {
    slug: page.slug,
    path: page.path,
    keyword: page.keyword,
    title: page.title,
    description: page.description,
    intro,
    sections,
    faqs,
    lastUpdated: new Date().toISOString().slice(0, 10),
  };
}

function sumUsage(current: UsageStats, incoming: UsageStats): UsageStats {
  return {
    promptTokens: current.promptTokens + incoming.promptTokens,
    completionTokens: current.completionTokens + incoming.completionTokens,
    totalTokens: current.totalTokens + incoming.totalTokens,
  };
}

async function generateOne(page: SeoPageRecord, args: ScriptArgs): Promise<{ file: string; usage: UsageStats; skipped: boolean; failed: boolean }> {
  const outputPath = resolve(CONTENT_DIR, `${page.slug}.json`);

  if (!args.force && existsSync(outputPath)) {
    return {
      file: outputPath,
      usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      skipped: true,
      failed: false,
    };
  }

  const targetWords = args.targetWords ?? defaultTargetWords(page);
  const model = chooseModel(targetWords);

  try {
    const completion = await generateTextWithAzureMultiRegion({
      prompt: buildPrompt(page, targetWords),
      systemPrompt: "Return compact JSON only.",
      model,
      maxOutputTokens: targetWords < 900 ? 1300 : 1800,
      jsonMode: true,
      cacheNamespace: "seo-generation",
      forceRefresh: args.force,
    });

    const parsed = parseJson<unknown>(completion.text);
    const validated = validateGenerated(page, parsed);
    const payload = validated || fallbackGenerated(page);

    await writeFile(outputPath, JSON.stringify(payload, null, 2), "utf-8");

    process.stdout.write(
      `[generated] ${page.slug} | model=${model} | endpoint=${completion.endpointUsed} | tokens=${completion.usage.totalTokens} | cached=${completion.cached}\n`,
    );

    return {
      file: outputPath,
      usage: completion.usage,
      skipped: false,
      failed: false,
    };
  } catch (error) {
    const fallback = fallbackGenerated(page);
    await writeFile(outputPath, JSON.stringify(fallback, null, 2), "utf-8");

    process.stdout.write(`[fallback] ${page.slug} | ${(error as Error).message}\n`);

    return {
      file: outputPath,
      usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      skipped: false,
      failed: true,
    };
  }
}

async function runBatch(pages: SeoPageRecord[], args: ScriptArgs): Promise<GenerationStats> {
  const stats: GenerationStats = {
    generated: 0,
    skipped: 0,
    failed: 0,
    usageTotals: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
  };

  for (let index = 0; index < pages.length; index += DEFAULT_BATCH_SIZE) {
    const batch = pages.slice(index, index + DEFAULT_BATCH_SIZE);
    const batchResults = await Promise.all(batch.map((page) => generateOne(page, args)));

    for (const result of batchResults) {
      if (result.skipped) {
        stats.skipped += 1;
      } else {
        stats.generated += 1;
      }

      if (result.failed) {
        stats.failed += 1;
      }

      stats.usageTotals = sumUsage(stats.usageTotals, result.usage);
    }
  }

  return stats;
}

async function writeCombinedIndex(): Promise<void> {
  const combined = {
    generatedAt: new Date().toISOString(),
    total: allSeoPages.length,
    tools: getToolPages().map((page) => page.slug),
    zodiac: getZodiacPages().map((page) => page.slug),
    blog: getBlogPages().map((page) => page.slug),
  };

  await writeFile(resolve(CONTENT_DIR, "seo-pages.index.json"), JSON.stringify(combined, null, 2), "utf-8");
}

async function main() {
  const args = parseArgs();
  const targets = pickTargets(args);

  await mkdir(CONTENT_DIR, { recursive: true });

  if (targets.length === 0) {
    process.stdout.write("No matching keywords were found.\n");
    return;
  }

  process.stdout.write(`Generating ${targets.length} pages...\n`);

  const stats = await runBatch(targets, args);
  await writeCombinedIndex();

  process.stdout.write("\nGeneration summary\n");
  process.stdout.write(`generated: ${stats.generated}\n`);
  process.stdout.write(`skipped: ${stats.skipped}\n`);
  process.stdout.write(`failed (fallback used): ${stats.failed}\n`);
  process.stdout.write(`prompt tokens: ${stats.usageTotals.promptTokens}\n`);
  process.stdout.write(`completion tokens: ${stats.usageTotals.completionTokens}\n`);
  process.stdout.write(`total tokens: ${stats.usageTotals.totalTokens}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
