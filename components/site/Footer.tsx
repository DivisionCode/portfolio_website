import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { profile, socials } from "@/lib/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.9375rem] font-medium">{profile.brand}</p>
          <p className="mt-1 text-[0.8125rem] text-ink-ghost">
            © {year} · {profile.location.region}, {profile.location.country}
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-faint transition-colors hover:text-ink"
              >
                <Icon name={social.icon} size={14} />
                {social.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className="text-[0.8125rem] text-ink-faint transition-colors hover:text-ink"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
