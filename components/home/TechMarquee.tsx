import Image from "next/image";
import { marqueeTech } from "@/lib/content/stack";

/**
 * Decorative logo band. The same list is rendered twice so the translate can
 * loop seamlessly; the whole thing is hidden from assistive tech because the
 * Stack section below carries the real, readable version.
 */
export function TechMarquee() {
  const lane = [...marqueeTech, ...marqueeTech];

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-line bg-sunken/60 py-7"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <ul className="animate-marquee flex w-max items-center gap-14 pr-14 hover:[animation-play-state:paused]">
        {lane.map((tech, index) => (
          <li
            key={`${tech.name}-${index}`}
            className="flex shrink-0 items-center gap-2.5 opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            {tech.logo ? (
              <Image
                src={tech.logo}
                alt=""
                width={22}
                height={22}
                className="size-[22px] object-contain"
              />
            ) : null}
            <span className="font-mono text-xs whitespace-nowrap text-ink-muted">
              {tech.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
