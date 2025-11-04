import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Waves, Bath, Car, Wifi, Flame, Droplets } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

// Featured premium facilities
const premiumFacilities = [
  {
    icon: Flame,
    title: "사우나시설",
    description: "고급스러운 사우나와 스파 시설로 수영 후 완벽한 휴식을 제공합니다. 남녀 분리된 대형 사우나에서 편안한 시간을 보내실 수 있습니다.",
    image: "/images/sauna.jpg", // 실제 사우나 이미지 경로로 교체해주세요
    color: "orange"
  },
  {
    icon: Droplets,
    title: "유수풀 시설",
    description: "물의 흐름을 이용한 유수풀로 재미와 운동 효과를 동시에 누리실 수 있습니다. 가족 모두가 즐길 수 있는 특별한 시설입니다.",
    image: "/images/water-pool.jpg", // 실제 유수풀 이미지 경로로 교체해주세요
    color: "blue"
  }
];

// Regular facilities
const facilities = [
  {
    icon: Waves,
    title: "메인 수영장",
    description: "25m x 15m 규격의 메인 수영장으로 6개 레인을 갖추고 있습니다."
  },
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

export function FacilitiesSection() {
  return (
    <section id="facilities" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">시설 안내</h2>
          <p className="text-xl text-muted-foreground">
            최신 시설과 쾌적한 환경에서 안전하게 수영을 즐기세요
          </p>
        </div>

        {/* Pool showcase section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop"
              alt="아쿠아시티 메인 수영장"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">프리미엄 수영장 시설</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">정밀 수질 관리</h4>
                  <p className="text-muted-foreground text-sm">최신 정수 시설로 항상 깨끗하고 안전한 물을 유지합니다</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">적정 수온 유지</h4>
                  <p className="text-muted-foreground text-sm">연중 28-30도의 쾌적한 수온을 유지합니다</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">넓은 수영 공간</h4>
                  <p className="text-muted-foreground text-sm">여유로운 레인 운영으로 쾌적한 수영 환경을 제공합니다</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Featured Facilities */}
        <div className="mb-16">
          <div className="grid grid-cols-2 gap-4 md:gap-8 mb-12">
            {premiumFacilities.map((facility, index) => {
              const Icon = facility.icon;
              const colorClasses = facility.color === "orange"
                ? "bg-orange-50 border-orange-100 hover:border-orange-200"
                : "bg-blue-50 border-blue-100 hover:border-blue-200";
              const iconColorClasses = facility.color === "orange"
                ? "bg-orange-500"
                : "bg-blue-500";

              return (
                <Card
                  key={index}
                  className={`overflow-hidden border-2 transition-all hover:shadow-xl ${colorClasses}`}
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <ImageWithFallback
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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