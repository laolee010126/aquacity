import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { AlertTriangle, ClipboardCheck, Shirt, Activity, Ban } from "lucide-react"

export function SafetyRulesSection() {
  return (
      <section className="pt-24 md:pt-20 pb-12 md:pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* 경고 메시지 */}
          <div className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-amber-900 mb-2">중요 안내사항</h3>
                <p className="text-amber-800 leading-relaxed">
                  아래의 수칙을 위반 시 발생되는 사고에 대하여 아쿠아시티는 일체 책임지지 않으며 이용을 제한할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 수영 전 준수사항 */}
          <Card className="mb-8 border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="bg-blue-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">수영 전 준수사항</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <p className="text-muted-foreground leading-relaxed">귀중품은 반드시 별도의 장소에 보관 하여야 하며 분실 책임은 이용자에게 있습니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <p className="text-muted-foreground leading-relaxed">수영하기 전 반드시 샤워장에서 샤워한 후 수영장에 입장하여야 합니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <p className="text-muted-foreground leading-relaxed">풀에 들어가기 전 간단한 준비운동을 하여야 합니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <p className="text-muted-foreground leading-relaxed">수영장에 들어갈 때는 용변을 본 후 입장하여야 합니다.</p>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 복장/장비규정 */}
          <Card className="mb-8 border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="bg-purple-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <Shirt className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">복장/장비규정</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <p className="text-muted-foreground leading-relaxed">수영하기 전 반드시 <strong className="text-foreground">수영모를 착용</strong> 하여야 합니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="text-muted-foreground leading-relaxed">
                    <p className="mb-2"><strong className="text-foreground">수영복 이외의 복장은 착용을 금지합니다.</strong></p>
                    <div className="ml-4 space-y-1 text-sm">
                      <p>• 남자: 구명조끼, 트렁크 팬츠, 비치웨어 및 상의(면T, 슈트), 일반 사복</p>
                      <p>• 여자: 구명조끼, 비키니, 랩 스커트, 민소매T셔츠 및 비치웨어, 일반 사복</p>
                    </div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <p className="text-muted-foreground leading-relaxed">수영장에서는 고무튜브, 스노클 등의 기타 장비를 사용하여서는 안 됩니다.</p>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 수영장 이용 중 */}
          <Card className="mb-8 border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="bg-green-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">수영장 이용 중</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <p className="text-muted-foreground leading-relaxed">수영장 풀 안에서 침을 뱉거나 코를 푸는 등의 물을 오염시키는 행위는 삼가야 합니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <p className="text-muted-foreground leading-relaxed">수영 중 몸이 떨리고 소름이 끼치며 추워질 때, 눈이 충혈 시에는 즉시 수영을 중지 하여야 합니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <p className="text-muted-foreground leading-relaxed">체력관리상 1시간 이상 수영을 하지 말아야 합니다. <span className="text-foreground font-medium">(50분 수영, 10분 휴식)</span></p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <p className="text-muted-foreground leading-relaxed">수영장 내에서는 함부로 뛰거나, 다이빙 등의 행위를 금지하며 수영 후 반드시 눈을 깨끗이 씻어야 합니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <p className="text-muted-foreground leading-relaxed">수영장 내에서는 안전을 위하여 지도강사의 통제에 따라야 하며 이를 어길시에는 퇴장, 경고 조치를 취할 수 있습니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  <p className="text-muted-foreground leading-relaxed">수업 이외의 목적으로 스타트대를 이용할 수 없습니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">7</span>
                  <p className="text-muted-foreground leading-relaxed">수영장과 다이빙풀장은 상호 이동하면서 중복 사용할 수 없습니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">8</span>
                  <p className="text-muted-foreground leading-relaxed">수영장 바닥 및 벤치에 눕지 말아야 합니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">9</span>
                  <p className="text-muted-foreground leading-relaxed">배정된 강습레인 및 자유이용레인을 준수하여야 합니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">10</span>
                  <p className="text-muted-foreground leading-relaxed">수영 중 앞사람을 추월하는 행동은 안전사고를 유발할 수 있으니 삼가 주시기 바랍니다.</p>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 제한사항 */}
          <Card className="mb-8 border-2 border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="bg-red-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Ban className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-red-900">제한사항</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <p className="text-muted-foreground leading-relaxed"><strong className="text-red-700">눈병, 피부병 등 전염성 질병</strong>이 있는 분들은 수영장을 이용할 수 없습니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <p className="text-muted-foreground leading-relaxed"><strong className="text-red-700">음주 후</strong>에는 절대 풀 안에 들어갈 수 없습니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="text-muted-foreground leading-relaxed">
                    <p className="mb-1"><strong className="text-red-700">미취학아동 및 키 140cm 이하의 어린이</strong>는 수영장에 입장할 수 없습니다.</p>
                    <p className="text-sm ml-4">• 취학 어린이 중 키 140cm 미만은 보호자 동반 시 입장가능</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <p className="text-muted-foreground leading-relaxed">위생적이고 안전한 수질관리를 위하여 <strong className="text-red-700">대소변을 가릴 수 없는 이용자</strong>는 출입 및 이용을 제한합니다.</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <p className="text-muted-foreground leading-relaxed"><strong className="text-red-700">오일, 팩 등</strong>은 미끄러져 다칠 우려가 있으므로 샤워장, 사우나 등에서 절대 사용해선 안됩니다.</p>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 하단 안내 */}
          <div className="text-center mt-12 p-6 bg-blue-50 rounded-lg">
            <p className="text-blue-900 leading-relaxed">
              안전수칙을 준수하여 즐겁고 안전한 수영을 즐기시기 바랍니다.<br />
              문의사항이 있으시면 프론트 데스크로 연락 주시기 바랍니다.
            </p>
          </div>
        </div>
      </section>
  )
}
