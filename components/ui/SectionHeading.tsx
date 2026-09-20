import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Right-aligned slot for a count or a link. */
  aside?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  aside,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-baseline justify-between gap-6">
        <span className="label-mono flex items-center gap-2.5">
          <span
            aria-hidden
            className="inline-block size-1 rounded-full bg-accent"
          />
          {eyebrow}
        </span>
        {aside ? (
          <span className="label-mono shrink-0">{aside}</span>
        ) : null}
      </div>

      <div className="rule-fade mt-3.5 mb-7 opacity-70" />

      <h2 className="max-w-3xl text-3xl leading-[1.1] font-medium sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>

      {lead ? (
        <p className="mt-5 max-w-2xl text-[0.975rem] leading-relaxed text-ink-muted md:text-base">
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
