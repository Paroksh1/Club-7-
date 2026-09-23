"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_HREF, WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";
import PaperGrain from "@/components/wall/PaperGrain";

/**
 * The only genuine social/friends photo in the library, as the main
 * image — warm, real, unposed. The football action shot returns here
 * at small scale as a deliberate callback to "Play First," pairing
 * visually with "Cake Later" on the cafe photo beside it, rather than
 * introducing a fourth unrelated image.
 */
const MAIN_IMAGE = {
  src: "/stock/cafe-porch.jpg",
  alt: "Friends gathered together at night at Club 7",
  position: "50% 38%",
};

const CALLBACK_IMAGE = {
  src: "/stock/last-goal-night.jpg",
  alt: "Players mid-match on a floodlit pitch",
  position: "45% 60%",
};

const STEPS = [
  { number: "01", title: "Pick the Game", detail: "Football / Box Cricket / Pickleball" },
  { number: "02", title: "Bring Your People", detail: "Friends, family, your whole crew." },
  { number: "03", title: "Make It Yours", detail: "We'll help you plan the venue side." },
];

const BIRTHDAY_HREF = whatsappHref(WHATSAPP_MESSAGES.birthday);

export default function EventsBirthday() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section id="birthdays" className="relative scroll-mt-[calc(var(--header-height,90px)+24px)] bg-c7-paper">
      {/* Transition — turf to paper, same device as the homepage's own
          chapter break */}
      <div
        className="relative h-14 md:h-16"
        style={{ background: "linear-gradient(180deg, var(--color-c7-bg-1) 0%, var(--color-c7-paper) 100%)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative mx-auto w-full max-w-[1600px] px-edge pb-24 pt-4 md:pb-28 md:pt-6">
        <PaperGrain />
        {/* Header — looser than Team Days: text sits alone, images form
            their own asymmetric pair below rather than sharing a strict
            split row */}
        <div
          className="max-w-xl transition-[opacity,transform] duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">03 / Celebrate</p>
          <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-charcoal text-[clamp(4rem,6vw,7rem)]">
            Your Birthday.
            <br />
            Your Rules.
          </h2>
          <p className="mt-5 font-body text-body-lg text-c7-charcoal/85">
            Play first.
            <br />
            Cake later.
          </p>
        </div>

        {/* Image pair — controlled, slightly playful overlap */}
        <div
          className="relative mt-16 h-[300px] md:mt-20 md:h-[380px]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 700ms ease-out, transform 700ms ease-out",
            transitionDelay: visible ? "150ms" : "0ms",
          }}
        >
          <div className="absolute left-0 top-0 h-full w-[62%] overflow-hidden shadow-[0_18px_36px_-16px_rgba(0,0,0,0.25)] md:w-[52%] md:-rotate-1">
            <Image
              src={MAIN_IMAGE.src}
              alt={MAIN_IMAGE.alt}
              fill
              sizes="(min-width: 768px) 52vw, 62vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: MAIN_IMAGE.position, filter: "saturate(0.92) contrast(1.02) brightness(1.01) sepia(0.08)" }}
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[64%] w-[42%] overflow-hidden border-4 border-c7-paper shadow-[0_14px_28px_-14px_rgba(0,0,0,0.3)] md:h-[70%] md:w-[36%] md:rotate-2">
            <Image
              src={CALLBACK_IMAGE.src}
              alt={CALLBACK_IMAGE.alt}
              fill
              sizes="(min-width: 768px) 36vw, 42vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: CALLBACK_IMAGE.position, filter: "saturate(0.55) contrast(1.05) brightness(0.9) sepia(0.15)" }}
            />
          </div>
        </div>

        {/* Steps — looser: generous wrap, no full-width divider rows */}
        <div
          className="mt-20 border-t border-c7-charcoal/12 pt-10 transition-opacity duration-700 ease-out md:mt-24"
          style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "300ms" : "0ms" }}
        >
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-charcoal-dim">Make a Night of It.</p>
          <div className="mt-7 flex flex-wrap gap-x-16 gap-y-8 md:mt-9">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="max-w-[16rem]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 600ms ease-out, transform 600ms ease-out",
                  transitionDelay: visible ? `${380 + i * 80}ms` : "0ms",
                }}
              >
                <p className="font-body text-body-sm font-medium uppercase tracking-[0.1em] text-c7-charcoal">
                  <span className="text-c7-red">{step.number}</span> / {step.title}
                </p>
                <p className="mt-2 font-body text-body text-c7-charcoal-dim">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-16 flex flex-col items-start gap-4 border-t border-c7-charcoal/12 pt-10 transition-opacity duration-700 ease-out md:mt-20"
          style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "520ms" : "0ms" }}
        >
          <a
            href={BIRTHDAY_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border-b border-c7-charcoal/30 pb-1 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-charcoal transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            Plan a Birthday
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
              ↗
            </span>
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-body-sm uppercase tracking-[0.06em] text-c7-charcoal-dim transition-colors hover:text-c7-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            Ask Club 7 →
          </a>
        </div>
      </div>

      {/* Transition — paper back to the dark night register for the
          event-night section that follows */}
      <div
        className="relative h-14 md:h-16"
        style={{ background: "linear-gradient(180deg, var(--color-c7-paper) 0%, var(--color-c7-bg-1) 100%)" }}
        aria-hidden="true"
      />
    </section>
  );
}
