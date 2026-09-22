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
