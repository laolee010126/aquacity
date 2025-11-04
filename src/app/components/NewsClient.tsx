'use client'

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Calendar } from "lucide-react"
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
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 서버에서 받은 데이터가 없으면 폴백 데이터 사용
  const newsData = initialNews.length > 0 ? initialNews : fallbackNews

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const openNewsModal = (news: NewsItem) => {
    setSelectedNews(news)
    setIsModalOpen(true)
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollLeft = container.scrollLeft
    const cardWidth = container.scrollWidth / newsData.length
    const index = Math.round(scrollLeft / cardWidth)

    setActiveIndex(Math.min(index, newsData.length - 1))
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [newsData.length])

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
        
        {/* 모바일 스크롤 */}
        <div className="md:hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 -mx-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {newsData.map((news) => (
              <div key={news.id} className="flex-shrink-0 w-[85vw] max-w-sm">
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
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

                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line line-clamp-4 mb-4 flex-1">
                      {news.content}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openNewsModal(news)}
                      className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      더보기
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* 위치 인디케이터 도트 */}
          <div className="flex justify-center mt-4 gap-2">
            {newsData.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`${index + 1}번째 소식`}
              />
            ))}
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
                    
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line line-clamp-4 mb-4 flex-1">
                        {news.content}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openNewsModal(news)}
                        className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      >
                        더보기
                      </Button>
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

      {/* 뉴스 상세 모달 */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          {selectedNews && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge className={categoryColors[selectedNews.category_color]}>
                    {selectedNews.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedNews.date)}</span>
                  </div>
                </div>
                <DialogTitle className="text-xl md:text-2xl text-left">
                  {selectedNews.title}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {selectedNews.content}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}