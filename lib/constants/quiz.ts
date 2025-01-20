import { QuizQuestion } from '@/lib/types'

let quizQuestions: Record<string, QuizQuestion[]> = {}

export async function loadQuizQuestions(category?: string): Promise<QuizQuestion[]> {
  // 이미 로드된 카테고리의 퀴즈가 있다면 반환
  if (category && quizQuestions[category]?.length > 0) {
    return quizQuestions[category]
  } else if (!category && Object.values(quizQuestions).flat().length > 0) {
    return Object.values(quizQuestions).flat()
  }

  try {
    const url = category ? `/api/quiz?category=${category}` : '/api/quiz'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch quiz questions: ${response.statusText}`)
    }

    const data = await response.json()

    if (category) {
      quizQuestions[category] = data
      return data
    } else {
      // 전체 퀴즈를 로드한 경우
      quizQuestions = data.reduce((acc: Record<string, QuizQuestion[]>, question: QuizQuestion) => {
        const cat = question.category
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(question)
        return acc
      }, {})
      return data
    }
  } catch (error) {
    console.error('Error loading quiz questions:', error)
    return []
  }
}

// 초기 빈 배열을 export하고, 컴포넌트에서 useEffect로 로드
export const QUIZ_QUESTIONS: QuizQuestion[] = []