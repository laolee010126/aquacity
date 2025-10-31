import { supabase } from '@/lib/supabase'

// 이미지 업로드 함수
export async function uploadImage(file: File, bucket: string = 'aqua-image'): Promise<string | null> {
  try {
    // 파일명을 유니크하게 만들기
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    // Supabase Storage에 업로드
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)

    if (error) {
      console.error('Upload error:', error)

      // RLS 정책 오류인 경우 더 명확한 메시지
      if (error.message?.includes('row-level security') || error.message?.includes('policy')) {
        throw new Error('이미지 업로드 권한이 없습니다. Supabase Storage 정책을 확인해주세요. (migrations/004_setup_storage_policies.sql 참고)')
      }

      throw error // 에러를 던져서 상위에서 처리할 수 있도록
    }

    // 공개 URL 가져오기
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return publicUrlData.publicUrl
  } catch (error) {
    console.error('Upload error:', error)
    return null
  }
}

// 이미지 삭제 함수 (선택사항)
export async function deleteImage(url: string, bucket: string = 'images'): Promise<boolean> {
  try {
    // URL에서 파일 경로 추출
    const urlParts = url.split('/')
    const fileName = urlParts[urlParts.length - 1]
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName])

    if (error) {
      console.error('Delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}