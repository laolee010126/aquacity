import { Metadata } from "next";
import { Header } from "../components/Header";
import { PageHero } from "../components/PageHero";
import { ProgramsSection } from "../components/ProgramsSection";
import { Footer } from "../components/NewFooter";

export const metadata: Metadata = {
  title: "수영강습 프로그램 - 아쿠아시티",
  description: "전문 강사진과 함께하는 체계적인 수영강습으로 여러분의 수영 실력을 한 단계 올려보세요. 기초반부터 마스터즈까지 다양한 레벨의 프로그램을 제공합니다.",
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero
          title="수영강습 프로그램"
          description="전문 강사진과 함께하는 체계적인 수영강습으로 여러분의 수영 실력을 한 단계 올려보세요"
          gradient="from-blue-600 to-cyan-600"
        />
        <ProgramsSection />
      </main>
      <Footer />
    </div>
  );
}
