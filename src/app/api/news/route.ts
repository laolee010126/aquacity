import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { NewsItem } from '@/types/database'

const DATA_FILE = path.join(process.cwd(), 'data', 'news.json')

export async function GET() {
  try {
    const fileContent = await readFile(DATA_FILE, 'utf-8')
    const data = JSON.parse(fileContent)
    return NextResponse.json(data.news || [])
  } catch (error) {
    console.error('Error reading news:', error)
    return NextResponse.json([], { status: 200 }) // Return empty array if file doesn't exist
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const fileContent = await readFile(DATA_FILE, 'utf-8')
    const data = JSON.parse(fileContent)

    const newItem: NewsItem = {
      id: crypto.randomUUID(),
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    data.news.push(newItem)
    await writeFile(DATA_FILE, JSON.stringify(data, null, 2))

    return NextResponse.json(newItem)
  } catch (error) {
    console.error('Error creating news:', error)
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 })
  }
}
