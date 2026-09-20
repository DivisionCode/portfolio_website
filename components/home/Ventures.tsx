import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { StatusPill } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { ventures, type WorkItem } from "@/lib/content/work";

/** Bento placement: the flagship takes two columns, the rest alternate. */
const SPAN = ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2"];

export function Ventures() {
  return (
    <section id="ventures" className="container-page scroll-mt-24 py-[var(--section-y)]">
      <SectionHeading
        eyebrow="Ventures"
        title={
          <>
            Four companies, one question each time:{" "}
            <span className="text-ink-faint">
              what is the process actually costing?
            </span>
          </>
        }
        lead="Private capital, live music, Indian craft, enterprise systems. Different domains, same job: find the part of the workflow that leaks value, then build the system that closes it."
        aside={`${ventures.length} active`}
      />

      <SpotlightGroup className="grid gap-4 md:grid-cols-3">
        {ventures.map((venture, index) => (
          <VentureCard
            key={venture.slug}
            venture={venture}
            index={index}
            className={SPAN[index]}
            wide={SPAN[index] === "md:col-span-2"}
          />
        ))}
      </SpotlightGroup>
    </section>
  );
}

function VentureCard({
  venture,
  index,
  className,
  wide,
}: {
  venture: WorkItem;
  index: number;
  className?: string;
  wide: boolean;
}) {
  const site = venture.links.find((link) => link.kind === "site");

  return (
    <Link
      href={`/work/${venture.slug}/`}
      data-spotlight
      data-reveal
      className={cn(
        "card spotlight group flex flex-col p-6 transition-transform duration-500 hover:-translate-y-1 md:p-8",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="label-mono">{String(index + 1).padStart(2, "0")}</span>
        <StatusPill status={venture.status} />
      </div>

      <h3 className="mt-6 text-[1.75rem] leading-none tracking-[-0.035em] md:text-[2rem]">
        {venture.wordmark ?? venture.name}
      </h3>

      <p className="mt-2.5 font-mono text-[0.6875rem] tracking-wide text-ink-faint">
        {venture.role}
      </p>

      <p className="mt-5 text-[1.0625rem] leading-snug text-ink">{venture.tagline}</p>

      <p
        className={cn(
          "mt-3 text-[0.875rem] leading-[1.65] text-ink-faint",
          wide ? "max-w-xl" : null,
        )}
      >
        {venture.summary}
      </p>

      {/* The wide cells have room for proof, the narrow ones do not. */}
      {wide ? (
        <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {venture.highlights.slice(0, 4).map((highlight) => (
            <li
              key={highlight.title}
              className="flex items-center gap-2 text-[0.8125rem] text-ink-muted"
            >
              <span aria-hidden className="size-1 shrink-0 rounded-full bg-accent" />
              {highlight.title}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-8">
        <p className="font-mono text-[0.6875rem] leading-relaxed text-ink-ghost">
          {venture.stack.slice(0, wide ? 8 : 4).join("  ·  ")}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-5">
          <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium transition-colors group-hover:text-accent-bright">
            Case study
            <Icon
              name="arrowRight"
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
          {site ? (
            <span className="font-mono text-[0.6875rem] text-ink-ghost">
              {site.label}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
