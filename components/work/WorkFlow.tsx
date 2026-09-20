/**
 * The path a job takes through a business, drawn as a hairline rail.
 *
 * This started life inside the ventures grid on the home page, where it was
 * filling space in an oversized panel. It belongs here: the case study has the
 * full page width, so the rail runs node to node without the labels crowding.
 *
 * The rail is inset by half a column at each end so it starts and finishes on
 * a node rather than at the edge of the container.
 */
export function WorkFlow({ steps }: { steps: readonly string[] }) {
  const inset = `${50 / steps.length}%`;

  return (
    <section className="border-b border-line py-9">
      <span className="label-mono">The path an order takes</span>

      <div className="relative mt-7">
        <div
          aria-hidden
          className="absolute top-[3px] h-px bg-line-strong"
          style={{ left: inset, right: inset }}
        />

        <ol
          className="relative grid"
          style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
        >
          {steps.map((step) => (
            <li key={step} className="flex flex-col items-center gap-3.5">
              <span
                aria-hidden
                className="size-[7px] rounded-full border border-line-strong bg-canvas"
              />
              <span className="label-mono text-center">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
