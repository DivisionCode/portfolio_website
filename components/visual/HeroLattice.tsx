const C = 280; // centre of the 560 viewBox
const R_OUTER = 250;
const R_ORBIT = 176;
const R_INNER = 104;

/**
 * Four orbit nodes, evenly spaced, top first. Labels are centred on their node
 * so the longest one stays inside the frame.
 */
const NODES = [
  { label: "FUNDREV", angle: -90, dy: -22 },
  { label: "TUNEGRAM", angle: 0, dy: 30 },
  { label: "ARTHMALA", angle: 90, dy: 30 },
  { label: "DCODEINTELLECT", angle: 180, dy: -22 },
] as const;

const point = (angle: number, radius: number) => {
  const rad = (angle * Math.PI) / 180;
  return { x: C + radius * Math.cos(rad), y: C + radius * Math.sin(rad) };
};

/**
 * The hero's geometric artifact: rings counter-rotating around a core, the
 * four ventures as orbit nodes, and flow travelling along the spokes.
 *
 * Monochrome and hairline-thin on purpose. The earlier version leaned on a
 * violet-to-cyan ramp and a bloom, which is what every generated site reaches
 * for. Entirely SVG and CSS, so it renders in the static HTML and costs no
 * JavaScript.
 */
export function HeroLattice({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 560" className={className} aria-hidden="true" fill="none">
      <defs>
        {/*
          Rings fade around their circumference rather than drawing at an even
          weight, which reads as lighting rather than as an outline.
        */}
        <linearGradient id="ring-a" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.20" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.14" />
        </linearGradient>

        <linearGradient id="spoke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.06" />
        </linearGradient>

        <radialGradient id="core-wash">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={C} cy={C} r={200} fill="url(#core-wash)" />

      {/* Outer ring, slow clockwise */}
      <g
        className="animate-spin-slow"
        style={{ transformOrigin: `${C}px ${C}px`, animationDuration: "72s" }}
      >
        <circle
          cx={C}
          cy={C}
          r={R_OUTER}
          stroke="url(#ring-a)"
          strokeWidth="1"
          strokeDasharray="1 9"
        />
      </g>

      {/* Orbit ring, counter-clockwise */}
      <g
        className="animate-spin-slow"
        style={{
          transformOrigin: `${C}px ${C}px`,
          animationDuration: "52s",
          animationDirection: "reverse",
        }}
      >
        <circle
          cx={C}
          cy={C}
          r={R_ORBIT}
          stroke="oklch(1 0 0 / 9%)"
          strokeWidth="1"
          strokeDasharray="1 6"
        />
      </g>

      {/* Inner hexagon, the structural note */}
      <g
        className="animate-spin-slow"
        style={{ transformOrigin: `${C}px ${C}px`, animationDuration: "40s" }}
      >
        <polygon
          points={Array.from({ length: 6 }, (_, i) => {
            const { x, y } = point(i * 60 - 90, R_INNER);
            return `${x.toFixed(1)},${y.toFixed(1)}`;
          }).join(" ")}
          stroke="oklch(1 0 0 / 11%)"
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
            strokeWidth="1"
            strokeDasharray="3 9"
            style={{
              animation: "dash-flow 2.2s linear infinite",
              animationDelay: `${index * 0.34}s`,
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
              r={6}
              fill="#fff"
              opacity="0.16"
              style={{
                transformOrigin: `${x}px ${y}px`,
                animation: "pulse-ring 3.8s ease-out infinite",
                animationDelay: `${index * 0.95}s`,
              }}
            />
            <circle cx={x} cy={y} r={3.5} fill="var(--color-canvas)" />
            <circle
              cx={x}
              cy={y}
              r={3.5}
              stroke="#fff"
              strokeOpacity="0.55"
              strokeWidth="1"
            />
            <circle cx={x} cy={y} r={1.25} fill="#fff" fillOpacity="0.8" />
            <text
              x={x}
              y={y + node.dy}
              textAnchor="middle"
              className="fill-[var(--color-ink-ghost)] font-mono text-[10px] tracking-[0.18em]"
            >
              {node.label}
            </text>
          </g>
        );
      })}

      {/* Core rings: the frame the portrait sits inside */}
      <circle cx={C} cy={C} r={72} stroke="oklch(1 0 0 / 10%)" strokeWidth="1" />
      <circle
        cx={C}
        cy={C}
        r={80}
        stroke="oklch(1 0 0 / 22%)"
        strokeWidth="1"
        strokeDasharray="2 8"
        style={{
          transformOrigin: `${C}px ${C}px`,
          animation: "spin-slow 30s linear infinite reverse",
        }}
      />
    </svg>
  );
}
