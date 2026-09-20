import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
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
    <div className={cn("mb-8 md:mb-10", className)}>
      <div className="flex items-baseline justify-between gap-6 border-b border-line pb-3">
        <span className="label-mono">{eyebrow}</span>
        {aside ? <span className="label-mono shrink-0">{aside}</span> : null}
      </div>

      <h2 className="mt-7 max-w-2xl text-[clamp(1.625rem,3.4vw,2.25rem)] leading-[1.12]">
        {title}
      </h2>

      {lead ? (
        <p className="mt-3.5 max-w-xl text-[0.9375rem] leading-[1.6] text-ink-faint">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
