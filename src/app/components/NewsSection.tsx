import { getNewsServer } from "@/lib/data-server"
import { NewsClient } from "./NewsClient"
import { NewsItem } from "@/types/database"

export async function NewsSection() {
  let newsData: NewsItem[] = []

  try {
    newsData = await getNewsServer()
  } catch (error) {
    console.error('Failed to load news from database:', error)
    newsData = []
  }

  // 데이터가 없으면 섹션을 렌더링하지 않음
  if (newsData.length === 0) {
    return null
  }

  return <NewsClient initialNews={newsData} />
}