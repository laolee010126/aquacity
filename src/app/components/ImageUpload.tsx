'use client'

import { useState, useRef } from 'react'
import { uploadImage } from '@/lib/data'

interface ImageUploadProps {
  currentImageUrl?: string
  onImageUpload: (url: string) => void
  label?: string
  accept?: string
  disabled?: boolean
}

export function ImageUpload({ 
  currentImageUrl, 
  onImageUpload, 
  label = "이미지", 
  accept = "image/*",
  disabled = false 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.')
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
      const uploadedUrl = await uploadImage(file)
      
      if (uploadedUrl) {
        onImageUpload(uploadedUrl)
        setPreviewUrl(uploadedUrl)
      } else {
        alert('이미지 업로드에 실패했습니다.')
        setPreviewUrl(currentImageUrl || null)
      }
    } catch (error) {
      console.error('Upload error:', error)

      // 에러 메시지를 더 친절하게 표시
      const errorMessage = error instanceof Error ? error.message : '이미지 업로드 중 오류가 발생했습니다.'
      alert(errorMessage)

      setPreviewUrl(currentImageUrl || null)
    } finally {
      setIsUploading(false)
      // input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUrlInput = (url: string) => {
    setPreviewUrl(url)
    onImageUpload(url)
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      {/* 현재 이미지 미리보기 */}
      {previewUrl && (
        <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
          <img 
            src={previewUrl} 
            alt="미리보기" 
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setPreviewUrl(null)
              onImageUpload('')
            }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            disabled={disabled || isUploading}
          >
            ×
          </button>
        </div>
      )}

      {/* 업로드 영역 */}
      {!previewUrl && (
        <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled || isUploading}
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-500 mt-2">업로드 중...</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center p-4 w-full h-full"
              disabled={disabled}
            >
              <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p className="text-sm text-gray-500">이미지 업로드</p>
              <p className="text-xs text-gray-400 mt-1">클릭하여 파일 선택</p>
            </button>
          )}
        </div>
      )}

      {/* URL 직접 입력 */}
      <div className="space-y-2">
        <p className="text-xs text-gray-500">또는 이미지 URL 직접 입력:</p>
        <input
          type="url"
          placeholder="https://example.com/image.jpg"
          defaultValue={currentImageUrl}
          onBlur={(e) => {
            if (e.target.value && e.target.value !== currentImageUrl) {
              handleUrlInput(e.target.value)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const input = e.target as HTMLInputElement
              if (input.value && input.value !== currentImageUrl) {
                handleUrlInput(input.value)
              }
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          disabled={disabled || isUploading}
        />
      </div>

      {/* 업로드 안내 */}
      <p className="text-xs text-gray-400">
        지원 형식: JPG, PNG, GIF (최대 5MB)
      </p>
    </div>
  )
}