import { RecommendedCoursesClient } from "./RecommendedCoursesClient"

// 추천 강좌 데이터
const courses = [
  {
    id: '1',
    title: "수중건강",
    description: "성인 및 시니어 대상, 수중 재활 운동 및 건강 증진 프로그램입니다. 관절에 무리가 적고 안전하게 건강을 관리할 수 있습니다.",
    imageUrl: "/images/swimming-pool.jpg",
  },
  {
    id: '2',
    title: "아쿠아로빅",
    description: "수중에서 하는 유산소 운동으로 체지방 감소 및 근력 강화에 효과적입니다. 즐겁게 운동하며 전신을 단련할 수 있습니다.",
    imageUrl: "/images/youth-pool2.jpg",
  },
  {
    id: '3',
    title: "주말반",
    description: "토/일요일 07:00-07:50 운영, 기초·초급·중급 수업을 진행합니다. 주중에 시간이 없는 분들을 위한 맞춤 프로그램입니다.",
    imageUrl: "/images/swinming-pool2.jpg",
  },
  {
    id: '4',
    title: "상급반",
    description: "자유형·배영·평영·접영 반복연습, 접영연결동작, 턴, 스타트 연습을 진행합니다. 4가지 영법 자세교정, 오리발 착용, 지구력 중점 훈련으로 실력을 한 단계 끌어올립니다.",
    imageUrl: "/images/swinming-pool1.jpg",
  }
]

export function RecommendedCoursesSection() {
  return <RecommendedCoursesClient courses={courses} />
}
