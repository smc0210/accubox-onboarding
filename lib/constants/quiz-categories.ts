export const QUIZ_CATEGORIES = [
  {
    id: 'domain',
    title: '도메인',
    description: '도메인 지식 학습을 위한 퀴즈'
  },
  {
    id: 'kotlin',
    title: 'Kotlin',
    description: 'Kotlin 프로그래밍 언어 학습을 위한 퀴즈'
  },
  {
    id: 'loan-origination',
    title: 'Loan Origination',
    description: '대출 프로세스 학습을 위한 퀴즈'
  }
] as const

export type QuizCategory = typeof QUIZ_CATEGORIES[number]['id']