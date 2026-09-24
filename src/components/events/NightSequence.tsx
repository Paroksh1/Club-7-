"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NIGHT_STATES } from "@/lib/events-data";
import { FILM_GRAIN_URL } from "@/lib/grain";
import { useRevealOnView } from "@/lib/useRevealOnView";

const GRADE = "saturate(0.85) contrast(1.06) brightness(0.93) hue-rotate(3deg)";
/** Per-state opacity for the field-line motif behind the time — sport
 * fading into social, not a continuous scroll-driven value. Matches
 * the brief's explicit per-state description rather than interpolating. */
const MOTIF_OPACITY = [0.035, 0.13, 0.05, 0];

function FieldLineMotif({ opacity }: { opacity: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 220"
      className="pointer-events-none absolute -inset-x-6 -inset-y-10 h-[calc(100%+80px)] w-[calc(100%+48px)] text-c7-ink transition-opacity duration-[900ms] ease-out"
      style={{ opacity }}
    >
      <rect x="15" y="15" width="270" height="190" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="150" cy="110" r="42" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="150" y1="15" x2="150" y2="205" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** True only on a fine-pointer, non-reduced-motion desktop — decided
 * client-side after mount so SSR and the initial paint always render
 * the simple stacked version (see NightSequenceStacked). If this never
 * flips true (JS disabled, matchMedia unsupported), the stacked
 * version is what ships, which is a complete, readable page on its
 * own — not a degraded fallback bolted on. */
function useStickyEligible() {
  const [eligible, setEligible] = useState(false);
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEligible(!mobile.matches && !reduced.matches);
    update();
    mobile.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);
  return eligible;
}

function StateFrame({ index }: { index: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-c7-bg-3">
      {NIGHT_STATES.map((state, i) => (
        <div
          key={state.id}
          className="absolute inset-0 transition-opacity duration-500 ease-out"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <Image
            src={state.image.src}
            alt={state.image.alt}
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: state.image.position, filter: GRADE }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
            style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
          />
        </div>
      ))}
    </div>
  );
}

function SectionIntro() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-edge pb-8 pt-16 md:pb-10 md:pt-20">
      <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">A Night at Club 7</p>
      <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.75rem,4.5vw,5rem)]">
        One Night. Every Beat.
      </h2>
      <p className="mt-3 max-w-md font-body text-body text-c7-ink-dim">
        No fixed script. Just one way the evening could go.
      </p>
    </div>
  );
}

/** Desktop sticky-scroll experience. */
function NightSequenceSticky() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const raw = self.progress * NIGHT_STATES.length;
          setActiveIndex(Math.min(NIGHT_STATES.length - 1, Math.floor(raw)));
          setProgress(self.progress);
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const active = NIGHT_STATES[activeIndex];
  const bg =
    active.tone === "warm"
      ? "color-mix(in srgb, var(--color-c7-bg-1) 88%, var(--color-c7-amber-dim) 12%)"
      : "var(--color-c7-bg-1)";

  return (
    <section ref={sectionRef} className="relative" style={{ height: "280vh" }}>
      <div
        className="sticky top-0 flex h-[100svh] flex-col overflow-hidden transition-[background-color] duration-[900ms] ease-out"
        style={{ backgroundColor: bg }}
      >
        <SectionIntro />

        <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 items-center gap-10 px-edge pb-10">
          {/* Left — the changing time */}
          <div className="relative hidden w-[18%] shrink-0 lg:block">
            <FieldLineMotif opacity={MOTIF_OPACITY[activeIndex]} />
            <p key={active.id} className="c7-anim-clip-rise relative font-display uppercase leading-none text-c7-ink text-[clamp(2rem,3vw,3.25rem)] [animation-duration:500ms]">
              {active.time}
            </p>
          </div>

          {/* Center — the photograph, one stable frame */}
          <div className="relative h-[56vh] max-h-[520px] flex-1 md:h-[58vh]">
            <StateFrame index={activeIndex} />
          </div>

          {/* Right — current moment */}
          <div className="hidden w-[26%] shrink-0 lg:block">
            <p className="font-body text-tag tracking-[0.2em] uppercase text-c7-red">
              0{activeIndex + 1} / {active.label}
            </p>
            <div key={active.id} className="mt-3 overflow-hidden">
              <div className="c7-anim-clip-rise flex flex-col gap-1.5 [animation-duration:550ms]">
                {active.lines.map((line) => (
                  <p key={line} className="font-body text-body-lg text-c7-ink/90">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/tablet label + description beneath the frame, since
            the left/right columns hide below lg */}
        <div className="mx-auto w-full max-w-[1600px] px-edge pb-8 lg:hidden">
          <p className="font-body text-tag tracking-[0.2em] uppercase text-c7-red">
            {active.time} <span className="text-c7-ink-dim/50">/</span> {active.label}
          </p>
          <p key={active.id} className="mt-1.5 c7-anim-clip-rise font-body text-body text-c7-ink/90 [animation-duration:500ms]">
            {active.lines.join(" ")}
          </p>
        </div>

        {/* Progress track */}
        <div className="mx-auto w-full max-w-[1600px] px-edge pb-6">
          <div className="h-px w-full bg-c7-line/15">
            <div
              className="h-full bg-c7-red transition-[width] duration-100 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function NightMoment({ state, index }: { state: (typeof NIGHT_STATES)[number]; index: number }) {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className="border-t border-c7-line/15 py-10 first:border-t-0 md:py-12">
      <div
        className="flex items-baseline gap-3"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition: "opacity 500ms ease-out, transform 500ms ease-out" }}
      >
        <span className="font-display uppercase leading-none text-c7-ink text-[clamp(1.5rem,4vw,2rem)]">{state.time}</span>
        <span className="font-body text-tag tracking-[0.2em] uppercase text-c7-red">0{index + 1} / {state.label}</span>
      </div>
      <div
        className="relative mt-4 h-[46vh] min-h-[260px] w-full overflow-hidden bg-c7-bg-3"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 600ms ease-out, transform 600ms ease-out",
          transitionDelay: visible ? "100ms" : "0ms",
        }}
      >
        <Image
          src={state.image.src}
          alt={state.image.alt}
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
          style={{ objectPosition: state.image.position, filter: GRADE }}
        />
      </div>
      <p
        className="mt-4 max-w-md font-body text-body-lg text-c7-ink/90"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition: "opacity 500ms ease-out, transform 500ms ease-out", transitionDelay: visible ? "200ms" : "0ms" }}
      >
        {state.lines.join(" ")}
      </p>
    </div>
  );
}

/** Mobile / reduced-motion / no-JS fallback — four editorial moments
 * stacked vertically, no scroll hijacking, no sticky pinning. This is
 * also what SSR renders and what every visitor sees for the first
 * paint, upgraded to the sticky version only once matchMedia confirms
 * a fine-pointer desktop with motion allowed. */
function NightSequenceStacked() {
  return (
    <section className="relative bg-c7-bg-1">
      <SectionIntro />
      <div className="mx-auto w-full max-w-[1600px] px-edge pb-16 md:pb-20">
        {NIGHT_STATES.map((state, i) => (
          <NightMoment key={state.id} state={state} index={i} />
        ))}
      </div>
    </section>
  );
}

export default function NightSequence() {
  const stickyEligible = useStickyEligible();
  return stickyEligible ? <NightSequenceSticky /> : <NightSequenceStacked />;
}
