"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { guidesNav, toolsNav } from "@/lib/nav";

type MenuKey = "tools" | "guides" | null;

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<MenuKey>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);
  const desktopMenuRef = useRef<HTMLDivElement | null>(null);

  const isToolsActive = useMemo(
    () => toolsNav.some((item) => isActivePath(pathname, item.href)),
    [pathname],
  );
  const isGuidesActive = useMemo(
    () => guidesNav.some((item) => isActivePath(pathname, item.href)),
    [pathname],
  );
  const closeAllMenus = () => {
    setDrawerOpen(false);
    setDesktopMenu(null);
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const scrollY = window.scrollY;

    if (drawerOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
    }

    return () => {
      const top = document.body.style.top;
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      if (top) {
        const y = Number.parseInt(top.replace("-", "").replace("px", ""), 10);
        if (!Number.isNaN(y)) {
          window.scrollTo(0, y);
        }
      }
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        setDesktopMenu(null);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  useEffect(() => {
    if (!desktopMenu) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!desktopMenuRef.current) {
        return;
      }
      if (!desktopMenuRef.current.contains(event.target as Node)) {
        setDesktopMenu(null);
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [desktopMenu]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen || !mobileDrawerRef.current) {
      return;
    }

    const focusables = mobileDrawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onTrap = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onTrap);
    return () => window.removeEventListener("keydown", onTrap);
  }, [drawerOpen]);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur transition-all duration-200 supports-[backdrop-filter]:bg-white/90 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center gap-3 px-4 transition-all duration-200 ${scrolled ? "py-2" : "py-2.5"}`}
      >
        <Link href="/" onClick={closeAllMenus} className="inline-flex items-center gap-2.5 font-semibold text-slate-900">
          <Image
            src="/brand/favicon2.png"
            alt="Love Compatibility Calculator home"
            width={48}
            height={48}
            className="h-11 w-11 rounded-full border border-slate-200 bg-white shadow-sm md:h-12 md:w-12"
            priority
          />
          <span className="text-[15px] leading-none md:text-base">lovecompatibilitycalculator</span>
        </Link>

        <div className="ml-auto hidden items-center gap-2 lg:flex" ref={desktopMenuRef}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDesktopMenu((current) => (current === "tools" ? null : "tools"))}
              aria-expanded={desktopMenu === "tools"}
              aria-controls="desktop-tools-menu"
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                isToolsActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Tools
            </button>
            {desktopMenu === "tools" ? (
              <div
                id="desktop-tools-menu"
                className="absolute right-0 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
              >
                {toolsNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAllMenus}
                    className={`block rounded-xl px-3 py-2 text-sm transition ${
                      isActivePath(pathname, item.href)
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDesktopMenu((current) => (current === "guides" ? null : "guides"))}
              aria-expanded={desktopMenu === "guides"}
              aria-controls="desktop-guides-menu"
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                isGuidesActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Guides
            </button>
            {desktopMenu === "guides" ? (
              <div
                id="desktop-guides-menu"
                className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
              >
                {guidesNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAllMenus}
                    className={`block rounded-xl px-3 py-2 text-sm transition ${
                      isActivePath(pathname, item.href)
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <Link
            href="/calculator"
            onClick={closeAllMenus}
            className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Calculate
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <Link
            href="/calculator"
            onClick={closeAllMenus}
            className="rounded-full bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Calculate
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setDrawerOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:bg-slate-100"
          >
            {drawerOpen ? (
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {drawerOpen ? (
        <div
          className="fixed inset-0 z-[90] bg-slate-950/55 backdrop-blur-[1px] lg:hidden"
          role="dialog"
          aria-modal="true"
          id="mobile-nav-drawer"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            ref={mobileDrawerRef}
            className="ml-auto h-full w-[88%] max-w-sm overflow-y-auto overscroll-contain border-l border-slate-200 bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Menu</p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
            </div>

            <nav className="mt-4 space-y-5" aria-label="Mobile site navigation">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Tools</p>
                <ul className="mt-2 space-y-1">
                  {toolsNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeAllMenus}
                        className={`block rounded-xl px-3 py-2 text-sm transition ${
                          isActivePath(pathname, item.href)
                            ? "bg-slate-900 text-white"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Guides</p>
                <ul className="mt-2 space-y-1">
                  {guidesNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeAllMenus}
                        className={`block rounded-xl px-3 py-2 text-sm transition ${
                          isActivePath(pathname, item.href)
                            ? "bg-slate-900 text-white"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}

