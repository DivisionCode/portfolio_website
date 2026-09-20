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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy. Only runs on the home page, where the sections exist.
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
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  // Lock the page behind the mobile sheet.
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line bg-canvas/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2 font-mono text-sm tracking-tight"
            aria-label={`${profile.brand} — home`}
          >
            <span className="text-accent transition-transform duration-300 group-hover:rotate-90">
              #
            </span>
            <span className="font-medium">{profile.brand}</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const id = link.href.replace("/#", "");
                const isActive = active === id;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-[0.8125rem] transition-colors duration-200",
                        isActive
                          ? "text-ink"
                          : "text-ink-faint hover:text-ink-muted",
                      )}
                    >
                      {isActive ? (
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-full border border-line bg-raised"
                        />
                      ) : null}
                      <span className="relative">{link.label}</span>
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
              className="hidden items-center gap-2 rounded-full border border-line bg-raised px-3 py-1.5 font-mono text-[0.6875rem] text-ink-faint transition-colors hover:border-line-strong hover:text-ink-muted md:inline-flex"
              aria-label="Open command menu"
            >
              <span>Jump to</span>
              <kbd className="rounded border border-line bg-overlay px-1.5 py-0.5 text-[0.625rem] text-ink-ghost">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/#contact"
              className="hidden rounded-full bg-accent px-4 py-2 text-[0.8125rem] font-medium text-black transition-opacity hover:opacity-85 sm:inline-block"
            >
              Get in touch
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-raised lg:hidden"
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

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-canvas/95 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page pt-24 pb-10">
          <ul className="flex flex-col">
            {navLinks.map((link, index) => (
              <li key={link.href} className="border-b border-line">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline justify-between py-5 text-2xl font-medium"
                >
                  {link.label}
                  <span className="label-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-black"
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
