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