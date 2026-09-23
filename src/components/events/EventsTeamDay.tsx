"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";

const IMAGE = {
  src: "/stock/warmup-turf.jpg",
  alt: "A group warming up together on a floodlit pitch",
  position: "50% 60%",
};

const PLANNING_POINTS = [
  "Group size and mix",
  "Preferred sport",
  "Playing time",
  "Food requirements",
  "Any organisational needs",
];

/** Illustrative formation only — arranging simple markers into two
 * sides as the section enters, not a claim about a guaranteed format. */
function FormationDiagram({ visible }: { visible: boolean }) {
  const teamA = [18, 32, 46].map((y) => ({ x: 28, y }));
  const teamB = [18, 32, 46].map((y) => ({ x: 72, y }));
  return (
    <svg viewBox="0 0 100 64" className="h-24 w-full max-w-[220px] text-c7-ink-dim/60" aria-hidden="true">
      <line x1="50" y1="4" x2="50" y2="60" stroke="currentColor" strokeWidth="0.5" />
      {[...teamA, ...teamB].map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3.2"
          className={p.x < 50 ? "fill-c7-red" : "fill-c7-ink/50"}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.3)",
            transformOrigin: `${p.x}px ${p.y}px`,
            transition: `opacity 400ms ease-out ${i * 70}ms, transform 400ms ease-out ${i * 70}ms`,
          }}
        />
      ))}
    </svg>
  );
}

export default function EventsTeamDay() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section id="team-days" ref={ref} className="relative mx-auto w-full max-w-[1600px] scroll-mt-[calc(var(--header-height,90px)+24px)] bg-c7-bg-1 px-edge pb-20 pt-16 md:pb-24 md:pt-20">
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
            A team outing built around a game everyone can get involved in.
          </p>
          <p className="mt-3 max-w-md font-body text-body text-c7-ink-dim">
            Share your headcount, preferred date and the sports you have in mind. We&apos;ll help you explore a plan
            for the group.
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

      <div
        className="mt-16 border-t border-c7-line/15 pt-10 transition-opacity duration-700 ease-out md:mt-20 md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-16"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "240ms" : "0ms" }}
      >
        <div>
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">What We&apos;ll Plan Around</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {PLANNING_POINTS.map((point) => (
              <li key={point} className="flex items-baseline gap-2.5 font-body text-body text-c7-ink/90">
                <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-c7-red/70" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <FormationDiagram visible={visible} />
      </div>

      <div
        className="mt-14 transition-opacity duration-700 ease-out md:mt-16"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "360ms" : "0ms" }}
      >
        <a
          href="/events?plan=team-outing#plan"
          className="group inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
        >
          Start a Team-Day Enquiry
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
