"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_HREF } from "@/lib/constants";
import PaperGrain from "@/components/wall/PaperGrain";

const IMAGE = {
  src: "/stock/cafe-porch.jpg",
  alt: "Friends gathered together at night at Club 7",
  position: "50% 38%",
};

export default function EventsBirthday() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section id="birthdays" className="relative scroll-mt-[calc(var(--header-height,90px)+24px)] bg-c7-paper">
      <div
        className="relative h-14 md:h-16"
        style={{ background: "linear-gradient(180deg, var(--color-c7-bg-1) 0%, var(--color-c7-paper) 100%)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative mx-auto w-full max-w-[1600px] px-edge pb-20 pt-4 md:pb-24 md:pt-6">
        <PaperGrain />

        {/* Image + caption above — a different balance from Team Days'
            copy/image split, invitation-like rather than editorial. */}
        <div
          className="relative aspect-[16/9] w-full overflow-hidden transition-[opacity,transform] duration-700 ease-out md:aspect-[21/9]"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          <Image
            src={IMAGE.src}
            alt={IMAGE.alt}
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: IMAGE.position, filter: "saturate(0.92) contrast(1.02) brightness(1.01) sepia(0.08)" }}
          />
        </div>

        <div
          className="mt-8 max-w-2xl transition-[opacity,transform] duration-700 ease-out md:mt-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transitionDelay: visible ? "120ms" : "0ms",
          }}
        >
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">03 / Celebrate</p>
          <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.96] text-c7-charcoal text-[clamp(2.5rem,3.8vw,4rem)]">
            Make a Game of Your Birthday.
          </h2>
          <p className="mt-4 font-body text-body-lg text-c7-charcoal/85">
            Get your favourite people together for time on the court or turf.
          </p>
          <p className="mt-3 -rotate-1 font-body text-body italic text-c7-red/85">Play first. Cake later.</p>
        </div>

        {/* Horizontal planning area below — the different arrangement
            the brief asks for, not a repeat of Team Days' vertical list. */}
        <div
          className="mt-10 flex flex-col gap-8 border-t border-c7-charcoal/12 pt-8 transition-opacity duration-700 ease-out sm:flex-row sm:items-start sm:justify-between md:mt-12"
          style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "240ms" : "0ms" }}
        >
          <p className="max-w-sm font-body text-body text-c7-charcoal-dim">
            Tell us the age group, approximate numbers and what you have in mind for the celebration.
          </p>
          <div className="flex flex-col items-start gap-4">
            <a
              href="/events?plan=birthday#plan"
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
      </div>

      <div
        className="relative h-14 md:h-16"
        style={{ background: "linear-gradient(180deg, var(--color-c7-paper) 0%, var(--color-c7-bg-1) 100%)" }}
        aria-hidden="true"
      />
    </section>
  );
}
