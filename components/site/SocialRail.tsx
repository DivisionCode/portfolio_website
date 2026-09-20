import { Icon } from "@/components/ui/Icon";
import { socials } from "@/lib/content/site";

/** Fixed vertical rail — the one piece of chrome carried over from the old site. */
export function SocialRail() {
  return (
    <div className="pointer-events-none fixed bottom-0 left-5 z-30 hidden flex-col items-center gap-5 xl:flex">
      <ul className="pointer-events-auto flex flex-col gap-1">
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${social.label} — ${social.handle}`}
              className="flex size-9 items-center justify-center rounded-full text-ink-ghost transition-all duration-200 hover:-translate-y-0.5 hover:text-accent"
            >
              <Icon name={social.icon} size={16} />
              <span className="sr-only">{social.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <div aria-hidden className="h-24 w-px bg-gradient-to-b from-line-strong to-transparent" />
    </div>
  );
}
