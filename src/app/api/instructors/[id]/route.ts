import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'instructors.json')

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const fileContent = await readFile(DATA_FILE, 'utf-8')
    const data = JSON.parse(fileContent)

    const index = data.instructors.findIndex((item: { id: string }) => item.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Instructor not found' }, { status: 404 })
    }

    data.instructors[index] = {
      ...data.instructors[index],
      ...body,
      updated_at: new Date().toISOString()
    }

    await writeFile(DATA_FILE, JSON.stringify(data, null, 2))

    return NextResponse.json(data.instructors[index])
  } catch (error) {
    console.error('Error updating instructor:', error)
    return NextResponse.json({ error: 'Failed to update instructor' }, { status: 500 })
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

    data.instructors = data.instructors.filter((item: { id: string }) => item.id !== id)

    await writeFile(DATA_FILE, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting instructor:', error)
    return NextResponse.json({ error: 'Failed to delete instructor' }, { status: 500 })
  }
}
