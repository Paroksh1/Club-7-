"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";

const MOMENTS = [
  { time: "7:30 PM", label: "Arrive", micro: "Sector 89" },
  { time: "7:45 PM", label: "Game On", micro: "Whole crew in." },
  { time: "9:00 PM", label: "Cafe", micro: "Drinks, down tools." },
  { time: "9:30 PM", label: "Food / Cake / Hang", micro: "Nobody's rushing home." },
];

/**
 * A quiet wide night shot rather than a multi-photo filmstrip — the
 * timeline itself is the storytelling device here; one companion image
 * is enough to set the mood without competing with it.
 */
const IMAGE = {
  src: "/venue/night-aerial.jpg",
  alt: "Club 7's floodlit turf complex at night, Sector 89, Faridabad",
  position: "70% 35%",
};

export default function EventsNightStory() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[1600px] bg-c7-bg-1 px-edge py-16 md:py-20">
      <div className="md:grid md:grid-cols-[1fr_1fr] md:items-center md:gap-16">
        <div
          className="transition-[opacity,transform] duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          <h2 className="-ml-1 font-display uppercase leading-[0.96] text-c7-ink text-[clamp(2rem,3vw,3rem)]">
            One Night. <span className="text-c7-red">Every Beat.</span>
          </h2>

          <div className="mt-8 flex flex-col">
            {MOMENTS.map((m, i) => (
              <div
                key={m.time}
                className="flex items-baseline gap-5 border-t border-c7-line/15 py-4 first:border-t-0"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 500ms ease-out, transform 500ms ease-out",
                  transitionDelay: visible ? `${160 + i * 90}ms` : "0ms",
                }}
              >
                <p className="w-16 shrink-0 font-body text-body-sm tabular-nums text-c7-ink-dim">{m.time}</p>
                <div>
                  <p className="font-display text-lg uppercase leading-none text-c7-ink md:text-xl">{m.label}</p>
                  <p className="mt-1 font-body text-body-sm text-c7-ink-dim">{m.micro}</p>
                </div>
              </div>
            ))}
          </div>

          <p
            className="mt-6 font-body text-body-sm uppercase tracking-[0.1em] text-c7-ink-dim/80"
            style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "520ms" : "0ms", transition: "opacity 500ms ease-out" }}
          >
            Nobody&apos;s checking the clock. <span className="text-c7-red">Still here.</span>
          </p>
        </div>

        <div
          className="relative mt-10 h-[280px] w-full overflow-hidden bg-c7-bg-3 transition-[opacity,transform] duration-700 ease-out md:mt-0 md:h-[400px]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transitionDelay: visible ? "200ms" : "0ms",
          }}
        >
          <Image
            src={IMAGE.src}
            alt={IMAGE.alt}
            fill
            sizes="(min-width: 768px) 46vw, 100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: IMAGE.position, filter: "saturate(0.85) contrast(1.05) brightness(0.92) hue-rotate(3deg)" }}
          />
        </div>
      </div>
    </section>
  );
}
