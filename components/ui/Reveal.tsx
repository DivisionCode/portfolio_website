import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "section" | "article";
  /** Accepted and ignored — kept so call sites don't all need editing. */
  delay?: number;
  y?: number;
};

/**
 * Plain wrapper.
 *
 * This used to be a scroll-triggered entrance built on motion's `whileInView`.
 * It server-rendered `opacity: 0` and relied on an intersection callback to
 * undo it — which never fired, leaving 39 elements permanently invisible and
 * the whole page blank below the header.
 *
 * Content must never depend on an animation succeeding in order to be seen.
 * Any motion added back here belongs on elements that are already visible.
 */
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const Component = as;
  return <Component className={className}>{children}</Component>;
}
