import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { stackGroups } from "@/lib/content/stack";

/**
 * Nine hairline rows rather than nine floating cards.
 *
 * As a three-column grid of boxes each row was as tall as its fullest tile, so
 * a group of four technologies sat next to a group of fourteen with a block of
 * white under it. Nothing lined up and roughly a third of the section was
 * empty. A row sizes to its own content, so there is no dead space anywhere and
 * every group name starts on the same rail.
 *
 * The pills went with it. Eighty-seven bordered chips is a lot of chrome for
 * what is a list; set as text they read faster and the section stops shouting.
 * Architecture keeps its chips, where the lists are short and the point is the
 * layer rather than the inventory.
 */
export function Stack() {
  const total = stackGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section id="stack" className="container-page scroll-mt-24 pt-[var(--section-y)]">
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

      <SpotlightGroup>
        {stackGroups.map((group, index) => (
          <div
            key={group.id}
            data-spotlight
            data-reveal
            className="spotlight relative grid border-t border-line py-7 last:border-b md:grid-cols-[2.5rem_14rem_1fr] md:gap-x-10"
          >
            <span className="label-mono hidden text-ink-ghost md:block">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex items-baseline justify-between gap-4 md:block">
              <h3 className="text-[1.0625rem] tracking-[-0.02em]">{group.title}</h3>
              <span className="meta mt-1.5 block shrink-0 text-ink-ghost">
                {group.items.length} technologies
              </span>
            </div>

            <div className="mt-3 md:mt-0">
              <p className="max-w-xl text-[0.875rem] leading-[1.6] text-ink-faint">
                {group.blurb}
              </p>

              {/*
                One paragraph rather than a list of nodes, so the line breaks
                where the column ends instead of where a flex row runs out.
              */}
              <p className="mt-3.5 max-w-[52rem] text-[0.9375rem] leading-[1.95] text-ink-muted">
                {group.items.map((tech, position) => (
                  <span key={tech.name}>
                    {position > 0 ? (
                      <span aria-hidden className="text-ink-ghost">
                        {"  ·  "}
                      </span>
                    ) : null}
                    {/*
                      The note stays on the title attribute only. Underlining
                      every annotated item put a rule under roughly half the
                      list, which read as noise rather than as an affordance.
                    */}
                    <span title={tech.note}>{tech.name}</span>
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </SpotlightGroup>
    </section>
  );
}
