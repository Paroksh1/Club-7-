"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_HREF } from "@/lib/constants";

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
              <span className="text-c7-red" aria-hidden="true">
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
        className="group inline-flex items-center justify-center gap-2 bg-c7-red py-3.5 pl-6 pr-6 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-[padding-right,background-color] duration-200 hover:bg-c7-red-dim hover:pr-8"
      >
        Book a Slot
        <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
          ↗
        </span>
      </a>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 border border-c7-line/40 px-6 py-3.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-bg-3"
      >
        WhatsApp Club 7 <span aria-hidden="true">↗</span>
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

function DesktopPhoto({ visible }: { visible: boolean }) {
  return (
    <div
      className="relative z-[1] ml-auto hidden overflow-hidden bg-c7-bg-3 transition-opacity duration-1000 ease-out md:block md:aspect-[3/4]"
      style={fade(visible, 0)}
    >
      <Image
        src="/venue/entrance-signage.jpg"
        alt="Club 7 entrance at night — Play, Train, Devour"
        fill
        sizes="42vw"
        quality={90}
        className="object-cover"
        style={{ objectPosition: "50% 42%" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-c7-bg-1 to-transparent"
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
    <div className="relative transition-opacity duration-1000 ease-out" style={fade(visible, 0)}>
      <div className="relative aspect-[430/758] overflow-hidden bg-c7-bg-3">
        <Image
          src="/venue/entrance-signage.jpg"
          alt="Club 7 entrance at night — Play, Train, Devour"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
          style={{ objectPosition: "50% 38%" }}
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
        {/* Mobile — linear stack, photo breaks the flow between headline
            and venue info, full-bleed width */}
        <div className="flex flex-col gap-8 pt-24 pb-10 md:hidden">
          <div className="flex flex-col gap-4 px-edge">
            <Label visible={visible} />
            <div className="transition-[opacity,transform] duration-700" style={rise(visible, 200)}>
              <Headline />
            </div>
          </div>

          <MobilePhoto visible={visible} />

          <div className="flex flex-col gap-6 px-edge">
            <InfoBlock visible={visible} />
            <CtaRow visible={visible} />
            <HumanLine visible={visible} />
          </div>
        </div>

        {/* Desktop — one composed block on the left, the entrance photo
            stretched to the row's full height on the right, flush to
            the true edge. Width follows from the height automatically
            via aspect-ratio, so it scales correctly across viewports
            without separate tuning. */}
        <div className="relative hidden md:flex md:flex-1 md:min-h-0 md:items-stretch md:py-4">
          <BrandWatermark />
          <FieldLine />

          <div className="relative z-10 flex flex-col justify-center gap-6 pl-edge md:max-w-[46%] lg:max-w-[42%]">
            <Label visible={visible} />
            <div className="transition-[opacity,transform] duration-700" style={rise(visible, 200)}>
              <Headline />
            </div>
            <InfoBlock visible={visible} />
            <CtaRow visible={visible} />
            <HumanLine visible={visible} />
          </div>

          <DesktopPhoto visible={visible} />
        </div>
      </div>

      {/* Minimal integrated footer — the last line on the page, not a
          second section. Solid background so it stays legible over
          whatever sits behind it. */}
      <div className="relative z-10 shrink-0 border-t border-c7-line/10 bg-c7-bg-1 px-edge py-4 md:py-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
            <span className="text-c7-ink">Club 7</span>
            <span className="text-c7-ink-dim/40">/</span>
            <span>Sector 89 / Faridabad</span>
          </div>
          <p className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
            Cricket / Football / Pickleball / Cafe
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim transition-colors hover:text-c7-red"
            >
              Book a Slot <span aria-hidden="true">↑</span>
            </button>
            <span className="font-body text-[0.65rem] text-c7-ink-dim/40">© Club 7</span>
          </div>
        </div>
      </div>
    </section>
  );
}
