import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { allWork } from "@/lib/content/work";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col justify-center py-28">
      <p className="label-mono">Error 404</p>
      <h1 className="mt-5 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] font-medium">
        Nothing here.
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted">
        That page either moved during the rebuild or never existed. The work is
        all still one click away.
      </p>

      <div className="mt-9 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-85"
        >
          <Icon name="arrowLeft" size={15} />
          Back home
        </Link>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-raised px-5 py-2.5 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
        >
          Get in touch
        </Link>
      </div>

      <div className="mt-16">
        <p className="label-mono">Or jump straight to</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {allWork.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/work/${item.slug}/`}
                className="inline-block rounded-full border border-line bg-raised px-4 py-2 font-mono text-[0.75rem] text-ink-faint transition-colors hover:border-line-accent hover:text-accent"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
