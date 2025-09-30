import { getNews } from "@/lib/database"
import { NewsClient } from "./NewsClient"

export async function NewsSection() {
  let newsData = []
  
  try {
    newsData = await getNews()
  } catch (error) {
    console.error('Failed to load news from database:', error)
    // 서버에서 폴백 데이터 사용
    newsData = []
  }

  return <NewsClient initialNews={newsData} />
}