import Image from "next/image";
import { entrance } from "@/lib/entrance";
import { FILM_GRAIN_URL } from "@/lib/grain";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

/**
 * A photograph through a football net sells football, not event
 * hosting — the previous hero image was swapped out for this reason.
 * The project's library still doesn't have a dedicated "group
 * organising an event" photo; this is the closest available (people
 * together, not mid-action), used honestly as a stand-in rather than
 * cropped to imply something it isn't. A short, purpose-shot event
 * gallery is the single highest-leverage asset this page is missing.
 */
const IMAGE = {
  src: "/stock/warmup-turf.jpg",
  alt: "A group together on a floodlit pitch at Club 7",
  position: "50% 55%",
};

const ROUTES = [
  { number: "01", label: "Team Outings", href: "#team-days" },
  { number: "02", label: "Birthdays", href: "#birthdays" },
  { number: "03", label: "Group Planning", href: "#plan" },
];

export default function EventsHero() {
  return (
    <section
      className="relative mx-auto w-full max-w-[1600px] bg-c7-bg-1 px-edge pb-16 md:pb-20"
      style={{ paddingTop: "calc(var(--header-height, 90px) + 32px)" }}
    >
      <div className="grid grid-cols-1 gap-10 md:grid-rows-[auto_1fr] md:gap-x-16 md:gap-y-10 md:[grid-template-columns:45fr_55fr] md:[grid-template-areas:'copy_image'_'links_image']">
        <div className="md:[grid-area:copy]">
          <p className={`c7-anim-reveal font-body text-tag tracking-[0.24em] uppercase text-c7-red ${entrance(200)}`}>
            01 / Events
          </p>
          <h1 className="mt-3 -ml-1">
            <span
              className={`c7-anim-headline block font-display uppercase leading-[0.92] text-c7-ink text-[clamp(3rem,4.4vw,5.5rem)] ${entrance(
                340
              )}`}
            >
              Give Them a Plan
            </span>
            <span
              className={`c7-anim-headline block font-display uppercase leading-[0.92] text-c7-ink text-[clamp(3rem,4.4vw,5.5rem)] ${entrance(
                460
              )}`}
            >
              Worth Showing Up For.
            </span>
          </h1>
          <p className={`c7-anim-reveal mt-6 max-w-md font-body text-body-lg text-c7-ink/85 ${entrance(600)}`}>
            Team outings, birthdays and private group games at Club 7. A venue for getting everyone involved in the
            same plan.
          </p>
          <a
            href={whatsappHref(WHATSAPP_MESSAGES.events)}
            target="_blank"
            rel="noopener noreferrer"
            className={`c7-anim-reveal group mt-6 inline-flex w-fit items-center gap-2 bg-c7-red px-6 py-3.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red ${entrance(
              680
            )}`}
          >
            Plan an Event
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
              ↗
            </span>
          </a>
        </div>

        <div
          className={`c7-anim-reveal mt-2 flex flex-col gap-1 border-t border-c7-line/15 pt-6 md:[grid-area:links] md:mt-0 md:self-end ${entrance(
            760
          )}`}
        >
          {ROUTES.map((route) => (
            <a
              key={route.number}
              href={route.href}
              className="group inline-flex w-fit items-center gap-3 py-2 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink-dim transition-colors hover:text-c7-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
            >
              <span className="text-c7-red">{route.number}</span>
              {route.label}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                ↘
              </span>
            </a>
          ))}
        </div>

        <div className={`relative h-[54vh] min-h-[380px] overflow-hidden bg-c7-bg-3 md:[grid-area:image] md:h-full md:min-h-[560px] ${entrance(160)}`}>
          <Image
            src={IMAGE.src}
            alt={IMAGE.alt}
            fill
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: IMAGE.position, filter: "saturate(0.85) contrast(1.06) brightness(0.9) hue-rotate(3deg)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
          />
          {/* Boundary line drawing once on entry — the section's one
              distinctive gesture, per brief. */}
          <div className="pointer-events-none absolute inset-3 border border-c7-ink/25 [animation:c7-reveal_800ms_cubic-bezier(0.2,0.7,0.2,1)_both] [animation-delay:900ms]" />
        </div>
      </div>
    </section>
  );
}
