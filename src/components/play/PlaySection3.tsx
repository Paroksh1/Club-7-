"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { DIRECTIONS_HREF, WHATSAPP_HREF } from "@/lib/constants";

/**
 * Only facts already established elsewhere on the site. "Open 24
 * Hours" is already live on the homepage Hero, so it stays here for
 * consistency — but like everything else here, it's still flagged
 * for owner confirmation in the implementation report. Nothing about
 * parking, washrooms, drinking water or equipment appears anywhere
 * in the project, so none of it is shown.
 */
const FACTS = [
  { label: "Location", value: "Sector 89, Faridabad" },
  { label: "Hours", value: "Open 24 Hours" },
  { label: "Lighting", value: "Floodlit" },
  { label: "Cafe", value: "On-site" },
  { label: "Turfs", value: "2 Cricket Turfs" },
];

function FactGrid() {
  return (
    <div className="grid grid-cols-1 border-t border-c7-line/15 sm:grid-cols-2">
      {FACTS.map((fact) => (
        <div
          key={fact.label}
          className="flex items-center justify-between border-b border-c7-line/15 py-4 sm:odd:pr-8 sm:even:pl-8"
        >
          <span className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">{fact.label}</span>
          <span className="font-body text-body font-medium text-c7-ink">{fact.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function PlaySection3() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section ref={ref} className="relative bg-c7-bg-1 px-edge pb-24 pt-24 md:pb-28 md:pt-24">
      {/* Header + data — asymmetric split, not two equal columns */}
      <div className="md:grid md:grid-cols-[35%_1fr] md:gap-16">
        <div
          className="transition-[opacity,transform] duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)" }}
        >
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">03 / Good to Know</p>
          <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(3.8rem,6vw,6.5rem)]">
            Before You
            <br />
            Pull Up.
          </h2>
          <p className="mt-5 max-w-sm font-body text-body-lg text-c7-ink/85">
            Everything you actually need before the game.
          </p>
        </div>

        <div
          className="mt-10 transition-[opacity,transform] duration-700 ease-out md:mt-0"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transitionDelay: visible ? "120ms" : "0ms",
          }}
        >
          <FactGrid />

          <div className="mt-10 flex items-baseline justify-between border-t border-c7-line/15 pt-5">
            <p className="font-body text-body-sm uppercase tracking-[0.04em] text-c7-ink-dim">
              Need something before the game?
            </p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:text-c7-red"
            >
              WhatsApp Us
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Photographic strip — small, restrained, real Club 7 media */}
      <div
        className="mt-14 border-t border-c7-line/15 pt-10 transition-opacity duration-700 ease-out md:mt-16"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "220ms" : "0ms" }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.6fr_1fr] md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="relative aspect-[16/9] overflow-hidden bg-c7-bg-3 sm:row-span-2 md:row-span-1">
            <Image
              src="/venue/day-aerial.jpg"
              alt="Club 7's venue from above, Sector 89, Faridabad"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: "50% 45%" }}
            />
          </div>
          <div className="relative hidden aspect-[3/4] overflow-hidden bg-c7-bg-3 sm:block">
            <Image
              src="/venue/entrance-signage.jpg"
              alt="Club 7's entrance signage"
              fill
              sizes="(min-width: 768px) 22vw, 50vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
          </div>
          <div className="relative hidden aspect-[3/4] overflow-hidden bg-c7-bg-3 md:block">
            <Image
              src="/venue/turf-top-down-night.jpg"
              alt="Top-down detail of Club 7's floodlit turf at night"
              fill
              sizes="22vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: "65% 50%" }}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="font-body text-[0.6875rem] tracking-[0.18em] uppercase text-c7-ink-dim/60">
            Club 7 / Faridabad
          </p>
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
        </div>
      </div>
    </section>
  );
}
