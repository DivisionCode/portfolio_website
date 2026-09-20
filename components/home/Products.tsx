import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/lib/content/work";

export function Products() {
  return (
    <section id="products" className="container-page scroll-mt-20 py-[var(--section-y)]">
      <SectionHeading
        eyebrow="Product line"
        title="Eight systems shipped under DCodeIntellect."
        lead="ERP, CRM, pharmacy, trade, analytics, commerce and the tooling around them. Each is built the way it would have to be built if a business were going to run on it for five years."
        aside={`${products.length} products`}
      />

      <ul>
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              href={`/work/${product.slug}/`}
              className="group grid gap-y-2 border-t border-line py-5 last:border-b md:grid-cols-[8rem_1fr_17rem_auto] md:items-baseline md:gap-x-8"
            >
              <h3 className="text-[1.0625rem] tracking-[-0.02em] transition-colors group-hover:text-accent">
                {product.name}
              </h3>

              <div>
                <p className="text-[0.9375rem] leading-snug text-ink">
                  {product.tagline}
                </p>
                <p className="mt-1 text-[0.8125rem] leading-snug text-ink-faint md:hidden">
                  {product.domains.join(" · ")}
                </p>
              </div>

              <p className="font-mono text-[0.6875rem] leading-relaxed text-ink-ghost">
                {product.stack.join(" · ")}
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
    </section>
  );
}
