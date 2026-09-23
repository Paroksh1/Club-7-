"use client";

import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

/**
 * Only two facts here are actually verified anywhere in the project
 * (Location, Hours — both already established sitewide). Equipment,
 * arrival time, change/rain policy and payment handling are real
 * questions an organiser needs answered, but the venue hasn't
 * confirmed them yet — so rather than inventing plausible-sounding
 * policy, they're listed honestly as "ask when you message," with one
 * direct route to actually ask. Swap this for real published answers
 * the moment Club 7 confirms them; the layout doesn't need to change.
 */
const KNOWN_FACTS = [
  { label: "Location", value: "Sector 89, Faridabad" },
  { label: "Hours", value: "Open 24 hours" },
];

const OPEN_QUESTIONS = [
  "What equipment should we bring?",
  "How early should we arrive?",
  "Can we change the booking?",
  "What happens if it rains?",
  "How are payments and confirmation handled?",
  "Is equipment available to hire?",
];

export default function PlaySection3() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[1600px] bg-c7-bg-1 px-edge pb-20 pt-20 md:pb-24 md:pt-24">
      <div className="md:grid md:grid-cols-[36%_1fr] md:items-start md:gap-12">
        <div
          className="transition-[opacity,transform] duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)" }}
        >
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">03 / Before You Arrive</p>
          <h2 className="-ml-1 mt-2 font-display uppercase leading-[0.96] text-c7-ink text-[clamp(2rem,3vw,3rem)]">
            Before you arrive.
          </h2>

          <div className="mt-6 flex flex-col divide-y divide-c7-line/15 border-t border-c7-line/15">
            {KNOWN_FACTS.map((fact) => (
              <div key={fact.label} className="flex items-center justify-between py-3">
                <span className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">{fact.label}</span>
                <span className="font-body text-body-sm font-medium text-c7-ink">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-10 transition-[opacity,transform] duration-700 ease-out md:mt-0"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transitionDelay: visible ? "120ms" : "0ms",
          }}
        >
          <ul className="flex flex-col divide-y divide-c7-line/15 border-t border-c7-line/15">
            {OPEN_QUESTIONS.map((q) => (
              <li key={q} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5">
                <span className="font-body text-body text-c7-ink">{q}</span>
                <span className="font-body text-body-sm text-c7-ink-dim/70">Confirmed when you message us</span>
              </li>
            ))}
          </ul>

          <a
            href={whatsappHref(WHATSAPP_MESSAGES.booking)}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            Ask Club 7 these questions
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Coaching — a separate, smaller enquiry intent, not another
          lifestyle section. */}
      <div
        className="mt-14 flex flex-col items-start gap-2 border-t border-c7-line/15 pt-8 transition-opacity duration-700 ease-out md:mt-16"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "220ms" : "0ms" }}
      >
        <p className="font-display uppercase leading-none text-c7-ink text-[clamp(1.25rem,1.8vw,1.625rem)]">
          Looking for coaching?
        </p>
        <p className="font-body text-body-sm text-c7-ink-dim">
          Ask about current cricket batches, age groups and trial availability.
        </p>
        <a
          href={whatsappHref(WHATSAPP_MESSAGES.academy)}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-1 inline-flex items-center gap-2 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink-dim transition-colors hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
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
