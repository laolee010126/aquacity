import { getInstructors } from "@/lib/database"
import { InstructorsClient } from "./InstructorsClient"
import { Instructor, parseStringArray } from "@/types/database"

export async function InstructorsSection() {
  let instructorsData = []
  
  try {
    const dbInstructors = await getInstructors()
    
    if (dbInstructors.length > 0) {
      // DB 데이터를 기존 컴포넌트 형식으로 변환
      instructorsData = dbInstructors.map((instructor: Instructor) => ({
        name: instructor.name,
        photo: instructor.photo_url || '',
        specialty: parseStringArray(instructor.specialty),
        description: instructor.description || ''
      }))
    }
  } catch (error) {
    console.error('Failed to load instructors from database:', error)
    // 서버에서 폴백 데이터 사용
    instructorsData = []
  }

  return <InstructorsClient initialInstructors={instructorsData} />
}
