import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Counter } from "@/components/ui/Counter";
import { HeroLattice } from "@/components/visual/HeroLattice";
import { metrics, profile, socials } from "@/lib/content/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-clip pt-24 pb-[var(--section-y)] md:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-field absolute inset-0" />
        <div className="wash absolute inset-0" />
      </div>

      <div className="container-page">
        {/*
          Masthead strip. An editorial device: the page states where it is
          before it states who it is, and it gives the hero a top edge to hang
          from instead of floating in space.
        */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line pb-4">
          <span className="label-mono">{profile.brand}</span>
          <span aria-hidden className="hidden h-2.5 w-px bg-line-strong sm:block" />
          <span className="label-mono">
            {profile.location.region}, {profile.location.country}
          </span>
          <span aria-hidden className="hidden h-2.5 w-px bg-line-strong sm:block" />
          <span className="label-mono">{profile.location.timezone}</span>

          <span className="label-mono ml-auto flex items-center gap-2 text-ink-muted">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full rounded-full bg-live opacity-70 [animation:pulse-ring_2.8s_ease-out_infinite]" />
              <span className="relative inline-flex size-1.5 rounded-full bg-live" />
            </span>
            Available
          </span>
        </div>

        <div className="grid items-center gap-12 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-16">
          <div data-reveal>
            <h1 className="text-[clamp(3.25rem,8.5vw,6.5rem)] leading-[0.86]">
              Rohit Singh
            </h1>

            <p className="mt-8 max-w-xl text-[clamp(1.125rem,2.2vw,1.4375rem)] leading-[1.3] tracking-[-0.02em] text-ink-muted">
              Senior software engineer.{" "}
              <span className="text-ink">Co-founder at Fundrev.</span>
            </p>

            <p className="mt-6 max-w-lg text-[0.9375rem] leading-[1.75] text-ink-faint">
              {profile.bio}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-2">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.875rem] font-medium text-canvas transition-colors duration-200 hover:bg-white"
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
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[0.875rem] text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
              >
                <Icon name="download" size={14} />
                CV
              </a>

              <ul className="ml-2 flex items-center gap-1">
                {socials.slice(0, 3).map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${social.label} · ${social.handle}`}
                      className="flex size-9 items-center justify-center rounded-full text-ink-ghost transition-colors duration-200 hover:text-ink"
                    >
                      <Icon name={social.icon} size={16} />
                      <span className="sr-only">{social.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lattice, with the portrait as its core */}
          <div className="relative mx-auto aspect-square w-full max-w-[28rem]">
            <HeroLattice className="animate-drift absolute inset-0 size-full" />
            <Image
              src="/media/profile.jpg"
              alt={`${profile.name}, ${profile.role}`}
              width={800}
              height={800}
              priority
              sizes="200px"
              className="absolute top-1/2 left-1/2 size-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover grayscale-[0.2]"
            />
          </div>
        </div>

        {/* Metrics, divided by rules rather than boxed */}
        <dl data-reveal className="mt-14 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`py-6 pr-8 ${index > 0 ? "md:border-l md:border-line md:pl-8" : ""}`}
            >
              <dd className="font-mono text-[2rem] leading-none tracking-[-0.04em] tabular-nums md:text-[2.375rem]">
                <Counter value={metric.value} suffix={metric.suffix} />
              </dd>
              <dt className="mt-3.5 text-[0.8125rem] text-ink-muted">{metric.label}</dt>
              <p className="mt-1 text-[0.75rem] text-ink-ghost">{metric.detail}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
