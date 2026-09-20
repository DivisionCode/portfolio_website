"use client";

import { useRef, type ReactNode } from "react";

/**
 * Tracks the pointer and writes --mx/--my onto whichever `[data-spotlight]`
 * descendant is under it, which the `spotlight` utility reads to light the
 * card surface. One listener for the whole group rather than one per card.
 *
 * Purely decorative: with no pointer, or no JS, the cards simply never light.
 */
export function SpotlightGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;

    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      const cards = ref.current?.querySelectorAll<HTMLElement>("[data-spotlight]");
      cards?.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${clientX - rect.left}px`);
        card.style.setProperty("--my", `${clientY - rect.top}px`);
      });
    });
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={className}>
      {children}
    </div>
  );
}
