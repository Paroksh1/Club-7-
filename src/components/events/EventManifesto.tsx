"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";

const WORDS = ["Sport.", "Food.", "Lights.", "Your people."];

/**
 * The narrow filmstrip near the bottom — real Club 7 photography (the
 * turf itself, top-down), used here for its graphic quality rather
 * than as a people photo; this section's job is typographic, not
 * photographic, so a quiet architectural strip suits it better than
 * competing for attention with a people shot.
 */
const STRIP_IMAGE = {
  src: "/venue/turf-top-down-night.jpg",
  alt: "Top-down view of Club 7's floodlit turf at night",
  position: "55% 45%",
};

export default function EventManifesto() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);

  return (
    <section className="relative bg-c7-paper">
      <div className="relative h-12 md:h-14" style={{ background: "linear-gradient(180deg, var(--color-c7-bg-1) 0%, var(--color-c7-paper) 100%)" }} aria-hidden="true" />

      <div ref={ref} className="mx-auto w-full max-w-[1600px] px-edge py-14 md:py-16">
        <div className="grid grid-cols-12 gap-x-4 gap-y-8">
          <div
            className="col-span-12 md:col-span-7"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 700ms ease-out, transform 700ms ease-out",
            }}
          >
            <h2 className="-ml-1 font-display uppercase leading-[0.94] text-c7-charcoal text-[clamp(2.75rem,5.2vw,5.5rem)]">
              Not a
              <br />
              Banquet Hall.
            </h2>
          </div>
          <div
            className="col-span-12 self-end md:col-span-4 md:col-start-9 md:text-right"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 700ms ease-out, transform 700ms ease-out",
              transitionDelay: visible ? "140ms" : "0ms",
            }}
          >
            <p className="font-body text-body-lg text-c7-charcoal-dim">Not another dinner either.</p>
          </div>
        </div>

        <div
          className="relative mt-10 h-px w-full origin-left bg-c7-red/50 md:mt-14"
          style={{ transform: visible ? "scaleX(1)" : "scaleX(0)", transition: "transform 800ms cubic-bezier(0.22,1,0.36,1)", transitionDelay: visible ? "220ms" : "0ms" }}
          aria-hidden="true"
        />

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 md:mt-14 md:gap-x-16">
          {WORDS.map((word, i) => (
            <span
              key={word}
              className="font-display uppercase leading-none text-c7-charcoal text-[clamp(1.5rem,2.6vw,2.5rem)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 500ms ease-out, transform 500ms ease-out",
                transitionDelay: visible ? `${320 + i * 90}ms` : "0ms",
              }}
            >
              {word}
            </span>
          ))}
        </div>

        <div
          className={`relative mt-14 h-[16vh] min-h-[110px] max-h-[160px] w-full overflow-hidden bg-c7-charcoal/10 md:mt-16 ${visible ? "c7-anim-uncover-x" : "[clip-path:inset(0_100%_0_0)]"}`}
          style={{ animationDelay: visible ? "560ms" : undefined }}
        >
          <Image
            src={STRIP_IMAGE.src}
            alt={STRIP_IMAGE.alt}
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: STRIP_IMAGE.position, filter: "saturate(0.85) contrast(1.05) brightness(0.95)" }}
          />
        </div>
      </div>

      <div className="relative h-12 md:h-14" style={{ background: "linear-gradient(180deg, var(--color-c7-paper) 0%, var(--color-c7-bg-1) 100%)" }} aria-hidden="true" />
    </section>
  );
}
