import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { products } from "@/lib/content/work";

export function Products() {
  return (
    <section id="products" className="container-page scroll-mt-24 py-[var(--section-y)]">
      <SectionHeading
        eyebrow="Product line"
        title={
          <>
            Eight systems shipped under{" "}
            <span className="text-ink-faint">DCodeIntellect.</span>
          </>
        }
        lead="ERP, CRM, pharmacy, trade, analytics, commerce and the tooling around them. Each built the way it would have to be built if a business were going to run on it for five years."
        aside={`${products.length} products`}
      />

      <SpotlightGroup className="overflow-hidden rounded-2xl border border-line">
        <ul>
          {products.map((product, index) => (
            <li key={product.slug} data-reveal>
              <Link
                href={`/work/${product.slug}/`}
                data-spotlight
                className="spotlight group relative grid gap-y-2 border-t border-line px-5 py-5 first:border-t-0 md:grid-cols-[2.5rem_9rem_1fr_16rem_auto] md:items-baseline md:gap-x-6 md:px-7 md:py-6"
              >
                {/* Accent edge that wipes in from the top on hover */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-gradient-to-b from-accent to-accent-cyan transition-transform duration-500 group-hover:scale-y-100"
                />

                <span className="label-mono hidden md:block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-[1.0625rem] tracking-[-0.02em] transition-colors duration-300 group-hover:text-accent-bright">
                  {product.name}
                </h3>

                <div>
                  <p className="text-[0.9375rem] leading-snug text-ink-muted transition-colors duration-300 group-hover:text-ink">
                    {product.tagline}
                  </p>
                  <p className="mt-1 font-mono text-[0.6875rem] text-ink-ghost md:hidden">
                    {product.stack.join("  ·  ")}
                  </p>
                </div>

                <p className="hidden font-mono text-[0.6875rem] leading-relaxed text-ink-ghost md:block">
                  {product.stack.join("  ·  ")}
                </p>

                <Icon
                  name="arrowUpRight"
                  size={15}
                  className="hidden text-ink-ghost transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-bright md:block"
                />
              </Link>
            </li>
          ))}
        </ul>
      </SpotlightGroup>
    </section>
  );
}
