import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Counter } from "@/components/ui/Counter";
import { HeroLattice } from "@/components/visual/HeroLattice";
import { metrics, profile, socials } from "@/lib/content/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-[var(--section-y)] md:pt-36">
      {/* Backdrop: grid, then a single warm-cool bloom behind the headline. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-field absolute inset-0" />
        <div className="absolute -top-56 left-[18%] h-[38rem] w-[38rem] rounded-full bg-accent/[0.10] blur-[130px]" />
        <div className="absolute top-10 right-[6%] h-[30rem] w-[30rem] rounded-full bg-accent-cyan/[0.055] blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* ── Pitch ────────────────────────────────────────────────── */}
          <div data-reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-raised/80 py-1.5 pr-4 pl-2.5 backdrop-blur">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 [animation:pulse-ring_2.6s_ease-out_infinite]" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[0.6875rem] tracking-wide text-ink-muted">
                {profile.availability}
              </span>
            </p>

            <h1 className="mt-7 text-[clamp(3rem,7.5vw,5.5rem)] leading-[0.88] tracking-[-0.045em]">
              Rohit
              <br />
              <span className="text-gradient">Singh</span>
            </h1>

            <p className="mt-7 max-w-xl text-[clamp(1.125rem,2.4vw,1.5rem)] leading-[1.25] tracking-[-0.02em] text-ink-muted">
              Senior software engineer.{" "}
              <span className="text-ink">Co-founder at Fundrev.</span>
            </p>

            <p className="mt-6 max-w-lg text-[0.9375rem] leading-[1.7] text-ink-faint">
              {profile.bio}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-2.5">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-2.5 text-[0.875rem] font-medium text-canvas transition-transform duration-300 hover:scale-[1.02]"
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
                className="inline-flex items-center gap-2 rounded-full border border-line bg-raised px-5 py-2.5 text-[0.875rem] text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                <Icon name="download" size={14} />
                CV
              </a>

              <ul className="ml-1 flex items-center gap-0.5">
                {socials.slice(0, 3).map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${social.label} · ${social.handle}`}
                      className="flex size-9 items-center justify-center rounded-full text-ink-ghost transition-all duration-300 hover:-translate-y-0.5 hover:text-ink"
                    >
                      <Icon name={social.icon} size={16} />
                      <span className="sr-only">{social.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Lattice, with the portrait as its core ───────────────── */}
          <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
            <HeroLattice className="absolute inset-0 size-full animate-float" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-full bg-accent/25 blur-xl"
                />
                <Image
                  src="/media/profile.jpg"
                  alt={`${profile.name}, ${profile.role}`}
                  width={800}
                  height={800}
                  priority
                  sizes="132px"
                  className="relative size-[7.5rem] rounded-full border border-line-strong object-cover md:size-33"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Metrics ─────────────────────────────────────────────────── */}
        <dl
          data-reveal
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-14 md:grid-cols-4"
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="group relative bg-canvas px-5 py-7 transition-colors duration-500 hover:bg-raised md:px-7"
            >
              <dd className="text-[2.25rem] leading-none tracking-[-0.04em] tabular-nums md:text-[2.75rem]">
                <Counter value={metric.value} suffix={metric.suffix} />
              </dd>
              <dt className="mt-3 text-[0.8125rem] text-ink-muted">{metric.label}</dt>
              <p className="mt-1 text-[0.75rem] text-ink-ghost">{metric.detail}</p>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
