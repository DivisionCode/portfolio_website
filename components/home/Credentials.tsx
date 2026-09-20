import { Icon } from "@/components/ui/Icon";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { credentialsByYear } from "@/lib/content/credentials";

/**
 * A register, grouped by year rather than sat behind tabs.
 *
 * Tabs made sense for three categories and ten rows. With education gone there
 * are six certifications across two categories, and hiding four of them to
 * show two was costing more than it saved. The year does the organising
 * instead, which is the axis that actually means something on a credential
 * list, and it drops a client component from the page.
 *
 * Verification is the point of the section, so it is the one thing set as an
 * affordance rather than as text.
 */
export function Credentials() {
  return (
    <SpotlightGroup>
      {credentialsByYear.map(({ year, items }) => (
        <div
          key={year}
          data-reveal
          className="grid border-t border-line py-6 md:grid-cols-[4.5rem_1fr] md:gap-x-8"
        >
          <p className="label-mono pt-1 pb-4 md:pb-0">{year}</p>

          <ul>
            {items.map((item) => (
              <li
                key={item.title}
                data-spotlight
                className="spotlight group relative -mx-4 grid gap-x-8 gap-y-2 rounded-[var(--radius-md)] px-4 py-3.5 md:grid-cols-[1fr_auto] md:items-baseline"
              >
                <div>
                  <h3 className="text-[1.0625rem] leading-snug transition-colors duration-300 group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[0.875rem] text-ink-faint">{item.issuer}</span>
                    <span className="meta">
                      {item.category} · {item.scope} · {item.validity}
                    </span>
                  </p>
                </div>

                {item.verify ? (
                  <a
                    href={item.verify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 justify-self-start rounded-full border border-line px-3.5 py-1.5 text-[0.8125rem] text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-ink md:justify-self-end"
                  >
                    Verify
                    <Icon name="arrowUpRight" size={12} />
                  </a>
                ) : (
                  <span className="meta shrink-0 justify-self-start md:justify-self-end">
                    {item.verifyLabel}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </SpotlightGroup>
  );
}
