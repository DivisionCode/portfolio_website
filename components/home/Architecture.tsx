import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { layers } from "@/lib/content/architecture";

/**
 * The platform, top to bottom, on a spine that carries a travelling pulse.
 *
 * The spine is the whole point of the section: it is the request path, and
 * every layer hangs off the same line rather than sitting in its own box.
 */
export function Architecture() {
  return (
    <section
      id="architecture"
      className="relative scroll-mt-24 overflow-clip py-[var(--section-y)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-field absolute inset-0" />
      </div>

      <div className="container-page">
        <SectionHeading
          eyebrow="Architecture"
          title={
            <>
              What a request actually touches{" "}
              <span className="text-ink-faint">on the way down.</span>
            </>
          }
          lead="The Fundrev platform, layer by layer. Technologies only: nothing here names an internal service or anything that is not already public."
          aside={`${layers.length} layers`}
        />

        <SpotlightGroup className="relative">
          {/* The spine, and the pulse travelling down it. */}
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[0.9375rem] w-px bg-gradient-to-b from-transparent via-line-strong to-transparent md:left-[4.75rem]"
          >
            <span className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-ink to-transparent [animation:spine-pulse_6s_linear_infinite]" />
          </div>

          <ol>
            {layers.map((layer) => (
              <li
                key={layer.id}
                data-reveal
                data-spotlight
                className="spotlight group relative rounded-xl py-5 pl-11 transition-colors duration-500 md:pl-28"
              >
                {/* Node on the spine */}
                <span
                  aria-hidden
                  className="absolute top-8 left-[0.9375rem] size-2.5 -translate-x-1/2 rounded-full border border-line-strong bg-canvas transition-colors duration-500 group-hover:border-line-strong md:left-[4.75rem]"
                >
                  <span className="absolute inset-[3px] rounded-full bg-ink-ghost transition-colors duration-500 group-hover:bg-accent" />
                </span>

                {/* Index, parked left of the spine on wide screens */}
                <span className="label-mono absolute top-7 left-0 hidden md:block">
                  {layer.index}
                </span>

                <div className="grid gap-x-10 gap-y-3 lg:grid-cols-[14rem_1fr]">
                  <div>
                    <h3 className="text-[1.0625rem] tracking-[-0.02em] transition-colors duration-300 group-hover:text-accent">
                      {layer.title}
                    </h3>
                    <span className="label-mono mt-2 block md:hidden">{layer.index}</span>
                  </div>

                  <div>
                    <p className="max-w-2xl text-[0.875rem] leading-[1.65] text-ink-faint">
                      {layer.caption}
                    </p>
                    <ul className="mt-3.5 flex flex-wrap gap-1.5">
                      {layer.tech.map((item) => (
                        <li
                          key={item}
                          className="rounded-md border border-line bg-overlay/60 px-2 py-1 meta text-ink-muted transition-colors duration-300 group-hover:border-line-strong"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </SpotlightGroup>
      </div>
    </section>
  );
}
