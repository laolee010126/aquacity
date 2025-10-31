import { ProgramsClient } from "./ProgramsClient"
import { existsSync } from 'fs'
import path from 'path'

export async function ProgramsSection() {
  // 스케줄 이미지 경로 확인
  let scheduleImageUrl: string | null = null

  try {
    // 서버 사이드에서 직접 파일 시스템 확인
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'schedule')
    const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']

    // 존재하는 스케줄 이미지 찾기
    for (const ext of extensions) {
      const fileName = `schedule-image.${ext}`
      const filePath = path.join(uploadDir, fileName)

      if (existsSync(filePath)) {
        scheduleImageUrl = `/uploads/schedule/${fileName}`
        break
      }
    }
  } catch (error) {
    console.error('Failed to load schedule image:', error)
  }

  return <ProgramsClient scheduleImageUrl={scheduleImageUrl} />
}
