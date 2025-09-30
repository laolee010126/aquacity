'use client'

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { NewsItem } from "@/types/database"

// 기본 뉴스 데이터 (DB 연결 실패 시 폴백)
const fallbackNews: NewsItem[] = [
  {
    id: '1',
    title: "2024년 겨울 특강 프로그램 안내",
    content: "12월부터 2월까지 진행되는 겨울 특강 프로그램을 안내드립니다. 초급자를 위한 집중반과 상급자를 위한 기록 향상반이 운영됩니다.",
    date: "2024-11-15",
    category: "프로그램",
    category_color: "blue",
    is_published: true,
    created_at: "2024-11-15T00:00:00Z",
    updated_at: "2024-11-15T00:00:00Z"
  },
  {
    id: '2',
    title: "수영장 시설 개선 공사 완료",
    content: "더욱 쾌적한 환경에서 수영을 즐기실 수 있도록 탈의실과 샤워실 리모델링이 완료되었습니다. 새로운 시설을 확인해보세요!",
    date: "2024-11-10",
    category: "시설",
    category_color: "green",
    is_published: true,
    created_at: "2024-11-10T00:00:00Z",
    updated_at: "2024-11-10T00:00:00Z"
  },
  {
    id: '3',
    title: "11월 수영 대회 결과 발표",
    content: "지난 11월 5일 열린 아쿠아시티 자체 수영 대회에서 우수한 성과를 거둔 회원분들을 축하합니다. 시상식은 11월 20일 예정입니다.",
    date: "2024-11-08",
    category: "이벤트",
    category_color: "yellow",
    is_published: true,
    created_at: "2024-11-08T00:00:00Z",
    updated_at: "2024-11-08T00:00:00Z"
  },
  {
    id: '4',
    title: "연말연시 운영시간 변경 안내",
    content: "12월 24일~25일, 12월 31일~1월 1일은 휴무이며, 12월 23일과 12월 30일은 오후 6시까지 운영합니다.",
    date: "2024-11-05",
    category: "공지",
    category_color: "red",
    is_published: true,
    created_at: "2024-11-05T00:00:00Z",
    updated_at: "2024-11-05T00:00:00Z"
  },
  {
    id: '5',
    title: "신규 강사진 소개",
    content: "수중 에어로빅 전문가 김아쿠아 강사님과 자유형 전문 박스트로크 코치님이 새롭게 합류하셨습니다. 많은 관심 부탁드립니다.",
    date: "2024-11-01",
    category: "강사진",
    category_color: "purple",
    is_published: true,
    created_at: "2024-11-01T00:00:00Z",
    updated_at: "2024-11-01T00:00:00Z"
  },
  {
    id: '6',
    title: "10월 수영 교실 수료식",
    content: "10월 수영 교실을 성공적으로 완주한 수강생분들의 수료식이 있었습니다. 11월 새 기수 모집도 진행 중입니다.",
    date: "2024-10-28",
    category: "이벤트",
    category_color: "yellow",
    is_published: true,
    created_at: "2024-10-28T00:00:00Z",
    updated_at: "2024-10-28T00:00:00Z"
  }
]

const categoryColors = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800", 
  yellow: "bg-yellow-100 text-yellow-800",
  red: "bg-red-100 text-red-800",
  purple: "bg-purple-100 text-purple-800"
}

interface NewsClientProps {
  initialNews: NewsItem[]
}

export function NewsClient({ initialNews }: NewsClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // 서버에서 받은 데이터가 없으면 폴백 데이터 사용
  const newsData = initialNews.length > 0 ? initialNews : fallbackNews

  // 자동 슬라이드 (모바일에서 3초마다)
  useEffect(() => {
    if (newsData.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsData.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [newsData.length])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsData.length) % newsData.length)
  }

  if (newsData.length === 0) {
    return (
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">소식 및 공지사항</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              현재 등록된 소식이 없습니다.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">소식 및 공지사항</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            아쿠아시티의 최신 소식과 중요한 공지사항을 확인하세요
          </p>
        </div>
        
        {/* 모바일 캐러셀 */}
        <div className="md:hidden">
          <div className="relative">
            {/* 캐러셀 컨테이너 */}
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {newsData.map((news) => (
                  <div key={news.id} className="w-full flex-shrink-0 px-2">
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={categoryColors[news.category_color]}>
                            {news.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span className="text-xs">{formatDate(news.date)}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg leading-tight">{news.title}</CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {news.content}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 네비게이션 버튼 */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md"
              aria-label="이전 소식"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md"
              aria-label="다음 소식"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* 인디케이터 도트 */}
            <div className="flex justify-center mt-4 gap-2">
              {newsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`${index + 1}번째 소식으로 이동`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 데스크톱 한 줄 스크롤 */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {newsData.map((news) => (
                <div key={news.id} className="flex-shrink-0 w-80">
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={categoryColors[news.category_color]}>
                          {news.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs">{formatDate(news.date)}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl leading-tight">{news.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="flex-1">
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {news.content}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 md:mt-12">
          <p className="text-muted-foreground text-sm">
            더 많은 소식은 수영장 안내데스크에서 확인하실 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  )
}