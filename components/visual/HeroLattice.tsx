const C = 280; // centre of the 560 viewBox
const R_OUTER = 248;
const R_ORBIT = 178;
const R_INNER = 104;

/** Four orbit nodes, evenly spaced, top first. */
/*
  Every label is centred on its node rather than pushed outward. Anchoring the
  left node's label to "end" pushed DCODEINTELLECT past the viewBox and clipped
  it; centring keeps the longest label inside the frame.
*/
const NODES = [
  { label: "FUNDREV", angle: -90, dy: -24 },
  { label: "TUNEGRAM", angle: 0, dy: 32 },
  { label: "ARTHMALA", angle: 90, dy: 32 },
  { label: "DCODEINTELLECT", angle: 180, dy: -24 },
] as const;

const point = (angle: number, radius: number) => {
  const rad = (angle * Math.PI) / 180;
  return { x: C + radius * Math.cos(rad), y: C + radius * Math.sin(rad) };
};

/**
 * The hero's geometric artifact: concentric rings counter-rotating around a
 * core, with the four ventures as orbit nodes and flow along the spokes.
 *
 * Entirely SVG and CSS, so it renders in the static HTML and costs no
 * JavaScript. Nothing here carries information the text does not already
 * carry, so it is safe to hide from assistive technology.
 */
export function HeroLattice({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 560"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <radialGradient id="core-glow">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.55" />
          <stop offset="45%" stopColor="var(--color-accent)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="spoke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-cyan)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.15" />
        </linearGradient>

        <linearGradient id="ring-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.32" />
        </linearGradient>
      </defs>

      {/* Core bloom */}
      <circle cx={C} cy={C} r={210} fill="url(#core-glow)" />

      {/* Outer ring, dashed, slow clockwise */}
      <g
        className="animate-spin-slow"
        style={{ transformOrigin: `${C}px ${C}px`, animationDuration: "64s" }}
      >
        <circle
          cx={C}
          cy={C}
          r={R_OUTER}
          stroke="url(#ring-stroke)"
          strokeWidth="1"
          strokeDasharray="2 10"
        />
      </g>

      {/* Orbit ring, counter-clockwise */}
      <g
        className="animate-spin-slow"
        style={{
          transformOrigin: `${C}px ${C}px`,
          animationDuration: "46s",
          animationDirection: "reverse",
        }}
      >
        <circle
          cx={C}
          cy={C}
          r={R_ORBIT}
          stroke="oklch(1 0 0 / 10%)"
          strokeWidth="1"
          strokeDasharray="1 7"
        />
      </g>

      {/* Inner hexagon, the structural note */}
      <g
        className="animate-spin-slow"
        style={{ transformOrigin: `${C}px ${C}px`, animationDuration: "38s" }}
      >
        <polygon
          points={Array.from({ length: 6 }, (_, i) => {
            const { x, y } = point(i * 60 - 90, R_INNER);
            return `${x.toFixed(1)},${y.toFixed(1)}`;
          }).join(" ")}
          stroke="oklch(1 0 0 / 14%)"
          strokeWidth="1"
        />
      </g>

      {/* Spokes, with flow travelling outward */}
      {NODES.map((node, index) => {
        const inner = point(node.angle, R_INNER);
        const outer = point(node.angle, R_ORBIT);
        return (
          <line
            key={`spoke-${node.label}`}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="url(#spoke)"
            strokeWidth="1.25"
            strokeDasharray="4 8"
            style={{
              animation: "dash-flow 1.8s linear infinite",
              animationDelay: `${index * 0.28}s`,
            }}
          />
        );
      })}

      {/* Orbit nodes */}
      {NODES.map((node, index) => {
        const { x, y } = point(node.angle, R_ORBIT);
        return (
          <g key={node.label}>
            <circle
              cx={x}
              cy={y}
              r={7}
              fill="var(--color-accent)"
              opacity="0.28"
              style={{
                transformOrigin: `${x}px ${y}px`,
                animation: "pulse-ring 3.4s ease-out infinite",
                animationDelay: `${index * 0.85}s`,
              }}
            />
            <circle cx={x} cy={y} r={4.5} fill="var(--color-canvas)" />
            <circle
              cx={x}
              cy={y}
              r={4.5}
              stroke="var(--color-accent-bright)"
              strokeWidth="1.25"
            />
            <circle cx={x} cy={y} r={1.75} fill="var(--color-accent-bright)" />
            <text
              x={x}
              y={y + node.dy}
              textAnchor="middle"
              className="fill-[var(--color-ink-faint)] font-mono text-[11px] tracking-[0.16em]"
            >
              {node.label}
            </text>
          </g>
        );
      })}

      {/* Core */}
      <circle cx={C} cy={C} r={34} fill="var(--color-canvas)" />
      <circle cx={C} cy={C} r={34} stroke="oklch(1 0 0 / 20%)" strokeWidth="1" />
      <circle
        cx={C}
        cy={C}
        r={34}
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeDasharray="8 6"
        style={{ transformOrigin: `${C}px ${C}px`, animation: "spin-slow 14s linear infinite" }}
      />
      <text
        x={C}
        y={C + 4}
        textAnchor="middle"
        className="fill-[var(--color-ink-muted)] font-mono text-[11px] tracking-[0.2em]"
      >
        RS
      </text>
    </svg>
  );
}
