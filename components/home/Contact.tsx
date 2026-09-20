import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile, socials } from "@/lib/content/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { location } = profile;

  return (
    <section id="contact" className="container-page scroll-mt-24 py-[var(--section-y)]">
      <SectionHeading
        eyebrow="Contact"
        title={
          <>
            Tell me what you&apos;re building and{" "}
            <span className="text-display text-accent-soft">where it&apos;s stuck</span>
          </>
        }
        lead={profile.availability}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        {/* Details */}
        <Reveal className="flex flex-col gap-4">
          <div className="panel p-6 md:p-7">
            <p className="label-mono">Direct</p>
            <ul className="mt-5 flex flex-col gap-4">
              <ContactRow icon="mail" label="Email" value={profile.email} href={`mailto:${profile.email}`} />
              <ContactRow
                icon="phone"
                label="Phone"
                value={profile.phoneDisplay}
                href={`tel:${profile.phone}`}
              />
              <ContactRow
                icon="pin"
                label="Based in"
                value={`${location.city}, ${location.region}`}
                detail={`${location.street} · ${location.country} · ${location.timezone}`}
              />
            </ul>
          </div>

          <div className="panel p-6 md:p-7">
            <p className="label-mono">Elsewhere</p>
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-overlay/60"
                  >
                    <Icon
                      name={social.icon}
                      size={15}
                      className="shrink-0 text-ink-ghost transition-colors group-hover:text-accent"
                    />
                    <span className="text-[0.8125rem] text-ink-muted">{social.label}</span>
                    <span className="ml-auto truncate font-mono text-[0.6875rem] text-ink-ghost">
                      {social.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel flex items-center justify-between gap-4 p-6 md:p-7">
            <div>
              <p className="text-[0.9375rem] font-medium">Curriculum vitae</p>
              <p className="mt-1 text-[0.8125rem] text-ink-faint">
                Full history, PDF.
              </p>
            </div>
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-4 py-2 text-[0.8125rem] text-ink-muted transition-colors hover:border-line-accent hover:text-accent"
            >
              <Icon name="download" size={14} />
              Download
            </a>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  detail,
}: {
  icon: "mail" | "phone" | "pin";
  label: string;
  value: string;
  href?: string;
  detail?: string;
}) {
  const body = (
    <>
      <Icon
        name={icon}
        size={15}
        className="mt-0.5 shrink-0 text-ink-ghost transition-colors group-hover:text-accent"
      />
      <span className="min-w-0">
        <span className="label-mono block">{label}</span>
        <span className="mt-1 block truncate text-[0.9375rem] text-ink">{value}</span>
        {detail ? (
          <span className="mt-1 block text-[0.75rem] leading-relaxed text-ink-ghost">
            {detail}
          </span>
        ) : null}
      </span>
    </>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="group flex items-start gap-3">
          {body}
        </a>
      ) : (
        <div className="group flex items-start gap-3">{body}</div>
      )}
    </li>
  );
}
