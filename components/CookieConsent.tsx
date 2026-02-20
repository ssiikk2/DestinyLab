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

  return localStorage.getItem(STORAGE_KEY) === "accepted"
    ? "accepted"
    : "pending";
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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-4 shadow-2xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 text-sm text-slate-700 md:flex-row md:items-center md:justify-between">
        <p>
          We use cookies to improve your experience and support analytics/ads. Read our{" "}
          <Link className="font-semibold underline" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700"
        >
          Accept
        </button>
      </div>
    </div>
  );
}