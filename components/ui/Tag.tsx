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
        "inline-flex items-center rounded-md border px-2 py-1 font-mono text-[0.6875rem] whitespace-nowrap transition-colors",
        tone === "accent"
          ? "border-accent/30 bg-accent-dim text-accent-bright"
          : "border-line bg-overlay/60 text-ink-faint",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusPill({ status }: { status: "live" | "building" | "archived" }) {
  const copy = { live: "Live", building: "In build", archived: "Archived" }[status];

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-ink-faint">
      <span aria-hidden className="relative flex size-1.5">
        {status === "live" ? (
          <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-70 [animation:pulse-ring_2.6s_ease-out_infinite]" />
        ) : null}
        <span
          className={cn(
            "relative inline-flex size-1.5 rounded-full",
            status === "live" && "bg-emerald-400",
            status === "building" && "bg-accent",
            status === "archived" && "bg-ink-ghost",
          )}
        />
      </span>
      {copy}
    </span>
  );
}
