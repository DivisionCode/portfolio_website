import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/lib/content/work";
import { ProductExplorer } from "./ProductExplorer";

export function Products() {
  return (
    <section id="products" className="container-page scroll-mt-24 py-[var(--section-y)]">
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

      <div data-reveal>
        <ProductExplorer items={products} />
      </div>
    </section>
  );
}
