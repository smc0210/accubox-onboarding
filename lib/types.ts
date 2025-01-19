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