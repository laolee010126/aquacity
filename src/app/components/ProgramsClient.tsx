'use client'

import { ProgramCard } from "./ProgramCard"

interface ProgramData {
  title: string
  description: string
  level: string
  duration: string
  capacity: string
  price: string
  instructor: string
  schedule: string[]
  image: string
  levelColor: "green" | "yellow" | "red" | "blue" | "purple"
}

// 기본 프로그램 데이터 (DB 연결 실패 시 폴백)
const fallbackPrograms: ProgramData[] = [
  {
    title: "초급 수영 교실",
    description: "수영을 처음 시작하는 분들을 위한 기초 과정입니다. 물에 대한 적응부터 기본 영법까지 차근차근 배웁니다.",
    level: "초급",
    duration: "50분",
    capacity: "최대 8명",
    price: "120,000원",
    instructor: "김수영 코치",
    schedule: ["월/수/금 19:00-19:50", "화/목 14:00-14:50", "토 10:00-10:50"],
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop",
    levelColor: "green"
  },
  {
    title: "중급 수영 교실", 
    description: "기본 영법을 익힌 분들을 위한 중급 과정입니다. 자유형, 배영, 평영을 정확하게 배우고 거리를 늘려갑니다.",
    level: "중급",
    duration: "50분",
    capacity: "최대 6명", 
    price: "140,000원",
    instructor: "박영법 코치",
    schedule: ["월/수/금 20:00-20:50", "화/목 15:00-15:50", "일 14:00-14:50"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    levelColor: "yellow"
  },
  {
    title: "고급 수영 교실",
    description: "영법 완성과 기록 향상을 목표로 하는 고급 과정입니다. 접영과 개인혼영을 배우고 경영 기술을 익힙니다. 연수 1·2·마스터 단계까지 순차적으로 진행됩니다.",
    level: "고급", 
    duration: "60분",
    capacity: "최대 4명",
    price: "180,000원",
    instructor: "이영훈 코치",
    schedule: ["월/수/금 21:00-22:00", "토 15:00-16:00"],
    image: "https://images.unsplash.com/photo-1566303569854-412b6a81b5d5?w=400&h=300&fit=crop",
    levelColor: "red"
  },
  {
    title: "아쿠아로빅",
    description: "물의 저항을 이용한 유산소 운동입니다. 관절에 무리가 없어 누구나 즐겁게 참여할 수 있습니다.",
    level: "전체",
    duration: "45분", 
    capacity: "최대 15명",
    price: "90,000원",
    instructor: "최아쿠아 강사",
    schedule: ["월/수/금 10:00-10:45", "화/목/토 11:00-11:45", "일 16:00-16:45"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    levelColor: "blue"
  },
  {
    title: "어린이 수영교실",
    description: "6세~12세 어린이를 위한 전용 프로그램입니다. 놀이를 통해 자연스럽게 수영을 배웁니다.",
    level: "어린이",
    duration: "40분",
    capacity: "최대 6명",
    price: "100,000원", 
    instructor: "정키즈 코치",
    schedule: ["월/수/금 16:00-16:40", "화/목 17:00-17:40", "토/일 13:00-13:40"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    levelColor: "purple"
  },
  {
    title: "개인 레슨",
    description: "1:1 맞춤형 수업으로 개인의 목표와 수준에 맞는 집중 지도를 받을 수 있습니다.",
    level: "전체", 
    duration: "50분",
    capacity: "1:1 개인",
    price: "80,000원",
    instructor: "전담 코치 배정",
    schedule: ["평일 14:00-21:00", "주말 10:00-18:00", "사전 예약 필수"],
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop",
    levelColor: "blue"
  }
]

interface ProgramsClientProps {
  initialPrograms: ProgramData[]
}

export function ProgramsClient({ initialPrograms }: ProgramsClientProps) {
  // 서버에서 받은 데이터가 없으면 폴백 데이터 사용
  const programs = initialPrograms.length > 0 ? initialPrograms : fallbackPrograms

  const programSummary = [
    { label: "초급자", count: "2개", color: "bg-green-100 text-green-800" },
    { label: "중급자", count: "1개", color: "bg-yellow-100 text-yellow-800" },
    { label: "연수·마스터", count: "1개", color: "bg-red-100 text-red-800" },
    { label: "전체", count: "2개", color: "bg-blue-100 text-blue-800" }
  ]

  return (
    <section id="programs" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">수영강습 프로그램</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8">
            전문 강사진과 함께하는 체계적인 수영강습으로 
            여러분의 수영 실력을 한 단계 올려보세요
          </p>

          {/* Mobile: Quick program overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
            {programSummary.map((item, index) => (
              <div key={index} className="bg-white p-3 md:p-4 rounded-lg shadow-sm border">
                <div className={`inline-block px-2 py-1 rounded-full text-xs md:text-sm font-medium mb-2 ${item.color}`}>
                  {item.label}
                </div>
                <div className="text-lg md:text-xl font-bold text-gray-900">{item.count}</div>
                <div className="text-xs md:text-sm text-gray-600">프로그램</div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-5 md:px-6 md:py-6 max-w-3xl mx-auto text-left md:text-center text-sm md:text-base text-blue-800">
            <p className="font-medium">
              우리 수영장은 상급 단계를 상급 1·2·3 통합 과정으로 운영합니다.
            </p>
            <p className="mt-2">
              고급 프로그램은 연수 1·2와 마스터 과정까지 포함되어 있으니 참고해주세요.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <ProgramCard key={index} {...program} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            * 모든 프로그램은 4주 단위로 진행되며, 월 중간 입회 시 일할계산됩니다.
          </p>
          <p className="text-muted-foreground">
            * 수강료는 매월 1일 자동결제되며, 환불은 수강료 정책에 따릅니다.
          </p>
        </div>
      </div>
    </section>
  )
}
