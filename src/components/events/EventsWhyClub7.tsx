"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { FILM_GRAIN_URL } from "@/lib/grain";

/**
 * Three different registers of the same claim — a wide establishing
 * shot, a moody action beat, an arrival moment — so the strip reads as
 * "this venue is alive" rather than a single illustrative photo. Real
 * Club 7 venue photography paired with the two strongest people-led
 * stock frames already used elsewhere on the site.
 */
const STRIP = [
  {
    key: "warmup",
    src: "/stock/warmup-turf.jpg",
    alt: "Players warming up together under a single floodlight at Club 7",
    position: "50% 55%",
    aspect: "aspect-[3/4]",
    grade: "saturate(0.8) contrast(1.12) brightness(0.85) hue-rotate(5deg)",
  },
  {
    key: "aerial",
    src: "/venue/night-aerial.jpg",
    alt: "Club 7's floodlit turf complex at night, Sector 89, Faridabad",
    position: "60% 35%",
    aspect: "aspect-[16/9]",
    grade: "saturate(0.85) contrast(1.06) brightness(0.92) hue-rotate(3deg)",
  },
  {
    key: "entrance",
    src: "/venue/entrance-signage.jpg",
    alt: "Club 7's entrance at night",
    position: "50% 28%",
    aspect: "aspect-[3/4]",
    grade: "saturate(0.88) contrast(1.05) brightness(0.95) hue-rotate(2deg)",
  },
];

export default function EventsWhyClub7() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[1600px] bg-c7-bg-1 px-edge pb-20 pt-16 md:pb-24 md:pt-20">
      <div
        className="max-w-2xl transition-[opacity,transform] duration-700 ease-out"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)" }}
      >
        <h2 className="-ml-1 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.5rem,4vw,4.25rem)]">
          Not a Banquet Hall.
          <br />
          <span className="text-c7-red">Not Another Dinner.</span>
        </h2>
        <p className="mt-4 font-body text-tag tracking-[0.28em] uppercase text-c7-ink-dim">
          Sport <span className="text-c7-red">/</span> Food <span className="text-c7-red">/</span> Lights{" "}
          <span className="text-c7-red">/</span> Your People
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3 md:mt-14 md:flex-row md:items-end md:gap-4">
        {STRIP.map((img, i) => (
          <div
            key={img.key}
            className={`group relative w-full overflow-hidden bg-c7-bg-3 transition-[opacity,transform] duration-700 ease-out ${img.aspect} md:h-[280px] md:w-auto md:flex-none lg:h-[320px]`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: visible ? `${140 + i * 100}ms` : "0ms",
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
          </div>
        ))}
      </div>
    </section>
  );
}
