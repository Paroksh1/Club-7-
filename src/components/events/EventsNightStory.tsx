"use client";

import { useRevealOnView } from "@/lib/useRevealOnView";
import { EVENT_NIGHT_MOMENTS } from "@/lib/events-data";
import FilmFrame from "@/components/night/FilmFrame";

export default function EventsNightStory() {
  const { ref: introRef, visible: introVisible } = useRevealOnView<HTMLDivElement>();
  const { ref: stripRef, visible: stripVisible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section className="relative mx-auto w-full max-w-[1600px] bg-c7-bg-1 px-edge pb-16 pt-20 md:pb-20 md:pt-24">
      <div ref={introRef} className="pb-4 md:pb-5">
        <h2
          className="-ml-1 font-display uppercase leading-[0.9] text-c7-ink text-[clamp(2.5rem,4vw,4.25rem)] transition-[opacity,transform] duration-700"
          style={{ opacity: introVisible ? 1 : 0, transform: introVisible ? "translateY(0)" : "translateY(14px)" }}
        >
          One Night. <span className="text-c7-red">Every Beat.</span>
        </h2>
        <p
          className="mt-4 font-body text-tag tracking-[0.3em] uppercase text-c7-ink-dim transition-opacity duration-700"
          style={{ opacity: introVisible ? 1 : 0, transitionDelay: introVisible ? "180ms" : "0ms" }}
        >
          Game <span className="text-c7-red">/</span> Cafe <span className="text-c7-red">/</span> Cake{" "}
          <span className="text-c7-red">/</span> Crew
        </p>
      </div>

      <div ref={stripRef} className="mt-10 md:mt-12">
        <div className="hidden md:flex md:justify-center md:gap-4 lg:gap-6">
          {EVENT_NIGHT_MOMENTS.map((m, i) => (
            <FilmFrame key={m.time} moment={m} visible={stripVisible} delay={i * 90} orientation="row" />
          ))}
        </div>
        <div className="flex flex-col md:hidden">
          {EVENT_NIGHT_MOMENTS.map((m, i) => (
            <FilmFrame key={m.time} moment={m} visible={stripVisible} delay={i * 90} orientation="col" />
          ))}
        </div>
      </div>

      {/* Closing capstone — typographic, not a fifth photo */}
      <div
        className="mt-8 border-t border-c7-line/10 pt-8 md:mt-10 md:pt-10"
        style={{
          opacity: stripVisible ? 1 : 0,
          transform: stripVisible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 700ms ease-out, transform 700ms ease-out",
          transitionDelay: stripVisible ? "460ms" : "0ms",
        }}
      >
        <p className="font-display uppercase leading-[0.95] text-c7-ink text-[clamp(1.75rem,2.6vw,2.75rem)]">
          Nobody&apos;s Checking the Clock.
          <br />
          <span className="text-c7-red">Still Here.</span>
        </p>
        <a
          href="#plan"
          className="mt-6 inline-flex items-center gap-1.5 font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim transition-colors hover:text-c7-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
        >
          Plan Yours
          <span aria-hidden="true" className="c7-anim-cue-bounce inline-block">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
