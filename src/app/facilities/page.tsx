import { Metadata } from "next";
import { Header } from "../components/Header";
import { PageHero } from "../components/PageHero";
import { FacilitiesSection } from "../components/FacilitiesSection";
import { Footer } from "../components/NewFooter";

export const metadata: Metadata = {
  title: "시설 안내 - 아쿠아시티",
  description: "최신 시설과 쾌적한 환경에서 안전하게 수영을 즐기세요. 프리미엄 사우나, 유수풀을 포함한 다양한 편의시설을 확인하세요.",
};

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="시설 안내"
          description="최신 시설과 쾌적한 환경에서 안전하고 즐겁게 수영을 즐기세요"
          gradient="from-teal-600 to-green-600"
        />
        <FacilitiesSection />
      </main>
      <Footer />
    </div>
  );
}
