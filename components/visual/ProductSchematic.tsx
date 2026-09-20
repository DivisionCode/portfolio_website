const CORE_X = 30;
const NODE_X = 132;
const ROW_H = 46;
const PAD_Y = 26;
const WIDTH = 460;

/**
 * A module fan drawn from the product's own data.
 *
 * The products had stock UI-kit mockups once, which were removed because they
 * were not this work. This is the honest replacement: the modules a system
 * actually carries, drawn as the tree an engineer would sketch on a
 * whiteboard. Every product gets a different shape because every product has a
 * different number of modules, so the section stops looking like eight copies
 * of one row.
 *
 * Pure SVG, currentColor throughout so it inverts with the theme, and hidden
 * from assistive tech because the same titles are listed as text beside it.
 */
export function ProductSchematic({
  label,
  modules,
  className,
}: {
  label: string;
  modules: string[];
  className?: string;
}) {
  const height = modules.length * ROW_H + PAD_Y * 2;
  const coreY = height / 2;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      className={`text-ink ${className ?? ""}`}
      aria-hidden="true"
      fill="none"
      preserveAspectRatio="xMinYMid meet"
    >
      {/* Core */}
      <circle cx={CORE_X} cy={coreY} r={21} stroke="currentColor" strokeOpacity="0.18" />
      <circle
        cx={CORE_X}
        cy={coreY}
        r={27}
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeDasharray="2 7"
        style={{
          transformOrigin: `${CORE_X}px ${coreY}px`,
          animation: "spin-slow 36s linear infinite",
        }}
      />
      <text
        x={CORE_X}
        y={coreY + 4}
        textAnchor="middle"
        className="fill-[var(--color-ink-faint)] text-[10px] font-medium tracking-[0.08em]"
      >
        {label}
      </text>

      {modules.map((title, index) => {
        const y = PAD_Y + ROW_H * index + ROW_H / 2;
        const midX = (CORE_X + 27 + NODE_X) / 2;

        return (
          <g key={title}>
            {/* Branch: a bezier so the fan reads as a diagram, not a bar chart */}
            <path
              d={`M ${CORE_X + 27} ${coreY} C ${midX} ${coreY}, ${midX} ${y}, ${NODE_X} ${y}`}
              stroke="currentColor"
              strokeOpacity="0.22"
              strokeWidth="1"
              strokeDasharray="3 6"
              style={{
                animation: "dash-flow 3.2s linear infinite",
                animationDelay: `${index * 0.24}s`,
              }}
            />

            <circle cx={NODE_X} cy={y} r={3} fill="var(--color-canvas)" />
            <circle
              cx={NODE_X}
              cy={y}
              r={3}
              stroke="currentColor"
              strokeOpacity="0.55"
              strokeWidth="1"
            />

            <text
              x={NODE_X + 14}
              y={y + 4}
              className="fill-[var(--color-ink-muted)] text-[11.5px]"
            >
              {title}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
