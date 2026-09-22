export type PlaySportId = "football" | "cricket" | "pickleball";

export type PlaySport = {
  id: PlaySportId;
  number: string;
  name: string;
  descriptor: string;
  image: { src: string; position: string; alt: string; stock?: boolean };
};

/**
 * Section 1 of /play only needs enough to identify and preview each
 * sport — full detail (format, pricing, availability) belongs to
 * later sections that don't exist yet.
 *
 * Football's image is representative stock already used (and graded)
 * elsewhere on the site — flagged here, not hidden. Cricket and
 * Pickleball are real Club 7 photography; Pickleball is the weaker of
 * the two (empty daytime court) but it's the only pickleball asset
 * that exists — swap it the moment better photography is available.
 */
export const PLAY_SPORTS: PlaySport[] = [
  {
    id: "football",
    number: "01",
    name: "Football",
    descriptor: "7v7 / After Dark",
    image: {
      src: "/stock/last-goal-night.jpg",
      position: "40% 55%",
      alt: "Floodlit football match at night",
      stock: true,
    },
  },
  {
    id: "cricket",
    number: "02",
    name: "Box Cricket",
    descriptor: "Bring the Crew",
    image: {
      src: "/venue/turf-top-down-night.jpg",
      position: "65% 50%",
      alt: "Top-down view of Club 7's floodlit cricket pitch",
    },
  },
  {
    id: "pickleball",
    number: "03",
    name: "Pickleball",
    descriptor: "One More Game?",
    image: {
      src: "/venue/pickleball.jpg",
      position: "50% 55%",
      alt: "Club 7's pickleball court",
    },
  },
];
