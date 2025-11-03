import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'news.json')

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const fileContent = await readFile(DATA_FILE, 'utf-8')
    const data = JSON.parse(fileContent)

    const index = data.news.findIndex((item: { id: string }) => item.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 })
    }

    data.news[index] = {
      ...data.news[index],
      ...body,
      updated_at: new Date().toISOString()
    }

    await writeFile(DATA_FILE, JSON.stringify(data, null, 2))

    return NextResponse.json(data.news[index])
  } catch (error) {
    console.error('Error updating news:', error)
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const fileContent = await readFile(DATA_FILE, 'utf-8')
    const data = JSON.parse(fileContent)

    data.news = data.news.filter((item: { id: string }) => item.id !== id)

    await writeFile(DATA_FILE, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting news:', error)
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 })
  }
}
