"use client";

import { useCallback, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

/**
 * Runs before the body paints, so the stored theme is applied without a flash
 * of the wrong one. Rendered as the first child of <body> by the root layout.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

/**
 * Two-state segmented switch rather than a single icon button, so the current
 * theme is legible at a glance instead of having to be inferred from an icon.
 */
/**
 * The <html> attribute is the source of truth, set by the inline script before
 * paint. Reading it as an external store keeps this component in step without
 * copying it into state from an effect, and the server snapshot of `null`
 * means the thumb renders neutral until hydration rather than mismatching.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const readTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, readTheme, () => null);

  const apply = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode. The choice just does not persist.
    }
  }, []);

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full border border-line p-0.5",
        className,
      )}
      role="group"
      aria-label="Colour theme"
    >
      {/* The thumb, which slides between the two halves. */}
      <span
        aria-hidden
        className={cn(
          "absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-overlay transition-transform duration-300 [transition-timing-function:var(--ease-spring)]",
          theme === "light" ? "translate-x-full" : "translate-x-0",
          theme === null && "opacity-0",
        )}
      />

      {(["dark", "light"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => apply(option)}
          aria-pressed={theme === option}
          className={cn(
            "relative z-10 flex size-7 items-center justify-center rounded-full transition-colors duration-200",
            theme === option ? "text-ink" : "text-ink-ghost hover:text-ink-faint",
          )}
        >
          {option === "dark" ? <MoonIcon /> : <SunIcon />}
          <span className="sr-only">{option} theme</span>
        </button>
      ))}
    </div>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="none">
      <path
        d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="none">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
