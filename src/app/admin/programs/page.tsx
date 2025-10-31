'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminSchedule() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('admin_logged_in')
    if (!adminLoggedIn) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    loadCurrentImage()
  }, [router])

  const loadCurrentImage = async () => {
    try {
      const response = await fetch('/api/upload-schedule')
      const data = await response.json()

      if (data.success && data.exists) {
        setCurrentImageUrl(data.url)
        setPreviewUrl(data.url)
      }
    } catch (error) {
      console.error('Failed to load current image:', error)
    }
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 파일 크기 체크 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB 이하여야 합니다.')
      return
    }

    // 이미지 미리보기
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // 업로드 시작
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-schedule', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setCurrentImageUrl(data.url)
        setPreviewUrl(data.url)
        alert('스케줄표가 성공적으로 업로드되었습니다!')
      } else {
        alert(data.error || '업로드에 실패했습니다.')
        setPreviewUrl(currentImageUrl)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('파일 업로드 중 오류가 발생했습니다.')
      setPreviewUrl(currentImageUrl)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    if (confirm('현재 스케줄표 이미지를 제거하시겠습니까?')) {
      setPreviewUrl(null)
      setCurrentImageUrl(null)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800">
                ← 대시보드
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">강습 스케줄 관리</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">스케줄표 이미지</h2>
            <p className="text-gray-600 mb-6">
              수영 강습 프로그램 페이지에 표시될 스케줄표 이미지를 업로드하세요.
            </p>

            {/* 현재 이미지 미리보기 */}
            {previewUrl ? (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">현재 스케줄표</h3>
                <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="스케줄표"
                    className="w-full h-auto"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl hover:bg-red-600 shadow-lg"
                    disabled={isUploading}
                  >
                    ×
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">업로드된 스케줄표가 없습니다</p>
                </div>
              </div>
            )}

            {/* 업로드 버튼 */}
            <div className="space-y-4">
              <div>
                <input
                  type="file"
                  id="schedule-upload"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isUploading}
                />
                <label
                  htmlFor="schedule-upload"
                  className={`block w-full text-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    isUploading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  }`}
                >
                  {isUploading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      업로드 중...
                    </span>
                  ) : (
                    <span>{previewUrl ? '다른 이미지로 교체' : '스케줄표 업로드'}</span>
                  )}
                </label>
              </div>

              <div className="text-sm text-gray-500">
                <p>• 지원 형식: JPG, PNG, GIF, WEBP</p>
                <p>• 최대 파일 크기: 10MB</p>
                <p>• 권장 크기: 가로 1200px 이상</p>
              </div>
            </div>

            {/* 미리보기 링크 */}
            <div className="mt-6 pt-6 border-t">
              <Link
                href="/#programs"
                target="_blank"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                → 사용자 페이지에서 확인하기
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
