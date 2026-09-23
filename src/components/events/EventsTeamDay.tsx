"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

/**
 * Real Club 7 match footage — multiple players, floodlit pitch, the
 * closest honest stand-in for "a team on the ground." One frame, kept
 * simple, rather than a stacked pair.
 */
const IMAGE = {
  src: "/stock/warmup-turf.jpg",
  alt: "A group warming up together on a floodlit pitch",
  position: "50% 60%",
};

const STEPS = [
  { number: "01", title: "Pick the Game", detail: "Football / Box Cricket / Pickleball" },
  { number: "02", title: "Bring the People", detail: "Your office. Your team. Your crew." },
  { number: "03", title: "Pick the Day", detail: "We'll help you take it from there." },
];

const HREF = whatsappHref(WHATSAPP_MESSAGES.teamDay);

export default function EventsTeamDay() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section id="team-days" ref={ref} className="relative mx-auto w-full max-w-[1600px] scroll-mt-[calc(var(--header-height,90px)+24px)] bg-c7-bg-1 px-edge pb-20 pt-16 md:pb-24 md:pt-20">
      {/* Header + image — editorial split, content leads */}
      <div className="md:grid md:grid-cols-[3fr_2fr] md:items-center md:gap-16">
        <div
          className="transition-[opacity,transform] duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">02 / Team Days</p>
          <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.96] text-c7-ink text-[clamp(2.75rem,4.2vw,4.5rem)]">
            Take It to the Turf.
          </h2>
          <p className="mt-5 max-w-md font-body text-body-lg text-c7-ink/85">
            A better team plan than another table for twelve.
          </p>
          <p className="mt-3 max-w-md font-body text-body text-c7-ink-dim">
            Football, Box Cricket or Pickleball — built around your group.
          </p>
        </div>

        <div
          className="relative mt-10 h-[260px] w-full overflow-hidden bg-c7-bg-3 transition-[opacity,transform] duration-700 ease-out md:mt-0 md:h-[300px] md:max-w-[420px]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transitionDelay: visible ? "140ms" : "0ms",
          }}
        >
          <Image
            src={IMAGE.src}
            alt={IMAGE.alt}
            fill
            sizes="(min-width: 768px) 420px, 100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: IMAGE.position, filter: "saturate(0.85) contrast(1.06) brightness(0.92)" }}
          />
        </div>
      </div>

      {/* How it works — one continuous strip, not cards */}
      <div
        className="mt-16 border-t border-c7-line/15 pt-10 transition-opacity duration-700 ease-out md:mt-20"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "240ms" : "0ms" }}
      >
        <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">How It Works</p>

        <div className="mt-6 flex flex-col md:mt-8 md:flex-row md:divide-x md:divide-c7-line/15">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="border-t border-c7-line/15 py-6 first:border-t-0 md:border-t-0 md:px-10 md:py-0 md:first:pl-0 md:last:pr-0"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 600ms ease-out, transform 600ms ease-out",
                transitionDelay: visible ? `${320 + i * 80}ms` : "0ms",
              }}
            >
              <p className="font-body text-body-sm font-medium uppercase tracking-[0.1em] text-c7-ink">
                <span className="text-c7-red">{step.number}</span> / {step.title}
              </p>
              <p className="mt-2 font-body text-body text-c7-ink-dim">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing statement + CTA — same beat, generous room around it */}
      <div
        className="mt-16 border-t border-c7-line/15 pt-12 transition-opacity duration-700 ease-out md:mt-20 md:pt-14"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "440ms" : "0ms" }}
      >
        <h3 className="font-display uppercase leading-[0.98] text-c7-ink text-[clamp(1.75rem,2.6vw,2.5rem)]">
          No boardroom. No icebreakers.
          <br />
          <span className="text-c7-red">Just play.</span>
        </h3>
        <a
          href={HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
        >
          Plan a Team Day
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
