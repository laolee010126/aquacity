'use client';

import { useState, useMemo } from 'react';
import { scheduleData, LaneInfo } from '@/types/schedule';

type TimeCategory = 'all' | 'morning' | 'afternoon' | 'evening';

export default function SchedulePage() {
  const [programFilter, setProgramFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState<TimeCategory>('all');
  const [instructorFilter, setInstructorFilter] = useState('all');

  // 레벨에 따른 CSS 클래스 결정
  const getLevelClass = (program: string): string => {
    if (program.includes('키즈')) return 'bg-blue-100 text-blue-800';
    if (
      program.includes('자유수영') ||
      program.includes('아쿠아로빅') ||
      program.includes('수중건강') ||
      program.includes('워터파크') ||
      program.includes('걷기레인')
    )
      return 'bg-gray-100 text-gray-800';
    if (program.includes('기초') || program.includes('초급'))
      return 'bg-green-100 text-green-800';
    if (program.includes('중급')) return 'bg-yellow-100 text-yellow-800';
    if (program.includes('상급') || program.includes('고급'))
      return 'bg-red-100 text-red-800';
    return '';
  };

  // 레벨 라벨 반환
  const getLevelLabel = (program: string): string => {
    if (program.includes('키즈')) return '어린이';
    if (
      program.includes('자유수영') ||
      program.includes('아쿠아로빅') ||
      program.includes('수중건강') ||
      program.includes('워터파크') ||
      program.includes('걷기레인')
    )
      return '자유';
    return '성인';
  };

  // 시간대 구분
  const getTimeCategory = (time: string): TimeCategory => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour <= 21) return 'evening';
    return 'all';
  };

  // 필터링된 데이터 계산
  const { filteredData, totalFiltered, totalPrograms } = useMemo(() => {
    let total = 0;
    let filtered = 0;
    const result: typeof scheduleData = {};

    for (const [day, times] of Object.entries(scheduleData)) {
      const dayResult: typeof times = {};

      for (const [time, lanes] of Object.entries(times)) {
        // 시간 필터 체크
        if (timeFilter !== 'all' && getTimeCategory(time) !== timeFilter) {
          continue;
        }

        const filteredLanes = lanes.filter((lane) => {
          // 프로그램이나 강사가 있는 레인만
          if (!lane.program && !lane.instructor) return false;

          // 프로그램 필터 체크
          if (programFilter !== 'all' && !lane.program.includes(programFilter)) {
            return false;
          }

          // 강사 필터 체크
          if (instructorFilter !== 'all' && lane.instructor !== instructorFilter) {
            return false;
          }

          filtered++;
          return true;
        });

        if (filteredLanes.length > 0) {
          dayResult[time] = filteredLanes;
        }

        total += lanes.filter((l) => l.program || l.instructor).length;
      }

      if (Object.keys(dayResult).length > 0) {
        result[day] = dayResult;
      }
    }

    return { filteredData: result, totalFiltered: filtered, totalPrograms: total };
  }, [programFilter, timeFilter, instructorFilter]);

  const resetFilters = () => {
    setProgramFilter('all');
    setTimeFilter('all');
    setInstructorFilter('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700 py-8 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-12 px-8 text-center">
          <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">
            🏊 아쿠아 수영장 프로그램 시간표
          </h1>
          <p className="text-xl opacity-95">2025년 11월 수영 강습 프로그램</p>
        </div>

        {/* 필터 섹션 */}
        <div className="bg-gray-50 border-b border-gray-200 py-8 px-8">
          <div className="flex flex-wrap gap-6 items-end">
            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
              <label htmlFor="programFilter" className="font-semibold text-gray-700 text-sm">
                프로그램 선택
              </label>
              <select
                id="programFilter"
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">모든 프로그램</option>
                <option value="기초">기초</option>
                <option value="초급">초급</option>
                <option value="중급">중급</option>
                <option value="상급">상급</option>
                <option value="고급">고급</option>
                <option value="키즈">키즈</option>
                <option value="자유수영">자유수영</option>
                <option value="아쿠아로빅">아쿠아로빅</option>
                <option value="수중건강">수중건강</option>
                <option value="워터파크">워터파크</option>
                <option value="걷기레인">걷기레인</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
              <label htmlFor="timeFilter" className="font-semibold text-gray-700 text-sm">
                시간대 선택
              </label>
              <select
                id="timeFilter"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as TimeCategory)}
                className="px-4 py-3 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">모든 시간</option>
                <option value="morning">오전 (06:00-12:00)</option>
                <option value="afternoon">오후 (12:00-17:00)</option>
                <option value="evening">저녁 (17:00-21:00)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
              <label htmlFor="instructorFilter" className="font-semibold text-gray-700 text-sm">
                강사 선택
              </label>
              <select
                id="instructorFilter"
                value={instructorFilter}
                onChange={(e) => setInstructorFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">모든 강사</option>
                <option value="유채연">유채연</option>
                <option value="김동복">김동복</option>
                <option value="문정서">문정서</option>
                <option value="박경미">박경미</option>
                <option value="여이수">여이수</option>
                <option value="장세건">장세건</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-cyan-500 transition-all hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              필터 초기화
            </button>
          </div>
        </div>

        {/* 시간표 그리드 */}
        <div className="py-10 px-8">
          {Object.keys(filteredData).length === 0 ? (
            <div className="text-center py-20 text-gray-500 text-xl">
              선택한 조건에 맞는 프로그램이 없습니다.
            </div>
          ) : (
            Object.entries(filteredData).map(([day, times]) => (
              <div
                key={day}
                className="mb-12 bg-gray-50 rounded-2xl p-6 shadow-sm"
              >
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white py-4 px-6 rounded-xl mb-6 text-center text-2xl font-semibold">
                  {day}요일
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {Object.entries(times).map(([time, lanes]) => (
                    <div
                      key={time}
                      className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-cyan-400 hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer"
                    >
                      <div className="text-lg font-bold text-blue-600 mb-4">
                        {time}
                      </div>

                      {lanes.map((lane, idx) => (
                        <div
                          key={idx}
                          className="mb-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="inline-block bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium mr-2">
                            레인 {lane.lane}
                          </span>

                          {lane.program && (
                            <>
                              <div className="font-semibold text-gray-900 mt-2 mb-1">
                                {lane.program}
                              </div>
                              {getLevelClass(lane.program) && (
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${getLevelClass(
                                    lane.program
                                  )}`}
                                >
                                  {getLevelLabel(lane.program)}
                                </span>
                              )}
                            </>
                          )}

                          {lane.instructor && (
                            <div className="text-gray-600 text-sm mt-1">
                              강사: {lane.instructor}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* 통계 섹션 */}
        <div className="bg-gray-50 border-t border-gray-200 py-8 px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl text-center shadow-sm">
              <div className="text-4xl font-bold text-blue-600">
                {totalPrograms}
              </div>
              <div className="text-gray-600 text-sm mt-2">전체 프로그램</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-sm">
              <div className="text-4xl font-bold text-blue-600">6</div>
              <div className="text-gray-600 text-sm mt-2">강사진</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-sm">
              <div className="text-4xl font-bold text-blue-600">11</div>
              <div className="text-gray-600 text-sm mt-2">운영 시간대</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-sm">
              <div className="text-4xl font-bold text-blue-600">
                {totalFiltered}
              </div>
              <div className="text-gray-600 text-sm mt-2">검색 결과</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
