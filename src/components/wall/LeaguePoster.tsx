import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";
import PaperGrain from "./PaperGrain";

const BRACKET = ["Group A", "Group B", "QF", "SF", "Final"];

/**
 * The anchor artefact on the wall — a real tournament poster, not a
 * section card. Built as two physically-attached sheets (red masthead
 * + an off-white fixture/registration sheet beneath it) rather than
 * one box, so fixture copy and the CTA never fight the headline for
 * room. Headline type is sized in container-query units (`cqw`) off
 * the poster's own width, not the viewport — it can never overflow
 * its box no matter how the wall composition scales it.
 */
export default function LeaguePoster({ className = "" }: { className?: string }) {
  return (
    <div className={`group/league relative @container transition-transform duration-300 ease-out hover:-translate-y-1 ${className}`}>
      {/* Red masthead */}
      <div className="relative overflow-hidden bg-c7-red px-5 pt-5 pb-6 sm:px-6 sm:pt-6 sm:pb-7 shadow-[0_16px_36px_-16px_rgba(34,30,25,0.45)] ring-1 ring-inset ring-black/[0.06] transition-[filter,box-shadow] duration-300 ease-out group-hover/league:brightness-[0.94] group-hover/league:shadow-[0_24px_44px_-18px_rgba(34,30,25,0.55)]">
        <PaperGrain />
        <p className="font-display text-[clamp(0.8rem,4.5cqw,1.1rem)] uppercase tracking-tight text-c7-ink/90">
          Club<span className="text-c7-ink">7</span>
        </p>
        <p className="mt-2 font-display leading-[0.88] uppercase text-c7-ink text-[clamp(1.6rem,13cqw,2.9rem)]">
          Leagues
        </p>
        <p className="font-display leading-[0.88] uppercase text-c7-ink/70 text-[clamp(0.9rem,6cqw,1.4rem)]">
          &amp;
        </p>
        <p className="font-display leading-[0.88] uppercase text-c7-ink text-[clamp(1.6rem,13cqw,2.9rem)]">
          Tournaments
        </p>
      </div>

      {/* Attached fixture / registration sheet */}
      <div
        className="relative bg-c7-paper px-5 py-5 sm:px-6 sm:py-6 shadow-[0_16px_36px_-16px_rgba(34,30,25,0.4)] transition-shadow duration-300 ease-out group-hover/league:shadow-[0_22px_42px_-18px_rgba(34,30,25,0.5)]"
        style={{
          clipPath:
            "polygon(0% 0%,100% 0%,100% 96%,95% 98%,90% 96.2%,85% 98.3%,80% 96%,75% 98.5%,70% 96.3%,65% 98.8%,60% 96%,55% 99%,50% 96.2%,45% 98.6%,40% 96%,35% 99.1%,30% 96.3%,25% 98.7%,20% 96%,15% 99%,10% 96.2%,5% 98.4%,0% 96%)",
        }}
      >
        <PaperGrain />
        <div className="space-y-1.5">
          {["Form a Team.", "Enter the Draw.", "Play Under the Lights."].map((line) => (
            <p
              key={line}
              className="font-body text-[clamp(0.75rem,3.6cqw,0.9375rem)] font-medium uppercase tracking-[0.02em] text-c7-charcoal"
            >
              {line}
            </p>
          ))}
        </div>

        {/* Abstract fixture bracket — structural, not real results */}
        <div className="mt-5 flex items-end gap-2.5" aria-hidden="true">
          {BRACKET.map((label, i) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="w-px bg-c7-charcoal-dim/35" style={{ height: 8 + i * 6 }} />
              <span className="font-body text-[clamp(0.5rem,2.4cqw,0.5625rem)] tracking-[0.12em] uppercase text-c7-charcoal-dim whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <a
            href={whatsappHref(WHATSAPP_MESSAGES.tournament)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[clamp(0.75rem,3.6cqw,0.875rem)] font-medium uppercase tracking-[0.08em] text-c7-red transition-colors group-hover/league:text-c7-red-dim"
          >
            Register Interest <span aria-hidden="true">↗</span>
          </a>

          {/* Registration stamp — clarifies on hover */}
          <div
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-c7-red/35 -rotate-12 opacity-50 transition-opacity duration-300 group-hover/league:opacity-90"
            aria-hidden="true"
          >
            <span className="font-display text-[0.55rem] leading-none uppercase tracking-widest text-c7-red text-center">
              Club
              <br />7
            </span>
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="var(--color-c7-red)"
                strokeWidth="1"
                strokeDasharray="138"
                strokeDashoffset="138"
                className="transition-[stroke-dashoffset] duration-500 ease-out group-hover/league:[stroke-dashoffset:0]"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
