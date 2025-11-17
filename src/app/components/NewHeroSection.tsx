"use client";

import { useState, useEffect } from "react";
import { ImageWithFallback } from "./ImageWithFallback";
import { Flame, Droplets, Users, Waves, Building2, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

const heroImages = [
  { src: "/images/infodesk.jpg", alt: "수영장 안내데스크" },
  { src: "/images/sauna2.jpg", alt: "사우나 시설" },
  { src: "/images/swinming-pool2.jpg", alt: "스위밍풀" },
  { src: "/images/infinite-pool1.jpg", alt: "인피니티풀" },
  { src: "/images/youth-pool2.jpg", alt: "유스풀" },
  { src: "/images/youth-pool3.jpg", alt: "유스풀 전경" },
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5초마다 이미지 변경

    return () => clearInterval(interval);
  }, []);

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
            {/* Image Slider */}
            <div className="relative overflow-hidden rounded-lg shadow-2xl w-full h-60 md:h-80">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`이미지 ${index + 1}로 이동`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 아쿠아시티 둘러보기 - 하단 카드 */}
        <div className="mt-8 md:mt-12">
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <Link
              href="/programs"
              className="group flex items-center gap-4 p-4 md:p-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-base md:text-lg">수영강습 프로그램</h3>
                <p className="text-blue-100 text-xs md:text-sm">단계별 체계적인 수영강습</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform hidden md:block" />
            </Link>

            <Link
              href="/facilities"
              className="group flex items-center gap-4 p-4 md:p-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-base md:text-lg">시설 안내</h3>
                <p className="text-blue-100 text-xs md:text-sm">프리미엄 시설 둘러보기</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform hidden md:block" />
            </Link>

            <Link
              href="/contact"
              className="group flex items-center gap-4 p-4 md:p-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-base md:text-lg">연락처 & 위치</h3>
                <p className="text-blue-100 text-xs md:text-sm">운영시간 및 오시는 길</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform hidden md:block" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
