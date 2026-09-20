"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import type { WorkItem } from "@/lib/content/work";

/**
 * Master and detail rather than eight near-identical table rows.
 *
 * A flat table gave every product the same weight and left two thirds of the
 * width empty, so nothing held the eye. Here the index stays scannable on the
 * left while the right side actually uses the space: what the system does, the
 * modules it carries, the stack it runs on.
 *
 * Every panel stays in the DOM with the inactive ones `hidden`, so all eight
 * products are in the static HTML for crawlers rather than only the selected
 * one. Each also has its own /work/<slug>/ page.
 */
export function ProductExplorer({ items }: { items: WorkItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Vertical tablist: up and down move, home and end jump.
  const onKeyDown = (event: KeyboardEvent) => {
    const last = items.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown") next = activeIndex === last ? 0 : activeIndex + 1;
    else if (event.key === "ArrowUp") next = activeIndex === 0 ? last : activeIndex - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next !== null) {
      event.preventDefault();
      setActiveIndex(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="card grid overflow-clip lg:grid-cols-[19rem_1fr]">
      {/* ── Index ──────────────────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Product line"
        onKeyDown={onKeyDown}
        className="border-b border-line lg:border-r lg:border-b-0"
      >
        {items.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={item.slug}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role="tab"
              id={`product-tab-${item.slug}`}
              aria-selected={selected}
              aria-controls={`product-panel-${item.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                "relative flex w-full items-baseline gap-4 border-t border-line px-5 py-3.5 text-left transition-colors duration-200 first:border-t-0 md:px-6",
                selected ? "bg-overlay" : "hover:bg-overlay/50",
              )}
            >
              {/* Marker that grows in on the active row */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-y-0 left-0 w-px origin-center bg-ink transition-transform duration-300",
                  selected ? "scale-y-100" : "scale-y-0",
                )}
              />
              <span
                className={cn(
                  "label-mono shrink-0 transition-colors",
                  selected ? "text-ink-faint" : "text-ink-ghost",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "flex-1 text-[0.9375rem] transition-colors",
                  selected ? "text-ink" : "text-ink-muted",
                )}
              >
                {item.name}
              </span>
              <span className="meta hidden shrink-0 sm:block">{item.domains[0]}</span>
            </button>
          );
        })}
      </div>

      {/* ── Detail ─────────────────────────────────────────────────────── */}
      <div className="relative">
        {items.map((item, index) => (
          <div
            key={item.slug}
            role="tabpanel"
            id={`product-panel-${item.slug}`}
            aria-labelledby={`product-tab-${item.slug}`}
            tabIndex={0}
            hidden={index !== activeIndex}
            className="flex h-full flex-col p-6 md:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-[1.5rem] tracking-[-0.03em]">{item.name}</h3>
              <span className="meta">{item.domains.join(" · ")}</span>
            </div>

            <p className="mt-2 text-[1rem] leading-snug text-ink-muted">
              {item.tagline}
            </p>

            <p className="mt-4 max-w-2xl text-[0.875rem] leading-[1.75] text-ink-faint">
              {item.summary}
            </p>

            <ul className="mt-6 grid gap-x-8 gap-y-2.5 border-t border-line pt-6 sm:grid-cols-2">
              {item.highlights.map((highlight) => (
                <li key={highlight.title} className="flex items-baseline gap-2.5">
                  <span
                    aria-hidden
                    className="size-1 shrink-0 translate-y-[-0.15em] rounded-full bg-ink-ghost"
                  />
                  <span className="text-[0.8125rem] leading-snug text-ink-muted">
                    {highlight.title}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <ul className="flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-line pt-5">
                <Link
                  href={`/work/${item.slug}/`}
                  className="group inline-flex items-center gap-2 text-[0.875rem] font-medium"
                >
                  Full write-up
                  <Icon
                    name="arrowRight"
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                {item.links
                  .filter((link) => link.kind === "repo")
                  .map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-wipe meta inline-flex items-center gap-1.5"
                    >
                      <Icon name="repo" size={13} />
                      Source
                    </a>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
