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

function safeOpen(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function downloadScoreCard(input: { title: string; score: number; shockLine: string; pairLabel: string }) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const grd = ctx.createLinearGradient(0, 0, 1200, 630);
  grd.addColorStop(0, "#0f172a");
  grd.addColorStop(1, "#1d4ed8");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 1200, 630);

  ctx.fillStyle = "rgba(255,255,255,0.14)";
  ctx.fillRect(52, 52, 1096, 526);

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 42px Arial";
  ctx.fillText(input.pairLabel, 90, 140);

  ctx.font = "800 190px Arial";
  ctx.fillText(String(input.score), 90, 340);

  ctx.font = "700 38px Arial";
  ctx.fillText(input.title.slice(0, 44), 340, 290);

  ctx.font = "500 32px Arial";
  const shock = input.shockLine.length > 80 ? `${input.shockLine.slice(0, 80)}...` : input.shockLine;
  ctx.fillText(shock, 340, 350);

  ctx.font = "600 24px Arial";
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillText("lovecompatibilitycalculator.com", 840, 560);

  const dataUrl = canvas.toDataURL("image/png");
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = `score-card-${input.score}.png`;
  anchor.click();
}

export function ShareBar({ title, score, shockLine, shareUrl, pairLabel }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const text = useMemo(() => `${pairLabel}: ${score}/100. ${shockLine}`, [pairLabel, score, shockLine]);

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
      <h3 className="text-base font-semibold text-slate-900">Share your score</h3>
      <p className="mt-1 text-sm text-slate-700">Tag your partner. Send this to your crush. Do not send this to your ex.</p>
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
        {typeof navigator !== "undefined" && "share" in navigator ? (
          <button type="button" onClick={onNativeShare} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700">
            Share
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => {
            trackEvent("share_image", { score });
            downloadScoreCard({ title, score, shockLine, pairLabel });
          }}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
        >
          Download score card
        </button>
      </div>
      {copied ? <p className="mt-2 text-xs font-semibold text-emerald-700">Link copied</p> : null}
      {copiedText ? <p className="mt-1 text-xs font-semibold text-emerald-700">Result copied</p> : null}
    </section>
  );
}
