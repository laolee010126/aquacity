'use client'

import { InstructorCard } from "./InstructorCard"

interface InstructorData {
  name: string
  photo: string
  specialty: string[]
  rating: number
  description: string
}

// 기본 강사 데이터 (DB 연결 실패 시 폴백)
const fallbackInstructors: InstructorData[] = [
  {
    name: "김수영",
    photo: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&h=400&fit=crop&crop=face",
    specialty: ["자유형", "배영", "초급자 지도"],
    rating: 4.9,
    description: "초보자부터 상급자까지 개인별 맞춤 지도로 정확한 영법을 가르쳐 드립니다."
  },
  {
    name: "박영법",
    photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=400&fit=crop&crop=face",
    specialty: ["평영", "접영", "경영 선수 지도"],
    rating: 4.8,
    description: "경영 선수 출신으로 정확한 기술과 체계적인 훈련 프로그램을 제공합니다."
  },
  {
    name: "이물결",
    photo: "https://images.unsplash.com/photo-1594824680330-82a7c4b6ab7b?w=300&h=400&fit=crop&crop=face",
    specialty: ["아쿠아로빅", "수중운동", "재활수영"],
    rating: 4.9,
    description: "수중 재활과 아쿠아로빅 전문가로 안전하고 즐거운 운동을 지도합니다."
  },
  {
    name: "최파도",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
    specialty: ["어린이 수영", "생존수영", "기초 영법"],
    rating: 4.7,
    description: "어린이 수영 교육 전문가로 재미있고 안전한 수업을 진행합니다."
  },
  {
    name: "정깊이",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=400&fit=crop&crop=face",
    specialty: ["성인 초급", "수영 공포증 극복", "개인레슨"],
    rating: 4.8,
    description: "수영을 처음 시작하는 분들과 물에 대한 두려움을 가진 분들을 전문으로 지도합니다."
  },
  {
    name: "조맑음",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=400&fit=crop&crop=face",
    specialty: ["마스터즈", "지구력 훈련", "중급자 지도"],
    rating: 4.6,
    description: "성인 수영 동호회와 마스터즈 수영 선수들의 기록 향상을 도와드립니다."
  }
]

interface InstructorsClientProps {
  initialInstructors: InstructorData[]
}

export function InstructorsClient({ initialInstructors }: InstructorsClientProps) {
  // 서버에서 받은 데이터가 없으면 폴백 데이터 사용
  const instructors = initialInstructors.length > 0 ? initialInstructors : fallbackInstructors
  const uniqueSpecialtiesCount = new Set(
    instructors.flatMap((instructor) => instructor.specialty)
  ).size

  return (
    <section id="instructors" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">전문 강사진</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8">
            풍부한 경험과 전문성을 갖춘 우리 강사진이
            여러분의 수영 실력 향상을 도와드립니다
          </p>
          
          {/* Instructor summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
            <div className="bg-blue-50 p-3 md:p-4 rounded-lg border">
              <div className="text-lg md:text-xl font-bold text-blue-600">{instructors.length}명</div>
              <div className="text-xs md:text-sm text-gray-600">전문 강사</div>
            </div>
            <div className="bg-green-50 p-3 md:p-4 rounded-lg border">
              <div className="text-lg md:text-xl font-bold text-green-600">평균 4.8</div>
              <div className="text-xs md:text-sm text-gray-600">수강생 만족도</div>
            </div>
            <div className="bg-purple-50 p-3 md:p-4 rounded-lg border">
              <div className="text-lg md:text-xl font-bold text-purple-600">{uniqueSpecialtiesCount}개</div>
              <div className="text-xs md:text-sm text-gray-600">전문 분야</div>
            </div>
            <div className="bg-orange-50 p-3 md:p-4 rounded-lg border">
              <div className="text-lg md:text-xl font-bold text-orange-600">1:1</div>
              <div className="text-xs md:text-sm text-gray-600">맞춤 레슨 지원</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {instructors.map((instructor, index) => (
            <InstructorCard key={index} {...instructor} />
          ))}
        </div>
        
        <div className="text-center mt-8 md:mt-12">
          <p className="text-muted-foreground mb-4">
            원하는 강사와 함께 수업을 받고 싶으시다면 연락주세요
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              📞 0507-1462-1368
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
