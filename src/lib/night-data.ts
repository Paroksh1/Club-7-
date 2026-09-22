export type NightMoment = {
  time: string;
  label: string;
  micro?: string;
  /** undefined for the cafe frame, which is typographic instead */
  image?: { src: string; position: string; zoom: number };
  cafe?: boolean;
};

/**
 * A narrative timeline for one evening at Club 7 — art direction, not
 * operating hours or real event data. Each image reuses a photo
 * already loaded elsewhere on the site, but through a distinct crop
 * (position + zoom) so it reads as its own fragment rather than a
 * repeated hero shot.
 */
export const NIGHT_MOMENTS: NightMoment[] = [
  {
    time: "8:02 PM",
    label: "Arrive",
    micro: "Sector 89",
    image: { src: "/venue/entrance-signage.jpg", position: "50% 20%", zoom: 1.6 },
  },
  {
    time: "8:14 PM",
    label: "Warm Up",
    image: { src: "/venue/turf-top-down-night.jpg", position: "85% 10%", zoom: 2.5 },
  },
  {
    time: "9:03 PM",
    label: "Last Goal",
    micro: "+1?",
    image: { src: "/venue/night-aerial.jpg", position: "72% 20%", zoom: 2 },
  },
  {
    time: "9:17 PM",
    label: "Cafe",
    cafe: true,
  },
  {
    time: "10:06 PM",
    label: "Still Here.",
    image: { src: "/venue/entrance-signage.jpg", position: "50% 78%", zoom: 1.2 },
  },
];
