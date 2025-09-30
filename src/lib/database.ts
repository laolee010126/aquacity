import { supabase } from '@/lib/supabase'
import { Instructor, Program, NewsItem } from '@/types/database'

// 프로그램 관련 함수들
export async function getPrograms(): Promise<Program[]> {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: true })

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

export async function createProgram(program: Omit<Program, 'id' | 'created_at' | 'updated_at'>): Promise<Program | null> {
  try {
    const { data, error } = await supabase
      .from('programs')
      .insert([program])
      .select()
      .single()

    if (error) {
      console.error('Error creating program:', error)
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
    const { data, error } = await supabase
      .from('programs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating program:', error)
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