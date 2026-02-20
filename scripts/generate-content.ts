import { mkdir, readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { appEnv, getBaseUrl } from "../lib/env";
import { generateWithGemini } from "../providers/gemini";
import { generateWithOpenAI } from "../providers/openai";

interface KeywordRow {
  keyword: string;
  slug: string;
}

interface GeneratedPost {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  sections: Array<{ heading: string; content: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

function parseCsv(input: string): KeywordRow[] {
  return input
    .split(/\r?\n/)
    .slice(1)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [keyword, slug] = line.split(",");
      return { keyword, slug };
    });
}

function normalizeJson(raw: string): string {
  const clean = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const start = clean.indexOf("{");
  const end = clean.lastIndexOf("}");

  return start >= 0 && end > start ? clean.slice(start, end + 1) : clean;
}

function localFallback(row: KeywordRow): GeneratedPost {
  const longText = `${row.keyword} content performs best when it combines clarity, practical examples, and explicit disclaimers. Treat each section as a behavior guide that helps users take one concrete action today. Reinforce the same core value in different wording: clarity before reaction, routine before emotion, and review before assumption. This pattern keeps pages useful while avoiding repetitive phrasing. Include internal links to related guides and compatibility pages so the article supports discovery and repeat usage.`;

  return {
    slug: row.slug,
    keyword: row.keyword,
    title: `${row.keyword.replace(/-/g, " ")} guide`,
    description:
      "A practical, SEO-focused guide for compatibility and destiny readers.",
    sections: [
      { heading: "Core idea", content: `${longText} ${longText}` },
      { heading: "Communication actions", content: `${longText} ${longText}` },
      { heading: "Long-term strategy", content: `${longText} ${longText}` },
      { heading: "Conflict recovery", content: `${longText} ${longText}` },
      { heading: "Growth plan", content: `${longText} ${longText}` },
      { heading: "30-day checklist", content: `${longText} ${longText}` },
    ],
    faqs: [
      {
        question: `How should I use ${row.keyword}?`,
        answer:
          "Use it as an entertainment-focused reflection framework and turn one insight into a weekly action.",
      },
      {
        question: "How often should content be updated?",
        answer:
          "Update monthly or when search trends shift to keep examples and internal links fresh.",
      },
      {
        question: "Is this medical or legal advice?",
        answer:
          "No. This content is for entertainment and educational context only.",
      },
      {
        question: "What improves engagement the fastest?",
        answer:
          "Clear CTAs, sectioned structure, and shareable result pages with practical summaries.",
      },
      {
        question: "Can this help SEO growth?",
        answer:
          "Yes, when paired with consistent publishing, internal links, and sitemap updates.",
      },
      {
        question: "Should we add ads aggressively?",
        answer:
          "No. Keep ad placement moderate to protect trust and retention.",
      },
    ],
  };
}

async function generatePost(row: KeywordRow): Promise<GeneratedPost> {
  const prompt = `Create one English JSON blog post for keyword: ${row.keyword}
Schema:
{
  "slug": "${row.slug}",
  "keyword": "${row.keyword}",
  "title": string,
  "description": string,
  "sections": [
    { "heading": string, "content": string }
  ],
  "faqs": [
    { "question": string, "answer": string }
  ]
}
Rules:
- 6 sections, each section content 180-240 words.
- 6 FAQs.
- Non-repetitive phrasing.
- No medical/legal guarantees.
- English only.
- Return JSON only.`;

  const raw =
    appEnv.aiProvider === "openai"
      ? await generateWithOpenAI(prompt)
      : await generateWithGemini(prompt);

  if (!raw) {
    return localFallback(row);
  }

  try {
    const json = JSON.parse(normalizeJson(raw)) as GeneratedPost;

    if (!json.sections || !json.faqs) {
      return localFallback(row);
    }

    return {
      ...json,
      slug: row.slug,
      keyword: row.keyword,
    };
  } catch {
    return localFallback(row);
  }
}

async function pingIndexNow(urls: string[]) {
  if (!appEnv.indexNowKey) {
    return;
  }

  const baseUrl = getBaseUrl();
  const key = appEnv.indexNowKey;
  const payload = {
    host: new URL(baseUrl).host,
    key,
    keyLocation: `${baseUrl}/${key}.txt`,
    urlList: urls,
  };

  await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

async function main() {
  const csvPath = resolve(process.cwd(), "keywords.csv");
  const outputPath = resolve(process.cwd(), "content", "blog.generated.json");
  const shouldPing = process.argv.includes("--ping-indexnow");

  const raw = await readFile(csvPath, "utf-8");
  const rows = parseCsv(raw);
  const posts: GeneratedPost[] = [];

  for (const row of rows) {
    const post = await generatePost(row);
    posts.push(post);
    process.stdout.write(`Generated: ${row.slug}\n`);
  }

  await mkdir(resolve(process.cwd(), "content"), { recursive: true });
  await writeFile(outputPath, JSON.stringify(posts, null, 2), "utf-8");

  if (shouldPing) {
    const base = getBaseUrl();
    const urls = posts.map((post) => `${base}/blog/${post.slug}`);
    await pingIndexNow(urls);
    process.stdout.write(`IndexNow ping submitted for ${urls.length} URLs\n`);
  }

  process.stdout.write(`Saved content to ${outputPath}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});