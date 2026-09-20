import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide whitespace-nowrap",
        tone === "accent"
          ? "border-line-accent bg-accent-dim text-accent-soft"
          : "border-line bg-overlay/60 text-ink-faint",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Live/building/archived pill with a pulsing dot for anything currently live. */
export function StatusPill({ status }: { status: "live" | "building" | "archived" }) {
  const copy = { live: "Live", building: "In build", archived: "Archived" }[status];

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-wide text-ink-faint">
      <span
        aria-hidden
        className={cn(
          "inline-block size-1.5 rounded-full",
          status === "live" && "animate-pulse-dot bg-emerald-400",
          status === "building" && "bg-accent",
          status === "archived" && "bg-ink-ghost",
        )}
      />
      {copy}
    </span>
  );
}
