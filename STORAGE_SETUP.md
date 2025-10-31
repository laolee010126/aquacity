# Supabase Storage 설정 가이드

## 문제 증상
관리자 페이지에서 이미지 업로드 시 다음 에러 발생:
```
StorageApiError: new row violates row-level security policy
```

## 해결 방법

### 방법 1: SQL Editor에서 실행 (권장)

1. **Supabase Dashboard 접속**
   - 프로젝트 선택
   - 왼쪽 메뉴에서 "SQL Editor" 클릭

2. **SQL 실행**
   - `migrations/004_setup_storage_policies.sql` 파일의 내용을 복사
   - SQL Editor에 붙여넣기
   - "Run" 버튼 클릭

3. **완료 확인**
   - 에러 없이 실행되면 성공
   - 하단에 "Success" 메시지 확인

### 방법 2: UI에서 설정 (더 간단함)

1. **Storage 메뉴 이동**
   - Supabase Dashboard → Storage
   - `aqua-image` 버킷 클릭

2. **Policies 탭**
   - 상단 "Policies" 탭 클릭
   - "New Policy" 버튼 클릭

3. **INSERT 정책 생성**
   - Policy name: `Anyone can upload images`
   - Allowed operation: **INSERT** 체크
   - Target roles: `public` 선택
   - WITH CHECK expression: `bucket_id = 'aqua-image'`
   - "Review" → "Save policy"

4. **SELECT 정책 생성** (같은 방법으로)
   - Policy name: `Anyone can view images`
   - Allowed operation: **SELECT** 체크
   - Target roles: `public` 선택
   - USING expression: `bucket_id = 'aqua-image'`
   - "Review" → "Save policy"

## 정책 확인

SQL Editor에서 다음 쿼리로 확인:

```sql
SELECT policyname, cmd as operation
FROM pg_policies
WHERE tablename = 'objects'
AND schemaname = 'storage'
AND policyname LIKE '%image%';
```

다음과 같은 결과가 나와야 합니다:
```
policyname                  | operation
----------------------------|----------
Anyone can upload images    | INSERT
Anyone can view images      | SELECT
```

## 테스트

1. 관리자 페이지 새로고침 (Ctrl/Cmd + Shift + R)
2. 프로그램 수정 → 이미지 업로드 버튼 클릭
3. 이미지 선택
4. 업로드 성공 확인

## 프로덕션 고려사항

현재 설정은 누구나 이미지를 업로드할 수 있습니다. 프로덕션 환경에서는 다음을 고려하세요:

### 인증된 사용자만 업로드하도록 제한

`migrations/004_setup_storage_policies.sql` 파일의 주석 처리된 "PRODUCTION ALTERNATIVE" 섹션을 사용하세요.

### 파일 크기 제한

Dashboard → Storage → aqua-image 버킷 → Settings에서:
- Maximum file size: 5MB (또는 원하는 크기)

### 허용 파일 타입 제한

코드에서 이미 구현됨 (`accept="image/*"`)

## 대안: URL 직접 입력

Storage 설정이 완료될 때까지 임시로 외부 이미지 URL을 사용할 수 있습니다:

1. Unsplash, Pexels 등에서 무료 이미지 찾기
2. 이미지 URL 복사
3. 관리자 페이지에서 "이미지 URL 직접 입력" 필드에 붙여넣기

예시 URL:
```
https://images.unsplash.com/photo-1566303569854-412b6a81b5d5?w=400&h=300&fit=crop
```

## 문제 해결

### 여전히 업로드가 안 되는 경우

1. **브라우저 콘솔 확인**
   - F12 → Console 탭
   - 에러 메시지 확인

2. **정책 재확인**
   - Storage → Policies에서 정책이 제대로 생성되었는지 확인

3. **버킷 이름 확인**
   - `aqua-image` 버킷이 존재하는지 확인
   - 버킷이 Public으로 설정되었는지 확인

4. **Supabase 프로젝트 재시작**
   - 가끔 정책 적용에 시간이 걸릴 수 있음
   - 몇 분 후 다시 시도

## 추가 도움말

Supabase 공식 문서:
- https://supabase.com/docs/guides/storage
- https://supabase.com/docs/guides/storage/security/access-control
