/**
 * Extremely subtle paper grain — a tiny fractal-noise SVG tiled at low
 * opacity over multiply, shared by all four wall artefacts so the
 * "tactile paper" quality reads as one consistent material rather than
 * four differently-treated surfaces. Deliberately near-invisible: this
 * is a zine/campaign board detail, not a scrapbook texture.
 */
export default function PaperGrain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mix-blend-multiply"
      style={{
        opacity: 0.04,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "140px 140px",
      }}
    />
  );
}
