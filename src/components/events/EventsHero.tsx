import Image from "next/image";
import { entrance } from "@/lib/entrance";
import { FILM_GRAIN_URL } from "@/lib/grain";

/**
 * The most cinematic people-led frame in the library: a floodlit match
 * shot through the goal net, multiple players in frame, lights visible
 * in the background. The only genuinely "energy + people + sport +
 * floodlights" shot available — everything else is either an empty
 * venue or a single-subject crop. Swap for real event photography the
 * moment it exists; the treatment below is deliberately not tied to
 * this specific image's geometry.
 */
const IMAGE = {
  src: "/stock/last-goal-night.jpg",
  alt: "Players mid-match on a floodlit pitch at Club 7, shot through the goal net",
  position: "38% 58%",
};

const ROUTES = [
  { number: "01", label: "Team Days", href: "#team-days" },
  { number: "02", label: "Birthdays", href: "#birthdays" },
];

export default function EventsHero() {
  return (
    <section
      className="relative mx-auto w-full max-w-[1600px] bg-c7-bg-1 px-edge pb-16 md:pb-20"
      style={{ paddingTop: "calc(var(--header-height, 90px) + 32px)" }}
    >
      <div className="grid grid-cols-1 gap-10 md:grid-rows-[auto_1fr] md:gap-x-16 md:gap-y-10 md:[grid-template-columns:45%_55%] md:[grid-template-areas:'copy_image'_'links_image']">
        {/* Copy */}
        <div className="md:[grid-area:copy]">
          <p
            className={`c7-anim-reveal font-body text-tag tracking-[0.24em] uppercase text-c7-red ${entrance(200)}`}
          >
            01 / Events
          </p>
          <h1 className="mt-3 -ml-1">
            <span
              className={`c7-anim-headline block font-display uppercase leading-[0.92] text-c7-ink text-[clamp(3.75rem,5.5vw,7rem)] ${entrance(
                340
              )}`}
            >
              Bring the People.
            </span>
            <span
              className={`c7-anim-headline block font-display uppercase leading-[0.92] text-c7-red text-[clamp(3.75rem,5.5vw,7rem)] ${entrance(
                460
              )}`}
            >
              We&apos;ve Got the Ground.
            </span>
          </h1>
          <p
            className={`c7-anim-reveal mt-6 max-w-md font-body text-body-lg text-c7-ink/85 ${entrance(600)}`}
          >
            Office crew, birthday crew — bring them over.
          </p>
        </div>

        {/* Route index — editorial, not cards */}
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

        {/* Image */}
        <div className={`c7-anim-reveal relative h-[54vh] min-h-[380px] overflow-hidden bg-c7-bg-3 md:[grid-area:image] md:h-full md:min-h-[560px] ${entrance(160)}`}>
          <Image
            src={IMAGE.src}
            alt={IMAGE.alt}
            fill
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: IMAGE.position, filter: "saturate(0.86) contrast(1.08) brightness(0.86) hue-rotate(4deg)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
          />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            style={{
              background: "linear-gradient(180deg, rgba(4,14,14,0.25) 0%, transparent 30%, rgba(4,14,14,0.35) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
