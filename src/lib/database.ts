import { supabase } from '@/lib/supabase'
import { Instructor, Program, NewsItem } from '@/types/database'

// 프로그램 관련 함수들
export async function getPrograms(): Promise<Program[]> {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching programs:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching programs:', error)
    return []
  }
}

// 계층 구조로 프로그램 가져오기 (부모-자식 관계 포함)
export async function getProgramsWithHierarchy(): Promise<Program[]> {
  try {
    const allPrograms = await getPrograms()

    // 계층 구조 구성
    const programMap = new Map<string, Program>()
    const rootPrograms: Program[] = []

    // 먼저 모든 프로그램을 맵에 저장
    allPrograms.forEach(program => {
      programMap.set(program.id, { ...program, children: [] })
    })

    // 부모-자식 관계 구성
    allPrograms.forEach(program => {
      const programWithChildren = programMap.get(program.id)!

      if (program.parent_id) {
        // 자식 프로그램인 경우 부모에 추가
        const parent = programMap.get(program.parent_id)
        if (parent) {
          parent.children = parent.children || []
          parent.children.push(programWithChildren)
        }
      } else {
        // 루트 프로그램인 경우 배열에 추가
        rootPrograms.push(programWithChildren)
      }
    })

    return rootPrograms
  } catch (error) {
    console.error('Error fetching programs with hierarchy:', error)
    return []
  }
}

export async function createProgram(program: Omit<Program, 'id' | 'created_at' | 'updated_at'>): Promise<Program | null> {
  try {
    // 빈 문자열을 null로 변환
    const cleanedProgram = { ...program }

    if (cleanedProgram.parent_id === '') {
      cleanedProgram.parent_id = null as any
    }

    if (cleanedProgram.display_order === undefined || cleanedProgram.display_order === null) {
      cleanedProgram.display_order = 0 as any
    }

    const { data, error } = await supabase
      .from('programs')
      .insert([cleanedProgram])
      .select()
      .single()

    if (error) {
      console.error('Error creating program:', error)
      console.error('Program data:', cleanedProgram)
      return null
    }

    return data
  } catch (error) {
    console.error('Error creating program:', error)
    return null
  }
}

export async function updateProgram(id: string, updates: Partial<Program>): Promise<Program | null> {
  try {
    // 빈 문자열을 null로 변환 (UUID 필드 등을 위해)
    const cleanedUpdates = { ...updates }

    // parent_id가 빈 문자열이면 null로 변환
    if (cleanedUpdates.parent_id === '') {
      cleanedUpdates.parent_id = null as any
    }

    // display_order가 없거나 잘못된 값이면 0으로 설정
    if (cleanedUpdates.display_order === undefined || cleanedUpdates.display_order === null) {
      cleanedUpdates.display_order = 0 as any
    }

    const { data, error } = await supabase
      .from('programs')
      .update({ ...cleanedUpdates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating program:', error)
      console.error('Update data:', cleanedUpdates)
      console.error('Program ID:', id)
      return null
    }

    return data
  } catch (error) {
    console.error('Error updating program:', error)
    return null
  }
}

export async function deleteProgram(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting program:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting program:', error)
    return false
  }
}

// 강사진 관련 함수들
export async function getInstructors(): Promise<Instructor[]> {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching instructors:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching instructors:', error)
    return []
  }
}

export async function createInstructor(instructor: Omit<Instructor, 'id' | 'created_at' | 'updated_at'>): Promise<Instructor | null> {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .insert([instructor])
      .select()
      .single()

    if (error) {
      console.error('Error creating instructor:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error creating instructor:', error)
    return null
  }
}

export async function updateInstructor(id: string, updates: Partial<Instructor>): Promise<Instructor | null> {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating instructor:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error updating instructor:', error)
    return null
  }
}

export async function deleteInstructor(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('instructors')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting instructor:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting instructor:', error)
    return false
  }
}

// 뉴스/소식 관련 함수들
export async function getNews(): Promise<NewsItem[]> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('is_published', true)
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching news:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export async function getAllNews(): Promise<NewsItem[]> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching all news:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching all news:', error)
    return []
  }
}

export async function createNews(news: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>): Promise<NewsItem | null> {
  try {
    const { data, error } = await supabase
      .from('news')
      .insert([news])
      .select()
      .single()

    if (error) {
      console.error('Error creating news:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error creating news:', error)
    return null
  }
}

export async function updateNews(id: string, updates: Partial<NewsItem>): Promise<NewsItem | null> {
  try {
    const { data, error } = await supabase
      .from('news')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating news:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error updating news:', error)
    return null
  }
}

export async function deleteNews(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting news:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting news:', error)
    return false
  }
}