import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusPill } from "@/components/ui/Tag";
import { ventures } from "@/lib/content/work";

export function Ventures() {
  return (
    <section id="ventures" className="container-page scroll-mt-20 py-[var(--section-y)]">
      <SectionHeading
        eyebrow="Ventures"
        title="Four companies, one question each time: what is the process actually costing?"
        lead="Private capital, live music, Indian craft, enterprise systems. Different domains, same job: find the part of the workflow that leaks value, then build the system that closes it."
        aside={`${ventures.length} active`}
      />

      <ul>
        {ventures.map((venture) => {
          const site = venture.links.find((link) => link.kind === "site");

          return (
            <li key={venture.slug}>
              <Link
                href={`/work/${venture.slug}/`}
                className="group grid gap-y-3 border-t border-line py-6 last:border-b md:grid-cols-[15rem_1fr_auto] md:gap-x-10 md:py-7"
              >
                {/* Identity */}
                <div>
                  <h3 className="text-[1.375rem] leading-tight tracking-[-0.03em] transition-colors group-hover:text-accent">
                    {venture.wordmark ?? venture.name}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-faint">
                    {venture.role}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <StatusPill status={venture.status} />
                    {site ? (
                      <span className="font-mono text-[0.6875rem] text-ink-ghost">
                        {site.label}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Substance */}
                <div className="md:pt-0.5">
                  <p className="text-[0.9375rem] leading-snug font-medium">
                    {venture.tagline}
                  </p>
                  <p className="mt-2 max-w-2xl text-[0.875rem] leading-[1.6] text-ink-faint">
                    {venture.summary}
                  </p>
                  <p className="mt-3 font-mono text-[0.6875rem] text-ink-ghost">
                    {venture.stack.slice(0, 5).join(" · ")}
                  </p>
                </div>

                <Icon
                  name="arrowUpRight"
                  size={18}
                  className="hidden self-center text-ink-ghost transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
