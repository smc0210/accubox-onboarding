import { QuizQuestion } from '@/lib/types'

let quizQuestions: QuizQuestion[] = []

export async function loadQuizQuestions(): Promise<QuizQuestion[]> {
  if (quizQuestions.length > 0) return quizQuestions

  try {
    const response = await fetch('/api/quiz', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch quiz questions: ${response.statusText}`)
    }

    const data = await response.json()
    quizQuestions = data
    return quizQuestions
  } catch (error) {
    console.error('Error loading quiz questions:', error)
    return []
  }
}

// 초기 빈 배열을 export하고, 컴포넌트에서 useEffect로 로드
export const QUIZ_QUESTIONS: QuizQuestion[] = []