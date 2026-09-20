import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { publishedExperience } from "@/lib/content/experience";

/**
 * Renders nothing until `lib/content/experience.ts` has real roles in it.
 * The section should not ship with placeholder history.
 */
export function Experience() {
  if (publishedExperience.length === 0) return null;

  return (
    <section id="experience" className="container-page scroll-mt-24 py-[var(--section-y)]">
      <SectionHeading
        eyebrow="Experience"
        title="Where the reps came from"
        aside={`${publishedExperience.length} roles`}
      />

      <ol className="flex flex-col">
        {publishedExperience.map((role, index) => (
          <Reveal as="li" key={role.company} delay={index}>
            <article className="grid gap-5 border-t border-line py-9 last:border-b md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10">
              <div className="flex items-center gap-3.5">
                {role.logo ? (
                  <Image
                    src={role.logo}
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 shrink-0 rounded-lg object-contain"
                  />
                ) : null}
                <div>
                  <p className="font-medium">{role.company}</p>
                  <p className="mt-0.5 font-mono text-[0.6875rem] text-ink-ghost">
                    {role.period}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-lg font-medium">{role.title}</p>
                {role.summary ? (
                  <p className="mt-2.5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-muted">
                    {role.summary}
                  </p>
                ) : null}
                {role.work.length > 0 ? (
                  <ul className="mt-4 flex flex-col gap-2">
                    {role.work.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2.5 text-[0.8125rem] text-ink-faint"
                      >
                        <span
                          aria-hidden
                          className="mt-2 size-1 shrink-0 rounded-full bg-accent/60"
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
