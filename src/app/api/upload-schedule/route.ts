import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: '파일이 전송되지 않았습니다.' },
        { status: 400 }
      )
    }

    // 파일 확장자 검증
    const fileExt = file.name.split('.').pop()?.toLowerCase()
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']

    if (!fileExt || !allowedExtensions.includes(fileExt)) {
      return NextResponse.json(
        { error: '지원하지 않는 파일 형식입니다. (JPG, PNG, GIF, WEBP만 가능)' },
        { status: 400 }
      )
    }

    // 파일 크기 체크 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: '파일 크기는 10MB 이하여야 합니다.' },
        { status: 400 }
      )
    }

    // 파일 저장 경로
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'schedule')
    const fileName = `schedule-image.${fileExt}`
    const filePath = path.join(uploadDir, fileName)

    // 기존 파일이 있으면 삭제
    if (existsSync(filePath)) {
      try {
        await unlink(filePath)
      } catch (err) {
        console.error('Failed to delete old file:', err)
      }
    }

    // 파일을 버퍼로 변환
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 파일 저장
    await writeFile(filePath, buffer)

    // 공개 URL 반환
    const publicUrl = `/uploads/schedule/${fileName}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: '스케줄표 이미지가 업로드되었습니다.'
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: '파일 업로드 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// GET 요청: 현재 스케줄 이미지 URL 반환
export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'schedule')
    const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']

    // 존재하는 스케줄 이미지 찾기
    for (const ext of extensions) {
      const fileName = `schedule-image.${ext}`
      const filePath = path.join(uploadDir, fileName)

      if (existsSync(filePath)) {
        return NextResponse.json({
          success: true,
          url: `/uploads/schedule/${fileName}`,
          exists: true
        })
      }
    }

    return NextResponse.json({
      success: true,
      url: null,
      exists: false,
      message: '업로드된 스케줄 이미지가 없습니다.'
    })

  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json(
      { error: '이미지 정보를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
