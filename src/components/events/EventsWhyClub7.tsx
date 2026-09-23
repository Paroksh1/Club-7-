"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";

/**
 * One quiet, graphic frame rather than a multi-photo strip — the top-
 * down turf shot reads as "the ground itself," calmer and less busy
 * than another people-led action photo, and distinct from every other
 * image used elsewhere on this page.
 */
const IMAGE = {
  src: "/venue/turf-top-down-night.jpg",
  alt: "Top-down view of Club 7's floodlit turf at night",
  position: "55% 45%",
};

export default function EventsWhyClub7() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[1600px] bg-c7-bg-1 px-edge py-16 md:py-20">
      <div className="md:grid md:grid-cols-[1fr_1fr] md:items-center md:gap-16">
        <div
          className="transition-[opacity,transform] duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)" }}
        >
          <h2 className="-ml-1 font-display uppercase leading-[0.98] text-c7-ink text-[clamp(2rem,3vw,3rem)]">
            Not a banquet hall.
            <br />
            <span className="text-c7-red">Not another dinner.</span>
          </h2>
          <p className="mt-4 font-body text-body text-c7-ink-dim">
            Sport, food, lights, your people — in that order.
          </p>
        </div>

        <div
          className="relative mt-8 aspect-[4/3] w-full overflow-hidden bg-c7-bg-3 transition-[opacity,transform] duration-700 ease-out md:mt-0 md:aspect-[5/4]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transitionDelay: visible ? "140ms" : "0ms",
          }}
        >
          <Image
            src={IMAGE.src}
            alt={IMAGE.alt}
            fill
            sizes="(min-width: 768px) 46vw, 100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: IMAGE.position, filter: "saturate(0.82) contrast(1.05) brightness(0.9) hue-rotate(3deg)" }}
          />
        </div>
      </div>
    </section>
  );
}
