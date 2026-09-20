import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Icon } from "@/components/ui/Icon";
import { StatusPill, Tag } from "@/components/ui/Tag";
import { SiteBackdrop } from "@/components/visual/SiteBackdrop";
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
    title: `${item.name} · ${item.tagline}`,
    description: item.summary,
    alternates: { canonical: `/work/${item.slug}/` },
    openGraph: {
      type: "article",
      title: `${item.name} · ${item.tagline}`,
      description: item.summary,
      url: `${SITE_URL}/work/${item.slug}/`,
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
    <article className="relative pt-24 pb-[var(--section-y)] md:pt-32">
      {/*
        Where there is a live site, its own screenshot is the atmosphere behind
        the masthead. Everything else falls back to the plain grid.
      */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem]">
        {item.preview ? (
          <SiteBackdrop src={item.preview} priority />
        ) : (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="grid-field absolute inset-0" />
            <div className="wash absolute inset-0" />
          </div>
        )}
      </div>
      <div className="container-page">
      <Link
        href={item.kind === "venture" ? "/#ventures" : "/#products"}
        className="group inline-flex items-center gap-2 text-[0.8125rem] text-ink-faint transition-colors hover:text-ink"
      >
        <Icon
          name="arrowLeft"
          size={14}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
        {item.kind === "venture" ? "All ventures" : "All products"}
      </Link>

      <header className="mt-8 border-b border-line pb-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <StatusPill status={item.status} />
          <span aria-hidden className="h-3 w-px bg-line-strong" />
          <span className="meta text-ink-faint">{item.role}</span>
          <span aria-hidden className="h-3 w-px bg-line-strong" />
          <span className="meta text-ink-ghost">{item.period}</span>
        </div>

        <h1 className="mt-5 text-[clamp(2.25rem,6vw,3.75rem)] leading-[0.95] tracking-[-0.04em] ">
          {item.wordmark ?? item.name}
        </h1>

        <p className="mt-4 max-w-2xl text-[clamp(1.125rem,2.4vw,1.5rem)] leading-tight tracking-[-0.02em] text-ink-muted">
          {item.tagline}
        </p>

        <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.65] text-ink-faint">
          {item.summary}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          {item.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.kind === "mail" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={
                link === siteLink
                  ? "inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.875rem] font-medium text-canvas transition-opacity hover:opacity-85"
                  : "inline-flex items-center gap-2 rounded-full border border-line bg-raised px-5 py-2.5 text-[0.875rem] text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
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
      </header>

      <div className="grid gap-12 pt-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div>
          <div className="flex max-w-2xl flex-col gap-5">
            {item.narrative.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-[1rem] leading-[1.7] text-ink-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className="mt-12 text-xl tracking-[-0.025em]">What it does</h2>
          <ul className="mt-5">
            {item.highlights.map((highlight) => (
              <li key={highlight.title} className="border-t border-line py-4 last:border-b">
                <p className="text-[0.9375rem] font-medium">{highlight.title}</p>
                <p className="mt-1.5 max-w-2xl text-[0.875rem] leading-[1.6] text-ink-faint">
                  {highlight.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          {item.facts ? (
            <div>
              <p className="label-mono border-b border-line pb-2.5">At a glance</p>
              <dl className="mt-3">
                {item.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-2.5"
                  >
                    <dt className="meta text-ink-ghost">
                      {fact.label}
                    </dt>
                    <dd className="text-right text-[0.8125rem] text-ink-muted">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          <div>
            <p className="label-mono border-b border-line pb-2.5">Built with</p>
            <ul className="mt-3.5 flex flex-wrap gap-1.5">
              {item.stack.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-mono border-b border-line pb-2.5">Domains</p>
            <ul className="mt-3.5 flex flex-wrap gap-1.5">
              {item.domains.map((domain) => (
                <li key={domain}>
                  <Tag tone="accent">{domain}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <nav
        aria-label="More work"
        className="mt-16 grid border-t border-line sm:grid-cols-2"
      >
        <WorkNavLink item={previous} direction="previous" />
        <WorkNavLink item={next} direction="next" />
      </nav>

      <Link
        href="/#contact"
        className="card group mt-8 flex items-center justify-between gap-5 p-7 transition-transform duration-500 hover:-translate-y-1"
      >
        <span>
          <span className="block text-lg">Working on something like this?</span>
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
      className={`group flex flex-col gap-1.5 py-6 ${isNext ? "sm:items-end sm:border-l sm:border-line sm:pl-8" : "sm:pr-8"}`}
    >
      <span className="label-mono flex items-center gap-1.5">
        {!isNext ? <Icon name="arrowLeft" size={12} /> : null}
        {direction}
        {isNext ? <Icon name="arrowRight" size={12} /> : null}
      </span>
      <span
        className={`text-lg tracking-[-0.02em] transition-colors group-hover:text-accent ${isNext ? "sm:text-right" : ""}`}
      >
        {item.wordmark ?? item.name}
      </span>
      <span className={`text-[0.8125rem] text-ink-faint ${isNext ? "sm:text-right" : ""}`}>
        {item.tagline}
      </span>
    </Link>
  );
}
