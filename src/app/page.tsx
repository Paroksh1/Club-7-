import Hero from "@/components/hero/Hero";
import GroundSection from "@/components/ground/GroundSection";
import WallSection from "@/components/wall/WallSection";
import NightSection from "@/components/night/NightSection";
import YourMoveSection from "@/components/move/YourMoveSection";

export default function Home() {
  return (
    <>
      <Hero />
      <GroundSection />
      <WallSection />
      <NightSection />
      <YourMoveSection />
    </>
  );
}
