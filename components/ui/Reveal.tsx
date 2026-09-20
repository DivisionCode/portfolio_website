"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger index — each step adds 60ms. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
  y?: number;
};

/**
 * Scroll-triggered entrance. Motion here is decoration only: with reduced
 * motion the content renders in place, immediately and fully opaque.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  y = 16,
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.62,
        delay: delay * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}
