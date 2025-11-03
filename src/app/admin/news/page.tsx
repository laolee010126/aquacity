'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAllNews, createNews, updateNews, deleteNews } from '@/lib/database'
import { NewsItem } from '@/types/database'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Calendar, Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react'

const categoryOptions = [
  { value: 'program', label: '프로그램', color: 'blue' as const },
  { value: 'facility', label: '시설', color: 'green' as const },
  { value: 'event', label: '이벤트', color: 'yellow' as const },
  { value: 'notice', label: '공지', color: 'red' as const },
  { value: 'instructor', label: '강사진', color: 'purple' as const }
]

const categoryColors = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800", 
  yellow: "bg-yellow-100 text-yellow-800",
  red: "bg-red-100 text-red-800",
  purple: "bg-purple-100 text-purple-800"
}

export default function AdminNews() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: 'program',
    category_color: 'blue' as 'blue' | 'green' | 'yellow' | 'red' | 'purple',
    is_published: true
  })

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('admin_logged_in')
    if (!adminLoggedIn) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
  }, [router])

  useEffect(() => {
    if (isAuthenticated) {
      loadNews()
    }
  }, [isAuthenticated])

  const loadNews = async () => {
    try {
      setLoading(true)
      const data = await getAllNews()
      setNews(data)
    } catch (error) {
      console.error('Failed to load news:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in')
    router.push('/admin/login')
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      category: 'program',
      category_color: 'blue',
      is_published: true
    })
    setEditingNews(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingNews) {
        await updateNews(editingNews.id, formData)
      } else {
        await createNews(formData)
      }
      
      await loadNews()
      resetForm()
    } catch (error) {
      console.error('Failed to save news:', error)
    }
  }

  const handleEdit = (newsItem: NewsItem) => {
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      date: newsItem.date,
      category: newsItem.category,
      category_color: newsItem.category_color,
      is_published: newsItem.is_published
    })
    setEditingNews(newsItem)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말로 이 소식을 삭제하시겠습니까?')) return
    
    try {
      await deleteNews(id)
      await loadNews()
    } catch (error) {
      console.error('Failed to delete news:', error)
    }
  }

  const togglePublished = async (newsItem: NewsItem) => {
    try {
      await updateNews(newsItem.id, { is_published: !newsItem.is_published })
      await loadNews()
    } catch (error) {
      console.error('Failed to toggle published status:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
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
              <button 
                onClick={() => router.push('/admin/dashboard')}
                className="text-blue-600 hover:text-blue-800"
              >
                ← 대시보드
              </button>
              <h1 className="text-2xl font-bold text-gray-900">소식 관리</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                새 소식 추가
              </Button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {editingNews ? '소식 수정' : '새 소식 추가'}
                  </h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      제목 *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      내용 *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        날짜 *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        카테고리 *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => {
                          const selectedCategory = categoryOptions.find(opt => opt.value === e.target.value)
                          setFormData({ 
                            ...formData, 
                            category: e.target.value,
                            category_color: selectedCategory?.color || 'blue'
                          })
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        {categoryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        게시 상태
                      </label>
                      <select
                        value={formData.is_published.toString()}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.value === 'true' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="true">게시됨</option>
                        <option value="false">임시저장</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      type="button"
                      onClick={resetForm}
                      variant="outline"
                    >
                      취소
                    </Button>
                    <Button type="submit">
                      {editingNews ? '수정' : '추가'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* News List */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">소식을 불러오는 중...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((newsItem) => (
                <Card key={newsItem.id} className="h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={categoryColors[newsItem.category_color]}>
                        {newsItem.category}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs">{formatDate(newsItem.date)}</span>
                        </div>
                        {newsItem.is_published ? (
                          <Eye className="w-4 h-4 text-green-600" aria-label="게시됨" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" aria-label="임시저장" />
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">{newsItem.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {newsItem.content}
                    </p>
                    
                    <div className="flex gap-2 mt-auto">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePublished(newsItem)}
                        className="flex-1"
                      >
                        {newsItem.is_published ? '비공개' : '게시'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(newsItem)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(newsItem.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && news.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">등록된 소식이 없습니다.</p>
              <Button
                onClick={() => setShowForm(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                첫 소식 추가하기
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}