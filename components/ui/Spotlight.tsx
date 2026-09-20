"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

/**
 * Tracks the pointer and writes --mx/--my onto the card under it, which the
 * `spotlight` utility reads to light that card's surface.
 *
 * This used to update every `[data-spotlight]` in the group on every move: 37
 * getBoundingClientRect reads interleaved with 74 style writes, which is
 * layout thrash on a handler that fires up to 120 times a second. It measured
 * 21ms per event and was the reason the page felt unresponsive.
 *
 * Only the hovered card can show a spotlight, so only the hovered card needs
 * updating. One `closest` call, one rect, two writes, and the rect is cached
 * for as long as the pointer stays on the same card.
 */
export function SpotlightGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const frame = useRef(0);
  const current = useRef<HTMLElement | null>(null);
  const rect = useRef<DOMRect | null>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;

    const card = (event.target as Element | null)?.closest<HTMLElement>(
      "[data-spotlight]",
    );
    if (!card) return;

    // Re-measure only when the pointer moves onto a different card.
    if (card !== current.current) {
      current.current = card;
      rect.current = card.getBoundingClientRect();
    }

    const bounds = rect.current;
    if (!bounds) return;

    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
    });
  };

  // A scroll moves the card under a stationary pointer, so the cached rect
  // has to be dropped rather than trusted.
  const invalidate = () => {
    current.current = null;
    rect.current = null;
  };

  return (
    <div
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={invalidate}
      onScrollCapture={invalidate}
    >
      {children}
    </div>
  );
}
