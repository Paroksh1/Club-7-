"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";

const GRADE_DARK = "saturate(0.85) contrast(1.06) brightness(0.92) hue-rotate(3deg)";
const GRADE_WARM = "saturate(0.92) contrast(1.02) brightness(1.01) sepia(0.08)";

function RevealBlock({
  children,
  visible,
  delayMs = 0,
  className = "",
}: {
  children: React.ReactNode;
  visible: boolean;
  delayMs?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: visible ? `${delayMs}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

function Cta({ href, label, dark = true }: { href: string; label: string; dark?: boolean }) {
  const base = dark
    ? "text-c7-ink hover:border-c7-red hover:text-c7-red border-c7-line/40"
    : "text-c7-charcoal hover:border-c7-red hover:text-c7-red border-c7-charcoal/30";
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 border-b pb-1 font-body text-body font-medium uppercase tracking-[0.08em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red ${base}`}
    >
      {label}
      <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-[5px]">
        ↗
      </span>
    </a>
  );
}

/** 02 / Team Days — a structured, gridded poster: real football action,
 * controlled typography, no asymmetry. */
function TeamDayPoster() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} id="team-days" className="scroll-mt-[calc(var(--header-height,90px)+24px)] border-t border-c7-line/15 pt-12 md:pt-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <RevealBlock visible={visible} className="md:col-span-5">
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">02 / Team Days</p>
          <h3 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.5rem,4vw,4rem)]">
            No Boardroom.
            <br />
            No Icebreakers.
            <br />
            <span className="text-c7-red">Just Play.</span>
          </h3>
          <p className="mt-5 max-w-sm font-body text-body-lg text-c7-ink-dim">
            Football, Box Cricket or Pickleball — built around your group.
          </p>
          <div className="mt-7">
            <Cta href="/events?plan=team-outing#plan" label="Plan a Team Day" />
          </div>
        </RevealBlock>

        <RevealBlock visible={visible} delayMs={140} className="group relative h-[320px] w-full overflow-hidden bg-c7-bg-3 md:col-span-7 md:h-[420px]">
          <Image
            src="/stock/last-goal-night.jpg"
            alt="Players mid-match on a floodlit pitch — representative photo"
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            quality={90}
            className="scale-[1.03] object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-100"
            style={{ objectPosition: "35% 55%", filter: GRADE_DARK }}
          />
        </RevealBlock>
      </div>
    </div>
  );
}

/** 03 / Birthdays — warmer paper register, image and type overlap
 * loosely rather than sitting in a strict grid. */
function BirthdayPoster() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);
  return (
    <div id="birthdays" className="relative scroll-mt-[calc(var(--header-height,90px)+24px)] bg-c7-paper">
      <div className="relative h-12 md:h-14" style={{ background: "linear-gradient(180deg, var(--color-c7-bg-1) 0%, var(--color-c7-paper) 100%)" }} aria-hidden="true" />
      <div ref={ref} className="px-edge py-14 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-6">
          <RevealBlock visible={visible} className="group relative order-2 h-[280px] w-full overflow-hidden md:order-1 md:col-span-7 md:h-[380px]">
            <Image
              src="/stock/cafe-porch.jpg"
              alt="Friends gathered together at night — representative photo"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              quality={90}
              className="scale-[1.03] object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-100"
              style={{ objectPosition: "50% 34%", filter: GRADE_WARM }}
            />
          </RevealBlock>

          <RevealBlock visible={visible} delayMs={140} className="order-1 md:order-2 md:col-span-5 md:pb-8">
            <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">03 / Birthdays</p>
            <h3 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-charcoal text-[clamp(2.5rem,4vw,4rem)]">
              Play First.
              <br />
              Cake Later.
            </h3>
            <p className="mt-4 max-w-sm font-body text-body-lg text-c7-charcoal-dim">
              Bring friends, family and whoever&apos;s actually showing up. We&apos;ll help sort the venue side.
            </p>
            <div className="mt-7">
              <Cta href="/events?plan=birthday#plan" label="Plan a Birthday" dark={false} />
            </div>
          </RevealBlock>
        </div>
      </div>
      <div className="relative h-12 md:h-14" style={{ background: "linear-gradient(180deg, var(--color-c7-paper) 0%, var(--color-c7-bg-1) 100%)" }} aria-hidden="true" />
    </div>
  );
}

/** 04 / Private Groups — minimal: a large dark surface, a small strip
 * of photography, mostly negative space. */
function PrivateGroupPoster() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} id="private-groups" className="scroll-mt-[calc(var(--header-height,90px)+24px)] border-t border-c7-line/15 pt-16 md:pt-20">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <RevealBlock visible={visible} className="md:col-span-6 md:col-start-1">
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">04 / Private Groups</p>
          <h3 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.5rem,4vw,4rem)]">
            No Occasion
            <br />
            Required.
          </h3>
          <p className="mt-5 max-w-sm font-body text-body-lg text-c7-ink-dim">
            Got the group? That&apos;s enough of a reason.
          </p>
          <div className="mt-7">
            <Cta href="/events?plan=private-group#plan" label="Ask Club 7" />
          </div>
        </RevealBlock>

        <RevealBlock visible={visible} delayMs={140} className="group relative h-[140px] w-full self-end overflow-hidden bg-c7-bg-3 md:col-span-5 md:col-start-8 md:h-[180px]">
          <Image
            src="/stock/warmup-turf.jpg"
            alt="Players warming up together under a single floodlight — representative photo"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            quality={90}
            className="scale-[1.03] object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-100"
            style={{ objectPosition: "50% 45%", filter: GRADE_DARK }}
          />
        </RevealBlock>
      </div>
    </div>
  );
}

export default function EventPosters() {
  return (
    <section className="relative bg-c7-bg-1">
      <div className="mx-auto w-full max-w-[1600px] px-edge pb-16 pt-16 md:pb-20 md:pt-20">
        <TeamDayPoster />
      </div>
      <BirthdayPoster />
      <div className="mx-auto w-full max-w-[1600px] px-edge pb-20 pt-16 md:pb-24 md:pt-20">
        <PrivateGroupPoster />
      </div>
    </section>
  );
}
