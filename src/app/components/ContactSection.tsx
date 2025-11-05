import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Phone, MapPin, Clock } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">연락처 &amp; 위치</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            언제든지 문의해 주세요. 친절하게 안내해 드리겠습니다.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  전화 문의
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600 mb-2">062-528-1300</p>
                <p className="text-muted-foreground">평일 06:00-21:00, 주말 06:00-9:00</p>
              </CardContent>
            </Card>



            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  오시는 길
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium mb-2">광주 북구 서하로 82</p>
                <Button variant="outline" size="sm">
                  지도에서 보기
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  운영 시간
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>평일</span>
                    <span className="font-medium">06:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>주말</span>
                    <span className="font-medium">06:00 - 09:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
