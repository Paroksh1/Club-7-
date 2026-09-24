import type { PlaySportId } from "@/lib/play-data";

/**
 * A small illustrative diagram, not a measured venue plan — explicitly
 * schematic (thin lines, no dimensions/labels claiming accuracy).
 * Fades in and briefly re-draws its lines (reusing the same
 * c7-anim-grow-x/y keyframes as the homepage's field overlays) whenever
 * the sport changes; `key={sportId}` on the caller remounts it so the
 * reveal replays cleanly instead of trying to morph one shape into
 * another.
 */
export function SportDiagram({ sportId }: { sportId: PlaySportId }) {
  const common = "h-full w-full text-c7-ink/70";

  if (sportId === "football") {
    return (
      <svg aria-hidden="true" viewBox="0 0 200 140" fill="none" className={common}>
        <rect x="10" y="10" width="180" height="120" stroke="currentColor" strokeWidth="1.5" className="c7-anim-reveal" />
        <circle cx="100" cy="70" r="22" stroke="currentColor" strokeWidth="1" className="c7-anim-reveal" style={{ animationDelay: "80ms" }} />
        <path d="M10 45 H40 V95 H10" stroke="currentColor" strokeWidth="1" className="c7-anim-grow-x" style={{ animationDelay: "140ms" }} />
        <path d="M190 45 H160 V95 H190" stroke="currentColor" strokeWidth="1" className="c7-anim-grow-x" style={{ animationDelay: "200ms" }} />
        <line x1="100" y1="10" x2="100" y2="130" stroke="currentColor" strokeWidth="1" className="c7-anim-grow-y" style={{ animationDelay: "100ms" }} />
      </svg>
    );
  }

  if (sportId === "cricket") {
    return (
      <svg aria-hidden="true" viewBox="0 0 200 140" fill="none" className={common}>
        <rect x="10" y="10" width="180" height="120" stroke="currentColor" strokeWidth="1.5" className="c7-anim-reveal" />
        <rect x="82" y="30" width="36" height="80" stroke="currentColor" strokeWidth="1" className="c7-anim-reveal" style={{ animationDelay: "80ms" }} />
        <path d="M84 34 V40 M92 34 V40 M100 34 V40 M108 34 V40 M116 34 V40" stroke="currentColor" strokeWidth="1" className="c7-anim-reveal" style={{ animationDelay: "160ms" }} />
        <path d="M84 100 V106 M92 100 V106 M100 100 V106 M108 100 V106 M116 100 V106" stroke="currentColor" strokeWidth="1" className="c7-anim-reveal" style={{ animationDelay: "200ms" }} />
        <line x1="82" y1="70" x2="118" y2="70" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 3" className="c7-anim-grow-x" style={{ animationDelay: "120ms" }} />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 200 140" fill="none" className={common}>
      <rect x="10" y="10" width="180" height="120" stroke="currentColor" strokeWidth="1.5" className="c7-anim-reveal" />
      <line x1="100" y1="10" x2="100" y2="130" stroke="currentColor" strokeWidth="1.25" className="c7-anim-grow-y" style={{ animationDelay: "100ms" }} />
      <path d="M10 46 H190" stroke="currentColor" strokeWidth="0.75" className="c7-anim-grow-x" style={{ animationDelay: "160ms" }} />
      <path d="M10 94 H190" stroke="currentColor" strokeWidth="0.75" className="c7-anim-grow-x" style={{ animationDelay: "200ms" }} />
    </svg>
  );
}
