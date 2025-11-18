"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Waves, Bath, Car, Wifi, Flame, Droplets, Infinity, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

// Featured premium facilities with multiple images
const premiumFacilities = [
  {
    icon: Waves,
    title: "메인 수영장",
    description: "25m x 15m 규격의 메인 수영장으로 6개 레인을 갖추고 있습니다.",
    images: ["/images/swimming-pool.jpg", "/images/swinming-pool1.jpg", "/images/swinming-pool2.jpg"],
    color: "blue"
  },
  {
    icon: Flame,
    title: "사우나시설",
    description: "고급스러운 사우나와 스파 시설로 수영 후 완벽한 휴식을 제공합니다.",
    images: ["/images/sauna1.jpg", "/images/sauna2.jpg", "/images/sauna3.jpg"],
    color: "orange"
  },
  {
    icon: Droplets,
    title: "유스풀 시설",
    description: "어린이와 청소년을 위한 안전하고 재미있는 수영 공간입니다.",
    images: ["/images/youth-pool1.jpg", "/images/youth-pool2.jpg"],
    color: "cyan"
  },
  {
    icon: Infinity,
    title: "인피니티풀",
    description: "탁 트인 전망과 함께 즐기는 프리미엄 인피니티 풀 경험을 제공합니다.",
    images: ["/images/infinite-pool1.jpg"],
    color: "purple"
  }
];

// Regular facilities
const facilities = [
  {
    icon: Bath,
    title: "샤워실",
    description: "넓고 깨끗한 남녀 분리 샤워실과 탈의실을 제공합니다."
  },
  {
    icon: Car,
    title: "주차장",
    description: "지하 주차장 50대 규모로 편리한 주차 공간을 제공합니다."
  },
  {
    icon: Wifi,
    title: "무료 WiFi",
    description: "센터 전체에서 고속 무선인터넷을 무료로 이용하실 수 있습니다."
  }
];

// Image slider component for each facility card
function FacilityImageSlider({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-48 md:h-64 overflow-hidden group">
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ImageWithFallback
            src={image}
            alt={`${title} ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Navigation buttons - only show if more than 1 image */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="이전 이미지"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="다음 이미지"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`이미지 ${index + 1}로 이동`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function FacilitiesSection() {
  return (
    <section id="facilities" className="pt-24 pb-20 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">시설 안내</h2>
          <p className="text-xl text-muted-foreground">
            최신 시설과 쾌적한 환경에서 안전하게 수영을 즐기세요
          </p>
        </div>

        {/* Premium Featured Facilities - 4 cards with image sliders */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {premiumFacilities.map((facility, index) => {
              const Icon = facility.icon;
              const colorClasses =
                facility.color === "orange" ? "bg-orange-50 border-orange-100 hover:border-orange-200" :
                facility.color === "blue" ? "bg-blue-50 border-blue-100 hover:border-blue-200" :
                facility.color === "cyan" ? "bg-cyan-50 border-cyan-100 hover:border-cyan-200" :
                "bg-purple-50 border-purple-100 hover:border-purple-200";

              const iconColorClasses =
                facility.color === "orange" ? "bg-orange-500" :
                facility.color === "blue" ? "bg-blue-500" :
                facility.color === "cyan" ? "bg-cyan-500" :
                "bg-purple-500";

              return (
                <Card
                  key={index}
                  className={`overflow-hidden border-2 transition-all hover:shadow-xl ${colorClasses}`}
                >
                  <div className="relative">
                    <FacilityImageSlider
                      images={facility.images}
                      title={facility.title}
                    />
                    <div className={`absolute top-4 right-4 w-12 h-12 ${iconColorClasses} rounded-full flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                      {facility.title}
                    </h4>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {facility.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Regular facilities grid */}
        <div>
          <h3 className="text-xl font-bold text-center mb-8">기타 편의시설</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-base md:text-lg">{facility.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-xs md:text-sm">{facility.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
