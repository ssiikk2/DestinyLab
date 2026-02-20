"use client";

import { useState } from "react";

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const canNativeShare =
    typeof window !== "undefined" && typeof navigator.share === "function";

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function shareOnX() {
    const text = encodeURIComponent(`${title} on DestinyLab`);
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  async function nativeShare() {
    if (!canNativeShare || !navigator.share) {
      return;
    }

    await navigator.share({ title, url: window.location.href });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={copyLink}
        className="rounded-full border border-border-soft bg-white px-4 py-2 text-sm font-semibold text-text-main transition hover:bg-bg-muted"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
      <button
        onClick={shareOnX}
        className="rounded-full border border-border-soft bg-white px-4 py-2 text-sm font-semibold text-text-main transition hover:bg-bg-muted"
      >
        Share on X
      </button>
      {canNativeShare ? (
        <button
          onClick={nativeShare}
          className="rounded-full border border-border-soft bg-white px-4 py-2 text-sm font-semibold text-text-main transition hover:bg-bg-muted"
        >
          Share
        </button>
      ) : null}
    </div>
  );
}
