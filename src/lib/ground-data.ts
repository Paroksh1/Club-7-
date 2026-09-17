export type SportId = "play" | "compete" | "social";

export type SportConfig = {
  id: SportId;
  number: string;
  label: string;
  /** Only compete and social carry a state-specific headline — for
   * play (the default state) the section's own question stands in. */
  headline?: string[];
  annotations: string[];
  cta: string;
};

export const SPORTS: SportConfig[] = [
  {
    id: "play",
    number: "01",
    label: "Play",
    headline: ["Just", "Play."],
    annotations: ["Open Play", "Court Bookings", "Regular Games"],
    cta: "Book a Court",
  },
  {
    id: "compete",
    number: "02",
    label: "Compete",
    headline: ["Keep", "Score."],
    annotations: ["Structured Play", "Tournaments", "Competitive Games"],
    cta: "See Competition",
  },
  {
    id: "social",
    number: "03",
    label: "Social",
    headline: ["Stay", "After."],
    annotations: ["Social Nights", "Community Formats", "After-Hours Experiences"],
    cta: "See What's On",
  },
];

/**
 * DEMO/EDITORIAL PROGRAMMING ONLY — not a live booking feed and not
 * connected to any real-time system. Shows what a night at CourtPlay
 * looks like, not actual slot availability. No "live" indicator, no
 * pulse, no claim of real-time accuracy.
 */
export const TONIGHT_PROGRAMME: { time: string; program: string }[] = [
  { time: "7 PM", program: "Open Play" },
  { time: "8 PM", program: "Compete" },
  { time: "9 PM", program: "Social" },
  { time: "10 PM", program: "After Hours" },
  { time: "11 PM", program: "One More?" },
];
