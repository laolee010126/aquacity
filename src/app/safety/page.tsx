import { Metadata } from "next";
import { Header } from "../components/Header";
import { SafetyRulesSection } from "../components/SafetyRulesSection";
import { Footer } from "../components/NewFooter";

export const metadata: Metadata = {
  title: "수영장 안전수칙 - 아쿠아시티",
  description: "아쿠아시티 수영장 이용 시 안전수칙입니다. 회원님의 안전을 위해 반드시 지켜주세요.",
};

export default function SafetyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <SafetyRulesSection />
      </main>
      <Footer />
    </div>
  );
}
