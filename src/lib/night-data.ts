export type NightMoment = {
  time: string;
  label: string;
  micro?: string;
  /** undefined only for a frame that's fully typographic */
  image?: { src: string; position: string; zoom: number; stock?: boolean };
  /** this frame carries the on-photo caption overlay instead of a micro line */
  overlay?: boolean;
  /** small per-frame offset so the strip reads as editorial, not five
   * identical product tiles — keep this subtle */
  shift?: "up" | "down";
  /** desktop-row sizing variation — same purpose as `shift`: breaks the
   * five-equal-cards feeling. 'default' when omitted. */
  size?: "narrow" | "tall" | "wide";
};

/**
 * A narrative timeline for one evening at CourtPlay — art direction,
 * not operating hours or real event data. All five images are
 * representative stock photography (Unsplash, royalty-free, stored
 * locally in /public/pickleball) standing in for real CourtPlay
 * photography — swap the `src` values the moment real photos are
 * available. Marked `stock: true` so the component can apply a
 * slightly stronger grade to bring all five into the same night
 * register.
 */
export const NIGHT_MOMENTS: NightMoment[] = [
  {
    time: "7:02 PM",
    label: "Arrive",
    micro: "Gurgaon",
    image: { src: "/pickleball/hero-wide.jpg", position: "50% 40%", zoom: 1.15, stock: true },
    size: "narrow",
  },
  {
    time: "7:18 PM",
    label: "First Rally",
    image: { src: "/pickleball/first-rally.jpg", position: "50% 45%", zoom: 1.2, stock: true },
    shift: "down",
    size: "tall",
  },
  {
    time: "8:11 PM",
    label: "Match Point",
    micro: "+1?",
    image: { src: "/pickleball/match-point.jpg", position: "50% 40%", zoom: 1.2, stock: true },
    size: "wide",
  },
  {
    time: "9:17 PM",
    label: "After Dark",
    image: { src: "/pickleball/social-floodlit.jpg", position: "50% 40%", zoom: 1.2, stock: true },
    overlay: true,
    shift: "down",
  },
  {
    time: "10:06 PM",
    label: "Still Here.",
    image: { src: "/pickleball/courtside-laughing.jpg", position: "50% 40%", zoom: 1.2, stock: true },
    size: "narrow",
  },
];
