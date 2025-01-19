export interface ChecklistItem {
  id: string
  title: string
  completed: boolean
  link?: string
  items?: ChecklistItem[]
}

export interface ChecklistSection {
  id: string
  title: string
  items: ChecklistItem[]
  step: number
}

export interface OnboardingStep {
  step: number
  title: string
  description: string
  isQuizRequired: boolean
}

export interface QuizQuestion {
  id: string
  category: 'mortgage' | 'los' | 'architecture' | 'general'  // 문제 카테고리
  type: 'multiple' | 'short'  // 객관식 또는 주관식
  question: string
  options?: string[]  // 객관식 보기
  answer: string
  explanation: string  // 오답시 설명
  documentUrl: string  // 관련 문서 링크
  documentSection?: string  // 문서의 특정 섹션 정보
}

export interface QuizResult {
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  categories: {
    [key: string]: {
      total: number
      correct: number
    }
  }
  timestamp: string
}

export interface UserSession {
  name: string;
  startTime: string;
}