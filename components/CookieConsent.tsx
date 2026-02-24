"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "destinylab-cookie-consent";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (typeof window === "undefined") {
    return "accepted";
  }

  return localStorage.getItem(STORAGE_KEY) === "accepted" ? "accepted" : "pending";
}

export function CookieConsent() {
  const [dismissed, setDismissed] = useState(false);
  const status = useSyncExternalStore(subscribe, getSnapshot, () => "accepted");

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setDismissed(true);
  }

  if (dismissed || status === "accepted") {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border-soft bg-white/95 p-4 shadow-2xl backdrop-blur-sm">
      <div className="app-shell flex flex-col gap-3 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
        <p>
          We use cookies for analytics and Google AdSense.
          <Link className="ml-1 font-semibold text-text-main underline" href="/privacy">
            Privacy details
          </Link>
          <Link className="ml-1 font-semibold text-text-main underline" href="/cookie-policy">
            Cookie policy
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="btn-primary px-4 py-2 text-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
