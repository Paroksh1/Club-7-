"use client";

import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

/**
 * The six-question FAQ list this replaced answered every question the
 * same way ("Confirmed when you message us"), which read as an
 * unfinished page rather than a genuinely useful one. No approved
 * answers exist yet for equipment, arrival time, change/rain policy or
 * payment handling — rather than inventing plausible policy, this is
 * one honest, compact block routing straight to a real answer. Swap
 * for a real Q&A the moment Club 7 confirms these.
 */
const KNOWN_FACTS = [
  { label: "Location", value: "Sector 89, Faridabad" },
  { label: "Hours", value: "Open 24 hours" },
];

export default function PlaySection3() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[1600px] bg-c7-bg-1 px-edge pb-28 pt-16 md:pb-20 md:pt-20">
      <div
        className="flex flex-col gap-8 border-t border-c7-line/15 pt-10 transition-[opacity,transform] duration-700 ease-out sm:flex-row sm:items-start sm:justify-between md:gap-12"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)" }}
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {KNOWN_FACTS.map((fact) => (
            <p key={fact.label} className="font-body text-body-sm text-c7-ink-dim">
              <span className="uppercase tracking-[0.1em] text-c7-ink-dim/70">{fact.label}</span>{" "}
              <span className="font-medium text-c7-ink">{fact.value}</span>
            </p>
          ))}
        </div>

        <div className="max-w-sm">
          <p className="font-display uppercase leading-[0.98] text-c7-ink text-[clamp(1.375rem,2vw,1.75rem)]">
            Need to Check Something First?
          </p>
          <p className="mt-2 font-body text-body-sm text-c7-ink-dim">
            Ask us about equipment, arrival, weather or changing your booking.
          </p>
          <a
            href={whatsappHref(WHATSAPP_MESSAGES.support)}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            Ask Club 7
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Coaching — a subtle secondary row, not another promotional block */}
      <div
        className="mt-8 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 border-t border-c7-line/10 pt-6 transition-opacity duration-700 ease-out"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "140ms" : "0ms" }}
      >
        <span className="font-body text-body-sm text-c7-ink-dim">Looking for coaching?</span>
        <a
          href={whatsappHref(WHATSAPP_MESSAGES.academy)}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 font-body text-body-sm font-medium uppercase tracking-[0.06em] text-c7-ink-dim transition-colors hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
        >
          Enquire about coaching
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
