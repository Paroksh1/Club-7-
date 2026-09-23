"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { FILM_GRAIN_URL } from "@/lib/grain";

/**
 * Only one café photograph exists in the project's library — used here
 * as the main shot, with a tighter crop of the same image standing in
 * for the "detail" frame rather than inventing a second photo that
 * doesn't exist. Swap for real food/seating detail photography the
 * moment it's available; the layout doesn't need to change.
 */
const MAIN_IMAGE = { src: "/stock/cafe-porch.jpg", position: "50% 40%" };
const DETAIL_IMAGE = { src: "/stock/cafe-porch.jpg", position: "20% 78%" };

export default function NightSection() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section id="the-cafe" className="relative bg-c7-bg-1">
      <div ref={ref} className="mx-auto w-full max-w-[1600px] px-edge py-16 md:py-20">
        <div
          className="max-w-xl transition-[opacity,transform] duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)" }}
        >
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">03 / The Café</p>
          <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.96] text-c7-ink text-[clamp(2.25rem,3.4vw,3.5rem)]">
            The Post-Match Debrief.
          </h2>
          <p className="mt-3 font-body text-body-lg text-c7-ink-dim">
            There&apos;s a café on-site for the conversations that outlast the game.
          </p>
        </div>

        <div
          className="mt-10 grid grid-cols-[1.5fr_1fr] gap-3 transition-[opacity,transform] duration-700 ease-out md:mt-12 md:gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transitionDelay: visible ? "140ms" : "0ms",
          }}
        >
          <div className="group relative aspect-[4/3] overflow-hidden bg-c7-bg-3 md:aspect-[16/11]">
            <Image
              src={MAIN_IMAGE.src}
              alt="Club 7's on-site café at night"
              fill
              sizes="(min-width: 768px) 40vw, 60vw"
              quality={90}
              className="object-cover transition-transform duration-500 ease-out motion-reduce:transition-none md:group-hover:scale-[1.02]"
              style={{ objectPosition: MAIN_IMAGE.position, filter: "saturate(0.9) contrast(1.04) brightness(0.98) sepia(0.1)" }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
              style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
            />
          </div>
          <div className="group relative aspect-[4/3] overflow-hidden bg-c7-bg-3 md:aspect-[16/11]">
            <Image
              src={DETAIL_IMAGE.src}
              alt="A detail of Club 7's café seating"
              fill
              sizes="(min-width: 768px) 22vw, 35vw"
              quality={90}
              className="object-cover transition-transform duration-500 ease-out motion-reduce:transition-none md:group-hover:scale-[1.02]"
              style={{ objectPosition: DETAIL_IMAGE.position, filter: "saturate(0.9) contrast(1.04) brightness(0.98) sepia(0.1)" }}
            />
          </div>
        </div>

        <p
          className="mt-4 font-body text-body-sm text-c7-ink-dim/80 transition-opacity duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "260ms" : "0ms" }}
        >
          Open seating, on-site, for whenever the game wraps up.
        </p>
      </div>
    </section>
  );
}
