import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { metrics, profile, socials } from "@/lib/content/site";

export function Hero() {
  return (
    <section className="container-page pt-24 pb-[var(--section-y)] md:pt-32">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div>
          <p className="flex max-w-sm items-start gap-2 text-[0.8125rem] text-ink-faint">
            <span
              aria-hidden
              className="mt-[0.45em] inline-block size-1.5 shrink-0 rounded-full bg-emerald-600"
            />
            {profile.availability}
          </p>

          <h1 className="mt-6 text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.92] tracking-[-0.04em]">
            {profile.name}
          </h1>

          <p className="mt-5 max-w-2xl text-[clamp(1.25rem,3vw,1.75rem)] leading-[1.2] tracking-[-0.025em] text-ink-muted">
            Senior software engineer.{" "}
            <span className="text-ink">Co-founder at Fundrev.</span>
          </p>

          <p className="mt-6 max-w-xl text-[0.9375rem] leading-[1.65] text-ink-faint">
            {profile.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.875rem] font-medium text-canvas transition-opacity hover:opacity-85"
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
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-[0.875rem] text-ink transition-colors hover:bg-sunken"
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
                    className="flex size-9 items-center justify-center rounded-full text-ink-ghost transition-colors hover:bg-sunken hover:text-ink"
                  >
                    <Icon name={social.icon} size={16} />
                    <span className="sr-only">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Image
          src="/media/profile.jpg"
          alt={`${profile.name}, ${profile.role}`}
          width={800}
          height={800}
          priority
          sizes="(max-width: 1024px) 160px, 260px"
          className="order-first size-40 rounded-2xl border border-line object-cover lg:order-none lg:size-65"
        />
      </div>

      {/* Metrics as a hairline strip rather than four boxes. */}
      <dl className="mt-12 grid grid-cols-2 border-t border-line sm:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="border-b border-line py-5 pr-6 sm:border-b-0">
            <dd className="text-[1.75rem] leading-none tracking-[-0.03em]">
              {metric.value}
            </dd>
            <dt className="mt-2 text-[0.8125rem] text-ink-muted">{metric.label}</dt>
            <p className="mt-0.5 text-[0.75rem] text-ink-ghost">{metric.detail}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}
