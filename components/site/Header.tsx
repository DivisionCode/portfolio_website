"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { navLinks, profile } from "@/lib/content/site";
import { Icon } from "@/components/ui/Icon";
import { Monogram } from "@/components/visual/Monogram";
import { CommandPalette } from "./CommandPalette";
import { ScrollProgress } from "./ScrollProgress";
import { ThemeToggle } from "./ThemeToggle";

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

  /*
    Scroll spy by position, not by IntersectionObserver.

    The observer version compared intersectionRatio across the entries it was
    handed, but a callback only reports the sections whose state *changed*.
    Whichever fired last won and then stuck, which is why the nav sat on
    Products forever. Reading positions is deterministic: the active section is
    simply the last one whose top has passed the header.
  */
  useEffect(() => {
    // Sorted by document position, not by nav order: the "last one passed"
    // walk below is only correct in page order, and the two can drift apart.
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

    if (targets.length === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.scrollY + 140;
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;

      if (atBottom) {
        setActive(targets[targets.length - 1].id);
        return;
      }

      let current: string | null = null;
      for (const target of targets) {
        if (target.getBoundingClientRect().top + window.scrollY <= line) {
          current = target.id;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
            ? "border-b border-line bg-canvas/70 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          {/* Identity lockup: a real mark, then the name, then the studio. */}
          <Link href="/" className="group/mark flex shrink-0 items-center gap-2.5">
            <Monogram className="size-6 text-ink" />
            <span className="flex flex-col leading-none">
              <span className="text-[0.9375rem] font-medium tracking-[-0.02em]">
                {profile.name}
              </span>
              <span className="mt-1 hidden font-mono text-[0.5625rem] tracking-[0.16em] text-ink-ghost uppercase sm:block">
                {profile.brand}
              </span>
            </span>
          </Link>

          {/* Nav as one segmented control rather than loose links. */}
          <nav
            aria-label="Primary"
            className="hidden rounded-full border border-line p-0.5 lg:block"
          >
            <ul className="flex items-center">
              {navLinks.map((link) => {
                const id = link.href.replace("/#", "");
                const isActive = active === id;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-full px-3 py-1.5 text-[0.8125rem] transition-colors duration-200",
                        isActive ? "text-ink" : "text-ink-faint hover:text-ink",
                      )}
                    >
                      {isActive ? (
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-full bg-overlay"
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
            <ThemeToggle className="hidden sm:inline-flex" />

            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden size-8 items-center justify-center rounded-full border border-line font-mono text-[0.625rem] text-ink-faint transition-colors hover:border-line-strong hover:text-ink md:inline-flex"
              aria-label="Open command menu"
            >
              ⌘K
            </button>

            <Link
              href="/#contact"
              className="hidden rounded-full bg-ink px-4 py-2 text-[0.8125rem] font-medium text-canvas transition-opacity hover:opacity-90 sm:inline-block"
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
        <ScrollProgress />
      </header>

      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-canvas/95 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page pt-20 pb-10">
          <ul className="flex flex-col">
            {navLinks.map((link, index) => (
              <li key={link.href} className="border-b border-line">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline justify-between py-4 text-xl"
                >
                  {link.label}
                  <span className="label-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-canvas"
            >
              <Icon name="mail" size={15} />
              Email
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
