export type HotspotId = "cricket" | "football" | "pickleball" | "cafe";

export type Hotspot = {
  id: HotspotId;
  label: string;
  /** Percentage position of the marker over the aerial photo — eyeballed
   * against the source image, the same "tuned visually, not computed"
   * approach already used for the pitch/field overlays elsewhere on
   * this page. Explicitly illustrative, not a surveyed site plan. */
  x: number;
  y: number;
  /** Approximate boundary rectangle traced when this hotspot is active —
   * same illustrative-overlay language as the marker position. */
  box: { left: number; top: number; width: number; height: number };
  fact: string;
  image: { src: string; alt: string; position: string };
  /** Sport pages don't have a dedicated café route */
  playHref?: string;
};

export const HOTSPOTS: Hotspot[] = [
  {
    id: "cricket",
    label: "Cricket Turf",
    x: 46,
    y: 52,
    box: { left: 30, top: 38, width: 34, height: 30 },
    fact: "Two turfs, shared with football on the same ground.",
    image: { src: "/venue/turf-top-down-night.jpg", alt: "Top-down view of Club 7's floodlit cricket turf at night", position: "65% 50%" },
    playHref: "/play?sport=cricket",
  },
  {
    id: "football",
    label: "Football Area",
    x: 52,
    y: 46,
    box: { left: 30, top: 38, width: 34, height: 30 },
    fact: "Marked out on the same turf as box cricket, not a separate pitch.",
    image: { src: "/stock/last-goal-night.jpg", alt: "Floodlit football match at night, Club 7", position: "40% 55%" },
    playHref: "/play?sport=football",
  },
  {
    id: "pickleball",
    label: "Pickleball Court",
    x: 74,
    y: 64,
    box: { left: 66, top: 56, width: 20, height: 16 },
    fact: "A dedicated court, separate from the main turf.",
    image: { src: "/venue/pickleball.jpg", alt: "Club 7's floodlit pickleball court at night", position: "50% 55%" },
    playHref: "/play?sport=pickleball",
  },
  {
    id: "cafe",
    label: "Café",
    x: 22,
    y: 34,
    box: { left: 14, top: 24, width: 18, height: 16 },
    fact: "On-site, for after the game.",
    image: { src: "/stock/cafe-porch.jpg", alt: "Friends gathered together at night at Club 7", position: "50% 38%" },
  },
];
