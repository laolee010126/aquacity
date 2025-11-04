import 'server-only'
import { Instructor, NewsItem } from '@/types/database'
import { readFile } from 'fs/promises'
import path from 'path'

// Server-only data functions that read directly from JSON files
// These functions are ONLY for use in Server Components

export async function getNewsServer(): Promise<NewsItem[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'news.json')
    const fileContent = await readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    return data.news || []
  } catch (error) {
    console.error('Error reading news from file:', error)
    return []
  }
}

export async function getInstructorsServer(): Promise<Instructor[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'instructors.json')
    const fileContent = await readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContent)
    return data.instructors || []
  } catch (error) {
    console.error('Error reading instructors from file:', error)
    return []
  }
}
