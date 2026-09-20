import { SectionHeading } from "@/components/ui/SectionHeading";
import { principles } from "@/lib/content/approach";

/**
 * An editorial numbered list, not a grid of cards.
 *
 * The card version had two problems. A card sharing a row with a taller
 * sibling stretched and pushed its footnote to the bottom, leaving a void that
 * looked broken. And the oversized ghost numerals were filler: they took the
 * space a card needs to justify itself without adding anything.
 *
 * Here the index sits in its own narrow column, the content hangs off it, and
 * the rule at the top of each entry does the separating a background was doing
 * badly. The footnote is labelled rather than introduced by a decorative
 * hairline, which read as an em dash.
 */
export function Approach() {
  return (
    <section id="approach" className="container-page scroll-mt-24 pt-[var(--section-y)]">
      <SectionHeading
        index="04"
        eyebrow="Approach"
        title={
          <>
            Five things I hold to,{" "}
            <span className="text-ink-faint">and what they cost when I don&apos;t.</span>
          </>
        }
        lead="Not a philosophy. These are the decisions that turned out to matter, learned on systems that are still running."
      />

      <ol className="grid gap-x-16 md:grid-cols-2">
        {principles.map((principle, index) => (
          <li
            key={principle.index}
            data-reveal
            className={[
              "group grid grid-cols-[2.25rem_1fr] gap-x-4 border-t border-line py-7 md:py-8",
              // The fifth entry runs full width so the list does not end on a
              // ragged half row.
              index === principles.length - 1 ? "md:col-span-2" : "",
            ].join(" ")}
          >
            <span className="label-mono pt-1.5 text-ink-ghost transition-colors duration-300 group-hover:text-ink-faint">
              {principle.index}
            </span>

            <div className="max-w-xl">
              <h3 className="text-[1.0625rem] leading-snug">{principle.title}</h3>

              <p className="mt-3 text-[0.875rem] leading-[1.75] text-ink-faint">
                {principle.body}
              </p>

              <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.8125rem] leading-relaxed text-ink-ghost">
                <span className="label-mono text-ink-ghost">Evidence</span>
                {principle.evidence}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
