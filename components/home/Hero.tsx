import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { metrics, profile } from "@/lib/content/site";
import { ventures } from "@/lib/content/work";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-[var(--section-y)] md:pt-36">
      {/* Backdrop: engineering grid + a single warm glow behind the headline. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-field absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[120px]" />
      </div>

      <div className="container-page">
        <div className="grid items-start gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          {/* ── Left: the pitch ─────────────────────────────────────────── */}
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-raised px-3.5 py-1.5">
                <span
                  aria-hidden
                  className="inline-block size-1.5 animate-pulse-dot rounded-full bg-emerald-400"
                />
                <span className="font-mono text-[0.6875rem] tracking-wide text-ink-muted">
                  {profile.availability}
                </span>
              </p>
            </Reveal>

            <Reveal delay={1}>
              <h1 className="mt-7 text-[clamp(2.75rem,8vw,5.25rem)] leading-[0.95] font-medium">
                {profile.name}
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-5 text-[clamp(1.25rem,3.2vw,1.875rem)] leading-tight text-ink-muted">
                Senior software engineer.{" "}
                <span className="text-display text-ink">Founder, three times over.</span>
              </p>
            </Reveal>

            <Reveal delay={3}>
              <p className="mt-7 max-w-xl text-[0.975rem] leading-relaxed text-ink-faint md:text-base">
                {profile.bio}
              </p>
            </Reveal>

            <Reveal delay={4}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-85"
                >
                  Start a conversation
                  <Icon
                    name="arrowRight"
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-raised px-5 py-2.5 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  <Icon name="download" size={14} />
                  CV
                </a>
                <a
                  href="#ventures"
                  className="inline-flex items-center gap-2 px-2 py-2.5 text-sm text-ink-faint transition-colors hover:text-ink"
                >
                  See the ventures
                  <Icon name="arrowDown" size={14} />
                </a>
              </div>
            </Reveal>
          </div>

          {/* ── Right: portrait + the four ventures at a glance ──────────── */}
          <Reveal delay={2} className="lg:pt-4">
            <div className="panel overflow-hidden">
              <div className="relative aspect-4/5 sm:aspect-16/11 lg:aspect-4/5">
                <Image
                  src="/media/profile.webp"
                  alt={`${profile.name}, ${profile.role}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover object-top grayscale-[0.35] transition-[filter] duration-700 hover:grayscale-0"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-raised via-raised/10 to-transparent"
                />
              </div>

              <div className="border-t border-line p-5">
                <p className="label-mono">Currently</p>
                <ul className="mt-3.5 flex flex-col gap-2.5">
                  {ventures.map((venture) => (
                    <li key={venture.slug}>
                      <Link
                        href={`/work/${venture.slug}/`}
                        className="group flex items-baseline gap-2.5 text-sm"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 size-1.5 shrink-0 rounded-full"
                          style={{ background: `var(${venture.accentVar})` }}
                        />
                        <span className="font-medium transition-colors group-hover:text-accent">
                          {venture.name}
                        </span>
                        <span className="ml-auto truncate text-right font-mono text-[0.6875rem] text-ink-ghost">
                          {venture.role.split(" · ")[0]}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Metrics strip ────────────────────────────────────────────── */}
        <Reveal delay={5}>
          <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-24 md:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="bg-canvas px-5 py-7 md:px-7">
                <dt className="label-mono">{metric.label}</dt>
                <dd className="mt-3 text-4xl leading-none font-medium tracking-tight md:text-5xl">
                  {metric.value}
                </dd>
                <p className="mt-2.5 text-[0.75rem] text-ink-ghost">{metric.detail}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
