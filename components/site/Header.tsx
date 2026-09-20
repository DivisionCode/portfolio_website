"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { navLinks, profile } from "@/lib/content/site";
import { Icon } from "@/components/ui/Icon";
import { CommandPalette } from "./CommandPalette";

const sectionIds = navLinks.map((link) => link.href.replace("/#", ""));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.5] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "border-b border-line bg-canvas/85 backdrop-blur-lg"
            : "border-b border-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="shrink-0 text-[0.9375rem] font-medium tracking-[-0.02em]"
          >
            {profile.name}
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const id = link.href.replace("/#", "");
                const isActive = active === id;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "text-[0.8125rem] transition-colors",
                        isActive ? "text-ink" : "text-ink-faint hover:text-ink",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[0.6875rem] text-ink-faint transition-colors hover:border-line-strong hover:text-ink md:inline-flex"
              aria-label="Open command menu"
            >
              Jump to
              <kbd className="rounded bg-sunken px-1.5 py-0.5 text-[0.625rem] text-ink-ghost">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/#contact"
              className="hidden rounded-full bg-ink px-4 py-2 text-[0.8125rem] font-medium text-canvas transition-opacity hover:opacity-85 sm:inline-block"
            >
              Get in touch
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-9 items-center justify-center rounded-full border border-line lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-full bg-ink transition-all duration-300",
                    menuOpen ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px w-full bg-ink transition-all duration-300",
                    menuOpen ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-canvas lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page pt-20 pb-10">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-line">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 text-xl"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${profile.email}`}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-canvas"
          >
            <Icon name="mail" size={15} />
            {profile.email}
          </a>
        </nav>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
