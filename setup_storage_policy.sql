-- Supabase Storage 버킷 및 정책 설정
-- 이 스크립트를 Supabase SQL Editor에서 실행하세요

-- 1. 스토리지 버킷 생성 (이미 존재할 수 있음)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. 스토리지 정책 생성

-- 모든 사용자가 이미지 업로드 가능
CREATE POLICY "Anyone can upload images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images');

-- 모든 사용자가 이미지 조회 가능
CREATE POLICY "Anyone can view images" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- 업로드한 사용자만 이미지 업데이트 가능 (선택사항)
CREATE POLICY "Users can update own images" ON storage.objects
FOR UPDATE USING (bucket_id = 'images');

-- 업로드한 사용자만 이미지 삭제 가능 (선택사항)
CREATE POLICY "Users can delete own images" ON storage.objects
FOR DELETE USING (bucket_id = 'images');

-- 3. RLS 활성화 확인
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 4. 만약 위 정책이 너무 제한적이라면, 임시로 모든 작업 허용 (개발 환경용)
-- CREATE POLICY "Allow all operations on images bucket" ON storage.objects
-- FOR ALL USING (bucket_id = 'images')
-- WITH CHECK (bucket_id = 'images');