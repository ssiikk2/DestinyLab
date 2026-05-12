"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface ShareBarProps {
  title: string;
  score: number;
  shockLine: string;
  shareUrl: string;
  pairLabel: string;
}

type CardFormat = "wide" | "story";

function safeOpen(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function scoreBand(score: number): string {
  if (score >= 90) return "God tier match";
  if (score >= 75) return "Strong match";
  if (score >= 55) return "Promising match";
  if (score >= 35) return "Needs context";
  return "Plot twist energy";
}

function downloadScoreCard(input: {
  title: string;
  score: number;
  shockLine: string;
  pairLabel: string;
  format: CardFormat;
}) {
  const canvas = document.createElement("canvas");
  const isStory = input.format === "story";
  canvas.width = isStory ? 1080 : 1200;
  canvas.height = isStory ? 1920 : 630;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  const padding = isStory ? 72 : 58;
  const grd = ctx.createLinearGradient(0, 0, width, height);
  grd.addColorStop(0, "#0f172a");
  grd.addColorStop(0.52, "#1e3a8a");
  grd.addColorStop(1, "#be185d");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.beginPath();
  ctx.arc(width * 0.82, height * 0.12, isStory ? 260 : 180, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(width * 0.12, height * 0.9, isStory ? 320 : 220, 0, Math.PI * 2);
  ctx.fill();

  const cardX = padding;
  const cardY = padding;
  const cardW = width - padding * 2;
  const cardH = height - padding * 2;
  ctx.fillStyle = "rgba(255,255,255,0.14)";
  ctx.roundRect(cardX, cardY, cardW, cardH, isStory ? 44 : 32);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = `${isStory ? 700 : 700} ${isStory ? 46 : 34}px Arial`;
  ctx.fillText("LOVE COMPATIBILITY", cardX + 36, cardY + (isStory ? 74 : 62));

  ctx.font = `700 ${isStory ? 60 : 42}px Arial`;
  const pairLines = wrapCanvasText(ctx, input.pairLabel, cardW - 72).slice(0, 2);
  pairLines.forEach((line, index) => {
    ctx.fillText(line, cardX + 36, cardY + (isStory ? 180 : 135) + index * (isStory ? 68 : 48));
  });

  ctx.font = `900 ${isStory ? 260 : 185}px Arial`;
  ctx.fillText(String(input.score), cardX + 36, cardY + (isStory ? 540 : 325));
  ctx.font = `800 ${isStory ? 58 : 36}px Arial`;
  ctx.fillText("/100", cardX + (isStory ? 390 : 310), cardY + (isStory ? 515 : 300));

  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = `700 ${isStory ? 42 : 28}px Arial`;
  ctx.fillText(scoreBand(input.score), cardX + 36, cardY + (isStory ? 635 : 390));

  ctx.font = `600 ${isStory ? 38 : 27}px Arial`;
  const titleLines = wrapCanvasText(ctx, input.title, cardW - 72).slice(0, isStory ? 2 : 1);
  titleLines.forEach((line, index) => {
    ctx.fillText(line, cardX + 36, cardY + (isStory ? 725 : 435) + index * (isStory ? 48 : 34));
  });

  ctx.font = `500 ${isStory ? 36 : 25}px Arial`;
  const shockLines = wrapCanvasText(ctx, input.shockLine, cardW - 72).slice(0, isStory ? 5 : 3);
  shockLines.forEach((line, index) => {
    ctx.fillText(line, cardX + 36, cardY + (isStory ? 890 : 490) + index * (isStory ? 48 : 34));
  });

  const ctaY = isStory ? height - 260 : height - 118;
  ctx.fillStyle = "rgba(255,255,255,0.96)";
  ctx.roundRect(cardX + 36, ctaY, cardW - 72, isStory ? 112 : 58, isStory ? 28 : 18);
  ctx.fill();
  ctx.fillStyle = "#0f172a";
  ctx.font = `800 ${isStory ? 34 : 22}px Arial`;
  ctx.fillText("Try yours at lovecompatibilitycalculator.com", cardX + 62, ctaY + (isStory ? 70 : 38));

  ctx.font = `600 ${isStory ? 28 : 18}px Arial`;
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillText("For fun and reflection", cardX + 36, height - (isStory ? 90 : 44));

  const dataUrl = canvas.toDataURL("image/png");
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = `compatibility-${input.format}-${input.score}.png`;
  anchor.click();
}

export function ShareBar({ title, score, shockLine, shareUrl, pairLabel }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const text = useMemo(() => `${pairLabel}: ${score}/100. ${shockLine}`, [pairLabel, score, shockLine]);
  const shareText = useMemo(() => `${text} Try yours: ${shareUrl}`, [text, shareUrl]);
  const shareIdeas = useMemo(
    () => [
      `We got ${score}/100. Do you think this is accurate?`,
      `Our result says: ${shockLine}`,
      `Run yours and compare it with mine: ${shareUrl}`,
    ],
    [score, shockLine, shareUrl],
  );

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackEvent("share_copy", { score });
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  async function onNativeShare() {
    if (typeof navigator === "undefined" || !navigator.share) return;
    try {
      await navigator.share({ title, text, url: shareUrl });
      trackEvent("share_native", { score });
    } catch {
      // ignore
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Share your score</h3>
          <p className="mt-1 text-sm text-slate-700">
            Send the link, copy the result, or download a score card for a story post.
          </p>
        </div>
        <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          Share-ready result
        </p>
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-3">
        {shareIdeas.map((idea) => (
          <button
            key={idea}
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(idea);
                setCopiedText(true);
                trackEvent("share_prompt_copy", { score });
                setTimeout(() => setCopiedText(false), 1200);
              } catch {
                setCopiedText(false);
              }
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-xs font-semibold leading-5 text-slate-700 transition hover:bg-slate-100"
          >
            {idea}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={onCopy} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
          Copy link
        </button>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text);
              setCopiedText(true);
              trackEvent("share_copy_text", { score });
              setTimeout(() => setCopiedText(false), 1200);
            } catch {
              setCopiedText(false);
            }
          }}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
        >
          Copy result
        </button>
        <button
          type="button"
          onClick={() => {
            trackEvent("share_x", { score });
            safeOpen(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`);
          }}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
        >
          Share to X
        </button>
        <button
          type="button"
          onClick={() => {
            trackEvent("share_reddit", { score });
            safeOpen(`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(text)}`);
          }}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
        >
          Share to Reddit
        </button>
        <button
          type="button"
          onClick={() => {
            trackEvent("share_pinterest", { score });
            safeOpen(`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(text)}`);
          }}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
        >
          Share to Pinterest
        </button>
        <button
          type="button"
          onClick={() => {
            trackEvent("share_whatsapp", { score });
            safeOpen(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
          }}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
        >
          WhatsApp
        </button>
        <button
          type="button"
          onClick={() => {
            trackEvent("share_telegram", { score });
            safeOpen(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`);
          }}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
        >
          Telegram
        </button>
        <a
          href={`sms:?&body=${encodeURIComponent(shareText)}`}
          onClick={() => trackEvent("share_sms", { score })}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
        >
          SMS
        </a>
        {typeof navigator !== "undefined" && "share" in navigator ? (
          <button type="button" onClick={onNativeShare} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700">
            Share
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => {
            trackEvent("share_image_wide", { score });
            downloadScoreCard({ title, score, shockLine, pairLabel, format: "wide" });
          }}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
        >
          Download wide card
        </button>
        <button
          type="button"
          onClick={() => {
            trackEvent("share_image_story", { score });
            downloadScoreCard({ title, score, shockLine, pairLabel, format: "story" });
          }}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
        >
          Download story card
        </button>
      </div>
      {copied ? <p className="mt-2 text-xs font-semibold text-emerald-700">Link copied</p> : null}
      {copiedText ? <p className="mt-1 text-xs font-semibold text-emerald-700">Result copied</p> : null}
    </section>
  );
}
