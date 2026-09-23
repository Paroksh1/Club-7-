"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_HREF } from "@/lib/constants";
import { FILM_GRAIN_URL } from "@/lib/grain";

const AMENITIES = ["Cricket", "Football", "Pickleball", "Cafe"];

function fade(visible: boolean, delayMs: number): CSSProperties {
  return { opacity: visible ? 1 : 0, transitionDelay: visible ? `${delayMs}ms` : "0ms" };
}

function rise(visible: boolean, delayMs: number): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(14px)",
    transitionDelay: visible ? `${delayMs}ms` : "0ms",
  };
}

function Label({ visible }: { visible: boolean }) {
  return (
    <p
      className="font-body text-tag tracking-[0.24em] uppercase text-c7-red transition-opacity duration-500"
      style={fade(visible, 100)}
    >
      05 / Your Move
    </p>
  );
}

function Headline() {
  return (
    <h2 className="-ml-1">
      <span className="block font-display text-display-2 uppercase leading-[0.92] text-c7-ink">Your Night</span>
      <span className="-mt-1 block font-display text-display-2 uppercase leading-[0.92] text-c7-red">
        Starts Here.
      </span>
    </h2>
  );
}

function InfoBlock({ visible }: { visible: boolean }) {
  return (
    <div className="flex flex-col gap-2 transition-opacity duration-700" style={fade(visible, 260)}>
      <p className="flex flex-wrap items-center gap-x-2 font-body text-body-sm tracking-[0.08em] uppercase text-c7-ink md:text-body">
        {AMENITIES.map((a, i) => (
          <span key={a} className="flex items-center gap-x-2">
            {i > 0 && (
              <span className="text-c7-red/45 text-[0.85em]" aria-hidden="true">
                {"///"}
              </span>
            )}
            {a}
          </span>
        ))}
      </p>
      <p className="flex flex-wrap items-center gap-x-2.5 font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
        <span>Sector 89 / Faridabad</span>
        <span className="text-c7-ink-dim/40">/</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 bg-c7-red c7-anim-pulse-dot" aria-hidden="true" />
          Open 24 Hours
        </span>
      </p>
    </div>
  );
}

function CtaRow({ visible }: { visible: boolean }) {
  return (
    <div className="flex flex-col gap-3 transition-opacity duration-700 sm:flex-row sm:items-center" style={fade(visible, 360)}>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center justify-center gap-2 bg-c7-red px-6 py-3.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim"
      >
        Book a Slot
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]"
        >
          ↗
        </span>
      </a>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center justify-center gap-2 border border-c7-line/40 px-6 py-3.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-line/60 hover:bg-c7-bg-3"
      >
        WhatsApp Club 7
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]"
        >
          ↗
        </span>
      </a>
    </div>
  );
}

function HumanLine({ visible }: { visible: boolean }) {
  return (
    <p
      className="font-body text-body-sm tracking-[0.04em] uppercase text-c7-ink-dim transition-opacity duration-700"
      style={fade(visible, 440)}
    >
      Bring your people. We&apos;ve got the ground.
    </p>
  );
}

/** Faint painted-signage lettering dissolving into the negative space —
 * a single restrained environmental graphic, not a second headline. */
function BrandWatermark() {
  return (
    <p
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-[6%] -left-[1%] -z-10 hidden select-none font-display uppercase leading-[0.8] text-c7-ink/[0.035] md:block"
      style={{ fontSize: "26vw" }}
    >
      C7
    </p>
  );
}

/** The ground's court-line, carried into the final frame — connects
 * "the ground" to "the gate" without becoming a decorative grid. */
function FieldLine() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-[60%] -z-10 hidden h-px w-[52%] bg-gradient-to-r from-transparent via-c7-line/20 to-transparent md:block"
    />
  );
}

/** One consistent closing-shot grade — deep blue-black shadows, a
 * touch more contrast, slightly muted saturation — so the sign's glow
 * reads as the deliberate anchor rather than the whole frame looking
 * soft. Same cool night-register formula as the other sections. */
const CLOSING_GRADE = "saturate(0.86) contrast(1.12) brightness(0.92) hue-rotate(5deg)";

