import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { navLinks, profile, socials } from "@/lib/content/site";
import { ventures } from "@/lib/content/work";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-[var(--section-y)] border-t border-line">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-mono text-sm">
              <span className="text-accent">#</span>
              <span className="font-medium">{profile.brand}</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-faint">
              {profile.tagline}
            </p>
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[0.8125rem] text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <Icon name="download" size={14} />
              Download CV
            </a>
          </div>

          <FooterColumn title="Navigate">
            {navLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Ventures">
            {ventures.map((venture) => (
              <FooterLink key={venture.slug} href={`/work/${venture.slug}/`}>
                {venture.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Elsewhere">
            {socials.map((social) => (
              <FooterLink key={social.label} href={social.href} external>
                {social.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 text-[0.75rem] text-ink-ghost sm:flex-row sm:items-center sm:justify-between">
          <p>
            {profile.brand} © {year} · {profile.location.region},{" "}
            {profile.location.country}
          </p>
          <p className="font-mono text-[0.6875rem]">
            Next.js 16 · React 19 · TypeScript · Tailwind v4 · statically exported
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="label-mono">{title}</p>
      <ul className="mt-4 flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-1 text-sm text-ink-faint transition-colors hover:text-ink";

  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
          <Icon name="arrowUpRight" size={11} className="opacity-50" />
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} className={className}>
        {children}
      </Link>
    </li>
  );
}
