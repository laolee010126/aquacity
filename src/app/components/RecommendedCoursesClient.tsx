'use client'

import { useState, useRef, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ImageWithFallback } from "./ImageWithFallback"
import { useRouter } from "next/navigation"

interface Course {
  id: string
  title: string
  description: string
  imageUrl: string
}

interface RecommendedCoursesClientProps {
  courses: Course[]
}

export function RecommendedCoursesClient({ courses }: RecommendedCoursesClientProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollLeft = container.scrollLeft
    const cardWidth = container.scrollWidth / courses.length
    const index = Math.round(scrollLeft / cardWidth)

    setActiveIndex(Math.min(index, courses.length - 1))
  }, [courses.length])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleCourseClick = () => {
    router.push('/programs')
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">추천강좌</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            아쿠아시티에서 인기 있는 프로그램을 만나보세요
          </p>
        </div>

        {/* 모바일 스크롤 */}
        <div className="md:hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 -mx-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {courses.map((course) => (
              <div key={course.id} className="flex-shrink-0 w-[85vw] max-w-sm">
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                  onClick={handleCourseClick}
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                      {course.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      자세히 보기
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* 위치 인디케이터 도트 */}
          <div className="flex justify-center mt-4 gap-2">
            {courses.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`${index + 1}번째 강좌`}
              />
            ))}
          </div>
        </div>

        {/* 데스크톱 한 줄 스크롤 */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {courses.map((course) => (
                <div key={course.id} className="flex-shrink-0 w-80">
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                    onClick={handleCourseClick}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <ImageWithFallback
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl leading-tight">{course.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-base text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                        {course.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      >
                        자세히 보기
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
