import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Waves, Building2 } from "lucide-react";

const quickLinks = [
  {
    title: "수영강습 프로그램",
    description: "전문 강사진과 함께하는 체계적인 수영강습, 기초반부터 마스터즈까지 다양한 레벨의 프로그램을 제공합니다.",
    href: "/programs",
    icon: Waves,
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50"
  },
  {
    title: "시설 안내",
    description: "최신 시설과 쾌적한 환경, 프리미엄 사우나와 유수풀을 포함한 다양한 편의시설을 확인하세요.",
    href: "/facilities",
    icon: Building2,
    gradient: "from-teal-500 to-green-500",
    bgColor: "bg-teal-50"
  }
];

export function QuickLinksSection() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">아쿠아시티 둘러보기</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            더 자세한 정보를 원하시나요? 각 섹션을 방문하여 상세 정보를 확인하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link key={index} href={link.href} className="group">
                <Card className={`h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 hover:border-blue-200 ${link.bgColor}`}>
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                          {link.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                      {link.description}
                    </p>

                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
                    >
                      자세히 보기
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
