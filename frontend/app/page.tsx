import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import FourSquareCardsSection from "./components/sections/FourSquareCardsSection";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FourSquareCardsSection />
    </main>
  );
}