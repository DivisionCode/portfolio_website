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
        "inline-flex items-center rounded-md border px-2 py-1 meta whitespace-nowrap transition-colors",
        tone === "accent"
          ? "border-line-strong bg-accent-dim text-accent"
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
    <span className="inline-flex items-center gap-1.5 meta text-ink-faint">
      <span aria-hidden className="relative flex size-1.5">
        {status === "live" ? (
          <span className="absolute inline-flex size-full rounded-full bg-live opacity-70 [animation:pulse-ring_2.6s_ease-out_infinite]" />
        ) : null}
        <span
          className={cn(
            "relative inline-flex size-1.5 rounded-full",
            status === "live" && "bg-live",
            status === "building" && "bg-accent",
            status === "archived" && "bg-ink-ghost",
          )}
        />
      </span>
      {copy}
    </span>
  );
}