function DesktopPhoto({ visible }: { visible: boolean }) {
  return (
    <div
      className="relative z-[1] ml-auto hidden overflow-hidden bg-c7-bg-3 transition-[opacity,transform] duration-1000 ease-out md:block md:w-[54%] lg:w-[60%]"
      style={{ ...fade(visible, 0), transform: visible ? "scale(1)" : "scale(1.02)" }}
    >
      <Image
        src="/venue/entrance-signage.jpg"
        alt="Club 7 entrance at night — Play, Train, Devour"
        fill
        sizes="60vw"
        quality={90}
        className="object-cover"
        style={{ objectPosition: "50% 42%", filter: CLOSING_GRADE }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-c7-bg-1 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-c7-bg-1 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

function MobilePhoto({ visible }: { visible: boolean }) {
  return (
    <div className="relative transition-[opacity,transform] duration-1000 ease-out" style={{ ...fade(visible, 0), transform: visible ? "scale(1)" : "scale(1.02)" }}>
      <div className="relative aspect-[430/758] overflow-hidden bg-c7-bg-3">
        <Image
          src="/venue/entrance-signage.jpg"
          alt="Club 7 entrance at night — Play, Train, Devour"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
          style={{ objectPosition: "50% 38%", filter: CLOSING_GRADE }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-c7-bg-1 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-c7-bg-1 to-transparent"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function YourMoveSection() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.25);

  return (
    <section id="your-move" className="relative bg-c7-bg-1 overflow-x-hidden md:flex md:h-[95svh] md:min-h-[640px] md:flex-col">
      <div ref={ref} className="relative md:flex-1 md:flex md:min-h-0 md:flex-col">
        {/* Mobile — headline first, then the venue facts and the ask,
            then the human sign-off, with the photo closing the section
            rather than interrupting the copy midway through it. */}
        <div className="flex flex-col gap-8 pt-24 pb-10 md:hidden">
          <div className="flex flex-col gap-4 px-edge">
            <Label visible={visible} />
            <div className="transition-[opacity,transform] duration-700" style={rise(visible, 200)}>
              <Headline />
            </div>
          </div>

          <div className="flex flex-col gap-4 px-edge">
            <InfoBlock visible={visible} />
            <CtaRow visible={visible} />
            <HumanLine visible={visible} />
          </div>

          <MobilePhoto visible={visible} />
        </div>

        {/* Desktop — one composed final scene, not two isolated
            columns: a defined gap (not flex auto-margin leftover)
            separates the copy from a photo that now claims a real
            majority of the row's width, so it sits closer to centre
            instead of stranded at the far edge. The content block sits
            lower than dead-centre (justify-end + generous bottom
            clearance) — a settled, confident closing frame rather than
            a centred hero repeated a fifth time. */}
        <div className="relative hidden md:flex md:flex-1 md:min-h-0 md:items-stretch md:gap-10 md:py-4 lg:gap-14">
          <BrandWatermark />
          <FieldLine />

          <div className="relative z-10 flex flex-col justify-end gap-7 pb-10 pl-edge md:max-w-[40%] lg:max-w-[34%] lg:pb-14">
            <div className="flex flex-col gap-4">
              <Label visible={visible} />
              <div className="transition-[opacity,transform] duration-700" style={rise(visible, 200)}>
                <Headline />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <InfoBlock visible={visible} />
              <CtaRow visible={visible} />
              <HumanLine visible={visible} />
            </div>
          </div>

          <DesktopPhoto visible={visible} />
        </div>
      </div>

      {/* Footer metadata — the page's last line, deliberately quiet so
          it never competes with the section's own primary action.
          Lower contrast throughout (no bright "Club 7" anchor point
          left in it), a hairline divider, and generous horizontal
          spacing so it reads as a closing credit line, not a bar. */}
      <div className="relative z-10 shrink-0 border-t border-c7-line/[0.07] bg-c7-bg-1 px-edge py-3.5 md:py-2.5">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-10 sm:gap-y-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-body text-[0.6875rem] tracking-[0.18em] uppercase text-c7-ink-dim/70">
            <span>Club 7</span>
            <span className="text-c7-ink-dim/30">/</span>
            <span>Sector 89 / Faridabad</span>
          </div>
          <p className="font-body text-[0.6875rem] tracking-[0.18em] uppercase text-c7-ink-dim/70">
            Cricket / Football / Pickleball / Cafe
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-body text-[0.6875rem] tracking-[0.18em] uppercase text-c7-ink-dim/70 transition-colors hover:text-c7-red"
            >
              Book a Slot <span aria-hidden="true">↑</span>
            </button>
            <span className="font-body text-[0.625rem] text-c7-ink-dim/35">© Club 7</span>
          </div>
        </div>
      </div>
    </section>
  );
}
