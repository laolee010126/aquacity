import { Instructor, NewsItem } from '@/types/database'

// 서버/클라이언트 환경에 따라 base URL 반환
function getBaseUrl() {
  // 브라우저 및 서버 모두 상대 URL 사용 (API routes가 같은 앱에 있으므로)
  return ''
}

// News API functions - 클라이언트 컴포넌트용 (API 호출)
export async function getNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch('/api/news', { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export async function createNews(news: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>): Promise<NewsItem | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(news)
    })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Error creating news:', error)
    return null
  }
}

export async function updateNews(id: string, updates: Partial<NewsItem>): Promise<NewsItem | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Error updating news:', error)
    return null
  }
}

export async function deleteNews(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/news/${id}`, {
      method: 'DELETE'
    })
    return res.ok
  } catch (error) {
    console.error('Error deleting news:', error)
    return false
  }
}

// Instructor API functions - 클라이언트 컴포넌트용 (API 호출)
export async function getInstructors(): Promise<Instructor[]> {
  try {
    const res = await fetch('/api/instructors', { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Error fetching instructors:', error)
    return []
  }
}

export async function createInstructor(instructor: Omit<Instructor, 'id' | 'created_at' | 'updated_at'>): Promise<Instructor | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/instructors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(instructor)
    })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Error creating instructor:', error)
    return null
  }
}

export async function updateInstructor(id: string, updates: Partial<Instructor>): Promise<Instructor | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/instructors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Error updating instructor:', error)
    return null
  }
}

export async function deleteInstructor(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/instructors/${id}`, {
      method: 'DELETE'
    })
    return res.ok
  } catch (error) {
    console.error('Error deleting instructor:', error)
    return false
  }
}

// Image upload function
export async function uploadImage(file: File, category: string = 'general'): Promise<string | null> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', category)

    const res = await fetch(`${getBaseUrl()}/api/upload-image`, {
      method: 'POST',
      body: formData
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.url
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}
