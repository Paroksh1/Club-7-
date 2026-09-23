const ITEMS = [
  "OPEN 24 HOURS",
  "2 CRICKET TURFS",
  "FOOTBALL",
  "PICKLEBALL",
  "CAFE",
  "SECTOR 89",
  "CLUB 7",
];

function TickerRun() {
  return (
    <div className="flex shrink-0 items-center gap-6 whitespace-nowrap px-6">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-6">
          <span className="font-body text-[0.6875rem] tracking-[0.2em] text-c7-ink/60">
            {item}
          </span>
          <span className="text-c7-red/50" aria-hidden="true">
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
      className={`relative overflow-hidden border-t border-c7-line/15 bg-c7-bg-1/90 backdrop-blur-[1px] ${className}`}
      role="marquee"
      aria-label="Club 7 highlights"
    >
      <div className="flex w-max c7-anim-ticker py-2">
        <TickerRun />
        <TickerRun />
      </div>
    </div>
  );
}
