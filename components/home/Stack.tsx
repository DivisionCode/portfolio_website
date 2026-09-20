import { SectionHeading } from "@/components/ui/SectionHeading";
import { stackGroups } from "@/lib/content/stack";

export function Stack() {
  const total = stackGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section id="stack" className="container-page scroll-mt-20 py-[var(--section-y)]">
      <SectionHeading
        eyebrow="Stack"
        title="What I reach for, and why it's that one."
        lead="Chosen per problem rather than per habit, which is why there's both a document store and a relational one on this list, and why .NET is still here."
        aside={`${total} tools`}
      />

      <dl>
        {stackGroups.map((group) => (
          <div
            key={group.id}
            className="grid gap-y-3 border-t border-line py-5 last:border-b md:grid-cols-[13rem_1fr] md:gap-x-10"
          >
            <div>
              <dt className="text-[0.9375rem] font-medium">{group.title}</dt>
              <p className="mt-1 text-[0.8125rem] leading-snug text-ink-ghost">
                {group.blurb}
              </p>
            </div>

            <dd className="flex flex-wrap items-center gap-x-5 gap-y-2.5 md:pt-1">
              {group.items.map((tech) => (
                <span
                  key={tech.name}
                  title={tech.note}
                  className="font-mono text-[0.75rem] whitespace-nowrap text-ink-muted"
                >
                  {tech.name}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
