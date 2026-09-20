"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { credentialGroups } from "@/lib/content/credentials";

export function Credentials() {
  const [activeIndex, setActiveIndex] = useState(0);
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
                "rounded-full border px-3.5 py-1.5 text-[0.8125rem] transition-colors",
                selected
                  ? "border-accent/40 bg-accent-dim text-accent-bright"
                  : "border-line text-ink-faint hover:border-line-strong hover:text-ink",
              )}
            >
              {item.label}
              <span className="ml-1.5 font-mono text-[0.6875rem] opacity-60">
                {item.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/*
        Every panel stays in the DOM, inactive ones `hidden`. Correct ARIA
        shape, and it keeps all the certifications in the static HTML for
        crawlers rather than only after a click.
      */}
      {credentialGroups.map((group, groupIndex) => (
        <div
          key={group.id}
          role="tabpanel"
          id={`cred-panel-${group.id}`}
          aria-labelledby={`cred-tab-${group.id}`}
          tabIndex={0}
          hidden={groupIndex !== activeIndex}
          className="mt-5"
        >
          <ul className="card overflow-hidden">
            {group.items.map((item) => (
              <li
                key={`${item.title}-${item.year}`}
                className="grid gap-y-1 border-t border-line px-5 py-4 transition-colors duration-300 first:border-t-0 hover:bg-overlay/40 md:grid-cols-[1.4fr_1.5fr_5rem_auto] md:items-baseline md:gap-x-8 md:px-6"
              >
                <p className="text-[0.9375rem] leading-snug">{item.title}</p>

                <p className="text-[0.8125rem] leading-snug text-ink-faint">
                  {item.issuer}
                </p>

                <p className="font-mono text-[0.75rem] text-ink-ghost">{item.year}</p>

                {item.verify ? (
                  <a
                    href={item.verify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 justify-self-start font-mono text-[0.6875rem] text-accent-bright hover:underline md:justify-self-end"
                  >
                    Verify
                    <Icon name="arrowUpRight" size={11} />
                  </a>
                ) : (
                  <span className="font-mono text-[0.6875rem] text-ink-ghost md:justify-self-end">
                    {item.verifyLabel ?? "n/a"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
