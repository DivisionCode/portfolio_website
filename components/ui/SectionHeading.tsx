import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Two-digit section index, e.g. "02". Gives a long page its rhythm. */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  aside,
  className,
}: SectionHeadingProps) {
  return (
    <div data-reveal className={cn("mb-9 md:mb-12", className)}>
      <div className="flex items-baseline justify-between gap-6">
        <span className="label-mono flex items-center gap-3">
          {index ? (
            <>
              <span className="text-ink-ghost">{index}</span>
              <span aria-hidden className="h-2.5 w-px bg-line-strong" />
            </>
          ) : null}
          {eyebrow}
        </span>
        {aside ? <span className="label-mono shrink-0">{aside}</span> : null}
      </div>

      <div className="rule-fade mt-3.5 mb-7" />

      <h2 className="max-w-3xl text-[clamp(1.875rem,4vw,2.875rem)] leading-[1.06]">
        {title}
      </h2>

      {lead ? (
        <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.7] text-ink-faint md:text-base">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
