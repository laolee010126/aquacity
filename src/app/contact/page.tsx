import { Metadata } from "next";
import { Header } from "../components/Header";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/NewFooter";

export const metadata: Metadata = {
  title: "연락처 & 위치 - 아쿠아시티",
  description: "아쿠아시티의 연락처, 주소, 운영시간 정보를 확인하세요. 광주 북구 서하로 82에 위치한 프리미엄 수영장입니다.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
