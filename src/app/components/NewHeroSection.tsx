import { Button } from "./ui/button";
import { ImageWithFallback } from "./ImageWithFallback";

export function HeroSection() {
  return (
    <section id="home" className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              깨끗하고 안전한<br />
              프리미엄 수영장
            </h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-100">
              {'전문 강사진과 함께하는 체계적인 수영강습으로\n건강한 라이프스타일을 시작하세요'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto sm:px-8">
                수강신청 하기
              </Button>
            
            </div>
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
