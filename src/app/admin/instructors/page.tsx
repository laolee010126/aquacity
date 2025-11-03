'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Instructor } from '@/types/database'
import { getInstructors, createInstructor, updateInstructor, deleteInstructor } from '@/lib/database'
import { ImageUpload } from '@/app/components/ImageUpload'

export default function AdminInstructors() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    photo_url: '',
    rating: 5.0
  })

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('admin_logged_in')
    if (!adminLoggedIn) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    loadInstructors()
  }, [router])

  const loadInstructors = async () => {
    setIsLoading(true)
    try {
      const data = await getInstructors()
      setInstructors(data)
    } catch (error) {
      console.error('Failed to load instructors:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingInstructor(null)
    setFormData({
      name: '',
      photo_url: '',
      rating: 5.0
    })
    setIsModalOpen(true)
  }

  const handleEdit = (instructor: Instructor) => {
    setEditingInstructor(instructor)
    setFormData({
      name: instructor.name,
      photo_url: instructor.photo_url || '',
      rating: instructor.rating
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      const success = await deleteInstructor(id)
      if (success) {
        await loadInstructors() // 데이터 새로고침
      } else {
        alert('삭제에 실패했습니다.')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingInstructor) {
        // 수정
        const updated = await updateInstructor(editingInstructor.id, formData)
        if (!updated) {
          alert('수정에 실패했습니다.')
          return
        }
      } else {
        // 추가
        const created = await createInstructor(formData)
        if (!created) {
          alert('추가에 실패했습니다.')
          return
        }
      }
      
      setIsModalOpen(false)
      await loadInstructors() // 데이터 새로고침
    } catch (error) {
      console.error('Submit error:', error)
      alert('오류가 발생했습니다.')
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
              <h1 className="text-2xl font-bold text-gray-900">강사진 관리</h1>
            </div>
            <button
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              강사 추가
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">강사진 로딩 중...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructors.map((instructor) => (
                <div key={instructor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {instructor.photo_url && (
                    <img src={instructor.photo_url} alt={instructor.name} className="w-full h-64 object-cover" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{instructor.name}</h3>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(instructor)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded border border-gray-200"
                        title="수정"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(instructor.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded border border-gray-200"
                        title="삭제"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && instructors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">등록된 강사가 없습니다.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingInstructor ? '강사 수정' : '강사 추가'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <ImageUpload
                  currentImageUrl={formData.photo_url}
                  onImageUpload={(url) => setFormData({...formData, photo_url: url})}
                  label="강사 사진"
                />

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
                  >
                    {editingInstructor ? '수정' : '추가'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium"
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
