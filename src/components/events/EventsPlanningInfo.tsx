"use client";

import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

/**
 * None of these six topics have a verified answer anywhere in the
 * project — no confirmed group-size limits, food arrangements, weather
 * policy or confirmation process. Rather than inventing plausible
 * event packages (explicitly against the brief), this lists the real
 * questions an organiser needs answered and routes straight to asking
 * them. Replace each `answer` with the real, confirmed policy the
 * moment Club 7 provides it — the layout doesn't need to change.
 */
const TOPICS = [
  { topic: "Group size", detail: "Suitable sizes and how larger groups are handled." },
  { topic: "Playing space", detail: "Whether the booking reserves a court/turf or more." },
  { topic: "Food", detail: "Available arrangements and what needs a separate discussion." },
  { topic: "Birthdays", detail: "Cake, decoration, age-group and supervision arrangements." },
  { topic: "Weather", detail: "The contingency or rescheduling approach." },
  { topic: "Confirmation", detail: "How date, price, payment and booking are agreed." },
];

export default function EventsPlanningInfo() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[1600px] bg-c7-bg-1 px-edge py-16 md:py-20">
      <div
        className="max-w-xl transition-[opacity,transform] duration-700 ease-out"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)" }}
      >
        <h2 className="-ml-1 font-display uppercase leading-[0.96] text-c7-ink text-[clamp(2rem,3vw,3rem)]">
          A Few Things to Plan Around.
        </h2>
        <p className="mt-3 font-body text-body text-c7-ink-dim">
          The real questions that turn an enquiry into a confirmed plan — discussed directly, not guessed at here.
        </p>
      </div>

      <dl
        className="mt-8 flex flex-col divide-y divide-c7-line/15 border-t border-c7-line/15 transition-opacity duration-700 ease-out md:mt-10"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "140ms" : "0ms" }}
      >
        {TOPICS.map((t) => (
          <div key={t.topic} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8">
            <dt className="shrink-0 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink sm:w-40">
              {t.topic}
            </dt>
            <dd className="font-body text-body text-c7-ink-dim">{t.detail}</dd>
          </div>
        ))}
      </dl>

      <a
        href={whatsappHref(WHATSAPP_MESSAGES.events)}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
      >
        Discuss your requirements
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
          ↗
        </span>
      </a>
    </section>
  );
}
