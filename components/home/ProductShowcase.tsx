"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import type { WorkItem } from "@/lib/content/work";

export function ProductShowcase({ items }: { items: WorkItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = items[activeIndex];

  // Roving tabindex, per the WAI-ARIA tabs pattern.
  const onKeyDown = (event: KeyboardEvent) => {
    const last = items.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight") next = activeIndex === last ? 0 : activeIndex + 1;
    else if (event.key === "ArrowLeft") next = activeIndex === 0 ? last : activeIndex - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next !== null) {
      event.preventDefault();
      setActiveIndex(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Product line"
        onKeyDown={onKeyDown}
        className="-mx-5 flex gap-1.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
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
              id={`tab-${item.slug}`}
              aria-selected={selected}
              aria-controls={`panel-${item.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative shrink-0 rounded-full border px-4 py-2 font-mono text-[0.75rem] tracking-wide transition-all duration-300",
                selected
                  ? "border-line-accent bg-accent-dim text-accent-soft"
                  : "border-line bg-raised text-ink-faint hover:border-line-strong hover:text-ink-muted",
              )}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        role="tabpanel"
        id={`panel-${active.slug}`}
        aria-labelledby={`tab-${active.slug}`}
        tabIndex={0}
        className="panel mt-6 overflow-hidden focus-visible:outline-2"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-0 lg:grid-cols-[1.1fr_1fr]"
          >
            {/* Wireframe */}
            <div className="relative order-1 aspect-16/10 overflow-hidden border-b border-line bg-sunken lg:order-none lg:aspect-auto lg:border-r lg:border-b-0">
              {active.cover ? (
                <Image
                  src={active.cover}
                  alt={active.coverAlt ?? `${active.name} interface`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-left-top"
                />
              ) : null}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tr from-canvas/70 via-transparent to-transparent"
              />
            </div>

            {/* Detail */}
            <div className="order-2 flex flex-col p-6 md:p-8 lg:order-none">
              <p className="label-mono">{active.period}</p>

              <h3 className="mt-3 text-2xl font-medium md:text-[1.625rem]">
                {active.name}
              </h3>

              <p className="text-display mt-2 text-lg text-accent-soft">
                {active.tagline}
              </p>

              <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-muted">
                {active.summary}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                {active.highlights.map((highlight) => (
                  <li key={highlight.title} className="flex items-start gap-2.5">
                    <Icon
                      name="check"
                      size={13}
                      className="mt-1 shrink-0 text-accent opacity-70"
                    />
                    <span className="text-[0.8125rem] text-ink-faint">
                      <span className="text-ink-muted">{highlight.title}</span>
                      {" — "}
                      {highlight.body}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {active.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>

              <Link
                href={`/work/${active.slug}/`}
                className="group mt-7 inline-flex items-center gap-2 self-start text-[0.8125rem] font-medium text-ink transition-colors hover:text-accent"
              >
                Full write-up
                <Icon
                  name="arrowRight"
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
