-- 뉴스 테이블 생성을 위한 SQL 스크립트
-- 이 스크립트를 Supabase SQL Editor에서 실행하세요

-- 1. 뉴스 테이블 생성
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    category VARCHAR(50) NOT NULL DEFAULT 'general',
    category_color VARCHAR(20) NOT NULL DEFAULT 'blue',
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_news_date ON public.news(date DESC);
CREATE INDEX IF NOT EXISTS idx_news_category ON public.news(category);
CREATE INDEX IF NOT EXISTS idx_news_published ON public.news(is_published);

-- 3. RLS (Row Level Security) 활성화
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- 4. 정책 생성
-- 발행된 뉴스는 누구나 읽을 수 있음
CREATE POLICY "Published news are publicly readable" ON public.news
    FOR SELECT USING (is_published = true);

-- 관리자는 모든 작업 가능 (나중에 인증 시스템과 연동)
CREATE POLICY "Admin can manage all news" ON public.news
    USING (true)
    WITH CHECK (true);

-- 5. 샘플 데이터 삽입
INSERT INTO public.news (title, content, category, category_color, date) VALUES
('2024년 겨울 특강 프로그램 안내', '12월부터 2월까지 진행되는 겨울 특강 프로그램을 안내드립니다. 초급자를 위한 집중반과 상급자를 위한 기록 향상반이 운영됩니다.', 'program', 'blue', '2024-11-15'),
('수영장 시설 개선 공사 완료', '더욱 쾌적한 환경에서 수영을 즐기실 수 있도록 탈의실과 샤워실 리모델링이 완료되었습니다. 새로운 시설을 확인해보세요!', 'facility', 'green', '2024-11-10'),
('11월 수영 대회 결과 발표', '지난 11월 5일 열린 아쿠아시티 자체 수영 대회에서 우수한 성과를 거둔 회원분들을 축하합니다. 시상식은 11월 20일 예정입니다.', 'event', 'yellow', '2024-11-08'),
('연말연시 운영시간 변경 안내', '12월 24일~25일, 12월 31일~1월 1일은 휴무이며, 12월 23일과 12월 30일은 오후 6시까지 운영합니다.', 'notice', 'red', '2024-11-05'),
('신규 강사진 소개', '수중 에어로빅 전문가 김아쿠아 강사님과 자유형 전문 박스트로크 코치님이 새롭게 합류하셨습니다. 많은 관심 부탁드립니다.', 'instructor', 'purple', '2024-11-01'),
('10월 수영 교실 수료식', '10월 수영 교실을 성공적으로 완주한 수강생분들의 수료식이 있었습니다. 11월 새 기수 모집도 진행 중입니다.', 'event', 'yellow', '2024-10-28');

-- 6. 트리거 함수 생성 (updated_at 자동 업데이트)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 7. 트리거 생성
CREATE TRIGGER update_news_updated_at 
    BEFORE UPDATE ON public.news 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();