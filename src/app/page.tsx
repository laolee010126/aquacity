import { Header } from "./components/Header";
import { HeroSection } from "./components/NewHeroSection";
import { NewsSection } from "./components/NewsSection";
import { Footer } from "./components/NewFooter";


export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}
