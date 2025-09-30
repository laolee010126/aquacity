'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Program, parseStringArray } from '@/types/database'
import { getPrograms, createProgram, updateProgram, deleteProgram } from '@/lib/database'
import { ImageUpload } from '@/app/components/ImageUpload'

export default function AdminPrograms() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: '',
    duration: '',
    capacity: '',
    price: '',
    instructor_name: '',
    schedule: '',
    image_url: '',
    level_color: 'blue'
  })

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('admin_logged_in')
    if (!adminLoggedIn) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    loadPrograms()
  }, [router])

  const loadPrograms = async () => {
    setIsLoading(true)
    try {
      const data = await getPrograms()
      setPrograms(data)
    } catch (error) {
      console.error('Failed to load programs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingProgram(null)
    setFormData({
      title: '',
      description: '',
      level: '',
      duration: '',
      capacity: '',
      price: '',
      instructor_name: '',
      schedule: '',
      image_url: '',
      level_color: 'blue'
    })
    setIsModalOpen(true)
  }

  const handleEdit = (program: Program) => {
    setEditingProgram(program)
    setFormData({
      title: program.title,
      description: program.description || '',
      level: program.level || '',
      duration: program.duration || '',
      capacity: program.capacity || '',
      price: program.price || '',
      instructor_name: program.instructor_name || '',
      schedule: program.schedule || '',
      image_url: program.image_url || '',
      level_color: program.level_color || 'blue'
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      const success = await deleteProgram(id)
      if (success) {
        await loadPrograms() // 데이터 새로고침
      } else {
        alert('삭제에 실패했습니다.')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingProgram) {
        // 수정
        const updated = await updateProgram(editingProgram.id, formData)
        if (!updated) {
          alert('수정에 실패했습니다.')
          return
        }
      } else {
        // 추가
        const created = await createProgram(formData)
        if (!created) {
          alert('추가에 실패했습니다.')
          return
        }
      }
      
      setIsModalOpen(false)
      await loadPrograms() // 데이터 새로고침
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
              <h1 className="text-2xl font-bold text-gray-900">프로그램 관리</h1>
            </div>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              프로그램 추가
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">프로그램 로딩 중...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {program.image_url && (
                    <img src={program.image_url} alt={program.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        program.level_color === 'green' ? 'bg-green-100 text-green-800' :
                        program.level_color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        program.level_color === 'red' ? 'bg-red-100 text-red-800' :
                        program.level_color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {program.level}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{program.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div>⏱️ {program.duration}</div>
                      <div>👥 {program.capacity}</div>
                      <div>💰 {program.price}</div>
                      <div>👨‍🏫 {program.instructor_name}</div>
                      <div className="text-xs">
                        📅 {parseStringArray(program.schedule).slice(0, 2).join(', ')}
                        {parseStringArray(program.schedule).length > 2 && '...'}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(program)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded border border-gray-200"
                        title="수정"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(program.id)}
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

          {!isLoading && programs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">등록된 프로그램이 없습니다.</p>
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
                {editingProgram ? '프로그램 수정' : '프로그램 추가'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">레벨</label>
                    <input
                      type="text"
                      value={formData.level}
                      onChange={(e) => setFormData({...formData, level: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">시간</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">정원</label>
                    <input
                      type="text"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">가격</label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">강사명</label>
                  <input
                    type="text"
                    value={formData.instructor_name}
                    onChange={(e) => setFormData({...formData, instructor_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">일정 (쉼표로 구분)</label>
                  <textarea
                    value={formData.schedule}
                    onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                    placeholder="월/수/금 19:00-19:50, 화/목 14:00-14:50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <ImageUpload
                  currentImageUrl={formData.image_url}
                  onImageUpload={(url) => setFormData({...formData, image_url: url})}
                  label="프로그램 이미지"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">레벨 색상</label>
                  <select
                    value={formData.level_color}
                    onChange={(e) => setFormData({...formData, level_color: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="green">초급 (녹색)</option>
                    <option value="yellow">중급 (노란색)</option>
                    <option value="red">고급 (빨간색)</option>
                    <option value="blue">전체 (파란색)</option>
                    <option value="purple">어린이 (보라색)</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                  >
                    {editingProgram ? '수정' : '추가'}
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