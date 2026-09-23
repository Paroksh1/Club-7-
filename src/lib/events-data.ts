import type { NightMoment } from "./night-data";

/**
 * A parallel evening timeline to the homepage's NIGHT_MOMENTS, art-
 * directed for an event night specifically (arrival through to the
 * cafe/cake wind-down) rather than a regular booking night. Reuses the
 * same FilmFrame component and grading system so it reads as the same
 * visual world, not a new pattern.
 *
 * The project's whole photo library is eight images and only three
 * (entrance-signage, last-goal-night, cafe-porch) show people. Food /
 * Cake / Hang reuses cafe-porch.jpg on a different crop rather than
 * inventing a fourth "food" photo that doesn't exist — the same
 * technique already used elsewhere on the site (BirthdayStrip's two
 * different crops of entrance-signage.jpg). Swap any `src` the moment
 * real event photography exists; the layout doesn't need to change.
 */
export const EVENT_NIGHT_MOMENTS: NightMoment[] = [
  {
    time: "7:30 PM",
    label: "Arrive",
    micro: "Sector 89",
    image: { src: "/venue/entrance-signage.jpg", position: "50% 30%", zoom: 1.15 },
    size: "narrow",
  },
  {
    time: "7:45 PM",
    label: "Game On",
    micro: "Whole Crew In.",
    image: { src: "/stock/last-goal-night.jpg", position: "40% 55%", zoom: 1.25, stock: true },
    size: "wide",
  },
  {
    time: "9:00 PM",
    label: "Cafe",
    micro: "Drinks, Down Tools.",
    image: { src: "/stock/cafe-porch.jpg", position: "48% 36%", zoom: 1.2, stock: true },
    tone: "warm",
    shift: "down",
    size: "tall",
  },
  {
    time: "9:30 PM",
    label: "Food / Cake / Hang",
    micro: "Nobody's Rushing Home.",
    image: { src: "/stock/cafe-porch.jpg", position: "70% 64%", zoom: 1.8, stock: true },
    tone: "warm",
    size: "narrow",
  },
];
