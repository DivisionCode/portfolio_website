"use client";

import { useEffect, useRef } from "react";

/**
 * Reading progress hairline under the header.
 *
 * Writes straight to a transform on every frame rather than through React
 * state, so scrolling never queues a render. Purely decorative: if it never
 * runs, the bar simply stays at zero width.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      node.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <span
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-accent-bright to-accent-cyan"
      ref={ref}
    />
  );
}
