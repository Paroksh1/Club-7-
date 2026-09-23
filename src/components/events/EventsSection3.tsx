"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_HREF, WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

/**
 * No dedicated birthday/social photo exists in the project. This is
 * the same real Club 7 friends-together shot used for Celebrate in
 * Section 1 — the only genuine social image available, reused here
 * rather than substituting an unrelated football action shot.
 * Flagged in the implementation report, not hidden.
 */
const IMAGE = {
  src: "/stock/cafe-porch.jpg",
  alt: "Friends gathered together at night at Club 7",
  position: "50% 40%",
};

const STEPS = [
  { number: "01", title: "Pick the Game", detail: "Football / Box Cricket / Pickleball" },
  { number: "02", title: "Bring Your People", detail: "Friends, family, your whole crew." },
  { number: "03", title: "Make It Yours", detail: "We'll help you plan the venue side." },
];

const BIRTHDAY_HREF = whatsappHref(WHATSAPP_MESSAGES.birthday);

export default function EventsSection3() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section ref={ref} className="relative bg-c7-bg-1 px-edge pb-24 pt-24 md:pb-28 md:pt-28">
      <div className="border-t border-c7-line/15" />

      {/* Header + image — editorial split, content leads */}
      <div className="mt-14 md:mt-16 md:grid md:grid-cols-[3fr_2fr] md:items-center md:gap-16">
        <div
          className="transition-[opacity,transform] duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">03 / Celebrate</p>
          <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(4rem,6vw,7rem)]">
            Your Birthday.
            <br />
            Your Rules.
          </h2>
          <p className="mt-5 font-body text-body-lg text-c7-ink/85">
            Play first.
            <br />
            Cake later.
          </p>
        </div>

        <div
          className="mt-8 transition-[opacity,transform] duration-700 ease-out md:mt-0"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: visible ? "150ms" : "0ms",
          }}
        >
          <div className="relative ml-auto h-[280px] w-full overflow-hidden rounded-[2px] bg-c7-bg-3 md:h-[300px] md:max-w-[420px]">
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
      </div>

      {/* Make a night of it — one continuous strip, not cards */}
      <div
        className="mt-16 border-t border-c7-line/15 pt-10 transition-opacity duration-700 ease-out md:mt-20"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "260ms" : "0ms" }}
      >
        <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">Make a Night of It.</p>

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

      {/* CTA */}
      <div
        className="mt-14 flex flex-col items-start gap-4 border-t border-c7-line/15 pt-10 transition-opacity duration-700 ease-out md:mt-16"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "480ms" : "0ms" }}
      >
        <a
          href={BIRTHDAY_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red"
        >
          Plan a Birthday
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            ↗
          </span>
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-body-sm uppercase tracking-[0.06em] text-c7-ink-dim transition-colors hover:text-c7-ink"
        >
          Ask Club 7 →
        </a>
      </div>
    </section>
  );
}
