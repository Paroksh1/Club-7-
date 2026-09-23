"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

/**
 * Real Club 7 match footage as the primary — multiple players, floodlit
 * pitch, the closest honest stand-in for "a team on the ground." The
 * secondary frame is real Club 7 venue photography (the turf itself),
 * offset and overlapping the primary for an editorial pair rather than
 * a second equal-weight photo.
 */
const PRIMARY_IMAGE = {
  src: "/stock/warmup-turf.jpg",
  alt: "A group warming up together on a floodlit pitch",
  position: "50% 60%",
};

const SECONDARY_IMAGE = {
  src: "/venue/turf-top-down-night.jpg",
  alt: "Top-down view of Club 7's floodlit turf at night",
  position: "60% 45%",
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
    <section id="team-days" ref={ref} className="relative mx-auto w-full max-w-[1600px] scroll-mt-[calc(var(--header-height,90px)+24px)] bg-c7-bg-1 px-edge pb-24 pt-20 md:pb-28 md:pt-24">
      <div className="border-t border-c7-line/15" />

      {/* Header + image pair — editorial split, content leads */}
      <div className="mt-14 md:mt-16 md:grid md:grid-cols-[3fr_2fr] md:items-center md:gap-16">
        <div
          className="transition-[opacity,transform] duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">02 / Team Days</p>
          <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(4rem,6vw,7rem)]">
            Take It
            <br />
            To the Turf.
          </h2>
          <p className="mt-5 max-w-md font-body text-body-lg text-c7-ink/85">
            A better team plan than another table for twelve.
          </p>
          <p className="mt-3 max-w-md font-body text-body text-c7-ink-dim">
            Football, Box Cricket or Pickleball — built around your group.
          </p>
        </div>

        <div
          className="relative mt-12 transition-[opacity,transform] duration-700 ease-out md:mt-0"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: visible ? "150ms" : "0ms",
          }}
        >
          <div className="relative ml-auto h-[280px] w-full overflow-hidden bg-c7-bg-3 md:h-[320px] md:max-w-[420px]">
            <Image
              src={PRIMARY_IMAGE.src}
              alt={PRIMARY_IMAGE.alt}
              fill
              sizes="(min-width: 768px) 420px, 100vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: PRIMARY_IMAGE.position, filter: "saturate(0.85) contrast(1.06) brightness(0.92)" }}
            />
          </div>
          {/* Secondary — offset, overlapping the primary's bottom-left corner */}
          <div className="absolute -bottom-8 left-0 h-[130px] w-[42%] overflow-hidden border-4 border-c7-bg-1 bg-c7-bg-3 shadow-[0_14px_28px_-12px_rgba(0,0,0,0.6)] md:-bottom-10 md:h-[150px]">
            <Image
              src={SECONDARY_IMAGE.src}
              alt={SECONDARY_IMAGE.alt}
              fill
              sizes="200px"
              quality={90}
              className="object-cover"
              style={{ objectPosition: SECONDARY_IMAGE.position, filter: "saturate(0.8) contrast(1.08) brightness(0.9)" }}
            />
          </div>
        </div>
      </div>

      {/* How it works — one continuous strip, not cards */}
      <div
        className="mt-24 border-t border-c7-line/15 pt-10 transition-opacity duration-700 ease-out md:mt-28"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "260ms" : "0ms" }}
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
                transitionDelay: visible ? `${340 + i * 80}ms` : "0ms",
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

      {/* Closing statement — deliberate negative space, no CTA crowding it */}
      <div
        className="mt-24 border-t border-c7-line/15 pt-16 pb-4 text-center transition-opacity duration-700 ease-out md:mt-28 md:pt-20 md:pb-8"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "480ms" : "0ms" }}
      >
        <h3 className="mx-auto font-display uppercase leading-[0.98] text-c7-ink text-[clamp(2rem,3.4vw,3.25rem)]">
          No Boardroom. No Icebreakers.
          <br />
          <span className="text-c7-red">Just Play.</span>
        </h3>
      </div>

      {/* CTA */}
      <div
        className="mt-16 flex flex-col items-center gap-2 text-center transition-opacity duration-700 ease-out md:mt-20"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "560ms" : "0ms" }}
      >
        <a
          href={HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
        >
          Plan a Team Day
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
            ↗
          </span>
        </a>
        <p className="font-body text-body-sm text-c7-ink-dim">Have a date in mind? Tell us what you&apos;re planning.</p>
      </div>
    </section>
  );
}
