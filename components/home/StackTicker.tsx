import { stackGroups } from "@/lib/content/stack";

/**
 * Full-bleed band of the actual production stack, two rows travelling in
 * opposite directions.
 *
 * This replaces a four-box "8 products shipped" counter grid. A counter grid
 * asserts a number; this shows the thing the number was counting, and it gives
 * the page a moment of horizontal movement between two vertical sections.
 *
 * Decorative and hidden from assistive tech: the Stack section below lists
 * every one of these in a readable form.
 */
export function StackTicker() {
  const names = stackGroups.flatMap((group) => group.items.map((item) => item.name));
  const half = Math.ceil(names.length / 2);
  const rows = [names.slice(0, half), names.slice(half)];

  return (
    <div
      aria-hidden
      className="relative border-y border-line py-7 select-none"
    >
      <div className="edge-mask flex flex-col gap-3.5">
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex w-max will-change-transform [backface-visibility:hidden]"
            style={{
              animation: `${index === 0 ? "marquee-left" : "marquee-right"} ${index === 0 ? 68 : 84}s linear infinite`,
            }}
          >
            {/* Rendered twice so the translate can loop seamlessly. */}
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 items-center">
                {row.map((name, position) => (
                  <li
                    key={`${name}-${position}`}
                    className="flex items-center gap-6 pr-6 text-[0.8125rem] tracking-[0.02em] whitespace-nowrap text-ink-ghost"
                  >
                    {name}
                    <span aria-hidden className="size-0.5 rounded-full bg-ink-ghost/60" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
