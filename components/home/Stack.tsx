import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stackGroups } from "@/lib/content/stack";

export function Stack() {
  const total = stackGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section id="stack" className="container-page scroll-mt-24 py-[var(--section-y)]">
      <SectionHeading
        eyebrow="Stack"
        title={
          <>
            What I reach for, and{" "}
            <span className="text-display text-accent-soft">why it is that one</span>
          </>
        }
        lead="Chosen per problem rather than per habit — which is why there is both a document store and a relational one on this list, and why .NET is still here."
        aside={`${total} tools`}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stackGroups.map((group, index) => (
          <Reveal key={group.id} delay={index} className="h-full">
            <div className="panel flex h-full flex-col p-6">
              <h3 className="text-base font-medium">{group.title}</h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-faint">
                {group.blurb}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <li
                    key={tech.name}
                    title={tech.note}
                    className="group/chip flex items-center gap-2 rounded-lg border border-line bg-overlay/70 px-2.5 py-1.5 transition-colors hover:border-line-strong"
                  >
                    {tech.logo ? (
                      <Image
                        src={tech.logo}
                        alt=""
                        width={16}
                        height={16}
                        className="size-4 shrink-0 object-contain opacity-70 transition-opacity group-hover/chip:opacity-100"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="size-1.5 shrink-0 rounded-full bg-accent/50"
                      />
                    )}
                    <span className="font-mono text-[0.75rem] whitespace-nowrap text-ink-muted">
                      {tech.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
