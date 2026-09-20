import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { featuredProducts, otherProducts, products } from "@/lib/content/work";
import { ProductShowcase } from "./ProductShowcase";

export function Products() {
  return (
    <section id="products" className="container-page scroll-mt-24 py-[var(--section-y)]">
      <SectionHeading
        eyebrow="Product line"
        title={
          <>
            Eight systems shipped under{" "}
            <span className="text-display text-accent-soft">DCodeIntellect</span>.
          </>
        }
        lead="ERP, CRM, pharmacy, trade, analytics, commerce and the tooling around them — each one built the way it would have to be built if a business were going to run on it for five years."
        aside={`${products.length} products`}
      />

      <Reveal>
        <ProductShowcase items={featuredProducts} />
      </Reveal>

      {/* Everything that doesn't get the big treatment. */}
      <Reveal delay={1}>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/work/${product.slug}/`}
              className="panel group flex flex-col p-6 transition-colors duration-300 hover:border-line-strong"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <Icon
                  name="arrowUpRight"
                  size={15}
                  className="mt-1 shrink-0 text-ink-ghost transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </div>

              <p className="mt-2 text-[0.8125rem] text-accent-soft/80">
                {product.tagline}
              </p>

              <p className="mt-3 flex-1 text-[0.8125rem] leading-relaxed text-ink-faint">
                {product.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {product.stack.slice(0, 4).map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
