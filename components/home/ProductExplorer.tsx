"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { ProductSchematic } from "@/components/visual/ProductSchematic";
import type { WorkItem } from "@/lib/content/work";

/**
 * Index, detail, and a schematic drawn from the product's own modules.
 *
 * Two earlier shapes failed here. A flat table gave every product the same
 * weight and left two thirds of the width empty. Master and detail fixed the
 * scanning but still left a void under any product with only two modules,
 * because a column of prose cannot fill a panel sized for five.
 *
 * The schematic solves both: it is generated from the module list, so it grows
 * with the content instead of leaving a hole, and every product ends up with a
 * different shape rather than eight copies of one row.
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
                "relative flex w-full items-baseline gap-3.5 border-t border-line px-5 py-3.5 text-left transition-colors duration-200 first:border-t-0 md:px-6",
                selected ? "bg-overlay" : "hover:bg-overlay/50",
              )}
            >
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
                  "flex-1 truncate text-[0.9375rem] whitespace-nowrap transition-colors",
                  selected ? "text-ink" : "text-ink-muted",
                )}
              >
                {item.name}
              </span>
              <span className="meta hidden max-w-[7.5rem] shrink-0 truncate sm:block">
                {item.domains[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Detail ─────────────────────────────────────────────────────── */}
      <div>
        {items.map((item, index) => (
          <div
            key={item.slug}
            role="tabpanel"
            id={`product-panel-${item.slug}`}
            aria-labelledby={`product-tab-${item.slug}`}
            tabIndex={0}
            hidden={index !== activeIndex}
            className="grid gap-x-10 gap-y-8 p-6 md:p-8 xl:grid-cols-[minmax(0,20rem)_1fr] xl:items-center"
          >
            {/* Prose */}
            <div>
              <h3 className="text-[1.5rem] tracking-[-0.03em]">{item.name}</h3>

              <p className="mt-2 text-[1rem] leading-snug text-ink-muted">
                {item.tagline}
              </p>

              <p className="mt-4 text-[0.875rem] leading-[1.75] text-ink-faint">
                {item.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-6">
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

            {/* Module fan, generated from this product's own modules */}
            <figure className="min-w-0">
              <figcaption className="label-mono mb-4 xl:mb-6">
                {item.highlights.length} modules
              </figcaption>
              <ProductSchematic
                label={item.name.split(" ")[0]}
                modules={item.highlights.map((highlight) => highlight.title)}
                className="h-auto w-full"
              />
              {/* The same titles as text, since the figure is decorative. */}
              <ul className="sr-only">
                {item.highlights.map((highlight) => (
                  <li key={highlight.title}>
                    {highlight.title}: {highlight.body}
                  </li>
                ))}
              </ul>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
}
