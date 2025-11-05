import { Header } from "./components/Header";
import { HeroSection } from "./components/NewHeroSection";
import { ProgramsSection } from "./components/ProgramsSection";
import { FacilitiesSection } from "./components/FacilitiesSection";
import { NewsSection } from "./components/NewsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/NewFooter";


export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <NewsSection />
        <ProgramsSection />
        <FacilitiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
