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
        "inline-flex items-center rounded-md px-2 py-1 font-mono text-[0.6875rem] whitespace-nowrap",
        tone === "accent"
          ? "bg-accent-soft text-accent"
          : "bg-sunken text-ink-faint",
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
      <span
        aria-hidden
        className={cn(
          "inline-block size-1.5 rounded-full",
          status === "live" && "bg-emerald-600",
          status === "building" && "bg-amber-500",
          status === "archived" && "bg-ink-ghost",
        )}
      />
      {copy}
    </span>
  );
}
