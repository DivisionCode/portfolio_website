import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { principles } from "@/lib/content/approach";

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-24 py-[var(--section-y)]">
      <div className="container-page">
        <SectionHeading
          eyebrow="Approach"
          title={
            <>
              Five things I hold to,{" "}
              <span className="text-display text-accent-soft">
                and what they cost when I don&apos;t
              </span>
            </>
          }
          lead="Not a philosophy. These are the decisions that turned out to matter, learned on systems that are still running."
        />

        <ol className="flex flex-col">
          {principles.map((principle, index) => (
            <Reveal as="li" key={principle.index} delay={index}>
              <article className="group grid gap-5 border-t border-line py-9 last:border-b md:grid-cols-[6rem_1fr] md:gap-10 md:py-11">
                <p className="font-mono text-4xl leading-none text-ink-ghost transition-colors duration-300 group-hover:text-accent md:text-5xl">
                  {principle.index}
                </p>

                <div>
                  <h3 className="max-w-xl text-xl leading-snug font-medium md:text-2xl">
                    {principle.title}
                  </h3>
                  <p className="mt-3.5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-muted">
                    {principle.body}
                  </p>
                  <p className="mt-5 flex items-start gap-2.5 font-mono text-[0.6875rem] leading-relaxed text-ink-ghost">
                    <span aria-hidden className="mt-1.5 h-px w-4 shrink-0 bg-line-strong" />
                    {principle.evidence}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
