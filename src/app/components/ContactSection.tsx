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
        
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
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
                <p className="text-2xl font-bold text-blue-600 mb-2">0507-1462-1368</p>
                <p className="text-muted-foreground">평일 09:00-21:00, 주말 09:00-18:00</p>
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
                    <span className="font-medium">06:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>토요일</span>
                    <span className="font-medium">06:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>일요일</span>
                    <span className="font-medium">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>정기휴무</span>
                    <span className="font-medium">매월 둘째주 월요일</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>위치 안내</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center mb-6">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>지도 영역</p>
                    <p className="text-sm">실제 서비스에서는 Google Maps나</p>
                    <p className="text-sm">네이버 지도가 표시됩니다</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">대중교통 이용시</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 지하철 9호선 신논현역 1번 출구 도보 8분</li>
                    <li>• 버스: 146, 740, 360번 테헤란로 정류장 하차</li>
                  </ul>
                  
                  <h4 className="font-medium mt-4">자가용 이용시</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 지하주차장 이용 (50대 주차 가능)</li>
                    <li>• 주차 요금: 최초 2시간 무료, 이후 시간당 1,000원</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
