'use client'

import { useState } from 'react'

interface ProgramsClientProps {
  scheduleImageUrl: string | null
}

export function ProgramsClient({ scheduleImageUrl }: ProgramsClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="programs" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">수영강습 프로그램</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            전문 강사진과 함께하는 체계적인 수영강습으로
            여러분의 수영 실력을 한 단계 올려보세요
          </p>
        </div>

        {/* 스케줄표 이미지 */}
        {scheduleImageUrl ? (
          <div className="max-w-5xl mx-auto">
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={scheduleImageUrl}
                alt="수영 강습 스케줄표"
                className="w-full h-auto"
              />
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              클릭하면 크게 볼 수 있습니다
            </p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500 text-lg">
                스케줄표를 준비중입니다.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                관리자가 곧 스케줄표를 업로드할 예정입니다.
              </p>
            </div>
          </div>
        )}

        {/* 프로그램 레벨별 내용 */}
        <div className="mt-12 md:mt-16 max-w-6xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-8">프로그램 단계별 수업 내용</h3>
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            {/* 기초반 */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  기초반
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-700">
                수영장 이용안내 및 수칙안내, 호흡법, 자유형발차기, 팔돌리기
              </p>
            </div>

            {/* 초급반 */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  초급반
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-700">
                자유형 반복연습, 배면뜨기, 배면발차기, 손발 연결동작
              </p>
            </div>

            {/* 중급반 */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  중급반
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-700">
                자유형·배영 반복연습, 평영발차기, 평영 팔 돌리기 연결동작
              </p>
            </div>

            {/* 상급반 */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  상급반
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-700">
                자유형·배영·평영·접영 반복연습, 접영연결동작, 턴, 스타트 연습, 4가지 영법 자세교정, 오리발 착용, 지구력 중점 훈련
              </p>
            </div>

            {/* 고급반 */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  고급반
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-700">
                4가지 영법 교정 및 근지구력 훈련, 반복연습
              </p>
            </div>

            {/* 마스터즈 */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  마스터즈
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-700">
                준선수반 대회출전 또는 수영 동호회 수준
              </p>
            </div>
          </div>
        </div>

        {/* 전체화면 모달 */}
        {isModalOpen && scheduleImageUrl && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
              aria-label="닫기"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 이미지 */}
            <div
              className="max-w-7xl max-h-full overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={scheduleImageUrl}
                alt="수영 강습 스케줄표"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
