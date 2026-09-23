"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_HREF, WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";
import PaperGrain from "@/components/wall/PaperGrain";

/**
 * The only genuine social/friends photo in the library — warm, real,
 * unposed. One frame, no overlap, no rotation — the calmest treatment
 * on the page, matching the section's own warmer register.
 */
const IMAGE = {
  src: "/stock/cafe-porch.jpg",
  alt: "Friends gathered together at night at Club 7",
  position: "50% 38%",
};

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

      <div ref={ref} className="relative mx-auto w-full max-w-[1600px] px-edge pb-20 pt-4 md:pb-24 md:pt-6">
        <PaperGrain />

        <div className="md:grid md:grid-cols-[1fr_1fr] md:items-center md:gap-16">
          <div
            className="transition-[opacity,transform] duration-700 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
          >
            <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">03 / Celebrate</p>
            <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.96] text-c7-charcoal text-[clamp(2.75rem,4.2vw,4.5rem)]">
              Your Birthday. Your Rules.
            </h2>
            <p className="mt-5 font-body text-body-lg text-c7-charcoal/85">
              Play first. Cake later.
            </p>
            <p className="mt-4 max-w-sm font-body text-body text-c7-charcoal-dim">
              Football, box cricket or pickleball — whatever your crew&apos;s
              into. Bring friends, family, whoever&apos;s actually showing up.
              We&apos;ll help sort the venue side.
            </p>
          </div>

          <div
            className="relative mt-10 h-[280px] w-full overflow-hidden transition-[opacity,transform] duration-700 ease-out md:mt-0 md:h-[340px]"
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
              sizes="(min-width: 768px) 46vw, 100vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: IMAGE.position, filter: "saturate(0.92) contrast(1.02) brightness(1.01) sepia(0.08)" }}
            />
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-14 flex flex-col items-start gap-4 border-t border-c7-charcoal/12 pt-10 transition-opacity duration-700 ease-out md:mt-16"
          style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "300ms" : "0ms" }}
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
