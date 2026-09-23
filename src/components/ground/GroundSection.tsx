"use client";

import { useRevealOnView } from "@/lib/useRevealOnView";
import VenueExplorer from "./VenueExplorer";

export default function GroundSection() {
  const { ref: headerRef, visible } = useRevealOnView<HTMLDivElement>();

  return (
    <section id="the-ground" className="relative bg-c7-bg-1 pb-14 md:pb-20">
      <div
        ref={headerRef}
        className="mx-auto w-full max-w-[1600px] px-edge pt-16 pb-8 md:pt-20 md:pb-10"
      >
        <p
          className="font-body text-tag tracking-[0.2em] uppercase text-c7-red transition-opacity duration-500"
          style={{ opacity: visible ? 1 : 0 }}
        >
          02 / The Ground
        </p>
        <h2
          className="mt-3 -ml-1 max-w-2xl font-display uppercase leading-[0.98] text-c7-ink transition-[opacity,transform] duration-700 text-[clamp(2.5rem,2.6vw+1.8rem,4.5rem)] [text-wrap:balance]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          Get to Know the Ground.
        </h2>
        <p
          className="mt-3 font-body text-body-lg text-c7-ink-dim transition-opacity duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "150ms" : "0ms" }}
        >
          Take a look around Club 7.
        </p>
      </div>

      <VenueExplorer />

      <div className="mx-auto w-full max-w-[1600px] px-edge pt-8 md:pt-10">
        <a
          href="/play"
          className="group inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
        >
          Explore Sports & Booking
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
            ↗
          </span>
        </a>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-edge py-6 md:py-4 flex justify-end border-t border-c7-line/10 mt-10 md:mt-14">
        <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink">
          Off the Pitch
          <span className="ml-1.5 inline-block c7-anim-cue-bounce" aria-hidden="true">
            ↓
          </span>
        </p>
      </div>
    </section>
  );
}
