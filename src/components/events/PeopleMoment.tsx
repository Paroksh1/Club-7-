"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { FILM_GRAIN_URL } from "@/lib/grain";

/**
 * The most "people together" frame available — real Club 7 photography
 * doesn't include a genuine group moment, so this reuses the same
 * stock warm-up shot as elsewhere on the page, disclosed honestly.
 * This section sells nothing; it's the one place the page pauses.
 */
const IMAGE = {
  src: "/stock/warmup-turf.jpg",
  alt: "A group together on a floodlit pitch at night — representative photo",
  position: "50% 52%",
};

export default function PeopleMoment() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);

  return (
    <section className="relative bg-c7-bg-1 py-16 md:py-24">
      <div ref={ref} className="mx-auto w-full max-w-[1600px] px-edge">
        <div
          className="relative mx-auto aspect-[16/10] w-full max-w-[85vw] overflow-hidden bg-c7-bg-3 md:aspect-[21/9] md:max-w-[80vw]"
          style={{
            transform: visible ? "scale(1)" : "scale(1.025)",
            opacity: visible ? 1 : 0,
            transition: "transform 900ms cubic-bezier(0.22,1,0.36,1), opacity 900ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <Image
            src={IMAGE.src}
            alt={IMAGE.alt}
            fill
            sizes="85vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: IMAGE.position, filter: "saturate(0.85) contrast(1.06) brightness(0.94) hue-rotate(3deg)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-c7-bg-1/55 via-transparent to-transparent" />

          <div
            className="absolute bottom-0 left-0 p-6 md:p-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 700ms ease-out, transform 700ms ease-out",
              transitionDelay: visible ? "300ms" : "0ms",
            }}
          >
            <p className="font-display uppercase leading-[0.96] text-c7-ink text-[clamp(1.75rem,3.4vw,3rem)]">
              Come for the Game.
              <br />
              Stay for the People.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
