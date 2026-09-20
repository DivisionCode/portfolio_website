import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile, socials } from "@/lib/content/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { location } = profile;

  return (
    <section id="contact" className="container-page scroll-mt-20 pt-[var(--section-y)] pb-[calc(var(--section-y)*0.8)]">
      <SectionHeading
        index="08"
        eyebrow="Contact"
        title="Tell me what you're building and where it's stuck."
        lead={profile.availability}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <dl className="text-[0.9375rem]">
            <div className="flex items-baseline justify-between gap-4 border-t border-line py-3.5">
              <dt className="label-mono">Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`} className="transition-colors hover:text-accent">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-line py-3.5">
              <dt className="label-mono">Phone</dt>
              <dd>
                <a href={`tel:${profile.phone}`} className="transition-colors hover:text-accent">
                  {profile.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-line py-3.5">
              <dt className="label-mono">Based in</dt>
              <dd className="text-right">
                {location.city}, {location.region}
                <span className="mt-0.5 block text-[0.75rem] text-ink-ghost">
                  {location.timezone}
                </span>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-y border-line py-3.5">
              <dt className="label-mono">CV</dt>
              <dd>
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                >
                  Download PDF
                  <Icon name="download" size={13} />
                </a>
              </dd>
            </div>
          </dl>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
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
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
