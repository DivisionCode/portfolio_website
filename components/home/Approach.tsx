import { SectionHeading } from "@/components/ui/SectionHeading";
import { principles } from "@/lib/content/approach";

export function Approach() {
  return (
    <section id="approach" className="container-page scroll-mt-20 py-[var(--section-y)]">
      <SectionHeading
        eyebrow="Approach"
        title="Five things I hold to, and what they cost when I don't."
        lead="Not a philosophy. These are the decisions that turned out to matter, learned on systems that are still running."
      />

      <ol className="grid gap-x-10 gap-y-0 md:grid-cols-2">
        {principles.map((principle) => (
          <li key={principle.index} className="border-t border-line py-6">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[0.6875rem] text-ink-ghost">
                {principle.index}
              </span>
              <h3 className="text-[1.0625rem] leading-snug tracking-[-0.02em]">
                {principle.title}
              </h3>
            </div>

            <p className="mt-3 text-[0.875rem] leading-[1.6] text-ink-faint">
              {principle.body}
            </p>

            <p className="mt-3 border-l-2 border-line-strong pl-3 font-mono text-[0.6875rem] leading-relaxed text-ink-ghost">
              {principle.evidence}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
