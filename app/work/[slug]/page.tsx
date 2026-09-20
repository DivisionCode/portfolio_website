import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { StatusPill, Tag } from "@/components/ui/Tag";
import { SITE_URL } from "@/lib/content/site";
import { allWork, getWorkBySlug } from "@/lib/content/work";

export function generateStaticParams() {
  return allWork.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);

  if (!item) return { title: "Not found" };

  return {
    title: `${item.name} — ${item.tagline}`,
    description: item.summary,
    alternates: { canonical: `/work/${item.slug}/` },
    openGraph: {
      type: "article",
      title: `${item.name} — ${item.tagline}`,
      description: item.summary,
      url: `${SITE_URL}/work/${item.slug}/`,
      images: item.cover ? [{ url: item.cover }] : undefined,
    },
  };
}

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);

  if (!item) notFound();

  const index = allWork.findIndex((entry) => entry.slug === item.slug);
  const next = allWork[(index + 1) % allWork.length];
  const previous = allWork[(index - 1 + allWork.length) % allWork.length];
  const siteLink = item.links.find((link) => link.kind === "site");

  return (
    <article>
      {/* ── Masthead ──────────────────────────────────────────────────── */}
      <header className="relative isolate overflow-hidden border-b border-line pt-28 pb-14 md:pt-36 md:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="grid-field absolute inset-0" />
          <div
            className="absolute -top-32 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full blur-[110px] opacity-25"
            style={{ background: `var(${item.accentVar})` }}
          />
        </div>

        <div className="container-page">
          <Link
            href={item.kind === "venture" ? "/#ventures" : "/#products"}
            className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-wide text-ink-faint transition-colors hover:text-ink"
          >
            <Icon
              name="arrowLeft"
              size={13}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            {item.kind === "venture" ? "All ventures" : "All products"}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <StatusPill status={item.status} />
            <span aria-hidden className="h-3 w-px bg-line-strong" />
            <span className="font-mono text-[0.6875rem] tracking-wide text-ink-faint">
              {item.role}
            </span>
            <span aria-hidden className="h-3 w-px bg-line-strong" />
            <span className="font-mono text-[0.6875rem] tracking-wide text-ink-ghost">
              {item.period}
            </span>
          </div>

          <h1 className="mt-6 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] font-medium">
            {item.wordmark ?? item.name}
          </h1>

          <p
            className="text-display mt-5 max-w-2xl text-[clamp(1.25rem,2.6vw,1.75rem)] leading-snug"
            style={{ color: `var(${item.accentVar})` }}
          >
            {item.tagline}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted">
            {item.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {item.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.kind === "mail" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={
                  link === siteLink
                    ? "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-85"
                    : "inline-flex items-center gap-2 rounded-full border border-line bg-raised px-5 py-2.5 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                }
              >
                <Icon
                  name={
                    link.kind === "repo"
                      ? "repo"
                      : link.kind === "mail"
                        ? "mail"
                        : "arrowUpRight"
                  }
                  size={14}
                />
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-1.5">
            {item.domains.map((domain) => (
              <Tag key={domain} tone="accent">
                {domain}
              </Tag>
            ))}
          </div>
        </div>
      </header>

      {/* ── Cover ─────────────────────────────────────────────────────── */}
      {item.cover ? (
        <div className="container-page -mt-px">
          <Reveal>
            <div className="panel relative mt-12 aspect-16/9 overflow-hidden md:aspect-21/9">
              <Image
                src={item.cover}
                alt={item.coverAlt ?? `${item.name} interface`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-top"
              />
            </div>
          </Reveal>
        </div>
      ) : null}

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="container-page py-[var(--section-y)]">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          {/* Narrative */}
          <Reveal>
            <p className="label-mono">The problem, and the shape of the answer</p>
            <div className="rule-fade mt-3.5 mb-8 opacity-70" />
            <div className="flex flex-col gap-6">
              {item.narrative.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[1.0625rem] leading-[1.75] text-ink-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <h2 className="mt-14 text-2xl font-medium">What it does</h2>
            <ul className="mt-7 flex flex-col">
              {item.highlights.map((highlight) => (
                <li
                  key={highlight.title}
                  className="border-t border-line py-5 last:border-b"
                >
                  <p className="flex items-center gap-2.5 font-medium">
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full"
                      style={{ background: `var(${item.accentVar})` }}
                    />
                    {highlight.title}
                  </p>
                  <p className="mt-2 pl-4 text-[0.9375rem] leading-relaxed text-ink-faint">
                    {highlight.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Sidebar */}
          <Reveal delay={1}>
            <div className="flex flex-col gap-4 lg:sticky lg:top-28">
              {item.facts ? (
                <div className="panel p-6">
                  <p className="label-mono">At a glance</p>
                  <dl className="mt-5 flex flex-col gap-4">
                    {item.facts.map((fact) => (
                      <div key={fact.label}>
                        <dt className="font-mono text-[0.6875rem] text-ink-ghost">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 text-[0.875rem] text-ink-muted">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}

              <div className="panel p-6">
                <p className="label-mono">Built with</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="panel p-6">
                <p className="label-mono">Role</p>
                <p className="mt-4 text-[0.9375rem] text-ink-muted">{item.role}</p>
                <p className="mt-1 font-mono text-[0.6875rem] text-ink-ghost">
                  {item.period}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Prev / next ───────────────────────────────────────────────── */}
      <nav
        aria-label="More work"
        className="container-page grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2"
      >
        <WorkNavLink item={previous} direction="previous" />
        <WorkNavLink item={next} direction="next" />
      </nav>

      <div className="container-page mt-6">
        <Link
          href="/#contact"
          className="group panel flex items-center justify-between gap-5 p-7 transition-colors hover:border-line-strong"
        >
          <span>
            <span className="block text-lg font-medium">Working on something like this?</span>
            <span className="mt-1 block text-[0.875rem] text-ink-faint">
              Tell me where it&apos;s stuck.
            </span>
          </span>
          <Icon
            name="arrowRight"
            size={18}
            className="shrink-0 text-ink-ghost transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
          />
        </Link>
      </div>
    </article>
  );
}

function WorkNavLink({
  item,
  direction,
}: {
  item: (typeof allWork)[number];
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/work/${item.slug}/`}
      className="group flex flex-col gap-2 bg-canvas p-7 transition-colors hover:bg-raised"
    >
      <span
        className={`label-mono flex items-center gap-2 ${isNext ? "sm:justify-end" : ""}`}
      >
        {!isNext ? <Icon name="arrowLeft" size={12} /> : null}
        {direction}
        {isNext ? <Icon name="arrowRight" size={12} /> : null}
      </span>
      <span
        className={`text-xl font-medium transition-colors group-hover:text-accent ${isNext ? "sm:text-right" : ""}`}
      >
        {item.wordmark ?? item.name}
      </span>
      <span
        className={`text-[0.8125rem] text-ink-faint ${isNext ? "sm:text-right" : ""}`}
      >
        {item.tagline}
      </span>
    </Link>
  );
}
