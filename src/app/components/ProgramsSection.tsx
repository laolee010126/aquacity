import { getPrograms } from "@/lib/database"
import { ProgramsClient } from "./ProgramsClient"
import { Program, parseStringArray } from "@/types/database"

export async function ProgramsSection() {
  let programsData = []
  
  try {
    const dbPrograms = await getPrograms()
    
    if (dbPrograms.length > 0) {
      // DB 데이터를 기존 컴포넌트 형식으로 변환
      programsData = dbPrograms.map((program: Program) => ({
        title: program.title,
        description: program.description || '',
        level: program.level || '',
        duration: program.duration || '',
        capacity: program.capacity || '',
        price: program.price || '',
        instructor: program.instructor_name || '',
        schedule: parseStringArray(program.schedule),
        image: program.image_url || '',
        levelColor: (program.level_color || 'blue') as 'green' | 'yellow' | 'red' | 'blue' | 'purple'
      }))
    }
  } catch (error) {
    console.error('Failed to load programs from database:', error)
    // 서버에서 폴백 데이터 사용
    programsData = []
  }

  return <ProgramsClient initialPrograms={programsData} />
}