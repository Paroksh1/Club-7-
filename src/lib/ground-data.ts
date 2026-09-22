export type SportId = "cricket" | "football" | "pickleball";

export type SportConfig = {
  id: SportId;
  number: string;
  label: string;
  /** Only football and pickleball carry a state-specific headline — for
   * cricket (the default state) the section's own question stands in. */
  headline?: string[];
  annotations: string[];
  cta: string;
};

export const SPORTS: SportConfig[] = [
  {
    id: "cricket",
    number: "01",
    label: "Cricket",
    annotations: ["2 Turfs", "Box Cricket", "Open 24 Hours"],
    cta: "Check Cricket Slots",
  },
  {
    id: "football",
    number: "02",
    label: "Football",
    headline: ["7-a-side", "Football"],
    annotations: ["Under the Lights", "Open 24 Hours"],
    cta: "Check Football Slots",
  },
  {
    id: "pickleball",
    number: "03",
    label: "Pickleball",
    headline: ["New to it?", "Come anyway."],
    annotations: ["Beginner Friendly"],
    cta: "Check Pickleball Slots",
  },
];

/**
 * DEMO DATA ONLY. Standing in for a future live availability feed —
 * not connected to any booking system. Do not present this as
 * real-time in copy or UI treatment (no "live" indicator, no pulse).
 * Replace this array with an API response when the booking system
 * exists; the shape below (`time`, `open`) is what the UI expects.
 */
export const DEMO_AVAILABILITY: { time: string; open: boolean }[] = [
  { time: "7 PM", open: true },
  { time: "8 PM", open: false },
  { time: "9 PM", open: true },
  { time: "10 PM", open: true },
  { time: "11 PM", open: false },
];
