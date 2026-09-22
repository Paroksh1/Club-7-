"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

/**
 * No real Club 7 photography with people in it exists anywhere in
 * the project — every /venue asset is an empty venue shot. These are
 * the same representative stock images already used (and graded)
 * elsewhere on the homepage, reused here as the closest authentic
 * stand-in. Real group photography for both pathways is a genuine
 * gap — flagged in the implementation report, not hidden.
 */
const PATHWAYS = [
  {
    number: "01",
    label: "Team Days",
    lines: ["Take the Team", "Out of Teams."],
    micro: "Sport, people, food and a reason to leave the meeting room.",
    cta: "Plan a Team Day",
    href: whatsappHref(WHATSAPP_MESSAGES.teamDay),
    image: { src: "/stock/warmup-turf.jpg", alt: "A group warming up together on a floodlit pitch", position: "50% 62%" },
  },
  {
    number: "02",
    label: "Celebrate",
    lines: ["Your Birthday.", "Your Rules."],
    micro: "Bring your people. We'll handle the ground.",
    cta: "Plan a Birthday",
    href: whatsappHref(WHATSAPP_MESSAGES.birthday),
    image: { src: "/stock/cafe-porch.jpg", alt: "Friends gathered together at night", position: "50% 40%" },
  },
];

function PathwayRow({ pathway, delay, visible }: { pathway: (typeof PATHWAYS)[number]; delay: number; visible: boolean }) {
  return (
    <a
      href={pathway.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col border-t border-c7-line/15 py-10 last:border-b md:py-14"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 700ms ease-out, transform 700ms ease-out",
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      <div>
        <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">
          {pathway.number} / {pathway.label}
        </p>
        <span
          aria-hidden="true"
          className="mt-3 block h-px w-10 bg-c7-line/30 transition-all duration-300 group-hover:w-16 group-hover:bg-c7-red"
        />
        <h3 className="-ml-1 mt-4 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.5rem,4vw,4.5rem)] transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-2">
          {pathway.lines[0]}
          <br />
          <span className="text-c7-red">{pathway.lines[1]}</span>
        </h3>
      </div>

      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="relative h-[220px] w-full shrink-0 overflow-hidden bg-c7-bg-3 md:order-2 md:h-[240px] md:w-[360px]">
          <Image
            src={pathway.image.src}
            alt={pathway.image.alt}
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            quality={90}
            className="object-cover transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:scale-[1.02]"
            style={{ objectPosition: pathway.image.position, filter: "saturate(0.85) contrast(1.06) brightness(0.92)" }}
          />
        </div>
        <p className="max-w-sm font-body text-body-lg text-c7-ink/85 md:order-1">{pathway.micro}</p>
      </div>

      <p className="mt-8 inline-flex w-fit items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors group-hover:border-c7-red group-hover:text-c7-red">
        {pathway.cta}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          ↗
        </span>
      </p>
    </a>
  );
}

export default function EventsSection1() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);

  return (
    <section className="relative bg-c7-bg-1 px-edge pb-20 pt-24 md:pb-24 md:pt-24">
      <div ref={ref} className="max-w-2xl">
        <p
          className="font-body text-tag tracking-[0.24em] uppercase text-c7-red transition-opacity duration-500"
          style={{ opacity: visible ? 1 : 0 }}
        >
          01 / Events
        </p>
        <h1
          className="-ml-1 mt-3 font-display uppercase leading-[0.92] text-c7-ink text-[clamp(4.5rem,7vw,7.5rem)] transition-[opacity,transform] duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          Bring the People.
          <br />
          <span className="text-c7-red">We&apos;ve Got the Ground.</span>
        </h1>
        <p
          className="mt-6 font-body text-body-lg text-c7-ink/85 transition-opacity duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "150ms" : "0ms" }}
        >
          Office crew, birthday crew — bring them over.
        </p>
      </div>

      <div className="mt-14 md:mt-16">
        {PATHWAYS.map((pathway, i) => (
          <PathwayRow key={pathway.number} pathway={pathway} delay={i * 100} visible={visible} />
        ))}
      </div>
    </section>
  );
}
