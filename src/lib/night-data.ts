export type NightMoment = {
  time: string;
  label: string;
  micro?: string;
  /** undefined only for a frame that's fully typographic */
  image?: { src: string; position: string; zoom: number; stock?: boolean };
  /** Colour temperature — sports beats stay cool/green-toned; the cafe
   * beat runs warm/amber to signal the shift from playing to hanging
   * out, then the closing aerial returns to the cool night register.
   * Defaults to "cool". */
  tone?: "cool" | "warm";
  /** small per-frame offset so the strip reads as editorial, not five
   * identical product tiles — keep this subtle */
  shift?: "up" | "down";
  /** desktop-row sizing variation — the visual arc (small → medium →
   * largest at "Last Goal" → medium → small) that gives the strip a
   * narrative rise and fall instead of five equal tiles. 'default'
   * when omitted. */
  size?: "narrow" | "tall" | "wide";
};

/**
 * A narrative timeline for one evening at Club 7 — art direction, not
 * operating hours or real event data.
 *
 * ARRIVE and STILL HERE use real Club 7 photography. WARM UP, LAST
 * GOAL and CAFE are TEMPORARY REPRESENTATIVE STOCK PHOTOGRAPHY
 * (Unsplash, royalty-free, stored locally in /public/stock) standing
 * in for real Club 7 imagery that doesn't exist yet — swap the `src`
 * on those three the moment real photos are available. Marked
 * `stock: true` so the component can apply a slightly stronger grade
 * to bring the stock shots into the same night register as the real
 * venue photos.
 */
export const NIGHT_MOMENTS: NightMoment[] = [
  {
    time: "8:02 PM",
    label: "Arrive",
    micro: "Sector 89",
    image: { src: "/venue/entrance-signage.jpg", position: "50% 30%", zoom: 1.15 },
    size: "narrow",
  },
  {
    time: "8:14 PM",
    label: "Warm Up",
    micro: "Lights On.",
    // TEMPORARY representative stock photo (Unsplash) — floodlit
    // recreational pitch, players warming up. Replace with real Club 7
    // pre-game photography when available.
    image: { src: "/stock/warmup-turf.jpg", position: "50% 62%", zoom: 1.35, stock: true },
    shift: "down",
    size: "tall",
  },
  {
    time: "9:03 PM",
    label: "Last Goal",
    micro: "+1?",
    // TEMPORARY representative stock photo (Unsplash) — genuine night
    // five-a-side match, floodlit artificial turf, small recreational
    // group, shot through the goal net. Replace with real Club 7 match
    // photography when available.
    image: { src: "/stock/last-goal-night.jpg", position: "38% 55%", zoom: 1.3, stock: true },
    size: "wide",
  },
  {
    time: "9:17 PM",
    label: "Cafe",
    // Was in-photo text ("Not Going Home Yet.") stacked on top of the
    // external "Cafe" caption right below it — redundant labelling of
    // the same beat. Now a single external micro-line, same pattern as
    // every other frame.
    micro: "Not Going Home Yet.",
    // TEMPORARY representative stock photo (Unsplash) — friends on a
    // porch at night under warm string lights, food incidental in the
    // foreground rather than the subject. Replace with real Club 7
    // cafe photography when available.
    image: { src: "/stock/cafe-porch.jpg", position: "50% 40%", zoom: 1.3, stock: true },
    tone: "warm",
    shift: "down",
  },
  {
    time: "10:06 PM",
    label: "Still Here.",
    image: { src: "/venue/night-aerial.jpg", position: "78% 30%", zoom: 1.9 },
    size: "narrow",
  },
];
