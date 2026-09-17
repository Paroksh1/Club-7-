"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { NIGHT_MOMENTS } from "@/lib/night-data";
import FilmFrame from "./FilmFrame";

export default function NightSection() {
  const { ref: introRef, visible: introVisible } = useRevealOnView<HTMLDivElement>();
  const { ref: stripRef, visible: stripVisible } = useRevealOnView<HTMLDivElement>(0.15);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = trackRef.current;
    if (!track || reducedMotion) return;
    if (window.matchMedia("(max-width: 767px)").matches) return; // mobile stacks vertically, no parallax

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top 85%",
            end: "bottom 35%",
            scrub: 0.5,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="after-the-game" className="relative bg-c7-bg-1 overflow-hidden">
      {/* Transition — the last sheet on the notice wall lifting away;
          darkness was always underneath it. Quick, one-shot. */}
      <div className="relative h-10 md:h-12" aria-hidden="true">
        <div
          className="absolute inset-0 bg-c7-paper transition-[transform,opacity] duration-500 ease-in origin-top"
          style={{
            transform: introVisible ? "scaleY(0)" : "scaleY(1)",
            opacity: introVisible ? 0 : 1,
          }}
        />
      </div>

      {/* Intro — generous top clearance: the fixed nav sits on top of
          whatever section is scrolled beneath it, so this needs its own
          protected space, not just enough to clear the transition band. */}
      <div ref={introRef} className="px-edge pt-24 pb-8 md:pt-28 md:pb-9">
        <p
          className="font-body text-tag tracking-[0.24em] uppercase text-c7-red transition-opacity duration-500"
          style={{ opacity: introVisible ? 1 : 0 }}
        >
          04 / After Hours
        </p>
        <h2
          className="mt-3 -ml-1 font-display text-display-2 uppercase leading-[0.9] text-c7-ink transition-[opacity,transform] duration-700"
          style={{
            opacity: introVisible ? 1 : 0,
            transform: introVisible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          Game Over.
        </h2>
        <h2
          className="-mt-1 md:-mt-2 -ml-1 font-display text-display-2 uppercase leading-[0.9] text-c7-red transition-[opacity,transform] duration-700"
          style={{
            opacity: introVisible ? 1 : 0,
            transform: introVisible ? "translateY(0)" : "translateY(14px)",
            transitionDelay: introVisible ? "100ms" : "0ms",
          }}
        >
          Night&apos;s Not.
        </h2>
        <p
          className="mt-4 font-body text-tag tracking-[0.3em] uppercase text-c7-ink-dim transition-opacity duration-700"
          style={{ opacity: introVisible ? 1 : 0, transitionDelay: introVisible ? "220ms" : "0ms" }}
        >
          The Court / The People / One More Game
        </p>
      </div>

      {/* Filmstrip — desktop: one horizontal row, subtle scroll parallax.
          Mobile: vertical sequence, no horizontal scroll. */}
      <div ref={stripRef} className="px-edge">
        <div
          ref={trackRef}
          className="hidden md:flex md:justify-center md:gap-4 lg:gap-6"
        >
          {NIGHT_MOMENTS.map((m, i) => (
            <FilmFrame key={m.time} moment={m} visible={stripVisible} delay={i * 90} orientation="row" />
          ))}
        </div>

        <div className="md:hidden flex flex-col">
          {NIGHT_MOMENTS.map((m, i) => (
            <FilmFrame key={m.time} moment={m} visible={stripVisible} delay={i * 90} orientation="col" />
          ))}
        </div>
      </div>

      {/* Closing beat */}
      <div className="px-edge pb-10 md:pb-12">
        <p className="font-body text-tag tracking-[0.3em] uppercase text-c7-ink-dim">
          Play <span className="text-c7-red">/</span> People <span className="text-c7-red">/</span> After Hours
        </p>
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 bg-c7-red px-6 py-3.5 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink hover:bg-c7-red-dim transition-colors"
          >
            Book the Game <span aria-hidden="true">→</span>
          </button>
          <p className="font-body text-body-sm uppercase tracking-[0.04em] text-c7-ink-dim">
            Stay for the rest.
          </p>
        </div>
      </div>

      <div className="px-edge pb-8 pt-5 flex justify-end border-t border-c7-line/10">
        <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">
          One Last Thing
          <span className="ml-1.5 inline-block c7-anim-cue-bounce" aria-hidden="true">
            ↓
          </span>
        </p>
      </div>
    </section>
  );
}
