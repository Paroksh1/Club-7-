"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { entrance } from "@/lib/entrance";
import { FILM_GRAIN_URL } from "@/lib/grain";
import { HERO_MOMENTS, type HeroMomentId } from "@/lib/events-data";

const GRADE = "saturate(0.85) contrast(1.06) brightness(0.92) hue-rotate(3deg)";

/** [arrive, play, stay] widths as percentages. Play is dominant by
 * default (58%); hovering a narrower frame grows it by ~6pts, taken
 * roughly proportionally from the others — the "4-6% width change"
 * the brief asks for, not a redesign of the composition. */
const WIDTHS: Record<"default" | HeroMomentId, [number, number, number]> = {
  default: [21, 58, 21],
  arrive: [27, 52, 21],
  play: [19, 62, 19],
  stay: [21, 52, 27],
};

function HeroLine({ children, delayMs }: { children: ReactNode; delayMs: number }) {
  return (
    <span className="block overflow-hidden">
      <span className={`c7-anim-clip-rise block ${entrance(delayMs)}`}>{children}</span>
    </span>
  );
}

export default function EventsHero() {
  const [hovered, setHovered] = useState<HeroMomentId | null>(null);
  const [mobileActive, setMobileActive] = useState<HeroMomentId>("play");
  const widths = WIDTHS[hovered ?? "default"];

  return (
    <section
      className="relative mx-auto flex w-full max-w-[1600px] flex-col justify-between px-edge pb-10 md:min-h-[88svh] md:pb-12"
      style={{ paddingTop: "calc(var(--header-height, 90px) + 22px)" }}
    >
      {/* Copy zone */}
      <div>
        <p className={`c7-anim-reveal flex items-baseline gap-2 font-body text-tag tracking-[0.24em] uppercase text-c7-red ${entrance(0)}`}>
          <span className="mt-[3px] h-1.5 w-1.5 shrink-0 self-center bg-c7-red c7-anim-pulse-dot" aria-hidden="true" />
          01 / Events <span className="text-c7-ink-dim/50 normal-case tracking-normal">— Sector 89, Faridabad</span>
        </p>
        <h1 className="mt-3 -ml-1 font-display uppercase leading-[0.92] text-c7-ink text-[clamp(3rem,5.5vw,6.5rem)]">
          <HeroLine delayMs={120}>Bring the People.</HeroLine>
          <HeroLine delayMs={230}>
            <span className="text-c7-red">We&apos;ve Got the Ground.</span>
          </HeroLine>
        </h1>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className={`c7-anim-reveal max-w-md font-body text-body-lg text-c7-ink-dim ${entrance(420)}`}>
            Office crew. Birthday crew. Your people.
            <br />
            Come play, eat and stay awhile.
          </p>
          <div className={`c7-anim-reveal flex flex-wrap items-center gap-x-8 gap-y-3 ${entrance(500)}`}>
            <a
              href="#plan"
              className="group inline-flex items-center gap-2 bg-c7-red px-6 py-3.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
            >
              Plan Your Night
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-[2px]">
                ↘
              </span>
            </a>
            <a
              href="#event-posters"
              className="group inline-flex items-center gap-2 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink-dim transition-colors hover:text-c7-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
            >
              Team Days / Birthdays
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                ↘
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Three-moment cinematic frame — desktop */}
      <div className={`c7-anim-reveal mt-10 hidden md:mt-12 md:block ${entrance(560)}`}>
        <div className="h-px w-full origin-left bg-c7-line/25 c7-anim-grow-x" style={{ animationDelay: "480ms" }} aria-hidden="true" />
        <div className="mt-6 flex h-[42vh] min-h-[300px] max-h-[460px] gap-3">
          {HERO_MOMENTS.map((moment, i) => (
            <button
              key={moment.id}
              type="button"
              onMouseEnter={() => setHovered(moment.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(moment.id)}
              onBlur={() => setHovered(null)}
              className="group relative overflow-hidden bg-c7-bg-3 text-left transition-[flex-basis] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red motion-reduce:transition-none"
              style={{ flex: `0 0 ${widths[i]}%` }}
            >
              <div
                className="c7-anim-uncover-y absolute inset-0"
                style={{ animationDelay: `${620 + i * 90}ms` }}
              >
                <Image
                  src={moment.image.src}
                  alt={moment.image.alt}
                  fill
                  sizes="60vw"
                  quality={90}
                  priority={moment.id === "play"}
                  className="object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.015]"
                  style={{ objectPosition: moment.image.position, filter: GRADE }}
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
                  style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-c7-bg-1/70 via-transparent to-transparent" />
              </div>
              <span className="absolute bottom-4 left-4 font-body text-tag tracking-[0.16em] uppercase text-c7-ink">
                <span className="text-c7-red">{moment.number}</span> {moment.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile — one image, a compact switcher */}
      <div className={`c7-anim-reveal mt-8 md:hidden ${entrance(480)}`}>
        <div className="relative h-[46vh] min-h-[280px] overflow-hidden bg-c7-bg-3">
          {HERO_MOMENTS.map((moment) => (
            <div
              key={moment.id}
              className="absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none"
              style={{ opacity: moment.id === mobileActive ? 1 : 0 }}
            >
              <Image
                src={moment.image.src}
                alt={moment.image.alt}
                fill
                sizes="100vw"
                quality={90}
                priority={moment.id === "play"}
                className="object-cover"
                style={{ objectPosition: moment.image.position, filter: GRADE }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-c7-bg-1/70 via-transparent to-transparent" />
            </div>
          ))}
        </div>
        <div className="mt-3 flex border-t border-c7-line/15">
          {HERO_MOMENTS.map((moment, i) => {
            const isActive = moment.id === mobileActive;
            return (
              <button
                key={moment.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setMobileActive(moment.id)}
                className={`flex min-h-11 flex-1 items-center justify-center gap-1.5 py-2.5 font-body text-tag tracking-[0.14em] uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-c7-red ${
                  i > 0 ? "border-l border-c7-line/15" : ""
                } ${isActive ? "text-c7-ink" : "text-c7-ink-dim"}`}
              >
                <span className={isActive ? "text-c7-red" : "text-c7-ink-dim/60"}>{moment.number}</span>
                {moment.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
