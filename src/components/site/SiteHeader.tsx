"use client";

import { useState } from "react";
import FixtureOverlay from "./FixtureOverlay";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Environmental scrim, not a navbar container — keeps nav text
          readable over whichever photo happens to be scrolled beneath
          it, without ever reading as a boxed bar. */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28 md:h-32"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,17,11,0.8) 0%, rgba(6,17,11,0.42) 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <header className="fixed inset-x-0 top-0 z-50 px-edge py-4 md:py-5 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <a href="#" className="font-display text-2xl md:text-3xl uppercase tracking-tight text-c7-ink leading-none">
            Court<span className="text-c7-red">Play</span>
          </a>
          <span className="hidden md:inline font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">
            Gurgaon / IN
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <button
            type="button"
            className="hidden md:inline-flex items-center font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink-dim hover:text-c7-red transition-colors"
          >
            Book a Court
          </button>
          <button
            type="button"
            className="md:hidden inline-flex items-center font-body text-body-sm font-medium uppercase tracking-[0.06em] text-c7-ink-dim"
          >
            Book
          </button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="true"
            aria-expanded={open}
            className="hidden md:inline-flex items-center gap-2 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink hover:text-c7-red transition-colors"
          >
            Play <span aria-hidden="true">↓</span>
          </button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="true"
            aria-expanded={open}
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
