"use client";

import { Button } from "./ui/button";
import { ImageWithFallback } from "./ImageWithFallback";
import { Flame, Droplets, Users } from "lucide-react";

export function HeroSection() {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('programs');
    if (programsSection) {
      const headerOffset = 80; // Approximate header height
      const elementPosition = programsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-20 pb-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              사우나 & 유수풀이 있는<br />
              <span className="text-blue-200">프리미엄 수영장</span>
            </h2>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start mb-6 md:mb-8">
              <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-blue-900 text-xs md:text-sm font-medium shadow-sm">
                <Flame className="w-3 h-3 md:w-4 md:h-4 text-orange-500" />
                사우나
              </div>
              <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-blue-900 text-xs md:text-sm font-medium shadow-sm">
                <Droplets className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                유수풀 시설
              </div>
              <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-blue-900 text-xs md:text-sm font-medium shadow-sm">
                <Users className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                전문 강사진
              </div>
            </div>

            <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-100">
              체계적인 수영강습과 프리미엄 부대시설로<br className="hidden md:block" />
              건강한 라이프스타일을 시작하세요
            </p>
          </div>
          
          <div className="relative order-first md:order-last">
            <ImageWithFallback 
              src="/images/infodesk.jpg"
              alt="수영장 전경"
              className="rounded-lg shadow-2xl w-full h-60 md:h-80 object-cover"
            />
            {/* <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white text-blue-600 p-4 md:p-6 rounded-lg shadow-lg">
              <div className="text-xl md:text-2xl font-bold">사우나</div>
              <div className="text-xs md:text-sm">호텔형 대형 사우나 이용 가능</div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
