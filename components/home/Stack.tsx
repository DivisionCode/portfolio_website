import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { stackGroups } from "@/lib/content/stack";

export function Stack() {
  const total = stackGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section id="stack" className="container-page scroll-mt-24 py-[var(--section-y)]">
      <SectionHeading
        index="05"
        eyebrow="Stack"
        title={
          <>
            What I reach for,{" "}
            <span className="text-ink-faint">and why it is that one.</span>
          </>
        }
        lead="Chosen per problem rather than per habit, which is why there is both a document store and a relational one on this list, and why .NET is still here."
        aside={`${total} technologies`}
      />

      <SpotlightGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stackGroups.map((group) => (
          <div
            key={group.id}
            data-spotlight
            data-reveal
            className="card spotlight flex flex-col p-6"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[1rem] tracking-[-0.015em]">{group.title}</h3>
              <span className="meta text-ink-ghost">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>

            <p className="mt-2 text-[0.8125rem] leading-[1.6] text-ink-ghost">
              {group.blurb}
            </p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {group.items.map((tech) => (
                <li
                  key={tech.name}
                  title={tech.note}
                  className="rounded-md border border-line bg-overlay/50 px-2 py-1 meta whitespace-nowrap text-ink-muted transition-colors duration-300 hover:border-line-strong hover:text-accent"
                >
                  {tech.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </SpotlightGroup>
    </section>
  );
}
