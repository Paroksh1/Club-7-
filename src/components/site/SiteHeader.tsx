"use client";

import { useState } from "react";
import { WHATSAPP_HREF } from "@/lib/constants";
import FixtureOverlay from "./FixtureOverlay";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Environmental scrim, not a navbar container — keeps nav text
          readable over whichever photo happens to be scrolled beneath
          it, without ever reading as a boxed bar. A touch of backdrop
          blur (not just a colour tint) is what keeps the nav legible
          once light-background sections like "Off the Pitch" scroll
          underneath it — blur softens the content behind it either
          way, tint alone only works reliably over dark photography. */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28 backdrop-blur-sm md:h-32"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,17,11,0.8) 0%, rgba(6,17,11,0.42) 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      {/* Same bounded content grid as the hero (max-w-[1600px] + the
          shared px-edge gutter) so the two share one consistent frame
          instead of the header running edge-to-edge against a hero
          that's deliberately composed within a margin. */}
      <header className="fixed inset-x-0 top-0 z-50 mx-auto flex w-full max-w-[1600px] items-center justify-between px-edge py-5 md:py-7">
        <div className="flex items-baseline gap-3">
          <a href="#" className="font-display text-2xl md:text-3xl uppercase tracking-tight text-c7-ink leading-none">
            Club<span className="text-c7-red">7</span>
          </a>
          <span className="hidden md:inline font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">
            Sector 89 / FBD
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink-dim hover:text-c7-red transition-colors"
          >
            Book a Slot <span aria-hidden="true">↗</span>
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden inline-flex items-center font-body text-body-sm font-medium uppercase tracking-[0.06em] text-c7-ink-dim"
          >
            Book
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="fixture-overlay"
            className="hidden md:inline-flex items-center gap-2 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink hover:text-c7-red transition-colors"
          >
            Play <span aria-hidden="true">↓</span>
          </button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="fixture-overlay"
            aria-label="Open menu"
            className="md:hidden flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-c7-line/30"
          >
            <span className="block h-px w-4 bg-c7-ink" />
            <span className="block h-px w-2.5 self-start ml-[11px] bg-c7-ink" />
          </button>
        </div>
      </header>

      <FixtureOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
