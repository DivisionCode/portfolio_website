import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { products } from "@/lib/content/work";

export function Products() {
  return (
    <section id="products" className="container-page scroll-mt-24 pt-[var(--section-y)]">
      <SectionHeading
        index="03"
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

      <SpotlightGroup className="card overflow-clip">
        <ul>
          {products.map((product, index) => (
            <li key={product.slug} data-reveal>
              <Link
                href={`/work/${product.slug}/`}
                data-spotlight
                className="spotlight group relative grid gap-y-2 border-t border-line px-5 py-5 first:border-t-0 md:grid-cols-[2.25rem_8.5rem_1fr_19rem_1.25rem] md:items-baseline md:gap-x-6 md:px-7 md:py-5"
              >
                {/* Accent edge that wipes in from the top on hover */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-ink transition-transform duration-400 group-hover:scale-y-100"
                />

                <span className="label-mono hidden md:block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-[1.0625rem] tracking-[-0.02em] transition-colors duration-300 group-hover:text-accent">
                  {product.name}
                </h3>

                <div>
                  <p className="text-[0.9375rem] leading-snug text-ink-muted transition-colors duration-300 group-hover:text-ink">
                    {product.tagline}
                  </p>
                  <p className="mt-1 meta text-ink-ghost md:hidden">
                    {product.stack.join("  ·  ")}
                  </p>
                </div>

                <p className="hidden meta leading-relaxed text-ink-ghost md:block">
                  {product.stack.join("  ·  ")}
                </p>

                <Icon
                  name="arrowUpRight"
                  size={15}
                  className="hidden text-ink-ghost transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block"
                />
              </Link>
            </li>
          ))}
        </ul>
      </SpotlightGroup>
    </section>
  );
}
