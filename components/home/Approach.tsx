import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { principles } from "@/lib/content/approach";

export function Approach() {
  return (
    <section id="approach" className="container-page scroll-mt-24 py-[var(--section-y)]">
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

      <SpotlightGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle, index) => (
          <article
            key={principle.index}
            data-spotlight
            data-reveal
            className={[
              "card spotlight group flex flex-col p-6 transition-transform duration-500 hover:-translate-y-1 md:p-7",
              /*
                Five cards in a three-column grid only tile without holes if
                exactly one of them is double width: 2+1 on the first row, then
                1+1+1. Spanning the last card too left two empty cells.
              */
              index === 0 ? "md:col-span-2 lg:col-span-2" : "",
            ].join(" ")}
          >
            <span className="font-mono text-[2.25rem] leading-none text-ink-ghost/50 transition-colors duration-500 group-hover:text-ink-faint">
              {principle.index}
            </span>

            <h3 className="mt-5 text-[1.125rem] leading-snug tracking-[-0.02em]">
              {principle.title}
            </h3>

            <p className="mt-3 flex-1 text-[0.875rem] leading-[1.7] text-ink-faint">
              {principle.body}
            </p>

            <p className="mt-6 flex items-start gap-2.5 border-t border-line pt-4 font-mono text-[0.6875rem] leading-relaxed text-ink-ghost">
              <span
                aria-hidden
                className="mt-1.5 h-px w-4 shrink-0 bg-line-strong"
              />
              {principle.evidence}
            </p>
          </article>
        ))}
      </SpotlightGroup>
    </section>
  );
}
