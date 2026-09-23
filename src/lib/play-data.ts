export type PlaySportId = "football" | "cricket" | "pickleball";

export type PlaySport = {
  id: PlaySportId;
  number: string;
  /** short form used in nav-style contexts (selector, CTA) */
  shortName: string;
  /** the panel's benefit headline, split across two display lines.
   * Plain ink, not automatically red — red is reserved for selection
   * and action, not every second heading line. */
  heading: [string, string];
  /** one supporting sentence — what this sport's booking flow actually does */
  line: string;
  /** 2-3 verified facts only — nothing invented */
  info: { label: string; value: string }[];
  image: {
    src: string;
    position: string;
    alt: string;
    stock?: boolean;
    /** How much cinematic correction this specific photo needs to
     * match the others — not tied to `stock`. Football's stock shot
     * and cricket's real top-down shot are both already reasonably
     * moody and share the same "moderate" grade; pickleball's real
     * photo is genuinely flat daylight (see note below) and needs
     * the much stronger "strong" day-for-night treatment to sit in
     * the same register, regardless of it being real Club 7 media. */
    grade?: "moderate" | "strong";
  };
};

/**
 * Every fact in `info` below already exists elsewhere on the site
 * (Hero, GroundSection/ground-data.ts) — nothing new is asserted
 * here. Pickleball genuinely only has one confirmed detail beyond
 * location; it stays at two info points rather than padding to three.
 *
 * Football's image is representative stock already used elsewhere on
 * the site (flagged via `stock: true`); Cricket and Pickleball are
 * real Club 7 photography. Pickleball's asset is the weakest of the
 * three (empty, flat daytime light) but it's the only one that
 * exists — swap it the moment better photography is available. Its
 * `grade: "strong"` is compensating for that source material, not a
 * statement that the photo itself is fine as shot.
 */
export const PLAY_SPORTS: PlaySport[] = [
  {
    id: "football",
    number: "01",
    shortName: "Football",
    heading: ["Make Time for", "a Proper Game."],
    line: "Get your side together and choose a time to play.",
    info: [
      { label: "Format", value: "7-a-side" },
      { label: "Setting", value: "Under the Lights" },
      { label: "Location", value: "Sector 89" },
    ],
    image: {
      src: "/stock/last-goal-night.jpg",
      position: "40% 55%",
      alt: "Floodlit football match at night, Club 7",
      stock: true,
      grade: "moderate",
    },
  },
  {
    id: "cricket",
    number: "02",
    shortName: "Box Cricket",
    heading: ["Settle It", "on the Pitch."],
    line: "Bring the batting order. We'll help you check a turf slot.",
    info: [
      { label: "Format", value: "Box Cricket" },
      { label: "Turfs", value: "2 Turfs" },
      { label: "Location", value: "Sector 89" },
    ],
    image: {
      src: "/venue/turf-top-down-night.jpg",
      position: "65% 50%",
      alt: "Top-down view of Club 7's floodlit cricket pitch at night",
      grade: "moderate",
    },
  },
  {
    id: "pickleball",
    number: "03",
    shortName: "Pickleball",
    heading: ["Meet You", "Across the Net."],
    line: "Arrange a game with friends and enquire about court time.",
    info: [
      { label: "Level", value: "Beginner Friendly" },
      { label: "Location", value: "Sector 89" },
    ],
    image: {
      src: "/venue/pickleball.jpg",
      position: "50% 55%",
      alt: "Club 7's floodlit pickleball court at night",
      grade: "strong",
    },
  },
];
