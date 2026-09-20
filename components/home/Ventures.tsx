import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusPill, Tag } from "@/components/ui/Tag";
import { ventures } from "@/lib/content/work";

export function Ventures() {
  return (
    <section id="ventures" className="container-page scroll-mt-24 py-[var(--section-y)]">
      <SectionHeading
        eyebrow="Ventures"
        title={
          <>
            Four companies. One question each time:{" "}
            <span className="text-display text-accent-soft">
              what is the process actually costing?
            </span>
          </>
        }
        lead="Private capital, live music, Indian craft, enterprise systems. Different domains, same job — find the part of the workflow that leaks value, then build the system that closes it."
        aside={`${ventures.length} active`}
      />

      <ul className="flex flex-col">
        {ventures.map((venture, index) => (
          <Reveal as="li" key={venture.slug} delay={index}>
            <Link
              href={`/work/${venture.slug}/`}
              className="group relative grid gap-7 border-t border-line py-10 transition-colors duration-300 last:border-b hover:bg-raised/40 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-10 md:py-12"
            >
              {/* Hover wash in the venture's own hue. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(60rem 12rem at 15% 0%, color-mix(in oklab, var(${venture.accentVar}) 8%, transparent), transparent 70%)`,
                }}
              />

              {/* Left column: identity */}
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="label-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="h-px w-6"
                    style={{ background: `var(${venture.accentVar})` }}
                  />
                  <StatusPill status={venture.status} />
                </div>

                <h3 className="text-2xl leading-tight font-medium md:text-[1.75rem]">
                  {venture.wordmark ?? venture.name}
                </h3>

                <p className="font-mono text-[0.6875rem] leading-relaxed tracking-wide text-ink-faint">
                  {venture.role}
                  <br />
                  <span className="text-ink-ghost">{venture.period}</span>
                </p>
              </div>

              {/* Right column: the substance */}
              <div className="relative">
                <p
                  className="text-display text-xl leading-snug md:text-[1.4rem]"
                  style={{ color: `var(${venture.accentVar})` }}
                >
                  {venture.tagline}
                </p>

                <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-muted">
                  {venture.summary}
                </p>

                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {venture.highlights.slice(0, 4).map((highlight) => (
                    <li
                      key={highlight.title}
                      className="flex items-start gap-2.5 text-[0.8125rem] text-ink-faint"
                    >
                      <Icon
                        name="check"
                        size={13}
                        className="mt-1 shrink-0 opacity-60"
                        style={{ color: `var(${venture.accentVar})` }}
                      />
                      <span>{highlight.title}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-1.5">
                  {venture.stack.slice(0, 5).map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink transition-colors group-hover:text-accent">
                    Read the case study
                    <Icon
                      name="arrowRight"
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>

                  {venture.links
                    .filter((link) => link.kind === "site")
                    .map((link) => (
                      <span
                        key={link.href}
                        className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-ink-ghost"
                      >
                        <Icon name="arrowUpRight" size={11} />
                        {link.label}
                      </span>
                    ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
