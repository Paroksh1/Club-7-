"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { DIRECTIONS_HREF, WHATSAPP_HREF } from "@/lib/constants";

export default function PlayFinalSection() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);

  return (
    <section ref={ref} className="relative bg-c7-bg-1 px-edge pb-24 pt-28 md:pb-28 md:pt-32">
      <div className="border-t border-c7-line/15" />

      {/* Header — asymmetric: headline left, action stack right */}
      <div className="mt-16 md:mt-20 md:grid md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16">
        <div
          className="transition-[opacity,transform] duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">04 / Your Move</p>
          <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.92] text-c7-ink text-[clamp(4.5rem,7vw,8rem)]">
            See You
            <br />
            Under the Lights.
          </h2>
        </div>

        <div
          className="mt-8 transition-[opacity,transform] duration-700 ease-out md:mt-0"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: visible ? "150ms" : "0ms",
          }}
        >
          <p className="font-body text-body-lg text-c7-ink/85">
            Pick the game.
            <br />
            Bring the crew.
          </p>

          <div className="mt-7 flex flex-col items-start gap-4">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-c7-red px-7 py-4 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim"
            >
              Book a Slot <span aria-hidden="true">↗</span>
            </a>
            <a
              href={DIRECTIONS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red"
            >
              Get Directions
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                ↗
              </span>
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-body-sm uppercase tracking-[0.06em] text-c7-ink-dim transition-colors hover:text-c7-ink"
            >
              Ask Club 7 →
            </a>
          </div>
        </div>
      </div>

      {/* Image — one real night shot, restrained, bled toward the right */}
      <div
        className="mt-14 transition-[opacity,transform] duration-700 ease-out md:mt-16"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.985)",
          transitionDelay: visible ? "260ms" : "0ms",
        }}
      >
        <div className="relative ml-auto aspect-[21/9] w-full overflow-hidden bg-c7-bg-3 md:aspect-auto md:h-[280px] md:w-[70%]">
          <Image
            src="/venue/night-aerial.jpg"
            alt="Club 7's floodlit turf complex at night, Sector 89, Faridabad"
            fill
            sizes="(min-width: 768px) 70vw, 100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
          />
        </div>

        <div className="ml-auto mt-4 flex max-w-full flex-wrap items-center justify-between gap-x-6 gap-y-1 md:w-[70%]">
          <p className="font-body text-[0.6875rem] tracking-[0.18em] uppercase text-c7-ink-dim/60">
            Club 7 / Sector 89, Faridabad
          </p>
          <p className="font-body text-[0.6875rem] tracking-[0.18em] uppercase text-c7-ink-dim/60">
            Cricket / Football / Pickleball
          </p>
        </div>
      </div>
    </section>
  );
}
