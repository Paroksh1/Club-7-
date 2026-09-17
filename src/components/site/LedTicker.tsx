const ITEMS = [
  "PLAY",
  "COMPETE",
  "GATHER",
  "CREATE",
  "PICKLEBALL",
  "AFTER DARK",
  "HORIZON × COURTPLAY",
  "GURGAON",
  "COURTPLAY",
];

function TickerRun() {
  return (
    <div className="flex shrink-0 items-center gap-6 whitespace-nowrap px-6">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-6">
          <span className="font-body text-tag tracking-[0.24em] text-c7-ink/80">
            {item}
          </span>
          <span className="text-c7-red/70" aria-hidden="true">
            {"///"}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function LedTicker({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden border-t border-c7-line/20 bg-c7-bg-1/90 backdrop-blur-[1px] ${className}`}
      role="marquee"
      aria-label="CourtPlay highlights"
    >
      <div className="flex w-max c7-anim-ticker py-2.5">
        <TickerRun />
        <TickerRun />
      </div>
    </div>
  );
}
