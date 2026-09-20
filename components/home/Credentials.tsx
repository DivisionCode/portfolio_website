"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { credentialGroups } from "@/lib/content/credentials";

export function Credentials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent) => {
    const last = credentialGroups.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = activeIndex === last ? 0 : activeIndex + 1;
    else if (event.key === "ArrowLeft") next = activeIndex === 0 ? last : activeIndex - 1;
    if (next !== null) {
      event.preventDefault();
      setActiveIndex(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Credential categories"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-1.5"
      >
        {credentialGroups.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role="tab"
              id={`cred-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`cred-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.8125rem] transition-all duration-300",
                selected
                  ? "border-line-accent bg-accent-dim text-accent-soft"
                  : "border-line bg-raised text-ink-faint hover:border-line-strong hover:text-ink-muted",
              )}
            >
              {item.label}
              <span className="ml-2 font-mono text-[0.6875rem] opacity-60">
                {item.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/*
        Every panel stays in the DOM, inactive ones `hidden`, rather than only
        the selected one being rendered. It is the correct ARIA tabs shape, and
        it puts all of the certifications in the static HTML for crawlers
        instead of only after a click.
      */}
      {credentialGroups.map((group, groupIndex) => (
        <div
          key={group.id}
          role="tabpanel"
          id={`cred-panel-${group.id}`}
          aria-labelledby={`cred-tab-${group.id}`}
          tabIndex={0}
          hidden={groupIndex !== activeIndex}
          className="mt-6"
        >
          <motion.div
            key={`${group.id}-${activeIndex}`}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-mono mb-5">{group.caption}</p>

            <ul className="panel divide-y divide-line overflow-hidden">
              {group.items.map((item) => (
                <li
                  key={`${item.title}-${item.year}`}
                  className="grid gap-3 p-5 transition-colors hover:bg-overlay/40 md:grid-cols-[1.5fr_1.6fr_auto] md:items-center md:gap-6 md:px-6"
                >
                  <div>
                    <p className="text-[0.9375rem] leading-snug font-medium">
                      {item.title}
                    </p>
                    <p className="mt-1 font-mono text-[0.6875rem] text-ink-ghost md:hidden">
                      {item.issuer}
                    </p>
                  </div>

                  <p className="hidden text-[0.8125rem] leading-relaxed text-ink-faint md:block">
                    {item.issuer}
                  </p>

                  <div className="flex items-center gap-4 md:justify-end">
                    <div className="text-left md:text-right">
                      <p className="font-mono text-[0.75rem] text-ink-muted">
                        {item.year}
                      </p>
                      <p className="font-mono text-[0.625rem] text-ink-ghost">
                        {item.scope}
                      </p>
                    </div>

                    {item.verify ? (
                      <a
                        href={item.verify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[0.6875rem] text-ink-muted transition-colors hover:border-line-accent hover:text-accent"
                      >
                        Verify
                        <Icon name="arrowUpRight" size={11} />
                      </a>
                    ) : (
                      <span className="shrink-0 font-mono text-[0.6875rem] text-ink-ghost">
                        {item.verifyLabel ?? "—"}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
