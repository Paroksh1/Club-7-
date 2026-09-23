"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { DIRECTIONS_HREF, WHATSAPP_HREF } from "@/lib/constants";
import { FILM_GRAIN_URL } from "@/lib/grain";

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
      {FACTS.map((fact, i) => {
        const isLast = i === FACTS.length - 1;
        return (
          <div
            key={fact.label}
            className={`flex items-center justify-between border-b border-c7-line/15 py-4.5 sm:odd:pr-8 sm:even:pl-8 ${
              isLast ? "sm:col-span-2 sm:pl-0" : ""
            }`}
          >
            <span className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">{fact.label}</span>
            <span className="font-body text-body font-medium text-c7-ink">{fact.value}</span>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Three real photographs, three different source conditions (a bright
 * daylight drone shot, a night entrance, a floodlit night turf) —
 * unified with one editorial night-register grade so they read as
 * one curated set rather than three different photoshoots. The
 * daylight aerial gets the strongest correction (cooled, desaturated
 * off its warm yellow field) since it's furthest from the site's
 * register; the two night shots only need a light touch.
 */
const GALLERY_IMAGES = [
  {
    key: "aerial",
    src: "/venue/day-aerial.jpg",
    alt: "Club 7's venue from above, Sector 89, Faridabad",
    position: "50% 45%",
    aspect: "aspect-[16/9]",
    grade: "saturate(0.72) contrast(1.08) brightness(0.9) hue-rotate(8deg) sepia(0.05)",
  },
  {
    key: "entrance",
    src: "/venue/entrance-signage.jpg",
    alt: "Club 7's entrance signage",
    position: "50% 30%",
    aspect: "aspect-[3/4]",
    grade: "saturate(0.9) contrast(1.05) brightness(0.96) hue-rotate(2deg)",
  },
  {
    key: "turf",
    src: "/venue/turf-top-down-night.jpg",
    alt: "Top-down detail of Club 7's floodlit turf at night",
    position: "65% 50%",
    aspect: "aspect-[4/3]",
    grade: "saturate(0.82) contrast(1.08) brightness(0.94) hue-rotate(4deg)",
  },
];

function GalleryStrip({ visible }: { visible: boolean }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-4">
      {GALLERY_IMAGES.map((img, i) => (
        <div
          key={img.key}
          className={`group relative w-full overflow-hidden bg-c7-bg-3 transition-[opacity,transform] duration-700 ease-out ${img.aspect} md:h-[300px] md:w-auto md:flex-none lg:h-[340px]`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transitionDelay: visible ? `${240 + i * 90}ms` : "0ms",
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={img.key === "aerial" ? "(min-width: 768px) 46vw, 100vw" : "(min-width: 768px) 24vw, 100vw"}
            quality={90}
            className="object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.015]"
            style={{ objectPosition: img.position, filter: img.grade }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
            style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-white opacity-0 mix-blend-overlay transition-opacity duration-500 ease-out motion-reduce:transition-none group-hover:opacity-[0.05]" />
        </div>
      ))}
    </div>
  );
}

export default function PlaySection3() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section ref={ref} className="relative bg-c7-bg-1 px-edge pb-24 pt-24 md:pb-28 md:pt-24">
      {/* Header + data — asymmetric split, not two equal columns.
          Both sides share the same top edge and a tighter gap than
          before, so the facts read as directly attached to the
          headline rather than a separate block floating beside it. */}
      <div className="md:grid md:grid-cols-[36%_1fr] md:items-start md:gap-12">
        <div
          className="transition-[opacity,transform] duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)" }}
        >
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">03 / Good to Know</p>
          <h2 className="-ml-1 mt-2 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(3rem,4.5vw,5rem)]">
            Before You
            <br />
            Pull Up.
          </h2>
          <p className="mt-4 max-w-xs font-body text-body text-c7-ink-dim">
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

          <div className="mt-8 flex items-baseline justify-between border-t border-c7-line/15 pt-5">
            <p className="font-body text-body-sm uppercase tracking-[0.04em] text-c7-ink-dim">
              Need something before the game?
            </p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red"
            >
              WhatsApp Us
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Photographic strip — one curated set, not three unrelated
          photos: a shared height on desktop (each image's own aspect
          ratio determines its width) gives them a common bottom
          baseline, like a magazine spread rather than a stretched
          grid. */}
      <div className="mt-14 border-t border-c7-line/15 pt-10 md:mt-16">
        <GalleryStrip visible={visible} />

        <div
          className="mt-6 flex items-center justify-between transition-opacity duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "560ms" : "0ms" }}
        >
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
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
