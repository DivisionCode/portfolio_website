import Image from "next/image";

/**
 * The venture's own site behind the top of its case study: recognisable, not
 * just a colour wash.
 *
 * The first attempt blurred it to 56px, which left atmosphere but destroyed
 * the picture. This keeps the blur low enough to read as a website and solves
 * the contrast problem by composition instead: the shot is masked so it is
 * strongest at the top right and dissolves toward the bottom left, which is
 * exactly where the masthead type sits. The text never crosses the detailed
 * part of the image.
 *
 * Captured by scripts/capture.mjs and committed, so the build never depends on
 * those sites being up.
 */
export function SiteBackdrop({ src, priority }: { src: string; priority?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-clip">
      {/*
        Masked diagonally: present at the top right, gone by the bottom left.
        The two masks multiply, so the fade is smooth in both directions.
      */}
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 45%, transparent 96%), linear-gradient(to left, #000 0%, #000 42%, transparent 92%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="scale-[1.03] object-cover object-top opacity-95 blur-[5px]"
        />
      </div>

      {/* Just enough veil to keep the type off the picture's contrast. */}
      <div className="absolute inset-0 bg-gradient-to-br from-canvas via-canvas/60 to-canvas/5" />

      {/* Dissolve into the page. */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-canvas" />

      {/* A last hairline of structure over the top. */}
      <div className="grid-field absolute inset-0 opacity-60" />
    </div>
  );
}
