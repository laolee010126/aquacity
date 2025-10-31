export interface User {
  id: string
  username: string
  password: string
  role: 'admin' | 'user'
  created_at: string
  updated_at: string
}

export interface Instructor {
  id: string
  name: string
  photo_url?: string
  experience?: string
  specialty?: string // 쉼표로 구분된 문자열
  certifications?: string // 쉼표로 구분된 문자열
  rating: number
  description?: string
  created_at: string
  updated_at: string
}

export interface Program {
  id: string
  title: string
  description?: string
  level?: string
  duration?: string
  capacity?: string
  price?: string
  instructor_name?: string
  schedule?: string // 쉼표로 구분된 문자열
  image_url?: string
  level_color?: string
  parent_id?: string // 상위 프로그램 ID (계층 구조)
  curriculum_content?: string // 수업 내용
  requirements?: string // 수강 조건
  display_order?: number // 표시 순서
  created_at: string
  updated_at: string
  // 클라이언트 측에서 계산되는 필드
  children?: Program[] // 하위 프로그램 목록
}

export interface NewsItem {
  id: string
  title: string
  content: string
  date: string
  category: string
  category_color: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
  is_published: boolean
  created_at: string
  updated_at: string
}

// 헬퍼 함수들
export function parseStringArray(str?: string): string[] {
  return str ? str.split(',').map(item => item.trim()) : []
}

export function stringifyArray(arr: string[]): string {
  return arr.join(', ')
}