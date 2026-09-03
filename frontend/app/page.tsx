import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import FourSquareCardsSection from "./components/sections/FourSquareCardsSection";
import FeaturedBatteryProject from "./components/sections/FeaturedBatteryProject";
import FeaturedSolarProject from "./components/sections/FeaturedSolarProject";



export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FourSquareCardsSection />
      <FeaturedBatteryProject />
      <FeaturedSolarProject />
    </main>
  );
}