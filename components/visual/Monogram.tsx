import { cn } from "@/lib/cn";

/**
 * The identity mark.
 *
 * There was no mark before, only the name set in the UI font, which is why the
 * header read as a placeholder. This is built from the same geometry as the
 * hero lattice (hexagon, orbit, core) so the brand and the page are one
 * system rather than two unrelated ideas.
 *
 * The hexagon snaps 60 degrees on hover, which lands it back on itself: the
 * interaction is felt rather than watched.
 */
export function Monogram({ className }: { className?: string }) {
  const R = 13;
  const hex = Array.from({ length: 6 }, (_, i) => {
    const rad = ((i * 60 - 90) * Math.PI) / 180;
    return `${(16 + R * Math.cos(rad)).toFixed(2)},${(16 + R * Math.sin(rad)).toFixed(2)}`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      fill="none"
    >
      <polygon
        points={hex}
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1"
        className="origin-center transition-transform duration-500 [transition-timing-function:var(--ease-spring)] group-hover/mark:rotate-60"
      />

      <circle
        cx="16"
        cy="16"
        r="7.5"
        stroke="currentColor"
        strokeOpacity="0.16"
        strokeWidth="1"
        strokeDasharray="1 4"
      />

      {/* Orbiting node, always turning slowly */}
      <g className="origin-center [animation:spin-slow_18s_linear_infinite]">
        <circle cx="16" cy="8.5" r="1.6" fill="currentColor" />
      </g>

      <circle cx="16" cy="16" r="2.6" fill="currentColor" />
    </svg>
  );
}
